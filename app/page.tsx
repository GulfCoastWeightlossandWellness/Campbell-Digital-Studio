import type { Metadata } from "next";
import Link from "next/link";
import { getProjectBySlug } from "@/lib/projects";
import InViewReveal from "@/components/scroll/InViewReveal";
import KineticHeadline from "@/components/scroll/KineticHeadline";
import SectionTag from "@/components/editorial/SectionTag";
import EditorialH2 from "@/components/editorial/EditorialH2";
import FaqSection from "@/components/sections/FaqSection";
import TestimonialBlock from "@/components/sections/TestimonialBlock";
import FeaturedWorkPreview from "@/components/sections/FeaturedWorkPreview";
import Hero from "@/components/sections/Hero";
import IHEMosaic from "@/components/sections/IHEMosaic";
import OwnersRow from "@/components/sections/OwnersRow";
import IHEDemoVideo from "@/components/sections/IHEDemoVideo";
import SelectedClientsRow from "@/components/sections/SelectedClientsRow";
import MatrixDemo from "@/components/sections/MatrixDemo";
import { CITIES, SERVICES } from "@/lib/matrix/corpus";
import { proofBarCounts } from "@/lib/data/clients";
import { getFeaturedTestimonials } from "@/lib/data/testimonials";
import { faqs } from "@/lib/data/faq";

export const metadata: Metadata = {
  title:
    "Campbell Digital Studio | Digital infrastructure for clinical practices and local service businesses",
  description:
    "Multi-location architectures, programmatic SEO, and Google Business Profile operations — built end-to-end by a physician who codes.",
  alternates: { canonical: "/" },
};

const revitalize = getProjectBySlug("revitalize");
const airSolutions = getProjectBySlug("air-solutions");
const acexperts = getProjectBySlug("acexperts");

const studioPrinciples = [
  {
    n: "01",
    title: "Owner-operator.",
    body: "No account managers. No project managers. You talk to the person who writes the code.",
  },
  {
    n: "02",
    title: "Healthcare + local services only.",
    body: "Two verticals, deep. Multi-location clinics on one side. HVAC, trades, barbershops, therapy practices on the other.",
  },
  {
    n: "03",
    title: "Architectures, not brochures.",
    body: "5-page contractor sites are not the business. 210-page programmatic SEO matrices are.",
  },
];

const processTimeline = [
  { day: "Day 0", title: "Kickoff", body: "Scope locked. Onboarding form sent. We agree on what ships and when." },
  { day: "Day 7", title: "Staging URL", body: "Working preview live. First feedback round." },
  { day: "Day 14", title: "Launch", body: "Apex DNS cut. Sitemap submitted. Indexing rituals run." },
  { day: "Day 30", title: "First report", body: "Local Falcon scan + GA4 + GBP Insights delivered." },
];

