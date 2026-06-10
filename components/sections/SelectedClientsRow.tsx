/**
 * SelectedClientsRow — wordmark/logo row, neighbor-dim on hover.
 *
 * Upgrade over the legacy `SelectedClients.tsx` text-only grid: this is a static
 * row of brand-colored wordmarks. Hover lifts and saturates the target; the
 * rest of the row dims via CSS `:has()` (no JS).
 *
 * Logo SVGs aren't centralized yet — for now each client renders a styled
 * text wordmark in its brand color. When the orchestrator drops a real SVG
 * into `/images/brand/logos/<id>.svg`, the component will prefer it.
 *
 * Optional click → routes to the case study page (or live site if no case
 * study exists).
 *
 * Voice: clinical-plain. No "trusted by" / "loved by" boilerplate.
 */

import Link from "next/link";
import SectionTag from "@/components/editorial/SectionTag";
import styles from "./SelectedClientsRow.module.css";

type ClientMark = {
  id: string;
  wordmark: string;
  /** Brand color (single-token, no gradients). */
  color: string;
  /** Internal case-study slug (if it exists). */
  caseStudySlug?: string;
  /** Live site URL (fallback when no case study). */
  href: string;
  /** Optional SVG logo path under /public. If present, prefers SVG over wordmark. */
  logoSvg?: string;
};

const CLIENTS: ClientMark[] = [
  {
    id: "air-solutions",
    wordmark: "Air Solutions",
    // Air Solutions brand red — verified in their site.
    color: "#C8331B",
    caseStudySlug: "air-solutions",
    // Live on the real domain since the WordPress → Next.js cutover.
    href: "https://airsolutionspros.com",
  },
  {
    id: "pro-1-painters",
    wordmark: "Pro 1 Painters",
    // Professional painting blue — display wordmark color.
    color: "#1F4E79",
    caseStudySlug: "pro-1-painters",
    href: "https://pro1painters.com",
  },
  {
    id: "revitalize",
    wordmark: "Revitalize",
    // Revitalize wellness blue.
    color: "#1E6B7A",
    caseStudySlug: "revitalize",
    href: "http://revitalizemedicalclinic.com/",
  },
  {
    id: "ihe",
    wordmark: "Interactive Health Education",
    // IHE clinical blue.
    color: "#1E3A8A",
    href: "https://www.interactivehealtheducation.com/",
  },
  {
    id: "acexperts",
    wordmark: "ACExperts251",
    color: "#0E6BA8",
    href: "https://acexperts251.com",
  },
  {
    id: "collective",
    wordmark: "Collective Counseling",
    // Soft sage from Calli's brand.
    color: "#5A7A5A",
    href: "https://collectivecounselingdaphne.com",
  },
  {
    id: "blessed",
    wordmark: "Blessed Barbershop",
    color: "#1A1A1A",
    href: "https://www.blessedbarbershopdaphne.com",
  },
];

type Props = {
  sectionNum?: string;
};

export default function SelectedClientsRow({ sectionNum = "02" }: Props) {
  return (
    <section className={styles.section} aria-labelledby="selected-clients-row-heading">
      <div className="section-wrap section-block-tight">
        <SectionTag num={sectionNum} label="Selected clients" />
        <h2 id="selected-clients-row-heading" className="sr-only">
          Selected clients
        </h2>

        <ul className={styles.row} role="list">
          {CLIENTS.map((c) => {
            const isInternal = Boolean(c.caseStudySlug);
            const href = c.caseStudySlug ? `/work/${c.caseStudySlug}` : c.href;
            const linkProps = isInternal
              ? {}
              : { target: "_blank", rel: "noopener noreferrer" };

            return (
              <li key={c.id} className={styles.cell}>
                <Link
                  href={href}
                  {...linkProps}
                  className={styles.mark}
                  style={{ ["--mark-color" as string]: c.color }}
                  aria-label={
                    isInternal
                      ? `${c.wordmark} — case study`
                      : `${c.wordmark} — opens in new tab`
                  }
                >
                  {c.logoSvg ? (
                    /* eslint-disable-next-line @next/next/no-img-element */
                    <img src={c.logoSvg} alt={c.wordmark} className={styles.logoSvg} />
                  ) : (
                    <span className={styles.wordmark}>{c.wordmark}</span>
                  )}
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
