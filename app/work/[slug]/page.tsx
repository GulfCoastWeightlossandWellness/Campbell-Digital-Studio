import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { projects, getProjectBySlug } from "@/lib/projects";
import SectionTag from "@/components/editorial/SectionTag";
import EditorialH2 from "@/components/editorial/EditorialH2";
import Eyebrow from "@/components/editorial/Eyebrow";
import Pullquote from "@/components/editorial/Pullquote";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  // Only featured projects render at full case-study depth; the rest redirect
  // to the /work index via next.config.ts.
  return projects.filter((p) => p.featured).map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const project = getProjectBySlug(slug);
  if (!project) return {};
  return {
    title: project.title,
    description: project.shortSummary,
    openGraph: {
      title: `${project.title} | Campbell Digital Studio`,
      description: project.shortSummary,
      images: project.coverImage ? [{ url: project.coverImage }] : undefined,
    },
  };
}

const projectYears: Record<string, string> = {
  "air-solutions": "2026",
  revitalize: "2026",
};

const projectStatus: Record<string, string> = {
  "air-solutions": "Live",
  revitalize: "Live",
};

const projectHosting: Record<string, string> = {
  "air-solutions": "Vercel · Vercel Cron · Cloudflare Turnstile · Resend",
  revitalize: "Vercel",
};

