import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { projects } from "@/lib/projects";
import ProjectCard from "@/components/ProjectCard";
import CTASection from "@/components/CTASection";
import SectionHeader from "@/components/SectionHeader";
import PricingPhilosophy from "@/components/PricingPhilosophy";

export const metadata: Metadata = {
  title: "Campbell Digital Studio | Medical & Local Business Websites",
  description:
    "Custom websites, local SEO, and digital assets for medical practices and local businesses. Built by a physician in training with a focus on clinical accuracy, conversion, and local search.",
};

const metrics = [
  { value: "7", label: "Production Sites" },
  { value: "145+", label: "Medical Apps Built" },
  { value: "50+", label: "Service Pages" },
  { value: "2", label: "SaaS Platforms" },
];

const trustPillars = [
  { label: "Physician-in-Training Perspective", desc: "I understand the clinical side, the patient journey, and the business model." },
  { label: "Modern Development Stack", desc: "Next.js, TypeScript, Tailwind, and Vercel — clean, fast, production-ready builds." },
  { label: "Local SEO and Conversion Focus", desc: "Sites structured to be found, trusted, and acted on." },
  { label: "Medical and Local-Service Experience", desc: "Clinics, medspas, therapy practices, and local trades." },
];

const problemItems = [
  "Template-style designs that look like every other clinic in town",
  "No service page structure — everything buried on one long homepage",
  "Missing local SEO: no city pages, no schema, no Google Business alignment",
  "Weak or absent booking and contact flows",
  "No trust signals for new patients navigating a sensitive decision",
  "Copy written for a brochure, not for a patient who is comparing options",
  "Not mobile-friendly despite most patients searching from a phone",
  "No content strategy — nothing building authority between visits",
];

const buildCategories = [
  { title: "Medical Practice Websites", desc: "Primary care, DPC, urgent care, and specialty practices that need modern patient-facing sites." },
  { title: "Therapy and Counseling Websites", desc: "Practice sites that balance professionalism and approachability for clients navigating sensitive decisions." },
  { title: "Medspa and Wellness Clinic Websites", desc: "Conversion-focused sites for aesthetic, hormone, and wellness practices with complex service menus." },
  { title: "Local Service Business Websites", desc: "HVAC, trades, and home services that need stronger local SEO and clearer service pages." },
  { title: "Patient Education and Interactive Tools", desc: "Assessments, calculators, treatment finders, and education modules for clinical settings." },
  { title: "Website Rebuilds and SEO Migrations", desc: "Turning outdated or template-based sites into modern, structured, launch-ready platforms." },
];

const approachSteps = [
  { step: "01", title: "Audit the Current Site and Business", desc: "Review the existing site, service mix, local search opportunity, and patient or customer journey from discovery to booking." },
  { step: "02", title: "Clarify Services and Conversion Goals", desc: "Define what the business needs the site to accomplish — inquiries, bookings, direction traffic, education, or a combination." },
  { step: "03", title: "Build Clean Local SEO Architecture", desc: "Structure service pages, city pages, metadata, schema markup, internal links, and Google Business alignment." },
  { step: "04", title: "Write Service-Focused Copy", desc: "Clear, direct language that explains what the business does, who it serves, and why a patient or customer should choose them." },
  { step: "05", title: "Add CTAs, Booking Flows, and Trust Signals", desc: "Booking links, review integrations, certifications, and contact flows that reduce friction from first visit to first appointment." },
  { step: "06", title: "QA Mobile, Links, Metadata, and Launch Readiness", desc: "Mobile testing, broken link audit, metadata review, sitemap, robots, analytics setup, and pre-launch checklist." },
];

