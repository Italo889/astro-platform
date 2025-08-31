import type { FC } from 'react';
import { motion } from 'framer-motion';

interface ReportHeaderProps {
  name?: string;
  summary: string;
  reportType?: 'astral' | 'tarot' | 'numerology';
}

// Função auxiliar para renderizar o texto com negrito
const renderSummaryWithBold = (text: string) => {
  const parts = text.split(/(\*\*.*?\*\*)/g);

  return parts.map((part, index) => {
    if (part.startsWith('**') && part.endsWith('**')) {
      return (
        <strong key={index} className="text-[#FFD700] font-semibold">
          {part.slice(2, -2)}
        </strong>
      );
    }
    return part;
  });
};

export const ReportHeader: FC<ReportHeaderProps> = ({ 
  name, 
  summary, 
  reportType = 'astral' 
}) => {
  const reportConfig = {
    astral: {
      title: name ? `A Constelação de ${name}` : "Sua Constelação Pessoal",
      subtitle: "Mapa Astral Completo",
      description: "Uma análise detalhada das posições planetárias no momento do seu nascimento",
      color: "#8b63e9",
      icon: (
        <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none">
          <path d="M12 6V18M6 12H18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
          <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="2" />
        </svg>
      )
    },
    tarot: {
      title: name ? `O Arquétipo de ${name}` : "Seu Arquétipo Pessoal",
      subtitle: "Leitura de Tarot Arcano",
      description: "Revelando os arquétipos que guiam seu caminho e propósito",
      color: "#FFD700",
      icon: (
        <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none">
          <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      )
    },
    numerology: {
      title: name ? `A Numerologia de ${name}` : "Sua Jornada Numérica",
      subtitle: "Análise Numerológica",
      description: "Descobrindo os números que regem seu destino e potencial",
      color: "#a495c6",
      icon: (
        <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none">
          <path d="M12 2V22M2 12H22" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
        </svg>
      )
    }
  };

  const config = reportConfig[reportType];

  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, ease: "easeOut" }}
      className="relative text-center py-12 px-6 max-w-4xl mx-auto"
    >
      {/* Card de informações do relatório */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.2 }}
        className="bg-[#2f2546] rounded-2xl p-6 mb-10 border border-[#3a2d5a] shadow-lg"
      >
        <div className="flex items-center justify-center gap-3 mb-4">
          <div className="p-2 rounded-lg" style={{ backgroundColor: `${config.color}20` }}>
            <div style={{ color: config.color }}>
              {config.icon}
            </div>
          </div>
          <div className="text-left">
            <h2 className="text-[#a495c6] text-sm font-medium uppercase tracking-wider">
              {config.subtitle}
            </h2>
            <p className="text-[#F5F5F5] text-xs">
              {config.description}
            </p>
          </div>
        </div>
        
        <div className="flex items-center justify-between text-xs text-[#a495c6]">
          <span>Relatório gerado em {new Date().toLocaleDateString('pt-BR')}</span>
          <span>Arcano © {new Date().getFullYear()}</span>
        </div>
      </motion.div>

      {/* Título principal */}
      <motion.h1 
        className="font-heading text-4xl md:text-5xl text-[#F5F5F5] mb-6 leading-tight"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.4 }}
      >
        {config.title}
      </motion.h1>

      {/* Divisor elegante */}
      <motion.div 
        className="flex items-center justify-center mb-8"
        initial={{ opacity: 0, scaleX: 0 }}
        animate={{ opacity: 1, scaleX: 1 }}
        transition={{ duration: 0.7, delay: 0.6 }}
      >
        <div className="h-px w-16 bg-gradient-to-r from-transparent to-[#8b63e9]" />
        <div className="w-2 h-2 rounded-full mx-3" style={{ backgroundColor: config.color }} />
        <div className="h-px w-16 bg-gradient-to-l from-transparent to-[#8b63e9]" />
      </motion.div>
      
      {/* Texto de resumo */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.8 }}
        className="relative"
      >
        <div className="absolute -inset-4 bg-gradient-to-br from-[#2f2546]/30 to-[#161221]/30 rounded-2xl backdrop-blur-sm -z-10" />
        
        <p className="text-lg text-[#a495c6] leading-relaxed px-6 py-6 font-light max-w-2xl mx-auto">
          {renderSummaryWithBold(summary)}
        </p>
      </motion.div>

      {/* Chamada para ação */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.7, delay: 1.0 }}
        className="mt-10"
      >
        <p className="text-sm text-[#a495c6] italic">
          "Continue explorando para descobrir as revelações que o cosmos preparou para você"
        </p>
      </motion.div>
    </motion.section>
  );
};