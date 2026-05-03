import type { ReactNode } from "react";

type Props = {
  headers: string[];
  rows: ReactNode[][];
  className?: string;
};

export default function EditorialTable({ headers, rows, className = "" }: Props) {
  return (
    <div className={`overflow-x-auto ${className}`}>
      <table className="editorial-table">
        <thead>
          <tr>
            {headers.map((h) => (
              <th key={h}>{h}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((r, i) => (
            <tr key={i}>
              {r.map((cell, j) => (
                <td key={j}>{cell}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
