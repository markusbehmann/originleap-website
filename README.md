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
- `images/og-image.jpg` — 1200×630 social share image (Open Graph / Twitter Card), generated locally with Python/Pillow
- `sitemap.xml`, `robots.txt` — basic technical SEO; `invite/` is disallowed and excluded since it's a personalized, `noindex` landing page
- `blog/index.html`, `blog/why-7000-steps-not-10000.html`, `blog/sleep-consistency-vs-hours-slept.html` — blog posts, each built around a claim already used on the homepage (7,000 vs. 10,000 steps; sleep consistency vs. hours slept); linked from the main nav and every page's footer
- `favicon.ico`, `apple-touch-icon.png` — raster fallbacks alongside `favicon.svg`, generated locally with Python/Pillow from the exact geometry in `favicon.svg` (same ring+dot mark, not a redesign). Needed because iOS home-screen bookmarks and some older browsers don't honor SVG favicons.
- `404.html` — Cloudflare Pages serves this automatically for any unmatched path, styled to match the rest of the site instead of a blank default error page

Supports light and dark mode (toggle in the nav, persisted via `localStorage`, defaults to system preference).

## SEO / marketing

- Every page has Open Graph and Twitter Card meta tags (title/description/image), pointing at `images/og-image.jpg`. `privacy.html` and `terms.html` previously had no `<meta name="description">` at all — added one for each.
- `index.html` has `SoftwareApplication` and `FAQPage` JSON-LD structured data. Only verifiable fields are populated (name, url, description, category, OS, App Store link) — no price or rating, since neither is real/known. The FAQ JSON-LD text matches the visible `<details>` accordion in the `#faq` section word-for-word, as Google requires.
- Every page's footer (except `invite/index.html`, which is single-purpose and `noindex`) carries a compact "How OriginLeap Compares" table against 75 Hard, Streaks, and Habitica, purely for long-tail search traffic on comparison queries. Claims are phrased as general, factual mechanics (reset rules, Health sync, etc.), not disparagement, and the table explicitly disclaims any affiliation with those apps/programs.
- `index.html` also gained: a "Bring a Friend" section explaining the existing (but previously unmentioned on-site) referral flow; an FAQ accordion (`#faq`) answering objections using only facts already established elsewhere on the site; and a "Be one of our first reviews" section that links straight to the App Store's write-a-review deep link (`?action=write-review`) instead of showing fabricated testimonials — there's no review history yet, so nothing there claims otherwise. That section can be swapped for real testimonials once some exist.
- **Deliberately not done:** an "explain OriginLeap Plus" section. Nothing in the repo states what Plus actually unlocks or costs, and the user chose not to supply those facts — so the site still doesn't explain Plus anywhere beyond "an optional subscription." Don't invent features/pricing for it; ask for the real details first.
- Every page now has a `<link rel="canonical">` matching its own `og:url` exactly (extensionless paths like `/contact`, `/privacy` — kept consistent with the og:url convention already in place, since a mismatch between the two would send conflicting signals to search engines). `invite/index.html` and `404.html` intentionally have neither — both are already `noindex`.
- `blog/why-7000-steps-not-10000.html` and `blog/sleep-consistency-vs-hours-slept.html` both carry `BlogPosting` JSON-LD (headline, dates, author/publisher as the OriginLeap org, matching the visible byline).
- Every page preloads the self-hosted Manrope font (`<link rel="preload" ... as="font" crossorigin>`) so text doesn't flash unstyled on first paint.

## Design polish

