"use client";
import { useState } from "react";
import type { Project, FilterTag } from "@/lib/projects";
import ProjectCard from "@/components/ProjectCard";

type FilterOption = { id: FilterTag | "all"; label: string; count: number };

export default function WorkGrid({ projects }: { projects: Project[] }) {
  const [active, setActive] = useState<FilterTag | "all">("all");

  const filterOptions: FilterOption[] = [
    { id: "all", label: "All Projects", count: projects.length },
    { id: "full-stack", label: "Full-Stack", count: projects.filter((p) => p.filterTags.includes("full-stack")).length },
    { id: "medical", label: "Medical / Clinical", count: projects.filter((p) => p.filterTags.includes("medical")).length },
    { id: "platform", label: "Platform / SaaS", count: projects.filter((p) => p.filterTags.includes("platform")).length },
    { id: "local", label: "Local Business", count: projects.filter((p) => p.filterTags.includes("local")).length },
    { id: "static", label: "Static / HTML", count: projects.filter((p) => p.filterTags.includes("static")).length },
  ];

  const visible =
    active === "all"
      ? projects
      : projects.filter((p) => p.filterTags.includes(active as FilterTag));

  return (
    <>
      {/* Filter tabs */}
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          gap: "0.5rem",
          marginBottom: "2.5rem",
        }}
      >
        {filterOptions.map((opt) => {
          const isActive = active === opt.id;
          return (
            <button
              key={opt.id}
              onClick={() => setActive(opt.id)}
              style={{
                fontFamily: "'DM Sans', system-ui, sans-serif",
                fontSize: "0.82rem",
                fontWeight: isActive ? 600 : 400,
                color: isActive ? "#ffffff" : "#64748b",
                background: isActive
                  ? "linear-gradient(135deg, #4f8ef7, #3b7de8)"
                  : "rgba(255,255,255,0.04)",
                border: isActive
                  ? "1px solid transparent"
                  : "1px solid rgba(255,255,255,0.08)",
                padding: "0.45rem 1rem",
                borderRadius: "99px",
                cursor: "pointer",
                transition: "all 0.2s",
                display: "flex",
                alignItems: "center",
                gap: "0.45rem",
                boxShadow: isActive ? "0 2px 12px rgba(79,142,247,0.3)" : "none",
              }}
              onMouseEnter={(e) => {
                if (!isActive) {
                  e.currentTarget.style.color = "#f0f4fc";
                  e.currentTarget.style.borderColor = "rgba(255,255,255,0.15)";
                }
              }}
              onMouseLeave={(e) => {
                if (!isActive) {
                  e.currentTarget.style.color = "#64748b";
                  e.currentTarget.style.borderColor = "rgba(255,255,255,0.08)";
                }
              }}
            >
              {opt.label}
              <span
                style={{
                  fontFamily: "'DM Mono', monospace",
                  fontSize: "0.62rem",
                  opacity: 0.7,
                }}
              >
                {opt.count}
              </span>
            </button>
          );
        })}
      </div>

      {/* Results count */}
      <p
        style={{
          fontFamily: "'DM Mono', monospace",
          fontSize: "0.63rem",
          letterSpacing: "0.08em",
          color: "#334155",
          marginBottom: "1.5rem",
          textTransform: "uppercase",
        }}
      >
        Showing {visible.length} of {projects.length} projects
        {active !== "all" && (
          <span>
            {" "}
            &mdash;{" "}
            <button
              onClick={() => setActive("all")}
              style={{
                background: "none",
                border: "none",
                cursor: "pointer",
                fontFamily: "'DM Mono', monospace",
                fontSize: "0.63rem",
                color: "#4f8ef7",
                padding: 0,
                textTransform: "uppercase",
                letterSpacing: "0.08em",
              }}
            >
              Clear filter ×
            </button>
          </span>
        )}
      </p>

      {/* Project grid */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(340px, 1fr))",
          gap: "1.25rem",
        }}
      >
        {visible.map((project) => (
          <ProjectCard key={project.slug} project={project} />
        ))}
      </div>
    </>
  );
}
