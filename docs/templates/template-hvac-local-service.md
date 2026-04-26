# Template: HVAC / Local Service Business
**Based on:** ACExperts251 (acexperts251.com)
**Stack:** Next.js 15, TypeScript, Tailwind CSS, Vercel, App Router
**Typical page count:** 25–35 pages

---

## Client Config Variables

Replace every value in `src/lib/site.ts` and `src/lib/owner.ts` when starting a new build.

```ts
// src/lib/site.ts

export const SITE_NAME = "CLIENT_BUSINESS_NAME";
export const SITE_DESCRIPTION = "SERVICE_DESCRIPTION — serving CITY and surrounding COUNTY, STATE.";

const DEFAULT_CANONICAL_ORIGIN = "https://CLIENT_DOMAIN.com";

export const PHONE_DISPLAY = "XXX-XXX-XXXX";
export const PHONE_TEL = "+1XXXXXXXXXX";
export const TAGLINE = "CLIENT_TAGLINE";

export const GOOGLE_REVIEW_URL = "https://g.page/r/CLIENT_REVIEW_ID/review";
export const ELFSIGHT_GOOGLE_REVIEWS_APP_ID = "ELFSIGHT_APP_ID";

export const SERVICE_AREAS = [
  { name: "PRIMARY_CITY", slug: "primary-city" },
  { name: "CITY_2", slug: "city-2" },
  { name: "CITY_3", slug: "city-3" },
  // ... up to 8 cities
] as const;

export const SERVICES = [
  { name: "SERVICE_1", slug: "service-1", shortDescription: "Description of service 1." },
  { name: "SERVICE_2", slug: "service-2", shortDescription: "Description of service 2." },
  // ... 5–8 services typical
] as const;
```

```ts
// src/lib/owner.ts — if used

export const OWNER_NAME = "CLIENT_FULL_NAME";
export const OWNER_LICENSE = "STATE LIC # XXXXXXXX";
export const YEARS_EXPERIENCE = XX;
export const SERVICE_COUNTY = "COUNTY County";
```

---

## Content Requirements Checklist

Collect the following from the client before starting:

### Business Identity
- [ ] Legal business name and DBA (if any)
- [ ] Primary phone number
- [ ] Primary service address (for schema/GBP alignment)
- [ ] Service area — list of cities/communities served
- [ ] Business tagline or short positioning statement
- [ ] License number(s) and insurance confirmation
- [ ] Years in business

### Online Presence
- [ ] Domain name (owned or needs purchasing)
- [ ] Google Business Profile URL and review link
- [ ] Existing website URL (for redirect mapping if rebuild)
- [ ] Social media profiles (Facebook, Instagram, etc.)

### Services
- [ ] Full list of services offered
- [ ] Short description of each service (1–2 sentences)
- [ ] Emergency/priority service offering? (yes/no)
- [ ] Financing partner? (company name, application link)
- [ ] Maintenance/service plan offered? (plan name, pricing, benefits)

### Brand Assets
- [ ] Logo (SVG or high-res PNG, light and dark versions)
- [ ] Brand color hex codes (primary, secondary, accent)
- [ ] Any existing photos of the business, team, or work
- [ ] Testimonials or review content to feature

### Integrations
- [ ] Google Sheets or CRM for lead capture
- [ ] Scheduling tool (or use contact form only)
- [ ] Elfsight Google Reviews widget (set up, get App ID)
- [ ] Cloudflare Turnstile site key for form spam protection
- [ ] Analytics (Google Analytics 4 Measurement ID)

---

## Route Structure

