import { HashRouter, Routes, Route, Navigate } from 'react-router-dom';
import ARExperiencePage from '@/pages/ARExperiencePage';
import ARCatalogPage from '@/pages/ARCatalogPage';
import QRGeneratorPage from '@/pages/QRGeneratorPage';
import SpotRedirectPage from '@/pages/SpotRedirectPage';
import DebugARPage from '@/pages/DebugARPage';
import ARTestPage from '@/pages/ARTestPage';
import LoginPage from '@/pages/LoginPage';
import AdminDashboardPage from '@/pages/AdminDashboardPage';
import AdminExperienceForm from '@/pages/AdminExperienceForm';
import AdminGuard from '@/components/AdminGuard';

export default function App() {
  return (
    <HashRouter>
      <Routes>
        {/* ── Public AR routes ── */}
        <Route path="/ar" element={<ARCatalogPage />} />
        <Route path="/ar/:slug" element={<ARExperiencePage />} />
        <Route path="/debug" element={<DebugARPage />} />
        <Route path="/ar-test" element={<ARTestPage />} />

        {/* ── Dynamic spot short links (QR físicos) ── */}
        <Route path="/s/:spotId" element={<SpotRedirectPage />} />

        {/* ── Auth ── */}
        <Route path="/login" element={<LoginPage />} />

        {/* ── Admin (protected) ── */}
        <Route path="/admin" element={<AdminGuard><AdminDashboardPage /></AdminGuard>} />
        <Route path="/admin/experience/:slug" element={<AdminGuard><AdminExperienceForm /></AdminGuard>} />
        <Route path="/admin/qr" element={<AdminGuard><QRGeneratorPage /></AdminGuard>} />

        {/* ── Redirects ── */}
        <Route path="/" element={<Navigate to="/ar" replace />} />
        <Route path="*" element={<Navigate to="/ar" replace />} />
      </Routes>
    </HashRouter>
  );
}
