import { useEffect } from 'react';

export default function DebugARPage() {
  useEffect(() => {
    // Inject model-viewer script dynamically just in case it wasn't loaded globally
    if (!customElements.get('model-viewer')) {
      const script = document.createElement('script');
      script.type = 'module';
      script.src = 'https://ajax.googleapis.com/ajax/libs/model-viewer/3.4.0/model-viewer.min.js';
      document.head.appendChild(script);
    }
  }, []);

  return (
    <div style={{ padding: '20px', fontFamily: 'sans-serif', maxWidth: '500px', margin: '0 auto' }}>
      <h1 style={{ fontSize: '24px', marginBottom: '10px' }}>AR Happy Path Debug</h1>
      <p style={{ fontSize: '14px', color: '#666', marginBottom: '20px' }}>
        Esta página no tiene Tailwind, no tiene contenedores ocultos, ni lógica compleja. Es HTML puro para probar.
      </p>

      <div style={{ position: 'relative', width: '100%', height: '400px', backgroundColor: '#f0f0f0', borderRadius: '12px', overflow: 'hidden', marginBottom: '20px' }}>
        {/* @ts-ignore */}
        <model-viewer
          id="debug-viewer"
          src="/models/whale.glb"
          ios-src="/models/whale.usdz"
          ar
          ar-modes="webxr scene-viewer quick-look"
          camera-controls
          auto-rotate
          style={{ width: '100%', height: '100%' }}
        >
        {/* @ts-ignore */}
        </model-viewer>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
        <p style={{ fontSize: '14px', fontWeight: 'bold' }}>1. Botón Nativo de iOS (rel="ar")</p>
        <p style={{ fontSize: '12px', color: '#666', marginTop: '-10px' }}>Esto fuerza al iPhone a abrir el AR saltándose el 3D. Es lo más seguro.</p>
        <a
          rel="ar"
          href="/models/whale.usdz"
          style={{
            display: 'block',
            backgroundColor: '#007AFF',
            color: 'white',
            padding: '16px',
            textAlign: 'center',
            borderRadius: '12px',
            textDecoration: 'none',
            fontWeight: 'bold',
            fontSize: '18px'
          }}
        >
          🍎 Abrir AR (Nativo iOS)
        </a>

        <p style={{ fontSize: '14px', fontWeight: 'bold', marginTop: '10px' }}>2. Botón JS (activateAR)</p>
        <p style={{ fontSize: '12px', color: '#666', marginTop: '-10px' }}>Esto le pide al modelo 3D que lance el AR.</p>
        <button
          onClick={() => {
            const viewer = document.getElementById('debug-viewer') as any;
            if (viewer && typeof viewer.activateAR === 'function') {
              viewer.activateAR();
            } else {
              alert('El visor 3D aún no está listo o no soporta AR.');
            }
          }}
          style={{
            display: 'block',
            backgroundColor: '#34C759',
            color: 'white',
            padding: '16px',
            textAlign: 'center',
            borderRadius: '12px',
            border: 'none',
            fontWeight: 'bold',
            fontSize: '18px',
            cursor: 'pointer'
          }}
        >
          🤖 Abrir AR (Vía ModelViewer)
        </button>
      </div>
    </div>
  );
}
