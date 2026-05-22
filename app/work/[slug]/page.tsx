import { existsSync } from "node:fs";
import path from "node:path";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { projects, getProjectBySlug, type Project } from "@/lib/projects";
import PageIntro from "@/components/editorial/PageIntro";
import SectionTag from "@/components/editorial/SectionTag";
import EditorialH2 from "@/components/editorial/EditorialH2";
import Pullquote from "@/components/editorial/Pullquote";
import Cadence from "@/components/editorial/Cadence";
import MetaGrid from "@/components/case-study/MetaGrid";
import CaseStudyNav from "@/components/case-study/CaseStudyNav";
import DeviceFrame from "@/components/case-study/DeviceFrame";
import CaseStudyResults from "@/components/sections/CaseStudyResults";
import TestimonialBlock from "@/components/sections/TestimonialBlock";
import { getTestimonialForSlug } from "@/lib/data/testimonials";
import { getResultsForSlug } from "@/lib/data/results";
import { siteConfig } from "@/lib/site-config";
import { displayDomain, isRealDomain } from "@/lib/url-display";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const project = getProjectBySlug(slug);
  if (!project) return {};
  return {
    title: project.title,
    description: project.shortSummary,
    alternates: { canonical: `/work/${slug}` },
    openGraph: {
      title: `${project.title} | Campbell Digital Studio`,
      description: project.shortSummary,
      url: `/work/${slug}`,
      images: project.coverImage ? [{ url: project.coverImage }] : undefined,
    },
  };
}

function getCaseStudyBreadcrumbSchema(title: string, slug: string) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: siteConfig.name,
        item: siteConfig.url,
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Work",
        item: `${siteConfig.url.replace(/\/$/, "")}/work`,
      },
      {
        "@type": "ListItem",
        position: 3,
        name: title,
        item: `${siteConfig.url.replace(/\/$/, "")}/work/${slug}`,
      },
    ],
  };
}

/**
 * Per-slug overrides. The Project type may not yet carry these fields directly
 * (Agent 3 is rewriting lib/projects.ts); these maps act as a safe fallback
 * source so the template renders cleanly today and starts pulling from the
 * project record itself once the new shape lands.
 */
const projectYears: Record<string, string> = {
  "air-solutions": "2026",
  revitalize: "2026",
  acexperts: "2025",
  "collective-counseling": "2025",
  "blessed-barbershop": "2024",
};

const projectStatus: Record<string, string> = {
  "air-solutions": "Live · Active retainer",
  revitalize: "Live · Active retainer",
  acexperts: "Live · Active retainer",
  "collective-counseling": "Shipped",
  "blessed-barbershop": "Shipped",
};

const projectHosting: Record<string, string> = {
  "air-solutions": "Vercel · Vercel Cron · Cloudflare Turnstile · Resend",
  revitalize: "Vercel",
  acexperts: "Vercel · Cloudflare Turnstile · Google Sheets API",
  "collective-counseling": "Vercel",
  "blessed-barbershop": "Cloudflare",
};

/** Slugs whose Selected Screens render as a 3-up phone triptych (mobile-first). */
const triptychSlugs = new Set<string>(["blessed-barbershop"]);

/** Choose a DeviceFrame variant per screenshot row. */
function frameVariantFor(slug: string, screenLabel: string): "laptop" | "phone" | "browser" {
  if (triptychSlugs.has(slug)) return "phone";
  const lower = screenLabel.toLowerCase();
  if (lower.includes("mobile") || lower.includes("sticky")) return "phone";
  if (lower.includes("homepage") || lower.includes("hero")) return "browser";
  return "laptop";
}

/**
 * Optional-field reader. Tolerates Project rewrites by Agent 3 — if the new
 * shape adds `year`, `status`, `hosting`, `tier`, `industry`, etc., this
 * returns them; otherwise falls back to the per-slug map or "—".
 */
function readField(project: Project, key: string, fallback: string): string {
  const value = (project as unknown as Record<string, unknown>)[key];
  if (typeof value === "string" && value.trim().length > 0) return value;
  return fallback;
}

