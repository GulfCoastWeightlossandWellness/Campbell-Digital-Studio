# Agent Brief — CDS Agency-Grade Catch-Up (2026-06-09)

**Single source of truth for the 4 parallel agents.** Read this fully before editing. All facts below are VERIFIED from the live sites (curled 2026-06-09) or from the studio's own records. Do not invent numbers beyond these.

Repo root: `~/Desktop/Website/Campbell Digital Studio/Campbell-Digital-Studio`
The CDS marketing site is LIVE at **https://www.campbelldigitalstudio.com** (apex 308→www; canonical host is `www`).

## Why this build exists
Air Solutions and Pro 1 Painters have both gone LIVE on their real domains (migrated off WordPress). The CDS site (last content touch ~June 6) is lagging: it still shows Air Solutions on a Vercel URL with stale page counts, and Pro 1 Painters does not exist on the site at all. The job: catch the site up to the true state of the builds, add Pro 1 as a flagship case study, elevate the whole thing to agency grade, and fix indexing.

---

## ⚠️ HARD GUARDRAILS (do not violate)
1. **$0 paid API.** Claude Code only. No paid image generation, no paid SEO APIs. The main session is capturing REAL screenshots of the live sites — do not generate images.
2. **No fabrication.** Use only the verified facts below. Outcome metrics (rankings, Share-of-Local-Voice, traffic/lead lift) are NOT yet measured → render them as **pending / "measurement window open"**, never as invented numbers. Build-shape facts (page counts, tools, schema types, stack) below are verified and safe to publish.
3. **Patched Next.js 16.** Per `AGENTS.md`: "This is NOT the Next.js you know." Before writing any Next-specific API code, read the relevant guide in `node_modules/next/dist/docs/` and heed deprecation notices.
4. **Voice = `cds-voice-and-standards`.** This is a SOLO studio. Use "the studio" / "I" (Peyton Campbell, DO) — never a fake team "we." No agency-speak, no hedging, no "The Problem / The Solution" headers, no stat-bar clichés, no manufactured specificity.
5. **Git:** do NOT push or deploy. **Build:** do NOT run `next dev` or `next build` — the main session owns the single build + preview (parallel builds collide on `.next/`). `npx tsc --noEmit` is fine for a self-check.
6. **Stay on your owned files** (ownership map at the bottom) so the four agents never collide.

---

## VERIFIED FACTS — Air Solutions Heating & Cooling
- **LIVE on https://airsolutionspros.com** (migrated WordPress → Next.js; fully cut over). The old `liveUrl`/`websiteUrl` of `https://air-solutions-pros.vercel.app` is STALE — replace everywhere with the real domain.
- **345 live pages** (live sitemap.xml URL count, verified 2026-06-09). Use this, not the old "210" or "159."
- **282+ five-star reviews** (live homepage `<title>`: "Baldwin County HVAC | 282+ Five-Star Reviews | Air Solutions").
- Sector: HVAC, **Baldwin County, AL**. Status: **Active Retainer**.
- Architecture: programmatic **city × service matrix** across Baldwin County; a **multi-year native blog engine** (450+ posts authored, weekday drip, Vercel cron — no CMS/plugin).
- Custom interactive tools: **3D AC Explorer** (Three.js), **HVAC Diagnostic Quiz**, **Repair-vs-Replace ROI Calculator**, **Financing estimator**.
- **9-type Schema.org** architecture (HVACBusiness subtype, OfferCatalog, per-city postalCode arrays); **live NWS hurricane-alert** integration; **GBP API automation** (live) + Telegram field-photo intake.
- ❌ `go.airsolutionspros.com` is a SEPARATE legacy WordPress site — do NOT feature or link it.
- **Fabrication bans (Air Solutions):** no "owner answers personally," no member dispatch-fee discount, no specific ETA promises. OK to state: 24/7 dispatch, same-day priority, Cool Club (15%/5%/tune-ups).

## VERIFIED FACTS — Pro 1 Painters
- **LIVE on https://pro1painters.com** (DNS cutover 2026-06-07; WordPress → Next.js; Google Workspace email preserved; 75/75 legacy URLs return 200; `/concrete-coatings/` 301→`/floor-painting/`).
- **424 live pages** (live sitemap.xml URL count, verified 2026-06-09).
- **4.8★ from 297 reviews** (live homepage `<title>`: "Pro 1 Painters · Mobile + Baldwin · 4.8★ from 297").
- Sector: **Painting**, two locations: **Mobile + Baldwin County, AL** (Spanish Fort). Status: **Active** (new build + 2-location GBP management).
- Services: interior & exterior painting, **cabinet painting/refinishing**, and **FLOOR PAINTING**.
  - 🚫 **HARD RULE — Pro 1 does FLOOR PAINTING, NOT concrete/floor coatings.** Never use: "concrete coatings," "polyaspartic," "flake/quartz," "certified SW applicator," "Clear System," "pick your finish." Those were a faulty WP migration and are being undone.
