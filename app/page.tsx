import type { Metadata } from "next";
import Link from "next/link";
import { getProjectBySlug } from "@/lib/projects";
import SectionTag from "@/components/editorial/SectionTag";
import EditorialH2 from "@/components/editorial/EditorialH2";
import Eyebrow from "@/components/editorial/Eyebrow";
import SelectedClients from "@/components/sections/SelectedClients";
import FaqSection from "@/components/sections/FaqSection";
import TestimonialBlock from "@/components/sections/TestimonialBlock";
import FeaturedWorkPreview from "@/components/sections/FeaturedWorkPreview";
import { getFeaturedTestimonials } from "@/lib/data/testimonials";
import { faqs } from "@/lib/data/faq";
import { siteConfig } from "@/lib/site-config";

export const metadata: Metadata = {
  title:
    "Campbell Digital Studio | Digital infrastructure for clinical practices and local service businesses",
  description:
    "Websites, programmatic SEO, and Google Business Profile operations for multi-location medical clinics and trade service brands. Built by a physician with a development background.",
  alternates: { canonical: "/" },
};

const revitalize = getProjectBySlug("revitalize");
const airSolutions = getProjectBySlug("air-solutions");

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
      "Optional monthly retainer for content additions, Google Business Profile operations (reviews, photos, posts, API automation), SEO monitoring, and feature work. Standalone GBP retainers are available for businesses with an existing site that won't be rebuilt. No retainer required to launch.",
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
      <section className="cover-surface home-hero">
        <div className="section-wrap home-hero__inner">
          <div className="home-hero__headline">
            <Eyebrow onDark>01 / Campbell Digital Studio</Eyebrow>
            <h1 className="display-sans display-96">
              Digital infrastructure for{" "}
              <em>clinical practices and local service businesses.</em>
            </h1>
            <p className="home-hero__lead">
              Multi-location medical clinics, trade service brands, and the connected ecosystems
              they need to grow. Built by a physician with a development background.
            </p>
          </div>

          <div className="home-hero__bar">
            <div className="home-hero__actions">
              <Link href="/inquire" className="btn-fill">
                Start a conversation
              </Link>
              <Link href="/work" className="btn-ghost">
                See recent work
              </Link>
              {siteConfig.calUsername ? (
                <Link href="/call" className="editorial-link mono on-dark">
                  Or book a 20-min call →
                </Link>
              ) : null}
            </div>
            <span className="home-hero__meta">Daphne, Alabama · Sole practitioner</span>
          </div>
        </div>

      </section>

      {/* ─── Proof bar ────────────────────────────────────────────────── */}
      <section className="home-proof-bar" aria-label="Studio snapshot">
        <div className="section-wrap home-proof-bar__grid">
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
              <div className="proof-label">{cell.label}</div>
              <div className="proof-value">{cell.value}</div>
              <div className="proof-detail">{cell.detail}</div>
            </div>
          ))}
        </div>
      </section>

      {/* ─── Selected Clients (renders only when ≥2 clients consent) ── */}
      <SelectedClients sectionNum="02" />

      {/* ─── § Featured testimonials (renders only when at least one has a real quote) ── */}
      {featuredTestimonials.length > 0 ? (
        <section className="section-wrap section-block-tight">
          <SectionTag num="03" label="What clients say" />
          <div style={{ marginTop: "32px", display: "grid", gap: "48px" }}>
            {featuredTestimonials.map((t) => (
              <TestimonialBlock key={t.id} testimonial={t} />
            ))}
          </div>
        </section>
      ) : null}

      {/* ─── Featured work (compact preview → full case studies on /work) ── */}
      {revitalize && airSolutions ? (
        <FeaturedWorkPreview projects={[revitalize, airSolutions]} sectionNum="04" />
      ) : null}

      {/* ─── Capabilities ─────────────────────────────────────── */}
      <section id="capabilities" className="section-wrap section-block" style={{ scrollMarginTop: "96px" }}>
        <SectionTag num="05" label="Capabilities" />
        <EditorialH2>
          What I build,<br />
          <em>and what I don&apos;t.</em>
        </EditorialH2>

        <div className="capabilities-grid">
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
          <SectionTag num="06" label="Process" />
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

          <p className="reading-col process-note">
            Most engagements run mid-five figures and up. If your budget is below that, I&apos;ll
            happily refer you to someone good.
          </p>
        </div>
      </section>

      {/* ─── § 06 / Common Questions ─────────────────────────────────── */}
      <FaqSection sectionNum="07" />

      {/* ─── § 07 / About ────────────────────────────────────────────── */}
      <section id="about" className="section-wrap section-block" style={{ scrollMarginTop: "96px" }}>
        <SectionTag num="08" label="About" />
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
          <SectionTag num="09" label="Working Together" onDark />
          <EditorialH2 onDark className="reading-col">
            Start a<br />
            <em>conversation.</em>
          </EditorialH2>

          <p className="reading-col page-intro__lead">
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
