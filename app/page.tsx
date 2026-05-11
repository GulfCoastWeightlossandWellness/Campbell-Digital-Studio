import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { getProjectBySlug } from "@/lib/projects";
import SectionTag from "@/components/editorial/SectionTag";
import EditorialH2 from "@/components/editorial/EditorialH2";
import Eyebrow from "@/components/editorial/Eyebrow";
import SelectedClients from "@/components/sections/SelectedClients";
import FaqSection from "@/components/sections/FaqSection";
import TestimonialBlock from "@/components/sections/TestimonialBlock";
import HeroAurora from "@/components/HeroAurora";
import { getFeaturedTestimonials } from "@/lib/data/testimonials";
import { faqs } from "@/lib/data/faq";
import { siteConfig } from "@/lib/site-config";

export const metadata: Metadata = {
  title:
    "Campbell Digital Studio | Digital infrastructure for clinical practices and local service businesses",
  description:
    "Multi-location medical clinics, trade service brands, and the connected ecosystems they need to grow. Built by a physician with a development background.",
  alternates: { canonical: "/" },
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

const featuredTestimonials = getFeaturedTestimonials();

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqs.map((f) => ({
    "@type": "Question",
    name: f.question,
    acceptedAnswer: {
      "@type": "Answer",
      text: f.answer,
    },
  })),
};

