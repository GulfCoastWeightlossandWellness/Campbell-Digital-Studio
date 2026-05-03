import type { ReactNode } from "react";

export type CadenceCell = {
  label: string;
  value: ReactNode;
  detail?: ReactNode;
};

type Props = {
  cells: CadenceCell[];
  className?: string;
};

export default function Cadence({ cells, className = "" }: Props) {
  return (
    <div className={`cadence ${className}`}>
      {cells.map((c, i) => (
        <div key={`${c.label}-${i}`} className="cadence-cell">
          <div className="label">{c.label}</div>
          <div className="value">{c.value}</div>
          {c.detail ? <div className="detail">{c.detail}</div> : null}
        </div>
      ))}
    </div>
  );
}
