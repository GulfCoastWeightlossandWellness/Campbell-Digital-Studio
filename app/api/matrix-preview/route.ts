/**
 * Live Matrix Generator — Edge endpoint
 *
 * POST `/api/matrix-preview` with `{ city, service }` JSON body.
 * Returns the deterministic preview object from `lib/matrix/generate.ts`.
 *
 * Runs on the Edge runtime (geographically close to the user). Targets a
 * sub-50ms cold response and a sub-10ms warm response, well under the
 * 400ms perceived-budget for the demo on the homepage.
 *
 * Caching: `Cache-Control: public, s-maxage=86400, stale-while-revalidate=604800`
 * — same city/service tuple resolves to the same content forever (the
 * templater is deterministic), so the CDN can serve repeated requests
 * without ever hitting the function. Target cache hit ratio: 80%+.
 */

import { generatePreview } from "@/lib/matrix/generate";
import { CITIES, SERVICES } from "@/lib/matrix/corpus";

export const runtime = "edge";

type Body = { city?: unknown; service?: unknown };

export async function POST(req: Request): Promise<Response> {
  let body: Body;
  try {
    body = (await req.json()) as Body;
  } catch {
    return Response.json({ error: "Invalid JSON body" }, { status: 400 });
  }

  const city = typeof body.city === "string" ? body.city : "";
  const service = typeof body.service === "string" ? body.service : "";

  if (!CITIES.includes(city)) {
    return Response.json(
      { error: "Unknown city", knownCount: CITIES.length },
      { status: 400 },
    );
  }
  if (!SERVICES.includes(service)) {
    return Response.json(
      { error: "Unknown service", knownCount: SERVICES.length },
      { status: 400 },
    );
  }

  const preview = generatePreview(city, service);

  return Response.json(preview, {
    headers: {
      // 24h edge cache + 7d stale-while-revalidate. The preview content for
      // a given (city, service) is deterministic — same in→same out forever —
      // so the CDN can serve repeated requests with zero compute cost.
      "Cache-Control": "public, s-maxage=86400, stale-while-revalidate=604800",
      // Defense-in-depth: this endpoint returns JSON-LD as a string. Browsers
      // shouldn't sniff this body as anything else.
      "X-Content-Type-Options": "nosniff",
    },
  });
}
