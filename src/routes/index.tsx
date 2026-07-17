import { createFileRoute, Link } from "@tanstack/react-router";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef, useState } from "react";

import { Nav } from "@/components/site/Nav";
import { Footer } from "@/components/site/Footer";
import { Reveal } from "@/components/site/Reveal";
import { Counter } from "@/components/site/Counter";
import { Community } from "@/components/site/Community";
import { FloatingWhatsApp } from "@/components/site/FloatingWhatsApp";

import heroImg from "@/assets/hero-himalaya.jpg";
import krishAsset from "@/assets/krish-founder.png.asset.json";
const krishImg = krishAsset.url;
import jKashmir from "@/assets/journey-kashmir.jpg";
import jSpiti from "@/assets/journey-spiti.jpg";
import jJibhi from "@/assets/journey-jibhi.jpg";
import jVof from "@/assets/journey-vof.jpg";
import jRaj from "@/assets/journey-rajasthan.jpg";
import jRishi from "@/assets/journey-rishikesh.jpg";
import gCampfire from "@/assets/gallery-campfire.jpg";
import gTrail from "@/assets/gallery-trail.jpg";
import gLocal from "@/assets/gallery-local.jpg";
import gPines from "@/assets/gallery-pines.jpg";
import gLake from "@/assets/gallery-lake.jpg";
import gVillage from "@/assets/gallery-village.jpg";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "The Wandering Nomads — Founder-Led Expeditions by Krish" },
      {
        name: "description",
        content:
          "Founder-led expeditions across India's most breathtaking destinations—crafted with trust, community, and unforgettable experiences.",
      },
      { property: "og:title", content: "The Wandering Nomads — Founder-Led Expeditions by Krish" },
      {
        property: "og:description",
        content:
          "Founder-led expeditions across India's most breathtaking destinations—crafted with trust, community, and unforgettable experiences.",
      },
      { property: "og:url", content: "/" },
    ],
    links: [{ rel: "canonical", href: "/" }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "TravelAgency",
          name: "The Wandering Nomads",
          url: "https://thewanderingnomads.lovable.app",
          description:
            "Founder-led expeditions across India — small groups, real places, personally led by Krish.",
          founder: {
            "@type": "Person",
            name: "Krishnakant Yadav",
            alternateName: "Krish",
            jobTitle: "Founder & Expedition Lead",
          },
          areaServed: "India",
          address: {
            "@type": "PostalAddress",
            addressLocality: "Jaipur",
            addressRegion: "Rajasthan",
            addressCountry: "IN",
          },
          sameAs: [
            "https://instagram.com/thewanderingnomads.in",
            "https://instagram.com/wanderwithkrishh",
          ],
        }),
      },
    ],
  }),
  component: Home,
});

function Home() {
  return (
    <div className="min-h-screen bg-background">
      <ScrollProgress />
      <Nav />
      <main>
        <Hero />
        <Stats />
        <About />
        <Journeys />
        <WhyKrish />
        <Gallery />
        <Community />
        <Testimonials />
        <Certifications />
        <Contact />
      </main>
      <Footer />
      <FloatingWhatsApp />
      <div
        aria-hidden
        className="pointer-events-none fixed inset-0 z-[60] opacity-[0.035] mix-blend-overlay"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='160' height='160'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2' stitchTiles='stitch'/></filter><rect width='100%25' height='100%25' filter='url(%23n)'/></svg>\")",
        }}
      />
    </div>
  );
}

function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  return (
    <motion.div
      style={{ scaleX: scrollYProgress, transformOrigin: "0% 50%" }}
      className="fixed inset-x-0 top-0 z-[70] h-[2px] bg-gradient-to-r from-forest via-sunrise to-river"
    />
  );
}

/* ---------------- HERO ---------------- */

