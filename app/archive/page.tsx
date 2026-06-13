import type { Metadata } from "next";
import Link from "next/link";
import { siteConfig, absoluteUrl } from "@/lib/site-config";

export const metadata: Metadata = {
  title: "Studio Index",
  description:
    "Text-only archive ledger of every site shipped by Campbell Digital Studio — 1,000+ pages across 8 sites in 18 months, by 1 operator.",
  alternates: { canonical: "/archive" },
};

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: siteConfig.name, item: siteConfig.url },
    { "@type": "ListItem", position: 2, name: "Studio Archive", item: absoluteUrl("/archive") },
  ],
};

/* ────────────────────────────────────────────────────────────────────────
 * Ledger data — hardcoded per-project so the page reads as a static
 * CV-appendix archive. Sourced from lib/projects.ts and the public
 * deployment record. Order: newest active → dormant.
 * ──────────────────────────────────────────────────────────────────── */

type LedgerField = { label: string; value: string };

type LedgerEntry = {
  name: string;
  fields: LedgerField[];
};

const ledger: LedgerEntry[] = [
  {
    name: "AIR SOLUTIONS HEATING & COOLING",
    fields: [
      { label: "URL", value: "airsolutionspros.com" },
      { label: "Routes", value: "345 live pages" },
      { label: "Schema types", value: "9 JSON-LD (HVACBusiness, LocalBusiness, Service, OfferCatalog, FAQPage, BreadcrumbList, ...)" },
      { label: "Stack", value: "Next.js · Tailwind · Three.js · Vercel" },
      { label: "Custom tools", value: "3D AC Explorer · Diagnostic Quiz · Repair-vs-Replace ROI · Financing Estimator" },
      { label: "Launched", value: "2026 · migrated WordPress → Next.js" },
      { label: "Status", value: "Active Retainer · Programmatic SEO" },
    ],
  },
  {
    name: "PRO 1 PAINTERS",
    fields: [
      { label: "URL", value: "pro1painters.com" },
      { label: "Routes", value: "424 live pages" },
      { label: "Schema types", value: "JSON-LD (HousePainter, LocalBusiness, Service, FAQPage, BreadcrumbList, ...)" },
      { label: "Stack", value: "Next.js · React 19 · Tailwind · on-device CV · Vercel" },
      { label: "Custom tools", value: "AI Color Visualizer — on-device, snap-a-room repaint" },
      { label: "Content", value: "521-post native blog engine · 2-yr weekday drip" },
      { label: "Launched", value: "2026-06 · migrated WordPress → Next.js" },
      { label: "Status", value: "Active · Mobile + Baldwin GBP ops + retainer" },
    ],
  },
  {
    name: "REVITALIZE MEDICAL & WELLNESS",
    fields: [
      { label: "URL", value: "revitalizemedicalclinic.com" },
      { label: "Routes", value: "72" },
      { label: "Schema types", value: "8 JSON-LD (MedicalBusiness, LocalBusiness, MedicalProcedure, FAQPage, BreadcrumbList, ...)" },
      { label: "Stack", value: "Next.js 16 · React 19 · Tailwind v4 · Vercel" },
      { label: "Sub-brands", value: "Clinic ×2 · Institute · Hub · Shop · Travis personal · Peptide-education" },
      { label: "Launched", value: "2026" },
      { label: "Status", value: "Active Retainer" },
    ],
  },
  {
    name: "ACEXPERTS251",
    fields: [
      { label: "URL", value: "acexperts251.com" },
      { label: "Routes", value: "29" },
      { label: "Schema types", value: "6 JSON-LD (HVACBusiness, LocalBusiness, Service, AggregateRating, FAQPage, BreadcrumbList)" },
      { label: "Stack", value: "Next.js · TypeScript · Three.js · Cloudflare Turnstile · Resend · Vercel" },
      { label: "Custom tools", value: "3D AC Diagnostic · Symptom Quiz · ROI Calculator" },
      { label: "Launched", value: "2025" },
      { label: "Status", value: "Active Retainer" },
    ],
  },
  {
    name: "IHE MARKETING",
    fields: [
      { label: "URL", value: "interactivehealtheducation.com" },
      { label: "Routes", value: "18" },
      { label: "Schema types", value: "5 JSON-LD (Organization, WebSite, Product, FAQPage, BreadcrumbList)" },
      { label: "Stack", value: "Next.js 16 · React 19 · Tailwind v4 · Vercel" },
      { label: "Launched", value: "2025" },
      { label: "Status", value: "Active · Original Product" },
    ],
  },
  {
    name: "IHE PRODUCT DASHBOARD",
    fields: [
      { label: "URL", value: "dashboard.interactivehealtheducation.com" },
      { label: "Routes", value: "146 patient-education apps + dashboard" },
      { label: "Schema types", value: "n/a (authenticated product surface)" },
      { label: "Stack", value: "Next.js 16 · React 19 · TypeScript · Tailwind v4 · Vercel" },
      { label: "Custom tools", value: "146 interactive clinical modules · registrar validation pipeline · phase 1/2/3 ideation engine" },
      { label: "Launched", value: "2025" },
      { label: "Status", value: "Active · Original Product" },
    ],
  },
  {
    name: "COLLECTIVE COUNSELING",
    fields: [
      { label: "URL", value: "collectivecounselingdaphne.com" },
      { label: "Routes", value: "4" },
      { label: "Schema types", value: "3 JSON-LD (LocalBusiness, MedicalBusiness, BreadcrumbList)" },
      { label: "Stack", value: "HTML/CSS · Multi-page static · Vercel" },
      { label: "Launched", value: "2025" },
      { label: "Status", value: "Shipped" },
    ],
  },
  {
    name: "BLESSED BARBERSHOP",
    fields: [
      { label: "URL", value: "blessedbarbershopdaphne.com" },
      { label: "Routes", value: "5" },
      { label: "Schema types", value: "3 JSON-LD (LocalBusiness, HairSalon, BreadcrumbList)" },
      { label: "Stack", value: "HTML/CSS · WebP-optimized media · Cloudflare" },
      { label: "Launched", value: "2024" },
      { label: "Status", value: "Shipped" },
    ],
  },
];

