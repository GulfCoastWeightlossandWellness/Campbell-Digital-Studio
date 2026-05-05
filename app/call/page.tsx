import type { Metadata } from "next";
import Link from "next/link";
import Eyebrow from "@/components/editorial/Eyebrow";
import SectionTag from "@/components/editorial/SectionTag";
import EditorialH2 from "@/components/editorial/EditorialH2";
import CalEmbed from "@/components/CalEmbed";
import { siteConfig } from "@/lib/site-config";

export const metadata: Metadata = {
  title: "Book a call",
  description:
    "Book a 20-minute introductory call with Campbell Digital Studio — what you have, what you need, whether the studio is a fit.",
};

export default function CallPage() {
  const username = siteConfig.calUsername;

  return (
    <>
      <section
        className="section-wrap"
        style={{
          paddingTop: "clamp(96px, 14vw, 160px)",
          paddingBottom: "clamp(48px, 6vw, 80px)",
        }}
      >
        <Eyebrow>§ Book / Twenty-Minute Call</Eyebrow>

        <h1
          className="display-serif"
          style={{
            fontSize: "clamp(40px, 7vw, 88px)",
            color: "var(--navy-900)",
            marginBottom: "32px",
            maxWidth: "16ch",
          }}
        >
          Twenty minutes,<br />
          <em style={{ color: "var(--navy-700)" }}>no deck.</em>
        </h1>

        <div className="editorial-body reading-col">
          <p>
            A short call to talk through what you have, what you&apos;re trying to accomplish, and
            whether the studio is the right fit. No deck, no sales pressure. If a project is a fit,
            you&apos;ll leave the call with a sketch of scope; if it isn&apos;t, you&apos;ll leave
            with honest notes and where I&apos;d look instead.
          </p>
        </div>
      </section>

      {username ? (
        <section className="section-wrap section-block-tight">
          <SectionTag num="§" label="Pick a time" />
          <div
            style={{
              marginTop: "24px",
              border: "1px solid var(--paper-rule)",
              background: "var(--surface)",
              padding: "clamp(12px, 2vw, 20px)",
              minHeight: "640px",
            }}
          >
            <CalEmbed username={username} />
          </div>
        </section>
      ) : (
        <section
          style={{
            background: "var(--surface)",
            borderTop: "1px solid var(--paper-rule)",
            borderBottom: "1px solid var(--paper-rule)",
          }}
        >
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
            <div style={{ marginTop: "32px", display: "flex", gap: "32px", flexWrap: "wrap" }}>
              <a
                href={`mailto:${siteConfig.email}?subject=${encodeURIComponent("Twenty-minute call")}`}
                className="btn-fill"
                style={{ fontSize: "12px" }}
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
