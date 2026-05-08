import { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { supabase } from '@/lib/supabase';
import { trackEvent } from '@/lib/analytics';
import { getDeviceInfo } from '@/lib/device';



/**
 * SpotRedirectPage — Ruta dinámica: /s/:spot_id
 *
 * Hace lookup en Supabase → ar_spots donde spot_id = :spot_id
 * Si existe y tiene experience_slug asignado → redirige a /ar/:slug?spot=:spot_id
 * Si no existe o está inactivo → redirige al catálogo /ar
 *
 * Beneficio: los QR físicos apuntan a este short link.
 * Para cambiar la experiencia de un tótem solo se actualiza la DB,
 * sin necesidad de reimprimir el QR.
 */
export default function SpotRedirectPage() {
  const { spotId } = useParams<{ spotId: string }>();
  const navigate = useNavigate();

  useEffect(() => {
    if (!spotId) {
      navigate('/ar', { replace: true });
      return;
    }

    async function resolveSpot() {
      const { data, error } = await supabase
        .from('ar_spots')
        .select('spot_id, experience_slug, is_active')
        .eq('spot_id', spotId)
        .single();

      // Analytics: registrar el escaneo del QR dinámico
      const { os, deviceType } = getDeviceInfo();
      trackEvent({
        event: 'qr_scan_detected',
        experience_slug: data?.experience_slug ?? 'unknown',
        spot_id: spotId,
        language: navigator.language.startsWith('en') ? 'en' : 'es',
        device_os: os,
        device_type: deviceType,
        timestamp: new Date().toISOString(),
      });

      if (error || !data || !data.is_active || !data.experience_slug) {
        // Spot no encontrado, inactivo o sin experiencia asignada → catálogo
        trackEvent({
          event: 'spot_resolve_failed',
          spot_id: spotId,
          language: navigator.language.startsWith('en') ? 'en' : 'es',
          device_os: os,
          device_type: deviceType,
          timestamp: new Date().toISOString(),
        });
        navigate('/ar', { replace: true });
        return;
      }

      // Redirigir a la experiencia con el spot como query param
      navigate(`/ar/${data.experience_slug}?spot=${spotId}`, { replace: true });
    }

    resolveSpot();
  }, [spotId, navigate]);

  // Pantalla de carga mínima mientras resuelve el redirect
  return (
    <div
      style={{
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'var(--color-bg)',
        gap: '16px',
      }}
    >
      <div
        style={{
          width: '44px',
          height: '44px',
          borderRadius: '50%',
          border: '3px solid var(--color-border)',
          borderTopColor: 'var(--color-primary)',
          animation: 'spin 0.8s linear infinite',
        }}
      />
      <p
        style={{
          fontSize: '14px',
          color: 'var(--color-muted)',
          fontFamily: "'Inter', system-ui, sans-serif",
        }}
      >
        Abriendo experiencia AR…
      </p>
      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
    </div>
  );
}
