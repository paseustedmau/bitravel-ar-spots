import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import ARExperiencePage from '@/pages/ARExperiencePage';
import ARCatalogPage from '@/pages/ARCatalogPage';
import QRGeneratorPage from '@/pages/QRGeneratorPage';
import SpotRedirectPage from '@/pages/SpotRedirectPage';
import DebugARPage from '@/pages/DebugARPage';
import ARTestPage from '@/pages/ARTestPage';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* ── Public AR routes ── */}
        <Route path="/ar" element={<ARCatalogPage />} />
        <Route path="/ar/:slug" element={<ARExperiencePage />} />
        <Route path="/debug" element={<DebugARPage />} />
        <Route path="/ar-test" element={<ARTestPage />} />

        {/* ── Dynamic spot short links (QR físicos) ── */}
        <Route path="/s/:spotId" element={<SpotRedirectPage />} />

        {/* ── Internal tools ── */}
        <Route path="/admin/qr" element={<QRGeneratorPage />} />

        {/* ── Redirects ── */}
        <Route path="/" element={<Navigate to="/ar" replace />} />
        <Route path="*" element={<Navigate to="/ar" replace />} />
      </Routes>
    </BrowserRouter>
  );
}
