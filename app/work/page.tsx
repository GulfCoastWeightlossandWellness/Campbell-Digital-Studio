"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, useReducedMotion } from "motion/react";
import PageIntro from "@/components/editorial/PageIntro";
import { projects, type Project } from "@/lib/projects";
import { displayDomain, isRealDomain } from "@/lib/url-display";
import { siteConfig, absoluteUrl } from "@/lib/site-config";

/* --------------------------------------------------------------------------
 * Local enrichment
 *
 * Spec assumes lib/projects.ts (Agent 3) exposes `tier`, `industry`, and
 * `coverImage` fields. The current lib still uses the older shape, so we
 * apply a per-slug enrichment lookup that the page can fall back to. If
 * Agent 3 lands the rewrite first, the project's own fields take priority.
 * ------------------------------------------------------------------------ */

type Tier = 1 | 2 | 3;
type Industry = "Healthcare" | "Local Services" | "Original Product";
type FilterKey = "all" | Industry;

type EnrichedProject = Project & {
  tier: Tier;
  industry: Industry;
  year: string;
  coverImage: string;
  /** Domain for the mono link under the CTA */
  liveUrl: string | null;
};

const ENRICH: Record<
  string,
  { tier: Tier; industry: Industry; year: string; coverImage: string }
> = {
  "air-solutions": {
    tier: 1,
    industry: "Local Services",
    year: "2026",
    coverImage: "/images/case-studies/covers/air-solutions-1-hero.png",
  },
  "pro-1-painters": {
    tier: 1,
    industry: "Local Services",
    year: "2026",
    coverImage: "/images/case-studies/covers/pro-1-1-hero.png",
  },
  revitalize: {
    tier: 1,
    industry: "Healthcare",
    year: "2026",
    coverImage: "/images/case-studies/covers/revitalize-1-hero.png",
  },
  "ihe-marketing": {
    tier: 2,
    industry: "Original Product",
    year: "2025",
    coverImage: "/images/case-studies/covers/ihe-marketing-1-hero.png",
  },
  "ihe-dashboard": {
    tier: 2,
    industry: "Original Product",
    year: "2025",
    coverImage: "/images/case-studies/covers/ihe-dashboard-1-home.png",
  },
  "interactive-health-education": {
    tier: 2,
    industry: "Original Product",
    year: "2025",
    coverImage: "/images/case-studies/covers/ihe-marketing-1-hero.png",
  },
  acexperts: {
    tier: 1,
    industry: "Local Services",
    year: "2026",
    coverImage: "/images/case-studies/covers/acexperts-1-hero.png",
  },
  "collective-counseling": {
    tier: 3,
    industry: "Healthcare",
    year: "2024",
    coverImage: "/images/case-studies/covers/collective-1-homepage-hero.png",
  },
  "blessed-barbershop": {
    tier: 3,
    industry: "Local Services",
    year: "2024",
    coverImage: "/images/case-studies/covers/blessed-1-hero.png",
  },
};

function tierGlyph(p: EnrichedProject): { glyph: string; label: string } {
  // Glyph rules from spec:
  //   ◆ Featured (Tier 1)
  //   ◇ Original Build (Tier 2/3 non-product)
  //   ▣ Original Product
  if (p.industry === "Original Product") return { glyph: "▣", label: "Original Product" };
  if (p.tier === 1) return { glyph: "◆", label: "Featured" };
  return { glyph: "◇", label: "Original Build" };
}

function tierHeight(tier: Tier): string {
  switch (tier) {
    case 1:
      return "90vh";
    case 2:
      return "70vh";
    case 3:
      return "60vh";
  }
}

function enrichProject(p: Project): EnrichedProject {
  // Prefer fields the project itself supplies (Agent 3 shape); fall back
  // to the local lookup for the older shape.
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const anyP = p as any;
  const fallback = ENRICH[p.slug];

  const tier: Tier = anyP.tier ?? fallback?.tier ?? (p.featured ? 1 : 3);
  const industry: Industry =
    anyP.industry ?? fallback?.industry ?? "Local Services";
  const year: string = anyP.year ?? fallback?.year ?? "2025";
  const coverImage: string =
    p.coverImage ?? fallback?.coverImage ?? "/images/case-studies/covers/air-solutions-1-hero.png";

  return {
    ...p,
    tier,
    industry,
    year,
    coverImage,
  };
}

