import type { MetaGridCell } from "@/lib/projects";
import EssayReveal from "./EssayReveal";
import styles from "./EssayOutcome.module.css";

type Props = {
  metaGrid: MetaGridCell[];
};

export default function EssayOutcome({ metaGrid }: Props) {
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

          {/* Extra outcome cells — hardcoded context from the project */}
          <div className={styles.dataCell}>
            <div className={styles.cellSep} aria-hidden />
            <div className={styles.cellLabel}>Pages at launch</div>
            <div className={styles.cellValue}>210+</div>
          </div>
          <div className={styles.dataCell}>
            <div className={styles.cellSep} aria-hidden />
            <div className={styles.cellLabel}>Interactive tools</div>
            <div className={styles.cellValue}>4</div>
          </div>
          <div className={styles.dataCell}>
            <div className={styles.cellSep} aria-hidden />
            <div className={styles.cellLabel}>Schema types</div>
            <div className={styles.cellValue}>9</div>
          </div>
          <div className={styles.dataCell}>
            <div className={styles.cellSep} aria-hidden />
            <div className={styles.cellLabel}>Cities covered</div>
            <div className={styles.cellValue}>21</div>
          </div>
        </EssayReveal>

        {/* Measurement note */}
        <EssayReveal delay={120} className={styles.measureNote}>
          <p className={styles.noteText}>
            Tracking dashboard captures GSC + GA4 at 30 / 60 / 90 days.
            Report publishes here on day 90 — the platform shipped May 2026.
          </p>
        </EssayReveal>
      </div>
    </section>
  );
}
