interface ARExperienceHeaderProps {
  title: string;
  description: string;
  zone?: string;
  sponsorName?: string;
  sponsorLogoUrl?: string;
}

export default function ARExperienceHeader({
  title,
  description,
  zone,
  sponsorName,
  sponsorLogoUrl,
}: ARExperienceHeaderProps) {
  return (
    <div className="px-5 pt-5 pb-4">
      {/* Top bar: Bitravel logo + optional sponsor */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <img 
            src="/logo.svg" 
            alt="Bitravel" 
            className="h-6"
            style={{ objectFit: 'contain' }}
          />
        </div>

        <div className="flex items-center gap-2">
          {zone && (
            <span
              className="text-xs px-2.5 py-1 rounded-full font-medium"
              style={{
                backgroundColor: 'rgba(50, 52, 218, 0.08)',
                color: 'var(--color-primary)',
              }}
            >
              {zone}
            </span>
          )}
          {sponsorName && sponsorLogoUrl && (
            <a
              href="#"
              className="flex items-center gap-1.5 text-xs rounded-full px-2.5 py-1"
              style={{
                backgroundColor: 'var(--color-surface)',
                color: 'var(--color-muted)',
              }}
            >
              <img src={sponsorLogoUrl} alt={sponsorName} className="h-4 w-auto object-contain" />
              <span>{sponsorName}</span>
            </a>
          )}
        </div>
      </div>

      {/* Title & description */}
      <h1
        className="text-2xl font-bold leading-tight mb-2"
        style={{ color: 'var(--color-text)' }}
      >
        {title}
      </h1>
      <p
        className="text-sm leading-relaxed"
        style={{ color: 'var(--color-muted)' }}
      >
        {description}
      </p>
    </div>
  );
}
