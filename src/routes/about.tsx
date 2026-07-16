import { createFileRoute, Link } from "@tanstack/react-router";
import { Nav } from "@/components/site/Nav";
import { Footer } from "@/components/site/Footer";
import { Reveal } from "@/components/site/Reveal";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About Krish — The Wandering Nomads" },
      {
        name: "description",
        content:
          "From a small village in Deoria to leading expeditions across the Himalayas — the story of Krish, founder of The Wandering Nomads.",
      },
      { property: "og:title", content: "About Krish — The Wandering Nomads" },
      { property: "og:description", content: "The founder's story behind The Wandering Nomads." },
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
        <div className="mx-auto max-w-4xl px-6">
          <Reveal>
            <p className="eyebrow">About</p>
            <h1 className="display mt-4 text-5xl leading-[1.02] sm:text-6xl md:text-7xl">
              A founder, not a<br />
              <em className="italic text-muted-foreground">travel brand.</em>
            </h1>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="mt-10 max-w-2xl text-[16px] leading-relaxed text-muted-foreground">
              The full founder story is being written for this page. In the
              meantime, the short version is on the home page — scroll to the
              chapter titled <em>He didn't build a travel company.</em>
            </p>
          </Reveal>
          <Reveal delay={0.15}>
            <Link
              to="/"
              className="mt-10 inline-flex items-center gap-2 rounded-full bg-ink px-6 py-3 text-[13px] font-medium text-snow"
            >
              ← Back to home
            </Link>
          </Reveal>
        </div>
      </main>
      <Footer />
    </div>
  );
}
