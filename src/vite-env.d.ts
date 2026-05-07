/// <reference types="vite/client" />

// ── model-viewer web component JSX declaration ─────────────────────────────
declare namespace JSX {
  interface IntrinsicElements {
    'model-viewer': React.DetailedHTMLProps<ModelViewerHTMLAttributes, HTMLElement>;
  }
}

interface ModelViewerHTMLAttributes extends React.HTMLAttributes<HTMLElement> {
  src?: string;
  'ios-src'?: string;
  poster?: string;
  alt?: string;
  ar?: boolean | '';
  'ar-modes'?: string;
  'camera-controls'?: boolean | '';
  'auto-rotate'?: boolean | '';
  'auto-rotate-delay'?: number;
  'rotation-per-second'?: string;
  'shadow-intensity'?: string;
  'shadow-softness'?: string;
  exposure?: string;
  'environment-image'?: string;
  loading?: 'auto' | 'lazy' | 'eager';
  reveal?: 'auto' | 'manual';
  'ar-status'?: string;
  'ar-scale'?: 'auto' | 'fixed';
  'min-camera-orbit'?: string;
  'max-camera-orbit'?: string;
  'field-of-view'?: string;
  ref?: React.Ref<HTMLElement>;
}
