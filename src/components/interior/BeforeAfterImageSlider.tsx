"use client";

import { useState } from "react";
import type { BeforeAfterProject } from "@/data/interiorProjects";

export interface BeforeAfterImageSliderProps {
  project: BeforeAfterProject;
}

export function BeforeAfterImageSlider({ project }: BeforeAfterImageSliderProps) {
  const [positionPercent, setPositionPercent] = useState(50);

  return (
    <article className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
      <h3 className="text-lg font-semibold text-slate-900">{project.title}</h3>
      <p className="mt-1 text-sm text-slate-500">Before / After Image Slider</p>

      <div className="relative mt-4 h-64 overflow-hidden rounded-xl md:h-80">
        <img
          src={project.beforeImageUrl}
          alt={`${project.title} before`}
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div
          className="absolute inset-y-0 left-0 overflow-hidden"
          style={{ width: `${positionPercent}%` }}
        >
          <img
            src={project.afterImageUrl}
            alt={`${project.title} after`}
            className="h-full w-full object-cover"
          />
        </div>

        <div
          className="absolute inset-y-0 w-0.5 bg-white"
          style={{ left: `calc(${positionPercent}% - 1px)` }}
          aria-hidden="true"
        />

        <div className="absolute left-3 top-3 rounded-md bg-slate-950/80 px-2 py-1 text-xs font-medium text-white">
          {project.afterLabel}
        </div>
        <div className="absolute right-3 top-3 rounded-md bg-slate-950/80 px-2 py-1 text-xs font-medium text-white">
          {project.beforeLabel}
        </div>
      </div>

      <input
        type="range"
        min={0}
        max={100}
        value={positionPercent}
        onChange={(event) => {
          setPositionPercent(Number(event.target.value));
        }}
        className="mt-4 w-full"
        aria-label={`${project.title} comparison slider`}
      />
    </article>
  );
}
