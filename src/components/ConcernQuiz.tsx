"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import { ArrowRight, ArrowLeft, Sparkles, RotateCcw } from "lucide-react";
import type { SkinType } from "@/lib/products";

type AnswerValue = SkinType | "alla" | "normal" | "blandhud-torr" | "skip";

interface Option {
  label: string;
  value: AnswerValue;
  emoji: string;
  hint?: string;
}

interface Question {
  id: "skinType" | "concern" | "age" | "spf" | "experience";
  prelude: string;
  title: string;
  subtitle: string;
  options: Option[];
}

const questions: Question[] = [
  {
    id: "skinType",
    prelude: "Steg 1 · Hudtyp",
    title: "Gör quizet — vi tar reda på din hudtyp",
    subtitle: "Välj det som stämmer bäst. Tänk på hur huden känns ett par timmar efter rengöring.",
    options: [
      { label: "Torr & stram", value: "torr", emoji: "💧", hint: "Drar, ibland fjällar" },
      { label: "Fet & glansig", value: "fet", emoji: "✨", hint: "T-zon glänser tidigt" },
      { label: "Blandhud", value: "blandhud", emoji: "🌗", hint: "Fet T-zon, torra kinder" },
      { label: "Normal", value: "alla", emoji: "🌱", hint: "Få utmaningar" },
    ],
  },
  {
    id: "concern",
    prelude: "Steg 2 · Fokus",
    title: "Vad vill du adressera först?",
    subtitle: "Välj din viktigaste hudangelägenhet just nu.",
    options: [
      { label: "Rodnad & rosacea", value: "rosacea", emoji: "🌿" },
      { label: "Akne & orenheter", value: "akne", emoji: "🎯" },
      { label: "Pigment & solskador", value: "pigmentering", emoji: "☀️" },
      { label: "Linjer & mogen hud", value: "mogen", emoji: "⏳" },
      { label: "Känslig & reaktiv", value: "kanslig", emoji: "🪷" },
      { label: "Inget specifikt", value: "skip", emoji: "✨" },
    ],
  },
  {
    id: "age",
    prelude: "Steg 3 · Ålder",
    title: "Vilken åldersgrupp tillhör du?",
    subtitle: "Hjälper oss prioritera anti-age vs. preventiv vård.",
    options: [
      { label: "Under 25", value: "alla", emoji: "🌸" },
      { label: "25–35", value: "alla", emoji: "🌼" },
      { label: "35–45", value: "mogen", emoji: "🌷" },
      { label: "45+", value: "mogen", emoji: "🌺" },
    ],
  },
  {
    id: "spf",
    prelude: "Steg 4 · Solskydd",
    title: "Använder du SPF dagligen?",
    subtitle: "Påverkar vilka aktiva ingredienser vi rekommenderar.",
    options: [
      { label: "Ja, varje dag", value: "alla", emoji: "🛡️" },
      { label: "Ibland", value: "alla", emoji: "🌤️" },
      { label: "Sällan eller aldrig", value: "pigmentering", emoji: "🌞" },
    ],
  },
  {
    id: "experience",
    prelude: "Steg 5 · Rutin",
    title: "Hur erfaren är du med skincare?",
    subtitle: "Vi anpassar djupet på rekommendationen.",
    options: [
      { label: "Helt nybörjare", value: "alla", emoji: "🌱" },
      { label: "Har en grundrutin", value: "alla", emoji: "🌿" },
      { label: "Cosmeceuticals-nörd", value: "alla", emoji: "🧪" },
    ],
  },
];

const CONFETTI_COLORS = [
  "#8a9b7e",
  "#5d6b53",
  "#b8c5ad",
  "#c9bba5",
  "#e8dfd1",
  "#d4b35a",
  "#c9a888",
  "#f5f1ea",
  "#1a1a1a",
  "#e89b6b",
  "#a8c5d6",
];

type Side = "left" | "right";

interface CannonPiece {
  id: number;
  side: Side;
  delay: number;
  duration: number;
  px: number;
  py: number;
  ex: number;
  ey: number;
  rs: number;
  rm: number;
  re: number;
  color: string;
  size: number;
  shape: "rect" | "circle" | "strip";
  originY: number;
}

