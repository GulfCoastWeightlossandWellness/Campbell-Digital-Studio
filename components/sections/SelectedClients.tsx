import Link from "next/link";
import { getDisplayableClients } from "@/lib/data/clients";
import SectionTag from "@/components/editorial/SectionTag";
import { displayDomain, isRealDomain } from "@/lib/url-display";

type Props = {
  sectionNum?: string;
};

export default function SelectedClients({ sectionNum }: Props) {
  const clients = getDisplayableClients();
  if (clients.length < 2) return null;

  const cols = Math.min(clients.length, 5);

  return (
    <section className="selected-clients-band">
      <div className="section-wrap section-block-tight">
        <SectionTag num={sectionNum ?? "02"} label="Selected Clients" />
        <div
          className="selected-clients-grid selected-clients-grid--auto"
          style={{ gridTemplateColumns: `repeat(${cols}, minmax(0, 1fr))` }}
        >
          {clients.map((c) => {
            const primaryHref = c.caseStudySlug ? `/work/${c.caseStudySlug}` : c.websiteUrl;
            const primaryExternal = !c.caseStudySlug;
            const liveReal = isRealDomain(c.websiteUrl);
            const productReal = isRealDomain(c.productUrl);

            return (
              <div key={c.id} className="selected-client">
                <Link
                  href={primaryHref}
                  {...(primaryExternal
                    ? { target: "_blank", rel: "noopener noreferrer" }
                    : {})}
                  className="selected-client-name"
                >
                  {c.shortName}
                  {primaryExternal ? (
                    <span aria-hidden className="link-mark">
                      ↗
                    </span>
                  ) : null}
                </Link>
                <div className="selected-client-type">{c.type}</div>

                <a
                  href={c.websiteUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`domain-link ${liveReal ? "domain-real" : "domain-staging"}`}
                  aria-label={`Visit ${c.name} — opens in new tab`}
                >
                  {displayDomain(c.websiteUrl)} <span aria-hidden>↗</span>
                </a>
                {c.productUrl ? (
                  <a
                    href={c.productUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`domain-link ${productReal ? "domain-real" : "domain-staging"}`}
                    style={{ marginTop: "4px" }}
                    aria-label="Live product — opens in new tab"
                  >
                    <span className="domain-link-prefix">Product:</span>{" "}
                    {displayDomain(c.productUrl)} <span aria-hidden>↗</span>
                  </a>
                ) : null}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
