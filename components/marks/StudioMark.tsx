import Link from "next/link";

type Props = {
  onDark?: boolean;
  size?: "sm" | "md";
  href?: string;
};

export default function StudioMark({ onDark, size = "md", href = "/" }: Props) {
  const fontSize = size === "sm" ? "16px" : "20px";
  const color = onDark ? "white" : "var(--navy-900)";
  const ruleColor = onDark ? "var(--gold-400)" : "var(--gold-600)";

  return (
    <Link
      href={href}
      style={{
        display: "inline-flex",
        alignItems: "baseline",
        gap: "10px",
        textDecoration: "none",
        color,
        fontFamily: "var(--font-fraunces), Georgia, serif",
        fontWeight: 500,
        fontSize,
        letterSpacing: "-0.018em",
        lineHeight: 1,
        fontVariationSettings: '"opsz" 96',
      }}
      aria-label="Campbell Digital Studio — home"
    >
      <span>Campbell Digital</span>
      <span
        aria-hidden
        style={{
          display: "inline-block",
          width: "14px",
          height: "1px",
          background: ruleColor,
        }}
      />
      <span style={{ fontStyle: "italic", fontWeight: 400 }}>Studio</span>
    </Link>
  );
}
