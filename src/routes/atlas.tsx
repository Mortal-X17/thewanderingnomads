import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { Nav } from "@/components/site/Nav";
import { Footer } from "@/components/site/Footer";
import { Reveal } from "@/components/site/Reveal";
import { IndiaMap } from "@/components/atlas/IndiaMap";
import { StatePanel } from "@/components/atlas/StatePanel";
import { ATLAS_STATES, ATLAS_STATS, type AtlasState } from "@/lib/atlas/data";

export const Route = createFileRoute("/atlas")({
  head: () => ({
    meta: [
      { title: "Travel Atlas — The Wandering Nomads" },
      {
        name: "description",
        content:
          "A living archive of Krish's journeys across India. Explore every state, story, and destination as the atlas grows with each expedition.",
      },
      { property: "og:title", content: "Travel Atlas — The Wandering Nomads" },
      {
        property: "og:description",
        content:
          "An interactive atlas of India — every highlighted state is a chapter of Krish's travels.",
      },
    ],
  }),
  component: AtlasPage,
});

function AtlasPage() {
  const [selected, setSelected] = useState<AtlasState | null>(null);

  const visited = useMemo(
    () => ATLAS_STATES.filter((s) => s.visited).sort((a, b) => a.name.localeCompare(b.name)),
    [],
  );

  return (
    <div className="min-h-screen bg-background">
      <Nav />

      {/* Hero */}
      <section className="relative overflow-hidden pt-32 pb-16 sm:pt-40 sm:pb-24">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 opacity-70"
          style={{
            background:
              "radial-gradient(1000px 500px at 50% -10%, color-mix(in oklab, var(--forest) 15%, transparent), transparent 60%)",
          }}
        />
        <div className="relative mx-auto max-w-5xl px-6 text-center">
          <Reveal>
            <p className="eyebrow">The Wandering Nomads · Living archive</p>
          </Reveal>
          <Reveal delay={0.1}>
            <h1 className="display mt-4 text-5xl leading-[0.95] sm:text-7xl md:text-8xl">
              Travel Atlas
            </h1>
          </Reveal>
          <Reveal delay={0.2}>
            <p className="mx-auto mt-6 max-w-2xl text-base text-muted-foreground sm:text-lg">
              Explore India through Krish's journeys. Every highlighted state represents
              adventures, memories, and stories waiting to be discovered.
            </p>
          </Reveal>
        </div>
      </section>

      {/* Stats */}
      <section className="mx-auto max-w-6xl px-6">
        <Reveal>
          <div className="grid grid-cols-2 gap-px overflow-hidden rounded-3xl border border-ink/10 bg-ink/10 sm:grid-cols-5">
            <Stat label="States explored" value={ATLAS_STATS.statesExplored} />
            <Stat label="Cities visited" value={ATLAS_STATS.citiesVisited} suffix="+" />
            <Stat label="Countries explored" value={ATLAS_STATS.countriesExplored} />
            <Stat label="Solo expeditions" value={ATLAS_STATS.soloExpeditions} suffix="+" />
            <Stat label="Community trips" value={ATLAS_STATS.communityTrips} />
          </div>
        </Reveal>
      </section>

      {/* Map + Index */}
      <section className="mx-auto mt-16 max-w-6xl px-6 pb-24 sm:mt-24">
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-[1.4fr_1fr]">
          <Reveal>
            <div className="rounded-3xl border border-ink/8 bg-card p-4 sm:p-6">
              <p className="eyebrow mb-2">India</p>
              <p className="display text-2xl text-ink/90">
                Tap a state to open its chapter.
              </p>
              <div className="mt-4">
                <IndiaMap
                  selectedId={selected?.id ?? null}
                  onSelect={(s) => setSelected(s)}
                />
              </div>
            </div>
          </Reveal>

          <Reveal delay={0.1}>
            <div className="rounded-3xl border border-ink/8 bg-card p-6">
              <div className="flex items-baseline justify-between">
                <p className="eyebrow">Chapters unlocked</p>
                <span className="text-xs text-muted-foreground">{visited.length}</span>
              </div>
              <ul className="mt-4 grid grid-cols-2 gap-x-3 gap-y-1.5 text-sm">
                {visited.map((s) => (
                  <li key={s.id}>
                    <button
                      onClick={() => setSelected(s)}
                      className="group flex w-full items-center gap-2 rounded-md py-1 text-left text-ink/80 transition hover:text-ink"
                    >
                      <motion.span
                        layoutId={`dot-${s.id}`}
                        className="h-1.5 w-1.5 rounded-full bg-forest"
                      />
                      <span className="border-b border-transparent group-hover:border-ink/40">
                        {s.name}
                      </span>
                    </button>
                  </li>
                ))}
              </ul>

              <div className="mt-8 rounded-2xl border border-dashed border-ink/12 p-4">
                <p className="eyebrow">Coming soon</p>
                <p className="mt-2 text-sm text-ink/70">
                  As Krish's journeys extend beyond India, this atlas will grow into a
                  World Atlas — countries, states, cities, and stories, all in one
                  living archive.
                </p>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      <StatePanel state={selected} onClose={() => setSelected(null)} />

      <Footer />
    </div>
  );
}

function Stat({ label, value, suffix }: { label: string; value: number; suffix?: string }) {
  return (
    <div className="bg-card p-5 text-center sm:p-6">
      <p className="display text-3xl sm:text-4xl">
        {value}
        {suffix ?? ""}
      </p>
      <p className="mt-1 text-[11px] uppercase tracking-[0.18em] text-muted-foreground">
        {label}
      </p>
    </div>
  );
}
