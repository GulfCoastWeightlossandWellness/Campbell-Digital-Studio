import type { ReactNode } from "react";

/**
 * HeroCurve — process-arc centerpiece for the home hero.
 *
 * Visualizes the studio's 5-step engagement (the same content as the §05 Process
 * section, surfaced earlier). Borrows the *form* of the growth-curve pattern
 * common to product landing pages, but stays on-system: gold gradient stroke
 * (no SaaS purple/pink), Fraunces labels, mono index numerals, dotted gold
 * connector ticks. No animation by default — prefers-reduced-motion is honored
 * globally via globals.css.
 *
 * Renders as a single inline SVG on desktop. On viewports ≤ 720px, the SVG hides
 * and the same five stops render as a vertical timeline (left rule + labels).
 */

type Stop = {
  num: string;
  title: string;
  body: string;
  /** SVG-coordinate position of the dot on the curve; also drives label x% */
  dot: { x: number; y: number };
};

// Curve dot positions — eyeballed to sit on the bezier path below.
// These x-values also drive the absolute-positioned label centers underneath.
const stops: Stop[] = [
  { num: "01", title: "Discovery", body: "A 30-minute call. No deck, no pressure.",          dot: { x: 120,  y: 290 } },
  { num: "02", title: "Scope",     body: "Written proposal, fixed fee, clear timeline.",     dot: { x: 360,  y: 282 } },
  { num: "03", title: "Build",     body: "4–12 weeks. Direct access. Weekly previews.",      dot: { x: 600,  y: 240 } },
  { num: "04", title: "Launch",    body: "Production deploy. 30-day post-launch window.",    dot: { x: 840,  y: 165 } },
  { num: "05", title: "Ongoing",   body: "Optional retainer, no commitment to launch.",      dot: { x: 1080, y:  60 } },
];

// Single cubic bezier from the first dot to the last; visually passes near the
// middle three. Tuned so the curve stays flat early and accelerates upward.
const curvePath = "M 120 290 C 380 305, 700 220, 1080 60";

// SVG viewBox — width 1200 for percent-mapping, height 320 for label headroom.
const viewBoxW = 1200;
const viewBoxH = 320;

