import { useEffect, useState, type FormEvent } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { supabase } from '@/lib/supabase';
import { uploadFile } from '@/lib/storage';
import FileUpload from '@/components/FileUpload';

interface FormData {
  slug: string;
  status: 'active' | 'inactive' | 'draft';
  title_es: string;
  title_en: string;
  description_es: string;
  description_en: string;
  instruction_es: string;
  instruction_en: string;
  model_glb_url: string;
  model_usdz_url: string;
  poster_url: string;
  cta_label_es: string;
  cta_label_en: string;
  cta_url: string;
  cta_type: 'guide' | 'marketplace' | 'sponsor' | 'external';
  tags: string;
  zone: string;
  sort_order: number;
}

const EMPTY: FormData = {
  slug: '', status: 'draft',
  title_es: '', title_en: '',
  description_es: '', description_en: '',
  instruction_es: 'Apunta tu cámara hacia una superficie plana y mueve lentamente tu teléfono.',
  instruction_en: 'Point your camera at a flat surface and slowly move your phone.',
  model_glb_url: '', model_usdz_url: '', poster_url: '',
  cta_label_es: '', cta_label_en: '', cta_url: '', cta_type: 'guide',
  tags: '', zone: '', sort_order: 0,
};

export default function AdminExperienceForm() {
  const { slug } = useParams<{ slug: string }>();
  const isNew = !slug || slug === 'new';
  const navigate = useNavigate();

  const [form, setForm] = useState<FormData>(EMPTY);
  const [saving, setSaving] = useState(false);
  const [msg, setMsg] = useState('');
  const [loading, setLoading] = useState(!isNew);

  // Pending files to upload on save
  const [glbFile, setGlbFile] = useState<File | null>(null);
  const [usdzFile, setUsdzFile] = useState<File | null>(null);
  const [posterFile, setPosterFile] = useState<File | null>(null);

  useEffect(() => {
    if (!isNew && slug) {
      supabase
        .from('ar_experiences')
        .select('*')
        .eq('slug', slug)
        .single()
        .then(({ data }) => {
          if (data) {
            setForm({
              slug: data.slug,
              status: data.status,
              title_es: data.title_es || '',
              title_en: data.title_en || '',
              description_es: data.description_es || '',
              description_en: data.description_en || '',
              instruction_es: data.instruction_es || '',
              instruction_en: data.instruction_en || '',
              model_glb_url: data.model_glb_url || '',
              model_usdz_url: data.model_usdz_url || '',
              poster_url: data.poster_url || '',
              cta_label_es: data.cta_label_es || '',
              cta_label_en: data.cta_label_en || '',
              cta_url: data.cta_url || '',
              cta_type: data.cta_type || 'guide',
              tags: (data.tags || []).join(', '),
              zone: data.zone || '',
              sort_order: data.sort_order || 0,
            });
          }
          setLoading(false);
        });
    }
  }, [isNew, slug]);

  const set = (key: keyof FormData) => (e: { target: { value: string } }) =>
    setForm((f) => ({ ...f, [key]: e.target.value }));

  // Auto-generate slug from title
  const autoSlug = (title: string) =>
    title
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '');

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!form.slug && !form.title_es) return;
    setSaving(true);
    setMsg('');

    const finalSlug = form.slug || autoSlug(form.title_es);
    let glbUrl = form.model_glb_url;
    let usdzUrl = form.model_usdz_url;
    let posterUrl = form.poster_url;

    // Upload files if selected
    if (glbFile) {
      const ext = glbFile.name.split('.').pop() || 'glb';
      const res = await uploadFile('ar-models', `${finalSlug}/model.${ext}`, glbFile);
      if ('url' in res) glbUrl = res.url;
      else { setMsg(`❌ Error GLB: ${res.error}`); setSaving(false); return; }
    }

    if (usdzFile) {
      const ext = usdzFile.name.split('.').pop() || 'usdz';
      const res = await uploadFile('ar-models', `${finalSlug}/model.${ext}`, usdzFile);
      if ('url' in res) usdzUrl = res.url;
      else { setMsg(`❌ Error USDZ: ${res.error}`); setSaving(false); return; }
    }

    if (posterFile) {
      const ext = posterFile.name.split('.').pop() || 'webp';
      const res = await uploadFile('ar-posters', `${finalSlug}/poster.${ext}`, posterFile);
      if ('url' in res) posterUrl = res.url;
      else { setMsg(`❌ Error poster: ${res.error}`); setSaving(false); return; }
    }

    const record = {
      slug: finalSlug,
      status: form.status,
      title_es: form.title_es,
      title_en: form.title_en || null,
      description_es: form.description_es || null,
      description_en: form.description_en || null,
      instruction_es: form.instruction_es || null,
      instruction_en: form.instruction_en || null,
      model_glb_url: glbUrl,
      model_usdz_url: usdzUrl || null,
      poster_url: posterUrl,
      cta_label_es: form.cta_label_es || null,
      cta_label_en: form.cta_label_en || null,
      cta_url: form.cta_url || null,
      cta_type: form.cta_type,
      tags: form.tags ? form.tags.split(',').map((t) => t.trim()).filter(Boolean) : [],
      zone: form.zone || null,
      sort_order: Number(form.sort_order) || 0,
      updated_at: new Date().toISOString(),
    };

    const { error } = isNew
      ? await supabase.from('ar_experiences').insert(record)
      : await supabase.from('ar_experiences').update(record).eq('slug', slug);

    if (error) {
      setMsg(`❌ ${error.message}`);
    } else {
      setMsg('✅ Guardado');
      // Update slug in form if auto-generated
      setForm((f) => ({ ...f, slug: finalSlug }));
      setTimeout(() => navigate('/admin'), 1000);
    }
    setSaving(false);
  };

  const inputStyle = {
    width: '100%', padding: '10px 14px', borderRadius: 12,
    border: '1px solid var(--color-border)', backgroundColor: 'var(--color-bg)',
    color: 'var(--color-text)', fontSize: 14, outline: 'none',
    boxSizing: 'border-box' as const,
  };

  const labelStyle = {
    display: 'block', fontSize: 12, fontWeight: 600,
    marginBottom: 6, color: 'var(--color-text)',
  };

  if (loading) {
    return (
      <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: 'var(--color-bg)' }}>
        <p style={{ color: 'var(--color-muted)' }}>Cargando…</p>
      </div>
    );
  }

  return (
    <div style={{ minHeight: '100vh', backgroundColor: 'var(--color-bg)' }}>
      {/* Header */}
      <div
        style={{
          padding: '14px 20px', borderBottom: '1px solid var(--color-border)',
          display: 'flex', alignItems: 'center', gap: 12, backgroundColor: 'var(--color-surface)',
        }}
      >
        <button
          onClick={() => navigate('/admin')}
          style={{
            padding: '6px 14px', borderRadius: 10, border: '1px solid var(--color-border)',
            backgroundColor: 'transparent', color: 'var(--color-muted)',
            fontSize: 13, fontWeight: 600, cursor: 'pointer',
          }}
        >
          ← Volver
        </button>
        <h1 style={{ fontSize: 16, fontWeight: 700, color: 'var(--color-text)', margin: 0 }}>
          {isNew ? 'Nueva experiencia' : `Editar: ${form.title_es || slug}`}
        </h1>
      </div>

      <form onSubmit={handleSubmit} style={{ padding: 20, maxWidth: 520, margin: '0 auto' }}>
        {/* ── Basic Info ── */}
        <fieldset style={{ border: 'none', padding: 0, margin: '0 0 20px' }}>
          <legend style={{ fontSize: 14, fontWeight: 800, color: 'var(--color-text)', marginBottom: 14 }}>
            Información básica
          </legend>

          <div style={{ marginBottom: 14 }}>
            <label style={labelStyle}>Título (ES) *</label>
            <input
              required value={form.title_es}
              onChange={(e) => {
                set('title_es')(e);
                if (isNew) setForm((f) => ({ ...f, title_es: e.target.value, slug: autoSlug(e.target.value) }));
              }}
              style={inputStyle} placeholder="Ballena Jorobada"
            />
          </div>

          <div style={{ marginBottom: 14 }}>
            <label style={labelStyle}>Título (EN)</label>
            <input value={form.title_en} onChange={set('title_en')} style={inputStyle} placeholder="Humpback Whale" />
          </div>

          <div style={{ marginBottom: 14 }}>
            <label style={labelStyle}>Slug</label>
            <input value={form.slug} onChange={set('slug')} style={{ ...inputStyle, fontFamily: 'monospace' }} placeholder="ballena-jorobada" />
          </div>

          <div style={{ display: 'flex', gap: 12, marginBottom: 14 }}>
            <div style={{ flex: 1 }}>
              <label style={labelStyle}>Status</label>
              <select value={form.status} onChange={set('status') as never} style={inputStyle}>
                <option value="draft">Draft</option>
                <option value="active">Active</option>
                <option value="inactive">Inactive</option>
              </select>
            </div>
            <div style={{ flex: 1 }}>
              <label style={labelStyle}>Zona</label>
              <input value={form.zone} onChange={set('zone')} style={inputStyle} placeholder="malecon" />
            </div>
          </div>
        </fieldset>

        {/* ── Descriptions ── */}
        <fieldset style={{ border: 'none', padding: 0, margin: '0 0 20px' }}>
          <legend style={{ fontSize: 14, fontWeight: 800, color: 'var(--color-text)', marginBottom: 14 }}>
            Descripción
          </legend>

          <div style={{ marginBottom: 14 }}>
            <label style={labelStyle}>Descripción (ES)</label>
            <textarea value={form.description_es} onChange={set('description_es') as never}
              rows={3} style={{ ...inputStyle, resize: 'vertical' }} />
          </div>
          <div style={{ marginBottom: 14 }}>
            <label style={labelStyle}>Descripción (EN)</label>
            <textarea value={form.description_en} onChange={set('description_en') as never}
              rows={3} style={{ ...inputStyle, resize: 'vertical' }} />
          </div>
        </fieldset>

        {/* ── 3D Models ── */}
        <fieldset style={{ border: 'none', padding: 0, margin: '0 0 20px' }}>
          <legend style={{ fontSize: 14, fontWeight: 800, color: 'var(--color-text)', marginBottom: 14 }}>
            Modelos 3D
          </legend>

          <div style={{ marginBottom: 14 }}>
            <FileUpload
              label="Archivo GLB (Android) *"
              accept=".glb"
              hint="Formato binario para Android Scene Viewer (~max 50MB)"
              currentUrl={form.model_glb_url}
              onFileSelected={setGlbFile}
            />
          </div>

          <div style={{ marginBottom: 14 }}>
            <FileUpload
              label="Archivo USDZ (iOS)"
              accept=".usdz"
              hint="Formato Apple para iOS Quick Look (~max 50MB)"
              currentUrl={form.model_usdz_url}
              onFileSelected={setUsdzFile}
            />
          </div>

          <div style={{ marginBottom: 14 }}>
            <FileUpload
              label="Poster (imagen de preview)"
              accept=".webp,.png,.jpg,.jpeg"
              hint="Se muestra mientras carga el modelo 3D"
              currentUrl={form.poster_url}
              onFileSelected={setPosterFile}
            />
          </div>
        </fieldset>

        {/* ── CTA ── */}
        <fieldset style={{ border: 'none', padding: 0, margin: '0 0 20px' }}>
          <legend style={{ fontSize: 14, fontWeight: 800, color: 'var(--color-text)', marginBottom: 14 }}>
            Call to Action
          </legend>

          <div style={{ marginBottom: 14 }}>
            <label style={labelStyle}>Texto CTA (ES)</label>
            <input value={form.cta_label_es} onChange={set('cta_label_es')} style={inputStyle} placeholder="Explorar tours" />
          </div>
          <div style={{ marginBottom: 14 }}>
            <label style={labelStyle}>Texto CTA (EN)</label>
            <input value={form.cta_label_en} onChange={set('cta_label_en')} style={inputStyle} placeholder="Explore tours" />
          </div>
          <div style={{ display: 'flex', gap: 12, marginBottom: 14 }}>
            <div style={{ flex: 2 }}>
              <label style={labelStyle}>URL del CTA</label>
              <input value={form.cta_url} onChange={set('cta_url')} style={inputStyle} placeholder="https://bitravel.app/..." />
            </div>
            <div style={{ flex: 1 }}>
              <label style={labelStyle}>Tipo</label>
              <select value={form.cta_type} onChange={set('cta_type') as never} style={inputStyle}>
                <option value="guide">Guide</option>
                <option value="marketplace">Marketplace</option>
                <option value="sponsor">Sponsor</option>
                <option value="external">External</option>
              </select>
            </div>
          </div>
        </fieldset>

        {/* ── Tags ── */}
        <div style={{ marginBottom: 20 }}>
          <label style={labelStyle}>Tags (separados por coma)</label>
          <input value={form.tags} onChange={set('tags')} style={inputStyle} placeholder="naturaleza, ballena, puerto-vallarta" />
        </div>

        {/* ── Sorteo ── */}
        <div style={{ marginBottom: 28 }}>
          <label style={labelStyle}>Orden en catálogo</label>
          <input type="number" value={form.sort_order} onChange={set('sort_order') as never} style={{ ...inputStyle, width: 100 }} />
        </div>

        {/* Messages */}
        {msg && (
          <p style={{
            fontSize: 14, textAlign: 'center', marginBottom: 16, padding: '10px 14px', borderRadius: 12,
            backgroundColor: msg.startsWith('✅') ? 'rgba(46,139,87,0.08)' : 'rgba(229,62,62,0.08)',
            color: msg.startsWith('✅') ? '#2e8b57' : '#e53e3e',
          }}>
            {msg}
          </p>
        )}

        {/* Submit */}
        <button
          type="submit"
          disabled={saving}
          style={{
            width: '100%', padding: '14px 0', borderRadius: 14, border: 'none',
            backgroundColor: 'var(--color-primary)', color: 'white',
            fontSize: 15, fontWeight: 700, cursor: saving ? 'wait' : 'pointer',
            opacity: saving ? 0.6 : 1, transition: 'all 0.15s',
          }}
        >
          {saving ? 'Guardando…' : isNew ? 'Crear experiencia' : 'Guardar cambios'}
        </button>
      </form>
    </div>
  );
}
