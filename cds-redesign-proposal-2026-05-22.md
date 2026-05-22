# CDS Redesign Proposal — 2026-05-22

Synthesis of 9 parallel-agent audits covering current state, portfolio inventory, IA + flow, hero design, motion + interaction, case study presentation, tech showcase, competitive benchmarks, and image asset audit.

**TL;DR:** The brand recolor (navy/gold/cream) was the right fix; the structure is now the wrong fix. The site currently **talks about the work instead of showing it running.** Your portfolio holds **~560 usable original images** and the site surfaces fewer than 30 — a 20:1 supply-to-use gap. **The single biggest move is to take the 90% of visual proof sitting on disk and put it on the page**, then layer in one live, working tech demo (Live Matrix Generator) as the "this guy knows what he's doing" moment.

---

## 1 · The diagnosis (from agents 1, 2, 3, 6, 9)

| Symptom | Reality |
|---|---|
| Homepage proof bar says **"2 live client builds"** | `lib/data/clients.ts` has **6 consented clients** |
| Site claims **2 case studies** (Revitalize + Air Solutions) | Portfolio has **9 shipped projects** with case-study material |
| `lib/data/results.ts` arrays are TODO; testimonials are empty strings | Sections 02 (Results) + 03 (Client voice) + 08 (Outcome) render nothing or render placeholders on case studies |
| `lib/data/testimonials.ts` has empty quotes | Homepage testimonials section conditionally disappears |
| Featured Work is **homepage section 04** (after Hero, Proof Bar, Clients, Testimonials) | Real shipped work first hits the visitor on the **fifth scroll** |
| `featured: false` on 4 of 6 projects | ACExperts, Collective, Blessed, IHE link OUT to live site instead of having internal case studies |
| Header nav has 5 items, 3 are homepage anchors | Clicking "Process" from `/work` scrolls homepage — the source of the "feels off" feeling |
| `HeroAurora.tsx` exists in the repo | Imported nowhere. Orphan code. We just recolored it for nothing. |
| Air Solutions case study advertises 3D AC Explorer | You have to leave the CDS site to see it |
| Site ships **one animation total** | The mobile-nav slide-in. Zero scroll reveals. Zero interactive demos. Zero embedded Three.js. |
| 30+ MB of `public/images/case-studies/covers/` PNGs (62 covers) | Most are unused outside the 2 featured case studies |
| 146 IHE app thumbnails in `IHE Product Dashboard/public/thumbnails/` | None appear on the CDS site |
| Pro 1 Painters has **57 named-project photo folders** (Wind Creek Casino, Ronald McDonald House, Mobile Public Library, Quayside Art Gallery) | Pro 1 isn't in the CDS work index at all |
| `IHEMarketingDemo.mp4` (23MB demo reel) | Sitting unused |

**The "feels off" feeling is structural, not visual.** The architecture treats the site as a 9-section editorial essay; the buyer expects a portfolio shop floor.

---

## 2 · The thesis (the CDS positioning surfaced by agent 2)

> **Programmatic-SEO architectures with custom interactive tools and GBP operations, built for healthcare and local service businesses, by a physician-developer working solo.**

The differentiation isn't "I build websites." It's three things stacked nobody else combines:
1. **Programmatic SEO at real scale** (159 routes on Air Solutions, 70 on Revitalize, etc.) — agency work at indie-dev pricing
2. **Custom interactive tools** (3D AC Explorers, Manual J sizing calculators, financing/ROI calcs) — built, not embedded
3. **GBP operations + automation** (Telegram bot field intake, GBP API automation, NAP audits) — operational work most agencies don't touch

Plus the physician credential — none of the surveyed healthcare design studios are clinicians.

**Portfolio scale, accurately stated:** ~330 unique pages shipped across 9 projects in 18 months, 1 operator, 4 active retainers, 3 verticals.

---

## 3 · The new IA (from agent 3)

### Top-level nav (buyer-shaped, not feature-shaped)

```
Work · Healthcare · Local Services · Studio · Notes        [Inquire →]
```

- Drop **Capabilities** and **Process** as standalone nav items — fold into `/studio`. Keep as deep-linkable anchors (`/studio#process`, `/studio#capabilities`)
- Drop **About** as a homepage anchor; add as `/studio` page with founder portrait, principles, and process
- Add **Healthcare** and **Local Services** vertical landing pages — clinical-practice owner self-sorts in 0.4s
- Add **Notes** field-log for long-tail SEO + proof-of-thinking

