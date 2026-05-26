"use client";

/**
 * MatrixFieldMount — safe loader for the MatrixField WebGL scene.
 *
 * Responsibilities:
 *   1. Lazy-loads MatrixField via next/dynamic (ssr: false) so Three.js
 *      doesn't bloat the initial server render or page load.
 *   2. Detects prefers-reduced-motion and passes it into the scene.
 *   3. Detects viewport size (mobile ≤ 720px → simpler 9×5 grid).
 *   4. Checks navigator.connection.saveData — skips canvas entirely on
 *      data-saver mode, shows a static SVG fallback instead.
 *   5. Shows a skeleton placeholder while the R3F bundle loads.
 *   6. Exposes the container with aria-hidden (decorative scene).
 */

import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import { useReducedMotion } from "motion/react";
import styles from "./MatrixFieldMount.module.css";

// Lazy-load the heavy Three.js scene — will not appear in initial JS bundle
const MatrixField = dynamic(() => import("./MatrixField"), {
  ssr: false,
  loading: () => <MatrixSkeleton />,
});

// ─── Static SVG fallback (reduced-motion / save-data) ──────────────────────

function MatrixStaticFallback({
  cols,
  rows,
}: {
  cols: number;
  rows: number;
}) {
  const gap = 24;
  const w = (cols - 1) * gap + 12;
  const h = (rows - 1) * gap + 12;

  const dots: { cx: number; cy: number; opacity: number }[] = [];
  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      dots.push({
        cx: c * gap + 6,
        cy: r * gap + 6,
        opacity: 0.3 + ((r * cols + c) % 7) * 0.1,
      });
    }
  }

  return (
    <svg
      viewBox={`0 0 ${w} ${h}`}
      width={w}
      height={h}
      aria-hidden
      className={styles.staticFallback}
    >
      <title>City × service matrix grid</title>
      {dots.map((d, i) => (
        <rect
          key={i}
          x={d.cx - 3}
          y={d.cy - 3}
          width={6}
          height={6}
          fill="#C49A35"
          opacity={d.opacity}
          rx={1}
        />
      ))}
    </svg>
  );
}

// ─── Skeleton placeholder (while JS bundle loads) ──────────────────────────

function MatrixSkeleton() {
  return <div className={styles.skeleton} aria-hidden />;
}

// ─── MatrixFieldMount (exported) ──────────────────────────────────────────

export default function MatrixFieldMount() {
  const reducedMotion = useReducedMotion() ?? false;
  const [isMobile, setIsMobile] = useState(false);
  const [saveData, setSaveData] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);

    // Viewport size detection
    const mq = window.matchMedia("(max-width: 720px)");
    const setMobile = () => setIsMobile(mq.matches);
    setMobile();
    mq.addEventListener("change", setMobile);

    // Data-saver detection
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const conn = (navigator as any).connection;
    if (conn?.saveData) setSaveData(true);

    return () => mq.removeEventListener("change", setMobile);
  }, []);

  const cols = isMobile ? 9 : 15;
  const rows = isMobile ? 5 : 9;

  // Server render and pre-hydration: show nothing (SSR safe)
  if (!mounted) return null;

  return (
    <div
      className={styles.mount}
      aria-hidden="true"
      role="presentation"
    >
      {/* Data-saver or reduced-motion: static SVG only */}
      {saveData || reducedMotion ? (
        <div className={styles.svgWrap}>
          <MatrixStaticFallback cols={cols} rows={rows} />
        </div>
      ) : (
        <MatrixField isMobile={isMobile} reducedMotion={false} />
      )}
    </div>
  );
}
