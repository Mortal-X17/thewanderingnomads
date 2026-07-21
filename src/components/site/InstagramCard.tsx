import { motion } from "framer-motion";
import { Reveal } from "@/components/site/Reveal";

/**
 * Editorial Instagram profile cards.
 *
 * Two premium glass invitations — Krish's personal handle first, followed by
 * the company page. No scraping, no login: the metrics and bios are content
 * captured from the profiles and updated here as they grow.
 */

type Profile = {
  handle: string;
  displayName: string;
  role: string;
  url: string;
  bio: string;
  metrics: { label: string; value: string }[];
  /** WN monogram styling for the fallback avatar */
  monogram: string;
};

const PROFILES: Profile[] = [
  {
    handle: "wanderwithkrishh",
    displayName: "Krish Yadav",
    role: "Founder · Personal",
    url: "https://instagram.com/wanderwithkrishh",
    bio: "Nomadic Adventurer · Ethical Hacker. Raw travel, hitchhiking, camping. Explored 24+ states and 200+ cities across India.",
    metrics: [
      { label: "Posts", value: "378" },
      { label: "Followers", value: "10.3K" },
      { label: "Following", value: "1,179" },
    ],
    monogram: "KY",
  },
  {
    handle: "thewanderingnomads.in",
    displayName: "The Wandering Nomads",
    role: "Community · Company",
    url: "https://instagram.com/thewanderingnomads.in",
    bio: "A youth travel community focused on raw, offbeat and culture-driven experiences.",
    metrics: [
      { label: "Posts", value: "27" },
      { label: "Followers", value: "288" },
      { label: "Following", value: "1" },
    ],
    monogram: "WN",
  },
];

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
      <div className="relative mx-auto max-w-5xl px-6">
        <Reveal>
          <p className="eyebrow text-center">Instagram · Two windows into the road</p>
          <h2 className="display mt-4 text-center text-4xl sm:text-5xl">
            Follow the trail, frame by frame.
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-center text-muted-foreground">
            Slow, cinematic dispatches from the road — the people, the light,
            the quiet moments between destinations.
          </p>
        </Reveal>

        <div className="mt-12 grid gap-6 md:grid-cols-2">
          {PROFILES.map((p, i) => (
            <Reveal key={p.handle} delay={0.05 + i * 0.1}>
              <ProfileCard profile={p} />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function ProfileCard({ profile }: { profile: Profile }) {
  return (
    <motion.a
      href={profile.url}
      target="_blank"
      rel="noopener noreferrer"
      whileHover={{ y: -4 }}
      transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
      className="group glass block h-full rounded-3xl p-6 sm:p-7"
      aria-label={`Open @${profile.handle} on Instagram`}
    >
      <div className="flex items-start gap-4">
        <div className="relative shrink-0">
          <div
            className="flex h-16 w-16 items-center justify-center rounded-full p-[2px]"
            style={{
              background:
                "conic-gradient(from 210deg, #FEDA75, #FA7E1E, #D62976, #962FBF, #4F5BD5, #FEDA75)",
            }}
          >
            <div className="flex h-full w-full items-center justify-center rounded-full bg-background">
              <span className="display text-lg">{profile.monogram}</span>
            </div>
          </div>
          <span className="absolute -bottom-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-background shadow-soft">
            <InstagramIcon className="h-3 w-3 text-ink" />
          </span>
        </div>

        <div className="min-w-0 flex-1">
          <p className="text-[10.5px] uppercase tracking-[0.22em] text-muted-foreground">
            {profile.role}
          </p>
          <p className="display mt-1 truncate text-xl leading-tight">
            {profile.displayName}
          </p>
          <p className="mt-0.5 truncate text-[13px] text-muted-foreground">
            @{profile.handle}
          </p>
        </div>
      </div>

      <p className="mt-4 text-[13.5px] leading-relaxed text-ink/80">
        {profile.bio}
      </p>

      <div className="mt-5 grid grid-cols-3 gap-px overflow-hidden rounded-2xl border border-ink/10 bg-ink/10">
        {profile.metrics.map((m) => (
          <div
            key={m.label}
            className="bg-background/70 py-3 text-center backdrop-blur"
          >
            <p className="display text-lg sm:text-xl">{m.value}</p>
            <p className="mt-0.5 text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
              {m.label}
            </p>
          </div>
        ))}
      </div>

      <div className="mt-5 flex items-center justify-between">
        <span className="text-[11px] uppercase tracking-[0.2em] text-muted-foreground">
          instagram.com
        </span>
        <span className="inline-flex items-center gap-1.5 rounded-full bg-ink px-4 py-2 text-[12px] font-medium text-background transition group-hover:opacity-90">
          Follow
          <ArrowUpRight className="h-3 w-3" />
        </span>
      </div>
    </motion.a>
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

function ArrowUpRight({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      className={className}
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      <path d="M7 17L17 7M8 7h9v9" />
    </svg>
  );
}
