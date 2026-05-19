import type { ReactNode } from "react";
import PageIntro from "@/components/editorial/PageIntro";

type Props = {
  eyebrow: string;
  title: ReactNode;
  subtitle: string;
  children: ReactNode;
};

export default function LegalPage({ eyebrow, title, subtitle, children }: Props) {
  return (
    <article className="legal-page section-wrap">
      <PageIntro eyebrow={eyebrow} className="page-intro--legal">
        {title}
      </PageIntro>
      <p className="legal-page__subtitle reading-col">{subtitle}</p>
      <div className="legal-page__body reading-col">{children}</div>
    </article>
  );
}