export default function HeroCurve(): ReactNode {
  return (
    <div className="hero-curve">
      <svg
        viewBox={`0 0 ${viewBoxW} ${viewBoxH}`}
        preserveAspectRatio="xMidYMid meet"
        role="img"
        aria-label="Five-step engagement process: Discovery, Scope, Build, Launch, Ongoing."
        className="hero-curve-svg"
      >
        <defs>
          <linearGradient id="curve-grad" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="var(--gold-700)" stopOpacity="0.45" />
            <stop offset="35%" stopColor="var(--gold-600)" />
            <stop offset="100%" stopColor="var(--gold-400)" />
          </linearGradient>
          <pattern id="hero-grid" x="0" y="0" width="60" height="60" patternUnits="userSpaceOnUse">
            <path d="M 60 0 L 0 0 L 0 60" fill="none" stroke="rgba(232,196,107,0.06)" strokeWidth="1" />
          </pattern>
        </defs>

        {/* Subtle grid */}
        <rect x="0" y="0" width={viewBoxW} height={viewBoxH} fill="url(#hero-grid)" />

        {/* Dotted vertical ticks from each dot down toward the bottom edge */}
        {stops.map((s) => (
          <line
            key={`tick-${s.num}`}
            x1={s.dot.x}
            y1={s.dot.y + 10}
            x2={s.dot.x}
            y2={viewBoxH - 10}
            stroke="rgba(232,196,107,0.22)"
            strokeWidth="1"
            strokeDasharray="2 5"
          />
        ))}

        {/* The curve */}
        <path
          d={curvePath}
          fill="none"
          stroke="url(#curve-grad)"
          strokeWidth="2.5"
          strokeLinecap="round"
        />

        {/* Dots — navy fill against the cover-surface so the gold ring reads */}
        {stops.map((s) => (
          <circle
            key={`dot-${s.num}`}
            cx={s.dot.x}
            cy={s.dot.y}
            r="6"
            fill="var(--navy-900)"
            stroke="var(--gold-400)"
            strokeWidth="2"
          />
        ))}
      </svg>

      {/* Labels — absolute-positioned under each dot's x-coordinate as a percentage of viewBox width */}
      <div className="hero-curve-stops" aria-hidden>
        {stops.map((s) => (
          <div
            key={`label-${s.num}`}
            className="hero-curve-stop"
            style={{ left: `${(s.dot.x / viewBoxW) * 100}%` }}
          >
            <span className="num">{s.num}</span>
            <span className="title">{s.title}</span>
            <span className="body">{s.body}</span>
          </div>
        ))}
      </div>

      {/* Mobile timeline — only visible on ≤ 720px */}
      <ol className="hero-curve-timeline">
        {stops.map((s) => (
          <li key={`mobile-${s.num}`}>
            <span className="num">{s.num}</span>
            <span className="title">{s.title}</span>
            <span className="body">{s.body}</span>
          </li>
        ))}
      </ol>

      <style>{`
        .hero-curve {
          position: relative;
          width: 100%;
        }
        .hero-curve-svg {
          width: 100%;
          height: auto;
          display: block;
        }
        .hero-curve-stops {
          position: relative;
          height: 100px;
          margin-top: 8px;
        }
        .hero-curve-stop {
          position: absolute;
          top: 0;
          transform: translateX(-50%);
          width: 160px;
          max-width: 22vw;
          text-align: center;
          color: rgba(255,255,255,0.85);
        }
        .hero-curve-stop .num {
          font-family: var(--font-jetbrains), monospace;
          font-size: 10px;
          font-weight: 600;
          letter-spacing: 0.2em;
          color: var(--gold-400);
          display: block;
          margin-bottom: 6px;
        }
        .hero-curve-stop .title {
          font-family: var(--font-fraunces), Georgia, serif;
          font-size: 18px;
          font-weight: 500;
          color: white;
          letter-spacing: -0.012em;
          font-variation-settings: "opsz" 96;
          display: block;
          margin-bottom: 6px;
          line-height: 1.2;
        }
        .hero-curve-stop .body {
          font-family: var(--font-manrope), sans-serif;
          font-size: 12px;
          line-height: 1.5;
          color: rgba(255,255,255,0.65);
          display: block;
          font-weight: 300;
        }

        /* Mobile timeline hidden by default */
        .hero-curve-timeline {
          display: none;
          list-style: none;
          padding: 0;
          margin: 0;
        }

        @media (max-width: 720px) {
          .hero-curve-svg,
          .hero-curve-stops {
            display: none;
          }
          .hero-curve-timeline {
            display: flex;
            flex-direction: column;
            gap: 0;
            margin-top: 24px;
          }
          .hero-curve-timeline li {
            position: relative;
            display: grid;
            grid-template-columns: 36px 1fr;
            gap: 0 16px;
            padding: 14px 0;
            border-top: 1px solid rgba(232,196,107,0.18);
          }
          .hero-curve-timeline li:last-child {
            border-bottom: 1px solid rgba(232,196,107,0.18);
          }
          .hero-curve-timeline .num {
            font-family: var(--font-jetbrains), monospace;
            font-size: 11px;
            font-weight: 600;
            letter-spacing: 0.2em;
            color: var(--gold-400);
            line-height: 1.5;
          }
          .hero-curve-timeline .title {
            font-family: var(--font-fraunces), Georgia, serif;
            font-size: 18px;
            font-weight: 500;
            color: white;
            line-height: 1.2;
            font-variation-settings: "opsz" 96;
            margin-bottom: 4px;
            display: block;
          }
          .hero-curve-timeline .body {
            font-family: var(--font-manrope), sans-serif;
            font-size: 13px;
            line-height: 1.55;
            color: rgba(255,255,255,0.7);
            display: block;
          }
        }
      `}</style>
    </div>
  );
}
