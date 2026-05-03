import type { Metadata } from "next";
import Link from "next/link";
import SectionTag from "@/components/editorial/SectionTag";
import EditorialH2 from "@/components/editorial/EditorialH2";
import Eyebrow from "@/components/editorial/Eyebrow";
import Cadence from "@/components/editorial/Cadence";
import Pullquote from "@/components/editorial/Pullquote";

export const metadata: Metadata = {
  title: "Method",
  description:
    "Programmatic SEO, automated content engines, and 24-month engagement structure — the methodology Campbell Digital Studio uses to build local-search platforms that no agency in their market is shipping.",
};

const matrixCells = [
  { label: "Cities Targeted", value: "15", detail: "Daphne, Fairhope, Foley, Gulf Shores, and the rest of Baldwin County." },
  { label: "Services Targeted", value: "9", detail: "AC repair, install, heat pump, mini-split, IAQ, and the specialty branches." },
  { label: "Intersection Pages", value: "135", detail: "Every city × every service. Each indexed independently." },
];

const engagementCells = [
  { label: "Build Phase", value: "Architecture", detail: "Sitemap, codebase, copy, schema, content matrix — shipped at launch." },
  { label: "Months 1–24", value: "Operating", detail: "Automated publishing, monthly Search Console, quarterly Local Falcon, bi-annual keyword optimization." },
  { label: "Outcome", value: "Compounding", detail: "By month 18 the moat is structural. Replication cost: $285K and 9–12 months." },
];

