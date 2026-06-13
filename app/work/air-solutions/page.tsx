import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getProjectBySlug, projects } from "@/lib/projects";
import { siteConfig } from "@/lib/site-config";

// Essay sub-components
import EssayHero from "@/components/case-study-essay/EssayHero";
import EssayBrief from "@/components/case-study-essay/EssayBrief";
import ArchitectureDiagram from "@/components/case-study-essay/ArchitectureDiagram";
import FeaturesGrid from "@/components/case-study-essay/FeaturesGrid";
import ScreenshotSpread from "@/components/case-study-essay/ScreenshotSpread";
import EssayWhyItWorks from "@/components/case-study-essay/EssayWhyItWorks";
import EssayOutcome from "@/components/case-study-essay/EssayOutcome";
import EssayReveal from "@/components/case-study-essay/EssayReveal";
import ScrollProgressRule from "@/components/case-study-essay/ScrollProgressRule";
import CurrentlyReading from "@/components/case-study-essay/CurrentlyReading";

export const metadata: Metadata = {
  title: "Air Solutions Heating & Cooling — Case Study",
  description:
    "A 345-page programmatic SEO platform for an HVAC contractor in Baldwin County, Alabama — now live on airsolutionspros.com. A city × service matrix, Three.js diagnostic tool, NWS hurricane alert integration, and a 9-type Schema.org architecture.",
  alternates: { canonical: "/work/air-solutions" },
  openGraph: {
    title: "Air Solutions Heating & Cooling | Campbell Digital Studio",
    description:
      "345 live pages. 4 custom interactive tools. 9 Schema.org types. Live on airsolutionspros.com — the strongest technical local-search platform in Baldwin County HVAC.",
    url: "/work/air-solutions",
    images: [{ url: "/images/case-studies/covers/air-solutions-live-1-hero.png" }],
  },
};

function getBreadcrumbSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: siteConfig.name, item: siteConfig.url },
      { "@type": "ListItem", position: 2, name: "Work", item: `${siteConfig.url.replace(/\/$/, "")}/work` },
      {
        "@type": "ListItem",
        position: 3,
        name: "Air Solutions Heating & Cooling",
        item: `${siteConfig.url.replace(/\/$/, "")}/work/air-solutions`,
      },
    ],
  };
}

