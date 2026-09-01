# OriginLeap

Static marketing site for OriginLeap — a 75-day tracker for seven science-backed daily habits.

## Contents

- `index.html` — landing page
- `contact.html` — contact page
- `privacy.html` — privacy policy
- `terms.html` — terms of service (governing-law clause has a placeholder — see the flagged span in the file)
- `favicon.svg` — site icon (app logo mark)
- `images/` — app screenshots (light/dark pairs) used in the landing page
- `invite/index.html` — referral landing page; reads the code from the URL client-side
- `.well-known/apple-app-site-association` — enables Universal Links for `/invite/*` into the iOS app
- `_headers` — forces `Content-Type: application/json` on the AASA file (Cloudflare Pages would otherwise serve it as `application/octet-stream`, which breaks Universal Links)
- `functions/invite/[code].js` — Cloudflare Pages Function that serves `invite/index.html` for any `/invite/{code}` path, keeping the code in the URL (a `_redirects` rewrite rule was tried first but Cloudflare wasn't applying it on this project — see git history — so this route is Functions-only; nothing else on the site needs a build step)

Supports light and dark mode (toggle in the nav, persisted via `localStorage`, defaults to system preference).

## Referral links

`https://originleap.com/invite/{code}` opens the app directly via Universal Links if it's
installed; otherwise Safari falls back to `invite/index.html`, which shows the code with a
copy button and an App Store link (https://apps.apple.com/app/originleap/id6802236441).

## Deployment

Static site, no build step. Deployed via Cloudflare Pages, which auto-detects and deploys
`functions/` alongside the static assets without any build configuration changes.
