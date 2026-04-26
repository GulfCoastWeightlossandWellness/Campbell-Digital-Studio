import Image from "next/image";

interface ScreenshotPlaceholderProps {
  label: string;
  aspectRatio?: string;
  imageSrc?: string;
}

export default function ScreenshotPlaceholder({
  label,
  aspectRatio = "16/9",
  imageSrc,
}: ScreenshotPlaceholderProps) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
      <div style={{ position: "relative", aspectRatio, overflow: "hidden", borderRadius: "10px" }}>
        <Image
          src={imageSrc ?? "/images/case-studies/campbell-digital-studio-case-study-placeholder.png"}
          alt=""
          aria-hidden="true"
          fill
          sizes="(max-width: 768px) 100vw, 50vw"
          style={{ objectFit: "cover", objectPosition: "center top" }}
        />
        {/* Label overlay */}
        <div
          style={{
            position: "absolute",
            bottom: 0,
            left: 0,
            right: 0,
            padding: "0.6rem 0.85rem",
            background: "linear-gradient(to top, rgba(8,14,26,0.92) 0%, transparent 100%)",
          }}
        >
          <p
            style={{
              fontFamily: "'DM Mono', monospace",
              fontSize: "0.65rem",
              letterSpacing: "0.04em",
              color: "#94a3b8",
              margin: 0,
            }}
          >
            {label}
          </p>
        </div>
      </div>
      <p
        style={{
          fontFamily: "'DM Mono', monospace",
          fontSize: "0.55rem",
          letterSpacing: "0.06em",
          color: "#374151",
          textAlign: "right",
          margin: 0,
        }}
      >
        {imageSrc ? "Live project screenshot" : "Placeholder — real screenshots pending"}
      </p>
    </div>
  );
}
