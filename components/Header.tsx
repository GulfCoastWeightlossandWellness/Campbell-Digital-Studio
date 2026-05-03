"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import StudioMark from "@/components/marks/StudioMark";

const navLinks: { label: string; href: string }[] = [
  { label: "Work", href: "/work" },
  { label: "Method", href: "/method" },
  { label: "Studio", href: "/studio" },
  { label: "Practice", href: "/practice" },
  { label: "Notes", href: "/notes" },
  { label: "Inquire", href: "/inquire" },
];

export default function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Lock body scroll when mobile menu open
  useEffect(() => {
    if (mobileOpen) {
      const prev = document.body.style.overflow;
      document.body.style.overflow = "hidden";
      return () => {
        document.body.style.overflow = prev;
      };
    }
  }, [mobileOpen]);

  return (
    <header
      style={{
        position: "sticky",
        top: 0,
        left: 0,
        right: 0,
        zIndex: 100,
        background: scrolled ? "rgba(250, 246, 236, 0.92)" : "transparent",
        backdropFilter: scrolled ? "saturate(150%) blur(10px)" : "none",
        WebkitBackdropFilter: scrolled ? "saturate(150%) blur(10px)" : "none",
        borderBottom: scrolled ? "1px solid var(--paper-rule)" : "1px solid transparent",
        transition: "background 0.25s ease, border-color 0.25s ease",
      }}
    >
      <div
        className="section-wrap"
        style={{
          height: scrolled ? "64px" : "76px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          transition: "height 0.25s ease",
        }}
      >
        <StudioMark size={scrolled ? "sm" : "md"} />

        {/* Desktop nav */}
        <nav
          aria-label="Main navigation"
          className="desktop-nav"
          style={{ display: "flex", alignItems: "center", gap: "2.25rem" }}
        >
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="editorial-link mono"
              style={{ paddingBottom: "4px" }}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Mobile hamburger */}
        <button
          type="button"
          aria-label={mobileOpen ? "Close menu" : "Open menu"}
          aria-expanded={mobileOpen}
          onClick={() => setMobileOpen((v) => !v)}
          className="mobile-menu-btn"
          style={{
            display: "none",
            background: "none",
            border: "none",
            cursor: "pointer",
            padding: "0.5rem",
            color: "var(--navy-900)",
            margin: "-0.5rem",
          }}
        >
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden>
            {mobileOpen ? (
              <>
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </>
            ) : (
              <>
                <line x1="3" y1="8" x2="21" y2="8" />
                <line x1="3" y1="16" x2="21" y2="16" />
              </>
            )}
          </svg>
        </button>
      </div>

      {/* Mobile overlay */}
      {mobileOpen && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Mobile navigation"
          style={{
            position: "fixed",
            inset: 0,
            background: "var(--paper-cream)",
            zIndex: 90,
            paddingTop: "76px",
            display: "flex",
            flexDirection: "column",
          }}
        >
          <nav
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "0",
              padding: "clamp(20px, 5vw, 40px)",
            }}
          >
            {navLinks.map((link, i) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMobileOpen(false)}
                style={{
                  display: "block",
                  fontFamily: "var(--font-fraunces), Georgia, serif",
                  fontSize: "clamp(28px, 6vw, 40px)",
                  fontWeight: 400,
                  letterSpacing: "-0.02em",
                  fontVariationSettings: '"opsz" 144',
                  color: "var(--navy-900)",
                  textDecoration: "none",
                  padding: "18px 0",
                  borderTop: i === 0 ? "1px solid var(--paper-rule)" : "none",
                  borderBottom: "1px solid var(--paper-rule)",
                }}
              >
                <span style={{ fontStyle: "italic", fontWeight: 300, marginRight: "0.6em", color: "var(--gold-600)", fontSize: "0.5em", verticalAlign: "middle", letterSpacing: "0.18em", fontFamily: "var(--font-jetbrains), monospace", textTransform: "uppercase" }}>
                  0{i + 1}
                </span>
                {link.label}
              </Link>
            ))}
            <Link
              href="/review"
              onClick={() => setMobileOpen(false)}
              className="editorial-link"
              style={{
                marginTop: "32px",
                fontFamily: "var(--font-jetbrains), monospace",
                fontSize: "11px",
                letterSpacing: "0.18em",
                textTransform: "uppercase",
                color: "var(--gold-700)",
              }}
            >
              Request a Website Review →
            </Link>
          </nav>
        </div>
      )}

      <style>{`
        @media (max-width: 860px) {
          .desktop-nav { display: none !important; }
          .mobile-menu-btn { display: inline-flex !important; }
        }
      `}</style>
    </header>
  );
}
