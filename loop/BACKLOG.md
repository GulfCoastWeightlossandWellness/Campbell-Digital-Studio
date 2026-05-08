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

# Owner-directed multi-iteration projects (added at iter 004)

The owner has directed three substantive shifts in design + IA. Each is too big for one iteration; each is broken into chunks here. Take them in the order shown — every chunk is sized for one iteration and ships independently.

## Project A — Showcase-style work display on the home page
**Why:** Owner wants the home page to "show off" the websites — a beautiful showcase room of the work, not a list under the hero. The current home has a typographic hero + curve + Selected Clients text-wordmark row. Showcase means visual: thumbnails, titles, real visit-this-site buttons.

### A.1 [HIGH] Build a `WorkShowcase` section component (one iteration)
**Effort:** M
**Dimension:** Conversion strength + Editorial
**Acceptance:** New `components/sections/WorkShowcase.tsx` renders the 6 client projects as a 2- or 3-column tile grid (mobile single-col). Each tile shows the project's `coverImage` at 16:9, title, scope/sector, and a primary CTA button (linked to the case study or live site) plus a secondary mono link for the live domain. On-system styling: paper-cream bg, navy/gold accents, subtle borders, no rounded-full pills.

### A.2 [HIGH] Replace home Selected Clients with the Showcase (one iteration)
**Effort:** S
**Acceptance:** `app/page.tsx` mounts `WorkShowcase` in place of the current `SelectedClients` row. Selected Clients lives on for any future "compact" surface but isn't on home.

## Project B — Buttons-everywhere CTA system
**Why:** Owner wants every clickable thing to be an obvious button — easy to spot, easy to tap. The current site is mostly editorial text-links with arrow animations. This shift moves primary CTAs to filled or outlined buttons; secondary text links remain.

### B.1 [HIGH] Add `Button` primitive with primary / secondary / ghost variants (one iteration)
**Effort:** M
**Dimension:** Conversion strength
**Acceptance:** `components/editorial/Button.tsx` exports a typed `Button` with `variant: "primary" | "secondary" | "ghost"`, `size: "sm" | "md" | "lg"`, supports both `href` (Link or external) and `onClick`. On-system: navy fill / cream text for primary, navy outline for secondary, gold underline for ghost (closest the design system gets to a "button"). Documented in THEME.md with rationale for the override of the existing "no rounded-full pills" rule (rounded-3px corners only — no full pills, no gradients).

### B.2 [HIGH] Replace primary text-link CTAs with `Button` instances (one iteration)
**Effort:** M
**Acceptance:** Hero CTAs ("See recent work", "Start a conversation", "Or book a 20-min call"), case-study tail CTAs, footer "Inquire about a project", `/inquire` "Email the Studio", `/call` "Email to schedule" — all use `Button`. Mono text-link arrow-CTAs remain for secondary actions and within-page in-prose links.

## Project C — Multi-page IA (significant rework)
**Why:** Owner wants the site as multiple pages instead of one long-scroll home. The previous rebuild deliberately collapsed `/studio`, `/practice`, `/method`, `/notes` into anchor sections of `/`. Reversing that creates real per-page surfaces but requires more than one iteration — reconfiguring redirects, building each page, updating nav across all routes.

### C.1 [HIGH] Decide page roster + nav structure (one iteration, mostly docs)
**Effort:** S
**Dimension:** Editorial cohesion
**Acceptance:** New file `loop/IA-PLAN.md` lists the new route map: e.g. `/`, `/work`, `/work/[slug]`, `/studio` (about + credentials), `/services` (capabilities + process), `/notes`, `/inquire`, `/call`. Updates `loop/BLOCKERS.md` to confirm Peyton's IA decision (or asks if any). No code change this chunk; sets the plan.

### C.2 [HIGH] Build `/studio` as a real page (one iteration)
**Effort:** M
**Acceptance:** `app/studio/page.tsx` renders the studio's about + credentials content (currently §07 of `/`). Removes the `/studio → /#about` redirect from `next.config.ts`. Updates Header + Footer nav to link to `/studio` instead of `/#about`. `/` keeps the §07 About section for the long-scroll experience, but the canonical "studio overview" lives at its own URL.

### C.3 [HIGH] Build `/services` (or `/practice`) as a real page (one iteration)
**Effort:** M
**Acceptance:** Same pattern: lift Capabilities (§04) + Process (§05) content into `app/services/page.tsx`. Remove `/services → /#capabilities` and `/practice → /#capabilities` redirects. Update nav.

### C.4 [MEDIUM] Build a thin `/notes` index (deferred until first essay exists, one iteration when triggered)
**Effort:** M
**Acceptance:** As specified in the existing "Build /notes index + slug route" item lower in this backlog.

### C.5 [HIGH] Refactor home page to reflect the new IA (one iteration)
**Effort:** M
**Acceptance:** Home shortens — the long-scroll sections that now have dedicated pages (About, Services) become thin previews on home that link to the dedicated pages. Hero, curve, WorkShowcase, FAQ, Contact CTA all stay.

### C.6 [HIGH] Update sitemap, JSON-LD, and SEO for new routes (one iteration)
**Effort:** S
**Acceptance:** `app/sitemap.ts` lists the new routes. Per-route metadata (title, description, canonical) declared in each new page's `generateMetadata`. Organization JSON-LD references key pages.

> Project C ships across 6 iterations. Don't try to compress it — each chunk has a clean scoped acceptance criterion and shouldn't be merged with neighbors.

## Project D — Mobile UX hardening (started in iter 004; remaining)

### D.1 [MEDIUM] Run a real-device mobile audit at 320 / 375 / 390 / 414 / 720 widths (one iteration)
**Effort:** M
**Dimension:** Mobile experience
**Acceptance:** `loop/MOBILE_AUDIT.md` lists per-route per-width findings. Fixes are split into separate chunks if any are non-trivial.

### D.2 [MEDIUM] Add tap-feedback states (active style) to all clickable elements (one iteration)
**Effort:** S
**Acceptance:** Every interactive element has a visible `:active` style (e.g. brief opacity dim or scale). Helps mobile users know their tap registered.

### D.3 [LOW] Add tap-to-call link in the footer once Peyton publishes a phone number
**Effort:** S — blocked by a decision from Peyton. Not adding without a real number.

---

> Iter 005 closed `[CRITICAL] Wire /inquire to a real backend` — see `COMPLETED.md`.

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
