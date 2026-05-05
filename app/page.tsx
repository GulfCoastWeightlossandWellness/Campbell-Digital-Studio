import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { getProjectBySlug } from "@/lib/projects";
import SectionTag from "@/components/editorial/SectionTag";
import EditorialH2 from "@/components/editorial/EditorialH2";
import Eyebrow from "@/components/editorial/Eyebrow";

export const metadata: Metadata = {
  title:
    "Campbell Digital Studio | Digital infrastructure for clinical practices and local service businesses",
  description:
    "Multi-location medical clinics, trade service brands, and the connected ecosystems they need to grow. Built by a physician with a development background.",
};

const revitalize = getProjectBySlug("revitalize");
const airSolutions = getProjectBySlug("air-solutions");

const capabilitiesBuild = [
  "Multi-location medical and clinical practice ecosystems",
  "Programmatic SEO architectures for local service businesses",
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
  "SEO-only engagements without a build component",
];

const processSteps = [
  {
    n: "01",
    title: "Discovery",
    body:
      "A 30-minute call. We talk through what you have, what you need, and whether this is a fit. No deck, no sales pressure.",
  },
  {
    n: "02",
    title: "Scope and proposal",
    body:
      "Within a week, you receive a written scope, fixed-fee proposal, and timeline. If we're aligned, we move forward. If not, you keep the proposal.",
  },
  {
    n: "03",
    title: "Build",
    body:
      "Typical builds run 4–12 weeks. You get weekly progress updates, direct access to me — no account managers — and a working preview URL from week one.",
  },
  {
    n: "04",
    title: "Launch",
    body:
      "Production deploy, GA4 + GSC setup, redirect mapping if migrating from an existing site, and a 30-day post-launch monitoring period.",
  },
  {
    n: "05",
    title: "Ongoing",
    body:
      "Optional monthly retainer for content additions, SEO monitoring, and feature work. No retainer required to launch.",
  },
];

