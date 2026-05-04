"use client";

import { useEffect, useState } from "react";

const messages = [
  "Fri frakt över 500 kr",
  "30 dagars öppet köp",
  "Gratis prov med varje order",
  "Säker betalning via Klarna",
];

export function AnnouncementBar() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const t = setInterval(() => setIndex((i) => (i + 1) % messages.length), 3500);
    return () => clearInterval(t);
  }, []);

  return (
    <div className="bg-ink text-cream text-[11px] tracking-[0.2em] uppercase py-2.5 text-center font-medium">
      <div className="overflow-hidden h-4">
        <div
          className="transition-transform duration-500 ease-out"
          style={{ transform: `translateY(-${index * 1}rem)` }}
        >
          {messages.map((m) => (
            <div key={m} className="h-4 flex items-center justify-center">
              {m}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
