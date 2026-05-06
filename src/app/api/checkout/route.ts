import { NextResponse } from "next/server";
import { products } from "@/lib/products";
import type { Product } from "@/lib/products";

type CheckoutItem = {
  id: string;
  quantity: number;
};

type CheckoutLineProduct = {
  product: Product;
  quantity: number;
};

type StripeCheckoutResponse = {
  url?: unknown;
  error?: {
    message?: string;
  };
};

const STRIPE_CHECKOUT_URL = "https://api.stripe.com/v1/checkout/sessions";
const FREE_SHIPPING_THRESHOLD = 500;

export async function POST(request: Request) {
  const stripeSecretKey = process.env.STRIPE_SECRET_KEY;

  if (!stripeSecretKey) {
    return NextResponse.json(
      { error: "Stripe secret key saknas." },
      { status: 500 }
    );
  }

  const body: unknown = await request.json().catch(() => null);
  const rawItems =
    body &&
    typeof body === "object" &&
    "items" in body &&
    Array.isArray(body.items)
      ? body.items
      : [];

  const checkoutItems = rawItems
    .map((item: unknown): CheckoutItem | null => {
      if (!item || typeof item !== "object" || !("id" in item) || typeof item.id !== "string") {
        return null;
      }

      const quantity = "quantity" in item ? Number(item.quantity) : 0;
      if (!Number.isInteger(quantity) || quantity < 1 || quantity > 99) {
        return null;
      }

      return { id: item.id, quantity };
    })
    .filter((item): item is CheckoutItem => item !== null);

  if (checkoutItems.length === 0) {
    return NextResponse.json(
      { error: "Varukorgen är tom." },
      { status: 400 }
    );
  }

  const lineProducts = checkoutItems.map((item): CheckoutLineProduct | null => {
    const product = products.find((p) => p.id === item.id);
    return product ? { product, quantity: item.quantity } : null;
  });

  if (lineProducts.some((item) => item === null)) {
    return NextResponse.json(
      { error: "En eller flera produkter kunde inte hittas." },
      { status: 400 }
    );
  }

  const validLineProducts = lineProducts.filter(
    (item): item is CheckoutLineProduct => item !== null
  );
  const subtotal = validLineProducts.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0
  );
  const shipping = subtotal >= FREE_SHIPPING_THRESHOLD ? 0 : 49;
  const origin = new URL(request.url).origin;
  const orderId = crypto.randomUUID();

  const params = new URLSearchParams({
    mode: "payment",
    locale: "sv",
    success_url: `${origin}/checkout/success?session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: `${origin}/checkout`,
    client_reference_id: orderId,
    "phone_number_collection[enabled]": "true",
    "shipping_address_collection[allowed_countries][0]": "SE",
    "metadata[source]": "intraskin.se",
    "metadata[order_id]": orderId,
  });

  validLineProducts.forEach(({ product, quantity }, index) => {
    params.set(`line_items[${index}][quantity]`, String(quantity));
    params.set(`line_items[${index}][price_data][currency]`, "sek");
    params.set(`line_items[${index}][price_data][unit_amount]`, String(product.price * 100));
    params.set(`line_items[${index}][price_data][product_data][name]`, product.name);
    params.set(`line_items[${index}][price_data][product_data][description]`, product.tagline);
    params.set(`line_items[${index}][price_data][product_data][metadata][product_id]`, product.id);
    params.set(`line_items[${index}][price_data][product_data][metadata][slug]`, product.slug);
  });

  params.set("shipping_options[0][shipping_rate_data][type]", "fixed_amount");
  params.set("shipping_options[0][shipping_rate_data][fixed_amount][currency]", "sek");
  params.set(
    "shipping_options[0][shipping_rate_data][fixed_amount][amount]",
    String(shipping * 100)
  );
  params.set(
    "shipping_options[0][shipping_rate_data][display_name]",
    shipping === 0 ? "Fri frakt" : "Standardfrakt"
  );
  params.set("shipping_options[0][shipping_rate_data][delivery_estimate][minimum][unit]", "business_day");
  params.set("shipping_options[0][shipping_rate_data][delivery_estimate][minimum][value]", "1");
  params.set("shipping_options[0][shipping_rate_data][delivery_estimate][maximum][unit]", "business_day");
  params.set("shipping_options[0][shipping_rate_data][delivery_estimate][maximum][value]", "3");

  const stripeResponse = await fetch(STRIPE_CHECKOUT_URL, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${stripeSecretKey}`,
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: params,
  });

  const session = (await stripeResponse.json()) as StripeCheckoutResponse;

  if (!stripeResponse.ok || typeof session?.url !== "string") {
    return NextResponse.json(
      { error: session?.error?.message ?? "Kunde inte skapa Stripe Checkout." },
      { status: 500 }
    );
  }

  return NextResponse.json({ url: session.url });
}
