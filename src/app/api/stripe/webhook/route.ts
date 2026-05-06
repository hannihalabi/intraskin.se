import { NextResponse } from "next/server";

type StripeEvent = {
  id: string;
  type: string;
  data: {
    object: StripeCheckoutSession;
  };
};

type StripeCheckoutSession = {
  id?: string;
  client_reference_id?: string | null;
  payment_status?: string;
  amount_total?: number | null;
  currency?: string | null;
  customer_details?: {
    email?: string | null;
    name?: string | null;
  } | null;
  metadata?: {
    order_id?: string;
    source?: string;
  } | null;
};

const SIGNATURE_TOLERANCE_SECONDS = 300;

export async function POST(request: Request) {
  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;
  const signatureHeader = request.headers.get("stripe-signature");
  const payload = await request.text();

  if (!webhookSecret) {
    return NextResponse.json(
      { error: "Stripe webhook secret saknas." },
      { status: 500 }
    );
  }

  if (!signatureHeader) {
    return NextResponse.json(
      { error: "Stripe-Signature header saknas." },
      { status: 400 }
    );
  }

  const isVerified = await verifyStripeSignature(
    payload,
    signatureHeader,
    webhookSecret
  );

  if (!isVerified) {
    return NextResponse.json(
      { error: "Ogiltig Stripe webhook-signatur." },
      { status: 400 }
    );
  }

  let event: StripeEvent;
  try {
    event = JSON.parse(payload) as StripeEvent;
  } catch {
    return NextResponse.json(
      { error: "Ogiltig Stripe webhook-payload." },
      { status: 400 }
    );
  }

  switch (event.type) {
    case "checkout.session.completed":
    case "checkout.session.async_payment_succeeded":
      await fulfillCheckoutSession(event.data.object);
      break;
    case "checkout.session.async_payment_failed":
      await handleFailedCheckoutSession(event.data.object);
      break;
    default:
      break;
  }

  return NextResponse.json({ received: true });
}

async function fulfillCheckoutSession(session: StripeCheckoutSession) {
  // Persist paid orders here when an order database is added.
  console.info("Stripe checkout paid", {
    sessionId: session.id,
    orderId: session.metadata?.order_id ?? session.client_reference_id,
    paymentStatus: session.payment_status,
    amountTotal: session.amount_total,
    currency: session.currency,
    customerEmail: session.customer_details?.email,
  });
}

async function handleFailedCheckoutSession(session: StripeCheckoutSession) {
  console.warn("Stripe checkout payment failed", {
    sessionId: session.id,
    orderId: session.metadata?.order_id ?? session.client_reference_id,
    paymentStatus: session.payment_status,
  });
}

async function verifyStripeSignature(
  payload: string,
  signatureHeader: string,
  webhookSecret: string
) {
  const signature = parseStripeSignatureHeader(signatureHeader);

  if (!signature.timestamp || signature.signatures.length === 0) {
    return false;
  }

  const timestampAge = Math.abs(Date.now() / 1000 - signature.timestamp);
  if (timestampAge > SIGNATURE_TOLERANCE_SECONDS) {
    return false;
  }

  const signedPayload = `${signature.timestamp}.${payload}`;
  const expectedSignature = await createHmacSha256Hex(
    webhookSecret,
    signedPayload
  );

  return signature.signatures.some((candidate) =>
    timingSafeEqualHex(candidate, expectedSignature)
  );
}

function parseStripeSignatureHeader(signatureHeader: string) {
  const parts = signatureHeader.split(",");
  let timestamp: number | null = null;
  const signatures: string[] = [];

  for (const part of parts) {
    const [key, value] = part.split("=");
    if (key === "t") {
      const parsedTimestamp = Number(value);
      timestamp = Number.isFinite(parsedTimestamp) ? parsedTimestamp : null;
    }

    if (key === "v1" && value) {
      signatures.push(value);
    }
  }

  return { timestamp, signatures };
}

async function createHmacSha256Hex(secret: string, value: string) {
  const encoder = new TextEncoder();
  const key = await crypto.subtle.importKey(
    "raw",
    encoder.encode(secret),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign"]
  );
  const signature = await crypto.subtle.sign("HMAC", key, encoder.encode(value));

  return Array.from(new Uint8Array(signature))
    .map((byte) => byte.toString(16).padStart(2, "0"))
    .join("");
}

function timingSafeEqualHex(left: string, right: string) {
  const leftBytes = hexToBytes(left);
  const rightBytes = hexToBytes(right);

  if (!leftBytes || !rightBytes || leftBytes.length !== rightBytes.length) {
    return false;
  }

  let result = 0;
  for (let index = 0; index < leftBytes.length; index += 1) {
    result |= leftBytes[index] ^ rightBytes[index];
  }

  return result === 0;
}

function hexToBytes(value: string) {
  if (!/^[0-9a-f]+$/i.test(value) || value.length % 2 !== 0) {
    return null;
  }

  const bytes = new Uint8Array(value.length / 2);
  for (let index = 0; index < value.length; index += 2) {
    bytes[index / 2] = Number.parseInt(value.slice(index, index + 2), 16);
  }

  return bytes;
}
