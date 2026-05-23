import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { codeToHtml } from "shiki";
import PageIntro from "@/components/editorial/PageIntro";
import SectionTag from "@/components/editorial/SectionTag";
import EditorialH2 from "@/components/editorial/EditorialH2";
import FaqSection from "@/components/sections/FaqSection";
import CodeReceipt from "@/components/sections/CodeReceipt";
import { siteConfig } from "@/lib/site-config";

export const metadata: Metadata = {
  title: "Studio — Campbell Digital Studio",
  description:
    "Owner-operator solo studio in Daphne, Alabama. Healthcare and local-service architectures, built end-to-end by a physician with a development background. Principles, process, capabilities, and FAQ.",
  alternates: { canonical: "/studio" },
};

const principles = [
  {
    head: "Owner-operator, no account managers",
    body:
      "You talk to me. I build it. I'm responsible for the outcome. No subcontractors, no offshored work, no junior designer between the brief and the finished site.",
  },
  {
    head: "Healthcare and local services only",
    body:
      "Multi-location clinical practices and trade-service brands where local SEO and multi-location architecture matter. Two verticals, two playbooks, deep specialization.",
  },
  {
    head: "Architectures, not brochures",
    body:
      "Programmatic SEO matrices, intake pipelines, GBP automation, structured data schemas. The site is infrastructure that runs, not a brochure that sits.",
  },
];

const processTimeline = [
  {
    marker: "Day 0",
    title: "Kickoff",
    body:
      "Scope, content inventory, sitemap, route plan, schema plan, GBP audit if local. You leave the kickoff with a written scope and a launch date.",
  },
  {
    marker: "Day 7",
    title: "Staging URL",
    body:
      "A working preview URL on Vercel with the homepage, navigation, and the first two production routes. Real copy, real layout, real schema — not Lorem.",
  },
  {
    marker: "Day 14",
    title: "Launch",
    body:
      "Production deploy. GA4 + GSC wired. 301 redirect map for every existing URL if migrating. NAP consistency check across 30+ directories for local-service builds.",
  },
  {
    marker: "Day 30",
    title: "First SEO report",
    body:
      "Indexation coverage, Core Web Vitals from real-user data, GBP Local Falcon baseline, and a written read on what's working and what to adjust next.",
  },
];

const capabilitiesBuild = [
  "Multi-location medical and clinical practice ecosystems",
  "Programmatic SEO architectures for local service businesses",
  "Google Business Profile operations — review velocity, photo cadence, posts cadence, Q&A architecture, GBP API automation, NAP integrity across 30+ directories",
  "Custom interactive tools — 3D, calculators, diagnostics, assessments",
  "Connected microsite ecosystems (clinic + shop + book + institute models)",
  "Brand systems and visual identity",
  "Content systems that scale (learning libraries, blog architectures)",
];

const capabilitiesVerticals = [
  "Healthcare: medical aesthetics, functional medicine, hormone therapy, weight management, dental, multi-location specialty practices",
  "Home services: HVAC, plumbing, electrical, roofing, multi-location trade brands",
  "Professional services where local SEO and multi-location architecture matter",
];

const capabilitiesNot = [
  "E-commerce platforms beyond simple Shopify integrations",
  "Mobile apps",
  "One-page sites under $5K",
  "Backlink campaigns or generic SEO retainers that don't tie to a specific build, GBP operations program, or content engine",
];

/* ────────────────────────────────────────────────────────────────────────
 * Code Receipt snippet — 12 sanitized lines from the Air Solutions matrix
 * generator (lib/matrix/generate.ts). Highlighted with Shiki at build time;
 * zero highlighting JS ships to the client.
 * ──────────────────────────────────────────────────────────────────── */

const codeReceiptSnippet = `export function allCrossPagePairs(): { city: string; service: string }[] {
  return cities.flatMap((c) =>
    services.map((s) => ({ city: c.slug, service: s.slug }))
  );
}

// Result: 21 cities × 10 services = 210 prerendered pages
// generateStaticParams() returns all 210 at build time
// Each page composes from real local data (NOAA climate, Census housing,
// utility rebate territory, FEMA flood zone) and unique prose
`;

