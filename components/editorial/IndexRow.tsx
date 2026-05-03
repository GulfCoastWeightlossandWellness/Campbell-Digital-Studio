import Link from "next/link";
import type { ReactNode } from "react";

type Props = {
  href: string;
  year: string;
  title: ReactNode;
  meta: ReactNode;
  external?: boolean;
};

export default function IndexRow({ href, year, title, meta, external }: Props) {
  const Component: typeof Link | "a" = external ? "a" : Link;
  const extraProps = external ? { target: "_blank", rel: "noopener noreferrer" } : {};

  return (
    <Component href={href} className="index-row" {...extraProps}>
      <span className="year">{year}</span>
      <span className="title">{title}</span>
      <span style={{ display: "inline-flex", alignItems: "baseline" }}>
        <span className="meta">{meta}</span>
        <span className="arrow" aria-hidden="true">
          {external ? "↗" : "→"}
        </span>
      </span>
    </Component>
  );
}
