import type { Metadata } from "next";
import Link from "next/link";
import SectionHeader from "@/components/SectionHeader";

export const metadata: Metadata = {
  title: "Website Review",
  description:
    "Request a free website review for your clinic, practice, or local business. I will look at your design, SEO, service pages, and conversion flow — and tell you what I would improve.",
};

const reviewAreas = [
  {
    title: "Design and Trust",
    items: [
      "Does the site look current and professional?",
      "Does it build trust within the first 10 seconds?",
      "Is the visual hierarchy clear and intentional?",
      "Are credibility signals visible and prominent?",
    ],
  },
  {
    title: "Local SEO Structure",
    items: [
      "Are there dedicated service pages?",
      "Are city and location pages built out?",
      "Is there schema markup for the business type?",
      "Are title tags, descriptions, and headings optimized?",
    ],
  },
  {
    title: "Service Pages",
    items: [
      "Is each service explained clearly and separately?",
      "Is copy written for a patient comparing options?",
      "Are pricing or process questions addressed?",
      "Does each service page have a clear CTA?",
    ],
  },
  {
    title: "Booking and Contact Flow",
    items: [
      "How many clicks to reach a booking or contact action?",
      "Are booking links working and accurate?",
      "Is there a sticky CTA on mobile?",
      "Is the contact form functional and visible?",
    ],
  },
  {
    title: "Mobile Experience",
    items: [
      "Does the site work on a phone?",
      "Is the navigation usable on mobile?",
      "Are CTAs large enough to tap easily?",
      "Does the site load quickly on mobile?",
    ],
  },
  {
    title: "Technical Structure",
    items: [
      "Are there broken links or 404 errors?",
      "Is there a sitemap and robots.txt?",
      "Are canonical URLs set correctly?",
      "Is SSL active and HTTPS enforced?",
    ],
  },
];

const contactEmail = "hello@peytoncampbell.studio";

