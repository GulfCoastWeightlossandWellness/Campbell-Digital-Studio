/**
 * ResultCharts — code-rendered, honest, mobile-first result visuals for the
 * ACExperts flagship case study. Built from the research synthesis:
 *   - zero-baseline (never truncate); precise jagged numbers, never rounded
 *   - one accent color, gray context; annotate the story, not every point
 *   - end every visual on the dollar outcome
 *   - distinguish ranks by shape + badge, not hue alone (a11y)
 *   - readable at 360px; no hover-only tooltips
 *
 * Server components (no interactivity). Colors use the site's CSS variables so
 * they track the theme automatically.
 */

import type { CSSProperties } from "react";

const MONO = "var(--font-geist-mono), ui-monospace, monospace";
const SANS = "var(--font-geist-sans), system-ui, sans-serif";

const labelStyle: CSSProperties = {
  fontFamily: MONO,
  fontSize: 11,
  letterSpacing: "0.14em",
  textTransform: "uppercase",
  color: "var(--ink-3)",
};

/* ────────────────────────────────────────────────────────────────────────
 * 1. ImpressionRamp — the hero growth curve (annotated, zero-baseline)
 *    Weekly Google impressions, first 7 weeks. 37 → 15,484.
 * ──────────────────────────────────────────────────────────────────────── */

const RAMP = [
  { wk: "Wk 1", v: 37 },
  { wk: "Wk 2", v: 63 },
  { wk: "Wk 3", v: 1738 },
  { wk: "Wk 4", v: 1494 },
  { wk: "Wk 5", v: 6595 },
  { wk: "Wk 6", v: 15552 },
  { wk: "Wk 7", v: 15484 },
];

