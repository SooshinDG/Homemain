"use client";

import { useEffect, useState } from "react";
import type { InteriorHeroSlide } from "@/data/interiorProjects";

export interface HeroSliderProps {
  slides: ReadonlyArray<InteriorHeroSlide>;
  autoPlayIntervalMs?: number;
}

export function HeroSlider({ slides, autoPlayIntervalMs = 5000 }: HeroSliderProps) {
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    if (slides.length < 2) {
      return;
    }

    const timer = window.setInterval(() => {
      setActiveIndex((currentIndex) => (currentIndex + 1) % slides.length);
    }, autoPlayIntervalMs);

    return () => {
      window.clearInterval(timer);
    };
  }, [autoPlayIntervalMs, slides.length]);

  if (slides.length === 0) {
    return null;
  }

  const activeSlide = slides[activeIndex];

  return (
    <section className="relative overflow-hidden rounded-2xl border border-slate-200 bg-slate-900 text-white shadow-sm">
      <img
        src={activeSlide.imageUrl}
        alt={activeSlide.title}
        className="h-[360px] w-full object-cover opacity-60 md:h-[420px]"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-slate-950/85 to-transparent" />
      <div className="absolute inset-x-0 bottom-0 p-6 md:p-8">
        <p className="text-xs font-semibold uppercase tracking-wider text-slate-300">
          Interior Hero Slider
        </p>
        <h2 className="mt-2 text-2xl font-semibold md:text-4xl">{activeSlide.title}</h2>
        <p className="mt-3 max-w-2xl text-sm text-slate-200 md:text-base">{activeSlide.description}</p>
      </div>

      <div className="absolute bottom-4 right-4 flex gap-2">
        {slides.map((slide, index) => (
          <button
            key={slide.id}
            type="button"
            onClick={() => {
              setActiveIndex(index);
            }}
            aria-label={`Show slide ${index + 1}`}
            className={[
              "h-2.5 w-8 rounded-full transition",
              index === activeIndex ? "bg-white" : "bg-white/35 hover:bg-white/60",
            ].join(" ")}
          />
        ))}
      </div>
    </section>
  );
}
