# Backlog

Reconciled against work already shipped in commit `d0c58b0` (the prior rebuild). Items the prompt's §05 mentions but that are already done are listed in `COMPLETED.md` instead. The list below is **only** what's still open.

Format per task:

```md
## [PRIORITY] Title
**Effort:** S / M / L  (S<30min, M=30–90min, L>90min — chunk if L)
**Dimension:** which scoring dimension this improves
**Why:** 1–2 sentences
**Acceptance:** how we know it's done
```

Priorities: `[CRITICAL]` (blocking the funnel or build), `[HIGH]`, `[MEDIUM]`, `[LOW]`.

---

## [CRITICAL] Wire `/inquire` to a real backend (replace mailto)
**Effort:** M
**Dimension:** Conversion strength
**Why:** The current `/inquire` page is a mailto link with a structured body. If a prospect's mailto handler fails (no default mail client, or webmail), the lead is lost silently. The `/api/lead` endpoint already exists; what's missing is an actual form on `/inquire` posting to it.
**Acceptance:** `/inquire` shows a form with the same fields the mailto template prompts for (business name, current site, scope, budget, timeline, message), submits to `/api/lead` with `source: "inquire"`, shows a thank-you state on success, and falls back gracefully when Resend isn't configured.

## [CRITICAL] Audit and standardize per-route canonical URLs
**Effort:** S
**Dimension:** SEO
**Why:** Root layout has `alternates: { canonical: "/" }`. With Next 16's `metadataBase`, this resolves to the home URL on **every** route — meaning `/work` and `/work/<slug>` advertise `/` as their canonical. Worse than missing.
**Acceptance:** Each route declares its own `alternates: { canonical: "/<path>" }` (or omits the override). View-source on `/work` and `/work/revitalize` shows distinct canonical link tags pointing at themselves.

## [HIGH] Add `BreadcrumbList` JSON-LD on case-study pages
**Effort:** S
**Dimension:** SEO
**Why:** Rich-result eligible breadcrumb in Google search results. Cheap to add, plays nicely with the existing per-page schema work.
**Acceptance:** `view-source:/work/revitalize` contains a `BreadcrumbList` JSON-LD block listing Home → Work → Revitalize.

## [HIGH] Add a skip-to-main-content link in the header
**Effort:** S
**Dimension:** Accessibility
**Why:** Currently a keyboard user must tab through the whole nav before reaching content. WCAG 2.4.1 (Bypass Blocks).
**Acceptance:** First Tab on any page focuses a visible "Skip to content" link that jumps to `<main>`. Link is hidden until focused.

## [HIGH] Build `/playbook` lead-magnet page (without a real PDF yet)
**Effort:** M
**Dimension:** Conversion strength
**Why:** A second free-with-email path increases captured leads who aren't ready for a call. Even without a finished PDF, the route + form can ship; the `/api/lead` route already supports `source: "playbook"`.
**Acceptance:** `/playbook` exists, renders an editorial landing page describing the GBP playbook, has an email-capture form. On submit, server logs the lead and (when Resend is configured) sends a confirmation email. Until a PDF is supplied, the success state says "I'll send you a copy once it's finalized — usually within a day."
**Blocked-by:** Final PDF source. Workaround: ship the page; the email-only-for-now flow is honest.

## [HIGH] Run a Lighthouse baseline and record numbers
**Effort:** S
**Dimension:** Performance
**Why:** "8/10" on Performance is currently a self-assessment. Without a real number, we can't tell if a future change regresses.
**Acceptance:** `/loop/PERFORMANCE_BASELINE.md` lists Performance / A11y / BP / SEO scores for `/`, `/work`, `/work/revitalize`, `/inquire`, `/call`, both desktop and mobile, with screenshots in `/loop/lighthouse/` if local environment allows.

## [HIGH] Run an axe-core a11y sweep and fix critical/serious findings
**Effort:** M
**Dimension:** Accessibility
**Why:** Before claiming "AA passing on every page" we need the data. axe-core can run via Chromium headless; results land in `/loop/A11Y_FINDINGS.md`.
**Acceptance:** No critical or serious axe findings on `/`, `/work`, `/work/revitalize`, `/inquire`, `/call`. Findings file exists either way.

