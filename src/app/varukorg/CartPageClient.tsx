"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Plus, Minus, X, ShoppingBag, ArrowRight } from "lucide-react";
import { useCart, FREE_SHIPPING_THRESHOLD } from "@/lib/store";
import { formatPrice } from "@/lib/utils";
import { ProductImage } from "@/components/ProductImage";

export function CartPageClient() {
  const { items, updateQuantity, removeItem } = useCart();
  const subtotal = useCart((s) => s.subtotal());
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  if (!mounted) return <div className="min-h-[50vh]" />;

  const shipping = subtotal >= FREE_SHIPPING_THRESHOLD ? 0 : 49;
  const total = subtotal + shipping;
  const remaining = Math.max(0, FREE_SHIPPING_THRESHOLD - subtotal);
  const progress = Math.min(100, (subtotal / FREE_SHIPPING_THRESHOLD) * 100);

  if (items.length === 0) {
    return (
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-32 text-center">
        <div className="w-20 h-20 rounded-full bg-cream flex items-center justify-center mx-auto mb-6">
          <ShoppingBag className="w-8 h-8 text-muted" strokeWidth={1.2} />
        </div>
        <h1 className="font-serif text-4xl lg:text-5xl mb-4">Din varukorg är tom</h1>
        <p className="text-muted mb-8 max-w-md mx-auto">
          Upptäck våra mest älskade produkter och börja bygga din rutin.
        </p>
        <Link
          href="/produkter"
          className="inline-flex items-center gap-2 px-8 py-4 bg-ink text-cream text-sm tracking-[0.15em] uppercase font-medium hover:bg-sage-dark transition-colors"
        >
          Utforska produkter
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
      <h1 className="font-serif text-4xl lg:text-5xl mb-2">Varukorg</h1>
      <p className="text-muted mb-10">{items.length} produkter</p>

      {remaining > 0 && (
        <div className="mb-8 p-5 bg-cream/50">
          <p className="text-sm mb-2">
            Lägg till{" "}
            <span className="font-medium">{formatPrice(remaining)}</span> till för fri frakt
          </p>
          <div className="h-1 bg-beige rounded-full overflow-hidden">
            <div
              className="h-full bg-sage transition-all duration-500"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>
      )}

      <div className="grid lg:grid-cols-[1fr_400px] gap-12">
        <div>
          <ul className="divide-y divide-border border-t border-b border-border">
            {items.map((item) => (
              <li key={item.id} className="py-6 flex gap-4 lg:gap-6">
                <Link href={`/produkter/${item.slug}`}>
                  <ProductImage
                    name={item.name}
                    brand={item.brand}
                    imageUrl={item.imageUrl}
                    className="w-24 h-32 lg:w-32 lg:h-40 bg-cream"
                    sizes="(max-width: 1024px) 96px, 128px"
                  />
                </Link>
                <div className="flex-1 flex flex-col">
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex-1 min-w-0">
                      <p className="text-[10px] tracking-[0.15em] uppercase text-muted mb-1">
                        {item.brand}
                      </p>
                      <Link
                        href={`/produkter/${item.slug}`}
                        className="font-serif text-lg lg:text-xl hover:text-sage-dark transition-colors"
                      >
                        {item.name}
                      </Link>
                      <p className="text-xs text-muted mt-1">{item.size}</p>
                    </div>
                    <button
                      onClick={() => removeItem(item.id)}
                      aria-label="Ta bort"
                      className="p-1.5 hover:bg-cream rounded-full"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                  <div className="flex items-end justify-between mt-auto pt-4">
                    <div className="flex items-center border border-border">
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        className="p-2 hover:bg-cream"
                        aria-label="Minska"
                      >
                        <Minus className="w-3.5 h-3.5" />
                      </button>
                      <span className="px-4 text-sm">{item.quantity}</span>
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        className="p-2 hover:bg-cream"
                        aria-label="Öka"
                      >
                        <Plus className="w-3.5 h-3.5" />
                      </button>
                    </div>
                    <p className="font-serif text-lg">
                      {formatPrice(item.price * item.quantity)}
                    </p>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>

        <aside className="lg:sticky lg:top-28 lg:self-start">
          <div className="bg-cream/50 p-6 lg:p-8">
            <h2 className="font-serif text-2xl mb-6">Sammanfattning</h2>
            <div className="space-y-3 text-sm">
              <div className="flex justify-between">
                <span className="text-muted">Delsumma</span>
                <span>{formatPrice(subtotal)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted">Frakt</span>
                <span>{shipping === 0 ? "Fri" : formatPrice(shipping)}</span>
              </div>
              <div className="border-t border-border pt-3 flex justify-between font-serif text-lg">
                <span>Totalt</span>
                <span>{formatPrice(total)}</span>
              </div>
            </div>
            <Link
              href="/checkout"
              className="block text-center w-full mt-6 px-6 py-4 bg-ink text-cream text-sm tracking-[0.15em] uppercase font-medium hover:bg-sage-dark transition-colors"
            >
              Till kassan
            </Link>
            <Link
              href="/produkter"
              className="block text-center w-full mt-3 text-sm text-muted hover:text-ink transition-colors"
            >
              Fortsätt handla
            </Link>
            <div className="mt-6 pt-6 border-t border-border text-xs text-muted space-y-2">
              <p>✓ Säker betalning via Klarna</p>
              <p>✓ 30 dagars öppet köp</p>
              <p>✓ Gratis prov med varje order</p>
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}
