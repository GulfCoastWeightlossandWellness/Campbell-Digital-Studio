# Template: Barbershop / Appointment-Based Local Business
**Based on:** Blessed Barbershop (blessedbarbershopdaphne.com)
**Stack:** HTML/CSS, WebP-Optimized Media, Mobile-First
**Typical page count:** 1–4 pages (often single-page with anchor sections)

---

## When to Use This Template

Use this template when:
- Single-location barbershop, salon, nail studio, or similar appointment business
- Primary use case: new clients discover on mobile → book appointment
- No complex service menu (under ~15 services)
- No multi-location or franchise structure
- Budget fits a focused, fast build — not a full Next.js app

This template builds for the real discovery path: someone searches "[barbershop near me]" on their phone, your listing appears, they tap the website link, they need to see the shop, the services, the price, and a way to book — in under 10 seconds. The build reflects that.

---

## Client Config Variables

Find-and-replace values across HTML file(s):

```
SHOP_NAME               → "Blessed Barbershop"
SHOP_TAGLINE            → Short positioning statement
BARBER_NAME             → "Owner/primary barber name"
PHONE_DISPLAY           → "(251) XXX-XXXX"
PHONE_TEL               → "tel:+12514155678"
ADDRESS_LINE_1          → "123 Main Street"
ADDRESS_CITY_STATE      → "Daphne, AL 35526"
BOOKING_LINK            → "https://squareup.com/..." or "https://booksy.com/..."
GOOGLE_MAPS_EMBED_URL   → Embed URL from Google Maps "Share" → "Embed a map"
GOOGLE_REVIEW_URL       → "https://g.page/r/.../review"
INSTAGRAM_URL           → "https://instagram.com/HANDLE"
FACEBOOK_URL            → "https://facebook.com/PAGE"
HOURS_MON_FRI           → "9am – 6pm"
HOURS_SAT               → "9am – 4pm"
HOURS_SUN               → "Closed"
```

---

## Content Requirements Checklist

### Shop Identity
- [ ] Shop name and any DBA
- [ ] Primary phone number
- [ ] Physical address
- [ ] Business hours (all days of the week)
- [ ] Logo (PNG or SVG — will be converted to WebP for performance if raster)

### Photography
- [ ] **Interior shots of the shop** — this is the most important content on a barbershop site
- [ ] **Work portfolio** — 6–12 photos of cuts, fades, or specialty work
- [ ] **Barber/owner photo** (optional but builds trust)
- [ ] All photos should be provided as JPG at minimum; will be converted to WebP

### Services and Pricing
- [ ] Complete service menu with prices
  - Haircut — $XX
  - Fade — $XX
  - Beard trim — $XX
  - Full service (cut + beard) — $XX
  - Kids' cut — $XX
  - Any specialty services

### Booking System
- [ ] Which booking system is used: Square Appointments, Booksy, StyleSeat, GlossGenius, etc.
- [ ] Booking link (direct URL to the business's booking page)
- [ ] Walk-ins accepted? (if yes, note this prominently — some clients will not book if walk-in is available)

### Social / Reviews
- [ ] Google Business Profile review link (for "Leave a Review" CTA)
- [ ] Instagram handle (if active — barbershop work is highly visual)
- [ ] Facebook page URL (if active)
- [ ] Any existing Google reviews to feature (pull 3–5 highlights for testimonials section)

---

## Page Structure (Single-Page with Anchor Sections)

```
#hero          — Shop name, tagline, hero image, Book Appointment CTA
#services      — Service menu with pricing
#gallery       — Photo gallery (6–12 images of work and shop interior)
#about         — Short about the shop/barber, experience, philosophy
#reviews       — 3–5 selected testimonials + Google review CTA
#hours-contact — Hours, address, map embed, phone, social links
```

### Sticky Header
- Logo / shop name
- "Book Now" button (links to booking system)
- Phone number (tap-to-call on mobile)

### Mobile Sticky Bottom Bar
- Book Appointment (primary CTA)
- Call (tel: link)

---

## Image Optimization

All images should be served as WebP for performance. Convert at build time or manually:

```bash
# Convert JPG/PNG to WebP (requires cwebp or ImageMagick)
cwebp -q 85 input.jpg -o output.webp

# Or using ImageMagick
convert input.jpg -quality 85 output.webp
```

Sizing guidelines:
- Hero image: 1200×800px max, <150KB WebP
- Gallery images: 800×800px, <80KB each WebP
- Shop interior: 1200×675px, <120KB WebP

Use `loading="lazy"` on all non-hero images. Use `fetchpriority="high"` and no lazy-load on hero.

---

## Trust Signals to Include

For a barbershop, trust comes from:
1. **Real photos of the shop interior** — cleanliness and quality of space matters
2. **Real portfolio work** — not stock photos of generic haircuts
3. **Google reviews** — pull 3–5 best reviews as testimonials (with stars)
4. **Years in business** or "Serving [City] since YEAR"
5. **Tap-to-call** — making it one tap to call matters on mobile
6. **Clear hours** — "Open today until 6pm" reduces friction

---

## Copy Notes

### Headline
Should immediately communicate: who you are, what you do, and where you are.
- "Daphne's Barbershop for Clean Cuts and Fades"
- "Premium Cuts in [City]. Walk-Ins Welcome."
- "Blessed Barbershop — Quality Fades in Daphne, Alabama"

### Service Menu
List services with prices. Remove the friction of "how much does it cost" — price-hiding drives customers to competitors.

### About
Keep it short (2–4 sentences). Focus on: experience, approach, and community connection. A barbershop is a local business with a personal relationship — the about section should feel like that.

---

## SEO Targets

- `[city] barbershop`
- `barbershop near me [city]`
- `haircut [city]`
- `fade [city]`
- `[barber_name] barber` (if the owner has local name recognition)

Metadata:
```html
<title>SHOP_NAME | Barbershop in CITY, STATE</title>
<meta name="description" content="SHOP_NAME offers quality haircuts, fades, and beard trims in CITY, STATE. 
Walk-ins welcome. Book online or call.">
```

---

## Hosting

Blessed Barbershop uses Cloudflare hosting. Other good options for a static HTML site:
- Cloudflare Pages (free tier, fast CDN)
- Vercel (free tier, easy deploy from folder or Git)
- Netlify (free tier)

All are appropriate for a static HTML/CSS site. Cloudflare Pages has the best CDN performance globally.

---

## Launch Checklist

- [ ] All find-and-replace config values updated
- [ ] All images converted to WebP
- [ ] Hero image loads fast (<150KB)
- [ ] Gallery images lazy-load correctly
- [ ] Booking link tested and resolves to correct scheduling page
- [ ] Tap-to-call link tested on a real phone
- [ ] Mobile sticky bottom bar displays correctly
- [ ] Hours are accurate (all 7 days)
- [ ] Google Maps embed loads correctly
- [ ] Review link opens Google review page
- [ ] Instagram/Facebook links open to correct profiles
- [ ] sitemap.xml present (even for single-page site)
- [ ] robots.txt allows indexing
- [ ] Domain configured and pointing to host
- [ ] SSL active
- [ ] Google Business Profile website URL updated to new domain
- [ ] Open Graph image set for social sharing preview
