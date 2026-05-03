import type { ReactNode } from "react";

type Props = {
  children: ReactNode;
  onDark?: boolean;
  className?: string;
};

export default function Eyebrow({ children, onDark, className = "" }: Props) {
  return (
    <p
      className={`mono-caption ${className}`}
      style={{
        color: onDark ? "var(--gold-400)" : "var(--gold-700)",
        marginBottom: "1.25rem",
      }}
    >
      {children}
    </p>
  );
}
