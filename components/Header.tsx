"use client";

import Link from "next/link";
import { useState, useEffect, useSyncExternalStore } from "react";
import { usePathname } from "next/navigation";
import StudioMark from "@/components/marks/StudioMark";

const navLinks: { label: string; href: string }[] = [
  { label: "Work", href: "/work" },
  { label: "Capabilities", href: "/#capabilities" },
  { label: "Process", href: "/#process" },
  { label: "About", href: "/#about" },
  { label: "Inquire", href: "/inquire" },
];

// Subscribe to scrollY via useSyncExternalStore so we don't have to setState-in-effect.
function subscribeScroll(cb: () => void) {
  window.addEventListener("scroll", cb, { passive: true });
  return () => window.removeEventListener("scroll", cb);
}
function getScrollY() {
  return window.scrollY > 8;
}

export default function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = usePathname();
  const scrolled = useSyncExternalStore(subscribeScroll, getScrollY, () => false);

  /**
   * `overDark` is true when the header is sitting on top of a dark surface
   * and would otherwise render dark icons on a dark background (invisible).
   * The home hero is the only dark surface at the top of any route. While the
   * user is at the top of `/`, the header is transparent; once they scroll
   * any meaningful amount, the header gets its own light backdrop and the
   * dark icons become readable again.
   */
  const overDark = pathname === "/" && !scrolled;

  // Adjust state when pathname changes — close the menu mid-navigation.
  // Using the "store previous prop" pattern (https://react.dev/learn/you-might-not-need-an-effect#adjusting-some-state-when-a-prop-changes)
  // rather than setMobileOpen-in-effect.
  const [previousPathname, setPreviousPathname] = useState(pathname);
  if (previousPathname !== pathname) {
    setPreviousPathname(pathname);
    if (mobileOpen) setMobileOpen(false);
  }

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

  // Close on Escape
  useEffect(() => {
    if (!mobileOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setMobileOpen(false);
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [mobileOpen]);

  // Color tokens that flip with overDark — keeps the JSX readable.
  const iconColor = overDark ? "white" : "var(--navy-900)";
  const navLinkClass = `editorial-link mono${overDark ? " on-dark" : ""}`;

  return (
    <header
      style={{
        position: "sticky",
        top: 0,
        left: 0,
        right: 0,
        zIndex: 100,
        // Background:
        //  - scrolled (anywhere): translucent paper-cream + blur — works on any surface
        //  - over the dark home hero: transparent so the navy reads through
        //  - over a normal cream page at scroll-top: faint cream tint so the bar is still
        //    legible without committing to the full backdrop until the user starts scrolling
        background: scrolled
          ? "rgba(250, 246, 236, 0.92)"
          : overDark
            ? "transparent"
            : "rgba(250, 246, 236, 0.55)",
        backdropFilter: scrolled ? "saturate(150%) blur(10px)" : "none",
        WebkitBackdropFilter: scrolled ? "saturate(150%) blur(10px)" : "none",
        borderBottom: scrolled
          ? "1px solid var(--paper-rule)"
          : "1px solid transparent",
        transition: "background 0.25s ease, border-color 0.25s ease",
      }}
    >
      {/* Skip to main content — visible on focus only. WCAG 2.4.1. */}
      <a href="#main-content" className="skip-link">
        Skip to content
      </a>

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
        <StudioMark size={scrolled ? "sm" : "md"} onDark={overDark} />

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
              className={navLinkClass}
              style={{ paddingBottom: "4px" }}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Mobile hamburger — 44×44 minimum tap target.
            Color flips with `overDark` so the icon is always visible
            against the surface behind it. */}
        <button
          type="button"
          aria-label={mobileOpen ? "Close menu" : "Open menu"}
          aria-expanded={mobileOpen}
          aria-controls="mobile-nav-overlay"
          onClick={() => setMobileOpen((v) => !v)}
          className="mobile-menu-btn"
          style={{
            display: "none",
            background: "none",
            border: "none",
            cursor: "pointer",
            padding: "12px",
            color: iconColor,
            margin: "-12px",
            minWidth: "44px",
            minHeight: "44px",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" aria-hidden>
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

      {/* Mobile overlay — z-index above the header so it covers the bar fully */}
      {mobileOpen && (
        <div
          id="mobile-nav-overlay"
          role="dialog"
          aria-modal="true"
          aria-label="Mobile navigation"
          style={{
            position: "fixed",
            inset: 0,
            background: "var(--paper-cream)",
            zIndex: 110,
            paddingTop: "76px",
            display: "flex",
            flexDirection: "column",
            overflowY: "auto",
          }}
        >
          {/* Close button positioned over the overlay so the X is always reachable */}
          <button
            type="button"
            aria-label="Close menu"
            onClick={() => setMobileOpen(false)}
            style={{
              position: "absolute",
              top: "20px",
              right: "clamp(12px, 4vw, 32px)",
              background: "none",
              border: "none",
              cursor: "pointer",
              padding: "12px",
              color: "var(--navy-900)",
              minWidth: "44px",
              minHeight: "44px",
              display: "inline-flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" aria-hidden>
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
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
              href="/inquire"
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
              Start a conversation →
            </Link>
          </nav>
        </div>
      )}

      <style>{`
        @media (max-width: 860px) {
          .desktop-nav { display: none !important; }
          .mobile-menu-btn { display: inline-flex !important; }
        }
        /* Skip-to-main: hidden by default, becomes a visible pill on focus */
        .skip-link {
          position: absolute;
          top: -100px;
          left: 50%;
          transform: translateX(-50%);
          padding: 10px 18px;
          background: var(--navy-900);
          color: white;
          font-family: var(--font-jetbrains), monospace;
          font-size: 12px;
          letter-spacing: 0.16em;
          text-transform: uppercase;
          text-decoration: none;
          border: 1px solid var(--gold-600);
          border-radius: 3px;
          z-index: 200;
          transition: top 0.2s ease;
        }
        .skip-link:focus {
          top: 12px;
          outline: 2px solid var(--gold-400);
          outline-offset: 2px;
        }
      `}</style>
    </header>
  );
}