export default function AirSolutionsCaseStudy() {
  const project = getProjectBySlug("air-solutions");
  if (!project) notFound();

  // Prev / next navigation — wrap around the full projects array
  const idx = projects.findIndex((p) => p.slug === "air-solutions");
  const prev = projects[(idx - 1 + projects.length) % projects.length];
  const next = projects[(idx + 1) % projects.length];

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(getBreadcrumbSchema()) }}
      />

      {/* Scroll progress rule — fixed at top of viewport */}
      <ScrollProgressRule />

      {/* Currently reading — fixed corner indicator */}
      <CurrentlyReading />

      {/* ── §01 Hero spread ── */}
      <EssayHero project={project} />

      {/* ── §02 The Brief ── */}
      <EssayBrief project={project} />

      {/* ── §03 Architecture diagram ── */}
      <ArchitectureDiagram />

      {/* ── §04 What Was Built — features grid ── */}
      <FeaturesGrid features={project.features} whatIBuilt={project.whatIBuilt} />

      {/* ── §05 Screenshots gallery ── */}
      <ScreenshotSpread screenshots={project.screenshots} />

      {/* ── §06 Why It Works — two-column + pullquote ── */}
      <EssayWhyItWorks project={project} />

      {/* ── §07 Outcome — data grid ── */}
      <EssayOutcome metaGrid={project.metaGrid} />

      {/* ── Closing CTA + nav ── */}
      <EssayReveal>
        <section
          style={{
            padding: "clamp(64px, 10vw, 112px) 0",
            borderTop: "1px solid var(--border-subtle)",
            background: "var(--panel)",
          }}
        >
          <div className="section-wrap">
            {/* CTA */}
            <div style={{ marginBottom: "clamp(48px, 6vw, 80px)" }}>
              <div
                style={{
                  fontFamily: "var(--font-geist-mono), ui-monospace, monospace",
                  fontSize: "10px",
                  fontWeight: 600,
                  letterSpacing: "0.2em",
                  textTransform: "uppercase",
                  color: "var(--copper)",
                  marginBottom: "24px",
                }}
              >
                Inquire
              </div>
              <h2
                className="editorial-h2"
                style={{ marginBottom: "24px", maxWidth: "20ch" }}
              >
                Ship a platform like this<br />
                <em>for your market.</em>
              </h2>
              <p
                style={{
                  fontFamily: "var(--font-geist-sans), system-ui, sans-serif",
                  fontSize: "clamp(16px, 1.3vw, 18px)",
                  lineHeight: 1.65,
                  color: "var(--ink-2)",
                  maxWidth: "52ch",
                  marginBottom: "32px",
                }}
              >
                The same programmatic SEO architecture — cities × services matrix,
                custom interactive tools, Schema.org infrastructure — works for any
                multi-location service business with a county-level footprint.
              </p>
              <div style={{ display: "flex", gap: "16px", flexWrap: "wrap" }}>
                <Link href="/inquire" className="btn-fill">
                  Inquire about a similar project
                </Link>
                <Link href="/call" className="btn-ghost">
                  Book a 20-min intro
                </Link>
              </div>
            </div>

            {/* Prev / next nav */}
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: "1px",
                background: "var(--border-default)",
                border: "1px solid var(--border-default)",
                borderRadius: "8px",
                overflow: "hidden",
              }}
            >
              {prev ? (
                <Link
                  href={`/work/${prev.slug}`}
                  style={{
                    display: "block",
                    padding: "28px 28px",
                    textDecoration: "none",
                    color: "inherit",
                    background: "var(--surface)",
                    transition: "background 0.2s ease",
                  }}
                >
                  <div
                    style={{
                      fontFamily: "var(--font-geist-mono), ui-monospace, monospace",
                      fontSize: "10px",
                      letterSpacing: "0.16em",
                      textTransform: "uppercase",
                      color: "var(--ink-3)",
                      marginBottom: "10px",
                    }}
                  >
                    ← Previous
                  </div>
                  <div
                    style={{
                      fontFamily: "var(--font-geist-sans), system-ui, sans-serif",
                      fontSize: "clamp(16px, 1.6vw, 20px)",
                      fontWeight: 500,
                      color: "var(--ink-1)",
                      letterSpacing: "-0.018em",
                      lineHeight: 1.2,
                    }}
                  >
                    {prev.title}
                  </div>
                  <div
                    style={{
                      marginTop: "6px",
                      fontFamily: "var(--font-geist-mono), ui-monospace, monospace",
                      fontSize: "10px",
                      letterSpacing: "0.12em",
                      textTransform: "uppercase",
                      color: "var(--ink-4)",
                    }}
                  >
                    {prev.category}
                  </div>
                </Link>
              ) : (
                <div />
              )}

              {next ? (
                <Link
                  href={`/work/${next.slug}`}
                  style={{
                    display: "block",
                    padding: "28px 28px",
                    textDecoration: "none",
                    color: "inherit",
                    background: "var(--surface)",
                    textAlign: "right",
                    transition: "background 0.2s ease",
                  }}
                >
                  <div
                    style={{
                      fontFamily: "var(--font-geist-mono), ui-monospace, monospace",
                      fontSize: "10px",
                      letterSpacing: "0.16em",
                      textTransform: "uppercase",
                      color: "var(--ink-3)",
                      marginBottom: "10px",
                    }}
                  >
                    Next →
                  </div>
                  <div
                    style={{
                      fontFamily: "var(--font-geist-sans), system-ui, sans-serif",
                      fontSize: "clamp(16px, 1.6vw, 20px)",
                      fontWeight: 500,
                      color: "var(--ink-1)",
                      letterSpacing: "-0.018em",
                      lineHeight: 1.2,
                    }}
                  >
                    {next.title}
                  </div>
                  <div
                    style={{
                      marginTop: "6px",
                      fontFamily: "var(--font-geist-mono), ui-monospace, monospace",
                      fontSize: "10px",
                      letterSpacing: "0.12em",
                      textTransform: "uppercase",
                      color: "var(--ink-4)",
                    }}
                  >
                    {next.category}
                  </div>
                </Link>
              ) : (
                <div />
              )}
            </div>
          </div>
        </section>
      </EssayReveal>
    </>
  );
}
