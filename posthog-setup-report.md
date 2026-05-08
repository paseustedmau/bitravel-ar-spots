<wizard-report>
# PostHog post-wizard report

The wizard has completed a deep integration of PostHog analytics into Bitravel AR Spots. The project already had `posthog-js` installed and a solid tracking foundation in `src/lib/analytics.ts` covering the core AR experience flow. The integration extended that foundation by:

- **Adding 3 new events** covering the catalog discovery and QR admin flows that had no tracking
- **Expanding the type system** to accommodate catalog-level events (`experience_slug` made optional, 3 new `AREventName` literals)
- **Configuring environment variables** (`VITE_POSTHOG_KEY`, `VITE_POSTHOG_HOST`) in `.env`
- **Creating a PostHog dashboard** with 5 insights covering the full funnel, QR activity, device breakdown, top experiences, and CTA conversion

## Events instrumented

| Event | Description | File |
|---|---|---|
| `catalog_viewed` | User lands on the AR experiences catalog — top of funnel | `src/pages/ARCatalogPage.tsx` |
| `experience_selected` | User taps an experience card in the catalog | `src/pages/ARCatalogPage.tsx` |
| `qr_downloaded` | Admin downloads a QR code SVG with spot/campaign metadata | `src/pages/QRGeneratorPage.tsx` |
| `page_view` | User opens a specific AR experience page | `src/pages/ARExperiencePage.tsx` *(existing)* |
| `qr_scan_detected` | QR scan identified via `?spot=` URL param | `src/pages/ARExperiencePage.tsx` *(existing)* |
| `model_loaded` | 3D model finished loading successfully | `src/pages/ARExperiencePage.tsx` *(existing)* |
| `model_load_error` | 3D model failed to load | `src/pages/ARExperiencePage.tsx` *(existing)* |
| `ar_button_clicked` | User tapped the AR activation button | `src/pages/ARExperiencePage.tsx` *(existing)* |
| `ar_started` | AR session started (model-viewer `session-started` event) | `src/pages/ARExperiencePage.tsx` *(existing)* |
| `fallback_viewed` | Non-AR device shown fallback UI | `src/pages/ARExperiencePage.tsx` *(existing)* |
| `cta_clicked` | User tapped the CTA button (guide / sponsor link) | `src/pages/ARExperiencePage.tsx` *(existing)* |

## Next steps

We've built a dashboard and insights so you can monitor user behavior from day one:

- **Dashboard — Analytics basics**: https://us.posthog.com/project/414623/dashboard/1558399
  - **AR Conversion Funnel** (catalog → selected → AR button → AR started): https://us.posthog.com/project/414623/insights/wCXeFZYZ
  - **QR Scans over Time**: https://us.posthog.com/project/414623/insights/Z1m71oOZ
  - **AR Activations by Device OS**: https://us.posthog.com/project/414623/insights/oD5gf49k
  - **Top Experiences by AR Activations**: https://us.posthog.com/project/414623/insights/F8ysLK43
  - **CTA Clicks over Time**: https://us.posthog.com/project/414623/insights/HLwNSGJj

### Agent skill

We've left an agent skill folder in your project. You can use this context for further agent development when using Claude Code. This will help ensure the model provides the most up-to-date approaches for integrating PostHog.

</wizard-report>
