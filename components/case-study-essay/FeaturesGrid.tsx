import EssayReveal from "./EssayReveal";
import styles from "./FeaturesGrid.module.css";

type Props = {
  features: string[];
  whatIBuilt: string;
};

/**
 * Features grid — designed objects, not a flat bullet list.
 * 3-column numbered grid with Fraunces first words and mono indexing.
 */
export default function FeaturesGrid({ features, whatIBuilt }: Props) {
  return (
    <section id="essay-features" className={styles.root}>
      <div className="section-wrap">
        <EssayReveal>
          <div className="section-tag" aria-label="Section 04 — What Was Built">
            <span className="num">04</span>
            <span className="label">What Was Built</span>
          </div>

          <h2 className={`editorial-h2 ${styles.heading}`}>
            The deliverables,<br />
            <em>line by line.</em>
          </h2>

          <p className={styles.intro}>{whatIBuilt}</p>
        </EssayReveal>

        <EssayReveal delay={80} className={styles.grid}>
          {features.map((feature, i) => {
            // Split first fragment (before " — " or first comma or just first 3 words)
            const titleEnd = feature.indexOf(" — ") !== -1
              ? feature.indexOf(" — ")
              : feature.indexOf(",") !== -1
                ? feature.indexOf(",")
                : feature.split(" ").slice(0, 4).join(" ").length;

            const title = feature.slice(0, titleEnd);
            const detail = feature.slice(titleEnd).replace(/^[ —,]+/, "");

            return (
              <div key={i} className={styles.card}>
                <div className={styles.cardNum}>
                  {String(i + 1).padStart(2, "0")}
                </div>
                <h3 className={styles.cardTitle}>{title}</h3>
                {detail ? (
                  <p className={styles.cardDetail}>{detail}</p>
                ) : null}
              </div>
            );
          })}
        </EssayReveal>
      </div>
    </section>
  );
}
