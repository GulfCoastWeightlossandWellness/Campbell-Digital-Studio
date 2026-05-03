import type { Metadata } from "next";
import Link from "next/link";
import SectionTag from "@/components/editorial/SectionTag";
import Eyebrow from "@/components/editorial/Eyebrow";

export const metadata: Metadata = {
  title: "Why not WordPress",
  description:
    "Forty percent of the internet runs on WordPress. Most of those sites are quietly broken, and the monthly retainer that keeps yours online is paying for the wrong thing.",
};

export default function WhyNotWordPressPage() {
  return (
    <>
      {/* ─── Hero ─────────────────────────────────────────────── */}
      <section
        className="section-wrap"
        style={{ paddingTop: "clamp(96px, 14vw, 160px)", paddingBottom: "clamp(48px, 6vw, 72px)" }}
      >
        <Eyebrow>§ Field Note 01 / Infrastructure</Eyebrow>

        <h1
          className="display-serif"
          style={{
            fontSize: "clamp(40px, 7vw, 88px)",
            color: "var(--navy-900)",
            marginBottom: "32px",
            maxWidth: "16ch",
          }}
        >
          Why not<br />
          <em style={{ color: "var(--navy-700)" }}>WordPress.</em>
        </h1>

        <p
          className="reading-col"
          style={{
            fontFamily: "var(--font-fraunces), Georgia, serif",
            fontSize: "21px",
            fontStyle: "italic",
            fontWeight: 300,
            lineHeight: 1.5,
            color: "var(--navy-700)",
            fontVariationSettings: '"opsz" 24',
          }}
        >
          Forty percent of the internet runs on WordPress. Most of those sites are quietly broken — and the
          monthly retainer that keeps yours online is paying for the wrong thing.
        </p>

        <p
          className="mono-caption"
          style={{ marginTop: "32px", color: "var(--ink-mute)" }}
        >
          Peyton Campbell, DO · May 2026 · ~5 min read
        </p>
      </section>

      {/* ─── § 01 / The 40% problem ──────────────────────────── */}
      <section
        style={{
          background: "var(--surface)",
          borderTop: "1px solid var(--paper-rule)",
          borderBottom: "1px solid var(--paper-rule)",
        }}
      >
        <div className="section-wrap section-block-tight">
          <SectionTag num="01" label="The 40% Problem" />

          <div className="editorial-body reading-col">
            <p>
              WordPress was first released in <strong>2003</strong>. It was designed as a blogging tool, then
              gradually retrofitted into a content management system, then retrofitted again into a website
              builder, then retrofitted a third time into an e-commerce platform via an add-on called
              WooCommerce. Each retrofit added another layer. None of the original layers were ever rebuilt
              from scratch.
            </p>
            <p>
              Today it powers roughly <strong>40% of all websites on the public internet</strong>. That is a
              staggering footprint. It is also a staggering accumulation of legacy decisions — a CMS built in
              2003 PHP, layered with 20 years of plugin patches, running on shared hosting environments that
              were never designed for the kind of traffic or feature load most modern businesses now expect
              from their site.
            </p>
            <p>
              The reason WordPress dominates is not technical. It’s historical: it was free, it was easy to
              install, every cheap hosting company supported it, and an entire ecosystem of plugins and
              themes grew on top of it. It became the default. Most people who run a WordPress site today are
              not running it because they evaluated their options in 2026 and chose WordPress. They’re
              running it because someone built their site on it ten years ago and nobody migrated.
            </p>
          </div>
        </div>
      </section>

      {/* ─── § 02 / The dependency stack ─────────────────────── */}
      <section className="section-wrap section-block-tight">
        <SectionTag num="02" label="The Dependency Stack" />

        <div className="editorial-body reading-col">
          <p>
            A typical local-business WordPress site runs <strong>15 to 30 plugins</strong>. One for SEO. One
            for caching. One for forms. One for security. One for a slider. One for image optimization. One
            for backups. One for spam. One for analytics. One that the previous developer added in 2019 and
            nobody can remember what it does.
          </p>
          <p>
            <strong>Every plugin is a dependency. Every dependency is a point of failure.</strong>
          </p>
          <p>
            When WordPress updates its core, plugins break. When two plugins conflict with each other, the
            site goes down. When the hosting server updates its PHP version, the site goes offline without
            warning. When a plugin developer abandons their project — which happens routinely — the site
            inherits a security vulnerability that won’t be patched. When a plugin developer pushes a bad
            release, every site running that plugin breaks at the same time.
          </p>
          <p>
            The plugin model is a contract: the site owner trusts dozens of independent developers, none of
            whom they know, to coordinate their releases, maintain compatibility, and stay in business
            indefinitely. That contract breaks regularly. The site that goes down at 11pm on a Saturday with
            no obvious cause is not a fluke. It’s the system working as designed.
          </p>
        </div>
      </section>

      {/* ─── § 03 / The maintenance trap ─────────────────────── */}
      <section
        style={{
          background: "var(--surface)",
          borderTop: "1px solid var(--paper-rule)",
          borderBottom: "1px solid var(--paper-rule)",
        }}
      >
        <div className="section-wrap section-block-tight">
          <SectionTag num="03" label="The Maintenance Trap" />

          <div className="editorial-body reading-col">
            <p>
              Most local-business owners on WordPress pay someone <strong>$500 to $2,000 a month</strong> to
              keep the site online. The retainer is sold as “maintenance and updates.” In practice, the work
              is almost entirely defensive: applying core updates, applying plugin updates, fixing what those
              updates broke, restoring backups when a fix didn’t work, and chasing down which plugin caused
              the latest 500 error.
            </p>
            <p>
              <strong>Almost none of that money produces new pages, new content, or new search visibility.</strong>{" "}
              It pays for keeping the structure from collapsing. The owner sees a site that looks the same as
              it did last year, and assumes the retainer is doing its job. In a sense, it is — the site is
              still online. But online is the floor, not the goal.
            </p>
            <p>
              When I’ve audited WordPress retainer relationships for clinics and local businesses considering
              a rebuild, the pattern is almost identical: 6 to 12 months of $1,500 monthly invoices, 0 to 3
              new blog posts shipped, no new service pages, no new city pages, no schema added, no search
              ranking improvements. The retainer paid for keeping the site online and nothing else. That is
              not a bad deal because the developer is dishonest. It’s a bad deal because the platform
              requires that much defensive work just to stay upright.
            </p>
          </div>
        </div>
      </section>

      {/* ─── § 04 / The new wave ─────────────────────────────── */}
      <section className="section-wrap section-block-tight">
        <SectionTag num="04" label="The New Wave" />

        <div className="editorial-body reading-col">
          <p>
            Every studio platform is built on <strong>Next.js</strong> — the React-based application
            framework that powers Netflix, Twitch, TikTok, Hulu, and Nike — deployed on{" "}
            <strong>Vercel</strong>, the infrastructure platform with a 99.99% uptime guarantee that serves
            billions of page requests per month for those same companies.
          </p>
          <p>
            <strong>There are no plugins.</strong> Every feature — the scheduling engine, the metadata
            system, the internal-linking architecture, the interactive tools, the seasonal banners — is
            built directly into the application code. Nothing to update. Nothing to conflict. Nothing to
            break from a third-party vendor’s decision.
          </p>
          <p>
            When the studio updates a phone number, it updates in one place — and propagates to all 249
            pages, all schema blocks, all OG cards, all footers, simultaneously, by virtue of the
            architecture. There is no “WordPress update broke the contact form” because there is no
            WordPress and there is no contact-form plugin. The form is a typed function in the codebase.
          </p>
          <p>
            Pages load in <strong>under a second on any device</strong>. Google measures page speed as a
            ranking factor. In practice, most local WordPress sites on shared hosting cannot come close.
            Security vulnerabilities that routinely affect WordPress — SQL injection, brute force attacks,
            plugin exploits — do not apply to this architecture, because there is no SQL database in the
            critical path and no plugin layer to exploit.
          </p>
          <p>
            The studio retainer is not paying for keeping the site online. The site stays online without
            intervention. The retainer is paying for <strong>oversight, content publishing, search-position
            monitoring, quarterly Local Falcon grid scans, and bi-annual keyword optimization</strong> —
            work that produces measurable search-visibility growth, every month, on a platform that does not
            require defensive maintenance to keep running.
          </p>
        </div>
      </section>

      {/* ─── § 05 / When WordPress is fine ───────────────────── */}
      <section
        style={{
          background: "var(--surface)",
          borderTop: "1px solid var(--paper-rule)",
          borderBottom: "1px solid var(--paper-rule)",
        }}
      >
        <div className="section-wrap section-block-tight">
          <SectionTag num="05" label="When WordPress Is Fine" />

          <div className="editorial-body reading-col">
            <p>
              I want to be honest about this. WordPress is fine for some categories of project.
            </p>
            <p>
              It’s fine for a hobby blog where uptime doesn’t matter and downtime is a minor inconvenience.
              It’s fine for a personal portfolio that gets a few hundred visits a month. It’s fine when
              cost is the only consideration and the site genuinely doesn’t need to compete in search. It’s
              fine when the owner is technical enough to run their own updates, audit their own plugins,
              and rebuild their site themselves when something breaks at 11pm on a Saturday.
            </p>
            <p>
              It is <strong>not fine</strong> for a clinic where a non-functional booking link costs
              patients. It is not fine for an HVAC contractor whose phone rings only when Google decides
              the site is the best answer to “AC repair near me.” It is not fine for a medspa whose service
              pages need to rank in a competitive category. It is not fine for any business where the site
              is the storefront — and at that point, WordPress is no longer a budget choice. It’s a
              structural one. A bad one, in most cases I’ve looked at.
            </p>
          </div>
        </div>
      </section>

      {/* ─── § 06 / The honest comparison ────────────────────── */}
      <section className="section-wrap section-block-tight">
        <SectionTag num="06" label="The Honest Comparison" />

        <div className="editorial-body reading-col">
          <p>
            If your site is on WordPress and you’re paying a $1,500 monthly retainer, here is the question
            worth asking your developer: <strong>over the last 12 months, how many new indexed pages have
            you shipped, and how many of them are ranking?</strong>
          </p>
          <p>
            If the answer is “zero, two, or I don’t know,” the retainer is paying for site preservation and
            nothing else. The studio retainer at the same monthly rate publishes 8 to 16 new locally-specific
            indexed posts a month, runs quarterly geographic ranking grid scans across the entire service
            area, and recalibrates the platform’s keyword targets every six months against live Search
            Console data.
          </p>
          <p>
            The comparison is not a price comparison. The retainer cost is roughly the same. The comparison
            is what the retainer is producing. On WordPress: defensive maintenance. On a programmatic
            platform: compounding search visibility on a system that runs whether anyone touches it or not.
          </p>
        </div>

        <div style={{ marginTop: "48px" }}>
          <Link href="/method" className="editorial-link arrow-link mono">
            See the studio method <span className="arrow" aria-hidden>→</span>
          </Link>
        </div>
      </section>

      {/* ─── Closing CTA ─────────────────────────────────────── */}
      <section className="section-wrap section-block-tight">
        <div style={{ borderTop: "1px solid var(--paper-rule)", paddingTop: "48px" }}>
          <Link
            href="/review"
            className="editorial-link arrow-link"
            style={{
              fontFamily: "var(--font-fraunces), Georgia, serif",
              fontSize: "clamp(28px, 4vw, 40px)",
              fontWeight: 400,
              color: "var(--navy-900)",
              letterSpacing: "-0.02em",
              fontVariationSettings: '"opsz" 144',
              fontStyle: "italic",
            }}
          >
            Send your current site for a free review{" "}
            <span className="arrow" aria-hidden style={{ fontStyle: "normal" }}>→</span>
          </Link>
        </div>
      </section>
    </>
  );
}
