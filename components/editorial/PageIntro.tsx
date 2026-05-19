import type { ReactNode } from "react";
import SectionTag from "@/components/editorial/SectionTag";
import Eyebrow from "@/components/editorial/Eyebrow";

type Props = {
  /** Section tag, e.g. "§ Index" */
  tagNum?: string;
  tagLabel?: string;
  /** Mono eyebrow line (used when tagNum/tagLabel omitted) */
  eyebrow?: string;
  onDark?: boolean;
  children: ReactNode;
  lead?: string;
  className?: string;
  /** Display scale class on the h1, e.g. display-80 for case studies */
  titleScale?: "display-96" | "display-80";
};

/**
 * Consistent top-of-page intro: tag or eyebrow, display heading, optional lead.
 */
export default function PageIntro({
  tagNum,
  tagLabel,
  eyebrow,
  onDark,
  children,
  lead,
  className = "",
  titleScale = "display-96",
}: Props) {
  return (
    <section className={`page-intro section-wrap ${className}`.trim()}>
      {tagNum && tagLabel ? (
        <SectionTag num={tagNum} label={tagLabel} onDark={onDark} />
      ) : eyebrow ? (
        <Eyebrow onDark={onDark}>{eyebrow}</Eyebrow>
      ) : null}
      <h1 className={`display-sans ${titleScale} page-intro__title`}>{children}</h1>
      {lead ? <p className="page-intro__lead reading-col">{lead}</p> : null}
    </section>
  );
}
