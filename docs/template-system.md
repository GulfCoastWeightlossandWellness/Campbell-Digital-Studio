# Campbell Digital Studio — Template System

A reference document for reusable site patterns, section structures, and SEO architectures across common build types.

---

## Overview

Builds at Campbell Digital Studio do not start from scratch every time. They start from a set of proven structural patterns — page layouts, section types, SEO architectures, and conversion flows — that have been tested across real projects and can be adapted to each new business.

This document describes the five core starter templates and the reusable sections within each.

---

## Template 01: Medical Wellness Clinic

**Intended for:** Primary care, DPC, medspas, hormone clinics, aesthetic wellness, multi-location practices

**Reference project:** Revitalize Aesthetics & Wellness

### Reusable Sections

| Section | Description |
|---|---|
| **Hero** | H1 + subheading + primary CTA (Book Appointment / Start Here) + secondary CTA (View Services). Trust strip below. |
| **Start Here pathway** | Guided new-patient onboarding: who we help, what to expect, how to book. Reduces friction for nervous first-time patients. |
| **Services grid** | Grid of service category cards — each linking to a dedicated service page. |
| **Service detail page** | Per-service page with condition overview, who it's for, what to expect, pricing/process, and booking CTA. |
| **Location pages** | City-specific pages for each active location. Includes address, hours, booking link, and local SEO metadata. |
| **Learning Library** | Filterable article and guide library. Supports content authority and patient education. |
| **Google review integration** | Review CTA section linked to Google review link. Builds trust over time. |
| **Mobile sticky CTA bar** | Fixed bottom bar on mobile: Book / Call / Start Here. |
| **About / Team** | Provider credentials, philosophy, and approachability signals. |
| **Conservative disclaimers** | Medical disclaimer footers on all service and treatment pages. |
| **Contact / Booking** | Location-specific booking links (JaneApp, SimplePractice, Calendly, etc.). |

### SEO Architecture
- Service pages: `/services/[service-name]`
- Location pages: `/locations/[city]`
- City + service crossover: `/[city]/[service]` (for high-volume markets)
- Schema: `MedicalBusiness`, `MedicalClinic`, `Physician`
- Sitemap: dynamic, includes all service and location pages
- Redirect strategy: document any URL changes from legacy site

---

## Template 02: Therapy / Counseling Practice

**Intended for:** Individual therapists, group practices, ADHD testing, trauma, couples counseling

**Reference project:** Collective Counseling

### Reusable Sections

| Section | Description |
|---|---|
| **Hero** | Warm headline + subtext emphasizing safety and expertise + "Schedule a Consultation" CTA |
| **About the practice** | Therapist bio(s), credentials, approach, and values. Approachability is the primary trust signal. |
| **Services** | Per-specialty pages: general counseling, ADHD testing, trauma, couples, etc. |
| **Who I work with** | Targeted copy for specific populations: adults, teens, families. |
| **Insurance & fees** | Clear insurance panels, self-pay rates, and payment options. Reduces pre-inquiry friction. |
| **FAQ** | Common questions about therapy, process, what to expect in the first session. |
| **Contact / Intake** | Secure contact form or scheduling link. Simple, low-friction. |
| **Location + map** | Physical address with local SEO signals. |

### SEO Architecture
- Service pages: `/therapy/[specialty]`
- Location: `/therapy-[city]`
- Schema: `HealthAndBeautyBusiness`, `MedicalOrganization`
- Sitemap: static, includes service and FAQ pages

---

## Template 03: HVAC / Local Service Business

**Intended for:** HVAC, plumbing, electrical, roofing, lawn care, and home services

**Reference project:** ACExperts251

### Reusable Sections

| Section | Description |
|---|---|
| **Hero** | Service-focused headline + call CTA + service request button. Trust strip: licensed, insured, local. |
| **Services grid** | Major service categories: installation, repair, maintenance, emergency. |
| **Service detail pages** | Per-service pages optimized for specific search queries (e.g. "AC repair Gulf Shores"). |
| **City coverage pages** | One page per service area city. Includes local trust signals and service request CTA. |
| **Financing page** | Financing options for larger jobs (HVAC install, etc.). Reduces quote-rejection friction. |
| **Maintenance plan** | Recurring service plan upsell. Builds retention and predictable revenue. |
| **Reviews / Trust signals** | Google review integration, BBB or licensing badges. |
| **Contact / Service request** | Simple form: name, city, service needed, best time to call. |
| **Mobile tap-to-call** | Prominent phone CTA above fold on mobile. |

