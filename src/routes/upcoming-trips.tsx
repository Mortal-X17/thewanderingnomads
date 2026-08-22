import { useMemo, useState } from "react";
import { createFileRoute } from "@tanstack/react-router";

import { Nav } from "@/components/site/Nav";
import { Footer } from "@/components/site/Footer";
import { Reveal } from "@/components/site/Reveal";
import { TripCard } from "@/components/site/TripCard";
import { useContent } from "@/lib/cms/useContent";
import { batchesForTrip, upcomingBatch, waLink } from "@/lib/trips";

export const Route = createFileRoute("/upcoming-trips")({
  head: () => ({
    meta: [
      { title: "Upcoming Trips — The Wandering Nomads" },
      {
        name: "description",
        content:
          "Reserve your seat on the next departures — small-group, founder-led expeditions across India with confirmed dates.",
      },
      { property: "og:title", content: "Upcoming Trips — The Wandering Nomads" },
      {
        property: "og:description",
        content: "Small-group expeditions with confirmed dates across India.",
      },
      { property: "og:url", content: "/upcoming-trips" },
    ],
    links: [{ rel: "canonical", href: "/upcoming-trips" }],
  }),
  component: UpcomingTripsPage,
});

type Filter = "all" | "dates" | "available";

const FILTERS: { id: Filter; label: string }[] = [
  { id: "all", label: "All trips" },
  { id: "dates", label: "Upcoming dates" },
  { id: "available", label: "Available now" },
];

function UpcomingTripsPage() {
  const { journeys, batches, batchHosts, hosts } = useContent();
  const [filter, setFilter] = useState<Filter>("all");
  const [query, setQuery] = useState("");

  const visible = useMemo(() => {
    const term = query.trim().toLowerCase();
    return journeys.filter((trip) => {
      if (filter === "available" && !trip.is_available) return false;
      if (filter === "dates" && !upcomingBatch(batchesForTrip(batches, trip.id))) return false;
      if (term && !`${trip.title} ${trip.destination}`.toLowerCase().includes(term)) return false;
      return true;
    });
  }, [journeys, batches, filter, query]);

  return (
    <div className="min-h-screen bg-background">
      <Nav />
      <main className="pt-40 pb-32">
        <div className="mx-auto max-w-6xl px-6">
          <Reveal>
            <p className="eyebrow">Upcoming Trips</p>
            <h1 className="display mt-4 max-w-3xl text-5xl leading-[1.02] sm:text-6xl md:text-7xl">
              Reserve your seat on
              <br />
              <em className="italic text-muted-foreground">the next departure.</em>
            </h1>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="mt-6 max-w-xl text-[15.5px] leading-relaxed text-muted-foreground">
              Small groups, real places, every trip personally led. Confirmed dates and limited
              spots — pick a departure and we'll take it from there.
            </p>
          </Reveal>

          <div className="mt-10 flex flex-wrap items-center gap-3">
            {FILTERS.map((f) => (
              <button
                key={f.id}
                onClick={() => setFilter(f.id)}
                className={`rounded-full px-4 py-2 text-[13px] font-medium transition ${
                  filter === f.id
                    ? "bg-ink text-snow"
                    : "hairline text-muted-foreground hover:text-ink"
                }`}
              >
                {f.label}
              </button>
            ))}
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search trips…"
              className="ml-auto w-full max-w-xs rounded-full border border-ink/12 bg-card px-5 py-2 text-[13.5px] outline-none transition focus:border-ink/30"
            />
          </div>

          {visible.length > 0 ? (
            <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {visible.map((trip, i) => (
                <Reveal key={trip.id} delay={i * 0.06}>
                  <TripCard trip={trip} batches={batches} batchHosts={batchHosts} hosts={hosts} />
                </Reveal>
              ))}
            </div>
          ) : (
            <div className="mt-16 rounded-[28px] border border-dashed border-border p-14 text-center">
              <p className="display text-2xl text-ink">No trips match.</p>
              <p className="mt-2 text-sm text-muted-foreground">
                Try a different filter, or ask Krish what's next.
              </p>
              <a
                href={waLink(
                  "Hi The Wandering Nomads! I'd like to know about your upcoming trips.",
                )}
                target="_blank"
                rel="noreferrer"
                className="mt-8 inline-flex items-center rounded-full bg-ink px-6 py-3 text-[13px] font-medium text-snow"
              >
                Chat on WhatsApp
              </a>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
}
