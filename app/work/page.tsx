import type { Metadata } from "next";
import Link from "next/link";
import { projects } from "@/lib/projects";
import SectionTag from "@/components/editorial/SectionTag";
import EditorialH2 from "@/components/editorial/EditorialH2";

export const metadata: Metadata = {
  title: "Work",
  description:
    "A transparent record of the sites and platforms Campbell Digital Studio has built — with honest labels, real scope, and real market valuations on each.",
};

type WorkRow = {
  slug: string;
  year: string;
  title: string;
  scope: string;
  sectorTags: string[];
  buildLabel: { glyph: "◆" | "◇" | "※"; text: string };
  liveUrl: string | null;
};

const rows: WorkRow[] = [
  {
    slug: "air-solutions",
    year: "2026",
    title: "Air Solutions Heating & Cooling",
    scope:
      "A 24-month market-dominance program: 249 launch pages → 650 URLs by 2028, 441-post content library, 135 city × service intersection pages, NWS hurricane alert integration, 3 custom interactive tools.",
    sectorTags: ["HVAC", "Programmatic SEO"],
    buildLabel: { glyph: "◆", text: "24-Month Build + Retainer" },
    liveUrl: "https://airsolutionspros.com",
  },
  {
    slug: "revitalize",
    year: "2026",
    title: "Revitalize Aesthetics & Wellness",
    scope:
      "A 24-month clinical marketing engagement: 50+ routes, 18 service pages, two-location SEO, JaneApp booking, and a content engine publishing two clinical articles every week through 2028.",
    sectorTags: ["Medical Wellness", "Multi-Location"],
    buildLabel: { glyph: "◆", text: "24-Month Build + Retainer" },
    liveUrl: "https://revitalize-medical-wellness-clinic-nine.vercel.app",
  },
  {
    slug: "interactive-health-education",
    year: "2025",
    title: "Interactive Health Education",
    scope:
      "A B2B marketing site and a 145-app patient-education dashboard, governed by a policy engine and licensed across 11 commercial bundles.",
    sectorTags: ["Digital Health", "B2B SaaS"],
    buildLabel: { glyph: "※", text: "Original Product" },
    liveUrl: "https://dashboard.interactivehealtheducation.com/",
  },
  {
    slug: "acexperts",
    year: "2025",
    title: "ACExperts251",
    scope:
      "A full-stack Next.js HVAC site with 8 city pages, 7 services, three interactive tools, and Google Sheets-backed lead capture.",
    sectorTags: ["HVAC", "Local SEO"],
    buildLabel: { glyph: "◆", text: "Original Build" },
    liveUrl: "https://acexperts251.com",
  },
  {
    slug: "collective-counseling",
    year: "2024",
    title: "Collective Counseling",
    scope:
      "A four-page therapy practice site with a dedicated adult ADHD testing page, real therapist photography, and Daphne-targeted local SEO.",
    sectorTags: ["Therapy", "ADHD Testing"],
    buildLabel: { glyph: "◆", text: "Original Build" },
    liveUrl: "https://collectivecounselingdaphne.com",
  },
  {
    slug: "blessed-barbershop",
    year: "2024",
    title: "Blessed Barbershop",
    scope:
      "A mobile-first barbershop site with WebP-optimized media, a service menu with pricing, and a frictionless booking link.",
    sectorTags: ["Barbershop", "Local SEO"],
    buildLabel: { glyph: "◆", text: "Original Build" },
    liveUrl: "https://www.blessedbarbershopdaphne.com",
  },
];

// Defensive: guard against projects added to lib/projects without a row entry.
const knownSlugs = new Set(rows.map((r) => r.slug));
projects.forEach((p) => {
  if (!knownSlugs.has(p.slug)) {
    rows.push({
      slug: p.slug,
      year: "—",
      title: p.title,
      scope: p.shortSummary,
      sectorTags: p.tags.slice(0, 2),
      buildLabel: { glyph: "◆", text: "Original Build" },
      liveUrl: p.liveUrl,
    });
  }
});

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
          Six projects<br />
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
          A transparent record of the sites and platforms I’ve built — with honest labels, real
          scope, and real market valuations on each. Click into a project for the full case study.
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
          {rows.map((r) => (
            <Link
              key={r.slug}
              href={`/work/${r.slug}`}
              className="work-row"
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
                  {r.buildLabel.text}
                </span>
              </div>
            </Link>
          ))}
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
            Every project page contains a market valuation tier — what an agency, a senior
            independent, and a generalist would charge for the same scope — and a written rationale
            for why the work is worth the price. The intent is to make a normally opaque conversation
            transparent.
          </p>
          <div style={{ marginTop: "32px" }}>
            <Link href="/review" className="editorial-link arrow-link mono">
              Request a Website Review <span className="arrow" aria-hidden>→</span>
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
