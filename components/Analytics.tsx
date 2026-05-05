import Script from "next/script";
import { siteConfig } from "@/lib/site-config";

/**
 * Plausible analytics, env-gated.
 *
 * Set NEXT_PUBLIC_PLAUSIBLE_DOMAIN to the domain registered in Plausible
 * (e.g. "campbelldigitalstudio.com") to enable. If unset, this component
 * renders nothing and `lib/analytics.ts#track()` is a no-op.
 */
export default function Analytics() {
  const domain = siteConfig.plausibleDomain;
  if (!domain) return null;
  return (
    <Script
      defer
      data-domain={domain}
      src="https://plausible.io/js/script.tagged-events.js"
      strategy="afterInteractive"
    />
  );
}
