import { Link } from "@tanstack/react-router";

import type {
  HostRecord,
  JourneyRecord,
  TripBatchHostRecord,
  TripBatchRecord,
} from "@/lib/cms/types";
import { batchesForTrip, formatBatchDates, hostsForBatch, upcomingBatch } from "@/lib/trips";
import { RichText } from "@/components/site/RichText";

import heroImg from "@/assets/hero-himalaya.jpg";

/**
 * Reusable trip card — the product unit of the site.
 * Shows the next departure and lead host when batch data exists.
 */
export function TripCard({
  trip,
  batches = [],
  batchHosts = [],
  hosts = [],
}: {
  trip: JourneyRecord;
  batches?: TripBatchRecord[];
  batchHosts?: TripBatchHostRecord[];
  hosts?: HostRecord[];
}) {
  const tripBatches = batchesForTrip(batches, trip.id);
  const batch = upcomingBatch(tripBatches);
  const lead = batch
    ? hostsForBatch(batch.id, batchHosts, hosts).find((h) => h.role === "lead")?.host
    : undefined;

  const img = trip.hero_image_url ?? heroImg;
  const tag = trip.best_season ?? "Expedition";

  return (
    <Link
      to="/trip/$slug"
      params={{ slug: trip.slug }}
      className="group lift relative flex h-full flex-col overflow-hidden rounded-[28px] bg-card hairline"
    >
      <div className="relative aspect-[4/3] overflow-hidden">
        <img
          src={img}
          alt={`${trip.title} — ${trip.destination}`}
          loading="lazy"
          width={1400}
          height={1050}
          className="h-full w-full object-cover transition duration-[1200ms] ease-out group-hover:scale-[1.06]"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-black/10 to-transparent" />

        <div className="absolute left-4 top-4 flex gap-2">
          <span className="rounded-full glass-dark px-3 py-1 text-[10.5px] uppercase tracking-[0.18em] text-white">
            {tag}
          </span>
        </div>
        {trip.duration ? (
          <span className="absolute right-4 top-4 rounded-full glass-dark px-3 py-1 text-[10.5px] uppercase tracking-[0.18em] text-white">
            {trip.duration}
          </span>
        ) : null}

        <div className="absolute bottom-4 left-4 right-4 text-white">
          <p className="text-[11px] uppercase tracking-[0.18em] text-white/70">
            {trip.destination}
          </p>
          <h3 className="display mt-1 text-3xl">{trip.title}</h3>
        </div>
      </div>

      <div className="flex flex-1 flex-col p-6">
        {trip.short_description ? (
          <RichText
            html={trip.short_description}
            className="text-[14.5px] leading-[1.65] text-muted-foreground"
          />
        ) : null}

        <dl className="mt-6 grid grid-cols-3 gap-3 border-t border-ink/8 pt-5 text-[11px]">
          <div>
            <dt className="uppercase tracking-[0.16em] text-muted-foreground">Level</dt>
            <dd className="mt-1 text-ink">{trip.difficulty ?? "—"}</dd>
          </div>
          <div>
            <dt className="uppercase tracking-[0.16em] text-muted-foreground">Next</dt>
            <dd className="mt-1 text-ink">{batch ? formatBatchDates(batch) : "TBA"}</dd>
          </div>
          <div>
            <dt className="uppercase tracking-[0.16em] text-muted-foreground">Seats</dt>
            <dd className="mt-1 text-ink">
              {batch?.seats_remaining != null ? batch.seats_remaining : "—"}
            </dd>
          </div>
        </dl>

        <div className="mt-6 flex items-center justify-between border-t border-ink/8 pt-4">
          <span className="text-[11px] uppercase tracking-[0.18em] text-muted-foreground">
            {lead ? `Led by ${lead.name}` : "Led by The Wandering Nomads"}
          </span>
          {trip.price ? <span className="display text-xl text-ink">{trip.price}</span> : null}
        </div>
      </div>
    </Link>
  );
}
