"use client";

/**
 * MatrixDemo — Live Matrix Generator (section 02.5) — marquee edition.
 *
 * Upgraded from "a working demo" to THE centerpiece of the CDS home:
 *
 *   • Navy panel frame with subtle inner shadow + "LIVE DEMO" gold badge
 *   • Kinetic headline + plain-English caption explaining what just happened
 *   • 7 ambient gold particles (Motion SVG, GPU-only transforms, slow drift)
 *     — freeze in place when prefers-reduced-motion is on
 *   • Result feedback card: page title, meta snippet, "1 of 210" counter
 *     revealed with the same stagger as the preview, announced via aria-live
 *   • Gold rule above the section + extra vertical breathing room
 *   • Keyboard-accessible inputs, aria-live result region
 *
 * Motion choreography (on submit, total ≈900ms):
 *   0ms     submit click → input row stays in place
 *   0ms     preview frame fades in 280ms (cubic-bezier 0.3, 0, 0, 1)
 *   80ms    H1, meta description, and FAQ lines stream in 24ms-staggered
 *   ~400ms  Result feedback card slides in
 *   ~500ms  JSON-LD block reveals via clip-path inset (100% → 0) over 360ms
 *   ~860ms  Gold hairline sweeps the frame edge once
 *
 * A11y:
 *   - `prefers-reduced-motion` → animations zeroed via globals.css + the
 *     `useReducedMotion()` hook (motion timing falls to 0ms paths)
 *   - Particles freeze in place (not removed) when reduced motion is on
 *   - aria-live="polite" on the preview region so screen readers announce
 *     when a new preview lands
 *   - Result feedback card gets aria-label for screen reader context
 *   - All controls keyboard-accessible (native <select> + native <button>)
 *
 * Anti-poison:
 *   The JSON-LD returned by the API is rendered as inert <pre><code>. We
 *   never inject a `<script type="application/ld+json">` tag from this
 *   component — that would poison Google's schema parser for the CDS domain.
 *
 * Bundle target ~16KB client JS (motion is already loaded at the page level
 * via Hero.tsx). No new deps.
 */

import { useState, useTransition, useId } from "react";
import {
  AnimatePresence,
  motion,
  useReducedMotion,
  type Variants,
} from "motion/react";
import SectionTag from "@/components/editorial/SectionTag";

// ─── Preview shape — mirrors the type in `lib/matrix/generate.ts` ─────────
type Preview = {
  h1: string;
  meta: string;
  faqs: Array<{ q: string; a: string }>;
  jsonLd: string;
  interlinks: string[];
  url: string;
};

type Props = {
  cities: readonly string[];
  services: readonly string[];
  sectionNum?: string;
};

// ─── Motion variants ─────────────────────────────────────────────────────
const FLUID = [0.3, 0, 0, 1] as const; // --ease-fluid

const frameVariants: Variants = {
  hidden: { opacity: 0, y: 8 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.28, ease: FLUID },
  },
};

const lineVariants: Variants = {
  hidden: { opacity: 0, y: 6 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.32,
      ease: FLUID,
      delay: 0.08 + i * 0.024, // 24ms stagger per line
    },
  }),
};

const jsonLdVariants: Variants = {
  hidden: { clipPath: "inset(0 0 100% 0)" },
  visible: {
    clipPath: "inset(0 0 0 0)",
    transition: { duration: 0.36, ease: FLUID, delay: 0.5 },
  },
};

const sweepVariants: Variants = {
  hidden: { scaleX: 0 },
  visible: {
    scaleX: 1,
    transition: { duration: 0.62, ease: FLUID, delay: 0.86 },
  },
};

const resultCardVariants: Variants = {
  hidden: { opacity: 0, y: 10 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.34, ease: FLUID, delay: 0.4 },
  },
};

