import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: {
    default: "Campbell Digital Studio | Medical & Local Business Websites",
    template: "%s | Campbell Digital Studio",
  },
  description:
    "Custom websites, local SEO, and digital assets for medical practices and local businesses. Built by a physician in training using modern AI-assisted development workflows.",
  metadataBase: new URL("https://peytoncampbell.studio"),
  openGraph: {
    type: "website",
    siteName: "Campbell Digital Studio",
    title: "Campbell Digital Studio | Medical & Local Business Websites",
    description:
      "Custom websites, local SEO, and digital assets for medical practices and local businesses. Built by a physician in training using modern AI-assisted development workflows.",
    images: [
      {
        url: "/images/og/campbell-digital-studio-og-image.png",
        width: 1024,
        height: 533,
        alt: "Campbell Digital Studio — Custom Websites and Local SEO for Medical and Local Businesses",
      },
    ],
  },
  icons: {
    icon: [
      { url: "/favicon.ico" },
      { url: "/images/brand/campbell-digital-studio-icon.png", type: "image/png" },
    ],
    apple: [{ url: "/apple-icon.png", type: "image/png" }],
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <Header />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
