import Link from "next/link";
import StudioMark from "@/components/marks/StudioMark";

const indexLinks: { label: string; href: string }[] = [
  { label: "Work", href: "/work" },
  { label: "Method", href: "/method" },
  { label: "Studio", href: "/studio" },
  { label: "Practice", href: "/practice" },
  { label: "Notes", href: "/notes" },
  { label: "Review", href: "/review" },
  { label: "Inquire", href: "/inquire" },
];

export default function Footer() {
  const year = new Date().getUTCFullYear();

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
            gridTemplateColumns: "repeat(3, 1fr)",
            gap: "48px",
            alignItems: "start",
          }}
        >
          {/* Studio */}
          <div>
            <div className="mono-caption" style={{ color: "var(--gold-400)", marginBottom: "16px" }}>
              § Studio
            </div>
            <div style={{ marginBottom: "16px" }}>
              <StudioMark onDark size="sm" />
            </div>
            <p
              style={{
                fontFamily: "var(--font-manrope), sans-serif",
                fontSize: "13px",
                lineHeight: 1.6,
                color: "rgba(255,255,255,0.78)",
              }}
            >
              Daphne, Alabama
              <br />
              Family Medicine, PGY-1
            </p>
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
            </ul>
          </div>

          {/* Currently */}
          <div>
            <div className="mono-caption" style={{ color: "var(--gold-400)", marginBottom: "16px" }}>
              § Currently
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
              }}
            >
              Building Air Solutions Heating &amp; Cooling — a 600-page Baldwin County HVAC platform.
            </p>
            <Link
              href="/inquire"
              className="editorial-link on-dark"
              style={{
                fontFamily: "var(--font-jetbrains), monospace",
                fontSize: "11px",
                letterSpacing: "0.18em",
                textTransform: "uppercase",
                color: "var(--gold-400)",
                marginTop: "16px",
                display: "inline-block",
              }}
            >
              Inquire about a project →
            </Link>
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
            © {year} Campbell Digital Studio · Daphne, Alabama
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
        @media (max-width: 720px) {
          .footer-grid { grid-template-columns: 1fr !important; gap: 36px !important; }
        }
      `}</style>
    </footer>
  );
}
