import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Truck, ShieldCheck, Sparkles, Star } from "lucide-react";
import { ProductCard } from "@/components/ProductCard";
import { ProductImage } from "@/components/ProductImage";
import { HeroTestimonialCarousel } from "@/components/HeroTestimonialCarousel";
import { HeroProductShowcase } from "@/components/HeroProductShowcase";
import {
  getFeaturedProducts,
  getBestsellers,
  getAwardWinners,
  products,
} from "@/lib/products";
import { popularTreatments } from "@/lib/treatments";
import { ConcernQuiz } from "@/components/ConcernQuiz";
import { TreatmentCard } from "@/components/TreatmentCard";

const concerns = [
  {
    title: "Känslig hud & rosacea",
    description: "Lugnande formler för reaktiv, röd hud",
    href: "/produkter?skinType=rosacea",
    image: "/products/recoup-cream.jpg",
    imageAlt: "Recoup Cream för rosacea",
    gradient: "linear-gradient(135deg, #d8e0d2 0%, #b8c5ad 55%, #8a9b7e 100%)",
    overlay:
      "linear-gradient(180deg, rgba(20,28,18,0) 0%, rgba(20,28,18,0.15) 40%, rgba(20,28,18,0.78) 65%, rgba(15,22,12,0.96) 100%)",
    tag: "Lugnande",
  },
  {
    title: "Pigment & solskador",
    description: "Cosmeceuticals för en jämn hudton",
    href: "/produkter?skinType=pigmentering",
    image: "/products/corrector-serum-vit-c.webp",
    imageAlt: "Corrector Serum för pigment",
    gradient: "linear-gradient(135deg, #f7e9cf 0%, #e6c896 55%, #c69a5a 100%)",
    overlay:
      "linear-gradient(180deg, rgba(35,20,4,0) 0%, rgba(35,20,4,0.15) 40%, rgba(35,20,4,0.8) 65%, rgba(28,15,2,0.96) 100%)",
    tag: "Brightening",
  },
  {
    title: "Akne & orenheter",
    description: "Renar utan att torka ut",
    href: "/produkter?skinType=akne",
    image: "/products/stop-on-spot-gel.jpg",
    imageAlt: "Stop On Spot Gel mot akne",
    gradient: "linear-gradient(135deg, #e3ecef 0%, #b8cdd4 55%, #6f8a92 100%)",
    overlay:
      "linear-gradient(180deg, rgba(10,18,22,0) 0%, rgba(10,18,22,0.15) 40%, rgba(10,18,22,0.8) 65%, rgba(8,14,18,0.96) 100%)",
    tag: "Klargörande",
  },
  {
    title: "Mogen & anti-age",
    description: "Skydd, lyster och förnyelse",
    href: "/produkter?skinType=mogen",
    image: "/products/energising-vit-c-serum.webp",
    imageAlt: "Energising Vitamin C Serum för mogen hud",
    gradient: "linear-gradient(135deg, #f3e1d6 0%, #d9b59c 55%, #a3705a 100%)",
    overlay:
      "linear-gradient(180deg, rgba(25,12,6,0) 0%, rgba(25,12,6,0.15) 40%, rgba(25,12,6,0.8) 65%, rgba(20,10,4,0.96) 100%)",
    tag: "Glow & anti-age",
  },
];

const reviews = [
  {
    name: "Anna L.",
    skinType: "Rosacea",
    text: "Recoup Cream är livsförändrande. Min rodnad har minskat dramatiskt på två veckor.",
    rating: 5,
  },
  {
    name: "Sofia K.",
    skinType: "Mogen hud",
    text: "Energising Vitamin C Serum ger en glow jag inte haft sedan 25-årsåldern. Värt varje krona.",
    rating: 5,
  },
  {
    name: "Mikael S.",
    skinType: "Akne",
    text: "Stop On Spot Gel räddar nätterna. Finnar är borta på morgonen.",
    rating: 5,
  },
  {
    name: "Emma R.",
    skinType: "Torr & känslig",
    text: "Total Calm Cream är så ren och snäll. Äntligen en kräm som inte stickar.",
    rating: 5,
  },
];