function buildCannonPieces(perSide: number): CannonPiece[] {
  const rand = (min: number, max: number) => Math.random() * (max - min) + min;
  const shapes: CannonPiece["shape"][] = ["rect", "circle", "strip", "strip"];
  const make = (side: Side, idx: number): CannonPiece => {
    const dir = side === "left" ? 1 : -1;
    const peakX = rand(38, 70) * dir;
    const peakY = -rand(28, 52);
    return {
      id: idx,
      side,
      delay: rand(0, 280),
      duration: rand(1900, 3200),
      px: peakX,
      py: peakY,
      ex: peakX + rand(-12, 22) * dir,
      ey: rand(45, 75),
      rs: rand(0, 360),
      rm: rand(180, 540) * (Math.random() > 0.5 ? 1 : -1),
      re: rand(540, 1440) * (Math.random() > 0.5 ? 1 : -1),
      color: CONFETTI_COLORS[Math.floor(rand(0, CONFETTI_COLORS.length))],
      size: rand(8, 18),
      shape: shapes[Math.floor(rand(0, shapes.length))],
      originY: rand(48, 72),
    };
  };
  const left = Array.from({ length: perSide }, (_, i) => make("left", i));
  const right = Array.from({ length: perSide }, (_, i) =>
    make("right", i + perSide)
  );
  return [...left, ...right];
}

function CannonPieceEl({ piece }: { piece: CannonPiece }) {
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    const w = window.innerWidth;
    const h = window.innerHeight;
    const peakX = (piece.px / 100) * w;
    const peakY = (piece.py / 100) * h;
    const endX = (piece.ex / 100) * w;
    const endY = (piece.ey / 100) * h;

    const anim = node.animate(
      [
        {
          transform: `translate3d(0px, 0px, 0) rotate(${piece.rs}deg)`,
          opacity: 0,
          offset: 0,
          easing: "cubic-bezier(0.18, 0.78, 0.32, 1)",
        },
        {
          transform: `translate3d(0px, 0px, 0) rotate(${piece.rs + 30}deg)`,
          opacity: 1,
          offset: 0.05,
          easing: "cubic-bezier(0.18, 0.78, 0.32, 1)",
        },
        {
          transform: `translate3d(${peakX}px, ${peakY}px, 0) rotate(${piece.rm}deg)`,
          opacity: 1,
          offset: 0.42,
          easing: "cubic-bezier(0.55, 0.05, 0.72, 0.45)",
        },
        {
          transform: `translate3d(${endX}px, ${endY}px, 0) rotate(${piece.re}deg)`,
          opacity: 0,
          offset: 1,
        },
      ],
      {
        duration: piece.duration,
        delay: piece.delay,
        fill: "forwards",
      }
    );
    return () => anim.cancel();
  }, [piece]);

  const style: React.CSSProperties = {
    top: `${piece.originY}vh`,
    [piece.side]: "-12px",
    width:
      piece.shape === "strip" ? `${piece.size * 0.4}px` : `${piece.size}px`,
    height:
      piece.shape === "strip" ? `${piece.size * 2}px` : `${piece.size}px`,
    backgroundColor: piece.color,
    borderRadius: piece.shape === "circle" ? "9999px" : "2px",
    boxShadow:
      piece.shape === "circle"
        ? "0 0 6px rgba(255,255,255,0.25)"
        : undefined,
    willChange: "transform, opacity",
    opacity: 0,
  };

  return <span ref={ref} className="absolute" style={style} />;
}

function ConfettiBurst({ active }: { active: boolean }) {
  const pieces = useMemo(
    () => (active ? buildCannonPieces(70) : []),
    [active]
  );
  if (!active) return null;
  return (
    <div
      className="pointer-events-none fixed inset-0 z-[9999] overflow-hidden"
      aria-hidden
    >
      {(["left", "right"] as Side[]).map((side) => (
        <span
          key={`flash-${side}`}
          className="absolute h-40 w-40 rounded-full animate-cannon-flash"
          style={{
            top: "58vh",
            [side]: "-2vw",
            background:
              "radial-gradient(circle, rgba(255,240,200,0.85) 0%, rgba(255,200,120,0.4) 40%, rgba(255,200,120,0) 70%)",
            transform: "translate(-50%, -50%)",
          }}
        />
      ))}
      {pieces.map((p) => (
        <CannonPieceEl key={p.id} piece={p} />
      ))}
    </div>
  );
}

const skinTypeLabels: Record<string, string> = {
  torr: "Torr hud",
  fet: "Fet hud",
  blandhud: "Blandhud",
  kanslig: "Känslig hud",
  rosacea: "Rosacea & rodnad",
  akne: "Akne & orenheter",
  pigmentering: "Pigment & solskador",
  mogen: "Mogen hud",
  alla: "Alla hudtyper",
};

function pickRecommendation(answers: Record<string, AnswerValue>): SkinType {
  const concern = answers.concern;
  if (concern && concern !== "skip" && concern !== "alla") {
    return concern as SkinType;
  }
  const age = answers.age;
  if (age === "mogen") return "mogen";
  const spf = answers.spf;
  if (spf === "pigmentering") return "pigmentering";
  const skin = answers.skinType;
  if (skin && skin !== "alla") return skin as SkinType;
  return "alla";
}

