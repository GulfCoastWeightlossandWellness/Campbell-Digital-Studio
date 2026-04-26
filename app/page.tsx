import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { projects } from "@/lib/projects";
import ProjectCard from "@/components/ProjectCard";
import CTASection from "@/components/CTASection";
import SectionHeader from "@/components/SectionHeader";

export const metadata: Metadata = {
  title: "Campbell Digital Studio | Medical & Local Business Websites",
  description:
    "Custom websites, local SEO, and digital assets for medical practices and local businesses. Built by a physician in training using modern AI-assisted development workflows.",
};

const trustPillars = [
  { label: "Physician-in-Training Perspective", desc: "I understand the clinical side, the patient journey, and the business model." },
  { label: "AI-Assisted Development", desc: "Modern workflows that produce clean, fast, production-ready builds." },
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
      {/* Hero */}
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
        {/* Hero grid: copy left, image right */}
        <div className="hero-grid" style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: "4rem",
          alignItems: "center",
        }}>
          {/* Left: copy */}
          <div style={{ position: "relative", zIndex: 1 }}>
            <p style={{
              fontFamily: "'DM Mono', monospace",
              fontSize: "0.65rem",
              letterSpacing: "0.12em",
              textTransform: "uppercase",
              color: "#d4a853",
              marginBottom: "1.25rem",
            }}>
              Web Studio &mdash; Baldwin County, Alabama
            </p>
            <h1 style={{
              fontFamily: "'Cormorant Garamond', Georgia, serif",
              fontSize: "clamp(2.4rem, 5.5vw, 4rem)",
              fontWeight: 500,
              color: "#f8f5f0",
              lineHeight: 1.08,
              marginBottom: "1.5rem",
              letterSpacing: "-0.01em",
            }}>
              Custom websites and local SEO for medical and local businesses.
            </h1>
            <p style={{
              fontFamily: "'DM Sans', sans-serif",
              fontSize: "clamp(1rem, 2vw, 1.1rem)",
              color: "#94a3b8",
              lineHeight: 1.75,
              marginBottom: "2.5rem",
              maxWidth: "520px",
            }}>
              I build modern, SEO-ready websites for clinics, wellness practices, therapy offices, and local service businesses. The goal is simple: make the business easier to find, easier to trust, and easier to choose.
            </p>
            <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap" }}>
              <Link href="/website-review" style={{
                fontFamily: "'DM Sans', sans-serif",
                fontSize: "0.9rem",
                fontWeight: 500,
                color: "#0b1120",
                background: "#d4a853",
                padding: "0.8rem 1.75rem",
                borderRadius: "8px",
                textDecoration: "none",
              }}>
                Request Website Review
              </Link>
              <Link href="/work" style={{
                fontFamily: "'DM Sans', sans-serif",
                fontSize: "0.9rem",
                fontWeight: 400,
                color: "#f8f5f0",
                border: "1px solid rgba(255,255,255,0.15)",
                padding: "0.8rem 1.75rem",
                borderRadius: "8px",
                textDecoration: "none",
              }}>
                View Work
              </Link>
            </div>
          </div>

          {/* Right: hero visual */}
          <div className="hero-visual" style={{ position: "relative" }}>
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
                borderRadius: "12px",
                display: "block",
              }}
            />
            <p style={{
              fontFamily: "'DM Mono', monospace",
              fontSize: "0.58rem",
              letterSpacing: "0.06em",
              color: "#374151",
              marginTop: "0.6rem",
              textAlign: "right",
            }}>
              Representative systems shown — not guaranteed results
            </p>
          </div>
        </div>

        <style>{`
          @media (max-width: 860px) {
            .hero-grid { grid-template-columns: 1fr !important; gap: 2.5rem !important; }
            .hero-visual { order: 2; }
          }
        `}</style>

        {/* Trust strip */}
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
          gap: "1px",
          background: "rgba(255,255,255,0.06)",
          borderRadius: "12px",
          overflow: "hidden",
          marginTop: "4rem",
          border: "1px solid rgba(255,255,255,0.06)",
        }}>
          {trustPillars.map((pillar) => (
            <div key={pillar.label} style={{ background: "#0b1120", padding: "1.5rem" }}>
              <p style={{
                fontFamily: "'DM Mono', monospace",
                fontSize: "0.65rem",
                letterSpacing: "0.06em",
                textTransform: "uppercase",
                color: "#d4a853",
                marginBottom: "0.5rem",
              }}>
                {pillar.label}
              </p>
              <p style={{
                fontFamily: "'DM Sans', sans-serif",
                fontSize: "0.8rem",
                color: "#64748b",
                lineHeight: 1.55,
              }}>
                {pillar.desc}
              </p>
            </div>
          ))}
        </div>

      </section>

      {/* Problem section */}
      <section style={{ padding: "5rem 1.5rem", maxWidth: "1200px", margin: "0 auto" }}>
        <div className="grid-2">
          <div style={{ maxWidth: "400px" }}>
            <SectionHeader
              eyebrow="The Problem"
              headline="Most local business websites are not doing their job."
            />
            <p style={{
              fontFamily: "'DM Sans', sans-serif",
              fontSize: "0.925rem",
              color: "#94a3b8",
              lineHeight: 1.75,
            }}>
              A website is often the first impression a patient or customer has of a business. Most of the time, that impression is a template from 2015 with the wrong address listed and a phone number that goes nowhere.
            </p>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: "0.6rem" }}>
            {problemItems.map((item) => (
              <div key={item} style={{
                display: "flex",
                alignItems: "flex-start",
                gap: "0.75rem",
                padding: "0.85rem 1rem",
                background: "#111827",
                borderRadius: "8px",
                border: "1px solid rgba(255,255,255,0.05)",
              }}>
                <span style={{ color: "#d4a853", flexShrink: 0, fontFamily: "'DM Mono', monospace", fontSize: "0.75rem", marginTop: "0.1rem" }}>—</span>
                <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "0.85rem", color: "#94a3b8", margin: 0 }}>{item}</p>
              </div>
            ))}
          </div>
        </div>

        <style>{`
          @media (max-width: 768px) {
            .problem-grid { grid-template-columns: 1fr !important; }
          }
        `}</style>
      </section>

      {/* What I Build */}
      <section style={{ padding: "5rem 1.5rem", background: "#080e1a" }}>
        <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
          <SectionHeader
            eyebrow="What I Build"
            headline="Sites built around what the business actually needs."
            centered
          />
          <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
            gap: "1rem",
          }}>
            {buildCategories.map((cat) => (
              <div key={cat.title} style={{
                background: "#0f1624",
                border: "1px solid rgba(255,255,255,0.06)",
                borderRadius: "10px",
                padding: "1.5rem",
              }}>
                <div style={{ width: "28px", height: "2px", background: "#d4a853", marginBottom: "0.85rem" }} />
                <h3 style={{
                  fontFamily: "'Cormorant Garamond', Georgia, serif",
                  fontSize: "1.15rem",
                  fontWeight: 500,
                  color: "#f8f5f0",
                  marginBottom: "0.5rem",
                }}>
                  {cat.title}
                </h3>
                <p style={{
                  fontFamily: "'DM Sans', sans-serif",
                  fontSize: "0.85rem",
                  color: "#64748b",
                  lineHeight: 1.6,
                }}>
                  {cat.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Work */}
      <section style={{ padding: "5rem 1.5rem", maxWidth: "1200px", margin: "0 auto" }}>
        <SectionHeader
          eyebrow="Featured Work"
          headline="Selected projects and case studies."
          subtext="A sample of the websites, platforms, and strategic rebuilds in my portfolio."
        />
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(340px, 1fr))",
          gap: "1.25rem",
          marginBottom: "2rem",
        }}>
          {projects.map((project) => (
            <ProjectCard key={project.slug} project={project} />
          ))}
        </div>
        <div style={{ textAlign: "center", marginTop: "1.5rem" }}>
          <Link href="/work" style={{
            fontFamily: "'DM Sans', sans-serif",
            fontSize: "0.875rem",
            color: "#d4a853",
            textDecoration: "none",
          }}>
            View all projects &rarr;
          </Link>
        </div>
      </section>

      {/* Approach */}
      <section style={{ padding: "5rem 1.5rem", background: "#080e1a" }}>
        <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
          <SectionHeader
            eyebrow="My Approach"
            headline="A process built around business outcomes."
            subtext="I do not start with a template. I start with what the business needs to accomplish."
          />
          <div style={{ display: "flex", flexDirection: "column", gap: "1px", background: "rgba(255,255,255,0.05)", borderRadius: "12px", overflow: "hidden" }}>
            {approachSteps.map((step) => (
              <div key={step.step} style={{
                background: "#0b1120",
                padding: "1.75rem 2rem",
                display: "grid",
                gridTemplateColumns: "64px 1fr",
                gap: "1.5rem",
                alignItems: "start",
              }}>
                <span style={{
                  fontFamily: "'DM Mono', monospace",
                  fontSize: "0.75rem",
                  letterSpacing: "0.06em",
                  color: "#d4a853",
                  opacity: 0.7,
                }}>
                  {step.step}
                </span>
                <div>
                  <h3 style={{
                    fontFamily: "'Cormorant Garamond', Georgia, serif",
                    fontSize: "1.15rem",
                    fontWeight: 500,
                    color: "#f8f5f0",
                    marginBottom: "0.35rem",
                  }}>
                    {step.title}
                  </h3>
                  <p style={{
                    fontFamily: "'DM Sans', sans-serif",
                    fontSize: "0.875rem",
                    color: "#64748b",
                    lineHeight: 1.65,
                    margin: 0,
                  }}>
                    {step.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why my background helps */}
      <section style={{ padding: "5rem 1.5rem", maxWidth: "1200px", margin: "0 auto" }}>
        <div className="grid-2-center">
          <SectionHeader
            eyebrow="Why My Background Helps"
            headline="I am not just looking at the website."
          />
          <div>
            <p style={{
              fontFamily: "'DM Sans', sans-serif",
              fontSize: "1rem",
              color: "#94a3b8",
              lineHeight: 1.8,
              marginBottom: "1.5rem",
            }}>
              When I review a medical or local business website, I am not looking at it as a designer who sees a layout problem. I am looking at it as someone who understands the patient journey, the business model, the services, the local search opportunity, and the trust signals that make someone actually book.
            </p>
            <p style={{
              fontFamily: "'DM Sans', sans-serif",
              fontSize: "1rem",
              color: "#94a3b8",
              lineHeight: 1.8,
            }}>
              That perspective changes what gets built. Service pages are written for what patients actually search. Copy is calibrated for someone who is nervous, comparing options, or navigating a sensitive decision. The booking flow is designed around reducing friction at the moment someone is ready to commit.
            </p>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section style={{ padding: "3rem 1.5rem 5rem", maxWidth: "1200px", margin: "0 auto" }}>
        <CTASection />
      </section>
    </>
  );
}
