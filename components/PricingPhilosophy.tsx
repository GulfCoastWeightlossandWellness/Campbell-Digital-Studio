import Link from "next/link";

const tiers = [
  {
    icon: "🏢",
    label: "Agency Rate",
    range: "$8K – $200K+",
    color: "#7db0ff",
    border: "rgba(79,142,247,0.2)",
    bg: "rgba(79,142,247,0.05)",
    who: "Full agency team: strategist, copywriter, designer, developer, QA, account manager.",
    what: "Multi-month engagements, detailed contracts, revision cycles, and managed delivery.",
    tradeoff: "High quality, high overhead. Most small businesses simply cannot afford entry.",
  },
  {
    icon: "👨‍💻",
    label: "Senior Dev Rate",
    range: "$2.5K – $85K",
    color: "#a78bfa",
    border: "rgba(167,139,250,0.2)",
    bg: "rgba(167,139,250,0.05)",
    who: "An experienced solo developer or specialist with a proven track record and niche expertise.",
    what: "Agency-quality output, faster timelines, lower overhead. Fewer revision rounds.",
    tradeoff: "Hard to find in specialized fields like healthcare. Rare combination of technical depth + domain knowledge.",
  },
  {
    icon: "💼",
    label: "Generalist Rate",
    range: "$400 – $15K",
    color: "#6ee7b7",
    border: "rgba(110,231,183,0.2)",
    bg: "rgba(110,231,183,0.05)",
    who: "A template-first developer on Upwork, Fiverr, or a local freelancer marketplace.",
    what: "Fast, cheap, and often looks passable on the surface.",
    tradeoff: "No clinical knowledge, no SEO architecture, no service page strategy. Looks similar, performs completely differently.",
  },
];

const gapPoints = [
  "A primary care clinic owner works 50+ hours a week seeing patients. Their annual revenue is $400K–$700K and their marketing budget — if they have one at all — is 2–5% of that.",
  "A barbershop owner or HVAC company doesn't have a CFO or a marketing team. They have a phone and a set of skills. Spending $40,000 on a website is simply not a conversation they can have.",
  "The clients who most need high-quality, conversion-focused web work are the exact clients who can't access it at market rates. That gap is real and large.",
  "Campbell Digital Studio fills that gap — delivering agency-grade architecture at a price point that makes business sense for local and medical practices.",
];

