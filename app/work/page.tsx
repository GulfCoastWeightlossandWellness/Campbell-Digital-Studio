import type { Metadata } from "next";
import Link from "next/link";
import SectionTag from "@/components/editorial/SectionTag";
import EditorialH2 from "@/components/editorial/EditorialH2";
import { displayDomain, isRealDomain } from "@/lib/url-display";

export const metadata: Metadata = {
  title: "Work",
  description:
    "A transparent record of the sites and platforms Campbell Digital Studio has built — with honest labels and real scope on each.",
};

type WorkRow = {
  slug: string;
  year: string;
  title: string;
  scope: string;
  sectorTags: string[];
  buildLabel: { glyph: "◆" | "◇"; text: string };
  liveUrl: string | null;
  productUrl?: string;
  productLabel?: string;
  hasCaseStudy: boolean;
};

const rows: WorkRow[] = [
  {
    slug: "revitalize",
    year: "2026",
    title: "Revitalize Aesthetics & Wellness",
    scope:
      "A multi-location medical aesthetics, hormone, and weight-management practice in Georgia. Two clinics, a connected nutrition supplement brand, a published book, and a coaching institute — under one digital ecosystem.",
    sectorTags: ["Healthcare", "Multi-Location"],
    buildLabel: { glyph: "◆", text: "Featured Case Study" },
    liveUrl: "http://revitalizemedicalclinic.com/",
    hasCaseStudy: true,
  },
  {
    slug: "air-solutions",
    year: "2026",
    title: "Air Solutions Heating & Cooling",
    scope:
      "A 159-page programmatic SEO architecture for an HVAC contractor in coastal Alabama — 15 cities × 9 services, plus four custom interactive tools.",
    sectorTags: ["HVAC", "Programmatic SEO"],
    buildLabel: { glyph: "◆", text: "Featured Case Study" },
    liveUrl: "https://air-solutions-pros.vercel.app",
    hasCaseStudy: true,
  },
  {
    slug: "interactive-health-education",
    year: "2025",
    title: "Interactive Health Education",
    scope:
      "A digital health education platform — public marketing site plus a live application dashboard that teaches clinical concepts through interactive modules.",
    sectorTags: ["Digital Health", "Platform"],
    buildLabel: { glyph: "◇", text: "Original Product" },
    liveUrl: "https://www.interactivehealtheducation.com/",
    productUrl: "https://dashboard.interactivehealtheducation.com/",
    productLabel: "Live product",
    hasCaseStudy: false,
  },
  {
    slug: "acexperts",
    year: "2025",
    title: "ACExperts251",
    scope:
      "A full-stack Next.js HVAC site with 8 city pages, 7 services, three interactive tools, and Google Sheets-backed lead capture.",
    sectorTags: ["HVAC", "Local SEO"],
    buildLabel: { glyph: "◇", text: "Original Build" },
    liveUrl: "https://acexperts251.com",
    hasCaseStudy: false,
  },
  {
    slug: "collective-counseling",
    year: "2024",
    title: "Collective Counseling",
    scope:
      "A focused therapy practice site with a dedicated adult ADHD testing page, real therapist photography, and Daphne-targeted local SEO.",
    sectorTags: ["Therapy", "ADHD Testing"],
    buildLabel: { glyph: "◇", text: "Original Build" },
    liveUrl: "https://collectivecounselingdaphne.com",
    hasCaseStudy: false,
  },
  {
    slug: "blessed-barbershop",
    year: "2024",
    title: "Blessed Barbershop",
    scope:
      "A mobile-first barbershop site with WebP-optimized media, a service menu with pricing, and a frictionless booking link.",
    sectorTags: ["Local Business", "Mobile-First"],
    buildLabel: { glyph: "◇", text: "Original Build" },
    liveUrl: "https://www.blessedbarbershopdaphne.com",
    hasCaseStudy: false,
  },
];


