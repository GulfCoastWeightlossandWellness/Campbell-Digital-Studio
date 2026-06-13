/**
 * OwnersRow — circle-cropped founder portraits.
 *
 * Five real owners in a single row, circles ~120px on desktop / 80px on mobile.
 * Used on `/studio` (or above the closing CTA on the homepage). Brand-correct
 * navy ring on hover; name + role in mono beneath.
 *
 * Image path convention (orchestrator-populated): `/images/external/owners/<slug>.{ext}`
 *
 * Voice: clinical-plain. The microcopy under the row is the line that does
 * the positioning work — keep it short.
 */

import Image from "next/image";
import SectionTag from "@/components/editorial/SectionTag";
import styles from "./OwnersRow.module.css";

type Owner = {
  id: string;
  name: string;
  role: string;
  src: string;
  alt: string;
};

const OWNERS: Owner[] = [
  {
    id: "reaves-nelson",
    name: "Reaves Nelson",
    role: "Founder, Air Solutions Heating & Cooling",
    src: "/images/external/owners/reaves-nelson.jpg",
    alt: "Reaves Nelson, founder of Air Solutions Heating & Cooling",
  },
  {
    id: "landon-acexperts",
    name: "Landon",
    role: "Owner, ACExperts251",
    src: "/images/external/owners/landon-acexperts.jpg",
    alt: "Landon, owner of ACExperts251",
  },
  {
    id: "travis-woodley",
    name: "Travis Woodley",
    role: "Founder, Revitalize Medical & Wellness",
    src: "/images/external/owners/travis-woodley.jpg",
    alt: "Travis Woodley, founder of Revitalize Medical & Wellness",
  },
  {
    id: "calli-spenser",
    name: "Calli Spenser Campbell, LPC",
    role: "Therapist & Owner, Collective Counseling",
    src: "/images/external/owners/calli-spenser.webp",
    alt: "Calli Spenser Campbell, LPC, therapist and owner of Collective Counseling",
  },
  {
    id: "peyton-campbell",
    name: "Peyton Campbell, DO",
    role: "Owner & CEO · Lead Software Engineer & Online Presence Strategist",
    src: "/images/external/owners/peyton-campbell.jpg",
    alt: "Peyton Campbell, DO, Campbell Digital Studio",
  },
  {
    id: "creighton-hoercher",
    name: "Creighton Hoercher",
    role: "Lead Software Engineer & Online Presence Strategist",
    src: "/images/external/owners/creighton-hoercher.jpg",
    alt: "Creighton Hoercher, Lead Software Engineer & Online Presence Strategist at Campbell Digital Studio",
  },
];

type Props = {
  sectionNum?: string;
};

export default function OwnersRow({ sectionNum }: Props) {
  return (
    <section className={styles.section} aria-labelledby="owners-row-heading">
      <div className="section-wrap section-block-tight">
        {sectionNum ? <SectionTag num={sectionNum} label="Owners we've built for" /> : null}

        <h2 id="owners-row-heading" className="sr-only">
          Owners we&apos;ve built for
        </h2>

        <ul className={styles.row} role="list">
          {OWNERS.map((owner) => (
            <li key={owner.id} className={styles.cell}>
              <div className={styles.portrait}>
                <Image
                  src={owner.src}
                  alt={owner.alt}
                  fill
                  sizes="120px"
                  priority={false}
                  style={{ objectFit: "cover" }}
                />
              </div>
              <p className={styles.name}>{owner.name}</p>
              <p className={styles.role}>{owner.role}</p>
            </li>
          ))}
        </ul>

        <p className={styles.microcopy}>
          Small businesses. Real owners. Built with them, not for them.
        </p>
      </div>
    </section>
  );
}
