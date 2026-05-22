"use client";

import { useEffect, useState } from "react";
import styles from "./CodeReceipt.module.css";

type Props = {
  /** Pre-highlighted HTML produced by Shiki at build time. */
  highlightedHtml: string;
  /** Plain text — used for clipboard copy. */
  rawCode: string;
  /** Toast message displayed after a successful copy. */
  toastMessage: string;
  /** Caption rendered above the code block. */
  caption?: string;
};

/**
 * Code Receipt — renders a Shiki-highlighted snippet with a Copy button.
 * Highlighting is produced at build time on the server; this component
 * only injects the HTML and wires the clipboard interaction.
 */
export default function CodeReceipt({
  highlightedHtml,
  rawCode,
  toastMessage,
  caption,
}: Props) {
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (!copied) return;
    const t = window.setTimeout(() => setCopied(false), 2400);
    return () => window.clearTimeout(t);
  }, [copied]);

  async function handleCopy() {
    try {
      if (navigator?.clipboard?.writeText) {
        await navigator.clipboard.writeText(rawCode);
      } else {
        const ta = document.createElement("textarea");
        ta.value = rawCode;
        ta.style.position = "fixed";
        ta.style.opacity = "0";
        document.body.appendChild(ta);
        ta.select();
        document.execCommand("copy");
        document.body.removeChild(ta);
      }
      setCopied(true);
    } catch {
      // swallow — failed clipboard is not load-bearing
    }
  }

  return (
    <div className={styles.codeReceipt}>
      {caption ? <div className={styles.caption}>{caption}</div> : null}

      <div
        className={styles.shell}
        // Shiki output is a sanitized <pre><code><span> tree generated from a
        // string literal we control at build time. Safe to inject.
        dangerouslySetInnerHTML={{ __html: highlightedHtml }}
      />

      <div className={styles.bar}>
        <button
          type="button"
          className={styles.copy}
          onClick={handleCopy}
          aria-live="polite"
        >
          {copied ? "Copied" : "Copy"}
        </button>

        <span
          className={`${styles.toast}${copied ? ` ${styles.toastVisible}` : ""}`}
          role="status"
          aria-hidden={!copied}
        >
          {toastMessage}
        </span>
      </div>
    </div>
  );
}
