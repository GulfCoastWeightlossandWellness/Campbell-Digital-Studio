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
        background: "linear-gradient(135deg, #0d1e3e 0%, #0a1628 50%, #050c1a 100%)",
        border: "1px solid rgba(79,142,247,0.15)",
        borderRadius: "20px",
        padding: "5rem 2rem",
        textAlign: "center",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Top-right glow */}
      <div
        aria-hidden
        style={{
          position: "absolute",
          top: "-80px",
          right: "-80px",
          width: "320px",
          height: "320px",
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(79,142,247,0.12) 0%, transparent 70%)",
          pointerEvents: "none",
        }}
      />
      {/* Bottom-left glow */}
      <div
        aria-hidden
        style={{
          position: "absolute",
          bottom: "-60px",
          left: "-60px",
          width: "240px",
          height: "240px",
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(212,168,83,0.06) 0%, transparent 70%)",
          pointerEvents: "none",
        }}
      />

      <div style={{ position: "relative", zIndex: 1, maxWidth: "640px", margin: "0 auto" }}>
        {/* Eyebrow line */}
        <div
          style={{
            width: "48px",
            height: "2px",
            background: "linear-gradient(90deg, #4f8ef7, transparent)",
            margin: "0 auto 1.5rem",
          }}
        />

        <h2
          style={{
            fontFamily: "'Plus Jakarta Sans', system-ui, sans-serif",
            fontSize: "clamp(1.9rem, 4.5vw, 2.8rem)",
            fontWeight: 800,
            lineHeight: 1.1,
            letterSpacing: "-0.025em",
            marginBottom: "1.25rem",
            background: "linear-gradient(135deg, #f0f4fc 20%, #a8c8ff 65%, #7db0ff 100%)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text",
          }}
        >
          {headline}
        </h2>

        <p
          style={{
            fontFamily: "'DM Sans', system-ui, sans-serif",
            fontSize: "1.05rem",
            color: "#94a3b8",
            marginBottom: "2.5rem",
            lineHeight: 1.75,
          }}
        >
          {subtext}
        </p>

        <div style={{ display: "flex", gap: "1rem", justifyContent: "center", flexWrap: "wrap" }}>
          <Link
            href={primaryHref}
            style={{
              fontFamily: "'DM Sans', system-ui, sans-serif",
              fontSize: "0.9rem",
              fontWeight: 600,
              color: "#ffffff",
              background: "linear-gradient(135deg, #4f8ef7 0%, #3b7de8 100%)",
              padding: "0.85rem 2rem",
              borderRadius: "9px",
              textDecoration: "none",
              boxShadow: "0 4px 20px rgba(79,142,247,0.35)",
              transition: "opacity 0.2s, box-shadow 0.2s",
            }}
          >
            {primaryLabel}
          </Link>
          {secondaryLabel && secondaryHref && (
            <Link
              href={secondaryHref}
              style={{
                fontFamily: "'DM Sans', system-ui, sans-serif",
                fontSize: "0.9rem",
                fontWeight: 400,
                color: "#f0f4fc",
                background: "transparent",
                border: "1px solid rgba(255,255,255,0.15)",
                padding: "0.85rem 2rem",
                borderRadius: "9px",
                textDecoration: "none",
                transition: "border-color 0.2s",
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
