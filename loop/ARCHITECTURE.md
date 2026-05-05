# Loop's view of the architecture

The canonical architecture document is `docs/ARCHITECTURE.md`. This file is a thinner, loop-specific lens — what every iteration needs to know without re-reading the full doc.

## Stack

Next.js 16.2.4 (App Router) · React 19.2.4 · TypeScript 5 strict · Tailwind 4 · Vercel.

## File layout (root, not `src/`)

```
app/                                — Next App Router routes
  layout.tsx                        — root, fonts, JSON-LD, mounts Header/Footer/StickyMobileCTA/Analytics
  page.tsx                          — long-scroll home (§01 hero → §08 contact CTA)
  not-found.tsx                     — editorial 404
  globals.css                       — design tokens (@theme inline) + editorial component CSS
  sitemap.ts                        — dynamic, reads siteConfig + featured projects
  robots.ts                         — references sitemap absolute URL
  inquire/page.tsx                  — currently mailto-only; needs a real form (BACKLOG #1)
  work/page.tsx                     — editorial index of 5 projects
  work/[slug]/page.tsx              — case-study template (only featured slugs render)
  call/page.tsx                     — Cal.com embed when env set, else email-fallback
  api/lead/route.ts                 — POST endpoint for footer + future playbook forms

components/
  Header.tsx                        — sticky header, hamburger, route-change close, Esc close
  Footer.tsx                        — three-col footer, mailto, optional GitHub, FooterEmailCapture
  StickyMobileCTA.tsx               — bottom-bar CTA on ≤768px, hides on scroll-down
  Analytics.tsx                     — Plausible loader (env-gated)
  CalEmbed.tsx                      — Cal.com embed bootstrapper
  FooterEmailCapture.tsx            — single-input form posting to /api/lead
  marks/StudioMark.tsx              — wordmark, light + dark variants
  editorial/                        — design-system primitives (SectionTag, EditorialH2, ...)
  sections/                         — reusable home/case-study sections (SelectedClients, FaqSection, ...)

lib/
  projects.ts                       — case-study data (single source of truth)
  site-config.ts                    — canonical URL, email, social, env-driven integrations
  analytics.ts                      — track() helper + EVENT constants
  data/
    testimonials.ts                 — empty-by-default with consent gating
    clients.ts                      — Selected Clients data
    results.ts                      — case-study Results data
    faq.ts                          — home FAQ items + FAQPage source

docs/                               — long-form documentation (ARCHITECTURE, HANDOFF, ...)
loop/                               — this directory; loop institutional memory
public/                             — favicon, brand wordmarks, case-study screenshots, OG images
next.config.ts                      — redirect map collapsing the old IA into long-scroll home
```

## Where to do common things

| Task | File |
|------|------|
| Change canonical URL or contact email globally | `lib/site-config.ts` |
| Add a project to the work index | `lib/projects.ts` |
| Render a project as a full case-study page | set `featured: true` in `lib/projects.ts` AND remove the redirect for that slug in `next.config.ts` if one exists |
| Publish a testimonial | `lib/data/testimonials.ts` (set `quote` + `permission: "written"` + `publicConsent: true`) |
| Add real metrics to a case study | `lib/data/results.ts` (the `caseStudyResults[<slug>]` array) |
| Edit FAQ Q&As (also updates JSON-LD) | `lib/data/faq.ts` |
| Add a Plausible event | `lib/analytics.ts`, then call `track(EVENT.x)` from a component |
| Tweak global design tokens | `app/globals.css` `@theme inline` block |

## Live routes (everything else 308-redirects)

- `/`, `/work`, `/work/revitalize`, `/work/air-solutions`, `/inquire`, `/call`
- `/sitemap.xml`, `/robots.txt`, `/api/lead` (POST only)

Not live: `/studio`, `/practice`, `/method`, `/notes`, `/review`, `/contact`, `/website-review`, `/work/<other-slugs>`. All 308-redirected per `next.config.ts`.

## Validation chain (run before every commit)

```bash
npm run lint     # ESLint flat config; expect zero errors, zero warnings
npm run build    # next build (Turbopack); type-checks as part of build
```

There is no `npm run typecheck` script — `next build` handles it. There are currently no tests; if a test suite is added, document the run command here.

## Branch policy

All loop iterations push to `claude/campbell-studio-rebuild-vivol`. `main` is fast-forwarded periodically by an explicit owner-authorized merge step (see iteration logs for when those happen).
