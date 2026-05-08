import { useState, useEffect } from 'react';
import { QRCodeSVG } from 'qrcode.react';
import experiencesData from '@/data/ar-experiences.json';
import type { ARExperience } from '@/types/ar';
import { trackEvent } from '@/lib/analytics';
import { getDeviceInfo } from '@/lib/device';

const experiences = Object.values(experiencesData as Record<string, ARExperience>).filter(
  (e) => e.status === 'active',
);

const BASE_URL = import.meta.env.VITE_APP_URL ?? 'https://ar.bitravel.app';

export default function QRGeneratorPage() {
  const [selectedSlug, setSelectedSlug] = useState(experiences[0]?.slug ?? '');
  const [spotId, setSpotId] = useState('');
  const [campaign, setCampaign] = useState('');

  useEffect(() => {
    const { os, deviceType } = getDeviceInfo();
    trackEvent({
      event: 'qr_generator_opened',
      language: 'es',
      device_os: os,
      device_type: deviceType,
      timestamp: new Date().toISOString(),
    });
  }, []);

  /**
   * Si hay Spot ID → QR dinámico: /s/:spot_id
   *   El tótem físico siempre tendrá la misma URL en el QR.
   *   Para cambiar la experiencia solo se actualiza la DB.
   * Si no hay Spot ID → URL directa: /ar/:slug (modo preview/testing)
   */
  const buildUrl = () => {
    if (spotId) {
      // Short link dinámico
      const params = new URLSearchParams();
      if (campaign) params.set('campaign', campaign);
      const query = params.toString();
      return `${BASE_URL}/s/${spotId}${query ? `?${query}` : ''}`;
    }
    // URL directa (sin spot ID, para testing)
    const params = new URLSearchParams();
    if (campaign) params.set('campaign', campaign);
    const query = params.toString();
    return `${BASE_URL}/ar/${selectedSlug}${query ? `?${query}` : ''}`;
  };

  // URL de destino final (solo informativa para el admin)
  const resolvedDestination = spotId
    ? `${BASE_URL}/ar/${selectedSlug}?spot=${spotId}${campaign ? `&campaign=${campaign}` : ''}`
    : null;

  const qrValue = buildUrl();
  const isDynamic = !!spotId;

  const handleDownload = () => {
    const svg = document.querySelector('#qr-preview svg') as SVGElement;
    if (!svg) return;
    const blob = new Blob([svg.outerHTML], { type: 'image/svg+xml' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `bitravel-ar-${selectedSlug}${spotId ? `-${spotId}` : ''}.svg`;
    a.click();
    URL.revokeObjectURL(url);

    const { os, deviceType } = getDeviceInfo();
    trackEvent({
      event: 'qr_downloaded',
      experience_slug: selectedSlug,
      spot_id: spotId || undefined,
      campaign: campaign || undefined,
      language: 'es',
      device_os: os,
      device_type: deviceType,
      timestamp: new Date().toISOString(),
    });
  };

  return (
    <div
      className="min-h-screen p-6"
      style={{ maxWidth: '480px', margin: '0 auto', backgroundColor: 'var(--color-bg)' }}
    >
      <div className="mb-6">
        <div className="flex items-center gap-2 mb-1">
          <div
            className="w-7 h-7 rounded-lg flex items-center justify-center text-white text-xs font-bold"
            style={{ backgroundColor: 'var(--color-primary)' }}
          >
            B
          </div>
          <span className="text-xs font-semibold" style={{ color: 'var(--color-primary)' }}>
            Bitravel AR
          </span>
        </div>
        <h1 className="text-xl font-bold mt-2" style={{ color: 'var(--color-text)' }}>
          Generador de QR
        </h1>
        <p className="text-sm mt-1" style={{ color: 'var(--color-muted)' }}>
          Genera QR imprimibles para tótems físicos.
        </p>
      </div>

      {/* Form */}
      <div className="flex flex-col gap-4 mb-6">
        {/* Experiencia */}
        <div>
          <label className="block text-xs font-semibold mb-1.5" style={{ color: 'var(--color-text)' }}>
            Experiencia
          </label>
          <select
            value={selectedSlug}
            onChange={(e) => setSelectedSlug(e.target.value)}
            className="w-full px-3 py-2.5 rounded-xl text-sm border outline-none"
            style={{
              borderColor: 'var(--color-border)',
              backgroundColor: 'var(--color-surface)',
              color: 'var(--color-text)',
            }}
          >
            {experiences.map((e) => (
              <option key={e.slug} value={e.slug}>
                {e.title.es}
              </option>
            ))}
          </select>
        </div>

        {/* Spot ID */}
        <div>
          <label className="block text-xs font-semibold mb-1.5" style={{ color: 'var(--color-text)' }}>
            Spot ID (tótem)
          </label>
          <input
            type="text"
            placeholder="ej. malecon-01"
            value={spotId}
            onChange={(e) => setSpotId(e.target.value)}
            className="w-full px-3 py-2.5 rounded-xl text-sm border outline-none"
            style={{
              borderColor: 'var(--color-border)',
              backgroundColor: 'var(--color-surface)',
              color: 'var(--color-text)',
            }}
          />
          <p className="text-xs mt-1" style={{ color: 'var(--color-muted-light)' }}>
            Identifica de qué tótem viene cada escaneo.
          </p>
        </div>

        {/* Campaign */}
        <div>
          <label className="block text-xs font-semibold mb-1.5" style={{ color: 'var(--color-text)' }}>
            Campaña (opcional)
          </label>
          <input
            type="text"
            placeholder="ej. whale-season-2026"
            value={campaign}
            onChange={(e) => setCampaign(e.target.value)}
            className="w-full px-3 py-2.5 rounded-xl text-sm border outline-none"
            style={{
              borderColor: 'var(--color-border)',
              backgroundColor: 'var(--color-surface)',
              color: 'var(--color-text)',
            }}
          />
        </div>
      </div>

      {/* URL del QR */}
      <div
        className="px-3 py-2.5 rounded-xl mb-2 text-xs break-all"
        style={{
          backgroundColor: isDynamic ? 'rgba(50,52,218,0.06)' : 'rgba(0,0,0,0.04)',
          color: isDynamic ? 'var(--color-primary)' : 'var(--color-muted)',
          fontFamily: 'monospace',
        }}
      >
        <span style={{ opacity: 0.6, fontSize: '10px', display: 'block', marginBottom: '2px' }}>
          {isDynamic ? '🔗 Short link (QR impreso)' : '🔗 URL directa (testing)'}
        </span>
        {qrValue}
      </div>

      {/* Destino resuelto (solo cuando es dinámico) */}
      {isDynamic && resolvedDestination && (
        <div
          className="px-3 py-2 rounded-xl mb-6 text-xs break-all"
          style={{
            backgroundColor: 'rgba(46,139,87,0.07)',
            color: 'var(--color-eco, #2e8b57)',
            fontFamily: 'monospace',
          }}
        >
          <span style={{ opacity: 0.7, fontSize: '10px', display: 'block', marginBottom: '2px' }}>
            ↪ Redirige a (configurable desde la DB)
          </span>
          {resolvedDestination}
        </div>
      )}
      {!isDynamic && <div className="mb-6" />}

      {/* QR Preview */}
      <div
        id="qr-preview"
        className="flex items-center justify-center p-6 rounded-2xl mb-4"
        style={{
          backgroundColor: '#fff',
          border: '1px solid var(--color-border)',
          boxShadow: '0 2px 20px rgba(0,0,0,0.06)',
        }}
      >
        <QRCodeSVG
          value={qrValue}
          size={200}
          level="H"
          fgColor="#1A1A2E"
          bgColor="#FFFFFF"
        />
      </div>

      {/* Download button */}
      <button
        onClick={handleDownload}
        className="w-full py-3.5 rounded-2xl text-sm font-semibold text-white transition-all duration-200 active:scale-95"
        style={{ backgroundColor: 'var(--color-primary)' }}
      >
        Descargar QR (SVG)
      </button>
    </div>
  );
}
