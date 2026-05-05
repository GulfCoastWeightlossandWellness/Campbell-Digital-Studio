# Domain Migration — peytoncampbell.studio

> The canonical, long-form migration document is `docs/DOMAIN_MIGRATION.md`. This file is the loop's running checklist — it tracks **what has been verified done** vs **what's still pending**.

## Status as of iteration 001 (2026-05-05)

- **Domain registered:** Yes (per loop prompt)
- **Vercel custom domain configured:** **Unknown — looks no.** `curl -I https://peytoncampbell.studio` returns ECONNREFUSED.
- **DNS records pointing at Vercel:** **Unknown — looks no.**
- **`NEXT_PUBLIC_SITE_URL` env var set in Vercel:** **No** — `lib/site-config.ts` is using its fallback (`campbell-digital-studio.vercel.app`).
- **Resend domain verified:** **No.**
- **Plausible domain entry:** **No.**

This is the leading Tier-1 / Tier-5 blocker. Once it lands, several BACKLOG items become trivial and the OG / JSON-LD / sitemap immediately advertise the right URL with no code change required.

## Verification commands (re-run each iteration)

```bash
# 1. Does the domain resolve and serve from Vercel?
curl -sI https://peytoncampbell.studio | head -10

# 2. Does the studio's content render?
curl -s https://peytoncampbell.studio/ | grep -o 'Campbell Digital Studio' | head -1

# 3. Does the sitemap advertise the new origin?
curl -s https://peytoncampbell.studio/sitemap.xml | head -3

# 4. Are OG tags pointing at the new origin?
curl -s https://peytoncampbell.studio/ | grep -o 'og:url" content="[^"]*' | head -1
```

A "yes" on all four means the migration is complete. Until then, this file flips none of those checkmarks.

## Migration steps (mirror of `docs/DOMAIN_MIGRATION.md`)

1. Buy domain → **done**.
2. Add domain in Vercel project → **pending**.
3. Configure DNS records → **pending**.
4. Set `NEXT_PUBLIC_SITE_URL=https://peytoncampbell.studio` in Vercel Production env → **pending**.
5. Mark new domain as Primary in Vercel → **pending**.
6. Update `siteConfig.email` if it changes → **n/a until step 5**.
7. Update Google Search Console (add new property, submit sitemap, file Change of Address) → **pending**.
8. Update third-party services (Resend domain, Plausible domain) → **pending**.
9. Verify (run the four `curl` commands above) → **pending**.
10. Optional: change the fallback string in `lib/site-config.ts` to the new domain so local dev also picks the right canonical → **deferred until production is solid**.

## After-migration smoke checks

After the four `curl` commands all return the expected output, run these in a single iteration to certify:

- View-source `/` — search for `vercel.app`. Zero hits in `<head>`, OG, JSON-LD, canonical.
- View-source `/work/revitalize` — same.
- Hit `https://campbell-digital-studio.vercel.app/` — should 308 to the new domain.
- Twitter Card validator on `https://peytoncampbell.studio/` — image renders.
- LinkedIn Post Inspector on the same URL — image renders.

## Rollback plan

If anything breaks post-migration:

- Vercel → Project → Domains → re-set `campbell-digital-studio.vercel.app` as Primary.
- Optionally remove `NEXT_PUBLIC_SITE_URL` from Vercel env and redeploy (fallback in site-config takes over).

DNS changes propagate up to 48 hrs but Vercel itself flips instantly.
