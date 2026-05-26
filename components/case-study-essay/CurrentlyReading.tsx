"use client";

import { useEffect, useState, useRef } from "react";
import styles from "./CurrentlyReading.module.css";

const SECTIONS = [
  { id: "essay-hero",         label: "§ 01 / Hero" },
  { id: "essay-brief",        label: "§ 02 / The Brief" },
  { id: "essay-architecture", label: "§ 03 / Architecture" },
  { id: "essay-features",     label: "§ 04 / What Was Built" },
  { id: "essay-screenshots",  label: "§ 05 / Selected Screens" },
  { id: "essay-why",          label: "§ 06 / Why It Works" },
  { id: "essay-outcome",      label: "§ 07 / Outcome" },
];

export default function CurrentlyReading() {
  const [current, setCurrent] = useState(SECTIONS[0].label);
  const [visible, setVisible] = useState(false);
  const raf = useRef<number | null>(null);

  useEffect(() => {
    // Only show after user scrolls a bit
    const onScroll = () => {
      if (raf.current) cancelAnimationFrame(raf.current);
      raf.current = requestAnimationFrame(() => {
        setVisible(window.scrollY > 200);

        // Find the section currently in the upper 40% of viewport
        let active = SECTIONS[0].label;
        for (const s of SECTIONS) {
          const el = document.getElementById(s.id);
          if (!el) continue;
          const rect = el.getBoundingClientRect();
          if (rect.top <= window.innerHeight * 0.4) {
            active = s.label;
          }
        }
        setCurrent(active);
      });
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      if (raf.current) cancelAnimationFrame(raf.current);
    };
  }, []);

  return (
    <div
      className={styles.root}
      aria-hidden="true"
      style={{ opacity: visible ? 1 : 0, pointerEvents: visible ? "auto" : "none" }}
    >
      <span className={styles.project}>Air Solutions</span>
      <span className={styles.separator}>—</span>
      <span className={styles.section}>{current}</span>
    </div>
  );
}
