import { useEffect, useRef, useState, useCallback } from 'react';
import { useParams, useSearchParams } from 'react-router-dom';
import ARViewer from '@/components/ARViewer';
import ARExperienceHeader from '@/components/ARExperienceHeader';
import ARInstructions from '@/components/ARInstructions';
import ARCTA from '@/components/ARCTA';
import ARFallback from '@/components/ARFallback';
import ARLoadingSkeleton from '@/components/ARLoadingSkeleton';
import { detectLanguage } from '@/lib/i18n';
import { getDeviceInfo } from '@/lib/device';
import { trackEvent } from '@/lib/analytics';
import { supabase } from '@/lib/supabase';
import type { Lang } from '@/types/ar';

type ViewerState = 'loading' | 'ready' | 'error';

const uiCopy = {
  es: {
    arButton: 'Ver en realidad aumentada',
    notFound: 'Experiencia no encontrada',
    notFoundSub: 'El contenido que buscas no está disponible. Descubre más en la guía Bitravel.',
    errorMsg: 'No pudimos cargar esta experiencia. Intenta de nuevo o explora la guía Bitravel.',
    retryBtn: 'Reintentar',
    guideBtn: 'Ir a la guía Bitravel',
    arActivated: '¡Realidad aumentada activada!',
    loading: 'Preparando experiencia...',
  },
  en: {
    arButton: 'View in augmented reality',
    notFound: 'Experience not found',
    notFoundSub: "The content you're looking for isn't available. Discover more on the Bitravel guide.",
    errorMsg: "We couldn't load this experience. Please try again or explore the Bitravel guide.",
    retryBtn: 'Try again',
    guideBtn: 'Go to Bitravel guide',
    arActivated: 'Augmented reality activated!',
    loading: 'Loading experience...',
  },
};

