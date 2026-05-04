"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Lock, Check } from "lucide-react";
import { useCart, FREE_SHIPPING_THRESHOLD } from "@/lib/store";
import { formatPrice } from "@/lib/utils";
import { ProductImage } from "@/components/ProductImage";

const steps = ["Kontakt", "Leverans", "Betalning"] as const;

export function CheckoutClient() {
  const { items, clearCart } = useCart();
  const subtotal = useCart((s) => s.subtotal());
  const [mounted, setMounted] = useState(false);
  const [step, setStep] = useState(0);
  const [completed, setCompleted] = useState(false);

  useEffect(() => setMounted(true), []);

  if (!mounted) return <div className="min-h-[50vh]" />;

  const shipping = subtotal >= FREE_SHIPPING_THRESHOLD ? 0 : 49;
  const total = subtotal + shipping;

  if (completed) {
    return (
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-32 text-center">
        <div className="w-16 h-16 rounded-full bg-sage flex items-center justify-center mx-auto mb-6">
          <Check className="w-8 h-8 text-cream" strokeWidth={2} />
        </div>
        <h1 className="font-serif text-4xl lg:text-5xl mb-4">Tack för din order!</h1>
        <p className="text-muted mb-8">
          En orderbekräftelse har skickats till din e-post. Leverans inom 1-3 arbetsdagar.
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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (step < steps.length - 1) {
      setStep(step + 1);
    } else {
      setCompleted(true);
      clearCart();
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 lg:py-16">
      <div className="text-center mb-10">
        <Link href="/" className="font-serif text-2xl tracking-[0.15em]">
          INTRASKIN
        </Link>
      </div>

      {/* Stepper */}
      <div className="max-w-2xl mx-auto mb-12">
        <div className="flex items-center justify-between">
          {steps.map((s, idx) => (
            <div key={s} className="flex items-center flex-1">
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-medium ${
                  idx <= step ? "bg-ink text-cream" : "bg-beige text-muted"
                }`}
              >
                {idx < step ? <Check className="w-3.5 h-3.5" /> : idx + 1}
              </div>
              <span
                className={`ml-2 text-xs tracking-wider uppercase ${
                  idx <= step ? "text-ink" : "text-muted"
                }`}
              >
                {s}
              </span>
              {idx < steps.length - 1 && (
                <div
                  className={`flex-1 h-px mx-3 ${
                    idx < step ? "bg-ink" : "bg-beige"
                  }`}
                />
              )}
            </div>
          ))}
        </div>
      </div>

      <div className="grid lg:grid-cols-[1fr_420px] gap-12">
        <form onSubmit={handleSubmit} className="space-y-8">
          {step === 0 && (
            <div className="space-y-5">
              <h2 className="font-serif text-2xl">Kontaktuppgifter</h2>
              <Field label="E-post" type="email" required />
              <Field label="Telefon" type="tel" required />
              <label className="flex items-center gap-2 text-sm text-muted">
                <input type="checkbox" className="accent-ink" />
                Skicka mig erbjudanden och nyhetsbrev
              </label>
            </div>
          )}

          {step === 1 && (
            <div className="space-y-5">
              <h2 className="font-serif text-2xl">Leveransadress</h2>
              <div className="grid grid-cols-2 gap-4">
                <Field label="Förnamn" required />
                <Field label="Efternamn" required />
              </div>
              <Field label="Adress" required />
              <div className="grid grid-cols-[1fr_2fr] gap-4">
                <Field label="Postnummer" required />
                <Field label="Stad" required />
              </div>
              <h3 className="font-serif text-lg pt-4">Leveransmetod</h3>
              <RadioOption
                title="PostNord — Hempaket"
                desc="1-3 arbetsdagar"
                price={shipping === 0 ? "Fri" : formatPrice(49)}
                checked
              />
              <RadioOption
                title="DHL Express"
                desc="Nästa arbetsdag"
                price={formatPrice(149)}
              />
            </div>
          )}

          {step === 2 && (
            <div className="space-y-5">
              <h2 className="font-serif text-2xl">Betalning</h2>
              <div className="space-y-3">
                <RadioOption title="Klarna" desc="Faktura · Delbetala · Direkt" checked />
                <RadioOption title="Kort" desc="Visa, Mastercard, American Express" />
                <RadioOption title="Swish" desc="Snabbt och säkert" />
              </div>
              <div className="flex items-center gap-2 text-xs text-muted pt-4">
                <Lock className="w-3.5 h-3.5" />
                Säker betalning · SSL-krypterad
              </div>
            </div>
          )}

          <div className="flex items-center justify-between pt-4">
            {step > 0 ? (
              <button
                type="button"
                onClick={() => setStep(step - 1)}
                className="text-sm underline underline-offset-4"
              >
                ← Tillbaka
              </button>
            ) : (
              <Link href="/varukorg" className="text-sm underline underline-offset-4">
                ← Tillbaka till varukorg
              </Link>
            )}
            <button
              type="submit"
              className="px-10 py-4 bg-ink text-cream text-sm tracking-[0.15em] uppercase font-medium hover:bg-sage-dark transition-colors"
            >
              {step === steps.length - 1 ? `Betala ${formatPrice(total)}` : "Fortsätt"}
            </button>
          </div>
        </form>

        <aside>
          <div className="bg-cream/50 p-6 lg:p-8 lg:sticky lg:top-28">
            <h3 className="font-serif text-xl mb-6">Din order</h3>
            <ul className="space-y-4 mb-6">
              {items.map((item) => (
                <li key={item.id} className="flex gap-3">
                  <div className="relative">
                    <ProductImage
                      name={item.name}
                      brand={item.brand}
                      imageUrl={item.imageUrl}
                      className="w-16 h-20 bg-background"
                      sizes="64px"
                    />
                    <span className="absolute -top-2 -right-2 w-5 h-5 rounded-full bg-ink text-cream text-[10px] flex items-center justify-center">
                      {item.quantity}
                    </span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-[10px] tracking-[0.15em] uppercase text-muted">
                      {item.brand}
                    </p>
                    <p className="text-sm font-medium leading-tight">{item.name}</p>
                    <p className="text-xs text-muted">{item.size}</p>
                  </div>
                  <p className="text-sm">{formatPrice(item.price * item.quantity)}</p>
                </li>
              ))}
            </ul>
            <div className="space-y-2 text-sm pt-4 border-t border-border">
              <div className="flex justify-between">
                <span className="text-muted">Delsumma</span>
                <span>{formatPrice(subtotal)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted">Frakt</span>
                <span>{shipping === 0 ? "Fri" : formatPrice(shipping)}</span>
              </div>
              <div className="flex justify-between font-serif text-lg pt-2 border-t border-border">
                <span>Totalt</span>
                <span>{formatPrice(total)}</span>
              </div>
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}

function Field({
  label,
  type = "text",
  required,
}: {
  label: string;
  type?: string;
  required?: boolean;
}) {
  return (
    <label className="block">
      <span className="text-xs tracking-[0.15em] uppercase text-muted block mb-2">
        {label}
        {required && " *"}
      </span>
      <input
        type={type}
        required={required}
        className="w-full px-4 py-3 bg-background border border-border focus:border-ink focus:outline-none transition-colors"
      />
    </label>
  );
}

function RadioOption({
  title,
  desc,
  price,
  checked,
}: {
  title: string;
  desc: string;
  price?: string;
  checked?: boolean;
}) {
  return (
    <label
      className={`flex items-center gap-4 p-4 border cursor-pointer transition-colors ${
        checked ? "border-ink bg-cream/40" : "border-border hover:border-ink"
      }`}
    >
      <input type="radio" name="option" defaultChecked={checked} className="accent-ink" />
      <div className="flex-1">
        <p className="text-sm font-medium">{title}</p>
        <p className="text-xs text-muted">{desc}</p>
      </div>
      {price && <p className="text-sm font-medium">{price}</p>}
    </label>
  );
}
