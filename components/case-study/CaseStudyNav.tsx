import Link from "next/link";
import type { Project } from "@/lib/projects";

type Props = {
  prev: Project | null;
  next: Project | null;
};

export default function CaseStudyNav({ prev, next }: Props) {
  if (!prev && !next) return null;

  return (
    <section className="case-study-nav">
      <div className="section-wrap case-study-nav__grid">
        {prev ? (
          <Link href={`/work/${prev.slug}`} className="prev-next-cell">
            <span className="prev-next-cell__eyebrow">← Previous</span>
            <h4 className="prev-next-cell__title">{prev.title}</h4>
          </Link>
        ) : (
          <div aria-hidden />
        )}
        {next ? (
          <Link href={`/work/${next.slug}`} className="prev-next-cell prev-next-cell--next">
            <span className="prev-next-cell__eyebrow">Next →</span>
            <h4 className="prev-next-cell__title">{next.title}</h4>
          </Link>
        ) : (
          <div aria-hidden />
        )}
      </div>
    </section>
  );
}
