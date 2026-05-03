# Campbell Digital Studio — Boutique Studio Rebuild

**For:** Claude Code, working in the `campbell-digital-studio` Next.js repository
**Goal:** Convert the current SaaS-template-style marketing site into a senior-independent / boutique studio site that signals craft, point of view, and authority — without changing the underlying business positioning, services, or portfolio.

---

## Section 0 — Read This First

You are rebuilding the visual and structural presentation of an existing Next.js site. The **content is mostly correct.** The **presentation is wrong.** It currently reads like a SaaS startup landing page; it should read like a small studio with taste.

**Do not change the business model, services, or portfolio.** Keep every project, every market valuation tier, every service offering. Reformat, restructure, and re-typeset all of it.

**Do not invent a brand language.** A canonical design system already exists in this project — the file `AirSolutionsPros_GBP_Playbook.html` (an HTML deliverable for a client). Read it carefully. Its colors, typography, section headers, editorial hierarchy, monospace metadata labels, and overall sensibility ARE the studio's brand. The studio site has not yet been redesigned to match. Your job is to make the studio site look like it was designed by the same studio that produced that playbook.

**Tone:** confident, specific, editorial, quiet. Never pitchy. No marketing speak. No emojis anywhere on the live site (emojis are fine in code comments). No "✓" or "✕" lists. No "Trusted by" sections. No problem/solution framing.

---

## Section 1 — Diagnosis: What's Wrong With the Current Site

Before building, internalize what's being removed and why:

| Current pattern | Why it's wrong | Replacement |
|---|---|---|
| Stats bar (`7 Production Sites / 145+ / 50+ / 2`) | SaaS pricing-page move. Studios don't flex with counts. | Remove entirely. |
| Red ✕ "The Problem" section with 8 bullets | 2018 conversion-copy structure. Reads as defensive. | Remove entirely. |
| "What I Build" — 6 service category cards | A freelancer's services menu. | Replace with editorial work index. |
| Hero: centered headline + two CTAs + 4 trust badges | Generic Vercel template hero. | Editorial statement hero, asymmetric, single CTA. |
| Pricing tier comparison ON HOMEPAGE (Agency / Senior / Generalist) | Moves conversation to price before earning the right to. | Remove from home. Keep ON CASE STUDY PAGES only. |
| 6-step "My Approach" | Agencies justify big teams with process diagrams. Solo studios don't need this. | Replace with 3 short principles, prose. |
| "Why My Background Helps" section | Defensive framing. | Reframe as a single short editorial paragraph in the studio statement. |
| Emoji-prefixed bullets and section markers | Reads as casual / startup. | Replace with editorial section markers and monospace labels. |
| Five "primary" CTAs visible above the fold | No focus. | One CTA: "Inquire" or "Request Review." |

---

## Section 2 — The Design System (Canonical Reference)

**Read `AirSolutionsPros_GBP_Playbook.html` end-to-end before writing any code.** Extract the design system from it. The studio's visual identity is fully expressed in that file.

### 2.1 Colors (extracted from the playbook)

```css
:root {
  /* Navy — primary text, dark surfaces */
  --navy-950: #08172E;
  --navy-900: #0C1F3D;
  --navy-800: #142C5C;
  --navy-700: #1F3F7A;
  --navy-600: #2E5BA5;
  --navy-500: #4A7EC9;
  --navy-400: #7CA3DA;

  /* Gold — accent, never primary */
  --gold-700: #9A7820;
  --gold-600: #C49A35;
  --gold-500: #DDB64D;
  --gold-400: #E8C46B;
  --gold-200: #F5E2B0;
  --gold-100: #F8E9C2;
  --gold-50:  #FCF4E0;

  /* Paper — backgrounds */
  --paper-cream: #FAF6EC;
  --paper-sand:  #F0E9D6;
  --paper-stone: #D4CCB3;
  --paper-rule:  #E5DDC5;

  /* Ink — text */
  --ink:       #14182A;
  --ink-soft:  #3B3F50;
  --ink-mute:  #6E7184;
  --ink-faint: #9A9DAE;

  /* Status (use sparingly) */
  --success: #2F7A4D;
  --warn:    #D08C1A;
  --error:   #B83A2C;
  --info:    #1F3F7A;
}
```

