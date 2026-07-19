import { useState } from "react";
import { motion } from "framer-motion";
import {
  ATLAS_COUNTRIES,
  ATLAS_STATES,
  MAP_HEIGHT,
  MAP_WIDTH,
  type AtlasState,
} from "@/lib/atlas/data";

/**
 * Muted, earthy palette — each state gets a subtle shade so boundaries
 * read even without heavy strokes. Uses fixed pigments blended into the
 * theme card colour so it stays cohesive in light and dark mode.
 */
const EARTH_PIGMENTS = [
  "#c9a37a", // sand
  "#b48a5c", // clay
  "#a58b6f", // taupe
  "#9caa7c", // moss
  "#8fa38a", // sage
  "#c7b791", // wheat
  "#b7936a", // amber-earth
  "#9b8570", // stone
  "#a9b19a", // olive-mist
  "#c2a385", // dune
];

function pigmentFor(id: string) {
  let hash = 0;
  for (let i = 0; i < id.length; i++) hash = (hash * 31 + id.charCodeAt(i)) >>> 0;
  return EARTH_PIGMENTS[hash % EARTH_PIGMENTS.length];
}

function stateFill(id: string, visited: boolean, active: boolean) {
  if (visited && active) return "var(--forest)";
  if (visited)
    return `color-mix(in oklab, var(--forest) 42%, ${pigmentFor(id)})`;
  return `color-mix(in oklab, ${pigmentFor(id)} 26%, var(--card))`;
}

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
        aria-label="Interactive map of India, Nepal and Bhutan — Krish's Travel Atlas"
      >
        <defs>
          <filter id="visited-glow" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="4" result="b" />
            <feMerge>
              <feMergeNode in="b" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* Neighbour countries (Nepal, Bhutan) as soft filled shapes behind India */}
        {ATLAS_COUNTRIES.filter((c) => c.id !== "IN").map((c) => (
          <path
            key={c.id}
            d={c.d}
            fill="color-mix(in oklab, var(--ink) 4%, var(--card))"
            stroke="color-mix(in oklab, var(--ink) 55%, transparent)"
            strokeWidth={1.8}
            strokeLinejoin="round"
          />
        ))}

        {/* India states — subtle earthy fills, thin borders */}
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
              animate={{ fill: stateFill(s.id, s.visited, isSelected || isHover) }}
              transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
              style={{
                stroke: isSelected
                  ? "var(--ink)"
                  : "color-mix(in oklab, var(--ink) 30%, transparent)",
                strokeWidth: isSelected ? 1.4 : 0.6,
                strokeLinejoin: "round",
                cursor: interactive ? "pointer" : "default",
                filter: isSelected || isHover ? "url(#visited-glow)" : undefined,
                transition: "stroke 200ms, stroke-width 200ms",
              }}
            />
          );
        })}

        {/* India country outline — thicker, on top of the state fills */}
        {ATLAS_COUNTRIES.filter((c) => c.id === "IN").map((c) => (
          <path
            key={c.id}
            d={c.d}
            fill="none"
            stroke="color-mix(in oklab, var(--ink) 78%, transparent)"
            strokeWidth={2.2}
            strokeLinejoin="round"
            pointerEvents="none"
          />
        ))}

        {/* State labels — small, elegant, only when the shape can hold them */}
        {ATLAS_STATES.filter((s) => s.w > 42 && s.h > 30).map((s) => (
          <text
            key={`lbl-${s.id}`}
            x={s.cx}
            y={s.cy}
            textAnchor="middle"
            dominantBaseline="central"
            className="pointer-events-none select-none"
            style={{
              fontSize: Math.max(9, Math.min(13, s.w / 7)),
              fontFamily: "Inter, system-ui, sans-serif",
              fontWeight: 400,
              letterSpacing: "0.02em",
              fill: "color-mix(in oklab, var(--ink) 62%, transparent)",
            }}
          >
            {s.id}
          </text>
        ))}

        {/* Country labels — slightly larger, all-caps, elegant */}
        {ATLAS_COUNTRIES.map((c) => {
          const isIndia = c.id === "IN";
          return (
            <text
              key={`c-${c.id}`}
              x={c.cx}
              y={isIndia ? c.cy + 40 : c.cy}
              textAnchor="middle"
              dominantBaseline="central"
              className="pointer-events-none select-none"
              style={{
                fontSize: isIndia ? 22 : 14,
                fontFamily: '"Instrument Serif", Georgia, serif',
                letterSpacing: "0.28em",
                textTransform: "uppercase",
                fill: isIndia
                  ? "color-mix(in oklab, var(--ink) 82%, transparent)"
                  : "color-mix(in oklab, var(--ink) 60%, transparent)",
              }}
            >
              {c.name}
            </text>
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
          <span
            className="h-2.5 w-4 rounded-sm"
            style={{ background: "color-mix(in oklab, #c9a37a 26%, var(--card))" }}
          />
          Awaiting a chapter
        </span>
        <span className="inline-flex items-center gap-2">
          <span
            className="h-2.5 w-4 rounded-sm border border-ink/30"
            style={{ background: "color-mix(in oklab, var(--ink) 4%, var(--card))" }}
          />
          Neighbour country
        </span>
      </div>
    </div>
  );
}
