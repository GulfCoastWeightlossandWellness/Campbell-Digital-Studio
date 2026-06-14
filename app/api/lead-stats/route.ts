import { getLeadStats } from "@/lib/lead-stats";

/**
 * Lead-stats endpoint — trailing-window count of every lead captured across
 * the fleet's live store (Pro 1 Supabase), AI Color Visualizer included.
 * Powers the Operator's Ledger "Forms" cell; also handy for a quick sanity
 * curl. ISR-cached hourly to match the ledger.
 */

export const revalidate = 3600;

export async function GET() {
  const stats = await getLeadStats(30);
  return Response.json(stats);
}
