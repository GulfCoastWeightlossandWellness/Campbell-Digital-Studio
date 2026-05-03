import type { ReactNode } from "react";

type Props = {
  children: ReactNode;
  className?: string;
  style?: React.CSSProperties;
};

export default function Cover({ children, className = "", style }: Props) {
  return (
    <section className={`cover-surface ${className}`} style={style}>
      <div className="section-wrap" style={{ paddingTop: "clamp(72px, 10vw, 112px)", paddingBottom: "clamp(56px, 8vw, 96px)" }}>
        {children}
      </div>
    </section>
  );
}
