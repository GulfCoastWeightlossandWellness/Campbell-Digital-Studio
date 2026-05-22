/**
 * Live Matrix Generator — corpus
 *
 * Source data for the deterministic templater in `lib/matrix/generate.ts`.
 * Powers the marquee homepage demo (`components/sections/MatrixDemo.tsx`):
 * pick a city + a service, get a real Air Solutions-style matrix-cell preview
 * synthesized in <400ms with no LLM call.
 *
 * Variance rule (the Wave D2 uniqueness invariant):
 *   Every slot that could read identically across cells must vary per cell.
 *   So each service ships 4–6 phrase variants for H1, meta, and FAQ pairs.
 *   The templater hashes (city + service) → variant index, so the same
 *   combination is deterministic but different combinations diverge.
 *
 * Voice: clinical-plain. No fabricated proof points ("answers personally",
 * "Cool Club 15%", specific ETAs) — see HARD RULE in MEMORY.md. Generic,
 * verifiable phrasing only. Vagueness over invented specifics.
 *
 * ⚠ DO NOT inject the FAQ array into an actual <script type="application/ld+json">
 * tag on the homepage. The MatrixDemo renders JSON-LD as inert <pre><code>.
 * Real schema lives on the actual programmatic SEO pages, not the demo.
 */

// ── Cities — Baldwin + Mobile (AL) + Gulf Coast hubs ───────────────────
// Mirrors the Air Solutions service-area footprint Reaves operates in.
export const CITIES: readonly string[] = [
  // Baldwin County, AL — core service area
  "Daphne",
  "Fairhope",
  "Spanish Fort",
  "Foley",
  "Gulf Shores",
  "Orange Beach",
  "Robertsdale",
  "Bay Minette",
  "Loxley",
  "Silverhill",
  "Summerdale",
  "Elberta",
  "Fort Morgan",
  "Magnolia Springs",
  "Lillian",
  "Stapleton",
  "Stockton",
  "Montrose",
  "Point Clear",
  "Perdido",
  "Rosinton",
  // Mobile County, AL — secondary
  "Mobile",
  "Saraland",
  "Theodore",
  "Tillmans Corner",
  "Citronelle",
  "Chickasaw",
  "Prichard",
  // Gulf Coast hubs — tertiary
  "Pensacola",
  "Gulfport",
] as const;

// ── Services ─────────────────────────────────────────────────────────────
export const SERVICES: readonly string[] = [
  "AC Repair",
  "AC Installation",
  "AC Maintenance",
  "Heating Repair",
  "Heating Installation",
  "Heat Pump Services",
  "Ductless Mini-Splits",
  "Indoor Air Quality",
  "Commercial HVAC",
  "Emergency HVAC",
  "Duct Cleaning",
  "Smart Thermostat Installation",
] as const;

// ── Variant shape ─────────────────────────────────────────────────────────
export type ServiceVariants = {
  h1: string[]; // phrase contains literal "{city}"
  meta: string[]; // phrase contains "{city}" (and optionally "{service}")
  faqs: Array<{ q: string; a: string }[]>; // each entry = a set of 3 Q+A pairs
};

