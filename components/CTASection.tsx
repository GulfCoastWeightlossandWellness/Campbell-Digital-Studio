import Link from "next/link";

interface CTASectionProps {
  headline?: string;
  subtext?: string;
  primaryLabel?: string;
  primaryHref?: string;
  secondaryLabel?: string;
  secondaryHref?: string;
}

export default function CTASection({
  headline = "Want to see what your website could become?",
  subtext = "Send me the link to your current site. I will take a look at the design, SEO structure, service pages, and conversion flow — and tell you what I would improve.",
  primaryLabel = "Request Website Review",
  primaryHref = "/website-review",
  secondaryLabel = "View Work",
  secondaryHref = "/work",
}: CTASectionProps) {
  return (
    <section
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
      {/* Decorative element */}
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
      <div
        style={{
          position: "absolute",
          bottom: "-40px",
          left: "-40px",
          width: "160px",
          height: "160px",
          borderRadius: "50%",
          background: "rgba(212,168,83,0.03)",
          pointerEvents: "none",
        }}
      />

      <div style={{ position: "relative", zIndex: 1, maxWidth: "600px", margin: "0 auto" }}>
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
          {headline}
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
          {subtext}
        </p>
        <div style={{ display: "flex", gap: "1rem", justifyContent: "center", flexWrap: "wrap" }}>
          <Link
            href={primaryHref}
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
            {primaryLabel}
          </Link>
          {secondaryLabel && secondaryHref && (
            <Link
              href={secondaryHref}
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
              {secondaryLabel}
            </Link>
          )}
        </div>
      </div>
    </section>
  );
}
