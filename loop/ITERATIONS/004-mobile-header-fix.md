# Iteration 004 — Fix invisible header on dark hero + a11y skip link

**Date:** 2026-05-05
**Task:** Owner-reported [CRITICAL] bug — "the hamburger and nav don't work" on mobile. Fix it; stress-test mobile rendering; queue the owner's larger asks (showcase home, button-everywhere, multi-page IA) as multi-iteration projects in BACKLOG.
**Chunked:** false (single focused fix)
**Files changed:** 2 source + 4 loop docs
**Lines changed:** +120 / -25

## What changed

### The bug

`Header.tsx` renders with `position: sticky`, `background: transparent` at scroll-top. The studio wordmark and hamburger SVG were both colored **navy-900** (dark). On the home page hero, which has a navy-900 background (`cover-surface`), this meant **dark icons rendered on top of the same dark color** — fully invisible until the user scrolled. That matches the bug report.

The desktop nav links had the same issue: `editorial-link mono` color is `var(--ink)` (near-black), invisible on the navy hero.

### The fix

Compute `overDark = pathname === "/" && !scrolled` in `Header.tsx`. When `overDark`:

- `<StudioMark onDark>` — uses the dark-canvas wordmark (white logo on a dark backing).
- Hamburger `color: white`.
- Nav links get the `on-dark` modifier class (`color: var(--gold-400)` per `globals.css`).

When not `overDark`, the existing dark icons render on the cream-tinted header. The header background was also tightened: at scroll-top on a non-home page it now uses `rgba(250, 246, 236, 0.55)` (faint cream tint) instead of fully transparent — so the bar is always faintly visible against any background.

Bumped the hamburger SVG from `22×22` to `24×24` and stroke-width from `1.5` to `1.75` for better legibility.

### Skip-to-content (WCAG 2.4.1)

Added a `Skip to content` link as the very first focusable element in `<header>`. It's positioned off-screen by default (`top: -100px`), animates into view (`top: 12px`) on focus. Targets `#main-content`, which `app/layout.tsx` now sets on `<main>` (with `tabIndex={-1}` so it can receive focus).

### Stress test

Curl-tested both states:

- `curl /` SSR'd with `pathname="/", scrolled=false, overDark=true` →
  - StudioMark uses `campbell-digital-studio-horizontal-dark.png` (white-on-dark variant) ✓
  - Hamburger inline `color: white` ✓
  - Nav links `class="editorial-link mono on-dark"` ✓
  - Header `background: transparent` ✓
- `curl /work` SSR'd with `overDark=false` →
  - StudioMark uses `campbell-digital-studio-horizontal-logo-transparent.png` (dark-on-cream variant) ✓
  - Hamburger inline `color: var(--navy-900)` ✓
  - Nav links `class="editorial-link mono"` (no `on-dark`) ✓
- Skip link present on both pages ✓
- `<main id="main-content" tabIndex="-1">` rigged ✓

The mobile-menu-btn has `display: none` inline + `display: inline-flex !important` via `@media (max-width: 860px)`. CSS `!important` beats inline `display: none` per CSS spec, so the button shows on mobile in any modern browser.

### Owner's larger asks — queued in BACKLOG

The owner's message bundled four asks. Iteration 004 handles **one** of them (the [CRITICAL] mobile bug); the others are sized as multi-iteration projects in `BACKLOG.md`:

- **Project A** — Showcase home: 2 iterations (build `WorkShowcase` component, mount on home).
- **Project B** — Buttons-everywhere: 2 iterations (build `Button` primitive + THEME.md override note, then replace text-link CTAs).
- **Project C** — Multi-page IA: 6 iterations (decide IA, build `/studio`, build `/services`, build `/notes`, refactor home, update sitemap+SEO).
- **Project D** — Mobile UX hardening: 2 iterations (audit + tap-feedback).

Total: ~12 iterations of owner-directed work queued. Plus the existing CRITICAL items (`/inquire` form, per-route canonicals) still on top.

## Why

Tier-1 survival per loop §06: "site builds without errors" and "mobile usability works at 375px width." A header where the entry-point UI is invisible at scroll-top fails both the spirit and the letter of that tier. This was also the most acute item in the owner's message, so it ran first.

The skip-link was already on BACKLOG as a [HIGH] item — adding it at the same time costs almost nothing and means future a11y audits won't flag this.

## Score delta

| Dimension                | Before | After | Delta |
|--------------------------|-------:|------:|------:|
| 3. Mobile experience     | 8      | 9     | +1    |
| 4. Accessibility         | 7      | 8     | +1    |
| **Total**                | 67     | 69    | +2    |
| **/100**                 | 74     | 77    | +3    |

Notes:

- **Mobile 8 → 9.** The hamburger is now visible on every page at every scroll position. This was the most user-visible failure mode of the mobile experience — fixing it materially moves the dimension. To reach 10 ("native-app feel") the site needs the larger Project D + Project A work.
- **Accessibility 7 → 8.** Added skip-to-main-content link + matching `<main id="main-content">` target. Color contrast at scroll-top on the home hero is now correct (white-on-navy, gold-400 nav-on-navy). To reach 9–10 the backlog still needs the axe-core sweep + tap-feedback + thoughtful keyboard order audit.

## Notes for next iteration

- The next iteration's top BACKLOG item by priority (per §2.2) is still `[CRITICAL] Wire /inquire to a real backend`. Effort M, fits one iteration. Recommended next.
- After that: `[CRITICAL] Per-route canonical URLs`. Small, can pair with another iteration if convenient.
- Owner's bigger projects (A, B, C, D) are queued under their own headings in BACKLOG. Good ordering: A.1 Showcase build → C.1 IA plan → B.1 Button primitive → start through Project C in sequence. But that ordering isn't binding — the next session picks based on §2.2 priority + §2.3 chunking.

## Blockers introduced

None new.

## Surprises

- The `display: none` inline + `!important` media-query CSS pattern in the original code is robust — the bug was never about the media query failing. It was about *icon color matching surface color*. Easy to miss when reading code without rendering against a real surface.

## Discovered

- The `/inquire` page is still mailto-only (existing CRITICAL item). The `<main tabIndex={-1}>` wiring this iteration adds is also a nice prep for that work — programmatic focus management will land more cleanly.
- The header's dark-overlay state (overDark) is computed from `pathname + scrollY`. If a future page introduces a dark-surface hero too, that page also needs the same treatment. The cleanest extension would be: have each page declare `headerOverDark: true` via metadata, and consume that here. Not worth doing yet (only `/` has a dark-surface hero) but flag for future.
