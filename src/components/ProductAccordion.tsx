"use client";

import { useState, type ReactNode } from "react";
import { Plus, Minus } from "lucide-react";

interface AccordionItem {
  title: string;
  content: ReactNode;
}

export function ProductAccordion({ items }: { items: AccordionItem[] }) {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <div>
      {items.map((item, idx) => (
        <div key={item.title} className="border-b border-border">
          <button
            onClick={() => setOpen(open === idx ? null : idx)}
            className="w-full flex items-center justify-between py-5 text-left group"
          >
            <span className="font-serif text-lg group-hover:text-sage-dark transition-colors">
              {item.title}
            </span>
            {open === idx ? (
              <Minus className="w-4 h-4" strokeWidth={1.5} />
            ) : (
              <Plus className="w-4 h-4" strokeWidth={1.5} />
            )}
          </button>
          <div
            className={`grid transition-all duration-300 ease-out ${
              open === idx ? "grid-rows-[1fr] pb-5" : "grid-rows-[0fr]"
            }`}
          >
            <div className="overflow-hidden text-sm text-foreground/80">{item.content}</div>
          </div>
        </div>
      ))}
    </div>
  );
}