export default async function CaseStudyPage({ params }: Props) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);
  if (!project) notFound();

  const year = readField(project, "year", projectYears[slug] ?? "—");
  const status = readField(project, "status", projectStatus[slug] ?? "Production");
  const hosting = readField(project, "hosting", projectHosting[slug] ?? "Vercel");

  // CaseStudyNav loops through ALL projects (continuous wrap-around, not just featured).
  const idx = projects.findIndex((p) => p.slug === project.slug);
  const prev = projects[(idx - 1 + projects.length) % projects.length];
  const next = projects[(idx + 1) % projects.length];

  // 10–12 screens — render whatever the project has (don't pad with empty cells).
  const allScreens = (project.screenshotLabels ?? [])
    .map((label, i) => ({ label, image: project.screenshotImages?.[i] }))
    .filter((s) => Boolean(s.image))
    .slice(0, 12);

  const isTriptych = triptychSlugs.has(slug);
  const results = getResultsForSlug(slug);
  const testimonial = getTestimonialForSlug(slug);

  // Cover demo video — check at build time; fall back to static cover if absent.
  const demoVideoPath = `/videos/case-studies/${slug}-demo.mp4`;
  const demoVideoExists = existsSync(path.join(process.cwd(), "public", demoVideoPath));

  const heroMeta = [
    { label: "Sector", value: project.category.split(/[/·]/)[0].trim() },
    { label: "Year", value: year },
    { label: "Stack", value: project.stack.split(",")[0].trim() },
    { label: "Status", value: status },
  ];

  const stackMeta = [
    { label: "Stack", value: project.stack },
    { label: "Hosting", value: hosting },
    { label: "Launched", value: year },
    { label: "Status", value: status },
  ];

  // Scope-at-a-glance fallback when no real Results have been captured yet.
  const scopeCells = [
    {
      label: "Pages shipped",
      value: project.features.length > 0 ? `${project.features.length}+` : "—",
      detail: "Counted from deliverables",
    },
    {
      label: "Screens documented",
      value: String(allScreens.length || project.screenshotLabels.length || 0),
      detail: "Selected screens below",
    },
    {
      label: "Custom tools",
      value: String(
        project.features.filter((f) =>
          /calculator|quiz|tool|explorer|assessment|finder|3d/i.test(f),
        ).length,
      ),
      detail: "Interactive, in-house built",
    },
  ];

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(getCaseStudyBreadcrumbSchema(project.title, project.slug)),
        }}
      />

      {/* ── PageIntro ──────────────────────────────────────────────── */}
      <PageIntro
        eyebrow={`Case study / ${project.category}`}
        titleScale="display-80"
        className="page-intro--case-study"
      >
        {project.title}.
      </PageIntro>

      <section
        className="section-wrap"
        style={{ paddingTop: 0, paddingBottom: "clamp(48px, 6vw, 72px)" }}
      >
        <p className="case-study-lead reading-col">{project.shortSummary}</p>
        <MetaGrid items={heroMeta} />
      </section>

      {/* ── Cover (fig. 01) — video w/ static fallback ─────────────── */}
      {project.coverImage ? (
        <section
          className="section-wrap"
          style={{ paddingBottom: "clamp(48px, 6vw, 80px)" }}
        >
          <div className="case-study-cover">
            {demoVideoExists ? (
              <video
                className="case-study-cover__video"
                autoPlay
                muted
                loop
                playsInline
                preload="metadata"
                poster={project.coverImage}
                aria-label={`${project.title} — looping demo of one key interaction`}
                style={{
                  position: "absolute",
                  inset: 0,
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                }}
              >
                <source src={demoVideoPath} type="video/mp4" />
              </video>
            ) : (
              <Image
                src={project.coverImage}
                alt={`${project.title} — cover screen`}
                fill
                priority
                sizes="(max-width: 1280px) 100vw, 1280px"
                style={{ objectFit: "cover" }}
              />
            )}
          </div>
          <p className="mono-caption case-study-cover__caption">
            fig. 01 — {project.screenshotLabels[0] ?? project.title}
          </p>
        </section>
      ) : null}

      {/* ── §01 Results (lead with proof) ──────────────────────────── */}
      {results.length > 0 ? (
        <CaseStudyResults slug={slug} sectionNum="01" />
      ) : (
        <section className="section-wrap section-block-tight">
          <SectionTag num="01" label="Scope at a glance" />
          <EditorialH2>
            What the build<br />
            <em>actually covers.</em>
          </EditorialH2>
          <div style={{ marginTop: "32px" }}>
            <Cadence cells={scopeCells} />
          </div>
          <p
            className="mono-caption"
            style={{ marginTop: "16px", color: "var(--ink-3)" }}
          >
            Measurement window pending — see §08 for the 30/60/90 reporting plan.
          </p>
        </section>
      )}

      {/* ── §02 The Brief ──────────────────────────────────────────── */}
      <section className="section-wrap section-block-tight">
        <SectionTag num="02" label="The Brief" />
        <EditorialH2>
          What the project<br />
          <em>needed to do.</em>
        </EditorialH2>
        <div
          className="editorial-body reading-col"
          style={{ marginTop: "32px" }}
        >
          <p>{project.summary}</p>
          <p>{project.challenge}</p>
        </div>
        {project.valuePoints[0] ? (
          <div style={{ marginTop: "40px", maxWidth: "820px" }}>
            <Pullquote>
              {project.valuePoints[0]}
              <span className="attr">What moved the needle</span>
            </Pullquote>
          </div>
        ) : null}
      </section>

      {/* ── §03 Selected Screens (10–12, mixed layouts) ────────────── */}
      {allScreens.length > 0 ? (
        <section className="section-wrap section-block-tight">
          <SectionTag num="03" label="Selected Screens" />
          <EditorialH2>
            What it looks like,<br />
            <em>on screen.</em>
          </EditorialH2>

          {isTriptych ? (
            <div
              className="case-study-screens case-study-screens--triptych"
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(3, 1fr)",
                gap: "24px",
                marginTop: "48px",
              }}
            >
              {allScreens.map((s, i) => (
                <figure key={s.label} style={{ margin: 0 }}>
                  <DeviceFrame variant="phone">
                    {s.image ? (
                      <Image
                        src={s.image}
                        alt={s.label}
                        fill
                        sizes="(max-width: 768px) 100vw, 33vw"
                        style={{ objectFit: "cover" }}
                      />
                    ) : null}
                  </DeviceFrame>
                  <figcaption
                    className="mono-caption"
                    style={{ marginTop: "12px" }}
                  >
                    fig. {String(i + 2).padStart(2, "0")} — {s.label}
                  </figcaption>
                </figure>
              ))}
            </div>
          ) : (
            <div className="case-study-screens">
              {allScreens.map((s, i) => {
                // Rhythm: wide → inset → wide → inset → triptych midway for variety.
                const inset = i % 2 === 1;
                const variant = frameVariantFor(slug, s.label);
                const sizes = inset
                  ? "(max-width: 768px) 100vw, min(920px, 92vw)"
                  : "(max-width: 1280px) 100vw, 1280px";
                return (
                  <figure
                    key={s.label}
                    style={{ margin: 0 }}
                    className={inset ? "case-study-screen--inset" : undefined}
                  >
                    <DeviceFrame variant={variant}>
                      {s.image ? (
                        <Image
                          src={s.image}
                          alt={s.label}
                          fill
                          sizes={sizes}
                          style={{ objectFit: "cover" }}
                        />
                      ) : null}
                    </DeviceFrame>
                    <figcaption
                      className="mono-caption"
                      style={{ marginTop: "12px" }}
                    >
                      fig. {String(i + 2).padStart(2, "0")} — {s.label}
                    </figcaption>
                  </figure>
                );
              })}
            </div>
          )}
        </section>
      ) : null}

      {/* ── §04 What Was Built ─────────────────────────────────────── */}
      <section className="section-wrap section-block-tight">
        <SectionTag num="04" label="What Was Built" />
        <EditorialH2>
          The deliverables,<br />
          <em>line by line.</em>
        </EditorialH2>
        <div
          className="editorial-body reading-col"
          style={{ marginTop: "32px" }}
        >
          <p>{project.whatIBuilt}</p>
        </div>
        <div style={{ marginTop: "48px" }}>
          <div className="list-section-label">Deliverables</div>
          <ul className="editorial-list editorial-list-grid">
            {project.features.map((feature) => (
              <li key={feature}>{feature}</li>
            ))}
          </ul>
        </div>
      </section>

      {/* ── §05 Why It Works ───────────────────────────────────────── */}
      <section className="panel-band">
        <div className="section-wrap section-block-tight">
          <SectionTag num="05" label="Why It Works" />
          <EditorialH2>
            How the build<br />
            <em>earns the call.</em>
          </EditorialH2>
          <div
            className="editorial-body reading-col"
            style={{ marginTop: "32px" }}
          >
            <p>{project.seoConversion}</p>
            <p>{project.businessValue}</p>
          </div>
          {project.valueExplainer ? (
            <div style={{ marginTop: "56px", maxWidth: "820px" }}>
              <Pullquote>
                {project.valueExplainer}
                <span className="attr">Studio rationale</span>
              </Pullquote>
            </div>
          ) : null}
        </div>
      </section>

      {/* ── §06 Stack & Artifacts ──────────────────────────────────── */}
      <section className="section-wrap section-block-tight">
        <SectionTag num="06" label="Stack &amp; Artifacts" />
        <MetaGrid items={stackMeta} className="meta-grid--stack" />
        <div
          className="case-study-artifacts"
          style={{
            marginTop: "32px",
            display: "flex",
            gap: "32px",
            flexWrap: "wrap",
          }}
        >
          {project.liveUrl ? (
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className={`editorial-link arrow-link ${
                isRealDomain(project.liveUrl) ? "copper" : "mono"
              }`}
            >
              Visit live: {displayDomain(project.liveUrl)}{" "}
              <span className="arrow" aria-hidden>↗</span>
            </a>
          ) : null}
          <a
            href={`/case-studies/${slug}.pdf`}
            target="_blank"
            rel="noopener noreferrer"
            className="editorial-link arrow-link mono"
          >
            Download one-pager (PDF){" "}
            <span className="arrow" aria-hidden>↓</span>
          </a>
        </div>
      </section>

      {/* ── §07 Client voice — only renders w/ real testimonial ────── */}
      {testimonial ? (
        <section className="section-wrap section-block-tight">
          <SectionTag num="07" label="Client voice" />
          <div style={{ marginTop: "32px" }}>
            <TestimonialBlock testimonial={testimonial} />
          </div>
        </section>
      ) : null}

      {/* ── §08 Outcome ────────────────────────────────────────────── */}
      <section className="section-wrap section-block-tight">
        <SectionTag num="08" label="Outcome" />
        <EditorialH2 className="reading-col">
          Metrics, captured<br />
          <em>at 30 / 60 / 90 days.</em>
        </EditorialH2>
        <div
          className="editorial-body reading-col"
          style={{ marginTop: "32px" }}
        >
          <p>
            Tracking dashboard captures GSC + GA4 at 30 / 60 / 90 days. Report
            publishes here on day 90 —{" "}
            <Link
              href="/inquire"
              className="editorial-link arrow-link copper"
            >
              view tracking spec <span className="arrow" aria-hidden>→</span>
            </Link>
          </p>
        </div>
      </section>

      {/* ── CTA row ────────────────────────────────────────────────── */}
      <section className="section-wrap section-block-tight">
        <div className="case-study-cta-row">
          <Link href="/inquire" className="btn-fill">
            Start a similar project
          </Link>
          <Link href="/call" className="btn-ghost">
            Book a 20-min intro
          </Link>
        </div>
      </section>

      {/* ── CaseStudyNav (loops continuously across all projects) ──── */}
      <CaseStudyNav prev={prev} next={next} />
    </>
  );
}
