import { useEffect } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";

import { Nav } from "@/components/site/Nav";
import { Footer } from "@/components/site/Footer";
import { Reveal } from "@/components/site/Reveal";
import { RichText } from "@/components/site/RichText";
import { useContent } from "@/lib/cms/useContent";
import {
  batchesForTrip,
  formatBatchDates,
  hostsForBatch,
  tripEnquiryMessage,
  waLink,
} from "@/lib/trips";

import heroImg from "@/assets/hero-himalaya.jpg";

export const Route = createFileRoute("/trip/$slug")({
  head: () => ({
    meta: [
      { title: "Trip — The Wandering Nomads" },
      { name: "description", content: "A small-group expedition by The Wandering Nomads." },
    ],
  }),
  component: TripDetailPage,
});

function TripDetailPage() {
  const { slug } = Route.useParams();
  const { journeys, batches, batchHosts, hosts } = useContent();
  const trip = journeys.find((j) => j.slug === slug);

  useEffect(() => {
    if (trip) document.title = `${trip.title} — The Wandering Nomads`;
  }, [trip]);

  if (!trip) {
    return (
      <div className="min-h-screen bg-background">
        <Nav />
        <main className="pt-40 pb-32">
          <div className="mx-auto max-w-2xl px-6 text-center">
            <p className="eyebrow">404</p>
            <h1 className="display mt-4 text-5xl">Off the trail.</h1>
            <p className="mt-4 text-sm text-muted-foreground">
              We couldn't find that trip. It may have moved or not be published yet.
            </p>
            <Link
              to="/upcoming-trips"
              className="mt-10 inline-flex items-center rounded-full bg-ink px-6 py-3 text-[13px] font-medium text-snow"
            >
              See upcoming trips
            </Link>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  const tripBatches = batchesForTrip(batches, trip.id);

  return (
    <div className="min-h-screen bg-background">
      <Nav />
      <main className="pt-36 pb-32">
        <div className="mx-auto max-w-5xl px-6">
          {/* Breadcrumb */}
          <Reveal>
            <div className="flex flex-wrap items-center gap-2 text-[12px] uppercase tracking-[0.16em] text-muted-foreground">
              <Link to="/" className="hover:text-ink">
                Home
              </Link>
              <span>/</span>
              <Link to="/upcoming-trips" className="hover:text-ink">
                Trips
              </Link>
              <span>/</span>
              <span className="text-ink">{trip.title}</span>
            </div>
          </Reveal>

          {/* Title */}
          <Reveal delay={0.05}>
            <h1 className="display mt-8 max-w-4xl text-5xl leading-[1.02] sm:text-6xl md:text-7xl">
              {trip.title}
            </h1>
            <div className="mt-6 flex flex-wrap items-center gap-2.5 text-[12px]">
              <span className="rounded-full bg-ink/5 px-3 py-1.5 uppercase tracking-[0.14em] text-ink">
                {trip.destination}
              </span>
              {trip.duration ? <MetaChip>{trip.duration}</MetaChip> : null}
              {trip.difficulty ? <MetaChip>{trip.difficulty}</MetaChip> : null}
              {trip.best_season ? <MetaChip>{trip.best_season}</MetaChip> : null}
              {trip.price ? <MetaChip>{trip.price}</MetaChip> : null}
            </div>
          </Reveal>

          {/* Hero */}
          <Reveal delay={0.1}>
            <div className="relative mt-10 overflow-hidden rounded-[32px] hairline">
              <img
                src={trip.hero_image_url ?? heroImg}
                alt={`${trip.title} — ${trip.destination}`}
                width={1920}
                height={1080}
                className="aspect-[16/9] w-full object-cover"
              />
            </div>
          </Reveal>

          {/* Primary CTA */}
          <Reveal delay={0.12}>
            <div className="mt-10 flex flex-wrap items-center gap-3">
              <a
                href={waLink(tripEnquiryMessage(trip))}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 rounded-full bg-ink px-6 py-3.5 text-[13.5px] font-medium text-snow transition hover:opacity-90"
              >
                Book Now — WhatsApp
              </a>
              {trip.booking_url ? (
                <a
                  href={trip.booking_url}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center rounded-full border border-ink/15 px-6 py-3.5 text-[13.5px] font-medium text-ink transition hover:bg-ink/5"
                >
                  {trip.cta_label ?? "More details"}
                </a>
              ) : null}
            </div>
          </Reveal>

          {/* About + highlights */}
          <div className="mt-20 grid gap-16 lg:grid-cols-[1fr_320px]">
            <div>
              <Reveal>
                <p className="eyebrow">About the trip</p>
                <RichText
                  html={trip.long_description ?? trip.short_description}
                  className="mt-5 max-w-2xl text-[16px] leading-relaxed text-muted-foreground"
                />
              </Reveal>
            </div>
            {trip.highlights.length > 0 ? (
              <Reveal delay={0.1}>
                <div className="rounded-[24px] bg-card p-6 hairline">
                  <p className="eyebrow">Highlights</p>
                  <ul className="mt-4 space-y-3 text-[14px] text-ink/85">
                    {trip.highlights.map((h) => (
                      <li key={h} className="flex gap-2.5">
                        <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-forest" />
                        {h}
                      </li>
                    ))}
                  </ul>
                </div>
              </Reveal>
            ) : null}
          </div>

          {/* Itinerary */}
          <Itinerary value={trip.itinerary} />

          {/* Batches */}
          {tripBatches.length > 0 ? (
            <section className="mt-20">
              <Reveal>
                <p className="eyebrow">Available batches</p>
                <h2 className="display mt-4 text-4xl sm:text-5xl">Pick your departure.</h2>
              </Reveal>
              <div className="mt-8 divide-y divide-ink/8 rounded-[24px] bg-card hairline">
                {tripBatches.map((batch) => {
                  const assigned = hostsForBatch(batch.id, batchHosts, hosts);
                  const lead = assigned.find((h) => h.role === "lead")?.host;
                  return (
                    <div key={batch.id} className="flex flex-wrap items-center gap-4 px-6 py-5">
                      <div className="min-w-0 flex-1">
                        <p className="display text-xl text-ink">{formatBatchDates(batch)}</p>
                        <p className="mt-1 text-[12px] uppercase tracking-[0.14em] text-muted-foreground">
                          {[
                            batch.batch_type,
                            lead ? `Led by ${lead.name}` : null,
                            batch.seats_remaining != null
                              ? `${batch.seats_remaining} seats left`
                              : null,
                          ]
                            .filter(Boolean)
                            .join(" · ")}
                        </p>
                      </div>
                      <a
                        href={waLink(tripEnquiryMessage(trip, batch))}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center rounded-full bg-ink px-5 py-2.5 text-[13px] font-medium text-snow transition hover:opacity-90"
                      >
                        Enquire
                      </a>
                    </div>
                  );
                })}
              </div>
            </section>
          ) : null}

          {/* Hosts */}
          <Hosts batchIds={tripBatches.map((b) => b.id)} batchHosts={batchHosts} hosts={hosts} />

          {/* Travel info + notes */}
          {trip.travel_info ? (
            <section className="mt-20">
              <Reveal>
                <p className="eyebrow">Travel information</p>
                <RichText
                  html={trip.travel_info}
                  className="mt-5 max-w-2xl text-[15px] leading-relaxed text-muted-foreground"
                />
              </Reveal>
            </section>
          ) : null}
          {trip.notes ? (
            <section className="mt-12">
              <Reveal>
                <p className="eyebrow">Notes</p>
                <RichText
                  html={trip.notes}
                  className="mt-5 max-w-2xl text-[15px] leading-relaxed text-muted-foreground"
                />
              </Reveal>
            </section>
          ) : null}
        </div>
      </main>
      <Footer />
    </div>
  );
}

function MetaChip({ children }: { children: React.ReactNode }) {
  return (
    <span className="rounded-full border border-ink/10 px-3 py-1.5 uppercase tracking-[0.14em] text-muted-foreground">
      {children}
    </span>
  );
}

type ItineraryDay = {
  day?: number | string;
  title?: string;
  description?: string;
  items?: string[];
};

function Itinerary({ value }: { value: unknown }) {
  if (!Array.isArray(value) || value.length === 0) return null;
  const days = value.filter((d): d is ItineraryDay => typeof d === "object" && d !== null);
  if (days.length === 0) return null;

  return (
    <section className="mt-20">
      <Reveal>
        <p className="eyebrow">Itinerary</p>
        <h2 className="display mt-4 text-4xl sm:text-5xl">Day by day.</h2>
      </Reveal>
      <ol className="mt-8 space-y-6">
        {days.map((d, i) => {
          const label = d.day != null ? `Day ${d.day}` : `Day ${i + 1}`;
          return (
            <Reveal key={i} delay={i * 0.04}>
              <li className="grid grid-cols-[auto_1fr] gap-5 border-t border-ink/8 pt-6">
                <span className="display text-2xl text-ink/40">{label}</span>
                <div>
                  {d.title ? <h3 className="display text-2xl text-ink">{d.title}</h3> : null}
                  {d.description ? (
                    <p className="mt-2 text-[14.5px] leading-relaxed text-muted-foreground">
                      {d.description}
                    </p>
                  ) : null}
                  {Array.isArray(d.items) && d.items.length > 0 ? (
                    <ul className="mt-3 space-y-1.5 text-[14.5px] text-muted-foreground">
                      {d.items.map((item, j) => (
                        <li key={j} className="flex gap-2.5">
                          <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-ink/30" />
                          {item}
                        </li>
                      ))}
                    </ul>
                  ) : null}
                </div>
              </li>
            </Reveal>
          );
        })}
      </ol>
    </section>
  );
}

function Hosts({
  batchIds,
  batchHosts,
  hosts,
}: {
  batchIds: string[];
  batchHosts: ReturnType<typeof useContent>["batchHosts"];
  hosts: ReturnType<typeof useContent>["hosts"];
}) {
  const assigned = batchIds.flatMap((id) => hostsForBatch(id, batchHosts, hosts));
  const unique = Array.from(new Map(assigned.map((a) => [a.host.id, a.host])).values());
  if (unique.length === 0) return null;

  return (
    <section className="mt-20">
      <Reveal>
        <p className="eyebrow">Your hosts</p>
        <h2 className="display mt-4 text-4xl sm:text-5xl">Led by people you'll trust.</h2>
      </Reveal>
      <div className="mt-8 grid gap-4 sm:grid-cols-2">
        {unique.map((host) => (
          <Reveal key={host.id}>
            <div className="flex items-center gap-4 rounded-[24px] bg-card p-5 hairline">
              <span className="flex h-14 w-14 shrink-0 items-center justify-center overflow-hidden rounded-full bg-ink/8">
                {host.photo_url ? (
                  <img
                    src={host.photo_url}
                    alt={host.name}
                    className="h-full w-full object-cover"
                  />
                ) : (
                  <span className="display text-xl text-ink/60">{host.name.charAt(0)}</span>
                )}
              </span>
              <div className="min-w-0">
                <p className="display text-lg text-ink">{host.name}</p>
                <p className="truncate text-[12px] uppercase tracking-[0.14em] text-muted-foreground">
                  {host.home_location ?? "Trip leader"}
                </p>
              </div>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
