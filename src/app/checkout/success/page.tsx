import { CheckoutSuccessClient } from "./CheckoutSuccessClient";
import Link from "next/link";

export const metadata = {
  title: "Tack för din order | Intraskin",
  description: "Din betalning har genomförts.",
};

type CheckoutSuccessPageProps = {
  searchParams: Promise<{
    session_id?: string;
  }>;
};

type StripeCheckoutSession = {
  id: string;
  payment_status?: string;
  amount_total?: number | null;
  metadata?: {
    order_id?: string;
  } | null;
};

export default async function CheckoutSuccessPage({
  searchParams,
}: CheckoutSuccessPageProps) {
  const { session_id: sessionId } = await searchParams;
  const session = sessionId ? await getCheckoutSession(sessionId) : null;

  if (!session || session.payment_status !== "paid") {
    return (
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-32 text-center">
        <h1 className="font-serif text-4xl lg:text-5xl mb-4">
          Betalningen kunde inte bekräftas
        </h1>
        <p className="text-muted mb-8">
          Vi kunde inte verifiera Stripe-betalningen. Gå tillbaka till kassan och försök igen.
        </p>
        <Link
          href="/checkout"
          className="inline-block px-8 py-4 bg-ink text-cream text-sm tracking-[0.15em] uppercase font-medium hover:bg-sage-dark transition-colors"
        >
          Tillbaka till kassan
        </Link>
      </div>
    );
  }

  return (
    <CheckoutSuccessClient
      orderId={session.metadata?.order_id ?? session.id}
      amountTotal={session.amount_total}
    />
  );
}

async function getCheckoutSession(sessionId: string) {
  const stripeSecretKey = process.env.STRIPE_SECRET_KEY;

  if (!stripeSecretKey) {
    return null;
  }

  const response = await fetch(
    `https://api.stripe.com/v1/checkout/sessions/${encodeURIComponent(sessionId)}`,
    {
      headers: {
        Authorization: `Bearer ${stripeSecretKey}`,
      },
      cache: "no-store",
    }
  );

  if (!response.ok) {
    return null;
  }

  return (await response.json()) as StripeCheckoutSession;
}
