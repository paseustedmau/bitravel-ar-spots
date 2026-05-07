interface ARFallbackProps {
  lang: 'es' | 'en';
  ctaLabel: string;
  ctaUrl: string;
  onCtaClick?: () => void;
}

const copy = {
  es: {
    badge: 'Vista 3D',
    message: 'Tu dispositivo no permite abrir realidad aumentada en este momento, pero puedes explorar el modelo en 3D y continuar descubriendo la guía Bitravel.',
    hint: 'Puedes rotar el modelo con tu dedo.',
  },
  en: {
    badge: '3D View',
    message: "Your device doesn't support augmented reality right now, but you can still explore the 3D model and continue discovering the Bitravel guide.",
    hint: 'You can rotate the model with your finger.',
  },
};

export default function ARFallback({ lang, ctaLabel, ctaUrl, onCtaClick }: ARFallbackProps) {
  const c = copy[lang];

  const handleCTA = () => {
    onCtaClick?.();
    window.open(ctaUrl, '_blank', 'noopener,noreferrer');
  };

  return (
    <div
      className="mx-5 mb-4 p-4 rounded-2xl flex flex-col gap-3"
      style={{
        backgroundColor: 'var(--color-surface)',
        border: '1px solid var(--color-border)',
      }}
      role="alert"
    >
      <div className="flex items-center gap-2">
        <span
          className="text-xs px-2.5 py-1 rounded-full font-medium"
          style={{
            backgroundColor: 'rgba(46, 139, 87, 0.12)',
            color: 'var(--color-eco)',
          }}
        >
          {c.badge}
        </span>
      </div>

      <p className="text-sm leading-relaxed" style={{ color: 'var(--color-muted)' }}>
        {c.message}
      </p>

      <p className="text-xs" style={{ color: 'var(--color-muted-light)' }}>
        💡 {c.hint}
      </p>

      <button
        id="ar-fallback-cta"
        onClick={handleCTA}
        className="w-full py-3 px-4 rounded-xl text-sm font-semibold text-white transition-all duration-200 active:scale-95"
        style={{ backgroundColor: 'var(--color-cta)' }}
      >
        {ctaLabel} →
      </button>
    </div>
  );
}
