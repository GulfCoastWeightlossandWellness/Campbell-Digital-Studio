"use client";

import { useMemo, useState } from "react";
import ScreenshotPlaceholder from "@/components/ScreenshotPlaceholder";

type Surface = "marketing" | "dashboard";

interface IHESurfaceSwitcherProps {
  marketingUrl?: string;
  dashboardUrl?: string;
  marketingLabels: string[];
  marketingImages: string[];
  dashboardLabels: string[];
  dashboardImages: string[];
}

export default function IHESurfaceSwitcher({
  marketingUrl,
  dashboardUrl,
  marketingLabels,
  marketingImages,
  dashboardLabels,
  dashboardImages,
}: IHESurfaceSwitcherProps) {
  const [surface, setSurface] = useState<Surface>("dashboard");

  const items = useMemo(
    () =>
      surface === "marketing"
        ? marketingLabels.map((label, index) => ({ label, image: marketingImages[index] }))
        : dashboardLabels.map((label, index) => ({ label, image: dashboardImages[index] })),
    [surface, marketingLabels, marketingImages, dashboardLabels, dashboardImages],
  );

  const currentUrl = surface === "marketing" ? marketingUrl : dashboardUrl;
  const ratio = surface === "marketing" ? "4/3" : "16/9";

  return (
    <div style={{ marginTop: "1rem" }}>
      <div style={{ display: "flex", gap: "0.6rem", flexWrap: "wrap", marginBottom: "1rem" }}>
        <button
          type="button"
          onClick={() => setSurface("dashboard")}
          style={{
            borderRadius: "999px",
            border: surface === "dashboard" ? "1px solid rgba(212,168,83,0.45)" : "1px solid rgba(255,255,255,0.14)",
            background: surface === "dashboard" ? "rgba(212,168,83,0.14)" : "rgba(15,23,42,0.65)",
            color: surface === "dashboard" ? "#f8f5f0" : "#cbd5e1",
            fontFamily: "'DM Sans',sans-serif",
            fontSize: "0.8rem",
            padding: "0.42rem 0.95rem",
            cursor: "pointer",
          }}
        >
          Product Dashboard
        </button>
        <button
          type="button"
          onClick={() => setSurface("marketing")}
          style={{
            borderRadius: "999px",
            border: surface === "marketing" ? "1px solid rgba(212,168,83,0.45)" : "1px solid rgba(255,255,255,0.14)",
            background: surface === "marketing" ? "rgba(212,168,83,0.14)" : "rgba(15,23,42,0.65)",
            color: surface === "marketing" ? "#f8f5f0" : "#cbd5e1",
            fontFamily: "'DM Sans',sans-serif",
            fontSize: "0.8rem",
            padding: "0.42rem 0.95rem",
            cursor: "pointer",
          }}
        >
          Marketing Site
        </button>
        {currentUrl && (
          <a
            href={currentUrl}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              marginLeft: "auto",
              fontFamily: "'DM Mono',monospace",
              fontSize: "0.65rem",
              color: "#d4a853",
              textDecoration: "none",
              alignSelf: "center",
            }}
          >
            Open current view &uarr;
          </a>
        )}
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(280px,1fr))", gap: "0.75rem" }}>
        {items.map((item) => (
          <ScreenshotPlaceholder
            key={`${surface}-${item.label}`}
            label={item.label}
            aspectRatio={ratio}
            imageSrc={item.image}
          />
        ))}
      </div>
    </div>
  );
}
