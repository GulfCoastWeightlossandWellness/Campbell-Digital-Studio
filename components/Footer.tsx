import Link from "next/link";
import StudioMark from "@/components/marks/StudioMark";
import FooterEmailCapture from "@/components/FooterEmailCapture";
import { siteConfig } from "@/lib/site-config";

const indexLinks: { label: string; href: string }[] = [
  { label: "Work", href: "/work" },
  { label: "Capabilities", href: "/#capabilities" },
  { label: "Process", href: "/#process" },
  { label: "About", href: "/#about" },
  { label: "Inquire", href: "/inquire" },
];

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
            <div className="mono-caption" style={{ color: "var(--gold-400)", marginBottom: "20px" }}>
              § Studio
            </div>
            <div style={{ marginBottom: "20px", marginLeft: "-16px" }}>
              <StudioMark onDark size="xl" />
            </div>
            <p
              style={{
                fontFamily: "var(--font-manrope), sans-serif",
                fontSize: "13px",
                lineHeight: 1.6,
                color: "rgba(255,255,255,0.78)",
                marginBottom: "10px",
              }}
            >
              {siteConfig.founder.location}
            </p>
            <a
              href={`mailto:${siteConfig.email}`}
              className="editorial-link on-dark"
              style={{
                fontFamily: "var(--font-jetbrains), monospace",
                fontSize: "12px",
                letterSpacing: "0.12em",
                color: "var(--gold-400)",
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
                    fontFamily: "var(--font-jetbrains), monospace",
                    fontSize: "11px",
                    letterSpacing: "0.18em",
                    textTransform: "uppercase",
                    color: "rgba(255,255,255,0.6)",
                  }}
                >
                  GitHub ↗
                </a>
              </div>
            ) : null}
          </div>

          {/* Index */}
          <div>
            <div className="mono-caption" style={{ color: "var(--gold-400)", marginBottom: "16px" }}>
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
              {indexLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="editorial-link on-dark"
                    style={{
                      fontFamily: "var(--font-manrope), sans-serif",
                      fontSize: "14px",
                      color: "rgba(255,255,255,0.85)",
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
                      fontFamily: "var(--font-manrope), sans-serif",
                      fontSize: "14px",
                      color: "rgba(255,255,255,0.85)",
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
            <div className="mono-caption" style={{ color: "var(--gold-400)", marginBottom: "16px" }}>
              § Contact
            </div>
            <p
              style={{
                fontFamily: "var(--font-fraunces), Georgia, serif",
                fontSize: "16px",
                fontStyle: "italic",
                fontWeight: 300,
                lineHeight: 1.55,
                color: "rgba(255,255,255,0.92)",
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
            borderTop: "1px solid rgba(232,196,107,0.2)",
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
              fontFamily: "var(--font-jetbrains), monospace",
              fontSize: "10px",
              letterSpacing: "0.18em",
              textTransform: "uppercase",
              color: "rgba(255,255,255,0.5)",
            }}
          >
            © {year} {siteConfig.name} · {siteConfig.founder.location}
          </span>
          <span
            style={{
              fontFamily: "var(--font-jetbrains), monospace",
              fontSize: "10px",
              letterSpacing: "0.18em",
              textTransform: "uppercase",
              color: "rgba(255,255,255,0.5)",
            }}
          >
            Made by hand, deliberately small.
          </span>
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
