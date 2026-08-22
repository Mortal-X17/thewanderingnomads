import type { HostRecord, TripBatchHostRecord, TripBatchRecord } from "./cms/types";
import { waLink } from "./site";

/**
 * Small, dependency-free helpers shared by the public trip surfaces
 * (trip cards, the Upcoming Trips listing, and the trip detail page).
 */

const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

/** "2026-08-25" → "25 Aug 2026" (date-only, no timezone drift). */
export function formatDate(iso?: string | null): string {
  if (!iso) return "";
  const d = new Date(iso.length === 10 ? `${iso}T00:00:00` : iso);
  if (Number.isNaN(d.getTime())) return iso;
  return `${d.getDate()} ${MONTHS[d.getMonth()]} ${d.getFullYear()}`;
}

/** "25 Aug – 31 Aug 2026" (collapses to a single date when end equals start). */
export function formatBatchDates(batch: Pick<TripBatchRecord, "start_date" | "end_date">): string {
  const start = formatDate(batch.start_date);
  const end = batch.end_date ? formatDate(batch.end_date) : "";
  return end && end !== start ? `${start} – ${end}` : start;
}

/** Batches for one trip, oldest first. */
export function batchesForTrip(batches: TripBatchRecord[], tripId: string): TripBatchRecord[] {
  return batches
    .filter((b) => b.trip_id === tripId)
    .sort((a, b) => a.start_date.localeCompare(b.start_date));
}

/** The first batch that starts today or later (the one to show on a card). */
export function upcomingBatch(batches: TripBatchRecord[]): TripBatchRecord | undefined {
  const today = new Date().toISOString().slice(0, 10);
  return batches.find((b) => b.start_date >= today);
}

/** Hosts assigned to a batch, with their role. */
export function hostsForBatch(
  batchId: string,
  batchHosts: TripBatchHostRecord[],
  hosts: HostRecord[],
): { host: HostRecord; role: "lead" | "co_host" }[] {
  const byId = new Map(hosts.map((h) => [h.id, h]));
  return batchHosts
    .filter((l) => l.batch_id === batchId)
    .map((l) => ({ host: byId.get(l.host_id), role: l.role }))
    .filter((x): x is { host: HostRecord; role: "lead" | "co_host" } => Boolean(x.host));
}

/* ----------------------------- WhatsApp ------------------------------ */

export { waLink };

/**
 * Pre-filled enquiry message — the visitor never has to type trip details.
 * Batch (when chosen) is inserted dynamically, matching the agreed
 * Book Now → WhatsApp conversion flow.
 */
export function tripEnquiryMessage(
  trip: { title: string },
  batch?: TripBatchRecord | null,
): string {
  const parts = [`Hi The Wandering Nomads! I'm interested in the ${trip.title}.`];
  if (batch) parts.push(`Batch: ${formatBatchDates(batch)}.`);
  parts.push("I'd like to know the next steps for booking.");
  return parts.join(" ");
}
