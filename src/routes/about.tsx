import { createFileRoute, Link } from "@tanstack/react-router";
import { Nav } from "@/components/site/Nav";
import { Footer } from "@/components/site/Footer";
import { Reveal } from "@/components/site/Reveal";
import { Timeline } from "@/components/site/Timeline";
import { FloatingWhatsApp } from "@/components/site/FloatingWhatsApp";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About Krish — Founder, The Wandering Nomads" },
      {
        name: "description",
        content:
          "From a small village in Deoria to leading expeditions across the Himalayas — the story of Krishnakant Yadav, founder of The Wandering Nomads.",
      },
      { property: "og:title", content: "About Krish — Founder, The Wandering Nomads" },
      {
        property: "og:description",
        content:
          "The founder's story behind The Wandering Nomads — village, road, community, expeditions.",
      },
      { property: "og:url", content: "/about" },
    ],
    links: [{ rel: "canonical", href: "/about" }],
  }),
  component: AboutPage,
});

function AboutPage() {
  return (
    <div className="min-h-screen bg-background">
      <Nav />
      <main className="pt-40 pb-32">
        <div className="mx-auto max-w-3xl px-6">
          <Reveal>
            <p className="eyebrow">The founder</p>
            <h1 className="display mt-5 text-5xl leading-[1.02] sm:text-6xl md:text-7xl text-balance">
              A founder, not a<br />
              <em className="italic text-muted-foreground">travel brand.</em>
            </h1>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="mt-10 max-w-[58ch] text-[16.5px] leading-[1.7] text-muted-foreground">
              Krishnakant Yadav — Krish — has spent nine months on the road
              across India. Not for a list of places, but for the people at
              the end of each road. What follows is his journey, in eight
              short chapters.
            </p>
          </Reveal>
        </div>

        <section
          aria-label="Krish's journey"
          className="mx-auto mt-20 max-w-3xl px-6"
        >
          <Timeline />
        </section>

        <div className="mx-auto mt-16 max-w-3xl px-6">
          <Reveal delay={0.05}>
            <div className="flex flex-wrap items-center gap-3">
              <Link
                to="/journeys"
                className="inline-flex items-center rounded-full bg-ink px-6 py-3.5 text-[13.5px] font-medium text-snow transition hover:opacity-90 focus:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
              >
                See the journeys
              </Link>
              <Link
                to="/contact"
                className="inline-flex items-center rounded-full border border-ink/15 px-6 py-3.5 text-[13.5px] font-medium text-ink transition hover:bg-ink/5 focus:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
              >
                Write to Krish
              </Link>
            </div>
          </Reveal>
        </div>
      </main>
      <Footer />
      <FloatingWhatsApp />
    </div>
  );
}
