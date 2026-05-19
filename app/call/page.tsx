import type { Metadata } from "next";
import Link from "next/link";
import PageIntro from "@/components/editorial/PageIntro";
import SectionTag from "@/components/editorial/SectionTag";
import EditorialH2 from "@/components/editorial/EditorialH2";
import CalEmbed from "@/components/CalEmbed";
import { siteConfig } from "@/lib/site-config";

export const metadata: Metadata = {
  title: "Book a call",
  description:
    "Book a 20-minute introductory call with Campbell Digital Studio — what you have, what you need, whether the studio is a fit.",
  alternates: { canonical: "/call" },
};

export default function CallPage() {
  const username = siteConfig.calUsername;

  return (
    <>
      <PageIntro eyebrow="§ Book / Twenty-minute call">
        Twenty minutes,<br />
        <em>no deck.</em>
      </PageIntro>

      <section className="section-wrap" style={{ paddingBottom: "clamp(32px, 4vw, 48px)" }}>
        <p className="page-intro__lead reading-col">
          A short call to talk through what you have, what you&apos;re trying to accomplish, and
          whether the studio is the right fit. No deck, no sales pressure. If a project is a fit,
          you&apos;ll leave the call with a sketch of scope; if it isn&apos;t, you&apos;ll leave
          with honest notes and where I&apos;d look instead.
        </p>
      </section>

      {username ? (
        <section className="section-wrap section-block-tight">
          <SectionTag num="§" label="Pick a time" />
          <div className="cal-embed-frame">
            <CalEmbed username={username} />
          </div>
        </section>
      ) : (
        <section className="panel-band">
          <div className="section-wrap section-block-tight">
            <SectionTag num="§ Note" label="Booking is currently by email" />
            <EditorialH2 className="reading-col">
              The calendar isn&apos;t<br />
              <em>wired up yet.</em>
            </EditorialH2>
            <div className="editorial-body reading-col" style={{ marginTop: "32px" }}>
              <p>
                The studio uses a small set of integrations and the booking calendar is one of the
                last to come online. In the meantime, the fastest way to get a call on the books is
                to email directly with two or three time windows that work for you.
              </p>
            </div>
            <div className="page-intro__actions" style={{ marginTop: "32px" }}>
              <a
                href={`mailto:${siteConfig.email}?subject=${encodeURIComponent("Twenty-minute call")}`}
                className="btn-fill btn-nav"
              >
                Email to schedule
              </a>
              <Link href="/inquire" className="editorial-link arrow-link mono">
                Or send a written inquiry <span className="arrow" aria-hidden>→</span>
              </Link>
            </div>
          </div>
        </section>
      )}
    </>
  );
}
