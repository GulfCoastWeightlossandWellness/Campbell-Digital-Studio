import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import SectionHeader from "@/components/SectionHeader";
import CTASection from "@/components/CTASection";

export const metadata: Metadata = {
  title: "About",
  description:
    "Peyton Campbell is a family medicine resident physician who builds custom medical and local-business websites with a focus on clinical accuracy, local SEO, and conversion.",
};

const facts = [
  { label: "Role", value: "PGY-1 Family Medicine Resident" },
  { label: "Location", value: "Baldwin County, Alabama" },
  { label: "Focus", value: "Medical, wellness, therapy, and local service websites" },
  { label: "Workflow", value: "Next.js, TypeScript, Tailwind, Vercel — clean, fast, production-ready builds" },
  { label: "Background", value: "Clinical training + business perspective + technical execution" },
];

const differentiators = [
  {
    title: "Physician Perspective",
    body: "I understand how patients think when they are searching for a provider, comparing options, or navigating a sensitive health decision. That changes what gets built. Copy is calibrated for trust. Service pages address actual patient questions. The booking flow is designed around reducing hesitation.",
  },
  {
    title: "Business Understanding",
    body: "A website does not exist in isolation. I look at the business model, the service mix, the local competition, the pricing structure, and what makes a patient or customer actually choose this business over another. The site is built around that answer.",
  },
  {
    title: "Modern Development Workflow",
    body: "I build with Next.js, React, TypeScript, and Tailwind — deployed on Vercel. Fast, clean production builds without the overhead of a traditional agency. No bloated site builders. No template packs. No extra layers of account management.",
  },
  {
    title: "Practical Execution",
    body: "I am not a large agency. I do not have account managers, creative directors, and a billing department between you and the work. When you work with me, you get direct communication, honest scoping, and a working site at the end.",
  },
];

