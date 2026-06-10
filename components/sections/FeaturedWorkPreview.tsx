import Image from "next/image";
import Link from "next/link";
import type { Project } from "@/lib/projects";
import SectionTag from "@/components/editorial/SectionTag";
import EditorialH2 from "@/components/editorial/EditorialH2";

type Props = {
  projects: Project[];
  sectionNum?: string;
};

/** Strip protocol + trailing slash for a clean display host. */
function displayHost(url: string | null): string | null {
  if (!url) return null;
  return url.replace(/^https?:\/\//, "").replace(/\/$/, "");
}

/** Pull the most quantitative meta cell (pages / routes / apps) for the scope line. */
function primaryScope(project: Project): string | null {
  const cell = project.metaGrid.find((c) =>
    /pages|routes|apps|shipped/i.test(c.label),
  );
  if (!cell) return null;
  return `${cell.value} ${cell.label.toLowerCase()}`;
}

export default function FeaturedWorkPreview({ projects, sectionNum = "02" }: Props) {
  if (projects.length === 0) return null;

  // The first two anchors render as large flagship cards; the rest fill a
  // standard grid below. With the home ordering this leads with the two live
  // local-services platforms (Air Solutions + Pro 1 Painters).
  const flagships = projects.slice(0, 2);
  const rest = projects.slice(2);

  return (
    <section className="section-wrap section-block">
      <SectionTag num={sectionNum} label="Selected work" />
      <EditorialH2>
        Selected builds,<br />
        <em>live and compounding.</em>
      </EditorialH2>

      <div className="featured-flagship-grid">
        {flagships.map((project, i) => {
          const host = displayHost(project.liveUrl);
          const scope = primaryScope(project);
          return (
            <article key={project.slug} className="featured-flagship">
              <Link
                href={`/work/${project.slug}`}
                className="featured-flagship__media"
                aria-label={`${project.title} — case study`}
              >
                {project.coverImage ? (
                  <Image
                    src={project.coverImage}
                    alt={`${project.title} — homepage`}
                    fill
                    preload={i === 0}
                    sizes="(max-width: 860px) 100vw, 50vw"
                    className="featured-flagship__img"
                    style={{ objectFit: "cover" }}
                  />
                ) : null}
                <span className="featured-flagship__index" aria-hidden>
                  0{i + 1}
                </span>
              </Link>

              <div className="featured-flagship__body">
                <div className="featured-flagship__meta">
                  <span className="featured-flagship__category">{project.category}</span>
                  {host ? (
                    <span className="featured-flagship__live">
                      <span className="featured-flagship__live-dot" aria-hidden />
                      {host}
                    </span>
                  ) : null}
                </div>

                <h3 className="featured-flagship__title">
                  <Link href={`/work/${project.slug}`}>{project.title}</Link>
                </h3>

                <p className="featured-flagship__summary">{project.shortSummary}</p>

                <div className="featured-flagship__footer">
                  <Link
                    href={`/work/${project.slug}`}
                    className="editorial-link arrow-link mono"
                  >
                    Read case study <span className="arrow" aria-hidden>→</span>
                  </Link>
                  {scope ? (
                    <span className="featured-flagship__scope">{scope}</span>
                  ) : null}
                </div>
              </div>
            </article>
          );
        })}
      </div>

      {rest.length > 0 ? (
        <div className="featured-work-grid featured-work-grid--secondary">
          {rest.map((project) => {
            const host = displayHost(project.liveUrl);
            return (
              <article key={project.slug} className="featured-work-card">
                <Link
                  href={`/work/${project.slug}`}
                  className="featured-work-card__media"
                  aria-label={`${project.title} — case study`}
                >
                  {project.coverImage ? (
                    <Image
                      src={project.coverImage}
                      alt={`${project.title} — homepage`}
                      fill
                      sizes="(max-width: 720px) 100vw, 50vw"
                      style={{ objectFit: "cover" }}
                    />
                  ) : null}
                </Link>
                <div className="featured-work-card__body">
                  <div className="featured-flagship__meta">
                    <span className="featured-work-card__category">{project.category}</span>
                    {host ? (
                      <span className="featured-flagship__live">
                        <span className="featured-flagship__live-dot" aria-hidden />
                        {host}
                      </span>
                    ) : null}
                  </div>
                  <h3 className="featured-work-card__title">
                    <Link href={`/work/${project.slug}`}>{project.title}</Link>
                  </h3>
                  <p className="featured-work-card__summary">{project.shortSummary}</p>
                  <Link href={`/work/${project.slug}`} className="editorial-link arrow-link mono">
                    Read case study <span className="arrow" aria-hidden>→</span>
                  </Link>
                </div>
              </article>
            );
          })}
        </div>
      ) : null}

      <div className="featured-work-cta">
        <Link href="/work" className="btn-ghost">
          View all projects
        </Link>
      </div>
    </section>
  );
}
