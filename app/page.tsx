import type { Metadata } from "next";
import Link from "next/link";
import { projects } from "@/lib/projects";
import SectionTag from "@/components/editorial/SectionTag";
import EditorialH2 from "@/components/editorial/EditorialH2";
import Eyebrow from "@/components/editorial/Eyebrow";
import IndexRow from "@/components/editorial/IndexRow";

export const metadata: Metadata = {
  title: "Campbell Digital Studio | Editorial Websites for Clinics and Local Businesses",
  description:
    "A small studio building modern websites and local-search infrastructure for clinics, wellness practices, and the kind of local businesses that still answer their own phone.",
};

const projectYears: Record<string, string> = {
  "air-solutions": "2026",
  revitalize: "2026",
  "interactive-health-education": "2025",
  acexperts: "2025",
  "collective-counseling": "2024",
  "blessed-barbershop": "2024",
};

const projectMeta: Record<string, string> = {
  "air-solutions": "HVAC · 249 routes · 4 posts/wk · 24-mo retainer",
  revitalize: "Medical Wellness · 50+ routes · 2 posts/wk · 24-mo retainer",
  "interactive-health-education": "Digital Health Platform · 145 apps",
  acexperts: "HVAC · 30+ routes · 3D tool",
  "collective-counseling": "Therapy · ADHD Testing · 4 routes",
  "blessed-barbershop": "Barbershop · 1 route · Mobile-first",
};

const principles = [
  {
    num: "01",
    title: (
      <>
        Architecture <em>before</em> aesthetics.
      </>
    ),
    body:
      "Every project starts with a sitemap, a service hierarchy, and the local-search structure. The visual design is the last layer, not the first. Most “redesigns” fail because they were aesthetic exercises on a broken foundation.",
  },
  {
    num: "02",
    title: (
      <>
        Copy is <em>the</em> deliverable.
      </>
    ),
    body:
      "A clinic's homepage is a piece of writing. The job is to make a hesitant person feel safe enough to call. That's a writing problem disguised as a design problem, and most agencies solve only half of it.",
  },
  {
    num: "03",
    title: (
      <>
        A matrix, <em>not a brochure.</em>
      </>
    ),
    body:
      "Most local-business sites have 15–40 pages. The recent ones run 250 pages on launch day and grow to 650 inside 24 months. The job isn’t to ship a website — it’s to give the business a city × service matrix dense enough that no competitor can match the surface area. Architecture is the strategy.",
  },
];

const studioMakes = [
  {
    n: "01",
    title: "Medical practice websites",
    body:
      "Primary care, DPC, urgent care, and specialty clinics that need patient-facing sites built around the actual patient journey.",
  },
  {
    n: "02",
    title: "Therapy and counseling websites",
    body:
      "Practice sites that balance professionalism and approachability for clients navigating sensitive decisions.",
  },
  {
    n: "03",
    title: "Medspa and wellness clinics",
    body:
      "Conversion-focused sites for aesthetic, hormone, and wellness practices with complex service menus.",
  },
  {
    n: "04",
    title: "Local service businesses",
    body:
      "HVAC, trades, and home services where stronger local SEO and clearer service pages move the needle.",
  },
  {
    n: "05",
    title: "Patient-education tools",
    body:
      "Assessments, calculators, treatment finders, and education modules built for clinical settings.",
  },
  {
    n: "06",
    title: "Rebuilds and SEO migrations",
    body:
      "Turning outdated or template-based sites into modern, structured platforms without losing existing rankings.",
  },
];

const currently = [
  {
    label: "Now",
    body:
      "Operating two 24-month retainers: Air Solutions (4 posts/week) and Revitalize Aesthetics & Wellness (2 posts/week).",
  },
  {
    label: "Live",
    body:
      "Air Solutions Heating & Cooling — 249 pages at launch, growing to 650+ URLs through May 2028. Programmatic SEO across 15 cities × 9 services.",
  },
  {
    label: "Next",
    body: "Inquiries open for fall 2026. Two project slots.",
  },
  {
    label: "Location",
    body: "Daphne, Alabama. Family Medicine, PGY-1.",
  },
];

