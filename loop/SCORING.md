# Scoring — Campbell Digital Studio

Rubric (0–10 per dimension, 90 total). Aim for ≥85/90 (94/100) as the "essentially done" threshold. See loop prompt §07 for the rubric definitions.

## Current scores (after iteration 003)

| Dimension              | Score | Why                                                                                   |
|------------------------|-------|---------------------------------------------------------------------------------------|
| 1. Editorial cohesion  | 9     | Single nav, single footer, consistent voice, design tokens centralized. Hero process-curve centerpiece + on-system gold-vs-mono domain treatment. Italic sub-clause used in 7/8 H2s. |
| 2. Conversion strength | 7     | Inquire (mailto), `/call` (env-gated Cal.com), footer email capture, sticky mobile CTA. **Work index and Selected Clients now expose every live site as a separately-clickable domain link — visitors can verify the studio's claims in one click.** `/inquire` still mailto-only and `/playbook` not built. |
| 3. Mobile experience   | 8     | Hamburger close on Escape + route change, sticky CTA bar, 44×44 tap targets. Hero curve collapses to vertical timeline ≤720px. Lighthouse mobile not yet measured. |
| 4. Accessibility       | 7     | Focus-visible styles, aria-modal/expanded/controls on overlay, prefers-reduced-motion. **Every external domain link has an explicit aria-label.** Skip-to-main link missing; full axe sweep not yet run. |
| 5. Performance         | 8     | next/font, next/image with `sizes`, deferred analytics, lazy Cal embed. HeroCurve inline SVG ~3KB; URL helper is pure-JS, near-zero bundle impact. Lighthouse not yet run. |
| 6. SEO infrastructure  | 8     | Per-page metadata, Organization + WebSite + FAQPage JSON-LD, sitemap from `siteConfig`, Twitter Card. BreadcrumbList missing on case studies; per-route canonicals not all explicit. |
| 7. Content quality     | 7     | Real case-study scope copy. Two case studies have `valueExplainer` pull-quotes. Hero curve visualizes engagement narrative. **IHE added as a sixth client entry with marketing + dashboard URLs.** No real Results numbers yet. |
| 8. Social proof        | 5     | Selected Clients row renders 6 clients. **5 of 6 are on real custom domains (visibly labeled).** Air Solutions on staging URL until its custom domain comes back. Testimonial section still auto-hides — no entry has a real quote yet. |
| 9. Code quality        | 8     | TypeScript strict, ESLint clean, design tokens centralized, env-gated integrations. **New `lib/url-display.ts` helper consumed by 3 components; no duplicated domain-formatting logic.** Untyped `any` count: 0. |
| **Total**              | **67**| **/90 = 74/100**                                                                      |

> Three of these (Editorial, Mobile, Performance — all 8) are self-assessments pending real data: a full grep audit for design-system drift; a real Lighthouse mobile run; and an axe-core sweep. Each is on the backlog. Today's number is conservative; numbers may move when real data lands.

## History

| Iter | Editorial | Conv | Mobile | A11y | Perf | SEO | Content | Social | Code | Total | /100 |
|------|-----------|------|--------|------|------|-----|---------|--------|------|-------|------|
| 001  | 8         | 6    | 8      | 7    | 8    | 8   | 6       | 4      | 8    | 63    | 70   |
| 002  | 9         | 6    | 8      | 7    | 8    | 8   | 7       | 4      | 8    | 65    | 72   |
| 003  | 9         | 7    | 8      | 7    | 8    | 8   | 7       | 5      | 8    | 67    | 74   |

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
