import type { Metadata } from "next";
import Link from "next/link";
import PageIntro from "@/components/editorial/PageIntro";
import SectionTag from "@/components/editorial/SectionTag";
import EditorialH2 from "@/components/editorial/EditorialH2";

export const metadata: Metadata = {
  title: "Notes — Field log from Campbell Digital Studio",
  description:
    "Short field-log entries on GBP API quirks, programmatic SEO traps, and clinic intake patterns. Notes from a working studio, not a content marketing engine.",
  alternates: { canonical: "/notes" },
};

export default function NotesIndexPage() {
  return (
    <>
      <PageIntro
        tagNum="§ Field log"
        tagLabel="Notes"
        lead="Short entries on the work in progress — GBP API quirks, programmatic SEO traps, clinic intake patterns, and the small structural decisions that compound. Written for the kind of operator who reads release notes."
      >
        Field notes,<br />
        <em>from a working studio.</em>
      </PageIntro>

      <section className="section-wrap section-block">
        <SectionTag num="01" label="Status" />
        <EditorialH2 className="reading-col">
          Notes coming soon.
        </EditorialH2>

        <div className="editorial-body reading-col" style={{ marginTop: "24px" }}>
          <p>
            The field log is being built. The first entries will cover GBP API approval workflows,
            programmatic SEO matrices that don&apos;t trigger duplicate-content penalties, and the
            clinical intake patterns that survive contact with a real front desk.
          </p>
          <p>
            Subscribe via the footer to be notified when the first entries land. No mailing list,
            no drip sequence — just a note when there&apos;s something worth reading.
          </p>
        </div>

        <div className="page-intro__actions" style={{ marginTop: "32px" }}>
          <Link href="/work" className="editorial-link arrow-link mono">
            See the work instead <span className="arrow" aria-hidden>→</span>
          </Link>
          <Link href="/inquire" className="editorial-link arrow-link mono">
            Or start a conversation <span className="arrow" aria-hidden>→</span>
          </Link>
        </div>
      </section>
    </>
  );
}