**Default page surface:** `--paper-cream` background, `--ink` foreground.
**Dark surfaces (hero, footer, special sections):** `--navy-900` background, white foreground, `--gold-400` accents.
**Use gold for accents only** — top borders, single-word emphasis, a quote mark, a section index. Never a button background, never a body color.

### 2.2 Typography

Three fonts, loaded via `next/font/google`:

```ts
import { Fraunces, Manrope, JetBrains_Mono } from 'next/font/google'

const fraunces = Fraunces({
  subsets: ['latin'],
  display: 'swap',
  axes: ['opsz'],          // optical size axis is critical
  variable: '--font-fraunces',
})
const manrope = Manrope({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-manrope',
})
const mono = JetBrains_Mono({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-mono',
})
```

Apply all three on `<html>` via the variable strings, then wire them into Tailwind config:

```ts
// tailwind.config.ts
fontFamily: {
  sans: ['var(--font-manrope)', 'system-ui', 'sans-serif'],
  serif: ['var(--font-fraunces)', 'Georgia', 'serif'],
  mono: ['var(--font-mono)', 'ui-monospace', 'monospace'],
}
```

**Type scale and usage:**

| Element | Font | Size | Weight | Letter | Line | Notes |
|---|---|---|---|---|---|---|
| Editorial display (hero) | Fraunces | `clamp(48px, 7vw, 88px)` | 400 | -0.025em | 1.02 | `font-variation-settings:"opsz" 144` |
| H2 section title | Fraunces | `clamp(36px, 4.5vw, 56px)` | 400 | -0.022em | 1.05 | `opsz` 144 |
| H2 with italic emphasis | Fraunces italic | same | 300 | same | same | Use sparingly — one italic sub-clause per H2 max |
| H3 subsection | Fraunces | 22–26px | 500 | -0.015em | 1.2 | `opsz` 96 |
| H4 small heading | Manrope | 11px | 700 | 0.14em | 1.3 | UPPERCASE — used as eyebrow |
| Body | Manrope | 15–16px | 400 | normal | 1.65 | |
| Body (long-form essay) | Fraunces | 18px | 400 | normal | 1.7 | Reserved for studio statement and field notes |
| Section index / metadata | JetBrains Mono | 10–11px | 500–600 | 0.18–0.20em | 1.3 | UPPERCASE |
| Pull quote | Fraunces italic | 28–32px | 300 | -0.015em | 1.25 | |
| Captions / image alt-labels | JetBrains Mono | 10px | 500 | 0.15em | 1.4 | UPPERCASE |

**The italic Fraunces inside H2 headlines is the studio's signature move.** Use it on every section title:

```html
<h2>Selected work,<br><em>through the lens of a clinic.</em></h2>
```

### 2.3 Layout & Grid

- **Max page width:** 1280px. Hero/featured content can break out wider on large screens.
- **Reading-width content:** 720px max for any prose-heavy section. Studios respect line length.
- **Side padding:** `clamp(20px, 5vw, 80px)`.
- **Vertical rhythm:** sections separated by 96–128px on desktop, 64–80px on mobile.
- **Asymmetry is encouraged.** Not every section is centered. Use the 12-col grid in 5/7, 7/5, 3/9 splits.

### 2.4 Section markers (the "editorial wrapper")

Every major section opens with this pattern from the GBP playbook:

```html
<div class="section-tag">
  <span class="num">02</span>
  <span class="label">Selected Work</span>
</div>
```

Rendered: a `JetBrains Mono` 11px line with a tab-style index number, a small label, and a thin gold or paper-rule horizontal line that fills the rest of the row. This appears above every H2 on the page. It is the single most identifying visual element of the design system.

### 2.5 Components inherited from the playbook

