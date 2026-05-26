"use client";

/**
 * InViewReveal — scroll-driven fade-rise entrance for any content block.
 *
 * Uses Motion's useInView hook with a -15% top margin so the animation
 * fires just before the element reaches the centre of the viewport rather
 * than right at the edge. Once triggered it never re-triggers (once: true).
 *
 * Animation spec (Anthropic-restrained):
 *   opacity  0 → 1,  duration 0.6s, easing [0.2, 0, 0, 1]
 *   translateY 16px → 0,  same duration + easing
 *
 * GPU-only transforms — no layout-triggering properties animated.
 * Reduced-motion: component renders children immediately at final state.
 */

import { createElement, useRef, type CSSProperties, type ReactNode } from "react";
import { motion, useInView, useReducedMotion } from "motion/react";

// Supported HTML element tags (the subset Motion exposes directly)
type SupportedTag =
  | "div"
  | "section"
  | "article"
  | "aside"
  | "header"
  | "footer"
  | "main"
  | "nav"
  | "span"
  | "p"
  | "ul"
  | "li";

type InViewRevealProps = {
  /** Delay in milliseconds before the animation begins (default 0). */
  delay?: number;
  /** HTML element tag to render as. Defaults to "div". */
  as?: SupportedTag;
  children: ReactNode;
  className?: string;
  style?: CSSProperties;
  id?: string;
  "aria-label"?: string;
  "aria-labelledby"?: string;
};

export default function InViewReveal({
  delay = 0,
  as = "div",
  children,
  className,
  style,
  id,
  ...aria
}: InViewRevealProps) {
  const ref = useRef<HTMLElement>(null);
  const reducedMotion = useReducedMotion();

  const inView = useInView(ref as React.RefObject<Element>, {
    once: true,
    margin: "-15% 0px",
  });

  // When reduced motion is preferred, render at final state immediately —
  // no animation, just the element with children visible.
  if (reducedMotion) {
    return createElement(
      as,
      { ref, className, style, id, ...aria },
      children,
    );
  }

  // Motion's element map: motion.div, motion.section, etc.
  // We cast to access the string-keyed element variants.
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const MotionTag = (motion as any)[as] as typeof motion.div;

  return (
    <MotionTag
      ref={ref as React.RefObject<HTMLDivElement>}
      className={className}
      style={style}
      id={id}
      {...aria}
      initial={{ opacity: 0, y: 16 }}
      animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }}
      transition={{
        delay: delay / 1000,
        duration: 0.6,
        ease: [0.2, 0, 0, 1],
      }}
    >
      {children}
    </MotionTag>
  );
}
