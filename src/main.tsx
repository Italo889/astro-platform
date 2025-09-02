import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import './index.css';
import './styles/global.css';
import './styles/animations.css';

// Layouts e Páginas
import { RootLayout } from './components/layout/RootLayout';
import LandingPage from './pages/LandingPage';
import ReportPage from './pages/ReportPage';
import SynastryPage from './pages/SynastryPage';
import SynastryReportPage from './pages/SynastryReportPage';
import DashboardPage from './pages/DashboardPage';
import AdminDashboardPage from './pages/AdminDashboardPage';
import AdminChangelogPage from './pages/AdminChangelogPage';
import ChangelogPage from './pages/ChangelogPage';
import PrivacyPolicyPage from './pages/PrivacyPolicyPage'; // <-- IMPORTAÇÃO
import { ProtectedRoute } from './components/auth/ProtectedRoute';

const queryClient = new QueryClient();

const router = createBrowserRouter([
  {
    element: <RootLayout />,
    children: [
      { path: '/', element: <LandingPage /> },
      { path: '/resultado', element: <ReportPage /> },
      { path: '/resultado/:reportId', element: <ReportPage /> },
      { path: '/sinastria', element: <SynastryPage /> },
      { path: '/sinastria/resultado', element: <SynastryReportPage /> },
      { path: '/changelog', element: <ChangelogPage /> },
      { path: '/politica-de-privacidade', element: <PrivacyPolicyPage /> }, // <-- NOVA ROTA
      {
        element: <ProtectedRoute />,
        children: [
          { path: '/dashboard', element: <DashboardPage /> },
          { path: '/admin', element: <AdminDashboardPage /> },
          { path: '/admin/changelog', element: <AdminChangelogPage /> },
        ],
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
    </QueryClientProvider>
  </React.StrictMode>,
);