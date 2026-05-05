import type { Metadata } from "next";
import Link from "next/link";
import SectionTag from "@/components/editorial/SectionTag";
import EditorialH2 from "@/components/editorial/EditorialH2";

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
  /** Whether this row links into a full case study */
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
    liveUrl: "https://revitalize-medical-wellness-clinic-nine.vercel.app",
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
    liveUrl: "https://airsolutionspros.com",
    hasCaseStudy: true,
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
      {/* ─── Header ───────────────────────────────────────────────── */}
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
            fontFamily: "var(--font-manrope), sans-serif",
            fontSize: "17px",
            lineHeight: 1.65,
            color: "var(--ink-soft)",
            marginTop: "24px",
          }}
        >
          A transparent record of the sites and platforms I’ve built — with honest labels and
          real scope on each. Click into a project for the full case study.
        </p>
      </section>

      {/* ─── Project index — full-bleed editorial rows ────────────── */}
      <section
        style={{
          borderTop: "1px solid var(--paper-rule)",
          borderBottom: "1px solid var(--paper-rule)",
          background: "var(--surface)",
        }}
      >
        <div className="section-wrap" style={{ paddingTop: "16px", paddingBottom: "16px" }}>
          {rows.map((r) => {
            const href = r.hasCaseStudy ? `/work/${r.slug}` : (r.liveUrl ?? "/work");
            const external = !r.hasCaseStudy && r.liveUrl !== null;
            return (
            <Link
              key={r.slug}
              href={href}
              className="work-row"
              {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
            >
              {/* Col 1 — year */}
              <div>
                <span
                  style={{
                    fontFamily: "var(--font-jetbrains), monospace",
                    fontSize: "12px",
                    letterSpacing: "0.16em",
                    color: "var(--ink-mute)",
                    textTransform: "uppercase",
                  }}
                >
                  {r.year}
                </span>
              </div>

              {/* Col 2 — title + scope */}
              <div>
                <h3
                  style={{
                    fontFamily: "var(--font-fraunces), Georgia, serif",
                    fontSize: "clamp(22px, 2.6vw, 30px)",
                    fontWeight: 500,
                    color: "var(--navy-900)",
                    letterSpacing: "-0.018em",
                    fontVariationSettings: '"opsz" 96',
                    marginBottom: "8px",
                    lineHeight: 1.15,
                  }}
                >
                  {r.title}
                </h3>
                <p
                  style={{
                    fontFamily: "var(--font-manrope), sans-serif",
                    fontSize: "14.5px",
                    lineHeight: 1.6,
                    color: "var(--ink-soft)",
                    maxWidth: "60ch",
                  }}
                >
                  {r.scope}
                </p>
              </div>

              {/* Col 3 — meta + actions */}
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "flex-end",
                  gap: "12px",
                  textAlign: "right",
                }}
                className="work-row-meta"
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
                        fontFamily: "var(--font-jetbrains), monospace",
                        fontSize: "10px",
                        letterSpacing: "0.16em",
                        color: "var(--ink-mute)",
                        textTransform: "uppercase",
                      }}
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                <span
                  style={{
                    fontFamily: "var(--font-jetbrains), monospace",
                    fontSize: "10px",
                    letterSpacing: "0.16em",
                    textTransform: "uppercase",
                    color: "var(--gold-700)",
                    fontWeight: 600,
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "8px",
                  }}
                >
                  <span aria-hidden style={{ color: "var(--gold-600)" }}>{r.buildLabel.glyph}</span>
                  {r.buildLabel.text}{external ? " ↗" : ""}
                </span>
              </div>
            </Link>
            );
          })}
        </div>
      </section>

      {/* ─── Closing copy ─────────────────────────────────────────── */}
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
          border-top: 1px solid var(--paper-rule);
          align-items: start;
          text-decoration: none;
          color: inherit;
          transition: background 0.2s ease, padding 0.2s ease;
        }
        .work-row:first-of-type { border-top: none; }
        .work-row:hover {
          background: var(--paper-sand);
          padding-left: 16px;
          padding-right: 16px;
        }
        .work-row:hover h3 {
          background-image: linear-gradient(currentColor, currentColor);
          background-size: 100% 1px;
          background-repeat: no-repeat;
          background-position: left 95%;
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
