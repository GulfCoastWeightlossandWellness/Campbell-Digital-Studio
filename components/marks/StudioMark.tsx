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
  const src = onDark
    ? "/images/brand/campbell-digital-studio-horizontal-dark.png"
    : "/images/brand/campbell-digital-studio-horizontal-logo-transparent.png";

  // Native aspect ratios:
  //   transparent: 628 × 161  → ~3.9:1
  //   dark canvas: 1024 × 682 → ~1.5:1 (logo sits inside ~60% of width with padding)
  const aspect = onDark ? 1024 / 682 : 628 / 161;
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
