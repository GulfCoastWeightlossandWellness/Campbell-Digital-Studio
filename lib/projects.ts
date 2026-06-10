export type ProjectLabel = "Original Build" | "Original Product";

export type FilterTag = "healthcare" | "local" | "platform" | "full-stack" | "medical" | "static";

export type Tier = 1 | 2 | 3;

export type Industry = "Healthcare" | "Local Services" | "Original Product";

export type Status = "Active Retainer" | "Active" | "Shipped";

export type Screenshot = {
  src: string;
  label: string;
};

export type MetaGridCell = {
  label: string;
  value: string;
};

export type Project = {
  slug: string;
  title: string;
  /** Short display name used in compact rows + nav */
  shortName: string;
  label: ProjectLabel;
  category: string;
  /** Tier 1 = featured anchor, Tier 2 = active, Tier 3 = shipped */
  tier: Tier;
  /** Industry vertical for filtering + verticals landing pages */
  industry: Industry;
  /** Engagement state */
  status: Status;
  /** Calendar year shipped or actively running */
  year: string;
  /** Card copy — outcome-verb led, ≤22 words */
  shortSummary: string;
  summary: string;
  /** Live URL for the deployed project */
  liveUrl: string | null;
  /** Whether to render the project at full case-study depth on the site */
  featured?: boolean;
  /** Project cover image */
  coverImage?: string;
  tags: string[];
  features: string[];
  valuePoints: string[];
  stack: string;
  /** Hosting / runtime (e.g. "Vercel", "Cloudflare Pages") */
  hosting: string;
  /** Approximate launch date (YYYY-MM or year) */
  launched: string;
  challenge: string;
  whatIBuilt: string;
  seoConversion: string;
  businessValue: string;
  screenshotLabels: string[];
  /** Screenshot paths matched by index to screenshotLabels (legacy field used by current template) */
  screenshotImages?: string[];
  /** New screenshots array used by the rebuilt case-study template */
  screenshots: Screenshot[];
  /** 4 meta cells rendered at the top of the case study (sector, stack, status, etc.) */
  metaGrid: MetaGridCell[];
  /** Common-language explanation of why the work is structured the way it is */
  valueExplainer: string;
  filterTags: FilterTag[];
};

