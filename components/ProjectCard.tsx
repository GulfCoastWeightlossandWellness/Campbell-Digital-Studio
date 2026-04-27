"use client";
import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import type { Project, PricingTier } from "@/lib/projects";
import { getLabelClass, getTierLabel } from "@/lib/projects";

function TierBadge({ tier }: { tier: PricingTier }) {
  const isAgency = tier === "agency";
  return (
    <span
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: "0.35rem",
        fontFamily: "'DM Mono', monospace",
        fontSize: "0.58rem",
        letterSpacing: "0.1em",
        textTransform: "uppercase",
        padding: "0.25rem 0.7rem",
        borderRadius: "99px",
        fontWeight: 500,
        background: isAgency
          ? "linear-gradient(135deg, rgba(79,142,247,0.15), rgba(125,176,255,0.08))"
          : "rgba(212,168,83,0.1)",
        color: isAgency ? "#7db0ff" : "#d4a853",
        border: isAgency
          ? "1px solid rgba(79,142,247,0.3)"
          : "1px solid rgba(212,168,83,0.25)",
      }}
    >
      {isAgency ? "◆" : "◇"} {getTierLabel(tier)}
    </span>
  );
}

const pricingTierMeta = [
  {
    key: "agency" as const,
    label: "Agency Rate",
    icon: "🏢",
    color: "#7db0ff",
    bg: "rgba(79,142,247,0.06)",
    border: "rgba(79,142,247,0.18)",
  },
  {
    key: "highFreelance" as const,
    label: "Senior Dev",
    icon: "👨‍💻",
    color: "#a78bfa",
    bg: "rgba(167,139,250,0.06)",
    border: "rgba(167,139,250,0.18)",
  },
  {
    key: "lowFreelance" as const,
    label: "Generalist",
    icon: "💼",
    color: "#6ee7b7",
    bg: "rgba(110,231,183,0.06)",
    border: "rgba(110,231,183,0.18)",
  },
];

