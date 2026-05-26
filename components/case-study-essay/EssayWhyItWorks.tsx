import type { Project } from "@/lib/projects";
import EssayReveal from "./EssayReveal";
import styles from "./EssayWhyItWorks.module.css";

type Props = {
  project: Project;
};

export default function EssayWhyItWorks({ project }: Props) {
  return (
    <section id="essay-why" className={styles.root}>
      <div className="section-wrap">
        <EssayReveal>
          <div className="section-tag" aria-label="Section 06 — Why It Works">
            <span className="num">06</span>
            <span className="label">Why It Works</span>
          </div>

          <h2 className={`editorial-h2 ${styles.heading}`}>
            How the build<br />
            <em>earns the call.</em>
          </h2>
        </EssayReveal>

        <div className={styles.layout}>
          {/* Left column: seoConversion */}
          <EssayReveal className={styles.col}>
            <div className={styles.colLabel}>Search architecture</div>
            <p className={styles.body}>{project.seoConversion}</p>
          </EssayReveal>

          {/* Right column: businessValue */}
          <EssayReveal delay={120} className={styles.col}>
            <div className={styles.colLabel}>Business value</div>
            <p className={styles.body}>{project.businessValue}</p>
          </EssayReveal>
        </div>

        {/* Pull-quote interstitial */}
        <EssayReveal delay={60} className={styles.pullquoteWrap}>
          <div className={styles.pullquoteDivider} aria-hidden />
          <blockquote className={styles.pullquote}>
            <span className={styles.pullquoteMark} aria-hidden>&ldquo;</span>
            {project.valueExplainer}
            <cite className={styles.pullquoteCite}>Studio rationale</cite>
          </blockquote>
          <div className={styles.pullquoteDivider} aria-hidden />
        </EssayReveal>
      </div>
    </section>
  );
}
