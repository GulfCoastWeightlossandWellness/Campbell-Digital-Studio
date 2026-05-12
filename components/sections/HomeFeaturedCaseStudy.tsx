import type { ReactNode } from "react";
import Image from "next/image";
import Link from "next/link";
import type { Project } from "@/lib/projects";
import SectionTag from "@/components/editorial/SectionTag";
import EditorialH2 from "@/components/editorial/EditorialH2";

export type HomeFeaturedVariant = "split" | "stacked";
export type HomeFeaturedSurface = "canvas" | "panel";
export type HomeFeaturedGlow = "strong" | "soft";

type Props = {
  project: Project;
  variant: HomeFeaturedVariant;
  surface: HomeFeaturedSurface;
  sectionNum: string;
  sectionLabel: string;
  imageGlow: HomeFeaturedGlow;
  imagePriority?: boolean;
  /** Frame background token behind the image (panel vs surface) */
  imageSurface?: "panel" | "surface";
  children: ReactNode;
};

export default function HomeFeaturedCaseStudy({
  project,
  variant,
  surface,
  sectionNum,
  sectionLabel,
  imageGlow,
  imagePriority = false,
  imageSurface = "panel",
  children,
}: Props) {
  const glowClass =
    imageGlow === "strong" ? "home-feature-cover-frame--strong" : "home-feature-cover-frame--soft";
  const frameBg = imageSurface === "surface" ? "var(--surface)" : "var(--panel)";

  const imageSizesSplit =
    "(max-width: 768px) 100vw, (max-width: 1280px) 58vw, min(720px, 45vw)";
  const imageSizesStacked = "(max-width: 1280px) 100vw, 1280px";

  const cover = project.coverImage ? (
    <div
      className={`home-feature-cover-frame ${glowClass}`}
      style={{
        marginTop: variant === "split" ? "clamp(8px, 2vw, 16px)" : "48px",
        background: frameBg,
      }}
    >
      <Image
        src={project.coverImage}
        alt={`${project.title} — homepage`}
        fill
        priority={imagePriority}
        sizes={variant === "split" ? imageSizesSplit : imageSizesStacked}
        style={{ objectFit: "cover" }}
      />
    </div>
  ) : null;

  const lead = <p className="reading-col home-feature-stacked__lead">{project.shortSummary}</p>;

  const body = (
    <div className="editorial-body reading-col" style={{ marginTop: variant === "split" ? "40px" : "48px" }}>
      <p>{project.valueExplainer}</p>
    </div>
  );

  const cta = (
    <div style={{ marginTop: "32px" }}>
      <Link href={`/work/${project.slug}`} className="editorial-link arrow-link mono">
        Read the full case study <span className="arrow" aria-hidden>→</span>
      </Link>
    </div>
  );

  if (variant === "split" && surface === "canvas") {
    return (
      <section className="section-block-loose home-feature-split-root">
        <div className="section-wrap home-feature-split">
          <div className="home-feature-split__grid">
            <div className="home-feature-split__copy">
              <SectionTag num={sectionNum} label={sectionLabel} />
              <EditorialH2>{children}</EditorialH2>
              <div className="home-feature-split__lead">{project.shortSummary}</div>
              {cta}
            </div>
            <div className="home-feature-split__media home-feature-split__media--bleed">{cover}</div>
          </div>
          {body}
        </div>
      </section>
    );
  }

  /* Stacked (default) — centered column */
  const inner = (
    <>
      <SectionTag num={sectionNum} label={sectionLabel} />
      <EditorialH2>{children}</EditorialH2>
      {lead}
      {cover}
      {body}
      {cta}
    </>
  );

  if (surface === "panel") {
    return (
      <section className="home-feature--panel-band">
        <div className="section-wrap section-block">{inner}</div>
      </section>
    );
  }

  return <section className="section-wrap section-block">{inner}</section>;
}