export default function WebsiteReviewPage() {
  const subject = encodeURIComponent("Website Review Request — Campbell Digital Studio");
  const body = encodeURIComponent(
    `Hi Peyton,\n\nI would like to request a website review.\n\nBusiness name: \nWebsite URL: \nBusiness type (clinic, therapy, HVAC, etc.): \nWhat feels broken or underperforming: \n\n`
  );
  const mailto = `mailto:${contactEmail}?subject=${subject}&body=${body}`;

  return (
    <>
      {/* Hero */}
      <section
        style={{
          paddingTop: "120px",
          paddingBottom: "4rem",
          paddingLeft: "1.5rem",
          paddingRight: "1.5rem",
          maxWidth: "1200px",
          margin: "0 auto",
          position: "relative",
        }}
      >
        <div
          style={{
            position: "absolute",
            top: "80px",
            right: "-80px",
            width: "400px",
            height: "400px",
            borderRadius: "50%",
            background: "radial-gradient(circle, rgba(212,168,83,0.05) 0%, transparent 70%)",
            pointerEvents: "none",
          }}
        />
        <div style={{ position: "relative", zIndex: 1, maxWidth: "720px" }}>
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
            Website Review
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
              fontSize: "clamp(2.2rem, 5.5vw, 3.8rem)",
              fontWeight: 500,
              color: "#f8f5f0",
              lineHeight: 1.08,
              marginBottom: "1.5rem",
            }}
          >
            Want to know what your website could become?
          </h1>
          <p
            style={{
              fontFamily: "'DM Sans', sans-serif",
              fontSize: "1.05rem",
              color: "#94a3b8",
              lineHeight: 1.8,
              marginBottom: "2rem",
              maxWidth: "600px",
            }}
          >
            Send me the link to your current site. I will look at the design, local SEO structure, service pages, booking flow, mobile experience, and technical foundation — and tell you honestly what I would improve.
          </p>

          <div
            style={{
              background: "#111827",
              border: "1px solid rgba(212,168,83,0.12)",
              borderRadius: "8px",
              padding: "1rem 1.25rem",
              marginBottom: "2rem",
              maxWidth: "540px",
            }}
          >
            <p
              style={{
                fontFamily: "'DM Sans', sans-serif",
                fontSize: "0.825rem",
                color: "#64748b",
                lineHeight: 1.6,
              }}
            >
              This is a no-pressure starting point. I will review the site and share observations. If there is a fit for a project, we can discuss scope from there. I do not make guarantees about rankings or traffic — I tell you what I would build and why.
            </p>
          </div>

          <a
            href={mailto}
            style={{
              display: "inline-block",
              fontFamily: "'DM Sans', sans-serif",
              fontSize: "0.95rem",
              fontWeight: 500,
              color: "#0b1120",
              background: "#d4a853",
              padding: "0.85rem 2rem",
              borderRadius: "8px",
              textDecoration: "none",
            }}
          >
            Request Website Review
          </a>
        </div>
      </section>

      {/* What I review */}
      <section style={{ padding: "3rem 1.5rem 5rem", background: "#080e1a" }}>
        <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
          <SectionHeader
            eyebrow="What I Review"
            headline="Six areas that determine whether a site is working."
            subtext="Most local business and medical websites underperform in at least three of these. Often more."
          />
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
              gap: "1.25rem",
            }}
          >
            {reviewAreas.map((area) => (
              <div
                key={area.title}
                style={{
                  background: "#0f1624",
                  border: "1px solid rgba(255,255,255,0.06)",
                  borderRadius: "12px",
                  padding: "1.5rem",
                }}
              >
                <div
                  style={{
                    width: "28px",
                    height: "2px",
                    background: "#d4a853",
                    marginBottom: "0.85rem",
                  }}
                />
                <h3
                  style={{
                    fontFamily: "'Cormorant Garamond', Georgia, serif",
                    fontSize: "1.15rem",
                    fontWeight: 500,
                    color: "#f8f5f0",
                    marginBottom: "0.85rem",
                  }}
                >
                  {area.title}
                </h3>
                <ul
                  style={{
                    margin: 0,
                    padding: 0,
                    listStyle: "none",
                    display: "flex",
                    flexDirection: "column",
                    gap: "0.45rem",
                  }}
                >
                  {area.items.map((item) => (
                    <li
                      key={item}
                      style={{
                        fontFamily: "'DM Sans', sans-serif",
                        fontSize: "0.8rem",
                        color: "#64748b",
                        paddingLeft: "1.1rem",
                        position: "relative",
                        lineHeight: 1.5,
                      }}
                    >
                      <span
                        style={{
                          position: "absolute",
                          left: 0,
                          color: "#d4a853",
                          fontFamily: "'DM Mono', monospace",
                          fontSize: "0.7rem",
                        }}
                      >
                        ?
                      </span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Who this is for */}
      <section style={{ padding: "5rem 1.5rem" }}>
        <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
          <div className="grid-2">
            <div>
              <SectionHeader
                eyebrow="Who This Is For"
                headline="You already have a site. You are not sure it is doing its job."
              />
              <p
                style={{
                  fontFamily: "'DM Sans', sans-serif",
                  fontSize: "0.95rem",
                  color: "#94a3b8",
                  lineHeight: 1.8,
                  marginBottom: "1.25rem",
                }}
              >
                A website review is most useful if you have an existing site that feels stale, does not reflect the quality of your practice or business, or is not generating the leads or bookings you expect.
              </p>
              <p
                style={{
                  fontFamily: "'DM Sans', sans-serif",
                  fontSize: "0.95rem",
                  color: "#94a3b8",
                  lineHeight: 1.8,
                }}
              >
                I work with medical clinics, wellness practices, therapy offices, medspas, HVAC companies, and other local service businesses. If you are unsure whether your situation is a fit, send the link anyway.
              </p>
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
              {[
                "Medical clinics, DPC practices, and urgent care sites",
                "Medspa and medical wellness practices",
                "Therapy and counseling practices",
                "HVAC, plumbing, and home service companies",
                "Any local business with an outdated or underperforming site",
                "Healthcare startups and telehealth clinics needing a first site",
              ].map((item) => (
                <div
                  key={item}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "0.75rem",
                    padding: "0.85rem 1rem",
                    background: "#111827",
                    borderRadius: "8px",
                    border: "1px solid rgba(255,255,255,0.05)",
                  }}
                >
                  <span
                    style={{
                      color: "#d4a853",
                      fontFamily: "'DM Mono', monospace",
                      fontSize: "0.75rem",
                      flexShrink: 0,
                    }}
                  >
                    ✓
                  </span>
                  <p
                    style={{
                      fontFamily: "'DM Sans', sans-serif",
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
        </div>
      </section>

      {/* Final CTA */}
      <section
        style={{
          padding: "0 1.5rem 5rem",
          maxWidth: "1200px",
          margin: "0 auto",
        }}
      >
        <div
          style={{
            background: "linear-gradient(135deg, #111827 0%, #0b1120 100%)",
            border: "1px solid rgba(212,168,83,0.15)",
            borderRadius: "16px",
            padding: "4rem 2rem",
            textAlign: "center",
            position: "relative",
            overflow: "hidden",
          }}
        >
          <div
            style={{
              position: "absolute",
              top: "-60px",
              right: "-60px",
              width: "200px",
              height: "200px",
              borderRadius: "50%",
              background: "rgba(212,168,83,0.04)",
              pointerEvents: "none",
            }}
          />
          <div style={{ position: "relative", zIndex: 1, maxWidth: "560px", margin: "0 auto" }}>
            <div
              style={{
                width: "48px",
                height: "2px",
                background: "linear-gradient(90deg, #d4a853, transparent)",
                margin: "0 auto 1.5rem",
              }}
            />
            <h2
              style={{
                fontFamily: "'Cormorant Garamond', Georgia, serif",
                fontSize: "clamp(1.8rem, 4vw, 2.5rem)",
                fontWeight: 500,
                color: "#f8f5f0",
                marginBottom: "1rem",
                lineHeight: 1.2,
              }}
            >
              Send me the link.
            </h2>
            <p
              style={{
                fontFamily: "'DM Sans', sans-serif",
                fontSize: "1rem",
                color: "#94a3b8",
                marginBottom: "2rem",
                lineHeight: 1.7,
              }}
            >
              No long intake form. Just send the URL and a sentence about what feels off. I will take a look and come back to you with honest observations.
            </p>
            <div style={{ display: "flex", gap: "1rem", justifyContent: "center", flexWrap: "wrap" }}>
              <a
                href={mailto}
                style={{
                  fontFamily: "'DM Sans', sans-serif",
                  fontSize: "0.9rem",
                  fontWeight: 500,
                  color: "#0b1120",
                  background: "#d4a853",
                  padding: "0.75rem 1.75rem",
                  borderRadius: "8px",
                  textDecoration: "none",
                }}
              >
                Request Website Review
              </a>
              <Link
                href="/work"
                style={{
                  fontFamily: "'DM Sans', sans-serif",
                  fontSize: "0.9rem",
                  fontWeight: 400,
                  color: "#f8f5f0",
                  background: "transparent",
                  border: "1px solid rgba(255,255,255,0.15)",
                  padding: "0.75rem 1.75rem",
                  borderRadius: "8px",
                  textDecoration: "none",
                }}
              >
                View Work First
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
