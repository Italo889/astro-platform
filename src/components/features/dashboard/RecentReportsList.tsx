import type { FC } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Users, ChevronRight, Telescope, Star } from 'lucide-react';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import type { SavedReport, PersonalReport, SynastryReport } from '../../../domain/types';

interface RecentReportsListProps {
  reports: SavedReport[];
}

const ReportListItem: FC<{ report: SavedReport, index: number }> = ({ report, index }) => {
  const content = report.content;
  const isSynastry = content && 'overallHarmony' in content;

  let title = "Relatório Pessoal";
  let type: 'Pessoal' | 'Sinastria' = 'Pessoal';
  let subtitle = "";

  if (isSynastry) {
    const synastryContent = content as SynastryReport;
    type = 'Sinastria';
    const p1 = synastryContent.person1Name;
    const p2 = synastryContent.person2Name;
    if (p1 && p2) {
      title = `${p1.split(' ')[0]} & ${p2.split(' ')[0]}`;
      subtitle = "Conexão Cósmica";
    } else {
      title = "Análise de Conexão";
      subtitle = "Sinastria Místca";
    }
  } else {
    const personalContent = content as PersonalReport;
    const arcanaName = personalContent.arcana?.personalArcana?.name ?? 'Essência Antiga';
    title = `Mapa de ${arcanaName}`;
    subtitle = "Jornada Personal";
  }

  return (
    <Link to={`/resultado/${report.id}`} className="block group">
      <motion.div
        className="relative flex items-center justify-between p-5 rounded-2xl 
                   bg-gradient-to-r from-[#2f2546]/40 via-[#2f2546]/30 to-[#2f2546]/20 
                   border border-[#8b63e9]/20 hover:border-[#8b63e9]/50 
                   backdrop-blur-lg shadow-lg hover:shadow-2xl hover:shadow-[#8b63e9]/10
                   transition-all duration-500 overflow-hidden
                   hover:scale-[1.02] hover:bg-gradient-to-r hover:from-[#2f2546]/60 hover:via-[#2f2546]/50 hover:to-[#2f2546]/40"
        initial={{ opacity: 0, x: -30, filter: "blur(4px)" }}
        animate={{ opacity: 1, x: 0, filter: "blur(0px)" }}
        transition={{ duration: 0.6, delay: index * 0.08, ease: "easeOut" }}
        whileHover={{ y: -2 }}
      >
        {/* Brilho místico de fundo */}
        <div className={`absolute inset-0 bg-gradient-to-r 
                        ${type === 'Pessoal' 
                          ? 'from-[#FFD700]/5 via-transparent to-[#FFD700]/8' 
                          : 'from-[#8b63e9]/5 via-transparent to-[#8b63e9]/8'} 
                        opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl`} />
        
        {/* Partículas flutuantes */}
        <div className="absolute top-3 right-4 w-1 h-1 bg-[#FFD700]/40 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        <div className="absolute bottom-3 left-6 w-0.5 h-0.5 bg-[#8b63e9]/30 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100" />

        <div className="flex items-center gap-5 flex-1 relative z-10">
          {/* Ícone Premium */}
          <motion.div 
            className={`p-3 rounded-xl border backdrop-blur-sm
                       ${type === 'Pessoal' 
                         ? 'bg-[#FFD700]/10 border-[#FFD700]/30 text-[#FFD700] group-hover:bg-[#FFD700]/20 group-hover:border-[#FFD700]/50' 
                         : 'bg-[#8b63e9]/10 border-[#8b63e9]/30 text-[#8b63e9] group-hover:bg-[#8b63e9]/20 group-hover:border-[#8b63e9]/50'} 
                       transition-all duration-300 flex-shrink-0 shadow-lg`}
            whileHover={{ rotate: 10, scale: 1.1 }}
          >
            {type === 'Pessoal' ? (
              <Star className="w-5 h-5 transition-transform group-hover:scale-110" />
            ) : (
              <Users className="w-5 h-5 transition-transform group-hover:scale-110" />
            )}
          </motion.div>
          
          <div className="flex-1 min-w-0">
            <h3 className={`font-semibold text-white text-lg leading-tight mb-1
                           ${type === 'Pessoal' 
                             ? 'group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-[#FFD700] group-hover:to-[#FFED4A] group-hover:bg-clip-text' 
                             : 'group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-[#8b63e9] group-hover:to-[#a78bfa] group-hover:bg-clip-text'} 
                           transition-all duration-500 truncate`}
                style={{ fontFamily: 'Marcellus SC, serif' }}>
              {title}
            </h3>
            
            <div className="flex items-center gap-2 text-sm">
              <span className="text-[#a495c6] font-light" 
                    style={{ fontFamily: 'Noto Sans, sans-serif' }}>
                {subtitle}
              </span>
              <span className="text-[#8b63e9]/60">•</span>
              <span className="text-[#a495c6]/80 text-xs" 
                    style={{ fontFamily: 'Noto Sans, sans-serif' }}>
                {format(new Date(report.createdAt), "dd 'de' MMM, yyyy", { locale: ptBR })}
              </span>
            </div>
            
            {/* Linha decorativa */}
            <div className={`w-0 h-0.5 mt-2 rounded-full 
                           ${type === 'Pessoal' 
                             ? 'bg-gradient-to-r from-[#FFD700] to-transparent group-hover:w-16' 
                             : 'bg-gradient-to-r from-[#8b63e9] to-transparent group-hover:w-16'} 
                           transition-all duration-700 shadow-sm shadow-current/30`} />
          </div>
        </div>

        {/* Seta com efeito */}
        <motion.div 
          className="relative z-10 p-2 rounded-lg bg-[#2f2546]/50 border border-[#8b63e9]/20 
                     group-hover:border-[#8b63e9]/40 transition-all duration-300"
          whileHover={{ x: 3 }}
        >
          <ChevronRight 
            className="w-5 h-5 text-[#a495c6] group-hover:text-white 
                       transition-all duration-300 group-hover:drop-shadow-sm" 
          />
        </motion.div>
      </motion.div>
    </Link>
  );
};

export const RecentReportsList: FC<RecentReportsListProps> = ({ reports }) => {
  if (reports.length === 0) {
    return (
      <motion.div 
        className="text-center p-10 bg-gradient-to-br from-[#2f2546]/30 via-[#2f2546]/20 to-[#2f2546]/10 
                   rounded-3xl border border-[#8b63e9]/20 backdrop-blur-lg shadow-2xl relative overflow-hidden"
        initial={{ opacity: 0, scale: 0.95, filter: "blur(8px)" }}
        animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        {/* Brilho de fundo */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#8b63e9]/5 via-transparent to-[#FFD700]/5 opacity-50" />
        
        {/* Partículas decorativas */}
        <div className="absolute top-6 right-8 w-1 h-1 bg-[#FFD700]/40 rounded-full animate-pulse" />
        <div className="absolute bottom-8 left-10 w-0.5 h-0.5 bg-[#8b63e9]/30 rounded-full animate-pulse delay-500" />
        <div className="absolute top-12 left-6 w-0.5 h-0.5 bg-[#FFD700]/20 rounded-full animate-pulse delay-1000" />
        
        <div className="relative z-10">
          <motion.div
            className="mx-auto mb-6 p-4 rounded-2xl bg-[#8b63e9]/10 border border-[#8b63e9]/30 w-20 h-20 flex items-center justify-center"
            initial={{ rotate: -10, scale: 0.8 }}
            animate={{ rotate: 0, scale: 1 }}
            transition={{ delay: 0.3, duration: 0.6 }}
          >
            <Telescope className="w-10 h-10 text-[#8b63e9] drop-shadow-sm" />
          </motion.div>
          
          <h4 className="text-2xl font-bold text-white mb-3 bg-gradient-to-r from-[#F5F5F5] to-[#8b63e9] bg-clip-text" 
              style={{ fontFamily: 'Marcellus SC, serif' }}>
            Nenhuma Jornada Registrada
          </h4>
          
          <p className="text-[#a495c6] text-base leading-relaxed font-light max-w-md mx-auto" 
             style={{ fontFamily: 'Noto Sans, sans-serif' }}>
            Suas análises cósmicas aparecerão aqui assim que forem criadas. 
            <br />
            <span className="text-[#8b63e9]">Comece sua primeira consulta!</span>
          </p>
          
          {/* Linha decorativa */}
          <div className="w-0 h-0.5 bg-gradient-to-r from-transparent via-[#8b63e9] to-transparent 
                         animate-pulse mt-4 mx-auto rounded-full shadow-sm shadow-[#8b63e9]/30" 
               style={{ width: '60px' }} />
        </div>
      </motion.div>
    );
  }

  // Limitar a 6 relatórios mais recentes e adicionar scroll
  const maxReports = 6;
  const displayReports = reports.slice(0, maxReports);
  const hasMoreReports = reports.length > maxReports;

  return (
    <div className="relative">
      {/* Container com scroll personalizado */}
      <div className={`space-y-4 ${displayReports.length > 4 ? 'max-h-96 overflow-y-auto pr-2' : ''} 
                     scrollbar-thin scrollbar-track-[#2f2546]/20 scrollbar-thumb-[#8b63e9]/40 
                     hover:scrollbar-thumb-[#8b63e9]/60 scrollbar-thumb-rounded-full`}>
        {displayReports.map((report, index) => (
          <ReportListItem key={report.id} report={report} index={index} />
        ))}
      </div>
      
      {/* Indicador de mais relatórios */}
      {hasMoreReports && (
        <motion.div 
          className="mt-6 text-center"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.5 }}
        >
          <div className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-[#8b63e9]/10 to-[#8b63e9]/5 
                         border border-[#8b63e9]/30 rounded-2xl backdrop-blur-sm text-[#a495c6] text-sm font-light"
               style={{ fontFamily: 'Noto Sans, sans-serif' }}>
            <span>+{reports.length - maxReports} relatório{reports.length - maxReports !== 1 ? 's' : ''} mais antigo{reports.length - maxReports !== 1 ? 's' : ''}</span>
            <div className="w-2 h-2 bg-[#8b63e9]/50 rounded-full animate-pulse" />
          </div>
        </motion.div>
      )}
      
      {/* Gradiente de fade para o scroll */}
      {displayReports.length > 4 && (
        <div className="absolute bottom-0 left-0 right-2 h-8 bg-gradient-to-t from-[#161221] to-transparent pointer-events-none rounded-b-2xl" />
      )}
    </div>
  );
};