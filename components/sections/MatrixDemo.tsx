"use client";

/**
 * MatrixDemo — Live Matrix Generator (section 02.5).
 *
 * The marquee tech demo for Campbell Digital Studio. Two dropdowns
 * (`[City]` + `[Service]`) → a real Air Solutions-style matrix-cell preview
 * synthesized in <400ms via an Edge endpoint with zero LLM call.
 *
 * Motion choreography (on submit, total ≈900ms):
 *   0ms     submit click → input row stays in place
 *   0ms     preview frame fades in 280ms (cubic-bezier 0.3, 0, 0, 1)
 *   80ms    H1, meta description, and FAQ lines stream in 24ms-staggered
 *   ~500ms  JSON-LD block reveals via clip-path inset (100% → 0) over 360ms
 *   ~860ms  Gold hairline sweeps the frame edge once
 *
 * A11y:
 *   - `prefers-reduced-motion` → animations zeroed via globals.css + the
 *     `useReducedMotion()` hook (motion timing falls to 0ms paths)
 *   - aria-live="polite" on the preview region so screen readers announce
 *     when a new preview lands
 *   - All controls keyboard-accessible (native <select> + native <button>)
 *
 * Anti-poison:
 *   The JSON-LD returned by the API is rendered as inert <pre><code>. We
 *   never inject a `<script type="application/ld+json">` tag from this
 *   component — that would poison Google's schema parser for the CDS
 *   domain. The schema demo is illustrative, not declarative.
 *
 * Bundle target ~14KB client JS (motion is already loaded at the page level
 * via Hero.tsx). No new deps.
 */

import { useState, useTransition } from "react";
import {
  AnimatePresence,
  motion,
  useReducedMotion,
  type Variants,
} from "motion/react";
import SectionTag from "@/components/editorial/SectionTag";
import EditorialH2 from "@/components/editorial/EditorialH2";

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

  // Submit button uses a plain styled <button> — MatrixDemo's <form> needs a
  // real submit-type button, not a Link-based MagneticButton.
  const submitButton = (
    <button
      type="submit"
      disabled={isPending}
      className="btn-fill matrix-demo__submit"
    >
      {isPending ? "Generating…" : "Generate matrix cell"}
    </button>
  );

  return (
    <section className="section-wrap section-block matrix-demo">
      <SectionTag num={sectionNum} label="Live demo" />
      <EditorialH2>
        Generate a matrix cell <em>in front of you.</em>
      </EditorialH2>
      <p className="matrix-demo__lead">
        Pick a city and a service. Real programmatic SEO page generated in
        under half a second — this is what gets shipped for clients, at{" "}
        <span className="matrix-demo__lead-num">{cellCount}×</span> scale.
      </p>

      <form
        className="matrix-demo__controls"
        onSubmit={(e) => {
          e.preventDefault();
          handleGenerate();
        }}
        aria-label="Matrix cell generator"
      >
        <label className="matrix-demo__field">
          <span className="matrix-demo__label">City</span>
          <select
            className="studio-input"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            disabled={isPending}
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
            className="studio-input"
            value={service}
            onChange={(e) => setService(e.target.value)}
            disabled={isPending}
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

      {error ? (
        <p role="alert" className="matrix-demo__error">
          Could not generate the preview: {error}
        </p>
      ) : null}

      <div aria-live="polite" className="matrix-demo__live-region">
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
                  <span className="matrix-demo__meta-label">meta description</span>
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

      {/* Scoped styles. Kept inline so this component is fully self-contained
          and the global stylesheet doesn't grow for a single demo block. */}
      <style jsx>{`
        .matrix-demo__lead {
          margin-top: 16px;
          max-width: 62ch;
          font-family: var(--font-geist-sans), system-ui, sans-serif;
          font-size: clamp(15px, 1.5vw, 17px);
          line-height: 1.65;
          color: var(--ink-2);
          letter-spacing: -0.01em;
        }
        .matrix-demo__lead-num {
          font-family: var(--font-geist-mono), ui-monospace, monospace;
          font-weight: 600;
          color: var(--copper);
          letter-spacing: 0.02em;
        }

        .matrix-demo__controls {
          margin-top: 40px;
          display: grid;
          grid-template-columns: 1fr 1fr auto;
          gap: 16px 20px;
          align-items: end;
          padding: 22px 24px;
          background: var(--panel);
          border: 1px solid var(--border-default);
          border-radius: 12px;
        }
        @media (max-width: 720px) {
          .matrix-demo__controls {
            grid-template-columns: 1fr;
            gap: 14px;
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
          color: var(--copper);
        }

        .matrix-demo__submit-wrap {
          display: flex;
          align-items: stretch;
        }
        .matrix-demo__submit-wrap :global(.matrix-demo__submit) {
          min-height: 44px;
          white-space: nowrap;
        }

        .matrix-demo__error {
          margin-top: 16px;
          padding: 12px 16px;
          background: rgba(184, 58, 44, 0.1);
          border-left: 2px solid var(--error);
          border-radius: 0 6px 6px 0;
          font-size: 14px;
          color: var(--ink-1);
        }

        .matrix-demo__live-region {
          margin-top: 28px;
        }

        .matrix-demo__frame {
          position: relative;
          background: var(--surface);
          border: 1px solid var(--border-default);
          border-radius: 12px;
          overflow: hidden;
          box-shadow: 0 24px 60px -32px rgba(12, 31, 61, 0.14);
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
          width: 56px; /* visually balances the dots column */
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
          padding: clamp(20px, 3vw, 32px);
          display: flex;
          flex-direction: column;
          gap: 24px;
        }

        .matrix-demo__h1 {
          font-family: var(--font-geist-sans), system-ui, sans-serif;
          font-weight: 500;
          font-size: clamp(24px, 3vw, 32px);
          line-height: 1.15;
          letter-spacing: -0.022em;
          color: var(--ink-1);
          margin: 0;
        }

        .matrix-demo__meta {
          margin: 0;
          font-size: 15px;
          line-height: 1.6;
          color: var(--ink-2);
          padding-left: 14px;
          border-left: 2px solid var(--copper);
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

        .matrix-demo__faq {
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
        .matrix-demo__interlinks li {
          font-family: var(--font-geist-sans), system-ui, sans-serif;
          font-size: 13.5px;
          color: var(--copper);
          padding: 4px 0;
          border-bottom: 1px dashed var(--border-subtle);
        }

        .matrix-demo__jsonld {
          display: flex;
          flex-direction: column;
          gap: 8px;
          /* clip-path is the animated property; baseline state covers the
             full block when reduced-motion bypasses the variant */
        }
        .matrix-demo__jsonld pre {
          margin: 0;
          padding: 16px 18px;
          background: #0c1f3d;
          color: #e8eef6;
          border-radius: 8px;
          overflow: auto;
          max-height: 280px;
          font-family: var(--font-geist-mono), ui-monospace, monospace;
          font-size: 12px;
          line-height: 1.55;
        }
        .matrix-demo__jsonld code {
          font-family: inherit;
        }

        .matrix-demo__sweep {
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
