# Design references

These specs are vendored design-system documents synthesized as build context
for the editorial-dark / premium-tech redesign. They are reference material —
not code, not types, not imports. Nothing in this folder is loaded by the app.

## Source

Vendored from [`nexu-io/open-design`](https://github.com/nexu-io/open-design)
(commit at clone time of 2026-05-08). Each spec lives upstream under
`design-systems/<name>/DESIGN.md` and is licensed Apache-2.0. Original LICENSE
preserved alongside as `LICENSE-open-design`.

## What's here

| Folder | Why we kept it |
|---|---|
| `linear-app/` | Primary palette + typography reference. Dark-mode-native canvas, Inter Variable weight 510, semi-transparent white borders, aurora-violet single accent. |
| `vercel/` | Geist typography system, shadow-as-border technique, three-weight discipline (400/500/600), aggressive negative tracking at display sizes. |
| `stripe/` | Blue-tinted depth shadows, deep-navy heading colour over black, conservative 4–8px radii, weight-300 luxury headlines. |
| `claude/` | Editorial light/dark section pacing, single-weight serif headlines, ring-shadow depth philosophy. |
| `superhuman/` | Dramatic single-gradient hero, binary radius system (8px / 16px), non-standard variable-font weights, lavender accent restraint. |
| `arc/` | Aurora gradient palettes (mint→cyan, peach→coral, violet→fuchsia), translucent surface treatment. |
| `theverge/` | Dark editorial canvas pattern, hazard-tape accent discipline (we *don't* go this loud, but the principle of saturated accents over `#131313` is sound). |
| `apple/` | Dual-mode rhythm (cinematic showcase ↔ dense commerce), typography hierarchy at 80–17px display range. |
| `editorial/` | Generic magazine-editorial baseline. |
| `warm-editorial/` | Counterpoint reference — what the *previous* design (cream-paper + terracotta) was descended from. Kept to make the pivot legible. |
| `publication/` | Print-grid reference for case-study deep-dive layouts. |

## Aesthetic decisions, traced back

| Decision | Drawn from |
|---|---|
| `#0A0A0B` canvas, `#101012` panel, `#18181B` surface — three-step luminance | linear-app + theverge |
| Text scale `#F4F4F5` / `#A1A1AA` / `#71717A` / `#52525B` — never pure white | linear-app |
| Aurora gradient `#5B6CFF → #A855F7 → #EC4899` — restrained accent, never wash | arc + linear-app + superhuman |
| Geist as primary, Fraunces for editorial italic moments only | vercel + claude |
| Three-weight discipline (400 / 500 / 600), aggressive negative tracking at display | vercel + linear-app |
| Shadow-as-border + background-luminance elevation, no drop shadows on cards | vercel + linear-app |
| Binary radius (6px / 12px) with one 24px outlier for the featured case-study card | superhuman |
| Mono UPPERCASE labels for kickers / status / timestamps | linear-app + theverge |

The full open-design repo (1,696 files — daemon, electron, e2e tests, packaging,
CI) is **not** vendored. We use these specs as input; we don't depend on the
project's runtime in any way.
