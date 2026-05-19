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
        color: "var(--copper)",
        marginBottom: "1rem",
      }}
    >
      {children}
    </p>
  );
}
