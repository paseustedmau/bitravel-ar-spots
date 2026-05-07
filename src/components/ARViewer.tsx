import { useRef, useEffect, useCallback } from 'react';

interface ARViewerProps {
  glbUrl: string;
  usdzUrl?: string;
  posterUrl: string;
  alt: string;
  onLoad?: () => void;
  onError?: () => void;
  onARStart?: () => void;
}

export default function ARViewer({
  glbUrl,
  usdzUrl,
  posterUrl,
  alt,
  onLoad,
  onError,
  onARStart,
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

  // model-viewer is a web component loaded via CDN — render as an unknown element
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
      {/* Hide default AR button — we use our own */}
      <button slot="ar-button" style={{ display: 'none' }} aria-hidden="true" />
    </ModelViewer>
  );
}
