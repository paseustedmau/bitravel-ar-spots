<wizard-report>
# PostHog post-wizard report

The wizard has completed a deep integration of PostHog analytics for the Bitravel AR project. The project already had `posthog-js` installed with a `trackEvent` wrapper (`src/lib/analytics.ts`) and comprehensive event coverage for the core AR experience flow. This integration pass extends coverage to error and churn scenarios, enables automatic exception capture, and corrects the PostHog host configuration.

## Changes made

| File | Change |
|------|--------|
| `src/lib/analytics.ts` | Added `capture_exceptions: true` to posthog.init; corrected default `api_host` to `https://us.i.posthog.com` |
| `src/types/ar.ts` | Added 4 new event names to the `AREventName` union type |
| `src/pages/ARExperiencePage.tsx` | Added `experience_not_found` event when a slug is invalid/inactive; added `ar_retry_clicked` event on the retry button |
| `src/pages/SpotRedirectPage.tsx` | Added `spot_resolve_failed` event when a spot ID cannot be resolved |
| `src/pages/QRGeneratorPage.tsx` | Added `qr_generator_opened` event on mount |
| `.env.local` | Updated `VITE_POSTHOG_KEY` and `VITE_POSTHOG_HOST` to correct values |

## All tracked events

| Event | Description | File |
|-------|-------------|------|
| `page_view` | User opens a specific AR experience page | `src/pages/ARExperiencePage.tsx` |
| `qr_scan_detected` | QR scan identified via `?spot=` param or dynamic spot route | `src/pages/ARExperiencePage.tsx`, `SpotRedirectPage.tsx` |
| `model_loaded` | 3D model finished loading successfully | `src/pages/ARExperiencePage.tsx` |
| `model_load_error` | 3D model failed to load | `src/pages/ARExperiencePage.tsx` |
| `ar_button_clicked` | User tapped the AR activation button | `src/pages/ARExperiencePage.tsx` |
| `ar_started` | AR session successfully started | `src/pages/ARExperiencePage.tsx` |
| `fallback_viewed` | Non-AR device shown fallback UI | `src/pages/ARExperiencePage.tsx` |
| `cta_clicked` | User tapped the CTA button (guide / sponsor link) | `src/pages/ARExperiencePage.tsx` |
| `catalog_viewed` | User lands on the AR experiences catalog | `src/pages/ARCatalogPage.tsx` |
| `experience_selected` | User taps an experience card in the catalog | `src/pages/ARCatalogPage.tsx` |
| `qr_downloaded` | Admin downloads a QR code SVG | `src/pages/QRGeneratorPage.tsx` |
| `experience_not_found` | *(new)* Invalid or inactive experience slug visited | `src/pages/ARExperiencePage.tsx` |
| `ar_retry_clicked` | *(new)* User taps retry after a model load error | `src/pages/ARExperiencePage.tsx` |
| `spot_resolve_failed` | *(new)* Physical QR spot ID not found, inactive, or unassigned | `src/pages/SpotRedirectPage.tsx` |
| `qr_generator_opened` | *(new)* Admin opens the QR generator tool | `src/pages/QRGeneratorPage.tsx` |

## Next steps

We've built some insights and a dashboard for you to keep an eye on user behavior, based on the events we just instrumented:

- **Dashboard — Analytics basics:** https://us.posthog.com/project/414623/dashboard/1558550
- **AR Activation Funnel** (QR scan → model loaded → AR button clicked → AR started): https://us.posthog.com/project/414623/insights/EYqB4WkQ
- **Daily AR Events Trend** (QR scans, model loads, AR activations, CTA clicks over time): https://us.posthog.com/project/414623/insights/QQYnb6dM
- **Model Load Error Rate** (errors vs. successful loads per day): https://us.posthog.com/project/414623/insights/0Dros9mY
- **QR Scans by Spot** (which physical totems generate the most traffic): https://us.posthog.com/project/414623/insights/N3LPXCQz
- **AR Fallback Rate by Device OS** (fallback vs. AR starts per platform): https://us.posthog.com/project/414623/insights/btnoCxVN

### Agent skill

We've left an agent skill folder in your project. You can use this context for further agent development when using Claude Code. This will help ensure the model provides the most up-to-date approaches for integrating PostHog.

</wizard-report>
