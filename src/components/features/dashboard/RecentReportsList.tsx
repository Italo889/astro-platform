import type { FC } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Users, ChevronRight, Telescope, Star, Eye } from 'lucide-react';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import type { SavedReport, PersonalReport, SynastryReport } from '../../../domain/types';

interface RecentReportsListProps {
  reports: SavedReport[];
}

const ReportListItem: FC<{ report: SavedReport, index: number }> = ({ report, index }) => {
  const content = report.content;
  
  // Determinar o tipo e dados do relatório
  const isPersistentType = 'astrology' in content;
  const type = isPersistentType ? 'Pessoal' : 'Sinastria';
  const title = isPersistentType 
    ? `Análise de ${(content as PersonalReport).summary?.split(' ')[0] || 'Usuário'}` 
    : `${(content as SynastryReport).person1Name} & ${(content as SynastryReport).person2Name}`;
  
  const subtitle = isPersistentType 
    ? 'Relatório Astral Completo' 
    : `${(content as SynastryReport).overallHarmony}% de compatibilidade`;

  const href = isPersistentType ? `/report/${report.id}` : `/sinastria/report/${report.id}`;

  return (
    <Link to={href} className="block group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#8b63e9] focus-visible:ring-offset-2 focus-visible:ring-offset-[#161221]">
      <motion.div 
        className="relative bg-gradient-to-br from-[#2f2546]/40 via-[#2f2546]/30 to-[#2f2546]/20 
                   border border-[#8b63e9]/20 hover:border-[#8b63e9]/50 
                   backdrop-blur-lg shadow-lg hover:shadow-2xl hover:shadow-[#8b63e9]/10
                   transition-all duration-500 overflow-hidden rounded-2xl
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

        <div className="flex items-center gap-4 p-4 md:p-6 flex-1 relative z-10">
          {/* Ícone Premium */}
          <motion.div 
            className={`p-3 md:p-4 rounded-2xl border backdrop-blur-sm
                       ${type === 'Pessoal' 
                         ? 'bg-[#FFD700]/10 border-[#FFD700]/20 group-hover:bg-[#FFD700]/20' 
                         : 'bg-[#8b63e9]/10 border-[#8b63e9]/20 group-hover:bg-[#8b63e9]/20'} 
                       transition-all duration-300`}
            whileHover={{ scale: 1.05, rotate: type === 'Pessoal' ? 5 : -5 }}
          >
            {type === 'Pessoal' ? (
              <Star className="w-5 h-5 md:w-6 md:h-6 text-[#FFD700] drop-shadow-sm" />
            ) : (
              <Users className="w-5 h-5 md:w-6 md:h-6 text-[#8b63e9] drop-shadow-sm" />
            )}
          </motion.div>

          {/* Conteúdo Principal */}
          <div className="flex-1 min-w-0">
            <div className="flex items-start justify-between gap-4 mb-2">
              <h4 className="font-serif text-lg md:text-xl text-white group-hover:text-[#FFD700] 
                           transition-colors duration-300 line-clamp-1 font-medium" 
                  style={{ fontFamily: 'Marcellus SC, serif' }}>
                {title}
              </h4>
              <span className={`text-xs font-medium px-2 py-1 rounded-full border backdrop-blur-sm
                              ${type === 'Pessoal' 
                                ? 'bg-[#FFD700]/10 border-[#FFD700]/20 text-[#FFD700]' 
                                : 'bg-[#8b63e9]/10 border-[#8b63e9]/20 text-[#8b63e9]'} 
                              flex-shrink-0`}>
                {type}
              </span>
            </div>
            
            {/* Informações secundárias */}
            <div className="flex items-center gap-2 text-xs sm:text-sm">
              <span className="text-[#a495c6] font-light hidden sm:inline line-clamp-1" 
                    style={{ fontFamily: 'Noto Sans, sans-serif' }}>
                {subtitle}
              </span>
              <span className="text-[#8b63e9]/60 hidden sm:inline">•</span>
              <span className="text-[#a495c6]/80 text-xs line-clamp-1" 
                    style={{ fontFamily: 'Noto Sans, sans-serif' }}>
                {format(new Date(report.createdAt), "dd 'de' MMM, yyyy", { locale: ptBR })}
              </span>
            </div>
            
            {/* Linha decorativa */}
            <div className={`w-0 h-0.5 mt-2 rounded-full 
                           ${type === 'Pessoal' 
                             ? 'bg-gradient-to-r from-[#FFD700] to-transparent group-hover:w-12 sm:group-hover:w-16' 
                             : 'bg-gradient-to-r from-[#8b63e9] to-transparent group-hover:w-12 sm:group-hover:w-16'} 
                           transition-all duration-700 shadow-sm shadow-current/30`} />
          </div>
        </div>

        {/* Seta com efeito */}
        <motion.div 
          className="absolute top-1/2 right-4 -translate-y-1/2 z-10 p-2 rounded-lg bg-[#2f2546]/50 border border-[#8b63e9]/20 
                     group-hover:border-[#8b63e9]/40 transition-all duration-300"
          whileHover={{ x: 3 }}
        >
          <ChevronRight 
            className="w-4 h-4 sm:w-5 sm:h-5 text-[#a495c6] group-hover:text-white 
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
        <div className="absolute top-6 left-8 w-1 h-1 bg-[#8b63e9]/30 rounded-full animate-pulse" />
        <div className="absolute bottom-8 right-6 w-0.5 h-0.5 bg-[#FFD700]/40 rounded-full animate-pulse delay-500" />
        <div className="absolute top-1/2 left-4 w-0.5 h-0.5 bg-[#8b63e9]/20 rounded-full animate-pulse delay-1000" />

        <div className="relative z-10">
          {/* Ícone central */}
          <motion.div 
            className="w-16 h-16 mx-auto mb-6 rounded-2xl bg-gradient-to-br from-[#2f2546]/60 to-[#161221]/40 
                       border border-[#8b63e9]/30 flex items-center justify-center shadow-lg"
            whileHover={{ scale: 1.05, rotate: 5 }}
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

  // Limitar a 6 relatórios mais recentes
  const maxReports = 6;
  const displayReports = reports.slice(0, maxReports);
  const hasMoreReports = reports.length > maxReports;

  return (
    <div className="relative">
      {/* Container com scroll personalizado */}
      <div className={`space-y-4 ${displayReports.length > 4 ? 'max-h-80 sm:max-h-96 overflow-y-auto pr-2' : ''} 
                     scrollbar-thin scrollbar-track-[#2f2546]/20 scrollbar-thumb-[#8b63e9]/40 
                     hover:scrollbar-thumb-[#8b63e9]/60 scrollbar-thumb-rounded-full`}>
        {displayReports.map((report, index) => (
          <ReportListItem key={report.id} report={report} index={index} />
        ))}
      </div>
      
      {/* Botão funcional para ver todos os relatórios */}
      {hasMoreReports && (
        <motion.div 
          className="mt-4 sm:mt-6 text-center"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.5 }}
        >
          <Link 
            to="/dashboard?tab=reports" 
            className="group inline-flex items-center gap-3 px-4 py-3 bg-gradient-to-r from-[#8b63e9]/10 to-[#8b63e9]/5 
                       border border-[#8b63e9]/30 hover:border-[#8b63e9]/50 rounded-2xl backdrop-blur-sm 
                       text-[#a495c6] hover:text-white transition-all duration-300 
                       hover:bg-gradient-to-r hover:from-[#8b63e9]/20 hover:to-[#8b63e9]/10"
          >
            <Eye className="w-4 h-4 group-hover:scale-110 transition-transform duration-300" />
            <span className="text-sm font-medium">
              Ver todos os {reports.length} relatórios
            </span>
            <div className="flex items-center gap-1">
              <div className="w-2 h-2 bg-[#8b63e9]/50 rounded-full group-hover:bg-[#8b63e9] transition-colors duration-300" />
              <svg className="w-4 h-4 group-hover:translate-x-0.5 transition-transform duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </div>
          </Link>
        </motion.div>
      )}
      
      {/* Gradiente de fade para o scroll */}
      {displayReports.length > 4 && (
        <div className="absolute bottom-0 left-0 right-2 h-8 bg-gradient-to-t from-[#161221] to-transparent pointer-events-none rounded-b-2xl" />
      )}
    </div>
  );
};