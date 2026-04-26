import Link from "next/link";
import Image from "next/image";

export default function Footer() {
  const year = new Date().getUTCFullYear();
  return (
    <footer
      style={{
        background: "#030810",
        borderTop: "1px solid rgba(255,255,255,0.06)",
        padding: "3.5rem 1.5rem 2rem",
      }}
    >
      <div
        style={{
          maxWidth: "1200px",
          margin: "0 auto",
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
          gap: "2.5rem",
          marginBottom: "2.5rem",
        }}
      >
        {/* Brand column */}
        <div>
          <div style={{ display: "inline-flex", alignItems: "center", gap: "0.65rem", marginBottom: "0.75rem" }}>
            <Image
              src="/images/brand/campbell-digital-studio-icon-transparent.png"
              alt=""
              aria-hidden="true"
              width={40}
              height={40}
              sizes="40px"
              style={{
                width: "40px",
                height: "40px",
                objectFit: "contain",
                borderRadius: "10px",
                background: "rgba(79,142,247,0.06)",
                border: "1px solid rgba(79,142,247,0.15)",
                padding: "2px",
                flexShrink: 0,
              }}
            />
            <p
              style={{
                fontFamily: "'Plus Jakarta Sans', system-ui, sans-serif",
                fontSize: "1rem",
                fontWeight: 700,
                color: "#f0f4fc",
                margin: 0,
                letterSpacing: "-0.01em",
              }}
            >
              Campbell Digital{" "}
              <span
                style={{
                  background: "linear-gradient(135deg, #7db0ff, #4f8ef7)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                }}
              >
                Studio
              </span>
            </p>
          </div>
          <p
            style={{
              fontFamily: "'DM Sans', system-ui, sans-serif",
              fontSize: "0.82rem",
              color: "#475569",
              lineHeight: 1.65,
              maxWidth: "240px",
            }}
          >
            Custom medical and local-business websites built by a physician in training.
          </p>
        </div>

        {/* Navigation */}
        <div>
          <p style={{ fontFamily: "'DM Mono', monospace", fontSize: "0.63rem", letterSpacing: "0.12em", textTransform: "uppercase", color: "#4f8ef7", marginBottom: "1rem" }}>Navigation</p>
          <div style={{ display: "flex", flexDirection: "column", gap: "0.6rem" }}>
            {[
              { label: "Work", href: "/work" },
              { label: "Services", href: "/services" },
              { label: "About", href: "/about" },
              { label: "Website Review", href: "/website-review" },
              { label: "Contact", href: "/contact" },
            ].map((link) => (
              <Link
                key={link.href}
                href={link.href}
                style={{ fontFamily: "'DM Sans', system-ui, sans-serif", fontSize: "0.875rem", color: "#475569", textDecoration: "none" }}
                className="nav-link-hover"
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>

        {/* Featured work */}
        <div>
          <p style={{ fontFamily: "'DM Mono', monospace", fontSize: "0.63rem", letterSpacing: "0.12em", textTransform: "uppercase", color: "#4f8ef7", marginBottom: "1rem" }}>Featured Work</p>
          <div style={{ display: "flex", flexDirection: "column", gap: "0.6rem" }}>
            {[
              { label: "Revitalize Aesthetics", href: "/work/revitalize" },
              { label: "ACExperts251", href: "/work/acexperts" },
              { label: "Collective Counseling", href: "/work/collective-counseling" },
              { label: "Gulf Coast W&W", href: "/work/gulf-coast-weight-wellness" },
              { label: "Interactive Health Ed.", href: "/work/interactive-health-education" },
            ].map((link) => (
              <Link
                key={link.href}
                href={link.href}
                style={{ fontFamily: "'DM Sans', system-ui, sans-serif", fontSize: "0.875rem", color: "#475569", textDecoration: "none" }}
                className="nav-link-hover"
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>

        {/* Get started */}
        <div>
          <p style={{ fontFamily: "'DM Mono', monospace", fontSize: "0.63rem", letterSpacing: "0.12em", textTransform: "uppercase", color: "#4f8ef7", marginBottom: "1rem" }}>Get Started</p>
          <p style={{ fontFamily: "'DM Sans', system-ui, sans-serif", fontSize: "0.82rem", color: "#475569", marginBottom: "1rem", lineHeight: 1.65 }}>
            Have a website that feels outdated or underbuilt? Send me the link.
          </p>
          <Link
            href="/website-review"
            style={{
              display: "inline-block",
              fontFamily: "'DM Sans', system-ui, sans-serif",
              fontSize: "0.8rem",
              fontWeight: 600,
              color: "#ffffff",
              background: "linear-gradient(135deg, #4f8ef7, #3b7de8)",
              padding: "0.5rem 1.15rem",
              borderRadius: "7px",
              textDecoration: "none",
              boxShadow: "0 2px 10px rgba(79,142,247,0.2)",
            }}
          >
            Request Website Review
          </Link>
        </div>
      </div>

      {/* Bottom bar */}
      <div
        style={{
          maxWidth: "1200px",
          margin: "0 auto",
          paddingTop: "2rem",
          borderTop: "1px solid rgba(255,255,255,0.05)",
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "space-between",
          gap: "0.75rem",
        }}
      >
        <p style={{ fontFamily: "'DM Sans', system-ui, sans-serif", fontSize: "0.75rem", color: "#1e293b" }}>
          &copy; {year} Campbell Digital Studio. All rights reserved.
        </p>
        <p style={{ fontFamily: "'DM Sans', system-ui, sans-serif", fontSize: "0.75rem", color: "#1e293b" }}>
          Baldwin County, Alabama
        </p>
      </div>
    </footer>
  );
}
