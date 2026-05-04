"use client";

import { useState, useEffect } from "react";
import { Plus, Minus, Check } from "lucide-react";
import { useCart } from "@/lib/store";
import type { Product } from "@/lib/products";

export function AddToCartButton({ product }: { product: Product }) {
  const [qty, setQty] = useState(1);
  const [added, setAdded] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const addItem = useCart((s) => s.addItem);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 600);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleAdd = () => {
    addItem(product, qty);
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  return (
    <>
      <div className="flex items-stretch gap-3">
        <div className="flex items-center border border-ink">
          <button
            onClick={() => setQty(Math.max(1, qty - 1))}
            aria-label="Minska"
            className="px-3 hover:bg-cream transition-colors"
          >
            <Minus className="w-3.5 h-3.5" />
          </button>
          <span className="px-4 text-sm font-medium min-w-[2.5rem] text-center">{qty}</span>
          <button
            onClick={() => setQty(qty + 1)}
            aria-label="Öka"
            className="px-3 hover:bg-cream transition-colors"
          >
            <Plus className="w-3.5 h-3.5" />
          </button>
        </div>
        <button
          onClick={handleAdd}
          className="flex-1 px-8 py-4 bg-ink text-cream text-sm tracking-[0.15em] uppercase font-medium hover:bg-sage-dark transition-colors flex items-center justify-center gap-2"
        >
          {added ? (
            <>
              <Check className="w-4 h-4" />
              Tillagd
            </>
          ) : (
            "Lägg i varukorg"
          )}
        </button>
      </div>

      {/* Sticky mobile/scroll CTA */}
      <div
        className={`fixed bottom-0 left-0 right-0 z-30 bg-background border-t border-border shadow-[0_-4px_20px_rgba(0,0,0,0.05)] transition-transform duration-300 lg:hidden ${
          scrolled ? "translate-y-0" : "translate-y-full"
        }`}
      >
        <div className="px-4 py-3 flex items-center gap-3">
          <div className="flex-1 min-w-0">
            <p className="text-xs text-muted truncate">{product.name}</p>
            <p className="text-sm font-medium">
              {new Intl.NumberFormat("sv-SE", {
                style: "currency",
                currency: "SEK",
                maximumFractionDigits: 0,
              }).format(product.price)}
            </p>
          </div>
          <button
            onClick={handleAdd}
            className="px-6 py-3 bg-ink text-cream text-xs tracking-[0.15em] uppercase font-medium"
          >
            {added ? "Tillagd ✓" : "Lägg till"}
          </button>
        </div>
      </div>
    </>
  );
}
