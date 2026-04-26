import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Get in touch with Campbell Digital Studio — inquiries for custom medical websites, local business sites, and website reviews.",
};

const contactEmail = "hello@peytoncampbell.studio";

export default function ContactPage() {
  const subject = encodeURIComponent("Website Inquiry — Campbell Digital Studio");
  const body = encodeURIComponent(
    `Hi Peyton,\n\nBusiness name: \nWebsite URL: \nWhat I need help with: \n\n`
  );
  const mailto = `mailto:${contactEmail}?subject=${subject}&body=${body}`;

  return (
    <>
      <section
        style={{
          paddingTop: "120px",
          paddingBottom: "5rem",
          paddingLeft: "1.5rem",
          paddingRight: "1.5rem",
          maxWidth: "1200px",
          margin: "0 auto",
        }}
      >
        <div className="grid-contact">
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
              Contact
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
              Let&rsquo;s talk about your website.
            </h1>
            <p
              style={{
                fontFamily: "'DM Sans', sans-serif",
                fontSize: "1rem",
                color: "#94a3b8",
                lineHeight: 1.8,
                marginBottom: "1.5rem",
                maxWidth: "520px",
              }}
            >
              Have a clinic, practice, or local business website that feels outdated or underbuilt? Send me the link and I will take a look — no commitment required.
            </p>
            <p
              style={{
                fontFamily: "'DM Sans', sans-serif",
                fontSize: "1rem",
                color: "#94a3b8",
                lineHeight: 1.8,
                maxWidth: "520px",
              }}
            >
              I work with medical clinics, wellness practices, therapy offices, medspas, and local service businesses. If you are not sure whether your project is a fit, send a note anyway.
            </p>

            {/* What to include */}
            <div
              style={{
                marginTop: "2.5rem",
                background: "#111827",
                borderRadius: "10px",
                border: "1px solid rgba(255,255,255,0.06)",
                padding: "1.5rem",
              }}
            >
              <p
                style={{
                  fontFamily: "'DM Mono', monospace",
                  fontSize: "0.63rem",
                  letterSpacing: "0.1em",
                  textTransform: "uppercase",
                  color: "#d4a853",
                  marginBottom: "1rem",
                }}
              >
                Helpful to include in your message
              </p>
              <ul
                style={{
                  margin: 0,
                  padding: 0,
                  listStyle: "none",
                  display: "flex",
                  flexDirection: "column",
                  gap: "0.55rem",
                }}
              >
                {[
                  "Your business name and what you do",
                  "Your current website URL (if one exists)",
                  "What feels broken, outdated, or underperforming",
                  "What you want the site to accomplish",
                  "Timeline or urgency, if any",
                ].map((item) => (
                  <li
                    key={item}
                    style={{
                      fontFamily: "'DM Sans', sans-serif",
                      fontSize: "0.85rem",
                      color: "#94a3b8",
                      paddingLeft: "1.1rem",
                      position: "relative",
                    }}
                  >
                    <span
                      style={{
                        position: "absolute",
                        left: 0,
                        color: "#d4a853",
                        fontFamily: "'DM Mono', monospace",
                      }}
                    >
                      —
                    </span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Right — contact card */}
          <div>
            <div
              style={{
                background: "#161f2e",
                border: "1px solid rgba(255,255,255,0.07)",
                borderRadius: "12px",
                padding: "2rem",
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
                  marginBottom: "1.5rem",
                }}
              >
                Send a Message
              </p>

              <div style={{ marginBottom: "1.25rem" }}>
                <p
                  style={{
                    fontFamily: "'DM Sans', sans-serif",
                    fontSize: "0.8rem",
                    color: "#64748b",
                    marginBottom: "0.35rem",
                  }}
                >
                  Email
                </p>
                <a
                  href={`mailto:${contactEmail}`}
                  style={{
                    fontFamily: "'DM Sans', sans-serif",
                    fontSize: "0.95rem",
                    color: "#f8f5f0",
                    textDecoration: "none",
                  }}
                >
                  {contactEmail}
                </a>
              </div>

              <div
                style={{
                  height: "1px",
                  background: "rgba(255,255,255,0.06)",
                  margin: "1.5rem 0",
                }}
              />

              <p
                style={{
                  fontFamily: "'DM Sans', sans-serif",
                  fontSize: "0.875rem",
                  color: "#94a3b8",
                  lineHeight: 1.65,
                  marginBottom: "1.25rem",
                }}
              >
                Clicking the button below will open your email client with a pre-filled subject line and a simple message template.
              </p>

              <a
                href={mailto}
                style={{
                  display: "block",
                  fontFamily: "'DM Sans', sans-serif",
                  fontSize: "0.9rem",
                  fontWeight: 500,
                  color: "#0b1120",
                  background: "#d4a853",
                  padding: "0.8rem 1.5rem",
                  borderRadius: "8px",
                  textDecoration: "none",
                  textAlign: "center",
                }}
              >
                Email Peyton
              </a>
            </div>

            {/* Alternative: website review */}
            <div
              style={{
                background: "linear-gradient(135deg, #111827, #0b1120)",
                border: "1px solid rgba(212,168,83,0.15)",
                borderRadius: "12px",
                padding: "1.5rem",
                textAlign: "center",
              }}
            >
              <p
                style={{
                  fontFamily: "'DM Sans', sans-serif",
                  fontSize: "0.85rem",
                  color: "#94a3b8",
                  marginBottom: "0.75rem",
                  lineHeight: 1.6,
                }}
              >
                Not sure where to start? A website review is the easiest entry point.
              </p>
              <Link
                href="/website-review"
                style={{
                  fontFamily: "'DM Sans', sans-serif",
                  fontSize: "0.825rem",
                  color: "#d4a853",
                  textDecoration: "none",
                }}
              >
                Learn about website reviews &rarr;
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