## [HIGH] Verify peytoncampbell.studio DNS and complete the domain migration
**Effort:** S to verify, M to migrate
**Dimension:** SEO + brand
**Why:** Domain currently does not respond (ECONNREFUSED at iteration 001). Until it serves the site, every social share, OG card, and outgoing email links to a `*.vercel.app` URL.
**Acceptance:** `curl -I https://peytoncampbell.studio` returns 200 from Vercel. `NEXT_PUBLIC_SITE_URL=https://peytoncampbell.studio` is set in Vercel env. Sitemap, OG, JSON-LD all reflect the new origin.
**Blocked-by:** Owner needs to attach the domain in Vercel and (if not using Cloudflare) configure the DNS records Vercel asks for.

## [HIGH] Build `/notes` index + `/notes/[slug]` route, even if empty
**Effort:** M
**Dimension:** Editorial / authority
**Why:** "A studio has a public point of view" (Tier-3 goal). Even a bare-bones notes index communicates that essays will follow. The current `/notes` redirects to `/`, which forecloses the surface entirely.
**Acceptance:** Visiting `/notes` returns 200 and renders an editorial index. If no MDX essays exist, the index says so honestly: "Field notes start landing here when the first one's worth shipping." `/notes/[slug]` gracefully 404s.

## [HIGH] Track inquiry, lead-magnet, and external-link events with `track()`
**Effort:** S
**Dimension:** Analytics
**Why:** The events are defined in `lib/analytics.ts` but only `Footer Email Captured` and `Calendar Booking Started` are actually fired anywhere. Wire `Inquiry Form Submit` (after the inquire form ships), `Lead Magnet Download` (after `/playbook` ships), `Case Study Viewed` (on case-study load), `External Link Clicked` (on `Live Site ↗` clicks).
**Acceptance:** Each event fires in the right place. `loop/ANALYTICS.md` documents source values and example payloads.

## [MEDIUM] Audit every H2 for the italic-Fraunces sub-clause pattern
**Effort:** S
**Dimension:** Editorial cohesion
**Why:** Signature design move. Every H2 should have one. Audit catches drift before it spreads.
**Acceptance:** Every `<EditorialH2>` and `<h2>` in `app/` and `components/` either uses the `<em>...</em>` pattern or has a comment explaining why not.

## [MEDIUM] Audit every section opens with a `SectionTag`
**Effort:** S
**Dimension:** Editorial cohesion
**Why:** Same reason — signature pattern.
**Acceptance:** Grep `app/` and `components/` for `<section` elements; every prominent one is preceded by a `<SectionTag>` (exceptions: hero, very small interstitials, allowed and noted).

## [MEDIUM] Add a 500 error page (`app/global-error.tsx`)
**Effort:** S
**Dimension:** Polish / Tier-1 survival
**Why:** A blank Next.js error overlay during a server-side crash leaks framework details and feels broken. The 404 page is already in editorial style; the 500 should match.
**Acceptance:** `app/global-error.tsx` (and `app/error.tsx` for route-level) render the studio's editorial 500 page with a link back to `/`.

## [MEDIUM] Add print stylesheet for case studies
**Effort:** S
**Dimension:** Polish
**Why:** Prospects sometimes print case studies before a meeting. The current page prints the dark hero strip across the page top, prints the sticky CTA bar over content, and looks worse than the screen.
**Acceptance:** `@media print` rules hide the sticky CTA, header, footer; force navy text on white; preserve layout. A `Cmd-P` of `/work/revitalize` produces a usable printable page.

## [MEDIUM] Add per-case-study OG image (use the existing `coverImage`)
**Effort:** S
**Dimension:** SEO
**Why:** `generateMetadata` references `project.coverImage` already, but the size attributes for OG aren't set, so social platforms may not pick up the image cleanly.
**Acceptance:** Twitter Card validator (or LinkedIn Post Inspector once the domain is live) shows the case-study cover image in the preview.

## [MEDIUM] Wire the work-index "Live Site ↗" click as an `External Link Clicked` event
**Effort:** S
**Dimension:** Analytics / SEO
**Why:** Useful funnel signal: a prospect who clicks through to a live client site is engaging deeply.
**Acceptance:** Each row in `/work` fires the event with `{ destination: liveUrl, slug }` props on click.

