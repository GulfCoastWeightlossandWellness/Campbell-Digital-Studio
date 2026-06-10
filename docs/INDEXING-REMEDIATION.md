# CDS Indexing Remediation — "only ~1 page indexed"

**Date:** 2026-06-10
**Site:** https://www.campbelldigitalstudio.com (canonical host is **www**; apex `campbelldigitalstudio.com` 308-redirects to www)
**Symptom:** Google Search Console reports roughly 1 page indexed despite a full, valid sitemap.
**Author:** Agent 4 (Indexing/SEO/AEO)

This doc is the execute-in-order playbook. The technical layer (sitemap, robots, canonicals, JSON-LD, manifest, llms.txt) is already correct and was further hardened in this build — see the bottom section. **The blocker is almost certainly a GSC property mismatch, not the code.**

---

## TL;DR — the most likely root cause

A ~3-day-old deployment showing exactly **one** indexed page, while the sitemap is valid and the homepage is the one page that's indexed, is the textbook signature of the **GSC property trap**:

> The verified GSC property is the **apex / non-www URL-prefix property** (`https://campbelldigitalstudio.com`). Every URL under that property **308-redirects to www**. GSC follows the redirect, attributes the indexed page to the **destination** (the www property, which may not be verified or selected), and reports the apex URLs as **"Page with redirect" → not indexed.** The only thing that survives is whatever single canonical URL Google already had. Net effect in the dashboard: ~1 page indexed.

**The verification evidence on disk supports this.** The site is verified by HTML file (`public/google6217edd756051041.html`, confirmed served live). An HTML-file verification authenticates **one specific URL-prefix property only** — it does not cover www-vs-apex interchangeably, and it does not create a Domain property. So whichever prefix was entered when that file was generated is the property currently collecting data. If that was the apex, the dashboard is reporting the redirect property.

**Fix:** report on the property that matches the canonical host. Use either the **Domain property** (DNS-verified, covers apex + www + every subdomain) or the **`https://www.campbelldigitalstudio.com` URL-prefix property**, and submit the sitemap **there**. Details in Step 1.

A secondary, compounding factor is simply **age**: a 3-day-old domain with little inbound authority indexes slowly regardless of technical correctness (Step 3). Both can be true at once. Property-trap is the part you fix today; age is the part you wait out.

---

## Step 0 — Confirm the diagnosis before changing anything (2 minutes)

In GSC, open the **property switcher** (top-left dropdown) and read what's actually there. You're checking three things:

1. **Which properties exist?** Look for these distinct entries:
   - `Domain` property: `campbelldigitalstudio.com` (no `https://`, no `www` — DNS-verified, shows a globe/domain icon)
   - `URL prefix`: `https://www.campbelldigitalstudio.com/`
   - `URL prefix`: `https://campbelldigitalstudio.com/` ← **the apex/non-www prefix; this is the trap if it's the one you've been looking at**
2. **Which property shows "~1 indexed"?** Open **Indexing → Pages** on that property. If it's the apex prefix or a Domain property whose canonical URLs all live on www, that's consistent with the trap.
3. **What does the "Not indexed" reason say?** In **Indexing → Pages**, the reason rows are the tell:
   - **"Page with redirect"** on the apex URLs → confirms the trap. These pages aren't broken; they 308 to www by design, so the apex property can never index them.
   - **"Discovered – currently not indexed"** / **"Crawled – currently not indexed"** → this is crawl latency, not the trap (Step 3). Normal for a new domain.
   - **"Duplicate without user-selected canonical" / "Alternate page with proper canonical tag"** → canonical signal, addressed by Step 1 + the canonicals already in code.

Also run a live **URL Inspection** on `https://www.campbelldigitalstudio.com/` and on `https://www.campbelldigitalstudio.com/work`. If inspection says "URL is on Google" for the homepage but "Crawled – currently not indexed" / "Discovered" for `/work`, that's the new-domain latency pattern layered on top.

Verified live facts (curled 2026-06-10), so you can trust the technical layer while you debug GSC:
- `https://campbelldigitalstudio.com/` → **HTTP 308** → `https://www.campbelldigitalstudio.com/`
- `https://www.campbelldigitalstudio.com/` → **HTTP 200**
- `https://www.campbelldigitalstudio.com/robots.txt` → 200, points at the correct sitemap
- `https://www.campbelldigitalstudio.com/sitemap.xml` → 200, lists every canonical www URL (no redirecting URLs)

---

