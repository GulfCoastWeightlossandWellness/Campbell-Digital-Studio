import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { projects, getProjectBySlug } from "@/lib/projects";
import PageIntro from "@/components/editorial/PageIntro";
import SectionTag from "@/components/editorial/SectionTag";
import EditorialH2 from "@/components/editorial/EditorialH2";
import Pullquote from "@/components/editorial/Pullquote";
import MetaGrid from "@/components/case-study/MetaGrid";
import CaseStudyNav from "@/components/case-study/CaseStudyNav";
import CaseStudyResults from "@/components/sections/CaseStudyResults";
import TestimonialBlock from "@/components/sections/TestimonialBlock";
import { getTestimonialForSlug } from "@/lib/data/testimonials";
import { siteConfig } from "@/lib/site-config";
import { displayDomain, isRealDomain } from "@/lib/url-display";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return projects.filter((p) => p.featured).map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const project = getProjectBySlug(slug);
  if (!project) return {};
  return {
    title: project.title,
    description: project.shortSummary,
    alternates: { canonical: `/work/${slug}` },
    openGraph: {
      title: `${project.title} | Campbell Digital Studio`,
      description: project.shortSummary,
      url: `/work/${slug}`,
      images: project.coverImage ? [{ url: project.coverImage }] : undefined,
    },
  };
}

function getCaseStudyBreadcrumbSchema(title: string, slug: string) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: siteConfig.name,
        item: siteConfig.url,
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Work",
        item: `${siteConfig.url.replace(/\/$/, "")}/work`,
      },
      {
        "@type": "ListItem",
        position: 3,
        name: title,
        item: `${siteConfig.url.replace(/\/$/, "")}/work/${slug}`,
      },
    ],
  };
}

const projectYears: Record<string, string> = {
  "air-solutions": "2026",
  revitalize: "2026",
};

const projectStatus: Record<string, string> = {
  "air-solutions": "Live",
  revitalize: "Live",
};

const projectHosting: Record<string, string> = {
  "air-solutions": "Vercel · Vercel Cron · Cloudflare Turnstile · Resend",
  revitalize: "Vercel",
};

