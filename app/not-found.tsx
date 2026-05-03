import Link from "next/link";
import Eyebrow from "@/components/editorial/Eyebrow";

export default function NotFound() {
  return (
    <section
      className="section-wrap"
      style={{
        paddingTop: "clamp(120px, 18vw, 200px)",
        paddingBottom: "clamp(64px, 10vw, 128px)",
        minHeight: "70vh",
      }}
    >
      <Eyebrow>§ 404 / Page Not Found</Eyebrow>

      <h1
        className="display-serif"
        style={{
          fontSize: "clamp(48px, 8vw, 96px)",
          color: "var(--navy-900)",
          marginBottom: "32px",
          maxWidth: "16ch",
        }}
      >
        That page has<br />
        <em style={{ color: "var(--navy-700)" }}>moved or never existed.</em>
      </h1>

      <p
        className="reading-col"
        style={{
          fontFamily: "var(--font-manrope), sans-serif",
          fontSize: "17px",
          lineHeight: 1.65,
          color: "var(--ink-soft)",
          marginBottom: "48px",
        }}
      >
        The site was recently rebuilt and a few pages were renamed. Most of the old links should
        forward; the rest are below.
      </p>

      <div
        style={{
          display: "flex",
          gap: "32px",
          flexWrap: "wrap",
          alignItems: "baseline",
          paddingTop: "24px",
          borderTop: "1px solid var(--paper-rule)",
        }}
      >
        {[
          { label: "Home", href: "/" },
          { label: "Work", href: "/work" },
          { label: "Studio", href: "/studio" },
          { label: "Practice", href: "/practice" },
          { label: "Review", href: "/review" },
          { label: "Inquire", href: "/inquire" },
        ].map((link) => (
          <Link key={link.href} href={link.href} className="editorial-link mono">
            {link.label}
          </Link>
        ))}
      </div>
    </section>
  );
}