When in doubt, mimic these components from the playbook file:
- `.cover` — dark navy hero with gold top stripe and editorial type
- `.section-tag` — index + label + rule
- `.tier-row` — large display number on the left, content body, value on right
- `.cadence` — three-up grid of mono-labeled stats with a line under each label
- `.script` — quoted callout block with mono label and italic body
- `.faq-block` — Q in serif, A in sans, paper background
- `.checklist-section` — two-pixel navy border, mono headers
- `.resp-table` — table with mono header on dark navy, alternating row backgrounds

These exist as raw HTML/CSS in the playbook. Translate them into React components in `src/components/editorial/` (filenames: `SectionTag.tsx`, `Cover.tsx`, `Cadence.tsx`, `Script.tsx`, `Pullquote.tsx`, `IndexRow.tsx`, `EditorialTable.tsx`).

### 2.6 Motion

Subtle, never decorative.
- Fade + 8px translate on viewport enter for sections (Framer Motion `whileInView` with `once: true`, `0.6s ease-out`).
- Link underlines: animated underline on hover (slide-from-left, 0.25s).
- Cursor: standard. No custom cursor.
- No page transitions that delay TTFB.
- No parallax. No scroll-jacking. No marquee unless explicitly added in §5.
- Respect `prefers-reduced-motion`.

---

## Section 3 — Information Architecture (New)

### Current
```
Home / Work / Services / About / Website Review / Contact
```

### New
```
/ (Home)
/work                 — editorial index of projects
/work/[slug]          — long-form case studies (existing routes preserved)
/studio               — renamed from /about, expanded
/practice             — renamed from /services, restructured
/notes                — NEW: field notes / journal (optional, see §5.7)
/inquire              — renamed from /contact, simplified
/review               — renamed from /website-review, kept simple
```

**Redirects required** in `next.config.js`:
```js
redirects: async () => [
  { source: '/about',           destination: '/studio',  permanent: true },
  { source: '/services',        destination: '/practice', permanent: true },
  { source: '/contact',         destination: '/inquire', permanent: true },
  { source: '/website-review',  destination: '/review',  permanent: true },
]
```

### Navigation
- Logo left.
- Right side: `Work · Studio · Practice · Notes · Inquire` (Notes optional).
- No "Case Studies ▾" dropdown. Drop the dropdown — the work index is one click.
- Sticky on scroll, but with reduced height + paper-cream blurred background.
- Mobile: hamburger opens a full-screen overlay with serif type, single column, large tap targets.

---

## Section 4 — Phased Build Order

Execute in this order. Do not skip phases.

### Phase 1 — Foundation (do this before any page work)
1. Read `AirSolutionsPros_GBP_Playbook.html` end-to-end. Internalize the system.
2. Update `tailwind.config.ts` with the color palette and font variables above.
3. Wire `next/font/google` for Fraunces, Manrope, JetBrains Mono in `src/app/layout.tsx`.
4. Create `src/styles/tokens.css` with the CSS variables block from §2.1.
5. Create `src/components/editorial/` directory and build the eight reusable editorial primitives (SectionTag, Cover, Cadence, Script, Pullquote, IndexRow, EditorialTable, Eyebrow).
6. Create `src/components/marks/StudioMark.tsx` — text-based wordmark fallback if no logo update is done. Use Fraunces, "Campbell Digital Studio" with a hairline gold rule between "Campbell Digital" and "Studio". Reserve a slot for a future custom mark.
7. Update `src/app/globals.css` to set body background to `--paper-cream` and body font to Manrope.

### Phase 2 — Navigation & Footer
1. Rebuild `<Navigation />` to match §3. Use `JetBrains Mono` for nav links at 11px UPPERCASE letterspaced 0.14em.
2. Rebuild `<Footer />` editorially: three columns — `Studio` (location, role, mark), `Index` (Work / Studio / Practice / Notes / Inquire), `Currently` (a single sentence with the most recent thing — see §5.6). Add a thin gold top stripe matching the playbook cover's gold border.
3. Drop the "Featured Work" link list from the footer — it's redundant if the work index is one click away.