export function ConcernQuiz() {
  const [started, setStarted] = useState(false);
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<Record<string, AnswerValue>>({});
  const [animKey, setAnimKey] = useState(0);
  const [hasCelebrated, setHasCelebrated] = useState(false);
  const [confettiActive, setConfettiActive] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  const isResult = started && step >= questions.length;
  const total = questions.length;
  const progress = !started ? 0 : isResult ? 100 : (step / total) * 100;

  useEffect(() => {
    if (hasCelebrated) return;
    const node = sectionRef.current;
    if (!node) return;

    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (reduceMotion) {
      setHasCelebrated(true);
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        if (entry?.isIntersecting) {
          setConfettiActive(true);
          setHasCelebrated(true);
          window.setTimeout(() => setConfettiActive(false), 4500);
          observer.disconnect();
        }
      },
      { threshold: 0.35, rootMargin: "0px 0px -10% 0px" }
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, [hasCelebrated]);

  const handleSelect = (value: AnswerValue) => {
    const current = questions[step];
    setAnswers((prev) => ({ ...prev, [current.id]: value }));
    window.setTimeout(() => {
      setStep((s) => s + 1);
      setAnimKey((k) => k + 1);
    }, 220);
  };

  const handleBack = () => {
    if (step === 0) return;
    setStep((s) => s - 1);
    setAnimKey((k) => k + 1);
  };

  const handleStart = () => {
    setStarted(true);
    setStep(0);
    setAnimKey((k) => k + 1);
  };

  const handleRestart = () => {
    setStarted(false);
    setStep(0);
    setAnswers({});
    setAnimKey((k) => k + 1);
  };

  const recommendation = isResult ? pickRecommendation(answers) : null;
  const current = started && !isResult ? questions[step] : null;
  const selectedValue = current ? answers[current.id] : undefined;

  return (
    <section ref={sectionRef} className="relative py-20 lg:py-28 bg-beige/40">
      <ConfettiBurst active={confettiActive} />
      <div
        className={`relative max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 ${
          hasCelebrated ? "animate-pop-in" : ""
        }`}
      >
        {/* Progress */}
        <div className="mb-10">
          <div className="flex items-center justify-between mb-3 text-[11px] tracking-[0.2em] uppercase text-sage-dark">
            <span className="relative inline-flex items-center gap-2">
              <span className="relative inline-flex h-4 w-4 items-center justify-center">
                {confettiActive && (
                  <span className="absolute inset-0 rounded-full bg-sage-dark/30 animate-pulse-ring" />
                )}
                <Sparkles className="relative w-3.5 h-3.5" strokeWidth={1.4} />
              </span>
              Hudprofilerings-quiz
            </span>
            <span>
              {!started
                ? `${total} frågor · ~60 s`
                : isResult
                ? "Klar"
                : `${step + 1} / ${total}`}
            </span>
          </div>
          <div className="h-[3px] bg-border/70 overflow-hidden">
            <div
              className="h-full bg-sage-dark transition-[width] duration-500 ease-out"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        {!started && (
          <div key={animKey} className="animate-fade-up text-center">
            <p className="text-[11px] tracking-[0.3em] uppercase text-sage-dark mb-4">
              Personlig hudanalys
            </p>
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl mb-4 leading-tight">
              Hitta din perfekta rutin på under en minut
            </h2>
            <p className="text-muted mb-8 max-w-xl mx-auto leading-relaxed">
              5 snabba frågor — vi listar ut din hudtyp och rekommenderar
              produkter som faktiskt funkar för just dig.
            </p>

            <dl className="mx-auto mb-10 grid max-w-sm grid-cols-3 divide-x divide-border border-y border-border py-5">
              <div className="px-2 text-center sm:px-3">
                <dt className="font-serif text-2xl leading-none text-ink sm:text-3xl">
                  {total}
                </dt>
                <dd className="mt-2 text-[10px] tracking-[0.22em] uppercase text-muted">
                  Frågor
                </dd>
              </div>
              <div className="px-2 text-center sm:px-3">
                <dt className="font-serif text-2xl leading-none text-ink sm:text-3xl">
                  ~60s
                </dt>
                <dd className="mt-2 text-[10px] tracking-[0.22em] uppercase text-muted">
                  Tid
                </dd>
              </div>
              <div className="px-2 text-center sm:px-3">
                <dt className="font-serif text-2xl leading-none text-ink sm:text-3xl">
                  100%
                </dt>
                <dd className="mt-2 text-[10px] tracking-[0.22em] uppercase text-muted">
                  Personligt
                </dd>
              </div>
            </dl>

            <button
              type="button"
              onClick={handleStart}
              className="group inline-flex items-center gap-2 px-10 py-4 bg-sage-dark text-cream text-sm tracking-[0.15em] uppercase font-medium hover:bg-ink transition-colors"
            >
              Starta quizet
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
            <p className="mt-4 text-[11px] tracking-[0.15em] uppercase text-muted">
              Helt gratis · ingen registrering
            </p>
          </div>
        )}

        {started && !isResult && current && (
          <div key={animKey} className="animate-fade-up">
            <p className="text-[11px] tracking-[0.3em] uppercase text-sage-dark mb-4 text-center">
              {current.prelude}
            </p>
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl mb-3 text-center leading-tight">
              {current.title}
            </h2>
            <p className="text-muted mb-10 text-center max-w-xl mx-auto">
              {current.subtitle}
            </p>

            <div
              className={`grid gap-3 sm:gap-4 ${
                current.options.length > 4
                  ? "grid-cols-2 sm:grid-cols-3"
                  : current.options.length === 3
                  ? "grid-cols-1 sm:grid-cols-3"
                  : "grid-cols-2"
              }`}
            >
              {current.options.map((opt) => {
                const isSelected = selectedValue === opt.value;
                return (
                  <button
                    key={opt.label}
                    onClick={() => handleSelect(opt.value)}
                    className={`group relative flex flex-col items-start text-left p-5 sm:p-6 border transition-all duration-200 ${
                      isSelected
                        ? "bg-ink text-cream border-ink shadow-md"
                        : "bg-background border-border hover:border-ink hover:shadow-sm"
                    }`}
                  >
                    <span className="text-3xl mb-3 transition-transform group-hover:scale-110">
                      {opt.emoji}
                    </span>
                    <span className="font-serif text-base sm:text-lg leading-tight">
                      {opt.label}
                    </span>
                    {opt.hint && (
                      <span
                        className={`mt-1 text-[11px] tracking-wide ${
                          isSelected ? "text-cream/70" : "text-muted"
                        }`}
                      >
                        {opt.hint}
                      </span>
                    )}
                  </button>
                );
              })}
            </div>

            <div className="flex items-center justify-between mt-10 text-[11px] tracking-[0.15em] uppercase text-muted">
              <button
                type="button"
                onClick={handleBack}
                disabled={step === 0}
                className="inline-flex items-center gap-1.5 hover:text-ink transition-colors disabled:opacity-30 disabled:hover:text-muted disabled:cursor-not-allowed"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                Tillbaka
              </button>
              <span>Klicka för att fortsätta</span>
            </div>
          </div>
        )}

        {isResult && recommendation && (
          <div key={animKey} className="animate-fade-up text-center">
            <p className="text-[11px] tracking-[0.3em] uppercase text-sage-dark mb-4">
              Din hudprofil
            </p>
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl mb-4 leading-tight">
              Vi har hittat din rutin.
            </h2>
            <p className="text-muted mb-10 max-w-xl mx-auto">
              Baserat på dina svar prioriterar vi produkter för{" "}
              <em className="not-italic font-medium text-ink">
                {skinTypeLabels[recommendation] ?? "din hud"}
              </em>
              .
            </p>

            <dl className="grid grid-cols-2 sm:grid-cols-5 gap-3 mb-10 text-left">
              {questions.map((q) => {
                const value = answers[q.id];
                const opt = q.options.find((o) => o.value === value);
                return (
                  <div
                    key={q.id}
                    className="border border-border bg-background p-4"
                  >
                    <dt className="text-[10px] tracking-[0.18em] uppercase text-muted mb-2">
                      {q.prelude.split("·")[1]?.trim() ?? q.id}
                    </dt>
                    <dd className="flex items-center gap-2 text-sm">
                      <span className="text-lg">{opt?.emoji ?? "—"}</span>
                      <span className="leading-tight">{opt?.label ?? "—"}</span>
                    </dd>
                  </div>
                );
              })}
            </dl>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
              <Link
                href={`/produkter?skinType=${recommendation}`}
                className="group inline-flex items-center gap-2 px-10 py-4 bg-sage-dark text-cream text-sm tracking-[0.15em] uppercase font-medium hover:bg-ink transition-colors"
              >
                Visa mina produkter
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
              <button
                type="button"
                onClick={handleRestart}
                className="inline-flex items-center gap-1.5 px-6 py-4 text-[11px] tracking-[0.15em] uppercase text-muted hover:text-ink transition-colors"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                Gör om quizet
              </button>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
