# Template: Medical Wellness / Medspa
**Based on:** Revitalize Aesthetics & Wellness
**Stack:** Next.js 15, TypeScript, Tailwind CSS, Vercel, App Router
**Typical page count:** 40–60 pages

---

## Client Config Variables

These values propagate across metadata, JSON-LD schema, booking links, and location pages.

```ts
// lib/config.ts (create per project)

export const CLINIC_NAME = "CLIENT_CLINIC_NAME";
export const CLINIC_TAGLINE = "CLIENT_TAGLINE";
export const CLINIC_DESCRIPTION = "SHORT_DESCRIPTION";

// Contact
export const PHONE_DISPLAY = "XXX-XXX-XXXX";
export const PHONE_TEL = "+1XXXXXXXXXX";
export const EMAIL = "info@CLIENTDOMAIN.com";

// Booking system
export const BOOKING_SYSTEM = "JANEA_APP | SQUARE | MINDBODY | LINK";
// Location-specific booking links
export const BOOKING_LINKS: Record<string, string> = {
  "location-slug-1": "https://BOOKING_LINK_1",
  "location-slug-2": "https://BOOKING_LINK_2",
};

// Locations
export const LOCATIONS = [
  {
    name: "CITY_1",
    slug: "city-1",
    address: "ADDRESS",
    city: "CITY_1",
    state: "STATE",
    zip: "XXXXX",
    phone: "XXX-XXX-XXXX",
  },
  // Add more locations as needed
];

// Google
export const GOOGLE_REVIEW_URL = "https://g.page/r/CLIENT_ID/review";
export const GA_MEASUREMENT_ID = "G-XXXXXXXXXX";

// Social
export const INSTAGRAM_URL = "https://instagram.com/CLIENT_HANDLE";
export const FACEBOOK_URL = "https://facebook.com/CLIENT_PAGE";
```

---

## Content Requirements Checklist

### Clinic Identity
- [ ] Legal clinic name and DBA
- [ ] All active location addresses, phone numbers, and hours
- [ ] Medical director / provider names, credentials, and bios
- [ ] Provider headshots (professional, not stock)
- [ ] Clinic photography — interior, treatment rooms, equipment
- [ ] Brand colors and logo (SVG/PNG, light and dark)
- [ ] Any certifications, affiliations, or accreditations (BioTE, Xeomin, etc.)

### Services
- [ ] Complete list of services offered (can be 10–25+)
- [ ] For each service: name, short description, benefits, what to expect, pricing or "call for pricing"
- [ ] Which services are available at which locations (for multi-location builds)
- [ ] Any proprietary or named treatment protocols

### Patient Journey
- [ ] Booking system name and account credentials (for booking link setup)
- [ ] New patient intake process (do they call, fill form, or self-book?)
- [ ] Insurance accepted? (most medspa services are cash-pay — state this clearly)
- [ ] Payment plans offered? (CareCredit, Cherry, in-house)
- [ ] Start Here / New Patient pathway content

### Content Hub (if applicable)
- [ ] Existing blog posts or articles to preserve/migrate
- [ ] Video content (YouTube channel, Vimeo, embedded clinical videos)
- [ ] Patient education resources, PDFs, guides
- [ ] Before/after photography (requires patient consent documentation)

---

## Route Structure

```
/                                          — Homepage
/start-here                               — New patient pathway
/about                                    — About the practice
/team                                     — Provider profiles
/services                                 — Services overview
/services/[slug]                          — Individual service page (dynamic)
/locations                                — All locations overview
/locations/[city-slug]                    — Location-specific page
/[service-slug]-[city-slug]               — City-specific service landing pages (SEO)
  e.g. /botox-columbus-ga
       /hormone-therapy-warner-robins-ga
       /medical-weight-loss-columbus-ga
/book                                     — Booking page / booking redirect
/payment-plans                            — Payment plans and financing
/hub                                      — Learning Hub overview
/hub/articles                             — Articles listing
/hub/videos                               — Videos listing
/hub/resources                            — Resources/guides listing
/hub/[slug]                               — Individual article (dynamic)
/hub/feed.xml                             — RSS feed
/hub/index.json                           — JSON content index
/blog                                     — Blog listing (optional separate from hub)
/blog/[slug]                              — Blog post (dynamic)
/tools                                    — Interactive tools overview
/contact                                  — Contact page
/media-review                             — Press/media management page
/privacy                                  — Privacy policy
/terms                                    — Terms of service
```

