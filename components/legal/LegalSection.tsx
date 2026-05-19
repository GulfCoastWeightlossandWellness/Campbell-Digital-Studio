import type { ReactNode } from "react";

type Props = {
  title: string;
  children: ReactNode;
};

export default function LegalSection({ title, children }: Props) {
  return (
    <section className="legal-section">
      <h2 className="legal-section__title">{title}</h2>
      <div className="legal-section__content">{children}</div>
    </section>
  );
}
