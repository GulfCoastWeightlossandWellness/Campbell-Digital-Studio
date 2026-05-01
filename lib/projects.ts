export type ProjectLabel =
  | "Strategic Rebuild Concept"
  | "Original Build"
  | "Original Product"
  | "Internal / Founder Project";

export type PricingTier = "agency" | "senior-dev";

export type FilterTag = "full-stack" | "medical" | "local" | "platform" | "static";

export type Project = {
  slug: string;
  title: string;
  label: ProjectLabel;
  category: string;
  shortSummary: string;
  summary: string;
  /** Primary link used in hero buttons and card CTAs. For IHE: the dashboard. */
  liveUrl: string | null;
  /** IHE only — public marketing/buyer-facing site */
  marketingUrl?: string;
  /** IHE only — the working product dashboard (core asset) */
  dashboardUrl?: string;
  /** Renders the project with flagship visual treatment in grids */
  isFlagship?: boolean;
  /** Primary project cover image for portfolio cards */
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
  /** Optional real screenshot paths matched by index to screenshotLabels */
  screenshotImages?: string[];
  /** IHE only — marketing site screenshot labels */
  marketingScreenshotLabels?: string[];
  marketingScreenshotImages?: string[];
  /** IHE only — product dashboard screenshot labels */
  dashboardScreenshotLabels?: string[];
  dashboardScreenshotImages?: string[];
  /** Market valuation tier for this build */
  pricingTier: PricingTier;
  /** Estimated market price ranges for each hiring tier */
  pricing: {
    agency: string;
    highFreelance: string;
    lowFreelance: string;
  };
  /** One-sentence notes explaining each pricing tier for this specific project */
  pricingNotes: {
    agency: string;
    highFreelance: string;
    lowFreelance: string;
  };
  /** Common-language explanation of why the work is worth the price */
  valueExplainer: string;
  /** Filter categories for the work page filter system */
  filterTags: FilterTag[];
};

