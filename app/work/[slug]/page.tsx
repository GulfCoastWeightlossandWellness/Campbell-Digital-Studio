import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { projects, getProjectBySlug, getLabelClass, getTierLabel } from "@/lib/projects";
import ScreenshotPlaceholder from "@/components/ScreenshotPlaceholder";
import CTASection from "@/components/CTASection";
import IHESurfaceSwitcher from "@/components/IHESurfaceSwitcher";

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
    openGraph: {
      title: `${project.title} | Campbell Digital Studio`,
      description: project.shortSummary,
    },
  };
}

/* ── Shared style tokens ───────────────────────────────────────────────── */

const bodyText: React.CSSProperties = {
  fontFamily: "'DM Sans', system-ui, sans-serif",
  fontSize: "0.95rem",
  color: "#94a3b8",
  lineHeight: 1.8,
};

const sidebarLabel: React.CSSProperties = {
  fontFamily: "'DM Mono', monospace",
  fontSize: "0.62rem",
  letterSpacing: "0.12em",
  textTransform: "uppercase" as const,
  color: "#4f8ef7",
  marginBottom: "0.65rem",
};

/* ── CaseBlock: section heading + content ──────────────────────────────── */

function CaseBlock({ title, children, accentWarm = false }: { title: string; children: React.ReactNode; accentWarm?: boolean }) {
  return (
    <div style={{ marginBottom: "3rem" }}>
      <div
        style={{
          width: "36px",
          height: "2px",
          background: accentWarm
            ? "linear-gradient(90deg, #d4a853, transparent)"
            : "linear-gradient(90deg, #4f8ef7, transparent)",
          marginBottom: "0.75rem",
        }}
      />
      <h2
        style={{
          fontFamily: "'Plus Jakarta Sans', system-ui, sans-serif",
          fontSize: "1.45rem",
          fontWeight: 700,
          color: "#f0f4fc",
          marginBottom: "1rem",
          letterSpacing: "-0.015em",
        }}
      >
        {title}
      </h2>
      {children}
    </div>
  );
}

/* ── Pricing tier columns ──────────────────────────────────────────────── */

const pricingColumns = [
  {
    key: "agency" as const,
    label: "Agency Rate",
    sublabel: "Full agency team",
    color: "#7db0ff",
    bg: "rgba(79,142,247,0.06)",
    border: "rgba(79,142,247,0.2)",
    icon: "🏢",
  },
  {
    key: "highFreelance" as const,
    label: "Senior Dev Rate",
    sublabel: "Experienced specialist",
    color: "#a78bfa",
    bg: "rgba(167,139,250,0.06)",
    border: "rgba(167,139,250,0.2)",
    icon: "👨‍💻",
  },
  {
    key: "lowFreelance" as const,
    label: "Generalist Rate",
    sublabel: "Template-first freelancer",
    color: "#6ee7b7",
    bg: "rgba(110,231,183,0.05)",
    border: "rgba(110,231,183,0.18)",
    icon: "💼",
  },
];

/* ── Main page ─────────────────────────────────────────────────────────── */

