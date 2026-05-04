import Image from "next/image";
import { cn } from "@/lib/utils";

interface ProductImageProps {
  name: string;
  brand: string;
  imageUrl?: string;
  className?: string;
  sizes?: string;
  priority?: boolean;
}

const palettes: Record<string, { bg: string; bottle: string; accent: string; text: string }> = {
  "Alex Cosmetic": { bg: "#f0ebe2", bottle: "#1a1a1a", accent: "#e5dfd4", text: "#faf8f5" },
  "Gilda Liljeblad": { bg: "#ede7dd", bottle: "#2a2a2a", accent: "#d4c9b3", text: "#faf8f5" },
  Genosys: { bg: "#e8e3d9", bottle: "#fafafa", accent: "#c9bba5", text: "#1a1a1a" },
  Meline: { bg: "#f5f1ea", bottle: "#fafafa", accent: "#b8c5ad", text: "#1a1a1a" },
  Argana: { bg: "#e0d6c6", bottle: "#1a1a1a", accent: "#5d6b53", text: "#faf8f5" },
};

const productPalette = (name: string, fallback: typeof palettes[string]) => {
  const lower = name.toLowerCase();
  if (lower.includes("green") || lower.includes("matt pore"))
    return { ...fallback, bottle: "#8a9b7e", text: "#faf8f5" };
  if (lower.includes("herbal") || lower.includes("recoup fluid"))
    return { ...fallback, bottle: "#c9a888", text: "#faf8f5" };
  if (lower.includes("vitamin cream"))
    return { ...fallback, bottle: "#d4b35a", text: "#1a1a1a" };
  if (lower.includes("hemp") || lower.includes("oil"))
    return { ...fallback, bottle: "#8a9b7e", text: "#faf8f5" };
  if (lower.includes("blemish")) return { ...fallback, bottle: "#a8c5d6" };
  if (lower.includes("clear") || lower.includes("calm"))
    return { ...fallback, bottle: "#fafafa", text: "#1a1a1a" };
  return fallback;
};

const DEFAULT_SIZES = "(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw";

export function ProductImage({
  name,
  brand,
  imageUrl,
  className,
  sizes,
  priority,
}: ProductImageProps) {
  if (imageUrl) {
    return (
      <div className={cn("relative overflow-hidden bg-cream", className)}>
        <Image
          src={imageUrl}
          alt={`${name} – ${brand}`}
          fill
          sizes={sizes ?? DEFAULT_SIZES}
          priority={priority}
          className="object-contain"
        />
      </div>
    );
  }

  const palette = productPalette(name, palettes[brand] ?? palettes["Alex Cosmetic"]);
  const initials = name
    .replace(/[^A-Za-zÅÄÖåäö ]/g, "")
    .split(" ")
    .filter(Boolean)
    .slice(0, 3)
    .map((w) => w.toUpperCase());

  const isAmpoule =
    name.toLowerCase().includes("drops") ||
    name.toLowerCase().includes("ampull") ||
    name.toLowerCase().includes("dive") ||
    name.toLowerCase().includes("control") ||
    name.toLowerCase().includes("eraser");
  const isJar =
    name.toLowerCase().includes("vitamin cream") ||
    name.toLowerCase().includes("clear cream");

  return (
    <div
      className={cn("relative overflow-hidden", className)}
      style={{ background: palette.bg }}
      role="img"
      aria-label={`${name} – ${brand}`}
    >
      <svg
        viewBox="0 0 200 240"
        className="absolute inset-0 w-full h-full"
        preserveAspectRatio="xMidYMid meet"
        aria-hidden="true"
      >
        <defs>
          <radialGradient id={`glow-${brand}`} cx="50%" cy="40%" r="60%">
            <stop offset="0%" stopColor="#ffffff" stopOpacity="0.4" />
            <stop offset="100%" stopColor="#ffffff" stopOpacity="0" />
          </radialGradient>
          <linearGradient id={`bottle-${name}`} x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor={palette.bottle} stopOpacity="1" />
            <stop offset="100%" stopColor={palette.bottle} stopOpacity="0.85" />
          </linearGradient>
        </defs>
        <rect width="200" height="240" fill={`url(#glow-${brand})`} />

        {isJar ? (
          <g>
            <ellipse cx="100" cy="180" rx="58" ry="8" fill="#000" opacity="0.08" />
            <rect x="55" y="105" width="90" height="70" rx="4" fill={`url(#bottle-${name})`} />
            <rect x="50" y="95" width="100" height="18" rx="3" fill={palette.bottle} />
            <rect x="55" y="120" width="90" height="0.5" fill={palette.text} opacity="0.2" />
          </g>
        ) : isAmpoule ? (
          <g>
            <ellipse cx="100" cy="200" rx="40" ry="6" fill="#000" opacity="0.08" />
            <rect x="78" y="60" width="44" height="135" rx="2" fill={`url(#bottle-${name})`} />
            <rect x="82" y="50" width="36" height="14" rx="1" fill={palette.bottle} />
            <rect x="90" y="40" width="20" height="14" rx="1" fill={palette.bottle} />
          </g>
        ) : (
          <g>
            <ellipse cx="100" cy="215" rx="50" ry="6" fill="#000" opacity="0.08" />
            <path
              d="M 65 80 Q 65 70 75 70 L 125 70 Q 135 70 135 80 L 135 210 Q 135 215 130 215 L 70 215 Q 65 215 65 210 Z"
              fill={`url(#bottle-${name})`}
            />
            <rect x="88" y="50" width="24" height="22" rx="2" fill={palette.bottle} opacity="0.95" />
            <circle cx="100" cy="48" r="6" fill={palette.bottle} />
          </g>
        )}

        <g style={{ fontFamily: "var(--font-inter), sans-serif" }}>
          {initials.map((word, idx) => (
            <text
              key={idx}
              x="100"
              y={isJar ? 145 + idx * 11 : isAmpoule ? 110 + idx * 14 : 130 + idx * 14}
              textAnchor="middle"
              fontSize={isAmpoule ? "10" : "11"}
              fontWeight="600"
              letterSpacing="1.5"
              fill={palette.text}
            >
              {word}
            </text>
          ))}
        </g>
      </svg>
    </div>
  );
}
