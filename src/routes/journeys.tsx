import { createFileRoute, redirect } from "@tanstack/react-router";

/**
 * Legacy route — the canonical trip listing now lives at /upcoming-trips.
 * Kept as a redirect so any existing links (and bookmarks) keep working.
 */
export const Route = createFileRoute("/journeys")({
  loader: () => redirect({ to: "/upcoming-trips" }),
});
