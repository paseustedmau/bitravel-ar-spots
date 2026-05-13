import { useRef, useEffect, useCallback } from 'react';
import { getDeviceInfo } from '@/lib/device';

interface ARViewerProps {
  glbUrl: string;
  androidGlbUrl?: string;
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
  androidGlbUrl,
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
      window.location.href = buildSceneViewerUrl(androidGlbUrl || glbUrl, alt);
      return;
    }

    // Desktop / unsupported: try model-viewer activateAR as last resort
    const viewer = viewerRef.current as any;
    if (viewer && typeof viewer.activateAR === 'function') {
      viewer.activateAR();
    }
  }, [device.isIOS, device.isAndroid, usdzUrl, posterUrl, glbUrl, androidGlbUrl, alt, onARButtonClick]);

  /* ─── Open in external browser for WebView users ───────────────────── */
  const handleOpenBrowser = useCallback(() => {
    const url = window.location.href;
    
    // Always copy to clipboard as a reliable fallback
    navigator.clipboard.writeText(url).then(() => {
      const btn = document.getElementById('copy-link-btn');
      if (btn) {
        const span = btn.querySelector('span');
        if (span) span.textContent = '✓ ¡Enlace copiado!';
        
        // On Android, we can try to force open the default system browser
        if (device.isAndroid) {
          // Intent scheme trick for Android to escape WebViews
          const intentUrl = `intent://${window.location.host}${window.location.pathname}${window.location.search}#Intent;scheme=https;action=android.intent.action.VIEW;end;`;
          window.location.href = intentUrl;
        }
        // iOS: No reliable way to force Safari open from Instagram/WA via JS alone,
        // so the "Copy Link" fallback is the best we can do.

        setTimeout(() => {
          if (span) span.textContent = '📋 Copiar enlace y abrir en navegador web';
        }, 3000);
      }
    });
  }, [device.isAndroid]);

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
              padding: '20px',
              backgroundColor: '#fff',
              borderRadius: '20px',
              boxShadow: '0 8px 32px rgba(0,0,0,0.08)',
              display: 'flex',
              flexDirection: 'column',
              gap: '12px',
              alignItems: 'center',
              textAlign: 'center',
              border: '1px solid rgba(0,0,0,0.04)',
            }}
          >
            <p style={{ 
              fontSize: '14px', 
              color: '#1A1A1A', 
              margin: 0, 
              fontWeight: 600,
              lineHeight: '1.4'
            }}>
              Para vivir la experiencia AR, abre esta página en el navegador ({device.isIOS ? 'Safari' : 'Chrome'}).
            </p>
            <button
              id="copy-link-btn"
              type="button"
              onClick={handleOpenBrowser}
              style={{
                width: '100%',
                padding: '16px 20px',
                backgroundColor: '#3234DA',
                color: '#fff',
                border: 'none',
                borderRadius: '16px',
                fontSize: '15px',
                fontWeight: 700,
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '8px',
                transition: 'transform 0.2s ease, background-color 0.2s ease',
              }}
            >
              <span>📋 Copiar enlace y abrir en navegador web</span>
            </button>
            <p style={{ fontSize: '11px', color: '#666', margin: 0 }}>
              {device.isIOS 
                ? 'Toca los tres puntos arriba y selecciona "Abrir en Safari"' 
                : 'Toca los tres puntos arriba y selecciona "Abrir en el navegador"'}
            </p>
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
