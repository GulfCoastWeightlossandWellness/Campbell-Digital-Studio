/**
 * Home-page FAQ data.
 *
 * Source for both the visible accordion section and the FAQPage JSON-LD
 * schema rendered alongside it (rich-result eligible).
 *
 * Edit answers freely — but verify policy/pricing details remain accurate
 * if the studio's positioning changes.
 */

export type FAQItem = {
  question: string;
  answer: string;
};

export const faqs: FAQItem[] = [
  {
    question: "How is this different from a Wix or Squarespace site?",
    answer:
      "Templates put half your time into design choices and half into the same SEO, schema, and conversion architecture every other template-built site has. A custom build skips the design choices — I make those — and puts the entire effort into the structural decisions (service pages, city pages, schema, internal linking, booking flows) that actually move rankings and conversions. The design quality is at least as good. The infrastructure underneath is in a different category.",
  },
  {
    question: "Why are you priced where you are?",
    answer:
      "There's no project manager, account director, or junior designer between you and the work. I do the strategy, the architecture, the copy, and the build. The output is agency-grade. The price reflects what it costs me to deliver, not what an agency has to charge to keep its lights on.",
  },
  {
    question: "How is your time split between medicine and the studio?",
    answer:
      "A focused practice with two to three engagements at a time, not twenty. I take fewer projects, charge what they're worth, and deliver them on a clear timeline. If an engagement won't fit my bandwidth, I'll tell you up front before we sign anything.",
  },
  {
    question: "How long does a build take?",
    answer:
      "Most engagements run 4–12 weeks from kickoff to launch, depending on scope. Multi-location practice ecosystems and large programmatic SEO platforms run on the longer end. The cadence flexes around the client's content readiness — we won't launch a service page that doesn't have real copy.",
  },
  {
    question: "Who owns the website when it's done?",
    answer:
      "You do. Code lives in a GitHub repository I hand over. Hosting is on Vercel (or any platform you prefer). No platform lock-in, no monthly subscription dependency, no design system that requires me to come back every time you want a change. You can update copy yourself, hand it to another developer, or call me back — your call.",
  },
  {
    question: "Do you offer ongoing maintenance or SEO?",
    answer:
      "Yes — but only as a separate retainer, not bundled into the build. Most clients don't need it. The ones who do (clients running active local SEO campaigns or content engines) sign a monthly retainer that covers content publishing, SEO monitoring, and quarterly strategy.",
  },
  {
    question: "Will my Google rankings survive a rebuild?",
    answer:
      "Yes, with the right migration. A proper rebuild includes a 301 redirect map for every existing URL, a content audit to preserve link equity, and a launch sequence designed to minimize the indexing gap. Rankings typically recover within a few weeks of launch and often improve from there.",
  },
  {
    question: "What if I'm not sure what I need?",
    answer:
      "That's the most common starting point. Send me your current site (or a paragraph on what's currently in place), what you're trying to accomplish, an approximate budget range, and a timeline. I'll send back honest notes on whether the studio is the right fit and what a useful next step would look like.",
  },
];
