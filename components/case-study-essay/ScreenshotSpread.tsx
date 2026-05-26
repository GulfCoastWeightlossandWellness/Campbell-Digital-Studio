import Image from "next/image";
import type { Screenshot } from "@/lib/projects";
import EssayReveal from "./EssayReveal";
import styles from "./ScreenshotSpread.module.css";

type Props = {
  screenshots: Screenshot[];
};

const ROTATIONS = ["-0.4deg", "0.3deg", "-0.5deg", "0.4deg", "-0.3deg", "0.5deg"];
const INSET_INDICES = new Set([1, 3, 5, 7, 10]);  // alternating inset treatment

export default function ScreenshotSpread({ screenshots }: Props) {
  return (
    <section id="essay-screenshots" className={styles.root}>
      <div className="section-wrap">
        <EssayReveal>
          <div className="section-tag" aria-label="Section 05 — Selected Screens">
            <span className="num">05</span>
            <span className="label">Selected Screens</span>
          </div>

          <h2 className={`editorial-h2 ${styles.heading}`}>
            What it looks like,<br />
            <em>on screen.</em>
          </h2>
        </EssayReveal>
      </div>

      <div className={styles.spread}>
        {screenshots.map((shot, i) => {
          const isInset = INSET_INDICES.has(i);
          const rot = ROTATIONS[i % ROTATIONS.length];
          const figNum = String(i + 2).padStart(2, "0");

          return (
            <EssayReveal
              key={shot.src}
              delay={Math.min(i * 60, 300)}
              className={`${styles.figureWrap} ${isInset ? styles.inset : styles.full}`}
            >
              <figure className={styles.figure} style={{ "--rot": rot } as React.CSSProperties}>
                <div className={styles.frame}>
                  <Image
                    src={shot.src}
                    alt={shot.label}
                    fill
                    sizes={
                      isInset
                        ? "(max-width: 768px) 100vw, 680px"
                        : "(max-width: 1280px) 100vw, 1280px"
                    }
                    style={{ objectFit: "cover" }}
                    loading={i < 3 ? "eager" : "lazy"}
                  />
                </div>
                <figcaption className={styles.caption}>
                  <span className={styles.captionNum}>fig. {figNum}</span>
                  <span className={styles.captionSep} aria-hidden>—</span>
                  <span className={styles.captionLabel}>{shot.label}</span>
                </figcaption>
              </figure>
            </EssayReveal>
          );
        })}
      </div>
    </section>
  );
}
