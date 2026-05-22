"use client";

import {
  Children,
  cloneElement,
  isValidElement,
  useEffect,
  useMemo,
  useRef,
  useState,
  type CSSProperties,
  type ReactElement,
  type ReactNode,
} from "react";

/**
 * StickyStackedScroll — cinematic Featured-Work pinning stack.
 *
 * Wrap N children (e.g. case-study cards). Each child pins for 1× viewport
 * height while the next child slides up to cover it. The pinned card
 * simultaneously scales 1 → 0.96 and fades opacity 1 → 0.5 as it's covered.
 *
 * GSAP + ScrollTrigger are dynamically imported on mount, so this component
 * adds zero weight to any page that doesn't render it. If the GSAP modules
 * fail to load (offline, CDN blocked) the component falls back to a normal
 * stacked layout — children render in document order without pinning.
 *
 * Respects `prefers-reduced-motion`: no pinning, no scale, no fade.
 *
 * Performance:
 *  - Animations on transform + opacity only (GPU)
 *  - ScrollTrigger refreshes on resize; cleaned up on unmount
 *  - `will-change: transform` applied only to the pinned children
 */

export interface StickyStackedScrollProps {
  children: ReactNode;
  /** Optional className on the outer wrapper. */
  className?: string;
  /** Multiplier of viewport height each child pins for. Default 1. */
  pinDuration?: number;
  /** Min scale of the pinned card as it's covered. Default 0.96. */
  minScale?: number;
  /** Min opacity of the pinned card as it's covered. Default 0.5. */
  minOpacity?: number;
}

type GsapModule = typeof import("gsap");
type ScrollTriggerModule = typeof import("gsap/ScrollTrigger");

export default function StickyStackedScroll({
  children,
  className,
  pinDuration = 1,
  minScale = 0.96,
  minOpacity = 0.5,
}: StickyStackedScrollProps) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const childRefs = useRef<Array<HTMLDivElement | null>>([]);
  const [loaded, setLoaded] = useState(false);
  const [gsapAvailable, setGsapAvailable] = useState(true);

  const items = Children.toArray(children).filter(isValidElement) as ReactElement<{
    style?: CSSProperties;
    className?: string;
  }>[];

  // Stable ref-callback per index. Memo keyed on item count keeps callbacks
  // identity-stable across renders so React doesn't re-fire them.
  const refCallbacks = useMemo<Array<(el: HTMLDivElement | null) => void>>(() => {
    const refs = childRefs;
    return items.map((_, i) => (el: HTMLDivElement | null) => {
      refs.current[i] = el;
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [items.length]);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    if (prefersReduced) {
      // No pinning, no animation. Defer to next tick so we're not
      // setting state synchronously inside the effect body.
      const id = window.setTimeout(() => {
        setGsapAvailable(false);
        setLoaded(true);
      }, 0);
      return () => window.clearTimeout(id);
    }

    let isMounted = true;
    let triggers: Array<{ kill: () => void }> = [];
    let cleanupGsap: (() => void) | null = null;

    (async () => {
      let gsap: GsapModule["default"] | GsapModule | null = null;
      let ScrollTrigger: unknown = null;
      try {
        const gsapMod = (await import("gsap")) as GsapModule;
        const stMod = (await import("gsap/ScrollTrigger")) as ScrollTriggerModule;
        gsap = gsapMod.gsap ?? gsapMod.default ?? gsapMod;
        ScrollTrigger = stMod.ScrollTrigger ?? stMod.default;
      } catch {
        if (isMounted) {
          setGsapAvailable(false);
          setLoaded(true);
        }
        return;
      }

      if (!isMounted || !containerRef.current) return;

      // gsap may be the namespace or the default export depending on build
      type Gsapish = {
        registerPlugin: (...p: unknown[]) => void;
        to: (target: unknown, vars: Record<string, unknown>) => unknown;
      };
      const g = gsap as unknown as Gsapish;
      g.registerPlugin(ScrollTrigger);

      const cards = childRefs.current.filter((c): c is HTMLDivElement => !!c);
      cards.forEach((card, i) => {
        const isLast = i === cards.length - 1;
        card.style.willChange = "transform, opacity";

        // Pin each card except the last one for `pinDuration` × viewport.
        if (!isLast) {
          const trigger = g.to(card, {
            scale: minScale,
            opacity: minOpacity,
            ease: "none",
            scrollTrigger: {
              trigger: card,
              start: "top top",
              end: () => `+=${window.innerHeight * pinDuration}`,
              pin: true,
              pinSpacing: true,
              scrub: true,
              invalidateOnRefresh: true,
            },
          }) as { scrollTrigger?: { kill: () => void } };
          if (trigger?.scrollTrigger) triggers.push(trigger.scrollTrigger);
        }
      });

      cleanupGsap = () => {
        cards.forEach((c) => {
          c.style.willChange = "";
        });
      };

      if (isMounted) setLoaded(true);
    })();

    return () => {
      isMounted = false;
      triggers.forEach((t) => t.kill());
      triggers = [];
      cleanupGsap?.();
    };
  }, [pinDuration, minScale, minOpacity, items.length]);

  return (
    <div
      ref={containerRef}
      className={className ? `sticky-stack ${className}` : "sticky-stack"}
      data-loaded={loaded ? "true" : "false"}
      data-gsap={gsapAvailable ? "true" : "false"}
    >
      {items.map((child, i) =>
        cloneElement(child, {
          key: child.key ?? i,
          ref: refCallbacks[i],
          style: {
            ...(child.props.style || {}),
            position: "relative",
          },
          className: child.props.className
            ? `${child.props.className} sticky-stack-card`
            : "sticky-stack-card",
        } as Partial<{ style: CSSProperties; className: string }>),
      )}
      <style>{`
        .sticky-stack {
          position: relative;
        }
        .sticky-stack-card {
          /* GPU-friendly defaults; transforms applied via GSAP only when loaded */
          transform: translateZ(0);
        }
      `}</style>
    </div>
  );
}