const featuredTestimonials = getFeaturedTestimonials();
const activeEngagements = proofBarCounts.activeEngagements();
const totalClients = proofBarCounts.totalClients();

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

      {/* § 01 — Hero (split-stage with live device frame) */}
      <Hero />

      {/* § 02 + § 03 + § 04 — Featured work (3 anchors: Air Solutions, Revitalize, ACExperts) */}
      {revitalize && airSolutions && acexperts ? (
        <InViewReveal>
          <FeaturedWorkPreview projects={[airSolutions, revitalize, acexperts]} sectionNum="02" />
        </InViewReveal>
      ) : null}

      {/* § 03.5 — IHE 146-app mosaic band */}
      <IHEMosaic />

      {/* § 03.6 — IHE demo video */}
      <IHEDemoVideo />

      {/* § 04 — Vertical split */}
      <section className="section-wrap section-block-tight" aria-label="Verticals">
        <SectionTag num="04" label="Where we work" />
        <div className="vertical-split-grid">
          <Link href="/healthcare" className="vertical-split-card">
            <div className="vertical-split-card__eyebrow">If you run a clinical practice</div>
            <h3 className="vertical-split-card__title">Healthcare <em>→</em></h3>
            <p className="vertical-split-card__body">
              Multi-location practices. Intake pipelines. Schema markup for HealthcareProvider and
              MedicalBusiness. Connected ecosystems — clinic, institute, hub, shop — under one codebase.
            </p>
          </Link>
          <Link href="/local-services" className="vertical-split-card">
            <div className="vertical-split-card__eyebrow">If you run a local service business</div>
            <h3 className="vertical-split-card__title">Local services <em>→</em></h3>
            <p className="vertical-split-card__body">
              210-cell city × service programmatic SEO matrices. Google Business Profile operations.
              NWS-aware seasonal landing pages. Field-team photo intake via Telegram bot.
            </p>
          </Link>
        </div>
      </section>

      {/* § 04.5 — Live Matrix Generator (the marquee tech demo) */}
      <InViewReveal delay={100}>
        <MatrixDemo cities={[...CITIES]} services={[...SERVICES]} />
      </InViewReveal>

      {/* § 05 — Selected clients (real-color wordmarks) */}
      <SelectedClientsRow />

      {/* § 06 — Studio principles (3 cards) */}
      <section className="section-wrap section-block">
        <SectionTag num="06" label="Why this studio" />
        <KineticHeadline>
          <EditorialH2>
            Three reasons clinics and service businesses pick<br />
            <em>this studio over an agency.</em>
          </EditorialH2>
        </KineticHeadline>

        <div className="principles-grid">
          {studioPrinciples.map((p, i) => (
            <InViewReveal key={p.n} delay={i * 100}>
              <div className="principle-card">
                <div className="principle-card__num">{p.n}</div>
                <h3 className="principle-card__title">{p.title}</h3>
                <p className="principle-card__body">{p.body}</p>
              </div>
            </InViewReveal>
          ))}
        </div>
      </section>

      {/* § 06.5 — Owners we've built for */}
      <OwnersRow />

      {/* § 07 — Featured testimonial (renders only when real quote exists) */}
      {featuredTestimonials.length > 0 ? (
        <section className="section-wrap section-block-tight">
          <SectionTag num="07" label="Client voice" />
          <div style={{ marginTop: "32px", display: "grid", gap: "48px" }}>
            {featuredTestimonials.slice(0, 1).map((t) => (
              <TestimonialBlock key={t.id} testimonial={t} />
            ))}
          </div>
        </section>
      ) : null}

      {/* § 08 — Process timeline (real days) */}
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
          <SectionTag num="08" label="How an engagement runs" />
          <EditorialH2>
            Day 0 to Day 30.<br />
            <em>Real days, not phases.</em>
          </EditorialH2>

          <div style={{ marginTop: "48px" }}>
            {processTimeline.map((step) => (
              <div key={step.day} className="tier-row">
                <span className="tier-num" style={{ fontSize: "18px" }}>{step.day}</span>
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
            Full process detail on <Link href="/studio#process" className="editorial-link">the studio page</Link>.
          </p>
        </div>
      </section>

      {/* § 09 — About (60-second version + link to /studio) */}
      <section id="about" className="section-wrap section-block" style={{ scrollMarginTop: "96px" }}>
        <SectionTag num="09" label="About" />
        <EditorialH2 className="reading-col">
          Peyton Campbell, <em>DO.</em>
        </EditorialH2>

        <div className="editorial-body reading-col" style={{ marginTop: "32px" }}>
          <p>
            Physician in Daphne, Alabama. Developer since before medical school. I build digital
            infrastructure for clinical practices and local service businesses — programmatic SEO
            platforms, multi-location architectures, GBP automation pipelines. Solo, by design.
          </p>
          <p>
            The clinical work keeps me grounded in what practices actually face. The development
            work is what I do when I'm not in clinic. The combination is why my medical clients
            trust me with their sites and why my trade clients trust me with their architectures.
          </p>
          <p>
            <Link href="/studio" className="editorial-link">Full studio page →</Link>
          </p>
        </div>
      </section>

      {/* § 10 — FAQ */}
      <FaqSection sectionNum="10" />

      {/* § 11 — Closing CTA (dark navy stage) */}
      <InViewReveal as="section" className="cover-surface">
        <div className="section-wrap section-block">
          <SectionTag num="11" label="Working together" onDark />
          <EditorialH2 onDark className="reading-col">
            Start a<br />
            <em>project.</em>
          </EditorialH2>

          <p className="reading-col page-intro__lead">
            Send the business name, a link to the current site (or what's currently in place), what
            you're trying to accomplish, an approximate budget, and a timeline. I read every inquiry
            personally. If the project is a fit, you'll hear back within a week with a few questions
            and a suggested next step.
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
              Start a project
            </Link>
            <Link href="/work" className="btn-ghost">
              See the work
            </Link>
          </div>

          <p
            style={{
              marginTop: "24px",
              fontFamily: "var(--font-geist-mono), monospace",
              fontSize: "12px",
              color: "rgba(232, 196, 107, 0.6)",
              letterSpacing: "0.05em",
            }}
          >
            {totalClients} consented clients · {activeEngagements} active engagements · Currently shipping
          </p>
        </div>
      </InViewReveal>
    </>
  );
}
