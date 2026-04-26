import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { projects, getProjectBySlug, getLabelClass } from "@/lib/projects";
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

const bodyText: React.CSSProperties = {
  fontFamily: "'DM Sans',sans-serif",
  fontSize: "0.95rem",
  color: "#94a3b8",
  lineHeight: 1.8,
};

const sidebarLabel: React.CSSProperties = {
  fontFamily: "'DM Mono',monospace",
  fontSize: "0.63rem",
  letterSpacing: "0.1em",
  textTransform: "uppercase" as const,
  color: "#d4a853",
  marginBottom: "0.65rem",
};

function CaseBlock({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div style={{ marginBottom: "3rem" }}>
      <div style={{ width: "36px", height: "2px", background: "#d4a853", marginBottom: "0.75rem" }} />
      <h2 style={{ fontFamily: "'Cormorant Garamond',Georgia,serif", fontSize: "1.5rem", fontWeight: 500, color: "#f8f5f0", marginBottom: "1rem" }}>
        {title}
      </h2>
      {children}
    </div>
  );
}

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
      {/* ── Hero ──────────────────────────────────────────────────────────── */}
      <section style={{ paddingTop: "112px", paddingBottom: "4rem", paddingLeft: "1.5rem", paddingRight: "1.5rem", maxWidth: "1200px", margin: "0 auto", borderBottom: "1px solid rgba(255,255,255,0.06)" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", marginBottom: "2rem", fontFamily: "'DM Sans',sans-serif", fontSize: "0.8rem", color: "#64748b" }}>
          <Link href="/work" style={{ color: "#64748b", textDecoration: "none" }}>Work</Link>
          <span>/</span>
          <span style={{ color: "#94a3b8" }}>{project.title}</span>
        </div>

        <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: "1.5rem", flexWrap: "wrap", marginBottom: "1.25rem" }}>
          <span className={labelClass}>{project.label}</span>
          {/* IHE: both buttons in hero; standard: one live site button */}
          {isIHE ? (
            <div style={{ display: "flex", gap: "0.75rem", flexWrap: "wrap" }}>
              <a href={project.dashboardUrl} target="_blank" rel="noopener noreferrer"
                style={{ fontFamily: "'DM Sans',sans-serif", fontSize: "0.825rem", fontWeight: 500, color: "#0b1120", background: "#d4a853", padding: "0.5rem 1.25rem", borderRadius: "6px", textDecoration: "none" }}>
                Product Dashboard &uarr;
              </a>
              <a href={project.marketingUrl} target="_blank" rel="noopener noreferrer"
                style={{ fontFamily: "'DM Sans',sans-serif", fontSize: "0.825rem", color: "#f8f5f0", border: "1px solid rgba(255,255,255,0.15)", padding: "0.5rem 1.25rem", borderRadius: "6px", textDecoration: "none" }}>
                Marketing Site &uarr;
              </a>
            </div>
          ) : project.liveUrl ? (
            <a href={project.liveUrl} target="_blank" rel="noopener noreferrer"
              style={{ fontFamily: "'DM Sans',sans-serif", fontSize: "0.825rem", fontWeight: 500, color: "#0b1120", background: "#d4a853", padding: "0.5rem 1.25rem", borderRadius: "6px", textDecoration: "none" }}>
              View Live Site &uarr;
            </a>
          ) : null}
        </div>

        <p style={{ fontFamily: "'DM Mono',monospace", fontSize: "0.7rem", letterSpacing: "0.08em", textTransform: "uppercase", color: "#64748b", marginBottom: "0.75rem" }}>
          {project.category}
        </p>
        <h1 style={{ fontFamily: "'Cormorant Garamond',Georgia,serif", fontSize: "clamp(2.2rem,5vw,3.6rem)", fontWeight: 500, color: "#f8f5f0", lineHeight: 1.1, marginBottom: "1.25rem", maxWidth: "800px" }}>
          {project.title}
        </h1>
        <p style={{ fontFamily: "'DM Sans',sans-serif", fontSize: "1.05rem", color: "#94a3b8", lineHeight: 1.7, maxWidth: "680px" }}>
          {project.shortSummary}
        </p>
        <div style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem", marginTop: "1.75rem" }}>
          {project.tags.map((tag) => <span key={tag} className="tag-pill">{tag}</span>)}
        </div>
      </section>

      {/* ── Body ──────────────────────────────────────────────────────────── */}
      <section className="grid-sidebar" style={{ maxWidth: "1200px", margin: "0 auto", padding: "4rem 1.5rem" }}>

        {/* Main content */}
        <div>
          <CaseBlock title="Context">
            <p style={bodyText}>{project.summary}</p>
          </CaseBlock>

          <CaseBlock title="The Challenge">
            <p style={bodyText}>{project.challenge}</p>
          </CaseBlock>

          {/* ── IHE-SPECIFIC: two-section layout ───────────────────────────── */}
          {isIHE ? (
            <>
              {/* What I Built — split into two assets */}
              <div style={{ marginBottom: "3rem" }}>
                <div style={{ width: "36px", height: "2px", background: "#d4a853", marginBottom: "0.75rem" }} />
                <h2 style={{ fontFamily: "'Cormorant Garamond',Georgia,serif", fontSize: "1.5rem", fontWeight: 500, color: "#f8f5f0", marginBottom: "1rem" }}>
                  What I Built
                </h2>
                <p style={{ ...bodyText, marginBottom: "2rem" }}>{project.whatIBuilt}</p>

                <div style={{ background: "#111d30", border: "1px solid rgba(212,168,83,0.2)", borderRadius: "12px", padding: "2rem", position: "relative", overflow: "hidden" }}>
                  <div aria-hidden style={{ position: "absolute", top: "-60px", right: "-60px", width: "200px", height: "200px", borderRadius: "50%", background: "radial-gradient(circle, rgba(212,168,83,0.06) 0%, transparent 70%)", pointerEvents: "none" }} />

                  <div style={{ position: "relative", zIndex: 1 }}>
                    <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", marginBottom: "0.5rem" }}>
                      <span style={{ fontFamily: "'DM Mono',monospace", fontSize: "0.6rem", letterSpacing: "0.1em", textTransform: "uppercase", color: "#d4a853", background: "rgba(212,168,83,0.1)", border: "1px solid rgba(212,168,83,0.2)", padding: "0.2rem 0.6rem", borderRadius: "4px" }}>
                        Two Connected Assets
                      </span>
                    </div>

                    <h3 style={{ fontFamily: "'Cormorant Garamond',Georgia,serif", fontSize: "1.5rem", fontWeight: 500, color: "#f8f5f0", marginBottom: "0.75rem" }}>
                      Marketing Surface + Product Dashboard
                    </h3>

                    <p style={{ fontFamily: "'DM Sans',sans-serif", fontSize: "0.95rem", color: "#d4a853", fontStyle: "italic", marginBottom: "1rem", lineHeight: 1.6 }}>
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
            </>
          ) : (
            /* Standard: What I Built block with feature list */
            <CaseBlock title="What I Built">
              <p style={{ ...bodyText, marginBottom: "1.25rem" }}>{project.whatIBuilt}</p>
              <ul style={{ margin: 0, padding: 0, listStyle: "none", display: "flex", flexDirection: "column", gap: "0.55rem" }}>
                {project.features.map((f) => (
                  <li key={f} style={{ fontFamily: "'DM Sans',sans-serif", fontSize: "0.875rem", color: "#94a3b8", paddingLeft: "1.25rem", position: "relative", lineHeight: 1.5 }}>
                    <span style={{ position: "absolute", left: 0, color: "#d4a853" }}>—</span>
                    {f}
                  </li>
                ))}
              </ul>
            </CaseBlock>
          )}

          <CaseBlock title={isIHE ? "Distribution and Discovery Strategy" : "SEO and Conversion Strategy"}>
            <p style={bodyText}>{project.seoConversion}</p>
          </CaseBlock>

          <CaseBlock title="Business Value">
            <p style={{ ...bodyText, marginBottom: "1.25rem" }}>{project.businessValue}</p>
            {isIHE && (
              <p style={{ ...bodyText, fontStyle: "italic", color: "#d4a853", marginBottom: "1.25rem" }}>
                This project shows product-level thinking: clinical content, app-library architecture, searchable modules, no-PHI design, and a platform that can support licensing or white-label use.
              </p>
            )}
            <div style={{ display: "flex", flexDirection: "column", gap: "0.55rem" }}>
              {project.valuePoints.map((v) => (
                <div key={v} style={{ display: "flex", alignItems: "flex-start", gap: "0.75rem", padding: "0.75rem 1rem", background: "#111827", borderRadius: "8px", border: "1px solid rgba(212,168,83,0.1)" }}>
                  <span style={{ color: "#d4a853", flexShrink: 0, fontFamily: "'DM Mono',monospace", fontSize: "0.75rem" }}>✓</span>
                  <p style={{ fontFamily: "'DM Sans',sans-serif", fontSize: "0.85rem", color: "#94a3b8", margin: 0 }}>{v}</p>
                </div>
              ))}
            </div>
          </CaseBlock>

          {/* Screenshots — standard projects only; IHE handles its own above */}
          {!isIHE && (
            <CaseBlock title="Screenshots">
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(280px,1fr))", gap: "1rem" }}>
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

        {/* ── Sidebar ─────────────────────────────────────────────────────── */}
        <aside className="sidebar-last" style={{ position: "sticky", top: "88px" }}>
          <div style={{ background: "#161f2e", border: "1px solid rgba(255,255,255,0.07)", borderRadius: "12px", padding: "1.5rem", marginBottom: "1.25rem" }}>
            <p style={sidebarLabel}>Technical Stack</p>
            <p style={{ fontFamily: "'DM Sans',sans-serif", fontSize: "0.85rem", color: "#94a3b8", lineHeight: 1.65 }}>{project.stack}</p>
          </div>

          <div style={{ background: "#161f2e", border: "1px solid rgba(255,255,255,0.07)", borderRadius: "12px", padding: "1.5rem", marginBottom: "1.25rem" }}>
            <p style={sidebarLabel}>Project Type</p>
            <p style={{ fontFamily: "'DM Sans',sans-serif", fontSize: "0.85rem", color: "#94a3b8" }}>{project.category}</p>
          </div>

          <div style={{ background: "#161f2e", border: "1px solid rgba(255,255,255,0.07)", borderRadius: "12px", padding: "1.5rem", marginBottom: "1.25rem" }}>
            <p style={sidebarLabel}>Status</p>
            <span className={labelClass}>{project.label}</span>
            {/* IHE: both links in sidebar */}
            {isIHE ? (
              <div style={{ marginTop: "0.85rem", display: "flex", flexDirection: "column", gap: "0.5rem" }}>
                <a href={project.dashboardUrl} target="_blank" rel="noopener noreferrer"
                  style={{ fontFamily: "'DM Sans',sans-serif", fontSize: "0.8rem", color: "#d4a853", textDecoration: "none" }}>
                  Product Dashboard &uarr;
                </a>
                <a href={project.marketingUrl} target="_blank" rel="noopener noreferrer"
                  style={{ fontFamily: "'DM Sans',sans-serif", fontSize: "0.8rem", color: "#64748b", textDecoration: "none" }}>
                  Marketing Site &uarr;
                </a>
              </div>
            ) : project.liveUrl ? (
              <a href={project.liveUrl} target="_blank" rel="noopener noreferrer"
                style={{ display: "block", fontFamily: "'DM Sans',sans-serif", fontSize: "0.8rem", color: "#d4a853", textDecoration: "none", marginTop: "0.75rem" }}>
                View live site &uarr;
              </a>
            ) : null}
          </div>

          <div style={{ background: "linear-gradient(135deg,#111827,#0b1120)", border: "1px solid rgba(212,168,83,0.2)", borderRadius: "12px", padding: "1.5rem", textAlign: "center" }}>
            <p style={{ fontFamily: "'Cormorant Garamond',Georgia,serif", fontSize: "1.1rem", fontWeight: 500, color: "#f8f5f0", marginBottom: "0.75rem", lineHeight: 1.3 }}>
              Need a site like this?
            </p>
            <Link href="/website-review"
              style={{ display: "block", fontFamily: "'DM Sans',sans-serif", fontSize: "0.825rem", fontWeight: 500, color: "#0b1120", background: "#d4a853", padding: "0.65rem 1rem", borderRadius: "7px", textDecoration: "none", textAlign: "center" }}>
              Request Website Review
            </Link>
          </div>
        </aside>
      </section>

      {/* ── Prev / Next ───────────────────────────────────────────────────── */}
      {(prev || next) && (
        <section className="prev-next-grid" style={{ maxWidth: "1200px", margin: "0 auto", padding: "0 1.5rem 4rem", display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
          {prev ? (
            <Link href={`/work/${prev.slug}`}
              style={{ background: "#161f2e", border: "1px solid rgba(255,255,255,0.07)", borderRadius: "10px", padding: "1.25rem 1.5rem", textDecoration: "none", display: "block" }}>
              <p style={{ fontFamily: "'DM Mono',monospace", fontSize: "0.65rem", color: "#64748b", letterSpacing: "0.06em", marginBottom: "0.4rem" }}>&larr; Previous</p>
              <p style={{ fontFamily: "'Cormorant Garamond',Georgia,serif", fontSize: "1.05rem", color: "#f8f5f0", fontWeight: 500 }}>{prev.title}</p>
            </Link>
          ) : <div />}
          {next ? (
            <Link href={`/work/${next.slug}`}
              style={{ background: "#161f2e", border: "1px solid rgba(255,255,255,0.07)", borderRadius: "10px", padding: "1.25rem 1.5rem", textDecoration: "none", display: "block", textAlign: "right" }}>
              <p style={{ fontFamily: "'DM Mono',monospace", fontSize: "0.65rem", color: "#64748b", letterSpacing: "0.06em", marginBottom: "0.4rem" }}>Next &rarr;</p>
              <p style={{ fontFamily: "'Cormorant Garamond',Georgia,serif", fontSize: "1.05rem", color: "#f8f5f0", fontWeight: 500 }}>{next.title}</p>
            </Link>
          ) : <div />}
        </section>
      )}

      <section style={{ padding: "0 1.5rem 5rem", maxWidth: "1200px", margin: "0 auto" }}>
        <CTASection headline="Need a site like this?" subtext="Send me the link to your current website and I will take a look at what you have and what I would improve." />
      </section>
    </>
  );
}
