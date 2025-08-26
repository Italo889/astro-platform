// src/components/features/dashboard/RecentReportsList.tsx

import type { FC } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { FileText, Users, ChevronRight, LoaderCircle, CloudFog } from 'lucide-react'; // Ícone de alerta trocado por CloudFog
import { useQuery } from '@tanstack/react-query';
import { getMyReports } from '../../../services/reportService';
import type { Report } from '../../../domain/types';
import { Button } from '../../ui/Button'; // Importando nosso botão

// O tipo do relatório vindo do Prisma tem 'content' como JSON. Precisamos tipar isso.
type ReportFromApi = Omit<Report, 'content'> & {
    id: string;
    createdAt: string;
    content: any; // O Prisma retorna o campo Json como 'any' ou 'JsonValue'
}

const ReportListItem: FC<{ report: ReportFromApi, index: number }> = ({ report, index }) => {
  const reportContent = report.content; 
  const isSynastry = !!reportContent.arcana.destinyArcana;
  const reportType = isSynastry ? 'Sinastria' : 'Pessoal';
  const reportTitle = isSynastry 
    ? reportContent.person1Name || "Análise de Conexão"
    : "Meu Mapa de Vida";

  return (
    <Link to={`/resultado/${report.id}`}>
      <motion.div
        className="flex items-center justify-between p-4 rounded-lg bg-surface/50 hover:bg-surface transition-colors"
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5, delay: index * 0.1 }}
      >
        <div className="flex items-center gap-4">
          {reportType === 'Pessoal' ? <FileText className="text-accent" /> : <Users className="text-accent" />}
          <div>
            <p className="font-semibold text-white">{reportTitle}</p>
            {/* CORREÇÃO DE BUG: A data vem do nível principal do relatório, não de 'content' */}
            <p className="text-xs text-text-muted">{reportType} • {new Date(report.createdAt).toLocaleDateString('pt-BR')}</p>
          </div>
        </div>
        <ChevronRight className="text-text-muted" />
      </motion.div>
    </Link>
  );
};

export const RecentReportsList: FC = () => {
  // O hook useQuery agora também nos dá a função 'refetch'
  const { data: reports, isLoading, isError, refetch } = useQuery<ReportFromApi[]>({
    queryKey: ['myReports'],
    queryFn: async () => {
      const reports = await getMyReports();
      return reports as unknown as ReportFromApi[];
    },
    retry: 1, // Tenta buscar os dados apenas 1 vez antes de mostrar o erro
  });

  if (isLoading) {
    return (
      <div className="flex justify-center items-center p-8 h-40">
        <LoaderCircle className="animate-spin text-accent" />
        <p className="ml-4 text-text-muted">Buscando suas análises...</p>
      </div>
    );
  }

  // NOVO: Bloco de erro totalmente redesenhado
  if (isError) {
    return (
      <div className="text-center p-8 bg-surface/30 rounded-2xl border border-surface">
        <CloudFog className="mx-auto text-accent/50 mb-4" size={40} />
        <h4 className="font-serif text-xl text-white">Sinal Cósmico Interrompido</h4>
        <p className="text-text-muted mt-2 text-sm max-w-xs mx-auto">
          Não conseguimos nos conectar aos nossos servidores. Isso pode ser uma instabilidade momentânea na sua conexão.
        </p>
        <Button 
          variant="secondary" 
          className="mt-6 px-5 py-2 text-sm"
          onClick={() => refetch()} // O botão agora tenta buscar os dados novamente
        >
          Tentar Reconectar
        </Button>
      </div>
    );
  }

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }}>
      <h3 className="font-serif text-2xl mb-4">Análises Recentes</h3>
      
      {reports && reports.length > 0 ? (
        <div className="space-y-3">
          {reports.map((report: ReportFromApi, index: number) => (
            <ReportListItem key={report.id} report={report} index={index} />
          ))}
        </div>
      ) : (
        <div className="text-center p-8 bg-surface/30 rounded-lg">
          <p className="text-text-muted">Você ainda não tem relatórios salvos.</p>
          <p className="text-text-muted text-sm">Suas análises aparecerão aqui quando você as criar.</p>
        </div>
      )}
    </motion.div>
  );
};