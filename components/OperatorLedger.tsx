import type { CSSProperties } from "react";
import { readLedger, type LedgerData } from "@/app/api/studio-pulse/route";
import { getLeadStats, leadStatsFloor } from "@/lib/lead-stats";

/**
 * Operator's Ledger — CDS signature visual element.
 *
 * Horizontal navy band, mono tabular data in gold-on-navy. Single
 * pulsing dot on the LIVE indicator. Server-rendered, zero JS, single
 * CSS @keyframes (GPU-only transform).
 *
 * Drop-in:
 *   <OperatorLedger />                   // reads data/ledger.json
 *   <OperatorLedger data={overrideData}/> // pass pre-fetched data
 *
 * Mount points (handled by orchestrator):
 *   - Above the footer on every page
 *   - Between sections on the homepage
 *   - At the footer of each case study
 *
 * Spec ref: cds-redesign-proposal-2026-05-22.md § 7.
 */

type Props = {
  data?: LedgerData;
};

type Cell = {
  label: string;
  value: string;
  isLive?: boolean;
};

function buildCells(data: LedgerData, leadCount: number | null): Cell[] {
  const cells: Cell[] = [
    { label: "Sites Shipped", value: String(data.sites_shipped) },
    { label: "Lighthouse", value: data.lighthouse_score },
    { label: "Last Deploy", value: data.last_deploy },
    { label: "Active Retainers", value: String(data.active_retainers) },
    { label: "Uptime", value: data.uptime },
  ];
  // Live client-form counter — every lead captured in the last 30 days across
  // the fleet's live store, AI Color Visualizer submissions included. Shown
  // only once it clears the floor so the ledger never displays a thin number.
  if (leadCount !== null) {
    cells.push({ label: "Forms (30d)", value: String(leadCount) });
  }
  cells.push({ label: data.live ? "Live" : "Offline", value: "", isLive: true });
  return cells;
}

export default async function OperatorLedger({ data }: Props = {}) {
  const ledger = data ?? (await readLedger());
  const leads = await getLeadStats(30);
  const leadCount =
    leads.configured && leads.count >= leadStatsFloor() ? leads.count : null;
  const cells = buildCells(ledger, leadCount);

  return (
    <aside
      className="operator-ledger"
      aria-label="Campbell Digital Studio operator's ledger"
    >
      <div
        className="operator-ledger__row"
        style={{ "--cols": String(cells.length) } as unknown as CSSProperties}
      >
        {cells.map((cell) => (
          <div
            key={cell.label}
            className={`operator-ledger__cell${cell.isLive ? " operator-ledger__cell--live" : ""}`}
          >
            {cell.isLive ? (
              <span className="operator-ledger__live-value">
                <span className="operator-ledger__dot" aria-hidden="true" />
                <span className="operator-ledger__live-label">{cell.label}</span>
              </span>
            ) : (
              <>
                <span className="operator-ledger__label">{cell.label}</span>
                <span className="operator-ledger__value">{cell.value}</span>
              </>
            )}
          </div>
        ))}
      </div>

      {/* Scoped styles — single @keyframes, GPU-only opacity. */}
      <style>{`
        .operator-ledger {
          width: 100%;
          background: var(--navy-900);
          padding: 14px 24px;
          font-family: "JetBrains Mono", var(--font-geist-mono), ui-monospace, monospace;
          font-variant-numeric: tabular-nums;
        }
        .operator-ledger__row {
          display: grid;
          grid-template-columns: repeat(var(--cols, 6), 1fr);
          gap: 24px;
          align-items: start;
          max-width: 1280px;
          margin: 0 auto;
        }
        .operator-ledger__cell {
          display: flex;
          flex-direction: column;
          gap: 4px;
          min-width: 0;
        }
        .operator-ledger__cell--live {
          align-items: flex-end;
        }
        .operator-ledger__label {
          font-size: 10px;
          line-height: 1.2;
          letter-spacing: 0.15em;
          text-transform: uppercase;
          color: rgba(232, 196, 107, 0.6);
        }
        .operator-ledger__value {
          font-size: 14px;
          line-height: 1.2;
          color: var(--gold-500);
        }
        .operator-ledger__live-value {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          font-size: 10px;
          letter-spacing: 0.15em;
          text-transform: uppercase;
          color: var(--gold-500);
        }
        .operator-ledger__live-label {
          line-height: 1.2;
        }
        .operator-ledger__dot {
          width: 8px;
          height: 8px;
          border-radius: 50%;
          background: var(--gold-500);
          display: inline-block;
          will-change: opacity;
          animation: operator-ledger-pulse 2s ease-in-out infinite;
        }
        @keyframes operator-ledger-pulse {
          0%, 100% { opacity: 1; }
          50%      { opacity: 0.45; }
        }
        @media (prefers-reduced-motion: reduce) {
          .operator-ledger__dot { animation: none; }
        }
        @media (max-width: 720px) {
          .operator-ledger {
            padding: 14px 16px;
          }
          .operator-ledger__row {
            grid-template-columns: repeat(3, 1fr);
            column-gap: 12px;
            row-gap: 14px;
          }
          /* Reserve 2 label-lines on every standard cell so the value
             baselines align across all three columns in a row, even when
             only one label happens to wrap. */
          .operator-ledger__label {
            min-height: 2.4em;
            display: block;
          }
          .operator-ledger__cell--live {
            align-items: flex-start;
          }
          /* Reserve the same vertical space the standard cells use for
             their label slot — keeps the LIVE indicator on the same
             baseline as the values in its row instead of floating high. */
          .operator-ledger__cell--live::before {
            content: "";
            display: block;
            min-height: 2.4em;
            font-size: 10px;
            line-height: 1.2;
          }
          .operator-ledger__cell--live .operator-ledger__live-value {
            font-size: 14px;
            letter-spacing: 0.08em;
            text-transform: uppercase;
            gap: 6px;
            color: var(--gold-500);
          }
          .operator-ledger__cell--live .operator-ledger__live-label {
            font-size: 14px;
            line-height: 1.2;
          }
        }
        @media (max-width: 360px) {
          .operator-ledger {
            padding: 14px 12px;
          }
          .operator-ledger__row {
            column-gap: 10px;
          }
        }
      `}</style>
    </aside>
  );
}
