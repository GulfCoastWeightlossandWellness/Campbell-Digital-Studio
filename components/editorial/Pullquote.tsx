import type { ReactNode } from "react";

type Props = {
  children: ReactNode;
  attribution?: string;
  className?: string;
};

export default function Pullquote({ children, attribution, className = "" }: Props) {
  return (
    <blockquote className={`pullquote ${className}`}>
      {children}
      {attribution ? <span className="attr">— {attribution}</span> : null}
    </blockquote>
  );
}
