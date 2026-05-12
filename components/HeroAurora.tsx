"use client";

import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";

/**
 * HeroAurora — animated warm composition behind the home hero.
 *
 * v3 palette: three drifting copper-family blobs (deep copper, copper, amber)
 * over a subtle cross-hatch grid plus a thin copper horizon line. Pure
 * decoration — content of the engagement process lives in §05 Process.
 *
 * Performance: GPU-only transforms (translate + scale), `will-change` hint,
 * `prefers-reduced-motion` respected via Motion's hook. Optional scroll-linked
 * opacity fade (Motion useScroll + useTransform) is disabled when reduced motion
 * is requested.
 */
export default function HeroAurora() {
  const reducedMotion = useReducedMotion();
  const { scrollY } = useScroll();
  const scrollFade = useTransform(scrollY, [0, 420], [1, 0.66]);

  return (
    <div className="hero-aurora" aria-hidden>
      <motion.div
        className="hero-aurora-layers"
        style={reducedMotion ? undefined : { opacity: scrollFade }}
      >
        <motion.div
          className="blob blob-deep"
          animate={
            reducedMotion
              ? undefined
              : { x: ["0%", "8%", "-4%", "0%"], y: ["0%", "-6%", "4%", "0%"], scale: [1, 1.08, 0.96, 1] }
          }
          transition={reducedMotion ? undefined : { duration: 18, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="blob blob-copper"
          animate={
            reducedMotion
              ? undefined
              : { x: ["0%", "-5%", "6%", "0%"], y: ["0%", "5%", "-3%", "0%"], scale: [1, 0.94, 1.06, 1] }
          }
          transition={reducedMotion ? undefined : { duration: 22, repeat: Infinity, ease: "easeInOut", delay: 1.5 }}
        />
        <motion.div
          className="blob blob-amber"
          animate={
            reducedMotion
              ? undefined
              : { x: ["0%", "4%", "-6%", "0%"], y: ["0%", "-4%", "6%", "0%"], scale: [1, 1.05, 0.95, 1] }
          }
          transition={reducedMotion ? undefined : { duration: 26, repeat: Infinity, ease: "easeInOut", delay: 3 }}
        />

        <svg
          className="grid-svg"
          preserveAspectRatio="none"
          viewBox="0 0 1200 400"
        >
          <defs>
            <pattern id="hero-grid-aurora" x="0" y="0" width="60" height="60" patternUnits="userSpaceOnUse">
              <path d="M 60 0 L 0 0 L 0 60" fill="none" stroke="rgba(255,245,235,0.035)" strokeWidth="1" />
            </pattern>
            <linearGradient id="aurora-line-grad" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor="transparent" />
              <stop offset="50%" stopColor="#C77B43" stopOpacity="0.7" />
              <stop offset="100%" stopColor="transparent" />
            </linearGradient>
          </defs>

          <rect x="0" y="0" width="1200" height="400" fill="url(#hero-grid-aurora)" />

          <line x1="0" y1="350" x2="1200" y2="350" stroke="url(#aurora-line-grad)" strokeWidth="1" />
          <line x1="0" y1="352" x2="1200" y2="352" stroke="url(#aurora-line-grad)" strokeWidth="1" opacity="0.4" />
        </svg>
      </motion.div>

      <style>{`
        .hero-aurora {
          position: relative;
          width: 100%;
          height: clamp(280px, 38vw, 440px);
          overflow: hidden;
          isolation: isolate;
        }
        .hero-aurora-layers {
          position: absolute;
          inset: 0;
        }
        .blob {
          position: absolute;
          width: 56%;
          aspect-ratio: 1;
          border-radius: 50%;
          filter: blur(90px);
          will-change: transform;
        }
        .blob-deep {
          background: radial-gradient(circle, #A06A4A 0%, transparent 65%);
          top: -16%;
          left: 4%;
          opacity: 0.42;
        }
        .blob-copper {
          background: radial-gradient(circle, #C77B43 0%, transparent 65%);
          top: 8%;
          left: 32%;
          opacity: 0.42;
        }
        .blob-amber {
          background: radial-gradient(circle, #D4A574 0%, transparent 65%);
          top: -10%;
          left: 58%;
          opacity: 0.32;
        }
        .grid-svg {
          position: absolute;
          inset: 0;
          width: 100%;
          height: 100%;
          z-index: 1;
          pointer-events: none;
        }

        @media (max-width: 720px) {
          .hero-aurora { height: clamp(240px, 60vw, 320px); }
          .blob { filter: blur(60px); }
        }
      `}</style>
    </div>
  );
}
