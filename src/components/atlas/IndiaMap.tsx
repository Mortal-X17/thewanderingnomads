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
 * Elegant, editorial atlas.
 * - Single highlight for all explored Indian states.
 * - Muted, uniform fill for unvisited states.
 * - Nepal & Bhutan get their own subtle neighbour tints.
 * - Borders adapt to the current theme via var(--ink).
 */

function stateFill(visited: boolean, active: boolean) {
  if (visited && active) return "color-mix(in oklab, var(--forest) 88%, var(--ink))";
  if (visited) return "color-mix(in oklab, var(--forest) 78%, transparent)";
  return "color-mix(in oklab, var(--ink) 6%, var(--card))";
}

const NEIGHBOUR_TINT: Record<string, string> = {
  NP: "color-mix(in oklab, var(--sunrise) 22%, var(--card))",
  BT: "color-mix(in oklab, var(--river) 18%, var(--card))",
};

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

        {/* Neighbour countries — soft, distinct tints */}
        {ATLAS_COUNTRIES.filter((c) => c.id !== "IN").map((c) => (
          <path
            key={c.id}
            d={c.d}
            fill={NEIGHBOUR_TINT[c.id] ?? "color-mix(in oklab, var(--ink) 5%, var(--card))"}
            stroke="color-mix(in oklab, var(--ink) 70%, transparent)"
            strokeWidth={1.8}
            strokeLinejoin="round"
          />
        ))}

        {/* India states — uniform system, crisp thin borders */}
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
              animate={{ fill: stateFill(s.visited, isSelected || isHover) }}
              transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
              style={{
                stroke: isSelected
                  ? "color-mix(in oklab, var(--ink) 85%, transparent)"
                  : "color-mix(in oklab, var(--ink) 45%, transparent)",
                strokeWidth: isSelected ? 1.2 : 0.7,
                strokeLinejoin: "round",
                cursor: interactive ? "pointer" : "default",
                filter: isSelected || isHover ? "url(#visited-glow)" : undefined,
                transition: "stroke 200ms, stroke-width 200ms",
              }}
            />
          );
        })}

        {/* India country outline — clearly thicker than state borders */}
        {ATLAS_COUNTRIES.filter((c) => c.id === "IN").map((c) => (
          <path
            key={c.id}
            d={c.d}
            fill="none"
            stroke="color-mix(in oklab, var(--ink) 85%, transparent)"
            strokeWidth={2.4}
            strokeLinejoin="round"
            pointerEvents="none"
          />
        ))}

        {/* Full-name state labels — small, elegant, only where they fit */}
        {ATLAS_STATES.filter((s) => s.w > 55 && s.h > 32).map((s) => {
          const nameLen = s.name.length;
          // fit font size to the smaller dimension and name length
          const base = Math.min(s.w / (nameLen * 0.52), s.h / 3.2);
          const size = Math.max(6.5, Math.min(11, base));
          return (
            <text
              key={`lbl-${s.id}`}
              x={s.cx}
              y={s.cy}
              textAnchor="middle"
              dominantBaseline="central"
              className="pointer-events-none select-none"
              style={{
                fontSize: size,
                fontFamily: "Inter, system-ui, sans-serif",
                fontWeight: 400,
                letterSpacing: "0.02em",
                fill: "color-mix(in oklab, var(--ink) 72%, transparent)",
              }}
            >
              {s.name}
            </text>
          );
        })}

        {/* Country labels — only Nepal & Bhutan (India label suppressed) */}
        {ATLAS_COUNTRIES.filter((c) => c.id !== "IN").map((c) => (
          <text
            key={`c-${c.id}`}
            x={c.cx}
            y={c.cy}
            textAnchor="middle"
            dominantBaseline="central"
            className="pointer-events-none select-none"
            style={{
              fontSize: 13,
              fontFamily: '"Instrument Serif", Georgia, serif',
              letterSpacing: "0.28em",
              textTransform: "uppercase",
              fill: "color-mix(in oklab, var(--ink) 70%, transparent)",
            }}
          >
            {c.name}
          </text>
        ))}
      </svg>

      {hover ? (
        <div className="pointer-events-none absolute left-1/2 top-3 -translate-x-1/2 rounded-full bg-ink px-3 py-1 text-[11px] font-medium tracking-wide text-background shadow-lift">
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
            style={{ background: "color-mix(in oklab, var(--ink) 6%, var(--card))", border: "1px solid color-mix(in oklab, var(--ink) 30%, transparent)" }}
          />
          Awaiting a chapter
        </span>
        <span className="inline-flex items-center gap-2">
          <span
            className="h-2.5 w-4 rounded-sm"
            style={{ background: "color-mix(in oklab, var(--sunrise) 22%, var(--card))" }}
          />
          Nepal
        </span>
        <span className="inline-flex items-center gap-2">
          <span
            className="h-2.5 w-4 rounded-sm"
            style={{ background: "color-mix(in oklab, var(--river) 18%, var(--card))" }}
          />
          Bhutan
        </span>
      </div>
    </div>
  );
}
