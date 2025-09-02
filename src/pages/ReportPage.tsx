import type { FC } from 'react';
import { useAuthStore } from '../store/authStore';
import { useReportStore } from '../store/reportStore';
import { Link, useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { getReportById } from '../services/reportService';
import { FileQuestion, LoaderCircle } from 'lucide-react';
import { motion } from 'framer-motion';

import { BackgroundEffects } from '../components/layout/BackgroundEffects';
import { Button } from '../components/ui/Button';
import { AstrologySection } from '../components/features/report/AstrologySection';
import { NumerologySection } from '../components/features/report/NumerologySection';
import { ArcanaSection } from '../components/features/report/ArcanaSection';
import type { PersonalReport } from '../domain/types';

const ReportPage: FC = () => {
  const { reportId } = useParams<{ reportId: string }>();
  
  const reportFromStore = useReportStore((state) => state.report);
  const inputFromStore = useReportStore((state) => state.input);
  const loggedInUser = useAuthStore((state) => state.user);

  const { data: fetchedReport, isLoading, isError, error } = useQuery({
    queryKey: ['report', reportId],
    queryFn: () => getReportById(reportId!),
    enabled: !!reportId,
  });
  
  const report: PersonalReport | null = reportId ? (fetchedReport?.content as PersonalReport) : reportFromStore;
  const displayName = reportId ? loggedInUser?.name : inputFromStore?.name;

  if (isLoading) {
    return (
      <div className="relative flex min-h-screen flex-col bg-background items-center justify-center">
        <BackgroundEffects />
        <LoaderCircle className="animate-spin text-accent" size={40} />
        <p className="mt-4 text-text-muted">Buscando sua análise...</p>
      </div>
    );
  }
  
  if ((reportId && isError) || !report) {
    return (
      <div className="relative flex min-h-screen flex-col bg-background overflow-hidden text-white">
        <BackgroundEffects />
        <main className="flex-1 flex flex-col items-center justify-center text-center px-4">
          <FileQuestion size={48} className="text-accent/50 mb-4" />
          <h1 className="font-serif text-3xl text-white">Ops! Relatório não encontrado.</h1>
          <p className="text-text-muted mt-2 max-w-sm">
            {isError 
              ? (error as Error).message 
              : "Parece que você chegou aqui sem gerar uma análise. Volte ao início para decodificar seu universo."}
          </p>
          <Link to="/" className="mt-8">
            <Button variant="secondary" className="px-6 py-3 text-base">
              Voltar e calcular
            </Button>
          </Link>
        </main>
      </div>
    );
  }

  // Desestruturamos os dados aqui para um código mais limpo
  const { astrology, numerology, arcana, summary } = report;

  return (
    <div
      className="relative flex min-h-screen flex-col bg-background overflow-hidden text-white"
      style={{ fontFamily: '"Noto Sans", sans-serif' }}
    >
      <BackgroundEffects />
      
      {/* Navigation Header */}
      <motion.header 
        className="fixed top-0 left-0 right-0 z-50 px-4 md:px-6 py-4 bg-black/20 backdrop-blur-xl border-b border-white/5"
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <div className="max-w-4xl mx-auto flex items-center justify-between">
          <Link to="/dashboard" className="group flex items-center gap-2 text-white/70 hover:text-white transition-colors duration-300">
            <svg className="w-5 h-5 group-hover:-translate-x-1 transition-transform duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            <span className="text-sm font-medium">Voltar ao Dashboard</span>
          </Link>
          
          <div className="flex items-center gap-2 text-xs text-white/50">
            <span>Relatório Pessoal</span>
            <div className="w-1 h-1 bg-white/30 rounded-full" />
            <span>{new Date().toLocaleDateString('pt-BR')}</span>
          </div>
        </div>
      </motion.header>
      
      <main className="flex flex-col flex-1 px-4 md:px-6 pt-20 pb-16">
        <div className="max-w-4xl w-full mx-auto">
          
          {/* Header moderno */}
          {displayName && summary && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-center mb-12 md:mb-16"
            >
              <h1 className="font-serif text-4xl md:text-6xl text-white mb-6">
                A Constelação de{' '}
                <span className="text-transparent bg-gradient-to-r from-[#FFD700] to-[#8b63e9] bg-clip-text">
                  {displayName}
                </span>
              </h1>
              
              <div className="max-w-2xl mx-auto">
                <div className="h-px bg-gradient-to-r from-transparent via-white/20 to-transparent mb-6" />
                <p className="text-lg text-white/70 leading-relaxed">
                  {summary}
                </p>
              </div>
            </motion.div>
          )}
          
          {/* Sections com espaçamento otimizado */}
          <div className="space-y-16 md:space-y-20">
            {astrology && <AstrologySection astrologyData={astrology} />}
            {numerology && <NumerologySection numerologyData={numerology} />}
            {arcana && <ArcanaSection arcanaData={arcana} />}
          </div>

        </div>
      </main>
    </div>
  );
};

export default ReportPage;