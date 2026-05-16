import Link from "next/link";
import StudioMark from "@/components/marks/StudioMark";
import FooterEmailCapture from "@/components/FooterEmailCapture";
import { siteConfig } from "@/lib/site-config";
import { primaryNavLinks } from "@/lib/nav";

export default function Footer() {
  const year = new Date().getUTCFullYear();
  const showBooking = !!siteConfig.calUsername;

  return (
    <footer
      className="cover-surface"
      style={{ marginTop: "clamp(96px, 12vw, 160px)" }}
    >
      <div
        className="section-wrap"
        style={{ paddingTop: "72px", paddingBottom: "48px" }}
      >
        <div
          className="footer-grid"
          style={{
            display: "grid",
            gridTemplateColumns: "1.1fr 0.8fr 1.2fr",
            gap: "48px",
            alignItems: "start",
          }}
        >
          {/* Studio */}
          <div>
            <div className="mono-caption" style={{ color: "var(--aurora-violet)", marginBottom: "20px" }}>
              § Studio
            </div>
            <div style={{ marginBottom: "20px", marginLeft: "-16px" }}>
              <StudioMark onDark size="xl" />
            </div>
            <p
              style={{
                fontFamily: "var(--font-geist-sans), system-ui, sans-serif",
                fontSize: "13px",
                lineHeight: 1.6,
                color: "var(--ink-2)",
                marginBottom: "10px",
              }}
            >
              {siteConfig.founder.location}
            </p>
            <a
              href={`mailto:${siteConfig.email}`}
              className="editorial-link on-dark"
              style={{
                fontFamily: "var(--font-geist-mono), var(--font-jetbrains), monospace",
                fontSize: "12px",
                letterSpacing: "0.10em",
                color: "var(--aurora-violet)",
              }}
            >
              {siteConfig.email}
            </a>
            {siteConfig.social.github ? (
              <div style={{ marginTop: "10px" }}>
                <a
                  href={`https://github.com/${siteConfig.social.github}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="editorial-link on-dark"
                  style={{
                    fontFamily: "var(--font-geist-mono), var(--font-jetbrains), monospace",
                    fontSize: "11px",
                    letterSpacing: "0.18em",
                    textTransform: "uppercase",
                    color: "var(--ink-3)",
                  }}
                >
                  GitHub ↗
                </a>
              </div>
            ) : null}
          </div>

          {/* Index */}
          <div>
            <div className="mono-caption" style={{ color: "var(--aurora-violet)", marginBottom: "16px" }}>
              § Index
            </div>
            <ul
              style={{
                listStyle: "none",
                padding: 0,
                margin: 0,
                display: "flex",
                flexDirection: "column",
                gap: "10px",
              }}
            >
              {primaryNavLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="editorial-link on-dark"
                    style={{
                      fontFamily: "var(--font-geist-sans), system-ui, sans-serif",
                      fontSize: "14px",
                      color: "var(--ink-1)",
                    }}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
              {showBooking ? (
                <li>
                  <Link
                    href="/call"
                    className="editorial-link on-dark"
                    style={{
                      fontFamily: "var(--font-geist-sans), system-ui, sans-serif",
                      fontSize: "14px",
                      color: "var(--ink-1)",
                    }}
                  >
                    Book a call
                  </Link>
                </li>
              ) : null}
            </ul>
          </div>

          {/* Contact / capture */}
          <div>
            <div className="mono-caption" style={{ color: "var(--aurora-violet)", marginBottom: "16px" }}>
              § Contact
            </div>
            <p
              style={{
                fontFamily: "var(--font-fraunces), Georgia, serif",
                fontSize: "16px",
                fontStyle: "italic",
                fontWeight: 300,
                lineHeight: 1.55,
                color: "var(--ink-1)",
                fontVariationSettings: '"opsz" 24',
                marginBottom: "20px",
              }}
            >
              Currently building digital infrastructure for clinical practices and multi-location service businesses on the Gulf Coast.
            </p>
            <FooterEmailCapture />
          </div>
        </div>

        <div
          style={{
            borderTop: "1px solid var(--border-subtle)",
            marginTop: "56px",
            paddingTop: "20px",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "baseline",
            gap: "16px",
            flexWrap: "wrap",
          }}
        >
          <span
            style={{
              fontFamily: "var(--font-geist-mono), var(--font-jetbrains), monospace",
              fontSize: "10px",
              letterSpacing: "0.18em",
              textTransform: "uppercase",
              color: "var(--ink-4)",
            }}
          >
            © {year} {siteConfig.name} · {siteConfig.founder.location}
          </span>
          <div
            style={{
              display: "flex",
              gap: "20px",
              alignItems: "baseline",
              flexWrap: "wrap",
            }}
          >
            <Link
              href="/privacy"
              className="editorial-link on-dark"
              style={{
                fontFamily: "var(--font-geist-mono), var(--font-jetbrains), monospace",
                fontSize: "10px",
                letterSpacing: "0.18em",
                textTransform: "uppercase",
                color: "var(--ink-4)",
              }}
            >
              Privacy
            </Link>
            <Link
              href="/terms"
              className="editorial-link on-dark"
              style={{
                fontFamily: "var(--font-geist-mono), var(--font-jetbrains), monospace",
                fontSize: "10px",
                letterSpacing: "0.18em",
                textTransform: "uppercase",
                color: "var(--ink-4)",
              }}
            >
              Terms
            </Link>
            <span
              style={{
                fontFamily: "var(--font-geist-mono), var(--font-jetbrains), monospace",
                fontSize: "10px",
                letterSpacing: "0.18em",
                textTransform: "uppercase",
                color: "var(--ink-4)",
              }}
            >
              Made by hand, deliberately small.
            </span>
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 860px) {
          .footer-grid { grid-template-columns: 1fr !important; gap: 36px !important; }
        }
      `}</style>
    </footer>
  );
}
