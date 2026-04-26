# Template: Therapy / Counseling Practice
**Based on:** Collective Counseling (collectivecounselingdaphne.com)
**Stack:** HTML/CSS, Multi-Page Architecture, Vercel Deployment
**Typical page count:** 4–8 pages

---

## When to Use This Template

Use this template — not the Next.js templates — when:
- The practice has 1–2 providers and a focused service menu
- SEO needs are for 3–6 targeted service/specialty terms
- The priority is trust-building, not complex conversion flows
- There is no scheduling system requiring deep integration
- Budget and timeline favor a lean, fast build over a feature-heavy platform

A static multi-page HTML build is often the right choice for solo or small group therapy practices. It loads faster, costs less to host, and is easier to maintain than a full Next.js application for a 5-page site.

---

## Client Config Variables

Since this template uses HTML, configuration is done by find-and-replace across all files. Use the checklist below:

```
PRACTICE_NAME          → "Collective Counseling Daphne" style full name
THERAPIST_FIRST_NAME   → "Calli"
THERAPIST_FULL_NAME    → "Calli Spenser-Campbell, LPC"
THERAPIST_CREDENTIALS  → "LPC, NCC" (license type and any certifications)
THERAPIST_TITLE        → "Licensed Professional Counselor"
CITY                   → "Daphne"
STATE                  → "Alabama"
COUNTY                 → "Baldwin County"
PHONE                  → "(251) XXX-XXXX"
EMAIL                  → "hello@DOMAIN.com"
PSYCHOLOGY_TODAY_URL   → "https://www.psychologytoday.com/us/therapists/..."
BOOKING_LINK           → "https://..." (SimplePractice, TherapyNotes, etc.)
INSURANCE_LIST         → "BCBS, Aetna, Cigna..." or "Self-pay only"
SESSION_RATE           → "$XXX per 50-minute session"
INTAKE_FORM_URL        → Link to intake form (if separate from booking)
GOOGLE_MAPS_EMBED      → Google Maps embed URL for office location
GOOGLE_REVIEW_URL      → "https://g.page/r/.../review"
```

---

## Content Requirements Checklist

### Therapist Identity
- [ ] Full legal name and credential suffix (LPC, LCSW, PhD, PsyD, etc.)
- [ ] License number and state (for About page trust signals)
- [ ] Professional headshot — warm and approachable, not formal headshot style
- [ ] Short bio (2–4 paragraphs): training background, therapeutic approach, what drew them to this work
- [ ] Specialties and populations served
- [ ] Any certifications or specialized training (EMDR, CBT, DBT, ADHD testing, etc.)

### Services
- [ ] List of services/specialties offered (therapy, ADHD testing, addiction counseling, etc.)
- [ ] For each service: plain-language explanation of what it is and who it helps
- [ ] Session length (50 min, 90 min, etc.)
- [ ] Format offered: in-person, telehealth, or both

### Fees and Insurance
- [ ] Session rate (or "contact for rates")
- [ ] Insurance accepted (or self-pay only)
- [ ] Superbill availability for out-of-network reimbursement
- [ ] Sliding scale availability (yes/no)
- [ ] Good Faith Estimate compliance note (required by law for self-pay)

### Booking
- [ ] Scheduling system used (SimplePractice, TherapyNotes, Psychology Today, etc.)
- [ ] Intake process: do new clients call, fill a contact form, or self-book?
- [ ] Waitlist? (mention on site if applicable)

### Office Location
- [ ] Physical address (even if telehealth-only, for GBP alignment)
- [ ] Parking or accessibility notes
- [ ] Office photo (optional but builds trust)

---

## Page Structure

### `index.html` — Homepage
1. **Nav** — Logo / practice name, nav links, CTA button (Book / Contact)
2. **Hero** — Name, title, tagline, primary CTA ("Schedule a Consultation")
3. **What I Help With** — 3–6 specialty areas as visual chips/cards
4. **About Section** — 2–3 sentences, therapist photo, link to full About page
5. **Services Summary** — Brief intro to each service, link to service page
6. **Fees / Insurance Strip** — Quick clarity on rates and insurance
7. **How to Get Started** — 3-step process (reach out → intake → first session)
8. **Contact / Booking CTA** — Final section driving to booking or contact form
9. **Footer** — Address, phone, Psychology Today link, license number

