"use client";

import { useEffect } from "react";
import Link from "next/link";
import { Check } from "lucide-react";
import { useCart } from "@/lib/store";

export function CheckoutSuccessClient() {
  const clearCart = useCart((state) => state.clearCart);

  useEffect(() => {
    clearCart();
  }, [clearCart]);

  return (
    <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-32 text-center">
      <div className="w-16 h-16 rounded-full bg-sage flex items-center justify-center mx-auto mb-6">
        <Check className="w-8 h-8 text-cream" strokeWidth={2} />
      </div>
      <h1 className="font-serif text-4xl lg:text-5xl mb-4">Tack för din order!</h1>
      <p className="text-muted mb-8">
        Betalningen är mottagen. En orderbekräftelse skickas via Stripe.
      </p>
      <Link
        href="/produkter"
        className="inline-block px-8 py-4 bg-ink text-cream text-sm tracking-[0.15em] uppercase font-medium hover:bg-sage-dark transition-colors"
      >
        Fortsätt handla
      </Link>
    </div>
  );
}
