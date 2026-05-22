"use client";

/**
 * Hero — split-stage homepage hero.
 *
 * Layout (≥1200px): 7-col headline left on cream + 5-col navy stage right with
 * a frosted-glass device frame cycling three real client loops. Stacks to a
 * single column below 1200px; collapses to a vertical phone-frame variant
 * below 720px (Air Solutions loop only).
 *
 * Motion choreography (1.4s total entry):
 *   0ms     H1 fades up 12px, two-line stagger 60ms apart, 420ms each
 *           Italic emphasis word arrives last with a 1px gold underline draw-in
 *   240ms   Device frame draws — chrome immediate, screen poster→video cross-fade
 *   380ms   HeroAurora drifts (handled inside that component)
 *   700ms   CTAs fade in, 40ms stagger
 *   1100ms  Primary CTA one-time gold-glow pulse (800ms)
 *
 * A11y:
 *   - prefers-reduced-motion → poster image only, no tilt, no magnetic, no pulse
 *   - aurora hidden from AT via aria-hidden on HeroAurora
 *   - H1 is the LCP element (text), poster image is fetchpriority="low"
 *
 * Voice: clinical-plain. Verbs: ship, run, automate, build, measure.
 *
 * Self-contained. Scoped styles live in Hero.module.css.
 */

import { useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  AnimatePresence,
  motion,
  useMotionValue,
  useReducedMotion,
  useSpring,
  useTransform,
} from "motion/react";
import HeroAurora from "@/components/HeroAurora";
import { siteConfig } from "@/lib/site-config";
import styles from "./Hero.module.css";

// ─── Optional MagneticButton (Agent 10) — graceful fallback if missing ────
// Use a dynamic require pattern with a try/catch so the build still succeeds
// when components/MagneticButton.tsx hasn't landed yet.
type MagneticButtonProps = {
  href: string;
  children: React.ReactNode;
  className?: string;
  pulse?: boolean;
};

let MagneticButton: React.ComponentType<MagneticButtonProps> | null = null;
try {
  // eslint-disable-next-line @typescript-eslint/no-require-imports
  MagneticButton = require("@/components/MagneticButton").default;
} catch {
  MagneticButton = null;
}

// ─── Device-loop manifest ────────────────────────────────────────────────
type Loop = {
  src: string;
  label: string;
  url: string;
  alt: string;
};

const LOOPS: Loop[] = [
  {
    src: "/hero-loops/air-solutions.mp4",
    label: "Air Solutions · HVAC · 312 pages live",
    url: "airsolutionspros.com/services/ac-repair/daphne-al",
    alt: "Air Solutions HVAC programmatic SEO matrix loop",
  },
  {
    src: "/hero-loops/ihe.mp4",
    label: "IHE · Patient Education · 146 apps shipped",
    url: "interactivehealtheducation.com/apps",
    alt: "Interactive Health Education app library loop",
  },
  {
    src: "/hero-loops/revitalize.mp4",
    label: "Revitalize · Multi-location wellness · 72 routes",
    url: "revitalizemedicalandwellness.com/services",
    alt: "Revitalize multi-location clinic booking loop",
  },
];

const POSTER_TEMP =
  "https://placehold.co/1280x800/0C1F3D/E8C46B?text=Loading";
const POSTER_PATH = "/hero-loops/poster.jpg";

// Each loop runs ~6–7s; we use 6500ms as a unified cadence.
const LOOP_MS = 6500;
const DISSOLVE_MS = 240;

// ─── Tilt config ─────────────────────────────────────────────────────────
const MAX_TILT_DEG = 4;
const SPRING = { stiffness: 220, damping: 28, mass: 0.6 };

