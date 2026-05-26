import Image from "next/image";
import type { Project } from "@/lib/projects";
import styles from "./EssayHero.module.css";

type Props = {
  project: Project;
};

export default function EssayHero({ project }: Props) {
  return (
    <section id="essay-hero" className={styles.root}>
      <div className={styles.inner}>
        {/* Left column — editorial text */}
        <div className={styles.textCol}>
          {/* Eyebrow / category */}
          <div className={styles.eyebrow}>
            <span className={styles.eyebrowNum}>§ 01</span>
            <span className={styles.eyebrowSep} aria-hidden>—</span>
            <span className={styles.eyebrowCat}>{project.category}</span>
          </div>

          {/* Display headline */}
          <h1 className={`display-sans display-80 ${styles.headline}`}>
            {project.shortName}.
          </h1>

          {/* Opening paragraph — shortSummary */}
          <p className={styles.lead}>{project.shortSummary}</p>

          {/* Fraunces pull-quote */}
          <blockquote className={styles.pullquote}>
            <span className={styles.pullquoteQuote} aria-hidden>&ldquo;</span>
            {project.valueExplainer}
          </blockquote>

          {/* Quick meta strip */}
          <div className={styles.metaStrip}>
            {project.metaGrid.map((cell, i) => (
              <div key={i} className={styles.metaCell}>
                <span className={styles.metaLabel}>{cell.label}</span>
                <span className={styles.metaValue}>{cell.value}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Right column — hero image full-bleed */}
        {project.coverImage ? (
          <div className={styles.imageCol}>
            <div className={styles.imageFrame}>
              <Image
                src={project.coverImage}
                alt={`${project.title} — hero screenshot`}
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 55vw"
                style={{ objectFit: "cover" }}
              />
              {/* Figcaption overlay */}
              <div className={styles.imageCap}>
                <span className="mono-caption">fig. 01 — Homepage hero</span>
              </div>
            </div>
          </div>
        ) : null}
      </div>
    </section>
  );
}