export const projects: Project[] = [
  // ── Air Solutions Heating & Cooling ───────────────────────────────────────
  {
    slug: "air-solutions",
    title: "Air Solutions Heating & Cooling",
    shortName: "Air Solutions",
    label: "Original Build",
    category: "HVAC · Multi-City Programmatic SEO",
    tier: 1,
    industry: "Local Services",
    status: "Active Retainer",
    year: "2026",
    featured: true,
    coverImage: "/images/case-studies/covers/air-solutions-live-1-hero.png",
    filterTags: ["full-stack", "local", "platform"],
    valueExplainer:
      "Programmatic SEO is the same architectural pattern Airbnb uses for apartments per city, Zapier for app integrations, and Tripadvisor for restaurants per neighborhood. Applied to a single Baldwin County HVAC contractor, it produces a city × service intersection matrix, an automated content engine, and a category of digital asset no competitor in the market currently occupies.",
    shortSummary:
      "Migrated a 36-page WordPress brochure into a 345-page programmatic-SEO HVAC platform — city × service matrix, native blog engine, four custom tools.",
    summary:
      "Air Solutions Heating & Cooling migrated from a 36-page WordPress brochure to a programmatic-SEO platform now live at airsolutionspros.com — 345 live pages today: a city × service matrix across Baldwin County, a 9-type Schema.org architecture, four custom interactive tools, and a native blog engine running 450+ posts on a weekday drip. The same architectural pattern Netflix and Vercel use for production applications, applied to a local HVAC contractor in coastal Alabama.",
    liveUrl: "https://airsolutionspros.com",
    tags: ["HVAC", "Programmatic SEO", "Custom Tools", "Next.js"],
    features: [
      "345 live pages today — verified on the live sitemap, 2026-06-09 (was a 36-page WordPress brochure)",
      "Programmatic city × service matrix across Baldwin County — every market the trucks operate in, individually routed",
      "Service hub pages — AC repair, AC installation, AC maintenance, heating repair, heating installation, heat pump, mini-split, IAQ, commercial, emergency",
      "City hub pages across Baldwin County — Daphne, Fairhope, Foley, Gulf Shores, Orange Beach, and more",
      "Commercial vertical pages — restaurants, vacation rentals, property managers",
      "Seasonal landing pages — spring, summer, fall, winter campaigns",
      "Native blog engine — 450+ posts on a weekday drip, Vercel cron, no plugin, no CMS subscription",
      "Live NWS hurricane alert API integration — non-dismissable banner during severe alerts",
      "3D AC Explorer — Three.js interactive component visualization",
      "HVAC Diagnostic Quiz — typed decision-tree symptom triage",
      "Repair vs. Replace ROI Calculator — live financial modeling tool",
      "Financing payment estimator — fourth interactive tool",
      "9-type Schema.org architecture — HVACBusiness subtype, OfferCatalog, per-city postalCode arrays",
      "Single source of truth data architecture — one edit propagates across all routes",
      "Smart form pipeline — Zod validation, Cloudflare Turnstile, Resend, intent routing",
      "GBP API automation pipeline — Telegram bot field intake, programmatic photo upload, review-response drafting",
      "12-section Google Business Profile operating manual delivered at launch",
      "Ongoing GBP operations retainer — review velocity, photo cadence, posts, Q&A, NAP integrity across 30+ directories",
    ],
    valuePoints: [
      "Closes the Share of Local Voice gap in south Baldwin markets — Foley, Gulf Shores, Orange Beach — where the business showed 0% before launch",
      "Programmatic city × service architecture covers every market the trucks operate in, not just the city of record",
      "Native blog engine compounds the authority signal at a cadence competitors publishing 0–2 posts a month cannot match",
      "Four custom interactive tools no competitor in the county offers",
      "GBP operations retainer running monthly with the GBP API automation pipeline live",
    ],
    stack:
      "Next.js, TypeScript, Tailwind, Three.js (3D explorer), Vercel Cron, Cloudflare Turnstile, Resend, Zod, NWS Public Alert API, 9-Type Schema.org, custom native blog engine",
    hosting: "Vercel",
    launched: "2026-06",
    challenge:
      "The previous airsolutionspros.com site was a 36-page WordPress brochure being maintained, not built to compete. Despite Air Solutions holding the strongest review velocity in Baldwin County, the business showed 0% Share of Local Voice in south Baldwin markets — Foley, Gulf Shores, Orange Beach — where its trucks operate daily. Distance to the home address is fixed; relevance is improvable. The platform's job was to close the relevance gap with dedicated city × service pages, then sustain that advantage with a content engine that publishes without manual intervention.",
    whatIBuilt:
      "A Next.js application now live at airsolutionspros.com with 345 indexed pages — a 9-type Schema.org architecture, a programmatic city × service matrix across Baldwin County, a native blog engine running 450+ posts on a weekday drip via Vercel cron with no plugin or CMS dependency, a 4-tier seasonal banner system including a live National Weather Service hurricane alert integration, four custom interactive tools (a Three.js 3D AC Explorer, a typed diagnostic quiz, a Repair vs. Replace ROI calculator, and a financing estimator), a smart form pipeline with Zod validation and Cloudflare Turnstile, a single source of truth data architecture, and a 12-section GBP operating manual delivered at launch.",
    seoConversion:
      "Built around the programmatic-SEO methodology used at the enterprise level by Airbnb, Zapier, Tripadvisor, and Zillow — applied to a single county. Every city × service combination is a standalone indexed page with unique local content, proper metadata, schema markup, and internal links — 345 live pages on the sitemap today. The 9-type Schema.org architecture includes the HVACBusiness subtype, OfferCatalog with all services listed, and per-city postalCode arrays across Baldwin County — enterprise-level structured data implementation at a local-contractor scale.",
    businessValue:
      "Gives Air Solutions the strongest technical local-search platform in Baldwin County HVAC. Edge markets where no competitor has a single dedicated page now have their own city × service pages. The content engine compounds: every post that indexes adds an authority signal Google reads as active business, on a publishing cadence competitors cannot match.",
    screenshotLabels: [
      "Homepage hero — Heating & Cooling, Done Right",
      "HVAC services hub",
      "City coverage across Baldwin County",
      "Four interactive tools — gated discovery",
      "Native blog engine — weekday drip",
      "Reviews + GBP automation",
    ],
    screenshotImages: [
      "/images/case-studies/covers/air-solutions-live-1-hero.png",
      "/images/case-studies/covers/air-solutions-live-2-services.png",
      "/images/case-studies/covers/air-solutions-live-3-cities.png",
      "/images/case-studies/covers/air-solutions-live-4-tools.png",
      "/images/case-studies/covers/air-solutions-live-5-blog.png",
      "/images/case-studies/covers/air-solutions-live-6-reviews.png",
    ],
    screenshots: [
      { src: "/images/case-studies/covers/air-solutions-live-1-hero.png", label: "Homepage hero — Heating & Cooling, Done Right" },
      { src: "/images/case-studies/covers/air-solutions-live-2-services.png", label: "HVAC services hub" },
      { src: "/images/case-studies/covers/air-solutions-live-3-cities.png", label: "City coverage across Baldwin County" },
      { src: "/images/case-studies/covers/air-solutions-live-4-tools.png", label: "Four interactive tools — gated discovery" },
      { src: "/images/case-studies/covers/air-solutions-live-5-blog.png", label: "Native blog engine — weekday drip" },
      { src: "/images/case-studies/covers/air-solutions-live-6-reviews.png", label: "Reviews + GBP automation" },
    ],
    metaGrid: [
      { label: "Sector", value: "HVAC · Local Services" },
      { label: "Stack", value: "Next.js + Vercel" },
      { label: "Engagement", value: "Active Retainer" },
      { label: "Live pages", value: "345" },
    ],
  },

  // ── Pro 1 Painters ────────────────────────────────────────────────────────
  {
    slug: "pro-1-painters",
    title: "Pro 1 Painters",
    shortName: "Pro 1 Painters",
    label: "Original Build",
    category: "Painting · Multi-Location + AI Color Visualizer",
    tier: 1,
    industry: "Local Services",
    status: "Active",
    year: "2026",
    featured: true,
    coverImage: "/images/case-studies/covers/pro-1-1-hero.png",
    filterTags: ["full-stack", "local", "platform"],
    valueExplainer:
      "Two things make this build different from a brochure site. The first is the AI Color Visualizer: a homeowner snaps a photo of their own room or house, taps a real paint color, and sees it repainted on the spot — the computer vision runs entirely in the browser, so it is private, instant, and costs nothing to serve. The second is the programmatic painting platform underneath it — a 424-page site that gives every city Pro 1 covers and every service it offers its own findable page, fed by a native blog engine instead of a CMS plugin. A tool that answers the one question every painting customer actually has — 'what will it look like?' — sitting on top of an SEO platform that makes the business findable in the first place.",
    shortSummary:
      "Migrated a WordPress painting site to a 424-page Next.js platform with an on-device AI Color Visualizer across Mobile and Baldwin County.",
    summary:
      "Pro 1 Painters migrated from WordPress to a Next.js platform now live at pro1painters.com — 424 live pages serving two locations (Mobile and Baldwin County, AL) across interior and exterior painting, cabinet refinishing, and floor painting. The flagship is an on-device AI Color Visualizer: snap a room or exterior, tap a real paint color, and see it repainted instantly in the browser at no cost. Underneath sits a programmatic city × service architecture, a 521-post two-year native blog engine on a weekday drip, and a CDS-managed two-profile Google Business operation with GBP API automation and Telegram field-photo intake.",
    liveUrl: "https://pro1painters.com",
    tags: ["Painting", "AI Color Visualizer", "Programmatic SEO", "Next.js"],
    features: [
      "424 live pages today — verified on the live sitemap, 2026-06-09 (migrated off WordPress)",
      "On-device AI Color Visualizer at /tools/color-visualizer — snap a room or exterior, tap a real paint color, see it repainted instantly, private and in-browser at $0",
      "Programmatic city × service architecture across two metros — Mobile and Baldwin County (Spanish Fort)",
      "Interior & exterior painting, cabinet painting and refinishing, and floor painting — each a findable, indexed service",
      "521-post native blog engine — a two-year Mon–Fri drip on Vercel cron, no plugin, no CMS subscription",
      "Two Google Business Profiles managed by the studio — GBP API automation plus Telegram field-photo intake from the crew",
      "Clean WordPress → Next.js migration — DNS cutover 2026-06-07, Google Workspace email preserved, 75/75 legacy URLs return 200",
      "Faulty migration paths reclaimed — /concrete-coatings/ 301-redirects to /floor-painting/",
      "Single source of truth data architecture — one edit propagates across every city and service route",
      "Family-owned, warranty-backed positioning — one accountable crew with manager sign-off on every job",
    ],
    valuePoints: [
      "An on-device AI Color Visualizer answers the question every painting customer has — 'what will it look like?' — before they ever call",
      "Computer vision runs entirely in the browser: private, instant, and $0 to serve at any volume",
      "Programmatic city × service architecture makes the business findable across both metros, not just the city of record",
      "A 521-post blog engine compounds authority on a weekday cadence competitors cannot match",
      "Two managed Google Business Profiles with API automation and crew photo intake keep both locations active",
    ],
    stack:
      "Next.js, TypeScript, Tailwind, on-device computer vision (in-browser image segmentation + recolor), Vercel Cron, 9-Type Schema.org, custom native blog engine, GBP API automation, Telegram field-photo intake",
    hosting: "Vercel",
    launched: "2026-06",
    challenge:
      "Pro 1 Painters runs two locations — Mobile and Baldwin County — on a WordPress site that flattened the work into a handful of brochure pages and carried a faulty migration that mislabeled the floor-painting service as concrete coatings. Two metros' worth of demand was collapsing onto generic pages, and the business had no way to show a homeowner what a color would actually look like on their own walls. The build had to give every city and service its own findable page, undo the bad migration cleanly, and put a genuinely useful tool in front of customers at the top of the funnel.",
    whatIBuilt:
      "A Next.js application now live at pro1painters.com with 424 indexed pages — an on-device AI Color Visualizer at /tools/color-visualizer that segments a homeowner's photo and recolors surfaces with a real paint pick entirely in the browser, a programmatic city × service architecture across Mobile and Baldwin County, a 521-post native blog engine on a two-year weekday drip via Vercel cron, a single source of truth data architecture, and a two-profile Google Business operation with GBP API automation and Telegram field-photo intake. Migrated the site off WordPress with the DNS cutover on 2026-06-07 — Google Workspace email preserved, all 75 legacy URLs returning 200, and the mislabeled /concrete-coatings/ path 301-redirected to /floor-painting/.",
    seoConversion:
      "Every city × service combination is a standalone indexed page with unique local content, metadata, schema, and internal links — 424 live pages on the sitemap today, up from a thin WordPress brochure. The migration preserved all 75 legacy URLs (verified 200) and 301-redirected the faulty /concrete-coatings/ path to /floor-painting/ so no equity leaked. The native blog engine drips 521 posts over two years on weekdays with no CMS dependency, and the AI Color Visualizer gives the site a top-of-funnel reason to share and return that competitors do not offer.",
    businessValue:
      "Gives Pro 1 a findable page for every city and service across two metros, a content engine that compounds authority on a cadence competitors cannot match, and a flagship tool that turns 'what will it look like?' into an answer a homeowner gets on their own phone. Two managed Google Business Profiles with API automation and crew photo intake keep both locations active. Family-owned and warranty-backed, with one accountable crew and manager sign-off on every job.",
    screenshotLabels: [
      "Homepage hero — Pro 1 Painters",
      "AI Color Visualizer — on-device repaint",
      "Painting services overview",
      "Floor painting — dedicated service",
      "City coverage — Mobile + Baldwin County",
      "Native blog engine — weekday drip",
      "Recent projects — Gulf Coast gallery",
      "Contact and quote request",
    ],
    screenshotImages: [
      "/images/case-studies/covers/pro-1-1-hero.png",
      "/images/case-studies/covers/pro-1-2-color-visualizer.png",
      "/images/case-studies/covers/pro-1-3-services.png",
      "/images/case-studies/covers/pro-1-4-floor-painting.png",
      "/images/case-studies/covers/pro-1-5-cities.png",
      "/images/case-studies/covers/pro-1-6-blog.png",
      "/images/case-studies/covers/pro-1-7-reviews.png",
      "/images/case-studies/covers/pro-1-8-contact.png",
    ],
    screenshots: [
      { src: "/images/case-studies/covers/pro-1-1-hero.png", label: "Homepage hero — Pro 1 Painters" },
      { src: "/images/case-studies/covers/pro-1-2-color-visualizer.png", label: "AI Color Visualizer — on-device repaint" },
      { src: "/images/case-studies/covers/pro-1-3-services.png", label: "Painting services overview" },
      { src: "/images/case-studies/covers/pro-1-4-floor-painting.png", label: "Floor painting — dedicated service" },
      { src: "/images/case-studies/covers/pro-1-5-cities.png", label: "City coverage — Mobile + Baldwin County" },
      { src: "/images/case-studies/covers/pro-1-6-blog.png", label: "Native blog engine — weekday drip" },
      { src: "/images/case-studies/covers/pro-1-7-reviews.png", label: "Recent projects — Gulf Coast gallery" },
      { src: "/images/case-studies/covers/pro-1-8-contact.png", label: "Contact and quote request" },
    ],
    metaGrid: [
      { label: "Sector", value: "Painting · Local Services" },
      { label: "Stack", value: "Next.js + Vercel" },
      { label: "Status", value: "Active" },
      { label: "Scope", value: "2 locations · 424 pages" },
    ],
  },

  // ── Revitalize Medical & Wellness ─────────────────────────────────────────
  {
    slug: "revitalize",
    title: "Revitalize Medical & Wellness",
    shortName: "Revitalize",
    label: "Original Build",
    category: "Multi-Location Medical Practice",
    tier: 1,
    industry: "Healthcare",
    status: "Active Retainer",
    year: "2026",
    featured: true,
    coverImage: "/images/case-studies/covers/revitalize-1-hero.png",
    filterTags: ["full-stack", "medical", "healthcare", "platform"],
    valueExplainer:
      "Revitalize had a clinic, a separate book, a separate nutrition shop, a separate coaching institute, and no system that connected them. The build unified all of it into one ecosystem with one brand voice and one navigation logic, while keeping each business operationally separate.",
    shortSummary:
      "Migrated a two-clinic medspa, a supplement brand, a published book, and a coaching institute into one 50-route Next.js ecosystem.",
    summary:
      "Revitalize is a multi-location medical aesthetics, hormone, and weight-management practice operating two clinics in Columbus and Warner Robins, Georgia. The build replaced a template medspa site with a clinical platform spanning 72 page.tsx routes, 18 service pages, two-location SEO, an interactive hormone health assessment, a searchable Learning Library, and JaneApp booking flows per location — and connected three additional businesses (a supplement shop, a published book, and a coaching institute) under one brand system.",
    liveUrl: "https://www.revitalizemedicalclinic.com/",
    tags: ["Healthcare", "Multi-Location", "Medspa", "Next.js"],
    features: [
      "Main clinic platform — 72 page.tsx routes across the practice",
      "18 individual service pages — neuromodulators, fillers, hormone therapy, weight loss, IV hydration, laser, PRP, and more",
      "2 location pages with NAP details, hours, and booking integration",
      "City-specific service landing pages for Columbus and Warner Robins",
      "Learning Library architecture for clinical content at scale",
      "Hormone Health Self-Assessment interactive patient tool",
      "Treatment Finder interactive guide",
      "Patient onboarding pathway and Start Here flow",
      "Provider profiles and team page",
      "Payment plans page for treatment accessibility",
      "Location-specific JaneApp booking integration",
      "23 custom components shared across the ecosystem",
      "Connected nutrition supplement shop on its own subdomain",
      "Book microsite with multi-platform retailer integration",
      "Rebuild Metabolic Health Institute — coaching microsite",
      "Brand system spanning all four properties",
      "Auburn location closure cleanup and redirect strategy",
      "Dynamic sitemap and JSON-LD medical schema markup",
      "RSS feed and JSON index endpoint for content discoverability",
      "Mobile sticky booking, call, and Start Here bar",
    ],
    valuePoints: [
      "Two clinic locations with dedicated SEO instead of one shared brochure page",
      "Eighteen service pages a patient can find by name instead of a flattened menu",
      "A connected ecosystem (clinic + shop + book + institute) under one brand voice",
      "Booking, content, and provider information all routed through one architecture",
      "Patient education that builds authority before the first appointment",
    ],
    stack:
      "Next.js 16, React 19, TypeScript, Tailwind CSS, Vercel, App Router, Dynamic Sitemap, JSON-LD Medical Schema, RSS Feed, JaneApp Booking Integration, Shopify (nutrition shop)",
    hosting: "Vercel",
    launched: "2026",
    challenge:
      "Revitalize had grown into four separate businesses — a two-location aesthetics and hormone clinic, a published book, a nutrition supplement brand, and a coaching institute — each with its own audience, its own commercial logic, and no system connecting them. The existing template site presented one of those four (the clinic) as a flat brochure with minimal local SEO, an outdated location footprint, and no patient-facing tools. Patients had no clear pathway to book, understand services, or compare locations. The other three businesses lived elsewhere on the internet, invisible to anyone who came in through the clinic site.",
    whatIBuilt:
      "A 72-route clinical marketing platform built around 18 individual service pages, dedicated location SEO for Columbus and Warner Robins, a structured Start Here patient pathway, an interactive hormone health assessment, a treatment finder, a searchable Learning Library, provider profiles, payment plans, and JaneApp booking flows per location. Connected the supplement brand, the book, and the coaching institute under one brand system so the four businesses cross-reference each other without merging operationally. Cleaned up a closed-location footprint with a redirect strategy that preserved existing rankings.",
    seoConversion:
      "Built dedicated city-level service pages for Columbus and Warner Robins — Botox, hormone therapy, medical weight loss, and IV hydration each have city-specific landing pages instead of one shared service page. Added JSON-LD schema for the medical practice entity, dynamic sitemap, and RSS feed. The Learning Library structure means content scales without a CMS subscription, and each article has its own metadata, schema, and internal linking. Booking infrastructure is location-aware so patient flow is routed to the correct JaneApp instance from any service page.",
    businessValue:
      "Gives Revitalize a clear two-location digital footprint, an 18-service searchable architecture, and a content system that grows with the practice. The connected ecosystem (clinic + shop + book + institute) means a patient who arrives for hormone therapy can discover the practice's published book, the supplement line they prescribe, and the coaching institute that supports long-term care — all without leaving the brand. Each business stays operationally separate; the architecture connects them.",
    screenshotLabels: [
      "Homepage — hero and new patient pathway",
      "Start Here — onboarding flow",
      "Treatment Finder — interactive guide",
      "Columbus location — local SEO",
      "Learning Library — clinical articles",
    ],
    screenshotImages: [
      "/images/case-studies/covers/revitalize-1-hero.png",
      "/images/case-studies/covers/revitalize-2-pathways.png",
      "/images/case-studies/covers/revitalize-3-services.png",
      "/images/case-studies/covers/revitalize-4-tools.png",
      "/images/case-studies/covers/revitalize-5-library.png",
    ],
    screenshots: [
      { src: "/images/case-studies/covers/revitalize-1-hero.png", label: "Homepage — hero and new patient pathway" },
      { src: "/images/case-studies/covers/revitalize-2-pathways.png", label: "Start Here — onboarding flow" },
      { src: "/images/case-studies/covers/revitalize-3-services.png", label: "18 service pages — searchable architecture" },
      { src: "/images/case-studies/covers/revitalize-4-tools.png", label: "Treatment Finder — interactive guide" },
      { src: "/images/case-studies/covers/revitalize-5-library.png", label: "Learning Library — clinical articles at scale" },
    ],
    metaGrid: [
      { label: "Sector", value: "Healthcare · Multi-location" },
      { label: "Stack", value: "Next.js 16 + React 19" },
      { label: "Engagement", value: "Active Retainer" },
      { label: "Routes", value: "72 page.tsx" },
    ],
  },

  // ── IHE Marketing ────────────────────────────────────────────────────────
  {
    slug: "ihe-marketing",
    title: "IHE Marketing",
    shortName: "IHE Marketing",
    label: "Original Product",
    category: "Digital Health · Marketing Site",
    tier: 2,
    industry: "Original Product",
    status: "Active",
    year: "2026",
    featured: true,
    coverImage: "/images/case-studies/covers/ihe-marketing-1-hero.png",
    filterTags: ["full-stack", "healthcare", "platform"],
    valueExplainer:
      "The public-facing marketing site for Interactive Health Education — the original digital-health product line shipped by the studio. Communicates the platform's value to clinicians and patients, routes visitors into bundles and the education funnel, and links through to the live dashboard product.",
    shortSummary:
      "Public marketing site for an original digital-health product line — landing, bundles, and education funnel.",
    summary:
      "Interactive Health Education is the studio's original digital-health product — a library of patient-education apps served from a unified dashboard. The marketing site is the public storefront: positioning, education funnel, bundles, and the handoff into the dashboard product. Built as a standalone Next.js application alongside the product dashboard.",
    liveUrl: "https://www.interactivehealtheducation.com/",
    tags: ["Healthcare", "Digital Health", "Marketing Site", "Next.js"],
    features: [
      "Landing page with the platform thesis and product positioning",
      "Education funnel for clinicians + patients",
      "Bundles page — packaging IHE app collections for clinic deployment",
      "Featured apps row pulling from the product registry",
      "Footer CTA flowing into the live dashboard",
      "Open Graph image generators for shareable links",
      "JSON-LD structured data for healthcare product entity",
      "Mobile-first responsive layout",
    ],
    valuePoints: [
      "Public storefront for an original studio product line — not a client engagement",
      "Education funnel routes clinicians and patients into the right entry point",
      "Bundles let clinics deploy collections of apps for specific conditions",
    ],
    stack: "Next.js, TypeScript, Tailwind CSS, Vercel, App Router, JSON-LD Schema, Open Graph image generation",
    hosting: "Vercel",
    launched: "2026",
    challenge:
      "Interactive Health Education needed a public-facing marketing presence distinct from the product dashboard — somewhere clinicians could understand the platform's thesis, browse the app library at the bundle level, and get routed to the right entry point. The marketing site had to communicate scale (146 apps shipped) without burying clinicians in the full library before they understood the value.",
    whatIBuilt:
      "A standalone Next.js marketing site with hero positioning, an education funnel, a bundles page that packages apps by condition or specialty, a featured-apps row pulling live from the product registry, and a footer CTA that routes visitors into the dashboard. Built alongside — not inside — the product dashboard so the marketing surface can evolve independently.",
    seoConversion:
      "Structured data for the healthcare-product entity, Open Graph images for shareable bundle URLs, and a clear funnel from landing → bundles → dashboard. The marketing site is the SEO entry point; the dashboard is the product surface.",
    businessValue:
      "Gives IHE a public storefront that converts clinician interest into dashboard usage. The bundles construct turns 146 individual apps into purchasable collections — a packaging move that lets clinics deploy at the condition level rather than picking apps individually.",
    screenshotLabels: [
      "Homepage hero — IHE platform positioning",
      "Education funnel — clinician + patient pathways",
      "Featured apps row from the live registry",
      "Bundles — condition-level app packaging",
      "Footer CTA — handoff to the dashboard",
    ],
    screenshotImages: [
      "/images/case-studies/covers/ihe-marketing-1-hero.png",
      "/images/case-studies/covers/ihe-marketing-2-flow.png",
      "/images/case-studies/covers/ihe-marketing-3-featured.png",
      "/images/case-studies/covers/ihe-marketing-4-bundles.png",
      "/images/case-studies/covers/ihe-marketing-5-footer-cta.png",
    ],
    screenshots: [
      { src: "/images/case-studies/covers/ihe-marketing-1-hero.png", label: "Homepage hero — IHE platform positioning" },
      { src: "/images/case-studies/covers/ihe-marketing-2-flow.png", label: "Education funnel — clinician + patient pathways" },
      { src: "/images/case-studies/covers/ihe-marketing-3-featured.png", label: "Featured apps row from the live registry" },
      { src: "/images/case-studies/covers/ihe-marketing-4-bundles.png", label: "Bundles — condition-level app packaging" },
      { src: "/images/case-studies/covers/ihe-marketing-5-footer-cta.png", label: "Footer CTA — handoff to the dashboard" },
    ],
    metaGrid: [
      { label: "Sector", value: "Digital Health · Marketing" },
      { label: "Stack", value: "Next.js + Vercel" },
      { label: "Type", value: "Original Product" },
      { label: "Status", value: "Active" },
    ],
  },

  // ── IHE Dashboard ────────────────────────────────────────────────────────
  {
    slug: "ihe-dashboard",
    title: "IHE Dashboard",
    shortName: "IHE Dashboard",
    label: "Original Product",
    category: "Digital Health · Product Dashboard",
    tier: 2,
    industry: "Original Product",
    status: "Active",
    year: "2026",
    featured: true,
    coverImage: "/images/case-studies/covers/ihe-dashboard-1-home.png",
    filterTags: ["full-stack", "healthcare", "platform", "medical"],
    valueExplainer:
      "The product surface for Interactive Health Education — a library of 146 patient-education apps served from one unified dashboard. Each app is an interactive React module with a canonical category, clinical content, and a registry entry. Built solo during family-medicine residency.",
    shortSummary:
      "Live patient-education app with 146 interactive clinical modules served from a unified dashboard. Built solo during family-medicine residency.",
    summary:
      "Interactive Health Education's product dashboard hosts 146 interactive clinical modules — each one a standalone React/TypeScript app addressing a specific condition, procedure, or patient-education topic. The dashboard provides a unified library view, search, categorization, and per-app registration via a typed registry. Built solo by a family-medicine resident across one year of evenings and weekends.",
    liveUrl: "https://dashboard.interactivehealtheducation.com/",
    tags: ["Healthcare", "Digital Health", "Product Dashboard", "React"],
    features: [
      "146 interactive patient-education apps shipped",
      "Unified dashboard library view — grid and list modes",
      "Typed registry (AppList.ts) — single source of truth for every app",
      "Canonical category taxonomy across the library",
      "Per-app thumbnails — 146 generated covers",
      "Search and filter across the full library",
      "TypeScript validation and CI gates on every app added",
      "Prettier + ESLint formatting pipeline",
      "Git plumbing workaround for Cursor-locked index files",
      "Registrar skill for end-to-end app integration",
      "React + TypeScript + Tailwind stack across all apps",
      "Built solo during family-medicine residency",
    ],
    valuePoints: [
      "146 individual apps — a library no template medspa product has",
      "Unified dashboard means clinics deploy the whole library, not one app at a time",
      "Built solo by a practicing physician — clinical accuracy and tone built in, not bolted on",
    ],
    stack: "React, TypeScript, Tailwind CSS, Vite, Vercel, typed registry pattern, Prettier + ESLint, custom registrar skill",
    hosting: "Vercel",
    launched: "2025",
    challenge:
      "Patient education in clinical practice is dominated by paper handouts and PDF printouts — passive, generic, and rarely read. The challenge was building an interactive alternative at scale: 100+ apps covering the conditions a family-medicine practice actually sees, each one self-contained, each one consistent in tone and visual language, all served from one library a clinic can deploy in a day. And building it solo, in the evenings, while completing residency.",
    whatIBuilt:
      "A dashboard application hosting 146 interactive React/TypeScript apps, each with its own slug, route, thumbnail, canonical category, and registry entry. Added an end-to-end registrar skill that validates new apps, fixes the three most common CI errors automatically, formats with Prettier, lints, updates AppList.ts with canonical categories, generates thumbnails, and commits via the git plumbing workaround required for Cursor-locked index files. One command, zero manual steps.",
    seoConversion:
      "The dashboard is a product surface, not a SEO surface — discoverability runs through the IHE Marketing site. Inside the dashboard, the library architecture lets clinicians find apps by category, condition, or search; the registry pattern means new apps integrate without manual route wiring.",
    businessValue:
      "Gives clinics a deployable interactive-education library that scales with the practice. Each app is a self-contained patient-facing module — handed to the patient on a tablet, sent as a link, or embedded in an after-visit summary. The library construct means the value compounds: clinics deploy once and get 146 apps, not one.",
    screenshotLabels: [
      "Dashboard home — library entry point",
      "App grid view — categorized library",
      "Continued grid — full app coverage",
      "List view — searchable index",
      "Continued list — full registry",
    ],
    screenshotImages: [
      "/images/case-studies/covers/ihe-dashboard-1-home.png",
      "/images/case-studies/covers/ihe-dashboard-2-grid.png",
      "/images/case-studies/covers/ihe-dashboard-3-grid-lower.png",
      "/images/case-studies/covers/ihe-dashboard-4-list-view.png",
      "/images/case-studies/covers/ihe-dashboard-5-list-lower.png",
    ],
    screenshots: [
      { src: "/images/case-studies/covers/ihe-dashboard-1-home.png", label: "Dashboard home — library entry point" },
      { src: "/images/case-studies/covers/ihe-dashboard-2-grid.png", label: "App grid view — categorized library" },
      { src: "/images/case-studies/covers/ihe-dashboard-3-grid-lower.png", label: "Continued grid — full app coverage" },
      { src: "/images/case-studies/covers/ihe-dashboard-4-list-view.png", label: "List view — searchable index" },
      { src: "/images/case-studies/covers/ihe-dashboard-5-list-lower.png", label: "Continued list — full registry" },
    ],
    metaGrid: [
      { label: "Sector", value: "Digital Health · Product" },
      { label: "Stack", value: "React + TypeScript + Vite" },
      { label: "Type", value: "Original Product" },
      { label: "Apps shipped", value: "146" },
    ],
  },

  // ── ACExperts251 ─────────────────────────────────────────────────────────
  {
    slug: "acexperts",
    title: "ACExperts251",
    shortName: "ACExperts",
    label: "Original Build",
    category: "HVAC · Local SEO",
    tier: 1,
    industry: "Local Services",
    status: "Active Retainer",
    year: "2026",
    featured: true,
    coverImage: "/images/case-studies/covers/acexperts-1-hero.png",
    filterTags: ["full-stack", "local"],
    valueExplainer:
      "A full-stack Next.js HVAC site for Baldwin County with seven service pages, eight city pages, three interactive tools, and direct lead capture into a Google Sheet the owner reads.",
    shortSummary:
      "Shipped an 8-city × 7-service HVAC build with three interactive tools, Lighthouse CI, and Sheets-backed lead capture.",
    summary:
      "ACExperts251 needed a website that matched the quality of their work and gave homeowners every reason to call over a competitor. The result is a full-stack Next.js application with structured service and city pages, three interactive diagnostic tools, API-backed form handling, and a live Google Reviews integration.",
    liveUrl: "https://www.acexperts251.com/",
    tags: ["HVAC", "Local SEO", "Interactive Tools"],
    features: [
      "7 dedicated service pages with dynamic routing",
      "8 city pages covering all major Baldwin County markets",
      "3D interactive AC system diagnostic tool (Three.js / WebGL)",
      "AC diagnostic quiz — symptom-to-likely-repair guide",
      "ROI calculator for HVAC replacement decisions",
      "Cloudflare Turnstile CAPTCHA on all forms",
      "Google Sheets API integration for direct lead capture",
      "Live Google Reviews widget",
      "Emergency service and Comfort Club maintenance pages",
      "Lighthouse CI on every commit",
    ],
    valuePoints: [
      "Three interactive tools no other Baldwin County HVAC competitor offers",
      "Server-side form handling with spam protection and direct lead capture",
      "8-city service-area SEO covering the full county footprint",
    ],
    stack: "Next.js, TypeScript, Tailwind, Vercel, Three.js / WebGL, Cloudflare Turnstile, Google Sheets API, Lighthouse CI",
    hosting: "Vercel",
    launched: "2025",
    challenge:
      "HVAC competitors in Baldwin County have minimal web presences — outdated sites with no service structure, weak local SEO, no interactive tools, and no clear reason for a homeowner to call over another option. ACExperts needed a site that established authority quickly.",
    whatIBuilt:
      "A full-stack Next.js application with 7 dynamic service pages, 8 city SEO pages, 3 interactive tools, API routes for form handling with Cloudflare Turnstile and Google Sheets lead capture, a live Google Reviews widget, and dedicated pages for emergency service, maintenance plans, and financing.",
    seoConversion:
      "8 city-specific pages, 7 service-specific pages targeting high-intent HVAC search terms, LLMs.txt for AI search discoverability, and a CTA hierarchy structured to drive phone calls, contact submissions, and scheduling flows.",
    businessValue:
      "Gives ACExperts a credible, professional full-stack presence that earns trust before the first call, supports local search rankings across 8 cities, and turns homeowner questions into booked service calls through interactive tools no competitor offers.",
    screenshotLabels: [
      "Homepage — hero and service overview",
      "Service pages — installation and repair",
      "City coverage — Baldwin County",
      "Financing and maintenance plans",
      "Contact and service request flow",
    ],
    screenshotImages: [
      "/images/case-studies/covers/acexperts-1-hero.png",
      "/images/case-studies/covers/acexperts-2-services.png",
      "/images/case-studies/covers/acexperts-3-plan.png",
      "/images/case-studies/covers/acexperts-4-reviews.png",
      "/images/case-studies/covers/acexperts-5-map-contact.png",
    ],
    screenshots: [
      { src: "/images/case-studies/covers/acexperts-1-hero.png", label: "Homepage — hero and service overview" },
      { src: "/images/case-studies/covers/acexperts-2-services.png", label: "Service pages — installation and repair" },
      { src: "/images/case-studies/covers/acexperts-3-plan.png", label: "Financing and maintenance plans" },
      { src: "/images/case-studies/covers/acexperts-4-reviews.png", label: "Live Google Reviews widget" },
      { src: "/images/case-studies/covers/acexperts-5-map-contact.png", label: "Contact and service request flow" },
    ],
    metaGrid: [
      { label: "Sector", value: "HVAC · Local Services" },
      { label: "Stack", value: "Next.js + Vercel" },
      { label: "Engagement", value: "Active Retainer" },
      { label: "Shipped", value: "2025" },
    ],
  },

  // ── Collective Counseling ─────────────────────────────────────────────────
  {
    slug: "collective-counseling",
    title: "Collective Counseling",
    shortName: "Collective Counseling",
    label: "Original Build",
    category: "Therapy Practice",
    tier: 3,
    industry: "Healthcare",
    status: "Shipped",
    year: "2025",
    featured: true,
    coverImage: "/images/case-studies/covers/collective-1-homepage-hero.png",
    filterTags: ["medical", "healthcare", "static"],
    valueExplainer:
      "A therapy website's job is not to explain services — it's to make a nervous person feel safe enough to send an email. ADHD testing positioned as a cash-pay specialty service on its own dedicated page means it can actually rank.",
    shortSummary:
      "Therapy practice site with a dedicated adult-ADHD-testing landing page and Daphne-local SEO.",
    summary:
      "Collective Counseling needed a site that communicated professionalism and approachability in equal measure — helping prospective clients understand services, know what to expect, and feel safe enough to reach out. A lean, semantic multi-page build was the right choice: fast, focused, and built to rank for the specific service terms that matter most.",
    liveUrl: "https://www.collectivecounselingdaphne.com/",
    tags: ["Therapy", "ADHD Testing", "Local SEO"],
    features: [
      "Multi-page architecture — homepage, therapy, ADHD testing, addiction counseling",
      "Dedicated adult ADHD testing page positioned as a cash-pay specialty",
      "Real therapist photography instead of stock imagery",
      "Insurance and payment clarity section",
      "Local SEO structure for Daphne and Baldwin County",
    ],
    valuePoints: [
      "Dedicated service pages for each specialty — not buried under one menu",
      "ADHD testing as a keyword-specific cash-pay landing page",
      "Real therapist photo instead of stock imagery",
    ],
    stack: "HTML/CSS, Multi-Page Architecture, Semantic SEO Markup, Vercel Deployment",
    hosting: "Vercel",
    launched: "2025",
    challenge:
      "Therapy websites often default to generic template language or overly clinical copy. The challenge was building a site that felt personal and safe without losing professional credibility — while positioning ADHD testing and addiction counseling as distinct, searchable services.",
    whatIBuilt:
      "A focused multi-page site with individual pages for therapy, adult ADHD testing, and addiction counseling — each with service-specific copy, clear fee and insurance information, and a client inquiry flow.",
    seoConversion:
      "Individual pages for each service targeted at specific search terms. Local SEO structured around Daphne and Baldwin County. ADHD testing positioned as a cash-pay specialty to capture high-intent search traffic.",
    businessValue:
      "Gives Collective Counseling a professional, lightweight web presence that makes potential clients feel understood before they call.",
    screenshotLabels: [
      "Homepage — therapy and ADHD testing",
      "Service split — therapy and ADHD evaluation",
      "Meet the therapist",
      "Fees and insurance transparency",
    ],
    screenshotImages: [
      "/images/case-studies/covers/collective-1-homepage-hero.png",
      "/images/case-studies/covers/collective-2-services-split.png",
      "/images/case-studies/covers/collective-3-about-therapist.png",
      "/images/case-studies/covers/collective-4-fees-insurance.png",
    ],
    screenshots: [
      { src: "/images/case-studies/covers/collective-1-homepage-hero.png", label: "Homepage — therapy and ADHD testing" },
      { src: "/images/case-studies/covers/collective-2-services-split.png", label: "Service split — therapy and ADHD evaluation" },
      { src: "/images/case-studies/covers/collective-3-about-therapist.png", label: "Meet the therapist" },
      { src: "/images/case-studies/covers/collective-4-fees-insurance.png", label: "Fees and insurance transparency" },
      { src: "/images/case-studies/covers/collective-6-adhd-page.png", label: "Adult ADHD testing — dedicated landing page" },
    ],
    metaGrid: [
      { label: "Sector", value: "Healthcare · Therapy" },
      { label: "Stack", value: "HTML/CSS · Vercel" },
      { label: "Engagement", value: "Shipped" },
      { label: "Shipped", value: "2025" },
    ],
  },

  // ── Blessed Barbershop ───────────────────────────────────────────────────
  {
    slug: "blessed-barbershop",
    title: "Blessed Barbershop",
    shortName: "Blessed Barbershop",
    label: "Original Build",
    category: "Local Service Business",
    tier: 3,
    industry: "Local Services",
    status: "Shipped",
    year: "2025",
    featured: true,
    coverImage: "/images/case-studies/covers/blessed-1-hero.png",
    filterTags: ["local", "static"],
    valueExplainer:
      "A local barbershop is competing for one search: 'barbershop near me' on a mobile phone. A fast, WebP-optimized site with a frictionless booking link and real shop photography wins that search.",
    shortSummary:
      "Mobile-first barbershop site with service menu, WebP-optimized gallery, and one-tap booking link. Loads in under a second on 3G.",
    summary:
      "Blessed Barbershop needed a modern website that reflected the quality of the shop and made it easy for clients to book online. Built around local search discoverability, sub-second mobile load times, and a frictionless booking experience.",
    liveUrl: "https://www.blessedbarbershopdaphne.com",
    tags: ["Local Business", "Mobile-First", "Booking"],
    features: [
      "Mobile-first HTML/CSS build — fast load with no framework overhead",
      "WebP-optimized image assets",
      "Online booking integration — one-tap from any page",
      "Service menu with clear pricing",
      "Photo gallery of shop and work",
      "Google Business Profile alignment",
      "Sub-second load time on 3G",
    ],
    valuePoints: [
      "WebP-optimized images for fast load on mobile where clients search",
      "Online booking reduces inbound phone volume and no-shows",
      "Service menu with pricing removes the question that stops new clients",
    ],
    stack: "HTML/CSS, WebP-Optimized Media, Mobile-First Layout, Cloudflare Hosting",
    hosting: "Cloudflare Pages",
    launched: "2025",
    challenge:
      "Most barbershops rely on Instagram or Google Maps as their only digital presence. Blessed Barbershop needed a dedicated site that gave new clients confidence and a clear path to booking — fast enough that a 'barbershop near me' search on a phone never bounced.",
    whatIBuilt:
      "A focused, mobile-first barbershop site with a service menu, pricing, online booking flow, real photo gallery, and shop-brand visual identity. Built as lean HTML/CSS with WebP media so first paint on a 3G phone connection lands under a second.",
    seoConversion:
      "Local SEO around Daphne and Baldwin County. Google Business Profile alignment. WebP and lean HTML for fast page-load scores. Mobile tap-to-call CTA at every scroll position.",
    businessValue:
      "A professional digital home that earns client trust before they walk in — with a gallery that shows the work, pricing that removes uncertainty, and a booking flow that converts.",
    screenshotLabels: [
      "Homepage — services and booking CTA",
      "Service menu and pricing",
      "Gallery and social proof",
      "Location, hours, and contact",
    ],
    screenshotImages: [
      "/images/case-studies/covers/blessed-1-hero.png",
      "/images/case-studies/covers/blessed-3-gallery.png",
      "/images/case-studies/covers/blessed-4-reviews.png",
      "/images/case-studies/covers/blessed-5-hours-map.png",
    ],
    screenshots: [
      { src: "/images/case-studies/covers/blessed-1-hero.png", label: "Homepage — services and booking CTA" },
      { src: "/images/case-studies/covers/blessed-2-services.png", label: "Service menu and pricing" },
      { src: "/images/case-studies/covers/blessed-3-gallery.png", label: "Gallery — real shop photography" },
      { src: "/images/case-studies/covers/blessed-4-reviews.png", label: "Recent projects — Gulf Coast gallery" },
      { src: "/images/case-studies/covers/blessed-5-hours-map.png", label: "Location, hours, and contact" },
    ],
    metaGrid: [
      { label: "Sector", value: "Local Services · Barbershop" },
      { label: "Stack", value: "HTML/CSS · Cloudflare" },
      { label: "Engagement", value: "Shipped" },
      { label: "Shipped", value: "2025" },
    ],
  },
];

export function getProjectBySlug(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug);
}

/** All featured projects (Tier 1 + Tier 2 + Tier 3 — the full 7-project lineup). */
export function getFeaturedProjects(): Project[] {
  return projects.filter((p) => p.featured);
}

/** Projects filtered by tier. */
export function getProjectsByTier(tier: Tier): Project[] {
  return projects.filter((p) => p.tier === tier);
}

/** Projects filtered by industry vertical. */
export function getProjectsByIndustry(industry: Industry): Project[] {
  return projects.filter((p) => p.industry === industry);
}

/** Projects currently on an active retainer. */
export function getActiveRetainers(): Project[] {
  return projects.filter((p) => p.status === "Active Retainer");
}

export function getLabelClass(label: ProjectLabel): string {
  switch (label) {
    case "Original Build":
      return "label-build";
    case "Original Product":
      return "label-product";
    default:
      return "label-build";
  }
}
