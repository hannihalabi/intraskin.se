"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { X, Plus, Minus, ShoppingBag } from "lucide-react";
import { useCart, FREE_SHIPPING_THRESHOLD } from "@/lib/store";
import { formatPrice } from "@/lib/utils";
import { ProductImage } from "./ProductImage";

export function CartDrawer() {
  const { items, isOpen, closeCart, updateQuantity, removeItem } = useCart();
  const subtotal = useCart((s) => s.subtotal());
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";
  }, [isOpen]);

  if (!mounted) return null;

  const remainingForFreeShipping = Math.max(0, FREE_SHIPPING_THRESHOLD - subtotal);
  const progress = Math.min(100, (subtotal / FREE_SHIPPING_THRESHOLD) * 100);

  return (
    <>
      <div
        className={`fixed inset-0 z-50 bg-ink/40 transition-opacity duration-300 ${
          isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
        onClick={closeCart}
      />
      <aside
        className={`fixed top-0 right-0 h-full w-full sm:w-[440px] bg-background z-50 shadow-2xl flex flex-col transition-transform duration-300 ease-out ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex items-center justify-between px-6 py-5 border-b border-border">
          <h3 className="font-serif text-xl">Din varukorg</h3>
          <button onClick={closeCart} aria-label="Stäng" className="p-1 hover:bg-cream rounded-full">
            <X className="w-5 h-5" />
          </button>
        </div>

        {items.length > 0 && (
          <div className="px-6 py-4 bg-cream/50 border-b border-border">
            {remainingForFreeShipping > 0 ? (
              <p className="text-xs text-muted">
                Lägg till{" "}
                <span className="font-medium text-ink">
                  {formatPrice(remainingForFreeShipping)}
                </span>{" "}
                till för fri frakt
              </p>
            ) : (
              <p className="text-xs text-sage-dark font-medium">✓ Du har fri frakt!</p>
            )}
            <div className="mt-2 h-1 bg-beige rounded-full overflow-hidden">
              <div
                className="h-full bg-sage transition-all duration-500"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>
        )}

        <div className="flex-1 overflow-y-auto px-6 py-4">
          {items.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center py-12">
              <div className="w-16 h-16 rounded-full bg-cream flex items-center justify-center mb-4">
                <ShoppingBag className="w-7 h-7 text-muted" strokeWidth={1.2} />
              </div>
              <p className="font-serif text-xl mb-2">Din varukorg är tom</p>
              <p className="text-sm text-muted mb-6">Upptäck våra mest älskade produkter</p>
              <Link
                href="/produkter"
                onClick={closeCart}
                className="inline-block px-6 py-3 bg-ink text-cream text-sm tracking-[0.1em] uppercase hover:bg-sage-dark transition-colors"
              >
                Börja handla
              </Link>
            </div>
          ) : (
            <ul className="divide-y divide-border">
              {items.map((item) => (
                <li key={item.id} className="py-4 flex gap-4">
                  <Link
                    href={`/produkter/${item.slug}`}
                    onClick={closeCart}
                    className="flex-shrink-0"
                  >
                    <ProductImage
                      name={item.name}
                      brand={item.brand}
                      imageUrl={item.imageUrl}
                      className="w-20 h-24 bg-cream"
                      sizes="80px"
                    />
                  </Link>
                  <div className="flex-1 min-w-0">
                    <p className="text-[10px] tracking-[0.15em] uppercase text-muted">{item.brand}</p>
                    <Link
                      href={`/produkter/${item.slug}`}
                      onClick={closeCart}
                      className="block text-sm font-medium hover:text-sage-dark transition-colors leading-snug"
                    >
                      {item.name}
                    </Link>
                    <p className="text-xs text-muted mt-0.5">{item.size}</p>
                    <div className="flex items-center justify-between mt-3">
                      <div className="flex items-center border border-border">
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          className="p-1.5 hover:bg-cream"
                          aria-label="Minska"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="px-3 text-sm">{item.quantity}</span>
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          className="p-1.5 hover:bg-cream"
                          aria-label="Öka"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>
                      <p className="text-sm font-medium">
                        {formatPrice(item.price * item.quantity)}
                      </p>
                    </div>
                  </div>
                  <button
                    onClick={() => removeItem(item.id)}
                    className="text-xs text-muted hover:text-ink underline-offset-2 hover:underline self-start"
                  >
                    Ta bort
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>

        {items.length > 0 && (
          <div className="border-t border-border px-6 py-5 space-y-3">
            <div className="flex justify-between text-sm">
              <span className="text-muted">Delsumma</span>
              <span className="font-medium">{formatPrice(subtotal)}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-muted">Frakt</span>
              <span className="font-medium">
                {subtotal >= FREE_SHIPPING_THRESHOLD ? "Fri" : "49 kr"}
              </span>
            </div>
            <div className="flex justify-between font-serif text-lg pt-2 border-t border-border">
              <span>Totalt</span>
              <span>
                {formatPrice(
                  subtotal + (subtotal >= FREE_SHIPPING_THRESHOLD ? 0 : 49)
                )}
              </span>
            </div>
            <Link
              href="/checkout"
              onClick={closeCart}
              className="block text-center w-full px-6 py-4 bg-ink text-cream text-sm tracking-[0.15em] uppercase font-medium hover:bg-sage-dark transition-colors"
            >
              Till kassan
            </Link>
            <p className="text-[11px] text-muted text-center">
              Säker betalning · 30 dagar öppet köp
            </p>
          </div>
        )}
      </aside>
    </>
  );
}
