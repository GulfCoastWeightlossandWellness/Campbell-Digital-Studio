/**
 * Live lead counter — social proof for the Operator's Ledger.
 *
 * Counts EVERY row in the Pro 1 Supabase `leads` table over a trailing
 * window. No `form_type` filter, so AI Color Visualizer submissions are
 * counted as leads right alongside contact / quote / schedule / emergency /
 * membership form fills — exactly one row per submission.
 *
 * Source: Pro 1's Supabase (currently the only live lead store on the fleet).
 * Read over the REST API with `count=exact` + a head range, so only the count
 * header comes back — zero rows transferred.
 *
 * Env (set on CDS Vercel; values are Pro 1's own Supabase creds):
 *   LEADS_SUPABASE_URL         = Pro 1 SUPABASE_URL
 *   LEADS_SUPABASE_SECRET_KEY  = Pro 1 SUPABASE_SECRET_KEY  (service role)
 *   LEAD_STATS_MIN  (optional) = floor below which the ledger hides the cell
 *
 * Never throws. An unconfigured or unreachable store returns
 * { configured: false, count: 0 } so the ledger renders cleanly regardless.
 * Server-only by construction — only imported by a server component and a
 * route handler, so the secret key never reaches the browser.
 */

export type LeadStats = {
  count: number;
  days: number;
  configured: boolean;
};

export async function getLeadStats(days = 30): Promise<LeadStats> {
  const url = process.env.LEADS_SUPABASE_URL?.replace(/\/$/, "");
  const key = process.env.LEADS_SUPABASE_SECRET_KEY;
  if (!url || !key) return { count: 0, days, configured: false };

  const since = new Date(Date.now() - days * 24 * 60 * 60 * 1000).toISOString();

  try {
    const res = await fetch(
      `${url}/rest/v1/leads?select=id&created_at=gte.${encodeURIComponent(since)}`,
      {
        headers: {
          apikey: key,
          Authorization: `Bearer ${key}`,
          Prefer: "count=exact",
          Range: "0-0",
        },
        // ISR — count is cached an hour, matching the ledger cadence. Avoids a
        // network round-trip on every page render (the ledger sits in the footer).
        next: { revalidate: 3600 },
      }
    );
    if (!res.ok) return { count: 0, days, configured: false };
    // content-range: "0-0/<total>" — the total is what we want.
    const total = Number((res.headers.get("content-range") ?? "").split("/")[1]);
    if (!Number.isFinite(total)) return { count: 0, days, configured: false };
    return { count: total, days, configured: true };
  } catch {
    return { count: 0, days, configured: false };
  }
}

/** Floor below which the ledger omits the Forms cell. Default 1 (show on first lead). */
export function leadStatsFloor(): number {
  const n = Number(process.env.LEAD_STATS_MIN);
  return Number.isFinite(n) && n >= 0 ? n : 1;
}
