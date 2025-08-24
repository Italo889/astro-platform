// src/main.tsx

import React from 'react';
import ReactDOM from 'react-dom/client';
// NOVO: Importando as ferramentas do React Router
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

// Importando os estilos globais
import './index.css';
import './styles/global.css';
import './styles/animations.css';

// Importando nossas páginas
import LandingPage from './pages/LandingPage';
import ReportPage from './pages/ReportPage';

// NOVO: Definindo o mapa de rotas do nosso site
const router = createBrowserRouter([
  {
    path: "/", // A rota raiz (ex: www.arcano.com)
    element: <LandingPage />,
  },
  {
    path: "/resultado", // A rota para a página de resultados
    element: <ReportPage />,
  },
]);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    {/* NOVO: Usamos o RouterProvider para habilitar a navegação em toda a aplicação */}
    <RouterProvider router={router} />
  </React.StrictMode>,
);