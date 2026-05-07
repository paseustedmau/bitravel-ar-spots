import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import ARExperiencePage from '@/pages/ARExperiencePage';
import ARCatalogPage from '@/pages/ARCatalogPage';
import QRGeneratorPage from '@/pages/QRGeneratorPage';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* ── Public AR routes ── */}
        <Route path="/ar" element={<ARCatalogPage />} />
        <Route path="/ar/:slug" element={<ARExperiencePage />} />

        {/* ── Internal tools ── */}
        <Route path="/admin/qr" element={<QRGeneratorPage />} />

        {/* ── Redirects ── */}
        <Route path="/" element={<Navigate to="/ar" replace />} />
        <Route path="*" element={<Navigate to="/ar" replace />} />
      </Routes>
    </BrowserRouter>
  );
}