export default function WorkPage() {
  return (
    <>
      <section
        className="section-wrap"
        style={{ paddingTop: "clamp(96px, 14vw, 160px)", paddingBottom: "clamp(48px, 6vw, 72px)" }}
      >
        <SectionTag num="§ Index" label="Selected Work" />
        <EditorialH2>
          Five projects<br />
          <em>the studio has shipped.</em>
        </EditorialH2>

        <p
          className="reading-col"
          style={{
            fontFamily: "var(--font-geist-sans), system-ui, sans-serif",
            fontSize: "17px",
            lineHeight: 1.65,
            color: "var(--ink-2)",
            marginTop: "24px",
            letterSpacing: "-0.01em",
          }}
        >
          A transparent record of the sites and platforms I&rsquo;ve built — with honest labels and
          real scope on each. Click into a project for the full case study.
        </p>
      </section>

      <section
        style={{
          borderTop: "1px solid var(--border-subtle)",
          borderBottom: "1px solid var(--border-subtle)",
          background: "var(--panel)",
        }}
      >
        <div className="section-wrap" style={{ paddingTop: "16px", paddingBottom: "16px" }}>
          {rows.map((r) => {
            const primaryHref = r.hasCaseStudy ? `/work/${r.slug}` : (r.liveUrl ?? "/work");
            const primaryExternal = !r.hasCaseStudy && r.liveUrl !== null;
            const liveReal = isRealDomain(r.liveUrl);
            const productReal = isRealDomain(r.productUrl);

            return (
              <div key={r.slug} className="work-row">
                <div className="work-row-year">
                  <span
                    style={{
                      fontFamily: "var(--font-geist-mono), var(--font-jetbrains), monospace",
                      fontSize: "12px",
                      letterSpacing: "0.16em",
                      color: "var(--ink-3)",
                      textTransform: "uppercase",
                    }}
                  >
                    {r.year}
                  </span>
                </div>

                <div>
                  <Link
                    href={primaryHref}
                    {...(primaryExternal ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                    className="work-row-title"
                  >
                    <h3
                      style={{
                        fontFamily: "var(--font-geist-sans), system-ui, sans-serif",
                        fontSize: "clamp(22px, 2.6vw, 30px)",
                        fontWeight: 500,
                        color: "var(--ink-1)",
                        letterSpacing: "-0.022em",
                        marginBottom: "8px",
                        lineHeight: 1.15,
                      }}
                    >
                      {r.title}
                      {primaryExternal ? (
                        <span aria-hidden style={{ color: "var(--aurora-violet)", marginLeft: "0.4em", fontSize: "0.7em" }}>↗</span>
                      ) : null}
                    </h3>
                  </Link>
                  <p
                    style={{
                      fontFamily: "var(--font-geist-sans), system-ui, sans-serif",
                      fontSize: "14.5px",
                      lineHeight: 1.6,
                      color: "var(--ink-2)",
                      maxWidth: "60ch",
                      marginBottom: "12px",
                    }}
                  >
                    {r.scope}
                  </p>

                  {(r.liveUrl || r.productUrl) ? (
                    <div className="work-row-domains">
                      {r.liveUrl ? (
                        <a
                          href={r.liveUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className={`domain-link ${liveReal ? "domain-real" : "domain-staging"}`}
                          aria-label={`Visit ${r.title} — opens in new tab`}
                        >
                          {displayDomain(r.liveUrl)} <span aria-hidden>↗</span>
                        </a>
                      ) : null}
                      {r.productUrl ? (
                        <a
                          href={r.productUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className={`domain-link ${productReal ? "domain-real" : "domain-staging"}`}
                          aria-label={`${r.productLabel ?? "Live product"} — opens in new tab`}
                        >
                          <span className="domain-link-prefix">{r.productLabel ?? "Live product"}:</span>{" "}
                          {displayDomain(r.productUrl)} <span aria-hidden>↗</span>
                        </a>
                      ) : null}
                    </div>
                  ) : null}
                </div>

                <div
                  className="work-row-meta"
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "flex-end",
                    gap: "12px",
                    textAlign: "right",
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      gap: "6px",
                      alignItems: "flex-end",
                    }}
                  >
                    {r.sectorTags.map((tag) => (
                      <span
                        key={tag}
                        style={{
                          fontFamily: "var(--font-geist-mono), var(--font-jetbrains), monospace",
                          fontSize: "10px",
                          letterSpacing: "0.16em",
                          color: "var(--ink-3)",
                          textTransform: "uppercase",
                        }}
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                  <span
                    style={{
                      fontFamily: "var(--font-geist-mono), var(--font-jetbrains), monospace",
                      fontSize: "10px",
                      letterSpacing: "0.16em",
                      textTransform: "uppercase",
                      color: "var(--aurora-violet)",
                      fontWeight: 600,
                      display: "inline-flex",
                      alignItems: "center",
                      gap: "8px",
                    }}
                  >
                    <span aria-hidden style={{ color: "var(--aurora-violet)" }}>{r.buildLabel.glyph}</span>
                    {r.buildLabel.text}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      <section className="section-wrap section-block-tight">
        <div className="reading-col">
          <SectionTag num="§ Note" label="Reading the index" />
          <p
            className="editorial-body"
            style={{ fontSize: "17px" }}
          >
            Featured rows link into a full case study with the brief, what was built, and a written
            rationale. Earlier builds link directly to the live site.
          </p>
          <div style={{ marginTop: "32px" }}>
            <Link href="/inquire" className="editorial-link arrow-link mono">
              Start a conversation <span className="arrow" aria-hidden>→</span>
            </Link>
          </div>
        </div>
      </section>

      <style>{`
        .work-row {
          display: grid;
          grid-template-columns: 100px 1fr 220px;
          gap: 32px;
          padding: 28px 0;
          border-top: 1px solid var(--border-subtle);
          align-items: start;
          transition: background 0.2s ease, padding 0.2s ease;
        }
        .work-row:first-of-type { border-top: none; }
        .work-row:hover {
          background: rgba(255, 255, 255, 0.02);
          padding-left: 16px;
          padding-right: 16px;
        }

        .work-row-title {
          display: block;
          text-decoration: none;
          color: inherit;
          transition: color 0.2s ease;
        }
        .work-row:hover .work-row-title h3 {
          color: var(--aurora-violet);
        }

        .work-row-domains {
          display: flex;
          flex-wrap: wrap;
          gap: 8px 20px;
          align-items: baseline;
          margin-top: 4px;
        }
        .domain-link {
          display: inline-flex;
          align-items: baseline;
          gap: 0.35em;
          text-decoration: none;
          font-family: var(--font-geist-mono), var(--font-jetbrains), ui-monospace, monospace;
          font-size: 12px;
          letter-spacing: 0.02em;
          padding: 6px 0;
          transition: color 0.2s ease;
          line-height: 1.3;
        }
        .domain-link .domain-link-prefix {
          font-weight: 600;
          letter-spacing: 0.16em;
          text-transform: uppercase;
          font-size: 10px;
          color: var(--ink-3);
        }
        .domain-real {
          color: var(--aurora-violet);
          font-weight: 600;
          font-size: 13.5px;
          letter-spacing: 0.02em;
        }
        .domain-real:hover {
          color: var(--aurora-magenta);
        }
        .domain-staging {
          color: var(--ink-3);
          font-weight: 500;
        }
        .domain-staging:hover {
          color: var(--ink-1);
        }

        @media (max-width: 860px) {
          .work-row { grid-template-columns: 1fr; gap: 12px; padding: 24px 0; }
          .work-row:hover { padding-left: 0; padding-right: 0; }
          .work-row-meta { align-items: flex-start !important; text-align: left !important; flex-direction: row !important; flex-wrap: wrap !important; gap: 16px !important; }
          .work-row-meta > div { flex-direction: row !important; gap: 10px !important; align-items: flex-start !important; }
        }
      `}</style>
    </>
  );
}
