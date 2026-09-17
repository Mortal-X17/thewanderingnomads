import { createFileRoute } from "@tanstack/react-router";
import type {} from "@tanstack/react-start";

import { readPublicContent } from "@/lib/cms/public-read";
import { DESTINATIONS, destinationHref } from "@/lib/destinations";
import { absoluteUrl } from "@/lib/site";

interface SitemapEntry {
  path: string;
  changefreq?: "weekly" | "monthly" | "daily";
  priority?: string;
}

const STATIC_ENTRIES: SitemapEntry[] = [
  { path: "/", changefreq: "weekly", priority: "1.0" },
  { path: "/upcoming-trips", changefreq: "daily", priority: "0.9" },
  { path: "/india-trips", changefreq: "weekly", priority: "0.9" },
  { path: "/international-trips", changefreq: "weekly", priority: "0.8" },
  { path: "/about", changefreq: "monthly", priority: "0.6" },
  { path: "/gallery", changefreq: "monthly", priority: "0.5" },
  { path: "/atlas", changefreq: "monthly", priority: "0.5" },
  { path: "/contact", changefreq: "monthly", priority: "0.7" },
];

// Destination chapters are static catalogue pages — always listable.
const DESTINATION_ENTRIES: SitemapEntry[] = DESTINATIONS.map((d) => ({
  path: destinationHref(d),
  changefreq: "weekly",
  priority: "0.7",
}));

async function collectEntries(): Promise<SitemapEntry[]> {
  const entries = [...STATIC_ENTRIES, ...DESTINATION_ENTRIES];
  try {
    // Live trip slugs from the CMS (falls back to nothing when the backend is
    // unreachable — the static + destination pages above remain valid).
    const content = await readPublicContent();
    for (const journey of content.journeys) {
      if (!journey.slug) continue;
      entries.push({ path: `/trip/${journey.slug}`, changefreq: "weekly", priority: "0.8" });
    }
  } catch {
    /* the sitemap stays valid without CMS data */
  }
  return entries;
}

export const Route = createFileRoute("/sitemap.xml")({
  server: {
    handlers: {
      GET: async () => {
        const entries = await collectEntries();

        const urls = entries.map((e) =>
          [
            `  <url>`,
            `    <loc>${absoluteUrl(e.path)}</loc>`,
            e.changefreq ? `    <changefreq>${e.changefreq}</changefreq>` : null,
            e.priority ? `    <priority>${e.priority}</priority>` : null,
            `  </url>`,
          ]
            .filter(Boolean)
            .join("\n"),
        );

        const xml = [
          `<?xml version="1.0" encoding="UTF-8"?>`,
          `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">`,
          ...urls,
          `</urlset>`,
        ].join("\n");

        return new Response(xml, {
          headers: {
            "Content-Type": "application/xml",
            "Cache-Control": "public, max-age=3600",
          },
        });
      },
    },
  },
});
