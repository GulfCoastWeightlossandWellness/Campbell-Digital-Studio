"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import {
  useMotionValue,
  useReducedMotion,
  useSpring,
  type MotionValue,
} from "motion/react";

/**
 * useMagneticHover — cursor-following image-reveal pattern for /work cards.
 *
 * Tracks the cursor with a lerp factor (~0.18) and returns motion values
 * suitable for positioning a 280×360 preview image that follows the cursor
 * while hovering a project name row.
 *
 * Returns:
 *  - x, y: MotionValue<number> — viewport-relative cursor coordinates,
 *          spring-smoothed to read as a follow rather than a snap.
 *  - hovering: boolean — true while the user is over the target. Use this
 *              to gate the preview's opacity / mount state.
 *  - bind: { onPointerEnter, onPointerMove, onPointerLeave } — spread onto
 *          the row element.
 *  - disabled: boolean — true under prefers-reduced-motion or on touch.
 *              The caller should render a static thumbnail in that case.
 */

export interface MagneticHoverApi {
  x: MotionValue<number>;
  y: MotionValue<number>;
  hovering: boolean;
  disabled: boolean;
  bind: {
    onPointerEnter: (e: React.PointerEvent) => void;
    onPointerMove: (e: React.PointerEvent) => void;
    onPointerLeave: (e: React.PointerEvent) => void;
  };
}

// Spring tuned so damping≈lerp(0.18). Stiffer than the magnetic button so the
// preview tracks closely without lagging visibly.
const SPRING = { stiffness: 320, damping: 28, mass: 0.6 };

export default function useMagneticHover(): MagneticHoverApi {
  const reducedMotion = useReducedMotion();
  const [hovering, setHovering] = useState(false);
  const [isCoarse, setIsCoarse] = useState(false);
  const lastPointerType = useRef<string>("mouse");

  // Detect coarse pointer once on mount (and listen for changes — desktop with
  // a touchscreen can flip).
  useEffect(() => {
    if (typeof window === "undefined") return;
    const mql = window.matchMedia("(pointer: coarse)");
    const update = () => setIsCoarse(mql.matches);
    update();
    mql.addEventListener("change", update);
    return () => mql.removeEventListener("change", update);
  }, []);

  const xRaw = useMotionValue(0);
  const yRaw = useMotionValue(0);
  const x = useSpring(xRaw, SPRING);
  const y = useSpring(yRaw, SPRING);

  const disabled = !!reducedMotion || isCoarse;

  const onPointerEnter = useCallback(
    (e: React.PointerEvent) => {
      lastPointerType.current = e.pointerType || "mouse";
      if (disabled) return;
      if (e.pointerType && e.pointerType !== "mouse" && e.pointerType !== "pen") return;
      xRaw.set(e.clientX);
      yRaw.set(e.clientY);
      setHovering(true);
    },
    [disabled, xRaw, yRaw],
  );

  const onPointerMove = useCallback(
    (e: React.PointerEvent) => {
      if (disabled) return;
      if (e.pointerType && e.pointerType !== "mouse" && e.pointerType !== "pen") return;
      xRaw.set(e.clientX);
      yRaw.set(e.clientY);
    },
    [disabled, xRaw, yRaw],
  );

  const onPointerLeave = useCallback(() => {
    if (disabled) return;
    setHovering(false);
  }, [disabled]);

  return {
    x,
    y,
    hovering,
    disabled,
    bind: { onPointerEnter, onPointerMove, onPointerLeave },
  };
}