export default function MethodPage() {
  return (
    <>
      {/* ─── Hero ─────────────────────────────────────────────────── */}
      <section
        className="section-wrap"
        style={{ paddingTop: "clamp(96px, 14vw, 160px)", paddingBottom: "clamp(48px, 6vw, 80px)" }}
      >
        <Eyebrow>§ Method / How the Studio Builds</Eyebrow>
        <h1
          className="display-serif"
          style={{
            fontSize: "clamp(40px, 7vw, 88px)",
            color: "var(--navy-900)",
            marginBottom: "32px",
            maxWidth: "16ch",
          }}
        >
          Programmatic local search,<br />
          <em style={{ color: "var(--navy-700)" }}>at the scale of one county.</em>
        </h1>

        <div className="editorial-body reading-col" style={{ marginTop: "16px" }}>
          <p>
            The methodology at the core of every studio build is called <strong>programmatic SEO</strong>. It’s a
            technique used almost exclusively at the enterprise level — by companies like <strong>Airbnb</strong>,{" "}
            <strong>Zapier</strong>, <strong>Tripadvisor</strong>, and <strong>Zillow</strong> — and it rarely
            shows up in local-business work because it requires senior development talent, custom data
            architecture, and the patience to write hundreds of locally-specific pages by hand.
          </p>
          <p>
            The studio applies that same methodology to a single business — usually a single county, usually a
            single category. The result is a digital asset that occupies a category most local-business
            websites don’t even compete in.
          </p>
        </div>

        <div style={{ marginTop: "48px" }}>
          <Link href="/inquire" className="editorial-link arrow-link mono">
            Inquire about a project <span className="arrow" aria-hidden>→</span>
          </Link>
        </div>
      </section>

      {/* ─── § 01 / The Pattern ──────────────────────────────────── */}
      <section
        style={{
          background: "var(--surface)",
          borderTop: "1px solid var(--paper-rule)",
          borderBottom: "1px solid var(--paper-rule)",
        }}
      >
        <div className="section-wrap section-block-tight">
          <SectionTag num="01" label="The Pattern" />
          <EditorialH2>
            Companies that ship<br />
            <em>this kind of architecture.</em>
          </EditorialH2>

          <div className="editorial-body reading-col" style={{ marginTop: "32px" }}>
            <p>
              The pattern is structural, not cosmetic. <strong>Airbnb</strong> uses it to rank for “apartments
              in [every city on earth].” <strong>Zapier</strong> uses it for “[App A] integration with [App B]”
              across thousands of combinations. <strong>Tripadvisor</strong> uses it for “[restaurant type] in
              [every neighborhood in every city].” <strong>Zillow</strong> uses it for “[home type] for sale in
              [every ZIP code].” These are billion-dollar companies with engineering teams.
            </p>
            <p>
              The crossover into local-business work doesn’t exist anywhere else in HVAC, in medspas, in
              therapy practices, in trades. The studio is, as far as I can tell, the only operator applying
              this pattern at this scale to single-location and small-multi-location businesses in the
              Southeast.
            </p>
          </div>
        </div>
      </section>

      {/* ─── § 02 / The Matrix ───────────────────────────────────── */}
      <section className="section-wrap section-block-tight">
        <SectionTag num="02" label="The Matrix" />
        <EditorialH2>
          Cities × services.<br />
          <em>One page for every search.</em>
        </EditorialH2>

        <div className="editorial-body reading-col" style={{ marginTop: "32px" }}>
          <p>
            When a homeowner in Baldwin County searches “AC repair Fairhope” or “emergency HVAC Gulf Shores” or
            “heat pump installation Orange Beach,” Google looks for a webpage that <strong>specifically and
            directly</strong> answers that exact query. A generic “Services” page does not. A dedicated,
            locally-written, technically-optimized page for exactly that city and exactly that service does.
          </p>
          <p>
            The recent Air Solutions build contains <strong>135 of those pages</strong> — every combination of
            the 15 Baldwin County cities and 9 HVAC services, each built as a standalone indexed page with
            unique local content, proper metadata, schema markup, and internal links. The Revitalize platform
            does the same for medspa services across two location markets.
          </p>
        </div>

        <div style={{ marginTop: "48px" }}>
          <Cadence cells={matrixCells} />
        </div>

        <div style={{ marginTop: "48px" }}>
          <Pullquote>
            A site with 36 indexed pages cannot compete in a market this size — regardless of how well it is
            maintained. Maintenance keeps a site online. Architecture is what makes it rank.
            <span className="attr">From the Air Solutions proposal · May 2026</span>
          </Pullquote>
        </div>
      </section>

      {/* ─── § 03 / The Architecture ─────────────────────────────── */}
      <section
        style={{
          background: "var(--surface)",
          borderTop: "1px solid var(--paper-rule)",
          borderBottom: "1px solid var(--paper-rule)",
        }}
      >
        <div className="section-wrap section-block-tight">
          <SectionTag num="03" label="The Architecture" />
          <EditorialH2>
            The same stack<br />
            <em>Netflix and Vercel ship.</em>
          </EditorialH2>

          <div className="editorial-body reading-col" style={{ marginTop: "32px" }}>
            <p>
              Every studio platform is built with <strong>Next.js</strong> — a React-based application
              framework used in production by Netflix, Twitch, TikTok, Hulu, and Nike — and deployed on{" "}
              <strong>Vercel</strong>, the infrastructure platform that serves billions of page requests per
              month with a 99.99% uptime guarantee.
            </p>
            <p>
              <strong>There are no plugins.</strong> Every feature — the scheduling engine, the metadata
              system, the internal linking architecture, the interactive tools, the seasonal banners — is
              built directly into the application code. There is nothing to update, nothing to conflict,
              nothing to break from a third-party vendor’s decision.
            </p>
            <p>
              This is the same category of software that funded technology companies ship to millions of
              users. Applied to a local service business, it produces something the market does not currently
              have: a fast, stable, structurally defensible digital asset that does not require a monthly
              retainer just to keep it online.
            </p>
          </div>

          <div style={{ marginTop: "32px" }}>
            <Link href="/notes/why-not-wordpress" className="editorial-link arrow-link mono">
              Read: Why not WordPress <span className="arrow" aria-hidden>→</span>
            </Link>
          </div>
        </div>
      </section>

      {/* ─── § 04 / The Content Engine ───────────────────────────── */}
      <section className="section-wrap section-block-tight">
        <SectionTag num="04" label="The Content Engine" />
        <EditorialH2>
          Automated publishing,<br />
          <em>native to the codebase.</em>
        </EditorialH2>

        <div className="editorial-body reading-col" style={{ marginTop: "32px" }}>
          <p>
            Every studio retainer ships with a <strong>date-gated publishing system</strong> built directly
            into the Next.js application. Posts are written, dated, and queued in the repository. Vercel’s
            cron infrastructure publishes the next scheduled post automatically — no plugin, no CMS
            subscription, no third-party dependency that can be discontinued or changed by a vendor’s decision.
          </p>
          <p>
            Right now the engine is publishing <strong>four posts a week to Air Solutions</strong> and{" "}
            <strong>two posts a week to Revitalize</strong> — every post locally specific, every post written
            by me, every post indexed inside the keyword matrix. The Air Solutions library will reach 441
            published posts by May 2028. The Revitalize library will reach 200+. Both run whether or not
            anyone touches them.
          </p>
          <p>
            Most local-business sites — including the well-funded ones — publish two posts a month, when they
            remember. The compounding gap matters: every post that indexes adds a small authority signal, and
            hundreds of those signals over 24 months is a moat that takes years and hundreds of thousands of
            dollars to close.
          </p>
        </div>
      </section>

      {/* ─── § 05 / The GBP Layer ────────────────────────────────── */}
      <section
        style={{
          background: "var(--surface)",
          borderTop: "1px solid var(--paper-rule)",
          borderBottom: "1px solid var(--paper-rule)",
        }}
      >
        <div className="section-wrap section-block-tight">
          <SectionTag num="05" label="The GBP Layer" />
          <EditorialH2>
            The two-leg stool.<br />
            <em>Website + Google Business Profile.</em>
          </EditorialH2>

          <div className="editorial-body reading-col" style={{ marginTop: "32px" }}>
            <p>
              For a local service business, the Google Business Profile drives the majority of inbound calls —
              60–75% in most categories. The website doesn’t replace that. It <strong>amplifies</strong> it.
              When Google crawls a site and finds a dedicated, locally-specific page for “AC repair Fairhope”
              and “emergency HVAC Gulf Shores” — 135 of those simultaneously — it gets confirmation that the
              business is the real answer for those searches. Every one of those pages is a Relevance signal
              reinforcing the GBP claim.
            </p>
            <p>
              Conservative GBP Prominence lift from a properly built platform:{" "}
              <strong>+18–22%</strong>. Realistic estimate: <strong>+25–30%</strong>. That compounds every
              week the content engine feeds Google new signals.
            </p>
            <p>
              Every studio engagement also includes a <strong>GBP Operating Manual</strong> — a 12-section
              playbook covering review generation, photo cadence, post strategy, Q&amp;A management, and
              category configuration, ranked by impact, with exact instructions for who does what and when.
              Your team manages the GBP using the playbook. The studio doesn’t run GBP on an ongoing basis —
              you don’t need that service. You need the strategy document to stay consistent.
            </p>
          </div>
        </div>
      </section>

      {/* ─── § 06 / The Engagement ───────────────────────────────── */}
      <section className="section-wrap section-block-tight">
        <SectionTag num="06" label="The Engagement" />
        <EditorialH2>
          Build plus<br />
          <em>24 months operating.</em>
        </EditorialH2>

        <div className="editorial-body reading-col" style={{ marginTop: "32px" }}>
          <p>
            Every full studio engagement is shaped the same way: a build phase that ships the platform and the
            content matrix, then a 24-month retainer that runs the system. The retainer is not about doing the
            work — the platform does the work. The retainer is about <strong>oversight, optimization,
            reporting, and keeping the system calibrated</strong> as the market evolves.
          </p>
        </div>

        <div style={{ marginTop: "48px" }}>
          <Cadence cells={engagementCells} />
        </div>

        <div style={{ marginTop: "48px" }}>
          <h3 className="editorial-h3" style={{ marginBottom: "16px" }}>
            What the retainer covers
          </h3>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
              gap: "0",
              borderTop: "1px solid var(--paper-rule)",
            }}
            className="retainer-grid"
          >
            {[
              {
                title: "Automated content publishing",
                body:
                  "Scheduled posts publish without intervention. The studio monitors the pipeline, verifies deploys, and resolves anything that interrupts the schedule.",
              },
              {
                title: "Monthly Search Console review",
                body:
                  "Performance trends, indexing issues, keyword gains and losses. A brief written summary every month with anomalies flagged.",
              },
              {
                title: "Quarterly Local Falcon grid scans",
                body:
                  "Geographic ranking grid scans across every market the business serves — branded reports showing exactly where the business ranks at each point in the service area.",
              },
              {
                title: "Bi-annual keyword optimization",
                body:
                  "Search Console data compared against the project’s keyword map. Underperforming pages get title, description, H1, and copy updates calibrated to current search demand.",
              },
              {
                title: "One monthly site update",
                body:
                  "New service, new team member, seasonal page, new market. One request per month is included with no hourly billing or scope negotiation.",
              },
              {
                title: "Direct line to the studio",
                body:
                  "No tickets, no account managers, no creative-brief loop. Email reaches me. Most replies go out the same day.",
              },
            ].map((item) => (
              <div
                key={item.title}
                style={{
                  padding: "24px 24px 24px 0",
                  borderBottom: "1px solid var(--paper-rule)",
                  borderRight: "1px solid var(--paper-rule)",
                }}
                className="retainer-cell"
              >
                <h4 className="editorial-h3" style={{ fontSize: "18px", marginBottom: "8px" }}>
                  {item.title}
                </h4>
                <p
                  style={{
                    fontFamily: "var(--font-manrope), sans-serif",
                    fontSize: "14px",
                    lineHeight: 1.65,
                    color: "var(--ink-soft)",
                  }}
                >
                  {item.body}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── § 07 / What This Replaces ───────────────────────────── */}
      <section
        style={{
          background: "var(--surface)",
          borderTop: "1px solid var(--paper-rule)",
          borderBottom: "1px solid var(--paper-rule)",
        }}
      >
        <div className="section-wrap section-block-tight">
          <SectionTag num="07" label="What This Replaces" />
          <EditorialH2>
            Senior-independent rate,<br />
            <em>founder-built engagements.</em>
          </EditorialH2>

          <div className="editorial-body reading-col" style={{ marginTop: "32px" }}>
            <p>
              Every recent studio build has been valued by independent component-by-component audit at
              replacement-cost figures most local businesses associate with national agencies. The Air
              Solutions platform: <strong>$314,000 at senior-independent rates / $480K–$615K at national
              agency rates</strong>. The Revitalize platform sits at <strong>$104K–$180K replacement
              cost</strong>. Each is sold at a fraction of those numbers because the studio is small, the
              engagements are direct, and the relationships matter more than the rate card.
            </p>
            <p>
              The point of publishing the valuation isn’t to advertise a discount — it’s to make a normally
              opaque conversation transparent. When a clinic owner is comparing a $1,500/month WordPress
              retainer that produces zero new pages and one blog post a quarter against a $1,500/month studio
              retainer that ships 8–16 indexed posts a month and runs a programmatic-SEO platform, the
              comparison should be obvious. It usually isn’t — because nobody walks the owner through it.
            </p>
          </div>

          <div style={{ marginTop: "48px" }}>
            <Link href="/work" className="editorial-link arrow-link mono">
              See the live engagements <span className="arrow" aria-hidden>→</span>
            </Link>
          </div>
        </div>
      </section>

      {/* ─── Closing ─────────────────────────────────────────────── */}
      <section className="cover-surface">
        <div className="section-wrap section-block">
          <SectionTag num="§ Next" label="Working Together" onDark />
          <EditorialH2 onDark className="reading-col">
            If your category<br />
            <em>has a search graph, it has a matrix.</em>
          </EditorialH2>

          <p
            className="reading-col"
            style={{
              fontFamily: "var(--font-manrope), sans-serif",
              fontSize: "17px",
              lineHeight: 1.65,
              color: "rgba(255,255,255,0.82)",
              marginTop: "24px",
              fontWeight: 300,
            }}
          >
            Most local-business categories — clinics, trades, therapy, wellness, multi-location practices —
            map directly onto a city × service matrix. The first step is always the same: a written audit of
            the existing site, the GBP, the local-search position, and the realistic ceiling for the
            category. Free, no commitment, no pitch attached.
          </p>

          <div style={{ marginTop: "40px", display: "flex", gap: "32px", flexWrap: "wrap", alignItems: "center" }}>
            <Link
              href="/review"
              className="editorial-link arrow-link on-dark"
              style={{
                fontFamily: "var(--font-jetbrains), monospace",
                fontSize: "12px",
                letterSpacing: "0.2em",
                textTransform: "uppercase",
                color: "var(--gold-400)",
              }}
            >
              Request a Website Review <span className="arrow" aria-hidden>→</span>
            </Link>
            <Link
              href="/inquire"
              className="editorial-link on-dark"
              style={{
                fontFamily: "var(--font-jetbrains), monospace",
                fontSize: "12px",
                letterSpacing: "0.2em",
                textTransform: "uppercase",
                color: "rgba(255,255,255,0.7)",
              }}
            >
              Or, inquire directly →
            </Link>
          </div>
        </div>
      </section>

      <style>{`
        @media (max-width: 720px) {
          .retainer-grid { grid-template-columns: 1fr !important; }
          .retainer-cell { border-right: none !important; padding-right: 0 !important; }
        }
      `}</style>
    </>
  );
}
