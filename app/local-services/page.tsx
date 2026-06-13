import type { Metadata } from "next";
import Link from "next/link";
import PageIntro from "@/components/editorial/PageIntro";
import SectionTag from "@/components/editorial/SectionTag";
import EditorialH2 from "@/components/editorial/EditorialH2";
import MatrixFieldMount from "@/components/three/MatrixFieldMount";

export const metadata: Metadata = {
  title: "Local Services — Programmatic SEO and GBP operations for trades",
  description:
    "City × service programmatic SEO matrices, GBP operations, NWS-aware seasonal pages, and Telegram-bot field intake — built for HVAC, plumbing, electrical, and multi-location trade brands.",
  alternates: { canonical: "/local-services" },
};

const buildList = [
  {
    head: "Programmatic SEO matrices",
    body:
      "Every city the trucks operate in × every service offered = a dedicated indexed page. Deterministic templating with per-cell phrase variance — no boilerplate, no LLM slop, no duplicate-content penalty.",
  },
  {
    head: "Google Business Profile automation",
    body:
      "Review-velocity workflow with QR cards on every completed job, photo cadence from real job sites, posts cadence, Q&A architecture, and — once GBP API access lands — programmatic upload and review-response drafting.",
  },
  {
    head: "NWS-aware seasonal pages",
    body:
      "Live National Weather Service alert integration. Four-tier banner logic: manual override → NWS alert → scheduled banner → nothing. Hurricane prep, freeze warnings, and seasonal campaigns run on autopilot.",
  },
  {
    head: "Telegram bot field intake",
    body:
      "Field technicians text photos and notes to a Telegram bot from the job site. The bot routes images to the GBP photo queue and structured notes to the content engine. Zero training, zero compliance friction.",
  },
];

const caseStudies = [
  {
    slug: "air-solutions",
    teaser: "Migrated Air Solutions HVAC to a 345-page programmatic platform",
    detail:
      "A city × service matrix across Baldwin County now live at airsolutionspros.com — 345 pages, a native blog engine on a weekday drip, a 3D AC Explorer, a typed diagnostic quiz, a Repair-vs-Replace ROI calculator, and a 4-tier NWS-aware banner system.",
  },
  {
    slug: "pro-1-painters",
    teaser: "Rebuilt Pro 1 Painters off WordPress into a 424-page Next.js platform",
    detail:
      "A two-location painting brand across Mobile and Baldwin County — interior, exterior, cabinet, and floor painting — plus an on-device AI Color Visualizer that repaints a room or exterior straight from a photo in the browser. Both Google Business Profiles managed.",
  },
  {
    slug: "acexperts",
    teaser: "Wired ACExperts251 lead forms to email the owner directly via Resend",
    detail:
      "8-city × 7-service HVAC build with three interactive tools, Cloudflare Turnstile spam screening, and Resend-powered lead forms that email the owner directly — no CRM, no clunky dashboard.",
  },
  {
    slug: "blessed-barbershop",
    teaser: "Cut Blessed Barbershop's mobile page weight to ship-fast",
    detail:
      "Mobile-first barbershop site with WebP-optimized media, service menu with pricing, frictionless booking link, and Google Business Profile alignment for Daphne local search.",
  },
];

export default function LocalServicesPage() {
  return (
    <>
      <PageIntro
        tagNum="§ Vertical"
        tagLabel="Local Services"
        lead="Programmatic SEO matrices, GBP operations, and field-ops automation for HVAC, plumbing, electrical, painting, and multi-location trade brands. The same architectural pattern Airbnb uses for apartments per city — applied to a single coastal-Alabama county."
      >
        Digital infrastructure for{" "}
        <em>local service businesses.</em>
      </PageIntro>

      {/* ── 3D Matrix Field — city × service architecture visualisation ── */}
      {/*    aria-hidden: decorative scene, meaning lives in surrounding text */}
      <section
        aria-hidden="true"
        style={{
          background: "var(--color-ink-1, #14182A)",
          borderTop: "1px solid rgba(196,154,53,0.15)",
          borderBottom: "1px solid rgba(196,154,53,0.15)",
          padding: "0",
          height: "clamp(280px, 36vw, 480px)",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* Label: sits in corner, communicates what the scene is */}
        <div
          style={{
            position: "absolute",
            bottom: "20px",
            left: "24px",
            zIndex: 2,
            color: "rgba(196,154,53,0.55)",
            fontFamily: "var(--font-mono, monospace)",
            fontSize: "11px",
            letterSpacing: "0.08em",
            textTransform: "uppercase",
            pointerEvents: "none",
          }}
        >
          City × service across Baldwin County — 345 indexed pages
        </div>
        {/* Dim edge vignette so scene fades into surrounding sections */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            zIndex: 1,
            background:
              "linear-gradient(to right, #14182A 0%, transparent 12%, transparent 88%, #14182A 100%)",
            pointerEvents: "none",
          }}
        />
        <MatrixFieldMount />
      </section>

      {/* ── What we build for local services ──────────────────────────── */}
      <section className="section-wrap section-block">
        <SectionTag num="01" label="What we build for local services" />
        <EditorialH2>
          The pieces<br />
          <em>a local service business actually needs.</em>
        </EditorialH2>

        <div className="capabilities-grid" style={{ marginTop: "48px" }}>
          {buildList.map((item) => (
            <div key={item.head}>
              <h3 className="editorial-h3">{item.head}</h3>
              <p className="editorial-body">{item.body}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── Case studies ───────────────────────────────────────────────── */}
      <section
        style={{
          background: "var(--panel)",
          borderTop: "1px solid var(--border-subtle)",
          borderBottom: "1px solid var(--border-subtle)",
        }}
      >
        <div className="section-wrap section-block">
          <SectionTag num="02" label="Shipped for local services" />
          <EditorialH2>
            Four local-service builds,<br />
            <em>shipped and running.</em>
          </EditorialH2>

          <div style={{ marginTop: "48px" }}>
            {caseStudies.map((c) => (
              <div key={c.slug} className="tier-row">
                <span className="tier-num">→</span>
                <div>
                  <Link
                    href={`/work/${c.slug}`}
                    className="tier-name"
                    style={{ textDecoration: "none" }}
                  >
                    {c.teaser}
                  </Link>
                  <div className="tier-body">
                    <p>{c.detail}</p>
                  </div>
                </div>
                <span aria-hidden />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Closing CTA ────────────────────────────────────────────────── */}
      <section className="cover-surface">
        <div className="section-wrap section-block">
          <SectionTag num="03" label="Start a local-services engagement" onDark />
          <EditorialH2 onDark className="reading-col">
            Send the business name,<br />
            <em>and the markets you serve.</em>
          </EditorialH2>

          <p className="reading-col page-intro__lead">
            Send the business name, a link to the current site, the cities your trucks operate in,
            the services you offer, an approximate budget, and a timeline. I read every inquiry
            personally and reply within a week.
          </p>

          <div
            style={{
              marginTop: "40px",
              display: "flex",
              gap: "20px",
              flexWrap: "wrap",
              alignItems: "center",
            }}
          >
            <Link href="/inquire" className="btn-fill">
              Inquire about a local-services project
            </Link>
            <Link href="/work" className="btn-ghost">
              See all work
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
