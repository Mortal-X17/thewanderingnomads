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
 * Muted, earthy palette. Every state gets a stable subtle pigment so
 * boundaries read even with thin strokes; visited states blend that
 * pigment into the forest brand colour.
 */
const EARTH_PIGMENTS = [
  "#c9a37a", "#b48a5c", "#a58b6f", "#9caa7c", "#8fa38a",
  "#c7b791", "#b7936a", "#9b8570", "#a9b19a", "#c2a385",
];

function pigmentFor(id: string) {
  let h = 0;
  for (let i = 0; i < id.length; i++) h = (h * 31 + id.charCodeAt(i)) >>> 0;
  return EARTH_PIGMENTS[h % EARTH_PIGMENTS.length];
}

function stateFill(id: string, visited: boolean, active: boolean) {
  if (visited && active) return "var(--forest)";
  if (visited)
    return `color-mix(in oklab, var(--forest) 55%, ${pigmentFor(id)})`;
  return `color-mix(in oklab, ${pigmentFor(id)} 32%, var(--card))`;
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
            <feGaussianBlur stdDeviation="3" result="b" />
            <feMerge>
              <feMergeNode in="b" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* Neighbour countries — soft filled shapes behind India */}
        {ATLAS_COUNTRIES.filter((c) => c.id !== "IN").map((c) => (
          <path
            key={c.id}
            d={c.d}
            fill="color-mix(in oklab, var(--ink) 5%, var(--card))"
            stroke="color-mix(in oklab, var(--ink) 60%, transparent)"
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
                  : "color-mix(in oklab, var(--ink) 28%, transparent)",
                strokeWidth: isSelected ? 1.4 : 0.55,
                strokeLinejoin: "round",
                cursor: interactive ? "pointer" : "default",
                filter: isSelected || isHover ? "url(#visited-glow)" : undefined,
                transition: "stroke 200ms, stroke-width 200ms",
              }}
            />
          );
        })}

        {/* India country outline — thicker, drawn on top */}
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

        {/* State labels — small, elegant, only on shapes big enough to hold them */}
        {ATLAS_STATES.filter((s) => s.w > 48 && s.h > 34).map((s) => (
          <text
            key={`lbl-${s.id}`}
            x={s.cx}
            y={s.cy}
            textAnchor="middle"
            dominantBaseline="central"
            className="pointer-events-none select-none"
            style={{
              fontSize: Math.max(8.5, Math.min(12, s.w / 8)),
              fontFamily: "Inter, system-ui, sans-serif",
              fontWeight: 400,
              letterSpacing: "0.04em",
              fill: "color-mix(in oklab, var(--ink) 65%, transparent)",
            }}
          >
            {s.id}
          </text>
        ))}

        {/* Country labels — slightly larger, uppercase, spaced */}
        {ATLAS_COUNTRIES.map((c) => {
          const isIndia = c.id === "IN";
          return (
            <text
              key={`c-${c.id}`}
              x={c.cx}
              y={isIndia ? c.cy + 60 : c.cy}
              textAnchor="middle"
              dominantBaseline="central"
              className="pointer-events-none select-none"
              style={{
                fontSize: isIndia ? 22 : 12,
                fontFamily: '"Instrument Serif", Georgia, serif',
                letterSpacing: isIndia ? "0.32em" : "0.24em",
                textTransform: "uppercase",
                fill: isIndia
                  ? "color-mix(in oklab, var(--ink) 55%, transparent)"
                  : "color-mix(in oklab, var(--ink) 55%, transparent)",
              }}
            >
              {c.name}
            </text>
          );
        })}
      </svg>

      {hover ? (
        <div className="pointer-events-none absolute left-1/2 top-3 -translate-x-1/2 rounded-full bg-ink/90 px-3 py-1 text-[11px] font-medium tracking-wide text-snow shadow-lift">
          {hover.name}
        </div>
      ) : null}

      <div className="mt-4 flex flex-wrap items-center justify-center gap-4 text-[11px] text-muted-foreground">
        <span className="inline-flex items-center gap-2">
          <span className="h-2.5 w-4 rounded-sm bg-forest" />
          Explored
        </span>
        <span className="inline-flex items-center gap-2">
          <span
            className="h-2.5 w-4 rounded-sm"
            style={{ background: "color-mix(in oklab, #b48a5c 32%, var(--card))" }}
          />
          Awaiting a chapter
        </span>
        <span className="inline-flex items-center gap-2">
          <span className="h-2.5 w-4 rounded-sm border border-ink/40 bg-transparent" />
          Neighbour country
        </span>
      </div>
    </div>
  );
}
