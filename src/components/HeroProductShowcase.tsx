"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { ArrowRight, ShoppingBag, Sparkles } from "lucide-react";
import type { Product } from "@/lib/products";
import type { Treatment } from "@/lib/treatments";
import { ProductImage } from "./ProductImage";

type HeroProductShowcaseProps = {
  products: Product[];
  treatments: Treatment[];
};

export function HeroProductShowcase({ products, treatments }: HeroProductShowcaseProps) {
  const [activeIndex, setActiveIndex] = useState(0);

  const maxRotation = Math.max(products.length, treatments.length);

  useEffect(() => {
    if (maxRotation <= 2) {
      return;
    }

    const interval = window.setInterval(() => {
      setActiveIndex((current) => (current + 1) % maxRotation);
    }, 4200);

    return () => window.clearInterval(interval);
  }, [maxRotation]);

  if (products.length === 0 || treatments.length === 0) {
    return null;
  }

  const primary = products[activeIndex % products.length];
  const secondary = products[(activeIndex + 1) % products.length] ?? primary;
  const treatmentTop = treatments[activeIndex % treatments.length];
  const treatmentBottom =
    treatments[(activeIndex + 1) % treatments.length] ?? treatmentTop;

  return (
    <div className="relative">
      <div className="grid grid-cols-2 gap-3">
        <div className="space-y-3">
          <ProductTile key={`primary-${primary.id}`} product={primary} imagePriority />
          <TreatmentTile
            key={`treatment-bottom-${treatmentBottom.id}`}
            treatment={treatmentBottom}
            variant="beige"
          />
        </div>
        <div className="space-y-3 pt-12">
          <TreatmentTile
            key={`treatment-top-${treatmentTop.id}`}
            treatment={treatmentTop}
            variant="sage"
          />
          <ProductTile key={`secondary-${secondary.id}`} product={secondary} />
        </div>
      </div>
    </div>
  );
}

function ProductTile({
  product,
  imagePriority,
}: {
  product: Product;
  imagePriority?: boolean;
}) {
  return (
    <Link
      key={product.id}
      href={`/produkter/${product.slug}`}
      aria-label={`Köp ${product.name}`}
      className="group relative block aspect-[3/4] overflow-hidden bg-cream animate-hero-tile-in"
    >
      <ProductImage
        name={product.name}
        brand={product.brand}
        imageUrl={product.imageUrl}
        className="h-full w-full transition-transform duration-700 group-hover:scale-105"
        sizes="(max-width: 1024px) 50vw, 25vw"
        priority={imagePriority}
      />
      <div className="absolute inset-x-0 bottom-0 flex items-center justify-between bg-background/92 px-3 py-2 text-[10px] font-medium uppercase tracking-[0.14em] opacity-100 backdrop-blur-sm transition-colors group-hover:bg-ink group-hover:text-cream">
        <span className="truncate">{product.name}</span>
        <span className="ml-2 inline-flex shrink-0 items-center gap-1">
          Köp
          <ShoppingBag className="h-3 w-3" strokeWidth={1.5} />
        </span>
      </div>
    </Link>
  );
}

function TreatmentTile({
  treatment,
  variant,
}: {
  treatment: Treatment;
  variant: "sage" | "beige";
}) {
  const bg = variant === "sage" ? "bg-sage-light/30" : "bg-beige";
  const placeholderGradient =
    variant === "sage"
      ? "linear-gradient(135deg, #d8e0d2 0%, #b8c5ad 55%, #8a9b7e 100%)"
      : "linear-gradient(135deg, #f3e1d6 0%, #d9b59c 55%, #a3705a 100%)";
  return (
    <Link
      href="/behandlingar"
      aria-label={`Boka ${treatment.name}`}
      className={`group flex aspect-square animate-hero-tile-in flex-col overflow-hidden text-left ${bg} transition-colors hover:bg-ink hover:text-cream`}
    >
      <div
        className="relative flex h-1/2 items-center justify-center overflow-hidden"
        style={{ background: placeholderGradient }}
        aria-hidden
      >
        <Sparkles
          className="h-7 w-7 text-cream/80 transition-transform duration-500 group-hover:scale-110"
          strokeWidth={1.1}
        />
        <span className="absolute bottom-2 left-3 text-[9px] uppercase tracking-[0.2em] text-cream/70">
          Bild kommer
        </span>
      </div>
      <div className="flex flex-1 flex-col justify-between p-4">
        <div className="flex items-center justify-between gap-2">
          <span className="inline-flex items-center gap-1 whitespace-nowrap text-[10px] uppercase tracking-[0.12em] text-sage-dark group-hover:text-cream/80">
            <Sparkles className="h-3 w-3 shrink-0" strokeWidth={1.4} />
            Behandling
          </span>
          {treatment.duration && (
            <span className="whitespace-nowrap text-[10px] uppercase tracking-[0.1em] text-muted group-hover:text-cream/70">
              {treatment.duration}
            </span>
          )}
        </div>
        <p className="font-serif text-base leading-tight line-clamp-2">{treatment.name}</p>
        <div className="flex items-end justify-between gap-2">
          <span className="font-serif text-sm leading-none">
            {treatment.price === 0
              ? "Kostnadsfri"
              : `${treatment.price.toLocaleString("sv-SE")} kr`}
          </span>
          <span className="inline-flex items-center gap-1 text-[10px] uppercase tracking-[0.15em] font-medium">
            Boka
            <ArrowRight className="h-3 w-3 transition-transform group-hover:translate-x-0.5" />
          </span>
        </div>
      </div>
    </Link>
  );
}
