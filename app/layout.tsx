import type { Metadata } from "next";
import { Fraunces, Manrope, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const fraunces = Fraunces({
  subsets: ["latin"],
  display: "swap",
  axes: ["opsz"],
  variable: "--font-fraunces",
});

const manrope = Manrope({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-manrope",
});

const jetbrains = JetBrains_Mono({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-jetbrains",
});

export const metadata: Metadata = {
  title: {
    default: "Campbell Digital Studio | Medical & Local Business Websites",
    template: "%s | Campbell Digital Studio",
  },
  description:
    "A small studio building modern websites and local-search infrastructure for clinics, wellness practices, and the kind of local businesses that still answer their own phone.",
  metadataBase: new URL("https://peytoncampbell.studio"),
  openGraph: {
    type: "website",
    siteName: "Campbell Digital Studio",
    title: "Campbell Digital Studio | Medical & Local Business Websites",
    description:
      "A small studio building modern websites and local-search infrastructure for clinics, wellness practices, and the kind of local businesses that still answer their own phone.",
    images: [
      {
        url: "/images/og/campbell-digital-studio-og-image.png",
        width: 1024,
        height: 533,
        alt: "Campbell Digital Studio — editorial websites and local-search infrastructure",
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
    <html
      lang="en"
      className={`${fraunces.variable} ${manrope.variable} ${jetbrains.variable}`}
    >
      <body>
        <Header />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
