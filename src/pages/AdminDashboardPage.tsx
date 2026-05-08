import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '@/lib/supabase';
import { trackEvent } from '@/lib/analytics';
import { getDeviceInfo } from '@/lib/device';

interface Experience {
  id: string;
  slug: string;
  status: string;
  title_es: string;
  model_glb_url: string;
  zone: string | null;
  updated_at: string;
}

interface Spot {
  id: string;
  spot_id: string;
  name: string;
  experience_slug: string | null;
  is_active: boolean;
}

export default function AdminDashboardPage() {
  const navigate = useNavigate();
  const [experiences, setExperiences] = useState<Experience[]>([]);
  const [spots, setSpots] = useState<Spot[]>([]);
  const [tab, setTab] = useState<'experiences' | 'spots'>('experiences');
  const [loading, setLoading] = useState(true);
  const [userEmail, setUserEmail] = useState<string | undefined>();

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      const email = data.session?.user?.email;
      setUserEmail(email);
      const { os, deviceType } = getDeviceInfo();
      trackEvent({
        event: 'admin_dashboard_viewed',
        user_email: email,
        language: 'es',
        device_os: os,
        device_type: deviceType,
        timestamp: new Date().toISOString(),
      });
    });
    loadData();
  }, []);

  async function loadData() {
    setLoading(true);
    const [expRes, spotRes] = await Promise.all([
      supabase.from('ar_experiences').select('id, slug, status, title_es, model_glb_url, zone, updated_at').order('sort_order'),
      supabase.from('ar_spots').select('id, spot_id, name, experience_slug, is_active').order('created_at', { ascending: false }),
    ]);
    if (expRes.data) setExperiences(expRes.data);
    if (spotRes.data) setSpots(spotRes.data);
    setLoading(false);
  }

  async function handleLogout() {
    await supabase.auth.signOut();
    navigate('/login', { replace: true });
  }

  async function deleteExperience(slug: string) {
    if (!confirm(`¿Eliminar experiencia "${slug}"? Esta acción no se puede deshacer.`)) return;
    await supabase.from('ar_experiences').delete().eq('slug', slug);
    loadData();
  }

  async function deleteSpot(spotId: string) {
    if (!confirm(`¿Eliminar spot "${spotId}"?`)) return;
    await supabase.from('ar_spots').delete().eq('spot_id', spotId);
    const { os, deviceType } = getDeviceInfo();
    trackEvent({
      event: 'admin_spot_deleted',
      spot_id: spotId,
      user_email: userEmail,
      language: 'es',
      device_os: os,
      device_type: deviceType,
      timestamp: new Date().toISOString(),
    });
    loadData();
  }

  async function toggleSpot(spot: Spot) {
    const newActiveState = !spot.is_active;
    await supabase.from('ar_spots').update({ is_active: newActiveState }).eq('spot_id', spot.spot_id);
    const { os, deviceType } = getDeviceInfo();
    trackEvent({
      event: 'admin_spot_toggled',
      spot_id: spot.spot_id,
      user_email: userEmail,
      language: 'es',
      device_os: os,
      device_type: deviceType,
      timestamp: new Date().toISOString(),
      error_detail: `New state: ${newActiveState}`, // Re-using error_detail for extra state info loosely
    });
    loadData();
  }

  const statusColor = (s: string) =>
    s === 'active' ? '#2e8b57' : s === 'draft' ? '#d4a017' : '#e53e3e';

  return (
    <div style={{ minHeight: '100vh', backgroundColor: 'var(--color-bg)' }}>
      {/* Header */}
      <div
        style={{
          padding: '16px 20px',
          borderBottom: '1px solid var(--color-border)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          backgroundColor: 'var(--color-surface)',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <img
            src="/bitravel-icon.png"
            alt="Bitravel"
            style={{
              width: 32, height: 32, borderRadius: 10,
              objectFit: 'contain'
            }}
          />
          <span style={{ fontSize: 16, fontWeight: 700, color: 'var(--color-text)' }}>
            Admin Panel
          </span>
        </div>
        <button
          onClick={handleLogout}
          style={{
            padding: '8px 16px', borderRadius: 10, border: '1px solid var(--color-border)',
            backgroundColor: 'transparent', color: 'var(--color-muted)', fontSize: 13,
            fontWeight: 600, cursor: 'pointer',
          }}
        >
          Salir
        </button>
      </div>

      {/* Tabs */}
      <div style={{ display: 'flex', padding: '12px 20px 0', gap: 8 }}>
        {(['experiences', 'spots'] as const).map((t) => (
          <button
            key={t}
            onClick={() => setTab(t)}
            style={{
              padding: '10px 20px', borderRadius: 12, border: 'none',
              backgroundColor: tab === t ? 'var(--color-primary)' : 'var(--color-surface)',
              color: tab === t ? 'white' : 'var(--color-muted)',
              fontSize: 13, fontWeight: 700, cursor: 'pointer',
              transition: 'all 0.15s',
            }}
          >
            {t === 'experiences' ? `🎭 Experiencias (${experiences.length})` : `📍 Spots (${spots.length})`}
          </button>
        ))}
      </div>

      <div style={{ padding: 20, maxWidth: 600, margin: '0 auto' }}>
        {loading ? (
          <p style={{ textAlign: 'center', color: 'var(--color-muted)', padding: 40 }}>Cargando…</p>
        ) : tab === 'experiences' ? (
          <>
            <button
              onClick={() => navigate('/admin/experience/new')}
              style={{
                width: '100%', padding: '14px 0', borderRadius: 14, border: 'none',
                backgroundColor: 'var(--color-primary)', color: 'white',
                fontSize: 14, fontWeight: 700, cursor: 'pointer', marginBottom: 16,
              }}
            >
              + Nueva experiencia
            </button>

            {experiences.length === 0 ? (
              <p style={{ textAlign: 'center', color: 'var(--color-muted)', padding: 20 }}>
                No hay experiencias. Crea la primera.
              </p>
            ) : (
              <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                {experiences.map((exp) => (
                  <div
                    key={exp.id}
                    style={{
                      padding: '14px 16px', borderRadius: 14,
                      border: '1px solid var(--color-border)',
                      backgroundColor: 'var(--color-surface)',
                      display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                    }}
                  >
                    <div>
                      <p style={{ fontSize: 15, fontWeight: 700, color: 'var(--color-text)', margin: 0 }}>
                        {exp.title_es}
                      </p>
                      <p style={{ fontSize: 12, color: 'var(--color-muted)', margin: '4px 0 0', fontFamily: 'monospace' }}>
                        /{exp.slug} · {exp.zone ?? '—'}
                      </p>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                      <span
                        style={{
                          fontSize: 11, fontWeight: 700, padding: '3px 10px', borderRadius: 20,
                          backgroundColor: `${statusColor(exp.status)}18`,
                          color: statusColor(exp.status),
                        }}
                      >
                        {exp.status}
                      </span>
                      <button
                        onClick={() => navigate(`/admin/experience/${exp.slug}`)}
                        style={{
                          padding: '6px 14px', borderRadius: 8, border: '1px solid var(--color-border)',
                          backgroundColor: 'transparent', color: 'var(--color-primary)',
                          fontSize: 12, fontWeight: 600, cursor: 'pointer',
                        }}
                      >
                        Editar
                      </button>
                      <button
                        onClick={() => deleteExperience(exp.slug)}
                        style={{
                          padding: '6px 10px', borderRadius: 8, border: '1px solid rgba(229,62,62,0.2)',
                          backgroundColor: 'transparent', color: '#e53e3e',
                          fontSize: 12, cursor: 'pointer',
                        }}
                      >
                        ✕
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </>
        ) : (
          <>
            <button
              onClick={() => navigate('/admin/qr')}
              style={{
                width: '100%', padding: '14px 0', borderRadius: 14, border: 'none',
                backgroundColor: 'var(--color-primary)', color: 'white',
                fontSize: 14, fontWeight: 700, cursor: 'pointer', marginBottom: 16,
              }}
            >
              + Nuevo spot / Generar QR
            </button>

            {spots.length === 0 ? (
              <p style={{ textAlign: 'center', color: 'var(--color-muted)', padding: 20 }}>
                No hay spots. Crea el primero.
              </p>
            ) : (
              <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                {spots.map((spot) => (
                  <div
                    key={spot.id}
                    style={{
                      padding: '14px 16px', borderRadius: 14,
                      border: '1px solid var(--color-border)',
                      backgroundColor: 'var(--color-surface)',
                      display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                    }}
                  >
                    <div>
                      <p style={{ fontSize: 15, fontWeight: 700, color: 'var(--color-text)', margin: 0 }}>
                        {spot.name}
                      </p>
                      <p style={{ fontSize: 12, color: 'var(--color-muted)', margin: '4px 0 0', fontFamily: 'monospace' }}>
                        ID: {spot.spot_id} → {spot.experience_slug ?? '—'}
                      </p>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                      <button
                        onClick={() => toggleSpot(spot)}
                        style={{
                          padding: '4px 12px', borderRadius: 20, border: 'none',
                          backgroundColor: spot.is_active ? 'rgba(46,139,87,0.12)' : 'rgba(229,62,62,0.12)',
                          color: spot.is_active ? '#2e8b57' : '#e53e3e',
                          fontSize: 11, fontWeight: 700, cursor: 'pointer',
                        }}
                      >
                        {spot.is_active ? 'Activo' : 'Inactivo'}
                      </button>
                      <button
                        onClick={() => navigate(`/admin/qr?edit=${spot.spot_id}`)}
                        style={{
                          padding: '6px 14px', borderRadius: 8, border: '1px solid var(--color-border)',
                          backgroundColor: 'transparent', color: 'var(--color-primary)',
                          fontSize: 12, fontWeight: 600, cursor: 'pointer',
                        }}
                      >
                        Editar
                      </button>
                      <button
                        onClick={() => deleteSpot(spot.spot_id)}
                        style={{
                          padding: '6px 10px', borderRadius: 8, border: '1px solid rgba(229,62,62,0.2)',
                          backgroundColor: 'transparent', color: '#e53e3e',
                          fontSize: 12, cursor: 'pointer',
                        }}
                      >
                        ✕
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}
