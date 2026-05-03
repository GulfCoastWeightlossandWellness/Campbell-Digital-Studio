import type { Metadata } from "next";
import Link from "next/link";
import SectionTag from "@/components/editorial/SectionTag";
import EditorialH2 from "@/components/editorial/EditorialH2";
import Eyebrow from "@/components/editorial/Eyebrow";

export const metadata: Metadata = {
  title: "Inquire",
  description:
    "Inquire about a project with Campbell Digital Studio — websites, local-search infrastructure, and platforms for clinics, wellness practices, and local businesses.",
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
      "Goals for the project: ",
      "Launch deadline (if any): ",
      "",
    ].join("\n"),
  );
  const mailto = `mailto:${contactEmail}?subject=${subject}&body=${body}`;

  return (
    <>
      <section
        className="section-wrap"
        style={{ paddingTop: "clamp(96px, 14vw, 160px)", paddingBottom: "clamp(48px, 6vw, 80px)" }}
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
          Inquire about<br />
          <em style={{ color: "var(--navy-700)" }}>a project.</em>
        </h1>

        <div className="editorial-body reading-col">
          <p>
            The most useful way to start is an email with a few specifics. Send the business name,
            a link to the current site (or a sentence on what’s currently in place), what you’d
            like the new site to do, and any deadline that’s already been set.
          </p>
          <p>
            I read every inquiry personally. If the project is a fit, I’ll write back with a few
            questions and a suggested next step — usually a free written review of the existing
            site. If it isn’t a fit, I’ll tell you that too, and where possible point you toward
            someone better suited.
          </p>
        </div>

        <div style={{ marginTop: "56px", display: "flex", flexDirection: "column", gap: "16px", alignItems: "flex-start" }}>
          <a
            href={mailto}
            className="btn-fill"
            style={{ fontSize: "12px" }}
          >
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

      <section className="section-wrap section-block-tight">
        <SectionTag num="§ Note" label="If you’re not sure yet" />
        <EditorialH2 className="reading-col">
          Start with a website review<br />
          <em>instead.</em>
        </EditorialH2>

        <div className="editorial-body reading-col" style={{ marginTop: "32px" }}>
          <p>
            If you’re not ready to commit to a project, the website review is the right first
            step. It’s a free, written read of the current site — architecture, copy, local
            search, and conversion. There’s no pitch attached.
          </p>
        </div>

        <div style={{ marginTop: "32px" }}>
          <Link href="/review" className="editorial-link arrow-link mono">
            Request a Website Review <span className="arrow" aria-hidden>→</span>
          </Link>
        </div>
      </section>
    </>
  );
}