### Sitemap (Tier 1 = in nav, Tier 2 = footer/discoverable, Tier 3 = utility)

| Tier | Route | Purpose |
|---|---|---|
| 1 | `/` | Home — hero with live demo → 2 featured cases above the fold scroll → vertical split → studio principles → contact |
| 1 | `/work` | Work index — alternating bands, filter pills, all 9 shipped |
| 1 | `/work/[slug]` | Case study deep dive — 8 sections, 10–12 screenshots, embedded demos |
| 1 | `/healthcare` | Vertical landing — clinical buyer entry |
| 1 | `/local-services` | Vertical landing — HVAC/trades/local SMB entry |
| 1 | `/studio` | Combined About + Process + Capabilities + FAQ |
| 1 | `/inquire` | Long-form qualified intake form |
| 2 | `/index` or `/archive` | **Studio Index** — text-only ledger of every URL, route count, page count, schema type, date shipped. Single best abundance move. |
| 2 | `/notes` + `/notes/[slug]` | Field log — 8–15 short entries on GBP API quirks, programmatic SEO traps, clinic intake patterns |
| 2 | `/call` | Cal.com booking (currently dead — wire it or remove the link) |
| 2 | `/pricing` | Engagement bands; filters bad leads before /inquire |
| 3 | `/privacy` `/terms` `/uses` `/colophon` `/sitemap.xml` `/robots.txt` `/llms.txt` `/404` | Utility |

### Homepage section order (10 sections, ~950 words total — down from current ~1,400)

| # | Section | Communicates | Treatment |
|---|---|---|---|
| 01 | **Hero — split stage** | Positioning + working proof | Type left on cream + live device frame right on navy stage (cycling Air Solutions matrix → IHE dashboard → Revitalize) |
| 02 | **Featured case A — Air Solutions** | Programmatic SEO + GBP scale | Full-bleed cover + 3-metric tile bar + Read case study link |
| 03 | **Featured case B — Revitalize** | Multi-entity healthcare ecosystem | Same template |
| 04 | **Vertical split** | Self-sort | Two-column: "Clinical practice →" + "Local service business →" |
| 04.5 | **Live Matrix Generator** | THE working tech demo | See section 5 |
| 05 | **Selected clients strip** | Range proof | Real-color SVG logos (not greyscale carousel) — Revitalize, Air Solutions, IHE, ACExperts, Collective, Blessed |
| 06 | **Studio principles (3 cards)** | Differentiation | Owner-operator · Healthcare + local services only · Architectures, not brochures |
| 07 | **Featured testimonial** | Trust | One quote, named attribution, role + business (when real quotes land — currently empty) |
| 08 | **How an engagement runs** | Process clarity | Real days, not phases: "Day 0 kickoff · Day 7 staging URL · Day 14 launch · Day 30 first SEO report" |
| 09 | **About — Peyton, in 60 seconds** | Identity | One paragraph + one small inline photo. Link to `/studio` for longer version. |
| 10 | **Closing CTA — dark navy band** | Action | "Start a project →" + "Or book a 20-min intro" |

**Key structural shift:** Featured work moves from section 04 → sections 02–03. Real work hits before any abstraction. Capabilities + Process + FAQ + About collapse into `/studio`. Homepage word count drops ~30%.

---

## 4 · The hero — split stage with a live device (from agent 4)

### Concept

**Left half (cream):** editorial typography. H1, subhead, CTA stack.
**Right half (dark navy):** frosted-glass device frame auto-rotating through three real shipped projects at real interaction speed.

Loops:
1. **Air Solutions matrix** — cursor flies the city × service grid, taps a cell, programmatic SEO page loads, 3D AC explorer rotating, NWS condition module, back to matrix (~7s)
2. **IHE dashboard** — patient-education app library scrolls, app card flips to reveal content, registrar validation flashes green (~6s)
3. **Revitalize clinic** — booking flow opens, hormone-therapy service page slides in, multi-location switcher animates (~6s)

Between loops: device dissolves to black for 240ms, thin gold label fades in:
> **"Air Solutions · HVAC · 312 pages live"**
> **"IHE · Patient Education · 146 apps shipped"**
> **"Revitalize · Multi-location wellness · 72 routes"**

The label is the **only** place hard numbers appear in the hero — proof without bragging.

**Device URL bar is part of the proof:** shows `airsolutionspros.com/services/ac-repair/daphne-al`. Real domain, real route.

### Hero copy

