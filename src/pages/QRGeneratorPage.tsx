import { useState, useEffect, useCallback } from 'react';
import { QRCodeSVG } from 'qrcode.react';
import { trackEvent } from '@/lib/analytics';
import { getDeviceInfo } from '@/lib/device';
import { supabase } from '@/lib/supabase';
const DEFAULT_BASE = import.meta.env.VITE_APP_URL ?? window.location.origin;

interface SpotRow {
  id: string;
  spot_id: string;
  name: string;
  zone: string | null;
  experience_slug: string | null;
  is_active: boolean;
}

export default function QRGeneratorPage() {
  const [selectedSlug, setSelectedSlug] = useState('');
  const [spotId, setSpotId] = useState('');
  const [spotName, setSpotName] = useState('');
  const [campaign, setCampaign] = useState('');
  const [baseUrl, setBaseUrl] = useState(DEFAULT_BASE);

  // Supabase spots & experiences
  const [spots, setSpots] = useState<SpotRow[]>([]);
  const [experiences, setExperiences] = useState<any[]>([]);
  const [saving, setSaving] = useState(false);
  const [saveMsg, setSaveMsg] = useState('');
  const [loading, setLoading] = useState(true);

  const loadData = useCallback(async () => {
    setLoading(true);
    
    // Load active experiences
    const { data: expData } = await supabase
      .from('ar_experiences')
      .select('*')
      .eq('status', 'active')
      .order('sort_order', { ascending: true });
      
    if (expData && expData.length > 0) {
      setExperiences(expData);
      setSelectedSlug(expData[0].slug);
    }

    // Load spots
    const { data: spotData, error } = await supabase
      .from('ar_spots')
      .select('id, spot_id, name, zone, experience_slug, is_active')
      .order('created_at', { ascending: false });

    if (!error && spotData) setSpots(spotData as SpotRow[]);
    setLoading(false);
  }, []);

  useEffect(() => {
    loadData();
    const { os, deviceType } = getDeviceInfo();
    trackEvent({
      event: 'qr_generator_opened',
      language: 'es',
      device_os: os,
      device_type: deviceType,
      timestamp: new Date().toISOString(),
    });
  }, [loadData]);

  // Build the QR URL
  const buildUrl = () => {
    const base = baseUrl.trim().replace(/\/$/, '');
    if (spotId) {
      const params = new URLSearchParams();
      if (campaign) params.set('campaign', campaign);
      const query = params.toString();
      return `${base}/#/s/${spotId}${query ? `?${query}` : ''}`;
    }
    const params = new URLSearchParams();
    if (campaign) params.set('campaign', campaign);
    const query = params.toString();
    return `${base}/#/ar/${selectedSlug}${query ? `?${query}` : ''}`;
  };

  const qrValue = buildUrl();
  const isDynamic = !!spotId;

  // Save spot to Supabase
  const handleSaveSpot = async () => {
    if (!spotId) return;
    setSaving(true);
    setSaveMsg('');

    const { error } = await supabase.from('ar_spots').upsert(
      {
        spot_id: spotId,
        name: spotName || spotId,
        experience_slug: selectedSlug,
        is_active: true,
      },
      { onConflict: 'spot_id' },
    );

    if (error) {
      setSaveMsg(`❌ Error: ${error.message}`);
    } else {
      setSaveMsg('✅ Spot guardado');
      loadData();
    }
    setSaving(false);
    setTimeout(() => setSaveMsg(''), 3000);
  };

  // Load spot into form
  const handleSelectSpot = (spot: SpotRow) => {
    setSpotId(spot.spot_id);
    setSpotName(spot.name);
    setSelectedSlug(spot.experience_slug ?? experiences[0]?.slug ?? '');
  };

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

  const inputStyle = {
    borderColor: 'var(--color-border)',
    backgroundColor: 'var(--color-surface)',
    color: 'var(--color-text)',
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
          Genera QR imprimibles para tótems físicos. Guarda spots en la base de datos.
        </p>
      </div>

      {/* Form */}
      <div className="flex flex-col gap-4 mb-6">
        {/* Base URL (editable) */}
        <div>
          <label className="block text-xs font-semibold mb-1.5" style={{ color: 'var(--color-text)' }}>
            URL base del sitio
          </label>
          <input
            type="url"
            value={baseUrl}
            onChange={(e) => setBaseUrl(e.target.value)}
            className="w-full px-3 py-2.5 rounded-xl text-sm border outline-none"
            style={inputStyle}
          />
          <p className="text-xs mt-1" style={{ color: 'var(--color-muted-light)' }}>
            Cambia esto si usas un dominio personalizado.
          </p>
        </div>

        {/* Experiencia */}
        <div>
          <label className="block text-xs font-semibold mb-1.5" style={{ color: 'var(--color-text)' }}>
            Experiencia
          </label>
          <select
            value={selectedSlug}
            onChange={(e) => setSelectedSlug(e.target.value)}
            className="w-full px-3 py-2.5 rounded-xl text-sm border outline-none"
            style={inputStyle}
          >
            {experiences.map((e) => (
              <option key={e.slug} value={e.slug}>
                {e.title_es}
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
            style={inputStyle}
          />
        </div>

        {/* Spot Name (solo si hay spotId) */}
        {spotId && (
          <div>
            <label className="block text-xs font-semibold mb-1.5" style={{ color: 'var(--color-text)' }}>
              Nombre del spot
            </label>
            <input
              type="text"
              placeholder="ej. Malecón frente al hotel"
              value={spotName}
              onChange={(e) => setSpotName(e.target.value)}
              className="w-full px-3 py-2.5 rounded-xl text-sm border outline-none"
              style={inputStyle}
            />
          </div>
        )}

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
            style={inputStyle}
          />
        </div>
      </div>

      {/* Save to Supabase (always visible, disabled if no spotId) */}
      <div className="mb-3">
        <button
          onClick={handleSaveSpot}
          disabled={saving || !spotId}
          className="w-full py-3 rounded-xl text-sm font-semibold text-white transition-all duration-200 active:scale-95 disabled:opacity-50"
          style={{ backgroundColor: '#2e8b57' }}
        >
          {saving
            ? 'Guardando...'
            : spotId
            ? `💾 Guardar spot "${spotId}" en Supabase`
            : '💾 Ingresa un Spot ID para guardar'}
        </button>
      </div>
      {saveMsg && (
        <p className="text-sm text-center mb-3" style={{ color: saveMsg.startsWith('✅') ? '#2e8b57' : '#e53e3e' }}>
          {saveMsg}
        </p>
      )}

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

      {isDynamic && (
        <div
          className="px-3 py-2 rounded-xl mb-6 text-xs break-all"
          style={{
            backgroundColor: 'rgba(46,139,87,0.07)',
            color: 'var(--color-eco, #2e8b57)',
            fontFamily: 'monospace',
          }}
        >
          <span style={{ opacity: 0.7, fontSize: '10px', display: 'block', marginBottom: '2px' }}>
            ↪ Redirige a (configurable desde Supabase)
          </span>
          {baseUrl.trim().replace(/\/$/, '')}/#/ar/{selectedSlug}?spot={spotId}
          {campaign ? `&campaign=${campaign}` : ''}
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
        <QRCodeSVG value={qrValue} size={200} level="H" fgColor="#1A1A2E" bgColor="#FFFFFF" />
      </div>

      {/* Download button */}
      <button
        onClick={handleDownload}
        className="w-full py-3.5 rounded-2xl text-sm font-semibold text-white transition-all duration-200 active:scale-95 mb-8"
        style={{ backgroundColor: 'var(--color-primary)' }}
      >
        Descargar QR (SVG)
      </button>

      {/* ── Existing spots from Supabase ── */}
      <div className="mb-6">
        <h2 className="text-base font-bold mb-3" style={{ color: 'var(--color-text)' }}>
          📍 Spots guardados
        </h2>

        {loading ? (
          <p className="text-sm" style={{ color: 'var(--color-muted)' }}>
            Cargando spots...
          </p>
        ) : spots.length === 0 ? (
          <p className="text-sm" style={{ color: 'var(--color-muted)' }}>
            No hay spots guardados. Crea uno arriba.
          </p>
        ) : (
          <div className="flex flex-col gap-2">
            {spots.map((spot) => (
              <button
                key={spot.id}
                onClick={() => handleSelectSpot(spot)}
                className="w-full text-left px-3 py-2.5 rounded-xl border transition-all duration-150 active:scale-98"
                style={{
                  borderColor:
                    spot.spot_id === spotId ? 'var(--color-primary)' : 'var(--color-border)',
                  backgroundColor:
                    spot.spot_id === spotId ? 'rgba(50,52,218,0.06)' : 'var(--color-surface)',
                }}
              >
                <div className="flex items-center justify-between">
                  <div>
                    <span
                      className="text-sm font-semibold block"
                      style={{ color: 'var(--color-text)' }}
                    >
                      {spot.name}
                    </span>
                    <span className="text-xs" style={{ color: 'var(--color-muted)', fontFamily: 'monospace' }}>
                      ID: {spot.spot_id} → {spot.experience_slug ?? '—'}
                    </span>
                  </div>
                  <span
                    className="text-xs px-2 py-0.5 rounded-full font-medium"
                    style={{
                      backgroundColor: spot.is_active ? 'rgba(46,139,87,0.1)' : 'rgba(229,62,62,0.1)',
                      color: spot.is_active ? '#2e8b57' : '#e53e3e',
                    }}
                  >
                    {spot.is_active ? 'Activo' : 'Inactivo'}
                  </span>
                </div>
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