export default async function CaseStudyPage({ params }: Props) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);
  if (!project) notFound();

  const year = projectYears[slug] ?? "—";

  const featured = projects.filter((p) => p.featured);
  const idx = featured.findIndex((p) => p.slug === project.slug);
  const prev = idx > 0 ? featured[idx - 1] : null;
  const next = idx < featured.length - 1 ? featured[idx + 1] : null;

  const featuredScreens = project.screenshotLabels.slice(0, 6).map((label, i) => ({
    label,
    image: project.screenshotImages?.[i],
  }));

  const testimonial = getTestimonialForSlug(slug);

  const heroMeta = [
    { label: "Sector", value: project.category.split(/[/·]/)[0].trim() },
    { label: "Year", value: year },
    { label: "Stack", value: project.stack.split(",")[0].trim() },
    { label: "Status", value: projectStatus[slug] ?? "Production" },
  ];

  const stackMeta = [
    { label: "Stack", value: project.stack },
    { label: "Hosting", value: projectHosting[slug] ?? "Vercel" },
    { label: "Launched", value: year },
    { label: "Status", value: projectStatus[slug] ?? "Production" },
  ];

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(getCaseStudyBreadcrumbSchema(project.title, project.slug)),
        }}
      />

      <PageIntro
        eyebrow={`Case study / ${project.category}`}
        titleScale="display-80"
        className="page-intro--case-study"
      >
        {project.title}.
      </PageIntro>

      <section className="section-wrap" style={{ paddingTop: 0, paddingBottom: "clamp(48px, 6vw, 72px)" }}>
        <p className="case-study-lead reading-col">{project.shortSummary}</p>
        <MetaGrid items={heroMeta} />
      </section>

      {project.coverImage ? (
        <section className="section-wrap" style={{ paddingBottom: "clamp(48px, 6vw, 80px)" }}>
          <div className="case-study-cover">
            <Image
              src={project.coverImage}
              alt={`${project.title} — cover screen`}
              fill
              priority
              sizes="(max-width: 1280px) 100vw, 1280px"
              style={{ objectFit: "cover" }}
            />
          </div>
          <p className="mono-caption case-study-cover__caption">
            fig. 01 — {project.screenshotLabels[0]}
          </p>
        </section>
      ) : null}

      <section className="section-wrap section-block-tight">
        <SectionTag num="01" label="The Brief" />
        <EditorialH2>
          What the project<br />
          <em>needed to do.</em>
        </EditorialH2>
        <div className="editorial-body reading-col" style={{ marginTop: "32px" }}>
          <p>{project.summary}</p>
          <p>{project.challenge}</p>
        </div>
        {project.valuePoints[0] ? (
          <div style={{ marginTop: "40px", maxWidth: "820px" }}>
            <Pullquote>
              {project.valuePoints[0]}
              <span className="attr">What moved the needle</span>
            </Pullquote>
          </div>
        ) : null}
      </section>

      <CaseStudyResults slug={slug} sectionNum="02" />

      {testimonial ? (
        <section className="section-wrap section-block-tight">
          <SectionTag num="03" label="Client voice" />
          <div style={{ marginTop: "32px" }}>
            <TestimonialBlock testimonial={testimonial} />
          </div>
        </section>
      ) : null}

      {featuredScreens.length > 0 ? (
        <section className="section-wrap section-block-tight">
          <SectionTag num="04" label="Selected Screens" />
          <EditorialH2>
            What it looks like,<br />
            <em>on screen.</em>
          </EditorialH2>
          <div className="case-study-screens">
            {featuredScreens.map((s, i) => {
              const inset = i % 2 === 1;
              const sizes = inset
                ? "(max-width: 768px) 100vw, min(920px, 92vw)"
                : "(max-width: 1280px) 100vw, 1280px";
              return (
                <figure
                  key={s.label}
                  style={{ margin: 0 }}
                  className={inset ? "case-study-screen--inset" : undefined}
                >
                  <div className="case-study-screen-frame">
                    {s.image ? (
                      <Image
                        src={s.image}
                        alt={s.label}
                        fill
                        sizes={sizes}
                        style={{ objectFit: "cover" }}
                      />
                    ) : null}
                  </div>
                  <figcaption className="mono-caption" style={{ marginTop: "12px" }}>
                    fig. {String(i + 2).padStart(2, "0")} — {s.label}
                  </figcaption>
                </figure>
              );
            })}
          </div>
        </section>
      ) : null}

      <section className="section-wrap section-block-tight">
        <SectionTag num="05" label="What Was Built" />
        <EditorialH2>
          The deliverables,<br />
          <em>line by line.</em>
        </EditorialH2>
        <div className="editorial-body reading-col" style={{ marginTop: "32px" }}>
          <p>{project.whatIBuilt}</p>
        </div>
        <div style={{ marginTop: "48px" }}>
          <div className="list-section-label">Deliverables</div>
          <ul className="editorial-list editorial-list-grid">
            {project.features.map((feature) => (
              <li key={feature}>{feature}</li>
            ))}
          </ul>
        </div>
      </section>

      <section className="panel-band">
        <div className="section-wrap section-block-tight">
          <SectionTag num="06" label="Why It Works" />
          <EditorialH2>
            How the build<br />
            <em>earns the call.</em>
          </EditorialH2>
          <div className="editorial-body reading-col" style={{ marginTop: "32px" }}>
            <p>{project.seoConversion}</p>
            <p>{project.businessValue}</p>
          </div>
          <div style={{ marginTop: "56px", maxWidth: "820px" }}>
            <Pullquote>
              {project.valueExplainer}
              <span className="attr">Studio rationale</span>
            </Pullquote>
          </div>
        </div>
      </section>

      <section className="section-wrap section-block-tight">
        <SectionTag num="07" label="Stack &amp; Artifacts" />
        <MetaGrid items={stackMeta} className="meta-grid--stack" />
        {project.liveUrl ? (
          <div style={{ marginTop: "32px" }}>
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className={`editorial-link arrow-link ${isRealDomain(project.liveUrl) ? "copper" : "mono"}`}
            >
              Visit live: {displayDomain(project.liveUrl)}{" "}
              <span className="arrow" aria-hidden>↗</span>
            </a>
          </div>
        ) : null}
      </section>

      <section className="section-wrap section-block-tight">
        <SectionTag num="08" label="Outcome" />
        <EditorialH2 className="reading-col">
          Metrics, captured<br />
          <em>at 30 / 60 / 90 days.</em>
        </EditorialH2>
        <div className="editorial-body reading-col" style={{ marginTop: "32px" }}>
          <p>
            Outcome reporting for this engagement is captured at 30, 60, and 90 days post-launch
            via Google Search Console and GA4. Reported metrics will appear here once the
            measurement window closes.
          </p>
        </div>
      </section>

      <section className="section-wrap section-block-tight">
        <div className="case-study-cta-row">
          <Link href="/inquire" className="btn-fill">
            Inquire about a similar project
          </Link>
          {siteConfig.calUsername ? (
            <Link href="/call" className="btn-ghost">
              Or book a 20-minute call
            </Link>
          ) : null}
        </div>
      </section>

      <CaseStudyNav prev={prev} next={next} />
    </>
  );
}
