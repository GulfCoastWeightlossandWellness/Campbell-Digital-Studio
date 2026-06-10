import type { MetaGridCell } from "@/lib/projects";
import EssayReveal from "./EssayReveal";
import styles from "./EssayOutcome.module.css";

/**
 * Pro 1 Painters variant of EssayOutcome.
 *
 * The shared EssayOutcome appends Air-Solutions-specific extra cells
 * (210+ pages, 4 tools, 9 schema types, 21 cities) and an Air-Solutions
 * "shipped May 2026" measurement note — all wrong for Pro 1. This variant
 * keeps the registry-driven metaGrid cells and swaps the hardcoded extras
 * for Pro-1-verified facts. The shared component is left untouched.
 *
 * Outcome metrics (rankings/traffic/leads) are NOT yet measured → the note
 * frames the measurement window as open, never an invented number.
 */

type Props = {
  metaGrid: MetaGridCell[];
};

export default function EssayOutcomePro1({ metaGrid }: Props) {
  return (
    <section id="essay-outcome" className={styles.root}>
      <div className="section-wrap">
        <EssayReveal>
          <div className="section-tag" aria-label="Section 07 — Outcome">
            <span className="num">07</span>
            <span className="label">Outcome</span>
          </div>

          <h2 className={`editorial-h2 ${styles.heading}`}>
            Project at<br />
            <em>a glance.</em>
          </h2>
        </EssayReveal>

        {/* Refined data grid */}
        <EssayReveal delay={80} className={styles.dataGrid}>
          {metaGrid.map((cell, i) => (
            <div key={i} className={styles.dataCell}>
              <div className={styles.cellSep} aria-hidden />
              <div className={styles.cellLabel}>{cell.label}</div>
              <div className={styles.cellValue}>{cell.value}</div>
            </div>
          ))}

          {/* Extra outcome cells — Pro 1 verified facts */}
          <div className={styles.dataCell}>
            <div className={styles.cellSep} aria-hidden />
            <div className={styles.cellLabel}>Live pages</div>
            <div className={styles.cellValue}>424</div>
          </div>
          <div className={styles.dataCell}>
            <div className={styles.cellSep} aria-hidden />
            <div className={styles.cellLabel}>Flagship tool</div>
            <div className={styles.cellValue}>AI Color Visualizer</div>
          </div>
          <div className={styles.dataCell}>
            <div className={styles.cellSep} aria-hidden />
            <div className={styles.cellLabel}>Service lines</div>
            <div className={styles.cellValue}>4</div>
          </div>
          <div className={styles.dataCell}>
            <div className={styles.cellSep} aria-hidden />
            <div className={styles.cellLabel}>Metros covered</div>
            <div className={styles.cellValue}>2</div>
          </div>
        </EssayReveal>

        {/* Measurement note — window open, no invented metrics */}
        <EssayReveal delay={120} className={styles.measureNote}>
          <p className={styles.noteText}>
            Live on pro1painters.com since the June 2026 WordPress → Next.js
            cutover. Tracking dashboard captures GSC + GA4 across both metros;
            the measurement window is open and the 30 / 60 / 90-day report
            publishes here.
          </p>
        </EssayReveal>
      </div>
    </section>
  );
}
