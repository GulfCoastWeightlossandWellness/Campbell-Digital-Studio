"use client";

import Link from "next/link";
import Image from "next/image";
import { useState, useRef, useEffect } from "react";

const caseStudies = [
  { label: "ACExperts251", slug: "acexperts", category: "HVAC · Full-Stack" },
  { label: "Revitalize Aesthetics & Wellness", slug: "revitalize", category: "Medspa · Clinical" },
  { label: "Interactive Health Education", slug: "interactive-health-education", category: "SaaS Platform · Digital Health" },
  { label: "Collective Counseling", slug: "collective-counseling", category: "Therapy Practice" },
  { label: "Blessed Barbershop", slug: "blessed-barbershop", category: "Local Business" },
  { label: "Gulf Coast Weight & Wellness", slug: "gulf-coast-weight-wellness", category: "Medical Wellness" },
];

export default function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [workOpen, setWorkOpen] = useState(false);
  const workRef = useRef<HTMLDivElement>(null);

  /* Close work dropdown on outside click */
  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (workRef.current && !workRef.current.contains(e.target as Node)) {
        setWorkOpen(false);
      }
    }
    if (workOpen) document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, [workOpen]);

  return (
    <header
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        zIndex: 100,
        background: "rgba(5,12,26,0.96)",
        backdropFilter: "blur(20px)",
        borderBottom: "1px solid rgba(255,255,255,0.06)",
      }}
    >
      <div
        style={{
          maxWidth: "1200px",
          margin: "0 auto",
          padding: "0 1.5rem",
          height: "64px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        {/* Logo */}
        <Link
          href="/"
          style={{ textDecoration: "none", display: "inline-flex", alignItems: "center", gap: "0.65rem" }}
        >
          <Image
            src="/images/brand/campbell-digital-studio-icon-transparent.png"
            alt=""
            aria-hidden="true"
            width={40}
            height={40}
            sizes="(max-width: 768px) 34px, 40px"
            style={{
              width: "clamp(34px, 4.5vw, 40px)",
              height: "clamp(34px, 4.5vw, 40px)",
              objectFit: "contain",
              borderRadius: "10px",
              background: "rgba(79,142,247,0.06)",
              border: "1px solid rgba(79,142,247,0.15)",
              padding: "2px",
              flexShrink: 0,
            }}
          />
          <span
            className="brand-wordmark"
            style={{
              fontFamily: "'Plus Jakarta Sans', system-ui, sans-serif",
              fontSize: "1.1rem",
              fontWeight: 700,
              color: "#f0f4fc",
              letterSpacing: "-0.01em",
              lineHeight: 1,
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
          </span>
        </Link>

        {/* Desktop nav */}
        <nav
          aria-label="Main navigation"
          style={{ display: "flex", alignItems: "center", gap: "1.75rem" }}
          className="desktop-nav"
        >
          {/* Work + Case Studies dropdown */}
          <div ref={workRef} style={{ position: "relative" }}>
            <button
              onClick={() => setWorkOpen(!workOpen)}
              style={{
                fontFamily: "'DM Sans', system-ui, sans-serif",
                fontSize: "0.875rem",
                fontWeight: 400,
                color: workOpen ? "#f0f4fc" : "#94a3b8",
                background: "none",
                border: "none",
                cursor: "pointer",
                padding: 0,
                display: "flex",
                alignItems: "center",
                gap: "0.3rem",
                transition: "color 0.2s",
              }}
              onMouseEnter={(e) => (e.currentTarget.style.color = "#f0f4fc")}
              onMouseLeave={(e) => { if (!workOpen) e.currentTarget.style.color = "#94a3b8"; }}
              aria-expanded={workOpen}
              aria-haspopup="true"
            >
              Case Studies
              <span
                style={{
                  display: "inline-block",
                  transition: "transform 0.2s",
                  transform: workOpen ? "rotate(180deg)" : "rotate(0)",
                  fontSize: "0.65rem",
                  opacity: 0.7,
                  marginTop: "1px",
                }}
              >
                ▾
              </span>
            </button>

            {/* Dropdown panel */}
            {workOpen && (
              <div
                style={{
                  position: "absolute",
                  top: "calc(100% + 12px)",
                  left: "50%",
                  transform: "translateX(-50%)",
                  width: "320px",
                  background: "#0d1728",
                  border: "1px solid rgba(79,142,247,0.15)",
                  borderRadius: "12px",
                  boxShadow: "0 20px 60px rgba(0,0,0,0.6), 0 0 0 1px rgba(79,142,247,0.08)",
                  overflow: "hidden",
                  zIndex: 200,
                  animation: "fadeDropdown 0.15s ease",
                }}
              >
                {/* View all row */}
                <Link
                  href="/work"
                  onClick={() => setWorkOpen(false)}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    padding: "0.85rem 1.1rem",
                    background: "rgba(79,142,247,0.06)",
                    borderBottom: "1px solid rgba(79,142,247,0.1)",
                    textDecoration: "none",
                  }}
                >
                  <span style={{ fontFamily: "'DM Mono', monospace", fontSize: "0.63rem", letterSpacing: "0.1em", textTransform: "uppercase", color: "#7db0ff" }}>
                    All Case Studies
                  </span>
                  <span style={{ color: "#4f8ef7", fontSize: "0.75rem" }}>→</span>
                </Link>

                {/* Individual case study links */}
                {caseStudies.map((cs) => (
                  <Link
                    key={cs.slug}
                    href={`/work/${cs.slug}`}
                    onClick={() => setWorkOpen(false)}
                    style={{
                      display: "block",
                      padding: "0.75rem 1.1rem",
                      borderBottom: "1px solid rgba(255,255,255,0.04)",
                      textDecoration: "none",
                      transition: "background 0.15s",
                    }}
                    onMouseEnter={(e) => { e.currentTarget.style.background = "rgba(79,142,247,0.04)"; }}
                    onMouseLeave={(e) => { e.currentTarget.style.background = "transparent"; }}
                  >
                    <p style={{ fontFamily: "'DM Sans', system-ui, sans-serif", fontSize: "0.825rem", fontWeight: 500, color: "#f0f4fc", margin: "0 0 0.1rem" }}>
                      {cs.label}
                    </p>
                    <p style={{ fontFamily: "'DM Mono', monospace", fontSize: "0.6rem", letterSpacing: "0.06em", color: "#334155", margin: 0 }}>
                      {cs.category}
                    </p>
                  </Link>
                ))}
              </div>
            )}
          </div>

          <Link
            href="/services"
            style={{ fontFamily: "'DM Sans', system-ui, sans-serif", fontSize: "0.875rem", fontWeight: 400, color: "#94a3b8", textDecoration: "none", transition: "color 0.2s" }}
            onMouseEnter={(e) => (e.currentTarget.style.color = "#f0f4fc")}
            onMouseLeave={(e) => (e.currentTarget.style.color = "#94a3b8")}
          >
            Services
          </Link>

          <Link
            href="/about"
            style={{ fontFamily: "'DM Sans', system-ui, sans-serif", fontSize: "0.875rem", fontWeight: 400, color: "#94a3b8", textDecoration: "none", transition: "color 0.2s" }}
            onMouseEnter={(e) => (e.currentTarget.style.color = "#f0f4fc")}
            onMouseLeave={(e) => (e.currentTarget.style.color = "#94a3b8")}
          >
            About
          </Link>

          <Link
            href="/website-review"
            style={{ fontFamily: "'DM Sans', system-ui, sans-serif", fontSize: "0.875rem", fontWeight: 400, color: "#7db0ff", textDecoration: "none", transition: "color 0.2s" }}
            onMouseEnter={(e) => (e.currentTarget.style.color = "#a8c8ff")}
            onMouseLeave={(e) => (e.currentTarget.style.color = "#7db0ff")}
          >
            Website Review
          </Link>

          <Link
            href="/contact"
            style={{
              fontFamily: "'DM Sans', system-ui, sans-serif",
              fontSize: "0.82rem",
              fontWeight: 600,
              color: "#ffffff",
              background: "linear-gradient(135deg, #4f8ef7 0%, #3b7de8 100%)",
              padding: "0.45rem 1.15rem",
              borderRadius: "7px",
              textDecoration: "none",
              boxShadow: "0 2px 10px rgba(79,142,247,0.25)",
              transition: "opacity 0.2s, box-shadow 0.2s",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.opacity = "0.88";
              e.currentTarget.style.boxShadow = "0 4px 18px rgba(79,142,247,0.4)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.opacity = "1";
              e.currentTarget.style.boxShadow = "0 2px 10px rgba(79,142,247,0.25)";
            }}
          >
            Contact
          </Link>
        </nav>

        {/* Mobile hamburger */}
        <button
          aria-label={mobileOpen ? "Close menu" : "Open menu"}
          onClick={() => setMobileOpen(!mobileOpen)}
          style={{ display: "none", background: "none", border: "none", cursor: "pointer", padding: "0.25rem", color: "#f0f4fc" }}
          className="mobile-menu-btn"
        >
          {mobileOpen ? (
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          ) : (
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <line x1="3" y1="8" x2="21" y2="8" /><line x1="3" y1="16" x2="21" y2="16" />
            </svg>
          )}
        </button>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <nav
          aria-label="Mobile navigation"
          style={{ background: "#0d1728", borderTop: "1px solid rgba(255,255,255,0.06)", padding: "1.25rem 1.5rem", display: "flex", flexDirection: "column", gap: "0" }}
        >
          {/* Case Studies section */}
          <div style={{ marginBottom: "0.75rem" }}>
            <p style={{ fontFamily: "'DM Mono', monospace", fontSize: "0.6rem", letterSpacing: "0.12em", textTransform: "uppercase", color: "#4f8ef7", padding: "0.5rem 0 0.6rem" }}>
              Case Studies
            </p>
            {caseStudies.map((cs) => (
              <Link
                key={cs.slug}
                href={`/work/${cs.slug}`}
                onClick={() => setMobileOpen(false)}
                style={{ display: "block", fontFamily: "'DM Sans', system-ui, sans-serif", fontSize: "0.9rem", color: "#94a3b8", textDecoration: "none", padding: "0.5rem 0" }}
              >
                {cs.label}
              </Link>
            ))}
            <Link
              href="/work"
              onClick={() => setMobileOpen(false)}
              style={{ display: "block", fontFamily: "'DM Mono', monospace", fontSize: "0.65rem", letterSpacing: "0.08em", color: "#7db0ff", textDecoration: "none", padding: "0.5rem 0", textTransform: "uppercase" }}
            >
              View All →
            </Link>
          </div>

          <div style={{ borderTop: "1px solid rgba(255,255,255,0.05)", paddingTop: "0.75rem", display: "flex", flexDirection: "column", gap: "0.85rem" }}>
            {[
              { label: "Services", href: "/services" },
              { label: "About", href: "/about" },
              { label: "Website Review", href: "/website-review", highlight: true },
              { label: "Contact", href: "/contact" },
            ].map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMobileOpen(false)}
                style={{ fontFamily: "'DM Sans', system-ui, sans-serif", fontSize: "1rem", color: link.highlight ? "#7db0ff" : "#f0f4fc", textDecoration: "none" }}
              >
                {link.label}
              </Link>
            ))}
          </div>
        </nav>
      )}

      <style>{`
        @keyframes fadeDropdown {
          from { opacity: 0; transform: translateX(-50%) translateY(-4px); }
          to   { opacity: 1; transform: translateX(-50%) translateY(0); }
        }
      `}</style>
    </header>
  );
}
