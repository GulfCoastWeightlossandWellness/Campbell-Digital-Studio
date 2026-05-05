import type { Metadata } from "next";
import Link from "next/link";
import SectionTag from "@/components/editorial/SectionTag";
import EditorialH2 from "@/components/editorial/EditorialH2";
import Eyebrow from "@/components/editorial/Eyebrow";

export const metadata: Metadata = {
  title: "Inquire",
  description:
    "Start a conversation with Campbell Digital Studio about a clinical practice or local service business website project.",
};

const contactEmail = "hello@peytoncampbell.studio";

export default function InquirePage() {
  const subject = encodeURIComponent("Project Inquiry — Campbell Digital Studio");
  const body = encodeURIComponent(
    [
      "Hi Peyton,",
      "",
      "Business name: ",
      "Current website (if any): ",
      "Type of business (medical practice / home services / other): ",
      "What you're trying to accomplish: ",
      "Approximate budget range: ",
      "Timeline: ",
      "",
    ].join("\n"),
  );
  const mailto = `mailto:${contactEmail}?subject=${subject}&body=${body}`;

  return (
    <>
      <section
        className="section-wrap"
        style={{
          paddingTop: "clamp(96px, 14vw, 160px)",
          paddingBottom: "clamp(48px, 6vw, 80px)",
        }}
      >
        <Eyebrow>§ Inquire / Start a Conversation</Eyebrow>

        <h1
          className="display-serif"
          style={{
            fontSize: "clamp(40px, 7vw, 88px)",
            color: "var(--navy-900)",
            marginBottom: "32px",
            maxWidth: "16ch",
          }}
        >
          Start a<br />
          <em style={{ color: "var(--navy-700)" }}>conversation.</em>
        </h1>

        <div className="editorial-body reading-col">
          <p>
            The most useful way to begin is an email with a few specifics. Send the business name,
            a link to the current site (or a sentence on what&apos;s currently in place), what
            you&apos;re trying to accomplish, an approximate budget range, and a timeline.
          </p>
          <p>
            I read every inquiry personally. If the project is a fit, you&apos;ll hear back within
            a week with a few questions and a suggested next step. If it isn&apos;t a fit,
            I&apos;ll tell you that too, and where possible point you toward someone better suited.
          </p>
        </div>

        <div
          style={{
            marginTop: "56px",
            display: "flex",
            flexDirection: "column",
            gap: "16px",
            alignItems: "flex-start",
          }}
        >
          <a href={mailto} className="btn-fill" style={{ fontSize: "12px" }}>
            Email the Studio
          </a>
          <span
            style={{
              fontFamily: "var(--font-jetbrains), monospace",
              fontSize: "11px",
              letterSpacing: "0.18em",
              textTransform: "uppercase",
              color: "var(--ink-mute)",
            }}
          >
            Or write directly:{" "}
            <a
              href={`mailto:${contactEmail}`}
              className="editorial-link gold"
              style={{ color: "var(--gold-700)" }}
            >
              {contactEmail}
            </a>
          </span>
        </div>
      </section>

      {/* ─── Fit note ─────────────────────────────────────────────── */}
      <section
        style={{
          background: "var(--surface)",
          borderTop: "1px solid var(--paper-rule)",
          borderBottom: "1px solid var(--paper-rule)",
        }}
      >
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

          <div style={{ marginTop: "32px" }}>
            <Link href="/work" className="editorial-link arrow-link mono">
              See recent work <span className="arrow" aria-hidden>→</span>
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
