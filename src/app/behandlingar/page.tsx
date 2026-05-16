import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, ExternalLink, Sparkles } from "lucide-react";
import {
  treatmentCategories,
  treatments,
  treatmentsByCategory,
  popularTreatments,
  bookingUrl,
  BOKADIREKT_BASE_URL,
  type Treatment,
} from "@/lib/treatments";
import { TreatmentCard } from "@/components/TreatmentCard";

export const metadata: Metadata = {
  title: "Behandlingar — boka tid hos Intraskin",
  description:
    "Boka peelings, microneedling, permanent hårborttagning, LED-ljusterapi och mer hos våra certifierade hudterapeuter. Se priser och boka direkt.",
};

function CompactTreatmentRow({ treatment }: { treatment: Treatment }) {
  return (
    <a
      href={bookingUrl(treatment)}
      target="_blank"
      rel="noopener noreferrer"
      className="group flex items-center justify-between gap-4 py-4 px-2 border-b border-border hover:bg-cream/50 transition-colors"
    >
      <div className="flex items-center gap-3 min-w-0">
        <span className="font-serif text-base lg:text-lg leading-tight truncate">
          {treatment.name}
        </span>
        {treatment.popular && (
          <Sparkles className="w-3.5 h-3.5 text-sage-dark shrink-0" strokeWidth={1.5} />
        )}
      </div>
      <div className="flex items-center gap-4 shrink-0">
        <span className="font-serif text-base lg:text-lg text-ink">
          {treatment.price.toLocaleString("sv-SE")}{" "}
          <span className="text-xs text-muted tracking-wider">kr</span>
        </span>
        <ArrowRight className="w-4 h-4 text-muted group-hover:translate-x-1 group-hover:text-ink transition-all" />
      </div>
    </a>
  );
}

function CompactArea({
  area,
  items,
}: {
  area: string;
  items: Treatment[];
}) {
  return (
    <div>
      <h3 className="text-[11px] tracking-[0.25em] uppercase text-sage-dark mb-2 pt-6 border-t border-ink/10">
        {area}
      </h3>
      <div className="divide-y divide-border">
        {items.map((t) => (
          <CompactTreatmentRow key={t.id} treatment={t} />
        ))}
      </div>
    </div>
  );
}

