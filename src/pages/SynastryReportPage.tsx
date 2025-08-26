// src/pages/SynastryReportPage.tsx

import type { FC } from 'react';
import { useSynastryStore } from '../store/synastryStore';
import { Link } from 'react-router-dom';
import { Header } from '../components/layout/Header';
import { Footer } from '../components/layout/Footer';
import { BackgroundEffects } from '../components/layout/BackgroundEffects';
import { FileQuestion, TrendingUp, Sparkles } from 'lucide-react';
import { Button } from '../components/ui/Button';
import type { CompatibilityAspect } from '../../backend/src/domain/types';
import { motion } from 'framer-motion';

// Sub-componente para exibir cada aspecto da compatibilidade
const AspectCard: FC<{ aspect: CompatibilityAspect, icon: React.ElementType }> = ({ aspect, icon: Icon }) => (
  <motion.div 
    className="bg-[rgb(var(--color-surface))]/50 border border-[rgb(var(--color-surface))] rounded-2xl p-6"
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5 }}
  >
    <div className="flex items-center gap-4">
      <Icon size={28} className="text-accent" />
      <h3 className="font-serif text-2xl text-white">{aspect.title}</h3>
    </div>
    <p className="text-primary font-bold mt-2">{aspect.harmonyScore}% Harmonia</p>
    <p className="text-text-muted mt-4 italic">"{aspect.summary}"</p>
    <p className="text-text-base/90 mt-2">{aspect.details}</p>
  </motion.div>
);

const SynastryReportPage: FC = () => {
  const report = useSynastryStore((state) => state.report);

  if (!report) {
    return (
      <div className="relative flex min-h-screen flex-col bg-[#161221] overflow-hidden text-white">
        <BackgroundEffects />
        <Header />
        <main className="flex-1 flex flex-col items-center justify-center text-center px-4">
          <FileQuestion size={48} className="text-accent/50 mb-4" />
          <h1 className="font-serif text-3xl text-white">Ops! Nenhum relatório encontrado.</h1>
          <p className="text-[rgb(var(--color-text-muted))] mt-2 max-w-sm">
            Para ver a análise de uma conexão, por favor, insira os dados primeiro.
          </p>
          <Link to="/sinastria" className="mt-8">
            <Button variant="secondary" className="px-6 py-3 text-base">
              Voltar para a Sinastria
            </Button>
          </Link>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="relative flex min-h-screen flex-col bg-[#161221] overflow-hidden text-white">
      <BackgroundEffects />
      <Header />
      <main className="flex-1 px-4 md:px-6 py-16">
        <div className="max-w-4xl w-full mx-auto space-y-12">
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center">
            <h1 className="font-serif text-4xl md:text-5xl text-white">
              A Conexão entre <span className="text-primary">{report.person1Name}</span> & <span className="text-primary">{report.person2Name}</span>
            </h1>
            <p className="text-lg md:text-xl text-text-muted mt-4">Harmonia Geral: <strong className="text-primary">{report.overallHarmony}%</strong></p>
          </motion.div>

          <div className="space-y-8">
            <AspectCard aspect={report.sunSignAspect} icon={Sparkles} />
            <AspectCard aspect={report.archetypeAspect} icon={TrendingUp} />
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default SynastryReportPage;