export default function Hero() {
  const reducedMotion = useReducedMotion();
  const [loopIdx, setLoopIdx] = useState(0);
  const [videoReady, setVideoReady] = useState(false);
  const [isHoveringFrame, setIsHoveringFrame] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const frameRef = useRef<HTMLDivElement | null>(null);

  // ── Detect viewport for mobile fallback (no JS for layout — this only
  //    drives the loop manifest + tilt suppression). ─────────────────────
  useEffect(() => {
    const mq = window.matchMedia("(max-width: 720px)");
    const set = () => setIsMobile(mq.matches);
    set();
    mq.addEventListener("change", set);
    return () => mq.removeEventListener("change", set);
  }, []);

  // ── Loop rotation: advance the index every LOOP_MS, dissolve label
  //    fades between loops. Honors reduced-motion (locks to first loop). ─
  useEffect(() => {
    if (reducedMotion || isMobile) return;
    const t = window.setInterval(() => {
      setLoopIdx((i) => (i + 1) % LOOPS.length);
    }, LOOP_MS);
    return () => window.clearInterval(t);
  }, [reducedMotion, isMobile]);

  // ── Pause video on hover (interactivity hint). ─────────────────────────
  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;
    if (isHoveringFrame) v.pause();
    else void v.play().catch(() => {});
  }, [isHoveringFrame, loopIdx]);

  // ── Cursor-tracked 3D tilt — rotateX/rotateY clamped to ±4°, spring-damped.
  //    Disabled on touch / reduced-motion / mobile.
  const px = useMotionValue(0); // -1 → 1
  const py = useMotionValue(0);
  const rotX = useSpring(useTransform(py, [-1, 1], [MAX_TILT_DEG, -MAX_TILT_DEG]), SPRING);
  const rotY = useSpring(useTransform(px, [-1, 1], [-MAX_TILT_DEG, MAX_TILT_DEG]), SPRING);

  const tiltDisabled = reducedMotion || isMobile;

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (tiltDisabled) return;
    const el = frameRef.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const x = ((e.clientX - r.left) / r.width) * 2 - 1;
    const y = ((e.clientY - r.top) / r.height) * 2 - 1;
    px.set(x);
    py.set(y);
  };
  const handleMouseLeave = () => {
    px.set(0);
    py.set(0);
    setIsHoveringFrame(false);
  };

  // On mobile we lock to a single loop (Air Solutions).
  const activeLoop = isMobile ? LOOPS[0] : LOOPS[loopIdx];

  // ── Headline split: render the two italic noun phrases as separate
  //    motion children so each gets its own underline draw-in.
  const headline = useMemo(
    () => (
      <h1 className={`display-sans display-96 ${styles.h1}`}>
        <motion.span
          className={styles.h1Line}
          initial={reducedMotion ? false : { opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0, duration: 0.42, ease: [0.2, 0, 0, 1] }}
        >
          Digital infrastructure for{" "}
          <em className={styles.emWord}>
            clinical practices
            <UnderlineDraw delay={0.18} reduced={!!reducedMotion} />
          </em>
        </motion.span>
        <motion.span
          className={styles.h1Line}
          initial={reducedMotion ? false : { opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.06, duration: 0.42, ease: [0.2, 0, 0, 1] }}
        >
          and{" "}
          <em className={styles.emWord}>
            local service businesses.
            <UnderlineDraw delay={0.32} reduced={!!reducedMotion} />
          </em>
        </motion.span>
      </h1>
    ),
    [reducedMotion]
  );

  // CTA fade-in stagger (700ms after H1, 40ms between buttons).
  const ctaBase = 0.7;
  const ctaStep = 0.04;

  const showCal = !!siteConfig.calUsername;

  return (
    <section
      className={`cover-surface ${styles.hero}`}
      aria-labelledby="hero-h1"
    >
      <div className={`section-wrap ${styles.inner}`}>
        {/* ── LEFT 7 cols: headline + CTAs ─────────────────────────────── */}
        <div className={styles.left}>
          <div className={styles.eyebrow} aria-hidden>
            <span className={styles.eyebrowNum}>01</span>
            <span className={styles.eyebrowLabel}>Campbell Digital Studio</span>
          </div>

          {/* H1 carries the visible label for the section heading */}
          <div id="hero-h1">{headline}</div>

          <motion.p
            className={styles.subhead}
            initial={reducedMotion ? false : { opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.32, duration: 0.42, ease: [0.2, 0, 0, 1] }}
          >
            Multi-location architectures, programmatic SEO, and Google
            Business Profile operations — built end-to-end by a physician
            who codes.
          </motion.p>

          <motion.p
            className={styles.meta}
            initial={reducedMotion ? false : { opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.46, duration: 0.32 }}
          >
            Daphne, Alabama · Solo studio · Currently shipping for 2 active
            clients
          </motion.p>

          <div className={styles.ctas}>
            <motion.div
              initial={reducedMotion ? false : { opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: ctaBase, duration: 0.32 }}
              className={styles.ctaPrimaryWrap}
            >
              {MagneticButton && !isMobile && !reducedMotion ? (
                <MagneticButton
                  href="/inquire"
                  className={`btn-fill ${styles.ctaPrimary}`}
                  pulse
                >
                  Start a project →
                </MagneticButton>
              ) : (
                <Link
                  href="/inquire"
                  className={`btn-fill ${styles.ctaPrimary} ${
                    reducedMotion ? "" : styles.ctaPrimaryPulse
                  }`}
                >
                  Start a project →
                </Link>
              )}
            </motion.div>

            <motion.div
              initial={reducedMotion ? false : { opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: ctaBase + ctaStep, duration: 0.32 }}
            >
              <Link href="/work" className="btn-ghost">
                See the work →
              </Link>
            </motion.div>

            {showCal ? (
              <motion.div
                initial={reducedMotion ? false : { opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: ctaBase + ctaStep * 2, duration: 0.32 }}
              >
                <Link
                  href="/call"
                  className={`editorial-link mono ${styles.ctaTertiary}`}
                >
                  Or book a 20-min intro →
                </Link>
              </motion.div>
            ) : null}
          </div>
        </div>

        {/* ── RIGHT 5 cols: navy stage with device frame ───────────────── */}
        <div className={styles.right}>
          <div className={styles.stage} aria-hidden={false}>
            {/* Aurora scoped to the navy half. aria-hidden inside HeroAurora. */}
            <div className={styles.auroraWrap} aria-hidden>
              <HeroAurora />
            </div>

            <motion.div
              ref={frameRef}
              className={
                isMobile ? `${styles.frame} ${styles.framePhone}` : styles.frame
              }
              onMouseMove={handleMouseMove}
              onMouseEnter={() => setIsHoveringFrame(true)}
              onMouseLeave={handleMouseLeave}
              initial={reducedMotion ? false : { opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.24, duration: 0.5, ease: [0.2, 0, 0, 1] }}
              style={
                tiltDisabled
                  ? undefined
                  : { rotateX: rotX, rotateY: rotY, transformPerspective: 1200 }
              }
            >
              {/* Top chrome: traffic lights + favicon + URL bar */}
              <div className={styles.chrome}>
                <div className={styles.dots} aria-hidden>
                  <span className={styles.dotR} />
                  <span className={styles.dotY} />
                  <span className={styles.dotG} />
                </div>
                <div className={styles.urlBar}>
                  <span className={styles.favicon} aria-hidden>
                    <svg viewBox="0 0 16 16" width="10" height="10">
                      <path
                        d="M2 8 L7 13 L14 4"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                      />
                    </svg>
                  </span>
                  <span className={styles.urlText}>{activeLoop.url}</span>
                </div>
              </div>

              {/* Screen: video + poster crossfade */}
              <div className={styles.screen}>
                {/* Poster image (LCP-safe, loads first, fades out when video ready) */}
                <Image
                  src={POSTER_TEMP}
                  alt=""
                  width={1280}
                  height={800}
                  unoptimized
                  priority={false}
                  fetchPriority="low"
                  className={`${styles.poster} ${
                    videoReady && !reducedMotion ? styles.posterHidden : ""
                  }`}
                  data-poster-fallback={POSTER_PATH}
                />

                {!reducedMotion && !isMobile ? (
                  <AnimatePresence mode="wait">
                    <motion.video
                      key={activeLoop.src}
                      ref={videoRef}
                      className={styles.video}
                      autoPlay
                      muted
                      playsInline
                      loop
                      preload="metadata"
                      width={1280}
                      height={800}
                      poster={POSTER_PATH}
                      onCanPlay={() => setVideoReady(true)}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: DISSOLVE_MS / 1000 }}
                      aria-label={activeLoop.alt}
                    >
                      <source src={activeLoop.src} type="video/mp4" />
                    </motion.video>
                  </AnimatePresence>
                ) : null}

                {/* Reduced-motion: just the poster, no video. */}

                {/* Mobile: single-loop video, no rotation. */}
                {!reducedMotion && isMobile ? (
                  <video
                    ref={videoRef}
                    className={styles.video}
                    autoPlay
                    muted
                    playsInline
                    loop
                    preload="metadata"
                    width={1280}
                    height={800}
                    poster={POSTER_PATH}
                    onCanPlay={() => setVideoReady(true)}
                    aria-label={LOOPS[0].alt}
                  >
                    <source src={LOOPS[0].src} type="video/mp4" />
                  </video>
                ) : null}

                {/* Hover chip: "View case study →" */}
                <AnimatePresence>
                  {isHoveringFrame && !tiltDisabled ? (
                    <motion.div
                      className={styles.chip}
                      initial={{ opacity: 0, y: 6 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 6 }}
                      transition={{ duration: 0.18 }}
                    >
                      View case study →
                    </motion.div>
                  ) : null}
                </AnimatePresence>

                {/* Cycling gold label — fades between loops. */}
                {!isMobile && !reducedMotion ? (
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={activeLoop.label}
                      className={styles.loopLabel}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: DISSOLVE_MS / 1000 }}
                    >
                      {activeLoop.label}
                    </motion.div>
                  </AnimatePresence>
                ) : (
                  <div className={styles.loopLabel}>{LOOPS[0].label}</div>
                )}
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}

// ── Sub-component: the 1px gold underline that draws in then retreats ─────
function UnderlineDraw({
  delay,
  reduced,
}: {
  delay: number;
  reduced: boolean;
}) {
  if (reduced) return null;
  return (
    <motion.span
      className={styles.underline}
      initial={{ scaleX: 0, transformOrigin: "left center" }}
      animate={{
        scaleX: [0, 1, 1, 0],
        transformOrigin: [
          "left center",
          "left center",
          "right center",
          "right center",
        ],
      }}
      transition={{
        delay: delay + 0.42,
        times: [0, 0.4, 0.7, 1],
        duration: 1.2,
        ease: [0.2, 0, 0, 1],
      }}
      aria-hidden
    />
  );
}