export default function TreatmentsPage() {
  const popular = popularTreatments().slice(0, 4);

  return (
    <>
      {/* HERO */}
      <section className="relative bg-cream/40 border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24">
          <div className="grid lg:grid-cols-12 gap-10 items-end">
            <div className="lg:col-span-7">
              <p className="text-[11px] tracking-[0.3em] uppercase text-sage-dark mb-5">
                Behandlingar · Boka direkt
              </p>
              <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl leading-[1.05] mb-6">
                Klinisk hudvård utförd av{" "}
                <em className="italic">certifierade terapeuter</em>
              </h1>
              <p className="text-base lg:text-lg text-muted max-w-xl leading-relaxed mb-8">
                Cosmeceuticals, microneedling, peelings och permanent
                hårborttagning. Välj behandling nedan så öppnas vår bokning hos
                Bokadirekt — säker betalning, sms-påminnelser och 24h
                avbokning.
              </p>
              <div className="flex flex-wrap items-center gap-3">
                <a
                  href={BOKADIREKT_BASE_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-8 py-4 bg-ink text-cream text-sm tracking-[0.15em] uppercase font-medium hover:bg-sage-dark transition-colors"
                >
                  Boka direkt
                  <ExternalLink className="w-4 h-4" />
                </a>
                <Link
                  href="#kategorier"
                  className="inline-flex items-center gap-2 px-8 py-4 border border-ink text-sm tracking-[0.15em] uppercase font-medium hover:bg-ink hover:text-cream transition-colors"
                >
                  Se alla behandlingar
                </Link>
              </div>
            </div>
            <div className="lg:col-span-5">
              <dl className="grid grid-cols-3 divide-x divide-border border-y border-border py-5 max-w-md lg:ml-auto">
                <div className="px-3 text-center">
                  <dt className="font-serif text-2xl lg:text-3xl leading-none">{treatments.length}+</dt>
                  <dd className="mt-2 text-[10px] tracking-[0.22em] uppercase text-muted">
                    Behandlingar
                  </dd>
                </div>
                <div className="px-3 text-center">
                  <dt className="font-serif text-2xl lg:text-3xl leading-none">{treatmentCategories.length}</dt>
                  <dd className="mt-2 text-[10px] tracking-[0.22em] uppercase text-muted">
                    Kategorier
                  </dd>
                </div>
                <div className="px-3 text-center">
                  <dt className="font-serif text-2xl lg:text-3xl leading-none italic">
                    24h
                  </dt>
                  <dd className="mt-2 text-[10px] tracking-[0.22em] uppercase text-muted">
                    Avbokning
                  </dd>
                </div>
              </dl>
            </div>
          </div>
        </div>
      </section>

      {/* CATEGORY NAV */}
      <nav
        id="kategorier"
        className="sticky top-16 lg:top-20 z-30 bg-background/85 backdrop-blur-md border-b border-border"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <ul className="flex gap-1 overflow-x-auto scrollbar-hide py-3 -mx-4 px-4 sm:mx-0 sm:px-0">
            {treatmentCategories.map((cat) => (
              <li key={cat.id} className="shrink-0">
                <a
                  href={`#${cat.id}`}
                  className="inline-flex items-center px-4 py-2 text-[11px] tracking-[0.15em] uppercase text-muted hover:text-ink hover:bg-cream/60 transition-colors"
                >
                  {cat.shortLabel}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </nav>

      {/* POPULAR STRIP */}
      {popular.length > 0 && (
        <section className="py-12 lg:py-16 border-b border-border">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between mb-8">
              <div>
                <p className="text-[11px] tracking-[0.3em] uppercase text-sage-dark mb-2">
                  Mest bokade
                </p>
                <h2 className="font-serif text-2xl lg:text-3xl">
                  Populära behandlingar just nu
                </h2>
              </div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
              {popular.map((t) => (
                <TreatmentCard key={t.id} treatment={t} />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* CATEGORIES */}
      {treatmentCategories.map((cat) => {
        const items = treatmentsByCategory(cat.id);
        if (items.length === 0) return null;

        return (
          <section
            key={cat.id}
            id={cat.id}
            className="py-16 lg:py-24 border-b border-border last:border-b-0 scroll-mt-32"
          >
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="grid lg:grid-cols-12 gap-8 mb-10">
                <div className="lg:col-span-5">
                  <p className="text-[11px] tracking-[0.3em] uppercase text-sage-dark mb-3">
                    {cat.tagline}
                  </p>
                  <h2 className="font-serif text-3xl lg:text-4xl leading-tight">
                    {cat.label}
                  </h2>
                </div>
                <div className="lg:col-span-7 lg:pt-2">
                  <p className="text-muted leading-relaxed">
                    {cat.description}
                  </p>
                </div>
              </div>

              {cat.layout === "card" ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-6">
                  {items.map((t) => (
                    <TreatmentCard key={t.id} treatment={t} />
                  ))}
                </div>
              ) : (
                <div className="grid lg:grid-cols-2 gap-x-12 gap-y-2">
                  {Array.from(
                    items.reduce((map, t) => {
                      const area = t.area ?? "Övrigt";
                      const list = map.get(area) ?? [];
                      list.push(t);
                      map.set(area, list);
                      return map;
                    }, new Map<string, Treatment[]>())
                  ).map(([area, list]) => (
                    <CompactArea key={area} area={area} items={list} />
                  ))}
                </div>
              )}
            </div>
          </section>
        );
      })}

      {/* CTA — CONSULTATION */}
      <section className="py-20 lg:py-28 bg-ink text-cream">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-[11px] tracking-[0.3em] uppercase text-sage-light mb-4">
            Inte säker på vad du behöver?
          </p>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl mb-5 leading-tight">
            Boka en{" "}
            <em className="italic opacity-80">kostnadsfri konsultation</em>
          </h2>
          <p className="text-cream/70 mb-10 max-w-xl mx-auto leading-relaxed">
            Vi går igenom din hud, dina mål och tar fram en behandlingsplan som
            faktiskt funkar för just dig — innan du bokar något.
          </p>
          <a
            href={BOKADIREKT_BASE_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-10 py-4 bg-cream text-ink text-sm tracking-[0.15em] uppercase font-medium hover:bg-beige transition-colors"
          >
            Boka konsultation
            <ArrowRight className="w-4 h-4" />
          </a>
        </div>
      </section>
    </>
  );
}
