import type { FC } from 'react';
import { useAuthStore } from '../store/authStore';
import { useReportStore } from '../store/reportStore';
import { Link, useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { getReportById } from '../services/reportService';
import { FileQuestion, LoaderCircle } from 'lucide-react';

import { BackgroundEffects } from '../components/layout/BackgroundEffects';
import { Button } from '../components/ui/Button';
import { ReportHeader } from '../components/features/report/ReportHeader';
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
      
      <main className="flex flex-col flex-1 px-4 md:px-6 py-16">
        <div className="max-w-4xl w-full mx-auto space-y-12 md:space-y-16">
          
          {displayName && summary && <ReportHeader name={displayName} summary={summary} />}
          
          {/* CORREÇÃO FINAL: As props foram renomeadas para a versão final e descritiva */}
          {astrology && <AstrologySection astrologyData={astrology} />}
          
          {numerology && <NumerologySection numerologyData={numerology} />}
          
          {arcana && <ArcanaSection arcanaData={arcana} />}

        </div>
      </main>
    </div>
  );
};

export default ReportPage;