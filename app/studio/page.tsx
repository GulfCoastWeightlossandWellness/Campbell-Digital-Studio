import type { Metadata } from "next";
import Link from "next/link";
import SectionTag from "@/components/editorial/SectionTag";
import EditorialH2 from "@/components/editorial/EditorialH2";
import Eyebrow from "@/components/editorial/Eyebrow";
import Cadence from "@/components/editorial/Cadence";

export const metadata: Metadata = {
  title: "Studio",
  description:
    "Campbell Digital Studio is a small practice run alongside residency, building modern websites and local-search infrastructure for clinics, wellness practices, and local businesses.",
};

const differentiators = [
  {
    title: "Physician perspective",
    body:
      "I understand how patients think when they're searching for a provider, comparing options, or navigating a sensitive health decision. That changes what gets built. Copy is calibrated for trust. Service pages address actual patient questions. The booking flow is designed around reducing hesitation.",
  },
  {
    title: "Business understanding",
    body:
      "A website doesn't exist in isolation. I look at the business model, the service mix, the local competition, the pricing structure, and what makes a patient or customer actually choose this business over another. The site is built around that answer.",
  },
  {
    title: "Modern development workflow",
    body:
      "Next.js, React, TypeScript, Tailwind — deployed on Vercel. Fast, clean production builds without the overhead of a traditional agency. No bloated site builders. No template packs. No layers of account management between the brief and the work.",
  },
  {
    title: "Practical execution",
    body:
      "It’s a one-person studio. There are no account managers, creative directors, or billing departments between you and the work. Direct communication, honest scoping, and a working site at the end.",
  },
  {
    title: "Senior-independent rate, founder-built engagements",
    body:
      "Every recent build has been valued by independent component-by-component audit at $250K–$600K replacement cost. They sell for a fraction of that — because the studio is small, the engagements are direct, and the relationships matter more than the rate card.",
  },
];