export default function HomePage() {
  return (
    <>
      {/* ─── Hero ────────────────────────────────────────────────────────── */}
      <section
        style={{
          paddingTop: "120px",
          paddingBottom: "80px",
          paddingLeft: "1.5rem",
          paddingRight: "1.5rem",
          maxWidth: "1200px",
          margin: "0 auto",
          position: "relative",
        }}
      >
        {/* Ambient glow behind hero */}
        <div
          aria-hidden
          style={{
            position: "absolute",
            top: "60px",
            left: "50%",
            transform: "translateX(-50%)",
            width: "700px",
            height: "400px",
            borderRadius: "50%",
            background: "radial-gradient(ellipse, rgba(79,142,247,0.07) 0%, transparent 70%)",
            pointerEvents: "none",
            zIndex: 0,
          }}
        />

        <div
          className="hero-grid"
          style={{ position: "relative", zIndex: 1 }}
        >
          {/* Left: copy */}
          <div>
            <p
              style={{
                fontFamily: "'DM Mono', monospace",
                fontSize: "0.65rem",
                letterSpacing: "0.14em",
                textTransform: "uppercase",
                color: "#7db0ff",
                marginBottom: "1.25rem",
              }}
            >
              Web Studio &mdash; Baldwin County, Alabama
            </p>

            <h1
              style={{
                fontFamily: "'Plus Jakarta Sans', system-ui, sans-serif",
                fontSize: "clamp(2.4rem, 5.5vw, 3.8rem)",
                fontWeight: 800,
                lineHeight: 1.06,
                letterSpacing: "-0.03em",
                marginBottom: "1.5rem",
                background: "linear-gradient(135deg, #f0f4fc 20%, #a8c8ff 65%, #7db0ff 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              Custom websites and local SEO for medical and local businesses.
            </h1>

            <p
              style={{
                fontFamily: "'DM Sans', system-ui, sans-serif",
                fontSize: "clamp(1rem, 2vw, 1.1rem)",
                color: "#94a3b8",
                lineHeight: 1.75,
                marginBottom: "2rem",
                maxWidth: "520px",
              }}
            >
              I build modern, SEO-ready websites for clinics, wellness practices, therapy offices, and local service businesses. The goal is simple: make the business easier to find, easier to trust, and easier to choose.
            </p>

            {/* Metric strip */}
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(4, 1fr)",
                gap: "0",
                marginBottom: "2.5rem",
                borderRadius: "10px",
                overflow: "hidden",
                border: "1px solid rgba(79,142,247,0.12)",
                background: "rgba(79,142,247,0.04)",
              }}
            >
              {metrics.map((m, i) => (
                <div
                  key={m.label}
                  style={{
                    padding: "0.85rem 0.5rem",
                    textAlign: "center",
                    borderRight: i < metrics.length - 1 ? "1px solid rgba(79,142,247,0.1)" : "none",
                  }}
                >
                  <p
                    style={{
                      fontFamily: "'Plus Jakarta Sans', system-ui, sans-serif",
                      fontSize: "1.35rem",
                      fontWeight: 800,
                      color: "#7db0ff",
                      letterSpacing: "-0.02em",
                      margin: 0,
                      lineHeight: 1,
                    }}
                  >
                    {m.value}
                  </p>
                  <p
                    style={{
                      fontFamily: "'DM Sans', system-ui, sans-serif",
                      fontSize: "0.68rem",
                      color: "#475569",
                      margin: "0.3rem 0 0",
                      lineHeight: 1.2,
                    }}
                  >
                    {m.label}
                  </p>
                </div>
              ))}
            </div>

            <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap" }}>
              <Link href="/website-review" className="btn-primary">
                Request Website Review
              </Link>
              <Link href="/work" className="btn-outline">
                View Work
              </Link>
            </div>
          </div>

          {/* Right: hero visual */}
          <div className="hero-visual" style={{ position: "relative" }}>
            <div
              style={{
                position: "absolute",
                inset: "-2px",
                borderRadius: "16px",
                background: "linear-gradient(135deg, rgba(79,142,247,0.2) 0%, transparent 60%)",
                pointerEvents: "none",
                zIndex: 0,
              }}
            />
            <Image
              src="/images/site/campbell-digital-studio-hero-graphic.png"
              alt="Campbell Digital Studio — custom websites and local SEO for medical practices and local businesses"
              width={1024}
              height={533}
              priority
              sizes="(max-width: 768px) 100vw, 50vw"
              style={{
                width: "100%",
                height: "auto",
                borderRadius: "14px",
                display: "block",
                position: "relative",
                zIndex: 1,
                border: "1px solid rgba(79,142,247,0.12)",
              }}
            />
            <p
              style={{
                fontFamily: "'DM Mono', monospace",
                fontSize: "0.57rem",
                letterSpacing: "0.06em",
                color: "#1e293b",
                marginTop: "0.6rem",
                textAlign: "right",
              }}
            >
              Representative systems shown — not guaranteed results
            </p>
          </div>
        </div>

        {/* Trust strip */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
            gap: "1px",
            background: "rgba(255,255,255,0.05)",
            borderRadius: "12px",
            overflow: "hidden",
            marginTop: "4rem",
            border: "1px solid rgba(255,255,255,0.05)",
            position: "relative",
            zIndex: 1,
          }}
        >
          {trustPillars.map((pillar) => (
            <div
              key={pillar.label}
              style={{ background: "#050c1a", padding: "1.5rem" }}
            >
              <p
                style={{
                  fontFamily: "'DM Mono', monospace",
                  fontSize: "0.63rem",
                  letterSpacing: "0.06em",
                  textTransform: "uppercase",
                  color: "#4f8ef7",
                  marginBottom: "0.5rem",
                }}
              >
                {pillar.label}
              </p>
              <p
                style={{
                  fontFamily: "'DM Sans', system-ui, sans-serif",
                  fontSize: "0.8rem",
                  color: "#475569",
                  lineHeight: 1.55,
                }}
              >
                {pillar.desc}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* ─── Problem section ─────────────────────────────────────────────── */}
      <section style={{ padding: "5rem 1.5rem", maxWidth: "1200px", margin: "0 auto" }}>
        <div className="grid-2">
          <div style={{ maxWidth: "420px" }}>
            <SectionHeader
              eyebrow="The Problem"
              headline="Most local business websites are not doing their job."
            />
            <p
              style={{
                fontFamily: "'DM Sans', system-ui, sans-serif",
                fontSize: "0.95rem",
                color: "#94a3b8",
                lineHeight: 1.8,
              }}
            >
              A website is often the first impression a patient or customer has of a business. Most of the time, that impression is a template from 2015 with the wrong address listed and a phone number that goes nowhere.
            </p>
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: "0.55rem" }}>
            {problemItems.map((item) => (
              <div
                key={item}
                style={{
                  display: "flex",
                  alignItems: "flex-start",
                  gap: "0.75rem",
                  padding: "0.85rem 1rem",
                  background: "#0d1728",
                  borderRadius: "9px",
                  border: "1px solid rgba(255,255,255,0.05)",
                }}
              >
                <span
                  style={{
                    color: "#4f8ef7",
                    flexShrink: 0,
                    fontFamily: "'DM Mono', monospace",
                    fontSize: "0.75rem",
                    marginTop: "0.1rem",
                    opacity: 0.7,
                  }}
                >
                  ✕
                </span>
                <p
                  style={{
                    fontFamily: "'DM Sans', system-ui, sans-serif",
                    fontSize: "0.85rem",
                    color: "#94a3b8",
                    margin: 0,
                  }}
                >
                  {item}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── What I Build ─────────────────────────────────────────────────── */}
      <section style={{ padding: "5rem 1.5rem", background: "#030810" }}>
        <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
          <SectionHeader
            eyebrow="What I Build"
            headline="Sites built around what the business actually needs."
            centered
          />
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
              gap: "1rem",
            }}
          >
            {buildCategories.map((cat) => (
              <div
                key={cat.title}
                className="card-hover"
                style={{
                  background: "#0d1728",
                  border: "1px solid rgba(255,255,255,0.06)",
                  borderRadius: "12px",
                  padding: "1.5rem",
                }}
              >
                <div
                  style={{
                    width: "28px",
                    height: "2px",
                    background: "linear-gradient(90deg, #4f8ef7, transparent)",
                    marginBottom: "0.85rem",
                  }}
                />
                <h3
                  style={{
                    fontFamily: "'Plus Jakarta Sans', system-ui, sans-serif",
                    fontSize: "1rem",
                    fontWeight: 700,
                    color: "#f0f4fc",
                    marginBottom: "0.5rem",
                    letterSpacing: "-0.01em",
                  }}
                >
                  {cat.title}
                </h3>
                <p
                  style={{
                    fontFamily: "'DM Sans', system-ui, sans-serif",
                    fontSize: "0.85rem",
                    color: "#475569",
                    lineHeight: 1.6,
                  }}
                >
                  {cat.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── Featured Work ────────────────────────────────────────────────── */}
      <section style={{ padding: "5rem 1.5rem", maxWidth: "1200px", margin: "0 auto" }}>
        <SectionHeader
          eyebrow="Featured Work"
          headline="Selected projects and case studies."
          subtext="A sample of the websites, platforms, and strategic rebuilds in my portfolio."
        />
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(340px, 1fr))",
            gap: "1.25rem",
            marginBottom: "2rem",
          }}
        >
          {projects.map((project) => (
            <ProjectCard key={project.slug} project={project} />
          ))}
        </div>
        <div style={{ textAlign: "center", marginTop: "1.5rem" }}>
          <Link
            href="/work"
            style={{
              fontFamily: "'DM Sans', system-ui, sans-serif",
              fontSize: "0.875rem",
              color: "#7db0ff",
              textDecoration: "none",
            }}
          >
            View all projects →
          </Link>
        </div>
      </section>

      {/* ─── Pricing Philosophy ──────────────────────────────────────────── */}
      <PricingPhilosophy />

      {/* ─── Approach ────────────────────────────────────────────────────── */}
      <section style={{ padding: "5rem 1.5rem", background: "#030810" }}>
        <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
          <SectionHeader
            eyebrow="My Approach"
            headline="A process built around business outcomes."
            subtext="I do not start with a template. I start with what the business needs to accomplish."
          />
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "1px",
              background: "rgba(255,255,255,0.04)",
              borderRadius: "14px",
              overflow: "hidden",
            }}
          >
            {approachSteps.map((step) => (
              <div
                key={step.step}
                style={{
                  background: "#050c1a",
                  padding: "1.75rem 2rem",
                  display: "grid",
                  gridTemplateColumns: "64px 1fr",
                  gap: "1.5rem",
                  alignItems: "start",
                }}
              >
                <span
                  style={{
                    fontFamily: "'DM Mono', monospace",
                    fontSize: "0.72rem",
                    letterSpacing: "0.06em",
                    color: "#4f8ef7",
                    opacity: 0.6,
                  }}
                >
                  {step.step}
                </span>
                <div>
                  <h3
                    style={{
                      fontFamily: "'Plus Jakarta Sans', system-ui, sans-serif",
                      fontSize: "1rem",
                      fontWeight: 700,
                      color: "#f0f4fc",
                      marginBottom: "0.35rem",
                      letterSpacing: "-0.01em",
                    }}
                  >
                    {step.title}
                  </h3>
                  <p
                    style={{
                      fontFamily: "'DM Sans', system-ui, sans-serif",
                      fontSize: "0.875rem",
                      color: "#475569",
                      lineHeight: 1.65,
                      margin: 0,
                    }}
                  >
                    {step.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── Why my background helps ─────────────────────────────────────── */}
      <section style={{ padding: "5rem 1.5rem", maxWidth: "1200px", margin: "0 auto" }}>
        <div className="grid-2-center">
          <SectionHeader
            eyebrow="Why My Background Helps"
            headline="I am not just looking at the website."
            accentWarm
          />
          <div>
            <p
              style={{
                fontFamily: "'DM Sans', system-ui, sans-serif",
                fontSize: "1rem",
                color: "#94a3b8",
                lineHeight: 1.8,
                marginBottom: "1.5rem",
              }}
            >
              When I review a medical or local business website, I am not looking at it as a designer who sees a layout problem. I am looking at it as someone who understands the patient journey, the business model, the services, the local search opportunity, and the trust signals that make someone actually book.
            </p>
            <p
              style={{
                fontFamily: "'DM Sans', system-ui, sans-serif",
                fontSize: "1rem",
                color: "#94a3b8",
                lineHeight: 1.8,
                marginBottom: "2rem",
              }}
            >
              That perspective changes what gets built. Service pages are written for what patients actually search. Copy is calibrated for someone who is nervous, comparing options, or navigating a sensitive decision. The booking flow is designed around reducing friction at the moment someone is ready to commit.
            </p>
            <div
              style={{
                background: "rgba(212,168,83,0.05)",
                border: "1px solid rgba(212,168,83,0.15)",
                borderRadius: "10px",
                padding: "1.25rem 1.5rem",
              }}
            >
              <p
                style={{
                  fontFamily: "'DM Mono', monospace",
                  fontSize: "0.65rem",
                  letterSpacing: "0.1em",
                  textTransform: "uppercase",
                  color: "#d4a853",
                  marginBottom: "0.5rem",
                }}
              >
                PGY-1 Family Medicine Resident
              </p>
              <p
                style={{
                  fontFamily: "'DM Sans', system-ui, sans-serif",
                  fontSize: "0.875rem",
                  color: "#94a3b8",
                  lineHeight: 1.65,
                  margin: 0,
                }}
              >
                Training in Baldwin County, Alabama — building websites for the exact patient populations and business types I work with every day.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ─── CTA ─────────────────────────────────────────────────────────── */}
      <section style={{ padding: "3rem 1.5rem 5rem", maxWidth: "1200px", margin: "0 auto" }}>
        <CTASection />
      </section>
    </>
  );
}