const FILTERS: { key: FilterKey; label: string }[] = [
  { key: "all", label: "All" },
  { key: "Healthcare", label: "Healthcare" },
  { key: "Local Services", label: "Local services" },
  { key: "Original Product", label: "Original products" },
];

/* -------------------------------------------------------------------------- */

export default function WorkPage() {
  const reduceMotion = useReducedMotion();
  const [activeFilter, setActiveFilter] = useState<FilterKey>("all");

  const allEnriched = useMemo(
    () =>
      projects
        .map(enrichProject)
        .sort((a, b) => {
          // ACExperts leads as the flagship results story, regardless of tier/year.
          if (a.slug === "acexperts") return -1;
          if (b.slug === "acexperts") return 1;
          if (a.tier !== b.tier) return a.tier - b.tier;
          // newest within tier
          return b.year.localeCompare(a.year);
        }),
    [],
  );

  const totalCount = allEnriched.length;
  const industries = useMemo(
    () => new Set(allEnriched.map((p) => p.industry)).size,
    [allEnriched],
  );
  // Active retainers — derived from the registry's `status` field so the count
  // tracks the real lineup instead of a hand-maintained constant.
  const activeRetainers = useMemo(
    () => allEnriched.filter((p) => p.status === "Active Retainer").length,
    [allEnriched],
  );

  const filtered = useMemo(() => {
    if (activeFilter === "all") return allEnriched;
    return allEnriched.filter((p) => p.industry === activeFilter);
  }, [allEnriched, activeFilter]);

  // For the section divider: split tiers 1+2 from tier 3 *within the current filter*.
  const topTier = filtered.filter((p) => p.tier <= 2);
  const smallTier = filtered.filter((p) => p.tier === 3);

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: siteConfig.name, item: siteConfig.url },
      { "@type": "ListItem", position: 2, name: "Work", item: absoluteUrl("/work") },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />

      <PageIntro
        tagNum="§ Index"
        tagLabel="Selected Work"
        lead="A transparent record of the sites and platforms the studio has shipped — honest labels, real scope, every build accounted for."
      >
        {totalCount} projects<br />
        <em>the studio has shipped.</em>
      </PageIntro>

      {/* ── Studio at a glance ─────────────────────────────────────────── */}
      <section className="section-wrap" style={{ paddingTop: 8, paddingBottom: 24 }}>
        <p
          className="mono-caption"
          style={{
            fontSize: 12,
            letterSpacing: "0.16em",
            color: "var(--ink-2)",
          }}
        >
          {totalCount} projects shipped · {industries} industries · {activeRetainers} active retainers
        </p>
      </section>

      {/* ── Filter pills ───────────────────────────────────────────────── */}
      <section className="section-wrap" style={{ paddingTop: 8, paddingBottom: 24 }}>
        <div
          role="tablist"
          aria-label="Filter projects by industry"
          style={{
            display: "flex",
            flexWrap: "wrap",
            gap: 10,
            alignItems: "center",
          }}
        >
          {FILTERS.map((f) => {
            const active = activeFilter === f.key;
            return (
              <button
                key={f.key}
                role="tab"
                aria-selected={active}
                onClick={() => setActiveFilter(f.key)}
                className="mono"
                style={{
                  fontFamily:
                    "var(--font-geist-mono), ui-monospace, monospace",
                  fontSize: 11,
                  letterSpacing: "0.16em",
                  textTransform: "uppercase",
                  fontWeight: 600,
                  padding: "10px 16px",
                  borderRadius: 999,
                  border: active
                    ? "1px solid var(--copper)"
                    : "1px solid var(--border-default)",
                  background: active ? "var(--copper)" : "transparent",
                  color: active ? "var(--navy-900)" : "var(--ink-2)",
                  cursor: "pointer",
                  transition:
                    "background 0.2s var(--ease-snappy), color 0.2s var(--ease-snappy), border-color 0.2s var(--ease-snappy)",
                }}
              >
                {f.label}
              </button>
            );
          })}
        </div>
      </section>

      {/* ── Bands ──────────────────────────────────────────────────────── */}
      {filtered.length === 0 ? (
        <section className="section-wrap" style={{ paddingTop: 48, paddingBottom: 96 }}>
          <div className="reading-col">
            <p style={{ fontSize: 17, color: "var(--ink-2)", lineHeight: 1.6 }}>
              No projects in this category yet —{" "}
              <button
                onClick={() => setActiveFilter("all")}
                style={{
                  background: "none",
                  border: "none",
                  padding: 0,
                  color: "var(--copper)",
                  textDecoration: "underline",
                  cursor: "pointer",
                  font: "inherit",
                }}
              >
                view all {totalCount} shipped builds
              </button>
              .
            </p>
          </div>
        </section>
      ) : (
        <>
          {/* Top tier (1 + 2) */}
          {topTier.map((p, i) => (
            <ProjectBand
              key={p.slug}
              project={p}
              imageOnLeft={i % 2 === 0}
              index={i}
              reduceMotion={!!reduceMotion}
            />
          ))}

          {/* Divider — Tier 3 (only when there are tier-3 entries in current filter) */}
          {smallTier.length > 0 && (
            <section
              className="section-wrap"
              style={{
                paddingTop: 80,
                paddingBottom: 16,
              }}
            >
              <div
                style={{
                  borderTop: "1px solid var(--copper)",
                  paddingTop: 16,
                  opacity: 0.7,
                }}
              >
                <p
                  className="mono-caption"
                  style={{
                    fontSize: 11,
                    letterSpacing: "0.18em",
                    color: "var(--ink-3)",
                  }}
                >
                  Tier 3 — small builds, big polish
                </p>
              </div>
            </section>
          )}

          {smallTier.map((p, i) => (
            <ProjectBand
              key={p.slug}
              project={p}
              // Continue the alternating pattern across the divider so the
              // rhythm stays L/R/L/R across the whole page.
              imageOnLeft={(topTier.length + i) % 2 === 0}
              index={topTier.length + i}
              reduceMotion={!!reduceMotion}
            />
          ))}
        </>
      )}

      {/* ── Footer / pointer to /index ─────────────────────────────────── */}
      <section
        className="section-wrap section-block-tight"
        style={{ borderTop: "1px solid var(--border-subtle)", marginTop: 64 }}
      >
        <div className="reading-col">
          <p
            className="mono-caption"
            style={{
              fontSize: 11,
              letterSpacing: "0.18em",
              color: "var(--ink-3)",
              marginBottom: 12,
            }}
          >
            § Archive
          </p>
          <p
            style={{
              fontSize: 18,
              lineHeight: 1.55,
              color: "var(--ink-1)",
              marginBottom: 16,
            }}
          >
            View the studio&apos;s full index — 1,000+ pages, {totalCount} sites,
            18 months.
          </p>
          <Link
            href="/archive"
            className="editorial-link arrow-link mono"
            style={{ fontSize: 13 }}
          >
            /archive <span className="arrow" aria-hidden>→</span>
          </Link>
        </div>
      </section>
    </>
  );
}

