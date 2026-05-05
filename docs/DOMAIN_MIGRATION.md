# Domain Migration — `*.vercel.app` → custom domain

The site currently runs at `https://campbell-digital-studio.vercel.app`. The codebase is structured so swapping to a real custom domain is a one-afternoon task, not a one-week task. Everything that uses an absolute URL or contact email reads from `lib/site-config.ts`, which in turn reads from environment variables.

## Recommended domains (research availability)

In rough order of preference, with the same brand voice:

1. `campbelldigitalstudio.com` — exact match for the studio name. First choice.
2. `peytoncampbell.studio` — already referenced in older code as the planned domain; the `.studio` TLD reads as design-studio-native.
3. `campbell.studio` — premium, may be expensive or held.
4. `campbelldigital.co` — fallback if `.com` is taken.

Whichever is chosen, the migration steps are the same.

## One-time prep (already done)

These were completed during Phase 11 of the rebuild and need no further action:

- [x] `lib/site-config.ts` reads `NEXT_PUBLIC_SITE_URL` with a `*.vercel.app` fallback.
- [x] `app/layout.tsx` sets `metadataBase` from `siteConfig.url`.
- [x] `app/sitemap.ts` and `app/robots.ts` build URLs from `siteConfig.url`.
- [x] `app/inquire/page.tsx` reads the contact email from `siteConfig.email`.
- [x] All Organization / WebSite / Person JSON-LD blocks in `app/layout.tsx` use `siteConfig.url`.

## Migration checklist

1. **Buy the domain.**
   - Cloudflare Registrar (preferred — at-cost pricing, free WHOIS privacy, fast DNS).
   - Or Namecheap if Cloudflare doesn't support the TLD.

2. **Add the domain in the Vercel project.**
   - Vercel → Project → Settings → Domains → Add.
   - Vercel will instruct on the DNS records to add (usually a single CNAME for `www` and either an A record for the apex or an ANAME at the registrar).

3. **Configure DNS.**
   - Add the records Vercel gives you.
   - If using Cloudflare DNS: set the records to **DNS-only** (gray cloud), not Proxied. Vercel handles the certificate.

4. **Set the env var in Vercel.**
   - Vercel → Project → Settings → Environment Variables.
   - Add `NEXT_PUBLIC_SITE_URL=https://yourdomain.com` (no trailing slash) for the Production environment.
   - Trigger a redeploy of the latest commit so the env var takes effect.

5. **Update the contact email if it changes.**
   - Edit `siteConfig.email` in `lib/site-config.ts`.
   - Commit + push.

6. **Mark the new domain as primary in Vercel.**
   - Settings → Domains → set the custom domain as Primary.
   - Vercel will automatically 308-redirect the `*.vercel.app` URL to the new primary, preserving any inbound links.

7. **Update Google Search Console.**
   - Add the new domain as a separate property (Domain property recommended over URL prefix).
   - Submit the sitemap: `https://yourdomain.com/sitemap.xml`.
   - In the old `campbell-digital-studio.vercel.app` property, use the Change of Address tool to point at the new domain.

8. **Update any third-party services with the new domain.**
   - **Cal.com:** if a calendar embed is configured (`NEXT_PUBLIC_CAL_USERNAME`), no change needed — the embed reads the username, not the host.
   - **Resend:** if `RESEND_API_KEY` is set, verify your sending domain (`yourdomain.com`) in Resend so emails sent from `noreply@yourdomain.com` are accepted. Then set `LEAD_FROM_EMAIL=noreply@yourdomain.com` in Vercel env.
   - **Plausible:** if `NEXT_PUBLIC_PLAUSIBLE_DOMAIN` is set, update the value to match the new domain. Plausible aggregates by `data-domain` attribute.
   - **GitHub repo description:** update the link in the repo About box.
   - **LinkedIn / X / any other public profiles:** update the URL.

9. **Verify.**
   - Visit `https://yourdomain.com/sitemap.xml` — should return XML with `https://yourdomain.com/...` URLs.
   - Visit `https://yourdomain.com/robots.txt` — should reference the new sitemap.
   - Open the home page and View Source — search for `campbell-digital-studio.vercel.app` and confirm zero hits in `<head>` / OG tags / canonical / JSON-LD.
   - Hit the old `campbell-digital-studio.vercel.app` URL — should 308 to the new domain.

10. **Optional: remove the old fallback.**
    - Once you're confident production reads the env var correctly, you can change the fallback string in `lib/site-config.ts` to the new domain so local dev (without env vars) also picks the right canonical.

## Rollback plan

If anything goes wrong after step 6, the rollback is fast:

- Vercel → Project → Domains → set `campbell-digital-studio.vercel.app` back as Primary.
- Optionally remove the env var `NEXT_PUBLIC_SITE_URL` from Vercel and redeploy (the fallback in `site-config.ts` takes over).

DNS changes can take up to 48 hours to fully propagate, but Vercel itself flips instantly.