export function ImpressionRamp() {
  const W = 760;
  const H = 420;
  const padL = 56;
  const padR = 30;
  const padT = 84;
  const padB = 52;
  const innerW = W - padL - padR;
  const innerH = H - padT - padB;
  const baseY = padT + innerH;
  const maxY = 16000;
  const n = RAMP.length;

  const x = (i: number) => padL + (i * innerW) / (n - 1);
  const y = (v: number) => padT + innerH * (1 - v / maxY);

  const pts = RAMP.map((d, i) => ({ ...d, cx: x(i), cy: y(d.v) }));
  const linePath = "M " + pts.map((p) => `${p.cx.toFixed(1)},${p.cy.toFixed(1)}`).join(" L ");
  const areaPath =
    `M ${x(0).toFixed(1)},${baseY} ` +
    pts.map((p) => `L ${p.cx.toFixed(1)},${p.cy.toFixed(1)}`).join(" ") +
    ` L ${x(n - 1).toFixed(1)},${baseY} Z`;
  const grid = [0, 4000, 8000, 12000, 16000];

  const last = pts[n - 1];
  const idx = pts[2]; // wk3 inflection

  return (
    <figure style={{ margin: 0 }}>
      <svg
        viewBox={`0 0 ${W} ${H}`}
        width="100%"
        role="img"
        aria-label="Weekly Google impressions over the first seven weeks, rising from 37 in week one to 15,484 in week seven. The site launched in week one and a $8,500 job was booked in week seven."
        style={{ display: "block", maxWidth: "100%", overflow: "visible" }}
      >
        {/* gridlines + y labels */}
        {grid.map((g) => (
          <g key={g}>
            <line
              x1={padL}
              x2={W - padR}
              y1={y(g)}
              y2={y(g)}
              stroke="var(--border-subtle)"
              strokeWidth={1}
            />
            <text x={padL - 8} y={y(g) + 4} textAnchor="end" fontFamily={MONO} fontSize={10} fill="var(--ink-4)">
              {g >= 1000 ? `${g / 1000}k` : g}
            </text>
          </g>
        ))}

        {/* area + line */}
        <path d={areaPath} fill="var(--copper)" fillOpacity={0.1} />
        <path d={linePath} fill="none" stroke="var(--copper)" strokeWidth={2.5} strokeLinejoin="round" strokeLinecap="round" />

        {/* dots */}
        {pts.map((p, i) => (
          <circle
            key={p.wk}
            cx={p.cx}
            cy={p.cy}
            r={i === n - 1 ? 6 : 3.5}
            fill={i === n - 1 ? "var(--gold-300, #e8c46b)" : "var(--copper)"}
            stroke="var(--surface)"
            strokeWidth={i === n - 1 ? 2 : 1}
          />
        ))}

        {/* x labels */}
        {pts.map((p) => (
          <text key={p.wk} x={p.cx} y={baseY + 20} textAnchor="middle" fontFamily={MONO} fontSize={10} fill="var(--ink-3)">
            {p.wk}
          </text>
        ))}
        <text x={x(0)} y={baseY + 36} textAnchor="middle" fontFamily={MONO} fontSize={9} fill="var(--copper)">
          Launch · Apr 22
        </text>

        {/* endpoint value labels */}
        <text x={x(0) + 6} y={y(37) - 8} textAnchor="start" fontFamily={MONO} fontSize={10} fill="var(--ink-3)">
          37
        </text>
        <text x={last.cx - 10} y={last.cy + 4} textAnchor="end" fontFamily={SANS} fontSize={13} fontWeight={700} fill="var(--ink-1)">
          15,484/wk
        </text>

        {/* wk3 inflection annotation */}
        <line x1={idx.cx} y1={idx.cy - 6} x2={idx.cx - 70} y2={idx.cy - 34} stroke="var(--ink-4)" strokeWidth={1} />
        <text x={idx.cx - 74} y={idx.cy - 38} textAnchor="end" fontFamily={MONO} fontSize={10} fill="var(--ink-3)">
          Pages start indexing
        </text>

        {/* $8,500 callout box → wk7 dot */}
        <line x1={last.cx} y1={last.cy - 6} x2={W - padR - 4} y2={42} stroke="var(--gold-300, #e8c46b)" strokeWidth={1.25} />
        <g>
          <rect
            x={W - padR - 232}
            y={26}
            width={232}
            height={34}
            rx={6}
            fill="var(--gold-300, #e8c46b)"
            fillOpacity={0.16}
            stroke="var(--gold-300, #e8c46b)"
            strokeWidth={1}
          />
          <text
            x={W - padR - 232 + 14}
            y={47}
            textAnchor="start"
            fontFamily={SANS}
            fontSize={13}
            fontWeight={700}
            fill="var(--ink-1)"
          >
            Week 7 — $8,500 job booked
          </text>
        </g>
      </svg>
      <figcaption style={{ ...labelStyle, marginTop: 14, color: "var(--ink-3)", textTransform: "none", letterSpacing: "0.02em" }}>
        Weekly Google impressions, first 7 weeks (Apr 22 – Jun 9). Cumulative to date: 44,759 impressions
        (Apr 22 – Jun 11). Source: Google Search Console.
      </figcaption>
    </figure>
  );
}

/* ────────────────────────────────────────────────────────────────────────
 * 2. ConversionFunnel — reach → value, ending on the $8,500 job
 * ──────────────────────────────────────────────────────────────────────── */

const FUNNEL = [
  { label: "Google impressions", value: "44,759", width: "100%", note: "Reach — Apr 22–Jun 11" },
  { label: "Google Business Profile views", value: "304", width: "72%", note: undefined },
  { label: "Customer actions (calls · directions · clicks)", value: "78", width: "48%", note: "26% of profile viewers took action" },
  { label: "Booked job", value: "$8,500", width: "34%", note: "From one website form lead", money: true },
];

export function ConversionFunnel() {
  return (
    <div role="img" aria-label="Conversion funnel: 44,759 Google impressions to 304 Business Profile views to 78 customer actions to one booked job worth $8,500." style={{ display: "flex", flexDirection: "column", gap: 10 }}>
      {FUNNEL.map((s) => (
        <div key={s.label} style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
          <div
            style={{
              width: s.width,
              minWidth: 260,
              background: s.money ? "var(--gold-300, #e8c46b)" : "var(--panel)",
              border: `1px solid ${s.money ? "var(--gold-300, #e8c46b)" : "var(--border-default)"}`,
              borderRadius: 8,
              padding: s.money ? "20px 24px" : "16px 24px",
              display: "flex",
              alignItems: "baseline",
              justifyContent: "space-between",
              gap: 16,
              boxShadow: s.money ? "0 4px 24px rgba(232,196,107,0.18)" : "none",
            }}
          >
            <span style={{ fontFamily: SANS, fontSize: s.money ? 14 : 13, color: s.money ? "var(--navy-900, #08172e)" : "var(--ink-2)", fontWeight: s.money ? 600 : 400 }}>
              {s.label}
            </span>
            <span
              style={{
                fontFamily: SANS,
                fontSize: s.money ? 30 : 22,
                fontWeight: 700,
                letterSpacing: "-0.02em",
                color: s.money ? "var(--navy-900, #08172e)" : "var(--ink-1)",
                whiteSpace: "nowrap",
              }}
            >
              {s.value}
            </span>
          </div>
          {s.note ? (
            <div style={{ ...labelStyle, marginTop: 6, textTransform: "none", letterSpacing: "0.02em", fontSize: 11 }}>{s.note}</div>
          ) : null}
        </div>
      ))}
    </div>
  );
}

