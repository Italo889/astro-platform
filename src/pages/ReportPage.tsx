import type { FC } from 'react';
import { useReportStore } from '../store/reportStore';
import { Link, useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { getReportById } from '../services/reportService';
import { FileQuestion, LoaderCircle } from 'lucide-react';

// Nossos Componentes
import { Header } from '../components/layout/Header';
import { Footer } from '../components/layout/Footer';
import { BackgroundEffects } from '../components/layout/BackgroundEffects';
import { Button } from '../components/ui/Button';
import { ReportHeader } from '../components/features/report/ReportHeader';
import { AstrologySection } from '../components/features/report/AstrologySection';
import { NumerologySection } from '../components/features/report/NumerologySection';
import { ArcanaSection } from '../components/features/report/ArcanaSection';

const ReportPage: FC = () => {
  // Lendo o ID da URL, se existir (ex: /resultado/abc-123)
  const { reportId } = useParams<{ reportId: string }>();
  
  // Pegando os dados do último cálculo (do store), para o caso de virmos do formulário
  const reportFromStore = useReportStore((state) => state.report);
  const userNameFromStore = useReportStore.getState().input?.name;

  // Se houver um reportId na URL, buscamos esse relatório específico na API
  const { data: fetchedReport, isLoading, isError, error } = useQuery({
    queryKey: ['report', reportId],
    queryFn: () => getReportById(reportId!),
    enabled: !!reportId, // O hook só será executado se 'reportId' for verdadeiro
  });
  
  // Decidimos qual relatório exibir: o buscado pela URL tem prioridade.
  // O `content` é extraído aqui pois o fetch retorna o registro completo do DB
  const report = reportId ? fetchedReport?.content : reportFromStore;
  const userName = reportId ? fetchedReport?.content?.astrology.name : userNameFromStore; // Ajuste para pegar nome do input se disponível

  // Estado de Carregamento (enquanto busca um relatório específico)
  if (isLoading) {
    return (
      <div className="relative flex min-h-screen flex-col bg-[#161221] items-center justify-center">
        <BackgroundEffects />
        <LoaderCircle className="animate-spin text-accent" size={40} />
        <p className="mt-4 text-text-muted">Buscando sua análise...</p>
      </div>
    );
  }
  
  // Estado de Erro (se a busca falhar) ou Vazio (se nenhum relatório for encontrado)
  if ((reportId && isError) || !report) {
    return (
      <div className="relative flex min-h-screen flex-col bg-[#161221] overflow-hidden text-white">
        <BackgroundEffects />
        <Header />
        <main className="flex-1 flex flex-col items-center justify-center text-center px-4">
          <FileQuestion size={48} className="text-accent/50 mb-4" />
          <h1 className="font-serif text-3xl text-white">Ops! Relatório não encontrado.</h1>
          <p className="text-[rgb(var(--color-text-muted))] mt-2 max-w-sm">
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
        <Footer />
      </div>
    );
  }

  return (
    <div
      className="relative flex min-h-screen flex-col bg-[#161221] overflow-hidden text-white"
      style={{ fontFamily: '"Noto Sans", sans-serif' }}
    >
      <BackgroundEffects />
      <Header />
      
      <main className="flex flex-col flex-1 px-4 md:px-6 py-16">
        <div className="max-w-4xl w-full mx-auto space-y-12 md:space-y-16">
          
          {report.summary && <ReportHeader name={userName} summary={report.summary} />}
          
          {report.astrology && <AstrologySection result={report.astrology} />}
          
          {report.numerology && <NumerologySection result={report.numerology} />}
          
          {report.arcana && <ArcanaSection result={report.arcana} />}

        </div>
      </main>

      <Footer />
    </div>
  );
};

export default ReportPage;