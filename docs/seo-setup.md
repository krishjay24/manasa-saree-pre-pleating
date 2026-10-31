# Google Search Console preparation

Production origin: https://manasa-saree-prepleating.netlify.app

## Audit and changes

- Existing prerendering produces all seven public routes and a separate noindex 404 page. Retained it, including shared server/client metadata and JSON-LD.
- Previously the production origin was optional (`VITE_SITE_URL`); without it, builds omitted the sitemap, canonicals and absolute image URLs. The approved Netlify origin now lives in `src/config/site.ts` and consistently supplies those fields and structured data. The obsolete environment type was removed.
- Existing unique page titles and descriptions describe the services and Kovur, Nellore location. The home H1 now explicitly names saree pre-pleating, retaining its component and styling.
- Builds generate `dist/robots.txt` with `Allow: /` and an absolute sitemap reference. No public route is blocked.
- Builds generate `dist/sitemap.xml` from existing prerendered routes without `noindex`. Removed build-date `lastmod` values because builds do not establish a substantive content modification date.
- Added `netlify.toml` with the production build command, `dist` publish directory and a non-forced 404 fallback. Existing static files take precedence; there is no catch-all rewrite returning the home page with status 200.
- Existing sample testimonials rendered despite the approval flag. The section now returns no content until approved, so sample names, quotes and ratings are absent from prerendered HTML. No reviews or aggregate ratings were added to JSON-LD.
- Kept the business location and service data sourced from the existing client profile. Added no street address, coordinates, reviews, services or business claims.
- Gallery, booking links, estimator, image assets, animations and styles are retained.

## Sitemap

Expected submission URL after an approved deployment:
https://manasa-saree-prepleating.netlify.app/sitemap.xml

Seven URLs: `/`, `/services`, `/gallery`, `/about`, `/contact`, `/privacy-policy`, `/terms`.
The 404 page and unknown routes are excluded.

## Validation

- `npm.cmd run lint`: passed.
- `npm.cmd run build`: passed, including TypeScript and all eight prerendered HTML files.
- `npm.cmd test`: 43 tests passed across three files (booking, WhatsApp and estimator).
- `npm.cmd run check:seo`: passed. Checks sitemap membership, unique titles/descriptions, one H1 per page, canonicals, robots directives, rendered content, structured-data origin/location, absence of sample reviews, and local HTTP 200 responses with exact static robots/sitemap bodies and non-HTML content types.
- Sitemap parsed successfully with the .NET XML parser.
- `git diff --check`: passed.

## Outstanding / limits

- Live production requests failed from this environment. Deployed Netlify headers, redirects, crawl accessibility and sitemap responses remain unverified. Local Vite HTTP checks do not emulate Netlify routing; verify real 404 status and static responses after an approved deployment, including any dashboard-level settings.
- Existing media includes items marked temporary in the registry. Images were preserved; review image provenance before treating every gallery image as completed client work.
- The profile does not supply a verified street address or Google Maps URL; none was invented.
- Search Console ownership verification and sitemap submission remain outstanding. No Google verification file or token was created.
- Nothing was pushed or deployed. Google indexing remains Google's decision after deployment and submission.

For future changes, run the build before `npm.cmd run check:seo`. Update the approved production origin in `src/config/site.ts` and SEO checks together if the domain changes.
