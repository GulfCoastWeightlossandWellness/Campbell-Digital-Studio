import type { Project } from "@/lib/projects";
import EssayReveal from "./EssayReveal";
import styles from "./EssayBrief.module.css";

type Props = {
  project: Project;
};

export default function EssayBrief({ project }: Props) {
  return (
    <section id="essay-brief" className={styles.root}>
      <div className="section-wrap">
        {/* Section tag */}
        <div className="section-tag" aria-label="Section 02 — The Brief">
          <span className="num">02</span>
          <span className="label">The Brief</span>
        </div>

        <div className={styles.layout}>
          {/* Reading column */}
          <EssayReveal className={styles.essay}>
            <h2 className={`editorial-h2 ${styles.heading}`}>
              What the project<br />
              <em>needed to do.</em>
            </h2>

            {/* Drop-cap first paragraph */}
            <div className={styles.body}>
              <p className={styles.dropCapPara}>{project.summary}</p>
              <p>{project.challenge}</p>
            </div>
          </EssayReveal>

          {/* Side callout */}
          <EssayReveal delay={120} className={styles.aside}>
            <div className={styles.asideInner}>
              <span className={styles.asideLabel}>Studio rationale</span>
              <blockquote className={styles.asideQuote}>
                <span className={styles.asideQuoteMark} aria-hidden>&ldquo;</span>
                {project.valuePoints[0]}
              </blockquote>
              <div className={styles.asideDivider} />
              <p className={styles.asideDetail}>{project.valuePoints[1]}</p>
            </div>
          </EssayReveal>
        </div>
      </div>
    </section>
  );
}