export default async function CaseStudyPage({ params }: Props) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);
  if (!project) notFound();

  const labelClass = getLabelClass(project.label);
  const idx = projects.findIndex((p) => p.slug === slug);
  const prev = projects[idx - 1] ?? null;
  const next = projects[idx + 1] ?? null;
  const isIHE = !!(project.marketingUrl && project.dashboardUrl);

  return (
    <>
      {/* ── Hero ────────────────────────────────────────────────────────── */}
      <section
        style={{
          paddingTop: "112px",
          paddingBottom: "3.5rem",
          paddingLeft: "1.5rem",
          paddingRight: "1.5rem",
          maxWidth: "1200px",
          margin: "0 auto",
          borderBottom: "1px solid rgba(255,255,255,0.06)",
        }}
      >
        {/* Breadcrumb */}
        <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", marginBottom: "2rem", fontFamily: "'DM Sans', system-ui, sans-serif", fontSize: "0.8rem", color: "#334155" }}>
          <Link href="/" style={{ color: "#334155", textDecoration: "none" }}>Home</Link>
          <span>/</span>
          <Link href="/work" style={{ color: "#334155", textDecoration: "none" }}>Work</Link>
          <span>/</span>
          <span style={{ color: "#7db0ff" }}>{project.title}</span>
        </div>

        {/* Label + tier badge + live site row */}
        <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: "1rem", flexWrap: "wrap", marginBottom: "1.5rem" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", flexWrap: "wrap" }}>
            <span className={labelClass}>{project.label}</span>
            {/* Tier badge */}
            <span
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "0.3rem",
                fontFamily: "'DM Mono', monospace",
                fontSize: "0.58rem",
                letterSpacing: "0.1em",
                textTransform: "uppercase",
                padding: "0.25rem 0.7rem",
                borderRadius: "99px",
                color: project.pricingTier === "agency" ? "#7db0ff" : "#d4a853",
                background: project.pricingTier === "agency" ? "rgba(79,142,247,0.1)" : "rgba(212,168,83,0.1)",
                border: `1px solid ${project.pricingTier === "agency" ? "rgba(79,142,247,0.25)" : "rgba(212,168,83,0.25)"}`,
              }}
            >
              {project.pricingTier === "agency" ? "◆" : "◇"} {getTierLabel(project.pricingTier)}
            </span>
          </div>

          {/* Live site CTA(s) */}
          {isIHE ? (
            <div style={{ display: "flex", gap: "0.75rem", flexWrap: "wrap" }}>
              <a
                href={project.dashboardUrl}
                target="_blank"
                rel="noopener noreferrer"
                style={{ fontFamily: "'DM Sans', system-ui, sans-serif", fontSize: "0.825rem", fontWeight: 600, color: "#fff", background: "linear-gradient(135deg, #4f8ef7, #3b7de8)", padding: "0.5rem 1.25rem", borderRadius: "7px", textDecoration: "none", boxShadow: "0 2px 10px rgba(79,142,247,0.3)" }}
              >
                Product Dashboard ↗
              </a>
              <a
                href={project.marketingUrl}
                target="_blank"
                rel="noopener noreferrer"
                style={{ fontFamily: "'DM Sans', system-ui, sans-serif", fontSize: "0.825rem", color: "#f0f4fc", border: "1px solid rgba(255,255,255,0.15)", padding: "0.5rem 1.25rem", borderRadius: "7px", textDecoration: "none" }}
              >
                Marketing Site ↗
              </a>
            </div>
          ) : project.liveUrl ? (
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              style={{ fontFamily: "'DM Sans', system-ui, sans-serif", fontSize: "0.825rem", fontWeight: 600, color: "#fff", background: "linear-gradient(135deg, #4f8ef7, #3b7de8)", padding: "0.5rem 1.25rem", borderRadius: "7px", textDecoration: "none", boxShadow: "0 2px 10px rgba(79,142,247,0.3)" }}
            >
              View Live Site ↗
            </a>
          ) : null}
        </div>

        {/* Category + title + summary + tags */}
        <p style={{ fontFamily: "'DM Mono', monospace", fontSize: "0.67rem", letterSpacing: "0.1em", textTransform: "uppercase", color: "#334155", marginBottom: "0.75rem" }}>
          {project.category}
        </p>
        <h1
          style={{
            fontFamily: "'Plus Jakarta Sans', system-ui, sans-serif",
            fontSize: "clamp(2rem, 5vw, 3.4rem)",
            fontWeight: 800,
            color: "#f0f4fc",
            lineHeight: 1.08,
            letterSpacing: "-0.03em",
            marginBottom: "1.25rem",
            maxWidth: "820px",
          }}
        >
          {project.title}
        </h1>
        <p style={{ fontFamily: "'DM Sans', system-ui, sans-serif", fontSize: "1.05rem", color: "#94a3b8", lineHeight: 1.75, maxWidth: "680px" }}>
          {project.shortSummary}
        </p>
        <div style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem", marginTop: "1.75rem" }}>
          {project.tags.map((tag) => <span key={tag} className="tag-pill">{tag}</span>)}
        </div>
      </section>

      {/* ── Body ────────────────────────────────────────────────────────── */}
      <section
        className="grid-sidebar"
        style={{ maxWidth: "1200px", margin: "0 auto", padding: "4rem 1.5rem" }}
      >
        {/* ── Main content ─────────────────────────────────────────────── */}
        <div>
          <CaseBlock title="Context">
            <p style={bodyText}>{project.summary}</p>
          </CaseBlock>

          <CaseBlock title="The Challenge">
            <p style={bodyText}>{project.challenge}</p>
          </CaseBlock>

          {/* IHE: two-surface layout */}
          {isIHE ? (
            <div style={{ marginBottom: "3rem" }}>
              <div style={{ width: "36px", height: "2px", background: "linear-gradient(90deg, #4f8ef7, transparent)", marginBottom: "0.75rem" }} />
              <h2 style={{ fontFamily: "'Plus Jakarta Sans', system-ui, sans-serif", fontSize: "1.45rem", fontWeight: 700, color: "#f0f4fc", marginBottom: "1rem", letterSpacing: "-0.015em" }}>
                What I Built
              </h2>
              <p style={{ ...bodyText, marginBottom: "2rem" }}>{project.whatIBuilt}</p>

              <div style={{ background: "linear-gradient(145deg, #0f1e38, #0d1728)", border: "1px solid rgba(79,142,247,0.2)", borderRadius: "14px", padding: "2rem", position: "relative", overflow: "hidden" }}>
                <div aria-hidden style={{ position: "absolute", top: "-60px", right: "-60px", width: "200px", height: "200px", borderRadius: "50%", background: "radial-gradient(circle, rgba(79,142,247,0.08) 0%, transparent 70%)", pointerEvents: "none" }} />
                <div style={{ position: "relative", zIndex: 1 }}>
                  <span style={{ fontFamily: "'DM Mono', monospace", fontSize: "0.6rem", letterSpacing: "0.1em", textTransform: "uppercase", color: "#7db0ff", background: "rgba(79,142,247,0.1)", border: "1px solid rgba(79,142,247,0.2)", padding: "0.2rem 0.6rem", borderRadius: "4px", display: "inline-block", marginBottom: "0.75rem" }}>
                    Two Connected Assets
                  </span>
                  <h3 style={{ fontFamily: "'Plus Jakarta Sans', system-ui, sans-serif", fontSize: "1.3rem", fontWeight: 700, color: "#f0f4fc", marginBottom: "0.75rem", letterSpacing: "-0.015em" }}>
                    Marketing Surface + Product Dashboard
                  </h3>
                  <p style={{ fontFamily: "'DM Sans', system-ui, sans-serif", fontSize: "0.95rem", color: "#7db0ff", fontStyle: "italic", marginBottom: "1rem", lineHeight: 1.6 }}>
                    Interactive Health Education is intentionally shown as two surfaces: the public marketing site (buyer-facing) and the product dashboard (core deliverable).
                  </p>
                  <p style={{ ...bodyText, marginBottom: "1.25rem" }}>
                    Click the toggles below to swap between the marketing site and dashboard screenshots. The dashboard remains the core asset: a searchable, physician-designed module library with no PHI collection in standard use.
                  </p>
                  <IHESurfaceSwitcher
                    marketingUrl={project.marketingUrl}
                    dashboardUrl={project.dashboardUrl}
                    marketingLabels={project.marketingScreenshotLabels ?? []}
                    marketingImages={project.marketingScreenshotImages ?? []}
                    dashboardLabels={project.dashboardScreenshotLabels ?? []}
                    dashboardImages={project.dashboardScreenshotImages ?? []}
                  />
                </div>
              </div>
            </div>
          ) : (
            <CaseBlock title="What I Built">
              <p style={{ ...bodyText, marginBottom: "1.25rem" }}>{project.whatIBuilt}</p>
              <ul style={{ margin: 0, padding: 0, listStyle: "none", display: "flex", flexDirection: "column", gap: "0.5rem" }}>
                {project.features.map((f) => (
                  <li
                    key={f}
                    style={{ display: "flex", alignItems: "flex-start", gap: "0.75rem", padding: "0.6rem 0.85rem", background: "#0d1728", borderRadius: "7px", border: "1px solid rgba(255,255,255,0.05)" }}
                  >
                    <span style={{ color: "#4f8ef7", flexShrink: 0, fontFamily: "'DM Mono', monospace", fontSize: "0.7rem", marginTop: "0.1rem", opacity: 0.7 }}>→</span>
                    <p style={{ fontFamily: "'DM Sans', system-ui, sans-serif", fontSize: "0.875rem", color: "#94a3b8", margin: 0, lineHeight: 1.55 }}>{f}</p>
                  </li>
                ))}
              </ul>
            </CaseBlock>
          )}

          <CaseBlock title={isIHE ? "Distribution and Discovery Strategy" : "SEO and Conversion Strategy"}>
            <p style={bodyText}>{project.seoConversion}</p>
          </CaseBlock>

          <CaseBlock title="Business Value" accentWarm>
            <p style={{ ...bodyText, marginBottom: "1.25rem" }}>{project.businessValue}</p>
            {isIHE && (
              <p style={{ ...bodyText, fontStyle: "italic", color: "#d4a853", marginBottom: "1.25rem" }}>
                This project shows product-level thinking: clinical content, app-library architecture, searchable modules, no-PHI design, and a platform that can support licensing or white-label use.
              </p>
            )}
            <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
              {project.valuePoints.map((v) => (
                <div
                  key={v}
                  style={{ display: "flex", alignItems: "flex-start", gap: "0.75rem", padding: "0.75rem 1rem", background: "rgba(212,168,83,0.04)", borderRadius: "8px", border: "1px solid rgba(212,168,83,0.1)" }}
                >
                  <span style={{ color: "#d4a853", flexShrink: 0, fontFamily: "'DM Mono', monospace", fontSize: "0.7rem", marginTop: "0.1rem" }}>✓</span>
                  <p style={{ fontFamily: "'DM Sans', system-ui, sans-serif", fontSize: "0.875rem", color: "#94a3b8", margin: 0 }}>{v}</p>
                </div>
              ))}
            </div>
          </CaseBlock>

          {/* ── Market Valuation Section ─────────────────────────────────── */}
          <div
            id="market-valuation"
            style={{
              marginBottom: "3rem",
              background: "linear-gradient(145deg, #0a1830 0%, #050c1a 100%)",
              border: "1px solid rgba(79,142,247,0.18)",
              borderRadius: "16px",
              overflow: "hidden",
            }}
          >
            {/* Section header */}
            <div
              style={{
                padding: "1.75rem 2rem 1.5rem",
                borderBottom: "1px solid rgba(79,142,247,0.1)",
                display: "flex",
                alignItems: "flex-start",
                justifyContent: "space-between",
                flexWrap: "wrap",
                gap: "1rem",
              }}
            >
              <div>
                <div style={{ display: "flex", alignItems: "center", gap: "0.6rem", marginBottom: "0.5rem" }}>
                  <div style={{ width: "28px", height: "2px", background: "linear-gradient(90deg, #4f8ef7, transparent)" }} />
                  <p style={{ fontFamily: "'DM Mono', monospace", fontSize: "0.62rem", letterSpacing: "0.12em", textTransform: "uppercase", color: "#7db0ff", margin: 0 }}>
                    Market Valuation
                  </p>
                </div>
                <h2 style={{ fontFamily: "'Plus Jakarta Sans', system-ui, sans-serif", fontSize: "1.45rem", fontWeight: 700, color: "#f0f4fc", margin: 0, letterSpacing: "-0.015em" }}>
                  What this build is worth on the open market
                </h2>
              </div>
              <span
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "0.3rem",
                  fontFamily: "'DM Mono', monospace",
                  fontSize: "0.6rem",
                  letterSpacing: "0.1em",
                  textTransform: "uppercase",
                  padding: "0.3rem 0.8rem",
                  borderRadius: "99px",
                  color: project.pricingTier === "agency" ? "#7db0ff" : "#d4a853",
                  background: project.pricingTier === "agency" ? "rgba(79,142,247,0.1)" : "rgba(212,168,83,0.1)",
                  border: `1px solid ${project.pricingTier === "agency" ? "rgba(79,142,247,0.25)" : "rgba(212,168,83,0.25)"}`,
                  flexShrink: 0,
                }}
              >
                {project.pricingTier === "agency" ? "◆" : "◇"} {getTierLabel(project.pricingTier)}
              </span>
            </div>

            {/* Disclaimer banner */}
            <div
              style={{
                margin: "1.5rem 2rem",
                background: "rgba(212,168,83,0.05)",
                border: "1px solid rgba(212,168,83,0.15)",
                borderRadius: "10px",
                padding: "1rem 1.25rem",
                display: "flex",
                gap: "0.75rem",
                alignItems: "flex-start",
              }}
            >
              <span style={{ color: "#d4a853", flexShrink: 0, fontSize: "0.9rem" }}>⚑</span>
              <div>
                <p style={{ fontFamily: "'DM Mono', monospace", fontSize: "0.6rem", letterSpacing: "0.1em", textTransform: "uppercase", color: "#d4a853", marginBottom: "0.35rem" }}>
                  About these prices
                </p>
                <p style={{ fontFamily: "'DM Sans', system-ui, sans-serif", fontSize: "0.82rem", color: "#94a3b8", margin: 0, lineHeight: 1.65 }}>
                  The price ranges below reflect <strong style={{ color: "#f0f4fc" }}>what this level of work costs on the open market</strong> — not what Campbell Digital Studio charges. These figures are here to honestly demonstrate the complexity, skill, and scope of the work so you understand the value you are seeing. Your project pricing depends on your specific needs, scope, and goals.{" "}
                  <Link href="/contact" style={{ color: "#7db0ff", textDecoration: "none" }}>
                    Request project pricing →
                  </Link>
                </p>
              </div>
            </div>

            {/* Three tier columns */}
            <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "1px", background: "rgba(255,255,255,0.04)", margin: "0 2rem 1.5rem" }}>
              {pricingColumns.map((col) => (
                <div
                  key={col.key}
                  style={{
                    background: col.bg,
                    border: `1px solid ${col.border}`,
                    borderRadius: "10px",
                    padding: "1.25rem",
                  }}
                >
                  {/* Tier header */}
                  <div style={{ marginBottom: "0.85rem" }}>
                    <p style={{ fontFamily: "'DM Mono', monospace", fontSize: "0.6rem", letterSpacing: "0.1em", textTransform: "uppercase", color: col.color, margin: "0 0 0.15rem" }}>
                      {col.icon} {col.label}
                    </p>
                    <p style={{ fontFamily: "'DM Sans', system-ui, sans-serif", fontSize: "0.72rem", color: "#334155", margin: 0 }}>
                      {col.sublabel}
                    </p>
                  </div>

                  {/* Price */}
                  <p
                    style={{
                      fontFamily: "'Plus Jakarta Sans', system-ui, sans-serif",
                      fontSize: "1.25rem",
                      fontWeight: 800,
                      color: "#f0f4fc",
                      letterSpacing: "-0.02em",
                      marginBottom: "0.85rem",
                      lineHeight: 1,
                    }}
                  >
                    {project.pricing[col.key]}
                  </p>

                  {/* Note */}
                  <p style={{ fontFamily: "'DM Sans', system-ui, sans-serif", fontSize: "0.78rem", color: "#64748b", lineHeight: 1.65, margin: 0 }}>
                    {project.pricingNotes[col.key]}
                  </p>
                </div>
              ))}
            </div>

            {/* Why it&apos;s worth it */}
            <div style={{ margin: "0 2rem 1.5rem", background: "rgba(255,255,255,0.02)", borderRadius: "10px", padding: "1.25rem 1.5rem", borderLeft: "3px solid rgba(79,142,247,0.35)" }}>
              <p style={{ fontFamily: "'DM Mono', monospace", fontSize: "0.6rem", letterSpacing: "0.12em", textTransform: "uppercase", color: "#4f8ef7", marginBottom: "0.5rem" }}>
                Why it&apos;s worth these prices
              </p>
              <p style={{ fontFamily: "'DM Sans', system-ui, sans-serif", fontSize: "0.9rem", color: "#94a3b8", lineHeight: 1.75, margin: 0 }}>
                {project.valueExplainer}
              </p>
            </div>

            {/* CTA row */}
            <div
              style={{
                padding: "1.25rem 2rem 1.75rem",
                borderTop: "1px solid rgba(79,142,247,0.08)",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                flexWrap: "wrap",
                gap: "1rem",
              }}
            >
              <div>
                <p style={{ fontFamily: "'Plus Jakarta Sans', system-ui, sans-serif", fontSize: "1rem", fontWeight: 700, color: "#f0f4fc", margin: "0 0 0.2rem", letterSpacing: "-0.01em" }}>
                  Want a site built at this level?
                </p>
                <p style={{ fontFamily: "'DM Sans', system-ui, sans-serif", fontSize: "0.82rem", color: "#475569", margin: 0 }}>
                  Every project is scoped and priced based on your specific needs — not a menu.
                </p>
              </div>
              <Link
                href="/contact"
                style={{
                  fontFamily: "'DM Sans', system-ui, sans-serif",
                  fontSize: "0.875rem",
                  fontWeight: 600,
                  color: "#ffffff",
                  background: "linear-gradient(135deg, #4f8ef7, #3b7de8)",
                  padding: "0.7rem 1.5rem",
                  borderRadius: "8px",
                  textDecoration: "none",
                  boxShadow: "0 2px 12px rgba(79,142,247,0.35)",
                  flexShrink: 0,
                }}
              >
                Request Project Pricing →
              </Link>
            </div>
          </div>

          {/* Screenshots — standard projects only */}
          {!isIHE && (
            <CaseBlock title="Screenshots">
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "1rem" }}>
                {project.screenshotLabels.map((label, index) => (
                  <ScreenshotPlaceholder
                    key={label}
                    label={label}
                    imageSrc={project.screenshotImages?.[index]}
                  />
                ))}
              </div>
            </CaseBlock>
          )}
        </div>

        {/* ── Sidebar ──────────────────────────────────────────────────── */}
        <aside className="sidebar-last" style={{ position: "sticky", top: "88px" }}>

          {/* Stack */}
          <div style={{ background: "#0d1728", border: "1px solid rgba(255,255,255,0.07)", borderRadius: "12px", padding: "1.5rem", marginBottom: "1rem" }}>
            <p style={sidebarLabel}>Technical Stack</p>
            <p style={{ fontFamily: "'DM Sans', system-ui, sans-serif", fontSize: "0.85rem", color: "#94a3b8", lineHeight: 1.7, margin: 0 }}>{project.stack}</p>
          </div>

          {/* Category */}
          <div style={{ background: "#0d1728", border: "1px solid rgba(255,255,255,0.07)", borderRadius: "12px", padding: "1.5rem", marginBottom: "1rem" }}>
            <p style={sidebarLabel}>Project Type</p>
            <p style={{ fontFamily: "'DM Sans', system-ui, sans-serif", fontSize: "0.85rem", color: "#94a3b8", margin: 0 }}>{project.category}</p>
          </div>

          {/* Status + links */}
          <div style={{ background: "#0d1728", border: "1px solid rgba(255,255,255,0.07)", borderRadius: "12px", padding: "1.5rem", marginBottom: "1rem" }}>
            <p style={sidebarLabel}>Status</p>
            <span className={labelClass}>{project.label}</span>
            {isIHE ? (
              <div style={{ marginTop: "0.85rem", display: "flex", flexDirection: "column", gap: "0.5rem" }}>
                <a href={project.dashboardUrl} target="_blank" rel="noopener noreferrer" style={{ fontFamily: "'DM Sans', system-ui, sans-serif", fontSize: "0.8rem", color: "#7db0ff", textDecoration: "none" }}>Product Dashboard ↗</a>
                <a href={project.marketingUrl} target="_blank" rel="noopener noreferrer" style={{ fontFamily: "'DM Sans', system-ui, sans-serif", fontSize: "0.8rem", color: "#475569", textDecoration: "none" }}>Marketing Site ↗</a>
              </div>
            ) : project.liveUrl ? (
              <a href={project.liveUrl} target="_blank" rel="noopener noreferrer" style={{ display: "block", fontFamily: "'DM Sans', system-ui, sans-serif", fontSize: "0.8rem", color: "#7db0ff", textDecoration: "none", marginTop: "0.75rem" }}>
                View live site ↗
              </a>
            ) : null}
          </div>

          {/* Valuation quick summary */}
          <div style={{ background: "#0d1728", border: "1px solid rgba(79,142,247,0.15)", borderRadius: "12px", padding: "1.5rem", marginBottom: "1rem" }}>
            <p style={sidebarLabel}>Market Valuation</p>
            <p style={{ fontFamily: "'DM Mono', monospace", fontSize: "0.62rem", letterSpacing: "0.06em", color: "#334155", marginBottom: "0.35rem" }}>Agency Rate</p>
            <p style={{ fontFamily: "'Plus Jakarta Sans', system-ui, sans-serif", fontSize: "1.05rem", fontWeight: 700, color: "#7db0ff", letterSpacing: "-0.01em", marginBottom: "0.75rem" }}>{project.pricing.agency}</p>

            <p style={{ fontFamily: "'DM Mono', monospace", fontSize: "0.62rem", letterSpacing: "0.06em", color: "#334155", marginBottom: "0.35rem" }}>Senior Dev Rate</p>
            <p style={{ fontFamily: "'Plus Jakarta Sans', system-ui, sans-serif", fontSize: "1.05rem", fontWeight: 700, color: "#a78bfa", letterSpacing: "-0.01em", marginBottom: "0.75rem" }}>{project.pricing.highFreelance}</p>

            <a
              href="#market-valuation"
              style={{ fontFamily: "'DM Sans', system-ui, sans-serif", fontSize: "0.78rem", color: "#4f8ef7", textDecoration: "none" }}
            >
              Full breakdown below ↓
            </a>
          </div>

          {/* CTA card */}
          <div
            style={{
              background: "linear-gradient(145deg, #0d1e38, #050c1a)",
              border: "1px solid rgba(79,142,247,0.2)",
              borderRadius: "12px",
              padding: "1.5rem",
              textAlign: "center",
            }}
          >
            <p style={{ fontFamily: "'Plus Jakarta Sans', system-ui, sans-serif", fontSize: "1.05rem", fontWeight: 700, color: "#f0f4fc", marginBottom: "0.6rem", lineHeight: 1.3, letterSpacing: "-0.01em" }}>
              Need a site like this?
            </p>
            <p style={{ fontFamily: "'DM Sans', system-ui, sans-serif", fontSize: "0.78rem", color: "#475569", marginBottom: "1rem", lineHeight: 1.55 }}>
              Pricing depends on your scope. Every project starts with a conversation.
            </p>
            <Link
              href="/contact"
              style={{
                display: "block",
                fontFamily: "'DM Sans', system-ui, sans-serif",
                fontSize: "0.825rem",
                fontWeight: 600,
                color: "#ffffff",
                background: "linear-gradient(135deg, #4f8ef7, #3b7de8)",
                padding: "0.65rem 1rem",
                borderRadius: "8px",
                textDecoration: "none",
                textAlign: "center",
                boxShadow: "0 2px 12px rgba(79,142,247,0.25)",
                marginBottom: "0.6rem",
              }}
            >
              Request Project Pricing
            </Link>
            <Link
              href="/website-review"
              style={{
                display: "block",
                fontFamily: "'DM Sans', system-ui, sans-serif",
                fontSize: "0.8rem",
                color: "#475569",
                textDecoration: "none",
                padding: "0.5rem",
              }}
            >
              Or request a free website review
            </Link>
          </div>
        </aside>
      </section>

      {/* ── Prev / Next ──────────────────────────────────────────────────── */}
      {(prev || next) && (
        <section
          className="prev-next-grid"
          style={{ maxWidth: "1200px", margin: "0 auto", padding: "0 1.5rem 4rem", display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}
        >
          {prev ? (
            <Link
              href={`/work/${prev.slug}`}
              style={{ background: "#0d1728", border: "1px solid rgba(255,255,255,0.07)", borderRadius: "10px", padding: "1.25rem 1.5rem", textDecoration: "none", display: "block", transition: "border-color 0.2s" }}
            >
              <p style={{ fontFamily: "'DM Mono', monospace", fontSize: "0.63rem", color: "#334155", letterSpacing: "0.06em", marginBottom: "0.4rem" }}>← Previous</p>
              <p style={{ fontFamily: "'Plus Jakarta Sans', system-ui, sans-serif", fontSize: "1rem", fontWeight: 700, color: "#f0f4fc", letterSpacing: "-0.01em" }}>{prev.title}</p>
            </Link>
          ) : <div />}
          {next ? (
            <Link
              href={`/work/${next.slug}`}
              style={{ background: "#0d1728", border: "1px solid rgba(255,255,255,0.07)", borderRadius: "10px", padding: "1.25rem 1.5rem", textDecoration: "none", display: "block", textAlign: "right" }}
            >
              <p style={{ fontFamily: "'DM Mono', monospace", fontSize: "0.63rem", color: "#334155", letterSpacing: "0.06em", marginBottom: "0.4rem" }}>Next →</p>
              <p style={{ fontFamily: "'Plus Jakarta Sans', system-ui, sans-serif", fontSize: "1rem", fontWeight: 700, color: "#f0f4fc", letterSpacing: "-0.01em" }}>{next.title}</p>
            </Link>
          ) : <div />}
        </section>
      )}

      <section style={{ padding: "0 1.5rem 5rem", maxWidth: "1200px", margin: "0 auto" }}>
        <CTASection
          headline="Need a site built at this level?"
          subtext="Send me what you have or describe what you need. Pricing is based on your specific scope — not a preset package."
          primaryLabel="Request Project Pricing"
          primaryHref="/contact"
          secondaryLabel="See All Work"
          secondaryHref="/work"
        />
      </section>
    </>
  );
}
