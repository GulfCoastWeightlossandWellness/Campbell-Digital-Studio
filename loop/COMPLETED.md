# Completed work

Items shipped in commit `d0c58b0` (the prior rebuild) and any subsequent iterations. Format:

```md
## [iter NNN] Title — type / scope
{1-line summary}
```

## Pre-loop (commit d0c58b0, 2026-05-05)

These items from the loop prompt's §05 backlog were already shipped before iteration 001 ran. Listed here so future iterations don't duplicate them. Cross-reference: `docs/HANDOFF.md` and `docs/BUGS_FOUND.md` from that commit.

### Critical bugs (§5.1)
- Unify navigation across all routes — single `Header.tsx`, no competing nav.
- Unify footer across all routes — single `Footer.tsx`.
- Centralize site config — `lib/site-config.ts` with `url`, `name`, `email`, `description`, `ogImage`, `social`, `calUsername`, `plausibleDomain`.
- Resolve the `/studio` vs `/` overlap — `/studio`, `/practice`, `/method`, `/notes`, `/review`, `/contact`, `/website-review` 308-redirect into long-scroll home or `/inquire` (per `next.config.ts`).

### Theme cohesion (§5.2 partial)
- Forbidden patterns absent: no chat widget, no exit-intent popup, no logo wall, no fake reviews, no countdown timer, no card-named components.

### Conversion infrastructure (§5.3 partial)
- `/call` page with Cal.com embed gated by `NEXT_PUBLIC_CAL_USERNAME` (graceful fallback when unset).
- Footer email-capture form posting to `/api/lead` (Resend-or-console fallback).
- Sticky mobile CTA bar (≤768 px, hides on scroll-down).
- Case-study tail CTA linking to `/inquire` and conditionally `/call`.

### Social proof (§5.4 partial)
- Testimonials data layer (`lib/data/testimonials.ts`) with consent gating.
- Clients data layer (`lib/data/clients.ts`).
- Results data layer (`lib/data/results.ts`).
- FAQ data layer (`lib/data/faq.ts`) feeding both visible accordion and FAQPage JSON-LD.
- `SelectedClients` row on home (auto-hides if <2 consenting clients).
- `TestimonialBlock` slot on home + per case study (auto-hides on empty quote).
- `CaseStudyResults` block on case studies (auto-hides on empty results array).

### Case studies (§5.5 partial)
- Air Solutions and Revitalize render at full case-study depth (`featured: true`).
- Each has stack/artifacts cadence, brief, deliverables, market valuation rationale, prev/next.
- Per-case-study OG images via `generateMetadata`.

### SEO infrastructure (§5.6 partial)
- Organization, WebSite, Person JSON-LD in root layout.
- FAQPage JSON-LD on home.
- Per-page `generateMetadata` for case studies.
- Twitter Card metadata.
- `app/sitemap.ts` reads from `siteConfig`, lists only live routes.
- `app/robots.ts` references `siteConfig` for sitemap URL.

### Analytics (§5.9 partial)
- Plausible loader (`components/Analytics.tsx`), env-gated.
- `track()` helper with event constants in `lib/analytics.ts`.
- `Footer Email Captured` and `Calendar Booking Started` events fired from existing components.

### Polish (§5.11 partial)
- Editorial 404 page.
- Per-route `generateMetadata` overrides default title/description.

### Documentation
- `docs/ARCHITECTURE.md`
- `docs/BUGS_FOUND.md`
- `docs/DOMAIN_MIGRATION.md`
- `docs/HANDOFF.md`
- `docs/TODOS.md` (root-level, separate from `/loop/TODOS.md`)
