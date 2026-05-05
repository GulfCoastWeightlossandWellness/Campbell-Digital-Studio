# Architecture — Campbell Digital Studio

A short reference for anyone (human or AI) about to change this codebase. Read this before editing.

## Stack

- **Next.js 16.2.4** (App Router, async params, `generateStaticParams`)
- **React 19.2.4**
- **TypeScript 5** (`strict: true`)
- **Tailwind CSS 4** (via `@tailwindcss/postcss`, `@import "tailwindcss"` in `globals.css`, theme tokens in `@theme inline`)
- **next/font** for self-hosted Google fonts (Fraunces, Manrope, JetBrains Mono)
- **Vercel** target deploy

> **Important:** This is Next 16 + React 19. Some training-data patterns no longer apply. Notably: route handlers' `params` are now async (`params: Promise<{ slug: string }>`), and `next/image` requires `sizes` for `fill` images. See `node_modules/next/dist/docs/` if any patterns surprise you.

## File layout (root, not `src/`)

```
app/
  layout.tsx           — root layout, fonts, site-wide <head>, Header + Footer
  page.tsx             — single long-scroll home with §01–§07 sections
  globals.css          — design tokens + editorial component CSS (~650 lines)
  not-found.tsx        — 404
  sitemap.ts           — Next sitemap route
  robots.ts            — robots.txt route
  inquire/page.tsx     — mailto-based inquiry page (no form backend)
  work/page.tsx        — work index (5 rows)
  work/[slug]/page.tsx — case-study template (only `featured: true` projects render)

components/
  Header.tsx           — sticky header, scroll-shrink, mobile hamburger overlay
  Footer.tsx           — three-col footer (Studio / Index / Currently)
  editorial/           — typography primitives (SectionTag, EditorialH2, Eyebrow,
                          Cadence, Pullquote, Script, IndexRow, EditorialTable, Cover)
  marks/StudioMark.tsx — wordmark, light + dark variants

lib/
  projects.ts          — single source of truth for all case-study data
  site-config.ts       — canonical URL, name, email, contact info (added Phase 11)
  data/                — testimonials, clients, results, faq (added Phase 5/8)

public/
  favicon.ico, apple-icon.png, icon.png
  images/brand/        — wordmark assets
  images/case-studies/covers/ — screenshots per project, named `<slug>-N-<label>.png`
  images/og/           — open graph images
  images/site/         — site-wide media

docs/                  — internal documentation (this file, etc.)
scripts/               — one-off Python utilities (brand asset prep)

next.config.ts         — redirect map (collapses old `/contact`, `/about`,
                          `/services`, `/method`, `/notes/*` etc. into the
                          long-scroll home + `/inquire`; also redirects three
                          legacy case-study slugs to `/work`)
tsconfig.json          — paths: `@/*` → `./*`
eslint.config.mjs      — flat config, `eslint-config-next` core-web-vitals + ts
postcss.config.mjs     — Tailwind 4 PostCSS plugin
```

## Routes (live)

| Path            | Layout | Notes |
|-----------------|--------|-------|
| `/`             | root   | Long-scroll home, §01 hero → §07 closing CTA. Sections use `id="capabilities"`, `id="process"`, `id="about"` so `/about` etc. redirects can deep-link. |
| `/work`         | root   | 5-row editorial index. Featured rows link to `/work/[slug]`; the rest open the live URL in a new tab. |
| `/work/[slug]`  | root   | Case-study template. `generateStaticParams` only emits `slug`s where `project.featured === true` — currently `revitalize` and `air-solutions`. |
| `/inquire`      | root   | Mailto-driven inquiry page. No backend form. |
| `/sitemap.xml`  | n/a    | Dynamically generated from `lib/projects.ts`. |
| `/robots.txt`   | n/a    | Allow all, points at sitemap. |

## Redirects (next.config.ts)

Permanent (`308`) redirects collapse the older multi-page IA into the long-scroll home and `/inquire`. The redirected paths are: `/about`, `/studio`, `/services`, `/practice`, `/method`, `/notes`, `/notes/:slug*`, `/contact`, `/review`, `/website-review`, plus the three legacy case-study slugs `/work/interactive-health-education`, `/work/acexperts`, `/work/collective-counseling`, `/work/blessed-barbershop`.

> **Consequence:** even though `lib/projects.ts` still contains data for `acexperts`, `collective-counseling`, and `blessed-barbershop`, those slug pages are unreachable in the browser — every request 308-redirects to `/work`. The `/work` index links those three rows directly to their **live** URLs in a new tab. This is intentional: only Revitalize and Air Solutions are presented as full case studies right now.

## Data layer

### `lib/projects.ts` (existing)

Single export `projects: Project[]` plus `getProjectBySlug(slug)` and `getLabelClass(label)`. Each `Project` has the shape:

```ts
type Project = {
  slug: string;
  title: string;
  label: ProjectLabel;       // "Original Build" | "Original Product"
  category: string;
  shortSummary: string;      // hero subhead
  summary: string;           // brief paragraph
  liveUrl: string | null;
  featured?: boolean;        // true → renders at `/work/[slug]`
  coverImage?: string;
  tags: string[];
  features: string[];
  valuePoints: string[];
  stack: string;
  challenge: string;
  whatIBuilt: string;
  seoConversion: string;
  businessValue: string;
  screenshotLabels: string[];
  screenshotImages?: string[];
  valueExplainer: string;    // pullquote on case study
  filterTags: FilterTag[];
};
```

**Five projects** are seeded: `revitalize`, `air-solutions`, `acexperts`, `collective-counseling`, `blessed-barbershop`. Only the first two are `featured: true`.

### `lib/data/` (added in this rebuild)

- `testimonials.ts` — quotes with consent gating (renders anonymously if `publicConsent: false`; sections empty-state to nothing if no testimonials are publishable).
- `clients.ts` — Selected Clients row data, gated by `publicConsent`.
- `results.ts` — case-study results blocks (omitted if no entries for a slug).
- `faq.ts` — home-page FAQ items, also feeds JSON-LD FAQPage schema.

All four files start out gated and seeded with TODOs for Peyton's permission and real numbers — the page sections are designed to vanish gracefully when the data is empty.

### `lib/site-config.ts` (added in this rebuild)

Centralized canonical URL, studio name/email/social. Read by `app/layout.tsx`, `app/sitemap.ts`, `app/robots.ts`, and any component that needs an absolute URL or contact email. Migrating to a custom domain is a single env-var change — see `docs/DOMAIN_MIGRATION.md`.

## Styling system

- All visual tokens live in `app/globals.css` under `@theme inline` (Tailwind 4 token API) and re-declared on `:root` for raw `var(--…)` use in inline styles.
- Palette: navy 950–400, gold 700–50, paper cream/sand/stone/rule, surface, ink/ink-soft/ink-mute/ink-faint, plus status colors.
- Fonts (`next/font`): Fraunces (display, variable opsz), Manrope (body), JetBrains Mono (labels). Wired via CSS variables `--font-fraunces`, `--font-manrope`, `--font-jetbrains`.
- The site uses a hybrid of utility classes (`section-wrap`, `editorial-h2`, `cadence`, `pullquote`, `editorial-link`) and inline `style={{}}` — the inline styles are deliberate to keep editorial typography readable in JSX. Don't refactor wholesale.

## Component conventions

- **Editorial primitives** in `components/editorial/` are pure presentational, no client behavior.
- **`Header.tsx`** is a `"use client"` component (needs `useState`, `useEffect`).
- **`Footer.tsx`** is a server component.
- **`StudioMark`** uses `unoptimized` next/image — wordmarks are already small PNGs.

## What's working well (don't refactor)

- The five existing case-study data records and all their copy.
- The three "What I build / Verticals / What I don't do" lists on the home page.
- The 5-step process section.
- The studio's "mid-five figures and up" positioning paragraph.
- The editorial type system (Fraunces + Manrope + JetBrains Mono) and the gold/cream/navy palette.
- The work index's editorial-row layout.

## What was added in this rebuild (Phases 2–13)

See `docs/HANDOFF.md` for the full list; in summary:

1. Hamburger menu now closes on Escape and on route change (Phase 2).
2. Mobile sticky bottom-bar CTA on every page except `/inquire` (Phase 2).
3. Footer tap-to-email link (Phase 2).
4. `lib/site-config.ts` for canonical URL + email; `app/layout.tsx`, `sitemap.ts`, `robots.ts` and `inquire/page.tsx` read from it (Phase 11).
5. Sitemap rewritten to match real routes only (Phase 3 bug fix).
6. 404 page links cleaned up to point at live routes only (Phase 3 bug fix).
7. Organization + WebSite + Person JSON-LD in root layout (Phase 11).
8. Testimonials, clients, results, faq data layers in `lib/data/` (Phases 5, 8).
9. Selected Clients row, testimonial slot, and case-study Results block on homepage and case-study pages (Phases 5, 7).
10. FAQ section with FAQPage JSON-LD (Phase 8).
11. Footer email-capture form posting to `/api/lead` (Phase 6.3) — degrades to logging if no `RESEND_API_KEY` is set.
12. Cal.com booking embed at `/call`, conditionally rendered on `NEXT_PUBLIC_CAL_USERNAME` (Phase 6.1).
13. Plausible analytics + custom-event helpers in `lib/analytics.ts`, gated by `NEXT_PUBLIC_PLAUSIBLE_DOMAIN` (Phase 12).
14. `docs/DOMAIN_MIGRATION.md`, `docs/HANDOFF.md`, `docs/TODOS.md`, `docs/BUGS_FOUND.md`.

## Environment variables

| Name                           | Purpose                                                      | Required? |
|--------------------------------|--------------------------------------------------------------|-----------|
| `NEXT_PUBLIC_SITE_URL`         | Canonical site URL (overrides default `peytoncampbell.studio`) | No |
| `NEXT_PUBLIC_CAL_USERNAME`     | Cal.com username for booking embed at `/call`. If unset, `/call` shows a fallback CTA. | No |
| `NEXT_PUBLIC_PLAUSIBLE_DOMAIN` | Plausible domain. If unset, the analytics script does not render. | No |
| `RESEND_API_KEY`               | Resend API key for footer email capture & lead-magnet email. If unset, leads are logged to the server console. | No |
| `LEAD_NOTIFY_EMAIL`            | Where lead notifications are sent (defaults to studio contact email). | No |

All optional — the site renders and behaves correctly without any of them, with the integrations downgraded to safe fallbacks.