## Step 1 — Fix the property + submit the sitemap there (do this first; highest leverage)

**Goal:** make the property you report on match the canonical host (www), so the dashboard stops counting redirects as "not indexed."

1. **Prefer a Domain property.** In GSC → **Add property → Domain → enter `campbelldigitalstudio.com`** (no scheme, no www). Verify with the **DNS TXT record** GSC gives you:
   - Registrar/DNS for this domain is GoDaddy (per the studio's DNS records). Add the TXT record at the apex (`@`/root). Propagation is usually minutes; click **Verify**.
   - A Domain property covers apex **and** www **and** all subdomains in one place — it sidesteps the entire www/apex prefix problem permanently. This is the recommended end state.
2. **If DNS verification isn't convenient right now, use the www URL-prefix property instead.** Add/select **`https://www.campbelldigitalstudio.com`** (with `www`). It's already verifiable by the HTML file that's live — but note the file token may have been generated for the apex; if www verification doesn't auto-pass, GSC will offer the HTML-file or HTML-tag method again for the www prefix. The studio also already has Google Workspace on this domain, so the **Google Analytics / Google tag** or **Domain name provider** verification methods are both available as fallbacks.
3. **Submit the sitemap on the correct property.** On the Domain property (or the www prefix property), go to **Indexing → Sitemaps** and submit:
   ```
   https://www.campbelldigitalstudio.com/sitemap.xml
   ```
   (Submit the absolute www URL. Do **not** submit `https://campbelldigitalstudio.com/sitemap.xml` — that path 308s.) Status should read **"Success"** with the discovered-URL count.
4. **Stop reporting on the apex prefix.** It will permanently show its URLs as "Page with redirect." That's correct behavior, not a defect — just don't use that property as your indexing scoreboard. You can keep it or remove it; removing it avoids future confusion.

---

## Step 2 — Force first indexing on the key pages (today)

On the **correct (www / Domain) property**, use **URL Inspection** → enter the URL → **Request Indexing** for each of these. Request indexing is rate-limited (a handful per day) — spend it on the pages that matter most:

1. `https://www.campbelldigitalstudio.com/` (home)
2. `https://www.campbelldigitalstudio.com/work`
3. `https://www.campbelldigitalstudio.com/work/air-solutions`
4. `https://www.campbelldigitalstudio.com/work/pro-1-painters` *(live once Agent 1's registry entry ships; until then it 308s to /work — don't request it before it returns 200)*

Then, as quota allows over the next few days: `/healthcare`, `/local-services`, `/studio`, and the remaining `/work/*` case studies.

For each: if inspection says "URL is available to Google," click **Request Indexing**. If it says "Page with redirect," you inspected an apex URL or a `/work/[slug]` that isn't featured — re-check the URL is the canonical www one and that the slug is a featured project.

---

## Step 3 — Set expectations: new-domain crawl latency is normal

This deployment is days old. Even with a perfect technical setup:

- **"Discovered – currently not indexed"** and **"Crawled – currently not indexed"** are **expected** for a new site and are **not** errors. Google has found/seen the page but is deferring indexing until it has more signal that the page is worth keeping in the index.
- Resolution is **days to weeks**, and it accelerates with: (a) the sitemap being read on the right property (Step 1), (b) Request Indexing nudges (Step 2), (c) internal links so every page is reachable in 1–2 clicks (already true — see Step 6), and (d) any external links / mentions that build domain authority over time.
- **Do not** interpret slow early indexing as a bug to re-engineer. The code is correct. The levers now are *recrawl* and *authority*, not more technical SEO. Re-check **Indexing → Pages** weekly; expect the "Indexed" count to climb as the "Discovered/Crawled – not indexed" bucket drains.

---

## Step 4 — Bing Webmaster Tools (import from GSC)

Once GSC is on the right property:

1. Go to **Bing Webmaster Tools → Add site → Import from Google Search Console** (the one-click path; carries verification + sitemaps over). Choose the **www / Domain** property when prompted.
2. If import isn't offered, add `https://www.campbelldigitalstudio.com` manually and verify by the same HTML file (it's live) or DNS.
3. Confirm the sitemap (`https://www.campbelldigitalstudio.com/sitemap.xml`) shows under **Sitemaps**; submit it if it didn't carry over.
4. Bing powers ChatGPT search and other AI surfaces, so this also helps AEO, not just Bing's own results.

---

## Step 5 — IndexNow (adopt the studio's existing client pattern — do not build here)

