import Link from "next/link";
import Image from "next/image";

type Props = {
  onDark?: boolean;
  size?: "sm" | "md" | "lg" | "xl";
  href?: string;
};

const sizeMap = {
  sm: 42,
  md: 56,
  lg: 64,
  xl: 120,
} as const;

export default function StudioMark({ onDark, size = "md", href = "/" }: Props) {
  const height = sizeMap[size];

  // The transparent wordmark renders dark navy on light backgrounds (use on cream).
  // The dark-canvas wordmark renders white on navy (use on cover-surface).
  // Both are the clean, full-bleed lockup on a transparent background:
  //   light bg  → navy + gold ink (the primary logo)
  //   dark bg   → white + gold ink (navy recolored to white)
  const src = onDark
    ? "/images/brand/campbell-digital-studio-horizontal-white-transparent.png"
    : "/images/brand/campbell-digital-studio-horizontal-logo-transparent.png";

  // Both variants share the clean lockup aspect: 628 × 161 (~3.9:1).
  const aspect = 628 / 161;
  const width = Math.round(height * aspect);

  return (
    <Link
      href={href}
      aria-label="Campbell Digital Studio — home"
      style={{
        display: "inline-flex",
        alignItems: "center",
        textDecoration: "none",
        lineHeight: 0,
      }}
    >
      <Image
        src={src}
        alt="Campbell Digital Studio"
        width={width}
        height={height}
        priority
        unoptimized
        style={{ height: `${height}px`, width: "auto", display: "block" }}
      />
    </Link>
  );
}
