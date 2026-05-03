import type { Metadata } from "next";
import Link from "next/link";
import SectionTag from "@/components/editorial/SectionTag";
import EditorialH2 from "@/components/editorial/EditorialH2";
import Eyebrow from "@/components/editorial/Eyebrow";
import EditorialTable from "@/components/editorial/EditorialTable";

export const metadata: Metadata = {
  title: "Practice",
  description:
    "What Campbell Digital Studio does: medical and wellness websites, local-service websites, and platforms with interactive tools — scoped against the actual business, not a package tier.",
};

const areas = [
  {
    n: "01",
    title: "Medical & wellness websites",
    body:
      "Primary care, DPC, urgent care, specialty clinics, therapy practices, and medspas. The work covers strategy, sitemap and service hierarchy, JSON-LD schema, multi-location SEO, patient-facing copy, and booking integrations. Every page is written for the patient who's deciding whether to call.",
    exampleHref: "/work/revitalize",
    exampleLabel: "Revitalize Aesthetics & Wellness",
  },
  {
    n: "02",
    title: "Local-service websites",
    body:
      "HVAC, trades, and home services. Service-page architecture, city- and service-area pages, conversion paths, server-side form handling, review integrations, and live local-search infrastructure. The job is to make the business findable in the local pack and easy to choose once found.",
    exampleHref: "/work/acexperts",
    exampleLabel: "ACExperts251",
  },
  {
    n: "03",
    title: "Platforms & interactive tools",
    body:
      "Patient-education hubs, calculators, treatment finders, content libraries, and product surfaces with a real catalog. When a clinic or health-tech operator needs more than a marketing site — a deployable, version-controlled product with policy logic — that's a platform engagement.",
    exampleHref: "/work/interactive-health-education",
    exampleLabel: "Interactive Health Education",
  },
];

const addOnRows: React.ReactNode[][] = [
  [
    <strong key="t1">Brand & identity</strong>,
    "Wordmark, logomark, color and type system, simple brand guideline page.",
    "When the existing brand is older than the rebuild and doesn't survive the type and grid the new site is built on.",
  ],
  [
    <strong key="t2">Graphics & print</strong>,
    "Operating manuals, playbooks, GBP cards, one-page proposals, treatment menus.",
    "When the site needs a deliverable a patient or team can hold — a card, a printed manual, a referral leave-behind.",
  ],
  [
    <strong key="t3">Copy & content</strong>,
    "Service pages, landing pages, patient-facing education, FAQ writing, longer-form articles.",
    "When the practice doesn't have someone who can write for a nervous patient — and when generic AI copy would lose the call.",
  ],
];