// ─── Particle definitions — 7 slow-drifting gold circles ─────────────────
// Each particle has a deterministic seed for position + timing so the layout
// is visually balanced. All animation uses translate/rotate/opacity — no
// left/top changes — so they're composited on the GPU layer.
const PARTICLES = [
  { id: 0, cx: "12%", cy: "22%", r: 2.5, dur: 18, delay: 0,    dx: 18, dy: 12 },
  { id: 1, cx: "88%", cy: "15%", r: 2,   dur: 22, delay: 3.2,  dx: -14, dy: 18 },
  { id: 2, cx: "72%", cy: "78%", r: 3,   dur: 26, delay: 1.1,  dx: -20, dy: -10 },
  { id: 3, cx: "28%", cy: "68%", r: 1.5, dur: 20, delay: 5.8,  dx: 16, dy: -14 },
  { id: 4, cx: "55%", cy: "42%", r: 2.2, dur: 24, delay: 2.4,  dx: -12, dy: 20 },
  { id: 5, cx: "8%",  cy: "85%", r: 1.8, dur: 30, delay: 7.5,  dx: 22, dy: -8 },
  { id: 6, cx: "92%", cy: "62%", r: 2.8, dur: 16, delay: 4.0,  dx: -16, dy: -18 },
] as const;

// ─── ParticleField component ──────────────────────────────────────────────
function ParticleField({ frozen }: { frozen: boolean }) {
  return (
    <svg
      aria-hidden="true"
      className="matrix-marquee__particles"
      viewBox="0 0 100 100"
      preserveAspectRatio="xMidYMid slice"
    >
      {PARTICLES.map((p) => (
        <motion.circle
          key={p.id}
          cx={p.cx}
          cy={p.cy}
          r={p.r}
          fill="rgba(196, 154, 53, 0.22)"
          animate={
            frozen
              ? false
              : {
                  // GPU-only: translate via x/y, not cx/cy
                  x: [0, p.dx, p.dx * 0.4, 0],
                  y: [0, p.dy * 0.6, p.dy, 0],
                  opacity: [0.18, 0.32, 0.18, 0.18],
                }
          }
          transition={
            frozen
              ? undefined
              : {
                  duration: p.dur,
                  delay: p.delay,
                  repeat: Infinity,
                  ease: "easeInOut",
                  repeatType: "loop",
                }
          }
        />
      ))}
    </svg>
  );
}