export const projects: Project[] = [
  // ── Revitalize ────────────────────────────────────────────────────────────
  {
    slug: "revitalize",
    title: "Revitalize Aesthetics & Wellness",
    label: "Strategic Rebuild Concept",
    category: "Medical Wellness / Medspa / Multi-Location Clinic",
    isFlagship: true,
    coverImage: "/images/case-studies/covers/revitalize-1-hero.png",
    filterTags: ["full-stack", "medical"],
    pricingTier: "agency",
    pricing: {
      agency: "$60,000 – $95,000",
      highFreelance: "$20,000 – $40,000",
      lowFreelance: "$4,000 – $8,500",
    },
    pricingNotes: {
      agency: "A medical marketing agency scopes this as a 5–6 month engagement — strategist, medical copywriter, designer, developer, and QA. Eighteen service pages with clinical copy alone is a separate content sprint.",
      highFreelance: "Medical marketing specialists who understand hormone therapy, aesthetics, and wellness service language are a small pool. Most freelancers would underprice this and realize three months in that they don't know how to write a service page for PRP or bioidentical hormones.",
      lowFreelance: "A generalist delivers 4–5 static pages. No service hub, no JSON-LD medical schema, no city-specific landing pages, no RSS feed, no JaneApp integration. The site looks okay and ranks nowhere.",
    },
    valueExplainer: "Patients choosing a medspa or hormone clinic are making a trust-sensitive, often expensive decision. A site that reads like it was written by someone who doesn't understand the medicine loses that patient before the first phone call. Eighteen individual service pages, city-specific SEO landing pages, a searchable Learning Hub, and a JaneApp booking flow built per location — this is the infrastructure a growing two-location clinic needs to compete online.",
    shortSummary:
      "A proactive strategic rebuild turning a template medspa site into a 50+ route clinical marketing platform with 18 service pages, two-location SEO, a searchable Learning Hub, interactive tools, and JaneApp booking flows.",
    summary:
      "Revitalize was rebuilt as a strategic concept to demonstrate how an existing medical wellness website could become a more complete patient conversion and education platform — replacing a template-style brochure site with a launch-ready clinical marketing system spanning 50+ pages across two active locations.",
    liveUrl: "https://revitalize-medical-wellness-clinic-nine.vercel.app",
    tags: ["Medical Wellness", "Medspa", "Local SEO", "Next.js", "Multi-Location"],
    features: [
      "50+ page clinical marketing platform (Next.js App Router)",
      "18 individual service pages — neuromodulators, fillers, hormone therapy, weight loss, IV hydration, laser, PRP, and more",
      "Location pages for Columbus GA and Warner Robins GA with dedicated SEO",
      "City-specific service landing pages (Botox, hormone therapy, medical weight loss, IV hydration by city)",
      "Start Here new patient onboarding pathway",
      "Hormone Health Self-Assessment interactive tool",
      "Treatment Finder interactive guide",
      "Searchable Learning Hub with articles, videos, and patient resources",
      "Hub RSS feed and JSON index endpoint for content discoverability",
      "Blog with dynamic slug routing and legacy article preservation",
      "Team page with provider profiles",
      "Payment plans page for treatment accessibility",
      "Media review system for press/feature management",
      "Location-specific JaneApp booking links",
      "Auburn location closure cleanup and redirect strategy",
      "Google review link infrastructure",
      "Dynamic sitemap and JSON-LD schema markup",
      "Mobile sticky booking, call, and Start Here bar",
      "Conservative medical disclaimers throughout",
    ],
    valuePoints: [
      "Clearer active-location footprint after Auburn closure",
      "Stronger local SEO for Columbus and Warner Robins markets",
      "Better patient navigation across 18+ service lines",
      "Streamlined booking flow per location via JaneApp",
      "Authority-building content system with searchable Learning Hub and RSS",
      "Safer migration architecture with redirect strategy from legacy site",
    ],
    stack: "Next.js 15, TypeScript, Tailwind CSS, Vercel, App Router, Dynamic Sitemap, JSON-LD Schema Markup, RSS Feed, JaneApp Booking Integration",
    challenge:
      "The existing site was a template-style brochure with minimal local SEO structure, no patient education system, and an outdated location footprint that still referenced a closed Auburn location. Patients had no clear pathway to book, understand services, or compare locations across the two active markets.",
    whatIBuilt:
      "A 50+ page clinical marketing platform with 18 individual service pages, city-specific SEO landing pages for Columbus and Warner Robins, a structured Start Here patient pathway, an interactive hormone health assessment and treatment finder, a searchable Learning Hub with RSS feed, blog with dynamic routing, team profiles, payment plans, and JaneApp booking flows specific to each location.",
    seoConversion:
      "Built city-specific landing pages for Columbus and Warner Robins at the service level — Botox, hormone therapy, medical weight loss, and IV hydration each have dedicated city-market pages. Added JSON-LD schema markup for medical practice entities, a dynamic sitemap, an RSS feed for content distribution, a clean redirect strategy for the Auburn closure, and Google review link infrastructure.",
    businessValue:
      "Gives Revitalize a clear two-location digital footprint, 18 searchable service pages, a patient education system that builds authority before the first appointment, and a booking architecture that reduces friction from discovery to scheduling — all within a scalable content system that grows with the practice.",
    screenshotLabels: [
      "Homepage — hero and new patient pathway",
      "Start Here — new patient onboarding flow",
      "Treatment Finder — interactive guide",
      "Columbus location page — local SEO",
      "Learning Library — articles and patient guides",
    ],
    screenshotImages: [
      "/images/case-studies/covers/revitalize-1-hero.png",
      "/images/case-studies/covers/revitalize-2-pathways.png",
      "/images/case-studies/covers/revitalize-3-services.png",
      "/images/case-studies/covers/revitalize-4-tools.png",
      "/images/case-studies/covers/revitalize-5-library.png",
    ],
  },

  // ── Interactive Health Education ──────────────────────────────────────────
  {
    slug: "interactive-health-education",
    title: "Interactive Health Education",
    label: "Original Product",
    category: "Digital Health · Patient Education Platform",
    isFlagship: true,
    coverImage: "/images/case-studies/covers/ihe-dashboard-1-home.png",
    filterTags: ["platform", "full-stack", "medical"],
    pricingTier: "agency",
    pricing: {
      agency: "$650,000 – $1,200,000",
      highFreelance: "$500,000 – $750,000",
      lowFreelance: "$120,000 – $250,000",
    },
    pricingNotes: {
      agency: "Replacement-cost benchmark from the valuation report: rebuilding the full platform in 2026 market conditions (dashboard wrapper + 144+ modules + packaging/QA) is estimated at roughly $650K-$1.2M.",
      highFreelance: "Risk-adjusted current strategic value benchmark from the report: approximately $500K-$750K after accounting for commercialization risk, remaining polish work, and go-to-market traction.",
      lowFreelance: "Represents a significantly reduced rebuild scope (partial library + lighter productization). This does not reflect full parity with the current IHE platform architecture.",
    },
    valueExplainer: "This is two fully distinct production systems: a B2B marketing site targeting healthcare buyers with dedicated landing pages, an ROI calculator, and a live demo flow — and a 145-app patient education platform with a commercial licensing engine, demo mode, and policy-governed catalog. Most patient education tools are outdated PDFs locked inside EHR systems. This is a deployable, no-PHI, licensable product that removes the compliance barrier that stops most clinic software deals.",
    shortSummary:
      "A physician-designed digital health platform with two distinct surfaces: a B2B marketing site and a React SPA dashboard delivering 144+ patient-facing interactive modules across 21 clinical categories and 11 commercial licensing bundles.",
    summary:
      "Interactive Health Education is a physician-designed patient education platform built as two distinct surfaces. The marketing site (interactivehealtheducation.com) is a buyer-facing multi-page site targeting clinics, health systems, and digital health companies with SEO landing pages, solution verticals, ROI calculator, demo flow, and tiered licensing. The dashboard (dashboard.interactivehealtheducation.com) is the product itself: a React SPA with 144+ interactive patient education apps designed for eighth-grade readability — each a self-contained clinical education module with calculators, symptom scorers, and visual aids — organized by 21 clinical categories, packaged into 11 commercial licensing bundles, and deployable via link, QR code, iframe, or kiosk with no PHI collection in standard use.",
    liveUrl: "https://dashboard.interactivehealtheducation.com/",
    marketingUrl: "https://interactivehealtheducation.com",
    dashboardUrl: "https://dashboard.interactivehealtheducation.com/",
    tags: [
      "Digital Health",
      "Patient Education",
      "React",
      "TypeScript",
      "SPA",
      "B2B SaaS",
      "No PHI",
      "Clinical Content",
    ],
    features: [
      "B2B marketing site with 10+ SEO buyer-persona landing pages targeting specific clinical use cases",
      "Solution vertical pages: independent clinics, behavioral health, employer/population health, weight loss/metabolic",
      "ROI calculator for clinic buyer decision-making",
      "Demo flow with embedded live dashboard access for prospects",
      "4-tier licensing pricing structure (Starter $1K/yr → Enterprise $5K/yr → Custom health systems)",
      "White-label add-on and custom domain deployment options",
      "Video marketing demo (IHEMarketingDemo.mp4) embedded on homepage",
      "Library snapshot thumbnails for 80+ apps used as marketing assets",
      "Obfuscated admin dashboard for platform management",
      "Custom JS modules: analytics.js, forms.js, home.js, demo-config.js",
      "Full SEO: sitemap.xml, robots.txt, Open Graph, Twitter Cards, structured data",
      "144+ physician-authored interactive patient education apps — single source of truth in AppList.ts",
      "React SPA with Vite — lazy-loaded routes for all 145 apps via lazyAppPages.tsx",
      "Module UX standards target patient comprehension at approximately an eighth-grade reading level",
      "Flexible deployment options: link, QR code, iframe embedding, or kiosk mode",
      "21 canonical clinical categories (Cancer & Oncology, Cardiovascular, Mental Health & Behavior, Women's Health, Surgery, etc.)",
      "11 commercial licensing bundles auto-generated from source JSON (Cardiometabolic, Mental Health Core, Women's Reproductive, MSK Pain, Oncology, Respiratory, GI/Liver, Neuro/Derm, Kidney, Men's Urology, Prevention/Utilities)",
      "App type taxonomy: flagship, standard, calculator, micro, pathway, caregiver, procedure",
      "Curated collections system — browse-optimized groupings separate from commercial bundles",
      "Demo mode: DemoModeDashboard, demo manifest, smart presentation order, access gating for non-demo apps",
      "Policy engines: commercialBundlePolicy.ts, curatedCollectionPolicy.ts, dashboardBrowseFilter.ts — each with unit tests",
      "Drug interactions database powering a multi-drug checker with severity ratings",
      "Clinical calculators: Wells DVT/PE, PERC, eGFR, Framingham 10-yr risk, ABI, IPSS, AUDIT-C, Child-Pugh/MELD",
    ],
    valuePoints: [
      "144+ fully functioning clinical apps — not a demo, not a mockup, a deployable product",
      "Commercial bundle architecture allows clinics to license exactly the specialty modules they need",
      "Demo mode lets buyers experience the product before signing — reducing sales friction",
      "No PHI means zero compliance overhead for clinic partners",
      "Policy engines with unit tests — the catalog logic is tested, not just built",
      "Tiered pricing from $1K/year (small clinic) to enterprise custom",
      "Physician-authored content — the clinical accuracy is part of the product value",
      "Replacement-cost valuation benchmark: approximately $650k-$1.2M to rebuild in 2026 market conditions",
      "Current risk-adjusted strategic value benchmark: approximately $500k-$750k with upside from pilots and licensing traction",
    ],
    stack:
      "Marketing Site: HTML5, Tailwind CSS, Vanilla JS, Vercel | Dashboard: React, TypeScript, Vite, Vercel, React Router, Lazy Loading, Policy Engines, Unit Tests",
    challenge:
      "Most patient education tools are outdated PDFs, generic third-party portals, or locked inside expensive EHR systems that require compliance agreements to access. The challenge was building an independent, interactive library that was scalable across clinical topics, accurate enough for physician authorship, safe to distribute without PHI collection, and commercial enough to license at B2B scale — all while maintaining a buyer-facing marketing site that could convert healthcare buyers who had never seen the product in person.",
    whatIBuilt:
      "Two fully distinct surfaces built for different audiences. The marketing site targets clinic buyers, health systems, and digital health companies — with buyer-persona SEO landing pages, solution verticals, a tiered pricing page, a ROI calculator, a live demo flow, and an admin management layer. The dashboard is the product itself: a React SPA with 145 physician-authored interactive patient education apps, each lazy-loaded and fully functional as a standalone module. The catalog is governed by a policy engine architecture — commercial bundles and curated collections are defined in source JSON and auto-generated into TypeScript modules, meaning the catalog structure is version-controlled, testable, and independent from the UI.",
    seoConversion:
      "The marketing site is structured around B2B buyer-persona discovery: 10+ dedicated landing pages targeting specific clinical use cases. Each page targets a distinct buyer context and search intent. The ROI calculator gives buyers a quantified justification for the purchase. The live demo reduces the friction of a sales call by letting buyers self-explore.",
    businessValue:
      "Interactive Health Education demonstrates product-level thinking that goes far beyond website work. The dashboard is a physician-designed library of 144+ interactive patient education tools organized into 11 commercial licensing bundles, with a policy engine that governs access, a demo mode built for sales, and a no-PHI architecture that removes the compliance barrier. The platform supports four business models simultaneously: direct clinic licensing, health system enterprise contracts, digital health SaaS partnerships, and white-label distribution. Based on 2026 healthcare app replacement-cost benchmarks, the platform is credibly positioned as a high-value digital health IP asset with seven-figure upside as pilots and licensing maturity increase.",
    screenshotLabels: [
      "Marketing site — homepage and value proposition",
      "Marketing site — use cases and buyer positioning",
      "Dashboard — module library overview",
      "Dashboard — search and filter interface",
      "Dashboard — individual module detail",
      "Dashboard — mobile module view",
    ],
    marketingScreenshotLabels: [
      "Homepage — product overview and positioning",
      "Workflow moments and care flow architecture",
      "Featured value blocks and platform framing",
      "Licensed bundles and deployment options",
      "Catalog preview and conversion CTA",
    ],
    marketingScreenshotImages: [
      "/images/case-studies/covers/ihe-marketing-1-hero.png",
      "/images/case-studies/covers/ihe-marketing-2-flow.png",
      "/images/case-studies/covers/ihe-marketing-3-featured.png",
      "/images/case-studies/covers/ihe-marketing-4-bundles.png",
      "/images/case-studies/covers/ihe-marketing-5-footer-cta.png",
    ],
    dashboardScreenshotLabels: [
      "App library — searchable, filterable module grid",
      "Module detail — interactive patient education",
      "Search by topic, condition, or specialty",
      "Mobile-responsive module view",
      "Category browsing — primary care and specialty",
    ],
    dashboardScreenshotImages: [
      "/images/case-studies/covers/ihe-dashboard-1-home.png",
      "/images/case-studies/covers/ihe-dashboard-2-grid.png",
      "/images/case-studies/covers/ihe-dashboard-3-grid-lower.png",
      "/images/case-studies/covers/ihe-dashboard-4-list-view.png",
      "/images/case-studies/covers/ihe-dashboard-5-list-lower.png",
    ],
  },

  // ── ACExperts251 ─────────────────────────────────────────────────────────
  {
    slug: "acexperts",
    title: "ACExperts251",
    label: "Original Build",
    category: "HVAC / Local Service Business",
    isFlagship: true,
    coverImage: "/images/case-studies/covers/acexperts-1-hero.png",
    filterTags: ["full-stack", "local"],
    pricingTier: "agency",
    pricing: {
      agency: "$55,000 – $85,000",
      highFreelance: "$18,000 – $35,000",
      lowFreelance: "$3,500 – $7,000",
    },
    pricingNotes: {
      agency: "A home services agency bills the 3D diagnostic tool alone as a $15K–$20K interactive feature sprint. Add strategists, copywriters, and QA across 30+ routes — 4 months minimum.",
      highFreelance: "A senior Next.js developer with HVAC-industry knowledge and local SEO depth who can also build a Three.js 3D tool and wire a Google Sheets API with Cloudflare Turnstile — this combination of skills is genuinely rare.",
      lowFreelance: "A generalist delivers a WordPress theme with basic pages. No 3D diagnostic tool, no secure API lead capture, no 8-city SEO architecture. It looks similar to the untrained eye and performs completely differently in search.",
    },
    valueExplainer: "The 3D interactive AC diagnostic tool doesn't exist anywhere else in Baldwin County HVAC. Every form submission routes securely to a Google Sheet the owner reads directly — no CRM subscription needed. The 8-city page architecture gives the business a realistic ranking opportunity across every service area they operate in, not just their city of record. This is the most technically capable HVAC website in the county.",
    shortSummary:
      "A full-stack Next.js HVAC website for Baldwin County, Alabama — 7 service pages, 8 city SEO pages, 3 interactive tools (3D diagnostic, quiz, ROI calculator), API-backed lead capture, and a live Google Reviews integration.",
    summary:
      "ACExperts251 needed a website that matched the quality of their work and gave homeowners in Baldwin County every reason to call over a competitor. The result is a full-stack Next.js application with structured service and city pages, three interactive diagnostic tools, API-backed form handling, and a live review integration — not a template.",
    liveUrl: "https://acexperts251.com",
    tags: ["HVAC", "Local SEO", "Baldwin County", "Next.js", "Service Business", "Interactive Tools"],
    features: [
      "7 dedicated service pages with dynamic routing — repair, installation, heating, heat pumps/mini-splits, maintenance, indoor air quality",
      "8 city/service-area pages for Baldwin County — Daphne, Fairhope, Foley, Gulf Shores, Orange Beach, Spanish Fort, Robertsdale, Silverhill",
      "3D interactive AC system diagnostic tool built with Three.js/WebGL",
      "AC diagnostic quiz — symptom-to-likely-repair interactive guide",
      "ROI calculator for HVAC replacement decision-making",
      "Blog with dynamic slug routing and CMS-ready data structure",
      "Cloudflare Turnstile CAPTCHA on all form submissions",
      "Google Sheets API integration for direct lead capture",
      "Service scheduling flow with dedicated thank-you confirmation page",
      "API routes for contact form and scheduling (server-side handling)",
      "Live Google Reviews widget (Elfsight) with real customer testimonials",
      "Comfort Club maintenance plan page with plan details and benefits",
      "Emergency HVAC service page with priority call-to-action",
      "Financing page with partner program details",
      "LLMs.txt for AI-crawler and search discoverability",
      "Feature flag system for controlled feature rollouts",
      "Trust badges, licensing signals, and insurance indicators",
      "Mobile-first responsive design with tap-to-call CTAs",
      "Dynamic sitemap, robots.txt, Open Graph, and manifest",
    ],
    valuePoints: [
      "Full-stack Next.js build — not a template or no-code tool",
      "Three interactive tools that differentiate the site from every HVAC competitor in Baldwin County",
      "Server-side form handling with spam protection and lead capture to Google Sheets",
      "8-city service-area SEO structure covering all of Baldwin County",
      "Live review integration builds trust without manual content updates",
      "Emergency page and scheduling flow reduce friction from problem to appointment",
    ],
    stack: "Next.js 15, TypeScript, Tailwind CSS, Vercel, App Router, Three.js / WebGL, Cloudflare Turnstile, Google Sheets API, Elfsight Reviews, Feature Flags",
    challenge:
      "HVAC competitors in Baldwin County have minimal web presences — outdated sites with no service structure, weak local SEO, no interactive tools, and no clear reason for a homeowner to call over another option. ACExperts needed a site that established authority quickly and demonstrated technical capability no competitor in the market could match.",
    whatIBuilt:
      "A full-stack Next.js application with 7 dynamic service pages, 8 city SEO pages, 3 interactive tools (a Three.js 3D AC diagnostic viewer, a symptom-based diagnostic quiz, and an ROI calculator), API routes for form handling with Cloudflare Turnstile protection and Google Sheets lead capture, a blog with dynamic routing, a live Google Reviews widget, and dedicated pages for emergency service, maintenance plans, and financing.",
    seoConversion:
      "Built 8 city-specific pages covering all major Baldwin County markets. Created 7 service-specific pages targeting high-intent HVAC search terms. Added LLMs.txt for AI search discoverability. Structured the CTA hierarchy to drive phone calls, contact form submissions, and scheduling flows. Emergency page captures urgent search intent.",
    businessValue:
      "Gives ACExperts the most technically capable HVAC website in Baldwin County — a credible, professional full-stack presence that earns trust before the first call, supports local search rankings across 8 cities, and turns homeowner questions into booked service calls through interactive tools that no competitor offers.",
    screenshotLabels: [
      "Homepage — hero and service overview",
      "Service pages — HVAC installation and repair",
      "City coverage pages — Baldwin County",
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
    category: "Therapy Practice / Counseling / ADHD Testing",
    coverImage: "/images/case-studies/covers/collective-1-homepage-hero.png",
    filterTags: ["medical", "static"],
    pricingTier: "senior-dev",
    pricing: {
      agency: "$12,000 – $22,000",
      highFreelance: "$4,500 – $9,000",
      lowFreelance: "$800 – $2,500",
    },
    pricingNotes: {
      agency: "A healthcare marketing agency handling a therapy practice runs a brand strategy session, a mental health communication specialist for copy, and a design/development phase — $12K is their minimum engagement.",
      highFreelance: "Writing copy for a therapy audience is specialized. You have to understand how to speak to someone who is nervous, private, and deciding whether to ask for help. A freelancer who treats this like a brochure misses the point entirely.",
      lowFreelance: "You get a template with the clinic name swapped in and stock photos of calm people. The copy reads like a brochure, the ADHD testing page doesn't exist as a standalone SEO target, and the emotional tone that makes someone feel safe enough to reach out is completely missing.",
    },
    valueExplainer: "A therapy website's job is not to explain services — it's to make a nervous person feel safe enough to send an email. That requires understanding the emotional state of the patient and writing toward it. ADHD testing positioned as a cash-pay specialty service on its own dedicated page means it can actually rank on Google. Real therapist photography instead of stock imagery changes how prospective clients feel about the practice before they ever call.",
    shortSummary:
      "A 4-page semantic multi-page website for a therapy practice in Daphne, Alabama — dedicated pages for counseling, ADHD testing, and addiction counseling, with sitemap, webmanifest, and Vercel deployment.",
    summary:
      "Collective Counseling needed a site that communicated professionalism and approachability in equal measure — helping prospective clients understand services, know what to expect, and feel safe enough to reach out. A lean, semantic multi-page build was the right choice: fast, focused, and built to rank for the specific service terms that matter most.",
    liveUrl: "https://collectivecounselingdaphne.com",
    tags: ["Therapy", "Counseling", "ADHD Testing", "Local SEO", "Daphne AL"],
    features: [
      "Multi-page HTML/CSS architecture — homepage, therapy, ADHD testing, and addiction counseling",
      "Dedicated adult ADHD testing page positioned as a cash-pay specialty service",
      "Dedicated addiction counseling page with service-specific copy",
      "Dedicated therapy page covering individual counseling scope and approach",
      "Client photo and real therapist identity — not stock imagery",
      "sitemap.xml and robots.txt for full search engine indexing",
      "Web app manifest for PWA-ready mobile experience",
      "Local SEO structure for Daphne and Baldwin County",
      "Insurance and payment clarity section",
      "Professional but warm visual tone calibrated for therapy-first impressions",
      "Google Business Profile alignment",
      "Client inquiry and contact flow",
      "Mobile-first responsive layout",
      "Vercel deployment with production-ready configuration",
    ],
    valuePoints: [
      "Dedicated service pages for each specialty — not everything buried on one page",
      "ADHD testing clearly positioned as a keyword-specific, cash-pay service page",
      "Real therapist photo builds trust faster than stock imagery",
      "Insurance and fee transparency reduces pre-contact anxiety",
      "Lean, fast multi-page build — no unnecessary framework overhead for a focused practice site",
    ],
    stack: "HTML/CSS, Multi-Page Architecture, Semantic SEO Markup, Web App Manifest, Vercel Deployment",
    challenge:
      "Therapy websites often default to either generic template language or overly clinical copy. The challenge was building a site that felt personal and safe without losing professional credibility — while also positioning ADHD testing and addiction counseling as distinct, searchable services that do not get buried under a generic 'services' umbrella.",
    whatIBuilt:
      "A lean, focused multi-page site with individual pages for therapy, adult ADHD testing, and addiction counseling — each with service-specific copy, clear fee and insurance information, and a client inquiry flow designed to reduce the friction of making first contact. Built with real photography of the therapist rather than stock imagery, which meaningfully changes how prospective clients feel about the practice before they ever call.",
    seoConversion:
      "Individual pages for each service — therapy, ADHD testing, addiction counseling — each targeted at specific search terms. Local SEO structured around Daphne and Baldwin County. ADHD testing page positioned as a cash-pay specialty to capture high-intent search traffic. Full sitemap and robots.txt submitted for indexing.",
    businessValue:
      "Gives Collective Counseling a professional, lightweight web presence that makes potential clients feel understood before they call — with specific service pages that improve local search rankings for each specialty and an identity that builds trust from the first page load.",
    screenshotLabels: [
      "Homepage hero — therapy and adult ADHD testing",
      "Service split — therapy and ADHD evaluation",
      "Meet the therapist — credibility and trust",
      "Fees and insurance transparency",
      "Contact and appointment request flow",
      "Adult ADHD testing page detail",
    ],
    screenshotImages: [
      "/images/case-studies/covers/collective-1-homepage-hero.png",
      "/images/case-studies/covers/collective-2-services-split.png",
      "/images/case-studies/covers/collective-3-about-therapist.png",
      "/images/case-studies/covers/collective-4-fees-insurance.png",
      "/images/case-studies/covers/collective-5-contact-form.png",
      "/images/case-studies/covers/collective-6-adhd-page.png",
    ],
  },

  // ── Blessed Barbershop ───────────────────────────────────────────────────
  {
    slug: "blessed-barbershop",
    title: "Blessed Barbershop",
    label: "Original Build",
    category: "Barbershop / Appointment-Based Local Business",
    coverImage: "/images/case-studies/covers/blessed-1-hero.png",
    filterTags: ["local", "static"],
    pricingTier: "senior-dev",
    pricing: {
      agency: "$8,000 – $14,000",
      highFreelance: "$2,500 – $5,000",
      lowFreelance: "$400 – $1,200",
    },
    pricingNotes: {
      agency: "Most agencies won't take a single-page local business site — their minimum engagement is $8K regardless. If they do take it, the deliverable is usually over-engineered for what the business actually needs.",
      highFreelance: "A thoughtful single-page site with WebP optimization, real booking integration, mobile-first performance, and local SEO structure is worth this range from an experienced solo developer who knows what they're doing.",
      lowFreelance: "You get a Squarespace template or a Wix page. Image optimization is an afterthought, the booking flow is a link to a Google Form, and Google Maps won't rank you because the site doesn't signal local relevance.",
    },
    valueExplainer: "A local barbershop's website is competing for one search: 'barbershop near me' on a mobile phone. A fast, WebP-optimized site with a frictionless booking link and real shop photography wins that search. A slow Wix template doesn't. The difference in monthly new clients from ranking vs. not ranking — even in a small market — is measurable in revenue.",
    shortSummary:
      "A mobile-first HTML/CSS barbershop website with WebP-optimized media, online booking integration, service menu with pricing, gallery, and local SEO structure — built for the client base that discovers local businesses on a phone.",
    summary:
      "Blessed Barbershop needed a modern website that reflected the quality of the shop and made it easy for clients to book online. The site was built around local search discoverability and a frictionless booking experience — using a lean, fast HTML/CSS build optimized for mobile-first discovery.",
    liveUrl: "https://www.blessedbarbershopdaphne.com",
    tags: ["Barbershop", "Local SEO", "Booking", "HTML/CSS", "Local Business"],
    features: [
      "Mobile-first HTML/CSS build — fast load with no framework overhead",
      "WebP-optimized image assets across all visuals",
      "Online booking integration — direct link from homepage and service menu",
      "Service menu with clear pricing for new clients",
      "Photo gallery showcasing the shop and work quality",
      "Google Business Profile alignment for map and local search visibility",
      "Location, hours, and contact information prominently placed",
      "Social proof section with reviews and trust signals",
      "Mobile tap-to-call CTA throughout",
      "Shop photography used throughout — not stock imagery",
    ],
    valuePoints: [
      "Professional web presence matching the quality of the service",
      "WebP-optimized images mean fast load times on mobile where most clients search",
      "Online booking reduces inbound phone volume and reduces no-shows",
      "Service menu with pricing removes the question that stops new clients from booking",
      "Gallery builds trust before the first visit",
    ],
    stack: "HTML/CSS, WebP-Optimized Media, Mobile-First Layout, Cloudflare Hosting",
    challenge:
      "Most barbershops rely on Instagram or Google Maps as their only digital presence. Blessed Barbershop needed a dedicated site that gave new clients confidence and a clear path to booking — fast enough to hold attention on a mobile connection, and specific enough to stand apart from a generic listing.",
    whatIBuilt:
      "A focused, mobile-first barbershop site with a service menu and pricing, online booking flow, a real photo gallery of the shop and work, location and hours details, and a visual identity that matched the shop's brand. Built with WebP-optimized media for performance on mobile connections.",
    seoConversion:
      "Local SEO structured around Daphne and Baldwin County. Google Business Profile alignment for local map visibility. WebP images and lean HTML ensure fast page load scores. Mobile tap-to-call CTA at every scroll position. Booking link prominently placed to remove friction between discovery and appointment.",
    businessValue:
      "Gives Blessed Barbershop a professional digital home that earns client trust before they walk in — with a gallery that shows the work, pricing that removes uncertainty, and a booking flow that converts discovery into appointments without requiring a phone call.",
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
    case "Strategic Rebuild Concept":
      return "label-concept";
    case "Original Build":
      return "label-build";
    case "Original Product":
    case "Internal / Founder Project":
      return "label-product";
    default:
      return "label-build";
  }
}

export function getTierLabel(tier: PricingTier): string {
  switch (tier) {
    case "agency":
      return "Agency-Grade Build";
    case "senior-dev":
      return "Senior-Dev Build";
  }
}
