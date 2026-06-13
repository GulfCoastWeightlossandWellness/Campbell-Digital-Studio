import type { Metadata } from "next";
import type { CSSProperties } from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getProjectBySlug, projects } from "@/lib/projects";
import { siteConfig } from "@/lib/site-config";

import SectionTag from "@/components/editorial/SectionTag";
import EditorialH2 from "@/components/editorial/EditorialH2";
import Pullquote from "@/components/editorial/Pullquote";
import ScreenshotSpread from "@/components/case-study-essay/ScreenshotSpread";
import ScrollProgressRule from "@/components/case-study-essay/ScrollProgressRule";
import CaseStudyNav from "@/components/case-study/CaseStudyNav";
import {
  ImpressionRamp,
  ConversionFunnel,
  LocalPackScorecard,
  IndexingStat,
} from "@/components/case-study-essay/ResultCharts";

export const metadata: Metadata = {
  title: "ACExperts — Case Study",
  description:
    "A brand-new Baldwin County HVAC business went from a domain that didn't exist to 215 pages indexed, 44,759 Google impressions, #1 in the local map pack across four cities, and an $8,500 job from a single website lead — in seven weeks.",
  alternates: { canonical: "/work/acexperts" },
  openGraph: {
    title: "ACExperts | Campbell Digital Studio",
    description:
      "How a brand-new HVAC company outranked 40-year incumbents in 7 weeks — 215 pages indexed, 44,759 impressions, #1 map-pack in 4 cities, and an $8,500 lead.",
    url: "/work/acexperts",
    images: [{ url: "/images/case-studies/covers/acexperts-1-hero.png" }],
  },
};

function getBreadcrumbSchema() {
  const base = siteConfig.url.replace(/\/$/, "");
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: siteConfig.name, item: siteConfig.url },
      { "@type": "ListItem", position: 2, name: "Work", item: `${base}/work` },
      { "@type": "ListItem", position: 3, name: "ACExperts", item: `${base}/work/acexperts` },
    ],
  };
}

const SANS = "var(--font-geist-sans), system-ui, sans-serif";
const MONO = "var(--font-geist-mono), ui-monospace, monospace";

const HERO_TILES = [
  { value: "#1", label: "in Google's map pack — 4 cities (top-3 in all 6)" },
  { value: "$8,500", label: "job booked from one website lead" },
  { value: "44,759", label: "Google impressions in 7 weeks" },
  { value: "7 weeks", label: "from a brand-new domain to all of the above" },
];

const monoCap: CSSProperties = {
  fontFamily: MONO,
  fontSize: 11,
  letterSpacing: "0.16em",
  textTransform: "uppercase",
  color: "var(--ink-3)",
};

