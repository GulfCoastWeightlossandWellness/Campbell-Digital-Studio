/**
 * Live Matrix Generator — deterministic templater
 *
 * Given a (city, service) tuple, deterministically synthesize a preview of
 * what the corresponding programmatic SEO page would contain: H1, meta
 * description, three FAQs, JSON-LD (rendered inert), and four interlinks.
 *
 * Determinism:
 *   The same (city + service) always yields the same preview. Different
 *   tuples diverge via a stable FNV-1a hash modulo the variant array length.
 *   This is the production-relevant property — clients want the same URL
 *   to render the same content on every crawl, but different cells to
 *   never share boilerplate. (The Wave D2 uniqueness rule.)
 *
 * ⚠ Anti-poison: the JSON-LD string returned here is for display ONLY,
 * rendered in the UI as inert <pre><code>. NEVER inject it into an actual
 * <script type="application/ld+json"> on the homepage — that would poison
 * Google's schema parser for the CDS domain.
 *
 * Edge-runtime safe: no Node APIs, no Buffer, no crypto. Plain string math.
 */

import { CITIES, SERVICES, VARIANTS } from "./corpus";

export type Preview = {
  h1: string;
  meta: string;
  faqs: Array<{ q: string; a: string }>;
  jsonLd: string; // pre-formatted JSON-LD as a string for inert display
  interlinks: string[]; // 4 sibling-service or sibling-city links
  url: string; // would-be production URL — shown in the fake browser chrome
};

// ── Slugging ─────────────────────────────────────────────────────────────
function slugify(s: string): string {
  return s
    .toLowerCase()
    .replace(/&/g, "and")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

// ── Hashing ──────────────────────────────────────────────────────────────
// FNV-1a 32-bit. Deterministic, no dependencies, fast on the edge.
// Domain (sibling) hashing uses a salt so each slot picks an independent
// variant — H1, meta, and FAQ aren't all forced to "variant 0" together.
function fnv1a(input: string): number {
  let hash = 0x811c9dc5;
  for (let i = 0; i < input.length; i++) {
    hash ^= input.charCodeAt(i);
    // 32-bit overflow trick (mimics Math.imul + unsigned shift)
    hash = (hash + ((hash << 1) + (hash << 4) + (hash << 7) + (hash << 8) + (hash << 24))) >>> 0;
  }
  return hash >>> 0;
}

function pick<T>(arr: readonly T[], seed: number): T {
  return arr[seed % arr.length];
}

// ── Interlinks ───────────────────────────────────────────────────────────
// Four sibling links — two "same city, different service" and two
// "same service, different city". This is the real interlink pattern
// shipped on the Air Solutions matrix; the demo shows it accurately.
function buildInterlinks(city: string, service: string): string[] {
  const citySlug = slugify(city);
  const serviceSlug = slugify(service);
  const citySeed = fnv1a(`city-${citySlug}-${serviceSlug}`);
  const serviceSeed = fnv1a(`service-${serviceSlug}-${citySlug}`);

  // Sibling services in the same city
  const siblingServices = SERVICES.filter((s) => s !== service);
  const s1 = siblingServices[citySeed % siblingServices.length];
  const s2 = siblingServices[(citySeed + 7) % siblingServices.length];

  // Sibling cities for the same service
  const siblingCities = CITIES.filter((c) => c !== city);
  const c1 = siblingCities[serviceSeed % siblingCities.length];
  const c2 = siblingCities[(serviceSeed + 11) % siblingCities.length];

  return [
    `${s1} in ${city}`,
    `${s2} in ${city}`,
    `${service} in ${c1}`,
    `${service} in ${c2}`,
  ];
}

// ── JSON-LD (for inert display only) ─────────────────────────────────────
// Generates a Service + FAQPage shaped JSON-LD object that mirrors what
// would ship on the real programmatic SEO page. Pre-stringified and
// indented for the <pre><code> reveal animation.
function buildJsonLd(args: {
  city: string;
  service: string;
  url: string;
  faqs: Array<{ q: string; a: string }>;
  h1: string;
  meta: string;
}): string {
  const { city, service, url, faqs, h1, meta } = args;
  const ld = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Service",
        name: h1,
        description: meta,
        provider: {
          "@type": "HVACBusiness",
          name: "Air Solutions",
          areaServed: { "@type": "City", name: `${city}, AL` },
        },
        serviceType: service,
        url,
      },
      {
        "@type": "FAQPage",
        mainEntity: faqs.map((f) => ({
          "@type": "Question",
          name: f.q,
          acceptedAnswer: { "@type": "Answer", text: f.a },
        })),
      },
    ],
  };
  return JSON.stringify(ld, null, 2);
}

// ── Main entry ───────────────────────────────────────────────────────────
export function generatePreview(city: string, service: string): Preview {
  // Defensive: fall back to first known values so the API never 500s on
  // a stray dropdown value. The validator on the route catches the real
  // bad-input case and returns a clean 400.
  const safeCity = CITIES.includes(city) ? city : CITIES[0];
  const safeService = SERVICES.includes(service) ? service : SERVICES[0];
  const variants = VARIANTS[safeService];

  // Per-slot seeds so H1 / meta / FAQ-set pick independently.
  const baseSeed = fnv1a(`${safeCity}|${safeService}`);
  const h1Seed = fnv1a(`h1|${safeCity}|${safeService}`);
  const metaSeed = fnv1a(`meta|${safeCity}|${safeService}`);
  const faqSeed = fnv1a(`faq|${safeCity}|${safeService}`);

  const h1Template = pick(variants.h1, h1Seed);
  const metaTemplate = pick(variants.meta, metaSeed);
  const faqSet = pick(variants.faqs, faqSeed);

  const h1 = h1Template.replace(/\{city\}/g, safeCity);
  const meta = metaTemplate.replace(/\{city\}/g, safeCity);
  const faqs = faqSet.map((f) => ({
    q: f.q.replace(/\{city\}/g, safeCity),
    a: f.a.replace(/\{city\}/g, safeCity),
  }));

  // Real-domain URL preview — shown in the fake browser chrome of the demo.
  // Stays on the real Air Solutions domain so visitors recognize it as
  // the actual matrix shipped for a real client.
  const url = `https://airsolutionspros.com/${slugify(safeCity)}-al/${slugify(
    safeService,
  )}/`;

  const jsonLd = buildJsonLd({
    city: safeCity,
    service: safeService,
    url,
    faqs,
    h1,
    meta,
  });

  const interlinks = buildInterlinks(safeCity, safeService);

  // baseSeed is intentionally referenced to make the call-graph readable in
  // tooling (Shiki/source-receipt feature in the About page references this
  // file). Touching it costs nothing and keeps the variable named.
  void baseSeed;

  return { h1, meta, faqs, jsonLd, interlinks, url };
}
