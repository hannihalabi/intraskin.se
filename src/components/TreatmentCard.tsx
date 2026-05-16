import { ArrowRight, Clock, Sparkles } from "lucide-react";
import { bookingUrl, type Treatment } from "@/lib/treatments";

function PriceTag({ price }: { price: number }) {
  if (price === 0) {
    return (
      <span className="inline-flex items-center px-2 py-1 bg-sage-light/40 text-sage-dark text-[10px] tracking-[0.15em] uppercase font-medium">
        Kostnadsfri
      </span>
    );
  }
  return (
    <span className="font-serif text-2xl text-ink leading-none">
      {price.toLocaleString("sv-SE")}
      <span className="text-xs tracking-wider text-muted ml-1">kr</span>
    </span>
  );
}

export function TreatmentCard({ treatment }: { treatment: Treatment }) {
  return (
    <article className="group relative flex flex-col bg-background border border-border p-6 lg:p-7 transition-shadow hover:shadow-md">
      {treatment.popular && (
        <span className="absolute top-4 right-4 inline-flex items-center gap-1 bg-ink text-cream px-2 py-1 text-[10px] tracking-[0.15em] uppercase font-medium">
          <Sparkles className="w-3 h-3" strokeWidth={1.5} />
          Populär
        </span>
      )}
      <div className="flex items-start justify-between gap-4 mb-3 pr-20">
        <h3 className="font-serif text-xl lg:text-2xl leading-tight">
          {treatment.name}
        </h3>
      </div>
      {treatment.description && (
        <p className="text-sm text-muted leading-relaxed mb-5 flex-1">
          {treatment.description}
        </p>
      )}
      <div className="flex items-center justify-between gap-4 pt-5 border-t border-border">
        <div className="flex flex-col gap-1">
          <PriceTag price={treatment.price} />
          {treatment.duration && (
            <span className="inline-flex items-center gap-1 text-[11px] tracking-wider uppercase text-muted">
              <Clock className="w-3 h-3" strokeWidth={1.4} />
              {treatment.duration}
            </span>
          )}
        </div>
        <a
          href={bookingUrl(treatment)}
          target="_blank"
          rel="noopener noreferrer"
          className="group/btn inline-flex items-center gap-1.5 px-5 py-3 bg-ink text-cream text-[11px] tracking-[0.15em] uppercase font-medium hover:bg-sage-dark transition-colors"
        >
          Boka tid
          <ArrowRight className="w-3.5 h-3.5 group-hover/btn:translate-x-1 transition-transform" />
        </a>
      </div>
    </article>
  );
}
