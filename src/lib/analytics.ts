import posthog from 'posthog-js';
import { supabase } from '@/lib/supabase';
import type { AREventPayload } from '@/types/ar';

// ── PostHog Init ──────────────────────────────────────────────────────────
const POSTHOG_KEY = import.meta.env.VITE_POSTHOG_KEY as string | undefined;
const POSTHOG_HOST = import.meta.env.VITE_POSTHOG_HOST as string | undefined;

let posthogInitialized = false;

function initPosthog() {
  if (posthogInitialized || !POSTHOG_KEY) return;
  posthog.init(POSTHOG_KEY, {
    api_host: POSTHOG_HOST ?? 'https://us.i.posthog.com',
    capture_pageview: false,  // we handle this manually
    capture_pageleave: false,
    autocapture: false,
    persistence: 'memory',    // no cookies — privacy-friendly
    capture_exceptions: true,
  });
  posthogInitialized = true;
}

// ── Track ─────────────────────────────────────────────────────────────────

export async function trackEvent(payload: AREventPayload): Promise<void> {
  if (import.meta.env.DEV) {
    console.log('[AR Analytics]', payload.event, payload);
  }

  // 1. PostHog (primary — dashboards & funnels)
  try {
    initPosthog();
    if (posthogInitialized) {
      posthog.capture(payload.event, {
        experience_slug: payload.experience_slug,
        spot_id: payload.spot_id,
        zone: payload.zone,
        language: payload.language,
        device_os: payload.device_os,
        device_type: payload.device_type,
        campaign: payload.campaign,
      });
    }
  } catch {
    // Fire-and-forget — never block UX
  }

  // 2. Supabase (secondary — raw persistence for custom reports)
  try {
    await supabase.from('ar_events').insert({
      event: payload.event,
      experience_slug: payload.experience_slug ?? null,
      spot_id: payload.spot_id ?? null,
      zone: payload.zone ?? null,
      language: payload.language,
      device_os: payload.device_os,
      device_type: payload.device_type,
      campaign: payload.campaign ?? null,
    });
  } catch {
    // Fire-and-forget — never block UX
  }
}