const totals: LedgerField[] = [
  { label: "TOTAL LIVE PAGES SHIPPED", value: "~1,040" },
  { label: "TOTAL CUSTOM TOOLS BUILT", value: "13" },
  { label: "TOTAL SCHEMA TYPES COVERED", value: "14+ unique" },
  { label: "TOTAL ACTIVE RETAINERS", value: "4" },
];

/* ────────────────────────────────────────────────────────────────────────
 * Inline mono style — kept local so the page reads as a single artifact.
 * ──────────────────────────────────────────────────────────────────── */

const monoFamily =
  "var(--font-geist-mono), ui-monospace, SFMono-Regular, Menlo, Consolas, monospace";

export default function StudioIndexPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />

      <section
        className="section-wrap archive-page"
        style={{
          paddingTop: "clamp(64px, 9vw, 128px)",
          paddingBottom: "clamp(48px, 6vw, 80px)",
        }}
      >
        {/* ── A. Headline counter ─────────────────────────────────── */}
        <div
          aria-label="Studio total output"
          style={{
            fontFamily: monoFamily,
            color: "var(--ink-1)",
            display: "grid",
            gap: "clamp(4px, 0.6vw, 10px)",
            marginBottom: "clamp(40px, 6vw, 88px)",
          }}
        >
          <div
            style={{
              fontFamily: monoFamily,
              fontSize: "11px",
              letterSpacing: "0.18em",
              textTransform: "uppercase",
              color: "var(--copper)",
              marginBottom: "12px",
            }}
          >
            § INDEX / Archive ledger
          </div>

          {[
            { num: "1,000+", label: "pages shipped" },
            { num: "8", label: "sites" },
            { num: "18", label: "months" },
            { num: "1", label: "operator" },
          ].map((row) => (
            <div key={row.label} className="archive-counter-row">
              <span
                className="archive-counter-num"
                style={{
                  fontFamily: monoFamily,
                  lineHeight: 1.0,
                  letterSpacing: "-0.03em",
                  color: "var(--ink-1)",
                  fontWeight: 500,
                  textAlign: "right",
                }}
              >
                {row.num}
              </span>
              <span
                className="archive-counter-label"
                style={{
                  fontFamily: monoFamily,
                  letterSpacing: "0.04em",
                  color: "var(--ink-2)",
                }}
              >
                {row.label}
              </span>
            </div>
          ))}

          <p
            style={{
              fontFamily: monoFamily,
              fontSize: "12px",
              color: "var(--ink-3, var(--ink-2))",
              marginTop: "20px",
              letterSpacing: "0.04em",
            }}
          >
            1,000+ pages shipped across 8 sites in 18 months by 1 operator.
          </p>
        </div>

        {/* ── B. Per-project ledger ────────────────────────────────── */}
        <div
          style={{
            borderTop: "1px solid var(--border-default)",
            paddingTop: "clamp(24px, 3vw, 40px)",
            display: "grid",
            gap: "clamp(40px, 5vw, 64px)",
          }}
        >
          {ledger.map((entry) => (
            <article
              key={entry.name}
              style={{
                fontFamily: monoFamily,
                color: "var(--ink-1)",
              }}
            >
              <h2
                style={{
                  fontFamily: monoFamily,
                  fontSize: "clamp(15px, 1.6vw, 18px)",
                  fontWeight: 600,
                  letterSpacing: "0.06em",
                  color: "var(--ink-1)",
                  margin: 0,
                  marginBottom: "16px",
                  paddingBottom: "8px",
                  borderBottom: "1px solid var(--border-subtle)",
                }}
              >
                {entry.name}
              </h2>

              <dl
                className="archive-fields"
                style={{
                  margin: 0,
                  fontVariantNumeric: "tabular-nums",
                }}
              >
                {entry.fields.map((f) => (
                  <div key={f.label} className="archive-field-row">
                    <dt
                      className="archive-field-label"
                      style={{
                        fontFamily: monoFamily,
                        letterSpacing: "0.08em",
                        color: "var(--ink-2)",
                        textTransform: "uppercase",
                      }}
                    >
                      {f.label}
                    </dt>
                    <dd
                      className="archive-field-value"
                      style={{
                        margin: 0,
                        fontFamily: monoFamily,
                        lineHeight: 1.55,
                        color: "var(--ink-1)",
                      }}
                    >
                      {f.value}
                    </dd>
                  </div>
                ))}
              </dl>
            </article>
          ))}
        </div>

        {/* ── C. Aggregate totals ──────────────────────────────────── */}
        <div
          style={{
            marginTop: "clamp(56px, 7vw, 96px)",
            paddingTop: "clamp(24px, 3vw, 40px)",
            borderTop: "2px solid var(--ink-1)",
            display: "grid",
            gap: "10px",
            fontFamily: monoFamily,
            fontVariantNumeric: "tabular-nums",
          }}
        >
          <div
            style={{
              fontFamily: monoFamily,
              fontSize: "11px",
              letterSpacing: "0.18em",
              textTransform: "uppercase",
              color: "var(--copper)",
              marginBottom: "8px",
            }}
          >
            Totals
          </div>
          {totals.map((t) => (
            <div
              key={t.label}
              style={{
                display: "grid",
                gridTemplateColumns: "1fr auto",
                gap: "24px",
                alignItems: "baseline",
                paddingBlock: "4px",
                borderBottom: "1px dotted var(--border-subtle)",
              }}
            >
              <span
                style={{
                  fontFamily: monoFamily,
                  fontSize: "13px",
                  letterSpacing: "0.08em",
                  color: "var(--ink-2)",
                }}
              >
                {t.label}
              </span>
              <span
                style={{
                  fontFamily: monoFamily,
                  fontSize: "15px",
                  fontWeight: 600,
                  color: "var(--ink-1)",
                }}
              >
                {t.value}
              </span>
            </div>
          ))}
        </div>

        {/* ── D. Footer link ──────────────────────────────────────── */}
        <div
          style={{
            marginTop: "clamp(48px, 6vw, 80px)",
            fontFamily: monoFamily,
          }}
        >
          <Link
            href="/work"
            className="editorial-link mono"
            style={{ fontFamily: monoFamily }}
          >
            ← Back to /work
          </Link>
        </div>
      </section>
    </>
  );
}