```
/                          — Homepage
/about                     — About the business/owner
/services                  — Services overview
/services/[slug]           — Individual service page (dynamic, 5–8 pages)
/service-areas             — Service areas overview
/service-areas/[city]      — Individual city page (dynamic, per SERVICE_AREAS config)
/maintenance-plan          — Service plan / maintenance program
/comfort-plan              — Premium plan tier (if applicable)
/financing                 — Financing page
/emergency                 — Emergency service page
/reviews                   — Reviews and testimonials page
/blog                      — Blog listing (optional)
/blog/[slug]               — Blog post (optional, dynamic)
/tools/diagnostic-quiz     — Symptom/problem diagnostic quiz (optional)
/tools/roi-calculator      — ROI or cost-savings calculator (optional)
/tools/3d-schematic        — 3D system viewer (optional, Three.js)
/schedule                  — Scheduling/request form
/schedule/thank-you        — Post-schedule confirmation
/contact                   — Contact page
/privacy                   — Privacy policy
/terms                     — Terms of service
```

---

## Integrations Setup

### Google Sheets Lead Capture
1. Create a new Google Sheet: columns — Timestamp, Name, Phone, Email, Service, City, Message
2. Create a Google Cloud project, enable Sheets API, create service account
3. Share the sheet with the service account email
4. Add credentials to Vercel environment variables
5. `GOOGLE_SHEETS_CLIENT_EMAIL`, `GOOGLE_SHEETS_PRIVATE_KEY`, `GOOGLE_SHEETS_SPREADSHEET_ID`

### Cloudflare Turnstile
1. Login to Cloudflare → Turnstile → Add widget
2. Set domain to client's domain
3. Get Site Key (public) and Secret Key (server-side)
4. `NEXT_PUBLIC_CF_TURNSTILE_SITE_KEY`, `CF_TURNSTILE_SECRET_KEY`

### Elfsight Google Reviews
1. Create Elfsight account or use existing
2. Add Google Reviews widget, connect to client GBP
3. Get App ID from widget embed code
4. Set `ELFSIGHT_GOOGLE_REVIEWS_APP_ID` in `src/lib/site.ts`

---

## Design Tokens to Swap

In `src/app/globals.css` and Tailwind config:

```
Primary Background:   #XXXXXX  (dark neutral — ACExperts uses #0a1628 deep navy)
Surface:              #XXXXXX  (card/section background)
Accent Color:         #XXXXXX  (CTA, highlights — ACExperts uses amber)
Text Primary:         #XXXXXX
Text Secondary:       #XXXXXX
```

---

## SEO Defaults to Update

In each page's `metadata` export:
- `title` — include business name, primary service, primary city
- `description` — 150-160 chars, include service + city + differentiator
- `openGraph.images` — generate OG image with logo/brand treatment

In `src/lib/schemas.ts`:
- `LocalBusiness` schema — update all business fields
- `@type` — use `HomeAndConstructionBusiness` for HVAC/trades

---

## Launch Checklist

- [ ] All `site.ts` config values updated (no placeholder text)
- [ ] All service page copy reviewed and client-approved
- [ ] All city page copy reviewed (unique, not just find/replace)
- [ ] Logo and brand assets in `/public/images/brand/`
- [ ] Real business photos replacing any placeholder imagery
- [ ] Form submissions tested end-to-end (Turnstile → Sheets)
- [ ] Scheduling flow tested with thank-you redirect confirmed
- [ ] Google Reviews widget loading in production
- [ ] Dynamic sitemap verified at `/sitemap.xml`
- [ ] `robots.txt` allows indexing (no `Disallow: /`)
- [ ] Analytics tracking ID set and events firing
- [ ] DNS pointed to Vercel, custom domain configured
- [ ] SSL certificate provisioned (automatic on Vercel)
- [ ] GBP URL matches production domain
- [ ] All phone numbers tap-to-call verified on mobile
- [ ] Mobile layout reviewed on real device (not just DevTools)
- [ ] Emergency page CTA verified (phone number correct)
- [ ] Financing page link to partner application verified

---

## Notes

- **Service page copy should never be templated copy.** Write unique content for each service that references the client's specific service area, approach, and differentiators.
- **City pages must be unique.** Google penalizes near-duplicate city pages. Each city page should have at least one paragraph unique to that city's context (common HVAC challenges, local considerations, neighborhoods served).
- **Feature flags** — the `src/config/flags.ts` file can be used to disable sections (e.g., the blog, 3D tool) that are not ready at launch without removing the code.