export default function PracticePage() {
  return (
    <>
      {/* ─── Hero ─────────────────────────────────────────────────── */}
      <section
        className="section-wrap"
        style={{ paddingTop: "clamp(96px, 14vw, 160px)", paddingBottom: "clamp(48px, 6vw, 72px)" }}
      >
        <Eyebrow>§ Practice / What the Studio Does</Eyebrow>
        <EditorialH2 as="h1">
          The work, organized<br />
          <em>by what the business needs.</em>
        </EditorialH2>

        <p
          className="reading-col"
          style={{
            fontFamily: "var(--font-manrope), sans-serif",
            fontSize: "17px",
            lineHeight: 1.65,
            color: "var(--ink-soft)",
            marginTop: "24px",
          }}
        >
          Three primary practice areas — and a small set of add-ons used selectively when the
          project asks for them. The work is full-stack: strategy, architecture, copy, build, and
          launch handled by one person.
        </p>
      </section>

      {/* ─── § 01–03 / Three primary practice areas ─────────────── */}
      <section
        style={{
          borderTop: "1px solid var(--paper-rule)",
        }}
      >
        {areas.map((area, i) => (
          <div
            key={area.n}
            className="section-wrap"
            style={{
              paddingTop: "clamp(48px, 8vw, 96px)",
              paddingBottom: "clamp(48px, 8vw, 96px)",
              borderBottom: "1px solid var(--paper-rule)",
              background: i % 2 === 1 ? "var(--surface)" : "transparent",
            }}
          >
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "120px 1fr",
                gap: "clamp(24px, 4vw, 64px)",
                alignItems: "start",
              }}
              className="practice-row"
            >
              <span
                style={{
                  fontFamily: "var(--font-fraunces), Georgia, serif",
                  fontSize: "clamp(48px, 6vw, 72px)",
                  fontWeight: 600,
                  color: "var(--gold-600)",
                  lineHeight: 0.95,
                  letterSpacing: "-0.03em",
                  fontVariationSettings: '"opsz" 144',
                }}
              >
                {area.n}
              </span>

              <div className="reading-col">
                <SectionTag num={`§ 0${i + 1}`} label="Practice Area" />
                <h2 className="editorial-h2" style={{ fontSize: "clamp(32px, 4.2vw, 48px)" }}>
                  {area.title}
                </h2>
                <p
                  className="editorial-body"
                  style={{ marginTop: "20px", fontSize: "18px" }}
                >
                  {area.body}
                </p>

                <div style={{ marginTop: "32px", display: "flex", alignItems: "baseline", gap: "16px", flexWrap: "wrap" }}>
                  <span
                    style={{
                      fontFamily: "var(--font-jetbrains), monospace",
                      fontSize: "10px",
                      letterSpacing: "0.18em",
                      textTransform: "uppercase",
                      color: "var(--gold-700)",
                      fontWeight: 600,
                    }}
                  >
                    Recent example —
                  </span>
                  <Link href={area.exampleHref} className="editorial-link arrow-link">
                    <span style={{ fontFamily: "var(--font-fraunces), Georgia, serif", fontSize: "18px", fontStyle: "italic", fontWeight: 400 }}>
                      {area.exampleLabel}
                    </span>{" "}
                    <span className="arrow" aria-hidden>→</span>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        ))}
      </section>

      {/* ─── Programmatic SEO matrix ─────────────────────────── */}
      <section
        style={{
          background: "var(--surface)",
          borderTop: "1px solid var(--paper-rule)",
          borderBottom: "1px solid var(--paper-rule)",
        }}
      >
        <div className="section-wrap section-block-tight">
          <SectionTag num="04" label="Programmatic Local Search" />
          <EditorialH2 className="reading-col">
            A page for every<br />
            <em>city × every service.</em>
          </EditorialH2>

          <div className="editorial-body reading-col" style={{ marginTop: "32px" }}>
            <p>
              Every full studio engagement ships with a programmatic-SEO matrix — every city in the service
              area crossed against every service the business offers, each as a standalone indexed page with
              unique local content, schema markup, and internal links. The recent Air Solutions build runs{" "}
              <strong>135 city × service intersection pages</strong> across Baldwin County. It’s the same
              architectural pattern Airbnb, Zapier, Tripadvisor, and Zillow use at billion-dollar scale,
              applied to a single county.
            </p>
          </div>

          <div style={{ marginTop: "32px" }}>
            <Link href="/method" className="editorial-link arrow-link mono">
              Read the full method <span className="arrow" aria-hidden>→</span>
            </Link>
          </div>
        </div>
      </section>

      {/* ─── Content engine ─────────────────────────────────── */}
      <section className="section-wrap section-block-tight">
        <SectionTag num="05" label="Content Engine" />
        <EditorialH2 className="reading-col">
          Automated publishing,<br />
          <em>native to the codebase.</em>
        </EditorialH2>

        <div className="editorial-body reading-col" style={{ marginTop: "32px" }}>
          <p>
            Posts are written, dated, and queued in the project repository. Vercel’s cron infrastructure
            publishes the next scheduled post automatically — no plugin, no CMS subscription, no third-party
            dependency. Right now the engine ships <strong>4 posts a week to Air Solutions</strong> and{" "}
            <strong>2 posts a week to Revitalize</strong>, every post written by me, every post indexed
            inside the keyword matrix. The Air Solutions library will reach 441 posts by May 2028.
          </p>
        </div>

        <div style={{ marginTop: "32px" }}>
          <Link href="/method#content-engine" className="editorial-link arrow-link mono">
            How the engine works <span className="arrow" aria-hidden>→</span>
          </Link>
        </div>
      </section>

      {/* ─── GBP playbook ───────────────────────────────────── */}
      <section
        style={{
          background: "var(--surface)",
          borderTop: "1px solid var(--paper-rule)",
          borderBottom: "1px solid var(--paper-rule)",
        }}
      >
        <div className="section-wrap section-block-tight">
          <SectionTag num="06" label="GBP Assessment + Playbook" />
          <EditorialH2 className="reading-col">
            A 12-section operating manual,<br />
            <em>delivered with every build.</em>
          </EditorialH2>

          <div className="editorial-body reading-col" style={{ marginTop: "32px" }}>
            <p>
              Every studio engagement includes a Google Business Profile assessment plus a written operating
              manual covering all five GBP ranking activities — review generation, photo cadence, post
              strategy, Q&amp;A management, and category configuration — ranked by impact, with exact
              instructions for who does what and when. Your team manages the GBP using the playbook. The
              studio doesn’t run GBP on an ongoing basis. You don’t need that service. You need the strategy
              document to stay consistent.
            </p>
          </div>
        </div>
      </section>

      {/* ─── Rebuilds & migrations ─────────────────────────────── */}
      <section className="section-wrap section-block-tight">
        <SectionTag num="07" label="Rebuilds & SEO Migrations" />
        <EditorialH2 className="reading-col">
          Replacing an older site<br />
          <em>without losing the search history.</em>
        </EditorialH2>

        <div className="editorial-body reading-col" style={{ marginTop: "32px" }}>
          <p>
            Most rebuilds break rankings. The fix is boring: an inventory of the old URL space,
            301 mapping, redirect testing, schema preservation, and patient handling of a site’s
            existing keyword footprint. When done correctly, the rebuild ships and the search
            traffic continues — often improved, never erased.
          </p>
        </div>
      </section>

      {/* ─── Add-on support ───────────────────────────────────── */}
      <section style={{ background: "var(--surface)", borderTop: "1px solid var(--paper-rule)", borderBottom: "1px solid var(--paper-rule)" }}>
        <div className="section-wrap section-block-tight">
          <SectionTag num="08" label="Add-on Support" />
          <EditorialH2>
            Used sparingly,<br />
            <em>when the project asks for it.</em>
          </EditorialH2>

          <p
            className="reading-col"
            style={{
              fontFamily: "var(--font-manrope), sans-serif",
              fontSize: "16px",
              lineHeight: 1.65,
              color: "var(--ink-soft)",
              marginTop: "24px",
            }}
          >
            The studio doesn’t currently offer in-house photography. Everything else below is
            available as part of a project, scoped honestly against the engagement.
          </p>

          <div style={{ marginTop: "40px" }}>
            <EditorialTable
              headers={["What", "Examples", "When it's worth it"]}
              rows={addOnRows}
            />
          </div>
        </div>
      </section>

      {/* ─── Pricing note + closing CTA ─────────────────────────── */}
      <section className="section-wrap section-block-tight">
        <SectionTag num="09" label="On Pricing" />
        <EditorialH2 className="reading-col">
          Scoped against the business,<br />
          <em>not a package tier.</em>
        </EditorialH2>

        <div className="editorial-body reading-col" style={{ marginTop: "32px" }}>
          <p>
            Every project is priced against the actual business — the sites at parity, the local
            competition, the existing search position, the deliverables that move the needle.
            There’s no fixed package. The fastest way to a number is to send the current site for
            a free review.
          </p>
        </div>

        <div style={{ marginTop: "48px" }}>
          <Link
            href="/review"
            className="editorial-link arrow-link"
            style={{
              fontFamily: "var(--font-fraunces), Georgia, serif",
              fontSize: "clamp(24px, 3vw, 32px)",
              fontWeight: 400,
              color: "var(--navy-900)",
              letterSpacing: "-0.018em",
              fontVariationSettings: '"opsz" 144',
              fontStyle: "italic",
            }}
          >
            Request a Website Review <span className="arrow" aria-hidden style={{ fontStyle: "normal" }}>→</span>
          </Link>
        </div>
      </section>

      <style>{`
        @media (max-width: 720px) {
          .practice-row { grid-template-columns: 1fr !important; gap: 16px !important; }
        }
      `}</style>
    </>
  );
}
