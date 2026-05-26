"use client";

import { useRef, useEffect, useState, type ReactNode } from "react";

type Props = {
  children: ReactNode;
  className?: string;
  delay?: number;
  /** y offset in px — defaults to 20 */
  yOffset?: number;
};

/**
 * Scroll-driven fade-rise reveal. Uses IntersectionObserver (no Motion dep
 * needed for simple reveals; keeps bundle lean). Respects prefers-reduced-motion.
 */
export default function EssayReveal({
  children,
  className = "",
  delay = 0,
  yOffset = 20,
}: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);
  const [prefersReduced, setPrefersReduced] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setPrefersReduced(mq.matches);

    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          observer.disconnect();
        }
      },
      { threshold: 0.08, rootMargin: "0px 0px -40px 0px" }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const shouldAnimate = !prefersReduced;

  return (
    <div
      ref={ref}
      className={className}
      style={
        shouldAnimate
          ? {
              opacity: inView ? 1 : 0,
              transform: inView ? "translateY(0)" : `translateY(${yOffset}px)`,
              transition: `opacity 0.65s ease ${delay}ms, transform 0.65s cubic-bezier(0.2, 0, 0, 1) ${delay}ms`,
              willChange: "opacity, transform",
            }
          : undefined
      }
    >
      {children}
    </div>
  );
}
