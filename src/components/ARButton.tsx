interface ARButtonProps {
  label: string;
  onClick: () => void;
  disabled?: boolean;
  supportsAR: boolean;
}

export default function ARButton({ label, onClick, disabled, supportsAR }: ARButtonProps) {
  return (
    <div className="px-5 pb-4">
      <button
        id="ar-main-button"
        onClick={onClick}
        disabled={disabled}
        aria-label={label}
        className="w-full py-4 px-6 rounded-2xl font-semibold text-base text-white flex items-center justify-center gap-3 transition-all duration-200 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed"
        style={{
          backgroundColor: 'var(--color-primary)',
          boxShadow: '0 4px 20px rgba(50, 52, 218, 0.35)',
        }}
      >
        {/* AR cube icon */}
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden="true">
          <path
            d="M12 2L2 7v10l10 5 10-5V7L12 2z"
            stroke="white"
            strokeWidth="1.8"
            strokeLinejoin="round"
          />
          <path
            d="M2 7l10 5m0 0l10-5m-10 5v10"
            stroke="white"
            strokeWidth="1.8"
            strokeLinecap="round"
          />
        </svg>
        {label}
        {!supportsAR && (
          <span className="text-xs opacity-70 ml-1">(3D)</span>
        )}
      </button>
    </div>
  );
}