### City-Specific Service Landing Pages (SEO Priority)
Generate for the 3–5 most commercially valuable services × each city:
```
/[primary-service]-[city-1]
/[primary-service]-[city-2]
/[secondary-service]-[city-1]
```
Example: `/botox-columbus-ga`, `/hormone-therapy-warner-robins-ga`

---

## Service Page Template Structure

Each service page (`/services/[slug]`) should follow this content architecture:
1. **Hero** — service name, one-sentence description, booking CTA
2. **What It Is** — plain-language explanation
3. **Who It's For** — candidate criteria, what concerns it addresses
4. **What to Expect** — procedure overview, session length, recovery
5. **Results** — timeline, maintenance frequency
6. **Pricing** — specific price or "starting at" or "call for pricing"
7. **FAQs** — 4–6 questions a real patient would ask
8. **Related Services** — cross-links to complementary treatments
9. **Book CTA** — location-specific booking link

---

## Interactive Tools

### Hormone Health Self-Assessment
Collect from client:
- Which hormone symptoms to screen for
- Scale questions (1–5 fatigue, libido, mood, etc.)
- Output thresholds — what score = "consider a consultation"
- Booking link for hormone consultations

### Treatment Finder
Collect from client:
- Service categories (aesthetics, hormone, weight, wellness)
- Concern-to-service mapping (e.g., "tired all the time" → hormone therapy)
- Output should link to service page + booking CTA

---

## Booking System Setup

### JaneApp
1. Client provides Jane account access
2. Set up per-location booking links in config
3. Link from: homepage CTA, sticky mobile bar, all service pages, locations pages, book page
4. Mobile sticky bar: Book at [Location 1] | Book at [Location 2] | Call

### Other Systems (Mindbody, Square Appointments, etc.)
- Follow same pattern: per-location links, sticky bar, service page CTAs

---

## Design Tokens to Swap

```
Primary Background:   #XXXXXX  (dark or light — Revitalize uses deep charcoal/black)
Surface:              #XXXXXX
Accent Color:         #XXXXXX  (Revitalize uses rose gold / muted warm tone)
Text Primary:         #XXXXXX
Heading Font:         [Serif — Cormorant Garamond or client preference]
Body Font:            [Sans — DM Sans or client preference]
Mono/Label Font:      [DM Mono or similar for eyebrows]
```

---

## SEO Defaults to Update

`@type` for schema:
- `MedicalBusiness` for licensed medical practices
- `BeautySalon` or `HealthClub` for non-medical medspa
- `MedicalClinic` if physician-owned

City-specific pages metadata:
```ts
title: `SERVICE_NAME in CITY, STATE | CLINIC_NAME`;
description: `CLINIC_NAME offers SERVICE_NAME in CITY, STATE. [1 sentence differentiator]. Call or book online.`;
```

---

## Medical Compliance Notes

- **Every service page** should include a disclaimer: "Individual results may vary. [SERVICE] is a medical/cosmetic procedure. Please consult with our providers to determine if you are a candidate."
- **Before/after photos** require signed patient consent. Do not include without documentation.
- **Weight loss / hormone pages** should not make specific outcome claims (e.g., "lose 30 pounds"). Use language like "patients typically experience" and "results vary."
- **NAD+, peptides, and off-label treatments** — note that these are not FDA-approved for specific conditions and are offered as wellness services.

---

## Launch Checklist

- [ ] All location config values correct (address, phone, booking links)
- [ ] Provider bios and headshots loaded and approved
- [ ] All service pages reviewed for medical accuracy
- [ ] Medical disclaimers present on all service pages
- [ ] Booking links tested for all locations
- [ ] Hormone assessment tool tested end-to-end
- [ ] Treatment finder links resolve to correct service pages
- [ ] Learning Hub articles loaded and searchable
- [ ] RSS feed resolves at `/hub/feed.xml`
- [ ] City-specific service pages indexed in sitemap
- [ ] All photography is client-approved, rights confirmed
- [ ] Privacy policy covers telehealth and patient data handling
- [ ] HIPAA considerations reviewed (no PHI collected without compliance)
- [ ] Analytics firing, goals configured
- [ ] Mobile sticky bar booking links verified per location
- [ ] DNS, custom domain, SSL configured in Vercel
- [ ] Before/after photo consent forms on file