### SEO Architecture
- Service pages: `/services/[service-name]`
- City pages: `/service-area/[city]`
- City + service crossover: `/[city]/[service]` (for competitive markets)
- Schema: `LocalBusiness`, `HomeAndConstructionBusiness`
- Google Business Profile: verified listing with website link aligned to homepage

---

## Template 04: Barbershop / Appointment-Based Local Business

**Intended for:** Barbershops, salons, nail studios, tattoo shops, pet grooming

**Reference project:** Blessed Barbershop

### Reusable Sections

| Section | Description |
|---|---|
| **Hero** | Identity-first headline + "Book Now" CTA. Visual identity is the primary trust signal. |
| **Services menu** | Clear service list with prices. Short descriptions if needed. |
| **Online booking** | Direct link or embed for booking (Booksy, Square, StyleSeat, etc.). |
| **Team / barbers** | Individual barber profiles if multi-barber shop. Links to individual booking. |
| **Gallery** | Portfolio of work. Social proof through visuals. |
| **Reviews** | Google review embed or screenshot gallery. |
| **Location / hours** | Google Maps embed, address, hours, parking. |
| **Contact** | Phone, social links, contact form fallback. |

### SEO Architecture
- Service pages: `/services/[service]` (optional, for keyword targeting)
- Location page: `/[city]-barbershop` or homepage with strong local signals
- Schema: `HairSalon`, `LocalBusiness`
- Google Business Profile: primary discoverability channel — site should align

---

## Template 05: Digital Health / Product Dashboard

**Intended for:** Healthcare SaaS, patient education platforms, clinical tools, health apps

**Reference project:** Interactive Health Education

### Reusable Sections

| Section | Description |
|---|---|
| **Marketing site hero** | Product headline + value proposition + CTA (Try it / Request Demo / View Dashboard). |
| **Problem / solution** | What the current patient education landscape fails to do. What this product does instead. |
| **Feature overview** | Core product capabilities: search, filter, module library, embeds, etc. |
| **Use cases** | Clinic use, hospital system use, white-label use, digital health vendor use. |
| **Pricing / licensing** | Tiers or enterprise inquiry CTA. |
| **Product dashboard** | The actual product — separate from the marketing site. Searchable, filterable module library. |
| **About / founder** | Physician authorship and clinical credibility signals. |
| **Contact / demo request** | Low-friction CTA for interested buyers. |

### SEO Architecture
- Marketing site: `/` — product overview, targeting clinic/B2B discovery queries
- Use case pages: `/for-clinics`, `/for-health-systems`, `/white-label`
- No PHI: noted prominently in schema and copy
- Schema: `SoftwareApplication`, `WebApplication`, `HealthAndBeautyBusiness`
- Sitemap: dynamic if content library is large

---

## Reusable Cross-Template Sections

These sections appear across multiple templates and should be treated as modular components.

| Component | Description |
|---|---|
| **SectionHeader** | Eyebrow / headline / optional subtext. Used on every major section. |
| **CTASection** | Primary + secondary CTA block. Reusable for every page bottom. |
| **ProjectCard** | Work portfolio card with label, category, summary, and CTA links. |
| **ScreenshotPlaceholder** | Placeholder visual for case study screenshots pending real images. |
| **Tag pills** | Small category tags on case study heroes. |
| **Trust strip** | Four-column grid of trust pillars below the hero on homepage. |
| **Google review CTA** | Link + copy driving patients to leave a Google review. |
| **Mobile sticky bar** | Fixed bottom bar on mobile with Book / Call / Start Here. |

---

## Global SEO Defaults

All builds should include:

- `title` tag with primary keyword + brand name
- `meta description` under 160 characters
- `og:title`, `og:description`, `og:image` for social sharing
- `canonical` URL on every page
- `robots.txt` allowing all crawlers
- `sitemap.xml` submitted to Google Search Console
- Schema markup appropriate to business type
- `alt` text on all images
- `aria-label` on all interactive elements without visible labels

---

## Launch Checklist (All Templates)

- [ ] All internal links resolve correctly
- [ ] All external links open in new tab with `rel="noopener noreferrer"`
- [ ] Booking links tested and working
- [ ] Phone number links working on mobile
- [ ] Contact form or mailto tested
- [ ] SSL active (HTTPS enforced)
- [ ] Google Search Console verified
- [ ] Sitemap submitted
- [ ] Google Business Profile website link updated
- [ ] Analytics tracking confirmed
- [ ] Mobile review on real device
- [ ] Core Web Vitals passing in Vercel deployment
- [ ] No broken images
- [ ] No console errors

---

*Last updated: April 2026*
