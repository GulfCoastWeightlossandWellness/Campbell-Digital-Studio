"use client";

import Link from "next/link";
import { useEffect, useState, useSyncExternalStore } from "react";
import { usePathname } from "next/navigation";
import { siteConfig } from "@/lib/site-config";

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
          background: "rgba(22, 20, 18, 0.92)",
          backdropFilter: "saturate(140%) blur(12px)",
          WebkitBackdropFilter: "saturate(140%) blur(12px)",
          borderTop: "1px solid var(--border-default)",
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
          style={{
            display: "inline-flex",
            alignItems: "center",
            justifyContent: "center",
            minHeight: "44px",
            padding: "10px 16px",
            background: "var(--violet-base)",
            color: "#FFFFFF",
            fontFamily: "var(--font-geist-sans), system-ui, sans-serif",
            fontSize: "13px",
            fontWeight: 500,
            letterSpacing: "-0.01em",
            textDecoration: "none",
            borderRadius: "6px",
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
              background: "rgba(255,255,255,0.03)",
              color: "var(--ink-1)",
              fontFamily: "var(--font-geist-sans), system-ui, sans-serif",
              fontSize: "13px",
              fontWeight: 500,
              letterSpacing: "-0.01em",
              textDecoration: "none",
              borderRadius: "6px",
              border: "1px solid var(--border-default)",
            }}
          >
            Inquire
          </Link>
        ) : null}
      </div>
      <style>{`
        @media (max-width: 768px) {
          .sticky-mobile-cta { display: grid !important; }
          main { padding-bottom: 80px; }
        }
      `}</style>
    </>
  );
}
