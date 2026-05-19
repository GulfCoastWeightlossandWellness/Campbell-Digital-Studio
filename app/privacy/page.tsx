import type { Metadata } from "next";
import Link from "next/link";
import LegalPage from "@/components/legal/LegalPage";
import LegalSection from "@/components/legal/LegalSection";
import { siteConfig } from "@/lib/site-config";

const LAST_UPDATED = "May 16, 2026";

export const metadata: Metadata = {
  title: `Privacy | ${siteConfig.name}`,
  description:
    "How Campbell Digital Studio handles data submitted through this site. Plain English, no padding.",
  alternates: { canonical: "/privacy" },
};

export default function PrivacyPage() {
  return (
    <LegalPage
      eyebrow="Privacy"
      title={
        <>
          What this site does<br />
          <em>with your data.</em>
        </>
      }
      subtitle={`Plain English. No padding. Last updated ${LAST_UPDATED}.`}
    >
      <LegalSection title="Who runs this site">
        <p>
          Campbell Digital Studio is operated by Peyton Campbell, DO, based in{" "}
          {siteConfig.founder.location}. Solo operator. You reach me directly at{" "}
          <a href={`mailto:${siteConfig.email}`} className="editorial-link copper">
            {siteConfig.email}
          </a>
          .
        </p>
      </LegalSection>

      <LegalSection title="What data this site collects">
        <p>
          Two forms collect anything: the{" "}
          <Link href="/inquire" className="editorial-link copper">
            inquire form
          </Link>{" "}
          and the footer email capture. Everything else on the site is informational only.
        </p>
        <ul className="legal-list">
          <li>
            <strong>Inquire form:</strong> name (optional), email (required), business name
            (required), current website (optional), type of business (optional), what you are
            trying to accomplish, approximate budget (optional), and timeline (optional).
          </li>
          <li>
            <strong>Footer email capture:</strong> email address and an optional short note.
          </li>
          <li>
            <strong>Mailto links</strong> open your own email client. Nothing is captured on this
            side until you actually press send and your email reaches my inbox.
          </li>
        </ul>
      </LegalSection>

      <LegalSection title="What happens to that data">
        <p>
          Form submissions are sent to my Workspace inbox at{" "}
          <a href={`mailto:${siteConfig.email}`} className="editorial-link copper">
            {siteConfig.email}
          </a>{" "}
          using{" "}
          <a
            href="https://resend.com/legal/privacy-policy"
            target="_blank"
            rel="noopener noreferrer"
            className="editorial-link"
          >
            Resend
          </a>
          , a transactional email service. I read them and reply. I do not sell, rent, or share
          your information with third parties. I do not add you to any marketing automation. If
          you do not hear from me within a few days, send a follow-up.
        </p>
        <p>
          The site is hosted on{" "}
          <a
            href="https://vercel.com/legal/privacy-policy"
            target="_blank"
            rel="noopener noreferrer"
            className="editorial-link"
          >
            Vercel
          </a>
          , which keeps standard request logs (IP address, user agent, URL requested) for short
          retention windows as part of normal operations. I do not query those logs except when
          debugging a real bug.
        </p>
      </LegalSection>

      <LegalSection title="Cookies and trackers">
        <p>
          This site does not set advertising cookies, does not embed third-party tracking pixels,
          and does not load social-media share buttons that track you. If analytics are running,
          they are{" "}
          <a
            href="https://plausible.io/data-policy"
            target="_blank"
            rel="noopener noreferrer"
            className="editorial-link"
          >
            Plausible
          </a>
          , which is cookieless and does not collect personal data.
        </p>
      </LegalSection>

      <LegalSection title="How long I keep your information">
        <p>
          Form submissions sit in my email inbox until I clean it out, which is irregular. If you
          want me to delete a specific submission, email me and I will.
        </p>
      </LegalSection>

      <LegalSection title="Children">
        <p>
          This site is not directed at anyone under 13 and does not knowingly collect data from
          children.
        </p>
      </LegalSection>

      <LegalSection title="Changes to this page">
        <p>
          If the site grows to add anything new that touches your data, I update this page first
          and date the change at the top. There is no mailing list to notify you, because there is
          no mailing list.
        </p>
      </LegalSection>

      <LegalSection title="Contact">
        <p>
          Questions about anything on this page go to{" "}
          <a
            href={`mailto:${siteConfig.email}?subject=${encodeURIComponent("Privacy question")}`}
            className="editorial-link copper"
          >
            {siteConfig.email}
          </a>
          .
        </p>
      </LegalSection>
    </LegalPage>
  );
}
