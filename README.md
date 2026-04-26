# Peyton Campbell Web Studio

Portfolio and web studio site — Next.js 16, React 19, TypeScript, Tailwind CSS 4, Vercel.

## Quick Start

```bash
npm install
npm run dev      # localhost:3000
npm run build    # production build
```

## Editing Project Data

**All portfolio content lives in `lib/projects.ts`.** Changing that file updates:
- The `/work` portfolio grid and cards
- Every case study at `/work/[slug]`
- The homepage featured work section
- The sitemap at `/sitemap.xml`

### Add a project — append to the `projects` array:

```ts
{
  slug: "new-project",
  title: "Business Name",
  label: "Original Build",         // "Strategic Rebuild Concept" | "Original Product"
  category: "Category / Type",
  isFlagship: false,               // true = amber border + glow treatment
  shortSummary: "Card summary.",
  summary: "Case study context paragraph.",
  liveUrl: "https://example.com",  // null if not live
  tags: ["Tag1", "Tag2"],
  features: ["Feature one", "Feature two"],
  valuePoints: ["Value one", "Value two"],
  stack: "Next.js, React, Vercel",
  challenge: "What needed solving.",
  whatIBuilt: "What was built.",
  seoConversion: "SEO/conversion strategy.",
  businessValue: "Business outcome.",
  screenshotLabels: ["Homepage — hero", "Service page"],
}
```

### IHE-style dual-asset project (marketing site + dashboard):

```ts
liveUrl: "https://dashboard.example.com",
marketingUrl: "https://example.com",
dashboardUrl: "https://dashboard.example.com",
```

## Deployment

1. Push to GitHub
2. Import in [vercel.com/new](https://vercel.com/new) — Next.js auto-detected
3. Set custom domain to `peytoncampbell.studio`
4. Update `metadataBase` in `app/layout.tsx` to match live domain
5. Update `contactEmail` in `app/contact/page.tsx` and `app/website-review/page.tsx`

## Design System

**Fonts:** Cormorant Garamond (display) · DM Sans (body) · DM Mono (labels/tags)

**Palette:** Navy `#0b1120` · Amber `#d4a853` · Cream `#f8f5f0` · Slate `#94a3b8`

**Responsive grid classes** (defined in `globals.css`):
- `.grid-2` — two equal columns → stacked on mobile
- `.grid-2-center` — two equal columns, vertically centered → stacked on mobile
- `.grid-sidebar` — main + 320px sidebar → stacked on mobile
- `.grid-contact` — main + 420px → stacked on mobile
- `.grid-about-hero` — main + 380px → stacked on mobile

## Adding Real Screenshots

Replace `<ScreenshotPlaceholder />` in `/app/work/[slug]/page.tsx` with:

```tsx
import Image from "next/image";
<Image src="/screenshots/[project]/name.jpg" alt="..." width={1200} height={675}
  style={{ borderRadius: "10px", width: "100%", height: "auto" }} />
```

Put images in `/public/screenshots/[slug]/`.

## Future: Pricing Page

When ready, create `app/pricing/page.tsx` and add "Pricing" to the nav in
`components/Header.tsx`. Suggested packages (hold until 1–2 paid projects):
Website Review · Starter Local Site · Premium Local SEO Site ·
Medical Practice Platform · Ongoing Content/SEO Support.

## Internal Docs

See `docs/template-system.md` — template categories, reusable section inventory,
SEO architecture patterns. Not published on the live site.