## [MEDIUM] Add a `manifest.json` and configure mobile theme color
**Effort:** S
**Dimension:** SEO / Polish
**Why:** PWA-style polish. Cheap. Improves Lighthouse PWA score and adds a native-feeling iOS Add-to-Home-Screen.
**Acceptance:** `app/manifest.ts` returns the studio's name, short_name, theme_color (`#0C1F3D`), background_color (`#FAF6EC`), and the icon set. Layout `<head>` references it.

## [LOW] Document the analytics event taxonomy in `loop/ANALYTICS.md`
**Effort:** S
**Dimension:** Code quality
**Why:** Future iterations will add events; a stable doc keeps event names from drifting (`InquirySubmit` vs `inquiry_submit` vs `Inquiry Form Submit`).
**Acceptance:** `loop/ANALYTICS.md` lists every `EVENT.*` constant, where it fires, and the prop shape.

## [LOW] Replace the `Person` JSON-LD's vague `jobTitle` with something specific
**Effort:** S
**Dimension:** SEO / Content
**Why:** Currently reads "Physician with a development background." More specific (e.g. "Physician, Family Medicine resident") supports knowledge-graph linking.
**Acceptance:** `lib/site-config.ts` has a richer `founder` object; `Person` schema in layout uses it.
**Blocked-by:** Owner judgment on what credential to publish (Section 14 of the rebuild brief noted Peyton hadn't decided).

## [LOW] Convert the "What I build / Verticals / What I don't do" lists to `EditorialTable`
**Effort:** M
**Dimension:** Editorial cohesion
**Why:** They're currently three parallel `<ul>` lists. The studio's design language uses `EditorialTable` for comparison content. The lists work but aren't on-system.
**Acceptance:** Three lists become one `EditorialTable` with three columns. Mobile gracefully stacks.

## [LOW] Audit images for unused `unoptimized` flag
**Effort:** S
**Dimension:** Performance
**Why:** `StudioMark` uses `unoptimized` because the wordmarks are small PNGs. Verify no other large images do — `unoptimized` skips Vercel's image-resizing pipeline.
**Acceptance:** Grep returns one result (`components/marks/StudioMark.tsx`) and it's intentional.

## [LOW] Add `application/rss+xml` `/rss.xml` once `/notes` has at least one essay
**Effort:** S (when triggered)
**Dimension:** Authority / SEO
**Why:** Standard editorial-site signal.
**Acceptance:** Deferred until first essay ships.

## [LOW] Build `EditorialTable` if it isn't already a real component
**Effort:** S
**Dimension:** Code quality
**Why:** It's referenced in `globals.css` but I haven't verified there's a React component wrapping it.
**Acceptance:** `components/editorial/EditorialTable.tsx` exists with a typed `EditorialTableProps`. Used by at least one consumer.

## [LOW] Surface the GitHub link in the footer when env var is set
**Effort:** S
**Dimension:** Trust / Code quality
**Why:** Footer already has the conditional render; verify it actually fires when `NEXT_PUBLIC_GITHUB_USERNAME` is set.
**Acceptance:** Setting the env var locally renders a "GitHub ↗" link; unsetting hides it.

## [LOW] Consider whether `/practice` and `/method` should become real pages or stay redirects
**Effort:** L (if building real pages — chunk to multiple iterations)
**Dimension:** Editorial / Authority
**Why:** The previous rebuild collapsed them into anchors on `/`. The loop prompt's §04.2 issue list assumes they should be standalone pages. The studio's voice is currently long-scroll; building separate pages risks fragmenting again. Worth Peyton's call.
**Blocked-by:** Owner decision. Add to BLOCKERS.md.

## [LOW] Add `og:locale`, `og:site_name`, and Twitter `creator` (when handle confirmed)
**Effort:** S
**Dimension:** SEO
**Why:** Squeezes the last drops out of social previews.
**Acceptance:** Layout metadata adds these where they're not already set.

## [LOW] Add a `<noscript>` fallback for the footer email-capture form
**Effort:** S
**Dimension:** Accessibility / Polish
**Why:** Form is a `"use client"` component. JS-disabled visitors see no form. Lowest-friction lead path goes silent.
**Acceptance:** `<noscript>` block renders a mailto link to `siteConfig.email` with a prefilled subject.