**H1 (italic serif on the two noun phrases):**
> Digital infrastructure for *clinical practices*
> and *local service businesses.*

**Subhead:**
> Multi-location architectures, programmatic SEO, and Google Business Profile operations — built end-to-end by a physician who codes.

**Meta line (mono, small):**
> Daphne, Alabama · Solo studio · Currently shipping for 2 active clients

**CTAs:**
- Primary: **Start a project →** (was "Start a conversation" — "conversation" is what every freelancer says)
- Secondary: **See the work →**
- Tertiary: *Or book a 20-min intro →* (only renders if Cal username is set)

### Hero motion choreography (1.4s total)

- **0ms:** H1 fades up 12px, two-line stagger, 60ms apart, 420ms each. The italic serif emphasis word arrives last with a 1px gold underline that draws-in then retreats
- **240ms:** Device frame draws — top chrome + bezel render immediately, screen cross-fades from poster (LCP-safe) to live loop
- **380ms:** Aurora blobs start drifting (existing HeroAurora component, now scoped to the navy right half)
- **+700ms:** CTA buttons fade in last with 40ms stagger
- **+1100ms:** Primary CTA gets a one-time gold-glow pulse (800ms)

LCP element stays the H1 (text). Device poster image is `<Image priority={false}>` with `fetchpriority="low"`. Video swaps in via `requestIdleCallback` after FCP.

### Mobile fallback (375px)

H1 → subhead → device collapses to phone-frame at 280px (Air Solutions mobile loop ONLY — saves bandwidth, avoids dropped frames) → stacked full-width CTAs → meta line. No magnetic CTAs, no device tilt, no parallax. The motion that survives: aurora drift (gentle) + the device loop (pauses on first scroll past via IntersectionObserver).

---

## 5 · Tech showcase features (from agent 7) — 26 hours total, ship in 2 weekends

### Build order

| # | Feature | Where | Hours | What it signals |
|---|---|---|---|---|
| 1 | **View Transitions API** for /work nav | Cross-route | 3 | Site moves like a phone app, not a website |
| 2 | **Air Solutions 3D AC Explorer embedded** via iframe in case study | `/work/air-solutions` mid-page | 2 | "He built this for a client. You're using it now." |
| 3 | **Live Matrix Generator** (the marquee feature) | Section 04.5 of homepage | 8–10 | "I picked a city + service, got a real page in <400ms. He can do that 210 times." |
| 4 | **Operator's Ledger** (the visual signature — see section 7) | Above footer + bottom of every section | 6–8 | "This studio is *running* right now." |
| 5 | **Code receipt** in About — 12 real sanitized lines from `lib/matrix/generate.ts` via Shiki at build time, copy button emits *"Copied. Lines from `lib/matrix/generate.ts` — Air Solutions, 2026."* | `/studio` | 2 | Source-level credibility |
| 6 | **Scroll-driven schema inspector** — fixed `</> schema` chip bottom-right, streams JSON-LD as you scroll past each section | Site-wide overlay | 4–6 | "Real structured data behind every section" |

**Total: ~26 hours.** Combined bundle weight ≤12KB JS + 3.2KB CSS. LCP impact: neutral. CLS target: <0.02.

### The Live Matrix Generator (most important feature)

**Concept:** Two dropdowns — `[City]` + `[Service]` — synthesize a real matrix-cell preview in <400ms: H1, meta description, FAQs streaming in, JSON-LD revealing via clip-path inset, gold hairline sweeping the frame edge on completion. **Zero LLM call.** Deterministic templater with phrase-variance arrays (the no-boilerplate Wave D2 rule baked in).

**Stack:** Next 16 server action + Edge runtime, no new deps. ~14KB client JS (motion already loaded).

