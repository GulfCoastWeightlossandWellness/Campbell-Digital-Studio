export type ProjectLabel = "Original Build" | "Original Product";

export type FilterTag = "full-stack" | "medical" | "local" | "platform" | "static";

export type Project = {
  slug: string;
  title: string;
  label: ProjectLabel;
  category: string;
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
  challenge: string;
  whatIBuilt: string;
  seoConversion: string;
  businessValue: string;
  screenshotLabels: string[];
  /** Screenshot paths matched by index to screenshotLabels */
  screenshotImages?: string[];
  /** Common-language explanation of why the work is structured the way it is */
  valueExplainer: string;
  filterTags: FilterTag[];
};

export const projects: Project[] = [
  // ── Revitalize Aesthetics & Wellness ─────────────────────────────────────
  {
    slug: "revitalize",
    title: "Revitalize Aesthetics & Wellness",
    label: "Original Build",
    category: "Multi-Location Medical Practice",
    featured: true,
    coverImage: "/images/case-studies/covers/revitalize-1-hero.png",
    filterTags: ["full-stack", "medical"],
    valueExplainer:
      "Revitalize had a clinic, a separate book, a separate nutrition shop, a separate coaching institute, and no system that connected them. The build unified all of it into one ecosystem with one brand voice and one navigation logic, while keeping each business operationally separate.",
    shortSummary:
      "A multi-location medical aesthetics practice in Georgia. Two clinics, a connected nutrition supplement brand, a published book, and a coaching institute — all under one digital ecosystem.",
    summary:
      "Revitalize is a multi-location medical aesthetics, hormone, and weight-management practice operating two clinics in Columbus and Warner Robins, Georgia. The build replaced a template medspa site with a 50+ route clinical platform spanning 18 service pages, two-location SEO, an interactive hormone health assessment, a searchable Learning Library, and JaneApp booking flows per location — and connected three additional businesses (a supplement shop, a published book, and a coaching institute) under one brand system.",
    liveUrl: "https://revitalize-medical-wellness-clinic-nine.vercel.app",
    tags: ["Healthcare", "Multi-Location", "Medspa", "Next.js"],
    features: [
      "Main clinic platform — 50+ routes across the practice",
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
      "Next.js, TypeScript, Tailwind CSS, Vercel, App Router, Dynamic Sitemap, JSON-LD Medical Schema, RSS Feed, JaneApp Booking Integration, Shopify (nutrition shop)",
    challenge:
      "Revitalize had grown into four separate businesses — a two-location aesthetics and hormone clinic, a published book, a nutrition supplement brand, and a coaching institute — each with its own audience, its own commercial logic, and no system connecting them. The existing template site presented one of those four (the clinic) as a flat brochure with minimal local SEO, an outdated location footprint, and no patient-facing tools. Patients had no clear pathway to book, understand services, or compare locations. The other three businesses lived elsewhere on the internet, invisible to anyone who came in through the clinic site.",
    whatIBuilt:
      "A 50+ page clinical marketing platform built around 18 individual service pages, dedicated location SEO for Columbus and Warner Robins, a structured Start Here patient pathway, an interactive hormone health assessment, a treatment finder, a searchable Learning Library, provider profiles, payment plans, and JaneApp booking flows per location. Connected the supplement brand, the book, and the coaching institute under one brand system so the four businesses cross-reference each other without merging operationally. Cleaned up a closed-location footprint with a redirect strategy that preserved existing rankings.",
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
  },

  // ── Air Solutions Heating & Cooling ───────────────────────────────────────
  {
    slug: "air-solutions",
    title: "Air Solutions Heating & Cooling",
    label: "Original Build",
    category: "HVAC · Multi-City Programmatic SEO",
    featured: true,
    coverImage: "/images/case-studies/covers/air-solutions-1-hero.png",
    filterTags: ["full-stack", "local"],
    valueExplainer:
      "Programmatic SEO is the same architectural pattern Airbnb uses for apartments per city, Zapier for app integrations, and Tripadvisor for restaurants per neighborhood. Applied to a single Baldwin County HVAC contractor, it produces 135 city × service intersection pages, an automated content engine, and a category of digital asset no competitor in the market currently occupies.",
    shortSummary:
      "A 159-page programmatic SEO architecture for an HVAC contractor in coastal Alabama. 15 cities × 9 services, plus four custom interactive tools.",
    summary:
      "Air Solutions Heating & Cooling commissioned a build replacing a 36-page WordPress brochure with a programmatic SEO platform: 249 indexed pages at launch, a 9-type Schema.org architecture, four custom interactive tools, and a native automated publishing engine. The same architectural pattern Netflix and Vercel use for production applications, applied to a local HVAC contractor in Baldwin County, Alabama.",
    liveUrl: "https://airsolutionspros.com",
    tags: ["HVAC", "Programmatic SEO", "Custom Tools", "Next.js"],
    features: [
      "249 indexed pages at launch — 11.8× the old WordPress site",
      "Programmatic SEO matrix: 15 Baldwin County cities × 9 HVAC services = 135 intersection pages",
      "9 service hub pages — AC repair, install, heating, heat pump, mini-split, IAQ, commercial, emergency, maintenance",
      "15 city hub pages — Daphne, Fairhope, Foley, Gulf Shores, Orange Beach, and the rest of the county",
      "3 commercial vertical pages — restaurants, vacation rentals, property managers",
      "4 seasonal landing pages — spring, summer, fall, winter campaigns",
      "2 cost-guide pages targeting purchase-decision keyword queries",
      "Native date-gated publishing engine — Vercel cron, no plugin, no CMS subscription",
      "Live NWS hurricane alert API integration — non-dismissable banner during severe alerts",
      "4-tier seasonal banner system: manual override → NWS alert → scheduled banner → nothing",
      "3D AC Explorer — Three.js interactive component visualization",
      "HVAC Diagnostic Quiz — typed decision-tree symptom triage",
      "Repair vs. Replace ROI Calculator — live financial modeling tool",
      "9-type Schema.org architecture — HVACBusiness subtype, OfferCatalog, per-city postalCode arrays",
      "Single source of truth data architecture — one edit propagates across all 249 pages, schema, and metadata",
      "Smart form pipeline — Zod validation, Cloudflare Turnstile, Resend, intent routing",
      "Open Graph image generators rendering branded social cards on demand",
      "12-section Google Business Profile operating manual delivered at launch",
    ],
    valuePoints: [
      "Closes the Share of Local Voice gap in south Baldwin markets — Foley, Gulf Shores, Orange Beach — where the business showed 0% before launch",
      "Programmatic city × service architecture covers every market the trucks operate in, not just the city of record",
      "Native publishing engine compounds the authority signal at a cadence competitors publishing 0–2 posts a month cannot match",
      "Four custom interactive tools no competitor in the county offers",
    ],
    stack:
      "Next.js 14, TypeScript, Tailwind, Three.js (3D explorer), Vercel Cron, Cloudflare Turnstile, Resend, Zod, NWS Public Alert API, 9-Type Schema.org, custom date-gated publishing engine",
    challenge:
      "The previous airsolutionspros.com site was a 36-page WordPress brochure being maintained, not built to compete. Despite Air Solutions holding the strongest review velocity in Baldwin County, the business showed 0% Share of Local Voice in south Baldwin markets — Foley, Gulf Shores, Orange Beach — where its trucks operate daily. Distance to the home address is fixed; relevance is improvable. The platform's job was to close the relevance gap with 135 dedicated city × service pages, then sustain that advantage with a content engine that publishes without manual intervention.",
    whatIBuilt:
      "A 249-page Next.js application with a 9-type Schema.org architecture, a 135-page programmatic SEO matrix covering every Baldwin County city × every HVAC service, a native date-gated publishing engine running on Vercel cron with no plugin or CMS dependency, a 4-tier seasonal banner system including a live National Weather Service hurricane alert integration, three custom interactive tools (a Three.js 3D AC Explorer, a typed diagnostic quiz, a Repair vs. Replace ROI calculator), a smart form pipeline with Zod validation and Cloudflare Turnstile, a single source of truth data architecture, and a 12-section GBP operating manual delivered at launch.",
    seoConversion:
      "Built around the programmatic-SEO methodology used at the enterprise level by Airbnb, Zapier, Tripadvisor, and Zillow — applied to a single county. Every city × service combination is a standalone indexed page with unique local content, proper metadata, schema markup, and internal links. The 9-type Schema.org architecture includes the HVACBusiness subtype, OfferCatalog with all 9 services listed, and per-city postalCode arrays across all 15 Baldwin County cities — enterprise-level structured data implementation at a local-contractor scale.",
    businessValue:
      "Gives Air Solutions the strongest technical local-search platform in Baldwin County HVAC. Edge markets where no competitor has a single dedicated page now have nine service pages each. The content engine compounds: every post that indexes adds an authority signal Google reads as active business, on a publishing cadence competitors cannot match.",
    screenshotLabels: [
      "Homepage hero — Heating & Cooling, Done Right",
      "Five core HVAC services hub",
      "Specialty services — heat pump, mini-split, IAQ",
      "Four interactive tools — gated discovery",
      "City coverage — 15 Baldwin County cities",
      "Cool Club — maintenance program landing",
      "Schedule HVAC service — typed form pipeline",
      "3D AC Explorer — interactive Three.js model",
      "Field Guide — automated content engine",
    ],
    screenshotImages: [
      "/images/case-studies/covers/air-solutions-1-hero.png",
      "/images/case-studies/covers/air-solutions-2-services.png",
      "/images/case-studies/covers/air-solutions-3-specialty.png",
      "/images/case-studies/covers/air-solutions-4-tools.png",
      "/images/case-studies/covers/air-solutions-5-cities.png",
      "/images/case-studies/covers/air-solutions-6-cool-club.png",
      "/images/case-studies/covers/air-solutions-7-schedule.png",
      "/images/case-studies/covers/air-solutions-8-3d-explorer.png",
      "/images/case-studies/covers/air-solutions-9-field-guide.png",
    ],
  },

  // ── ACExperts251 ─────────────────────────────────────────────────────────
  {
    slug: "acexperts",
    title: "ACExperts251",
    label: "Original Build",
    category: "HVAC · Local SEO",
    coverImage: "/images/case-studies/covers/acexperts-1-hero.png",
    filterTags: ["full-stack", "local"],
    valueExplainer:
      "A full-stack Next.js HVAC site for Baldwin County with seven service pages, eight city pages, three interactive tools, and direct lead capture into a Google Sheet the owner reads.",
    shortSummary:
      "A full-stack Next.js HVAC website for Baldwin County, Alabama — 7 service pages, 8 city SEO pages, 3 interactive tools, API-backed lead capture, and live Google Reviews integration.",
    summary:
      "ACExperts251 needed a website that matched the quality of their work and gave homeowners every reason to call over a competitor. The result is a full-stack Next.js application with structured service and city pages, three interactive diagnostic tools, API-backed form handling, and a live review integration.",
    liveUrl: "https://acexperts251.com",
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
    ],
    valuePoints: [
      "Three interactive tools no other Baldwin County HVAC competitor offers",
      "Server-side form handling with spam protection and direct lead capture",
      "8-city service-area SEO covering the full county footprint",
    ],
    stack: "Next.js, TypeScript, Tailwind, Vercel, Three.js / WebGL, Cloudflare Turnstile, Google Sheets API",
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
  },

  // ── Collective Counseling ─────────────────────────────────────────────────
  {
    slug: "collective-counseling",
    title: "Collective Counseling",
    label: "Original Build",
    category: "Therapy Practice",
    coverImage: "/images/case-studies/covers/collective-1-homepage-hero.png",
    filterTags: ["medical", "static"],
    valueExplainer:
      "A therapy website's job is not to explain services — it's to make a nervous person feel safe enough to send an email. ADHD testing positioned as a cash-pay specialty service on its own dedicated page means it can actually rank.",
    shortSummary:
      "A 4-page therapy practice site in Daphne, Alabama — dedicated pages for counseling, ADHD testing, and addiction counseling, with real therapist photography.",
    summary:
      "Collective Counseling needed a site that communicated professionalism and approachability in equal measure — helping prospective clients understand services, know what to expect, and feel safe enough to reach out. A lean, semantic multi-page build was the right choice: fast, focused, and built to rank for the specific service terms that matter most.",
    liveUrl: "https://collectivecounselingdaphne.com",
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
  },

  // ── Blessed Barbershop ───────────────────────────────────────────────────
  {
    slug: "blessed-barbershop",
    title: "Blessed Barbershop",
    label: "Original Build",
    category: "Local Service Business",
    coverImage: "/images/case-studies/covers/blessed-1-hero.png",
    filterTags: ["local", "static"],
    valueExplainer:
      "A local barbershop is competing for one search: 'barbershop near me' on a mobile phone. A fast, WebP-optimized site with a frictionless booking link and real shop photography wins that search.",
    shortSummary:
      "A mobile-first HTML/CSS barbershop website with WebP-optimized media, online booking, service menu with pricing, and gallery — built for clients who discover local businesses on a phone.",
    summary:
      "Blessed Barbershop needed a modern website that reflected the quality of the shop and made it easy for clients to book online. Built around local search discoverability and a frictionless booking experience.",
    liveUrl: "https://www.blessedbarbershopdaphne.com",
    tags: ["Local Business", "Mobile-First", "Booking"],
    features: [
      "Mobile-first HTML/CSS build — fast load with no framework overhead",
      "WebP-optimized image assets",
      "Online booking integration",
      "Service menu with clear pricing",
      "Photo gallery of shop and work",
      "Google Business Profile alignment",
    ],
    valuePoints: [
      "WebP-optimized images for fast load on mobile where clients search",
      "Online booking reduces inbound phone volume and no-shows",
      "Service menu with pricing removes the question that stops new clients",
    ],
    stack: "HTML/CSS, WebP-Optimized Media, Mobile-First Layout, Cloudflare Hosting",
    challenge:
      "Most barbershops rely on Instagram or Google Maps as their only digital presence. Blessed Barbershop needed a dedicated site that gave new clients confidence and a clear path to booking.",
    whatIBuilt:
      "A focused, mobile-first barbershop site with a service menu, pricing, online booking flow, real photo gallery, and shop-brand visual identity.",
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
  },
];

export function getProjectBySlug(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug);
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