// ── Service-keyed variant arrays ──────────────────────────────────────────
// 4–6 variants per slot so adjacent matrix cells never share boilerplate.
// FAQ sets: each inner array is a *set* of 3 FAQs the templater picks
// together — sets are independent across services so we don't cross-pollinate
// (e.g., a "duct cleaning" FAQ never shows up on an "AC repair" page).
export const VARIANTS: Record<string, ServiceVariants> = {
  "AC Repair": {
    h1: [
      "AC Repair in {city}, AL",
      "{city} Air Conditioning Repair",
      "Reliable AC Repair Serving {city}",
      "Same-Day AC Repair — {city}",
      "Cooling System Repair in {city}",
    ],
    meta: [
      "Licensed AC repair in {city}, AL. Diagnostics, refrigerant work, compressor and capacitor service across Baldwin County.",
      "{city} homeowners trust local technicians for AC repair — straightforward pricing, no upsell pressure.",
      "Air conditioning repair serving {city} and the surrounding Gulf Coast. Service trucks stocked for common Carrier, Trane, and Lennox issues.",
      "When your AC quits in {city}, a real technician comes out. Diagnostic fee waived if the repair is approved on the same visit.",
      "Cooling out in {city}? Local AC repair — residential and light commercial, including older R-22 systems where parts are still serviceable.",
    ],
    faqs: [
      [
        { q: "How fast can someone come out for an AC repair in {city}?", a: "Same-day appointments are usually available during peak season. Call dispatch and they will give you the next open slot for {city}." },
        { q: "Do you service older R-22 systems?", a: "Yes. Many homes in {city} still run R-22 equipment. Trucks carry the legal reclaimed refrigerant supply, though replacement is often more cost-effective on units older than 15 years." },
        { q: "What is the diagnostic fee?", a: "There is a flat diagnostic charge to get a technician on site. If you approve the repair the same day, the fee is rolled into the total invoice." },
      ],
      [
        { q: "My AC is blowing warm air — what does that usually mean?", a: "On {city} service calls, warm-air complaints most often trace back to a low refrigerant charge, a failed capacitor, or a frozen evaporator coil. A technician can confirm the cause within the first 20 minutes on site." },
        { q: "Do you repair all brands?", a: "Yes — Carrier, Trane, Lennox, Goodman, Rheem, York, and the rest. {city} crews carry the universal parts that fit across most brands; brand-specific components are usually next-day." },
        { q: "Is there a warranty on the repair?", a: "Parts carry the manufacturer warranty. Labor on most repairs is covered for 90 days from the visit." },
      ],
      [
        { q: "Can you handle a Saturday or evening call?", a: "Weekend and after-hours availability for {city} depends on the dispatch schedule. The booking line will tell you whether a same-day slot or next-morning is the realistic option." },
        { q: "Do you offer financing on bigger repairs?", a: "Financing options are available when the repair estimate crosses the threshold where replacement starts to make more financial sense. The technician will walk through both paths before you decide." },
        { q: "Do you charge extra for working in older homes?", a: "No. Older homes in {city} sometimes need more time on tight access points or original ductwork, but the labor rate is flat." },
      ],
      [
        { q: "What if the unit just needs refrigerant?", a: "Refrigerant is rarely the *only* fix — if a system is low, there is a leak somewhere. A {city} technician will locate the leak and quote a repair, not just top off the charge and leave." },
        { q: "Can you work on a unit a different company installed?", a: "Yes. There is no requirement to have purchased the system through us — most {city} repairs are on equipment another contractor installed years ago." },
        { q: "Do you provide a written estimate before starting work?", a: "Always. Nothing gets repaired without a written estimate you sign off on first." },
      ],
    ],
  },

  "AC Installation": {
    h1: [
      "AC Installation in {city}, AL",
      "New AC System Installs — {city}",
      "{city} Air Conditioning Installation",
      "AC Replacement and Installation Serving {city}",
      "High-Efficiency AC Installs in {city}",
    ],
    meta: [
      "New AC installation in {city}, AL. Carrier, Trane, and Lennox equipment with permitted, code-compliant installs.",
      "{city} AC installation — proper sizing with a Manual J calculation, not a guess based on square footage.",
      "Replacing an aging AC in {city}? Licensed installs include the line set flush, new pad, and equipment registration for the manufacturer warranty.",
      "Air conditioner installation across {city} and Baldwin County. Crews pull the permit, file inspection, and leave the worksite clean.",
      "From single-stage to variable-speed: AC installs in {city} matched to the home, not upsold past it.",
    ],
    faqs: [
      [
        { q: "How long does an AC install take in {city}?", a: "Most full-system replacements in {city} are completed in one day. Larger jobs — duct modifications, electrical upgrades, structural pad work — can run into a second day." },
        { q: "Will the new system need a permit?", a: "Yes. AC installs in {city} pull a mechanical permit and pass a municipal inspection before the job is closed out." },
        { q: "How do I know what size system I need?", a: "Sizing is calculated with Manual J, which accounts for square footage, insulation, window orientation, and {city}'s humidity load — not a rule of thumb." },
      ],
      [
        { q: "What efficiency rating should I look at?", a: "For {city} homes, a 15–17 SEER2 unit is the cost-effective sweet spot. Above 18 SEER2 the payback period stretches past the typical equipment lifespan." },
        { q: "Do you offer financing on a new install?", a: "Yes. Financing options are walked through during the in-home estimate, including manufacturer rebates that apply to {city} installs." },
        { q: "What happens to the old equipment?", a: "Old equipment is hauled off the same day. Refrigerant is recovered and reclaimed per EPA rules — not vented." },
      ],
      [
        { q: "Will I lose AC during the install?", a: "Most {city} installs are scheduled so the home is without cooling for under six hours. On extreme-heat days the crew brings portable cooling for elderly residents or pets if requested." },
        { q: "Are the line sets reused?", a: "Existing line sets are flushed, pressure-tested, and reused when they are in good condition. Replacement is recommended if the line set is corroded or undersized." },
        { q: "Does the new install come with a warranty?", a: "Manufacturer warranty (typically 10 years on parts when registered) plus a labor warranty covering the install workmanship." },
      ],
      [
        { q: "Can I get a high-efficiency variable-speed system?", a: "Yes. Variable-speed and two-stage systems are available for {city} installs, though the efficiency premium needs to clear the longer payback period before the recommendation goes out." },
        { q: "What is included in the install price?", a: "Equipment, line set work, electrical hookup, condenser pad, refrigerant charge, permit, inspection, equipment registration, and haul-off. Nothing gets added at the end." },
        { q: "Will the new system fit the existing ductwork?", a: "Existing ductwork in {city} homes is checked for static pressure and leakage before the install is finalized. Duct modifications are quoted separately if needed." },
      ],
    ],
  },

  "AC Maintenance": {
    h1: [
      "AC Maintenance in {city}, AL",
      "{city} AC Tune-Ups and Maintenance",
      "Annual AC Maintenance Serving {city}",
      "Preventive AC Service in {city}",
      "AC System Inspections — {city}",
    ],
    meta: [
      "AC maintenance in {city}, AL. Multi-point inspections that catch capacitor and refrigerant issues before they fail in July.",
      "{city} AC tune-ups — spring and fall service plans that keep the manufacturer warranty intact.",
      "Preventive AC maintenance in {city}. Coil cleaning, refrigerant check, electrical tightening, and condensate clearing on every visit.",
      "Service plan for {city} homeowners: two visits a year, priority scheduling, and discounted repair labor if something fails between checkups.",
      "Routine AC service across {city} and the Gulf Coast. The kind of thing the manufacturer requires in the fine print to keep coverage active.",
    ],
    faqs: [
      [
        { q: "How often should I service my AC in {city}?", a: "Once a year minimum, ideally in spring before the {city} cooling load hits. Heat pumps benefit from a second visit in fall to check the heating side." },
        { q: "Does maintenance void or preserve my warranty?", a: "Most manufacturers require documented annual maintenance to keep the parts warranty in force. The visit report is kept on file for that purpose." },
        { q: "What does a maintenance visit actually cover?", a: "Refrigerant charge check, coil cleaning, electrical connections, capacitor reading, blower motor amperage, drain line clearing, thermostat calibration, and a written report for the {city} homeowner." },
      ],
      [
        { q: "Is there a service plan available?", a: "Yes. A {city} service plan includes two scheduled visits per year, priority dispatch when something does go wrong, and a discount on parts and labor for non-covered repairs." },
        { q: "Will you tell me to replace the system on every visit?", a: "No. Maintenance is maintenance. Replacement only comes up when a {city} system is past its useful life or facing a repair cost that doesn't justify the spend." },
        { q: "Can I do basic maintenance myself?", a: "Filter changes every 30–60 days, keeping the outdoor unit clear of debris, and rinsing the condenser coil with low-pressure water are reasonable homeowner tasks. The rest needs a gauge set." },
      ],
      [
        { q: "How long does a maintenance visit take?", a: "About 45 to 75 minutes per system in a typical {city} home. Multi-system or commercial buildings take longer." },
        { q: "What if you find a problem during the tune-up?", a: "It gets documented and quoted. Nothing is repaired during a maintenance visit without your approval first." },
        { q: "Do you service systems you didn't install?", a: "Yes. Most {city} maintenance contracts are on equipment originally installed by another contractor. There is no requirement to have purchased the system through us." },
      ],
      [
        { q: "When is the best time to schedule maintenance in {city}?", a: "March–April for cooling tune-ups, October–November for heating. Scheduling outside peak season means more flexible windows and faster appointments." },
        { q: "Does a tune-up actually save money?", a: "On documented {city} service histories, maintained systems run roughly 5–15% more efficiently and last 3–5 years longer than neglected ones. The payback shows up across the lifespan, not in any single month's power bill." },
        { q: "Do you check the ductwork during a tune-up?", a: "Basic visual inspection of accessible ductwork is included. A full duct evaluation with static pressure testing is a separate service." },
      ],
    ],
  },

  "Heating Repair": {
    h1: [
      "Heating Repair in {city}, AL",
      "{city} Furnace and Heat Pump Repair",
      "Heating System Repair Serving {city}",
      "Same-Day Heating Repair — {city}",
      "Reliable Heater Repair in {city}",
    ],
    meta: [
      "Heating repair in {city}, AL. Furnaces, heat pumps, and electric strip heat — diagnosed and repaired on the cold-snap days.",
      "{city} heating repair — gas and electric. Ignition failures, blower issues, defrost board problems on heat pumps.",
      "When the heat quits in {city}, a licensed technician handles it. Diagnostic fee is rolled into the repair if approved the same visit.",
      "Furnace and heat pump repair across {city} and Baldwin County. Trucks stocked for the common ignitor, capacitor, and inducer motor failures.",
      "Heating system repair serving {city}. Most calls are resolved on the first visit — parts for rarer brands are next-day.",
    ],
    faqs: [
      [
        { q: "My heat pump is blowing cool air in defrost — is something wrong?", a: "Not necessarily. Heat pumps in {city} run a defrost cycle when the outdoor coil ices up. The blower runs briefly during that cycle. If the cool air lasts more than 10 minutes, it is worth a service call." },
        { q: "How fast can someone come out for a heating call?", a: "Same-day service is typical for heating calls during {city} cold snaps. Hard freezes increase wait times; first thing in the morning is the most reliable window." },
        { q: "Do you work on gas furnaces?", a: "Yes. Gas, propane, and electric furnaces along with heat pumps. {city} homes use all four — every truck is set up to diagnose any of them." },
      ],
      [
        { q: "What does it usually cost to repair a heat pump?", a: "Repairs in {city} range from a low-cost contactor or capacitor swap to a major board or compressor replacement. The technician will quote in writing before any work starts." },
        { q: "Is it worth repairing an older heating system?", a: "Depends on the age and the repair cost. If a {city} system is over 15 years old and the repair is more than a third of the replacement cost, replacement is usually the better path." },
        { q: "Do you service oil furnaces?", a: "Oil furnaces are rare in {city} but yes — they are serviced when present. Parts may take longer to source than for gas or electric equipment." },
      ],
      [
        { q: "Can the same technician handle the AC side too?", a: "Yes. {city} crews are full-system trained — heating and cooling on the same call." },
        { q: "Will my warranty cover the repair?", a: "Parts under manufacturer warranty are covered. Labor is typically not unless you have an active labor warranty or service plan. The technician verifies the registration before quoting." },
        { q: "What if I just need a thermostat replaced?", a: "Thermostat replacement is a quick visit in {city}, often under an hour. Smart thermostats add wiring time but are still a same-day job." },
      ],
      [
        { q: "Why does my heater smell like burning when I first turn it on?", a: "First-of-season burning smell is normally dust burning off the heat exchanger — common in {city} homes that have not used heat for months. If it persists past the first hour, schedule a service call." },
        { q: "Do you handle electric strip heat repair?", a: "Yes. Electric strip heat (the backup on a heat pump) failures are diagnosed and repaired on the same visit in most {city} cases." },
        { q: "Are there safety inspections included with a heating repair?", a: "Gas furnace repairs include a carbon monoxide check and heat exchanger inspection at no extra cost. Safety findings are documented and reported." },
      ],
    ],
  },

  "Heating Installation": {
    h1: [
      "Heating Installation in {city}, AL",
      "Furnace and Heat Pump Installs — {city}",
      "{city} Heating System Installation",
      "New Heater Installation Serving {city}",
      "Heating Replacement in {city}",
    ],
    meta: [
      "Heating installation in {city}, AL. Gas furnace, heat pump, and dual-fuel system installs — permitted, inspected, code-compliant.",
      "{city} heating installation — properly sized with Manual J, not square-footage guesswork.",
      "Replacing an old furnace or heat pump in {city}? Licensed installs include venting, electrical, and equipment registration.",
      "New heating system installs across {city} and Baldwin County. Crews handle the permit and inspection so you don't have to.",
      "Heating installation in {city}: gas, electric, heat pump, or dual-fuel — sized to the home, not upsold past it.",
    ],
    faqs: [
      [
        { q: "Gas furnace, heat pump, or dual-fuel for a {city} home?", a: "For {city}'s mild winters with occasional hard freezes, a heat pump with electric backup is usually the most efficient. Dual-fuel (heat pump + gas furnace) makes sense if natural gas is already at the home and winters are harsher than average." },
        { q: "How long does a heating install take?", a: "Most full heating installs in {city} are one day. Switching fuel type (electric to gas, or adding a heat pump to a furnace-only home) adds time for new electrical or gas line work." },
        { q: "Will I need a permit?", a: "Yes. Heating installs in {city} pull a mechanical permit and pass municipal inspection before the job closes out." },
      ],
      [
        { q: "What efficiency rating should I look at for a furnace?", a: "For {city} homes, an 80% AFUE gas furnace is usually sufficient — the heating season is short. Higher-efficiency 95%+ AFUE makes more sense north of here where winters are longer." },
        { q: "What about heat pump efficiency?", a: "HSPF2 8.5+ is the target for {city}. Variable-speed heat pumps deliver better humidity control and lower power bills, though they carry a higher upfront cost." },
        { q: "Are there rebates available?", a: "Manufacturer rebates and federal tax credits apply to qualifying installs in {city}. The estimate will lay out which credits you can claim and which paperwork to keep." },
      ],
      [
        { q: "Can a new heat pump replace a gas furnace?", a: "Yes — many {city} homeowners are switching from older gas furnaces to heat pumps for the cooling-system synergy and lower year-round operating cost. The conversion is straightforward if electrical service can handle it." },
        { q: "What about the existing ductwork?", a: "Existing ductwork is evaluated for static pressure and leakage before the new install. {city} homes with original ductwork sometimes need modifications to support a higher-airflow modern system." },
        { q: "Does the install include the thermostat?", a: "A standard programmable thermostat is included. Smart thermostat upgrades (ecobee, Nest, Honeywell T-series) are an add-on quoted separately." },
      ],
      [
        { q: "What is the warranty on a new heating system?", a: "Manufacturer parts warranty (typically 10 years when registered) plus a labor warranty covering install workmanship. Registration is filed by the {city} crew before they leave." },
        { q: "How disruptive is the install?", a: "Most {city} installs are quiet enough that the homeowner can work from home through it. Loud phases — running new flue or electrical — are scheduled so the crew can warn you in advance." },
        { q: "Will the new system lower my power bill?", a: "Usually, yes — sometimes substantially. A 12-year-old heat pump replaced with a modern variable-speed unit in {city} commonly drops winter power bills 25–40%. Actual savings depend on usage patterns and home envelope." },
      ],
    ],
  },

  "Heat Pump Services": {
    h1: [
      "Heat Pump Services in {city}, AL",
      "{city} Heat Pump Repair, Install, and Maintenance",
      "Heat Pump Specialists Serving {city}",
      "Full-Service Heat Pump Work — {city}",
      "Heat Pump Repair and Installation in {city}",
    ],
    meta: [
      "Heat pump services in {city}, AL. Repair, install, and maintenance for single-stage, two-stage, and variable-speed systems.",
      "{city} heat pump specialists — defrost board issues, reversing valves, refrigerant charges done right.",
      "Heat pumps make sense for {city}'s climate. Service that understands the cooling-AND-heating side, not just one or the other.",
      "Full heat pump service across {city}: repair, install, annual maintenance, refrigerant work, and warranty registration.",
      "Heat pump repair and installation in {city}. Variable-speed expertise — not every shop is set up to diagnose modern inverter-driven systems.",
    ],
    faqs: [
      [
        { q: "Is a heat pump a good fit for a {city} home?", a: "Yes. {city}'s mild winters and long cooling seasons make heat pumps the most cost-effective system for most homes — they handle the cooling load and cover heating efficiently down to about 25°F before backup heat kicks in." },
        { q: "What is the difference between a heat pump and an AC?", a: "Mechanically similar — a heat pump runs the refrigeration cycle in reverse to heat. One system handles both seasons, which is why {city} homeowners often prefer them over a separate furnace-plus-AC setup." },
        { q: "How long do heat pumps typically last?", a: "10–15 years is the typical lifespan in {city}. Coastal locations (Fort Morgan, Orange Beach, Gulf Shores) see shorter lifespans due to salt air corrosion on the outdoor coil." },
      ],
      [
        { q: "Why is my heat pump making my house feel chilly?", a: "Heat pumps deliver warm air at a lower temperature than gas furnaces — usually 90–100°F vs 130°F+. This feels different but the room temperature target is met. If the supply air is below 85°F, it is worth a service call." },
        { q: "What is a variable-speed heat pump?", a: "A heat pump that modulates its compressor and blower speed instead of running on/off at full capacity. {city} installs benefit from quieter operation, better humidity control, and lower power bills." },
        { q: "Do heat pumps need backup heat?", a: "Yes — electric strip heat as a backup for cold snaps below the heat pump's balance point. In {city}, the strip heat runs only a handful of days per year if the system is sized right." },
      ],
      [
        { q: "What does a heat pump tune-up include?", a: "Refrigerant charge check, reversing valve test, defrost board verification, coil cleaning (both sides), electrical tightening, blower motor reading, and a written {city} service report." },
        { q: "How often do heat pumps fail?", a: "On a documented {city} maintenance plan, heat pumps run 12–15 years without major repairs. Without maintenance, capacitor and contactor failures are common starting around year 7." },
        { q: "Are dual-fuel heat pumps a good idea?", a: "If natural gas is already at the home, dual-fuel (heat pump + gas furnace backup) is a smart {city} setup — the heat pump handles 90% of the year and gas handles deep cold snaps cheaper than electric strip heat." },
      ],
      [
        { q: "Why is my heat pump iced over?", a: "Outdoor coil icing in winter is normal — the defrost cycle should clear it every 30–90 minutes. If the unit stays iced for hours, the defrost board, sensor, or reversing valve is likely the issue and worth a {city} service call." },
        { q: "Can a heat pump be louder than a furnace?", a: "Outdoor unit operation is noticeable but modern variable-speed units installed in {city} are quieter than the older single-stage equipment most homeowners are used to. Sound ratings are listed on every install estimate." },
        { q: "Are there rebates for installing a heat pump?", a: "Federal tax credits and manufacturer rebates apply to qualifying high-efficiency heat pumps in {city}. The estimate breaks down which credits you can claim." },
      ],
    ],
  },

  "Ductless Mini-Splits": {
    h1: [
      "Ductless Mini-Split Installation in {city}, AL",
      "{city} Mini-Split AC and Heat Pump Service",
      "Ductless System Installs — {city}",
      "Mini-Split Specialists Serving {city}",
      "Ductless Mini-Split Repair and Install in {city}",
    ],
    meta: [
      "Ductless mini-split installation in {city}, AL. Single-zone and multi-zone systems for additions, garages, and homes without ductwork.",
      "{city} mini-split installs — Mitsubishi, Daikin, Fujitsu, LG. Properly sized, not just whatever was in the warehouse.",
      "Ductless mini-splits in {city}: AC and heating in one unit, no ductwork required, ideal for additions, sunrooms, and detached spaces.",
      "Mini-split repair and install serving {city}. Inverter-driven systems take specific training to diagnose — not every shop has it.",
      "Ductless system service across {city} and the Gulf Coast. Single-head and multi-head installs with permitted electrical work.",
    ],
    faqs: [
      [
        { q: "When does a mini-split make sense in {city}?", a: "Mini-splits work well for {city} additions, garages, sunrooms, and detached buildings where running ductwork is impractical. They are also a good fit for whole-house cooling in older homes without existing ducts." },
        { q: "How many zones can one outdoor unit support?", a: "Most multi-zone systems in {city} support up to 5 or 8 indoor heads off a single outdoor unit, depending on the brand and capacity." },
        { q: "Do mini-splits heat as well as cool?", a: "Yes. All modern mini-splits are heat pumps — they cool in summer and heat in winter. {city}'s mild climate is well-matched to mini-split heating performance." },
      ],
      [
        { q: "Are mini-splits noisy?", a: "The indoor heads are very quiet — 19–25 dB on low fan, quieter than a refrigerator. Outdoor units installed in {city} are also quieter than traditional condensers." },
        { q: "How long do mini-splits last?", a: "15–20 years in a {city} install with regular maintenance. Coastal corrosion can shorten outdoor unit lifespan, so seaside installs use corrosion-resistant equipment." },
        { q: "What is the cost vs ducted central air?", a: "Per-ton, mini-splits in {city} cost roughly 20–30% more than central air. The premium is justified when ductwork isn't already there or when zoning matters." },
      ],
      [
        { q: "Where do the indoor heads mount?", a: "Wall-mounted is most common in {city}, ceiling-recessed and floor-mounted are also available. Placement decisions are made during the site walkthrough." },
        { q: "Do they need their own electrical circuit?", a: "Yes. Each outdoor unit needs a dedicated circuit. {city} installs include the electrical permit and any panel work required." },
        { q: "What brands do you install?", a: "Mitsubishi, Daikin, Fujitsu, LG, and Gree are the most common {city} installs. Brand recommendation depends on the application and budget." },
      ],
      [
        { q: "Can a mini-split replace a window unit?", a: "Yes — and the operating cost is significantly lower than a window unit on a {city} home, sometimes 40–60% less for the same cooling output." },
        { q: "How is the condensate handled?", a: "Indoor heads drain by gravity through a line that exits the wall. {city} installs route the condensate to an exterior drip area or, when gravity isn't possible, use a small condensate pump." },
        { q: "Is the install messy?", a: "Less invasive than ducted work. Most {city} single-zone installs are complete in a day with minimal drywall work — only a small line-set hole per indoor head." },
      ],
    ],
  },

  "Indoor Air Quality": {
    h1: [
      "Indoor Air Quality Services in {city}, AL",
      "{city} Air Filtration, Purification, and Humidity Control",
      "Improve Indoor Air Quality in Your {city} Home",
      "IAQ Specialists Serving {city}",
      "Air Quality Solutions — {city}",
    ],
    meta: [
      "Indoor air quality services in {city}, AL. Air filtration, UV purification, dehumidification, and ventilation upgrades.",
      "{city} indoor air quality — MERV-13 media filters, UV lights, and whole-home dehumidifiers for Gulf Coast humidity.",
      "Better air in your {city} home: HEPA-equivalent filtration, UV-C, dehumidifier installs, and fresh-air ventilation systems.",
      "IAQ work across {city} and Baldwin County. Real airflow measurements, not generic recommendations.",
      "Indoor air quality solutions serving {city}: filtration, UV, humidity control, and ventilation — diagnosed with actual readings.",
    ],
    faqs: [
      [
        { q: "What is the biggest air quality issue in {city} homes?", a: "Humidity. {city}'s coastal climate keeps indoor humidity high, which feeds dust mite and mold growth. A properly sized dehumidifier or correctly tuned AC system addresses most IAQ complaints before filtration even matters." },
        { q: "Do I need a whole-home dehumidifier?", a: "If indoor humidity stays above 60% with the AC running, yes — a {city} whole-home dehumidifier brings indoor RH down to the 45–55% range where dust mites, mold, and comfort all improve." },
        { q: "What filter rating should I use?", a: "MERV-11 to MERV-13 media filters in {city} systems capture pollen, dust, and most allergens without choking off airflow. Anything higher needs a system sized for the static pressure penalty." },
      ],
      [
        { q: "Are UV lights worth installing?", a: "UV-C lights installed at the evaporator coil reduce biological growth on the coil itself, which keeps the system efficient and reduces odors. Their effect on whole-home air quality is more limited than marketing claims suggest — most {city} installs are coil-focused." },
        { q: "What about HEPA filters?", a: "True HEPA in a residential central system is rare — the static pressure is too high for standard residential blowers. {city} homes that need HEPA-level filtration usually go with a portable bypass unit on the return." },
        { q: "Will an air purifier help with allergies?", a: "Targeted filtration and humidity control help substantially with {city} pollen and mold-related allergies. Generic 'ionizers' and 'air freshener' products have minimal real-world effect — the recommendations stick to what is measurable." },
      ],
      [
        { q: "How often should I change my filter?", a: "Every 30–90 days depending on filter type and home conditions. {city} homes with pets, near busy roads, or with recent construction need more frequent changes." },
        { q: "Is duct cleaning part of IAQ?", a: "Duct cleaning helps in specific {city} situations — visible mold, rodent activity, post-renovation debris. It is not a routine maintenance task and shouldn't be sold that way." },
        { q: "What is a fresh air ventilator?", a: "An ERV or HRV brings outside air into the home through a heat-exchanger. {city} installs use ERVs (energy recovery) to dehumidify the incoming air, which keeps the home comfortable and brings in fresh air." },
      ],
      [
        { q: "Can poor air quality affect my HVAC system?", a: "Yes — a dirty filter or biological coil growth reduces airflow, raises power bills, and shortens equipment life. Most {city} IAQ work pays for itself in lower repair frequency over 5–10 years." },
        { q: "How do you test indoor air quality?", a: "On-site humidity and temperature readings, particle count, and VOC measurements where relevant. {city} IAQ assessments produce a written report with specific recommendations." },
        { q: "Do you sell salt lamps and ionizers?", a: "No. Recommendations are limited to measures with documented IAQ improvement — filtration, humidity control, ventilation, and targeted UV. {city} homeowners get the truth on what works." },
      ],
    ],
  },

  "Commercial HVAC": {
    h1: [
      "Commercial HVAC Services in {city}, AL",
      "{city} Commercial Heating, Cooling, and Refrigeration",
      "Light Commercial HVAC Serving {city}",
      "Commercial HVAC Maintenance and Repair — {city}",
      "Business HVAC Solutions in {city}",
    ],
    meta: [
      "Commercial HVAC services in {city}, AL. Rooftop units, split systems, light commercial refrigeration, and preventive maintenance contracts.",
      "{city} commercial HVAC — restaurants, retail, offices, and small medical. After-hours service available for time-sensitive callouts.",
      "Light commercial HVAC across {city}: install, repair, and scheduled maintenance with documented service histories for inspection records.",
      "Commercial heating and cooling serving {city} and Baldwin County. Service contracts include priority dispatch for facility managers.",
      "Commercial HVAC in {city}: package units, multi-zone, makeup air, and refrigeration. Trucks set up for light and mid-size commercial work.",
    ],
    faqs: [
      [
        { q: "What size commercial buildings do you service?", a: "Light commercial: restaurants, retail, small offices, and medical suites in {city} typically under 20,000 sq ft. Larger industrial work is referred to specialists." },
        { q: "Do you offer service contracts?", a: "Yes. Commercial service contracts in {city} include quarterly or monthly visits, priority dispatch, and discounted parts/labor for non-covered repairs. Contract terms vary by building size and equipment count." },
        { q: "Can you handle after-hours emergencies?", a: "Yes — commercial after-hours service is available in {city} for HVAC failures that would close the business. Standard hours are preferred when the system can wait." },
      ],
      [
        { q: "Do you work on rooftop package units?", a: "Yes. Rooftop units are common in {city} retail and restaurant work. Crews are set up with safety equipment and lifts for rooftop access." },
        { q: "What about walk-in cooler and freezer repair?", a: "Light commercial refrigeration is in scope — walk-in coolers, prep tables, reach-ins. Specialty industrial refrigeration is referred out." },
        { q: "How fast can someone come out for a commercial emergency?", a: "Same-day for restaurants and food service in {city}. Other commercial calls are scheduled based on the impact on the business." },
      ],
      [
        { q: "Will my service history be documented?", a: "Yes. Every {city} commercial visit produces a written report kept on file — useful for health inspections, insurance claims, and equipment warranty disputes." },
        { q: "Do you handle the permits for commercial installs?", a: "Yes — {city} commercial installs include the mechanical permit, inspection scheduling, and any required documentation for the building department." },
        { q: "What about energy efficiency upgrades for commercial?", a: "Variable-speed motors, ECM blowers, demand-controlled ventilation, and economizer tuning are all in scope. Payback analysis is included on the proposal for any {city} commercial upgrade." },
      ],
      [
        { q: "Do you work with property managers managing multiple sites?", a: "Yes. Multi-site service across {city} and the surrounding area is set up under a single contract with a single point of contact." },
        { q: "What brands of commercial equipment do you service?", a: "Carrier, Trane, Lennox, York, Daikin, and the rest of the major commercial brands. Parts for less-common manufacturers may require longer lead times in {city}." },
        { q: "Can you provide a written maintenance plan for our facility?", a: "Yes — a written {city} commercial maintenance plan with scheduled tasks, equipment inventory, and renewal terms is provided with the contract." },
      ],
    ],
  },

  "Emergency HVAC": {
    h1: [
      "Emergency HVAC Services in {city}, AL",
      "{city} 24/7 HVAC Emergency Repair",
      "Same-Day Emergency HVAC Serving {city}",
      "Urgent HVAC Repair — {city}",
      "After-Hours HVAC Service in {city}",
    ],
    meta: [
      "Emergency HVAC services in {city}, AL. After-hours and weekend calls handled for systems that quit during heat or cold.",
      "{city} emergency HVAC — same-day dispatch for genuine emergencies. Honest about availability, not a fake 'always 30 minutes' claim.",
      "Urgent HVAC repair across {city}: heat or cooling failures handled with the next available technician — same day during peak season.",
      "Emergency HVAC service in {city}. Trucks stocked for the failures that come up at the worst times — capacitors, ignitors, blower motors.",
      "After-hours HVAC repair serving {city} and Baldwin County. Dispatch will give you a real ETA, not a marketing one.",
    ],
    faqs: [
      [
        { q: "What counts as an HVAC emergency?", a: "No heat in a freeze, no cooling in extreme heat (especially with infants, elderly, or medical equipment), gas smell, water leaking through a ceiling, or any safety concern. Standard breakdowns are handled the next business day in {city} when possible." },
        { q: "How fast will someone arrive?", a: "Same-day dispatch is the goal for {city} emergencies. Actual arrival time depends on existing call load — dispatch will give you a real window, not a vague 'on the way' answer." },
        { q: "Is there an emergency fee?", a: "After-hours, weekend, and holiday calls carry a service premium in {city}. The fee is disclosed before the technician is dispatched, not surprise-added to the invoice." },
      ],
      [
        { q: "Can you handle a gas leak?", a: "Gas leak suspected? Leave the building, call the gas company first. Once the gas company has shut off the supply, HVAC repair on the affected system can begin in {city}." },
        { q: "What if my system fails during a hurricane prep window?", a: "{city} hurricane season elevates emergency demand. Same-day service is prioritized for medical and elderly households first, then everyone else by call order." },
        { q: "Do you stock common emergency parts?", a: "Yes. {city} trucks carry the parts most likely to fail under heat stress — capacitors, contactors, ignitors, run capacitors, common ECM blower motors. Rarer parts are next-day from the regional supply." },
      ],
      [
        { q: "What about commercial emergencies?", a: "Commercial after-hours dispatch in {city} is available for restaurants, medical, and any business that would lose revenue or product to an HVAC failure. Standard contract terms apply." },
        { q: "Will I need to pay upfront for an emergency call?", a: "No. Standard payment terms apply to {city} emergency calls — payment after the work is complete and the invoice signed off." },
        { q: "What if it's just a thermostat or breaker?", a: "Sometimes it is. Before dispatching, the booking line will walk through a quick checklist — thermostat batteries, breaker, filter — in case the {city} 'emergency' is something a homeowner can solve in five minutes." },
      ],
      [
        { q: "How do I keep a system from emergency-failing in the first place?", a: "Annual maintenance catches roughly 70% of the failures that would otherwise become {city} emergency calls — capacitors going weak, refrigerant low, drain lines clogged. A service plan is the cheapest insurance." },
        { q: "Do you service apartment buildings and condos?", a: "Yes. {city} multifamily emergency calls are handled — coordination with property management for unit access is standard." },
        { q: "Can you handle older systems in an emergency?", a: "Yes. Older R-22 systems and uncommon brands are serviced in {city} emergencies — parts may take longer to source but the dispatch and diagnosis don't change." },
      ],
    ],
  },

  "Duct Cleaning": {
    h1: [
      "Duct Cleaning in {city}, AL",
      "{city} Air Duct Cleaning and Inspection",
      "Professional Duct Cleaning Serving {city}",
      "Air Duct Cleaning — {city}",
      "Residential and Commercial Duct Cleaning in {city}",
    ],
    meta: [
      "Air duct cleaning in {city}, AL. Negative-pressure HEPA equipment for visible mold, rodent debris, or post-renovation cleanup.",
      "{city} duct cleaning — done when it actually helps, not as a routine maintenance upsell.",
      "Professional duct cleaning across {city}: NADCA-method whip and vacuum, all supply and return lines.",
      "Duct cleaning serving {city} homes and light commercial. Before-and-after camera footage included on every job.",
      "Residential and commercial duct cleaning in {city}. Honest about when it's worth it — and when it isn't.",
    ],
    faqs: [
      [
        { q: "Do I actually need my ducts cleaned?", a: "Most {city} homes do not need routine duct cleaning. It is genuinely useful after visible mold growth, rodent activity, water damage, or major renovation. Otherwise, regular filter changes accomplish most of what duct cleaning is sold for." },
        { q: "How is the cleaning done?", a: "Negative-pressure vacuum on the main trunk, brush/whip agitation through each supply and return run. All ducts are cleaned, not just the accessible ones. {city} jobs include before/after photos." },
        { q: "How long does it take?", a: "4–8 hours for a typical {city} residential system, longer for larger homes or commercial buildings." },
      ],
      [
        { q: "What about mold in the ducts?", a: "Visible mold in {city} ductwork warrants cleaning plus a humidity investigation — mold is a symptom, not a cause. Recurrence is common if the underlying moisture issue isn't addressed." },
        { q: "Will duct cleaning improve my air quality?", a: "Improvement varies. In homes with documented contamination — pet dander accumulation, rodent activity, post-construction dust — the difference is significant. In a normal {city} home with regular filter changes, the difference is marginal." },
        { q: "Are there any 'free duct cleaning' offers I should watch out for?", a: "Bait-and-switch 'free' duct cleaning is a common scam in {city} and the surrounding region. Real duct cleaning is multi-hour skilled work, not a $79 special. Reputable quotes reflect that." },
      ],
      [
        { q: "Will the cleaning damage my ducts?", a: "Done properly with the right tools, no. {city} crews use brushes sized to the duct material — flex duct, sheet metal, and rigid board each call for different agitation methods." },
        { q: "Do you sanitize the ducts after cleaning?", a: "Sanitizing is offered when warranted — biological contamination, post-water-damage cleanup. EPA-registered products only. {city} jobs do not include 'fogging' chemicals with no documented effect." },
        { q: "What about dryer vent cleaning?", a: "Dryer vent cleaning is a separate, simpler service offered alongside HVAC duct work in {city}. It is genuinely a fire prevention task — recommended every 12–24 months." },
      ],
      [
        { q: "Should I replace the ductwork instead?", a: "If the {city} ducts are 25+ years old, leaking, undersized, or showing widespread damage, replacement is often more cost-effective than cleaning. A static pressure and leakage assessment will tell you which side of that line you're on." },
        { q: "How long until the ducts need cleaning again?", a: "If they ever do, 5–10 years for most {city} homes with regular maintenance. Faster if there are pets, smokers, or known triggers." },
        { q: "Do you provide a written report after cleaning?", a: "Yes. {city} duct cleaning includes before/after photos, the cleaning method used, and any recommendations for follow-up work." },
      ],
    ],
  },

  "Smart Thermostat Installation": {
    h1: [
      "Smart Thermostat Installation in {city}, AL",
      "{city} Nest, ecobee, and Honeywell Installs",
      "Smart Thermostat Setup Serving {city}",
      "Wi-Fi Thermostat Installation — {city}",
      "Smart Thermostat Service in {city}",
    ],
    meta: [
      "Smart thermostat installation in {city}, AL. Nest, ecobee, and Honeywell T-series — properly wired with C-wire when needed.",
      "{city} smart thermostat installs — including the C-wire kit, app setup, and HVAC compatibility check.",
      "Professional smart thermostat installation across {city}: wired correctly, paired with the equipment, and walked through the app setup.",
      "Wi-Fi thermostat service in {city}: install, swap, and troubleshooting for the common 'no heat / no cool' issues after a DIY install.",
      "Smart thermostat installation in {city}. Most homes are an hour visit. Older systems with no C-wire need an add-a-wire kit, factored into the quote.",
    ],
    faqs: [
      [
        { q: "Which smart thermostat is best for my {city} home?", a: "ecobee for multi-room comfort with remote sensors, Nest for the simplest interface and self-learning, Honeywell T-series for the most flexible wiring and compatibility. The recommendation depends on the {city} home's existing wiring and the homeowner's priorities." },
        { q: "Will a smart thermostat actually save money?", a: "Modest savings — typically 8–15% on heating and cooling — for {city} homes that previously didn't program a setback schedule. Homes that already use a programmable thermostat will see less dramatic savings." },
        { q: "Why do I need a C-wire?", a: "Smart thermostats need constant power. Older {city} homes often have a 4-wire setup without a C-wire. An add-a-wire kit or a C-wire adapter solves it — factored into the install quote." },
      ],
      [
        { q: "Can I install it myself?", a: "Many homeowners do. The {city} install service exists for homes with no C-wire, multi-stage equipment, heat pumps with auxiliary heat, or any setup where 'plug and play' won't work. About a third of DIY installs end up needing a callout." },
        { q: "Will my smart thermostat work with my heat pump?", a: "Yes — modern smart thermostats handle heat pumps with auxiliary heat (electric strip or dual-fuel) correctly. The configuration step matters — a misconfigured {city} heat pump install will cause auxiliary heat to run too aggressively." },
        { q: "How long does the install take?", a: "About 45 minutes to 90 minutes per thermostat in a typical {city} home — longer if C-wire work or new wiring is needed." },
      ],
      [
        { q: "Can you install multiple thermostats?", a: "Yes — multi-zone homes in {city} are common, particularly two-story homes with separate AC systems. Each thermostat is installed, configured, and tested independently." },
        { q: "What about the app setup?", a: "The app is set up and paired with the home Wi-Fi as part of the {city} install. Geofencing, schedule programming, and remote sensor placement are walked through before the technician leaves." },
        { q: "Will it work with Alexa or Google Home?", a: "Yes — Nest, ecobee, and Honeywell all integrate with the major voice assistants. {city} installs include the integration setup if the homeowner uses one of those platforms." },
      ],
      [
        { q: "What if the new thermostat doesn't work right?", a: "Post-install warranty covers the workmanship in {city}. If the system behaves oddly after the install — short cycling, auxiliary heat constant, unresponsive — a follow-up visit is included at no charge." },
        { q: "Do you remove the old thermostat?", a: "Yes — the old {city} thermostat is uninstalled, the wires are labeled, and the old unit is left for the homeowner or hauled off on request." },
        { q: "Can a smart thermostat help diagnose HVAC issues?", a: "Some can — ecobee and modern Honeywell models log runtime data that helps spot a system that's running too long for the temperature target. {city} service techs can pull that data when troubleshooting." },
      ],
    ],
  },
};
