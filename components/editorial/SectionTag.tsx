import type { ReactNode } from "react";

type Props = {
  num: string | ReactNode;
  label: string | ReactNode;
  onDark?: boolean;
  className?: string;
};

export default function SectionTag({ num, label, onDark, className = "" }: Props) {
  return (
    <div className={`section-tag${onDark ? " on-dark" : ""} ${className}`}>
      <span className="num">{num}</span>
      <span className="label">{label}</span>
    </div>
  );
}