export default function StudioPage() {
  return (
    <>
      {/* ─── Hero ─────────────────────────────────────────────────── */}
      <section
        className="section-wrap"
        style={{ paddingTop: "clamp(96px, 14vw, 160px)", paddingBottom: "clamp(48px, 6vw, 80px)" }}
      >
        <Eyebrow>§ Studio / About the Practice</Eyebrow>
        <h1
          className="display-serif"
          style={{
            fontSize: "clamp(48px, 8vw, 96px)",
            color: "var(--navy-900)",
            marginBottom: "16px",
            maxWidth: "14ch",
          }}
        >
          Peyton Campbell.
        </h1>
        <p
          className="reading-col"
          style={{
            fontFamily: "var(--font-fraunces), Georgia, serif",
            fontSize: "21px",
            fontStyle: "italic",
            fontWeight: 300,
            lineHeight: 1.5,
            color: "var(--navy-700)",
            fontVariationSettings: '"opsz" 24',
          }}
        >
          Family medicine resident. Studio of one. Building programmatic local-search platforms for
          clinics, practices, and the kind of local businesses that still answer their own phone — full-stack
          from sitemap to launch, then 24 months operating the system after.
        </p>

        {/* TODO: portrait photo — typography-only fallback rendering */}
      </section>

      {/* ─── § 01 / Origin ───────────────────────────────────────── */}
      <section className="section-wrap section-block-tight">
        <SectionTag num="01" label="Origin" />
        <EditorialH2 className="reading-col">
          Why the studio<br />
          <em>exists at all.</em>
        </EditorialH2>

        <div className="editorial-body reading-col" style={{ marginTop: "32px" }}>
          <p>
            I started building websites because I kept seeing businesses with real value being
            represented by websites that did not match the quality of the service they provided. A
            practice with excellent physicians and a genuinely caring team, represented by a 2012
            template site with a broken booking link and a page that still listed a doctor who
            retired four years ago.
          </p>
          <p>
            Medical and local-business websites are a specific problem. They are not the same as a
            SaaS landing page or a personal portfolio. The patient or customer who lands on them is
            often in a different headspace — comparing providers, navigating a sensitive decision,
            trying to understand if this place is right for them. The site has to earn that trust
            quickly.
          </p>
          <p>
            My clinical training shapes how I build. I think about the patient journey the way I
            think about a clinical encounter — what does this person need to understand, what
            questions do they have, and what would make them confident enough to take the next step.
          </p>
        </div>
      </section>

      {/* ─── § 02 / How I Think About This ───────────────────────── */}
      <section style={{ background: "var(--surface)", borderTop: "1px solid var(--paper-rule)", borderBottom: "1px solid var(--paper-rule)" }}>
        <div className="section-wrap section-block-tight">
          <SectionTag num="02" label="How I Think About This" />
          <EditorialH2 className="reading-col">
            Not just looking<br />
            <em>at the website.</em>
          </EditorialH2>

          <div className="editorial-body reading-col" style={{ marginTop: "32px" }}>
            <p>
              When I review a medical or local-business website, I’m not looking at it as a
              designer who sees a layout problem. I’m looking at it as someone who understands the
              patient journey, the business model, the services, the local-search opportunity, and
              the trust signals that make someone actually book.
            </p>
            <p>
              That perspective changes what gets built. Service pages are written for what patients
              actually search. Copy is calibrated for someone who is nervous, comparing options, or
              navigating a sensitive decision. The booking flow is designed around reducing
              friction at the moment someone is ready to commit.
            </p>
          </div>
        </div>
      </section>

      {/* ─── § 03 / What Makes This Different ────────────────────── */}
      <section className="section-wrap section-block-tight">
        <SectionTag num="03" label="What Makes This Different" />
        <EditorialH2>
          Not an agency.<br />
          <em>Not a generalist.</em>
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
          The combination of clinical training, business understanding, and modern technical
          workflow produces a different kind of web build.
        </p>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr",
            gap: "0",
            marginTop: "48px",
            borderTop: "1px solid var(--paper-rule)",
          }}
        >
          {differentiators.map((d, i) => (
            <div
              key={d.title}
              style={{
                display: "grid",
                gridTemplateColumns: "60px 1fr",
                gap: "24px",
                padding: "32px 0",
                borderBottom: "1px solid var(--paper-rule)",
                alignItems: "start",
              }}
              className="differentiator-row"
            >
              <span
                style={{
                  fontFamily: "var(--font-fraunces), Georgia, serif",
                  fontSize: "32px",
                  fontWeight: 600,
                  color: "var(--gold-600)",
                  lineHeight: 1,
                  letterSpacing: "-0.03em",
                  fontVariationSettings: '"opsz" 144',
                }}
              >
                0{i + 1}
              </span>
              <div className="reading-col">
                <h3 className="editorial-h3" style={{ marginBottom: "12px" }}>
                  {d.title}
                </h3>
                <p
                  style={{
                    fontFamily: "var(--font-manrope), sans-serif",
                    fontSize: "15px",
                    lineHeight: 1.7,
                    color: "var(--ink-soft)",
                  }}
                >
                  {d.body}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ─── § 04 / Beyond Websites ─────────────────────────────── */}
      <section style={{ background: "var(--surface)", borderTop: "1px solid var(--paper-rule)", borderBottom: "1px solid var(--paper-rule)" }}>
        <div className="section-wrap section-block-tight">
          <SectionTag num="04" label="Beyond Websites" />
          <EditorialH2 className="reading-col">
            A separate product:<br />
            <em>Interactive Health Education.</em>
          </EditorialH2>

          <div className="editorial-body reading-col" style={{ marginTop: "32px" }}>
            <p>
              Alongside the studio I build Interactive Health Education — a B2B platform with 145+
              physician-authored interactive patient-education modules. It’s a separate body of
              work, but it informs how I build clinical websites: every site I ship benefits from
              having looked at clinical content from both ends.
            </p>
          </div>

          <div style={{ marginTop: "32px" }}>
            <Link
              href="/work/interactive-health-education"
              className="editorial-link arrow-link mono"
            >
              Read the case study <span className="arrow" aria-hidden>→</span>
            </Link>
          </div>
        </div>
      </section>

      {/* ─── § 05 / Quick Facts (cadence) ────────────────────────── */}
      <section className="section-wrap section-block-tight">
        <SectionTag num="05" label="Quick Facts" />
        <Cadence
          cells={[
            {
              label: "Role",
              value: "PGY-1 Family Medicine Resident",
              detail: "Training alongside the studio.",
            },
            {
              label: "Location",
              value: "Baldwin County, Alabama",
              detail: "Daphne · Mobile · Eastern Shore.",
            },
            {
              label: "Stack",
              value: "Next.js, TypeScript, Tailwind, Vercel",
              detail: "Modern, fast, production-ready.",
            },
          ]}
        />
      </section>

      {/* ─── Closing CTA ─────────────────────────────────────────── */}
      <section className="section-wrap section-block-tight">
        <div style={{ borderTop: "1px solid var(--paper-rule)", paddingTop: "48px" }}>
          <Link
            href="/inquire"
            className="editorial-link arrow-link"
            style={{
              fontFamily: "var(--font-fraunces), Georgia, serif",
              fontSize: "clamp(28px, 4vw, 40px)",
              fontWeight: 400,
              color: "var(--navy-900)",
              letterSpacing: "-0.02em",
              fontVariationSettings: '"opsz" 144',
              fontStyle: "italic",
            }}
          >
            Inquire about a project <span className="arrow" aria-hidden style={{ fontStyle: "normal" }}>→</span>
          </Link>
        </div>
      </section>
    </>
  );
}
