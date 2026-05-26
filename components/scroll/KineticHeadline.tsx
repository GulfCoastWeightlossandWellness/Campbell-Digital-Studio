"use client";

/**
 * KineticHeadline — wraps a headline and animates Geist's variable font-weight
 * from 300 → 600 as the element enters the viewport.
 *
 * Uses Motion's useScroll with a `target` ref to track the element's
 * progress through a small scroll range centred on the viewport. The
 * fontVariationSettings wght axis is driven by a MotionValue derived
 * from that scroll range — one element, no span splitting required.
 *
 * Animation spec:
 *   wght   300 → 600  (Geist variable font weight axis)
 *   Driven by scroll over the range where the top of the element moves
 *   from 80% → 20% of the viewport height.
 *
 * GPU-safe: fontVariationSettings doesn't trigger layout (it's a CSS
 * paint property on text). Opacity is also composed on the GPU via Motion.
 *
 * Reduced-motion: renders children at final weight (600) immediately.
 */

import { useRef } from "react";
import { motion, useScroll, useTransform, useReducedMotion } from "motion/react";

type KineticHeadlineProps = {
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
  /** Initial font weight (default 300) */
  fromWeight?: number;
  /** Final font weight (default 600) */
  toWeight?: number;
};

export default function KineticHeadline({
  children,
  className,
  style,
  fromWeight = 300,
  toWeight = 600,
}: KineticHeadlineProps) {
  const ref = useRef<HTMLDivElement>(null);
  const reducedMotion = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: ref,
    // "start 80%" → "start 20%": fires over a tight window as the
    // headline rises from the bottom third to upper third of the viewport.
    offset: ["start 80%", "start 20%"],
  });

  // Map scroll progress → font weight
  const fontWeight = useTransform(
    scrollYProgress,
    [0, 1],
    [fromWeight, toWeight]
  );

  // Drive fontVariationSettings as a string MotionValue
  const fontVariationSettings = useTransform(
    fontWeight,
    (w: number) => `"wght" ${Math.round(w)}`
  );

  if (reducedMotion) {
    return (
      <div
        ref={ref}
        className={className}
        style={{
          fontWeight: toWeight,
          fontVariationSettings: `"wght" ${toWeight}`,
          ...style,
        }}
      >
        {children}
      </div>
    );
  }

  return (
    <motion.div
      ref={ref}
      className={className}
      style={{
        fontVariationSettings,
        ...style,
      }}
    >
      {children}
    </motion.div>
  );
}
