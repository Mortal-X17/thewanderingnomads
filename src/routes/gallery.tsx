import { createFileRoute, Link } from "@tanstack/react-router";
import { Nav } from "@/components/site/Nav";
import { Footer } from "@/components/site/Footer";
import { Reveal } from "@/components/site/Reveal";

export const Route = createFileRoute("/gallery")({
  head: () => ({
    meta: [
      { title: "Gallery — The Wandering Nomads" },
      { name: "description", content: "Photographs from expeditions across the Himalayas." },
      { property: "og:title", content: "Gallery — The Wandering Nomads" },
      { property: "og:description", content: "Field photographs from Krish and past expeditions." },
      { property: "og:url", content: "/gallery" },
    ],
    links: [{ rel: "canonical", href: "/gallery" }],
  }),
  component: GalleryPage,
});

function GalleryPage() {
  return (
    <div className="min-h-screen bg-background">
      <Nav />
      <main className="pt-40 pb-32">
        <div className="mx-auto max-w-4xl px-6">
          <Reveal>
            <p className="eyebrow">Gallery</p>
            <h1 className="display mt-4 text-5xl leading-[1.02] sm:text-6xl md:text-7xl">
              Field notes from<br />
              <em className="italic text-muted-foreground">the trail.</em>
            </h1>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="mt-10 max-w-2xl text-[16px] leading-relaxed text-muted-foreground">
              The full gallery lives on the home page for now. A dedicated
              archive with locations and dates is being prepared.
            </p>
          </Reveal>
          <Reveal delay={0.15}>
            <Link
              to="/"
              className="mt-10 inline-flex items-center gap-2 rounded-full bg-ink px-6 py-3 text-[13px] font-medium text-snow"
            >
              ← See gallery
            </Link>
          </Reveal>
        </div>
      </main>
      <Footer />
    </div>
  );
}
