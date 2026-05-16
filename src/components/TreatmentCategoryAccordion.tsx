import { ArrowRight, ChevronDown, Sparkles } from "lucide-react";
import {
  bookingUrl,
  treatmentCategories,
  treatmentsByCategory,
  type Treatment,
} from "@/lib/treatments";

function CompactRow({ treatment }: { treatment: Treatment }) {
  return (
    <a
      href={bookingUrl(treatment)}
      target="_blank"
      rel="noopener noreferrer"
      className="group flex items-center justify-between gap-4 border-b border-border/70 py-3 px-1 transition-colors last:border-b-0 hover:bg-cream/60"
    >
      <div className="flex items-center gap-2 min-w-0">
        <span className="font-serif text-sm sm:text-base leading-tight truncate">
          {treatment.name}
        </span>
        {treatment.popular && (
          <Sparkles className="h-3 w-3 shrink-0 text-sage-dark" strokeWidth={1.5} />
        )}
      </div>
      <div className="flex items-center gap-3 shrink-0">
        <span className="whitespace-nowrap font-serif text-sm sm:text-base text-ink">
          {treatment.price === 0
            ? "Kostnadsfri"
            : `${treatment.price.toLocaleString("sv-SE")} kr`}
        </span>
        <ArrowRight
          className="h-3.5 w-3.5 text-muted transition-all group-hover:translate-x-0.5 group-hover:text-ink"
        />
      </div>
    </a>
  );
}

export function TreatmentCategoryAccordion() {
  return (
    <div className="divide-y divide-border border-y border-border bg-background">
      {treatmentCategories.map((cat) => {
        const items = treatmentsByCategory(cat.id);
        if (items.length === 0) return null;

        return (
          <details key={cat.id} className="group">
            <summary className="flex cursor-pointer list-none items-center justify-between gap-4 px-4 py-5 transition-colors hover:bg-cream/40 sm:px-6">
              <span className="font-serif text-lg sm:text-xl">{cat.label}</span>
              <span className="flex items-center gap-3 sm:gap-4">
                <span className="text-sm tracking-wider text-muted tabular-nums">
                  {items.length}
                </span>
                <span className="flex h-7 w-7 items-center justify-center rounded-full bg-cream/70 text-sage-dark transition-transform duration-300 group-open:rotate-180">
                  <ChevronDown className="h-4 w-4" strokeWidth={1.5} />
                </span>
              </span>
            </summary>
            <div className="border-t border-border bg-cream/30 px-4 py-2 sm:px-6">
              {items.map((t) => (
                <CompactRow key={t.id} treatment={t} />
              ))}
            </div>
          </details>
        );
      })}
    </div>
  );
}
