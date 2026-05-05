"use client";

import { useEffect } from "react";
import { track, EVENT } from "@/lib/analytics";

type Props = {
  /** Cal.com username from env (NEXT_PUBLIC_CAL_USERNAME) */
  username: string;
  /** Optional event slug, e.g. "20min" */
  event?: string;
};

/**
 * Cal.com inline embed. Loads the official embed snippet on mount and
 * tracks a "Calendar Booking Started" event when a booking is initiated.
 * https://cal.com/docs/enterprise-features/embed
 */
export default function CalEmbed({ username, event }: Props) {
  const namespace = "studio-call";
  const link = event ? `${username}/${event}` : username;

  useEffect(() => {
    // Embed bootstrap script — see Cal.com docs
    type CalFn = ((...args: unknown[]) => void) & {
      q?: unknown[];
      loaded?: boolean;
      ns?: Record<string, CalFn>;
    };
    type WinWithCal = Window & { Cal?: CalFn };
    const w = window as WinWithCal;

    const init = () => {
      const Cal = w.Cal as CalFn | undefined;
      if (!Cal) return;
      Cal("init", namespace, { origin: "https://cal.com" });
      const ns = Cal.ns?.[namespace] as CalFn;
      if (!ns) return;
      ns("inline", {
        elementOrSelector: `#cal-inline-${namespace}`,
        config: { layout: "month_view" },
        calLink: link,
      });
      ns("ui", {
        hideEventTypeDetails: false,
        layout: "month_view",
      });
      ns("on", {
        action: "bookingSuccessful",
        callback: () => track(EVENT.calendarBookingStarted, { source: "cal-page" }),
      });
    };

    if (w.Cal) {
      init();
      return;
    }

    // Inject the loader once
    const existing = document.querySelector<HTMLScriptElement>("script[data-cal-loader]");
    if (existing) {
      existing.addEventListener("load", init, { once: true });
      return;
    }

    // Inline the official Cal.com loader (verbatim from Cal docs)
    const s = document.createElement("script");
    s.dataset.calLoader = "1";
    s.text = `(function (C, A, L) { let p = function (a, ar) { a.q.push(ar); }; let d = C.document; C.Cal = C.Cal || function () { let cal = C.Cal; let ar = arguments; if (!cal.loaded) { cal.ns = {}; cal.q = cal.q || []; d.head.appendChild(d.createElement("script")).src = A; cal.loaded = true; } if (ar[0] === L) { const api = function () { p(api, arguments); }; const namespace = ar[1]; api.q = api.q || []; if(typeof namespace === "string"){cal.ns[namespace] = cal.ns[namespace] || api;p(cal.ns[namespace], ar);p(cal, ["initNamespace", namespace]);} else p(cal, ar); return;} p(cal, ar); }; })(window, "https://app.cal.com/embed/embed.js", "init");`;
    document.head.appendChild(s);
    // The loader is sync-ish; init on next tick
    setTimeout(init, 0);
  }, [link]);

  return (
    <div
      id={`cal-inline-${namespace}`}
      style={{ minHeight: "640px", width: "100%", overflow: "auto" }}
    />
  );
}
