// ── AR Experience Types ────────────────────────────────────────────────────

export interface LocalizedString {
  es: string;
  en: string;
}

export interface ARExperienceCTA {
  label: LocalizedString;
  url: string;
  type: 'guide' | 'marketplace' | 'sponsor' | 'external';
}

export interface ARExperienceSponsor {
  name: string;
  logoUrl: string;
  url?: string;
}

export interface ARExperience {
  slug: string;
  status: 'active' | 'inactive' | 'draft';
  title: LocalizedString;
  description: LocalizedString;
  instruction: LocalizedString;
  modelGlbUrl: string;
  modelUsdzUrl?: string;
  posterUrl: string;
  cta: ARExperienceCTA;
  sponsor?: ARExperienceSponsor;
  tags: string[];
  zone?: string;
}

// ── Analytics Event Types ──────────────────────────────────────────────────

export type AREventName =
  | 'page_view'
  | 'qr_scan_detected'
  | 'model_loaded'
  | 'model_load_error'
  | 'ar_button_clicked'
  | 'ar_started'
  | 'fallback_viewed'
  | 'cta_clicked';

export type DeviceOS = 'ios' | 'android' | 'other';
export type DeviceType = 'mobile' | 'tablet' | 'desktop';
export type Lang = 'es' | 'en';

export interface AREventPayload {
  event: AREventName;
  experience_slug: string;
  spot_id?: string;
  zone?: string;
  language: Lang;
  device_os: DeviceOS;
  device_type: DeviceType;
  timestamp: string;
  campaign?: string;
}

// ── URL Params ─────────────────────────────────────────────────────────────

export interface ARUrlParams {
  slug: string;
  spotId?: string;
  lang?: Lang;
  campaign?: string;
}
