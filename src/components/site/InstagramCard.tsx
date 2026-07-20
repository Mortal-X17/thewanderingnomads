import { motion } from "framer-motion";
import { Reveal } from "@/components/site/Reveal";

/**
 * Editorial Instagram profile card.
 *
 * No scraping, no login — purely a premium invitation to visit the public
 * profile. Metrics and bio are content, not live data; update them here
 * whenever the profile grows.
 */

const PROFILE = {
  handle: "thewanderingnomads.in",
  displayName: "The Wandering Nomads",
  url: "https://instagram.com/thewanderingnomads.in",
  bio: "Founder-led expeditions across India · Small groups. Real places. Led by Krish.",
  metrics: [
    { label: "Posts", value: "180+" },
    { label: "Followers", value: "12k+" },
    { label: "Following", value: "320" },
  ],
  founder: {
    handle: "wanderwithkrishh",
    url: "https://instagram.com/wanderwithkrishh",
  },
};

export function InstagramCard() {
  return (
    <section className="relative overflow-hidden bg-snow py-24 sm:py-32">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-70"
        style={{
          background:
            "radial-gradient(600px 300px at 20% 0%, color-mix(in oklab, var(--sunrise) 18%, transparent), transparent 60%), radial-gradient(700px 340px at 80% 100%, color-mix(in oklab, var(--river) 16%, transparent), transparent 60%)",
        }}
      />
      <div className="relative mx-auto max-w-4xl px-6">
        <Reveal>
          <p className="eyebrow text-center">Instagram · @{PROFILE.handle}</p>
          <h2 className="display mt-4 text-center text-4xl sm:text-5xl">
            Follow the trail, frame by frame.
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-center text-muted-foreground">
            Slow, cinematic dispatches from the road — the people, the light,
            the quiet moments between destinations.
          </p>
        </Reveal>

        <Reveal delay={0.1}>
          <motion.a
            href={PROFILE.url}
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ y: -4 }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className="glass mx-auto mt-12 block max-w-2xl rounded-3xl p-6 sm:p-8"
            aria-label={`Open ${PROFILE.displayName} on Instagram`}
          >
            <div className="flex flex-col items-start gap-6 sm:flex-row sm:items-center">
              <div className="relative">
                <div
                  className="flex h-20 w-20 items-center justify-center rounded-full p-[2px]"
                  style={{
                    background:
                      "conic-gradient(from 210deg, #FEDA75, #FA7E1E, #D62976, #962FBF, #4F5BD5, #FEDA75)",
                  }}
                >
                  <div className="flex h-full w-full items-center justify-center rounded-full bg-background">
                    <span className="display text-2xl">WN</span>
                  </div>
                </div>
                <span className="absolute -bottom-1 -right-1 flex h-6 w-6 items-center justify-center rounded-full bg-background shadow-soft">
                  <InstagramIcon className="h-3.5 w-3.5 text-ink" />
                </span>
              </div>

              <div className="min-w-0 flex-1">
                <p className="display text-2xl leading-tight">
                  {PROFILE.displayName}
                </p>
                <p className="mt-0.5 text-sm text-muted-foreground">
                  @{PROFILE.handle}
                </p>
                <p className="mt-3 max-w-md text-sm text-ink/80">
                  {PROFILE.bio}
                </p>
              </div>

              <div className="hidden sm:block">
                <span className="inline-flex items-center gap-2 rounded-full bg-ink px-5 py-2.5 text-[13px] font-medium text-background transition group-hover:opacity-90">
                  Follow
                </span>
              </div>
            </div>

            <div className="mt-6 grid grid-cols-3 gap-px overflow-hidden rounded-2xl border border-ink/10 bg-ink/10">
              {PROFILE.metrics.map((m) => (
                <div
                  key={m.label}
                  className="bg-background/70 py-4 text-center backdrop-blur"
                >
                  <p className="display text-xl sm:text-2xl">{m.value}</p>
                  <p className="mt-0.5 text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
                    {m.label}
                  </p>
                </div>
              ))}
            </div>

            <div className="mt-5 flex flex-wrap items-center justify-between gap-3 sm:hidden">
              <span className="inline-flex items-center gap-2 rounded-full bg-ink px-5 py-2.5 text-[13px] font-medium text-background">
                Follow on Instagram
              </span>
            </div>

            <p className="mt-5 text-center text-[11px] text-muted-foreground">
              Also follow Krish personally on{" "}
              <a
                href={PROFILE.founder.url}
                target="_blank"
                rel="noopener noreferrer"
                className="underline decoration-ink/30 underline-offset-2 hover:decoration-ink"
                onClick={(e) => e.stopPropagation()}
              >
                @{PROFILE.founder.handle}
              </a>
            </p>
          </motion.a>
        </Reveal>
      </div>
    </section>
  );
}

function InstagramIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      className={className}
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.5" cy="6.5" r="0.6" fill="currentColor" />
    </svg>
  );
}
