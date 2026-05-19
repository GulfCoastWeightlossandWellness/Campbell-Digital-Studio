import type { Metadata } from "next";
import Link from "next/link";
import LegalPage from "@/components/legal/LegalPage";
import LegalSection from "@/components/legal/LegalSection";
import { siteConfig } from "@/lib/site-config";

const LAST_UPDATED = "May 16, 2026";

export const metadata: Metadata = {
  title: `Terms | ${siteConfig.name}`,
  description:
    "Terms of use for campbelldigitalstudio.com. Short, honest, and only what's actually true.",
  alternates: { canonical: "/terms" },
};

export default function TermsPage() {
  return (
    <LegalPage
      eyebrow="Terms"
      title={
        <>
          Rules for using<br />
          <em>this website.</em>
        </>
      }
      subtitle={`These cover the website itself, not paid engagements. Client work is governed by the actual proposal and contract signed before any project starts. Last updated ${LAST_UPDATED}.`}
    >
      <LegalSection title="What this site is">
        <p>
          {siteConfig.name} (the &ldquo;Studio&rdquo;) operates this website (the &ldquo;Site&rdquo;)
          to publish information about the Studio, its approach, and its case studies. The Site is
          also the front door for prospective clients to reach out. The Site is not a transaction
          platform and does not sell anything directly.
        </p>
      </LegalSection>

      <LegalSection title="Using the Site">
        <p>You may browse the Site, link to it, and quote short excerpts with attribution.</p>
        <p>You may not:</p>
        <ul className="legal-list">
          <li>
            Scrape the Site at high volume, automate form submissions, or attempt to overwhelm any
            endpoint.
          </li>
          <li>
            Reverse-engineer or copy the Site&rsquo;s code, design system, or custom components for
            use in a competing product.
          </li>
          <li>
            Use the Site or its forms to send spam, harass, or impersonate another person.
          </li>
          <li>
            Republish case-study content (text, screenshots, or visual assets) without written
            permission.
          </li>
        </ul>
      </LegalSection>

      <LegalSection title="Intellectual property">
        <p>
          The Site&rsquo;s design system, written copy, visual assets, and code belong to the Studio
          (or to the clients depicted, in the case of client work). The marks, names, and brand
          assets of client projects shown on the Site belong to those clients and are used with
          their permission. Nothing on the Site grants you a license to use those assets.
        </p>
        <p>
          If you believe content on the Site infringes your rights, email{" "}
          <a
            href={`mailto:${siteConfig.email}?subject=${encodeURIComponent("Content concern")}`}
            className="editorial-link copper"
          >
            {siteConfig.email}
          </a>{" "}
          with specifics. I respond to credible claims promptly.
        </p>
      </LegalSection>

      <LegalSection title="No client relationship until both sides sign">
        <p>
          Submitting an inquiry through the Site, exchanging emails, or having an introductory call
          does not create an engagement or any obligation on either side. A client relationship
          begins only when both parties sign a written proposal or services agreement.
        </p>
      </LegalSection>

      <LegalSection title="Disclaimers">
        <p>
          The Site is provided &ldquo;as-is.&rdquo; The Studio aims for high uptime and accurate
          information, but does not guarantee that the Site will be available without interruption
          or that every claim will remain current as the business evolves. Case studies describe
          past projects under conditions specific to those projects; past outcomes do not guarantee
          future outcomes for a different business.
        </p>
        <p>
          Nothing on the Site constitutes legal, medical, financial, or professional advice. Peyton
          Campbell is a physician, but content on this website is about the Studio&rsquo;s services,
          not clinical care.
        </p>
      </LegalSection>

      <LegalSection title="Limitation of liability">
        <p>
          To the maximum extent permitted by law, the Studio is not liable for indirect,
          incidental, special, consequential, or punitive damages arising from your use of the
          Site. Because the Site is free to use and no consideration changes hands for browsing it,
          the Studio&rsquo;s total liability for any claim arising from the Site itself is limited to
          one hundred US dollars (US$100). This does not limit any liability that cannot be limited
          under applicable law.
        </p>
      </LegalSection>

      <LegalSection title="Third-party links">
        <p>
          The Site links to third-party tools and resources (for example, Vercel, Resend, GitHub,
          client websites). The Studio is not responsible for the content, security, or practices of
          those third parties.
        </p>
      </LegalSection>

      <LegalSection title="Changes to these terms">
        <p>
          The Studio may update these terms at any time. The current version is the one published on
          this page with the date shown at the top. Continued use of the Site after a change means
          you accept the new version.
        </p>
      </LegalSection>

      <LegalSection title="Governing law">
        <p>
          These terms are governed by the laws of the State of Alabama, USA, without regard to
          conflict-of-laws principles. Any dispute relating to the Site is brought in the state or
          federal courts located in Baldwin or Mobile County, Alabama.
        </p>
      </LegalSection>

      <LegalSection title="Contact">
        <p>
          Questions about these terms go to{" "}
          <a
            href={`mailto:${siteConfig.email}?subject=${encodeURIComponent("Terms question")}`}
            className="editorial-link copper"
          >
            {siteConfig.email}
          </a>
          . The{" "}
          <Link href="/privacy" className="editorial-link copper">
            privacy page
          </Link>{" "}
          covers how your data is handled.
        </p>
      </LegalSection>
    </LegalPage>
  );
}
