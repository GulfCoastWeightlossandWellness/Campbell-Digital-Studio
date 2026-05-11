import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Google site verification",
  robots: { index: false, follow: false },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body
        style={{
          margin: 0,
          minHeight: "100vh",
          display: "grid",
          placeItems: "center",
          background: "#0a0a0a",
          color: "#e5e5e5",
          fontFamily: "ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace",
          fontSize: "0.95rem",
        }}
      >
        {children}
      </body>
    </html>
  );
}