export default function AboutPage() {
  return (
    <>
      {/* Header */}
      <section
        style={{
          paddingTop: "120px",
          paddingBottom: "4rem",
          paddingLeft: "1.5rem",
          paddingRight: "1.5rem",
          maxWidth: "1200px",
          margin: "0 auto",
        }}
      >
        <div className="grid-about-hero">
          {/* Left */}
          <div>
            <p
              style={{
                fontFamily: "'DM Mono', monospace",
                fontSize: "0.65rem",
                letterSpacing: "0.12em",
                textTransform: "uppercase",
                color: "#d4a853",
                marginBottom: "1rem",
              }}
            >
              About
            </p>
            <div
              style={{
                width: "48px",
                height: "2px",
                background: "linear-gradient(90deg, #d4a853, transparent)",
                marginBottom: "1.25rem",
              }}
            />
            <h1
              style={{
                fontFamily: "'Cormorant Garamond', Georgia, serif",
                fontSize: "clamp(2.2rem, 5vw, 3.5rem)",
                fontWeight: 500,
                color: "#f8f5f0",
                lineHeight: 1.1,
                marginBottom: "1.5rem",
              }}
            >
              Peyton Campbell
            </h1>
            <p
              style={{
                fontFamily: "'Cormorant Garamond', Georgia, serif",
                fontSize: "1.3rem",
                fontStyle: "italic",
                color: "#d4a853",
                marginBottom: "2rem",
                lineHeight: 1.4,
              }}
            >
              Family medicine resident. Website builder. Physician-in-training with a background in clinical care, medical business, and modern web development.
            </p>
            <p
              style={{
                fontFamily: "'DM Sans', sans-serif",
                fontSize: "1rem",
                color: "#94a3b8",
                lineHeight: 1.8,
                marginBottom: "1.25rem",
              }}
            >
              I started building websites because I kept seeing businesses with real value being represented by websites that did not match the quality of the service they provided. A practice with excellent physicians and a genuinely caring team, represented by a 2012 template site with a broken booking link and a page that still listed a doctor who retired four years ago.
            </p>
            <p
              style={{
                fontFamily: "'DM Sans', sans-serif",
                fontSize: "1rem",
                color: "#94a3b8",
                lineHeight: 1.8,
                marginBottom: "1.25rem",
              }}
            >
              Medical and local business websites are a specific problem. They are not the same as a SaaS landing page or a personal portfolio. The patient or customer who lands on them is often in a different headspace — comparing providers, navigating a sensitive decision, trying to understand if this place is right for them. The site has to earn that trust quickly.
            </p>
            <p
              style={{
                fontFamily: "'DM Sans', sans-serif",
                fontSize: "1rem",
                color: "#94a3b8",
                lineHeight: 1.8,
              }}
            >
              My clinical training shapes how I build. I think about the patient journey the way I think about a clinical encounter — what does this person need to understand, what questions do they have, and what would make them confident enough to take the next step.
            </p>
          </div>

          {/* Right — quick facts */}
          <div>
            <div
              style={{
                background: "#111827",
                border: "1px solid rgba(255,255,255,0.07)",
                borderRadius: "12px",
                padding: "1rem",
                marginBottom: "1.25rem",
              }}
            >
              <Image
                src="/images/brand/campbell-digital-studio-horizontal-dark.png"
                alt="Campbell Digital Studio"
                width={628}
                height={161}
                sizes="(max-width: 768px) 90vw, 420px"
                style={{
                  width: "100%",
                  height: "auto",
                  objectFit: "contain",
                }}
              />
            </div>
            <div
              style={{
                background: "#161f2e",
                border: "1px solid rgba(255,255,255,0.07)",
                borderRadius: "12px",
                padding: "1.75rem",
                marginBottom: "1.25rem",
              }}
            >
              <p
                style={{
                  fontFamily: "'DM Mono', monospace",
                  fontSize: "0.63rem",
                  letterSpacing: "0.1em",
                  textTransform: "uppercase",
                  color: "#d4a853",
                  marginBottom: "1.25rem",
                }}
              >
                Quick Facts
              </p>
              <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
                {facts.map((fact) => (
                  <div
                    key={fact.label}
                    style={{ paddingBottom: "1rem", borderBottom: "1px solid rgba(255,255,255,0.05)" }}
                  >
                    <p
                      style={{
                        fontFamily: "'DM Mono', monospace",
                        fontSize: "0.6rem",
                        letterSpacing: "0.08em",
                        textTransform: "uppercase",
                        color: "#64748b",
                        marginBottom: "0.25rem",
                      }}
                    >
                      {fact.label}
                    </p>
                    <p
                      style={{
                        fontFamily: "'DM Sans', sans-serif",
                        fontSize: "0.875rem",
                        color: "#f8f5f0",
                        lineHeight: 1.5,
                      }}
                    >
                      {fact.value}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            <div
              style={{
                background: "linear-gradient(135deg, #111827, #0b1120)",
                border: "1px solid rgba(212,168,83,0.2)",
                borderRadius: "12px",
                padding: "1.5rem",
                textAlign: "center",
              }}
            >
              <p
                style={{
                  fontFamily: "'DM Sans', sans-serif",
                  fontSize: "0.875rem",
                  color: "#94a3b8",
                  marginBottom: "1rem",
                  lineHeight: 1.6,
                }}
              >
                Have a clinic or local business with a website that does not represent what you have built?
              </p>
              <Link
                href="/website-review"
                style={{
                  display: "block",
                  fontFamily: "'DM Sans', sans-serif",
                  fontSize: "0.825rem",
                  fontWeight: 500,
                  color: "#0b1120",
                  background: "#d4a853",
                  padding: "0.65rem 1rem",
                  borderRadius: "7px",
                  textDecoration: "none",
                  textAlign: "center",
                }}
              >
                Request Website Review
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Why I am different */}
      <section style={{ padding: "2rem 1.5rem 5rem", background: "#080e1a" }}>
        <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
          <SectionHeader
            eyebrow="What Makes This Different"
            headline="Not a traditional agency. Not a freelance generalist."
            subtext="The combination of clinical training, business understanding, and modern technical workflow produces a different kind of web build."
          />
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
              gap: "1.25rem",
            }}
          >
            {differentiators.map((d) => (
              <div
                key={d.title}
                style={{
                  background: "#0f1624",
                  border: "1px solid rgba(255,255,255,0.06)",
                  borderRadius: "12px",
                  padding: "1.75rem",
                }}
              >
                <div
                  style={{
                    width: "36px",
                    height: "2px",
                    background: "#d4a853",
                    marginBottom: "1rem",
                  }}
                />
                <h3
                  style={{
                    fontFamily: "'Cormorant Garamond', Georgia, serif",
                    fontSize: "1.2rem",
                    fontWeight: 500,
                    color: "#f8f5f0",
                    marginBottom: "0.75rem",
                  }}
                >
                  {d.title}
                </h3>
                <p
                  style={{
                    fontFamily: "'DM Sans', sans-serif",
                    fontSize: "0.875rem",
                    color: "#94a3b8",
                    lineHeight: 1.7,
                  }}
                >
                  {d.body}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>


      {/* Built from proven patterns */}
      <section style={{ padding: "0 1.5rem 1rem", maxWidth: "1200px", margin: "0 auto" }}>
        <div style={{ background: "linear-gradient(135deg, #111827, #0d1829)", border: "1px solid rgba(212,168,83,0.15)", borderRadius: "16px", padding: "2.5rem" }}>
          <p style={{ fontFamily: "'DM Mono', monospace", fontSize: "0.65rem", letterSpacing: "0.1em", textTransform: "uppercase", color: "#d4a853", marginBottom: "0.75rem" }}>
            How Builds Stay Efficient
          </p>
          <div style={{ width: "36px", height: "2px", background: "#d4a853", marginBottom: "1.25rem" }} />
          <div className="grid-2">
            <div>
              <h3 style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: "clamp(1.4rem, 3vw, 1.9rem)", fontWeight: 500, color: "#f8f5f0", marginBottom: "0.85rem", lineHeight: 1.2 }}>
                Built from proven patterns.
              </h3>
              <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "0.95rem", color: "#94a3b8", lineHeight: 1.75, marginBottom: "1rem" }}>
                I do not start from a blank page every time. I build from proven patterns — service-page structures, local SEO layouts, booking flows, review CTAs, and conversion sections that have been developed and tested across real projects — then tailored completely to each business.
              </p>
              <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "0.95rem", color: "#94a3b8", lineHeight: 1.75, marginBottom: "1.25rem" }}>
                Every new build gets custom design, custom copy, and a service architecture specific to that business. The efficiency comes from not reinventing the structural decisions that have already been worked out.
              </p>
              <Link href="/services" style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "0.85rem", color: "#d4a853", textDecoration: "none" }}>
                See how services are structured &rarr;
              </Link>
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: "0.6rem" }}>
              {[
                { label: "Service pages", desc: "Structures built for conversion, adapted to any specialty or trade" },
                { label: "Local SEO layouts", desc: "City and service-area pages that scale without starting over" },
                { label: "Booking flows", desc: "Patient and customer pathways proven across medical and service builds" },
                { label: "Review integration", desc: "Google review CTAs and trust signals in every project" },
                { label: "Content architecture", desc: "Copy frameworks tailored to how the patient or customer decides" },
                { label: "Mobile CTAs", desc: "Sticky bar and mobile-first layouts that work from day one" },
              ].map((pattern) => (
                <div key={pattern.label} style={{ padding: "0.85rem 1rem", background: "rgba(255,255,255,0.03)", borderRadius: "7px", border: "1px solid rgba(255,255,255,0.04)" }}>
                  <p style={{ fontFamily: "'DM Mono', monospace", fontSize: "0.63rem", letterSpacing: "0.06em", textTransform: "uppercase", color: "#d4a853", marginBottom: "0.2rem" }}>
                    {pattern.label}
                  </p>
                  <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "0.8rem", color: "#64748b", margin: 0, lineHeight: 1.5 }}>
                    {pattern.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Interactive Health Education callout */}
      <section style={{ padding: "3rem 1.5rem", maxWidth: "1200px", margin: "0 auto" }}>
        <div
          style={{
            background: "#161f2e",
            border: "1px solid rgba(255,255,255,0.07)",
            borderRadius: "12px",
            padding: "2.5rem",
            display: "grid",
            gridTemplateColumns: "1fr auto",
            gap: "2rem",
            alignItems: "center",
          }}
        >
          <div>
            <p
              style={{
                fontFamily: "'DM Mono', monospace",
                fontSize: "0.63rem",
                letterSpacing: "0.1em",
                textTransform: "uppercase",
                color: "#d4a853",
                marginBottom: "0.75rem",
              }}
            >
              Beyond Websites
            </p>
            <h3
              style={{
                fontFamily: "'Cormorant Garamond', Georgia, serif",
                fontSize: "1.5rem",
                fontWeight: 500,
                color: "#f8f5f0",
                marginBottom: "0.75rem",
              }}
            >
              Interactive Health Education
            </h3>
            <p
              style={{
                fontFamily: "'DM Sans', sans-serif",
                fontSize: "0.9rem",
                color: "#94a3b8",
                lineHeight: 1.7,
                maxWidth: "560px",
              }}
            >
              Alongside client work, I have been building a physician-authored patient education platform — a library of 145+ interactive modules covering clinical topics across primary care and specialty medicine. No PHI collection. Designed for clinics and health systems to share, embed, or license.
            </p>
          </div>
          <Link
            href="/work/interactive-health-education"
            style={{
              fontFamily: "'DM Sans', sans-serif",
              fontSize: "0.825rem",
              fontWeight: 500,
              color: "#d4a853",
              textDecoration: "none",
              whiteSpace: "nowrap",
            }}
          >
            See Case Study &rarr;
          </Link>
        </div>
      </section>

      {/* CTA */}
      <section style={{ padding: "0 1.5rem 5rem", maxWidth: "1200px", margin: "0 auto" }}>
        <CTASection />
      </section>
    </>
  );
}