### `therapy.html` — Therapy / Counseling Page
1. What individual therapy is and how it works
2. Issues and concerns addressed (anxiety, depression, relationships, trauma, etc.)
3. Therapeutic approach / modalities used (CBT, ACT, EMDR, etc.)
4. What to expect in the first session
5. Session format and length
6. Booking CTA

### `adhd-testing.html` — ADHD Evaluation Page (if offered)
1. What adult ADHD testing is (clear, plain language)
2. Who is a candidate (adults questioning a diagnosis, struggling with focus/organization, etc.)
3. What the evaluation includes (clinical interview, rating scales, cognitive testing if applicable)
4. Cost (most ADHD evaluations are cash-pay — state clearly)
5. What they receive (written report, diagnostic letter, treatment recommendations)
6. Timeline (how long the process takes)
7. Booking CTA specific to ADHD evaluation

### `addiction-counseling.html` — Addiction Counseling Page (if offered)
1. What addiction counseling covers (substances, behavioral, process addictions)
2. Approach — note non-judgmental framing explicitly
3. Whether MAT-compatible (working alongside prescribers)
4. Insurance coverage note (addiction counseling is often covered more broadly)
5. Booking CTA

### `contact.html` (optional — or embed form on index)
- Contact form: Name, Email, Phone, What brings you here (brief), Preferred contact method
- Link to Psychology Today profile
- Note on response time

---

## Trust Signals to Include on Every Page

These reduce the anxiety of a first-contact decision for therapy clients:

- Therapist photo (real, warm — not stock)
- License number and state licensing board
- Psychology Today or TherapyDen profile link
- Confidentiality statement ("Everything shared is confidential within legal limits")
- Note on insurance billing or superbill availability
- Response time expectation ("I respond to new inquiries within 1 business day")

---

## Copy Calibration for Therapy Sites

### Do
- Use first person ("I work with…", "In our work together…")
- Write for someone who is nervous about making this call
- Acknowledge the courage it takes to seek help
- Use "clients" not "patients" (unless it's a clinical/testing context)
- Keep fees and insurance information transparent and easy to find

### Avoid
- Generic therapeutic jargon without explanation (e.g., "we will explore your inner child")
- Lists of every DSM diagnosis you can treat — it reads like a service menu, not a person
- Stock imagery of people crying, journaling, or staring into the distance
- Overpromising outcomes ("I will help you heal from trauma")
- Burying the contact/booking information

---

## SEO Targets

Primary targets for a solo therapy practice:
- `[city] therapist` / `therapist in [city]`
- `[city] counselor` / `counseling [city]`
- `adult ADHD testing [city]` / `ADHD evaluation [city]` (high-intent, often cash-pay)
- `anxiety therapist [city]` / `depression counselor [city]`
- `addiction counseling [city]` (if offered)

Metadata template:
```html
<title>THERAPIST_NAME, CREDENTIAL | SERVICE in CITY, STATE</title>
<meta name="description" content="THERAPIST_NAME offers SERVICES in CITY, STATE. 
[One sentence about approach or availability]. Call or schedule online.">
```

---

## Launch Checklist

- [ ] All find-and-replace config values updated (search for placeholder text)
- [ ] Therapist headshot loaded and cropped appropriately
- [ ] All service page copy reviewed and therapist-approved
- [ ] License number and credentials correct
- [ ] Insurance/fees section accurate
- [ ] Booking link tested and resolves to correct scheduling system
- [ ] Contact form tested (if used)
- [ ] sitemap.xml includes all pages
- [ ] robots.txt allows indexing
- [ ] manifest.webmanifest includes correct app name and icons
- [ ] favicon.png correct
- [ ] Google Business Profile URL matches production domain
- [ ] Psychology Today profile links to same practice
- [ ] Mobile layout reviewed — tap-to-call functional
- [ ] vercel.json deployed, domain configured
- [ ] SSL provisioned
- [ ] Privacy policy references telehealth if applicable
- [ ] Good Faith Estimate notice present (required by No Surprises Act for self-pay)
