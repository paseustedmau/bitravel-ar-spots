interface ARCTAProps {
  label: string;
  url: string;
  onClick?: () => void;
}

export default function ARCTA({ label, url, onClick }: ARCTAProps) {
  const handleClick = () => {
    onClick?.();
    // Navigate after analytics fires (fire-and-forget, no await needed)
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  return (
    <div className="px-5 pb-6">
      <button
        id="ar-cta-button"
        onClick={handleClick}
        aria-label={label}
        className="w-full py-3.5 px-6 rounded-2xl font-semibold text-sm text-white flex items-center justify-center gap-2 transition-all duration-200 active:scale-95"
        style={{
          backgroundColor: 'var(--color-cta)',
          boxShadow: '0 4px 16px rgba(232, 93, 74, 0.3)',
        }}
      >
        {/* Compass/explore icon */}
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
          <circle cx="12" cy="12" r="10" stroke="white" strokeWidth="1.8" />
          <path
            d="M16.24 7.76l-2.12 6.36-6.36 2.12 2.12-6.36 6.36-2.12z"
            stroke="white"
            strokeWidth="1.8"
            strokeLinejoin="round"
          />
        </svg>
        {label}
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden="true">
          <path
            d="M7 17L17 7M17 7H7M17 7v10"
            stroke="white"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </button>

      {/* Powered by Bitravel */}
      <p className="text-center text-xs mt-3" style={{ color: 'var(--color-muted-light)' }}>
        Experiencia Bitravel · Puerto Vallarta
      </p>
    </div>
  );
}