### Phase 3 — Home page rebuild (`src/app/page.tsx`)
See §5 for full home spec.

### Phase 4 — Work index rebuild (`src/app/work/page.tsx`)
See §6 for full work spec.

### Phase 5 — Case study template (`src/app/work/[slug]/page.tsx`)
See §7. Apply changes to all five existing case studies.

### Phase 6 — Studio (`src/app/studio/page.tsx`)
See §8.

### Phase 7 — Practice (`src/app/practice/page.tsx`)
See §9.

### Phase 8 — Inquire and Review pages
See §10.

### Phase 9 — Notes (optional)
See §5.7 — only execute this phase if the user has confirmed they want a field-notes section.

### Phase 10 — Polish, motion, performance
- Add Framer Motion fade-in primitives to all sections.
- Audit for any leftover SaaS template patterns: stat bars, ✓/✕ lists, emoji, "trusted by," "the problem."
- Confirm all routes redirect properly per §3.
- Run Lighthouse: target 95+ on Performance, 100 on Accessibility, 100 on SEO, 100 on Best Practices.
- Verify `prefers-reduced-motion` disables all motion.

---

## Section 5 — Home Page Specification

The home page replaces the current SaaS-funnel structure with an editorial structure.

### 5.1 Hero

**Surface:** `--navy-900` background, gold top stripe (4px gradient `gold-600 → gold-400 → gold-600`), white text.
**Layout:** asymmetric. Eyebrow + headline anchored bottom-left of a 720px-tall hero. Studio mark / metadata in the top-left. Bottom-right of the hero contains a small `Currently` strip (see §5.6).

**Eyebrow** (mono, gold-400):
```
§ 01 / Campbell Digital Studio · Baldwin County, Alabama
```

**Headline** (Fraunces 88px, line 1.02, opsz 144):
```
The web for businesses
that earn trust by hand.
```

(If the user has provided their own manifesto sentence in answer to question 2, use that instead — verbatim. Do NOT auto-generate one beyond this default.)

**Subhead** (Manrope 18px, white at 78% opacity, max 620px wide):
A single sentence. Default:
> A small studio building modern websites and local-search infrastructure for clinics, wellness practices, and the kind of local businesses that still answer their own phone.

**CTA** (single, not two): a thin underline-on-hover link that says `Request a Website Review →`. Use a plain `<Link>`, no button shape. Confidence reads as restraint.

**Do not include:** stats, trust badges, the "physician-in-training" line, or the four feature pillars currently sitting under the hero. All of that moves to other sections or is removed.

### 5.2 Selected Work — index style (replaces the current "Featured Work" cards)

Section tag: `§ 02 / Selected Work`

H2:
```
Recent projects,
through the lens of a clinic.
```

(Italic on the second line.)

**Layout:** an editorial table, like a film credits or a museum index.

```
2026 — Revitalize Aesthetics & Wellness   Medical Wellness · 50+ routes        →
2025 — Interactive Health Education       Digital Health Platform · 145 apps   →
2025 — ACExperts251                       HVAC · 30+ routes · 3D tool          →
2024 — Collective Counseling              Therapy · ADHD Testing · 4 routes    →
2024 — Blessed Barbershop                 Barbershop · 1 route · Mobile-first  →
```

Each row is a clickable link to the case study. Style:
- Year: `JetBrains Mono` 14px, `--ink-mute`
- Title: `Fraunces` 22px, `--ink`, weight 500
- Sector / scope: `Manrope` 13px, `--ink-soft`, right-aligned
- Arrow: small, gold on hover only
- Hover: row background lifts to `--paper-sand`, title gets a subtle underline, the arrow translates 4px right

Below the table: a single text link, `View all projects →`, mono-labeled.

**Do not** show the agency / senior-dev / generalist tier table on the home page. That belongs only on individual case study pages.

### 5.3 Studio statement

Section tag: `§ 03 / The Studio`

