import Link from "next/link";
import Image from "next/image";

export default function Footer() {
  const year = new Date().getUTCFullYear();
  return (
    <footer style={{ background: "#080e1a", borderTop: "1px solid rgba(255,255,255,0.06)", padding: "3rem 1.5rem 2rem" }}>
      <div style={{ maxWidth: "1200px", margin: "0 auto", display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(200px,1fr))", gap: "2.5rem", marginBottom: "2.5rem" }}>
        <div>
          <div style={{ display: "inline-flex", alignItems: "center", gap: "0.65rem", marginBottom: "0.65rem" }}>
            <Image
              src="/images/brand/campbell-digital-studio-icon.png"
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
                flexShrink: 0,
              }}
            />
            <p style={{ fontFamily: "'Cormorant Garamond',Georgia,serif", fontSize: "1.15rem", fontWeight: 500, color: "#f8f5f0", margin: 0 }}>
              Campbell Digital <span style={{ color: "#d4a853" }}>Studio</span>
            </p>
          </div>
          <p style={{ fontFamily: "'DM Sans',sans-serif", fontSize: "0.825rem", color: "#64748b", lineHeight: 1.6, maxWidth: "240px" }}>
            Custom medical and local-business websites built by a physician in training.
          </p>
        </div>
        <div>
          <p style={{ fontFamily: "'DM Mono',monospace", fontSize: "0.65rem", letterSpacing: "0.1em", textTransform: "uppercase", color: "#d4a853", marginBottom: "1rem" }}>Navigation</p>
          <div style={{ display: "flex", flexDirection: "column", gap: "0.6rem" }}>
            {[{ label: "Work", href: "/work" }, { label: "Services", href: "/services" }, { label: "About", href: "/about" }, { label: "Website Review", href: "/website-review" }, { label: "Contact", href: "/contact" }].map(link => (
              <Link key={link.href} href={link.href} style={{ fontFamily: "'DM Sans',sans-serif", fontSize: "0.875rem", color: "#64748b", textDecoration: "none" }} className="nav-link-hover">{link.label}</Link>
            ))}
          </div>
        </div>
        <div>
          <p style={{ fontFamily: "'DM Mono',monospace", fontSize: "0.65rem", letterSpacing: "0.1em", textTransform: "uppercase", color: "#d4a853", marginBottom: "1rem" }}>Featured Work</p>
          <div style={{ display: "flex", flexDirection: "column", gap: "0.6rem" }}>
            {[{ label: "Revitalize Aesthetics", href: "/work/revitalize" }, { label: "ACExperts251", href: "/work/acexperts" }, { label: "Collective Counseling", href: "/work/collective-counseling" }, { label: "Gulf Coast W&W", href: "/work/gulf-coast-weight-wellness" }, { label: "Interactive Health Ed.", href: "/work/interactive-health-education" }].map(link => (
              <Link key={link.href} href={link.href} style={{ fontFamily: "'DM Sans',sans-serif", fontSize: "0.875rem", color: "#64748b", textDecoration: "none" }} className="nav-link-hover">{link.label}</Link>
            ))}
          </div>
        </div>
        <div>
          <p style={{ fontFamily: "'DM Mono',monospace", fontSize: "0.65rem", letterSpacing: "0.1em", textTransform: "uppercase", color: "#d4a853", marginBottom: "1rem" }}>Get Started</p>
          <p style={{ fontFamily: "'DM Sans',sans-serif", fontSize: "0.825rem", color: "#64748b", marginBottom: "1rem", lineHeight: 1.6 }}>
            Have a website that feels outdated or underbuilt? Send me the link.
          </p>
          <Link href="/website-review" style={{ display: "inline-block", fontFamily: "'DM Sans',sans-serif", fontSize: "0.8rem", fontWeight: 500, color: "#0b1120", background: "#d4a853", padding: "0.5rem 1.1rem", borderRadius: "6px", textDecoration: "none" }}>
            Request Website Review
          </Link>
        </div>
      </div>
      <div style={{ maxWidth: "1200px", margin: "0 auto", paddingTop: "2rem", borderTop: "1px solid rgba(255,255,255,0.05)", display: "flex", flexWrap: "wrap", justifyContent: "space-between", gap: "0.75rem" }}>
        <p style={{ fontFamily: "'DM Sans',sans-serif", fontSize: "0.75rem", color: "#374151" }}>&copy; {year} Campbell Digital Studio. All rights reserved.</p>
        <p style={{ fontFamily: "'DM Sans',sans-serif", fontSize: "0.75rem", color: "#374151" }}>Baldwin County, Alabama</p>
      </div>
    </footer>
  );
}
