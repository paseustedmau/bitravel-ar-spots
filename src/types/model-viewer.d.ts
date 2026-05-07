// model-viewer is loaded as a web component via CDN in index.html
// This declaration lets TypeScript know about its JSX element.
declare global {
  namespace JSX {
    interface IntrinsicElements {
      'model-viewer': ModelViewerAttributes;
    }
  }
}

interface ModelViewerAttributes extends React.HTMLAttributes<HTMLElement> {
  src?: string;
  'ios-src'?: string;
  poster?: string;
  alt?: string;
  ar?: boolean;
  'ar-modes'?: string;
  'camera-controls'?: boolean;
  'auto-rotate'?: boolean;
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
  id?: string;
  ref?: React.Ref<HTMLElement>;
  onLoad?: () => void;
  onError?: (event: Event) => void;
  onArStatusChange?: (event: CustomEvent) => void;
}

export {};
