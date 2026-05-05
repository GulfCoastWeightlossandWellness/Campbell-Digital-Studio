"use client";

import Link from "next/link";
import { useEffect, useState, useSyncExternalStore } from "react";
import { usePathname } from "next/navigation";
import { siteConfig } from "@/lib/site-config";

/**
 * Slim sticky bar shown only on mobile (≤768px).
 * - Hidden on /inquire and /call (the destination pages of the bar)
 * - Reveals when scrolling up, hides when scrolling down (≥6px delta)
 * - Always shown when within the first 200px of the page
 * - Honors prefers-reduced-motion (no hide/show, just always visible)
 */

const REDUCED_MOTION_QUERY = "(prefers-reduced-motion: reduce)";

function subscribeReducedMotion(cb: () => void) {
  const mq = window.matchMedia(REDUCED_MOTION_QUERY);
  mq.addEventListener("change", cb);
  return () => mq.removeEventListener("change", cb);
}
function getReducedMotion() {
  return window.matchMedia(REDUCED_MOTION_QUERY).matches;
}

export default function StickyMobileCTA() {
  const pathname = usePathname();
  const reducedMotion = useSyncExternalStore(
    subscribeReducedMotion,
    getReducedMotion,
    () => false,
  );
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    // When reduced motion is on, the bar stays visible (initial state) and
    // we don't attach a scroll listener at all.
    if (reducedMotion) return;

    let lastY = window.scrollY;
    let ticking = false;
    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        const y = window.scrollY;
        const dy = y - lastY;
        if (y < 200) {
          setVisible(true);
        } else if (dy > 6) {
          setVisible(false);
        } else if (dy < -6) {
          setVisible(true);
        }
        lastY = y;
        ticking = false;
      });
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [reducedMotion]);

  // Hide on the inquire / booking pages themselves
  if (pathname === "/inquire" || pathname === "/call") return null;

  const showBooking = !!siteConfig.calUsername;
  const primaryHref = showBooking ? "/call" : "/inquire";
  const primaryLabel = showBooking ? "Book a Call" : "Inquire";

  return (
    <>
      <div
        className="sticky-mobile-cta"
        style={{
          position: "fixed",
          left: 0,
          right: 0,
          bottom: 0,
          zIndex: 95,
          background: "var(--navy-900)",
          borderTop: "1px solid var(--gold-600)",
          padding: "10px 16px env(safe-area-inset-bottom, 12px) 16px",
          display: "none",
          gridTemplateColumns: showBooking ? "1fr 1fr" : "1fr",
          gap: "10px",
          transform: visible ? "translateY(0)" : "translateY(110%)",
          transition: reducedMotion ? "none" : "transform 0.25s ease",
        }}
      >
        <Link
          href={primaryHref}
          className="sticky-mobile-cta-primary"
          style={{
            display: "inline-flex",
            alignItems: "center",
            justifyContent: "center",
            minHeight: "44px",
            padding: "10px 16px",
            background: "var(--gold-500)",
            color: "var(--navy-900)",
            fontFamily: "var(--font-jetbrains), monospace",
            fontSize: "12px",
            letterSpacing: "0.18em",
            textTransform: "uppercase",
            fontWeight: 600,
            textDecoration: "none",
            borderRadius: "3px",
          }}
        >
          {primaryLabel}
        </Link>
        {showBooking ? (
          <Link
            href="/inquire"
            style={{
              display: "inline-flex",
              alignItems: "center",
              justifyContent: "center",
              minHeight: "44px",
              padding: "10px 16px",
              background: "transparent",
              color: "rgba(255,255,255,0.92)",
              fontFamily: "var(--font-jetbrains), monospace",
              fontSize: "12px",
              letterSpacing: "0.18em",
              textTransform: "uppercase",
              fontWeight: 600,
              textDecoration: "none",
              borderRadius: "3px",
              border: "1px solid rgba(232,196,107,0.4)",
            }}
          >
            Inquire
          </Link>
        ) : null}
      </div>
      <style>{`
        @media (max-width: 768px) {
          .sticky-mobile-cta { display: grid !important; }
          /* Reserve space at the bottom of <main> so the bar never covers footer content */
          main { padding-bottom: 80px; }
        }
      `}</style>
    </>
  );
}
