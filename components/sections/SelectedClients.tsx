import Link from "next/link";
import { getDisplayableClients } from "@/lib/data/clients";
import SectionTag from "@/components/editorial/SectionTag";

type Props = {
  /** Section number to render in the eyebrow tag */
  sectionNum?: string;
};

/**
 * Selected Clients row.
 *
 * Renders nothing if fewer than 2 clients have publicConsent.
 * Each client is a text wordmark (Fraunces) over a small mono caption — the
 * intentional senior-studio look. If `logoUrl` is supplied later, swap to <Image />.
 *
 * Each row links to the case-study page (when one exists) or the live site.
 */
export default function SelectedClients({ sectionNum }: Props) {
  const clients = getDisplayableClients();
  if (clients.length < 2) return null;

  return (
    <section
      style={{
        background: "var(--surface)",
        borderTop: "1px solid var(--paper-rule)",
        borderBottom: "1px solid var(--paper-rule)",
      }}
    >
      <div className="section-wrap section-block-tight">
        <SectionTag num={sectionNum ?? "§ Index"} label="Selected Clients" />
        <div
          className="selected-clients-grid"
          style={{
            display: "grid",
            gridTemplateColumns: `repeat(${Math.min(clients.length, 5)}, minmax(0, 1fr))`,
            gap: "32px",
            marginTop: "24px",
            alignItems: "start",
          }}
        >
          {clients.map((c) => {
            const href = c.caseStudySlug ? `/work/${c.caseStudySlug}` : c.websiteUrl;
            const external = !c.caseStudySlug;
            return (
              <Link
                key={c.id}
                href={href}
                {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                style={{
                  display: "block",
                  textDecoration: "none",
                  color: "inherit",
                  paddingTop: "12px",
                  paddingBottom: "12px",
                  borderTop: "1px solid var(--paper-rule)",
                }}
              >
                <div
                  style={{
                    fontFamily: "var(--font-fraunces), Georgia, serif",
                    fontSize: "clamp(15px, 1.4vw, 18px)",
                    fontWeight: 500,
                    color: "var(--navy-900)",
                    letterSpacing: "-0.012em",
                    fontVariationSettings: '"opsz" 96',
                    lineHeight: 1.25,
                    marginBottom: "8px",
                  }}
                >
                  {c.shortName}
                  {external ? (
                    <span style={{ color: "var(--gold-600)", marginLeft: "0.4em", fontSize: "0.8em" }}>↗</span>
                  ) : null}
                </div>
                <div
                  style={{
                    fontFamily: "var(--font-jetbrains), monospace",
                    fontSize: "10px",
                    letterSpacing: "0.16em",
                    textTransform: "uppercase",
                    color: "var(--ink-mute)",
                    lineHeight: 1.5,
                  }}
                >
                  {c.type}
                </div>
              </Link>
            );
          })}
        </div>
      </div>
      <style>{`
        @media (max-width: 860px) {
          .selected-clients-grid {
            grid-template-columns: 1fr 1fr !important;
          }
        }
        @media (max-width: 480px) {
          .selected-clients-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </section>
  );
}
