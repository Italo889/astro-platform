// src/main.tsx

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
import { ProtectedRoute } from './components/auth/ProtectedRoute';

const queryClient = new QueryClient();

const router = createBrowserRouter([
  {
    // A rota "pai" agora usa nosso RootLayout
    element: <RootLayout />,
    // Todas as nossas páginas agora são filhas deste layout
    children: [
      { path: "/", element: <LandingPage /> },
      { path: "/resultado", element: <ReportPage /> },
      { path: "/resultado/:reportId", element: <ReportPage /> },
      { path: "/sinastria", element: <SynastryPage /> },
      { path: "/sinastria/resultado", element: <SynastryReportPage /> },
      {
        // O grupo de rotas protegidas também fica aqui dentro
        element: <ProtectedRoute />,
        children: [
          { path: "/dashboard", element: <DashboardPage /> },
        ],
      },
    ]
  }
]);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
    </QueryClientProvider>
  </React.StrictMode>,
);