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
        className="display-sans display-96"
        style={{
          marginBottom: "32px",
          maxWidth: "16ch",
        }}
      >
        That page has<br />
        <em>moved or never existed.</em>
      </h1>

      <p
        className="reading-col"
        style={{
          fontFamily: "var(--font-geist-sans), system-ui, sans-serif",
          fontSize: "17px",
          lineHeight: 1.65,
          color: "var(--ink-2)",
          marginBottom: "48px",
          letterSpacing: "-0.01em",
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
          borderTop: "1px solid var(--border-subtle)",
        }}
      >
        {[
          { label: "Home", href: "/" },
          { label: "Work", href: "/work" },
          { label: "About", href: "/#about" },
          { label: "Capabilities", href: "/#capabilities" },
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
