import type { Metadata } from "next";
import { projects } from "@/lib/projects";
import ProjectCard from "@/components/ProjectCard";
import SectionHeader from "@/components/SectionHeader";
import CTASection from "@/components/CTASection";

export const metadata: Metadata = {
  title: "Work",
  description:
    "Portfolio of custom medical and local-business websites — case studies, builds, and strategic rebuilds by Campbell Digital Studio.",
};

const labelOrder = ["Original Build", "Strategic Rebuild Concept", "Original Product", "Internal / Founder Project"];

export default function WorkPage() {
  return (
    <>
      {/* Page header */}
      <section
        style={{
          paddingTop: "120px",
          paddingBottom: "4rem",
          paddingLeft: "1.5rem",
          paddingRight: "1.5rem",
          maxWidth: "1200px",
          margin: "0 auto",
        }}
      >
        <SectionHeader
          eyebrow="Portfolio"
          headline="Selected projects and case studies."
          subtext="A transparent record of the sites, platforms, and strategic concepts I have built — with honest labels on each."
        />

        {/* Label legend */}
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            gap: "0.75rem",
            marginBottom: "3rem",
            paddingBottom: "2rem",
            borderBottom: "1px solid rgba(255,255,255,0.06)",
          }}
        >
          <span className="label-build">Original Build</span>
          <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "0.8rem", color: "#64748b", alignSelf: "center" }}>
            — commissioned or founder-built site, live and deployed
          </span>
          <span className="label-concept" style={{ marginLeft: "1rem" }}>Strategic Rebuild Concept</span>
          <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "0.8rem", color: "#64748b", alignSelf: "center" }}>
            — proactive rebuild of an existing site, not a commissioned engagement
          </span>
          <span className="label-product" style={{ marginLeft: "1rem" }}>Original Product</span>
          <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "0.8rem", color: "#64748b", alignSelf: "center" }}>
            — founder-built digital product or platform
          </span>
        </div>

        {/* Project grid */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(340px, 1fr))",
            gap: "1.25rem",
          }}
        >
          {projects
            .slice()
            .sort(
              (a, b) =>
                labelOrder.indexOf(a.label) - labelOrder.indexOf(b.label)
            )
            .map((project) => (
              <ProjectCard key={project.slug} project={project} />
            ))}
        </div>
      </section>

      {/* CTA */}
      <section style={{ padding: "0 1.5rem 5rem", maxWidth: "1200px", margin: "0 auto" }}>
        <CTASection
          headline="Want a site like one of these?"
          subtext="Request a website review and I will take a look at what you currently have and tell you what I would improve."
          primaryLabel="Request Website Review"
          primaryHref="/website-review"
          secondaryLabel="About My Process"
          secondaryHref="/about"
        />
      </section>
    </>
  );
}