H2:
```
A studio of one,
practiced like a clinic.
```

A single column of long-form prose, max 720px wide, `Fraunces` 18px, line height 1.7.

Default copy (use unless user provided a manifesto in answer to question 2):

> Most local-business websites are built by people who have never sat in a waiting room with the patient who's about to read them. I have. I've also written discharge instructions, watched families decide between providers, and seen what gets a nervous person to follow through.
>
> Campbell Digital Studio is the small practice I run alongside residency. It's deliberately small. The work is full-stack — strategy, architecture, copy, build, launch — and the only person between the brief and the finished site is me.
>
> The result is the work in the index above: clinics, practices, and local businesses with sites that read like they were built by someone who knows the difference between a brochure and a first impression.

End the section with a single mono-labeled link: `Read more about the studio →` linking to `/studio`.

### 5.4 Approach (replaces 6-step process)

Section tag: `§ 04 / How the Work Gets Made`

H2:
```
Three principles
the studio runs on.
```

Three asymmetric blocks, each with a large display numeral (Fraunces 64px gold-600, line 1, weight 600), a short H3, and 2–3 sentences of body. Use the playbook's `tier-row` styling.

**01 — Architecture before aesthetics.**
Every project starts with a sitemap, a service hierarchy, and the local-search structure. The visual design is the last layer, not the first. Most "redesigns" fail because they were aesthetic exercises on a broken foundation.

**02 — Copy is the deliverable.**
A clinic's homepage is a piece of writing. The job is to make a hesitant person feel safe enough to call. That's a writing problem disguised as a design problem, and most agencies solve only half of it.

**03 — Built to be inherited.**
Every site is built so the owner can update it, hand it off, or grow into it. No platform lock-in. No subscription dependencies. No design system that requires me to come back every time a service is added.

### 5.5 What the Studio Makes (replaces "What I Build" service cards)

Section tag: `§ 05 / What the Studio Makes`

H2:
```
A focused practice.
Six things, done well.
```

Two-column layout. Six items — each is a single H3 in Fraunces and one descriptive sentence in Manrope. **No bullet point lists.** No emoji. No card chrome.

01. **Medical practice websites** — Primary care, DPC, urgent care, and specialty clinics that need patient-facing sites built around the actual patient journey.
02. **Therapy and counseling websites** — Practice sites that balance professionalism and approachability for clients navigating sensitive decisions.
03. **Medspa and wellness clinics** — Conversion-focused sites for aesthetic, hormone, and wellness practices with complex service menus.
04. **Local service businesses** — HVAC, trades, and home services where stronger local SEO and clearer service pages move the needle.
05. **Patient-education tools** — Assessments, calculators, treatment finders, and education modules built for clinical settings.
06. **Rebuilds and SEO migrations** — Turning outdated or template-based sites into modern, structured platforms without losing existing rankings.

Below the grid: `Full practice details →` linking to `/practice`.

### 5.6 Currently strip (boutique studio signature)

Section tag: `§ 06 / Currently`

A small, single-row block — three or four short status lines in `JetBrains Mono` 12px UPPERCASE, separated by a thin gold rule. Examples:

```
NOW — Building Air Solutions Heating & Cooling, a 600-page Baldwin County HVAC platform.
NEXT — Inquiries open for spring 2026. Two project slots.
RECENTLY — Delivered the Air Solutions GBP Playbook, a 14-page operating manual.
LOCATION — Daphne, Alabama. Family Medicine, PGY-1.
```

This is the easiest single section to keep alive after launch. Update once a month. It is the single highest-credibility signal a one-person studio has.

### 5.7 Field Notes preview (optional — only build if user confirmed)

Section tag: `§ 07 / Field Notes`

H2:
```
Things I've written
about the work.
```

Three latest-note cards in a row, each with: date in mono, serif title, one-line excerpt, and a hairline gold rule between cards. Link to `/notes`.

If the user has not confirmed Field Notes, **omit this section entirely** — do not show an empty placeholder.

### 5.8 Closing

Single section, navy background, gold top stripe.

