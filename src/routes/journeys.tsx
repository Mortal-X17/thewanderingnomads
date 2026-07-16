import { createFileRoute, Link } from "@tanstack/react-router";
import { Nav } from "@/components/site/Nav";
import { Footer } from "@/components/site/Footer";
import { Reveal } from "@/components/site/Reveal";

export const Route = createFileRoute("/journeys")({
  head: () => ({
    meta: [
      { title: "Journeys — The Wandering Nomads" },
      {
        name: "description",
        content:
          "Founder-led expeditions across Kashmir, Spiti, Jibhi, Rajasthan, Rishikesh and the Valley of Flowers.",
      },
      { property: "og:title", content: "Journeys — The Wandering Nomads" },
      { property: "og:description", content: "Small-group, founder-led expeditions across India." },
      { property: "og:url", content: "/journeys" },
    ],
    links: [{ rel: "canonical", href: "/journeys" }],
  }),
  component: JourneysPage,
});

function JourneysPage() {
  return (
    <div className="min-h-screen bg-background">
      <Nav />
      <main className="pt-40 pb-32">
        <div className="mx-auto max-w-4xl px-6">
          <Reveal>
            <p className="eyebrow">Journeys</p>
            <h1 className="display mt-4 text-5xl leading-[1.02] sm:text-6xl md:text-7xl">
              Every route is<br />
              <em className="italic text-muted-foreground">personally walked.</em>
            </h1>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="mt-10 max-w-2xl text-[16px] leading-relaxed text-muted-foreground">
              Full expedition pages — with itineraries, best time to travel and
              enquiry flows — are being crafted. The featured routes live on
              the home page.
            </p>
          </Reveal>
          <Reveal delay={0.15}>
            <Link
              to="/"
              className="mt-10 inline-flex items-center gap-2 rounded-full bg-ink px-6 py-3 text-[13px] font-medium text-snow"
            >
              ← See featured journeys
            </Link>
          </Reveal>
        </div>
      </main>
      <Footer />
    </div>
  );
}
