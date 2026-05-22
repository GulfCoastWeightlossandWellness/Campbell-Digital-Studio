import { readLedger, type LedgerData } from "@/app/api/studio-pulse/route";

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

function buildCells(data: LedgerData): Cell[] {
  return [
    { label: "Sites Shipped", value: String(data.sites_shipped) },
    { label: "Lighthouse", value: data.lighthouse_score },
    { label: "Last Deploy", value: data.last_deploy },
    { label: "Active Retainers", value: String(data.active_retainers) },
    { label: "Uptime", value: data.uptime },
    { label: data.live ? "Live" : "Offline", value: "", isLive: true },
  ];
}

export default async function OperatorLedger({ data }: Props = {}) {
  const ledger = data ?? (await readLedger());
  const cells = buildCells(ledger);

  return (
    <aside
      className="operator-ledger"
      aria-label="Campbell Digital Studio operator's ledger"
    >
      <div className="operator-ledger__row">
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
          grid-template-columns: repeat(6, 1fr);
          gap: 24px;
          align-items: center;
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
          .operator-ledger__row {
            grid-template-columns: repeat(3, 1fr);
            row-gap: 16px;
          }
          .operator-ledger__cell--live {
            align-items: flex-start;
          }
        }
      `}</style>
    </aside>
  );
}
