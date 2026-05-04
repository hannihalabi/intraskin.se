"use client";

import Link from "next/link";
import { Plus } from "lucide-react";
import type { Product } from "@/lib/products";
import { useCart } from "@/lib/store";
import { formatPrice } from "@/lib/utils";
import { ProductImage } from "./ProductImage";

export function ProductCard({ product }: { product: Product }) {
  const addItem = useCart((s) => s.addItem);

  return (
    <article className="group relative">
      <Link href={`/produkter/${product.slug}`} className="block">
        <div className="relative aspect-[4/5] mb-4 overflow-hidden">
          <ProductImage
            name={product.name}
            brand={product.brand}
            imageUrl={product.imageUrl}
            className="w-full h-full transition-transform duration-700 group-hover:scale-105"
            sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
          />
          {product.badges && product.badges.length > 0 && (
            <div className="absolute top-3 left-3 flex flex-col gap-1.5">
              {product.badges.slice(0, 2).map((badge) => (
                <span
                  key={badge}
                  className="text-[10px] tracking-[0.15em] uppercase bg-background/90 backdrop-blur-sm px-2.5 py-1 font-medium"
                >
                  {badge}
                </span>
              ))}
            </div>
          )}
          {product.bestseller && (
            <span className="absolute top-3 right-3 text-[10px] tracking-[0.15em] uppercase bg-ink text-cream px-2.5 py-1 font-medium">
              Bestseller
            </span>
          )}
          <button
            onClick={(e) => {
              e.preventDefault();
              addItem(product);
            }}
            aria-label="Lägg till i varukorg"
            className="absolute bottom-3 right-3 w-10 h-10 bg-ink text-cream rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all duration-300 hover:bg-sage-dark"
          >
            <Plus className="w-4 h-4" strokeWidth={1.5} />
          </button>
        </div>
        <div className="space-y-1">
          <p className="text-[10px] tracking-[0.15em] uppercase text-muted">{product.brand}</p>
          <h3 className="font-serif text-base lg:text-lg leading-snug group-hover:text-sage-dark transition-colors">
            {product.name}
          </h3>
          <p className="text-xs text-muted line-clamp-1">{product.tagline}</p>
          <div className="flex items-baseline justify-between pt-2">
            <span className="text-sm font-medium">{formatPrice(product.price)}</span>
            <span className="text-xs text-muted">{product.size}</span>
          </div>
        </div>
      </Link>
    </article>
  );
}
