import type { Metadata } from "next";
import { projects } from "@/lib/projects";
import WorkGrid from "@/components/WorkGrid";
import SectionHeader from "@/components/SectionHeader";
import CTASection from "@/components/CTASection";

export const metadata: Metadata = {
  title: "Work",
  description:
    "Portfolio of custom medical and local-business websites — case studies, builds, and strategic rebuilds by Campbell Digital Studio.",
};

const labelOrder = ["Original Build", "Strategic Rebuild Concept", "Original Product", "Internal / Founder Project"];

const sortedProjects = [...projects].sort(
  (a, b) => labelOrder.indexOf(a.label) - labelOrder.indexOf(b.label)
);

const agencyCount = projects.filter((p) => p.pricingTier === "agency").length;
const seniorDevCount = projects.filter((p) => p.pricingTier === "senior-dev").length;

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
          subtext="A transparent record of the sites, platforms, and strategic concepts I have built — with honest labels and real market valuations on each."
        />

        {/* Portfolio stats strip */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(160px, 1fr))",
            gap: "1px",
            background: "rgba(255,255,255,0.05)",
            borderRadius: "12px",
            overflow: "hidden",
            border: "1px solid rgba(255,255,255,0.05)",
            marginBottom: "2.5rem",
          }}
        >
          {[
            { value: `${projects.length}`, label: "Total Projects" },
            { value: `${agencyCount}`, label: "Agency-Grade Builds" },
            { value: `${seniorDevCount}`, label: "Senior-Dev Builds" },
            { value: "145+", label: "Medical Apps Built" },
            { value: "50+", label: "Service Pages" },
          ].map((stat) => (
            <div
              key={stat.label}
              style={{
                background: "#050c1a",
                padding: "1.25rem",
                textAlign: "center",
              }}
            >
              <p
                style={{
                  fontFamily: "'Plus Jakarta Sans', system-ui, sans-serif",
                  fontSize: "1.5rem",
                  fontWeight: 800,
                  color: "#7db0ff",
                  margin: 0,
                  letterSpacing: "-0.02em",
                }}
              >
                {stat.value}
              </p>
              <p
                style={{
                  fontFamily: "'DM Sans', system-ui, sans-serif",
                  fontSize: "0.72rem",
                  color: "#334155",
                  margin: "0.25rem 0 0",
                }}
              >
                {stat.label}
              </p>
            </div>
          ))}
        </div>

        {/* Label legend */}
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            gap: "0.75rem",
            marginBottom: "2rem",
            paddingBottom: "1.75rem",
            borderBottom: "1px solid rgba(255,255,255,0.06)",
            alignItems: "center",
          }}
        >
          <span className="label-build">Original Build</span>
          <span style={{ fontFamily: "'DM Sans', system-ui, sans-serif", fontSize: "0.78rem", color: "#475569" }}>
            — commissioned or founder-built, live and deployed
          </span>
          <span className="label-concept" style={{ marginLeft: "0.75rem" }}>Strategic Rebuild</span>
          <span style={{ fontFamily: "'DM Sans', system-ui, sans-serif", fontSize: "0.78rem", color: "#475569" }}>
            — proactive rebuild concept, not a paid engagement
          </span>
          <span className="label-product" style={{ marginLeft: "0.75rem" }}>Original Product</span>
          <span style={{ fontFamily: "'DM Sans', system-ui, sans-serif", fontSize: "0.78rem", color: "#475569" }}>
            — founder-built platform or digital product
          </span>
        </div>

        {/* Pricing note */}
        <div
          style={{
            background: "rgba(79,142,247,0.05)",
            border: "1px solid rgba(79,142,247,0.15)",
            borderRadius: "10px",
            padding: "1rem 1.25rem",
            marginBottom: "2.5rem",
            display: "flex",
            alignItems: "flex-start",
            gap: "0.75rem",
          }}
        >
          <span style={{ color: "#7db0ff", flexShrink: 0, marginTop: "0.05rem" }}>ℹ</span>
          <p style={{ fontFamily: "'DM Sans', system-ui, sans-serif", fontSize: "0.82rem", color: "#64748b", margin: 0, lineHeight: 1.65 }}>
            Every project card includes a <strong style={{ color: "#94a3b8" }}>Market Valuation Estimate</strong> — click the toggle at the bottom of any card to see agency, senior-dev, and generalist price ranges with explanations of why each level is priced the way it is.
          </p>
        </div>

        {/* Filterable project grid */}
        <WorkGrid projects={sortedProjects} />
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
