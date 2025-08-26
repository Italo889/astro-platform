// src/pages/DashboardPage.tsx

import type { FC } from 'react';
import { useAuthStore } from '../store/authStore';
import { useReportStore } from '../store/reportStore';
import { Header } from '../components/layout/Header';
import { Footer } from '../components/layout/Footer';
import { BackgroundEffects } from '../components/layout/BackgroundEffects';
import { motion } from 'framer-motion';

// Componentes do Dashboard
import { CoreArchetypesCard } from '../components/features/dashboard/CoreArchetypesCard';
import { ActionCards } from '../components/features/dashboard/ActionCards';
import { RecentReportsList } from '../components/features/dashboard/RecentReportsList'; // <-- Importe o novo componente

const DashboardPage: FC = () => {
  const user = useAuthStore((state) => state.user);
  const report = useReportStore((state) => state.report);

  return (
    <div
      className="relative flex min-h-screen flex-col bg-[#161221] overflow-hidden text-white"
      style={{ fontFamily: '"Noto Sans", sans-serif' }}
    >
      <BackgroundEffects />
      <Header />
      
      <main className="flex-1 px-4 md:px-6 py-16">
        <div className="max-w-4xl w-full mx-auto space-y-8">
          
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="font-serif text-4xl md:text-5xl text-white">
              Seu Santuário Pessoal
            </h1>
            <p className="text-lg text-[rgb(var(--color-text-muted))] mt-2">
              Bem-vindo(a) de volta, {user?.name?.split(' ')[0]}.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
            
            {/* Coluna Principal (2/3 da largura) */}
            <div className="lg:col-span-2 space-y-8">
              {report && (
                <CoreArchetypesCard 
                  sunSign={report.astrology.sun}
                  lifePathArcana={report.arcana.lifePathArcana}
                />
              )}
              {/* Renderize a lista de relatórios aqui */}
              <RecentReportsList />
            </div>

            {/* Coluna Lateral (1/3 da largura) */}
            <div className="space-y-8">
              <ActionCards />
            </div>

          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default DashboardPage;