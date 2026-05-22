"use client";

/**
 * IHEDemoVideo — inline 16:9 embed of the IHE marketing demo loop.
 *
 * Below (or above) the IHEMosaic on the homepage. Autoplay muted loop with a
 * poster fallback. Lazy-loads via IntersectionObserver — `preload="none"` and
 * `src` is only injected after the band enters the viewport. Reduced-motion
 * users see the poster image only (no autoplay).
 *
 * Asset path convention:
 *   Video:  `/videos/ihe-marketing-demo.mp4`
 *   Poster: `/images/external/ihe-marketing-poster.jpg`
 *
 * Voice: clinical-plain. Two short lines, one CTA.
 */

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { useReducedMotion } from "motion/react";
import SectionTag from "@/components/editorial/SectionTag";
import styles from "./IHEDemoVideo.module.css";

type Props = {
  videoSrc?: string;
  posterSrc?: string;
  /** Internal slug for the case study CTA. */
  caseStudyHref?: string;
  sectionNum?: string;
};

export default function IHEDemoVideo({
  videoSrc = "/videos/ihe-marketing-demo.mp4",
  posterSrc = "/images/external/ihe-marketing-poster.jpg",
  caseStudyHref = "/work/ihe-marketing",
  sectionNum,
}: Props) {
  const reducedMotion = useReducedMotion();
  const sectionRef = useRef<HTMLElement | null>(null);
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [inView, setInView] = useState(false);

  // IntersectionObserver — defer attaching the <source> until the section
  // is near the viewport. Cheaper than `preload="metadata"` for an MP4.
  useEffect(() => {
    if (typeof window === "undefined") return;
    const node = sectionRef.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setInView(true);
            observer.disconnect();
            return;
          }
        }
      },
      { rootMargin: "300px 0px" },
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  // When the video element gets its source, attempt autoplay (unless reduced-motion).
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    if (reducedMotion) return;
    if (!inView) return;
    // Autoplay needs to be muted on most browsers; we declare muted on the element.
    const playPromise = video.play();
    if (playPromise && typeof playPromise.catch === "function") {
      playPromise.catch(() => {
        // Autoplay blocked — leave the poster visible.
      });
    }
  }, [inView, reducedMotion]);

  return (
    <section
      ref={sectionRef}
      className={styles.section}
      aria-labelledby="ihe-demo-video-heading"
    >
      <div className="section-wrap section-block-tight">
        {sectionNum ? <SectionTag num={sectionNum} label="Live build" /> : null}

        <h2 id="ihe-demo-video-heading" className="sr-only">
          IHE Marketing demo video
        </h2>

        <div className={styles.frame}>
          <video
            ref={videoRef}
            className={styles.video}
            poster={posterSrc}
            muted
            loop
            playsInline
            preload="none"
            autoPlay={!reducedMotion}
            aria-label="Interactive Health Education marketing site demo loop"
          >
            {inView && !reducedMotion ? (
              <source src={videoSrc} type="video/mp4" />
            ) : null}
          </video>
        </div>

        <p className={styles.caption}>This is one we built. Click in.</p>

        <Link href={caseStudyHref} className={styles.cta}>
          See the IHE case study <span aria-hidden>→</span>
        </Link>
      </div>
    </section>
  );
}
