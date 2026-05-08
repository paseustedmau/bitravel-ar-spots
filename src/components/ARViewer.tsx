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

/* ─── Style for the external AR button ──────────────────────────────────── */
const arBtnStyle: React.CSSProperties = {
  position: 'absolute',
  bottom: '16px',
  left: '50%',
  transform: 'translateX(-50%)',
  width: 'calc(100% - 40px)',
  maxWidth: '400px',
  padding: '16px 24px',
  backgroundColor: '#3234DA',
  color: '#ffffff',
  border: 'none',
  borderRadius: '16px',
  fontSize: '16px',
  fontWeight: '700',
  fontFamily: "'Inter', system-ui, sans-serif",
  letterSpacing: '-0.01em',
  cursor: 'pointer',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  gap: '10px',
  boxShadow: '0 4px 24px rgba(50, 52, 218, 0.35)',
  WebkitTapHighlightColor: 'transparent',
  textDecoration: 'none',
  zIndex: 9999,
};

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
  // Common in-app browser signatures
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
  const iosAnchorRef = useRef<HTMLAnchorElement>(null);
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

  /* ─── AR launch handler ────────────────────────────────────────────── */
  const handleARClick = useCallback(() => {
    onARButtonClick?.();

    // iOS: trigger Quick Look via the hidden <a rel="ar"> anchor.
    // This is the Apple-blessed way and works across Safari, Chrome, Firefox on iOS.
    if (device.isIOS && usdzUrl) {
      iosAnchorRef.current?.click();
      return;
    }

    // Android: open Scene Viewer intent
    if (device.isAndroid) {
      window.location.href = buildSceneViewerUrl(glbUrl, alt);
      return;
    }

    // Desktop / other: try model-viewer's built-in activateAR as last resort
    const viewer = viewerRef.current as any;
    if (viewer && typeof viewer.activateAR === 'function') {
      viewer.activateAR();
    }
  }, [device.isIOS, device.isAndroid, usdzUrl, glbUrl, alt, onARButtonClick]);

  const ModelViewer = 'model-viewer' as unknown as React.ElementType;
  const showWebViewWarning = isWebView();

  return (
    <div style={{ position: 'relative', width: '100%', height: '100%', minHeight: '320px' }}>
      {/* ── 3D Viewer (universal, no AR attributes needed — we handle AR ourselves) ── */}
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
          backgroundColor: 'transparent',
        }}
      >
      </ModelViewer>

      {/* ── Hidden iOS Quick Look anchor ─────────────────────────────────── */}
      {/* Apple requires a real <a rel="ar"> clicked by the user (we proxy via .click()) */}
      {device.isIOS && usdzUrl && (
        <a
          ref={iosAnchorRef}
          rel="ar"
          href={usdzUrl}
          style={{
            position: 'absolute',
            width: '1px',
            height: '1px',
            opacity: 0,
            pointerEvents: 'none',
            overflow: 'hidden',
          }}
          aria-hidden="true"
        >
          {/* The <img> child is required by Quick Look to recognize this as an AR link */}
          <img src={posterUrl} alt="" />
        </a>
      )}

      {/* ── WebView warning ─────────────────────────────────────────────── */}
      {showWebViewWarning ? (
        <div
          style={{
            position: 'absolute',
            bottom: '16px',
            left: '50%',
            transform: 'translateX(-50%)',
            width: 'calc(100% - 40px)',
            maxWidth: '400px',
            padding: '14px 20px',
            backgroundColor: '#fff',
            borderRadius: '16px',
            boxShadow: '0 4px 24px rgba(0,0,0,0.15)',
            zIndex: 9999,
            display: 'flex',
            flexDirection: 'column' as const,
            gap: '10px',
            alignItems: 'center',
            textAlign: 'center' as const,
          }}
        >
          <p style={{ fontSize: '13px', color: '#333', margin: 0, fontWeight: 600 }}>
            Para vivir la experiencia AR, abre esta página en {device.isIOS ? 'Safari' : 'Chrome'}.
          </p>
          <button
            onClick={() => {
              navigator.clipboard.writeText(window.location.href);
              const btn = document.getElementById('copy-link-btn');
              if (btn) btn.textContent = '✓ Enlace copiado';
            }}
            id="copy-link-btn"
            style={{
              padding: '10px 20px',
              backgroundColor: '#3234DA',
              color: '#fff',
              border: 'none',
              borderRadius: '12px',
              fontSize: '14px',
              fontWeight: 600,
              cursor: 'pointer',
            }}
          >
            📋 Copiar enlace
          </button>
        </div>
      ) : (
        /* ── AR launch button (visible on real browsers that support AR) ── */
        device.supportsAR && (
          <button
            id="ar-activate-btn"
            onClick={handleARClick}
            style={arBtnStyle}
          >
            <CubeIcon />
            <span>{arButtonLabel}</span>
          </button>
        )
      )}
    </div>
  );
}
