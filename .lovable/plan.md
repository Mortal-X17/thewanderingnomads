
# Version 1.5 — Premium Refinement

A focused evolution of the current site. Preserves identity, palette, typography, and layout. Every change adds craft, story, or polish — nothing replaced for its own sake.

Because the scope is very large, I'll ship it in **four sequenced passes** so each is reviewable and the preview stays stable. You can approve the whole plan and I'll execute pass-by-pass, or trim any pass before I start.

---

## Pass 1 — Foundation & polish (motion, type, nav, a11y)

Cross-cutting refinements that lift every existing section without changing layout.

- **Motion system**: single easing token `--ease-out-expo: cubic-bezier(0.22, 1, 0.36, 1)`, standard durations (fast 200 / base 400 / slow 800). `Reveal` gains stagger + `prefers-reduced-motion` bypass. Hero headline switches to per-word stagger reveal; subtitle + CTA cascade after.
- **Typography rhythm**: tighten heading tracking at large sizes, add fluid `clamp()` sizes for h1/h2, standardize paragraph `leading-[1.65]` and max-width `65ch` on body copy. Add `text-wrap: balance` to display headings.
- **Nav refinement**: smoother blur transition (interpolated backdrop-blur + bg opacity from scrollY), animated active pill indicator (layoutId), improved mobile sheet (proper focus trap, ESC to close, scroll-lock).
- **Buttons & focus**: shared button styles — larger tap targets (min-h-11), refined press state, `focus-visible` ring using `--ring` on every interactive element.
- **Radius / shadow / border tokens**: audit and standardize on `--radius`, `--shadow-soft`, `--shadow-lift`, hairline borders `border-ink/8`. Remove one-off values.
- **Scroll**: add `scroll-behavior: smooth`, add scroll-margin for anchored sections, verify ScrollProgress bar height and gradient.
- **A11y**: single `<main>` per route, `aria-label` on all icon buttons, alt text pass on all imagery, reduced-motion respected in every framer-motion component.

## Pass 2 — Homepage storytelling upgrades

Refine existing homepage sections to read like a journal, no restructure.

- **Hero**: gentler Ken Burns on background image, subtle grain already present kept, overlay gradient tuned for AA contrast on subtitle, CTA gets magnetic hover (translate on cursor proximity), scroll-hint chevron with breathing animation, smoother handoff into next section via bottom gradient fade.
- **Journey cards**: add editorial metadata row — Duration · Season · Group size · Difficulty (data-driven, placeholder-safe). Image gets `scale(1.04)` slow zoom on hover, caption slides up 4px. Consistent 4:5 aspect, unified corner radius.
- **Stats / trust**: reframe counters into an inline sentence ("Across **24+ states**, **200+ cities**, **60+ travelers**…") rather than isolated cards — feels less corporate.
- **Founder section**: keep the new FounderPortrait; add a pull-quote treatment beside it (Instrument Serif italic, large, ink/70).
- **Section transitions**: shared `SectionEyebrow` + `SectionHeading` components so every section breathes identically.

## Pass 3 — Two new premium features

Two additions only — both requested and both extend the story without cluttering.

- **Founder Journey Timeline** (on `/about`): vertical timeline of 8 milestones (Deoria → Jaipur → solo travel → 24 states → 200 cities → community → The Wandering Nomads → ethical hacker). Sticky year on the left, milestone card on the right, hairline connector, scroll-triggered fade+rise per node. Purely CSS + framer-motion, no library.
- **Community & Moments** section (homepage, above footer): full-bleed asymmetric photo grid (uses existing gallery-* assets), minimal captions, single line of copy: "You're joining a community, not buying a trip." Lightbox-ready markup.
- **Floating WhatsApp button**: bottom-right, appears after 40% scroll, respects reduced motion, has visible focus ring and `aria-label`.

Deferred to a later version (called out so we don't over-scope): Interactive India map, full lightbox gallery with keyboard/touch, booking/pricing UI, CMS, i18n. Architecture in Pass 1 (shared components, route structure) keeps these easy to add later.

## Pass 4 — Consistency audit & SEO

- Sweep every route for spacing/radius/shadow drift after Pass 1–3.
- Per-route unique `title` / `description` / `og:title` / `og:description` (About, Journeys, Gallery, Contact already have these — verify and tighten copy).
- JSON-LD `TravelAgency` + `Person` (Krish) on home; `BreadcrumbList` on inner routes.
- Image `loading="lazy"` + `decoding="async"` everywhere below the fold; `fetchpriority="high"` on hero.
- Final pass: visual QA at mobile (433px, current viewport) + desktop.

---

## Technical notes

- No new deps. Framer Motion, TanStack Router, Tailwind v4 tokens already in place.
- Timeline, Community, WhatsApp button are new files under `src/components/site/`. Everything else is edits to existing files.
- Motion tokens land in `src/styles.css` `@theme`; components consume via CSS var, not hard-coded easings.
- `prefers-reduced-motion` handled globally via a `useReducedMotion()` guard in `Reveal` and hero animations.

---

Reply **"go"** to start Pass 1, or tell me which passes to drop / reorder.
