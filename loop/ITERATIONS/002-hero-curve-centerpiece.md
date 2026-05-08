# Iteration 002 — Hero centerpiece: process-arc curve

**Date:** 2026-05-05
**Task:** Owner override (per loop prompt §15) — redesign hero with a visual centerpiece, drawing energy from a Boostly reference, while staying inside the existing editorial design system.
**Chunked:** false
**Files changed:** 3 (1 new, 2 modified) + 4 loop-docs
**Lines changed:** +250 / -38
**Commit:** (set on commit)

## What changed

Built `components/HeroCurve.tsx` — an inline SVG visualizing the studio's five-step engagement (Discovery → Scope → Build → Launch → Ongoing) as a gold gradient curve sweeping from bottom-left to top-right with five labeled stops. Mounted it as the lower half of the home hero inside the existing `cover-surface`. On viewports ≤720px, the SVG hides and the same five steps render as a vertical mono-rule timeline.

The hero text + CTAs sit at the top of the cover-surface (unchanged copy, slightly tightened padding); the curve fills the lower half, pushed against the bottom by `marginTop: auto`. Total hero `minHeight` raised from `min(720px, 92vh)` to `min(880px, 100vh)` so the curve has room without compressing the text.

The existing §05 Process section still renders unchanged — the curve is a visual surface for the same content, not a replacement.

## Why

Owner reviewed Boostly reference imagery and wanted "a different look but same information, all working together." The conversation surfaced that the real signal was *visual centerpiece + drama*, not the SaaS genre signals (gradient buttons, sign-in nav, email-only CTA). Path A — energy injection inside the editorial system — was chosen.

The 5-step process is the right thing to visualize because (a) it's already strong content, (b) visualizing it doesn't require any blocked data (no real testimonials, no Local Falcon numbers needed), and (c) the form of the curve telegraphs "your engagement evolves over time" — which is the studio's actual differentiator vs. agencies pitching one-off projects.

## Score delta

| Dimension              | Before | After | Delta |
|------------------------|-------:|------:|------:|
| 1. Editorial cohesion  | 8      | 9     | +1    |
| 7. Content quality     | 6      | 7     | +1    |
| **Total**              | 63     | 65    | +2    |
| **/100**               | 70     | 72    | +2    |

Other dimensions unchanged. Notes:

- **Editorial cohesion 8 → 9.** Before, the hero was typography-only — strong but static. Now it has a signature visual that the editorial system natively supports (gold gradient, mono index numerals, Fraunces titles, JetBrains Mono captions, dotted gold ticks). The hero now reads "studio-grade" rather than "polished but quiet."
- **Content quality 6 → 7.** The process narrative is now communicated visually + in text. A prospect skimming the hero now picks up the engagement shape without scrolling.
- **Performance unchanged.** Inline SVG with one path, 5 circles, 5 dotted lines, 1 grid pattern, 1 linear gradient. ~3 KB inline. No new requests.
- **Accessibility unchanged.** SVG has `role="img"` + descriptive `aria-label`. The desktop label container is `aria-hidden` so screen readers receive the mobile timeline (which is real text elements) without duplicate announcement.

## Implementation notes for next iteration

- The five stops in `HeroCurve.tsx` duplicate the process content from `app/page.tsx` `processSteps`. Acceptable now (different shape: titles short on the curve, longer on the §05 list) but worth a future iteration to extract the canonical process content to `lib/data/process.ts` and consume from both places.
- The mobile timeline view (`<ol class="hero-curve-timeline">`) is rendered in DOM at all breakpoints; CSS responsive `display` rules switch which version is visible. Both contain the same text. Screen readers see the mobile timeline (the desktop labels are `aria-hidden`).
- The bezier path's control points (`C 380 305, 700 220, 1080 60`) and dot positions are eyeballed — dots sit visually on the curve to within a few pixels but are not analytically computed. If the curve ever needs to take exact data points (e.g. real Local Falcon numbers), regenerate the path from those points.
- No motion / animation added in this iteration. The curve is static. Consider an optional fade-in for the path's `stroke-dasharray` on first paint in a later iteration, gated by `prefers-reduced-motion`.

## Blockers introduced

None. No new blockers; existing five remain.

## Surprises

None. The build was clean on first compile, lint was clean, dev-server smoke test confirmed the SVG and both label variants render in DOM.

## Discovered

- The §05 Process section + hero curve now show the same content twice, deliberately. If the prospect skims, they get the visual; if they read, they get the prose. The duplication is the point — it's not redundancy, it's reinforcement. Worth checking after a few more iterations whether this still feels right or if the §05 prose should slim down now that the curve carries the structural narrative.
- The cover-surface's existing gold top-stripe (`::before` pseudo-element in `globals.css`) reads even better against the busier hero below it — the stripe + curve bookend the dark band visually. No change needed; it just got a better canvas.
