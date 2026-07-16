import { createFileRoute, Link } from "@tanstack/react-router";
import { Nav } from "@/components/site/Nav";
import { Footer } from "@/components/site/Footer";
import { Reveal } from "@/components/site/Reveal";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact — The Wandering Nomads" },
      {
        name: "description",
        content:
          "Reach Krish personally. Email, WhatsApp, phone and Instagram for enquiries and expedition planning.",
      },
      { property: "og:title", content: "Contact — The Wandering Nomads" },
      { property: "og:description", content: "Reach Krish personally to plan your next journey." },
      { property: "og:url", content: "/contact" },
    ],
    links: [{ rel: "canonical", href: "/contact" }],
  }),
  component: ContactPage,
});

function ContactPage() {
  return (
    <div className="min-h-screen bg-background">
      <Nav />
      <main className="pt-40 pb-32">
        <div className="mx-auto max-w-4xl px-6">
          <Reveal>
            <p className="eyebrow">Contact</p>
            <h1 className="display mt-4 text-5xl leading-[1.02] sm:text-6xl md:text-7xl">
              Write to Krish.
              <br />
              <em className="italic text-muted-foreground">He writes back.</em>
            </h1>
          </Reveal>

          <div className="mt-14 grid gap-8 sm:grid-cols-2">
            <Row label="Email" href="mailto:wanderwithkrish@gmail.com" v="wanderwithkrish@gmail.com" />
            <Row label="WhatsApp" href="https://wa.me/919005215255" v="+91 90052 15255" />
            <Row label="Phone" href="tel:+919005215255" v="+91 90052 15255" />
            <Row label="Instagram — Company" href="https://instagram.com/thewanderingnomads.in" v="@thewanderingnomads.in" />
            <Row label="Instagram — Founder" href="https://instagram.com/wanderwithkrishh" v="@wanderwithkrishh" />
            <Row label="Based in" v="Jaipur, Rajasthan, India" />
          </div>

          <Reveal delay={0.2}>
            <Link
              to="/"
              className="mt-14 inline-flex items-center gap-2 rounded-full bg-ink px-6 py-3 text-[13px] font-medium text-snow"
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

function Row({ label, v, href }: { label: string; v: string; href?: string }) {
  return (
    <Reveal>
      <div className="border-t border-ink/10 pt-5">
        <p className="text-[11px] uppercase tracking-[0.18em] text-muted-foreground">{label}</p>
        <p className="mt-3 text-[18px] text-ink">
          {href ? (
            <a href={href} className="border-b border-ink/20 pb-0.5 transition hover:border-ink" target="_blank" rel="noreferrer">
              {v}
            </a>
          ) : (
            v
          )}
        </p>
      </div>
    </Reveal>
  );
}