export default async function CaseStudyPage({ params }: Props) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);
  if (!project) notFound();

  const year = projectYears[slug] ?? "—";

  // next / previous within the featured set only
  const featured = projects.filter((p) => p.featured);
  const idx = featured.findIndex((p) => p.slug === project.slug);
  const prev = idx > 0 ? featured[idx - 1] : null;
  const next = idx < featured.length - 1 ? featured[idx + 1] : null;

  const featuredScreens = project.screenshotLabels.slice(0, 6).map((label, i) => ({
    label,
    image: project.screenshotImages?.[i],
  }));

  return (
    <>
      {/* ─── Hero (paper) ─────────────────────────────────────────── */}
      <section className="section-wrap" style={{ paddingTop: "clamp(96px, 14vw, 160px)", paddingBottom: "clamp(48px, 6vw, 72px)" }}>
        <Eyebrow>
          § Case Study / {project.category}
        </Eyebrow>
        <h1
          className="display-serif"
          style={{
            fontSize: "clamp(40px, 6.5vw, 80px)",
            color: "var(--navy-900)",
            maxWidth: "20ch",
            marginBottom: "32px",
          }}
        >
          {project.title}.
        </h1>
        <p
          className="reading-col"
          style={{
            fontFamily: "var(--font-fraunces), Georgia, serif",
            fontSize: "21px",
            lineHeight: 1.6,
            color: "var(--ink-soft)",
            fontVariationSettings: '"opsz" 24',
            fontStyle: "italic",
            fontWeight: 300,
          }}
        >
          {project.shortSummary}
        </p>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(4, 1fr)",
            gap: "0",
            border: "1px solid var(--paper-rule)",
            background: "var(--surface)",
            marginTop: "48px",
          }}
          className="brief-meta"
        >
          {[
            { label: "Sector", value: project.category.split(/[/·]/)[0].trim() },
            { label: "Year", value: year },
            { label: "Stack", value: project.stack.split(",")[0].trim() },
            {
              label: "Status",
              value: projectStatus[slug] ?? "Production",
            },
          ].map((m) => (
            <div
              key={m.label}
              style={{
                padding: "20px 22px",
                borderRight: "1px solid var(--paper-rule)",
              }}
              className="brief-cell"
            >
              <div
                style={{
                  fontFamily: "var(--font-jetbrains), monospace",
                  fontSize: "10px",
                  letterSpacing: "0.18em",
                  textTransform: "uppercase",
                  color: "var(--gold-700)",
                  marginBottom: "6px",
                  fontWeight: 600,
                }}
              >
                {m.label}
              </div>
              <div
                style={{
                  fontFamily: "var(--font-fraunces), Georgia, serif",
                  fontSize: "16px",
                  fontWeight: 500,
                  color: "var(--navy-900)",
                  lineHeight: 1.3,
                  fontVariationSettings: '"opsz" 24',
                }}
              >
                {m.value}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ─── Hero image ──────────────────────────────────────────── */}
      {project.coverImage ? (
        <section className="section-wrap" style={{ paddingBottom: "clamp(48px, 6vw, 80px)" }}>
          <div
            style={{
              position: "relative",
              width: "100%",
              aspectRatio: "16 / 9",
              border: "1px solid var(--paper-rule)",
              overflow: "hidden",
              background: "var(--paper-sand)",
            }}
          >
            <Image
              src={project.coverImage}
              alt={`${project.title} — cover screen`}
              fill
              priority
              sizes="(max-width: 1280px) 100vw, 1280px"
              style={{ objectFit: "cover" }}
            />
          </div>
          <p className="mono-caption" style={{ marginTop: "12px", textAlign: "right" }}>
            fig. 01 — {project.screenshotLabels[0]}
          </p>
        </section>
      ) : null}

      {/* ─── § 01 / Brief ────────────────────────────────────────── */}
      <section className="section-wrap section-block-tight">
        <SectionTag num="01" label="The Brief" />
        <EditorialH2>
          What the project<br />
          <em>needed to do.</em>
        </EditorialH2>

        <div className="editorial-body reading-col" style={{ marginTop: "32px" }}>
          <p>{project.summary}</p>
          <p>{project.challenge}</p>
        </div>
      </section>

      {/* ─── § 02 / Selected screens ─────────────────────────────── */}
      {featuredScreens.length > 0 ? (
        <section className="section-wrap section-block-tight">
          <SectionTag num="02" label="Selected Screens" />
          <EditorialH2>
            What it looks like,<br />
            <em>on screen.</em>
          </EditorialH2>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr",
              gap: "48px",
              marginTop: "48px",
            }}
          >
            {featuredScreens.map((s, i) => (
              <figure key={s.label} style={{ margin: 0 }}>
                <div
                  style={{
                    position: "relative",
                    width: "100%",
                    aspectRatio: "16 / 10",
                    border: "1px solid var(--paper-rule)",
                    overflow: "hidden",
                    background: "var(--paper-sand)",
                  }}
                >
                  {s.image ? (
                    <Image
                      src={s.image}
                      alt={s.label}
                      fill
                      sizes="(max-width: 1280px) 100vw, 1280px"
                      style={{ objectFit: "cover" }}
                    />
                  ) : null}
                </div>
                <figcaption className="mono-caption" style={{ marginTop: "12px" }}>
                  fig. {String(i + 2).padStart(2, "0")} — {s.label}
                </figcaption>
              </figure>
            ))}
          </div>
        </section>
      ) : null}

      {/* ─── § 03 / What was built ───────────────────────────────── */}
      <section className="section-wrap section-block-tight">
        <SectionTag num="03" label="What Was Built" />
        <EditorialH2>
          The deliverables,<br />
          <em>line by line.</em>
        </EditorialH2>

        <div className="editorial-body reading-col" style={{ marginTop: "32px" }}>
          <p>{project.whatIBuilt}</p>
        </div>

        <div style={{ marginTop: "48px" }}>
          <div
            style={{
              fontFamily: "var(--font-jetbrains), monospace",
              fontSize: "10px",
              letterSpacing: "0.2em",
              textTransform: "uppercase",
              color: "var(--gold-700)",
              fontWeight: 600,
              marginBottom: "20px",
              paddingBottom: "10px",
              borderBottom: "1px solid var(--paper-rule)",
            }}
          >
            Deliverables
          </div>
          <ul
            style={{
              listStyle: "none",
              padding: 0,
              margin: 0,
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
              columnGap: "48px",
              rowGap: "0",
            }}
          >
            {project.features.map((feature) => (
              <li
                key={feature}
                style={{
                  position: "relative",
                  padding: "10px 0 10px 22px",
                  fontFamily: "var(--font-manrope), sans-serif",
                  fontSize: "14.5px",
                  lineHeight: 1.6,
                  color: "var(--ink-soft)",
                  borderBottom: "1px solid var(--paper-rule)",
                }}
              >
                <span
                  aria-hidden
                  style={{
                    position: "absolute",
                    left: 0,
                    top: "20px",
                    width: "12px",
                    height: "1px",
                    background: "var(--gold-600)",
                  }}
                />
                {feature}
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* ─── § 04 / SEO + value (prose) ─────────────────────────── */}
      <section style={{ background: "var(--surface)", borderTop: "1px solid var(--paper-rule)", borderBottom: "1px solid var(--paper-rule)" }}>
        <div className="section-wrap section-block-tight">
          <SectionTag num="04" label="Why It Works" />
          <EditorialH2>
            How the build<br />
            <em>earns the call.</em>
          </EditorialH2>

          <div className="editorial-body reading-col" style={{ marginTop: "32px" }}>
            <p>{project.seoConversion}</p>
            <p>{project.businessValue}</p>
          </div>

          <div style={{ marginTop: "56px", maxWidth: "820px" }}>
            <Pullquote>
              {project.valueExplainer}
              <span className="attr">Studio rationale</span>
            </Pullquote>
          </div>
        </div>
      </section>

      {/* ─── § 05 / Stack & artifacts ────────────────────────────── */}
      <section className="section-wrap section-block-tight">
        <SectionTag num="05" label="Stack &amp; Artifacts" />

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
            gap: "0",
            border: "1px solid var(--paper-rule)",
            background: "var(--surface)",
            marginTop: "32px",
          }}
        >
          {[
            { label: "Stack", value: project.stack },
            { label: "Hosting", value: projectHosting[slug] ?? "Vercel" },
            { label: "Launched", value: year },
            { label: "Status", value: projectStatus[slug] ?? "Production" },
          ].map((m, i, arr) => (
            <div
              key={m.label}
              style={{
                padding: "22px 24px",
                borderRight: i < arr.length - 1 ? "1px solid var(--paper-rule)" : "none",
              }}
            >
              <div
                style={{
                  fontFamily: "var(--font-jetbrains), monospace",
                  fontSize: "10px",
                  letterSpacing: "0.18em",
                  textTransform: "uppercase",
                  color: "var(--gold-700)",
                  marginBottom: "8px",
                  fontWeight: 600,
                }}
              >
                {m.label}
              </div>
              <div
                style={{
                  fontFamily: "var(--font-manrope), sans-serif",
                  fontSize: "13.5px",
                  lineHeight: 1.55,
                  color: "var(--ink-soft)",
                }}
              >
                {m.value}
              </div>
            </div>
          ))}
        </div>

        {project.liveUrl ? (
          <div style={{ marginTop: "32px" }}>
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="editorial-link arrow-link mono"
            >
              Visit live project <span className="arrow" aria-hidden>↗</span>
            </a>
          </div>
        ) : null}
      </section>

      {/* ─── § 06 / Outcome ──────────────────────────────────────── */}
      <section className="section-wrap section-block-tight">
        <SectionTag num="06" label="Outcome" />
        <EditorialH2 className="reading-col">
          Metrics, captured<br />
          <em>at 30 / 60 / 90 days.</em>
        </EditorialH2>

        <div className="editorial-body reading-col" style={{ marginTop: "32px" }}>
          <p>
            Outcome reporting for this engagement is captured at 30, 60, and 90 days post-launch
            via Google Search Console and GA4. Reported metrics will appear here once the
            measurement window closes.
          </p>
        </div>

        {project.slug === "revitalize" ? (
          <div
            className="reading-col"
            style={{
              marginTop: "32px",
              padding: "24px 28px",
              border: "1px dashed var(--paper-rule)",
              background: "var(--surface)",
              fontFamily: "var(--font-jetbrains), monospace",
              fontSize: "11px",
              letterSpacing: "0.14em",
              textTransform: "uppercase",
              color: "var(--ink-mute)",
              lineHeight: 1.6,
            }}
          >
            [ Client testimonial pending — to be added with approval from Revitalize. ]
          </div>
        ) : null}
      </section>

      {/* ─── § 07 / Prev / Next ──────────────────────────────────── */}
      <section
        style={{
          borderTop: "1px solid var(--paper-rule)",
          borderBottom: "1px solid var(--paper-rule)",
          background: "var(--surface)",
          marginTop: "clamp(48px, 6vw, 96px)",
        }}
      >
        <div
          className="section-wrap"
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "0",
            paddingTop: 0,
            paddingBottom: 0,
          }}
        >
          {prev ? (
            <Link
              href={`/work/${prev.slug}`}
              className="prev-next-cell"
              style={{
                padding: "40px clamp(20px, 5vw, 60px)",
                borderRight: "1px solid var(--paper-rule)",
                textDecoration: "none",
                color: "inherit",
                display: "block",
                transition: "background 0.2s",
              }}
            >
              <span
                className="mono-caption"
                style={{ display: "block", marginBottom: "10px", color: "var(--ink-mute)" }}
              >
                ← Previous
              </span>
              <h4
                style={{
                  fontFamily: "var(--font-fraunces), Georgia, serif",
                  fontSize: "24px",
                  fontWeight: 500,
                  color: "var(--navy-900)",
                  letterSpacing: "-0.015em",
                  fontVariationSettings: '"opsz" 96',
                  lineHeight: 1.2,
                }}
              >
                {prev.title}
              </h4>
            </Link>
          ) : (
            <div />
          )}
          {next ? (
            <Link
              href={`/work/${next.slug}`}
              className="prev-next-cell"
              style={{
                padding: "40px clamp(20px, 5vw, 60px)",
                textDecoration: "none",
                color: "inherit",
                display: "block",
                textAlign: "right",
                transition: "background 0.2s",
              }}
            >
              <span
                className="mono-caption"
                style={{ display: "block", marginBottom: "10px", color: "var(--ink-mute)" }}
              >
                Next →
              </span>
              <h4
                style={{
                  fontFamily: "var(--font-fraunces), Georgia, serif",
                  fontSize: "24px",
                  fontWeight: 500,
                  color: "var(--navy-900)",
                  letterSpacing: "-0.015em",
                  fontVariationSettings: '"opsz" 96',
                  lineHeight: 1.2,
                }}
              >
                {next.title}
              </h4>
            </Link>
          ) : (
            <div />
          )}
        </div>
      </section>

      <style>{`
        .prev-next-cell:hover { background: var(--paper-sand); }
        @media (max-width: 720px) {
          .brief-meta { grid-template-columns: 1fr 1fr !important; }
          .brief-cell:nth-child(2n) { border-right: none !important; }
          .brief-cell:nth-child(-n+2) { border-bottom: 1px solid var(--paper-rule); }
        }
      `}</style>
    </>
  );
}