function Hero() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "18%"]);
  const scale = useTransform(scrollYProgress, [0, 1], [1, 1.08]);
  const overlay = useTransform(scrollYProgress, [0, 1], [0.35, 0.7]);

  return (
    <section ref={ref} className="relative h-[100svh] w-full overflow-hidden bg-ink">
      <motion.div style={{ y, scale }} className="absolute inset-0">
        <img
          src={heroImg}
          alt="A lone traveller stands on a ridge as golden sunrise light spills across snow-capped Himalayan peaks"
          className="h-full w-full object-cover"
          fetchPriority="high"
          width={1920}
          height={1280}
        />
      </motion.div>
      <motion.div
        style={{ opacity: overlay }}
        className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/10 to-black/70"
      />

      <div className="relative z-10 mx-auto flex h-full max-w-6xl flex-col justify-end px-6 pb-20 sm:pb-28">
        <motion.p
          initial={{ opacity: 0, y: 14, filter: "blur(8px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          transition={{ duration: 0.9, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
          className="eyebrow text-white/70"
        >
          Founder-Led Expeditions · Since 2024
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 26, filter: "blur(12px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          transition={{ duration: 1.1, delay: 0.55, ease: [0.22, 1, 0.36, 1] }}
          className="display mt-6 max-w-4xl text-[13vw] leading-[0.95] text-white sm:text-7xl md:text-[88px]"
        >
          Journeys that begin
          <br />
          <em className="italic text-white/85">where the road ends.</em>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 16, filter: "blur(6px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          transition={{ duration: 0.9, delay: 0.9, ease: [0.22, 1, 0.36, 1] }}
          className="mt-8 max-w-xl text-[15px] leading-relaxed text-white/80 sm:text-base"
        >
          Small groups. Real places. Every expedition personally led by Krish —
          across Kashmir, Spiti, Jibhi and the far corners of India.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 1.15, ease: [0.22, 1, 0.36, 1] }}
          className="mt-10 flex flex-wrap items-center gap-3"
        >
          <Link
            to="/journeys"
            className="group inline-flex items-center gap-3 rounded-full bg-white px-6 py-3.5 text-[13.5px] font-medium text-ink transition hover:bg-white/90"
          >
            Explore Journeys
            <ArrowRight className="h-4 w-4 transition group-hover:translate-x-0.5" />
          </Link>
          <Link
            to="/contact"
            className="inline-flex items-center gap-2 rounded-full border border-white/25 bg-white/5 px-6 py-3.5 text-[13.5px] font-medium text-white backdrop-blur-md transition hover:bg-white/15"
          >
            Get in Touch
          </Link>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.2, delay: 1.5 }}
        className="absolute bottom-6 left-1/2 z-10 -translate-x-1/2 text-white/60"
      >
        <div className="flex flex-col items-center gap-2">
          <span className="text-[10px] tracking-[0.3em] uppercase">Scroll</span>
          <motion.span
            animate={{ y: [0, 6, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            className="block h-6 w-px bg-gradient-to-b from-white/60 to-transparent"
          />
        </div>
      </motion.div>
    </section>
  );
}

/* ---------------- STATS ---------------- */

function Stats() {
  const items = [
    { n: 24, label: "Indian States Explored" },
    { n: 200, label: "Cities Visited" },
    { n: 30, label: "Solo Expeditions" },
    { n: 70, label: "Happy Travellers" },
    { n: 5, label: "Founder-Led Expeditions" },
  ];
  return (
    <section className="relative border-b border-ink/8 bg-snow py-24 sm:py-32">
      <div className="mx-auto max-w-6xl px-6">
        <Reveal>
          <p className="eyebrow">A trail measured in trust</p>
          <h2 className="display mt-4 max-w-3xl text-4xl sm:text-5xl md:text-6xl">
            Nine months on the road.
            <br />
            <span className="text-muted-foreground">Every mile, personally walked.</span>
          </h2>
        </Reveal>

        <div className="mt-16 grid grid-cols-2 gap-x-6 gap-y-12 sm:grid-cols-3 lg:grid-cols-5">
          {items.map((s, i) => (
            <Reveal key={s.label} delay={i * 0.08}>
              <div className="flex flex-col">
                <span className="display text-5xl text-ink sm:text-6xl">
                  <Counter to={s.n} />
                </span>
                <span className="mt-3 text-[12px] uppercase tracking-[0.15em] text-muted-foreground">
                  {s.label}
                </span>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------------- ABOUT / STORY ---------------- */

function About() {
  const chapters = [
    { k: "01", t: "A small village", d: "Born in Deoria, Uttar Pradesh — curious about a world beyond the fields." },
    { k: "02", t: "Jaipur", d: "Moved for university. Sharpened communication. Started saying yes to the road." },
    { k: "03", t: "The first solo trip", d: "One backpack. One decision. Thousands of kilometres of hitchhiking followed." },
    { k: "04", t: "Living with locals", d: "Stayed inside Kashmiri homes. Ate what they ate. Listened more than spoke." },
    { k: "05", t: "24+ states, 200+ cities", d: "India revealed itself slowly — not in landmarks, but in people." },
    { k: "06", t: "The Wandering Nomads", d: "A community for young travellers who want the real thing, led by someone they trust." },
  ];

  return (
    <section id="about" className="relative bg-background py-24 sm:py-36">
      <div className="mx-auto max-w-6xl px-6">
        <div className="grid gap-16 lg:grid-cols-[0.9fr_1.1fr] lg:gap-24">
          <div className="lg:sticky lg:top-32 lg:self-start">
            <Reveal>
              <FounderPortrait src={krishImg} />
            </Reveal>
          </div>


          <div>
            <Reveal>
              <p className="eyebrow">The Founder</p>
              <h2 className="display mt-4 text-4xl sm:text-5xl md:text-[56px] leading-[1.02]">
                He didn't build a
                <br />
                <em className="italic text-muted-foreground">travel company.</em>
                <br />
                He built a way of travelling.
              </h2>
            </Reveal>

            <Reveal delay={0.1}>
              <p className="mt-8 max-w-lg text-[15.5px] leading-relaxed text-muted-foreground">
                Krish is not a tour operator. He is the reason people join. Every
                expedition is led by him — the same person you write to, the same
                person who plans the route, and the one who sits with you around
                the fire at 11,000 feet.
              </p>
            </Reveal>

            <ol className="mt-14 space-y-10">
              {chapters.map((c, i) => (
                <Reveal key={c.k} delay={i * 0.06}>
                  <li className="grid grid-cols-[auto_1fr] gap-5 border-t border-ink/8 pt-6">
                    <span className="display text-2xl text-ink/40">{c.k}</span>
                    <div>
                      <h3 className="display text-2xl text-ink">{c.t}</h3>
                      <p className="mt-2 text-[14.5px] leading-relaxed text-muted-foreground">
                        {c.d}
                      </p>
                    </div>
                  </li>
                </Reveal>
              ))}
            </ol>

            <Reveal delay={0.1}>
              <div className="mt-12 rounded-3xl bg-muted/50 p-6 hairline">
                <p className="text-[13.5px] leading-relaxed text-ink/80">
                  Alongside travel, Krish is a certified ethical hacker and
                  cybersecurity professional — a quieter part of his story, but
                  one that shapes the discipline behind every expedition.
                </p>
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------------- FEATURED JOURNEYS ---------------- */

const journeys = [
  {
    slug: "kashmir",
    name: "Kashmir",
    tag: "Signature Expedition",
    img: jKashmir,
    desc: "Shikaras on Dal Lake. Nights inside Kashmiri homes. The valley the way Krish knows it.",
    duration: "8 days",
    season: "Apr — Oct",
    group: "8–12",
    difficulty: "Easy",
  },
  {
    slug: "spiti",
    name: "Spiti",
    tag: "High Altitude",
    img: jSpiti,
    desc: "Cold desert monasteries, star-lit villages, and roads that hang from the mountain's edge.",
    duration: "10 days",
    season: "Jun — Sep",
    group: "6–10",
    difficulty: "Moderate",
  },
  {
    slug: "jibhi",
    name: "Jibhi",
    tag: "Slow Travel",
    img: jJibhi,
    desc: "Wooden houses, misty pine forests, and a small stream that never stops singing.",
    duration: "5 days",
    season: "Mar — Nov",
    group: "6–10",
    difficulty: "Easy",
  },
  {
    slug: "valley-of-flowers",
    name: "Valley of Flowers",
    tag: "Monsoon Trek",
    img: jVof,
    desc: "An alpine meadow that bursts into colour for only a few weeks a year.",
    duration: "6 days",
    season: "Jul — Aug",
    group: "6–8",
    difficulty: "Moderate",
  },
  {
    slug: "rajasthan",
    name: "Rajasthan",
    tag: "Desert Route",
    img: jRaj,
    desc: "Dunes at dusk, forts at dawn, and the honesty of home-cooked thalis in between.",
    duration: "7 days",
    season: "Oct — Mar",
    group: "8–12",
    difficulty: "Easy",
  },
  {
    slug: "rishikesh",
    name: "Rishikesh",
    tag: "River & Ridge",
    img: jRishi,
    desc: "The Ganges at first light, mountain trails at noon, and prayer flags in every breath.",
    duration: "4 days",
    season: "Year-round",
    group: "6–10",
    difficulty: "Easy",
  },
];

function Journeys() {
  return (
    <section id="journeys" className="relative bg-snow py-24 sm:py-36 border-t border-ink/8">
      <div className="mx-auto max-w-6xl px-6">
        <div className="flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-end">
          <Reveal>
            <p className="eyebrow">Featured Journeys</p>
            <h2 className="display mt-4 max-w-2xl text-4xl sm:text-5xl md:text-6xl">
              Chosen routes.
              <br />
              <span className="text-muted-foreground italic">Not packages.</span>
            </h2>
          </Reveal>
          <Reveal delay={0.1}>
            <Link
              to="/journeys"
              className="group inline-flex items-center gap-2 text-[13px] font-medium text-ink"
            >
              View all expeditions
              <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" />
            </Link>
          </Reveal>
        </div>

        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {journeys.map((j, i) => (
            <Reveal key={j.slug} delay={i * 0.06}>
              <article className="group lift relative flex h-full flex-col overflow-hidden rounded-[28px] bg-card hairline">
                <div className="relative aspect-[4/5] overflow-hidden">
                  <img
                    src={j.img}
                    alt={`${j.name} — ${j.desc}`}
                    className="h-full w-full object-cover transition duration-[1200ms] ease-out group-hover:scale-[1.06]"
                    loading="lazy"
                    width={1400}
                    height={1750}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
                  <div className="absolute left-4 top-4">
                    <span className="rounded-full glass-dark px-3 py-1 text-[10.5px] uppercase tracking-[0.18em] text-white">
                      {j.tag}
                    </span>
                  </div>
                  <div className="absolute bottom-4 left-4 right-4 flex items-end justify-between text-white">
                    <h3 className="display text-3xl">{j.name}</h3>
                    <span className="text-[11px] uppercase tracking-[0.18em] text-white/80">
                      {j.duration}
                    </span>
                  </div>
                </div>
                <div className="flex flex-1 flex-col p-6">
                  <p className="text-[14.5px] leading-[1.65] text-muted-foreground">{j.desc}</p>

                  <dl className="mt-6 grid grid-cols-3 gap-3 border-t border-ink/8 pt-5 text-[11px]">
                    <div>
                      <dt className="uppercase tracking-[0.16em] text-muted-foreground">Season</dt>
                      <dd className="mt-1 text-ink">{j.season}</dd>
                    </div>
                    <div>
                      <dt className="uppercase tracking-[0.16em] text-muted-foreground">Group</dt>
                      <dd className="mt-1 text-ink">{j.group}</dd>
                    </div>
                    <div>
                      <dt className="uppercase tracking-[0.16em] text-muted-foreground">Level</dt>
                      <dd className="mt-1 text-ink">{j.difficulty}</dd>
                    </div>
                  </dl>

                  <div className="mt-6 flex items-center justify-between pt-4 border-t border-ink/8">
                    <span className="text-[11px] uppercase tracking-[0.18em] text-muted-foreground">
                      Led by Krish
                    </span>
                    <span className="inline-flex items-center gap-1.5 text-[13px] font-medium text-ink">
                      Explore
                      <ArrowRight className="h-3.5 w-3.5 transition group-hover:translate-x-0.5" />
                    </span>
                  </div>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------------- WHY KRISH ---------------- */

const why = [
  { t: "Personally Led", d: "Every expedition. Not a hired guide. The founder is with you." },
  { t: "Hidden Gems", d: "Trails and villages built from nine months of on-ground travel." },
  { t: "Authentic Local Stays", d: "Where possible, we stay with families — not in identical hotels." },
  { t: "Budget-Smart", d: "Priced for young travellers. Nothing hidden, nothing padded." },
  { t: "Small Groups", d: "Deliberately small. So the mountain still feels like the mountain." },
  { t: "Community First", d: "You leave with new friends, not a group of strangers on a bus." },
];

function WhyKrish() {
  return (
    <section className="relative bg-background py-24 sm:py-36">
      <div className="mx-auto max-w-6xl px-6">
        <Reveal>
          <p className="eyebrow">Why travel with Krish</p>
          <h2 className="display mt-4 max-w-3xl text-4xl sm:text-5xl md:text-6xl">
            You're not booking a trip.
            <br />
            <span className="italic text-muted-foreground">You're booking a person.</span>
          </h2>
        </Reveal>

        <div className="mt-16 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {why.map((w, i) => (
            <Reveal key={w.t} delay={i * 0.05}>
              <div className="group relative h-full rounded-[24px] hairline bg-card p-7 lift">
                <span className="display text-sm text-ink/30">{String(i + 1).padStart(2, "0")}</span>
                <h3 className="display mt-6 text-2xl text-ink">{w.t}</h3>
                <p className="mt-3 text-[14.5px] leading-relaxed text-muted-foreground">{w.d}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------------- GALLERY ---------------- */

const gallery = [
  { src: gCampfire, loc: "Chandratal · 4,300 m", cls: "row-span-2" },
  { src: gTrail, loc: "Pine trail · Himachal", cls: "" },
  { src: gLake, loc: "Alpine lake · Spiti", cls: "" },
  { src: gLocal, loc: "Local host · Kashmir", cls: "row-span-2" },
  { src: gPines, loc: "Deodar canopy · Jibhi", cls: "" },
  { src: gVillage, loc: "Stone village · Uttarakhand", cls: "" },
];

function Gallery() {
  return (
    <section id="gallery" className="relative bg-snow py-24 sm:py-36 border-t border-ink/8">
      <div className="mx-auto max-w-6xl px-6">
        <Reveal>
          <p className="eyebrow">Field Notes</p>
          <h2 className="display mt-4 max-w-3xl text-4xl sm:text-5xl md:text-6xl">
            Moments the camera
            <br />
            <span className="italic text-muted-foreground">almost caught.</span>
          </h2>
        </Reveal>

        <div className="mt-14 grid auto-rows-[220px] grid-cols-2 gap-3 sm:auto-rows-[260px] md:grid-cols-3 md:gap-4">
          {gallery.map((g, i) => (
            <Reveal key={i} delay={i * 0.05} className={g.cls}>
              <figure className="group relative h-full w-full overflow-hidden rounded-2xl hairline">
                <img
                  src={g.src}
                  alt={g.loc}
                  className="h-full w-full object-cover transition duration-[1200ms] ease-out group-hover:scale-[1.05]"
                  loading="lazy"
                />
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 transition group-hover:opacity-100" />
                <figcaption className="pointer-events-none absolute bottom-3 left-3 translate-y-2 text-[11px] uppercase tracking-[0.18em] text-white opacity-0 transition group-hover:translate-y-0 group-hover:opacity-100">
                  {g.loc}
                </figcaption>
              </figure>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------------- TESTIMONIALS ---------------- */

const testimonials = [
  {
    q: "Krish doesn't lead a tour — he shares a home. Kashmir wasn't a destination, it was a week of belonging.",
    n: "A traveller",
    r: "Kashmir Expedition",
  },
  {
    q: "The most honest travel experience I've had in India. Small group, real places, no marketing fluff.",
    n: "A traveller",
    r: "Spiti Expedition",
  },
  {
    q: "I came for the mountains and left with friendships that outlasted the trip.",
    n: "A traveller",
    r: "Jibhi Retreat",
  },
];

function Testimonials() {
  return (
    <section className="relative bg-background py-24 sm:py-36">
      <div className="mx-auto max-w-6xl px-6">
        <Reveal>
          <p className="eyebrow">In their words</p>
          <h2 className="display mt-4 max-w-2xl text-4xl sm:text-5xl md:text-6xl">
            Trust is earned
            <br />
            <span className="italic text-muted-foreground">one expedition at a time.</span>
          </h2>
        </Reveal>

        <div className="mt-14 grid gap-5 md:grid-cols-3">
          {testimonials.map((t, i) => (
            <Reveal key={i} delay={i * 0.08}>
              <figure className="glass flex h-full flex-col rounded-[28px] p-8">
                <span className="display text-6xl leading-none text-ink/20">&ldquo;</span>
                <blockquote className="mt-2 text-[16px] leading-relaxed text-ink/85">
                  {t.q}
                </blockquote>
                <figcaption className="mt-8 flex items-center gap-3 border-t border-ink/8 pt-5">
                  <span className="flex h-10 w-10 items-center justify-center rounded-full bg-ink/8 text-[12px] font-medium text-ink/60">
                    {t.n.charAt(0)}
                  </span>
                  <div>
                    <p className="text-[13.5px] font-medium text-ink">{t.n}</p>
                    <p className="text-[11.5px] uppercase tracking-[0.15em] text-muted-foreground">
                      {t.r}
                    </p>
                  </div>
                </figcaption>
              </figure>
            </Reveal>
          ))}
        </div>
        <Reveal delay={0.1}>
          <p className="mt-8 text-xs text-muted-foreground">
            Placeholder quotes. Real traveller stories will be added as the community grows.
          </p>
        </Reveal>
      </div>
    </section>
  );
}

/* ---------------- CERTIFICATIONS ---------------- */

const certs = [
  { t: "Certified Ethical Hacker", d: "Cybersecurity discipline that shapes every logistics decision." },
  { t: "Cybersecurity Professional", d: "Formal training and independent practice since university." },
  { t: "JECRC University", d: "Alumni. Recognised within the JECRC community." },
  { t: "Founder-Led Since 2024", d: "Every expedition personally led — never outsourced." },
];

function Certifications() {
  return (
    <section className="relative bg-snow py-24 sm:py-36 border-t border-ink/8">
      <div className="mx-auto max-w-6xl px-6">
        <Reveal>
          <p className="eyebrow">Credentials</p>
          <h2 className="display mt-4 max-w-2xl text-4xl sm:text-5xl md:text-6xl">
            Quietly credentialed.
          </h2>
        </Reveal>

        <div className="mt-14 grid gap-px overflow-hidden rounded-[24px] hairline bg-ink/8 sm:grid-cols-2">
          {certs.map((c, i) => (
            <Reveal key={c.t} delay={i * 0.05}>
              <div className="h-full bg-card p-8">
                <p className="eyebrow">0{i + 1}</p>
                <h3 className="display mt-4 text-2xl text-ink">{c.t}</h3>
                <p className="mt-3 text-[14.5px] leading-relaxed text-muted-foreground">{c.d}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------------- CONTACT ---------------- */

function Contact() {
  return (
    <section id="contact" className="relative overflow-hidden bg-ink py-24 text-snow sm:py-36">
      <div
        className="absolute inset-0 opacity-40"
        style={{
          backgroundImage: `url(${heroImg})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          filter: "blur(2px)",
        }}
      />
      <div className="absolute inset-0 bg-ink/85" />
      <div className="relative mx-auto max-w-6xl px-6">
        <div className="grid gap-16 lg:grid-cols-[1.05fr_1fr]">
          <div>
            <Reveal>
              <p className="eyebrow text-snow/60">The next expedition</p>
              <h2 className="display mt-4 text-4xl leading-[1.02] text-snow sm:text-5xl md:text-[64px]">
                Write to Krish.
                <br />
                <span className="italic text-snow/60">He writes back — personally.</span>
              </h2>
            </Reveal>
            <Reveal delay={0.1}>
              <div className="mt-12 grid gap-6 text-[14.5px] sm:grid-cols-2">
                <ContactLine label="Email" href="mailto:wanderwithkrish@gmail.com" v="wanderwithkrish@gmail.com" />
                <ContactLine label="WhatsApp" href="https://wa.me/919005215255" v="+91 90052 15255" />
                <ContactLine label="Phone" href="tel:+919005215255" v="+91 90052 15255" />
                <ContactLine label="Instagram" href="https://instagram.com/thewanderingnomads.in" v="@thewanderingnomads.in" />
                <ContactLine label="Founder" href="https://instagram.com/wanderwithkrishh" v="@wanderwithkrishh" />
                <ContactLine label="Based in" v="Jaipur, Rajasthan" />
              </div>
            </Reveal>
          </div>

          <Reveal delay={0.15}>
            <form
              onSubmit={(e) => e.preventDefault()}
              className="glass-dark rounded-[28px] p-6 sm:p-8"
            >
              <p className="eyebrow text-snow/60">Enquire</p>
              <h3 className="display mt-3 text-2xl text-snow">Plan a journey</h3>
              <div className="mt-6 grid gap-4">
                <Field label="Your name" placeholder="Krish Yadav" />
                <Field label="Email or phone" placeholder="you@somewhere.in" />
                <Field label="Destination in mind" placeholder="Kashmir, Spiti, unsure…" />
                <div>
                  <label className="text-[11px] uppercase tracking-[0.18em] text-snow/50">
                    A few words
                  </label>
                  <textarea
                    rows={4}
                    placeholder="When you'd like to travel, group size, anything on your mind."
                    className="mt-2 w-full rounded-2xl border border-white/15 bg-white/5 px-4 py-3 text-[14.5px] text-snow placeholder:text-snow/40 outline-none transition focus:border-white/40 focus:bg-white/10"
                  />
                </div>
                <button
                  type="submit"
                  className="mt-2 inline-flex items-center justify-center gap-2 rounded-full bg-snow px-6 py-3.5 text-[13.5px] font-medium text-ink transition hover:bg-white"
                >
                  Send enquiry
                  <ArrowRight className="h-4 w-4" />
                </button>
                <p className="text-[11px] text-snow/50">
                  Prototype form — enquiries route to email once wired up.
                </p>
              </div>
            </form>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

function ContactLine({ label, v, href }: { label: string; v: string; href?: string }) {
  const inner = <span className="text-snow">{v}</span>;
  return (
    <div>
      <p className="text-[11px] uppercase tracking-[0.18em] text-snow/50">{label}</p>
      <p className="mt-2">
        {href ? (
          <a href={href} className="border-b border-snow/20 pb-0.5 transition hover:border-snow" target="_blank" rel="noreferrer">
            {inner}
          </a>
        ) : (
          inner
        )}
      </p>
    </div>
  );
}

function Field({ label, placeholder }: { label: string; placeholder: string }) {
  return (
    <div>
      <label className="text-[11px] uppercase tracking-[0.18em] text-snow/50">{label}</label>
      <input
        placeholder={placeholder}
        className="mt-2 w-full rounded-full border border-white/15 bg-white/5 px-5 py-3 text-[14.5px] text-snow placeholder:text-snow/40 outline-none transition focus:border-white/40 focus:bg-white/10"
      />
    </div>
  );
}

/* ---------------- FOUNDER PORTRAIT ---------------- */

function FounderPortrait({ src }: { src: string }) {
  const [loaded, setLoaded] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], ["-4%", "4%"]);
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [1.06, 1.02, 1.06]);

  return (
    <div
      ref={ref}
      className="group relative overflow-hidden rounded-[28px] hairline bg-muted shadow-[0_30px_80px_-40px_rgba(20,28,36,0.35)]"
      style={{ aspectRatio: "4 / 5" }}
    >
      {/* Blur-up placeholder */}
      <div
        aria-hidden
        className={`absolute inset-0 transition-opacity duration-700 ${
          loaded ? "opacity-0" : "opacity-100"
        }`}
        style={{
          background:
            "radial-gradient(120% 90% at 30% 20%, color-mix(in oklab, var(--forest) 22%, var(--muted)) 0%, var(--muted) 60%, color-mix(in oklab, var(--ink) 12%, var(--muted)) 100%)",
          filter: "blur(24px)",
          transform: "scale(1.1)",
        }}
      />

      {/* Portrait — parallax + gentle zoom on hover */}
      <motion.img
        src={src}
        alt="Krishnakant Yadav, founder of The Wandering Nomads"
        width={1200}
        height={1500}
        loading="lazy"
        decoding="async"
        onLoad={() => setLoaded(true)}
        style={{ y, scale }}
        className={`absolute inset-0 h-full w-full object-cover object-[50%_28%] transition-[opacity,filter] duration-1000 ease-out will-change-transform ${
          loaded ? "opacity-100 blur-0" : "opacity-0 blur-lg"
        } group-hover:scale-[1.03]`}
      />

      {/* Tasteful portrait vignette — inner ring + soft edge darken + top light */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(120% 80% at 50% 30%, transparent 55%, rgba(10,14,20,0.28) 100%)",
        }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "linear-gradient(180deg, rgba(255,244,220,0.10) 0%, transparent 22%, transparent 60%, rgba(10,14,20,0.55) 100%)",
        }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 rounded-[28px] ring-1 ring-inset ring-white/10"
      />

      {/* Caption plate */}
      <div className="absolute inset-x-0 bottom-0 p-5">
        <div className="glass rounded-2xl px-4 py-3">
          <div className="flex items-center gap-3">
            <span className="inline-flex h-1.5 w-1.5 rounded-full bg-forest shadow-[0_0_0_4px_color-mix(in_oklab,var(--forest)_20%,transparent)]" />
            <p className="text-[10.5px] uppercase tracking-[0.24em] text-ink/60">
              Founder · Est. 2019
            </p>
          </div>
          <p className="mt-1.5 text-[15px] font-medium text-ink">
            Krishnakant Yadav <span className="text-muted-foreground">— Krish</span>
          </p>
        </div>
      </div>
    </div>
  );
}




/* ---------------- ICONS ---------------- */

function ArrowRight({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
      <path
        d="M5 12h14M13 6l6 6-6 6"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
