import type { Metadata } from "next";
import Link from "next/link";
import PageIntro from "@/components/editorial/PageIntro";
import SectionTag from "@/components/editorial/SectionTag";
import { displayDomain, isRealDomain } from "@/lib/url-display";
import { siteConfig, absoluteUrl } from "@/lib/site-config";

export const metadata: Metadata = {
  title: "Work",
  description:
    "A transparent record of the sites and platforms Campbell Digital Studio has built — with honest labels and real scope on each.",
  alternates: { canonical: "/work" },
};

const workBreadcrumbSchema = {
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
      item: absoluteUrl("/work"),
    },
  ],
};

type WorkRow = {
  slug: string;
  year: string;
  title: string;
  scope: string;
  sectorTags: string[];
  buildLabel: { glyph: "◆" | "◇"; text: string };
  liveUrl: string | null;
  productUrl?: string;
  productLabel?: string;
  hasCaseStudy: boolean;
};

const rows: WorkRow[] = [
  {
    slug: "revitalize",
    year: "2026",
    title: "Revitalize Aesthetics & Wellness",
    scope:
      "A multi-location medical aesthetics, hormone, and weight-management practice in Georgia. Two clinics, a connected nutrition supplement brand, a published book, and a coaching institute — under one digital ecosystem.",
    sectorTags: ["Healthcare", "Multi-Location"],
    buildLabel: { glyph: "◆", text: "Featured Case Study" },
    liveUrl: "http://revitalizemedicalclinic.com/",
    hasCaseStudy: true,
  },
  {
    slug: "air-solutions",
    year: "2026",
    title: "Air Solutions Heating & Cooling",
    scope:
      "A 159-page programmatic SEO architecture for an HVAC contractor in coastal Alabama — 15 cities × 9 services, plus four custom interactive tools.",
    sectorTags: ["HVAC", "Programmatic SEO"],
    buildLabel: { glyph: "◆", text: "Featured Case Study" },
    liveUrl: "https://air-solutions-pros.vercel.app",
    hasCaseStudy: true,
  },
  {
    slug: "interactive-health-education",
    year: "2025",
    title: "Interactive Health Education",
    scope:
      "A digital health education platform — public marketing site plus a live application dashboard that teaches clinical concepts through interactive modules.",
    sectorTags: ["Digital Health", "Platform"],
    buildLabel: { glyph: "◇", text: "Original Product" },
    liveUrl: "https://www.interactivehealtheducation.com/",
    productUrl: "https://dashboard.interactivehealtheducation.com/",
    productLabel: "Live product",
    hasCaseStudy: false,
  },
  {
    slug: "acexperts",
    year: "2025",
    title: "ACExperts251",
    scope:
      "A full-stack Next.js HVAC site with 8 city pages, 7 services, three interactive tools, and Google Sheets-backed lead capture.",
    sectorTags: ["HVAC", "Local SEO"],
    buildLabel: { glyph: "◇", text: "Original Build" },
    liveUrl: "https://acexperts251.com",
    hasCaseStudy: false,
  },
  {
    slug: "collective-counseling",
    year: "2024",
    title: "Collective Counseling",
    scope:
      "A focused therapy practice site with a dedicated adult ADHD testing page, real therapist photography, and Daphne-targeted local SEO.",
    sectorTags: ["Therapy", "ADHD Testing"],
    buildLabel: { glyph: "◇", text: "Original Build" },
    liveUrl: "https://collectivecounselingdaphne.com",
    hasCaseStudy: false,
  },
  {
    slug: "blessed-barbershop",
    year: "2024",
    title: "Blessed Barbershop",
    scope:
      "A mobile-first barbershop site with WebP-optimized media, a service menu with pricing, and a frictionless booking link.",
    sectorTags: ["Local Business", "Mobile-First"],
    buildLabel: { glyph: "◇", text: "Original Build" },
    liveUrl: "https://www.blessedbarbershopdaphne.com",
    hasCaseStudy: false,
  },
];

export default function WorkPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(workBreadcrumbSchema) }}
      />

      <PageIntro
        tagNum="§ Index"
        tagLabel="Selected Work"
        lead="A transparent record of the sites and platforms I've built — with honest labels and real scope on each. Click into a project for the full case study."
      >
        Five projects<br />
        <em>the studio has shipped.</em>
      </PageIntro>

      <section className="work-index">
        <div className="section-wrap work-index__inner">
          {rows.map((r) => {
            const primaryHref = r.hasCaseStudy ? `/work/${r.slug}` : (r.liveUrl ?? "/work");
            const primaryExternal = !r.hasCaseStudy && r.liveUrl !== null;
            const liveReal = isRealDomain(r.liveUrl);
            const productReal = isRealDomain(r.productUrl);

            return (
              <div key={r.slug} className="work-row">
                <div className="work-row-year">{r.year}</div>

                <div>
                  <Link
                    href={primaryHref}
                    {...(primaryExternal ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                    className="work-row-title"
                  >
                    <h3>
                      {r.title}
                      {primaryExternal ? (
                        <span aria-hidden className="link-mark">
                          ↗
                        </span>
                      ) : null}
                    </h3>
                  </Link>
                  <p className="work-row-scope">{r.scope}</p>

                  {r.liveUrl || r.productUrl ? (
                    <div className="work-row-domains">
                      {r.liveUrl ? (
                        <a
                          href={r.liveUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className={`domain-link ${liveReal ? "domain-real" : "domain-staging"}`}
                          aria-label={`Visit ${r.title} — opens in new tab`}
                        >
                          {displayDomain(r.liveUrl)} <span aria-hidden>↗</span>
                        </a>
                      ) : null}
                      {r.productUrl ? (
                        <a
                          href={r.productUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className={`domain-link ${productReal ? "domain-real" : "domain-staging"}`}
                          aria-label={`${r.productLabel ?? "Live product"} — opens in new tab`}
                        >
                          <span className="domain-link-prefix">
                            {r.productLabel ?? "Live product"}:
                          </span>{" "}
                          {displayDomain(r.productUrl)} <span aria-hidden>↗</span>
                        </a>
                      ) : null}
                    </div>
                  ) : null}
                </div>

                <div className="work-row-meta">
                  <div className="work-row-tags">
                    {r.sectorTags.map((tag) => (
                      <span key={tag} className="work-row-tag">
                        {tag}
                      </span>
                    ))}
                  </div>
                  <span className="work-row-label">
                    <span aria-hidden>{r.buildLabel.glyph}</span>
                    {r.buildLabel.text}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      <section className="section-wrap section-block-tight">
        <div className="reading-col">
          <SectionTag num="§ Note" label="Reading the index" />
          <p className="editorial-body" style={{ fontSize: "17px" }}>
            Featured rows link into a full case study with the brief, what was built, and a written
            rationale. Earlier builds link directly to the live site.
          </p>
          <div style={{ marginTop: "32px" }}>
            <Link href="/inquire" className="editorial-link arrow-link mono">
              Start a conversation <span className="arrow" aria-hidden>→</span>
            </Link>
          </div>
        </div>
      </section>

    </>
  );
}
