# Iteration 003 — Real-domain link treatment + IHE addition + URL fixes

**Date:** 2026-05-05
**Task:** Owner override (per loop prompt §15) — surface every client's live site as a prominent, separately-clickable link; give real custom domains more visual weight than `*.vercel.app` staging URLs; fix outdated URLs; add Interactive Health Education to the work index.
**Chunked:** false (sized at the upper edge of one iteration: 6 source files + 1 new helper)
**Files changed:** 6 source + 4 loop docs
**Lines changed:** +280 / -82

## What changed

### URL data

- `lib/projects.ts`: Revitalize liveUrl moved from `revitalize-medical-wellness-clinic-nine.vercel.app` to `revitalizemedicalclinic.com`. Air Solutions liveUrl moved from `airsolutionspros.com` to `air-solutions-pros.vercel.app` (per owner — the studio currently serves Air Solutions on the staging URL, not the previously-listed custom domain).
- `lib/data/clients.ts`: same URL updates. Added a sixth entry: `Interactive Health Education` with `websiteUrl: https://www.interactivehealtheducation.com/` and `productUrl: https://dashboard.interactivehealtheducation.com/`. Extended the `Client` type with an optional `productUrl` field for clients that have both a marketing site and a product surface (currently only IHE).

### New helper

- `lib/url-display.ts`: two pure functions — `displayDomain(url)` returns the `www`-stripped hostname (e.g. `revitalizemedicalclinic.com`); `isRealDomain(url)` returns `true` for custom domains and `false` for known staging hosts (`*.vercel.app`, `*.netlify.app`, `*.pages.dev`, `*.herokuapp.com`, `*.onrender.com`, `*.fly.dev`, `*.railway.app`).

### Visual treatment

- **Work index (`app/work/page.tsx`):** the row is no longer a single `<Link>`. It's a `<div>` with two independently-clickable targets — the **title** (links to the case study or the live site) and the **domain** (always opens the live site in a new tab). Real domains render in **gold serif at 13.5px**; staging URLs render in **mono ink-mute at 12px**. Hover state on real domains underlines them in gold; staging URLs underline in ink. Hover state on the row tints the background `paper-sand` and underlines the title.
- **Work index — IHE row added.** Sixth row, `2025`, "Interactive Health Education / Original Product", with both the marketing domain and the dashboard domain rendered side-by-side. The `productUrl` is prefixed with a small mono "LIVE PRODUCT:" label so it's clear which is which.
- **Case-study page (`app/work/[slug]/page.tsx`):** the existing "Visit live project ↗" link now renders as `Visit live: revitalizemedicalclinic.com ↗` for real domains (gold mono, 13px, weight 600) or stays in standard mono for staging URLs.
- **Selected Clients (`components/sections/SelectedClients.tsx`):** each tile now has a third element below the type — the live domain, separately clickable, gold-prominent for real domains, mono-muted for staging. IHE's tile also shows a `PRODUCT:` line with the dashboard URL.

### Accessibility

- Every domain anchor has an explicit `aria-label` like `Visit Revitalize Aesthetics & Wellness — opens in new tab`, so screen-readers don't just announce the bare URL.
- All external links use `target="_blank" rel="noopener noreferrer"`.

## Why

Owner request: "link all the websites appropriately and easy to click — display them and have people want to click on them … the ones with real domains should have a higher value." The visual change communicates two things at once:

1. **Easy to click** — the domain is now visible in plain text on every row, not hidden behind a "Visit live project" CTA two scrolls down. Visitors who want to skip the case-study and check the live work can do so in one click from the work index, the home Selected Clients row, or the case-study page itself.
2. **Real-domain weight** — five of the six clients pay for and operate their own custom domain; that is itself a credibility signal (these aren't placeholder URLs, they're businesses). Putting those in gold serif vs. mono-muted for staging creates a visible quality gradient — and gives the studio a quiet way to upgrade Air Solutions's row whenever its `airsolutionspros.com` domain comes back online (single line change in projects.ts).

## Score delta

| Dimension              | Before | After | Delta |
|------------------------|-------:|------:|------:|
| 2. Conversion strength | 6      | 7     | +1    |
| 8. Social proof        | 4      | 5     | +1    |
| **Total**              | 65     | 67    | +2    |
| **/100**               | 72     | 74    | +2    |

Other dimensions unchanged. Notes:

- **Conversion 6 → 7.** The work index now has a per-row "live site" affordance that's separate from the case-study click target. Two distinct paths from the index instead of one. Visitors who want to verify the studio's claims by opening the actual live sites can do so in one click each. Pre-qualifies inquiries.
- **Social proof 4 → 5.** Six client links visible from `/work`, five of them on real custom domains (one on staging). This is *implicit* social proof — these are real businesses operating their own sites. Cross-checks the studio's "I built these" claim. Goes from "5 named clients" toward "real businesses, real domains, real money spent on hosting."
- **Code quality unchanged.** Added one helper (`lib/url-display.ts`) used in three components; consistent rendering across all consumers. No `any`, no inline magic strings.

## Notes for next iteration

- IHE's project type currently lives only in the work-index `rows` array and `lib/data/clients.ts`. Not in `lib/projects.ts` — because IHE has no case-study page (`/work/interactive-health-education` 308-redirects to `/work` per `next.config.ts`). If a case study is ever wanted, it'll require: (a) removing the redirect, (b) adding an entry to `projects.ts` with all the case-study fields populated, (c) setting `featured: true`. Document this in the IHE row comment if anyone gets confused later.
- The URL data is now duplicated between `lib/projects.ts` and `app/work/page.tsx` `rows[]`. This duplication is older than this iteration. Worth a future iteration to deduplicate by reading `rows` from a single source — but only after the new IHE row stabilizes, since the data shape is now slightly different (IHE has `productUrl`, others don't).
- Air Solutions is currently the only `is-staging` row visible. If the `airsolutionspros.com` domain comes back, update one liveUrl in `projects.ts` and one in `app/work/page.tsx`'s rows[] — visual treatment auto-flips to gold.

## Blockers introduced

None new.

## Surprises

None. Lint clean on first run, build clean on first run, dev-server smoke confirmed every domain renders twice (once in `href`, once in visible text) with the right CSS class for its real-vs-staging status.

## Discovered

- The work-index row was previously a single `<Link>` wrapping the entire row content. Restructuring it into separate Title-link + Domain-link required converting the wrapper to a `<div>` and re-attaching hover state via CSS classes instead of relying on the link element's hover. Cleaner long-term, slightly more verbose CSS, no behavior loss.
- The Boostly-style "domain pill with arrow" pattern from iteration 002's reference imagery has a natural editorial analogue: monospace text with `↗` glyph, gold weight for real domains. Same legibility as a pill button without the pill button. Good ratio of effect to drift.