export default function ProjectCard({ project }: { project: Project }) {
  const [pricingOpen, setPricingOpen] = useState(false);
  const labelClass = getLabelClass(project.label);
  const isIHE = !!(project.marketingUrl && project.dashboardUrl);

  return (
    <div
      className="card-hover"
      style={{
        background: project.isFlagship
          ? "linear-gradient(160deg, #0f1e38 0%, #0d1728 100%)"
          : "#0d1728",
        border: project.isFlagship
          ? "1px solid rgba(79,142,247,0.2)"
          : "1px solid rgba(255,255,255,0.07)",
        borderRadius: "14px",
        display: "flex",
        flexDirection: "column",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Flagship glow */}
      {project.isFlagship && (
        <div
          aria-hidden
          style={{
            position: "absolute",
            top: "-80px",
            right: "-80px",
            width: "240px",
            height: "240px",
            borderRadius: "50%",
            background: "radial-gradient(circle, rgba(79,142,247,0.09) 0%, transparent 70%)",
            pointerEvents: "none",
          }}
        />
      )}

      {/* Card body */}
      <div style={{ padding: "1.75rem", display: "flex", flexDirection: "column", gap: "1rem", flex: 1 }}>

        {/* Top row: tier badge + label */}
        <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: "0.75rem", flexWrap: "wrap" }}>
          <TierBadge tier={project.pricingTier} />
          <span className={labelClass} style={{ flexShrink: 0 }}>{project.label}</span>
        </div>

        {/* Title + category */}
        <div>
          <h3
            style={{
              fontFamily: "'Plus Jakarta Sans', system-ui, sans-serif",
              fontSize: project.isFlagship ? "1.3rem" : "1.15rem",
              fontWeight: 700,
              color: "#f0f4fc",
              marginBottom: "0.25rem",
              lineHeight: 1.2,
              letterSpacing: "-0.015em",
            }}
          >
            {project.title}
          </h3>
          <p style={{ fontFamily: "'DM Mono', monospace", fontSize: "0.63rem", color: "#334155", letterSpacing: "0.04em" }}>
            {project.category}
          </p>
        </div>

        {/* Cover image */}
        {project.coverImage && (
          <div
            style={{
              position: "relative",
              aspectRatio: "16/9",
              borderRadius: "10px",
              overflow: "hidden",
              border: "1px solid rgba(255,255,255,0.07)",
            }}
          >
            <Image
              src={project.coverImage}
              alt={`${project.title} website preview`}
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              quality={80}
              style={{ objectFit: "cover", objectPosition: "top center", transition: "transform 0.4s ease" }}
              onMouseEnter={(e) => { (e.currentTarget as HTMLImageElement).style.transform = "scale(1.03)"; }}
              onMouseLeave={(e) => { (e.currentTarget as HTMLImageElement).style.transform = "scale(1)"; }}
            />
          </div>
        )}

        {/* IHE dual-surface */}
        {isIHE && (
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0.5rem" }}>
            <div style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.07)", borderRadius: "8px", padding: "0.6rem 0.75rem" }}>
              <p style={{ fontFamily: "'DM Mono', monospace", fontSize: "0.56rem", letterSpacing: "0.08em", textTransform: "uppercase", color: "#334155", marginBottom: "0.2rem" }}>Marketing Site</p>
              <p style={{ fontFamily: "'DM Sans', system-ui, sans-serif", fontSize: "0.75rem", color: "#64748b" }}>Buyer-facing product site</p>
            </div>
            <div style={{ background: "rgba(79,142,247,0.06)", border: "1px solid rgba(79,142,247,0.18)", borderRadius: "8px", padding: "0.6rem 0.75rem" }}>
              <p style={{ fontFamily: "'DM Mono', monospace", fontSize: "0.56rem", letterSpacing: "0.08em", textTransform: "uppercase", color: "#7db0ff", marginBottom: "0.2rem" }}>Product Dashboard</p>
              <p style={{ fontFamily: "'DM Sans', system-ui, sans-serif", fontSize: "0.75rem", color: "#64748b" }}>Working app library</p>
            </div>
          </div>
        )}

        {/* Summary */}
        <p style={{ fontFamily: "'DM Sans', system-ui, sans-serif", fontSize: "0.875rem", color: "#94a3b8", lineHeight: 1.65, flexGrow: 1 }}>
          {project.shortSummary}
        </p>

        {/* Tags */}
        <div style={{ display: "flex", flexWrap: "wrap", gap: "0.4rem" }}>
          {project.tags.slice(0, 4).map((tag) => (
            <span key={tag} className="tag-pill">{tag}</span>
          ))}
        </div>

        {/* Action row */}
        <div style={{ paddingTop: "0.75rem", borderTop: "1px solid rgba(255,255,255,0.05)" }}>
          {isIHE ? (
            <div style={{ display: "flex", flexDirection: "column", gap: "0.6rem" }}>
              <div style={{ display: "flex", gap: "0.75rem", flexWrap: "wrap" }}>
                <a
                  href={project.dashboardUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ fontFamily: "'DM Sans', system-ui, sans-serif", fontSize: "0.8rem", fontWeight: 600, color: "#fff", background: "linear-gradient(135deg, #4f8ef7, #3b7de8)", padding: "0.4rem 0.9rem", borderRadius: "6px", textDecoration: "none", boxShadow: "0 2px 10px rgba(79,142,247,0.25)" }}
                >
                  Product Dashboard ↗
                </a>
                <a
                  href={project.marketingUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ fontFamily: "'DM Sans', system-ui, sans-serif", fontSize: "0.8rem", color: "#94a3b8", textDecoration: "none", border: "1px solid rgba(255,255,255,0.1)", padding: "0.4rem 0.9rem", borderRadius: "6px" }}
                >
                  Marketing Site ↗
                </a>
              </div>
              <Link href={`/work/${project.slug}`} style={{ fontFamily: "'DM Sans', system-ui, sans-serif", fontSize: "0.8rem", color: "#7db0ff", textDecoration: "none" }}>
                View Case Study →
              </Link>
            </div>
          ) : (
            <div style={{ display: "flex", gap: "0.75rem", flexWrap: "wrap", alignItems: "center" }}>
              <Link href={`/work/${project.slug}`} style={{ fontFamily: "'DM Sans', system-ui, sans-serif", fontSize: "0.8rem", fontWeight: 600, color: "#7db0ff", textDecoration: "none" }}>
                View Case Study →
              </Link>
              {project.liveUrl && (
                <a href={project.liveUrl} target="_blank" rel="noopener noreferrer" style={{ fontFamily: "'DM Sans', system-ui, sans-serif", fontSize: "0.8rem", color: "#334155", textDecoration: "none" }}>
                  Live Site ↗
                </a>
              )}
            </div>
          )}
        </div>
      </div>

      {/* ── Expandable Pricing Panel ─────────────────────────────────────── */}
      <div style={{ borderTop: "1px solid rgba(255,255,255,0.05)" }}>
        <button
          onClick={() => setPricingOpen(!pricingOpen)}
          aria-expanded={pricingOpen}
          aria-controls={`pricing-panel-${project.slug}`}
          style={{
            width: "100%",
            background: pricingOpen ? "rgba(79,142,247,0.06)" : "transparent",
            border: "none",
            cursor: "pointer",
            padding: "0.9rem 1.75rem",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            transition: "background 0.2s",
          }}
          onMouseEnter={(e) => { if (!pricingOpen) e.currentTarget.style.background = "rgba(255,255,255,0.03)"; }}
          onMouseLeave={(e) => { if (!pricingOpen) e.currentTarget.style.background = "transparent"; }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: "0.6rem" }}>
            <span style={{ fontFamily: "'DM Mono', monospace", fontSize: "0.62rem", letterSpacing: "0.1em", textTransform: "uppercase", color: pricingOpen ? "#7db0ff" : "#475569" }}>
              Market Valuation Estimate
            </span>
          </div>
          <span
            style={{
              color: pricingOpen ? "#7db0ff" : "#334155",
              transition: "transform 0.25s, color 0.2s",
              transform: pricingOpen ? "rotate(180deg)" : "rotate(0deg)",
              display: "inline-block",
              fontSize: "0.75rem",
            }}
          >
            ▾
          </span>
        </button>

        {/* Panel content */}
        <div
          id={`pricing-panel-${project.slug}`}
          style={{
            maxHeight: pricingOpen ? "70vh" : "0",
            overflowY: pricingOpen ? "auto" : "hidden",
            overflowX: "hidden",
            transition: "max-height 0.35s ease",
          }}
        >
          <div style={{ padding: "0 1.75rem 1.5rem" }}>
            {/* Three tier columns */}
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "0.5rem", marginBottom: "1rem" }}>
              {pricingTierMeta.map((tier) => (
                <div
                  key={tier.key}
                  style={{
                    background: tier.bg,
                    border: `1px solid ${tier.border}`,
                    borderRadius: "9px",
                    padding: "0.85rem 0.7rem",
                  }}
                >
                  <p style={{ fontFamily: "'DM Mono', monospace", fontSize: "0.58rem", letterSpacing: "0.1em", textTransform: "uppercase", color: tier.color, marginBottom: "0.4rem" }}>
                    {tier.icon} {tier.label}
                  </p>
                  <p style={{ fontFamily: "'Plus Jakarta Sans', system-ui, sans-serif", fontSize: "0.9rem", fontWeight: 700, color: "#f0f4fc", letterSpacing: "-0.01em", marginBottom: "0.5rem", lineHeight: 1.2 }}>
                    {project.pricing[tier.key]}
                  </p>
                  <p style={{ fontFamily: "'DM Sans', system-ui, sans-serif", fontSize: "0.72rem", color: "#475569", lineHeight: 1.5, margin: 0 }}>
                    {project.pricingNotes[tier.key]}
                  </p>
                </div>
              ))}
            </div>

            {/* Value explainer */}
            <div style={{ background: "rgba(255,255,255,0.02)", borderRadius: "8px", padding: "0.85rem 1rem", borderLeft: "2px solid rgba(79,142,247,0.3)" }}>
              <p style={{ fontFamily: "'DM Mono', monospace", fontSize: "0.58rem", letterSpacing: "0.1em", textTransform: "uppercase", color: "#4f8ef7", marginBottom: "0.4rem" }}>
                Why it&apos;s worth it
              </p>
              <p style={{ fontFamily: "'DM Sans', system-ui, sans-serif", fontSize: "0.8rem", color: "#94a3b8", lineHeight: 1.6, margin: 0 }}>
                {project.valueExplainer}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
