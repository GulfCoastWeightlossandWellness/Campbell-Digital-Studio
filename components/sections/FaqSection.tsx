"use client";

import { useState } from "react";
import SectionTag from "@/components/editorial/SectionTag";
import EditorialH2 from "@/components/editorial/EditorialH2";
import { faqs } from "@/lib/data/faq";

type Props = {
  sectionNum?: string;
};

export default function FaqSection({ sectionNum = "07" }: Props) {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  if (faqs.length === 0) return null;

  return (
    <section className="section-wrap section-block">
      <SectionTag num={sectionNum} label="Common questions" />
      <EditorialH2>
        Things people<br />
        <em>ask before signing.</em>
      </EditorialH2>

      <div className="faq-list">
        {faqs.map((item, idx) => {
          const open = openIndex === idx;
          const id = `faq-${idx}`;
          return (
            <div key={item.question} className="faq-item">
              <button
                type="button"
                className="faq-trigger"
                aria-expanded={open}
                aria-controls={`${id}-panel`}
                id={`${id}-button`}
                onClick={() => setOpenIndex(open ? null : idx)}
              >
                <span className="faq-trigger__question">{item.question}</span>
                <span
                  className={`faq-trigger__icon${open ? " is-open" : ""}`}
                  aria-hidden
                >
                  +
                </span>
              </button>
              <div
                id={`${id}-panel`}
                role="region"
                aria-labelledby={`${id}-button`}
                hidden={!open}
                className="faq-panel"
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
