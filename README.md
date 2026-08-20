# OriginLeap

Static marketing site for OriginLeap — a 75-day tracker for seven science-backed daily habits.

## Contents

- `index.html` — landing page
- `contact.html` — contact page
- `privacy.html` — privacy policy
- `favicon.svg` — site icon (app logo mark)
- `images/` — app screenshots (light/dark pairs) used in the landing page
- `invite/index.html` — referral landing page; reads the code from the URL client-side
- `.well-known/apple-app-site-association` — enables Universal Links for `/invite/*` into the iOS app
- `_headers` — forces `Content-Type: application/json` on the AASA file (Cloudflare Pages would otherwise serve it as `application/octet-stream`, which breaks Universal Links)
- `_redirects` — rewrites `/invite/*` to `/invite/index.html` with a 200 (not a redirect) so the code stays in the URL

Supports light and dark mode (toggle in the nav, persisted via `localStorage`, defaults to system preference).

## Referral links

`https://originleap.com/invite/{code}` opens the app directly via Universal Links if it's
installed; otherwise Safari falls back to `invite/index.html`, which shows the code with a
copy button and an App Store link. The App Store button is a placeholder until the app is
approved — swap it in `invite/index.html` (marked with an HTML comment) once there's a real
listing URL.

## Deployment

Static site, no build step. Deployed via Cloudflare Pages.
