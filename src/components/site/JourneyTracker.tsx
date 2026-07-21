import { useEffect, useRef, useState } from "react";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";

/**
 * JourneyTracker
 *
 * A quiet expedition guide that hints at where the visitor is inside a long
 * scrolling narrative. Desktop: slim vertical rail on the left. Mobile: a
 * minimal glass pill near the bottom that names the current chapter.
 *
 * Reusable across pages — pass a `sections` config with either an in-page
 * `id` (scrolls to that element) or a route `to` (navigates via TanStack).
 */

export type TrackerSection = {
  /** Stable key + label shown in the tooltip / mobile pill */
  label: string;
  /** In-page section id (element must exist for progress detection) */
  id?: string;
  /** Optional TanStack route — used when the milestone lives on another page */
  to?: string;
};

export function JourneyTracker({
  sections,
  className = "",
}: {
  sections: TrackerSection[];
  className?: string;
}) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [hovered, setHovered] = useState<number | null>(null);
  const [visible, setVisible] = useState(false);
  const ratios = useRef<Map<string, number>>(new Map());
  const reduceMotion = useReducedMotion();

  // Reveal after leaving the hero, hide near the footer.
  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      const vh = window.innerHeight;
      const doc = document.documentElement.scrollHeight;
      const nearBottom = y + vh > doc - 240;
      setVisible(y > vh * 0.35 && !nearBottom);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Detect the active in-page section with IntersectionObserver.
  useEffect(() => {
    const trackable = sections
      .map((s, i) => ({ s, i }))
      .filter(({ s }) => s.id);
    if (trackable.length === 0) return;

    const elements = trackable
      .map(({ s, i }) => {
        const el = document.getElementById(s.id!);
        return el ? { el, i, id: s.id! } : null;
      })
      .filter((x): x is { el: HTMLElement; i: number; id: string } => !!x);

    if (elements.length === 0) return;

    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          ratios.current.set(
            (entry.target as HTMLElement).id,
            entry.isIntersecting ? entry.intersectionRatio : 0,
          );
        }
        // pick the section with the highest visible ratio in the center band
        let bestIdx = activeIndex;
        let bestRatio = -1;
        for (const { i, id } of elements) {
          const r = ratios.current.get(id) ?? 0;
          if (r > bestRatio) {
            bestRatio = r;
            bestIdx = i;
          }
        }
        if (bestRatio > 0) setActiveIndex(bestIdx);
      },
      {
        // active when the section is crossing the vertical center band
        rootMargin: "-40% 0px -50% 0px",
        threshold: [0, 0.25, 0.5, 0.75, 1],
      },
    );

    elements.forEach(({ el }) => io.observe(el));
    return () => io.disconnect();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sections]);

  const scrollTo = (id?: string) => {
    if (!id) return;
    const el = document.getElementById(id);
    if (!el) return;
    el.scrollIntoView({
      behavior: reduceMotion ? "auto" : "smooth",
      block: "start",
    });
  };

  return (
    <>
      {/* Desktop rail */}
      <nav
        aria-label="Journey progress"
        className={`pointer-events-none fixed left-4 top-1/2 z-40 hidden -translate-y-1/2 lg:block ${className}`}
      >
        <AnimatePresence>
          {visible && (
            <motion.ol
              initial={{ opacity: 0, x: -8 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -8 }}
              transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
              className="pointer-events-auto flex flex-col items-start gap-1 rounded-full border border-ink/10 bg-background/50 px-2 py-3 backdrop-blur-md shadow-[0_10px_40px_-20px_rgba(20,28,36,0.25)]"
            >
              {sections.map((s, i) => {
                const isActive = i === activeIndex;
                const isDone = i < activeIndex;
                const isHover = hovered === i;

                const dot = (
                  <span
                    className="relative flex items-center justify-center"
                    style={{ width: 22, height: 22 }}
                  >
                    <motion.span
                      layout
                      transition={{
                        duration: 0.45,
                        ease: [0.22, 1, 0.36, 1],
                      }}
                      className={`block rounded-full ${
                        isActive
                          ? "bg-forest"
                          : isDone
                            ? "bg-ink/45"
                            : "bg-ink/15"
                      }`}
                      style={{
                        width: isActive ? 8 : 5,
                        height: isActive ? 8 : 5,
                        boxShadow: isActive
                          ? "0 0 0 4px color-mix(in oklab, var(--forest) 18%, transparent)"
                          : undefined,
                      }}
                    />
                  </span>
                );

                const commonProps = {
                  onMouseEnter: () => setHovered(i),
                  onMouseLeave: () => setHovered((h) => (h === i ? null : h)),
                  onFocus: () => setHovered(i),
                  onBlur: () => setHovered((h) => (h === i ? null : h)),
                  "aria-label": s.label,
                  "aria-current": isActive ? ("step" as const) : undefined,
                  className:
                    "group relative flex items-center rounded-full outline-none focus-visible:ring-2 focus-visible:ring-forest/50",
                };

                const tooltip = (
                  <AnimatePresence>
                    {isHover && (
                      <motion.span
                        initial={{ opacity: 0, x: -4 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -4 }}
                        transition={{ duration: 0.18, ease: "easeOut" }}
                        className="pointer-events-none absolute left-full ml-2 whitespace-nowrap rounded-full border border-ink/10 bg-background/85 px-3 py-1 text-[11px] font-medium text-ink shadow-soft backdrop-blur-md"
                      >
                        {s.label}
                      </motion.span>
                    )}
                  </AnimatePresence>
                );

                return (
                  <li key={s.label} className="relative">
                    {s.to ? (
                      <a href={s.to} {...commonProps}>
                        {dot}
                        {tooltip}
                      </a>
                    ) : (
                      <button
                        type="button"
                        onClick={() => scrollTo(s.id)}
                        {...commonProps}
                      >
                        {dot}
                        {tooltip}
                      </button>
                    )}
                  </li>
                );
              })}
            </motion.ol>
          )}
        </AnimatePresence>
      </nav>

      {/* Mobile pill */}
      <div
        aria-hidden={!visible}
        className="pointer-events-none fixed inset-x-0 bottom-4 z-40 flex justify-center px-4 lg:hidden"
      >
        <AnimatePresence>
          {visible && (
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 8 }}
              transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
              className="pointer-events-auto inline-flex items-center gap-2.5 rounded-full border border-ink/10 bg-background/75 px-3.5 py-1.5 backdrop-blur-md shadow-[0_10px_30px_-15px_rgba(20,28,36,0.35)]"
            >
              <span className="relative flex h-1.5 w-1.5">
                <span className="absolute inset-0 rounded-full bg-forest" />
                <span className="absolute inset-0 rounded-full bg-forest animate-ping opacity-40" />
              </span>
              <span className="text-[10.5px] uppercase tracking-[0.22em] text-muted-foreground">
                Chapter {String(activeIndex + 1).padStart(2, "0")}
              </span>
              <span className="text-[12px] font-medium text-ink">
                <AnimatePresence mode="wait" initial={false}>
                  <motion.span
                    key={sections[activeIndex]?.label}
                    initial={{ opacity: 0, y: 4 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -4 }}
                    transition={{ duration: 0.25 }}
                  >
                    {sections[activeIndex]?.label}
                  </motion.span>
                </AnimatePresence>
              </span>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </>
  );
}