export default function PricingPhilosophy() {
  return (
    <section style={{ padding: "5rem 1.5rem", background: "#030810" }}>
      <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
        {/* Header */}
        <div style={{ maxWidth: "680px", marginBottom: "3.5rem" }}>
          <p style={{ fontFamily: "'DM Mono', monospace", fontSize: "0.65rem", letterSpacing: "0.14em", textTransform: "uppercase", color: "#7db0ff", marginBottom: "0.75rem" }}>
            Market Valuation
          </p>
          <div style={{ width: "48px", height: "2px", background: "linear-gradient(90deg, #4f8ef7, transparent)", marginBottom: "1rem" }} />
          <h2
            style={{
              fontFamily: "'Plus Jakarta Sans', system-ui, sans-serif",
              fontSize: "clamp(1.75rem, 4vw, 2.6rem)",
              fontWeight: 800,
              color: "#f0f4fc",
              lineHeight: 1.1,
              letterSpacing: "-0.025em",
              marginBottom: "1rem",
            }}
          >
            What this work is actually worth on the open market.
          </h2>
          <p style={{ fontFamily: "'DM Sans', system-ui, sans-serif", fontSize: "1rem", color: "#94a3b8", lineHeight: 1.75 }}>
            Every project in this portfolio carries a real market price. Here is what those three tiers look like — and why most small businesses can&apos;t access them.
          </p>
        </div>

        {/* Three tier cards */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "1rem", marginBottom: "3.5rem" }}>
          {tiers.map((tier) => (
            <div
              key={tier.label}
              style={{
                background: tier.bg,
                border: `1px solid ${tier.border}`,
                borderRadius: "14px",
                padding: "1.75rem",
              }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: "0.6rem", marginBottom: "0.75rem" }}>
                <span style={{ fontSize: "1.25rem" }}>{tier.icon}</span>
                <div>
                  <p style={{ fontFamily: "'DM Mono', monospace", fontSize: "0.62rem", letterSpacing: "0.1em", textTransform: "uppercase", color: tier.color, margin: 0 }}>
                    {tier.label}
                  </p>
                  <p style={{ fontFamily: "'Plus Jakarta Sans', system-ui, sans-serif", fontSize: "1.3rem", fontWeight: 800, color: "#f0f4fc", margin: 0, letterSpacing: "-0.02em" }}>
                    {tier.range}
                  </p>
                </div>
              </div>

              <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
                <div>
                  <p style={{ fontFamily: "'DM Mono', monospace", fontSize: "0.58rem", letterSpacing: "0.08em", textTransform: "uppercase", color: "#334155", marginBottom: "0.25rem" }}>Who</p>
                  <p style={{ fontFamily: "'DM Sans', system-ui, sans-serif", fontSize: "0.82rem", color: "#94a3b8", lineHeight: 1.6, margin: 0 }}>{tier.who}</p>
                </div>
                <div>
                  <p style={{ fontFamily: "'DM Mono', monospace", fontSize: "0.58rem", letterSpacing: "0.08em", textTransform: "uppercase", color: "#334155", marginBottom: "0.25rem" }}>What you get</p>
                  <p style={{ fontFamily: "'DM Sans', system-ui, sans-serif", fontSize: "0.82rem", color: "#94a3b8", lineHeight: 1.6, margin: 0 }}>{tier.what}</p>
                </div>
                <div style={{ borderTop: `1px solid ${tier.border}`, paddingTop: "0.75rem" }}>
                  <p style={{ fontFamily: "'DM Sans', system-ui, sans-serif", fontSize: "0.8rem", color: tier.color, lineHeight: 1.55, margin: 0, fontStyle: "italic" }}>
                    &ldquo;{tier.tradeoff}&rdquo;
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* The Gap section */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "4rem", alignItems: "start" }} className="grid-2">
          <div>
            <p style={{ fontFamily: "'DM Mono', monospace", fontSize: "0.63rem", letterSpacing: "0.12em", textTransform: "uppercase", color: "#d4a853", marginBottom: "0.75rem" }}>
              The Gap
            </p>
            <div style={{ width: "48px", height: "2px", background: "linear-gradient(90deg, #d4a853, transparent)", marginBottom: "1rem" }} />
            <h3
              style={{
                fontFamily: "'Plus Jakarta Sans', system-ui, sans-serif",
                fontSize: "clamp(1.4rem, 3vw, 2rem)",
                fontWeight: 800,
                color: "#f0f4fc",
                lineHeight: 1.15,
                letterSpacing: "-0.02em",
                marginBottom: "1rem",
              }}
            >
              Market rates are real. Budgets are not.
            </h3>
            <p style={{ fontFamily: "'DM Sans', system-ui, sans-serif", fontSize: "0.95rem", color: "#94a3b8", lineHeight: 1.8 }}>
              The pricing on these projects reflects real market value — what agencies charge and what the level of work genuinely warrants. But the businesses that most need this kind of website work are the exact businesses that can&apos;t afford it at those rates.
            </p>
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
            {gapPoints.map((point, i) => (
              <div
                key={i}
                style={{
                  display: "flex",
                  gap: "0.9rem",
                  padding: "0.9rem 1rem",
                  background: i === 3
                    ? "rgba(79,142,247,0.06)"
                    : "#0d1728",
                  borderRadius: "9px",
                  border: i === 3
                    ? "1px solid rgba(79,142,247,0.2)"
                    : "1px solid rgba(255,255,255,0.05)",
                }}
              >
                <span style={{ fontFamily: "'DM Mono', monospace", fontSize: "0.65rem", color: i === 3 ? "#7db0ff" : "#475569", flexShrink: 0, marginTop: "0.1rem" }}>
                  {i === 3 ? "→" : String(i + 1).padStart(2, "0")}
                </span>
                <p style={{ fontFamily: "'DM Sans', system-ui, sans-serif", fontSize: "0.85rem", color: i === 3 ? "#94a3b8" : "#64748b", margin: 0, lineHeight: 1.65 }}>
                  {point}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* CTA link to work page */}
        <div style={{ textAlign: "center", marginTop: "3rem" }}>
          <Link
            href="/work"
            style={{
              fontFamily: "'DM Sans', system-ui, sans-serif",
              fontSize: "0.875rem",
              color: "#7db0ff",
              textDecoration: "none",
              display: "inline-flex",
              alignItems: "center",
              gap: "0.4rem",
            }}
          >
            See full project valuations on the work page →
          </Link>
        </div>
      </div>
    </section>
  );
}
