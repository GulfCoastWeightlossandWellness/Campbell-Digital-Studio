interface SectionHeaderProps {
  eyebrow?: string;
  headline: string;
  subtext?: string;
  centered?: boolean;
}

export default function SectionHeader({
  eyebrow,
  headline,
  subtext,
  centered = false,
}: SectionHeaderProps) {
  return (
    <div style={{ textAlign: centered ? "center" : "left", marginBottom: "3rem" }}>
      {eyebrow && (
        <p
          style={{
            fontFamily: "'DM Mono', monospace",
            fontSize: "0.65rem",
            letterSpacing: "0.12em",
            textTransform: "uppercase",
            color: "#d4a853",
            marginBottom: "0.75rem",
          }}
        >
          {eyebrow}
        </p>
      )}
      <div
        style={{
          width: "48px",
          height: "2px",
          background: "linear-gradient(90deg, #d4a853, transparent)",
          marginBottom: "1rem",
          marginLeft: centered ? "auto" : 0,
          marginRight: centered ? "auto" : 0,
        }}
      />
      <h2
        style={{
          fontFamily: "'Cormorant Garamond', Georgia, serif",
          fontSize: "clamp(1.75rem, 4vw, 2.6rem)",
          fontWeight: 500,
          color: "#f8f5f0",
          lineHeight: 1.15,
          marginBottom: subtext ? "1rem" : 0,
        }}
      >
        {headline}
      </h2>
      {subtext && (
        <p
          style={{
            fontFamily: "'DM Sans', sans-serif",
            fontSize: "1rem",
            color: "#94a3b8",
            lineHeight: 1.7,
            maxWidth: centered ? "600px" : "680px",
            margin: centered ? "0 auto" : 0,
          }}
        >
          {subtext}
        </p>
      )}
    </div>
  );
}
