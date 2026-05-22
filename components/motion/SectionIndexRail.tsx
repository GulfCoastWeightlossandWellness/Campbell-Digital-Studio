"use client";

import { useCallback, useEffect, useRef, useState } from "react";

/**
 * SectionIndexRail — fixed left-edge 01..N dot navigation.
 *
 * Each dot represents a major homepage section. When a section is ≥50%
 * visible in the viewport, its dot scales 1.4× and glows gold. Click a dot
 * to smooth-scroll to its section.
 *
 * Activation uses IntersectionObserver, NOT GSAP. The component is hidden
 * below 1024px (mobile + tablet have no rail).
 *
 * `aria-label` per dot is derived from `sections[i].label`.
 */

export interface RailSection {
  /** DOM id of the target section (no leading #). */
  id: string;
  /** Human-readable name, e.g. "Hero" / "Featured Work". Used for aria-label. */
  label: string;
}

export interface SectionIndexRailProps {
  sections: RailSection[];
  /** Optional override className on the rail container. */
  className?: string;
}

export default function SectionIndexRail({
  sections,
  className,
}: SectionIndexRailProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  // Track visibility ratios so we can pick the "most visible" section even
  // when two are crossing the 50% threshold simultaneously.
  const ratios = useRef<Map<string, number>>(new Map());

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (typeof IntersectionObserver === "undefined") return;

    const observed: Element[] = [];
    const observer = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          ratios.current.set(e.target.id, e.intersectionRatio);
        }
        // Find the section with the highest visibility ratio ≥ 0.5; if none,
        // fall back to the most visible.
        let bestIdx = -1;
        let bestRatio = -1;
        sections.forEach((s, i) => {
          const r = ratios.current.get(s.id) ?? 0;
          if (r > bestRatio) {
            bestRatio = r;
            bestIdx = i;
          }
        });
        if (bestIdx >= 0 && bestRatio >= 0.5) {
          setActiveIndex(bestIdx);
        }
      },
      {
        // Multiple thresholds let us track ratios continuously, so the
        // ≥ 0.5 gate is crossed exactly when half the section is on-screen.
        threshold: [0, 0.25, 0.5, 0.75, 1],
      },
    );

    for (const s of sections) {
      const el = document.getElementById(s.id);
      if (el) {
        observer.observe(el);
        observed.push(el);
      }
    }

    return () => {
      observer.disconnect();
      observed.length = 0;
    };
  }, [sections]);

  const handleClick = useCallback((id: string) => {
    const el = document.getElementById(id);
    if (!el) return;
    const prefersReduced =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    el.scrollIntoView({
      behavior: prefersReduced ? "auto" : "smooth",
      block: "start",
    });
  }, []);

  const pad = (n: number) => String(n + 1).padStart(2, "0");

  return (
    <nav
      className={className ? `section-index-rail ${className}` : "section-index-rail"}
      aria-label="Page sections"
    >
      <ul>
        {sections.map((s, i) => {
          const active = i === activeIndex;
          return (
            <li key={s.id}>
              <button
                type="button"
                aria-label={`${pad(i)} ${s.label}`}
                aria-current={active ? "true" : undefined}
                className={active ? "dot is-active" : "dot"}
                onClick={() => handleClick(s.id)}
              >
                <span className="dot-shape" aria-hidden />
              </button>
            </li>
          );
        })}
      </ul>
      <style>{`
        .section-index-rail {
          position: fixed;
          left: 24px;
          top: 50%;
          transform: translateY(-50%);
          z-index: 30;
          pointer-events: auto;
        }
        .section-index-rail ul {
          list-style: none;
          margin: 0;
          padding: 0;
          display: flex;
          flex-direction: column;
          gap: 14px;
        }
        .section-index-rail .dot {
          appearance: none;
          background: transparent;
          border: 0;
          padding: 6px;
          cursor: pointer;
          display: block;
          line-height: 0;
        }
        .section-index-rail .dot-shape {
          display: block;
          width: 7px;
          height: 7px;
          border-radius: 50%;
          background: rgba(20, 24, 42, 0.28);
          transform: scale(1);
          transition:
            transform 0.32s var(--ease-fluid),
            background-color 0.28s var(--ease-snappy),
            box-shadow 0.32s var(--ease-fluid);
        }
        .section-index-rail .dot:hover .dot-shape {
          background: rgba(20, 24, 42, 0.5);
        }
        .section-index-rail .dot:focus-visible {
          outline: none;
        }
        .section-index-rail .dot:focus-visible .dot-shape {
          outline: 2px solid var(--copper);
          outline-offset: 3px;
        }
        .section-index-rail .dot.is-active .dot-shape {
          background: var(--copper);
          transform: scale(1.4);
          box-shadow: 0 0 0 4px rgba(196, 154, 53, 0.18),
                      0 0 14px rgba(196, 154, 53, 0.55);
        }
        @media (max-width: 1023px) {
          .section-index-rail { display: none; }
        }
        @media (prefers-reduced-motion: reduce) {
          .section-index-rail .dot-shape { transition: none; }
        }
      `}</style>
    </nav>
  );
}
