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

// Styles shared by both AR buttons
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
};

function CubeIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M12 2L2 7v10l10 5 10-5V7L12 2z" stroke="white" strokeWidth="1.8" strokeLinejoin="round"/>
      <path d="M2 7l10 5m0 0l10-5m-10 5v10" stroke="white" strokeWidth="1.8" strokeLinecap="round"/>
    </svg>
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
  const device = getDeviceInfo();

  // Bypass model-viewer's AR button entirely on iOS to avoid Safari/Chrome bugs.
  // Instead, we use a native <a rel="ar"> anchor which is 100% reliable across all iOS browsers.
  const needsManualQuickLook = device.isIOS && !!usdzUrl;

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

  const ModelViewer = 'model-viewer' as unknown as React.ElementType;

  return (
    <div style={{ position: 'relative', width: '100%', height: '100%', minHeight: '320px' }}>
      <ModelViewer
        ref={viewerRef}
        src={glbUrl}
        ios-src={usdzUrl}
        poster={posterUrl}
        alt={alt}
        ar=""
        ar-modes="webxr scene-viewer quick-look"
        ar-scale="auto"
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
        {/*
          Botón AR nativo del slot de model-viewer.
          Solo lo renderizamos en Android/Desktop. 
          En iOS usamos el anchor manual debajo para evitar bugs en Safari/Chrome.
        */}
        {!device.isIOS && (
          <button
            slot="ar-button"
            id="ar-activate-btn"
            onClick={onARButtonClick}
            style={arBtnStyle as React.CSSProperties}
          >
            <CubeIcon />
            {arButtonLabel}
          </button>
        )}
      </ModelViewer>

      {/*
        ── Botón manual Quick Look para iOS Chrome (y otros browsers iOS) ──────
        Chrome en iOS no expone WebXR, así que model-viewer oculta el slot ar-button.
        Sin embargo, iOS Quick Look se activa en CUALQUIER browser iOS usando:
          <a href="archivo.usdz" rel="ar">
        Este anchor se renderiza fuera del shadow DOM de model-viewer para que
        siempre sea visible cuando se necesita.
      */}
      {needsManualQuickLook && (
        <button
          id="ar-quicklook-manual"
          onClick={(e) => {
             e.preventDefault();
             onARButtonClick?.();
             
             // Delegate AR activation to model-viewer directly
             const viewer = viewerRef.current as any;
             if (viewer && typeof viewer.activateAR === 'function') {
               viewer.activateAR();
             }
          }}
          style={{
            ...arBtnStyle,
            position: 'absolute',
            bottom: '16px',
            left: '50%',
            transform: 'translateX(-50%)',
            zIndex: 10,
          }}
        >
          <CubeIcon />
          <span>{arButtonLabel}</span>
        </button>
      )}
    </div>
  );
}
