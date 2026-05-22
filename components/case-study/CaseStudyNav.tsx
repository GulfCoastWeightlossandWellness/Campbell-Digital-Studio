import Link from "next/link";
import type { Project } from "@/lib/projects";

/**
 * Previous / next case-study pager.
 *
 * Important: the parent page (`app/work/[slug]/page.tsx`) sources `prev` and
 * `next` from the FULL `projects` array in `lib/projects.ts` — not the
 * `featured` subset — and wraps continuously (last → first, first → last) so
 * a visitor can rev through every case study without hitting a dead end.
 * Do not re-filter inside this component.
 */

type Props = {
  prev: Project | null;
  next: Project | null;
};

export default function CaseStudyNav({ prev, next }: Props) {
  if (!prev && !next) return null;

  return (
    <section className="case-study-nav" aria-label="More case studies">
      <div className="section-wrap case-study-nav__grid">
        {prev ? (
          <Link href={`/work/${prev.slug}`} className="prev-next-cell">
            <span className="prev-next-cell__eyebrow">← Previous case study</span>
            <h4 className="prev-next-cell__title">{prev.title}</h4>
            <span className="prev-next-cell__meta mono-caption">
              {prev.category}
            </span>
          </Link>
        ) : (
          <div aria-hidden />
        )}
        {next ? (
          <Link
            href={`/work/${next.slug}`}
            className="prev-next-cell prev-next-cell--next"
          >
            <span className="prev-next-cell__eyebrow">Next case study →</span>
            <h4 className="prev-next-cell__title">{next.title}</h4>
            <span className="prev-next-cell__meta mono-caption">
              {next.category}
            </span>
          </Link>
        ) : (
          <div aria-hidden />
        )}
      </div>
    </section>
  );
}
