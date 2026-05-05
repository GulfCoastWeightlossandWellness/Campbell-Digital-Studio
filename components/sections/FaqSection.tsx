"use client";

import { useState } from "react";
import SectionTag from "@/components/editorial/SectionTag";
import EditorialH2 from "@/components/editorial/EditorialH2";
import { faqs } from "@/lib/data/faq";

type Props = {
  /** Section number for the eyebrow */
  sectionNum?: string;
};

/**
 * Accordion-style FAQ. First item open by default.
 *
 * The matching FAQPage JSON-LD is rendered separately in app/page.tsx so
 * the schema can stay in the server-rendered <head>; this component only
 * handles the visible accordion.
 */
export default function FaqSection({ sectionNum = "06" }: Props) {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  if (faqs.length === 0) return null;

  return (
    <section className="section-wrap section-block">
      <SectionTag num={sectionNum} label="Common questions" />
      <EditorialH2>
        Things people<br />
        <em>ask before signing.</em>
      </EditorialH2>

      <div
        style={{
          marginTop: "48px",
          maxWidth: "820px",
          borderTop: "1px solid var(--paper-rule)",
        }}
      >
        {faqs.map((item, idx) => {
          const open = openIndex === idx;
          const id = `faq-${idx}`;
          return (
            <div
              key={item.question}
              style={{ borderBottom: "1px solid var(--paper-rule)" }}
            >
              <button
                type="button"
                aria-expanded={open}
                aria-controls={`${id}-panel`}
                id={`${id}-button`}
                onClick={() => setOpenIndex(open ? null : idx)}
                style={{
                  display: "flex",
                  width: "100%",
                  alignItems: "baseline",
                  justifyContent: "space-between",
                  gap: "24px",
                  padding: "22px 0",
                  background: "none",
                  border: "none",
                  cursor: "pointer",
                  textAlign: "left",
                  color: "var(--navy-900)",
                  minHeight: "44px",
                }}
              >
                <span
                  style={{
                    fontFamily: "var(--font-fraunces), Georgia, serif",
                    fontSize: "clamp(17px, 1.8vw, 20px)",
                    fontWeight: 500,
                    color: "var(--navy-900)",
                    letterSpacing: "-0.012em",
                    fontVariationSettings: '"opsz" 96',
                    lineHeight: 1.35,
                  }}
                >
                  {item.question}
                </span>
                <span
                  aria-hidden
                  style={{
                    fontFamily: "var(--font-jetbrains), monospace",
                    fontSize: "18px",
                    color: "var(--gold-600)",
                    transform: open ? "rotate(45deg)" : "rotate(0)",
                    transition: "transform 0.2s ease",
                    flexShrink: 0,
                    lineHeight: 1,
                  }}
                >
                  +
                </span>
              </button>
              <div
                id={`${id}-panel`}
                role="region"
                aria-labelledby={`${id}-button`}
                hidden={!open}
                style={{
                  paddingBottom: open ? "24px" : "0",
                  fontFamily: "var(--font-manrope), sans-serif",
                  fontSize: "15px",
                  lineHeight: 1.7,
                  color: "var(--ink-soft)",
                  maxWidth: "65ch",
                }}
              >
                {item.answer}
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