export default function HomePage() {
  return (
    <>
      {/* ─── Hero ─────────────────────────────────────────────────── */}
      <section
        className="cover-surface"
        style={{ minHeight: "min(720px, 92vh)", display: "flex", flexDirection: "column", justifyContent: "flex-end" }}
      >
        <div
          className="section-wrap"
          style={{
            paddingTop: "clamp(120px, 18vw, 200px)",
            paddingBottom: "clamp(56px, 8vw, 96px)",
            display: "flex",
            flexDirection: "column",
            gap: "clamp(40px, 6vw, 72px)",
          }}
        >
          <div style={{ maxWidth: "920px" }}>
            <Eyebrow onDark>§ 01 / Campbell Digital Studio · Baldwin County, Alabama</Eyebrow>
            <h1
              className="display-serif"
              style={{
                fontSize: "clamp(40px, 7vw, 88px)",
                color: "white",
                marginBottom: "clamp(24px, 3vw, 32px)",
                maxWidth: "16ch",
              }}
            >
              The web for businesses<br />
              <em style={{ color: "var(--gold-400)" }}>that earn trust by hand.</em>
            </h1>
            <p
              style={{
                fontFamily: "var(--font-manrope), sans-serif",
                fontSize: "clamp(15px, 1.6vw, 18px)",
                lineHeight: 1.6,
                color: "rgba(255,255,255,0.78)",
                maxWidth: "620px",
                fontWeight: 300,
              }}
            >
              A small studio building <strong>programmatic local-search platforms</strong> for clinics,
              wellness practices, and the kind of local businesses that still answer their own phone — the
              same architectural pattern Airbnb, Zapier, and Zillow use, applied at the scale of a single county.
            </p>
          </div>

          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "flex-end",
              flexWrap: "wrap",
              gap: "32px",
              borderTop: "1px solid rgba(232,196,107,0.25)",
              paddingTop: "28px",
            }}
          >
            <Link
              href="/review"
              className="editorial-link arrow-link on-dark"
              style={{
                fontFamily: "var(--font-jetbrains), monospace",
                fontSize: "12px",
                letterSpacing: "0.2em",
                textTransform: "uppercase",
                color: "var(--gold-400)",
              }}
            >
              Request a Website Review <span className="arrow" aria-hidden>→</span>
            </Link>
            <span
              style={{
                fontFamily: "var(--font-jetbrains), monospace",
                fontSize: "10px",
                letterSpacing: "0.18em",
                textTransform: "uppercase",
                color: "rgba(255,255,255,0.5)",
              }}
            >
              Established 2024 · Sole practitioner
            </span>
          </div>
        </div>
      </section>

      {/* ─── § 02 / Selected Work ─────────────────────────────────── */}
      <section className="section-wrap section-block">
        <SectionTag num="02" label="Selected Work" />
        <EditorialH2>
          Recent projects,<br />
          <em>through the lens of a clinic.</em>
        </EditorialH2>

        <div style={{ marginTop: "48px" }}>
          {projects.map((p) => (
            <IndexRow
              key={p.slug}
              href={`/work/${p.slug}`}
              year={projectYears[p.slug] ?? ""}
              title={p.title}
              meta={projectMeta[p.slug] ?? p.category}
            />
          ))}
        </div>

        <div style={{ marginTop: "32px" }}>
          <Link href="/work" className="editorial-link arrow-link mono">
            View all projects <span className="arrow" aria-hidden>→</span>
          </Link>
        </div>
      </section>

      {/* ─── § 03 / The Studio ────────────────────────────────────── */}
      <section className="section-wrap section-block" style={{ background: "var(--surface)", marginLeft: 0, marginRight: 0, maxWidth: "100%" }}>
        <div className="section-wrap" style={{ paddingLeft: 0, paddingRight: 0 }}>
          <SectionTag num="03" label="The Studio" />
          <EditorialH2 className="reading-col">
            A studio of one,<br />
            <em>practiced like a clinic.</em>
          </EditorialH2>

          <div className="editorial-body reading-col" style={{ marginTop: "32px" }}>
            <p>
              Most local-business websites are built by people who have never sat in a waiting room
              with the patient who’s about to read them. I have. I’ve also written discharge
              instructions, watched families decide between providers, and seen what gets a nervous
              person to follow through.
            </p>
            <p>
              Campbell Digital Studio is the small practice I run alongside residency. It’s
              deliberately small. The work is full-stack — strategy, architecture, copy, build,
              launch — and the only person between the brief and the finished site is me.
            </p>
            <p>
              The result is the work in the index above: clinics, practices, and local businesses
              with sites that read like they were built by someone who knows the difference between
              a brochure and a first impression.
            </p>
          </div>

          <div style={{ marginTop: "32px" }}>
            <Link href="/studio" className="editorial-link arrow-link mono">
              Read more about the studio <span className="arrow" aria-hidden>→</span>
            </Link>
          </div>
        </div>
      </section>

      {/* ─── § 04 / How the Work Gets Made ───────────────────────── */}
      <section className="section-wrap section-block">
        <SectionTag num="04" label="How the Work Gets Made" />
        <EditorialH2>
          Three principles<br />
          <em>the studio runs on.</em>
        </EditorialH2>

        <div style={{ marginTop: "48px" }}>
          {principles.map((p) => (
            <div key={p.num} className="tier-row">
              <span className="tier-num">{p.num}</span>
              <div>
                <div className="tier-name">{p.title}</div>
                <div className="tier-body">
                  <p>{p.body}</p>
                </div>
              </div>
              <span aria-hidden />
            </div>
          ))}
        </div>
      </section>

      {/* ─── § 05 / What the Studio Makes ────────────────────────── */}
      <section style={{ background: "var(--surface)", borderTop: "1px solid var(--paper-rule)", borderBottom: "1px solid var(--paper-rule)" }}>
        <div className="section-wrap section-block">
          <SectionTag num="05" label="What the Studio Makes" />
          <EditorialH2>
            A focused practice.<br />
            <em>Six things, done well.</em>
          </EditorialH2>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(2, 1fr)",
              gap: "clamp(24px, 4vw, 48px) clamp(32px, 5vw, 72px)",
              marginTop: "48px",
            }}
            className="studio-makes-grid"
          >
            {studioMakes.map((s) => (
              <div key={s.n}>
                <span
                  style={{
                    fontFamily: "var(--font-jetbrains), monospace",
                    fontSize: "11px",
                    letterSpacing: "0.18em",
                    color: "var(--gold-700)",
                    textTransform: "uppercase",
                    fontWeight: 600,
                  }}
                >
                  {s.n}
                </span>
                <h3 className="editorial-h3" style={{ marginTop: "8px", marginBottom: "8px" }}>
                  {s.title}
                </h3>
                <p style={{ fontSize: "15px", lineHeight: 1.65, color: "var(--ink-soft)" }}>
                  {s.body}
                </p>
              </div>
            ))}
          </div>

          <div style={{ marginTop: "48px" }}>
            <Link href="/practice" className="editorial-link arrow-link mono">
              Full practice details <span className="arrow" aria-hidden>→</span>
            </Link>
          </div>
        </div>

        <style>{`
          @media (max-width: 720px) {
            .studio-makes-grid { grid-template-columns: 1fr !important; }
          }
        `}</style>
      </section>

      {/* ─── § 06 / Currently ────────────────────────────────────── */}
      <section className="section-wrap section-block-tight">
        <SectionTag num="06" label="Currently" />

        <div className="currently-strip" style={{ marginTop: "16px" }}>
          {currently.map((row) => (
            <div key={row.label} className="currently-row">
              <span className="label">{row.label}</span>
              <span className="body">{row.body}</span>
            </div>
          ))}
        </div>
      </section>

      {/* ─── Closing ─────────────────────────────────────────────── */}
      <section className="cover-surface">
        <div className="section-wrap section-block">
          <SectionTag num="07" label="Working Together" onDark />
          <EditorialH2 onDark className="reading-col">
            A site that does<br />
            <em>the work for you.</em>
          </EditorialH2>

          <p
            className="reading-col"
            style={{
              fontFamily: "var(--font-manrope), sans-serif",
              fontSize: "17px",
              lineHeight: 1.65,
              color: "rgba(255,255,255,0.82)",
              marginTop: "24px",
              fontWeight: 300,
            }}
          >
            The most useful starting point is to send a link to the current site. The review is
            free, takes about a week, and comes back as a written read of the architecture, copy,
            local-search structure, and conversion gaps. No two engagements have looked the same —
            and that’s the point.
          </p>

          <div style={{ marginTop: "40px", display: "flex", gap: "32px", flexWrap: "wrap", alignItems: "center" }}>
            <Link
              href="/review"
              className="editorial-link arrow-link on-dark"
              style={{
                fontFamily: "var(--font-jetbrains), monospace",
                fontSize: "12px",
                letterSpacing: "0.2em",
                textTransform: "uppercase",
                color: "var(--gold-400)",
              }}
            >
              Request Website Review <span className="arrow" aria-hidden>→</span>
            </Link>
            <Link
              href="/inquire"
              className="editorial-link on-dark"
              style={{
                fontFamily: "var(--font-jetbrains), monospace",
                fontSize: "12px",
                letterSpacing: "0.2em",
                textTransform: "uppercase",
                color: "rgba(255,255,255,0.7)",
              }}
            >
              Or, inquire directly →
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
