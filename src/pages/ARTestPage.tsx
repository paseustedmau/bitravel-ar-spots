/**
 * /ar-test — Cross-platform AR diagnostic page.
 *
 * Tests iOS Quick Look AND Android Scene Viewer independently.
 * Zero dependencies — inline styles only.
 */
export default function ARTestPage() {
  const ua = typeof navigator !== 'undefined' ? navigator.userAgent : '';
  const isIOS = /iPad|iPhone|iPod/.test(ua);
  const isAndroid = /Android/.test(ua);

  const glbAbsolute =
    typeof window !== 'undefined'
      ? new URL('/models/whale.glb', window.location.origin).href
      : '';
  const fallbackUrl =
    typeof window !== 'undefined' ? window.location.href : '';

  const sceneViewerUrl =
    `intent://arvr.google.com/scene-viewer/1.0` +
    `?file=${encodeURIComponent(glbAbsolute)}` +
    `&mode=ar_preferred` +
    `&title=${encodeURIComponent('Ballena Jorobada — Bitravel AR')}` +
    `#Intent;scheme=https;package=com.google.android.googlequicksearchbox;` +
    `action=android.intent.action.VIEW;` +
    `S.browser_fallback_url=${encodeURIComponent(fallbackUrl)};end;`;

  const platform = isIOS ? '🍎 iOS' : isAndroid ? '🤖 Android' : '🖥️ Desktop';

  return (
    <main
      style={{
        minHeight: '100vh',
        padding: 24,
        background: 'white',
        color: 'black',
        fontFamily: "'Inter', system-ui, sans-serif",
        maxWidth: 480,
        margin: '0 auto',
      }}
    >
      <h1 style={{ fontSize: 28, fontWeight: 800, marginBottom: 8 }}>
        AR Test — {platform}
      </h1>

      <p style={{ fontSize: 13, color: '#666', marginBottom: 24, lineHeight: 1.5 }}>
        Plataforma detectada: <strong>{platform}</strong>. Prueba los botones de abajo.
      </p>

      {/* ── iOS: <a rel="ar"> con USDZ ─────────────────────────────────── */}
      <div style={{ marginBottom: 32 }}>
        <p style={{ fontSize: 14, fontWeight: 700, marginBottom: 8, color: '#333' }}>
          1. iOS Quick Look (rel=&quot;ar&quot; + USDZ)
        </p>
        <a
          href="/models/whale.usdz"
          rel="ar"
          style={{
            display: 'block',
            padding: 16,
            background: '#007AFF',
            color: 'white',
            fontSize: 18,
            fontWeight: 800,
            textAlign: 'center',
            borderRadius: 14,
            textDecoration: 'none',
          }}
        >
          🍎 Abrir AR — iOS Quick Look
        </a>
        <p style={{ fontSize: 11, color: '#999', marginTop: 6 }}>
          Solo funciona en iPhone/iPad. En Android no hará nada.
        </p>
      </div>

      {/* ── Android: Scene Viewer intent ──────────────────────────────── */}
      <div style={{ marginBottom: 32 }}>
        <p style={{ fontSize: 14, fontWeight: 700, marginBottom: 8, color: '#333' }}>
          2. Android Scene Viewer (intent URL + GLB)
        </p>
        <a
          href={sceneViewerUrl}
          style={{
            display: 'block',
            padding: 16,
            background: '#34C759',
            color: 'white',
            fontSize: 18,
            fontWeight: 800,
            textAlign: 'center',
            borderRadius: 14,
            textDecoration: 'none',
          }}
        >
          🤖 Abrir AR — Android Scene Viewer
        </a>
        <p style={{ fontSize: 11, color: '#999', marginTop: 6 }}>
          Solo funciona en Android con Google app instalada. En iOS no hará nada.
        </p>
      </div>

      {/* ── Botón universal (como lo usa la app real) ─────────────────── */}
      <div style={{ marginBottom: 32 }}>
        <p style={{ fontSize: 14, fontWeight: 700, marginBottom: 8, color: '#333' }}>
          3. Botón universal (detecta plataforma)
        </p>
        <a
          href={isIOS ? '/models/whale.usdz' : sceneViewerUrl}
          {...(isIOS ? { rel: 'ar' } : {})}
          style={{
            display: 'block',
            padding: 16,
            background: '#3234DA',
            color: 'white',
            fontSize: 17,
            fontWeight: 700,
            textAlign: 'center',
            borderRadius: 999,
            textDecoration: 'none',
          }}
        >
          Ver en realidad aumentada
        </a>
        <p style={{ fontSize: 11, color: '#999', marginTop: 6 }}>
          {isIOS
            ? 'Detectó iOS → usará Quick Look con USDZ'
            : isAndroid
              ? 'Detectó Android → usará Scene Viewer con GLB'
              : 'Escritorio detectado → AR no disponible'}
        </p>
      </div>

      {/* ── Diagnostics ── */}
      <div
        style={{
          padding: 16,
          background: '#f5f5f5',
          borderRadius: 12,
          fontSize: 12,
          lineHeight: 1.6,
          color: '#333',
        }}
      >
        <p style={{ fontWeight: 700, marginBottom: 8 }}>Diagnóstico:</p>
        <ul style={{ paddingLeft: 20, margin: 0 }}>
          <li><strong>Plataforma:</strong> {platform}</li>
          <li><strong>GLB URL:</strong> {glbAbsolute || '—'}</li>
          <li><strong>USDZ:</strong> /models/whale.usdz</li>
        </ul>
        <p style={{ marginTop: 12, fontSize: 10, color: '#999', wordBreak: 'break-all' }}>
          UA: {ua.slice(0, 120)}
        </p>
      </div>
    </main>
  );
}
