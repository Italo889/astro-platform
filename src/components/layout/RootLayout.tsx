// src/components/layout/RootLayout.tsx

import type { FC } from 'react';
import { Outlet } from 'react-router-dom';
import { BackgroundEffects } from './BackgroundEffects';
import { Header } from './Header';
import { Footer } from './Footer';
import { AuthModal } from '../auth/AuthModal';

export const RootLayout: FC = () => {
  return (
    <div
      className="relative flex min-h-screen flex-col bg-[#161221] overflow-hidden text-white"
      style={{ fontFamily: '"Noto Sans", sans-serif' }}
    >
      <BackgroundEffects />
      <Header />
      
      {/* O <Outlet /> é onde o React Router irá renderizar a página da rota atual (Landing, Synastry, etc.) */}
      <Outlet />

      <Footer />

      {/* O Modal de Autenticação agora vive aqui, disponível para toda a aplicação */}
      <AuthModal />
    </div>
  );
};