export default async function StudioPage() {
  const codeReceiptHtml = await codeToHtml(codeReceiptSnippet, {
    lang: "ts",
    theme: "github-light",
  });

  return (
    <>
      <PageIntro
        tagNum="§ Studio"
        tagLabel="About · Process · Capabilities"
        lead="A solo studio in Daphne, Alabama. Healthcare and local-service architectures, built end-to-end by a physician with a development background. Two to three engagements at a time, never twenty."
      >
        How the studio<br />
        <em>actually runs.</em>
      </PageIntro>

      {/* ── Founder paragraph + inline portrait ───────────────────────── */}
      <section className="section-wrap section-block">
        <SectionTag num="01" label="Founder" />
        <EditorialH2 className="reading-col">
          Peyton Campbell, <em>DO.</em>
        </EditorialH2>

        <div className="studio-founder-grid">
          <div className="editorial-body reading-col">
            <p>
              I&apos;m a family-medicine physician based in coastal Alabama with a development
              background that predates medical school.
            </p>
            <p>
              The medical work pays the bills and keeps me grounded in the realities clinical
              practices actually face — booking flows, insurance verification, HIPAA-adjacent
              content rules, the difference between marketing voice and clinical voice. The
              development work is what I do when I&apos;m not in clinic. The combination is why my
              medical clients trust me with their sites and why my trade clients trust me with their
              architectures.
            </p>
            <p>
              Solo, with rigorous AI-assisted workflows. No subcontractors, no offshored work, no
              account managers. You talk to me. I build it. I&apos;m responsible for the outcome.
            </p>
          </div>

          <div className="studio-founder-grid__portrait">
            <Image
              src="/images/founder/peyton-campbell.svg"
              alt={`${siteConfig.founder.name}, ${siteConfig.founder.credential}`}
              fill
              sizes="(max-width: 720px) 160px, (max-width: 1024px) 180px, 200px"
              style={{ objectFit: "cover" }}
            />
          </div>
        </div>
      </section>

      {/* ── Studio principles ─────────────────────────────────────────── */}
      <section
        style={{
          background: "var(--panel)",
          borderTop: "1px solid var(--border-subtle)",
          borderBottom: "1px solid var(--border-subtle)",
        }}
      >
        <div className="section-wrap section-block">
          <SectionTag num="02" label="Principles" />
          <EditorialH2>
            Three things<br />
            <em>that don&apos;t bend.</em>
          </EditorialH2>

          <div className="capabilities-grid" style={{ marginTop: "48px" }}>
            {principles.map((p) => (
              <div key={p.head}>
                <h3 className="editorial-h3">{p.head}</h3>
                <p className="editorial-body">{p.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Real-days process timeline ────────────────────────────────── */}
      <section
        id="process"
        className="section-wrap section-block"
        style={{ scrollMarginTop: "96px" }}
      >
        <SectionTag num="03" label="Process" />
        <EditorialH2>
          Real days,<br />
          <em>not phases.</em>
        </EditorialH2>

        <div style={{ marginTop: "48px" }}>
          {processTimeline.map((step) => (
            <div key={step.marker} className="tier-row">
              <span className="tier-num">{step.marker}</span>
              <div>
                <div className="tier-name">{step.title}</div>
                <div className="tier-body">
                  <p>{step.body}</p>
                </div>
              </div>
              <span aria-hidden />
            </div>
          ))}
        </div>

        <p className="reading-col process-note">
          Most engagements run 4–12 weeks from kickoff to launch. Multi-location ecosystems and
          large programmatic-SEO platforms run on the longer end. The cadence flexes around content
          readiness — we won&apos;t launch a service page that doesn&apos;t have real copy.
        </p>
      </section>

      {/* ── Capabilities (deep-linkable anchor) ───────────────────────── */}
      <section
        id="capabilities"
        style={{
          background: "var(--panel)",
          borderTop: "1px solid var(--border-subtle)",
          borderBottom: "1px solid var(--border-subtle)",
          scrollMarginTop: "96px",
        }}
      >
        <div className="section-wrap section-block">
          <SectionTag num="04" label="Capabilities" />
          <EditorialH2>
            What I build,<br />
            <em>and what I don&apos;t.</em>
          </EditorialH2>

          <div className="capabilities-grid" style={{ marginTop: "48px" }}>
            <div>
              <h3 className="editorial-h3">What I build</h3>
              <ul className="editorial-list">
                {capabilitiesBuild.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="editorial-h3">Verticals I work in</h3>
              <ul className="editorial-list">
                {capabilitiesVerticals.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="editorial-h3">What I don&apos;t do</h3>
              <ul className="editorial-list editorial-list--muted">
                {capabilitiesNot.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* ── Code receipt slot ─────────────────────────────────────────── */}
      <section
        id="code-receipt"
        className="section-wrap section-block"
        style={{ scrollMarginTop: "96px" }}
        aria-label="Code receipt"
      >
        <SectionTag num="05" label="Code receipt" />
        <EditorialH2 className="reading-col">
          Twelve lines<br />
          <em>from a real production file.</em>
        </EditorialH2>

        <p className="reading-col editorial-body" style={{ marginTop: "24px" }}>
          A small, sanitized excerpt from the matrix generator that produces Air Solutions&apos; 135
          city × service pages. Rendered with Shiki at build time.
        </p>

        <div style={{ marginTop: "16px", maxWidth: "760px" }}>
          <CodeReceipt
            highlightedHtml={codeReceiptHtml}
            rawCode={codeReceiptSnippet}
            caption="lib/matrix/generate.ts — Air Solutions, 2026"
            toastMessage="Copied. Lines from lib/matrix/generate.ts — Air Solutions, 2026."
          />
        </div>
      </section>

      {/* ── FAQ ──────────────────────────────────────────────────────── */}
      <div id="faq" style={{ scrollMarginTop: "96px" }}>
        <FaqSection sectionNum="06" />
      </div>

      {/* ── Closing CTA ────────────────────────────────────────────────── */}
      <section className="cover-surface">
        <div className="section-wrap section-block">
          <SectionTag num="07" label="Working together" onDark />
          <EditorialH2 onDark className="reading-col">
            Send a few specifics,<br />
            <em>I&apos;ll send honest notes.</em>
          </EditorialH2>

          <p className="reading-col page-intro__lead">
            Send the business name, a link to the current site, what you&apos;re trying to
            accomplish, an approximate budget, and a timeline. I read every inquiry personally.
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
              Inquire about a project
            </Link>
            <Link href="/work" className="btn-ghost">
              See the work
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
