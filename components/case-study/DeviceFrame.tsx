/**
 * DeviceFrame — reusable wrapper that frames a case-study screenshot in one
 * of three real-world contexts:
 *
 *   - `laptop`  → MacBook silhouette, content fits 16:10
 *   - `phone`   → iPhone silhouette,  content fits 9:19.5
 *   - `browser` → Safari-style chrome with a live-looking URL bar.
 *                 Highest-ROI: the URL reads as proof.
 *
 * SVG frames are inlined here so the component stays self-contained (no
 * external libraries). Caption text uses the mono token for the editorial-light
 * print feel.
 *
 * Voice: clinical-plain. The url + caption do the work.
 */

import type { ReactNode } from "react";
import Image from "next/image";
import styles from "./DeviceFrame.module.css";

type Variant = "laptop" | "phone" | "browser";

type Props = {
  variant: Variant;
  /** Preferred path — image source, rendered via next/image. */
  src?: string;
  /** Required when `src` is provided. */
  alt?: string;
  /** Required for `browser` variant — what to display in the URL bar. */
  url?: string;
  /** Mono caption beneath the frame. */
  caption?: string;
  /** Pass-through for next/image priority (e.g. first frame on a case study). */
  priority?: boolean;
  /**
   * Escape hatch: render arbitrary children inside the screen area instead of
   * a next/image. Kept for backward compat with case-study pages that pass a
   * pre-configured <Image fill /> as children.
   */
  children?: ReactNode;
};

export default function DeviceFrame({
  variant,
  src,
  alt,
  url,
  caption,
  priority = false,
  children,
}: Props) {
  const Frame =
    variant === "laptop" ? LaptopFrame : variant === "phone" ? PhoneFrame : BrowserFrame;

  return (
    <figure className={`${styles.figure} ${styles[`figure-${variant}`]}`}>
      <Frame src={src} alt={alt} url={url} priority={priority}>
        {children}
      </Frame>
      {caption ? <figcaption className={styles.caption}>{caption}</figcaption> : null}
    </figure>
  );
}

/* ── Laptop ──────────────────────────────────────────────────────────── */

type FrameProps = {
  src?: string;
  alt?: string;
  url?: string;
  priority?: boolean;
  children?: ReactNode;
};

function ScreenContent({
  src,
  alt,
  priority,
  sizes,
  children,
}: {
  src?: string;
  alt?: string;
  priority?: boolean;
  sizes: string;
  children?: ReactNode;
}) {
  if (children) return <>{children}</>;
  if (!src) return null;
  return (
    <Image
      src={src}
      alt={alt ?? ""}
      fill
      priority={priority}
      sizes={sizes}
      style={{ objectFit: "cover" }}
    />
  );
}

function LaptopFrame({ src, alt, priority = false, children }: FrameProps) {
  return (
    <div className={styles.laptop}>
      <div className={styles.laptopLid}>
        <div className={styles.laptopBezel}>
          <div className={styles.laptopNotch} aria-hidden />
          <div className={styles.laptopScreen}>
            <ScreenContent
              src={src}
              alt={alt}
              priority={priority}
              sizes="(max-width: 720px) 100vw, 960px"
            >
              {children}
            </ScreenContent>
          </div>
        </div>
      </div>
      <div className={styles.laptopBase} aria-hidden>
        <div className={styles.laptopHinge} />
      </div>
    </div>
  );
}

/* ── Phone ───────────────────────────────────────────────────────────── */

function PhoneFrame({ src, alt, priority = false, children }: FrameProps) {
  return (
    <div className={styles.phone}>
      <div className={styles.phoneBezel}>
        <div className={styles.phoneNotch} aria-hidden />
        <div className={styles.phoneScreen}>
          <ScreenContent
            src={src}
            alt={alt}
            priority={priority}
            sizes="(max-width: 720px) 75vw, 280px"
          >
            {children}
          </ScreenContent>
        </div>
        <div className={styles.phoneHomeBar} aria-hidden />
      </div>
    </div>
  );
}

/* ── Browser ─────────────────────────────────────────────────────────── */

function BrowserFrame({ src, alt, url, priority = false, children }: FrameProps) {
  const displayUrl = url ?? "campbelldigitalstudio.com";
  return (
    <div className={styles.browser}>
      <div className={styles.browserChrome} aria-hidden>
        <div className={styles.browserDots}>
          <span className={styles.dotRed} />
          <span className={styles.dotYellow} />
          <span className={styles.dotGreen} />
        </div>
        <div className={styles.browserUrl}>
          <LockIcon />
          <span className={styles.browserUrlText}>{displayUrl}</span>
        </div>
        <div className={styles.browserSpacer} />
      </div>
      <div className={styles.browserContent}>
        <ScreenContent
          src={src}
          alt={alt}
          priority={priority}
          sizes="(max-width: 720px) 100vw, 1040px"
        >
          {children}
        </ScreenContent>
      </div>
    </div>
  );
}

function LockIcon() {
  return (
    <svg
      className={styles.lockIcon}
      width="10"
      height="12"
      viewBox="0 0 10 12"
      fill="none"
      aria-hidden
    >
      <rect x="1" y="5" width="8" height="6" rx="1.2" stroke="currentColor" strokeWidth="1" />
      <path
        d="M3 5V3.5C3 2.4 3.9 1.5 5 1.5C6.1 1.5 7 2.4 7 3.5V5"
        stroke="currentColor"
        strokeWidth="1"
        strokeLinecap="round"
      />
    </svg>
  );
}
