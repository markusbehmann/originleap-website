// Serves the static invite landing page for any /invite/{code} path,
// keeping the code in the URL so the page's client-side script can read it
// from window.location.pathname. A Cloudflare Pages Function is used here
// instead of a _redirects rewrite because _redirects rules were not being
// applied on this project (verified: even unrelated 404s were falling back
// to the site root instead of consulting _redirects), while Functions
// reliably handle this exact case.
export async function onRequestGet(context) {
  const assetUrl = new URL("/invite/index.html", context.request.url);
  return context.env.ASSETS.fetch(assetUrl);
}
