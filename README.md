# OriginLeap

Static marketing site for OriginLeap — a 75-day tracker for seven science-backed daily habits.

## Contents

- `index.html` — landing page
- `contact.html` — contact page
- `privacy.html` — privacy policy
- `terms.html` — terms of service (German law, aLIVE-Service GmbH as seller)
- `impressum.html` — German legal notice (§ 5 DDG), required because the operating company (aLIVE-Service GmbH) is German
- `favicon.svg` — site icon (app logo mark)
- `fonts/manrope-latin-variable.woff2` — self-hosted Manrope (variable font, covers weights 400–800). Loading fonts from Google's own servers has been the subject of real GDPR cease-and-desist letters in Germany (IP addresses transmitted to Google without consent); self-hosting removes the issue entirely.
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

## Legal / compliance notes

The site is operated by **aLIVE-Service GmbH** (Magdeburg, Germany) — company details are
in `impressum.html`, sourced from the real imprint at alive-service.de/impressum. Privacy
Policy and Terms were updated accordingly (German governing law, GDPR-style rights/legal-basis
sections, EU consumer withdrawal-rights language).

Two things worth a lawyer's eyes rather than treating as settled:
- **§ 356a BGB "Withdrawal button"** — a new German requirement (in force since June 19, 2026)
  mandating an electronic withdrawal button on B2C digital contracts concluded via a website/app.
  Whether this applies here is genuinely unclear: the Plus subscription is sold through Apple's
  App Store, not through this website's own checkout, so it's not obvious the obligation falls
  on aLIVE-Service rather than (or in addition to) Apple. Nothing was built for this since a
  wrong guess would be worse than an honest gap — flag it to counsel before relying on the
  Terms' withdrawal section as sufficient.
- The EU's online dispute resolution (ODR) platform was **shut down in July 2025**, and sites are
  now required to *remove* references to it, not include them. `impressum.html` deliberately
  omits it, even though it's still present on alive-service.de/impressum as of this writing.

## Deployment

Static site, no build step. Deployed via Cloudflare Pages, which auto-detects and deploys
`functions/` alongside the static assets without any build configuration changes.
