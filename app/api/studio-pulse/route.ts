import { promises as fs } from "node:fs";
import path from "node:path";

/**
 * Studio Pulse — Operator's Ledger data endpoint.
 *
 * Reads `data/ledger.json` from disk, computes a fresh `last_deploy`
 * relative time from `last_updated`, and serves the result as JSON.
 *
 * ISR: revalidated hourly. The Mac mini cron rewrites `ledger.json`
 * nightly; this handler is fast, file-system only, no network calls.
 *
 * Shape returned:
 *   {
 *     sites_shipped: number,
 *     lighthouse_score: string,   // e.g. "100/100"
 *     last_deploy: string,        // computed: "2h ago" / "1d ago"
 *     active_retainers: number,
 *     uptime: string,             // e.g. "99.99%"
 *     live: boolean,
 *     last_updated: string        // ISO 8601, untouched from source
 *   }
 */

export const revalidate = 3600;

export type LedgerData = {
  sites_shipped: number;
  lighthouse_score: string;
  last_deploy: string;
  active_retainers: number;
  uptime: string;
  live: boolean;
  last_updated: string;
};

type LedgerSource = Omit<LedgerData, "last_deploy"> & { last_deploy?: string };

function timeAgo(iso: string, now: Date = new Date()): string {
  const then = new Date(iso).getTime();
  if (Number.isNaN(then)) return "—";
  const diffMs = now.getTime() - then;
  const seconds = Math.max(0, Math.floor(diffMs / 1000));
  if (seconds < 60) return "just now";
  const minutes = Math.floor(seconds / 60);
  if (minutes < 60) return `${minutes}m ago`;
  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `${hours}h ago`;
  const days = Math.floor(hours / 24);
  if (days < 30) return `${days}d ago`;
  const months = Math.floor(days / 30);
  if (months < 12) return `${months}mo ago`;
  const years = Math.floor(days / 365);
  return `${years}y ago`;
}

export async function readLedger(): Promise<LedgerData> {
  const filePath = path.join(process.cwd(), "data", "ledger.json");
  const raw = await fs.readFile(filePath, "utf8");
  const parsed = JSON.parse(raw) as LedgerSource;
  return {
    sites_shipped: parsed.sites_shipped,
    lighthouse_score: parsed.lighthouse_score,
    last_deploy: timeAgo(parsed.last_updated),
    active_retainers: parsed.active_retainers,
    uptime: parsed.uptime,
    live: parsed.live,
    last_updated: parsed.last_updated,
  };
}

export async function GET() {
  const data = await readLedger();
  return Response.json(data);
}
