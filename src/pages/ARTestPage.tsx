/**
 * /ar-test — Ultra-clean diagnostic page.
 *
 * ❶ No model-viewer, no Tailwind, no external dependencies.
 * ❷ Pure inline styles — impossible to hide via CSS cascade.
 * ❸ Validates: "Can Safari render ANYTHING on this domain?"
 * ❹ If you see the red button + text → React + routing works.
 * ❺ If you DON'T see it → problem is deploy/cache/webview/route.
 */
export default function ARTestPage() {
  return (
    <main
      style={{
        minHeight: '100vh',
        padding: 24,
        background: 'white',
        color: 'black',
        fontFamily: "'Inter', system-ui, sans-serif",
      }}
    >
      <h1 style={{ fontSize: 28, fontWeight: 800, marginBottom: 12 }}>
        Safari AR Test
      </h1>

      <p style={{ fontSize: 14, color: '#666', marginBottom: 24, lineHeight: 1.5 }}>
        Si ves este texto y el botón rojo, Safari <strong>sí</strong> está
        renderizando la página correctamente. El siguiente paso es probar AR.
      </p>

      {/* ── Step 1: Plain <a rel="ar"> — the most reliable iOS AR trigger ── */}
      <a
        href="/models/whale.usdz"
        rel="ar"
        style={{
          display: 'block',
          padding: 18,
          background: 'red',
          color: 'white',
          fontSize: 20,
          fontWeight: 800,
          textAlign: 'center',
          borderRadius: 16,
          textDecoration: 'none',
          marginBottom: 24,
          position: 'relative',
          zIndex: 2147483647,
        }}
      >
        🍎 ABRIR AR iOS (rel=&quot;ar&quot;)
      </a>

      {/* ── Step 2: Styled brand button (still <a rel="ar">) ── */}
      <a
        href="/models/whale.usdz"
        rel="ar"
        style={{
          display: 'block',
          width: '100%',
          padding: '16px 20px',
          background: '#3234DA',
          color: '#fff',
          borderRadius: 999,
          textAlign: 'center',
          fontSize: 17,
          fontWeight: 700,
          textDecoration: 'none',
          marginBottom: 24,
        }}
      >
        Ver en realidad aumentada
      </a>

      {/* ── Diagnostics ── */}
      <div
        style={{
          padding: 16,
          background: '#f5f5f5',
          borderRadius: 12,
          fontSize: 13,
          lineHeight: 1.6,
          color: '#333',
        }}
      >
        <p style={{ fontWeight: 700, marginBottom: 8 }}>Checklist:</p>
        <ul style={{ paddingLeft: 20, margin: 0 }}>
          <li>✅ Página renderizada en Safari</li>
          <li>✅ React + routing funcionando</li>
          <li>⬜ Botón rojo abre Quick Look AR</li>
          <li>⬜ Botón azul abre Quick Look AR</li>
        </ul>
        <p style={{ marginTop: 12, fontSize: 11, color: '#999' }}>
          URL: {typeof window !== 'undefined' ? window.location.href : '—'}
          <br />
          UA: {typeof navigator !== 'undefined' ? navigator.userAgent.slice(0, 80) : '—'}
        </p>
      </div>
    </main>
  );
}
