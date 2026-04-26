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
      "A proactive strategic rebuild showing how a multi-location medical wellness website could become a modern patient conversion and education platform.",
    summary:
      "Revitalize was rebuilt as a strategic concept to demonstrate how an existing medical wellness website could become a more complete patient conversion and education platform — replacing a template-style brochure site with a launch-ready clinical marketing system.",
    liveUrl: "https://revitalize-medical-wellness-clinic-nine.vercel.app",
    tags: ["Medical Wellness", "Medspa", "Local SEO", "Next.js", "Multi-Location"],
    features: [
      "Custom Next.js / Vercel build with 80+ generated routes",
      "Columbus and Warner Robins local SEO structure",
      "Auburn closure cleanup and redirect strategy",
      "Start Here new patient pathway",
      "Hormone Health Self-Assessment tool",
      "Treatment Finder interactive guide",
      "Learning Library for articles, videos, and patient guides",
      "Blog and article preservation from legacy site",
      "Google review link infrastructure",
      "Location-specific JaneApp booking links",
      "Dynamic sitemap and schema markup",
      "Mobile booking, call, and Start Here sticky bar",
      "Conservative medical disclaimers throughout",
      "Accessibility and launch QA checklist",
    ],
    valuePoints: [
      "Clearer active-location footprint after Auburn closure",
      "Stronger local SEO for Columbus and Warner Robins markets",
      "Better patient navigation across service lines",
      "Streamlined booking flow per location",
      "Authority-building content system with learning library",
      "Safer migration architecture from legacy site",
    ],
    stack: "Next.js, React, Vercel, TypeScript, Tailwind CSS, Dynamic Sitemap, Schema Markup",
    challenge:
      "The existing site was a template-style brochure with minimal local SEO structure, no patient education system, and an outdated location footprint that still referenced a closed Auburn location. Patients had no clear pathway to book, understand services, or compare locations.",
    whatIBuilt:
      "A comprehensive clinical marketing platform with 80+ pages covering both active locations, a structured Start Here patient pathway, an interactive hormone health assessment and treatment finder, a searchable learning library, and JaneApp booking flows specific to each location.",
    seoConversion:
      "Built city-specific landing pages for Columbus and Warner Robins, added schema markup for medical practice entities, implemented a dynamic sitemap, created a clean redirect strategy for the Auburn location, and built a Google review link infrastructure to support ongoing reputation management.",
    businessValue:
      "The rebuild gives Revitalize a clear two-location digital footprint, a patient education system that builds authority before the first appointment, and a booking architecture that reduces friction from discovery to scheduling.",
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
      "A premium local SEO website for an HVAC company serving Baldwin County, Alabama — built to improve local search visibility and drive service requests.",
    summary:
      "ACExperts251 needed a website that matched the quality of their work and helped homeowners in Baldwin County find, trust, and contact them quickly. The result is a structured local SEO site with clear service pages, city-level coverage, and a strong visual identity.",
    liveUrl: "https://acexperts251.com",
    tags: ["HVAC", "Local SEO", "Baldwin County", "Service Business", "Conversion"],
    features: [
      "Service-area and city page structure for Baldwin County",
      "Dedicated service pages: installation, repair, maintenance, mini-splits",
      "Financing and maintenance plan pages",
      "Google review integration and trust signals",
      "Premium visual identity with deep neutrals and amber accents",
      "Conversion-focused homepage with clear call-to-action hierarchy",
      "Contact and service request flow",
      "Mobile-first responsive design",
      "Local trust positioning and licensing signals",
      "Fast page load with optimized assets",
    ],
    valuePoints: [
      "More professional online presence matching service quality",
      "Improved local search visibility in Baldwin County",
      "Clear pathways for homeowners to request service",
      "Service-area SEO structure for multi-city coverage",
      "Financing page to reduce friction on larger jobs",
    ],
    stack: "Modern front-end build, Vercel deployment",
    challenge:
      "Most HVAC competitors in Baldwin County have minimal web presences — outdated sites with no service structure, weak local SEO, and no clear reason for a homeowner to call over another option. ACExperts needed a site that established authority quickly.",
    whatIBuilt:
      "A clean, premium local service site with structured service pages, city-level coverage pages, a financing section, maintenance plan details, and a direct service request flow — all built around Baldwin County search terms and homeowner trust signals.",
    seoConversion:
      "Structured city pages for Gulf Shores, Foley, Daphne, Fairhope, and surrounding communities. Service-specific pages for each major HVAC category. Clear CTA hierarchy driving to phone, contact form, and service request.",
    businessValue:
      "Gives ACExperts a credible, professional digital presence that earns trust before the first phone call, supports local search rankings across Baldwin County, and makes it simple for homeowners to request service or financing.",
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
    coverImage: "/images/case-studies/covers/collective-1-home.png",
    shortSummary:
      "A professional therapy practice website for Collective Counseling in Daphne, Alabama — focused on counseling services and adult ADHD testing.",
    summary:
      "Collective Counseling needed a site that communicated professionalism and approachability in equal measure — helping prospective clients understand services, know what to expect, and feel safe enough to reach out.",
    liveUrl: "https://collectivecounselingdaphne.com",
    tags: ["Therapy", "Counseling", "ADHD Testing", "Local SEO", "Daphne AL"],
    features: [
      "Local SEO structure for Daphne, Alabama",
      "Dedicated service pages for counseling and ADHD testing",
      "Adult ADHD testing positioning as a cash-pay service",
      "Insurance and payment clarity section",
      "Professional but warm visual tone",
      "Google Business Profile alignment",
      "Client inquiry and contact flow",
      "Mobile-first responsive layout",
      "Clear service differentiation and specialties",
      "Trust signals for therapy-specific client concerns",
    ],
    valuePoints: [
      "Helps prospective clients understand services before reaching out",
      "Improves local discoverability for therapy and ADHD testing",
      "ADHD testing positioned clearly as a cash-pay specialty service",
      "Builds trust for clients navigating therapy for the first time",
      "Insurance clarity reduces pre-inquiry friction",
    ],
    stack: "Modern front-end build, Vercel deployment",
    challenge:
      "Therapy websites often default to either generic template language or overly clinical copy. The challenge was building a site that felt personal and safe without losing professional credibility — while also positioning ADHD testing as a distinct, searchable service.",
    whatIBuilt:
      "A warm, structured site with service-specific pages for general counseling and adult ADHD testing, clear insurance and payment information, and a client inquiry flow designed to reduce the friction of making first contact.",
    seoConversion:
      "Local SEO structured around Daphne and Baldwin County. ADHD testing positioned as a keyword-specific service page. Insurance transparency to reduce phone inquiries about coverage. Clear intake flow from the homepage.",
    businessValue:
      "Gives Collective Counseling a professional web presence that makes potential clients feel understood before they call — reducing no-shows and improving inquiry quality by filtering for the right fit from the start.",
    screenshotLabels: [
      "Homepage — welcome and services overview",
      "Counseling services page",
      "ADHD testing page — cash-pay positioning",
      "Insurance and payment information",
      "Client inquiry and contact flow",
    ],
    screenshotImages: [
      "/images/case-studies/covers/collective-1-home.png",
      "/images/case-studies/covers/collective-2-services.png",
      "/images/case-studies/covers/collective-3-adhd.png",
      "/images/case-studies/covers/collective-4-fees.png",
      "/images/case-studies/covers/collective-5-contact.png",
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
      "A clean, mobile-first barbershop website focused on local visibility, online booking, and making it easy for new clients to find and book an appointment.",
    summary:
      "Blessed Barbershop needed a modern website that reflected the quality of the shop and made it easy for clients to book online. The site was built around local search discoverability and a frictionless booking experience.",
    liveUrl: "https://www.blessedbarbershopdaphne.com",
    tags: ["Barbershop", "Local SEO", "Booking", "Local Business"],
    features: [
      "Clean, mobile-first design matching the shop's identity",
      "Online booking integration",
      "Service menu with pricing",
      "Google Business Profile alignment",
      "Location and contact information prominently placed",
      "Trust signals: social proof and reviews",
      "Mobile tap-to-call CTA",
    ],
    valuePoints: [
      "Professional web presence matching the quality of the service",
      "Easy online booking to reduce phone call volume",
      "Improved local search discoverability",
      "Clear service and pricing information for new clients",
    ],
    stack: "Modern front-end build, Vercel deployment",
    challenge:
      "Most barbershops rely on Instagram or Google Maps as their only digital presence. Blessed Barbershop needed a dedicated site that gave new clients confidence and a clear path to booking — without looking generic.",
    whatIBuilt:
      "A focused, conversion-optimized barbershop site with a service menu, online booking flow, location details, and a visual identity that matched the shop's brand. Built mobile-first since most clients discover the shop on a phone.",
    seoConversion:
      "Local SEO structured around the barbershop's service area. Google Business Profile alignment for map visibility. Mobile-first design and tap-to-call CTA to reduce friction from search to booking.",
    businessValue:
      "Gives Blessed Barbershop a professional digital home that earns client trust before they walk in — reducing no-shows and making it easy for new clients to discover, verify, and book.",
    screenshotLabels: [
      "Homepage — services and booking CTA",
      "Service menu and pricing",
      "Booking flow",
      "Location and contact",
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
      "A custom medical wellness website for a Gulf Coast-based telehealth clinic concept — covering weight loss, hormone therapy, NAD+, and addiction recovery.",
    summary:
      "Gulf Coast Weight & Wellness required a complete service architecture for a telehealth clinic concept offering medical weight loss, hormone therapy, NAD+ treatment, and addiction recovery services along the Gulf Coast.",
    liveUrl: "https://gulfcoast-wellness-medical-website.vercel.app",
    tags: ["Medical Wellness", "Telehealth", "Weight Loss", "Hormone Therapy", "Gulf Coast"],
    features: [
      "Medical weight loss service page",
      "Men's hormone therapy page",
      "Women's hormone therapy page",
      "NAD+ therapy page",
      "Addiction recovery page",
      "Transparent pricing page",
      "Conversion-focused service architecture",
      "Clean medical aesthetic with Gulf Coast identity",
      "Mobile-first design",
      "Conservative medical disclaimers",
    ],
    valuePoints: [
      "Complete service architecture from day one",
      "Clear patient education on each treatment area",
      "Pricing transparency to reduce pre-consultation friction",
      "Strong launch foundation for telehealth growth",
      "Professional medical credibility without stiff clinical language",
    ],
    stack: "Next.js, React, Vercel, Tailwind CSS",
    challenge:
      "Telehealth clinics in the weight loss and hormone space face a trust problem. Patients are skeptical of online-only care and may confuse legitimate medical practices with supplement marketing. The site needed to establish medical credibility and service transparency without looking like a sales funnel.",
    whatIBuilt:
      "A structured medical wellness site with individual service pages for each treatment category, a transparent pricing section, and a clean visual identity that communicates clinical legitimacy while remaining approachable for the Gulf Coast patient demographic.",
    seoConversion:
      "Individual service pages optimized for high-intent searches (medical weight loss, hormone therapy, NAD+). Pricing page to reduce pre-inquiry friction. Conservative disclaimers to support medical compliance. Clear CTA architecture driving to consultation booking.",
    businessValue:
      "Provides the clinic with a complete digital presence at launch — covering all service lines, supporting patient education, and creating a credible foundation for telehealth growth without requiring a large marketing budget.",
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
