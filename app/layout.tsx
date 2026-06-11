import type { Metadata } from "next";
import { Fraunces } from "next/font/google";
import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import StickyMobileCTA from "@/components/StickyMobileCTA";
import Analytics from "@/components/Analytics";
import { Analytics as VercelAnalytics } from "@vercel/analytics/next";
import ScrollProgress from "@/components/scroll/ScrollProgress";
import { JsonLd } from "@/components/seo/JsonLd";
import { siteConfig, absoluteUrl } from "@/lib/site-config";

const fraunces = Fraunces({
  subsets: ["latin"],
  display: "swap",
  axes: ["opsz"],
  variable: "--font-fraunces",
});

const titleDefault = `${siteConfig.name} | Medical & Local Business Websites`;

export const metadata: Metadata = {
  title: {
    default: titleDefault,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,
  metadataBase: new URL(siteConfig.url),
  // No blanket canonical here on purpose: a default `alternates.canonical` in
  // the root layout is inherited verbatim by any child route that doesn't set
  // its own — which would wrongly point /work (a client component that cannot
  // export metadata) at the homepage and de-index it as a duplicate. Each route
  // declares its own canonical; routes without one self-canonicalize to their
  // own URL, which is the correct default.
  // Explicit crawl directive. Without this, pages inherit the engine default;
  // stating it removes ambiguity and opts into large image previews + full
  // snippets for both Google and Bing.
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  openGraph: {
    type: "website",
    url: siteConfig.url,
    siteName: siteConfig.name,
    title: titleDefault,
    description: siteConfig.description,
    images: [
      {
        url: siteConfig.ogImage,
        width: 1024,
        height: 533,
        type: "image/png",
        alt: `${siteConfig.name} — editorial websites and local-search infrastructure`,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: titleDefault,
    description: siteConfig.description,
    images: [siteConfig.ogImage],
  },
  icons: {
    icon: [
      { url: "/favicon.ico" },
      { url: "/images/brand/campbell-digital-studio-icon.png", type: "image/png" },
    ],
    apple: [{ url: "/apple-icon.png", type: "image/png" }],
  },
};

// Stable @id anchors so the nodes cross-reference instead of duplicating the
// founder/publisher entity. #organization, #person, #website are resolvable
// fragments on the canonical home URL.
const organizationId = `${siteConfig.url}/#organization`;
const personId = `${siteConfig.url}/#person`;
const websiteId = `${siteConfig.url}/#website`;

// External profiles for the studio + founder. Empty until a public profile
// exists — never fabricate a sameAs URL (it weakens entity trust if it 404s).
const orgSameAs = [
  siteConfig.social.github
    ? `https://github.com/${siteConfig.social.github}`
    : null,
].filter((v): v is string => Boolean(v));

const personSchema = {
  "@context": "https://schema.org",
  "@type": "Person",
  "@id": personId,
  name: siteConfig.founder.name,
  honorificSuffix: siteConfig.founder.credential,
  jobTitle: siteConfig.founder.role,
  description:
    "Family-medicine physician and the solo founder and developer behind Campbell Digital Studio. Builds the studio's websites, local-search infrastructure, and patient-education software directly.",
  url: absoluteUrl("/studio"),
  email: siteConfig.email,
  worksFor: { "@id": organizationId },
  founderOf: { "@id": organizationId },
  homeLocation: {
    "@type": "Place",
    address: {
      "@type": "PostalAddress",
      addressLocality: "Daphne",
      addressRegion: "AL",
      addressCountry: "US",
    },
  },
  // No public personal profiles confirmed yet — leave empty rather than invent.
  sameAs: [],
};

const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  "@id": organizationId,
  name: siteConfig.name,
  alternateName: siteConfig.shortName,
  url: siteConfig.url,
  logo: absoluteUrl("/images/brand/campbell-digital-studio-icon.png"),
  image: absoluteUrl(siteConfig.ogImage),
  email: siteConfig.email,
  description: siteConfig.description,
  founder: { "@id": personId },
  address: {
    "@type": "PostalAddress",
    addressLocality: "Daphne",
    addressRegion: "AL",
    addressCountry: "US",
  },
  areaServed: { "@type": "Country", name: "United States" },
  knowsAbout: [
    "Medical practice websites",
    "Local service business websites",
    "Programmatic SEO",
    "Local search infrastructure",
    "Google Business Profile management",
    "Patient education software",
  ],
  sameAs: orgSameAs,
};

// WebSite node — intentionally NO SearchAction (there is no on-site search;
// claiming a sitelinks searchbox without one is a structured-data mismatch).
const websiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "@id": websiteId,
  name: siteConfig.name,
  url: siteConfig.url,
  description: siteConfig.description,
  publisher: { "@id": organizationId },
  inLanguage: "en-US",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      className={`${GeistSans.variable} ${GeistMono.variable} ${fraunces.variable}`}
    >
      <body>
        <JsonLd schema={[organizationSchema, websiteSchema, personSchema]} />
        <ScrollProgress />
        <Analytics />
        <Header />
        <main id="main-content" tabIndex={-1}>{children}</main>
        <Footer />
        <StickyMobileCTA />
        <VercelAnalytics />
      </body>
    </html>
  );
}