/* ────────────────────────────────────────────────────────────────────────
 * 3. LocalPackScorecard — 6 cities, rank by badge (shape + text, not hue)
 * ──────────────────────────────────────────────────────────────────────── */

const PACK = [
  { city: "Robertsdale", rank: 1 },
  { city: "Lillian", rank: 1 },
  { city: "Stockton", rank: 1 },
  { city: "Rosinton", rank: 1 },
  { city: "Silverhill", rank: 2 },
  { city: "Summerdale", rank: 3 },
];

function RankBadge({ rank }: { rank: number }) {
  const first = rank === 1;
  return (
    <span
      aria-label={`Rank number ${rank}`}
      style={{
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
        minWidth: 40,
        height: 28,
        padding: "0 10px",
        borderRadius: 999,
        fontFamily: SANS,
        fontSize: 14,
        fontWeight: 700,
        background: first ? "var(--gold-300, #e8c46b)" : "transparent",
        color: first ? "var(--navy-900, #08172e)" : "var(--ink-1)",
        border: first ? "1px solid var(--gold-300, #e8c46b)" : "1px solid var(--border-default)",
      }}
    >
      #{rank}
    </span>
  );
}

export function LocalPackScorecard() {
  return (
    <div role="table" aria-label="Google local map-pack rankings across six Baldwin County cities" style={{ display: "flex", flexDirection: "column", gap: 1, background: "var(--border-subtle)", border: "1px solid var(--border-subtle)", borderRadius: 8, overflow: "hidden" }}>
      {PACK.map((p) => (
        <div
          key={p.city}
          role="row"
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            gap: 16,
            padding: "14px 18px",
            background: "var(--surface)",
          }}
        >
          <span style={{ fontFamily: SANS, fontSize: 16, color: "var(--ink-1)", fontWeight: 500 }}>{p.city}, AL</span>
          <RankBadge rank={p.rank} />
        </div>
      ))}
    </div>
  );
}

/* ────────────────────────────────────────────────────────────────────────
 * 4. IndexingStat — big number + one honest progress bar (no pie)
 * ──────────────────────────────────────────────────────────────────────── */

export function IndexingStat() {
  const pct = (215 / 274) * 100;
  return (
    <div>
      <div style={{ display: "flex", alignItems: "baseline", gap: 12 }}>
        <span style={{ fontFamily: SANS, fontSize: "clamp(44px, 7vw, 64px)", fontWeight: 700, letterSpacing: "-0.03em", color: "var(--ink-1)", lineHeight: 1 }}>
          78%
        </span>
        <span style={{ fontFamily: SANS, fontSize: 16, color: "var(--ink-2)" }}>of the site indexed by Google</span>
      </div>
      <div
        role="img"
        aria-label="215 of 274 pages indexed, about 78 percent"
        style={{ marginTop: 18, height: 12, width: "100%", background: "var(--panel)", border: "1px solid var(--border-default)", borderRadius: 999, overflow: "hidden" }}
      >
        <div style={{ height: "100%", width: `${pct}%`, background: "var(--copper)", borderRadius: 999 }} />
      </div>
      <div style={{ ...labelStyle, marginTop: 10, textTransform: "none", letterSpacing: "0.02em", fontSize: 12 }}>
        215 of 274 pages indexed · only 7 quality-rejected · GSC, 2026-06-13
      </div>
    </div>
  );
}
