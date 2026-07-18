import { AnimatePresence, motion } from "framer-motion";
import { useEffect } from "react";
import type { AtlasState } from "@/lib/atlas/data";
import { EmptyBlock } from "./EmptyBlock";
import { Gallery } from "./Gallery";

/**
 * Expandable panel that renders a state's chapter.
 * Every block gracefully degrades to a premium empty state.
 */
export function StatePanel({
  state,
  onClose,
}: {
  state: AtlasState | null;
  onClose: () => void;
}) {
  useEffect(() => {
    if (!state) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [state, onClose]);

  return (
    <AnimatePresence>
      {state ? (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
          className="fixed inset-0 z-[90] bg-ink/40 backdrop-blur-sm"
          onClick={onClose}
        >
          <motion.aside
            initial={{ y: 40, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 40, opacity: 0 }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            onClick={(e) => e.stopPropagation()}
            className="absolute inset-x-0 bottom-0 top-6 overflow-hidden rounded-t-3xl border border-ink/10 bg-background shadow-lift sm:inset-6 sm:top-10 sm:rounded-3xl"
            role="dialog"
            aria-label={`${state.name} chapter`}
          >
            <div className="flex items-center justify-between border-b border-ink/8 px-5 py-3 sm:px-8">
              <div>
                <p className="eyebrow">Travel Atlas · Chapter</p>
                <h2 className="display mt-0.5 text-2xl sm:text-3xl">{state.name}</h2>
              </div>
              <button
                onClick={onClose}
                aria-label="Close"
                className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-ink/12 text-ink/70 transition hover:bg-ink/5"
              >
                <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.8">
                  <path d="M6 6l12 12M18 6l-12 12" strokeLinecap="round" />
                </svg>
              </button>
            </div>

            <div className="h-full overflow-y-auto px-5 pb-24 pt-6 sm:px-8">
              <StateBody state={state} />
            </div>
          </motion.aside>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}

function Section({
  eyebrow,
  title,
  children,
}: {
  eyebrow: string;
  title?: string;
  children: React.ReactNode;
}) {
  return (
    <section className="mb-10">
      <div className="mb-3 flex items-baseline justify-between gap-4">
        <span className="eyebrow">{eyebrow}</span>
        {title ? <span className="text-xs text-muted-foreground">{title}</span> : null}
      </div>
      {children}
    </section>
  );
}

function StateBody({ state }: { state: AtlasState }) {
  const c = state.content;

  return (
    <div className="mx-auto max-w-4xl">
      {/* Cover */}
      <div className="relative mb-8 aspect-[16/9] w-full overflow-hidden rounded-2xl border border-ink/8 bg-ink/[0.03]">
        {c?.cover ? (
          <img
            src={c.cover.src}
            alt={c.cover.alt}
            className="h-full w-full object-cover"
            loading="lazy"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center">
            <div className="max-w-sm text-center">
              <p className="eyebrow">Cover</p>
              <p className="display mt-2 text-2xl text-ink/70">
                A cover photograph will grace this chapter after the next expedition.
              </p>
            </div>
          </div>
        )}
      </div>

      {/* Overview */}
      <Section eyebrow="Overview">
        {c?.overview ? (
          <p className="text-lg leading-relaxed text-ink/85">{c.overview}</p>
        ) : (
          <EmptyBlock
            label="Journey overview"
            title="This chapter is still being written."
            hint="A short introduction to the region, the route, and the intent of the journey will appear here."
          />
        )}
      </Section>

      {/* Journal */}
      <Section eyebrow="Travel journal">
        {c?.journal ? (
          <p className="whitespace-pre-line text-[15px] leading-relaxed text-ink/80">
            {c.journal}
          </p>
        ) : (
          <EmptyBlock
            label="Personal journal"
            title="Field notes from the road, unpolished and honest."
            hint="Journal entries are written after each expedition, once the dust has settled."
          />
        )}
      </Section>

      {/* Gallery */}
      <Section eyebrow="Gallery">
        <Gallery images={c?.gallery} />
      </Section>

      {/* Destinations */}
      <Section eyebrow="Destinations visited">
        {c?.cities && c.cities.length > 0 ? (
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            {c.cities.map((city) => (
              <div
                key={city.id}
                className="rounded-2xl border border-ink/10 bg-card p-5"
              >
                <p className="display text-xl">{city.name}</p>
                {city.summary ? (
                  <p className="mt-2 text-sm text-muted-foreground">{city.summary}</p>
                ) : null}
                {city.places && city.places.length > 0 ? (
                  <ul className="mt-3 space-y-1 text-sm text-ink/75">
                    {city.places.map((p) => (
                      <li key={p.id}>· {p.name}</li>
                    ))}
                  </ul>
                ) : null}
              </div>
            ))}
          </div>
        ) : (
          <EmptyBlock
            label="Cities & places"
            title="A curated route of cities, villages, and viewpoints will unfold here."
            hint="Each destination will nest its own photos, stories, and travel tips."
          />
        )}
      </Section>

      {/* Two-column soft blocks */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <SoftBlock label="Favorite memory" content={c?.favoriteMemory} />
        <SoftBlock label="Local culture" content={c?.culture} />
        <ListBlock label="Hidden gems" items={c?.hiddenGems} />
        <ListBlock label="Food experiences" items={c?.food} />
        <ListBlock label="Travel tips" items={c?.tips} />
        <SoftBlock
          label="Videos"
          content={c?.videos && c.videos.length ? undefined : undefined}
          emptyTitle="Cinematic reels will live here."
        />
      </div>

      {/* Related expeditions */}
      <Section eyebrow="Related expeditions">
        {c?.relatedExpeditions && c.relatedExpeditions.length > 0 ? (
          <ul className="flex flex-wrap gap-2">
            {c.relatedExpeditions.map((r) => (
              <li key={r.slug}>
                <span className="rounded-full border border-ink/12 bg-ink/[0.03] px-3 py-1 text-xs">
                  {r.title}
                </span>
              </li>
            ))}
          </ul>
        ) : (
          <EmptyBlock
            label="Related journeys"
            title="Upcoming expeditions to this region will surface here."
          />
        )}
      </Section>

      <p className="mt-10 text-center text-xs text-muted-foreground">
        This chapter grows with every journey Krish takes to {state.name}.
      </p>
    </div>
  );
}

function SoftBlock({
  label,
  content,
  emptyTitle,
}: {
  label: string;
  content?: string;
  emptyTitle?: string;
}) {
  if (!content) {
    return (
      <EmptyBlock
        label={label}
        title={emptyTitle ?? `A ${label.toLowerCase()} will be added soon.`}
      />
    );
  }
  return (
    <div className="rounded-2xl border border-ink/10 bg-card p-5">
      <p className="eyebrow">{label}</p>
      <p className="mt-3 text-sm text-ink/80">{content}</p>
    </div>
  );
}

function ListBlock({ label, items }: { label: string; items?: string[] }) {
  if (!items || items.length === 0) {
    return <EmptyBlock label={label} title={`${label} will appear here.`} />;
  }
  return (
    <div className="rounded-2xl border border-ink/10 bg-card p-5">
      <p className="eyebrow">{label}</p>
      <ul className="mt-3 space-y-1.5 text-sm text-ink/80">
        {items.map((it) => (
          <li key={it}>· {it}</li>
        ))}
      </ul>
    </div>
  );
}
