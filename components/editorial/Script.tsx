import type { ReactNode } from "react";

type Props = {
  label: string;
  children: ReactNode;
  className?: string;
};

export default function Script({ label, children, className = "" }: Props) {
  return (
    <div className={`script ${className}`}>
      <div className="script-label">{label}</div>
      <div className="script-text">{children}</div>
    </div>
  );
}