export default function ARExperiencePage() {
  const { slug } = useParams<{ slug: string }>();
  const [searchParams] = useSearchParams();

  const spotId = searchParams.get('spot') ?? undefined;
  const campaign = searchParams.get('campaign') ?? undefined;

  const [lang, setLang] = useState<Lang>('es');
  const [viewerState, setViewerState] = useState<ViewerState>('loading');
  const [showInstructions, setShowInstructions] = useState(true);
  const [arActivated, setArActivated] = useState(false);
  
  const [experience, setExperience] = useState<any>(null);
  const [expLoading, setExpLoading] = useState(true);

  const deviceInfo = useRef(getDeviceInfo());
  const trackedPageView = useRef(false);
  const trackedNotFound = useRef(false);

  const ui = uiCopy[lang];

  // ── Fetch Experience ───────────────────────────────────────────────────────
  useEffect(() => {
    if (!slug) return;
    async function loadExperience() {
      const { data } = await supabase
        .from('ar_experiences')
        .select('*')
        .eq('slug', slug)
        .eq('status', 'active')
        .single();
      
      setExperience(data);
      setExpLoading(false);
    }
    loadExperience();
  }, [slug]);

  // ── Language detection ───────────────────────────────────────────────────
  useEffect(() => {
    setLang(detectLanguage(searchParams));
  }, [searchParams]);

  // ── Analytics: page_view ─────────────────────────────────────────────────
  useEffect(() => {
    if (trackedPageView.current || !slug || expLoading) return;
    if (!experience) {
      if (!trackedNotFound.current) {
        trackedNotFound.current = true;
        const { os, deviceType } = deviceInfo.current;
        trackEvent({
          event: 'experience_not_found',
          experience_slug: slug,
          spot_id: spotId,
          language: lang,
          device_os: os,
          device_type: deviceType,
          timestamp: new Date().toISOString(),
          campaign,
        });
      }
      return;
    }

    trackedPageView.current = true;
    const { os, deviceType } = deviceInfo.current;
    trackEvent({
      event: 'page_view',
      experience_slug: slug,
      spot_id: spotId,
      zone: experience.zone,
      language: lang,
      device_os: os,
      device_type: deviceType,
      timestamp: new Date().toISOString(),
      campaign,
    });
    
    if (spotId) {
      trackEvent({
        event: 'qr_scan_detected',
        experience_slug: slug,
        spot_id: spotId,
        zone: experience.zone,
        language: lang,
        device_os: os,
        device_type: deviceType,
        timestamp: new Date().toISOString(),
        campaign,
      });
    }
  }, [slug, spotId, campaign, lang, experience, expLoading]);

  // ── Model callbacks ──────────────────────────────────────────────────────
  const handleModelLoad = useCallback(() => {
    setViewerState('ready');
    if (!slug) return;
    trackEvent({
      event: 'model_loaded',
      experience_slug: slug,
      spot_id: spotId,
      zone: experience?.zone,
      language: lang,
      device_os: deviceInfo.current.os,
      device_type: deviceInfo.current.deviceType,
      timestamp: new Date().toISOString(),
    });
  }, [slug, spotId, experience?.zone, lang]);

  const handleModelError = useCallback(() => {
    setViewerState('error');
    if (!slug) return;
    trackEvent({
      event: 'model_load_error',
      experience_slug: slug,
      spot_id: spotId,
      zone: experience?.zone,
      language: lang,
      device_os: deviceInfo.current.os,
      device_type: deviceInfo.current.deviceType,
      timestamp: new Date().toISOString(),
    });
  }, [slug, spotId, experience?.zone, lang]);

  const handleARStart = useCallback(() => {
    setArActivated(true);
    setShowInstructions(false);
    if (!slug) return;
    trackEvent({
      event: 'ar_started',
      experience_slug: slug,
      spot_id: spotId,
      zone: experience?.zone,
      language: lang,
      device_os: deviceInfo.current.os,
      device_type: deviceInfo.current.deviceType,
      timestamp: new Date().toISOString(),
    });
  }, [slug, spotId, experience?.zone, lang]);

  const handleARButtonClick = useCallback(() => {
    if (!slug) return;
    trackEvent({
      event: 'ar_button_clicked',
      experience_slug: slug,
      spot_id: spotId,
      zone: experience?.zone,
      language: lang,
      device_os: deviceInfo.current.os,
      device_type: deviceInfo.current.deviceType,
      timestamp: new Date().toISOString(),
    });
  }, [slug, spotId, experience?.zone, lang]);

  const handleCTAClick = useCallback(() => {
    if (!slug) return;
    trackEvent({
      event: 'cta_clicked',
      experience_slug: slug,
      spot_id: spotId,
      zone: experience?.zone,
      language: lang,
      device_os: deviceInfo.current.os,
      device_type: deviceInfo.current.deviceType,
      timestamp: new Date().toISOString(),
    });
  }, [slug, spotId, experience?.zone, lang]);

  const handleFallbackCTAClick = useCallback(() => {
    if (!slug) return;
    trackEvent({
      event: 'fallback_viewed',
      experience_slug: slug,
      spot_id: spotId,
      zone: experience?.zone,
      language: lang,
      device_os: deviceInfo.current.os,
      device_type: deviceInfo.current.deviceType,
      timestamp: new Date().toISOString(),
    });
    handleCTAClick();
  }, [slug, spotId, experience?.zone, lang, handleCTAClick]);

  // ── 404 & Loading ────────────────────────────────────────────────────────
  if (expLoading) {
    return (
      <div className="min-h-screen" style={{ maxWidth: '480px', margin: '0 auto', backgroundColor: 'var(--color-bg)' }}>
        <div className="px-5 pt-8">
          <ARLoadingSkeleton />
        </div>
      </div>
    );
  }

  if (!experience) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center px-6 text-center">
        <div className="text-5xl mb-4">🐋</div>
        <h1 className="text-xl font-bold mb-2" style={{ color: 'var(--color-text)' }}>
          {ui.notFound}
        </h1>
        <p className="text-sm mb-6" style={{ color: 'var(--color-muted)' }}>
          {ui.notFoundSub}
        </p>
        <a
          href="https://bitravel.app"
          className="px-6 py-3 rounded-2xl text-sm font-semibold text-white"
          style={{ backgroundColor: 'var(--color-primary)' }}
        >
          {ui.guideBtn}
        </a>
      </div>
    );
  }

  const title = lang === 'es' ? experience.title_es : (experience.title_en || experience.title_es);
  const description = lang === 'es' ? experience.description_es : (experience.description_en || experience.description_es);
  const instruction = lang === 'es' ? experience.instruction_es : (experience.instruction_en || experience.instruction_es);
  const ctaLabel = lang === 'es' ? experience.cta_label_es : (experience.cta_label_en || experience.cta_label_es);
  const ctaUrl = experience.cta_url;

  const showFallback = !deviceInfo.current.supportsAR && viewerState === 'ready';

  return (
    <div
      className="min-h-screen flex flex-col"
      style={{ maxWidth: '480px', margin: '0 auto', backgroundColor: 'var(--color-bg)' }}
    >
      {/* ── Header ── */}
      <ARExperienceHeader
        title={viewerState === 'loading' ? '' : title}
        description={viewerState === 'loading' ? '' : description}
        zone={experience.zone}
        sponsorName={experience.sponsor_name}
        sponsorLogoUrl={experience.sponsor_logo_url}
      />

      {/* ── Model Viewer ── */}
      <div
        className="mx-5 rounded-2xl relative"
        style={{
          minHeight: '320px',
          backgroundColor: 'var(--color-surface)',
          boxShadow: '0 2px 20px rgba(0,0,0,0.06)',
          overflow: 'visible',
        }}
      >
        {/* Loading overlay */}
        {viewerState === 'loading' && (
          <div
            className="absolute inset-0 flex items-center justify-center z-10 rounded-2xl"
            style={{ backgroundColor: 'var(--color-surface)' }}
          >
            <div className="text-center">
              <div
                className="w-12 h-12 rounded-2xl mx-auto mb-3 animate-spin"
                style={{
                  border: '3px solid var(--color-border)',
                  borderTopColor: 'var(--color-primary)',
                }}
              />
              <p className="text-xs" style={{ color: 'var(--color-muted-light)' }}>
                {ui.loading}
              </p>
            </div>
          </div>
        )}

        {viewerState === 'error' ? (
          <div className="absolute inset-0 flex items-center justify-center p-6 text-center">
            <div>
              <div className="text-3xl mb-3">⚠️</div>
              <p className="text-sm mb-4" style={{ color: 'var(--color-muted)' }}>
                {ui.errorMsg}
              </p>
              <button
                onClick={() => {
                  if (slug) {
                    trackEvent({
                      event: 'ar_retry_clicked',
                      experience_slug: slug,
                      spot_id: spotId,
                      zone: experience?.zone,
                      language: lang,
                      device_os: deviceInfo.current.os,
                      device_type: deviceInfo.current.deviceType,
                      timestamp: new Date().toISOString(),
                    });
                  }
                  window.location.reload();
                }}
                className="px-4 py-2 rounded-xl text-sm font-semibold text-white"
                style={{ backgroundColor: 'var(--color-primary)' }}
              >
                {ui.retryBtn}
              </button>
            </div>
          </div>
        ) : (
          <ARViewer
            glbUrl={experience.model_glb_url}
            androidGlbUrl={experience.model_android_glb_url}
            usdzUrl={experience.model_usdz_url}
            posterUrl={experience.poster_url}
            alt={title}
            arButtonLabel={ui.arButton}
            lang={lang}
            onLoad={handleModelLoad}
            onError={handleModelError}
            onARStart={handleARStart}
            onARButtonClick={handleARButtonClick}
          />
        )}
      </div>

      {/* ── Gap ── */}
      <div className="h-4" />

      {/* ── AR activated badge ── */}
      {arActivated && (
        <div
          className="mx-5 mb-3 px-4 py-2.5 rounded-xl flex items-center gap-2"
          style={{ backgroundColor: 'rgba(46, 139, 87, 0.1)' }}
        >
          <span className="text-sm">✅</span>
          <p className="text-sm font-medium" style={{ color: 'var(--color-eco)' }}>
            {ui.arActivated}
          </p>
        </div>
      )}

      {/* ── Skeleton while loading ── */}
      {viewerState === 'loading' && (
        <div className="px-5">
          <ARLoadingSkeleton />
        </div>
      )}

      {/* ── Instructions (only when model ready + AR supported + not yet activated) ── */}
      {viewerState === 'ready' && !showFallback && !arActivated && (
        <ARInstructions instruction={instruction} visible={showInstructions} />
      )}

      {/* ── Fallback for non-AR devices ── */}
      {showFallback && (
        <ARFallback
          lang={lang}
          ctaLabel={ctaLabel}
          ctaUrl={ctaUrl}
          onCtaClick={handleFallbackCTAClick}
        />
      )}

      {/* ── CTA secundario ── */}
      {viewerState === 'ready' && ctaUrl && (
        <ARCTA
          label={ctaLabel}
          url={ctaUrl}
          onClick={handleCTAClick}
        />
      )}
    </div>
  );
}
