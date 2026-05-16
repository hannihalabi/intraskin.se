"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { Loader2, Lock } from "lucide-react";
import { useCart } from "@/lib/store";

export function CheckoutClient() {
  const { items } = useCart();
  const [mounted, setMounted] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [attempt, setAttempt] = useState(0);
  const hasStartedRef = useRef(false);

  useEffect(() => setMounted(true), []);

  useEffect(() => {
    if (!mounted || hasStartedRef.current || items.length === 0) return;
    hasStartedRef.current = true;

    fetch("/api/checkout", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        items: items.map((item) => ({ id: item.id, quantity: item.quantity })),
      }),
    })
      .then(async (response) => {
        const data = await response.json();
        if (!response.ok || typeof data?.url !== "string") {
          throw new Error(data?.error ?? "Kunde inte starta betalningen.");
        }
        window.location.href = data.url;
      })
      .catch((err) => {
        hasStartedRef.current = false;
        setError(
          err instanceof Error ? err.message : "Kunde inte starta betalningen."
        );
      });
  }, [mounted, items, attempt]);

  if (!mounted) return <div className="min-h-[50vh]" />;

  if (items.length === 0) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-20 text-center">
        <h1 className="font-serif text-3xl mb-4">Din varukorg är tom</h1>
        <Link href="/produkter" className="underline underline-offset-4">
          Tillbaka till produkter
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto px-4 py-24 text-center">
      <div className="flex flex-col items-center gap-5">
        {error ? (
          <>
            <h1 className="font-serif text-3xl">Något gick fel</h1>
            <p className="text-muted text-sm max-w-md">{error}</p>
            <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
              <button
                type="button"
                onClick={() => {
                  setError(null);
                  setAttempt((n) => n + 1);
                }}
                className="px-8 py-3 bg-ink text-cream text-sm tracking-[0.15em] uppercase font-medium hover:bg-sage-dark transition-colors"
              >
                Försök igen
              </button>
              <Link
                href="/varukorg"
                className="text-sm underline underline-offset-4"
              >
                Tillbaka till varukorg
              </Link>
            </div>
          </>
        ) : (
          <>
            <Loader2 className="h-7 w-7 animate-spin text-sage-dark" strokeWidth={1.4} />
            <h1 className="font-serif text-3xl">Tar dig till säker betalning…</h1>
            <p className="text-muted text-sm max-w-md leading-relaxed">
              Du skickas vidare till Stripe där du fyller i leverans- och
              betalningsuppgifter. Klarna, kort, Swish och fler metoder finns där.
            </p>
            <div className="flex items-center gap-2 text-xs text-muted pt-2">
              <Lock className="w-3.5 h-3.5" />
              SSL-krypterad betalning · drivs av Stripe
            </div>
          </>
        )}
      </div>
    </div>
  );
}
