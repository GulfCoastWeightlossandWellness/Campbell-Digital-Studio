export type ProjectLabel =
  | "Strategic Rebuild Concept"
  | "Original Build"
  | "Original Product"
  | "Internal / Founder Project";

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
    shortSummary:
      "A physician-designed digital health product with a public marketing site and a working interactive dashboard for scalable patient education — no PHI collected.",
    summary:
      "Interactive Health Education is a physician-designed patient education platform with both a public marketing site and a working product dashboard. The dashboard is the core asset: a searchable, interactive app library designed to help clinics and healthcare organizations provide scalable patient education without collecting PHI.",
    liveUrl: "https://dashboard.interactivehealtheducation.com/",
    marketingUrl: "https://interactivehealtheducation.com",
    dashboardUrl: "https://dashboard.interactivehealtheducation.com/",
    tags: [
      "Digital Health",
      "Patient Education",
      "React",
      "TypeScript",
      "App Library",
      "No PHI",
    ],
    features: [
      "Public marketing site explaining the product, use cases, and buyer value proposition",
      "Working product dashboard — the core platform asset",
      "Searchable and filterable interactive app library",
      "145+ physician-authored patient education modules",
      "Clinical content spanning primary care and specialty topics",
      "Patient-friendly explanations without requiring medical literacy",
      "No PHI collection — fully safe static/front-end delivery model",
      "Embeddable and shareable module architecture",
      "Scalable module development framework",
      "Clinic and vendor-facing use cases built into product design",
      "Mobile-responsive across all modules",
      "Digital health licensing and white-label potential",
    ],
    valuePoints: [
      "Helps clinics provide structured patient education at scale without staff overhead",
      "Gives healthcare organizations a no-PHI education layer they can link, embed, or license",
      "Demonstrates product-level thinking beyond standard website work",
      "Proves ability to build actual healthcare software — not just marketing pages",
      "Supports B2B licensing, white-labeling, and digital health partnerships",
      "Clinical content accuracy backed by physician authorship",
    ],
    stack:
      "React, TypeScript, Tailwind CSS, Vercel, Next.js App Router, Cursor AI-assisted development",
    challenge:
      "Most patient education tools are either outdated PDFs, generic third-party portals, or locked inside expensive EHR systems. The challenge was building an independent, interactive library that was scalable across clinical topics, fast to develop with high content accuracy, and safe to distribute without requiring compliance agreements from clinic partners.",
    whatIBuilt:
      "Two connected assets: a buyer-facing marketing site that explains the product and positions it for clinic and digital health buyers, and a working product dashboard that is the actual deliverable. The dashboard houses a searchable, filterable library of 145+ interactive patient education modules — each built as a standalone app with clinical content, no PHI, and a front-end delivery model that allows sharing, embedding, or licensing without backend complexity.",
    seoConversion:
      "The marketing site is structured for B2B discovery — targeting clinic administrators, healthcare organizations, and digital health companies searching for patient education solutions. The product itself supports organic distribution: each module is linkable and shareable, which supports referral traffic and organic reach through clinical networks.",
    businessValue:
      "This project shows product-level capability. The marketing site explains the offer. The dashboard is the offer — a working, physician-designed library of interactive patient education tools that any clinic can link to, embed in a portal, or license as a white-label education layer. The architecture supports multiple business models: direct clinic licensing, digital health partnerships, and white-label distribution.",
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
      "Built 8 city-specific pages covering all major Baldwin County markets. Created 7 service-specific pages targeting high-intent HVAC search terms. Added LLMs.txt for AI search discoverability. Structured the CTA hierarchy to drive phone calls, contact form submissions, and scheduling flows. Emergency page captures urgent search intent. Review integration builds trust through social proof without manual maintenance.",
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
      "Individual pages for each service — therapy, ADHD testing, addiction counseling — each targeted at specific search terms. Local SEO structured around Daphne and Baldwin County. ADHD testing page positioned as a cash-pay specialty to capture high-intent search traffic. Full sitemap and robots.txt submitted for indexing. Clear intake flow from the homepage.",
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
      "A focused, mobile-first barbershop site with a service menu and pricing, online booking flow, a real photo gallery of the shop and work, location and hours details, and a visual identity that matched the shop's brand. Built with WebP-optimized media for performance on mobile connections, since the vast majority of clients discover the shop on a phone.",
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

  // ── Gulf Coast Weight & Wellness ──────────────────────────────────────────
  {
    slug: "gulf-coast-weight-wellness",
    title: "Gulf Coast Weight & Wellness",
    label: "Original Build",
    category: "Medical Wellness / Telehealth Clinic",
    coverImage: "/images/case-studies/covers/gulfcoast-1-hero.png",
    shortSummary:
      "An early Next.js medical wellness website for a Gulf Coast telehealth concept — covering weight loss, hormone therapy, NAD+, and addiction recovery with a full service page architecture and transparent pricing.",
    summary:
      "Gulf Coast Weight & Wellness was one of my earliest Next.js builds — a telehealth clinic concept requiring a complete service architecture for medical weight loss, hormone therapy, NAD+ treatment, and addiction recovery. It demonstrates early work with clinical web architecture and the multi-service medical wellness category.",
    liveUrl: "https://gulfcoast-wellness-medical-website.vercel.app",
    tags: ["Medical Wellness", "Telehealth", "Weight Loss", "Hormone Therapy", "Gulf Coast"],
    features: [
      "Individual service pages for medical weight loss, men's hormone therapy, women's hormone therapy, NAD+, and addiction recovery",
      "Transparent pricing page to reduce pre-consultation friction",
      "Conversion-focused service architecture",
      "Conservative medical disclaimers throughout",
      "Clean medical aesthetic with Gulf Coast regional identity",
      "Mobile-first design",
      "Provider profile section for clinical credibility",
    ],
    valuePoints: [
      "Complete service architecture from day one across five treatment categories",
      "Pricing transparency to reduce pre-consultation friction",
      "Strong launch foundation for telehealth growth",
      "Professional medical credibility without clinical stiffness",
    ],
    stack: "Next.js, React, Vercel, Tailwind CSS",
    challenge:
      "Telehealth clinics in the weight loss and hormone space face a trust problem. Patients are skeptical of online-only care and may confuse legitimate medical practices with supplement marketing. The site needed to establish medical credibility and service transparency without looking like a sales funnel.",
    whatIBuilt:
      "A structured medical wellness site with individual service pages for each treatment category, a transparent pricing section, provider profiles for clinical credibility, and a clean visual identity that communicates clinical legitimacy while remaining approachable for the Gulf Coast patient demographic.",
    seoConversion:
      "Individual service pages optimized for high-intent searches — medical weight loss, hormone therapy, NAD+. Pricing page to reduce pre-inquiry friction. Conservative disclaimers to support medical compliance. Clear CTA architecture driving to consultation booking.",
    businessValue:
      "Provides a complete digital presence at launch — covering all service lines, supporting patient education, and creating a credible foundation for telehealth growth. An early build that established the service-page architecture patterns now used across the medical wellness category.",
    screenshotLabels: [
      "Homepage — services and positioning",
      "Weight loss program page",
      "Hormone therapy service pages",
      "NAD+ and recovery pages",
      "Pricing and booking flow",
    ],
    screenshotImages: [
      "/images/case-studies/covers/gulfcoast-1-hero.png",
      "/images/case-studies/covers/gulfcoast-2-recovery.png",
      "/images/case-studies/covers/gulfcoast-3-services.png",
      "/images/case-studies/covers/gulfcoast-4-pricing.png",
      "/images/case-studies/covers/gulfcoast-5-doctors.png",
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
