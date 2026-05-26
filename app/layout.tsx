import type { Metadata } from "next";
import { Fraunces } from "next/font/google";
import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import StickyMobileCTA from "@/components/StickyMobileCTA";
import Analytics from "@/components/Analytics";
import ScrollProgress from "@/components/scroll/ScrollProgress";
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

const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: siteConfig.name,
  url: siteConfig.url,
  logo: absoluteUrl("/images/brand/campbell-digital-studio-icon.png"),
  email: siteConfig.email,
  description: siteConfig.description,
  founder: {
    "@type": "Person",
    name: siteConfig.founder.name,
    honorificSuffix: siteConfig.founder.credential,
    jobTitle: siteConfig.founder.role,
  },
  address: {
    "@type": "PostalAddress",
    addressLocality: "Daphne",
    addressRegion: "AL",
    addressCountry: "US",
  },
  sameAs: [
    siteConfig.social.github
      ? `https://github.com/${siteConfig.social.github}`
      : null,
  ].filter(Boolean),
};

const websiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: siteConfig.name,
  url: siteConfig.url,
  description: siteConfig.description,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      className={`${GeistSans.variable} ${GeistMono.variable} ${fraunces.variable}`}
    >
      <body>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
        />
        <ScrollProgress />
        <Analytics />
        <Header />
        <main id="main-content" tabIndex={-1}>{children}</main>
        <Footer />
        <StickyMobileCTA />
      </body>
    </html>
  );
}
