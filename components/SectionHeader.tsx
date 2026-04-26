interface SectionHeaderProps {
  eyebrow?: string;
  headline: string;
  subtext?: string;
  centered?: boolean;
  accentWarm?: boolean;
}

export default function SectionHeader({
  eyebrow,
  headline,
  subtext,
  centered = false,
  accentWarm = false,
}: SectionHeaderProps) {
  return (
    <div style={{ textAlign: centered ? "center" : "left", marginBottom: "3rem" }}>
      {eyebrow && (
        <p
          style={{
            fontFamily: "'DM Mono', monospace",
            fontSize: "0.65rem",
            letterSpacing: "0.14em",
            textTransform: "uppercase",
            color: accentWarm ? "#d4a853" : "#7db0ff",
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
          background: accentWarm
            ? "linear-gradient(90deg, #d4a853, transparent)"
            : "linear-gradient(90deg, #4f8ef7, transparent)",
          marginBottom: "1rem",
          marginLeft: centered ? "auto" : 0,
          marginRight: centered ? "auto" : 0,
        }}
      />
      <h2
        style={{
          fontFamily: "'Plus Jakarta Sans', system-ui, sans-serif",
          fontSize: "clamp(1.75rem, 4vw, 2.6rem)",
          fontWeight: 800,
          color: "#f0f4fc",
          lineHeight: 1.12,
          letterSpacing: "-0.02em",
          marginBottom: subtext ? "1rem" : 0,
        }}
      >
        {headline}
      </h2>
      {subtext && (
        <p
          style={{
            fontFamily: "'DM Sans', system-ui, sans-serif",
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
