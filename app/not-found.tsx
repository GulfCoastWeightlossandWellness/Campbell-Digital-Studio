import Link from "next/link";

export default function NotFound() {
  return (
    <section
      style={{
        paddingTop: "140px",
        paddingBottom: "6rem",
        paddingLeft: "1.5rem",
        paddingRight: "1.5rem",
        maxWidth: "1200px",
        margin: "0 auto",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        textAlign: "center",
        minHeight: "60vh",
        justifyContent: "center",
      }}
    >
      {/* Decorative number */}
      <p
        style={{
          fontFamily: "'Cormorant Garamond', Georgia, serif",
          fontSize: "clamp(5rem, 18vw, 10rem)",
          fontWeight: 400,
          lineHeight: 1,
          color: "rgba(212,168,83,0.12)",
          letterSpacing: "-0.04em",
          marginBottom: "-1rem",
          userSelect: "none",
        }}
      >
        404
      </p>

      <div
        style={{
          width: "48px",
          height: "2px",
          background: "linear-gradient(90deg, transparent, #d4a853, transparent)",
          margin: "0 auto 1.5rem",
        }}
      />

      <h1
        style={{
          fontFamily: "'Cormorant Garamond', Georgia, serif",
          fontSize: "clamp(1.8rem, 4vw, 2.6rem)",
          fontWeight: 500,
          color: "#f8f5f0",
          marginBottom: "1rem",
          lineHeight: 1.2,
        }}
      >
        Page not found.
      </h1>

      <p
        style={{
          fontFamily: "'DM Sans', sans-serif",
          fontSize: "1rem",
          color: "#94a3b8",
          lineHeight: 1.7,
          maxWidth: "420px",
          marginBottom: "2.5rem",
        }}
      >
        The page you are looking for has moved, been removed, or never existed. Head back to the homepage or browse the portfolio.
      </p>

      <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap", justifyContent: "center" }}>
        <Link
          href="/"
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
          Back to Home
        </Link>
        <Link
          href="/work"
          style={{
            fontFamily: "'DM Sans', sans-serif",
            fontSize: "0.9rem",
            fontWeight: 400,
            color: "#f8f5f0",
            border: "1px solid rgba(255,255,255,0.15)",
            padding: "0.75rem 1.75rem",
            borderRadius: "8px",
            textDecoration: "none",
          }}
        >
          View Work
        </Link>
      </div>

      {/* Quick links */}
      <div
        style={{
          display: "flex",
          gap: "1.5rem",
          flexWrap: "wrap",
          justifyContent: "center",
          marginTop: "2.5rem",
          paddingTop: "2rem",
          borderTop: "1px solid rgba(255,255,255,0.06)",
        }}
      >
        {[
          { label: "Services", href: "/services" },
          { label: "About", href: "/about" },
          { label: "Website Review", href: "/website-review" },
          { label: "Contact", href: "/contact" },
        ].map((link) => (
          <Link
            key={link.href}
            href={link.href}
            style={{
              fontFamily: "'DM Sans', sans-serif",
              fontSize: "0.85rem",
              color: "#64748b",
              textDecoration: "none",
            }}
          >
            {link.label}
          </Link>
        ))}
      </div>
    </section>
  );
}
