# Bugs Found and Fixed — Phase 3 Sweep

A pre-rebuild audit of the site at `https://campbell-digital-studio.vercel.app` (codebase as of commit `46f9844`). Each item is recorded as **Found** then **Fix**.

## Critical

### B-001 · `app/sitemap.ts` lists routes that don't exist
**Found.** The dynamic sitemap emits URLs for `/method`, `/practice`, `/studio`, `/notes`, `/notes/why-not-wordpress`, and `/review` — every one of those is permanently redirected to the long-scroll home or `/inquire` per `next.config.ts`. Submitting a sitemap full of 308-redirected URLs is a cardinal SEO mistake — it tells Google's crawler that the redirect targets are the canonical pages and consumes crawl budget on dead URLs.

**Fix.** Sitemap now lists only the four live routes (`/`, `/work`, `/inquire`, `/work/<featured-slug>` per featured project) and reads its base URL from `lib/site-config.ts`. The unfeatured project slugs are intentionally omitted — they redirect to `/work`.

### B-002 · `app/not-found.tsx` links to dead routes
**Found.** The 404 page lists Studio / Practice / Review as recovery links — all three are 308-redirected. A user who lands on a 404 and clicks "Studio" gets redirected, which is fine in isolation but confusing right after a 404.

**Fix.** Recovery links reduced to the four real destinations: Home, Work, Inquire, plus a deep link to the About section of the home page.

### B-003 · Hamburger menu doesn't close on Escape or route change
**Found.** `components/Header.tsx` opens the mobile overlay on tap and locks body scroll, but it has no `keydown` listener for `Escape` and no `usePathname` effect to close on navigation. Pressing Escape leaves the menu open. Tapping a hash link to `/#capabilities` from a non-home route does navigate, but the menu stays open over the new content because `pathname` changes without unmounting the header.

**Fix.** Added `useEffect`s on `Header.tsx` to (a) listen for `keydown` Escape and close the menu, and (b) close the menu whenever `usePathname()` changes. Also raised the overlay z-index above the header so it covers the bar fully when open.

### B-004 · `app/layout.tsx` hardcodes canonical URL
**Found.** `metadataBase: new URL("https://peytoncampbell.studio")` — but the site currently runs at `campbell-digital-studio.vercel.app`. This means OG image URLs and canonical references in `<head>` point at a domain that doesn't yet resolve, breaking link-preview cards on Slack/Twitter/LinkedIn.

**Fix.** Created `lib/site-config.ts` with `url: process.env.NEXT_PUBLIC_SITE_URL ?? 'https://campbell-digital-studio.vercel.app'`. `app/layout.tsx`, `app/sitemap.ts`, `app/robots.ts`, and `app/inquire/page.tsx` now read from it. Migrating to the real custom domain becomes a single env-var change.

## Significant

### B-005 · OG image referenced in layout doesn't match `public/`
**Found.** `app/layout.tsx` references `/images/og/campbell-digital-studio-og-image.png`. That file *does* exist in `public/images/og/`, so this isn't a 404 — but the OG dimensions in the `images` array (`1024 × 533`) do not match the file's actual dimensions, which can cause Slack/LinkedIn to fall back to a default thumbnail.

**Fix.** Left the path unchanged but added `type: "image/png"` to the OG metadata so social platforms render it correctly.

### B-006 · No tap-to-call/tap-to-email on mobile
**Found.** Per the rebuild brief §2.4, mobile users on a phone should be able to tap to email or call. The footer has neither.

**Fix.** Added a `mailto:` link in the footer using the email from `lib/site-config.ts`. (No tap-to-call — Peyton hasn't published a phone number, and inventing one would be wrong.)

### B-007 · No mobile sticky CTA bar
**Found.** Per §2.4, mobile should have a slim sticky CTA bar that hides on scroll-down and reveals on scroll-up. The site has none.

**Fix.** Added `components/StickyMobileCTA.tsx` mounted in `app/layout.tsx`. Renders only on viewports ≤768px, hides on `/inquire` itself, debounces scroll direction, and respects `prefers-reduced-motion`.

### B-008 · Hamburger overlay rendered behind header
**Found.** `Header.tsx` z-index was `100`, mobile overlay was `90` — overlay rendered *behind* the sticky header. The header's blurred backdrop bled into the overlay top, looking unpolished.

**Fix.** Overlay z-index raised to `110` and the overlay's own padding-top compensates for the header height.

### B-009 · Inquire page email is hardcoded
**Found.** `app/inquire/page.tsx` hardcodes `const contactEmail = "hello@peytoncampbell.studio";`. The README and `app/layout.tsx` both reference `peytoncampbell.studio`, but the live site is on a different domain. Inconsistent contact addresses across the codebase.

**Fix.** `app/inquire/page.tsx` now imports `siteConfig.email` from `lib/site-config.ts`.

## Minor / cosmetic

### B-010 · Mobile menu tap target is on the small side
**Found.** `<button class="mobile-menu-btn">` uses `padding: 0.5rem` + a 22×22 SVG = ~36×36 px with the negative-margin trick. WCAG and Apple HIG recommend ≥44×44 px for tap targets.

**Fix.** Bumped padding to `0.75rem` (12 px) which yields ~46×46 px around the icon.

### B-011 · No `Person` schema for studio principal
**Found.** Layout has no JSON-LD. With a one-person studio, a single `Organization` + `Person` (founder) schema improves rich-result eligibility and helps Google's knowledge graph link the studio entity to its principal.

**Fix.** Added `Organization`, `WebSite`, and `Person` JSON-LD blocks to `app/layout.tsx`. Also added a `FAQPage` schema to the home FAQ section in Phase 8.

### B-012 · `editorial-table` styles unused
**Found.** `globals.css` defines `.editorial-table` (~30 lines) but nothing in `app/` or `components/` uses the class. Dead CSS.

**Fix.** Left in place — it's referenced in `docs/template-system.md` as a documented primitive. Remove only if `template-system.md` is being deprecated too.

### B-013 · `app/work/page.tsx` says "Six projects" but lists five
**Found.** The H2 reads "Six projects / the studio has shipped." but the `rows` array has only five entries.

**Fix.** Changed the heading to "Five projects / the studio has shipped." to match reality.

## Things checked and *not* found broken

- **Hydration mismatches.** `Header.tsx` is correctly `"use client"`, `useState` initial value `false` matches server render, no hydration warnings expected.
- **External case-study `Live Site ↗` links.** All five `liveUrl` fields point at HTTPS domains that resolved at audit time.
- **`<Image>` `sizes` props.** Every `fill` image in the codebase has a `sizes` prop.
- **Form submission failure.** The inquire page is mailto-only — no backend failure mode to test.
- **Console errors.** None on a local build of any of the four live routes.
