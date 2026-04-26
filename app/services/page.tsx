import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import SectionHeader from "@/components/SectionHeader";
import CTASection from "@/components/CTASection";

export const metadata: Metadata = {
  title: "Services",
  description:
    "Custom medical and local-business website services — builds, rebuilds, local SEO architecture, patient conversion strategy, interactive tools, and digital asset support.",
};

const services = [
  {
    number: "01",
    title: "Custom Medical Websites",
    description:
      "Built for clinics, medspas, DPC practices, therapy offices, wellness clinics, and healthcare startups that need a modern patient-facing site — not a template.",
    items: [
      "Service architecture designed around patient decision-making",
      "Local SEO structure for medical practices",
      "Booking and intake flow integration",
      "Conservative medical copy and disclaimer standards",
      "Trust signals: credentials, certifications, Google reviews",
      "Mobile-first, accessible design",
    ],
  },
  {
    number: "02",
    title: "Local Business Websites",
    description:
      "For HVAC companies, trades, home services, and local businesses that need stronger local SEO, clearer service pages, and a site that actually drives calls.",
    items: [
      "Service-area and city page structure",
      "Google Business Profile alignment",
      "Financing and service plan pages",
      "Review integration and trust signals",
      "Clear call and contact hierarchy",
      "Premium visual identity for competitive markets",
    ],
  },
  {
    number: "03",
    title: "Website Rebuilds",
    description:
      "Taking an outdated, template-based, or poorly structured site and rebuilding it into a modern platform — with a migration strategy that protects existing search rankings.",
    items: [
      "Full audit of existing site and SEO footprint",
      "Redirect strategy for structural changes",
      "Preservation of existing content and link equity",
      "Canonical URL and sitemap architecture",
      "Legacy blog and article migration",
      "DNS, hosting, and launch support",
    ],
  },
  {
    number: "04",
    title: "Local SEO Architecture",
    description:
      "Building the structural SEO layer that helps a practice or business appear in local search — service pages, city pages, metadata, schema, and internal link structure.",
    items: [
      "Service-specific landing pages",
      "City and location pages for multi-area businesses",
      "Title tags, meta descriptions, and Open Graph",
      "Schema markup: LocalBusiness, MedicalBusiness, Service",
      "Internal linking and content hierarchy",
      "Google Maps and review integration",
    ],
  },
  {
    number: "05",
    title: "Patient and Customer Conversion Strategy",
    description:
      "Designing the conversion layer that turns website visitors into booked patients or paying customers — start here flows, service navigation, CTAs, and trust architecture.",
    items: [
      "New patient or new customer pathway design",
      "Booking link and scheduling flow integration",
      "CTA hierarchy across pages",
      "Trust signals: reviews, credentials, before/after",
      "Insurance and pricing transparency",
      "FAQ and objection handling pages",
    ],
  },
  {
    number: "06",
    title: "Interactive Tools",
    description:
      "Custom assessments, calculators, treatment finders, intake-style tools, and educational widgets that give patients or customers a more useful experience.",
    items: [
      "Symptom and condition assessments",
      "Treatment finders and comparison tools",
      "BMI, dosing, or eligibility calculators",
      "Intake-style pre-qualification flows",
      "Embeddable widgets for clinic use",
      "No PHI collection — fully safe educational model",
    ],
  },
  {
    number: "07",
    title: "Content Hubs and Learning Libraries",
    description:
      "Organizing existing articles, videos, guides, and FAQs into a structured, searchable content system that builds authority and supports SEO.",
    items: [
      "Filterable article and resource library",
      "Category and topic architecture",
      "Blog migration and preservation",
      "Patient guide formatting",
      "Video and multimedia integration",
      "Internal linking to service pages",
    ],
  },
  {
    number: "08",
    title: "Launch QA and Migration",
    description:
      "A comprehensive pre-launch checklist covering redirects, sitemap, robots, canonical URLs, mobile QA, booking links, analytics, and DNS support.",
    items: [
      "Redirect mapping for URL changes",
      "Dynamic sitemap and robots.txt",
      "Canonical URL audit",
      "Mobile responsiveness QA",
      "Booking link and contact flow testing",
      "Analytics and tracking setup",
      "DNS and domain transfer support",
    ],
  },
];