export default function HomePage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      {/* ─── § 01 / Hero ─────────────────────────────────────────────── */}
      {/* Hero is now in two parts: an editorial header (eyebrow, headline, CTAs)
          and a process-curve centerpiece below. Both live inside one cover-surface
          so the gold top-stripe still reads as a single hero band. */}
      <section
        className="cover-surface"
        style={{
          minHeight: "min(880px, 100vh)",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <div
          className="section-wrap"
          style={{
            paddingTop: "clamp(110px, 16vw, 180px)",
            paddingBottom: "clamp(28px, 4vw, 48px)",
            display: "flex",
            flexDirection: "column",
            gap: "clamp(28px, 4vw, 44px)",
          }}
        >
          <div style={{ maxWidth: "960px" }}>
            <Eyebrow onDark>§ 01 / Campbell Digital Studio</Eyebrow>
            <h1
              className="display-sans display-96"
              style={{
                marginBottom: "clamp(24px, 3vw, 32px)",
                maxWidth: "18ch",
              }}
            >
              Digital infrastructure for{" "}
              <em>clinical practices and local service businesses.</em>
            </h1>
            <p
              style={{
                fontFamily: "var(--font-geist-sans), system-ui, sans-serif",
                fontSize: "clamp(16px, 1.6vw, 19px)",
                lineHeight: 1.55,
                color: "var(--ink-2)",
                maxWidth: "640px",
                fontWeight: 400,
                letterSpacing: "-0.01em",
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
              borderTop: "1px solid var(--border-default)",
              paddingTop: "24px",
            }}
          >
            <div style={{ display: "flex", gap: "20px", flexWrap: "wrap", alignItems: "center" }}>
              <Link href="/inquire" className="btn-fill">
                Start a conversation
              </Link>
              <Link href="/work" className="btn-ghost">
                See recent work
              </Link>
              {siteConfig.calUsername ? (
                <Link
                  href="/call"
                  className="editorial-link mono on-dark"
                  style={{
                    fontFamily: "var(--font-geist-mono), var(--font-jetbrains), monospace",
                    fontSize: "11px",
                    letterSpacing: "0.18em",
                    textTransform: "uppercase",
                    color: "var(--ink-3)",
                  }}
                >
                  Or book a 20-min call →
                </Link>
              ) : null}
            </div>
            <span
              style={{
                fontFamily: "var(--font-geist-mono), var(--font-jetbrains), monospace",
                fontSize: "10px",
                letterSpacing: "0.18em",
                textTransform: "uppercase",
                color: "var(--ink-4)",
              }}
            >
              Daphne, Alabama · Sole practitioner
            </span>
          </div>
        </div>

        {/* Process-curve centerpiece — fills the lower half of the hero on desktop,
            collapses to a stacked timeline on mobile. Same five steps as §05 Process,
            surfaced earlier as a visual anchor. */}
        <div
          className="section-wrap"
          style={{
            paddingTop: "clamp(8px, 2vw, 24px)",
            paddingBottom: "clamp(40px, 6vw, 72px)",
            marginTop: "auto",
          }}
        >
          <HeroAurora />
        </div>
      </section>

      {/* ─── Proof bar ────────────────────────────────────────────────── */}
      <section
        style={{
          background: "var(--panel)",
          borderBottom: "1px solid var(--border-subtle)",
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
                  fontFamily: "var(--font-geist-mono), var(--font-jetbrains), monospace",
                  fontSize: "10px",
                  letterSpacing: "0.18em",
                  textTransform: "uppercase",
                  color: "var(--aurora-violet)",
                  fontWeight: 600,
                  marginBottom: "8px",
                }}
              >
                {cell.label}
              </div>
              <div
                style={{
                  fontFamily: "var(--font-geist-sans), system-ui, sans-serif",
                  fontSize: "clamp(17px, 2vw, 21px)",
                  fontWeight: 500,
                  color: "var(--ink-1)",
                  lineHeight: 1.25,
                  letterSpacing: "-0.018em",
                  marginBottom: "4px",
                }}
              >
                {cell.value}
              </div>
              <div
                style={{
                  fontFamily: "var(--font-geist-sans), system-ui, sans-serif",
                  fontSize: "13px",
                  color: "var(--ink-3)",
                  lineHeight: 1.5,
                }}
              >
                {cell.detail}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ─── § Selected Clients (renders only when ≥2 clients consent) ── */}
      <SelectedClients sectionNum="§ 02" />

      {/* ─── § Featured testimonials (renders only when at least one has a real quote) ── */}
      {featuredTestimonials.length > 0 ? (
        <section className="section-wrap section-block-tight">
          <SectionTag num="§ 03" label="What clients say" />
          <div style={{ marginTop: "32px", display: "grid", gap: "48px" }}>
            {featuredTestimonials.map((t) => (
              <TestimonialBlock key={t.id} testimonial={t} />
            ))}
          </div>
        </section>
      ) : null}

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
                border: "1px solid var(--border-default)",
                borderRadius: "12px",
                overflow: "hidden",
                background: "var(--panel)",
                boxShadow: "0 30px 80px -40px rgba(199, 123, 67, 0.25)",
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
            background: "var(--panel)",
            borderTop: "1px solid var(--border-subtle)",
            borderBottom: "1px solid var(--border-subtle)",
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
                  border: "1px solid var(--border-default)",
                  borderRadius: "12px",
                  overflow: "hidden",
                  background: "var(--surface)",
                  boxShadow: "0 30px 80px -40px rgba(160, 106, 74, 0.22)",
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
                    fontFamily: "var(--font-geist-sans), system-ui, sans-serif",
                    fontSize: "14.5px",
                    lineHeight: 1.6,
                    color: "var(--ink-2)",
                    borderBottom: "1px solid var(--border-subtle)",
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
                      background: "var(--aurora-violet)",
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
                    fontFamily: "var(--font-geist-sans), system-ui, sans-serif",
                    fontSize: "14.5px",
                    lineHeight: 1.6,
                    color: "var(--ink-2)",
                    borderBottom: "1px solid var(--border-subtle)",
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
                      background: "var(--aurora-violet)",
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
                    fontFamily: "var(--font-geist-sans), system-ui, sans-serif",
                    fontSize: "14.5px",
                    lineHeight: 1.6,
                    color: "var(--ink-3)",
                    borderBottom: "1px solid var(--border-subtle)",
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
                      background: "var(--ink-4)",
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
          background: "var(--panel)",
          borderTop: "1px solid var(--border-subtle)",
          borderBottom: "1px solid var(--border-subtle)",
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
              fontSize: "19px",
              lineHeight: 1.55,
              color: "var(--ink-2)",
              fontStyle: "italic",
              fontWeight: 300,
              fontVariationSettings: '"opsz" 32',
            }}
          >
            Most engagements run mid-five figures and up. If your budget is below that, I&apos;ll
            happily refer you to someone good.
          </p>
        </div>
      </section>

      {/* ─── § 06 / Common Questions ─────────────────────────────────── */}
      <FaqSection sectionNum="06" />

      {/* ─── § 07 / About ────────────────────────────────────────────── */}
      <section id="about" className="section-wrap section-block" style={{ scrollMarginTop: "96px" }}>
        <SectionTag num="07" label="About" />
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

      {/* ─── § 08 / Contact CTA ──────────────────────────────────────── */}
      <section className="cover-surface">
        <div className="section-wrap section-block">
          <SectionTag num="08" label="Working Together" onDark />
          <EditorialH2 onDark className="reading-col">
            Start a<br />
            <em>conversation.</em>
          </EditorialH2>

          <p
            className="reading-col"
            style={{
              fontFamily: "var(--font-geist-sans), system-ui, sans-serif",
              fontSize: "17px",
              lineHeight: 1.65,
              color: "var(--ink-2)",
              marginTop: "24px",
              fontWeight: 400,
              letterSpacing: "-0.01em",
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
              gap: "20px",
              flexWrap: "wrap",
              alignItems: "center",
            }}
          >
            <Link href="/inquire" className="btn-fill">
              Inquire about a project
            </Link>
            <Link href="/work" className="btn-ghost">
              See more work
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
