import type { Metadata } from "next";
import Link from "next/link";
import PageIntro from "@/components/editorial/PageIntro";
import SectionTag from "@/components/editorial/SectionTag";
import EditorialH2 from "@/components/editorial/EditorialH2";
import InquireForm from "@/components/InquireForm";
import { siteConfig } from "@/lib/site-config";

export const metadata: Metadata = {
  title: "Inquire",
  description:
    "Start a conversation with Campbell Digital Studio about a clinical practice or local service business website project.",
  alternates: { canonical: "/inquire" },
};

export default function InquirePage() {
  return (
    <>
      <PageIntro eyebrow="§ Inquire / Start a conversation">
        Start a<br />
        <em>conversation.</em>
      </PageIntro>

      <section className="section-wrap" style={{ paddingBottom: "clamp(48px, 6vw, 80px)" }}>
        <div className="editorial-body reading-col">
          <p>
            A few specifics save us both time. The fields below ask for the same things I&apos;d ask
            on a first call — what business you&apos;re running, what you have today, what
            you&apos;re trying to accomplish, an approximate budget, and a timeline.
          </p>
          <p>
            I read every inquiry personally. If the project is a fit, you&apos;ll hear back within
            a week with a few questions and a suggested next step. If it isn&apos;t a fit,
            I&apos;ll tell you that too, and where possible point you toward someone better suited.
          </p>
        </div>

        <div style={{ marginTop: "40px" }}>
          <InquireForm />
        </div>
      </section>

      <section className="panel-band">
        <div className="section-wrap section-block-tight">
          <SectionTag num="§ Note" label="Project fit" />
          <EditorialH2 className="reading-col">
            Most engagements run<br />
            <em>mid-five figures and up.</em>
          </EditorialH2>

          <div className="editorial-body reading-col" style={{ marginTop: "32px" }}>
            <p>
              The work is full-stack — strategy, architecture, copy, build, launch — and the only
              person between the brief and the finished site is me. That makes the studio a fit
              for clinical practices and multi-location service businesses where the site needs to
              actually do something for the business, and a poor fit for one-page sites and
              SEO-only retainers.
            </p>
            <p>
              If your budget is below mid-five figures, I&apos;ll happily refer you to someone
              good rather than scope down a project that needs more.
            </p>
          </div>

          <div className="page-intro__actions" style={{ marginTop: "32px" }}>
            <Link href="/work" className="editorial-link arrow-link mono">
              See recent work <span className="arrow" aria-hidden>→</span>
            </Link>
            {siteConfig.calUsername ? (
              <Link href="/call" className="editorial-link arrow-link mono">
                Or book a 20-min call <span className="arrow" aria-hidden>→</span>
              </Link>
            ) : null}
          </div>
        </div>
      </section>
    </>
  );
}