export default function HomePage() {
  const featured = getFeaturedProducts();
  const bestsellers = getBestsellers();
  const awards = getAwardWinners();
  const popularBehandlingar = popularTreatments().slice(0, 4);
  const heroProducts = [...featured, ...bestsellers].filter(
    (product, index, list) => list.findIndex((item) => item.id === product.id) === index
  );

  return (
    <>
      {/* HERO */}
      <section className="relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-28">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            <div className="min-w-0 space-y-7">
              <p className="text-[11px] tracking-[0.3em] uppercase text-sage-dark">
                Skandinavisk hudvård · Sedan 2024
              </p>
              <h1 className="font-serif text-5xl sm:text-6xl lg:text-7xl leading-[1.05] font-medium">
                Hud som <em className="not-italic font-serif italic text-sage-dark">andas.</em>
                <br />
                Resultat som <em className="not-italic font-serif italic">syns.</em>
              </h1>
              <p className="text-base lg:text-lg text-muted max-w-md leading-relaxed">
                Kuraterade produkter från Alex Cosmetic, Gilda Liljeblad och Genosys.
                Cosmeceuticals med vetenskaplig precision och nordisk renhet.
              </p>
              <div className="mx-auto grid w-full max-w-md grid-cols-2 gap-2 sm:mx-0 sm:flex sm:max-w-none sm:gap-3">
                <Link
                  href="#hudtyp"
                  className="inline-flex min-w-0 items-center justify-center gap-1.5 border border-ink px-2 py-4 text-[11px] font-medium uppercase tracking-[0.1em] transition-colors hover:bg-ink hover:text-cream sm:flex-none sm:gap-2 sm:px-8 sm:text-sm sm:tracking-[0.15em]"
                >
                  Hitta din rutin
                </Link>
                <Link
                  href="/produkter"
                  className="group inline-flex min-w-0 items-center justify-center gap-1.5 bg-ink px-2 py-4 text-[11px] font-medium uppercase tracking-[0.1em] text-cream transition-colors hover:bg-sage-dark sm:flex-none sm:gap-2 sm:px-8 sm:text-sm sm:tracking-[0.15em]"
                >
                  Webbshoppen
                  <ArrowRight className="h-3.5 w-3.5 shrink-0 transition-transform group-hover:translate-x-1 sm:h-4 sm:w-4" />
                </Link>
              </div>
              <div className="flex items-center gap-1 pt-2">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-ink text-ink" />
                ))}
                <span className="ml-2 text-sm text-muted">
                  4.9 / 5 · 2 400+ recensioner
                </span>
              </div>
              <HeroTestimonialCarousel reviews={reviews} />
            </div>

            <HeroProductShowcase products={heroProducts} treatments={popularBehandlingar} />
          </div>
        </div>

        {/* Trust strip */}
        <div className="border-y border-border bg-cream/40 overflow-hidden">
          <div className="py-5 marquee-mask">
            {(() => {
              const items = [
                { icon: Truck, label: "Fri frakt över 500 kr" },
                { icon: ShieldCheck, label: "Säker betalning" },
                { icon: Sparkles, label: "Gratis prov i ordern" },
                { icon: Star, label: "30 dagars öppet köp" },
                { icon: Truck, label: "Leverans 1–3 vardagar" },
                { icon: ShieldCheck, label: "Klarna & Swish" },
              ];
              return (
                <div
                  className="flex w-max"
                  style={{
                    animation: "marquee-track 28s linear infinite",
                    willChange: "transform",
                  }}
                >
                  {[...items, ...items].map(({ icon: Icon, label }, i) => (
                    <div
                      key={`${label}-${i}`}
                      className="flex shrink-0 items-center gap-2.5 px-6 sm:px-10"
                    >
                      <Icon className="w-4 h-4 text-sage-dark shrink-0" strokeWidth={1.3} />
                      <span className="whitespace-nowrap text-[11px] tracking-[0.15em] uppercase sm:text-xs sm:tracking-wider">
                        {label}
                      </span>
                      <span aria-hidden className="ml-6 sm:ml-10 text-sage-dark/40 select-none">
                        ·
                      </span>
                    </div>
                  ))}
                </div>
              );
            })()}
          </div>
        </div>
      </section>

      {/* TREATMENTS */}
      {popularBehandlingar.length > 0 && (
        <section className="py-20 lg:py-28 bg-cream/40">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-12 gap-4">
              <div>
                <p className="text-[11px] tracking-[0.3em] uppercase text-sage-dark mb-3">
                  I kliniken
                </p>
                <h2 className="font-serif text-4xl lg:text-5xl">
                  Behandlingar hos våra <em className="italic text-sage-dark">terapeuter</em>
                </h2>
                <p className="text-muted mt-4 max-w-xl leading-relaxed">
                  Peelings, microneedling, LED och laser — utförda av certifierade hudterapeuter. Boka direkt via Bokadirekt.
                </p>
              </div>
              <Link
                href="/behandlingar"
                className="inline-flex items-center gap-2 text-sm tracking-[0.15em] uppercase hover:text-sage-dark transition-colors"
              >
                Se alla behandlingar
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
              {popularBehandlingar.map((t) => (
                <TreatmentCard key={t.id} treatment={t} />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* CONCERN GRID */}
      <section id="hudtyp" className="py-20 lg:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <p className="text-[11px] tracking-[0.3em] uppercase text-sage-dark mb-4">
              Hitta din rutin
            </p>
            <h2 className="font-serif text-4xl lg:text-5xl mb-4">
              Vad behöver din hud idag?
            </h2>
            <p className="text-muted">
              Välj din primära hudangelägenhet — vi visar dig de produkter som verkligen funkar.
            </p>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
            {concerns.map((concern) => (
              <Link
                key={concern.title}
                href={concern.href}
                className="group relative aspect-[3/4] overflow-hidden shadow-sm hover:shadow-xl transition-shadow"
                style={{ background: concern.gradient }}
              >
                <div className="absolute inset-0 opacity-90 mix-blend-luminosity group-hover:opacity-100 group-hover:mix-blend-normal transition-[opacity,mix-blend-mode] duration-500">
                  <Image
                    src={concern.image}
                    alt={concern.imageAlt}
                    fill
                    sizes="(max-width: 1024px) 50vw, 25vw"
                    className="object-contain object-top scale-90 -translate-y-2 transition-transform duration-700 group-hover:scale-95"
                  />
                </div>
                <div
                  className="absolute inset-0 pointer-events-none"
                  style={{ background: concern.overlay }}
                />
                <span className="absolute top-4 left-4 inline-flex items-center bg-cream/90 backdrop-blur px-2.5 py-1 text-[10px] tracking-[0.15em] uppercase font-medium text-ink">
                  {concern.tag}
                </span>
                <div className="absolute bottom-0 left-0 right-0 p-5 lg:p-6 text-cream [text-shadow:0_1px_8px_rgba(0,0,0,0.45)]">
                  <h3 className="font-serif text-xl lg:text-2xl mb-1.5 leading-tight">{concern.title}</h3>
                  <p className="text-xs lg:text-sm text-cream/90 mb-3 leading-snug">{concern.description}</p>
                  <div className="flex items-center text-[11px] tracking-[0.15em] uppercase font-medium">
                    Utforska
                    <ArrowRight className="w-3.5 h-3.5 ml-1.5 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* BESTSELLERS */}
      <section className="py-20 lg:py-28 bg-cream/40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-12 gap-4">
            <div>
              <p className="text-[11px] tracking-[0.3em] uppercase text-sage-dark mb-3">
                Mest älskade
              </p>
              <h2 className="font-serif text-4xl lg:text-5xl">Bestsellers</h2>
            </div>
            <Link
              href="/produkter"
              className="inline-flex items-center gap-2 text-sm tracking-[0.15em] uppercase hover:text-sage-dark transition-colors"
            >
              Se alla
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
          <div className="relative">
            <div className="pointer-events-none absolute right-0 top-24 z-10 flex h-10 w-10 items-center justify-center rounded-full bg-ink text-cream shadow-lg lg:hidden">
              <ArrowRight className="h-4 w-4" />
            </div>
            <div className="-mx-4 flex snap-x snap-mandatory gap-4 overflow-x-auto px-4 pb-2 scrollbar-hide lg:mx-0 lg:grid lg:grid-cols-4 lg:gap-x-6 lg:gap-y-12 lg:overflow-visible lg:px-0 lg:pb-0">
              {bestsellers.slice(0, 4).map((p) => (
                <div
                  key={p.id}
                  className="min-w-[calc((100%-1rem)/2)] snap-start lg:min-w-0"
                >
                  <ProductCard product={p} />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* AWARD WINNERS */}
      {awards.length > 0 && (
        <section className="py-20 lg:py-28">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
              <div className="order-2 lg:order-1 grid grid-cols-2 gap-4">
                {awards.slice(0, 2).map((p) => (
                  <ProductCard key={p.id} product={p} />
                ))}
              </div>
              <div className="order-1 lg:order-2 lg:pl-12">
                <p className="text-[11px] tracking-[0.3em] uppercase text-sage-dark mb-4">
                  Award Winners 2023
                </p>
                <h2 className="font-serif text-4xl lg:text-5xl mb-6">
                  Prisbelönt av <em className="italic">Global Makeup Awards</em>
                </h2>
                <p className="text-muted mb-8 leading-relaxed">
                  Gilda Liljeblads Activating AHA Toner och Regenerating AHA Mask vann
                  silver respektive guld i Global Makeup Awards Scandinavia 2023.
                  Skandinavisk minimalism möter klinisk precision.
                </p>
                <Link
                  href="/produkter?brand=Gilda%20Liljeblad"
                  className="inline-flex items-center gap-2 px-8 py-4 border border-ink text-sm tracking-[0.15em] uppercase font-medium hover:bg-ink hover:text-cream transition-colors"
                >
                  Upptäck Gilda Liljeblad
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* REVIEWS */}
      <section className="overflow-hidden py-20 lg:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <p className="text-[11px] tracking-[0.3em] uppercase text-sage-dark mb-4">
              Kundröster
            </p>
            <h2 className="font-serif text-4xl lg:text-5xl">
              Riktiga resultat. <em className="italic text-sage-dark">Riktig hud.</em>
            </h2>
          </div>

          <div className="marquee-mask -mx-4 overflow-hidden sm:-mx-6 lg:-mx-8">
            <div className="reviews-marquee-track flex w-max gap-4 px-4 sm:gap-6 sm:px-6 lg:px-8">
              {[...reviews, ...reviews].map((r, index) => (
                <article
                  key={`${r.name}-${index}`}
                  className="w-[82vw] max-w-sm shrink-0 border border-border bg-background p-6 shadow-sm sm:w-[25rem] lg:w-[28rem]"
                >
                  <div className="mb-5 flex gap-0.5">
                    {[...Array(r.rating)].map((_, i) => (
                      <Star key={i} className="h-3.5 w-3.5 fill-ink text-ink" />
                    ))}
                  </div>
                  <p className="mb-7 font-serif text-xl leading-snug italic">
                    &ldquo;{r.text}&rdquo;
                  </p>
                  <div className="border-t border-border pt-4">
                    <p className="text-sm font-medium">{r.name}</p>
                    <p className="mt-1 text-[11px] tracking-[0.15em] uppercase text-muted">
                      {r.skinType}
                    </p>
                  </div>
                </article>
              ))}
            </div>
          </div>

          <div className="mt-8 flex items-center justify-center gap-3 text-[11px] tracking-[0.18em] uppercase text-muted">
            <span>Fler röster</span>
            <ArrowRight className="h-3.5 w-3.5" />
          </div>
        </div>
      </section>

      {/* QUIZ WIDGET */}
      <ConcernQuiz />

      {/* FEATURED EDITORIAL */}
      <section className="py-20 lg:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-5">
              <p className="text-[11px] tracking-[0.3em] uppercase text-sage-dark mb-4">
                Editor&apos;s pick
              </p>
              <h2 className="font-serif text-4xl lg:text-5xl mb-6 leading-[1.1]">
                Den kompletta rutinen för {products.length} unika hudbehov
              </h2>
              <p className="text-muted mb-8 leading-relaxed">
                Från cosmeceuticals för pigment till multifunktionella oljor — vår katalog är
                kuraterad av estetiker, dermatologer och makeup-artister med över 20 års erfarenhet.
                Inga fyllnadsmedel. Inga kompromisser.
              </p>
              <Link
                href="/produkter"
                className="group inline-flex items-center gap-2 text-sm tracking-[0.15em] uppercase font-medium hover:text-sage-dark transition-colors"
              >
                <span className="border-b border-ink group-hover:border-sage-dark pb-1">
                  Utforska hela katalogen
                </span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
            <div className="lg:col-span-7 grid grid-cols-3 gap-3">
              {featured.slice(0, 3).map((p) => (
                <Link
                  key={p.id}
                  href={`/produkter/${p.slug}`}
                  className="aspect-[3/4] bg-cream group overflow-hidden"
                >
                  <ProductImage
                    name={p.name}
                    brand={p.brand}
                    imageUrl={p.imageUrl}
                    className="w-full h-full transition-transform duration-700 group-hover:scale-105"
                    sizes="(max-width: 1024px) 33vw, 25vw"
                  />
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