- **AI Color Visualizer** — LIVE at `/tools/color-visualizer`. On-device computer vision: snap a room/exterior, tap a real paint color, see it repainted instantly — private, in-browser, $0. A flagship differentiator; feature it.
- **521-post blog library**, 2-year Mon–Fri drip (built 2026-06-09).
- CDS manages **both GBP profiles** (Mobile + Baldwin) with GBP API + Telegram photo intake.
- 🚫 **HARD RULE — Pro 1 uses subcontractors.** NEVER claim "no subcontractors," "W-2 only," or "our own crew on every job." OK framing: warranty-backed, family-owned, one accountable crew, manager sign-off.
- Do NOT publish pricing or contract terms on the public case study.
- Owner surname not verified → use the business name "Pro 1 Painters" on any "prepared for" / attribution line; do not invent a name.

---

## Screenshot path conventions (main session is capturing these live; reference by path)
Pro 1 (cover = the hero):
- `/images/case-studies/covers/pro-1-1-hero.png`
- `/images/case-studies/covers/pro-1-2-color-visualizer.png`
- `/images/case-studies/covers/pro-1-3-services.png`
- `/images/case-studies/covers/pro-1-4-floor-painting.png`
- `/images/case-studies/covers/pro-1-5-cities.png`
- `/images/case-studies/covers/pro-1-6-blog.png`
- `/images/case-studies/covers/pro-1-7-reviews.png`
- `/images/case-studies/covers/pro-1-8-contact.png`

Air Solutions (fresh live captures; the older `air-solutions-N-*.png` set also still exists):
- `/images/case-studies/covers/air-solutions-live-1-hero.png`
- `/images/case-studies/covers/air-solutions-live-2-services.png`
- `/images/case-studies/covers/air-solutions-live-3-cities.png`
- `/images/case-studies/covers/air-solutions-live-4-tools.png`
- `/images/case-studies/covers/air-solutions-live-5-blog.png`
- `/images/case-studies/covers/air-solutions-live-6-reviews.png`

If an image isn't on disk yet at your edit time, still reference the path — the main session guarantees it exists before final build.

---

## FILE-OWNERSHIP MAP (do not edit outside your lane)
- **Agent 1 — Data/Registry:** `lib/projects.ts`, `lib/data/clients.ts`, `lib/data/results.ts`, `lib/data/testimonials.ts`. (No `app/` edits.)
- **Agent 2 — Case-study routes:** everything under `app/work/**` — the `/work` index, `app/work/air-solutions/page.tsx` refresh, NEW `app/work/pro-1-painters/page.tsx`. Reuse `components/case-study-essay/*` as-is; if a Pro-1 variant is needed, create a NEW component file (never edit the shared ones).
- **Agent 3 — Agency-grade design:** `app/page.tsx` (home), `app/studio/**`, `app/healthcare/**`, `app/local-services/**`, `components/sections/**`, `components/editorial/**`, `components/{Hero,Header,Footer,HeroAurora,MagneticButton,StickyMobileCTA,...}`, `app/globals.css`. ❌ Do NOT touch `app/work/**`, `lib/projects.ts`, `lib/data/**`, `app/layout.tsx`, `app/sitemap.ts`, `app/robots.ts`, `components/case-study-essay/**`, `components/case-study/**`, `components/seo/**`.
- **Agent 4 — Indexing/SEO/AEO:** `app/sitemap.ts`, `app/robots.ts`, `app/layout.tsx`, NEW `app/manifest.ts` (if absent), NEW `public/llms.txt`, NEW `components/seo/**`, NEW `docs/INDEXING-REMEDIATION.md`. ❌ Do NOT edit `app/page.tsx`, `app/work/**`, `app/studio/**`, `lib/projects.ts`, `lib/data/**`. For page-level metadata gaps on pages you don't own, list them in `docs/INDEXING-REMEDIATION.md` for the main session to apply.

Build-time cross-deps are fine (e.g. home reads the registry Agent 1 writes) because the single build runs only after all four agents finish.
