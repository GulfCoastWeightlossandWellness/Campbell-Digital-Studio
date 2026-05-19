import Image from "next/image";
import Link from "next/link";
import type { Project } from "@/lib/projects";
import SectionTag from "@/components/editorial/SectionTag";
import EditorialH2 from "@/components/editorial/EditorialH2";

type Props = {
  projects: Project[];
  sectionNum?: string;
};

export default function FeaturedWorkPreview({ projects, sectionNum = "04" }: Props) {
  if (projects.length === 0) return null;

  return (
    <section className="section-wrap section-block">
      <SectionTag num={sectionNum} label="Featured work" />
      <EditorialH2>
        Recent builds,<br />
        <em>in depth on the work page.</em>
      </EditorialH2>

      <div className="featured-work-grid">
        {projects.map((project, i) => (
          <article key={project.slug} className="featured-work-card">
            <Link href={`/work/${project.slug}`} className="featured-work-card__media">
              {project.coverImage ? (
                <Image
                  src={project.coverImage}
                  alt={`${project.title} — homepage`}
                  fill
                  priority={i === 0}
                  sizes="(max-width: 720px) 100vw, 50vw"
                  style={{ objectFit: "cover" }}
                />
              ) : null}
            </Link>
            <div className="featured-work-card__body">
              <p className="featured-work-card__category">{project.category}</p>
              <h3 className="featured-work-card__title">
                <Link href={`/work/${project.slug}`}>{project.title}</Link>
              </h3>
              <p className="featured-work-card__summary">{project.shortSummary}</p>
              <Link href={`/work/${project.slug}`} className="editorial-link arrow-link mono">
                Read case study <span className="arrow" aria-hidden>→</span>
              </Link>
            </div>
          </article>
        ))}
      </div>

      <div className="featured-work-cta">
        <Link href="/work" className="btn-ghost">
          View all projects
        </Link>
      </div>
    </section>
  );
}