/* -------------------------------------------------------------------------- */
/* Band                                                                       */
/* -------------------------------------------------------------------------- */

function ProjectBand({
  project,
  imageOnLeft,
  index,
  reduceMotion,
}: {
  project: EnrichedProject;
  imageOnLeft: boolean;
  index: number;
  reduceMotion: boolean;
}) {
  const [hover, setHover] = useState(false);
  const glyph = tierGlyph(project);
  const minH = tierHeight(project.tier);
  const liveReal = isRealDomain(project.liveUrl);
  const figLabel = project.screenshotLabels?.[0] ?? "Cover";

  const hasCaseStudy = project.featured === true || project.tier <= 2;
  const primaryHref = hasCaseStudy
    ? `/work/${project.slug}`
    : (project.liveUrl ?? `/work/${project.slug}`);
  const primaryExternal = !hasCaseStudy && project.liveUrl !== null;
  const primaryLabel = hasCaseStudy ? "Read case study →" : "Visit live ↗";

  // Filter tag pills — first 3
  const tagPills =
    project.filterTags && project.filterTags.length > 0
      ? project.filterTags.slice(0, 3)
      : project.tags.slice(0, 3);

  const imageMotion = reduceMotion
    ? { initial: false }
    : {
        initial: { y: 40, opacity: 0.6 },
        whileInView: { y: 0, opacity: 1 },
        viewport: { once: true, amount: 0.3 },
        transition: { duration: 0.7, ease: [0.3, 0, 0, 1] as const },
      };

  const copyMotion = reduceMotion
    ? { initial: false }
    : {
        initial: { opacity: 0, y: 16 },
        whileInView: { opacity: 1, y: 0 },
        viewport: { once: true, amount: 0.3 },
        transition: { duration: 0.5, delay: 0.1, ease: [0.3, 0, 0, 1] as const },
      };

  return (
    <section
      aria-labelledby={`band-${project.slug}`}
      style={{
        minHeight: minH,
        display: "flex",
        alignItems: "stretch",
        background: index % 2 === 0 ? "var(--canvas)" : "var(--panel)",
        borderTop: index === 0 ? "1px solid var(--border-subtle)" : "none",
      }}
    >
      <div
        className="section-wrap"
        style={{
          flex: 1,
          display: "grid",
          gridTemplateColumns: "1fr",
          alignItems: "center",
          padding: "clamp(48px, 7vw, 96px) clamp(20px, 5vw, 80px)",
          gap: "clamp(32px, 5vw, 64px)",
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: imageOnLeft ? "row" : "row-reverse",
            flexWrap: "wrap",
            gap: "clamp(32px, 5vw, 64px)",
            alignItems: "center",
          }}
        >
          {/* Image column */}
          <motion.div
            {...imageMotion}
            onMouseEnter={() => setHover(true)}
            onMouseLeave={() => setHover(false)}
            style={{
              flex: "1 1 480px",
              position: "relative",
              aspectRatio: "16 / 10",
              overflow: "hidden",
              borderRadius: 4,
              background: "var(--navy-900)",
              cursor: hasCaseStudy ? "pointer" : "default",
              isolation: "isolate",
            }}
          >
            <Link
              href={primaryHref}
              {...(primaryExternal
                ? { target: "_blank", rel: "noopener noreferrer" }
                : {})}
              aria-label={`${primaryLabel} for ${project.title}`}
              style={{
                position: "absolute",
                inset: 0,
                zIndex: 3,
                textIndent: "-9999px",
                overflow: "hidden",
              }}
            >
              {primaryLabel}
            </Link>

            <Image
              src={project.coverImage}
              alt={`${project.title} — ${figLabel}`}
              fill
              sizes="(max-width: 1024px) 100vw, 60vw"
              style={{
                objectFit: "cover",
                transform: hover && !reduceMotion ? "scale(1.03)" : "scale(1)",
                transition: "transform 600ms var(--ease-fluid)",
              }}
              priority={index < 2}
            />

            {/* Gold overlay on hover */}
            <div
              aria-hidden
              style={{
                position: "absolute",
                inset: 0,
                background: "var(--copper)",
                opacity: hover && !reduceMotion ? 0.08 : 0,
                transition: "opacity 400ms var(--ease-fluid)",
                pointerEvents: "none",
                zIndex: 1,
              }}
            />

            {/* Mono caption on hover */}
            <div
              aria-hidden
              style={{
                position: "absolute",
                left: 16,
                bottom: 16,
                padding: "6px 10px",
                background: "rgba(8, 23, 46, 0.78)",
                color: "var(--gold-300)",
                fontFamily:
                  "var(--font-geist-mono), ui-monospace, monospace",
                fontSize: 10,
                letterSpacing: "0.14em",
                textTransform: "uppercase",
                opacity: hover && !reduceMotion ? 1 : 0,
                transition: "opacity 300ms var(--ease-fluid)",
                pointerEvents: "none",
                zIndex: 2,
                maxWidth: "75%",
              }}
            >
              fig. {index + 1} — {figLabel}
            </div>
          </motion.div>

          {/* Copy column */}
          <motion.div
            {...copyMotion}
            style={{
              flex: "1 1 420px",
              position: "relative",
              display: "flex",
              flexDirection: "column",
              gap: 20,
            }}
          >
            {/* Year, top-right */}
            <div
              className="mono-caption"
              style={{
                position: "absolute",
                top: 0,
                right: 0,
                fontSize: 11,
                letterSpacing: "0.18em",
                color: "var(--ink-3)",
              }}
            >
              {project.year}
            </div>

            {/* Tier glyph + label */}
            <div
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 10,
                fontFamily:
                  "var(--font-geist-mono), ui-monospace, monospace",
                fontSize: 11,
                letterSpacing: "0.16em",
                textTransform: "uppercase",
                color: "var(--copper)",
                fontWeight: 600,
              }}
            >
              <span aria-hidden style={{ fontSize: 14 }}>
                {glyph.glyph}
              </span>
              {glyph.label}
            </div>

            {/* Title */}
            <h2
              id={`band-${project.slug}`}
              className="display-sans"
              style={{
                fontSize:
                  project.tier === 1
                    ? "clamp(36px, 5vw, 60px)"
                    : project.tier === 2
                      ? "clamp(30px, 4vw, 48px)"
                      : "clamp(26px, 3.4vw, 40px)",
                lineHeight: 1.05,
                letterSpacing: "-0.025em",
                color: "var(--ink-1)",
                margin: 0,
                fontWeight: 500,
              }}
            >
              {project.title}
            </h2>

            {/* Scope (1-sentence) */}
            <p
              style={{
                fontSize: project.tier === 1 ? 18 : 16,
                lineHeight: 1.55,
                color: "var(--ink-2)",
                maxWidth: "55ch",
                margin: 0,
              }}
            >
              {project.shortSummary || project.summary}
            </p>

            {/* Tag pills */}
            <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
              {tagPills.map((tag) => (
                <span
                  key={tag}
                  style={{
                    fontFamily:
                      "var(--font-geist-mono), ui-monospace, monospace",
                    fontSize: 10,
                    letterSpacing: "0.14em",
                    textTransform: "uppercase",
                    color: "var(--ink-3)",
                    padding: "5px 10px",
                    border: "1px solid var(--border-default)",
                    borderRadius: 999,
                  }}
                >
                  {tag}
                </span>
              ))}
            </div>

            {/* CTA + domain */}
            <div
              style={{
                marginTop: 8,
                display: "flex",
                flexDirection: "column",
                gap: 10,
              }}
            >
              <Link
                href={primaryHref}
                {...(primaryExternal
                  ? { target: "_blank", rel: "noopener noreferrer" }
                  : {})}
                style={{
                  position: "relative",
                  zIndex: 4,
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 8,
                  width: "fit-content",
                  fontFamily:
                    "var(--font-geist-sans), system-ui, sans-serif",
                  fontSize: 15,
                  fontWeight: 600,
                  color: "var(--ink-1)",
                  textDecoration: "none",
                  borderBottom: "1px solid var(--copper)",
                  paddingBottom: 2,
                  transition: "color 0.2s var(--ease-snappy)",
                }}
              >
                {primaryLabel}
              </Link>

              {project.liveUrl ? (
                <a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`domain-link ${liveReal ? "domain-real" : "domain-staging"}`}
                  style={{ position: "relative", zIndex: 4, width: "fit-content" }}
                  aria-label={`Visit ${project.title} — opens in new tab`}
                >
                  {displayDomain(project.liveUrl)} <span aria-hidden>↗</span>
                </a>
              ) : null}
            </div>
          </motion.div>
        </div>

      </div>
    </section>
  );
}