The studio **already runs IndexNow automation** for client sites (e.g. the Pro 1 and Air Solutions daily indexing jobs: IndexNow + Google Indexing API + a GSC monitor on a launchd schedule). CDS can adopt the **same proven pattern** for its own domain:

- Generate an IndexNow key, host it at `https://www.campbelldigitalstudio.com/<key>.txt`, and ping IndexNow with the sitemap URLs on deploy/content change. Bing, Yandex, and others consume IndexNow; Google does not (use the Indexing API / Request Indexing for Google).
- **Reuse, don't reinvent:** point at the existing client IndexNow scripts in the studio's automation infra (the `com.cds.pro1-indexing` / `com.cds.airsolutions-indexing` jobs are the reference implementation). A CDS-scoped copy of that job is the right move once the site is live and stable.
- This is **out of scope for this build** (no automation is being added to the CDS repo here) — it's the recommended next step, flagged so it doesn't get lost.

---

## Step 6 — Internal linking + crawl depth (audited — currently healthy)

Crawl depth was audited in this build. Every important page is reachable from the global header and footer in **1 click**, and case studies in **2 clicks** (home/`/work` → `/work/[slug]`). No orphans found.

- **Header nav** (`components/Header.tsx`, sourced from `lib/nav.ts`): Work, Healthcare, Local Services, Studio, Notes, Inquire — rendered as real `next/link` `<a href>` tags in the server HTML, so they're crawlable (not JS-only).
- **Footer** (`components/Footer.tsx`): the same primary nav **plus** Call, Privacy, Terms.
- **Case studies:** linked from the `/work` index, which is one click from every page.
- **Sitemap:** lists all canonical routes; featured `/work/[slug]` pages auto-included; non-featured slugs are intentionally excluded because they 308 to `/work`.

**One crawl-depth note to watch (not a current defect):** `/notes` is in the nav, sitemap, and is indexable, but it's currently a "coming soon" placeholder with no entries. A thin page is fine to keep indexable, but until it has real content it may sit in "Crawled – currently not indexed." No action required; just don't expect it to index early.

---

## Step 7 — Action checklist (execute in GSC today)

- [ ] **Open the GSC property switcher.** Identify which property shows "~1 indexed" and whether it's the apex prefix, the www prefix, or a Domain property. (Step 0)
- [ ] **Read Indexing → Pages → reasons.** Confirm "Page with redirect" on apex URLs (= property trap) vs. "Discovered/Crawled – not indexed" (= latency). (Step 0)
- [ ] **Add the Domain property** `campbelldigitalstudio.com` and verify by **DNS TXT** at GoDaddy. *(Fallback: select the `https://www.campbelldigitalstudio.com` URL-prefix property.)* (Step 1)
- [ ] **Submit `https://www.campbelldigitalstudio.com/sitemap.xml`** on the Domain/www property; confirm **"Success."** (Step 1)
- [ ] **Stop using the apex prefix property** as the indexing scoreboard. (Step 1)
- [ ] **URL Inspection → Request Indexing** for `/`, `/work`, `/work/air-solutions`, and `/work/pro-1-painters` (once it returns 200). (Step 2)
- [ ] **Import to Bing Webmaster Tools from GSC**, choosing the www/Domain property; confirm sitemap. (Step 4)
- [ ] **Re-check Indexing → Pages in ~1 week**; expect the indexed count to climb as latency drains. (Step 3)
- [ ] *(Next step, not today)* Stand up a CDS-scoped IndexNow job reusing the existing client automation. (Step 5)

---

## What was already correct / hardened in this build (no GSC action needed)

The technical SEO/AEO layer is in good shape. Changes shipped by Agent 4 in this build (files: `app/sitemap.ts`, `app/robots.ts`, `app/layout.tsx`, `app/manifest.ts`, `public/llms.txt`, `components/seo/JsonLd.tsx`):

