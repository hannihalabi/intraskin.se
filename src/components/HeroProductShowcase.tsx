"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { ShoppingBag, Sparkles } from "lucide-react";
import type { Product } from "@/lib/products";
import { ProductImage } from "./ProductImage";

type HeroProductShowcaseProps = {
  products: Product[];
};

const editorialSlides = [
  {
    kicker: "Glow",
    line: "redefined",
    badge: "Editor's pick",
    year: "2024",
  },
  {
    kicker: "Calm",
    line: "restored",
    badge: "Hudterapeutens val",
    year: "2024",
  },
  {
    kicker: "Barrier",
    line: "first",
    badge: "Award Winner",
    year: "2023",
  },
  {
    kicker: "Daily",
    line: "ritual",
    badge: "Bestseller",
    year: "2024",
  },
];

export function HeroProductShowcase({ products }: HeroProductShowcaseProps) {
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    if (products.length <= 2) {
      return;
    }

    const interval = window.setInterval(() => {
      setActiveIndex((current) => (current + 1) % products.length);
    }, 4200);

    return () => window.clearInterval(interval);
  }, [products.length]);

  if (products.length === 0) {
    return null;
  }

  const primary = products[activeIndex % products.length];
  const secondary = products[(activeIndex + 1) % products.length] ?? primary;
  const editorial = editorialSlides[activeIndex % editorialSlides.length];

  return (
    <div className="relative">
      <div className="grid grid-cols-2 gap-3">
        <div className="space-y-3">
          <ProductTile key={`primary-${primary.id}`} product={primary} imagePriority />
          <EditorialTile
            key={`badge-${activeIndex}`}
            badge={editorial.badge}
            year={editorial.year}
          />
        </div>
        <div className="space-y-3 pt-12">
          <TextTile key={`text-${activeIndex}`} kicker={editorial.kicker} line={editorial.line} />
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

function TextTile({ kicker, line }: { kicker: string; line: string }) {
  return (
    <div className="flex aspect-square animate-hero-tile-in items-center justify-center bg-sage-light/30 p-6 text-center">
      <p className="font-serif text-2xl leading-tight">
        <em className="italic">{kicker}</em>
        <br />
        {line}
      </p>
    </div>
  );
}

function EditorialTile({
  badge,
  year,
}: {
  badge: string;
  year: string;
}) {
  return (
    <div className="flex aspect-square animate-hero-tile-in flex-col items-center justify-center bg-beige p-6 text-center">
      <Sparkles className="mb-2 h-6 w-6 text-sage-dark" strokeWidth={1.2} />
      <p className="font-serif text-lg leading-tight">
        {badge.split(" ").map((word) => (
          <span key={word}>
            {word}
            <br />
          </span>
        ))}
      </p>
      <p className="mt-1 text-[10px] uppercase tracking-[0.15em] text-muted">{year}</p>
    </div>
  );
}
