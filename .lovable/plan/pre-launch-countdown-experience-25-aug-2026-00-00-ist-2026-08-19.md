# Pre-Launch Countdown Experience — 25 Aug 2026, 00:00 IST

Nothing on the existing site changes yet. This plan covers the launch gate mechanism and three distinct design directions. Pick one concept and I'll build it.

## How the launch gate works

- Target moment: `2026-08-25T00:00:00+05:30` (fixed ISO instant, so it's correct in every visitor timezone). Remaining time is always computed from the current clock, never hardcoded.
- The gate is evaluated on the server during SSR in the root route, before any page markup is produced. Pre-launch, the server sends only the countdown document — the homepage HTML, navbar and sections are never in the response, so there is no flash, overlay, or layout shift.
- The client keeps a 1-second ticker. When it crosses zero it does one clean transition (fade out, then a router reload) and the real site takes over automatically — no manual deploy needed.
- The countdown page renders its own minimal document shell: no navbar, footer, journey tracker, WhatsApp button, or theme toggle chrome.
- A private bypass (a secret query param stored in session, e.g. `?preview=…`) lets you and Krish review the real website before launch while the public still sees the countdown.
- Existing routes, components, MCP tools, and Atlas work stay untouched; after launch the site behaves exactly as it does today.

## Shared content (all concepts)

Official uploaded logo, one short launch statement, the countdown (days / hours / minutes / seconds with small lowercase labels), the launch date line, and one optional micro-line. Nothing else.

---

## Concept 1 — Cinematic Expedition

1. **Visual** — Full-bleed nocturnal Himalayan valley: layered ridgelines receding into haze, a pale river catching light on the valley floor, a high cold sky. Feels like the last frame before a film's title card.
2. **Layout** — Single viewport, no scroll. Logo top-centre, small. Launch statement at optical centre. Countdown sits low in the frame, resting on the valley floor as a hairline-divided row rather than a card. Date line pinned at the base.
3. **Typography** — Instrument Serif for the statement and countdown numerals (large, tight, editorial); Inter at 0.7rem with wide tracking for labels and date.
4. **Color** — Deep ink-to-forest night gradient, snow-white type, one thin sunrise-gold hairline under the countdown as the only warm accent. Dark-only atmosphere by design, drawn from existing tokens.
5. **Artwork** — Generated cinematic ridgeline/valley photography with heavy atmospheric grading plus SVG mist layers; grain overlay reused from the current site.
6. **Animation** — Slow drifting mist bands, very slight parallax on ridge layers tied to pointer/device tilt, logo fades up first, then statement, then numerals. Numerals cross-fade digit-by-digit.
7. **Mobile** — Portrait crop pushes ridgelines lower; countdown becomes a 4-across row with smaller numerals and no wrapping; statement shortens to two lines; safe-area padding for Instagram in-app browsers.
8. **Logo** — Top-centre, white/knockout treatment on the dark sky, with a faint glow halo so the black mark reads cleanly.
9. **Countdown** — Four numerals separated by thin vertical rules, labels beneath, no boxes.
10. **Fit** — Directly continues the cinematic hero language already on the homepage; screenshots extremely well in a Story frame.

---

## Concept 2 — Illustrated Travel Poster

1. **Visual** — A framed luxury travel poster: warm off-white paper, hand-drawn ink mountain range, a river ribbon, a dashed trail climbing to a summit marker, a small compass rose and topographic contour lines in the margins.
2. **Layout** — Poster canvas centred with a visible hairline frame and margin. Logo at the top of the plate, illustration mid-plate, countdown set as a typographic band inside the frame, date engraved along the bottom margin like a print edition line.
3. **Typography** — Instrument Serif display for statement, letterpress-style small-caps Inter for labels and the edition line. Numerals in serif with tabular alignment.
4. **Color** — Snow/paper base, ink linework, forest green for the trail, muted river blue for water, sunrise ochre accent. Light-first; dark mode becomes a charcoal-paper variant with chalk-white linework.
5. **Artwork** — Vector/SVG illustration (no photography): ridge silhouettes, contour lines, compass, tiny hiker, sparse pine cluster. Restrained, editorial, zero cartoon feel.
6. **Animation** — Trail draws itself once on load, contour lines shimmer very slowly, compass needle settles with a soft wobble, subtle paper-grain texture. Numerals roll vertically.
7. **Mobile** — Poster becomes near-full-bleed with tighter margins; illustration simplifies to fewer ridge layers; countdown moves under the artwork in a 4-across row.
8. **Logo** — The poster's masthead — top-centre at the largest size of the three concepts, since a black mark on paper is its natural home.
9. **Countdown** — A typographic band with numerals separated by generous space, labels in small caps beneath, framed by the poster rules.
10. **Fit** — The logo is a black ink mountain mark, so a print-poster world is where it looks most authentic; also the most distinctive in a crowded Instagram feed.

---

## Concept 3 — Minimal iOS Travel Experience

1. **Visual** — Vast calm negative space over a soft dawn gradient, with one delicate mountain-and-river line drawing low on the screen. Nothing else competes.
2. **Layout** — Vertically centred stack: small logo, one-line statement, countdown, date. Line artwork anchored to the bottom edge as a horizon.
3. **Typography** — Inter throughout at premium weights, generous tracking; countdown numerals large, light, tabular. One serif touch only in the statement.
4. **Color** — Fog-to-snow dawn gradient in light mode, ink-to-forest in dark; forest accent on the seconds unit only. Follows the site's existing light/dark tokens exactly.
5. **Artwork** — Single-weight SVG line horizon: two ridge strokes, a river curve, three contour arcs. Extremely restrained.
6. **Animation** — Gradient hue shifts over ~60s, horizon lines breathe by a pixel or two, seconds tick with a spring scale, a very subtle glass sheen on the countdown plate. Everything respects reduced-motion.
7. **Mobile** — Designed here first: thumb-zone spacing, countdown at ~2 lines of comfortable size, horizon artwork scaled so it never crowds the numerals; excellent legibility at Story-screenshot scale.
8. **Logo** — Small and precise at the top, with an automatic light/dark treatment so the mark stays crisp in both themes.
9. **Countdown** — The purest of the three: four numerals on a barely-there glass plate, tiny lowercase labels beneath.
10. **Fit** — Matches the iOS-glass polish already used in the Instagram card and navigation, and keeps the countdown itself unmistakably the focal point.

---

## Recommendation

**Concept 1 — Cinematic Expedition** for launch-day impact. Instagram and WhatsApp are dark, image-led surfaces; a full-bleed cinematic ridgeline with a small glowing logo and elegant numerals stops the scroll and reads instantly at thumbnail size, while Concept 3 risks looking blank in a feed and Concept 2's fine linework loses detail under Story compression. If Krish wants the launch to feel handcrafted and collectible rather than blockbuster, Concept 2 is the strong second choice.

## Technical notes

- New route/component set under `src/components/launch/` plus a launch-gate module; root route consults the gate during SSR and renders either the gate or the normal `<Outlet />` tree.
- Launch instant lives in one config constant so it can be changed or removed in a single edit.
- Countdown page gets its own head metadata (title, description, og/twitter tags, og:image from the launch artwork) so shared links preview correctly.
- Reduced-motion and safe-area handling included; no changes to existing routes, styles tokens, or MCP tooling.
