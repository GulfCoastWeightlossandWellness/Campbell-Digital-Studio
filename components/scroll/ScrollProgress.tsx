"use client";

/**
 * ScrollProgress — site-wide 2px gold progress bar fixed to the top of
 * the viewport that tracks scroll position.
 *
 * Mount once in app/layout.tsx, before <Header />, so it sits above
 * all page content.
 *
 * Implementation:
 *   useScroll()         → scrollYProgress MotionValue (0 → 1)
 *   useTransform()      → scaleX (0 → 1) on a full-width bar
 *   transform-origin    → left, so the bar grows from left to right
 *
 * GPU-only: only opacity and transform (scaleX) are animated.
 * Reduced-motion: bar is hidden (opacity 0) — no movement.
 *
 * Color: var(--gold-600) = #C49A35 (brand gold accent).
 */

import { useScroll, useTransform, motion, useReducedMotion } from "motion/react";

export default function ScrollProgress() {
  const reducedMotion = useReducedMotion();
  const { scrollYProgress } = useScroll();

  // Map scroll 0→1 to scaleX 0→1 (transform-origin: left)
  const scaleX = useTransform(scrollYProgress, [0, 1], [0, 1]);

  if (reducedMotion) {
    // Don't render the bar at all for reduced-motion users —
    // a moving bar could still be distracting even if subtle.
    return null;
  }

  return (
    <motion.div
      aria-hidden="true"
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        height: "2px",
        background: "var(--gold-600)",
        scaleX,
        transformOrigin: "left center",
        zIndex: 200,
        // Pointer events off so it never blocks clicks near the top of the page
        pointerEvents: "none",
      }}
    />
  );
}