export default function HomePage() {
  return (
    <>
      {/* ─── § 01 / Hero ─────────────────────────────────────────────── */}
      <section
        className="cover-surface"
        style={{
          minHeight: "min(720px, 92vh)",
          display: "flex",
          flexDirection: "column",
          justifyContent: "flex-end",
        }}
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
          <div style={{ maxWidth: "960px" }}>
            <Eyebrow onDark>§ 01 / Campbell Digital Studio</Eyebrow>
            <h1
              className="display-serif"
              style={{
                fontSize: "clamp(40px, 7vw, 88px)",
                color: "white",
                marginBottom: "clamp(24px, 3vw, 32px)",
                maxWidth: "18ch",
              }}
            >
              Digital infrastructure for{" "}
              <em style={{ color: "var(--gold-400)" }}>
                clinical practices and local service businesses.
              </em>
            </h1>
            <p
              style={{
                fontFamily: "var(--font-manrope), sans-serif",
                fontSize: "clamp(15px, 1.6vw, 18px)",
                lineHeight: 1.65,
                color: "rgba(255,255,255,0.82)",
                maxWidth: "640px",
                fontWeight: 300,
              }}
            >
              Multi-location medical clinics, trade service brands, and the connected ecosystems
              they need to grow. Built by a physician with a development background.
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
            <div style={{ display: "flex", gap: "32px", flexWrap: "wrap", alignItems: "center" }}>
              <Link
                href="/work"
                className="editorial-link arrow-link on-dark"
                style={{
                  fontFamily: "var(--font-jetbrains), monospace",
                  fontSize: "12px",
                  letterSpacing: "0.2em",
                  textTransform: "uppercase",
                  color: "var(--gold-400)",
                }}
              >
                See recent work <span className="arrow" aria-hidden>→</span>
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
                Start a conversation →
              </Link>
            </div>
            <span
              style={{
                fontFamily: "var(--font-jetbrains), monospace",
                fontSize: "10px",
                letterSpacing: "0.18em",
                textTransform: "uppercase",
                color: "rgba(255,255,255,0.5)",
              }}
            >
              Daphne, Alabama · Sole practitioner
            </span>
          </div>
        </div>
      </section>

      {/* ─── Proof bar ────────────────────────────────────────────────── */}
      <section
        style={{
          background: "var(--surface)",
          borderBottom: "1px solid var(--paper-rule)",
        }}
      >
        <div
          className="section-wrap"
          style={{
            paddingTop: "clamp(28px, 4vw, 40px)",
            paddingBottom: "clamp(28px, 4vw, 40px)",
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)",
            gap: "clamp(20px, 4vw, 48px)",
          }}
          // proof-bar uses grid so cells space evenly on desktop, stacks on mobile
        >
          {[
            {
              label: "Active engagements",
              value: "2 live client builds",
              detail: "Revitalize · Air Solutions",
            },
            {
              label: "Verticals",
              value: "Healthcare + home services",
              detail: "The two areas the studio works in",
            },
            {
              label: "Specialty",
              value: "Multi-location architectures",
              detail: "Connected ecosystems, not single sites",
            },
          ].map((cell) => (
            <div key={cell.label}>
              <div
                style={{
                  fontFamily: "var(--font-jetbrains), monospace",
                  fontSize: "10px",
                  letterSpacing: "0.18em",
                  textTransform: "uppercase",
                  color: "var(--gold-700)",
                  fontWeight: 600,
                  marginBottom: "8px",
                }}
              >
                {cell.label}
              </div>
              <div
                style={{
                  fontFamily: "var(--font-fraunces), Georgia, serif",
                  fontSize: "clamp(17px, 2vw, 21px)",
                  fontWeight: 500,
                  color: "var(--navy-900)",
                  lineHeight: 1.25,
                  letterSpacing: "-0.015em",
                  fontVariationSettings: '"opsz" 32',
                  marginBottom: "4px",
                }}
              >
                {cell.value}
              </div>
              <div
                style={{
                  fontFamily: "var(--font-manrope), sans-serif",
                  fontSize: "13px",
                  color: "var(--ink-mute)",
                  lineHeight: 1.5,
                }}
              >
                {cell.detail}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ─── § 02 / Featured Case Study — Revitalize ─────────────────── */}
      {revitalize ? (
        <section className="section-wrap section-block">
          <SectionTag num="02" label="Featured Case Study" />
          <EditorialH2>
            Revitalize Aesthetics<br />
            <em>&amp; Wellness.</em>
          </EditorialH2>

          <p
            className="reading-col"
            style={{
              fontFamily: "var(--font-fraunces), Georgia, serif",
              fontSize: "21px",
              lineHeight: 1.6,
              color: "var(--ink-soft)",
              fontVariationSettings: '"opsz" 24',
              fontStyle: "italic",
              fontWeight: 300,
              marginTop: "24px",
            }}
          >
            {revitalize.shortSummary}
          </p>

          {revitalize.coverImage ? (
            <div
              style={{
                marginTop: "48px",
                position: "relative",
                width: "100%",
                aspectRatio: "16 / 9",
                border: "1px solid var(--paper-rule)",
                overflow: "hidden",
                background: "var(--paper-sand)",
              }}
            >
              <Image
                src={revitalize.coverImage}
                alt="Revitalize Aesthetics & Wellness — homepage"
                fill
                priority
                sizes="(max-width: 1280px) 100vw, 1280px"
                style={{ objectFit: "cover" }}
              />
            </div>
          ) : null}

          <div className="editorial-body reading-col" style={{ marginTop: "48px" }}>
            <p>{revitalize.valueExplainer}</p>
          </div>

          <div style={{ marginTop: "32px" }}>
            <Link
              href={`/work/${revitalize.slug}`}
              className="editorial-link arrow-link mono"
            >
              Read the full case study <span className="arrow" aria-hidden>→</span>
            </Link>
          </div>
        </section>
      ) : null}

      {/* ─── § 03 / Featured Case Study — Air Solutions ──────────────── */}
      {airSolutions ? (
        <section
          style={{
            background: "var(--surface)",
            borderTop: "1px solid var(--paper-rule)",
            borderBottom: "1px solid var(--paper-rule)",
          }}
        >
          <div className="section-wrap section-block">
            <SectionTag num="03" label="Featured Case Study" />
            <EditorialH2>
              Air Solutions<br />
              <em>Heating &amp; Cooling.</em>
            </EditorialH2>

            <p
              className="reading-col"
              style={{
                fontFamily: "var(--font-fraunces), Georgia, serif",
                fontSize: "21px",
                lineHeight: 1.6,
                color: "var(--ink-soft)",
                fontVariationSettings: '"opsz" 24',
                fontStyle: "italic",
                fontWeight: 300,
                marginTop: "24px",
              }}
            >
              {airSolutions.shortSummary}
            </p>

            {airSolutions.coverImage ? (
              <div
                style={{
                  marginTop: "48px",
                  position: "relative",
                  width: "100%",
                  aspectRatio: "16 / 9",
                  border: "1px solid var(--paper-rule)",
                  overflow: "hidden",
                  background: "var(--paper-sand)",
                }}
              >
                <Image
                  src={airSolutions.coverImage}
                  alt="Air Solutions Heating & Cooling — homepage"
                  fill
                  sizes="(max-width: 1280px) 100vw, 1280px"
                  style={{ objectFit: "cover" }}
                />
              </div>
            ) : null}

            <div className="editorial-body reading-col" style={{ marginTop: "48px" }}>
              <p>{airSolutions.valueExplainer}</p>
            </div>

            <div style={{ marginTop: "32px" }}>
              <Link
                href={`/work/${airSolutions.slug}`}
                className="editorial-link arrow-link mono"
              >
                Read the full case study <span className="arrow" aria-hidden>→</span>
              </Link>
            </div>
          </div>
        </section>
      ) : null}

      {/* ─── § 04 / Capabilities ─────────────────────────────────────── */}
      <section id="capabilities" className="section-wrap section-block" style={{ scrollMarginTop: "96px" }}>
        <SectionTag num="04" label="Capabilities" />
        <EditorialH2>
          What I build,<br />
          <em>and what I don&apos;t.</em>
        </EditorialH2>

        <div
          style={{
            marginTop: "56px",
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
            gap: "clamp(40px, 5vw, 64px)",
          }}
        >
          <div>
            <h3 className="editorial-h3" style={{ marginBottom: "16px" }}>
              What I build
            </h3>
            <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
              {capabilitiesBuild.map((item) => (
                <li
                  key={item}
                  style={{
                    position: "relative",
                    padding: "10px 0 10px 22px",
                    fontFamily: "var(--font-manrope), sans-serif",
                    fontSize: "14.5px",
                    lineHeight: 1.6,
                    color: "var(--ink-soft)",
                    borderBottom: "1px solid var(--paper-rule)",
                  }}
                >
                  <span
                    aria-hidden
                    style={{
                      position: "absolute",
                      left: 0,
                      top: "20px",
                      width: "12px",
                      height: "1px",
                      background: "var(--gold-600)",
                    }}
                  />
                  {item}
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="editorial-h3" style={{ marginBottom: "16px" }}>
              Verticals I work in
            </h3>
            <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
              {capabilitiesVerticals.map((item) => (
                <li
                  key={item}
                  style={{
                    position: "relative",
                    padding: "10px 0 10px 22px",
                    fontFamily: "var(--font-manrope), sans-serif",
                    fontSize: "14.5px",
                    lineHeight: 1.6,
                    color: "var(--ink-soft)",
                    borderBottom: "1px solid var(--paper-rule)",
                  }}
                >
                  <span
                    aria-hidden
                    style={{
                      position: "absolute",
                      left: 0,
                      top: "20px",
                      width: "12px",
                      height: "1px",
                      background: "var(--gold-600)",
                    }}
                  />
                  {item}
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="editorial-h3" style={{ marginBottom: "16px" }}>
              What I don&apos;t do
            </h3>
            <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
              {capabilitiesNot.map((item) => (
                <li
                  key={item}
                  style={{
                    position: "relative",
                    padding: "10px 0 10px 22px",
                    fontFamily: "var(--font-manrope), sans-serif",
                    fontSize: "14.5px",
                    lineHeight: 1.6,
                    color: "var(--ink-mute)",
                    borderBottom: "1px solid var(--paper-rule)",
                  }}
                >
                  <span
                    aria-hidden
                    style={{
                      position: "absolute",
                      left: 0,
                      top: "20px",
                      width: "12px",
                      height: "1px",
                      background: "var(--ink-mute)",
                    }}
                  />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* ─── § 05 / Process ──────────────────────────────────────────── */}
      <section
        id="process"
        style={{
          background: "var(--surface)",
          borderTop: "1px solid var(--paper-rule)",
          borderBottom: "1px solid var(--paper-rule)",
          scrollMarginTop: "96px",
        }}
      >
        <div className="section-wrap section-block">
          <SectionTag num="05" label="Process" />
          <EditorialH2>
            How an engagement<br />
            <em>actually runs.</em>
          </EditorialH2>

          <div style={{ marginTop: "48px" }}>
            {processSteps.map((step) => (
              <div key={step.n} className="tier-row">
                <span className="tier-num">{step.n}</span>
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

          <p
            className="reading-col"
            style={{
              marginTop: "48px",
              fontFamily: "var(--font-fraunces), Georgia, serif",
              fontSize: "18px",
              lineHeight: 1.6,
              color: "var(--ink-soft)",
              fontStyle: "italic",
              fontVariationSettings: '"opsz" 24',
            }}
          >
            Most engagements run mid-five figures and up. If your budget is below that, I&apos;ll
            happily refer you to someone good.
          </p>
        </div>
      </section>

      {/* ─── § 06 / About ────────────────────────────────────────────── */}
      <section id="about" className="section-wrap section-block" style={{ scrollMarginTop: "96px" }}>
        <SectionTag num="06" label="About" />
        <EditorialH2 className="reading-col">
          Peyton Campbell, <em>DO.</em>
        </EditorialH2>

        <div className="editorial-body reading-col" style={{ marginTop: "32px" }}>
          <p>
            I&apos;m a physician based in coastal Alabama with a development background that
            predates medical school.
          </p>
          <p>
            The medical work pays the bills and keeps me grounded in the realities clinical
            practices actually face — booking flows, insurance verification, HIPAA-adjacent content
            rules, the difference between marketing voice and clinical voice. The development work
            is what I do when I&apos;m not in clinic. The combination is why my medical clients
            trust me with their sites and why my trade clients trust me with their architectures.
          </p>
          <p>
            Solo, with rigorous AI-assisted workflows. No subcontractors, no offshored work, no
            account managers. You talk to me. I build it. I&apos;m responsible for the outcome.
          </p>
        </div>
      </section>

      {/* ─── § 07 / Contact CTA ──────────────────────────────────────── */}
      <section className="cover-surface">
        <div className="section-wrap section-block">
          <SectionTag num="07" label="Working Together" onDark />
          <EditorialH2 onDark className="reading-col">
            Start a<br />
            <em>conversation.</em>
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
            Send the business name, a link to the current site (or what&apos;s currently in place),
            what you&apos;re trying to accomplish, an approximate budget, and a timeline. I read
            every inquiry personally. If the project is a fit, you&apos;ll hear back within a week
            with a few questions and a suggested next step.
          </p>

          <div
            style={{
              marginTop: "40px",
              display: "flex",
              gap: "32px",
              flexWrap: "wrap",
              alignItems: "center",
            }}
          >
            <Link
              href="/inquire"
              className="editorial-link arrow-link on-dark"
              style={{
                fontFamily: "var(--font-jetbrains), monospace",
                fontSize: "12px",
                letterSpacing: "0.2em",
                textTransform: "uppercase",
                color: "var(--gold-400)",
              }}
            >
              Inquire about a project <span className="arrow" aria-hidden>→</span>
            </Link>
            <Link
              href="/work"
              className="editorial-link on-dark"
              style={{
                fontFamily: "var(--font-jetbrains), monospace",
                fontSize: "12px",
                letterSpacing: "0.2em",
                textTransform: "uppercase",
                color: "rgba(255,255,255,0.7)",
              }}
            >
              See more work →
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
