import Cadence from "@/components/editorial/Cadence";
import SectionTag from "@/components/editorial/SectionTag";
import EditorialH2 from "@/components/editorial/EditorialH2";
import { getResultsForSlug } from "@/lib/data/results";

type Props = {
  slug: string;
  sectionNum?: string;
};

/**
 * Renders the Results cadence block for a case study. If no real results
 * have been recorded for the slug, returns null — the section vanishes
 * entirely rather than showing placeholder data.
 */
export default function CaseStudyResults({ slug, sectionNum = "02" }: Props) {
  const results = getResultsForSlug(slug);
  if (results.length === 0) return null;

  return (
    <section className="section-wrap section-block-tight">
      <SectionTag num={sectionNum} label="Results" />
      <EditorialH2>
        What the build<br />
        <em>actually moved.</em>
      </EditorialH2>

      <div style={{ marginTop: "32px" }}>
        <Cadence
          cells={results.map((r) => ({
            label: r.label,
            value: r.value,
            detail: r.detail,
          }))}
        />
      </div>
    </section>
  );
}
