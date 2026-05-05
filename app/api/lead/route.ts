import { NextResponse } from "next/server";
import { siteConfig } from "@/lib/site-config";

/**
 * Lead capture endpoint for the footer email form (and lead magnet form, when added).
 *
 * Behavior:
 *  - With RESEND_API_KEY set, sends a notification email to LEAD_NOTIFY_EMAIL
 *    (defaults to siteConfig.email).
 *  - Without RESEND_API_KEY, logs the lead to the server console and returns 200
 *    so the user-facing form still confirms a successful capture. Peyton can
 *    grep server logs until a real email service is wired up.
 *
 * Inputs (JSON body):
 *   { email: string; note?: string; source?: string }
 *
 * Source values currently in use:
 *   "footer"          — footer email capture
 *   "playbook"        — lead magnet (when added)
 */

type LeadBody = { email?: unknown; note?: unknown; source?: unknown };

function isValidEmail(email: string): boolean {
  // RFC-5322 lite: anything containing "@" with a dot in the host portion
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

export async function POST(req: Request) {
  let body: LeadBody;
  try {
    body = (await req.json()) as LeadBody;
  } catch {
    return NextResponse.json({ error: "Invalid JSON body" }, { status: 400 });
  }

  const email = typeof body.email === "string" ? body.email.trim() : "";
  const note = typeof body.note === "string" ? body.note.trim().slice(0, 500) : "";
  const source =
    typeof body.source === "string" ? body.source.trim().slice(0, 60) : "unknown";

  if (!email || !isValidEmail(email)) {
    return NextResponse.json({ error: "Valid email required" }, { status: 400 });
  }

  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.LEAD_NOTIFY_EMAIL ?? siteConfig.email;

  // Server-console fallback so leads aren't lost during the pre-Resend phase
  console.info(
    `[lead] source=${source} email=${email} note=${note ? JSON.stringify(note) : "—"}`,
  );

  if (!apiKey) {
    return NextResponse.json({ ok: true, delivered: false }, { status: 200 });
  }

  try {
    const r = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        // Resend requires from to be a verified domain. Keep configurable.
        from: process.env.LEAD_FROM_EMAIL ?? `Studio <onboarding@resend.dev>`,
        to: [to],
        reply_to: email,
        subject: `New lead — ${source}`,
        text: [
          `Source: ${source}`,
          `Email:  ${email}`,
          note ? `Note:   ${note}` : null,
          "",
          `(Auto-sent from ${siteConfig.url})`,
        ]
          .filter(Boolean)
          .join("\n"),
      }),
    });
    if (!r.ok) {
      const detail = await r.text().catch(() => "");
      console.error("[lead] Resend non-OK", r.status, detail);
      // Still report success to the user — the lead is in the server logs
      return NextResponse.json({ ok: true, delivered: false }, { status: 200 });
    }
    return NextResponse.json({ ok: true, delivered: true }, { status: 200 });
  } catch (err) {
    console.error("[lead] Resend request failed", err);
    return NextResponse.json({ ok: true, delivered: false }, { status: 200 });
  }
}