H2 (white):
```
A site that does
the work for you.
```

One paragraph (white at 78%): the practical close — that the best starting point is to send a link to the current site, that the review is free, and that no two engagements have looked the same.

Single CTA: `Request Website Review →`.

Footer follows.

---

## Section 6 — Work Page Specification (`/work`)

The work page is currently a card grid with a chip-filter row on top. Replace it with an editorial index.

### 6.1 Header

Section tag: `§ Index / Selected Work`

H2:
```
Five projects
the studio has shipped.
```

Subhead, max 720px:
> A transparent record of the sites and platforms I've built — with honest labels, real scope, and real market valuations on each.

### 6.2 Project index table

Render every project as a full-bleed editorial row, not a card. Each row has:

```
[Year]   [Project name in Fraunces]                    [Sector tags]
         [One-sentence scope summary]                   [Build label]
         [→ View case study]                            [Live ↗]
```

Layout: 3 columns on desktop (1fr 2fr 1fr), single column on mobile. Thin paper-rule between rows. Hover state: row background lifts to `--paper-sand`.

Build labels (replace the current "◆ Agency-Grade Build" style):
- `◆ Original Build` — commissioned client work, paid
- `◇ Strategic Rebuild` — proactive concept, not a paid engagement
- `※ Original Product` — founder-built platform

Use `JetBrains Mono` 10px UPPERCASE for these tags.

### 6.3 Drop the chip-filter row

The current "All Projects 5 / Full-Stack 3 / Medical 3 …" filter row is unnecessary at this scale. Five projects don't need filtering. Remove it.

### 6.4 Drop the stats cluster

The current "5 / 3 / 2 / 145+ / 50+" stats row at the top of `/work` — remove. The numbers are already in the project rows.

---

## Section 7 — Case Study Template (`/work/[slug]`)

This is where the **market valuation tier table** lives — moved off the home page and out of the work index, where it belongs.

### 7.1 Structure

Each case study is a long-form editorial document with this order:

