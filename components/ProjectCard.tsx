"use client";
import Link from "next/link";
import Image from "next/image";
import type { Project } from "@/lib/projects";
import { getLabelClass } from "@/lib/projects";

export default function ProjectCard({ project }: { project: Project }) {
  const labelClass = getLabelClass(project.label);
  const isIHE = !!(project.marketingUrl && project.dashboardUrl);

  return (
    <div
      className="card-hover"
      style={{
        background: project.isFlagship ? "#17243a" : "#161f2e",
        border: project.isFlagship ? "1px solid rgba(212,168,83,0.2)" : "1px solid rgba(255,255,255,0.07)",
        borderRadius: "12px",
        padding: "1.75rem",
        display: "flex",
        flexDirection: "column",
        gap: "1rem",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {project.isFlagship && (
        <div aria-hidden style={{ position: "absolute", top: "-40px", right: "-40px", width: "160px", height: "160px", borderRadius: "50%", background: "radial-gradient(circle, rgba(212,168,83,0.07) 0%, transparent 70%)", pointerEvents: "none" }} />
      )}

      <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: "1rem", position: "relative" }}>
        <div>
          <h3 style={{ fontFamily: "'Cormorant Garamond',Georgia,serif", fontSize: project.isFlagship ? "1.4rem" : "1.3rem", fontWeight: 500, color: "#f8f5f0", marginBottom: "0.25rem", lineHeight: 1.25 }}>
            {project.title}
          </h3>
          <p style={{ fontFamily: "'DM Mono',monospace", fontSize: "0.68rem", color: "#64748b", letterSpacing: "0.03em" }}>
            {project.category}
          </p>
        </div>
        <span className={labelClass} style={{ flexShrink: 0 }}>{project.label}</span>
      </div>

      {project.coverImage && (
        <div style={{ position: "relative", aspectRatio: "16/9", borderRadius: "10px", overflow: "hidden", border: "1px solid rgba(255,255,255,0.08)" }}>
          <Image
            src={project.coverImage}
            alt={`${project.title} website preview`}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            quality={80}
            style={{ objectFit: "cover", objectPosition: "top center" }}
          />
        </div>
      )}

      {isIHE && (
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0.5rem" }}>
          <div style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.06)", borderRadius: "7px", padding: "0.6rem 0.75rem" }}>
            <p style={{ fontFamily: "'DM Mono',monospace", fontSize: "0.58rem", letterSpacing: "0.08em", textTransform: "uppercase", color: "#64748b", marginBottom: "0.2rem" }}>Marketing Site</p>
            <p style={{ fontFamily: "'DM Sans',sans-serif", fontSize: "0.75rem", color: "#94a3b8" }}>Buyer-facing product site</p>
          </div>
          <div style={{ background: "rgba(212,168,83,0.06)", border: "1px solid rgba(212,168,83,0.18)", borderRadius: "7px", padding: "0.6rem 0.75rem" }}>
            <p style={{ fontFamily: "'DM Mono',monospace", fontSize: "0.58rem", letterSpacing: "0.08em", textTransform: "uppercase", color: "#d4a853", marginBottom: "0.2rem" }}>Product Dashboard</p>
            <p style={{ fontFamily: "'DM Sans',sans-serif", fontSize: "0.75rem", color: "#94a3b8" }}>Working app library</p>
          </div>
        </div>
      )}

      <p style={{ fontFamily: "'DM Sans',sans-serif", fontSize: "0.875rem", color: "#94a3b8", lineHeight: 1.65, flexGrow: 1 }}>
        {project.shortSummary}
      </p>

      <div style={{ display: "flex", flexWrap: "wrap", gap: "0.4rem" }}>
        {project.tags.slice(0, 4).map((tag) => <span key={tag} className="tag-pill">{tag}</span>)}
      </div>

      <div style={{ paddingTop: "0.75rem", borderTop: "1px solid rgba(255,255,255,0.05)" }}>
        {isIHE ? (
          <div style={{ display: "flex", flexDirection: "column", gap: "0.6rem" }}>
            <div style={{ display: "flex", gap: "0.75rem", flexWrap: "wrap" }}>
              <a href={project.dashboardUrl} target="_blank" rel="noopener noreferrer"
                style={{ fontFamily: "'DM Sans',sans-serif", fontSize: "0.8rem", fontWeight: 500, color: "#0b1120", background: "#d4a853", padding: "0.4rem 0.9rem", borderRadius: "5px", textDecoration: "none" }}>
                Product Dashboard &uarr;
              </a>
              <a href={project.marketingUrl} target="_blank" rel="noopener noreferrer"
                style={{ fontFamily: "'DM Sans',sans-serif", fontSize: "0.8rem", color: "#94a3b8", textDecoration: "none", border: "1px solid rgba(255,255,255,0.1)", padding: "0.4rem 0.9rem", borderRadius: "5px" }}>
                Marketing Site &uarr;
              </a>
            </div>
            <Link href={`/work/${project.slug}`} style={{ fontFamily: "'DM Sans',sans-serif", fontSize: "0.8rem", color: "#d4a853", textDecoration: "none" }}>
              View Case Study &rarr;
            </Link>
          </div>
        ) : (
          <div style={{ display: "flex", gap: "0.75rem", flexWrap: "wrap", alignItems: "center" }}>
            <Link href={`/work/${project.slug}`} style={{ fontFamily: "'DM Sans',sans-serif", fontSize: "0.8rem", fontWeight: 500, color: "#d4a853", textDecoration: "none" }}>
              View Case Study &rarr;
            </Link>
            {project.liveUrl && (
              <a href={project.liveUrl} target="_blank" rel="noopener noreferrer"
                style={{ fontFamily: "'DM Sans',sans-serif", fontSize: "0.8rem", color: "#64748b", textDecoration: "none" }}>
                Live Site &uarr;
              </a>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
