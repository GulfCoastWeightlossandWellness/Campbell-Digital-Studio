"use client";

import Link from "next/link";
import { useCallback, useRef } from "react";
import {
  motion,
  useMotionValue,
  useReducedMotion,
  useSpring,
  type SpringOptions,
} from "motion/react";

/**
 * MagneticButton — drop-in replacement for `<Link className="btn-fill">`.
 *
 * The element translates toward the cursor (default 30% of distance) when the
 * pointer enters a radius (default 120px) around its center, and springs back
 * to origin on leave / blur. Tap gives a brief 0.97 scale punch. Hover paints
 * a gold glow shadow.
 *
 * Architecture: outer `motion.span` carries the magnetic translate, inner
 * Next.js `<Link>` carries href + prefetch + client navigation. The inner
 * `<Link>` always renders an anchor element in Next 16, so it receives the
 * hover/tap styling.
 *
 * A11y + perf:
 *  - Disables magnetic + tap on `prefers-reduced-motion` (renders a plain Link)
 *  - Touch pointers are filtered out (no offset accumulates from taps)
 *  - Keyboard focus shows the brand focus ring; no magnetic offset on focus
 *  - `will-change: transform` is set only while engaged, released on leave
 *  - GPU transforms only; no layout properties animated
 */

type Variant = "fill" | "ghost";

export interface MagneticButtonProps {
  href: string;
  children: React.ReactNode;
  variant?: Variant;
  /** Radius in px around the button center where the magnetic field engages. */
  radius?: number;
  /** Fraction of cursor-distance the button travels (0–1). 0.3 = subtle. */
  strength?: number;
  className?: string;
  "aria-label"?: string;
  prefetch?: boolean;
  target?: string;
  rel?: string;
  onClick?: (e: React.MouseEvent<HTMLAnchorElement>) => void;
}

const SPRING: SpringOptions = { stiffness: 150, damping: 15, mass: 0.4 };

export default function MagneticButton({
  href,
  children,
  variant = "fill",
  radius = 120,
  strength = 0.3,
  className,
  prefetch,
  target,
  rel,
  onClick,
  ...rest
}: MagneticButtonProps) {
  const reducedMotion = useReducedMotion();
  const wrapperRef = useRef<HTMLSpanElement | null>(null);

  const xRaw = useMotionValue(0);
  const yRaw = useMotionValue(0);
  const x = useSpring(xRaw, SPRING);
  const y = useSpring(yRaw, SPRING);

  const baseClass =
    variant === "ghost" ? "btn-ghost magnetic-btn" : "btn-fill magnetic-btn";
  const composed = className ? `${baseClass} ${className}` : baseClass;

  const handleMove = useCallback(
    (e: React.PointerEvent<HTMLSpanElement>) => {
      if (reducedMotion) return;
      // Only fine pointers (mouse/pen). Touch events would create awkward
      // post-tap offsets — bail explicitly.
      if (e.pointerType !== "mouse" && e.pointerType !== "pen") return;

      const el = wrapperRef.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;
      const dx = e.clientX - cx;
      const dy = e.clientY - cy;
      const dist = Math.hypot(dx, dy);

      if (dist > radius) {
        xRaw.set(0);
        yRaw.set(0);
        return;
      }
      xRaw.set(dx * strength);
      yRaw.set(dy * strength);
    },
    [reducedMotion, radius, strength, xRaw, yRaw],
  );

  const reset = useCallback(() => {
    xRaw.set(0);
    yRaw.set(0);
    const el = wrapperRef.current;
    if (el) el.style.willChange = "";
  }, [xRaw, yRaw]);

  const handleEnter = useCallback(
    (e: React.PointerEvent<HTMLSpanElement>) => {
      if (reducedMotion) return;
      if (e.pointerType !== "mouse" && e.pointerType !== "pen") return;
      const el = wrapperRef.current;
      if (el) el.style.willChange = "transform";
    },
    [reducedMotion],
  );

  // Reduced-motion path: render plain Link, no listeners.
  if (reducedMotion) {
    return (
      <Link
        href={href}
        prefetch={prefetch}
        target={target}
        rel={rel}
        className={composed}
        onClick={onClick}
        {...rest}
      >
        {children}
      </Link>
    );
  }

  return (
    <motion.span
      ref={wrapperRef}
      style={{ x, y, display: "inline-block" }}
      onPointerEnter={handleEnter}
      onPointerMove={handleMove}
      onPointerLeave={reset}
      onBlur={reset}
      whileTap={{ scale: 0.97, transition: { duration: 0.09, ease: [0.2, 0, 0, 1] } }}
    >
      <Link
        href={href}
        prefetch={prefetch}
        target={target}
        rel={rel}
        className={composed}
        onClick={onClick}
        {...rest}
      >
        {children}
      </Link>
      <style>{`
        .magnetic-btn {
          transition:
            background 0.24s var(--ease-snappy),
            box-shadow 0.28s var(--ease-fluid),
            border-color 0.24s var(--ease-snappy);
        }
        .magnetic-btn:hover {
          box-shadow: 0 12px 32px -10px rgba(196, 154, 53, 0.55);
        }
        .magnetic-btn:focus-visible {
          outline: 2px solid var(--copper);
          outline-offset: 3px;
        }
      `}</style>
    </motion.span>
  );
}
