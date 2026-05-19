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
  const primaryLabel = showBooking ? "Book a call" : "Inquire";

  return (
    <div
      className={`sticky-mobile-cta ${showBooking ? "sticky-mobile-cta--dual" : "sticky-mobile-cta--single"}${visible ? "" : " is-hidden"}`}
      style={reducedMotion ? { transition: "none" } : undefined}
    >
      <Link href={primaryHref} className="btn-fill btn-nav">
        {primaryLabel}
      </Link>
      {showBooking ? (
        <Link href="/inquire" className="btn-ghost btn-nav">
          Inquire
        </Link>
      ) : null}
    </div>
  );
}
