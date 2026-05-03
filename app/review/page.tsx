import type { Metadata } from "next";
import Link from "next/link";
import SectionTag from "@/components/editorial/SectionTag";
import EditorialH2 from "@/components/editorial/EditorialH2";
import Eyebrow from "@/components/editorial/Eyebrow";

export const metadata: Metadata = {
  title: "Website Review",
  description:
    "Request a free written review of your clinic or local-business website — architecture, copy, local search, and conversion. No commitment.",
};

const reviewAreas = [
  {
    title: "Architecture",
    body:
      "Sitemap structure, service-page hierarchy, internal linking, the local-search footprint. The skeleton most rebuilds get wrong before the design stage.",
  },
  {
    title: "Copy",
    body:
      "How the site reads to a hesitant patient or customer. Where the language is generic, where it's defensive, where the call-to-action loses confidence.",
  },
  {
    title: "Local search",
    body:
      "Schema, GBP alignment, city- and service-area page coverage, recency signals, the gap between current ranking and the realistic ceiling.",
  },
  {
    title: "Conversion",
    body:
      "Friction between the first scroll and the booked appointment. Where forms break, where CTAs hide, where mobile breaks the flow.",
  },
];

const contactEmail = "hello@peytoncampbell.studio";

export default function ReviewPage() {
  const subject = encodeURIComponent("Website Review Request — Campbell Digital Studio");
  const body = encodeURIComponent(
    [
      "Hi Peyton,",
      "",
      "I'd like to request a free website review.",
      "",
      "Business name: ",
      "Website URL: ",
      "Business type (clinic, therapy, HVAC, etc.): ",
      "What feels broken or under-performing: ",
      "",
    ].join("\n"),
  );
  const mailto = `mailto:${contactEmail}?subject=${subject}&body=${body}`;

  return (
    <>
      {/* ─── Hero ─────────────────────────────────────────────────── */}
      <section
        className="section-wrap"
        style={{ paddingTop: "clamp(96px, 14vw, 160px)", paddingBottom: "clamp(48px, 6vw, 80px)" }}
      >
        <Eyebrow>§ Review / Free Written Read of the Current Site</Eyebrow>

        <h1
          className="display-serif"
          style={{
            fontSize: "clamp(40px, 7vw, 88px)",
            color: "var(--navy-900)",
            marginBottom: "32px",
            maxWidth: "16ch",
          }}
        >
          Request a<br />
          <em style={{ color: "var(--navy-700)" }}>website review.</em>
        </h1>

        <div className="editorial-body reading-col">
          <p>
            Send the link to the current site and a sentence on the business. About a week later
            you’ll get a written review — architecture, copy, local search, and conversion — with
            specific notes on what’s working, what’s not, and what would change with a rebuild.
          </p>
          <p>
            There’s no pitch attached. About half the reviews go to businesses I never end up
            building for. The other half tend to become projects, which is how the studio fills
            its small slate.
          </p>
        </div>

        <div style={{ marginTop: "56px", display: "flex", flexDirection: "column", gap: "16px", alignItems: "flex-start" }}>
          <a href={mailto} className="btn-fill" style={{ fontSize: "12px" }}>
            Email a Review Request
          </a>
          <span
            style={{
              fontFamily: "var(--font-jetbrains), monospace",
              fontSize: "11px",
              letterSpacing: "0.18em",
              textTransform: "uppercase",
              color: "var(--ink-mute)",
            }}
          >
            Or:{" "}
            <a
              href={`mailto:${contactEmail}`}
              className="editorial-link gold"
              style={{ color: "var(--gold-700)" }}
            >
              {contactEmail}
            </a>
          </span>
        </div>
      </section>

      {/* ─── What the review covers ─────────────────────────────── */}
      <section style={{ background: "var(--surface)", borderTop: "1px solid var(--paper-rule)", borderBottom: "1px solid var(--paper-rule)" }}>
        <div className="section-wrap section-block-tight">
          <SectionTag num="01" label="What the Review Covers" />
          <EditorialH2>
            Four things,<br />
            <em>read at depth.</em>
          </EditorialH2>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
              gap: "clamp(24px, 4vw, 48px)",
              marginTop: "48px",
            }}
          >
            {reviewAreas.map((a, i) => (
              <div key={a.title}>
                <span
                  style={{
                    fontFamily: "var(--font-jetbrains), monospace",
                    fontSize: "11px",
                    letterSpacing: "0.18em",
                    textTransform: "uppercase",
                    color: "var(--gold-700)",
                    fontWeight: 600,
                    display: "block",
                    marginBottom: "10px",
                  }}
                >
                  0{i + 1}
                </span>
                <h3 className="editorial-h3" style={{ marginBottom: "10px" }}>
                  {a.title}
                </h3>
                <p
                  style={{
                    fontFamily: "var(--font-manrope), sans-serif",
                    fontSize: "14.5px",
                    lineHeight: 1.7,
                    color: "var(--ink-soft)",
                  }}
                >
                  {a.body}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── § 02 / What you actually receive ───────────────────── */}
      <section className="section-wrap section-block-tight">
        <SectionTag num="02" label="What You Actually Receive" />
        <EditorialH2 className="reading-col">
          The same audit framework<br />
          <em>used to scope every studio build.</em>
        </EditorialH2>

        <div className="editorial-body reading-col" style={{ marginTop: "32px" }}>
          <p>
            The review is not a generic audit checklist. It’s the same five-factor methodology used to scope
            every full studio engagement — the same scan data, the same competitor matrix, the same
            codebase-grade SEO read. The deliverable is a 4–8 page written document with specific page
            references, copy recommendations, search-structure observations, and a candid read of the
            conversion path. It takes about a week.
          </p>
          <p>
            What you receive includes:
          </p>
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
            gap: "0",
            marginTop: "48px",
            borderTop: "1px solid var(--paper-rule)",
          }}
          className="artifact-grid"
        >
          {[
            {
              label: "Artifact 01",
              title: "Local Falcon grid scans",
              body: "Geographic ranking grid scans across the service area — typically 5- and 10-mile radii — showing exactly where the business ranks at each point. The same data used to prove the search gap at Air Solutions: 34.69% Share of Local Voice in Daphne, 0% in Foley.",
            },
            {
              label: "Artifact 02",
              title: "Five-factor competitor matrix",
              body: "Every meaningful competitor in the market scored on GBP strength, current SEO, projected SEO, service-area coverage, and brand positioning — with a written read on which competitor is the primary threat and where the displaceable opportunities sit.",
            },
            {
              label: "Artifact 03",
              title: "Codebase-grade SEO audit",
              body: "A page-by-page read of the existing site’s metadata, schema, internal linking, and content depth — measured against what Google requires to rank in the category. Includes the realistic ranking ceiling for the current architecture.",
            },
            {
              label: "Artifact 04",
              title: "Two-leg stool analysis",
              body: "How the GBP and the website are actually working together — or not. Includes a GBP percentile ranking against the local competitor set, identification of the Relevance signals the GBP is missing, and the projected Prominence lift from a properly built platform.",
            },
            {
              label: "Artifact 05",
              title: "Realistic next steps",
              body: "If a rebuild is worth quoting, you’ll get one. If a few targeted edits would solve it, you’ll get that instead. The review is the work — not a sales tool dressed as one. About half of completed reviews never become projects, and that’s how it should be.",
            },
          ].map((item, i) => (
            <div
              key={item.label}
              style={{
                padding: "24px 24px 24px 0",
                borderBottom: "1px solid var(--paper-rule)",
                borderRight: "1px solid var(--paper-rule)",
              }}
              className="artifact-cell"
            >
              <span className="mono-caption" style={{ color: "var(--gold-700)", fontWeight: 600, marginBottom: "10px", display: "block" }}>
                {item.label}
              </span>
              <h3 className="editorial-h3" style={{ fontSize: "20px", marginBottom: "10px" }}>
                {item.title}
              </h3>
              <p
                style={{
                  fontFamily: "var(--font-manrope), sans-serif",
                  fontSize: "14px",
                  lineHeight: 1.65,
                  color: "var(--ink-soft)",
                }}
              >
                {item.body}
              </p>
              {i === 4 && null}
            </div>
          ))}
        </div>
      </section>

      {/* ─── § 03 / Closing ──────────────────────────────────────── */}
      <section
        style={{
          background: "var(--surface)",
          borderTop: "1px solid var(--paper-rule)",
          borderBottom: "1px solid var(--paper-rule)",
        }}
      >
        <div className="section-wrap section-block-tight">
          <SectionTag num="03" label="The Honest Frame" />
          <EditorialH2 className="reading-col">
            About half<br />
            <em>never become projects.</em>
          </EditorialH2>

          <div className="editorial-body reading-col" style={{ marginTop: "32px" }}>
            <p>
              Roughly half of completed reviews go to businesses that I never end up building for — they
              forward the document to their existing developer, do the targeted edits themselves, or decide
              the timing isn’t right. That’s fine. The other half tend to become projects, which is how the
              studio fills its small slate. Either outcome is a good outcome.
            </p>
          </div>

          <div style={{ marginTop: "48px" }}>
            <Link href="/inquire" className="editorial-link arrow-link mono">
              Or, inquire about a project directly <span className="arrow" aria-hidden>→</span>
            </Link>
          </div>
        </div>
      </section>

      <style>{`
        @media (max-width: 720px) {
          .artifact-grid { grid-template-columns: 1fr !important; }
          .artifact-cell { border-right: none !important; padding-right: 0 !important; }
        }
      `}</style>
    </>
  );
}