- **Sitemap** (`app/sitemap.ts`): emits only canonical **www** URLs, never a redirecting URL. Featured `/work/[slug]` pages are auto-included (Pro 1 Painters appears automatically once its registry entry lands). Added the live `/privacy` and `/terms` routes (previously footer-only / not in the sitemap). Added per-case-study **image sitemap** entries (`images: [absolute cover URL]`) so hero captures are eligible for Google Images. The `/call` route stays guarded (only emitted when a Cal.com username is configured).
- **robots.txt** (`app/robots.ts`): open crawl (`allow: /`), now with `disallow: /api/` (no HTML to index there) and an explicit `host` directive naming the canonical www host — reinforcing the apex→www canonical story.
- **Root metadata** (`app/layout.tsx`): added an explicit **robots directive** (`index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1`), a **default canonical** (`/`, with child routes overriding via their own `alternates.canonical`), correct `metadataBase`, OpenGraph, and Twitter cards. Title template preserved.
- **Structured data** (`app/layout.tsx` via the new `components/seo/JsonLd.tsx`): existing **Organization** schema kept and enriched (`@id`, logo, `knowsAbout`, `areaServed`); added a **Person** schema for Peyton Campbell, DO (founder, `sameAs: []` — empty, not fabricated) and a **WebSite** schema (**no SearchAction**, because there is no on-site search). Nodes cross-reference by `@id`.
- **Web App Manifest** (`app/manifest.ts`, newly created — none existed): name "Campbell Digital Studio", short_name "Campbell Digital", icons from `/icon.png` + `/apple-icon.png` + `/favicon.ico`, theme `#14182A` (navy) on `#FAF6EC` (cream) from the brand palette.
- **AEO** (`public/llms.txt`, newly created): factual studio description, the two verticals, Peyton as physician-developer, and the five flagship case studies — verified facts only, with an explicit note to AI assistants that outcome metrics for recent launches are still being measured. (Note: llms.txt is AEO hygiene, not a ranking lever.)
- **JsonLd component** (`components/seo/JsonLd.tsx`): reusable, dependency-free server component for typed JSON-LD with `</script>` escaping. Documented at top-of-file so case-study pages can later inject `CreativeWork` / `Service` schema.

---

## Housekeeping flags (low priority)

- **Duplicate GSC verification files.** `public/` contains `google6217edd756051041.html` (the live one) plus `google6217edd756051041 2.html` and `google6217edd756051041 3.html` — byte-identical download artifacts (note the spaces in the names). Harmless, but worth deleting the two numbered copies to keep `public/` clean. (Not deleted here — outside Agent 4's owned file list; flag for the main session.)

---

## Metadata gaps delegated to the main session (pages Agent 4 does not own)

These are page-level metadata issues found while auditing. Agent 4's lane excludes these files; the main session (or the owning agent) should apply them. None block indexing, but they affect snippet quality and accuracy.

1. **`app/work/air-solutions/page.tsx` — STALE page metadata.** The exported `metadata` still says **"210-page … 21 cities × 10 services"** and the OG image is `air-solutions-1-hero.jpg`. The verified live count is **345 pages** and the current cover is `air-solutions-live-1-hero.png` (per `lib/projects.ts` and the brief). Update the `description`, the `openGraph.description` (also "210 programmatic pages"), and `openGraph.images` to the live `.png` cover. *(Agent 2 owns `app/work/**`.)*
2. **`app/archive/page.tsx` — STALE ledger content + metadata.** The page `description` says **"330+ pages across 7 sites"**, and the ledger body lists Air Solutions as **"159 prerendered HTML"** routes and **"10 JSON-LD"** types — both stale vs. the verified 345 pages / 9-type figures used elsewhere. Either refresh the numbers to match `lib/projects.ts` or reconsider the page: `/archive` is a text-only near-duplicate of `/work` (it has `canonical: /archive`, so it will be indexed as its own page). Decide whether it should stay indexable or be consolidated. *(Outside Agent 4's lane — flag for the main session.)*
3. **`app/work/page.tsx` — no exported `metadata`.** The `/work` index relies on the inherited title template/description only; it has no page-specific `description` or canonical. Add a `metadata` export with a `/work`-specific description and `alternates.canonical: "/work"` to improve its SERP snippet. *(Agent 2 owns `app/work/**`.)*
4. **`/healthcare`, `/local-services`, `/studio` — confirm canonicals.** These are primary nav pages and prime indexing targets. Verify each exports `alternates.canonical` (the legal/inquire/call/notes pages already do). If any is missing, add it so the canonical is explicit rather than defaulting to root. *(Agent 3 owns these files.)*
5. **`/work/pro-1-painters` — ensure metadata ships with the new route.** When Agent 2 creates the Pro 1 case-study page, it must export `metadata` with a Pro-1-specific `title`/`description`, `alternates.canonical: "/work/pro-1-painters"`, and `openGraph.images` pointing at `/images/case-studies/covers/pro-1-1-hero.png`. Without it the route inherits only the generic template. *(Agent 2 owns the new route.)*
