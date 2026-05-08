import { useEffect, useState, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { supabase } from '@/lib/supabase';
import { trackEvent } from '@/lib/analytics';
import { detectLanguage } from '@/lib/i18n';
import { getDeviceInfo } from '@/lib/device';

export default function ARCatalogPage() {
  const { os, deviceType } = getDeviceInfo();
  const lang = detectLanguage(new URLSearchParams(window.location.search));
  
  const [experiences, setExperiences] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    trackEvent({
      event: 'catalog_viewed',
      language: lang,
      device_os: os,
      device_type: deviceType,
      timestamp: new Date().toISOString(),
    });

    async function loadExperiences() {
      const { data } = await supabase
        .from('ar_experiences')
        .select('*')
        .eq('status', 'active')
        .order('sort_order', { ascending: true });
      
      if (data) setExperiences(data);
      setLoading(false);
    }
    loadExperiences();
  }, [lang, os, deviceType]);

  const handleExperienceSelected = useCallback((slug: string, zone?: string) => {
    trackEvent({
      event: 'experience_selected',
      experience_slug: slug,
      zone,
      language: lang,
      device_os: os,
      device_type: deviceType,
      timestamp: new Date().toISOString(),
    });
  }, [lang, os, deviceType]);

  return (
    <div
      className="min-h-screen"
      style={{ maxWidth: '480px', margin: '0 auto', backgroundColor: 'var(--color-bg)' }}
    >
      {/* Header */}
      <div
        className="px-5 pt-8 pb-6"
        style={{
          background: 'linear-gradient(135deg, #3234DA 0%, #4F51F5 100%)',
        }}
      >
        <div className="flex items-center gap-2 mb-4">
          <div className="w-8 h-8 rounded-lg bg-white/20 flex items-center justify-center text-white text-xs font-bold">
            B
          </div>
          <span className="text-white/90 text-sm font-semibold">Bitravel AR Spots</span>
        </div>
        <h1 className="text-2xl font-bold text-white mb-1">Experiencias AR</h1>
        <p className="text-white/70 text-sm">
          Escanea un QR en los tótems del destino o explora aquí.
        </p>
      </div>

      {/* Experiences list */}
      <div className="px-5 py-5 flex flex-col gap-4">
        {loading ? (
          <p className="text-center py-12" style={{ color: 'var(--color-muted)' }}>Cargando...</p>
        ) : experiences.length === 0 ? (
          <p className="text-center py-12" style={{ color: 'var(--color-muted)' }}>
            Próximamente más experiencias.
          </p>
        ) : (
          experiences.map((exp) => (
            <Link
              key={exp.slug}
              to={`/ar/${exp.slug}`}
              onClick={() => handleExperienceSelected(exp.slug, exp.zone)}
              className="block rounded-2xl overflow-hidden transition-all duration-200 active:scale-98"
              style={{
                border: '1px solid var(--color-border)',
                boxShadow: '0 2px 12px rgba(0,0,0,0.05)',
              }}
            >
              {/* Poster */}
              <div
                className="h-44 bg-cover bg-center"
                style={{
                  backgroundImage: `url(${exp.poster_url})`,
                  backgroundColor: 'var(--color-surface)',
                }}
              />
              {/* Info */}
              <div className="p-4">
                <div className="flex items-start justify-between gap-2 mb-1">
                  <h2 className="font-bold text-base" style={{ color: 'var(--color-text)' }}>
                    {lang === 'es' ? exp.title_es : (exp.title_en || exp.title_es)}
                  </h2>
                  {exp.zone && (
                    <span
                      className="text-xs px-2 py-0.5 rounded-full shrink-0"
                      style={{
                        backgroundColor: 'rgba(50,52,218,0.08)',
                        color: 'var(--color-primary)',
                      }}
                    >
                      {exp.zone}
                    </span>
                  )}
                </div>
                <p className="text-sm line-clamp-2" style={{ color: 'var(--color-muted)' }}>
                  {lang === 'es' ? exp.description_es : (exp.description_en || exp.description_es)}
                </p>
                <div className="mt-3 flex items-center gap-1 text-xs font-semibold"
                  style={{ color: 'var(--color-primary)' }}>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
                    <path d="M12 2L2 7v10l10 5 10-5V7L12 2z" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round"/>
                    <path d="M2 7l10 5m0 0l10-5m-10 5v10" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/>
                  </svg>
                  Ver en AR →
                </div>
              </div>
            </Link>
          ))
        )}
      </div>

      <p className="text-center text-xs pb-8" style={{ color: 'var(--color-muted-light)' }}>
        Bitravel AR · Puerto Vallarta
      </p>
    </div>
  );
}