**Anti-poison rule:** the JSON-LD shown is rendered as inert `<pre><code>` — never injected as an actual `<script type="application/ld+json">` on the homepage (would poison Google's schema parser).

**File layout:**
```
app/page.tsx                              ← mount <MatrixDemo />
components/sections/MatrixDemo.tsx        ← client island (~70 lines, code skeleton provided)
app/api/matrix-preview/route.ts           ← Edge runtime endpoint
lib/matrix/corpus.ts                      ← ~30 cities × ~12 services × 4-6 phrase variants per cell
lib/matrix/generate.ts                    ← deterministic templater
```

---

## 6 · Case study presentation (from agent 6) — ~6 hours

### Homepage portfolio preview

Replace the 2-card grid with **1 anchor case study + 4-up strip + "+5 more in archive" counter.** Five visible on home with "**9 shipped, view archive**" counter. The counter converts implied "is that all?" into a concrete number.

### `/work` index rebuild

Drop the 3-column text table. Editorial alternating L/R full-bleed bands (70vh each, 90vh for the two Featured). Scroll-reveal: image translates up 40px + fades 0.6 → 1.

**Studio-at-a-glance strip at top (mono caption):**
> 9 projects shipped · 3 industries · 4 active retainers

**Filter pills:** All · Healthcare · Local services · Platform · Original product

**Sort:** tier-first, then chronological newest

### Three reframes that turn "thin" into "specialized"

1. **Active retainers vs Shipped builds** — signals ongoing relationships (Air Solutions, IHE, Revitalize, ACExperts active)
2. **Industry verticals framing** — *Healthcare (4) · Local services (4) · Original products (1).* Three HVAC clients reframes from "thin" to *"specialized in service-business SEO with proven repeat HVAC performance."*
3. **NEW `/index` archive page** — text-only CV-appendix ledger: ~80 lines of mono text saying "**330+ pages, 9 sites, 18 months, 1 operator.**" Biggest abundance flex in the whole redesign.

### Per-project card copy + tier

- **Air Solutions** — *159-page programmatic SEO build for a coastal-Alabama HVAC contractor: 15 cities × 9 services, four custom interactive tools.* **Tier 1 / Featured / Active Retainer**
- **Revitalize** — *Multi-location Georgia medspa — two clinics, supplement brand, published book, coaching institute, all under one 50-route ecosystem.* **Tier 1 / Featured / Active Retainer**
- **IHE Marketing** — *Public marketing site for an original digital-health product line — landing, bundles, and education funnel.* **Tier 2 / Original Product / Active**
- **IHE Dashboard** — *Live patient-education app with 146 interactive clinical modules served from a unified dashboard.* **Tier 2 / Original Product / Active**
- **ACExperts251** — *8-city × 7-service HVAC build with three interactive tools and Sheets-backed lead capture.* **Tier 2 / Original Build / Active Retainer**
- **Collective Counseling** — *Therapy practice site with a dedicated adult-ADHD-testing landing page and Daphne-local SEO.* **Tier 3 / Original Build / Shipped**
- **Pro 1 Painters** — *14-service residential + commercial painting site for a Pensacola operator, with portfolio gallery and quote flow.* **Tier 3 / Original Build / Shipped**
- **Blessed Barbershop** — *Mobile-first barbershop site with service menu, WebP-optimized gallery, and one-tap booking link.* **Tier 3 / Original Build / Shipped**
- **Rally Pro** — *Local-business site with schedule, pricing, and contact — fast, lightweight, mobile-first.* **Tier 3 / Original Build / Shipped (verify status)**

### Case study template improvements

- 6 screenshots → **10–12** per page
- Add **3-up mobile triptych layout** for mobile-first builds (perfect for Blessed)
- One `DeviceFrame.tsx` component, 3 variants: `laptop` / `phone` / **`browser`** (browser-chrome with URL bar is highest-ROI — URL reads as proof)
- **6-second cursor-demo MP4 loops** alongside the static cover (Treatment Finder for Revitalize, 3D Explorer for Air Solutions)
- **Fix `CaseStudyNav` to loop ALL projects, not just featured** — one-line change, makes portfolio feel 2× larger because visitors can rev → ihe → collective → blessed continuously
- **Lead with Results, not the Brief** — front-load proof; buyers skim

---

## 7 · The visual signature — Operator's Ledger (from agent 8)

**The single thing CDS should OWN visually.** Differentiates from every peer site surveyed.

A horizontal navy band running across the bottom of every section, with tabular data set in **mono typeface (JetBrains Mono or Berkeley Mono), gold on navy.**

**Contents (live, server-rendered from `/data/ledger.json`):**

```
SITES SHIPPED   LIGHTHOUSE   LAST DEPLOY   ACTIVE   UPTIME    ● LIVE
9               100/100      2h ago        4        99.99%
```

- One pulsing gold dot on the `● LIVE` indicator (single CSS keyframe pulse, GPU-only)
- ISR with `revalidate: 3600` — your Mac mini cron writes the JSON nightly (agent army already produces this data)
- Appears: above footer on every page, bottom of every section on homepage, footer of every case study

**Why it works:** signals "I ship and measure" in one element. Reuses navy/gold palette. Zero perf cost. Recognizable as CDS at half-scroll. None of the 18 peer studios surveyed use a tabular data band — uncontested visual territory.

---

## 8 · Motion + interaction language (from agent 5)

**One-phrase guide:** *Editorial precision with a gold undercurrent.* Every motion carries information; never decoration. Linear's confidence + Vercel's frame budget + Stripe's typographic micro-moves. **No Awwwards-2024 scroll-jacking.**

### Top patterns to deploy

| Pattern | Where | Library |
|---|---|---|
| **Magnetic CTAs** — button follows cursor within 120px radius, springs back | Hero + closing CTA | `motion` `useSpring` (already installed) |
| **Cursor-followed image-reveal** — hover project name → 280×360 preview lerps to follow cursor | `/work` index | `motion` + IntersectionObserver |
| **Sticky-stacked scroll** — Featured Work cards each pin for 1× viewport, next slides up to cover | Home featured section | GSAP + ScrollTrigger (lazy-loaded) |
| **Section index rail** — fixed left-edge 01–09 dots, gold-glow as section enters viewport | Home | IntersectionObserver only |
| **View Transitions** — `/work` thumbnail morphs into case-study hero via shared `view-transition-name` | Cross-route | Native browser, no lib |
| **Logo desaturation reversal + neighbor dim** | Selected Clients | CSS `:has()` only |
| **WebGL displacement on hover** — light noise ripple on thumbnails, lazy-loaded | `/work` only | `ogl` (5KB, not Three.js) |
| **Localized custom cursor** — gold dot only inside dark `.cover-surface` regions, native cursor everywhere else | Hero + closing CTA | `motion` `useMotionValue` |

**Bundle budget:** <8KB added on home, <35KB on `/work`. GSAP + ogl dynamic-imported only where needed.

**Reject list:** Lenis (smooth scroll breaks Mac trackpad), site-wide custom cursor (Webflow-template feel), glassmorphism, 3-second intros, scroll-jacking, Three.js on home, marquee logo strips, animated typewriter hero copy.

### Code skeleton: `MagneticButton.tsx` provided (40 lines, respects reduced-motion, falls back gracefully on touch). Drop-in replacement for `<Link className="btn-fill">`.

---

## 9 · Image strategy (from agent 9) — 20:1 supply-to-use gap to close

### Top 30 images to surface (file paths + placement)

**Air Solutions:** `truck-fairhope-pier.webp` (regional hero, `/work` lead) · `reaves-nelson-portrait.jpg` (case study header, vertical 4:5) · `trucks-side-by-side.jpg` (brands row) · `technician-copper-repair.webp` (process detail, masked silhouette)

**IHE:** `IHEMarketingDemo.mp4` + poster (homepage second-fold, autoplay muted) · 4 library-snapshots (ckd, diabetes, breast-cancer, cad) in device frames · 6 representative dashboard thumbnails for the **146-app mosaic**

**Pro 1 Painters:** `team-waving-1157.jpg` (case study top, 21:9) · `cabinet-after-1200.jpg` (before/after vertical pair) · `lamar-advertising-before-1/after-1` (drag slider reveal) · `kennedy-house-exterior-after` (project hero) · `mobile-public-library` + `ronald-mcdonald-house` (named-project wide cards)

**Revitalize:** `clinic-lobby-hero.jpg` (case study top) · `travis-woodley.jpg` (founder portrait, circle 1:1) · `youre-not-broken-cover.png` (book mockup — credibility band)

**ACExperts:** `landon-van.jpg` (case study hero, 16:9) · `landon-headshot.jpg` (testimonial portrait)

**Existing CDS covers:** `ihe-marketing-3-featured.png` · `air-solutions-1-hero.png` (browser-framed)

**Blessed:** representative interior shot (verify against live site to label the hashed `.webp` files)

### Five image-driven sections to add

1. **"146 apps mosaic"** — 146 IHE thumbnails in a 6-col endless marquee. Copy: *"146 apps. One studio. One year."* (Homepage second fold)
2. **Recent Work paired grid** — desktop + mobile device-frame renders for 4 projects (Air Solutions, Revitalize, IHE Marketing, ACExperts). Alternating offset (desktop slightly larger, mobile floats over corner)
3. **"Owners we've built for"** — 5 circle-cropped real founder portraits (Reaves, Landon, Travis, Calli, Pro 1's Rene). Copy: *"Small businesses. Real owners. Built with them, not for them."*
4. **Embedded IHE demo video** — `IHEMarketingDemo.mp4` inline 16:9, autoplay muted loop with poster. Copy: *"This is one we built. Click in."*
5. **"Before / After: Pro 1 Painters"** — drag-handle reveal slider, two pairs (Lamar Advertising + Kennedy House). Copy: *"Receipts."*

### Optimization

Run a batch `.webp` (q=85) + `.avif` (q=60) conversion on all case-study covers + 146 IHE thumbnails. Expected weight reduction: 60–75% on the 30MB CDS images folder and the 27MB IHE thumbnails folder.

### Asset gaps to fill (priority order)

1. **Founder portrait of Peyton** (zero portraits exist anywhere) — half-day shoot, two looks (desk + outdoor)
2. **Studio process shots** (desk/screens/coffee) — even iPhone with good light works
3. **4–6 editor capture MP4 loops** of Cursor/Claude composing a client component — proof for "AI-native studio" positioning
4. **Per-case-study OG cards** — only one OG image exists site-wide
5. **Pro 1 Painters case-study cover screenshots** — none exist in `case-studies/covers/`
6. **Real Blessed Barbershop semantic file names** — 35 hashed `.webp` files need labeling pass against the live site
7. **Unified client logo SVG set** — currently each lives in its own dir
8. **Per-project "results" hero typography** — one statement number per project as a typographic image ("146 patient education apps shipped")
9. **Rally Pro lifestyle photos** OR de-prioritize Rally in the case study lineup
10. **Dedupe Collective Counseling covers** (5 duplicates in covers folder)

---

## 10 · Voice + content direction (from agent 8)

**Voice:** *Understated, plain, slightly clinical.* Buyers are 45–65-year-old physicians and tradesmen who distrust marketing voice. Write the way a good discharge summary reads — short sentences, real numbers, no adjectives.

**Banned phrases:** "passionate," "craft," "elevate," "transform," "crafting digital experiences," "we tell stories," "we're a passionate team."

**Preferred verbs:** *ship, run, automate, replace, cut, post, build, measure.*

**Outcome verbs in case study cards** (not generic titles):
- *"Cut Air Solutions' page weight 71%"* (not "Air Solutions HVAC")
- *"Shipped 146 patient-education apps in 12 months"* (not "IHE Dashboard")
- *"Migrated Revitalize to one Next.js codebase across 5 sub-brands"* (not "Revitalize Wellness")

**Process timeline in real days, not phases:**
> Day 0 kickoff · Day 7 staging URL · Day 14 launch · Day 30 first SEO report

**Five asymmetric advantages CDS should BEAT the peer set on** (none of the 18 surveyed studios claim these):
1. Show real Core Web Vitals on every case study
2. Show real GBP / local SEO outcomes (peer set ignores local search)
3. Show stack honestly (Next.js on Vercel — most studios hide Webflow)
4. Show automation, not just websites (Telegram → GBP post screencap)
5. Show that you're a physician (none of the surveyed healthcare studios are clinicians)

---

## 11 · Anti-patterns to avoid (synthesized from agents 5, 7, 8)

- 3-second intro/preloader animations
- Glassmorphism / frosted-blur cards everywhere (peaked 2022)
- Mouse-trail particles, custom cursors as default, magnetic everything
- "Hello, I'm [Name]" hero with hand emoji
- Auto-rotating client logo carousel (static row outperforms — Stripe still uses one and it's their weakest section)
- Skeuomorphic MacBook/iPhone mockup frames around screenshots when no functional reason
- "Crafting digital experiences" / "we tell stories" / "we're passionate"
- Dark hero with neon gradient + grid (Linear-clone aesthetic, generic now)
- Lottie illustrations of abstract characters
- Lenis smooth-scroll (breaks Mac trackpad, breaks anchors)
- Heavy Three.js on first paint (unless it IS the case study — embed via iframe)
- Splash screens / loading percentages
- Live chat widget bots pretending to be Peyton
- First-visit modal (email capture or otherwise)
- Animating layout properties (width/height/top/left). Use transform + opacity + filter only.

---

## 12 · Build order — prioritized by impact-per-hour

### Phase 1 — Surface what already exists (highest impact, lowest risk, ~12 hours)

1. **Fix the proof bar lie.** Update `app/page.tsx` to say "**6 active client builds**" or "**9 shipped projects**" instead of "2 live client builds" (1 hr)
2. **Wire up ALL 6 portfolio projects as case studies.** Set `featured: true` in `lib/projects.ts` for ACExperts, Collective, IHE, Blessed. Add Pro 1 + Rally Pro. Build minimum-viable case study pages using existing screenshots in `public/images/case-studies/covers/` (4 hrs)
3. **Fix `CaseStudyNav` to loop ALL projects, not just featured** — one-line change, makes portfolio feel 2× larger (15 min)
4. **Studio-at-a-glance counter strip** on `/work` ("9 projects shipped · 3 industries · 4 active retainers") (30 min)
5. **`/index` archive page** — text-only ledger of every URL, route count, page count. ~80 lines of mono text. *"330+ pages, 9 sites, 18 months, 1 operator."* (2 hrs)
6. **Dedupe Collective Counseling covers** + run `.webp`/`.avif` batch conversion on `case-studies/covers/` + IHE thumbnails (1 hr)
7. **Delete orphan `HeroAurora.tsx`** OR rewire it into the new split hero (1 hr)
8. **Nav restructure:** Work · Healthcare · Local Services · Studio · Notes · Inquire. Remove homepage-anchor nav items. (2 hrs)

### Phase 2 — The structural hero + portfolio (highest visible change, ~14 hours)

9. **Split-stage hero with device frame** — replace current hero (8 hrs)
10. **Homepage portfolio preview** — 1 anchor + 4-up strip + "+5 more" counter (3 hrs)
11. **/work redesign** — alternating L/R bands, filter pills, scroll reveal (3 hrs)

### Phase 3 — Tech showcase + signature (~16 hours)

12. **View Transitions API on /work nav** (3 hrs)
13. **Air Solutions 3D AC Explorer embedded iframe** (2 hrs)
14. **Operator's Ledger** signature band + JSON data + Mac mini cron (6 hrs)
15. **Live Matrix Generator** (the marquee feature) (8 hrs — overflows phase, schedule its own session)

### Phase 4 — Motion + polish (~10 hours)

16. **MagneticButton component** + swap into CTAs (1 hr)
17. **Cursor image-reveal** on `/work` (3 hrs)
18. **Sticky-stacked scroll** on Featured Work (4 hrs)
19. **Section index rail** + scroll-driven schema inspector (2 hrs)

### Phase 5 — Content + voice (~8 hours)

20. **Rewrite all case-study card copy** to lead with outcome verbs (2 hrs)
21. **Rewrite process timeline** to real days (1 hr)
22. **Replace banned phrases** site-wide (1 hr)
23. **Fill case-study Results sections** with real metrics where available (2 hrs)
24. **Code receipt** in `/studio` via Shiki (2 hrs)

**Total: ~60 hours.** Spread across 3–4 weeks part-time, achievable for solo operator.

### Cuts I'd make if budget is tight

If you only do 20 hours, do Phase 1 + items 9, 10, 14 (Operator's Ledger). That alone fixes the "doesn't value the strength + size of my portfolio" complaint.

---

## 13 · What's NOT in this redesign

Decisions explicit so you can override:

- **No CMS migration.** All data files stay in `lib/data/*.ts`. You write content in TypeScript. Fine for 9 projects, painful at 100. Don't add Sanity/Contentful unless / until you cross 20+ projects.
- **No blog migration of existing content.** The new `/notes` is a fresh field-log, not a port of anything.
- **No theme toggle.** Dark mode signals tech maturity but adds complexity and isn't load-bearing for your buyers. Defer.
- **No login / member area.** The site stays brochure + portfolio + form.
- **No e-commerce.** Even though Rally Pro is e-commerce-shaped, CDS itself doesn't sell on the site.
- **No analytics dashboard for clients.** Tempting feature but high maintenance; clients get the monthly Local Falcon + data report instead.
- **No live chat widget.** Conflicts with the "you talk to me" copy on page.
- **Rally Pro deferred** until status verified — Tier 3 placement only if shipped.

---

## 14 · The single biggest change

If you change one thing this week, change this:

**Take the 90% of your portfolio sitting on disk and put it on the page.**

That's:
- All 9 projects as case studies (not 2)
- 146 IHE thumbnails as a homepage mosaic band
- 6 founder portraits across clients in an "Owners" row
- Wind Creek Casino + Ronald McDonald House + Mobile Public Library photos surfaced from Pro 1
- `IHEMarketingDemo.mp4` embedded as homepage hero supporting media
- Before/after slider for Pro 1's Lamar Advertising project
- 30 surfaced images in your "top 30" list with file paths already cataloged
- "330+ pages, 9 sites, 18 months, 1 operator" counter on `/work`

The rest of this proposal is leverage on top of that base move. But that base move is the answer to your original complaint: *"doesn't value the strength and size of my portfolio."*

---

## 15 · Files this redesign touches

**Highest-traffic files for implementation:**

| File | What changes |
|---|---|
| `app/page.tsx` | Section reorder; new split-stage hero; mount Live Matrix Generator; mount Operator's Ledger; embed IHE demo video; 146-app mosaic; Owners row; before/after slider |
| `app/work/page.tsx` | Rebuild to alternating bands; add filter pills; counter strip; all 9 projects |
| `app/work/[slug]/page.tsx` | Lead with Results; 10–12 screenshots; DeviceFrame component; cursor-demo MP4; cycling case-study nav |
| `lib/projects.ts` | Set `featured: true` for all 9 projects; add Pro 1 + Rally Pro; per-project card copy with outcome verbs |
| `lib/data/clients.ts` | (Already clean — surface in proof bar correctly) |
| `lib/data/results.ts` | Fill in real metrics where measurement window has closed; leave honest "pending" for early ones |
| `lib/nav.ts` | Buyer-shaped nav: Work · Healthcare · Local Services · Studio · Notes |
| `app/healthcare/page.tsx` | NEW — vertical landing |
| `app/local-services/page.tsx` | NEW — vertical landing |
| `app/studio/page.tsx` | NEW — consolidated About + Process + Capabilities + FAQ + code receipt |
| `app/index/page.tsx` | NEW — text ledger archive |
| `app/notes/page.tsx` + `app/notes/[slug]/page.tsx` | NEW — field log |
| `components/MagneticButton.tsx` | NEW — drop-in CTA wrapper |
| `components/MatrixDemo.tsx` | NEW — live matrix generator client island |
| `components/OperatorLedger.tsx` | NEW — signature data band |
| `components/case-study/DeviceFrame.tsx` | NEW — laptop/phone/browser variants |
| `components/case-study/CaseStudyNav.tsx` | Iterate all projects, not featured-only (~1 line) |
| `components/sections/FeaturedWorkPreview.tsx` | Rebuild to 1+4 strip pattern |
| `components/sections/IHEMosaic.tsx` | NEW — 146-app marquee |
| `components/sections/OwnersRow.tsx` | NEW — 5-portrait band |
| `components/sections/BeforeAfterSlider.tsx` | NEW — drag-reveal |
| `app/api/matrix-preview/route.ts` | NEW — Edge runtime endpoint |
| `app/api/studio-pulse/route.ts` | NEW — ledger JSON ISR |
| `lib/matrix/corpus.ts` | NEW — cities + services + phrase variants |
| `lib/matrix/generate.ts` | NEW — deterministic templater |
| `data/ledger.json` | NEW — operator's ledger data, cron-updated |
| `public/images/case-studies/covers/` | Dedupe Collective; batch convert to .webp/.avif |
| `public/videos/case-studies/[slug]-demo.mp4` | NEW — 6-sec cursor demo loops for Air Solutions + Revitalize |

**Remember:** project's `AGENTS.md` flags Next.js 16 has breaking changes from training-data Next.js. Read `node_modules/next/dist/docs/` before writing View Transitions, params (now Promise), generateStaticParams, or `<Image>` code.

---

## Approval checklist

Before I touch code, want your call on each of these:

- [ ] **The hero concept** — split stage with device frame cycling 3 real loops. Approve / redirect / shred?
- [ ] **Buyer-shaped nav** — Work · Healthcare · Local Services · Studio · Notes. Approve / keep current?
- [ ] **All 9 projects as case studies** — yes, even the small ones (Blessed, Collective, Rally Pro)?
- [ ] **The `/index` archive page** — text-only "330+ pages, 9 sites" ledger. Yes / no?
- [ ] **Operator's Ledger** as the signature visual element. Yes / no?
- [ ] **Live Matrix Generator** as the marquee tech demo. Yes / no?
- [ ] **Voice shift** — drop "passionate / craft / elevate" — keep "discharge-summary plain"?
- [ ] **Real-days process timeline** — "Day 0 kickoff · Day 7 staging · Day 14 launch · Day 30 first report"?
- [ ] **Founder portrait shoot** — half-day, two looks. Yes / defer?
- [ ] **Phased build over 3–4 weeks** vs full sprint vs different pace entirely?

Reply with any combination of yes/no/redirect per item and I'll start executing in priority order.
