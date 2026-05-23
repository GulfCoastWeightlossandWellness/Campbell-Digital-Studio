"use client";

/**
 * IHEMosaic — "146 apps. One studio. One year." marquee band.
 *
 * Renders a slow horizontal marquee of IHE patient-education thumbnails.
 * Initial render uses the first ~24 thumbnails; the remaining ~122 lazy-load
 * via IntersectionObserver when the band enters the viewport. Tap-to-pause
 * on mobile (and hover-to-pause on desktop). prefers-reduced-motion → static
 * grid, no marquee.
 *
 * Asset path convention (orchestrator-populated): `/images/external/ihe-thumbnails/{slug}.jpg`
 *
 * Voice: clinical-plain. The headline does the heavy lifting; copy stays minimal.
 */

import { useEffect, useMemo, useRef, useState } from "react";
import Image from "next/image";
import { motion, useReducedMotion } from "motion/react";
import SectionTag from "@/components/editorial/SectionTag";
import styles from "./IHEMosaic.module.css";

type Props = {
  /** Thumbnail filenames (with extension) relative to /images/external/ihe-thumbnails/. */
  thumbnails?: string[];
  /** Number of thumbnails to render before the IntersectionObserver triggers. */
  initialCount?: number;
  /** Section number for the eyebrow tag. */
  sectionNum?: string;
};

// Placeholder list — orchestrator will replace with the real 146-entry array.
// Filenames here mirror the actual IHE Product Dashboard public/thumbnails/.
const FALLBACK_THUMBNAILS = [
  "acid-reflux-understanding-gerd.jpg",
  "acne-guide.jpg",
  "addiction-counseling-guide.jpg",
  "adhd-interactive-guide.jpg",
  "adverse-childhood-experiences.jpg",
  "afib-education-hub.jpg",
  "alcohol-use-guide.jpg",
  "allergies-hay-fever-guide.jpg",
  "anemia-guide.jpg",
  "anger-management.jpg",
  "asthma-education-hub.jpg",
  "attachment-styles-quiz.jpg",
  "autoimmune-disease-guide.jpg",
  "back-pain-sciatica-relief-guide.jpg",
  "bariatric-surgery-guide.jpg",
  "bipolar-disorder-guide.jpg",
  "body-image-guide.jpg",
  "bppv-vertigo-guide.jpg",
  "brain-fog-guide.jpg",
  "break-a-bad-habit.jpg",
  "breast-cancer-guide.jpg",
  "breast-health-self-awareness-guide.jpg",
  "building-positive-habits.jpg",
  "ckd-education-hub.jpg",
];

const THUMB_BASE = "/images/external/ihe-thumbnails";

function toAlt(filename: string): string {
  return filename
    .replace(/\.(jpg|jpeg|png|webp|avif)$/i, "")
    .split("-")
    .filter(Boolean)
    .join(" ");
}

export default function IHEMosaic({
  thumbnails,
  initialCount = 24,
  sectionNum = "02",
}: Props) {
  const reducedMotion = useReducedMotion();
  const sectionRef = useRef<HTMLElement | null>(null);
  const [hasEnteredViewport, setHasEnteredViewport] = useState(false);
  const [paused, setPaused] = useState(false);

  const list = useMemo(() => {
    const source = thumbnails && thumbnails.length > 0 ? thumbnails : FALLBACK_THUMBNAILS;
    return source;
  }, [thumbnails]);

  const initial = useMemo(() => list.slice(0, initialCount), [list, initialCount]);
  const rest = useMemo(() => list.slice(initialCount), [list, initialCount]);

  // IntersectionObserver — load the remainder when the band enters the viewport.
  useEffect(() => {
    if (typeof window === "undefined") return;
    const node = sectionRef.current;
    if (!node) return;
    if (rest.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setHasEnteredViewport(true);
            observer.disconnect();
            return;
          }
        }
      },
      { rootMargin: "200px 0px" },
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, [rest.length]);

  // Visible tiles — first pass = initial only, second pass = all.
  const tiles = hasEnteredViewport ? list : initial;

  // Duplicate the strip so the marquee can loop seamlessly.
  const marqueeRow = useMemo(() => [...tiles, ...tiles], [tiles]);

  // Total client count for the headline.
  const total = list.length;

  return (
    <section
      ref={sectionRef}
      className={styles.section}
      aria-labelledby="ihe-mosaic-heading"
    >
      <div className="section-wrap section-block-tight">
        <SectionTag num={sectionNum} label="Library shipped" />
        <h2 id="ihe-mosaic-heading" className={styles.heading}>
          <em className={styles.headingEm}>{total}</em> apps. One studio. One year.
        </h2>
        <p className={styles.subcopy}>
          Patient-education library shipped via Interactive Health Education
        </p>
      </div>

      <div
        className={styles.viewport}
        data-paused={paused ? "true" : "false"}
        data-reduced-motion={reducedMotion ? "true" : "false"}
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
        onTouchStart={() => setPaused((p) => !p)}
        role="region"
        aria-label={`Mosaic of ${total} IHE patient-education apps`}
      >
        {reducedMotion ? (
          <div className={styles.staticGrid}>
            {tiles.map((file) => (
              <MosaicTile key={file} file={file} />
            ))}
          </div>
        ) : (
          <motion.div
            className={styles.marquee}
            animate={paused ? { x: 0 } : undefined}
          >
            <div className={styles.track}>
              {marqueeRow.map((file, i) => (
                <MosaicTile key={`${file}-${i}`} file={file} />
              ))}
            </div>
          </motion.div>
        )}
      </div>
    </section>
  );
}

function MosaicTile({ file }: { file: string }) {
  return (
    <div className={styles.tile}>
      <Image
        src={`${THUMB_BASE}/${file}`}
        alt={toAlt(file)}
        fill
        sizes="(max-width: 720px) 96px, 220px"
        loading="lazy"
        style={{ objectFit: "cover" }}
      />
    </div>
  );
}
