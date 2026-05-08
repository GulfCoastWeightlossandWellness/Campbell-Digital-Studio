import Link from "next/link";
import { getDisplayableClients } from "@/lib/data/clients";
import SectionTag from "@/components/editorial/SectionTag";
import { displayDomain, isRealDomain } from "@/lib/url-display";

type Props = {
  /** Section number to render in the eyebrow tag */
  sectionNum?: string;
};

/**
 * Selected Clients row.
 *
 * Renders nothing if fewer than 2 clients have publicConsent.
 * Each client tile shows: name (links to case study or site), type/sector,
 * live domain (separately clickable, gold for real domains, mono-muted for
 * staging URLs), and an optional second domain for clients with both a
 * marketing site and a product (currently only IHE).
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
            // Primary destination: case study if one exists, otherwise the live site.
            const primaryHref = c.caseStudySlug ? `/work/${c.caseStudySlug}` : c.websiteUrl;
            const primaryExternal = !c.caseStudySlug;
            const liveReal = isRealDomain(c.websiteUrl);
            const productReal = isRealDomain(c.productUrl);

            return (
              <div
                key={c.id}
                className="selected-client"
                style={{
                  paddingTop: "12px",
                  paddingBottom: "12px",
                  borderTop: "1px solid var(--paper-rule)",
                }}
              >
                <Link
                  href={primaryHref}
                  {...(primaryExternal
                    ? { target: "_blank", rel: "noopener noreferrer" }
                    : {})}
                  className="selected-client-name"
                >
                  {c.shortName}
                  {primaryExternal ? (
                    <span aria-hidden style={{ color: "var(--gold-600)", marginLeft: "0.4em", fontSize: "0.8em" }}>
                      ↗
                    </span>
                  ) : null}
                </Link>
                <div
                  style={{
                    fontFamily: "var(--font-jetbrains), monospace",
                    fontSize: "10px",
                    letterSpacing: "0.16em",
                    textTransform: "uppercase",
                    color: "var(--ink-mute)",
                    lineHeight: 1.5,
                    marginBottom: "10px",
                  }}
                >
                  {c.type}
                </div>

                {/* Domain link(s) — separately clickable. Real domains in gold. */}
                <a
                  href={c.websiteUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`selected-client-domain ${liveReal ? "is-real" : "is-staging"}`}
                  aria-label={`Visit ${c.name} — opens in new tab`}
                >
                  {displayDomain(c.websiteUrl)} <span aria-hidden>↗</span>
                </a>
                {c.productUrl ? (
                  <a
                    href={c.productUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`selected-client-domain ${productReal ? "is-real" : "is-staging"}`}
                    style={{ marginTop: "4px" }}
                    aria-label={`Live product — opens in new tab`}
                  >
                    <span className="prefix">Product:</span>{" "}
                    {displayDomain(c.productUrl)} <span aria-hidden>↗</span>
                  </a>
                ) : null}
              </div>
            );
          })}
        </div>
      </div>
      <style>{`
        .selected-client-name {
          display: block;
          font-family: var(--font-fraunces), Georgia, serif;
          font-size: clamp(15px, 1.4vw, 18px);
          font-weight: 500;
          color: var(--navy-900);
          letter-spacing: -0.012em;
          font-variation-settings: "opsz" 96;
          line-height: 1.25;
          margin-bottom: 8px;
          text-decoration: none;
        }
        .selected-client-name:hover {
          background-image: linear-gradient(currentColor, currentColor);
          background-size: 100% 1px;
          background-repeat: no-repeat;
          background-position: left 95%;
        }
        .selected-client-domain {
          display: inline-flex;
          align-items: baseline;
          gap: 0.35em;
          text-decoration: none;
          font-family: var(--font-jetbrains), ui-monospace, monospace;
          font-size: 12px;
          letter-spacing: 0.04em;
          line-height: 1.4;
          padding: 4px 0;
          word-break: break-all;
        }
        .selected-client-domain .prefix {
          font-weight: 600;
          letter-spacing: 0.16em;
          text-transform: uppercase;
          font-size: 10px;
          color: var(--ink-mute);
        }
        .selected-client-domain.is-real {
          color: var(--gold-700);
          font-weight: 600;
          font-size: 13px;
        }
        .selected-client-domain.is-real:hover {
          color: var(--gold-600);
        }
        .selected-client-domain.is-staging {
          color: var(--ink-mute);
        }
        .selected-client-domain.is-staging:hover {
          color: var(--ink);
        }

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
