# OriginLeap

Static marketing site for OriginLeap — a 75-day tracker for seven science-backed daily habits.

## Contents

- `index.html` — landing page
- `contact.html` — contact page
- `privacy.html` — privacy policy
- `terms.html` — terms of service (UAE/Dubai law; OriginLeap/Markus Behmann is the contracting party, aLIVE-Service GmbH is named only as the App Store distributor)
- `impressum.html` — legal notice: Markus Behmann as provider (Dubai, UAE), plus aLIVE-Service GmbH's real German company details in its own distributor-only role (required under § 5 DDG for that role specifically)
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

**OriginLeap (the product/brand) is operated by Markus Behmann**, based in Dubai, UAE — this is
the contracting party in `terms.html` and the controller named in `privacy.html`. **aLIVE-Service
GmbH** (Magdeburg, Germany; real company details sourced from alive-service.de/impressum) is
named separately and only in its actual role: distributing the app on the Apple App Store. It is
explicitly not a party to the Terms and not the data controller. Governing law for the Terms is
UAE/Dubai. `impressum.html` reflects both: Markus Behmann as provider (address: Dubai World Trade
Centre, Sheikh Zayed Road, Dubai, UAE), and aLIVE-Service GmbH's real HRB/VAT details scoped to
its distributor role, including a "Prokura: Markus Behmann" line — worth confirming that's an
actual filed Prokura at Amtsgericht Stendal, since Prokura only has legal effect once registered.

Things worth a lawyer's eyes rather than treating as settled:
- **GDPR extraterritorial scope (Art. 3(2)) and EU representative (Art. 27).** Moving the
  controller outside the EU doesn't stop GDPR from applying to EU users' data — the app clearly
  targets/serves EU users, and Apple Health data is special-category data under Art. 9, which
  likely rules out the Art. 27(2)(a) "occasional, low-risk" exemption from having to designate an
  EU representative. No representative has been named here (`privacy.html` intentionally doesn't
  claim one exists). This is a real, unresolved compliance question, not a stylistic one — get it
  checked before treating the Privacy Policy as complete.
- **§ 356a BGB "Withdrawal button"** — a German requirement (in force since June 19, 2026)
  mandating an electronic withdrawal button on B2C digital contracts concluded via a website/app.
  The Plus subscription is sold through Apple's App Store, not this website's own checkout, so
  the working assumption here is that this obligation (if it applies at all to EU purchasers)
  falls on Apple, not OriginLeap — `terms.html` reflects that assumption but it hasn't been
  independently verified.
- The EU's online dispute resolution (ODR) platform was **shut down in July 2025**, and sites are
  now required to *remove* references to it, not include them. `impressum.html` deliberately
  omits it, even though it's still present on alive-service.de/impressum as of this writing.
- Multiple jurisdictions were checked before landing on UAE/Dubai (Germany, Malta, and UAE itself
  all require a real provider address for e-commerce/digital-service disclosures — this isn't a
  jurisdiction-specific quirk). The Dubai World Trade Centre address is used here because it was
  supplied as a real, non-residential address; its actual registration status wasn't independently
  verified.

## Deployment

Static site, no build step. Deployed via Cloudflare Pages, which auto-detects and deploys
`functions/` alongside the static assets without any build configuration changes.
