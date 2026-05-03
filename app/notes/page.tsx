import type { Metadata } from "next";
import Link from "next/link";
import SectionTag from "@/components/editorial/SectionTag";
import EditorialH2 from "@/components/editorial/EditorialH2";
import IndexRow from "@/components/editorial/IndexRow";

export const metadata: Metadata = {
  title: "Field Notes",
  description:
    "Essays from the studio on programmatic SEO, content engines, the WordPress problem, and the architecture behind modern local-business websites.",
};

const notes = [
  {
    slug: "why-not-wordpress",
    href: "/notes/why-not-wordpress",
    year: "2026 · 05",
    title: "Why not WordPress",
    excerpt:
      "Forty percent of the internet runs on it, most of those sites are quietly broken, and the monthly retainer that keeps yours online is paying for the wrong thing.",
  },
];

export default function NotesPage() {
  return (
    <>
      <section
        className="section-wrap"
        style={{ paddingTop: "clamp(96px, 14vw, 160px)", paddingBottom: "clamp(48px, 6vw, 72px)" }}
      >
        <SectionTag num="§ Index" label="Field Notes" />
        <EditorialH2>
          Essays on the work,<br />
          <em>and the work behind the work.</em>
        </EditorialH2>

        <p
          className="reading-col"
          style={{
            fontFamily: "var(--font-manrope), sans-serif",
            fontSize: "17px",
            lineHeight: 1.65,
            color: "var(--ink-soft)",
            marginTop: "24px",
          }}
        >
          Short pieces on programmatic SEO, content engines, infrastructure decisions, and the architectural
          choices behind every studio build. Written when the question is worth answering at length.
        </p>
      </section>

      <section
        style={{
          borderTop: "1px solid var(--paper-rule)",
          borderBottom: "1px solid var(--paper-rule)",
          background: "var(--surface)",
        }}
      >
        <div className="section-wrap" style={{ paddingTop: "16px", paddingBottom: "16px" }}>
          {notes.map((n) => (
            <IndexRow
              key={n.slug}
              href={n.href}
              year={n.year}
              title={n.title}
              meta={n.excerpt}
            />
          ))}
        </div>
      </section>

      <section className="section-wrap section-block-tight">
        <p
          className="reading-col"
          style={{
            fontFamily: "var(--font-manrope), sans-serif",
            fontSize: "14px",
            lineHeight: 1.65,
            color: "var(--ink-mute)",
            fontStyle: "italic",
          }}
        >
          More essays in the pipeline. Subscribe is intentionally not a thing — the index is the feed.
        </p>
        <div style={{ marginTop: "32px" }}>
          <Link href="/inquire" className="editorial-link arrow-link mono">
            Inquire about a project <span className="arrow" aria-hidden>→</span>
          </Link>
        </div>
      </section>
    </>
  );
}
