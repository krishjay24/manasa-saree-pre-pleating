# GA4 setup and verification

Measurement ID: **G-KH6FQZFPDZ**. No other measurement IDs or tag containers are used.

## Netlify build configuration

In Netlify → Project configuration → Environment variables, add `VITE_ANALYTICS_ENABLED=true`, scoped to **Builds**, for the **Production** deploy context only. Leave it unset or false elsewhere. Vite replaces this value at build time; changing it requires a new build/deploy. It is a public feature flag, not a secret. The checked-in `.env.example` defaults to false; preview and branch deploys are explicitly false in `netlify.toml`.

Collection also requires a production Vite build, the exact origin `https://manasa-saree-prepleating.netlify.app`, explicit consent, no DNT/GPC and no `navigator.webdriver`. Localhost, Vite development/preview servers, Netlify preview URLs and automated browsers cannot send data. A future custom production domain requires updating the approved site origin and SEO configuration together.

## Consent and data

The consent notice appears inline below the header on page load when an eligible visitor has not chosen a preference. It occupies normal page space and scrolls with the content, with Manasa's existing fonts and palette. There is no floating bottom card, backdrop, focus trap or scroll lock. Footer **Analytics preferences** reopens the section, scrolls it into view and focuses it; **Decline** also withdraws previous permission.

Before Allow, no Google tag is inserted, no analytics commands are queued and no consent-mode denied pings are sent. Preference (`granted`/`denied`) is stored under `manasa:ga4-consent` in localStorage; blocked storage uses memory for this page session. Reloads, cross-tab storage changes and window focus recheck consent. DNT/GPC override saved Allow. Withdrawal immediately sets Google's disable flag, clears pending commands, removes the loader and deletes accessible `_ga` cookies. Already transmitted/in-flight requests cannot be recalled. Re-allowing resumes with one view of the current page, without replaying earlier activity.

Only fixed event names and allowlisted route paths/titles are accepted. Unknown routes become `/404`; queries, fragments, incoming referrers, outgoing link URLs, business/customer phone numbers and all form contents are excluded. Config and manual events override page location and referrer. Google signals and advertising personalization are disabled. Cookie lifetime is 13 months (refreshed with activity).

## Events

| Event | Trigger |
| --- | --- |
| `page_view` | Current React Router pathname after consent; consecutive identical paths, query/hash changes and StrictMode reruns do not duplicate views. Back/forward to a different route counts again. |
| `whatsapp_click` | WhatsApp links throughout the site, including floating/header/footer CTAs; validated enquiry form opening WhatsApp uses the shared helper. |
| `phone_click` | Telephone links. |
| `booking_click` | Internal links to the contact/booking page from another route, or a valid enquiry form continuing to WhatsApp. It measures intent only. |
| `price_estimator_use` | User changes the estimator service or effective clamped quantity. Default render and unchanged quantity do not count. |
| `price_estimate_completed` | Same change produces the estimator's synchronous calculated result. It is a calculation, not a lead. |

No `generate_lead` is implemented: there is no backend confirmation or successful enquiry receipt. The enquiry form prepares an external WhatsApp message; only the customer can send it.

## Required GA4 admin settings before enabling

In Admin → Data streams → this web stream → Enhanced measurement, **turn Enhanced measurement off**. This prevents automatic history page views, outbound clicks containing WhatsApp phone/message URLs, form interactions and site-search terms. Keep page history tracking, outbound clicks, form interactions, site search, scrolls, video and file downloads disabled. Do not install an additional Google tag/GTM/Netlify analytics injection or configure events that recreate these events. `send_page_view: false` suppresses config views but does not suppress Enhanced Measurement history views by itself. See [Google's manual page-view guidance](https://developers.google.com/analytics/devguides/collection/ga4/views) and [privacy controls](https://developers.google.com/tag-platform/security/guides/privacy).

The account settings cannot be inspected or changed from this repository. Also verify Google signals, user-provided data collection and advertising features remain disabled; choose the shortest appropriate property data retention. Do not mark WhatsApp/estimator events as confirmed-lead key events.

## Release verification (manual deployment required)

1. Run `npm run lint`, `npm test`, `npm run build`, then `npm run check:seo`. Automated browser checks must keep real Google endpoints blocked, including any simulated production tests.
2. Review the desktop/mobile inline notice; confirm keyboard focus, scrolling, unchanged gallery, estimator totals, WhatsApp booking and footer controls.
3. After manually deploying with the production build flag, use a normal browser with cleared site data and DevTools Network filtering `gtag`/`collect`: there must be no analytics requests before Allow or after Decline. Check persisted rejection on reload.
4. Allow, navigate forward/back and reload: one page view per route visit. Query/hash-only changes must not add views. Inspect outgoing `dl`, `dr` and event payloads for privacy; no query/hash/referrer/form values may appear.
5. Verify all five custom events in GA4 Realtime or temporary Tag Assistant DebugView. Exercise valid and invalid enquiry forms; confirm no `generate_lead`. Compare a phone click and a WhatsApp click to ensure each is counted once.
6. Withdraw via footer → Decline; confirm cookie removal and no future collection on clicks/navigation. Re-allow, cross-tab rejection, DNT and GPC should behave as described above. Use a separate DNT/GPC-free profile for the positive test.

No push, deployment, GA4 account configuration or live event verification is performed by this change.

## Local verification results

Verified 3 November 2026: ESLint passed; 52 Vitest tests passed (including nine analytics consent/privacy cases); production build with `VITE_ANALYTICS_ENABLED=true` passed; SEO checks passed for seven indexable routes and static robots/sitemap responses.

`node scripts/check-analytics-browser.mjs` passed in Chromium at 1440×1000, 390×844 and 320×740. It checks inline notice placement and footer focus, Allow/Decline, persisted rejection, withdrawal/re-allow, cross-tab withdrawal, all five custom event names, route/back/query deduplication, sanitized payloads and independent webdriver/DNT/GPC blocking. Screenshots are written to ignored `analytics-review.local/`. For an external Playwright installation set `PLAYWRIGHT_MODULE` to its `index.mjs`; optionally set `CHROMIUM_EXECUTABLE`. No dependency is added to the application. All requests are intercepted: the production origin serves local `dist`, Google endpoints return an inert stub, and other origins are blocked. Positive tests simulate a normal browser only inside that isolated context. These checks validate local wiring, not Google's live collection or account settings.
