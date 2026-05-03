import type { ReactNode } from "react";

type Props = {
  children: ReactNode;
  onDark?: boolean;
  className?: string;
  as?: "h1" | "h2" | "h3";
};

export default function EditorialH2({
  children,
  onDark,
  className = "",
  as: Tag = "h2",
}: Props) {
  return (
    <Tag className={`editorial-h2${onDark ? " on-dark" : ""} ${className}`}>
      {children}
    </Tag>
  );
}
