import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { Truck, ShieldCheck, Sparkles, ChevronRight, Star } from "lucide-react";
import { products, getProduct, getRelatedProducts, skinTypeLabels } from "@/lib/products";
import { ProductCard } from "@/components/ProductCard";
import { ProductImage } from "@/components/ProductImage";
import { AddToCartButton } from "@/components/AddToCartButton";
import { ProductAccordion } from "@/components/ProductAccordion";
import { formatPrice } from "@/lib/utils";

interface Params {
  slug: string;
}

export async function generateStaticParams() {
  return products.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const { slug } = await params;
  const product = getProduct(slug);
  if (!product) return { title: "Produkt hittades inte" };

  return {
    title: `${product.name} — ${product.brand}`,
    description: `${product.tagline}. ${product.description.slice(0, 140)}...`,
    openGraph: {
      title: `${product.name} — ${product.brand}`,
      description: product.tagline,
      ...(product.imageUrl ? { images: [{ url: product.imageUrl }] } : {}),
    },
  };
}

export default async function ProductPage({
  params,
}: {
  params: Promise<Params>;
}) {
  const { slug } = await params;
  const product = getProduct(slug);
  if (!product) notFound();

  const related = getRelatedProducts(product, 4);
  const ftbProducts = related.slice(0, 2);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.name,
    brand: { "@type": "Brand", name: product.brand },
    description: product.description,
    sku: product.id,
    ...(product.imageUrl ? { image: product.imageUrl } : {}),
    offers: {
      "@type": "Offer",
      price: product.price,
      priceCurrency: "SEK",
      availability: "https://schema.org/InStock",
      url: `https://intraskin.se/produkter/${product.slug}`,
    },
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: 4.9,
      reviewCount: 128,
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 lg:py-10">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-xs text-muted mb-8">
          <Link href="/" className="hover:text-ink transition-colors">Hem</Link>
          <ChevronRight className="w-3 h-3" />
          <Link href="/produkter" className="hover:text-ink transition-colors">Produkter</Link>
          <ChevronRight className="w-3 h-3" />
          <Link
            href={`/produkter?category=${encodeURIComponent(product.category)}`}
            className="hover:text-ink transition-colors"
          >
            {product.category}
          </Link>
          <ChevronRight className="w-3 h-3" />
          <span className="text-ink">{product.name}</span>
        </nav>

        <div className="grid lg:grid-cols-2 gap-8 lg:gap-16">
          {/* Image */}
          <div className="lg:sticky lg:top-28 lg:self-start">
            <div className="aspect-square lg:aspect-[4/5] bg-cream">
              <ProductImage
                name={product.name}
                brand={product.brand}
                imageUrl={product.imageUrl}
                className="w-full h-full"
                sizes="(max-width: 1024px) 100vw, 50vw"
                priority
              />
            </div>
            <div className="grid grid-cols-4 gap-2 mt-3">
              {[0, 1, 2, 3].map((i) => (
                <button
                  key={i}
                  className="aspect-square bg-cream/60 hover:bg-cream transition-colors border border-transparent hover:border-ink"
                >
                  <ProductImage
                    name={product.name}
                    brand={product.brand}
                    imageUrl={product.imageUrl}
                    className="w-full h-full"
                    sizes="120px"
                  />
                </button>
              ))}
            </div>
          </div>

          {/* Details */}
          <div className="lg:py-4">
            <p className="text-[11px] tracking-[0.3em] uppercase text-sage-dark mb-3">
              {product.brand}
            </p>
            <h1 className="font-serif text-4xl lg:text-5xl mb-4 leading-tight">
              {product.name}
            </h1>
            <p className="text-lg text-muted mb-6 leading-relaxed">{product.tagline}</p>

            <div className="flex items-center gap-3 mb-6">
              <div className="flex items-center gap-0.5">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-3.5 h-3.5 fill-ink text-ink" />
                ))}
              </div>
              <span className="text-sm text-muted">4.9 (128 recensioner)</span>
            </div>

            <div className="flex items-baseline gap-3 mb-6">
              <span className="font-serif text-3xl">{formatPrice(product.price)}</span>
              <span className="text-sm text-muted">{product.size}</span>
            </div>

            {product.badges && (
              <div className="flex flex-wrap gap-2 mb-6">
                {product.badges.map((b) => (
                  <span
                    key={b}
                    className="text-[10px] tracking-[0.15em] uppercase bg-cream px-3 py-1.5 font-medium"
                  >
                    {b}
                  </span>
                ))}
              </div>
            )}

            <p className="text-base leading-relaxed mb-8 text-foreground/80">
              {product.description}
            </p>

            {/* Skin types */}
            <div className="mb-8">
              <p className="text-xs tracking-[0.15em] uppercase text-muted mb-2">
                Passar
              </p>
              <div className="flex flex-wrap gap-1.5">
                {product.skinType.map((s) => (
                  <Link
                    key={s}
                    href={`/produkter?skinType=${s}`}
                    className="text-xs px-3 py-1.5 border border-border hover:border-ink transition-colors"
                  >
                    {skinTypeLabels[s]}
                  </Link>
                ))}
              </div>
            </div>

            <AddToCartButton product={product} />

            {/* Trust badges */}
            <div className="grid grid-cols-3 gap-3 mt-8 pt-8 border-t border-border">
              {[
                { icon: Truck, label: "Fri frakt", sub: "över 500 kr" },
                { icon: ShieldCheck, label: "30 dagar", sub: "öppet köp" },
                { icon: Sparkles, label: "Gratis prov", sub: "i ordern" },
              ].map(({ icon: Icon, label, sub }) => (
                <div key={label} className="text-center">
                  <Icon className="w-5 h-5 mx-auto mb-2 text-sage-dark" strokeWidth={1.3} />
                  <p className="text-xs font-medium">{label}</p>
                  <p className="text-[11px] text-muted">{sub}</p>
                </div>
              ))}
            </div>

            {/* Accordions */}
            <div className="mt-10 border-t border-border">
              <ProductAccordion
                items={[
                  {
                    title: "Användning",
                    content: <p className="leading-relaxed">{product.usage}</p>,
                  },
                  {
                    title: "Huvudingredienser",
                    content: (
                      <ul className="space-y-1.5">
                        {product.keyIngredients.map((ing) => (
                          <li key={ing} className="flex items-start gap-2 text-sm">
                            <span className="text-sage-dark mt-1.5 inline-block w-1 h-1 rounded-full bg-sage-dark flex-shrink-0" />
                            {ing}
                          </li>
                        ))}
                      </ul>
                    ),
                  },
                  {
                    title: "Frakt & retur",
                    content: (
                      <div className="space-y-3 text-sm leading-relaxed">
                        <p>Fri frakt på order över 500 kr. Levereras inom 1-3 arbetsdagar.</p>
                        <p>30 dagars öppet köp på oöppnade produkter. Säker betalning via Klarna.</p>
                      </div>
                    ),
                  },
                ]}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Frequently bought together */}
      {ftbProducts.length > 0 && (
        <section className="bg-cream/40 py-16 lg:py-24 mt-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <p className="text-[11px] tracking-[0.3em] uppercase text-sage-dark mb-3 text-center">
              Köps ofta tillsammans
            </p>
            <h2 className="font-serif text-3xl lg:text-4xl text-center mb-12">
              Komplettera din rutin
            </h2>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 lg:gap-8 items-stretch">
              <div className="bg-background p-6 flex flex-col items-center text-center border border-border">
                <ProductImage
                  name={product.name}
                  brand={product.brand}
                  imageUrl={product.imageUrl}
                  className="w-full aspect-square max-w-[200px] mb-4"
                  sizes="200px"
                />
                <p className="font-serif text-base">{product.name}</p>
                <p className="text-sm text-muted">{formatPrice(product.price)}</p>
              </div>
              {ftbProducts.map((p) => (
                <div
                  key={p.id}
                  className="bg-background p-6 flex flex-col items-center text-center border border-border"
                >
                  <ProductImage
                    name={p.name}
                    brand={p.brand}
                    imageUrl={p.imageUrl}
                    className="w-full aspect-square max-w-[200px] mb-4"
                    sizes="200px"
                  />
                  <Link
                    href={`/produkter/${p.slug}`}
                    className="font-serif text-base hover:text-sage-dark transition-colors"
                  >
                    {p.name}
                  </Link>
                  <p className="text-sm text-muted">{formatPrice(p.price)}</p>
                </div>
              ))}
            </div>
            <div className="text-center mt-10">
              <p className="text-sm text-muted mb-3">
                Total bundle:{" "}
                <span className="font-medium text-ink">
                  {formatPrice(
                    product.price + ftbProducts.reduce((sum, p) => sum + p.price, 0)
                  )}
                </span>
              </p>
            </div>
          </div>
        </section>
      )}

      {/* Related */}
      {related.length > 0 && (
        <section className="py-16 lg:py-24">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="font-serif text-3xl lg:text-4xl mb-12 text-center">
              Du kanske också gillar
            </h2>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-x-4 gap-y-10 lg:gap-x-6 lg:gap-y-12">
              {related.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          </div>
        </section>
      )}
    </>
  );
}