// ─── Component ───────────────────────────────────────────────────────────
export default function MatrixDemo({
  cities,
  services,
  sectionNum = "02.5",
}: Props) {
  const reduceMotion = useReducedMotion();
  const [city, setCity] = useState<string>(cities[0]);
  const [service, setService] = useState<string>(services[0]);
  const [preview, setPreview] = useState<Preview | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();
  const resultId = useId();

  // Concrete number for the sub-copy — derived from the actual corpus
  // size so it stays truthful as the corpus grows or shrinks.
  const cellCount = cities.length * services.length;

  const handleGenerate = () => {
    setError(null);
    startTransition(async () => {
      try {
        const r = await fetch("/api/matrix-preview", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ city, service }),
        });
        if (!r.ok) {
          const detail = (await r.json().catch(() => ({}))) as {
            error?: string;
          };
          throw new Error(detail.error ?? `Request failed (${r.status})`);
        }
        const data = (await r.json()) as Preview;
        setPreview(data);
      } catch (e) {
        const msg = e instanceof Error ? e.message : "Unknown error";
        setError(msg);
        setPreview(null);
      }
    });
  };

  // Index of the current city × service combo in the full product
  const cityIdx = cities.indexOf(city as typeof cities[number]);
  const serviceIdx = services.indexOf(service as typeof services[number]);
  const pageIndex =
    cityIdx >= 0 && serviceIdx >= 0
      ? cityIdx * services.length + serviceIdx + 1
      : null;

  const submitButton = (
    <button
      type="submit"
      disabled={isPending}
      className="btn-fill matrix-demo__submit"
    >
      {isPending ? "Generating…" : "Generate page"}
    </button>
  );

  return (
    <section
      className="matrix-marquee"
      aria-labelledby="matrix-marquee-heading"
    >
      {/* Gold rule above — draws the eye before the section tag */}
      <div className="matrix-marquee__rule" aria-hidden="true" />

      <div className="section-wrap matrix-marquee__outer">
        {/* ── Section intro — lives on the cream background ──────────── */}
        <div className="matrix-marquee__intro">
          <SectionTag num={sectionNum} label="Live demo" />
          <h2
            id="matrix-marquee-heading"
            className="display-sans display-64 matrix-marquee__heading"
          >
            This is what{" "}
            <em className="matrix-marquee__heading-em">
              {cellCount} pages
            </em>{" "}
            of programmatic SEO looks like, generated live.
          </h2>
          <p className="matrix-marquee__strapline">
            Pick a city and a service. A real page — title, meta, FAQs,
            JSON-LD, interlinks — appears below in under half a second. No
            templates, no copy-paste. This is the engine Air Solutions runs at
            scale.
          </p>
        </div>

        {/* ── Navy marquee panel ─────────────────────────────────────── */}
        <div className="matrix-marquee__panel" role="region" aria-label="Live programmatic SEO demo">
          {/* Ambient gold particle drift — GPU-composited, decorative */}
          <ParticleField frozen={!!reduceMotion} />

          {/* LIVE DEMO badge */}
          <div className="matrix-marquee__badge" aria-hidden="true">
            <span className="matrix-marquee__badge-dot" />
            Live Demo
          </div>

          {/* ── Controls form ─────────────────────────────────────── */}
          <form
            className="matrix-demo__controls"
            onSubmit={(e) => {
              e.preventDefault();
              handleGenerate();
            }}
            aria-label="Matrix cell generator — choose a city and service"
          >
            <label className="matrix-demo__field">
              <span className="matrix-demo__label">City</span>
              <select
                className="studio-input matrix-demo__select"
                value={city}
                onChange={(e) => setCity(e.target.value)}
                disabled={isPending}
                aria-label="Select a city"
              >
                {cities.map((c) => (
                  <option key={c} value={c}>
                    {c}
                  </option>
                ))}
              </select>
            </label>

            <label className="matrix-demo__field">
              <span className="matrix-demo__label">Service</span>
              <select
                className="studio-input matrix-demo__select"
                value={service}
                onChange={(e) => setService(e.target.value)}
                disabled={isPending}
                aria-label="Select a service"
              >
                {services.map((s) => (
                  <option key={s} value={s}>
                    {s}
                  </option>
                ))}
              </select>
            </label>

            <div className="matrix-demo__submit-wrap">{submitButton}</div>
          </form>

          {/* Plain-English caption below input */}
          <p className="matrix-marquee__caption" aria-live="polite">
            {preview
              ? `You just generated the same kind of page Air Solutions runs at scale — ${cities.length} cities × ${services.length} services = ${cellCount} dedicated URLs, one for each market they serve.`
              : `${cities.length} cities × ${services.length} services = ${cellCount} dedicated URLs. Choose any combination above and watch it assemble.`}
          </p>

          {/* Error state */}
          {error ? (
            <p role="alert" className="matrix-demo__error">
              Could not generate the preview: {error}
            </p>
          ) : null}

          {/* ── Result feedback card ─────────────────────────────── */}
          <AnimatePresence mode="wait">
            {preview && pageIndex !== null ? (
              <motion.div
                key={`result-${preview.url}`}
                className="matrix-marquee__result-card"
                variants={resultCardVariants}
                initial={reduceMotion ? false : "hidden"}
                animate="visible"
                exit={{ opacity: 0, transition: { duration: 0.18 } }}
                aria-label="Generated page details"
                id={resultId}
              >
                <div className="matrix-marquee__result-eyebrow">
                  <span className="matrix-marquee__result-badge">
                    Page assembled
                  </span>
                  <span className="matrix-marquee__result-count">
                    {pageIndex} of {cellCount} city × service pages
                  </span>
                </div>
                <div className="matrix-marquee__result-title">
                  {preview.h1}
                </div>
                <div className="matrix-marquee__result-meta">
                  <span className="matrix-marquee__result-meta-label">
                    Title tag
                  </span>
                  {preview.h1} | Air Solutions
                </div>
                <div className="matrix-marquee__result-meta">
                  <span className="matrix-marquee__result-meta-label">
                    Meta description
                  </span>
                  {preview.meta.slice(0, 120)}
                  {preview.meta.length > 120 ? "…" : ""}
                </div>
                <div className="matrix-marquee__result-url">
                  {preview.url}
                </div>
              </motion.div>
            ) : null}
          </AnimatePresence>

          {/* ── Preview frame (browser chrome + page content) ─────── */}
          <div
            aria-live="polite"
            aria-label="Generated page preview"
            className="matrix-demo__live-region"
          >
            <AnimatePresence mode="wait">
              {preview ? (
                <motion.div
                  key={`${preview.url}`}
                  className="matrix-demo__frame"
                  variants={frameVariants}
                  initial={reduceMotion ? false : "hidden"}
                  animate="visible"
                  exit={{ opacity: 0, transition: { duration: 0.18 } }}
                >
                  {/* Fake browser chrome — shows the real production URL */}
                  <div className="matrix-demo__chrome" aria-hidden="true">
                    <div className="matrix-demo__chrome-dots">
                      <span /> <span /> <span />
                    </div>
                    <div className="matrix-demo__chrome-url">{preview.url}</div>
                    <div className="matrix-demo__chrome-spacer" />
                  </div>

                  <div className="matrix-demo__body">
                    <motion.h3
                      className="matrix-demo__h1"
                      custom={0}
                      variants={lineVariants}
                      initial={reduceMotion ? false : "hidden"}
                      animate="visible"
                    >
                      {preview.h1}
                    </motion.h3>

                    <motion.p
                      className="matrix-demo__meta"
                      custom={1}
                      variants={lineVariants}
                      initial={reduceMotion ? false : "hidden"}
                      animate="visible"
                    >
                      <span className="matrix-demo__meta-label">
                        meta description
                      </span>
                      {preview.meta}
                    </motion.p>

                    <div className="matrix-demo__faqs">
                      <motion.span
                        className="matrix-demo__section-label"
                        custom={2}
                        variants={lineVariants}
                        initial={reduceMotion ? false : "hidden"}
                        animate="visible"
                      >
                        FAQ — auto-generated, deterministic
                      </motion.span>
                      {preview.faqs.map((f, i) => (
                        <motion.div
                          key={f.q}
                          className="matrix-demo__faq"
                          custom={3 + i}
                          variants={lineVariants}
                          initial={reduceMotion ? false : "hidden"}
                          animate="visible"
                        >
                          <div className="matrix-demo__faq-q">{f.q}</div>
                          <div className="matrix-demo__faq-a">{f.a}</div>
                        </motion.div>
                      ))}
                    </div>

                    <div className="matrix-demo__interlinks">
                      <motion.span
                        className="matrix-demo__section-label"
                        custom={3 + preview.faqs.length}
                        variants={lineVariants}
                        initial={reduceMotion ? false : "hidden"}
                        animate="visible"
                      >
                        Interlinks — sibling cells
                      </motion.span>
                      <ul>
                        {preview.interlinks.map((link, i) => (
                          <motion.li
                            key={link}
                            custom={4 + preview.faqs.length + i}
                            variants={lineVariants}
                            initial={reduceMotion ? false : "hidden"}
                            animate="visible"
                          >
                            {link}
                          </motion.li>
                        ))}
                      </ul>
                    </div>

                    {/*
                      Anti-poison: rendered INERT as <pre><code>. This is the
                      preview of what would ship inside an actual
                      <script type="application/ld+json"> on the real matrix
                      page — but never as a real schema tag on this homepage.
                    */}
                    <motion.div
                      className="matrix-demo__jsonld"
                      variants={jsonLdVariants}
                      initial={reduceMotion ? false : "hidden"}
                      animate="visible"
                    >
                      <span className="matrix-demo__section-label">
                        JSON-LD — rendered inert for display
                      </span>
                      <pre>
                        <code>{preview.jsonLd}</code>
                      </pre>
                    </motion.div>
                  </div>

                  {/* Gold hairline sweep — last touch */}
                  <motion.div
                    className="matrix-demo__sweep"
                    aria-hidden="true"
                    variants={sweepVariants}
                    initial={reduceMotion ? false : "hidden"}
                    animate="visible"
                    style={{ transformOrigin: "left center" }}
                  />
                </motion.div>
              ) : null}
            </AnimatePresence>
          </div>
        </div>
      </div>

      {/* ── Scoped styles ─────────────────────────────────────────────────
          Kept inline so the component is fully self-contained.
          Appended rules live in globals.css under the MatrixDemo marquee
          block — see the comment there. ──────────────────────────────── */}
      <style jsx>{`
        /* ── Outer section rhythm ──────────────────────────────────── */
        .matrix-marquee {
          margin-top: clamp(64px, 8vw, 96px);
        }

        .matrix-marquee__rule {
          width: 100%;
          height: 1px;
          background: linear-gradient(
            90deg,
            transparent 0%,
            var(--copper) 50%,
            transparent 100%
          );
          margin-bottom: clamp(40px, 5vw, 64px);
          opacity: 0.65;
        }

        .matrix-marquee__outer {
          /* section-wrap handles the max-width + horizontal padding */
        }

        /* ── Intro (cream background) ─────────────────────────────── */
        .matrix-marquee__intro {
          margin-bottom: clamp(36px, 5vw, 56px);
        }

        .matrix-marquee__heading {
          margin-top: 18px;
          margin-bottom: 16px;
          max-width: 22ch;
          color: var(--ink-1);
        }

        .matrix-marquee__heading-em {
          font-family: var(--font-fraunces), Georgia, serif;
          font-style: italic;
          font-weight: 300;
          font-variation-settings: "opsz" 144;
          color: var(--copper);
        }

        .matrix-marquee__strapline {
          max-width: 58ch;
          font-family: var(--font-geist-sans), system-ui, sans-serif;
          font-size: clamp(15px, 1.5vw, 17px);
          line-height: 1.65;
          color: var(--ink-2);
          letter-spacing: -0.01em;
        }

        /* ── Navy panel ───────────────────────────────────────────── */
        .matrix-marquee__panel {
          position: relative;
          background: var(--navy-900);
          border-radius: 16px;
          padding: clamp(28px, 4vw, 52px) clamp(24px, 4vw, 48px)
            clamp(36px, 5vw, 64px);
          /* Subtle depth shadow underneath the panel */
          box-shadow:
            0 0 0 1px rgba(196, 154, 53, 0.12),
            inset 0 1px 0 rgba(196, 154, 53, 0.08),
            0 40px 80px -32px rgba(12, 31, 61, 0.5);
          overflow: hidden;
          /* Section-level vertical rhythm */
          padding-top: clamp(28px, 4vw, 52px);
          padding-bottom: clamp(40px, 5vw, 64px);
        }

        /* ── Ambient particles SVG ──────────────────────────────────── */
        .matrix-marquee__panel :global(.matrix-marquee__particles) {
          position: absolute;
          inset: 0;
          width: 100%;
          height: 100%;
          pointer-events: none;
          z-index: 0;
        }

        /* ── LIVE DEMO badge ──────────────────────────────────────── */
        .matrix-marquee__badge {
          position: absolute;
          top: 20px;
          right: 20px;
          display: flex;
          align-items: center;
          gap: 7px;
          font-family: var(--font-geist-mono), ui-monospace, monospace;
          font-size: 10px;
          font-weight: 600;
          letter-spacing: 0.18em;
          text-transform: uppercase;
          color: var(--gold-500);
          background: rgba(196, 154, 53, 0.1);
          border: 1px solid rgba(196, 154, 53, 0.22);
          border-radius: 4px;
          padding: 5px 10px 5px 8px;
          z-index: 2;
        }
        .matrix-marquee__badge-dot {
          display: inline-block;
          width: 6px;
          height: 6px;
          border-radius: 50%;
          background: var(--gold-500);
          flex-shrink: 0;
        }

        /* ── Caption (plain-English explanation) ───────────────────── */
        .matrix-marquee__caption {
          position: relative;
          z-index: 1;
          margin-top: 16px;
          max-width: 66ch;
          font-family: var(--font-geist-sans), system-ui, sans-serif;
          font-size: 14px;
          line-height: 1.65;
          color: rgba(255, 255, 255, 0.52);
          letter-spacing: -0.005em;
        }

        /* ── Result feedback card ────────────────────────────────── */
        .matrix-marquee__panel :global(.matrix-marquee__result-card) {
          position: relative;
          z-index: 1;
          margin-top: 20px;
          padding: 18px 20px;
          background: rgba(196, 154, 53, 0.08);
          border: 1px solid rgba(196, 154, 53, 0.2);
          border-radius: 10px;
          display: flex;
          flex-direction: column;
          gap: 10px;
        }

        .matrix-marquee__result-eyebrow {
          display: flex;
          align-items: center;
          gap: 14px;
          flex-wrap: wrap;
        }

        .matrix-marquee__result-badge {
          font-family: var(--font-geist-mono), ui-monospace, monospace;
          font-size: 9.5px;
          font-weight: 600;
          letter-spacing: 0.18em;
          text-transform: uppercase;
          color: var(--gold-500);
        }

        .matrix-marquee__result-count {
          font-family: var(--font-geist-mono), ui-monospace, monospace;
          font-size: 9.5px;
          letter-spacing: 0.1em;
          color: rgba(255, 255, 255, 0.38);
          text-transform: uppercase;
        }

        .matrix-marquee__result-title {
          font-family: var(--font-geist-sans), system-ui, sans-serif;
          font-size: clamp(17px, 2.4vw, 22px);
          font-weight: 500;
          letter-spacing: -0.02em;
          color: #fff;
          line-height: 1.25;
        }

        .matrix-marquee__result-meta {
          font-family: var(--font-geist-sans), system-ui, sans-serif;
          font-size: 13px;
          line-height: 1.6;
          color: rgba(255, 255, 255, 0.6);
          border-left: 2px solid rgba(196, 154, 53, 0.4);
          padding-left: 12px;
        }

        .matrix-marquee__result-meta-label {
          display: block;
          font-family: var(--font-geist-mono), ui-monospace, monospace;
          font-size: 9px;
          font-weight: 600;
          letter-spacing: 0.18em;
          text-transform: uppercase;
          color: var(--gold-600);
          margin-bottom: 3px;
        }

        .matrix-marquee__result-url {
          font-family: var(--font-geist-mono), ui-monospace, monospace;
          font-size: 11.5px;
          color: var(--gold-500);
          letter-spacing: 0.02em;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }

        /* ── Controls form (on navy) ──────────────────────────────── */
        .matrix-demo__controls {
          position: relative;
          z-index: 1;
          display: grid;
          grid-template-columns: 1fr 1fr auto;
          gap: 16px 20px;
          align-items: end;
          padding: 22px 24px;
          background: rgba(255, 255, 255, 0.05);
          border: 1px solid rgba(196, 154, 53, 0.18);
          border-radius: 12px;
        }
        @media (max-width: 720px) {
          .matrix-demo__controls {
            grid-template-columns: 1fr;
            gap: 14px;
            padding: 18px 16px;
          }
        }

        .matrix-demo__field {
          display: flex;
          flex-direction: column;
          gap: 6px;
        }

        .matrix-demo__label {
          font-family: var(--font-geist-mono), ui-monospace, monospace;
          font-size: 10px;
          font-weight: 600;
          letter-spacing: 0.18em;
          text-transform: uppercase;
          color: var(--gold-500);
        }

        /* Selects — override the cream-background studio-input on navy */
        .matrix-demo__controls :global(.matrix-demo__select) {
          background: rgba(255, 255, 255, 0.08);
          border-color: rgba(196, 154, 53, 0.22);
          color: #fff;
        }
        .matrix-demo__controls :global(.matrix-demo__select:focus) {
          background: rgba(255, 255, 255, 0.12);
          border-color: var(--gold-500);
          box-shadow: 0 0 0 3px rgba(196, 154, 53, 0.18);
        }
        /* Drop-down options inherit the browser chrome — keep readable */
        .matrix-demo__controls :global(.matrix-demo__select option) {
          background: var(--navy-900);
          color: #fff;
        }

        .matrix-demo__submit-wrap {
          display: flex;
          align-items: stretch;
        }
        .matrix-demo__submit-wrap :global(.matrix-demo__submit) {
          min-height: 44px;
          white-space: nowrap;
        }
        @media (max-width: 720px) {
          .matrix-demo__submit-wrap {
            width: 100%;
          }
          .matrix-demo__submit-wrap :global(.matrix-demo__submit.btn-fill) {
            width: 100%;
            display: block;
            text-align: center;
            padding: 14px 20px;
          }
        }

        /* ── Error ──────────────────────────────────────────────── */
        .matrix-demo__error {
          position: relative;
          z-index: 1;
          margin-top: 16px;
          padding: 12px 16px;
          background: rgba(184, 58, 44, 0.18);
          border-left: 2px solid var(--error);
          border-radius: 0 6px 6px 0;
          font-size: 14px;
          color: rgba(255, 255, 255, 0.85);
        }

        /* ── Live region + frame ──────────────────────────────────── */
        .matrix-demo__live-region {
          position: relative;
          z-index: 1;
          margin-top: 24px;
        }

        /* motion.* elements drop styled-jsx scope hash, so target globally */
        .matrix-demo__live-region :global(.matrix-demo__frame) {
          position: relative;
          background: var(--surface);
          border: 1px solid var(--border-default);
          border-radius: 12px;
          overflow: hidden;
          box-shadow:
            0 0 0 1px rgba(196, 154, 53, 0.1),
            0 24px 60px -32px rgba(12, 31, 61, 0.5);
        }

        /* Fake browser chrome */
        .matrix-demo__chrome {
          display: grid;
          grid-template-columns: auto 1fr auto;
          align-items: center;
          gap: 12px;
          padding: 10px 14px;
          background: var(--panel);
          border-bottom: 1px solid var(--border-subtle);
        }
        .matrix-demo__chrome-dots {
          display: flex;
          gap: 6px;
        }
        .matrix-demo__chrome-dots span {
          display: inline-block;
          width: 10px;
          height: 10px;
          border-radius: 50%;
          background: var(--border-strong);
        }
        .matrix-demo__chrome-url {
          font-family: var(--font-geist-mono), ui-monospace, monospace;
          font-size: 12px;
          color: var(--ink-2);
          padding: 4px 12px;
          background: var(--surface);
          border: 1px solid var(--border-subtle);
          border-radius: 6px;
          text-align: center;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }
        .matrix-demo__chrome-spacer {
          width: 56px;
        }
        @media (max-width: 560px) {
          .matrix-demo__chrome-spacer {
            display: none;
          }
          .matrix-demo__chrome {
            grid-template-columns: auto 1fr;
          }
        }

        .matrix-demo__body {
          padding: clamp(18px, 3vw, 32px);
          display: flex;
          flex-direction: column;
          gap: 22px;
          min-width: 0;
        }

        /* motion.h3 — styled globally because motion strips styled-jsx hash */
        .matrix-demo__body :global(.matrix-demo__h1) {
          font-family: var(--font-geist-sans), system-ui, sans-serif;
          font-weight: 500;
          font-size: clamp(22px, 5.8vw, 32px);
          line-height: 1.18;
          letter-spacing: -0.022em;
          color: var(--ink-1);
          margin: 0;
          overflow-wrap: anywhere;
          word-break: break-word;
        }

        /* motion.p — styled globally */
        .matrix-demo__body :global(.matrix-demo__meta) {
          margin: 0;
          font-size: 15px;
          line-height: 1.6;
          color: var(--ink-2);
          padding-left: 14px;
          border-left: 2px solid var(--copper);
          overflow-wrap: anywhere;
        }
        .matrix-demo__meta-label {
          display: block;
          font-family: var(--font-geist-mono), ui-monospace, monospace;
          font-size: 10px;
          font-weight: 600;
          letter-spacing: 0.18em;
          text-transform: uppercase;
          color: var(--copper);
          margin-bottom: 6px;
        }

        .matrix-demo__section-label {
          display: block;
          font-family: var(--font-geist-mono), ui-monospace, monospace;
          font-size: 10px;
          font-weight: 600;
          letter-spacing: 0.18em;
          text-transform: uppercase;
          color: var(--copper);
        }

        .matrix-demo__faqs {
          display: flex;
          flex-direction: column;
          gap: 14px;
        }

        /* motion.div — styled globally */
        .matrix-demo__faqs :global(.matrix-demo__faq) {
          padding: 14px 16px;
          background: var(--panel);
          border: 1px solid var(--border-subtle);
          border-radius: 8px;
        }
        .matrix-demo__faq-q {
          font-family: var(--font-geist-sans), system-ui, sans-serif;
          font-size: 14.5px;
          font-weight: 500;
          color: var(--ink-1);
          margin-bottom: 6px;
          letter-spacing: -0.015em;
        }
        .matrix-demo__faq-a {
          font-size: 13.5px;
          line-height: 1.6;
          color: var(--ink-2);
        }

        .matrix-demo__interlinks {
          display: flex;
          flex-direction: column;
          gap: 10px;
        }
        .matrix-demo__interlinks ul {
          list-style: none;
          padding: 0;
          margin: 0;
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 8px 16px;
        }
        @media (max-width: 560px) {
          .matrix-demo__interlinks ul {
            grid-template-columns: 1fr;
          }
        }
        :global(.matrix-demo__interlinks ul li) {
          font-family: var(--font-geist-sans), system-ui, sans-serif;
          font-size: 13.5px;
          color: var(--copper);
          padding: 4px 0;
          border-bottom: 1px dashed var(--border-subtle);
          list-style: none;
          word-break: break-word;
        }

        .matrix-demo__body :global(.matrix-demo__jsonld) {
          display: flex;
          flex-direction: column;
          gap: 8px;
          min-width: 0;
        }
        .matrix-demo__body :global(.matrix-demo__jsonld pre) {
          margin: 0;
          padding: 16px 18px;
          background: #0c1f3d;
          color: #e8eef6;
          border-radius: 8px;
          overflow-x: auto;
          overflow-y: auto;
          max-height: 280px;
          max-width: 100%;
          font-family: var(--font-geist-mono), ui-monospace, monospace;
          font-size: 12px;
          line-height: 1.55;
          -webkit-overflow-scrolling: touch;
        }
        .matrix-demo__body :global(.matrix-demo__jsonld code) {
          font-family: inherit;
          display: block;
          min-width: max-content;
        }

        /* Gold hairline sweep */
        .matrix-demo__live-region :global(.matrix-demo__sweep) {
          position: absolute;
          left: 0;
          right: 0;
          bottom: 0;
          height: 1px;
          background: linear-gradient(
            90deg,
            transparent 0%,
            var(--copper) 50%,
            transparent 100%
          );
          pointer-events: none;
          transform-origin: left center;
        }
      `}</style>
    </section>
  );
}