export default function ACExpertsCaseStudy() {
  const project = getProjectBySlug("acexperts");
  if (!project) notFound();

  const idx = projects.findIndex((p) => p.slug === "acexperts");
  const prev = projects[(idx - 1 + projects.length) % projects.length];
  const next = projects[(idx + 1) % projects.length];

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(getBreadcrumbSchema()) }}
      />
      <ScrollProgressRule />

      {/* ── HERO — results above the fold ───────────────────────────── */}
      <section className="section-wrap" style={{ paddingTop: "clamp(40px, 7vw, 88px)", paddingBottom: "clamp(40px, 5vw, 64px)" }}>
        <div style={{ ...monoCap, color: "var(--copper)" }}>
          Case study · HVAC · Local SEO · Built by Peyton Campbell, DO
        </div>

        <h1
          style={{
            fontFamily: SANS,
            fontSize: "clamp(34px, 5.4vw, 68px)",
            lineHeight: 1.04,
            letterSpacing: "-0.03em",
            fontWeight: 600,
            color: "var(--ink-1)",
            margin: "20px 0 0",
            maxWidth: "20ch",
          }}
        >
          How a brand-new HVAC company <em style={{ fontStyle: "italic", color: "var(--copper)" }}>outranked 40-year incumbents</em> in 7 weeks.
        </h1>

        <p
          className="reading-col"
          style={{ fontFamily: SANS, fontSize: "clamp(17px, 1.5vw, 21px)", lineHeight: 1.5, color: "var(--ink-2)", marginTop: 24, maxWidth: "56ch" }}
        >
          From a domain that didn&apos;t exist on April 22 to #1 in Google&apos;s map pack across four Baldwin
          County cities — and an $8,500 job from a single website lead. No reviews, no history, no head
          start. Built from zero.
        </p>

        {/* hero metric bar */}
        <div
          style={{
            marginTop: "clamp(32px, 4vw, 48px)",
            display: "grid",
            gridTemplateColumns: "repeat(2, 1fr)",
            gap: 1,
            background: "var(--border-subtle)",
            border: "1px solid var(--border-subtle)",
            borderRadius: 10,
            overflow: "hidden",
          }}
        >
          {HERO_TILES.map((t) => (
            <div key={t.value} style={{ background: "var(--surface)", padding: "24px 22px" }}>
              <div style={{ fontFamily: SANS, fontSize: "clamp(30px, 3.6vw, 44px)", fontWeight: 700, letterSpacing: "-0.03em", color: "var(--ink-1)", lineHeight: 1 }}>
                {t.value}
              </div>
              <div style={{ fontFamily: SANS, fontSize: 13, lineHeight: 1.4, color: "var(--ink-2)", marginTop: 10 }}>{t.label}</div>
            </div>
          ))}
        </div>

        <p style={{ ...monoCap, marginTop: 16, textTransform: "none", letterSpacing: "0.02em", fontSize: 12 }}>
          Launched 4/22/2026 · 215/274 pages indexed · 44,759 impressions · 304 GBP views · 78 customer
          actions · $8,500 booked job. Every figure pulled from the client&apos;s own Google Search Console
          and Business Profile (Apr 22 – Jun 11).
        </p>
      </section>

      {/* ── §01 The short version ───────────────────────────────────── */}
      <section className="section-wrap section-block-tight" style={{ borderTop: "1px solid var(--border-subtle)" }}>
        <SectionTag num="01" label="The short version" />
        <div className="editorial-body reading-col" style={{ marginTop: 28 }}>
          <p>
            ACExperts is a brand-new HVAC company in Baldwin County, Alabama — a business that didn&apos;t exist
            online before April 22, 2026. No website, no domain history, no reviews, no rankings. I built a
            274-page Next.js platform — a programmatic city × service matrix across 17 cities, a native blog
            engine, and interactive tools — and ran the Google Business Profile as part of the same system.
            Seven weeks later it had 215 pages indexed, 44,759 Google impressions, #1 map-pack rankings in
            four cities, and a website form lead that became an $8,500 install — helping a two-month-old
            business reach roughly $30,000 in revenue.
          </p>
        </div>
      </section>

      {/* ── §02 The challenge ───────────────────────────────────────── */}
      <section className="section-wrap section-block-tight">
        <SectionTag num="02" label="The challenge" />
        <EditorialH2>
          Starting from absolute zero,<br />
          <em>against shops older than the internet.</em>
        </EditorialH2>
        <div className="editorial-body reading-col" style={{ marginTop: 28 }}>
          <p>
            A new HVAC company has the hardest possible start in local search. The top of Google in Baldwin
            County is owned by businesses with 25 to 40 years of reviews, trucks on the road, and decades of
            trust. A brand-new domain has none of that — and Google barely crawls it for the first few weeks.
          </p>
          <p>
            The bar is brutal: across a study of two million keywords, only about <strong>5.7% of pages ever
            reach Google&apos;s top 10 within a year</strong>, and most that do take six months or more. The job
            was to make a company that didn&apos;t exist findable and credible fast enough to win calls before it
            had a single review — and to turn that visibility into booked work, not vanity traffic.
          </p>
        </div>
        <div style={{ marginTop: 36, maxWidth: 820 }}>
          <Pullquote>
            Brand-new business. Brand-new domain. Beating shops older than the internet.
            <span className="attr">The starting line</span>
          </Pullquote>
        </div>
      </section>

      {/* ── §03 The approach ────────────────────────────────────────── */}
      <section className="section-wrap section-block-tight">
        <SectionTag num="03" label="What I built" />
        <EditorialH2>
          One operator. One system.<br />
          <em>The website and the Google profile, working together.</em>
        </EditorialH2>
        <div className="editorial-body reading-col" style={{ marginTop: 28 }}>
          <p>
            Most marketers build you a website <em>or</em> manage your Google profile. The wins come when
            they&apos;re one machine — the site feeds the map pack, the map pack feeds the site — and almost
            nobody runs them that way. I do, because I build and operate both.
          </p>
        </div>
        <div style={{ marginTop: 40 }}>
          <div className="list-section-label">The build</div>
          <ul className="editorial-list editorial-list-grid">
            <li>A 274-page programmatic city × service matrix across 17 Baldwin County cities — every market the trucks serve gets its own findable page</li>
            <li>Dedicated service hubs — AC repair, installation, maintenance, heating, heat pumps, mini-splits, commercial, emergency</li>
            <li>A native blog engine compounding topical authority, with no CMS subscription</li>
            <li>Interactive tools no county competitor offers — a 3D AC explorer, a symptom-to-repair quiz, an HVAC ROI calculator</li>
            <li>Resend-powered lead forms that email the owner the moment a customer reaches out</li>
            <li>Google Business Profile operations run as part of the same system — the local-pack engine</li>
          </ul>
        </div>
      </section>

      {/* ── §03b Selected screens ───────────────────────────────────── */}
      <ScreenshotSpread screenshots={project.screenshots} />

      {/* ── §04 The results ─────────────────────────────────────────── */}
      <section className="panel-band">
        <div className="section-wrap section-block-tight">
          <SectionTag num="04" label="The results" />
          <EditorialH2>
            From 37 to 15,484 weekly impressions —<br />
            <em>in seven weeks.</em>
          </EditorialH2>

          {/* hero ramp chart */}
          <div style={{ marginTop: 40, background: "var(--surface)", border: "1px solid var(--border-subtle)", borderRadius: 12, padding: "clamp(20px, 3vw, 36px)" }}>
            <ImpressionRamp />
          </div>

          {/* indexing + local pack, two-up */}
          <div style={{ marginTop: 28, display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: 24 }}>
            <div style={{ background: "var(--surface)", border: "1px solid var(--border-subtle)", borderRadius: 12, padding: "clamp(20px, 3vw, 32px)" }}>
              <div style={{ ...monoCap, marginBottom: 18 }}>Indexing</div>
              <IndexingStat />
            </div>
            <div style={{ background: "var(--surface)", border: "1px solid var(--border-subtle)", borderRadius: 12, padding: "clamp(20px, 3vw, 32px)" }}>
              <div style={{ ...monoCap, marginBottom: 18 }}>Local map-pack rank — &quot;AC repair [city]&quot;</div>
              <LocalPackScorecard />
              <p style={{ ...monoCap, marginTop: 14, textTransform: "none", letterSpacing: "0.02em", fontSize: 12 }}>
                #1 in four cities, top-3 in all six — against incumbents with 25–40 years and hundreds of
                reviews. The map pack captures ~42–44% of local-search clicks.
              </p>
            </div>
          </div>

          {/* funnel */}
          <div style={{ marginTop: 28, background: "var(--surface)", border: "1px solid var(--border-subtle)", borderRadius: 12, padding: "clamp(24px, 3.5vw, 44px)" }}>
            <div style={{ ...monoCap, marginBottom: 22 }}>From reach to revenue</div>
            <ConversionFunnel />
          </div>
        </div>
      </section>

      {/* ── §05 The money (peak-end) ────────────────────────────────── */}
      <section className="section-wrap section-block-tight">
        <SectionTag num="05" label="What it was worth" />
        <EditorialH2>
          Impressions aren&apos;t the win.<br />
          <em>The booked jobs are.</em>
        </EditorialH2>
        <div className="editorial-body reading-col" style={{ marginTop: 28 }}>
          <p>
            In week seven, a single form on a two-month-old website turned into an <strong>$8,500 system
            install</strong> — part of roughly <strong>$30,000 in revenue</strong> for a business that was
            invisible online in April. And that first job is the floor, not the ceiling: the average HVAC
            customer is worth around <strong>$15,000</strong> in lifetime value.
          </p>
          <p>
            The same visibility bought through Google Ads would run $100–$150 per lead and stop the day the
            budget does. This is organic — it compounds. Every page that indexes and every profile action is
            an asset the business keeps.
          </p>
        </div>
        <div style={{ marginTop: 36, maxWidth: 820 }}>
          <Pullquote>
            One form on a 7-week-old website became an $8,500 install — on a business that didn&apos;t exist in March.
            <span className="attr">The receipt</span>
          </Pullquote>
        </div>
      </section>

      {/* ── §06 Why it's real ───────────────────────────────────────── */}
      <section className="section-wrap section-block-tight">
        <SectionTag num="06" label="Why you can trust the numbers" />
        <div className="editorial-body reading-col" style={{ marginTop: 28 }}>
          <p>
            You should be skeptical — most marketing &quot;results&quot; are inflated. This studio is run by a
            practicing physician, and a doctor&apos;s whole job is evidence before claims. Every number on this
            page is pulled straight from the client&apos;s own Google Search Console and Google Business Profile —
            and I&apos;ll show you the live dashboards. One operator builds the site, runs the profile, and
            answers for the result. No account managers, no handoffs, nothing I can&apos;t put on a screen for you.
          </p>
        </div>
        <p style={{ ...monoCap, marginTop: 20, textTransform: "none", letterSpacing: "0.02em", fontSize: 11, color: "var(--ink-4)", maxWidth: "70ch" }}>
          Benchmarks: ranking-timeline and top-10 rate — Ahrefs (2M-keyword study); local-pack click share —
          Backlinko/BrightLocal; HVAC customer lifetime value and cost-per-lead — WhatConverts. ACExperts
          metrics — Google Search Console &amp; Business Profile Performance, Apr 22 – Jun 11, 2026.
        </p>
      </section>

      {/* ── CTA ─────────────────────────────────────────────────────── */}
      <section className="cover-surface">
        <div className="section-wrap section-block">
          <SectionTag num="07" label="Working together" onDark />
          <EditorialH2 onDark className="reading-col">
            Want results like this<br />
            <em>for your business?</em>
          </EditorialH2>
          <p className="reading-col page-intro__lead">
            Send the business name, your current site (or what&apos;s in place now), what you&apos;re trying to
            accomplish, and a rough timeline. I read every inquiry personally and reply within a week if it&apos;s
            a fit.
          </p>
          <div style={{ marginTop: 36, display: "flex", gap: 16, flexWrap: "wrap" }}>
            <Link href="/inquire" className="btn-fill">Start a project</Link>
            <Link href="/call" className="btn-ghost">Book a 20-min intro</Link>
          </div>
        </div>
      </section>

      <CaseStudyNav prev={prev} next={next} />
    </>
  );
}
