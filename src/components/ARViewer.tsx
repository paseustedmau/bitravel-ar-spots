import { useRef, useEffect, useCallback } from 'react';

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
    <ModelViewer
      ref={viewerRef}
      src={glbUrl}
      ios-src={usdzUrl}
      poster={posterUrl}
      alt={alt}
      ar=""
      ar-modes="scene-viewer webxr quick-look"
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
        ── AR Button inside model-viewer slot ──────────────────────────────
        model-viewer natively manages this button to open Scene Viewer (Android)
        or Quick Look (iOS). Styling here via inline style for shadow DOM compat.
      */}
      <button
        slot="ar-button"
        id="ar-activate-btn"
        onClick={onARButtonClick}
        style={{
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
        }}
      >
        {/* 3D cube icon */}
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
          <path d="M12 2L2 7v10l10 5 10-5V7L12 2z" stroke="white" strokeWidth="1.8" strokeLinejoin="round"/>
          <path d="M2 7l10 5m0 0l10-5m-10 5v10" stroke="white" strokeWidth="1.8" strokeLinecap="round"/>
        </svg>
        {arButtonLabel}
      </button>
    </ModelViewer>
  );
}