1. **Hero** — navy or paper background, project name in Fraunces 64px, sector eyebrow in mono, single hero image full-bleed
2. **Brief** — three meta rows in mono labels: `Sector / Year / Scope`. Then a 2–3 paragraph project brief in serif body (Fraunces 18px).
3. **Selected screens** — 2–4 large screenshots of the live site, each with a mono caption underneath (`fig. 01 — Hero on /services`).
4. **What was built** — a short bulleted list of concrete deliverables (this is one of the few places bullets are appropriate). Mono caption above: `DELIVERABLES`.
5. **Pull quote** (if a client has given one) — Fraunces italic 32px, indented, with a gold opening quote mark.
6. **Market valuation** — the tier comparison currently on each card. Render as the playbook's `tier-row` component, three rows: Agency / Senior Dev / Generalist. Keep the existing copy. Add a 4th row at the bottom titled `Why It's Worth It` with the existing rationale text.
7. **Stack & artifacts** — small mono-labeled list: `STACK`, `HOSTING`, `LAUNCHED`, `STATUS`.
8. **Next / previous project** — two large clickable rows at the bottom in the same style as the work index.

### 7.2 Apply to all five existing case studies

- `/work/revitalize`
- `/work/interactive-health-education`
- `/work/acexperts`
- `/work/collective-counseling`
- `/work/blessed-barbershop`

Use the existing copy from the current site as the source. Reformat to match the structure above. **Do not invent new facts about the projects.** Where the current site already has copy (project description, "why it's worth it," tier rationales), keep that copy verbatim and reformat it.

---

## Section 8 — Studio Page (`/studio`)

This replaces `/about`. It is a long-form editorial page.

### 8.1 Sections

1. **Hero** — name + role in Fraunces, single portrait photo if provided. If no photo, lean fully on typography: name set in Fraunces 88px, role in mono below.

2. **§ 01 / Origin** — two paragraphs on why the studio exists. Use the existing about-page copy verbatim where possible:
   > I started building websites because I kept seeing businesses with real value being represented by websites that did not match the quality of the service they provided…

3. **§ 02 / How I Think About This** — the existing "Why my background helps" section, reformatted as a single-column editorial paragraph (no card grid).

4. **§ 03 / What Makes This Different** — four short subsections, each with a Fraunces H3 and a single paragraph. Use the existing copy: Physician Perspective / Business Understanding / Modern Development Workflow / Practical Execution. Render as plain prose in a single column, not as four cards.

5. **§ 04 / Beyond Websites** — short paragraph on Interactive Health Education, with a small image and a `Read the case study →` link.

6. **§ 05 / Quick Facts** — render as the playbook's `cadence` three-up grid:
   - **ROLE** — PGY-1 Family Medicine Resident
   - **LOCATION** — Baldwin County, Alabama
   - **STACK** — Next.js, TypeScript, Tailwind, Vercel

7. **Closing CTA** — single line: `Inquire about a project →`.

### 8.2 Drop

- The "Quick Facts" right-rail panel — replace with the cadence block above.
- Any duplicate header logos or marks inside the body.
- The "Built from proven patterns" section — that belongs on `/practice`, not here.

---

## Section 9 — Practice Page (`/practice`)

This replaces `/services`. The current page is structured as 8 numbered service categories with bulleted feature lists. Reformat.

### 9.1 Restructure

Open with section tag `§ Practice / What the Studio Does`.

H2:
```
The work, organized
by what the business needs.
```

Then **three** top-level practice areas (not eight). Each is a long-form section with a Fraunces H3, one paragraph of prose explaining the work, and a mono-labeled "Recent example" callout linking to a relevant case study.

**01 — Medical & wellness websites**
Combines: Custom Medical Websites + Medspa & Wellness + Therapy. Recent example: Revitalize Aesthetics → `/work/revitalize`.

**02 — Local-service websites**
Combines: Local Business Websites + Local SEO Architecture + Conversion Strategy. Recent example: ACExperts251 → `/work/acexperts`.

**03 — Platforms & interactive tools**
Combines: Patient Education Tools + Content Hubs + Custom Calculators. Recent example: Interactive Health Education → `/work/interactive-health-education`.

### 9.2 Sub-sections (kept)

After the three primary practice areas, include two short editorial sections:

- **Rebuilds & SEO migrations** — short paragraph, no bullets.
- **Add-on support** — Brand & Identity, Graphics & Print, Copy & Content. Render as the playbook's `resp-table` (responsibility table) with three columns: `What`, `Examples`, `When it's worth it`.

### 9.3 Drop

- The 8-card numbered list with bulleted features — that's a freelancer template.
- The note about "I do not currently offer in-house photography" — keep but compress to one sentence inside the add-on section.
- The "Built from proven patterns" feature grid — already on `/studio`. Don't duplicate.

### 9.4 Pricing

Add a single short editorial paragraph at the bottom:

> Every project is scoped against the actual business — not a package tier. The fastest way to a number is to send the current site for a free review.

Single CTA: `Request a Website Review →`.

---

## Section 10 — Inquire (`/inquire`) and Review (`/review`)

### 10.1 Inquire

Short page. Just:

H1 (Fraunces): `Inquire about a project.`

One paragraph: what to include in an email — the business name, current site, what the goals are, and whether there's a launch deadline.

A single mailto link or form — keep whatever currently exists at `/contact`, just reformat the type.

### 10.2 Review

H1: `Request a website review.`

One paragraph: what the review is — a free, no-obligation read of the current site, with notes on architecture, SEO, copy, and conversion.

The existing form, restyled. Inputs use Manrope, labels use mono UPPERCASE 11px, the submit button is the only filled element on the page (navy bg, white text, no rounding past 4px).

---

## Section 11 — Removals Checklist

Before declaring the rebuild done, search the codebase and confirm these are gone:

- [ ] All emoji (🏢 👨‍💻 💼 ✓ ✕ ▾ ◆ ◇ → in body copy — keep the geometric marks ◆◇※ → only as deliberate typographic elements per §6.2; replace all others)
- [ ] All `Stat / StatCard` components on the home and work pages
- [ ] The "The Problem" section
- [ ] The "What I Build" 6-card grid
- [ ] Any "Trusted by" / logo wall components
- [ ] The pricing tier comparison from the home page
- [ ] The 6-step "My Approach" timeline
- [ ] The "Featured Work" footer link list
- [ ] Any "Get Started" / "View Work" duplicate-CTA blocks
- [ ] Any centered-headline-with-two-buttons hero pattern

---

## Section 12 — Additions Checklist

- [ ] Section tags (`§ 01 / Label`) on every major section across every page
- [ ] Italic-Fraunces sub-clauses in every H2
- [ ] A `Currently` strip on the home page footer area
- [ ] A monospace `Quick Facts` cadence block on `/studio`
- [ ] Editorial work-index table replacing the work card grid
- [ ] A pull-quote component used in case studies where client quotes exist
- [ ] A `next/previous project` row at the bottom of every case study
- [ ] Gold top stripe on every dark navy section
- [ ] Editorial footer with `Studio / Index / Currently` columns
- [ ] Animated underline hover state on every text link
- [ ] `prefers-reduced-motion` honored across all Framer Motion usage

---

## Section 13 — Things the User May Provide Later

The build should work without these, but reserve clear slots for them:

1. **A portrait photograph** — slot at top of `/studio`. If absent, render as typography-only.
2. **A studio manifesto sentence** — replaces the default hero headline if provided.
3. **One or two client quotes** — slot inside case studies as pull quotes.
4. **A workspace photograph** — slot inside `/studio` between sections 03 and 04.
5. **A custom logomark** — slot in nav and footer; use the typographic wordmark fallback until provided.
6. **First 1–3 field notes essays** — only build `/notes` once these exist.

Where these slots exist in the JSX, leave a clearly-commented `{/* TODO: portrait photo — typography-only fallback rendering */}` so they're easy to find later.

---

## Section 14 — Reference Sites (visual targets)

If decisions are unclear during the build, defer to the aesthetic shared across these sites:

- pentagram.com/work
- athletics.nyc
- madebyfield.com
- vanschneider.com/desk
- brandondorn.com
- mast.studio
- studiofeixen.ch
- rauno.me

Common traits to mirror: editorial typography, project-led navigation, asymmetric layouts, mono captions, generous spacing, restrained color, no marketing chrome.

---

## Section 15 — Don'ts (the unforgivables)

- Don't use Tailwind's default font stack. Wire Fraunces / Manrope / JetBrains Mono per §2.2.
- Don't use any emoji on the live site.
- Don't keep the stats bar.
- Don't keep "The Problem" section.
- Don't show the pricing tier comparison on the home page.
- Don't add scroll-jacking, cursor effects, or marquee animations.
- Don't introduce a new accent color outside the navy/gold/cream system.
- Don't auto-generate client quotes or testimonials.
- Don't invent new services beyond what's in §5.5.
- Don't use Lorem Ipsum anywhere — use the existing site's copy or leave a clearly-commented TODO.
- Don't centerline all headlines. Asymmetry is the point.

---

## Section 16 — Definition of Done

The rebuild is done when:

1. All ten phases in §4 are complete.
2. Every removal in §11 is confirmed.
3. Every addition in §12 is confirmed.
4. All five case studies render in the new template.
5. The home page has no SaaS-template patterns left (stats, problem, ✓/✕, tier-pricing, 6-step process, dual-button hero).
6. Lighthouse scores: Performance 95+, Accessibility 100, Best Practices 100, SEO 100.
7. The site renders correctly on mobile at 375px width.
8. `prefers-reduced-motion` disables all motion.
9. A reasonable observer reading both `AirSolutionsPros_GBP_Playbook.html` and the new studio site would say: "Yes, these were made by the same studio."

That last criterion is the real test. If the playbook and the studio site no longer feel like they came from different people, the work is done.
