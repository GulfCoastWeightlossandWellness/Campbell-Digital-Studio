# Scoring — Campbell Digital Studio

Rubric (0–10 per dimension, 90 total). Aim for ≥85/90 (94/100) as the "essentially done" threshold. See loop prompt §07 for the rubric definitions.

## Current scores (after iteration 001)

| Dimension              | Score | Why                                                                                   |
|------------------------|-------|---------------------------------------------------------------------------------------|
| 1. Editorial cohesion  | 8     | Single nav, single footer, consistent voice, design tokens centralized. Italic sub-clause used in 7/8 H2s. |
| 2. Conversion strength | 6     | Inquire (mailto), `/call` (env-gated Cal.com), footer email capture (wired to `/api/lead`), sticky mobile CTA — but `/inquire` itself is mailto-only and `/playbook` doesn't exist yet. |
| 3. Mobile experience   | 8     | Hamburger correctly closes on Escape + route change, sticky CTA bar, 44×44 tap targets. No CLS issues observed. Lighthouse not yet run on mobile. |
| 4. Accessibility       | 7     | Focus-visible styles, aria-modal/expanded/controls on overlay, prefers-reduced-motion honored. Skip-to-main link missing; full axe sweep not yet run. |
| 5. Performance         | 8     | next/font, next/image with `sizes`, deferred analytics, lazy Cal embed. Lighthouse not yet run for a numeric baseline. |
| 6. SEO infrastructure  | 8     | Per-page metadata via `generateMetadata`, Organization + WebSite + FAQPage JSON-LD, sitemap reads from `siteConfig`, Twitter Card. BreadcrumbList missing on case studies; per-route canonicals not all explicit. |
| 7. Content quality     | 6     | Real case-study scope copy. Two case studies have `valueExplainer` pull-quotes. No real Results numbers seeded yet (data layer is empty for both featured slugs). |
| 8. Social proof        | 4     | Selected Clients row renders with 5 clients (text wordmarks). Testimonial section auto-hides because no entry has a real quote yet — both seed entries have empty `quote`. |
| 9. Code quality        | 8     | TypeScript strict, ESLint clean, design tokens centralized, sections componentized, env-gated integrations with safe fallbacks. Untyped `any` count: 0. |
| **Total**              | **63**| **/90 = 70/100**                                                                      |

> Three of these (Editorial, Mobile, Performance — all 8) are self-assessments pending real data: a full grep audit for design-system drift; a real Lighthouse mobile run; and an axe-core sweep. Each is on the backlog. Today's number is conservative; numbers may move when real data lands.

## History

| Iter | Editorial | Conv | Mobile | A11y | Perf | SEO | Content | Social | Code | Total | /100 |
|------|-----------|------|--------|------|------|-----|---------|--------|------|-------|------|
| 001  | 8         | 6    | 8      | 7    | 8    | 8   | 6       | 4      | 8    | 63    | 70   |

## Notes per dimension

### Editorial cohesion (8/10)
Strong. One nav, one footer, design tokens defined in `app/globals.css` `@theme inline`. Section markers used consistently. To reach 9: audit every H2 for italic sub-clause, ensure no inline ad-hoc styling outside the system, replace any remaining ad-hoc fonts/colors.

### Conversion strength (6/10)
Built but incomplete:
- `/inquire` is mailto-only (loses leads to email clients that fail to open).
- `/call` shows fallback because no Cal.com username configured (BLOCKER).
- `/playbook` route does not exist.
- Footer email capture works.
- Case studies have a tail CTA that links to `/inquire` and (when configured) `/call`.

### Mobile experience (8/10)
Hamburger close on Esc + route change, body-scroll lock, raised z-index, ≥44×44 tap target, sticky bottom CTA bar that hides on scroll-down. Tier reduces to 7 if Lighthouse mobile reports Performance <85.

### Accessibility (7/10)
- ARIA on hamburger overlay correct.
- Focus rings present (`:focus-visible` global rule).
- `prefers-reduced-motion` honored globally.
- Missing: skip-to-main, full axe sweep, color-contrast audit on `gold-700` on `paper-cream`.

### Performance (8/10)
- next/font with `display: swap`.
- All `<Image fill>` have `sizes`.
- Cal.com embed loads on-mount only on `/call`.
- Plausible script is `defer` and only renders if env var set.
- No numeric Lighthouse score recorded yet.

### SEO infrastructure (8/10)
- Per-page `generateMetadata` exists for `/work/[slug]`.
- Layout-level Organization, WebSite, Person JSON-LD; FAQPage JSON-LD on home.
- Sitemap omits redirected URLs.
- Missing: per-page explicit `alternates: { canonical }` overrides (root layout sets `canonical: "/"` which is incorrect for sub-routes), BreadcrumbList JSON-LD on case studies.

### Content quality (6/10)
- Five case-study entries with real scope copy and `valueExplainer` paragraphs.
- Featured case studies have screenshots, brief, deliverables, market valuation rationale.
- Missing: real numbers (Local Falcon SoLV, ARP, etc. — owner blocker).

### Social proof (4/10)
- Selected Clients row renders five clients with `publicConsent: true`.
- Testimonial section auto-hides because both seed entries have `quote: ""`.
- BLOCKER: written testimonial permissions from at least Reaves Nelson, Revitalize.

### Code quality (8/10)
- ESLint clean (zero errors, zero warnings).
- TypeScript strict.
- Components grouped in `components/editorial/` and `components/sections/`.
- Data layer in `lib/data/` with displayability gates.
- All integrations env-gated.