const digitalAssetGroups = [
  {
    category: "Brand & Identity",
    items: [
      "Logo concepts using AI-assisted workflows",
      "Simple brand kits (colors, fonts, mark)",
      "Business card design",
      "QR code cards for reviews, booking, menus, or contact",
    ],
  },
  {
    category: "Graphics & Print",
    items: [
      "Canva graphics and social post templates",
      "Flyers and simple print collateral",
      "Event and promotion graphics",
      "Google Business Profile images and cover art",
    ],
  },
  {
    category: "Copy & Content",
    items: [
      "Website service page copy",
      "Blog posts and patient education articles",
      "Local SEO articles",
      "FAQ content",
      "Google Business Profile post drafts",
      "Content refreshes for existing pages",
    ],
  },
];

const provenPatterns = [
  "Service page structure designed for conversion, not just information",
  "Local SEO architecture that scales from one city to many",
  "Booking and contact flows proven across medical and local service builds",
  "Google review and trust signal integration built into every project",
  "Copy structure that addresses the patient or customer decision journey",
  "Mobile-first layouts that work without custom design every time",
];

const s: React.CSSProperties = {
  fontFamily: "'DM Sans', sans-serif",
};

export default function ServicesPage() {
  return (
    <>
      {/* Header */}
      <section
        style={{
          paddingTop: "120px",
          paddingBottom: "4rem",
          paddingLeft: "1.5rem",
          paddingRight: "1.5rem",
          maxWidth: "1200px",
          margin: "0 auto",
        }}
      >
        <SectionHeader
          eyebrow="Services"
          headline="What I build and how I can help."
          subtext="Every engagement starts with understanding what the business actually needs — then building the site around that, not around a template."
        />
      </section>

      {/* Services visual */}
      <section style={{ padding: "0 1.5rem 3rem", maxWidth: "1200px", margin: "0 auto" }}>
        <div style={{ position: "relative" }}>
          <Image
            src="/images/site/campbell-digital-studio-services-graphic.png"
            alt="Digital solutions for medical practices and local businesses — custom websites, local SEO, review growth, booking systems, QR cards, and content support"
            width={1024}
            height={683}
            sizes="(max-width: 768px) 100vw, 1200px"
            style={{
              width: "100%",
              height: "auto",
              borderRadius: "14px",
              display: "block",
            }}
          />
          <p style={{
            fontFamily: "'DM Mono', monospace",
            fontSize: "0.58rem",
            letterSpacing: "0.06em",
            color: "#374151",
            marginTop: "0.5rem",
            textAlign: "right",
          }}>
            Representative service areas shown
          </p>
        </div>
      </section>

      {/* Core services grid */}
      <section style={{ padding: "0 1.5rem 0", maxWidth: "1200px", margin: "0 auto" }}>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(340px, 1fr))",
            gap: "1.25rem",
          }}
        >
          {services.map((service) => (
            <div
              key={service.number}
              className="service-card-hover"
              style={{
                background: "#161f2e",
                border: "1px solid rgba(255,255,255,0.07)",
                borderRadius: "12px",
                padding: "1.75rem",
                display: "flex",
                flexDirection: "column",
                gap: "0.85rem",
                transition: "border-color 0.2s",
              }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", marginBottom: "0.25rem" }}>
                <span style={{ fontFamily: "'DM Mono', monospace", fontSize: "0.65rem", letterSpacing: "0.08em", color: "#d4a853", opacity: 0.7 }}>
                  {service.number}
                </span>
                <div style={{ flex: 1, height: "1px", background: "rgba(212,168,83,0.15)" }} />
              </div>
              <h3 style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: "1.25rem", fontWeight: 500, color: "#f8f5f0", lineHeight: 1.25 }}>
                {service.title}
              </h3>
              <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "0.875rem", color: "#94a3b8", lineHeight: 1.65 }}>
                {service.description}
              </p>
              <ul style={{ margin: 0, padding: 0, listStyle: "none", display: "flex", flexDirection: "column", gap: "0.4rem", paddingTop: "0.5rem", borderTop: "1px solid rgba(255,255,255,0.05)" }}>
                {service.items.map((item) => (
                  <li key={item} style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "0.8rem", color: "#64748b", paddingLeft: "1.1rem", position: "relative", lineHeight: 1.5 }}>
                    <span style={{ position: "absolute", left: 0, color: "#d4a853", fontFamily: "'DM Mono', monospace" }}>—</span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Scoped pricing note */}
        <div
          className="grid-2-center"
          style={{
            marginTop: "2.5rem",
            padding: "1.75rem 2rem",
            background: "#111827",
            borderRadius: "12px",
            border: "1px solid rgba(255,255,255,0.06)",
          }}
        >
          <div>
            <p style={{ fontFamily: "'DM Mono', monospace", fontSize: "0.65rem", letterSpacing: "0.1em", textTransform: "uppercase", color: "#d4a853", marginBottom: "0.75rem" }}>
              How Pricing Works
            </p>
            <p style={{ ...s, fontSize: "0.9rem", color: "#94a3b8", lineHeight: 1.7 }}>
              Every project is scoped based on the business, number of pages, content needs, SEO structure, integrations, and launch support. I do not publish flat package rates — the right scope depends entirely on what the business actually needs.
            </p>
          </div>
          <div style={{ textAlign: "center" }}>
            <p style={{ ...s, fontSize: "0.9rem", color: "#94a3b8", marginBottom: "1rem", lineHeight: 1.65 }}>
              The best starting point is a quick website review. Send me the link and I will tell you what I would build and what that scope looks like.
            </p>
            <Link href="/website-review" style={{ display: "inline-block", fontFamily: "'DM Sans', sans-serif", fontSize: "0.875rem", fontWeight: 500, color: "#0b1120", background: "#d4a853", padding: "0.65rem 1.5rem", borderRadius: "7px", textDecoration: "none" }}>
              Request Website Review
            </Link>
          </div>
        </div>
      </section>

      {/* ── Digital Assets & Content Support ─────────────────────────────── */}
      <section style={{ padding: "4rem 1.5rem 0", maxWidth: "1200px", margin: "0 auto" }}>
        <div style={{ background: "#111827", border: "1px solid rgba(255,255,255,0.06)", borderRadius: "16px", padding: "2.5rem", marginBottom: "2rem" }}>
          <div style={{ maxWidth: "780px", marginBottom: "2rem" }}>
            <p style={{ fontFamily: "'DM Mono', monospace", fontSize: "0.65rem", letterSpacing: "0.1em", textTransform: "uppercase", color: "#d4a853", marginBottom: "0.75rem" }}>
              Add-On Support
            </p>
            <div style={{ width: "36px", height: "2px", background: "#d4a853", marginBottom: "1rem" }} />
            <h2 style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: "clamp(1.5rem, 3vw, 2rem)", fontWeight: 500, color: "#f8f5f0", marginBottom: "0.85rem", lineHeight: 1.2 }}>
              Digital Assets &amp; Content Support
            </h2>
            <p style={{ ...s, fontSize: "0.95rem", color: "#94a3b8", lineHeight: 1.75 }}>
              Beyond the website itself, I can help create the practical digital assets small businesses actually need: QR review cards, business cards, simple brand kits, Canva graphics, service-page copy, and SEO-friendly articles. This is support built around the main website service — not a standalone agency offer.
            </p>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: "1rem" }}>
            {digitalAssetGroups.map((group) => (
              <div key={group.category} style={{ background: "#0b1120", border: "1px solid rgba(255,255,255,0.05)", borderRadius: "10px", padding: "1.25rem" }}>
                <p style={{ fontFamily: "'DM Mono', monospace", fontSize: "0.63rem", letterSpacing: "0.08em", textTransform: "uppercase", color: "#d4a853", marginBottom: "0.85rem" }}>
                  {group.category}
                </p>
                <ul style={{ margin: 0, padding: 0, listStyle: "none", display: "flex", flexDirection: "column", gap: "0.45rem" }}>
                  {group.items.map((item) => (
                    <li key={item} style={{ ...s, fontSize: "0.825rem", color: "#64748b", paddingLeft: "1rem", position: "relative", lineHeight: 1.5 }}>
                      <span style={{ position: "absolute", left: 0, color: "#d4a853", fontFamily: "'DM Mono', monospace" }}>—</span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {/* Photography note */}
          <div style={{ marginTop: "1.5rem", padding: "1.25rem 1.5rem", background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.05)", borderRadius: "8px", display: "flex", alignItems: "flex-start", gap: "1rem" }}>
            <span style={{ fontFamily: "'DM Mono', monospace", fontSize: "0.65rem", letterSpacing: "0.08em", textTransform: "uppercase", color: "#64748b", flexShrink: 0, paddingTop: "0.1rem" }}>Note</span>
            <p style={{ ...s, fontSize: "0.85rem", color: "#64748b", lineHeight: 1.65, margin: 0 }}>
              I do not currently offer in-house photography or video production. For photo and video, I can work with client-provided media, help create shot lists, or coordinate with a photographer. Good imagery makes a significant difference and is worth investing in separately.
            </p>
          </div>
        </div>

        {/* ── Built from proven patterns ────────────────────────────────── */}
        <div style={{ background: "linear-gradient(135deg, #111827, #0d1829)", border: "1px solid rgba(212,168,83,0.15)", borderRadius: "16px", padding: "2.5rem", marginBottom: "4rem" }}>
          <p style={{ fontFamily: "'DM Mono', monospace", fontSize: "0.65rem", letterSpacing: "0.1em", textTransform: "uppercase", color: "#d4a853", marginBottom: "0.75rem" }}>
            How Builds Stay Efficient
          </p>
          <div style={{ width: "36px", height: "2px", background: "#d4a853", marginBottom: "1.25rem" }} />
          <div className="grid-2">
            <div>
              <h2 style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: "clamp(1.5rem, 3vw, 2rem)", fontWeight: 500, color: "#f8f5f0", marginBottom: "1rem", lineHeight: 1.2 }}>
                Built from proven patterns.
              </h2>
              <p style={{ ...s, fontSize: "0.95rem", color: "#94a3b8", lineHeight: 1.75, marginBottom: "1rem" }}>
                I do not start from a blank page every time. I build from proven patterns: service-page structures, local SEO layouts, booking flows, review CTAs, content libraries, and conversion sections that have been tested across real projects — then tailored to each business.
              </p>
              <p style={{ ...s, fontSize: "0.95rem", color: "#94a3b8", lineHeight: 1.75 }}>
                This keeps builds faster and more consistent than starting from scratch each time — without the limitations of a generic website template.
              </p>
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: "0.6rem" }}>
              {provenPatterns.map((item) => (
                <div key={item} style={{ display: "flex", alignItems: "flex-start", gap: "0.75rem", padding: "0.75rem 1rem", background: "rgba(255,255,255,0.03)", borderRadius: "7px", border: "1px solid rgba(255,255,255,0.04)" }}>
                  <span style={{ color: "#d4a853", flexShrink: 0, fontFamily: "'DM Mono', monospace", fontSize: "0.7rem" }}>✓</span>
                  <p style={{ ...s, fontSize: "0.825rem", color: "#94a3b8", margin: 0, lineHeight: 1.5 }}>{item}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section style={{ padding: "0 1.5rem 5rem", maxWidth: "1200px", margin: "0 auto" }}>
        <CTASection
          headline="Not sure which service fits?"
          subtext="Start with a website review. I will look at what you have, explain what is working and what is not, and recommend the right scope for your situation."
          primaryLabel="Request Website Review"
          primaryHref="/website-review"
          secondaryLabel="View Work"
          secondaryHref="/work"
        />
      </section>
    </>
  );
}
