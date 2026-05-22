"use client";

import { useEffect, useRef } from "react";
import {
  useMotionValue,
  useReducedMotion,
  useSpring,
  type MotionValue,
  type SpringOptions,
} from "motion/react";

/**
 * useDeviceTilt — hero device-frame parallax tilt.
 *
 * Returns a ref to attach to the trackable element + two spring-smoothed
 * motion values to plug into `style={{ rotateX, rotateY }}` (or transform
 * a wrapper). Max tilt is ±maxTilt° on each axis. Disabled on
 * `prefers-reduced-motion` and on coarse pointers (touch).
 *
 * Listener is bound to the element (not window) so it only fires inside
 * the frame's bounds, and is cleaned up on unmount.
 */

export interface DeviceTiltOptions {
  /** Max tilt in degrees per axis. Default 4°. */
  maxTilt?: number;
  /** Spring options for the smoothing pass. Mass/damping/stiffness tuned for ~280ms settle. */
  spring?: SpringOptions;
}

export interface DeviceTiltApi<T extends HTMLElement> {
  ref: React.RefObject<T | null>;
  rotateX: MotionValue<number>;
  rotateY: MotionValue<number>;
}

const DEFAULT_SPRING: SpringOptions = { stiffness: 120, damping: 18, mass: 0.5 };

export default function useDeviceTilt<T extends HTMLElement = HTMLDivElement>(
  options: DeviceTiltOptions = {},
): DeviceTiltApi<T> {
  const { maxTilt = 4, spring = DEFAULT_SPRING } = options;
  const ref = useRef<T | null>(null);
  const reducedMotion = useReducedMotion();

  const rxRaw = useMotionValue(0);
  const ryRaw = useMotionValue(0);
  const rotateX = useSpring(rxRaw, spring);
  const rotateY = useSpring(ryRaw, spring);

  useEffect(() => {
    if (reducedMotion) return;
    if (typeof window === "undefined") return;
    // Skip on coarse pointers (touch). Saves CPU and avoids the post-tap
    // "stuck" tilt that touchscreens produce.
    if (window.matchMedia("(pointer: coarse)").matches) return;

    const el = ref.current;
    if (!el) return;

    const handleMove = (e: PointerEvent) => {
      if (e.pointerType && e.pointerType !== "mouse" && e.pointerType !== "pen") return;
      const rect = el.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;
      // Normalize -1..1 across the element
      const nx = (e.clientX - cx) / (rect.width / 2);
      const ny = (e.clientY - cy) / (rect.height / 2);
      // RotateX is inverted (cursor above → top tilts back, away from viewer)
      rxRaw.set(-ny * maxTilt);
      ryRaw.set(nx * maxTilt);
    };

    const handleLeave = () => {
      rxRaw.set(0);
      ryRaw.set(0);
    };

    el.addEventListener("pointermove", handleMove);
    el.addEventListener("pointerleave", handleLeave);
    el.addEventListener("blur", handleLeave, true);

    return () => {
      el.removeEventListener("pointermove", handleMove);
      el.removeEventListener("pointerleave", handleLeave);
      el.removeEventListener("blur", handleLeave, true);
    };
  }, [maxTilt, reducedMotion, rxRaw, ryRaw]);

  return { ref, rotateX, rotateY };
}
