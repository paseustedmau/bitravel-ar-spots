import { useRef, useEffect, useCallback } from 'react';
import { getDeviceInfo } from '@/lib/device';

interface ARViewerProps {
  glbUrl: string;
  usdzUrl?: string;
  posterUrl: string;
  alt: string;
  arButtonLabel: string;
  onLoad?: () => void;
  onError?: () => void;
  onARStart?: () => void;
  onARButtonClick?: () => void;
}

function CubeIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M12 2L2 7v10l10 5 10-5V7L12 2z" stroke="white" strokeWidth="1.8" strokeLinejoin="round"/>
      <path d="M2 7l10 5m0 0l10-5m-10 5v10" stroke="white" strokeWidth="1.8" strokeLinecap="round"/>
    </svg>
  );
}

/* ─── Detect in-app / embedded WebView browsers ────────────────────────── */
function isWebView(): boolean {
  const ua = navigator.userAgent;
  return /FBAN|FBAV|Instagram|Line\/|Twitter|Snapchat|WhatsApp|MicroMessenger|TikTok/i.test(ua);
}

/* ─── Build the Scene Viewer intent URL for Android ────────────────────── */
function buildSceneViewerUrl(glbUrl: string, title: string): string {
  const absoluteGlb = new URL(glbUrl, window.location.origin).href;
  const fallbackUrl = window.location.href;

  return (
    `intent://arvr.google.com/scene-viewer/1.0` +
    `?file=${encodeURIComponent(absoluteGlb)}` +
    `&mode=ar_preferred` +
    `&title=${encodeURIComponent(title)}` +
    `#Intent;scheme=https;package=com.google.android.googlequicksearchbox;` +
    `action=android.intent.action.VIEW;` +
    `S.browser_fallback_url=${encodeURIComponent(fallbackUrl)};end;`
  );
}

/* ─── Open iOS Quick Look via dynamic <a rel="ar"> ─────────────────────── */
function openIOSQuickLook(usdzUrl: string, posterUrl: string) {
  const anchor = document.createElement('a');
  anchor.setAttribute('rel', 'ar');
  anchor.setAttribute('href', usdzUrl);

  const img = document.createElement('img');
  img.setAttribute('src', posterUrl);
  img.setAttribute('alt', '');

  anchor.appendChild(img);
  anchor.style.display = 'none';

  document.body.appendChild(anchor);
  anchor.click();
  document.body.removeChild(anchor);
}

export default function ARViewer({
  glbUrl,
  usdzUrl,
  posterUrl,
  alt,
  arButtonLabel,
  onLoad,
  onError,
  onARStart,
  onARButtonClick,
}: ARViewerProps) {
  const viewerRef = useRef<HTMLElement>(null);
  const device = getDeviceInfo();

  const handleLoad = useCallback(() => {
    onLoad?.();
  }, [onLoad]);

  const handleError = useCallback(() => {
    onError?.();
  }, [onError]);

  const handleArStatus = useCallback((e: Event) => {
    const event = e as CustomEvent<{ status: string }>;
    if (event.detail?.status === 'session-started') {
      onARStart?.();
    }
  }, [onARStart]);

  useEffect(() => {
    const el = viewerRef.current;
    if (!el) return;

    el.addEventListener('load', handleLoad);
    el.addEventListener('error', handleError);
    el.addEventListener('ar-status', handleArStatus);

    return () => {
      el.removeEventListener('load', handleLoad);
      el.removeEventListener('error', handleError);
      el.removeEventListener('ar-status', handleArStatus);
    };
  }, [handleLoad, handleError, handleArStatus]);

  /* ─── AR launch: decide what to do on click ────────────────────────── */
  const handleARClick = useCallback(() => {
    onARButtonClick?.();

    if (device.isIOS && usdzUrl) {
      openIOSQuickLook(usdzUrl, posterUrl);
      return;
    }

    if (device.isAndroid) {
      window.location.href = buildSceneViewerUrl(glbUrl, alt);
      return;
    }

    // Desktop / unsupported: try model-viewer activateAR as last resort
    const viewer = viewerRef.current as any;
    if (viewer && typeof viewer.activateAR === 'function') {
      viewer.activateAR();
    }
  }, [device.isIOS, device.isAndroid, usdzUrl, posterUrl, glbUrl, alt, onARButtonClick]);

  /* ─── Copy link for WebView users ──────────────────────────────────── */
  const handleCopyLink = useCallback(() => {
    navigator.clipboard.writeText(window.location.href).then(() => {
      const btn = document.getElementById('copy-link-btn');
      if (btn) btn.textContent = '✓ Enlace copiado';
    });
  }, []);

  const ModelViewer = 'model-viewer' as unknown as React.ElementType;
  const inWebView = isWebView();

  return (
    <>
      {/* ── 3D Viewer — pure viewer, no AR logic ──────────────────────── */}
      <ModelViewer
        ref={viewerRef}
        src={glbUrl}
        poster={posterUrl}
        alt={alt}
        camera-controls=""
        auto-rotate=""
        auto-rotate-delay={2000}
        rotation-per-second="20deg"
        shadow-intensity="1"
        shadow-softness="1"
        exposure="1"
        loading="eager"
        reveal="auto"
        style={{
          width: '100%',
          height: '100%',
          minHeight: '320px',
          display: 'block',
          backgroundColor: 'transparent',
        }}
      >
      </ModelViewer>

      {/* ── Button area: ALWAYS rendered, OUTSIDE model-viewer, normal flow ── */}
      <div
        style={{
          padding: '16px 20px 0',
          position: 'relative',
          zIndex: 9999,
        }}
      >
        {inWebView ? (
          /* ── WebView: show "open in real browser" + copy link ────── */
          <div
            style={{
              padding: '14px 20px',
              backgroundColor: '#fff',
              borderRadius: '16px',
              boxShadow: '0 2px 16px rgba(0,0,0,0.1)',
              display: 'flex',
              flexDirection: 'column',
              gap: '10px',
              alignItems: 'center',
              textAlign: 'center',
            }}
          >
            <p style={{ fontSize: '13px', color: '#333', margin: 0, fontWeight: 600 }}>
              Para vivir la experiencia AR, abre esta página en {device.isIOS ? 'Safari' : 'Chrome'}.
            </p>
            <button
              id="copy-link-btn"
              type="button"
              onClick={handleCopyLink}
              style={{
                width: '100%',
                padding: '14px 20px',
                backgroundColor: '#3234DA',
                color: '#fff',
                border: 'none',
                borderRadius: '16px',
                fontSize: '15px',
                fontWeight: 700,
                cursor: 'pointer',
              }}
            >
              📋 Copiar enlace
            </button>
          </div>
        ) : (
          /* ── Normal browser: AR button, ALWAYS visible, NO conditions ── */
          <button
            id="ar-activate-btn"
            type="button"
            onClick={handleARClick}
            style={{
              display: 'flex',
              width: '100%',
              padding: '16px 24px',
              backgroundColor: '#3234DA',
              color: '#ffffff',
              border: 'none',
              borderRadius: '16px',
              fontSize: '16px',
              fontWeight: 700,
              fontFamily: "'Inter', system-ui, sans-serif",
              letterSpacing: '-0.01em',
              cursor: 'pointer',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '10px',
              boxShadow: '0 4px 24px rgba(50, 52, 218, 0.35)',
              WebkitTapHighlightColor: 'transparent',
              position: 'relative',
              zIndex: 9999,
              visibility: 'visible',
              opacity: 1,
            }}
          >
            <CubeIcon />
            <span>{arButtonLabel}</span>
          </button>
        )}
      </div>
    </>
  );
}