Every card/tile across the site (habit cards, science cards, feature cards, FAQ items, blog
post cards, the contact/note cards, the invite page's cards, etc.) lifts slightly and gets a
soft purple glow ring on hover, stronger in dark mode than light. `status-card` (the "Perfect /
Partial / Missed day" cards) gets a glow color-matched to its own accent (green/orange/red)
instead of purple, since it already carries semantic color. All primary/outline/small/light
button variants also get a hover lift + deepened shadow. All values are hardcoded per theme
(`:root[data-theme="dark"] ... :hover{...}` overrides) rather than routed through a shared CSS
custom property — a first pass tried a `--glow` variable but inserted it inconsistently across
files, which silently broke the *entire* `box-shadow` (not just the glow layer) wherever the
variable was referenced but undefined, since an invalid `var()` with no fallback invalidates the
whole property value. Caught and fixed before shipping; worth remembering if adding more shared
tokens later — insert the variable and verify it renders in the browser before wiring up
`var()` references to it.

Every element that gets the hover glow/lift also has a matching keyboard equivalent: `.btn`
(and its `.small`/`.outline`/`.light` variants) get `:focus-visible`, and cards whose only
focusable content is a child element (`.faq-item`, `.reviews-card`, `.contact-card`,
`.note-box`, invite's `.card`) use `:focus-within` instead, since the card itself isn't
focusable. `.post-card` is itself an `<a>`, so it gets `:focus-visible` directly. Purely
decorative tiles with no focusable children (`.why-card`, `.habit-card`, `.science-card`,
`.feature-card`, `.status-card`) were deliberately left without a focus state — there's nothing
inside them a keyboard user could ever tab to, so a rule there would be dead code. All of the
above respects `prefers-reduced-motion: reduce` (added globally per page), which collapses
every transition/animation to near-zero duration for users who've asked for it, including the
homepage's `scroll-behavior: smooth`.

The six below-the-fold screenshot images in `index.html`'s "showcase" section (`Today`/`Stats`/
`History`) use `loading="lazy"`. The two hero phone images above the fold intentionally don't —
lazy-loading a likely LCP (Largest Contentful Paint) candidate can delay it instead of helping.

## Security headers

`_headers` now sets site-wide `X-Content-Type-Options`, `X-Frame-Options`, `Referrer-Policy`,
`Permissions-Policy` (including `interest-cohort=()`, opting out of FLoC/Topics — consistent
with the "no third-party trackers" claim already made in `privacy.html`), `Strict-Transport-Security`,
and a `Content-Security-Policy`. The CSP's `style-src`/`script-src` still need `'unsafe-inline'`
because every page's CSS/JS lives in inline `<style>`/`<script>` blocks with no build step to
generate nonces or hashes — so it doesn't stop inline-script injection if an attacker can already
edit page HTML, but it does block loading of any *external* script, style, image, font, or
connection, and blocks the site from being framed. Tightening beyond that would mean introducing
a build step this site doesn't otherwise need.

## Blog content pipeline

The blog posts weekly (SEO strategy: rank for both research-based long-tail queries and
branded competitor-comparison queries). `blog/_drafts/` holds finished-but-unpublished posts —
each one is fully written, but has `<meta name="robots" content="noindex">`, a `DRAFT —
UNPUBLISHED` post-date, placeholder `DRAFT-UNPUBLISHED` JSON-LD dates, and isn't linked from
`blog/index.html` or listed in `sitemap.xml`. The folder is also disallowed in `robots.txt` as a
second layer of protection against premature indexing. Each draft file has its own publish
checklist in an HTML comment at the top.

A recurring scheduled task drains this backlog one post per week and publishes automatically
(no manual review gate) — see the scheduled task itself for the exact cron and prompt. When
the backlog is empty, the same task researches a new topic via web search and writes a new
post from scratch, holding itself to the same standard as everything already on this site:
only cite real, checkable research, and never invent a study, statistic, or app feature that
isn't independently verifiable.

Current backlog (in `blog/_drafts/`, oldest-to-publish first):
1. `forty-five-minutes-covers-your-week.html` — the 45-min/week exercise guideline
2. `water-before-meals-calorie-intake.html` — water timing vs. daily totals
3. `one-alcohol-free-month-insulin-resistance.html` — the alcohol-free-month study
4. `originleap-vs-75-hard.html`
5. `originleap-vs-streaks.html`
6. `originleap-vs-habitica.html`

The three comparison posts reuse the exact same facts as the footer's "How OriginLeap
Compares" table (which stays — it's useful as an always-visible summary), just expanded into
full articles that can actually rank for "OriginLeap vs [App]"-style searches, which a footer
table on someone else's page view can't do on its own.

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
