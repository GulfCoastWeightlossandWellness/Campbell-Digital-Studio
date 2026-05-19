"use client";

import Link from "next/link";
import { useState, useEffect, useSyncExternalStore } from "react";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import StudioMark from "@/components/marks/StudioMark";
import { primaryNavLinks } from "@/lib/nav";

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
  const reduceMotion = useReducedMotion();

  const [previousPathname, setPreviousPathname] = useState(pathname);
  if (previousPathname !== pathname) {
    setPreviousPathname(pathname);
    if (mobileOpen) setMobileOpen(false);
  }

  useEffect(() => {
    if (mobileOpen) {
      const prev = document.body.style.overflow;
      document.body.style.overflow = "hidden";
      return () => {
        document.body.style.overflow = prev;
      };
    }
  }, [mobileOpen]);

  useEffect(() => {
    if (!mobileOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setMobileOpen(false);
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [mobileOpen]);

  return (
    <header
      style={{
        position: "sticky",
        top: 0,
        left: 0,
        right: 0,
        zIndex: 100,
        background: scrolled ? "rgba(22, 20, 18, 0.78)" : "transparent",
        backdropFilter: scrolled ? "saturate(140%) blur(12px)" : "none",
        WebkitBackdropFilter: scrolled ? "saturate(140%) blur(12px)" : "none",
        borderBottom: scrolled ? "1px solid var(--border-subtle)" : "1px solid transparent",
        transition:
          "background 0.25s var(--ease-snappy), border-color 0.25s var(--ease-snappy), backdrop-filter 0.25s var(--ease-snappy), -webkit-backdrop-filter 0.25s var(--ease-snappy)",
      }}
    >
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
          transition: "height 0.25s var(--ease-snappy)",
        }}
      >
        <StudioMark size={scrolled ? "sm" : "md"} onDark />

        <nav aria-label="Main navigation" className="desktop-nav header-nav">
          {primaryNavLinks
            .filter((link) => link.href !== "/inquire")
            .map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="editorial-link mono on-dark header-nav-link"
                aria-current={
                  link.href === "/work" && pathname === "/work" ? "page" : undefined
                }
              >
                {link.label}
              </Link>
            ))}
          <Link
            href="/inquire"
            className="btn-fill btn-nav"
            aria-current={pathname === "/inquire" ? "page" : undefined}
          >
            Inquire
          </Link>
        </nav>

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
            color: "var(--ink-1)",
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

      <AnimatePresence>
        {mobileOpen ? (
          <motion.div
            key="mobile-nav-overlay"
            id="mobile-nav-overlay"
            role="dialog"
            aria-modal="true"
            aria-label="Mobile navigation"
            initial={reduceMotion ? { opacity: 0 } : { opacity: 0, x: "100%" }}
            animate={reduceMotion ? { opacity: 1 } : { opacity: 1, x: 0 }}
            exit={reduceMotion ? { opacity: 0 } : { opacity: 0, x: "100%" }}
            transition={{ duration: reduceMotion ? 0.18 : 0.32, ease: [0.2, 0, 0, 1] }}
            style={{
              position: "fixed",
              inset: 0,
              background: "var(--canvas)",
              zIndex: 110,
              paddingTop: "76px",
              display: "flex",
              flexDirection: "column",
              overflowY: "auto",
            }}
          >
          <button
            type="button"
            aria-label="Close menu"
            className="mobile-menu-close"
            onClick={() => setMobileOpen(false)}
            style={{
              position: "absolute",
              top: "20px",
              right: "clamp(12px, 4vw, 32px)",
              background: "none",
              border: "none",
              cursor: "pointer",
              padding: "12px",
              color: "var(--ink-1)",
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
            {primaryNavLinks.map((link, i) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMobileOpen(false)}
                style={{
                  display: "block",
                  fontFamily: "var(--font-geist-sans), system-ui, sans-serif",
                  fontSize: "clamp(28px, 6vw, 40px)",
                  fontWeight: 500,
                  letterSpacing: "-0.025em",
                  color: "var(--ink-1)",
                  textDecoration: "none",
                  padding: "18px 0",
                  borderTop: i === 0 ? "1px solid var(--border-subtle)" : "none",
                  borderBottom: "1px solid var(--border-subtle)",
                }}
              >
                <span
                  style={{
                    fontFamily: "var(--font-geist-mono), ui-monospace, monospace",
                    fontSize: "0.32em",
                    fontWeight: 600,
                    marginRight: "0.6em",
                    color: "var(--copper)",
                    verticalAlign: "middle",
                    letterSpacing: "0.18em",
                    textTransform: "uppercase",
                  }}
                >
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
                fontFamily: "var(--font-geist-mono), ui-monospace, monospace",
                fontSize: "11px",
                letterSpacing: "0.18em",
                textTransform: "uppercase",
                color: "var(--copper)",
              }}
            >
              Start a conversation →
            </Link>
          </nav>
        </motion.div>
        ) : null}
      </AnimatePresence>

      <style>{`
        @media (max-width: 860px) {
          .mobile-menu-btn { display: inline-flex !important; }
        }
        .skip-link {
          position: absolute;
          top: -100px;
          left: 50%;
          transform: translateX(-50%);
          padding: 10px 18px;
          background: var(--panel);
          color: var(--ink-1);
          font-family: var(--font-geist-mono), ui-monospace, monospace;
          font-size: 12px;
          letter-spacing: 0.16em;
          text-transform: uppercase;
          text-decoration: none;
          border: 1px solid var(--copper);
          border-radius: 6px;
          z-index: 200;
          transition: top 0.2s ease;
        }
        .skip-link:focus {
          top: 12px;
          outline: 2px solid var(--copper);
          outline-offset: 2px;
        }
      `}</style>
    </header>
  );
}
