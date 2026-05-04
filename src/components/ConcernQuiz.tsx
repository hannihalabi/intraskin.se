"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowRight, Sparkles } from "lucide-react";
import type { SkinType } from "@/lib/products";

interface QuizOption {
  label: string;
  value: SkinType;
  emoji: string;
}

const options: QuizOption[] = [
  { label: "Torr & uttorkad", value: "torr", emoji: "💧" },
  { label: "Fet & blandhud", value: "fet", emoji: "✨" },
  { label: "Känslig & röd", value: "kanslig", emoji: "🌿" },
  { label: "Akne & orenheter", value: "akne", emoji: "🎯" },
  { label: "Mogen hud", value: "mogen", emoji: "⏳" },
  { label: "Pigmentfläckar", value: "pigmentering", emoji: "☀️" },
];

export function ConcernQuiz() {
  const [selected, setSelected] = useState<SkinType | null>(null);

  return (
    <section className="py-20 lg:py-28 bg-beige/40">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <Sparkles className="w-7 h-7 mx-auto mb-5 text-sage-dark" strokeWidth={1.2} />
        <p className="text-[11px] tracking-[0.3em] uppercase text-sage-dark mb-4">
          1-minuts quiz
        </p>
        <h2 className="font-serif text-4xl lg:text-5xl mb-4">
          Vad är din största <em className="italic">hudangelägenhet?</em>
        </h2>
        <p className="text-muted mb-10 max-w-xl mx-auto">
          Välj en — vi kuraterar dina perfekta produkter direkt.
        </p>

        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 sm:gap-4 mb-10">
          {options.map((opt) => (
            <button
              key={opt.value}
              onClick={() => setSelected(opt.value)}
              className={`relative px-6 py-6 sm:py-8 text-left transition-all duration-200 border ${
                selected === opt.value
                  ? "bg-ink text-cream border-ink"
                  : "bg-background border-border hover:border-ink"
              }`}
            >
              <span className="text-2xl block mb-2">{opt.emoji}</span>
              <span className="font-serif text-base sm:text-lg leading-tight block">
                {opt.label}
              </span>
            </button>
          ))}
        </div>

        {selected && (
          <Link
            href={`/produkter?skinType=${selected}`}
            className="group inline-flex items-center gap-2 px-10 py-4 bg-sage-dark text-cream text-sm tracking-[0.15em] uppercase font-medium hover:bg-ink transition-colors animate-fade-up"
          >
            Visa mina produkter
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        )}
      </div>
    </section>
  );
}
