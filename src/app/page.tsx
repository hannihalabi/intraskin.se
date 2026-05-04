import Link from "next/link";
import { ArrowRight, Truck, ShieldCheck, Sparkles, Star } from "lucide-react";
import { ProductCard } from "@/components/ProductCard";
import { ProductImage } from "@/components/ProductImage";
import {
  getFeaturedProducts,
  getBestsellers,
  getAwardWinners,
  products,
} from "@/lib/products";
import { ConcernQuiz } from "@/components/ConcernQuiz";

const concerns = [
  {
    title: "Känslig hud & rosacea",
    description: "Lugnande formler för reaktiv, röd hud",
    href: "/produkter?skinType=rosacea",
    image: "Recoup",
    accent: "#e8dfd1",
  },
  {
    title: "Pigment & solskador",
    description: "Cosmeceuticals för en jämn hudton",
    href: "/produkter?skinType=pigmentering",
    image: "Corrector",
    accent: "#f0ebe2",
  },
  {
    title: "Akne & orenheter",
    description: "Renar utan att torka ut",
    href: "/produkter?skinType=akne",
    image: "Clear",
    accent: "#ede7dd",
  },
  {
    title: "Mogen & anti-age",
    description: "Skydd, lyster och förnyelse",
    href: "/produkter?skinType=mogen",
    image: "Glow",
    accent: "#e0d6c6",
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

  return (
    <>
      {/* HERO */}
      <section className="relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-28">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            <div className="space-y-7">
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
              <div className="flex flex-wrap gap-3">
                <Link
                  href="/produkter"
                  className="group inline-flex items-center gap-2 px-8 py-4 bg-ink text-cream text-sm tracking-[0.15em] uppercase font-medium hover:bg-sage-dark transition-colors"
                >
                  Utforska alla
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Link>
                <Link
                  href="#hudtyp"
                  className="inline-flex items-center gap-2 px-8 py-4 border border-ink text-sm tracking-[0.15em] uppercase font-medium hover:bg-ink hover:text-cream transition-colors"
                >
                  Hitta din rutin
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
            </div>

            <div className="relative">
              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-3">
                  <div className="aspect-[3/4] bg-cream">
                    <ProductImage
                      name={featured[0]?.name ?? "Featured"}
                      brand={featured[0]?.brand ?? "Alex Cosmetic"}
                      imageUrl={featured[0]?.imageUrl}
                      className="w-full h-full"
                      sizes="(max-width: 1024px) 50vw, 25vw"
                      priority
                    />
                  </div>
                  <div className="aspect-square bg-beige flex flex-col items-center justify-center p-6 text-center">
                    <Sparkles className="w-6 h-6 mb-2 text-sage-dark" strokeWidth={1.2} />
                    <p className="font-serif text-lg leading-tight">Award<br />Winner</p>
                    <p className="text-[10px] tracking-[0.15em] uppercase text-muted mt-1">2023</p>
                  </div>
                </div>
                <div className="space-y-3 pt-12">
                  <div className="aspect-square bg-sage-light/30 flex items-center justify-center">
                    <p className="font-serif text-2xl text-center px-4">
                      <em className="italic">Glow</em><br />redefined
                    </p>
                  </div>
                  <div className="aspect-[3/4] bg-cream">
                    <ProductImage
                      name={featured[1]?.name ?? "Featured"}
                      brand={featured[1]?.brand ?? "Alex Cosmetic"}
                      imageUrl={featured[1]?.imageUrl}
                      className="w-full h-full"
                      sizes="(max-width: 1024px) 50vw, 25vw"
                      priority
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Trust strip */}
        <div className="border-y border-border bg-cream/40">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5">
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 text-center">
              {[
                { icon: Truck, label: "Fri frakt över 500 kr" },
                { icon: ShieldCheck, label: "Säker betalning" },
                { icon: Sparkles, label: "Gratis prov i ordern" },
                { icon: Star, label: "30 dagars öppet köp" },
              ].map(({ icon: Icon, label }) => (
                <div key={label} className="flex items-center justify-center gap-2.5 text-xs tracking-wider uppercase">
                  <Icon className="w-4 h-4 text-sage-dark" strokeWidth={1.3} />
                  <span>{label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

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
                className="group relative aspect-[3/4] overflow-hidden"
                style={{ background: concern.accent }}
              >
                <div className="absolute inset-0 flex items-center justify-center opacity-50 group-hover:opacity-70 transition-opacity">
                  <ProductImage name={concern.image} brand="Alex Cosmetic" className="w-3/4 h-3/4" />
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-ink/70 via-transparent to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-5 lg:p-6 text-cream">
                  <h3 className="font-serif text-xl lg:text-2xl mb-1">{concern.title}</h3>
                  <p className="text-xs lg:text-sm opacity-90 mb-3">{concern.description}</p>
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
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-x-4 gap-y-10 lg:gap-x-6 lg:gap-y-12">
            {bestsellers.slice(0, 4).map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </div>
      </section>

      {/* QUIZ WIDGET */}
      <ConcernQuiz />

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
      <section className="py-20 lg:py-28 bg-ink text-cream">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <p className="text-[11px] tracking-[0.3em] uppercase text-sage-light mb-4">
              Kundröster
            </p>
            <h2 className="font-serif text-4xl lg:text-5xl">
              Riktiga resultat. <em className="italic opacity-80">Riktig hud.</em>
            </h2>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {reviews.map((r) => (
              <div key={r.name} className="border-t border-cream/20 pt-6">
                <div className="flex gap-0.5 mb-4">
                  {[...Array(r.rating)].map((_, i) => (
                    <Star key={i} className="w-3.5 h-3.5 fill-cream text-cream" />
                  ))}
                </div>
                <p className="font-serif text-lg leading-snug mb-6 italic">
                  &ldquo;{r.text}&rdquo;
                </p>
                <p className="text-sm font-medium">{r.name}</p>
                <p className="text-[11px] tracking-[0.15em] uppercase text-cream/60 mt-1">
                  {r.skinType}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

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
