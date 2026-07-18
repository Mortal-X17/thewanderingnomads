import { useState } from "react";
import { motion } from "framer-motion";
import { ATLAS_STATES, MAP_HEIGHT, MAP_WIDTH, type AtlasState } from "@/lib/atlas/data";

export function IndiaMap({
  selectedId,
  onSelect,
}: {
  selectedId: string | null;
  onSelect: (state: AtlasState) => void;
}) {
  const [hoverId, setHoverId] = useState<string | null>(null);
  const hover = hoverId ? ATLAS_STATES.find((s) => s.id === hoverId) : null;

  return (
    <div className="relative w-full">
      <svg
        viewBox={`0 0 ${MAP_WIDTH} ${MAP_HEIGHT}`}
        className="block h-auto w-full"
        role="img"
        aria-label="Interactive map of India — Krish's Travel Atlas"
      >
        <defs>
          <linearGradient id="visited-fill" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="color-mix(in oklab, var(--forest) 82%, white)" />
            <stop offset="100%" stopColor="var(--forest)" />
          </linearGradient>
          <filter id="visited-glow" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="4" result="b" />
            <feMerge>
              <feMergeNode in="b" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {ATLAS_STATES.map((s) => {
          const isSelected = s.id === selectedId;
          const isHover = s.id === hoverId;
          const interactive = s.visited;
          return (
            <motion.path
              key={s.id}
              d={s.d}
              onMouseEnter={() => interactive && setHoverId(s.id)}
              onMouseLeave={() => setHoverId(null)}
              onClick={() => interactive && onSelect(s)}
              tabIndex={interactive ? 0 : -1}
              role={interactive ? "button" : undefined}
              aria-label={interactive ? `Open ${s.name}` : s.name}
              onKeyDown={(e) => {
                if (!interactive) return;
                if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault();
                  onSelect(s);
                }
              }}
              initial={false}
              animate={{
                fill: s.visited
                  ? isSelected || isHover
                    ? "var(--forest)"
                    : "color-mix(in oklab, var(--forest) 55%, var(--background))"
                  : "color-mix(in oklab, var(--ink) 6%, var(--background))",
              }}
              transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
              style={{
                stroke: isSelected
                  ? "var(--ink)"
                  : "color-mix(in oklab, var(--ink) 18%, transparent)",
                strokeWidth: isSelected ? 1.6 : 0.6,
                cursor: interactive ? "pointer" : "default",
                filter: isSelected || isHover ? "url(#visited-glow)" : undefined,
                transition: "stroke 200ms, stroke-width 200ms",
              }}
            />
          );
        })}
      </svg>

      {/* Hover label */}
      {hover ? (
        <div className="pointer-events-none absolute left-1/2 top-3 -translate-x-1/2 rounded-full bg-ink/90 px-3 py-1 text-[11px] font-medium tracking-wide text-snow shadow-lift">
          {hover.name}
        </div>
      ) : null}

      {/* Legend */}
      <div className="mt-4 flex flex-wrap items-center justify-center gap-4 text-[11px] text-muted-foreground">
        <span className="inline-flex items-center gap-2">
          <span className="h-2.5 w-4 rounded-sm bg-forest" />
          Explored
        </span>
        <span className="inline-flex items-center gap-2">
          <span className="h-2.5 w-4 rounded-sm bg-ink/10" />
          Awaiting a chapter
        </span>
      </div>
    </div>
  );
}
