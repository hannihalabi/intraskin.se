"use client";

import { useEffect, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

type Review = {
  name: string;
  skinType: string;
  text: string;
};

type HeroTestimonialCarouselProps = {
  reviews: Review[];
};

export function HeroTestimonialCarousel({ reviews }: HeroTestimonialCarouselProps) {
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    if (reviews.length <= 1) {
      return;
    }

    const interval = window.setInterval(() => {
      setActiveIndex((current) => (current + 1) % reviews.length);
    }, 5000);

    return () => window.clearInterval(interval);
  }, [reviews.length]);

  if (reviews.length === 0) {
    return null;
  }

  const goToPrevious = () => {
    setActiveIndex((current) => (current - 1 + reviews.length) % reviews.length);
  };

  const goToNext = () => {
    setActiveIndex((current) => (current + 1) % reviews.length);
  };

  return (
    <div className="w-full max-w-md min-w-0 border-l border-border pl-4 sm:pl-5">
      <div className="overflow-hidden">
        <div
          className="flex transition-transform duration-500 ease-out"
          style={{ transform: `translateX(-${activeIndex * 100}%)` }}
        >
          {reviews.map((review) => (
            <figure key={review.name} className="w-full shrink-0 pr-2">
              <blockquote className="font-serif text-base leading-snug italic sm:text-lg">
                &ldquo;{review.text}&rdquo;
              </blockquote>
              <figcaption className="mt-3 text-[11px] tracking-[0.14em] uppercase text-muted">
                {review.name} · {review.skinType}
              </figcaption>
            </figure>
          ))}
        </div>
      </div>

      <div className="mt-4 flex items-center justify-between">
        <div className="flex gap-2">
          {reviews.map((review, index) => (
            <button
              key={review.name}
              type="button"
              aria-label={`Visa recension ${index + 1}`}
              aria-current={activeIndex === index}
              onClick={() => setActiveIndex(index)}
              className="h-1.5 w-5 bg-border transition-colors aria-current:bg-ink"
            />
          ))}
        </div>

        <div className="flex gap-1">
          <button
            type="button"
            aria-label="Föregående recension"
            onClick={goToPrevious}
            className="inline-flex h-8 w-8 items-center justify-center border border-border text-ink transition-colors hover:bg-ink hover:text-cream"
          >
            <ChevronLeft className="h-4 w-4" />
          </button>
          <button
            type="button"
            aria-label="Nästa recension"
            onClick={goToNext}
            className="inline-flex h-8 w-8 items-center justify-center border border-border text-ink transition-colors hover:bg-ink hover:text-cream"
          >
            <ChevronRight className="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
