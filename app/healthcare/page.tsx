import type { Metadata } from "next";
import Link from "next/link";
import PageIntro from "@/components/editorial/PageIntro";
import SectionTag from "@/components/editorial/SectionTag";
import EditorialH2 from "@/components/editorial/EditorialH2";

export const metadata: Metadata = {
  title: "Healthcare — Digital infrastructure for clinical practices",
  description:
    "Multi-location practice ecosystems, intake pipelines, GBP operations, and HealthcareProvider schema — built end-to-end for clinical practices by a physician who codes.",
  alternates: { canonical: "/healthcare" },
};

const buildList = [
  {
    head: "Multi-location practice architectures",
    body:
      "One codebase across every clinic, every provider, every service line. Location-aware booking, NAP-consistent metadata, and per-city service pages that rank instead of cannibalize.",
  },
  {
    head: "Intake and booking pipelines",
    body:
      "JaneApp, Jane, Cliniko, and direct-API booking flows wired into the site at the route level. Forms validated with Zod, spam-screened with Turnstile, routed by service line and location.",
  },
  {
    head: "Google Business Profile operations",
    body:
      "Categories, services, attributes, hours, review-velocity workflow, photo cadence, posts cadence, Q&A architecture, and — once GBP API access lands — programmatic upload and review-response drafting.",
  },
  {
    head: "HealthcareProvider and MedicalBusiness schema",
    body:
      "JSON-LD that names every provider, every location, every accepted insurance plan, every service offered. Structured for rich results, written for Google's medical entity graph.",
  },
];

const caseStudies = [
  {
    slug: "revitalize",
    teaser: "Migrated Revitalize to one Next.js codebase across 5 sub-brands",
    detail:
      "Multi-location aesthetics and hormone clinic in Georgia — two clinics, supplement brand, published book, coaching institute, 50+ routes under one ecosystem.",
  },
  {
    slug: "interactive-health-education",
    teaser: "Shipped 146 patient-education apps in 12 months",
    detail:
      "Live patient-education platform — 146 interactive clinical modules served from a unified dashboard with a registrar validation pipeline.",
  },
  {
    slug: "collective-counseling",
    teaser: "Built Collective Counseling around ADHD-testing cash-pay intent",
    detail:
      "Therapy practice site in Daphne with a dedicated adult-ADHD-testing landing page, real therapist photography, and Daphne-local SEO.",
  },
];

export default function HealthcarePage() {
  return (
    <>
      <PageIntro
        tagNum="§ Vertical"
        tagLabel="Healthcare"
        lead="Multi-location architectures, intake pipelines, and GBP operations for clinical practices. Built end-to-end by a physician with a development background — the person reading your discharge summaries and the person writing your routes is the same person."
      >
        Digital infrastructure for{" "}
        <em>clinical practices.</em>
      </PageIntro>

      {/* ── What we build for clinics ─────────────────────────────────── */}
      <section className="section-wrap section-block">
        <SectionTag num="01" label="What we build for clinics" />
        <EditorialH2>
          The pieces<br />
          <em>a clinical practice actually needs.</em>
        </EditorialH2>

        <div className="capabilities-grid" style={{ marginTop: "48px" }}>
          {buildList.map((item) => (
            <div key={item.head}>
              <h3 className="editorial-h3">{item.head}</h3>
              <p className="editorial-body">{item.body}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── Case studies ───────────────────────────────────────────────── */}
      <section
        style={{
          background: "var(--panel)",
          borderTop: "1px solid var(--border-subtle)",
          borderBottom: "1px solid var(--border-subtle)",
        }}
      >
        <div className="section-wrap section-block">
          <SectionTag num="02" label="Shipped for healthcare" />
          <EditorialH2>
            Three clinical builds,<br />
            <em>currently running.</em>
          </EditorialH2>

          <div style={{ marginTop: "48px" }}>
            {caseStudies.map((c) => (
              <div key={c.slug} className="tier-row">
                <span className="tier-num">→</span>
                <div>
                  <Link
                    href={`/work/${c.slug}`}
                    className="tier-name"
                    style={{ textDecoration: "none" }}
                  >
                    {c.teaser}
                  </Link>
                  <div className="tier-body">
                    <p>{c.detail}</p>
                  </div>
                </div>
                <span aria-hidden />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Closing CTA ────────────────────────────────────────────────── */}
      <section className="cover-surface">
        <div className="section-wrap section-block">
          <SectionTag num="03" label="Start a clinical engagement" onDark />
          <EditorialH2 onDark className="reading-col">
            Send the practice name,<br />
            <em>and what isn&apos;t working.</em>
          </EditorialH2>

          <p className="reading-col page-intro__lead">
            Send the practice name, a link to the current site, what you&apos;re trying to accomplish,
            an approximate budget, and a timeline. I read every inquiry personally and reply within a
            week with honest notes on whether the studio is the right fit.
          </p>

          <div
            style={{
              marginTop: "40px",
              display: "flex",
              gap: "20px",
              flexWrap: "wrap",
              alignItems: "center",
            }}
          >
            <Link href="/inquire" className="btn-fill">
              Inquire about a clinical project
            </Link>
            <Link href="/work" className="btn-ghost">
              See all work
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
