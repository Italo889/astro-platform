// src/pages/SynastryReportPage.tsx

import type { FC } from 'react';
import { useSynastryStore } from '../store/synastryStore';
import { Link } from 'react-router-dom';
import { BackgroundEffects } from '../components/layout/BackgroundEffects';
import { FileQuestion, Heart, Users, Sparkles, TrendingUp } from 'lucide-react';
import { Button } from '../components/ui/Button';
import type { CompatibilityAspect } from '../../backend/src/domain/types';
import { motion } from 'framer-motion';

// Componente melhorado para cada aspecto da compatibilidade
const AspectCard: FC<{ 
  aspect: CompatibilityAspect; 
  icon: React.ElementType; 
  index: number;
  gradient: string;
}> = ({ aspect, icon: Icon, index, gradient }) => (
  <motion.div 
    className="group relative bg-[#1a1625]/90 backdrop-blur-xl border border-[#8b63e9]/20 hover:border-[#8b63e9]/50 rounded-3xl p-8 overflow-hidden"
    initial={{ opacity: 0, y: 30 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.6, delay: index * 0.2 }}
    whileHover={{ y: -4, scale: 1.02 }}
  >
    {/* Gradient de fundo */}
    <div className={`absolute inset-0 opacity-0 group-hover:opacity-20 transition-opacity duration-500 ${gradient}`} />
    
    {/* Container do conteúdo */}
    <div className="relative z-10">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-4">
          <motion.div 
            className="p-3 rounded-2xl bg-[#8b63e9]/10 border border-[#8b63e9]/20 group-hover:bg-[#8b63e9]/20 transition-colors duration-300"
            whileHover={{ scale: 1.05, rotate: 5 }}
          >
            <Icon size={28} className="text-[#8b63e9] group-hover:text-white transition-colors duration-300" />
          </motion.div>
          <h3 className="font-serif text-2xl md:text-3xl text-white group-hover:text-[#FFD700] transition-colors duration-300">
            {aspect.title}
          </h3>
        </div>
        
        {/* Score visual */}
        <motion.div 
          className="text-right"
          whileHover={{ scale: 1.05 }}
        >
          <div className="text-2xl font-bold text-[#FFD700] mb-1">
            {aspect.harmonyScore}%
          </div>
          <div className="text-sm text-white/60">Harmonia</div>
        </motion.div>
      </div>
      
      {/* Barra de progresso */}
      <div className="w-full h-2 bg-[#2f2546]/50 rounded-full mb-6 overflow-hidden">
        <motion.div
          className="h-full bg-gradient-to-r from-[#8b63e9] via-[#FFD700] to-[#8b63e9] rounded-full"
          initial={{ width: 0 }}
          animate={{ width: `${aspect.harmonyScore}%` }}
          transition={{ duration: 1, delay: index * 0.3 }}
        />
      </div>
      
      {/* Conteúdo */}
      <div className="space-y-4">
        <blockquote className="text-lg text-[#FFD700]/90 italic font-light leading-relaxed border-l-2 border-[#8b63e9]/30 pl-4">
          "{aspect.summary}"
        </blockquote>
        <p className="text-white/80 leading-relaxed">
          {aspect.details}
        </p>
      </div>
    </div>
  </motion.div>
);

const SynastryReportPage: FC = () => {
  const report = useSynastryStore((state) => state.report);

  if (!report) {
    return (
      <div className="relative flex min-h-screen flex-col bg-background overflow-hidden text-white">
        <BackgroundEffects />
        <main className="flex-1 flex flex-col items-center justify-center text-center px-4">
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.6 }}
            className="space-y-6"
          >
            <div className="w-20 h-20 mx-auto bg-[#8b63e9]/10 border border-[#8b63e9]/20 rounded-2xl flex items-center justify-center">
              <FileQuestion size={32} className="text-[#8b63e9]" />
            </div>
            <h1 className="font-serif text-4xl text-white">Ops! Nenhuma análise encontrada.</h1>
            <p className="text-white/70 max-w-md leading-relaxed">
              Para explorar a conexão entre duas almas, por favor, realize primeiro uma análise de sinastria.
            </p>
            <Link to="/sinastria">
              <Button variant="primary" className="px-8 py-4 text-lg font-medium">
                Iniciar Análise de Sinastria
              </Button>
            </Link>
          </motion.div>
        </main>
      </div>
    );
  }

  const aspects = [
    { 
      aspect: report.sunSignAspect, 
      icon: Sparkles, 
      gradient: "bg-gradient-to-br from-[#FFD700]/20 to-[#8b63e9]/20" 
    },
    { 
      aspect: report.archetypeAspect, 
      icon: TrendingUp, 
      gradient: "bg-gradient-to-br from-[#8b63e9]/20 to-[#FFD700]/20" 
    }
  ];

  return (
    <div className="relative flex min-h-screen flex-col bg-background overflow-hidden text-white">
      <BackgroundEffects />
      
      {/* Navigation Header */}
      <motion.header 
        className="fixed top-0 left-0 right-0 z-50 px-4 md:px-6 py-4 bg-black/20 backdrop-blur-xl border-b border-white/5"
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <Link to="/sinastria" className="group flex items-center gap-2 text-white/70 hover:text-white transition-colors duration-300">
            <svg className="w-5 h-5 group-hover:-translate-x-1 transition-transform duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            <span className="text-sm font-medium">Nova Sinastria</span>
          </Link>
          
          <div className="flex items-center gap-2 text-xs text-white/50">
            <Users className="w-4 h-4" />
            <span>Análise de Conexão</span>
          </div>
        </div>
      </motion.header>
      
      <main className="flex-1 px-4 md:px-6 pt-20 pb-16">
        <div className="max-w-6xl w-full mx-auto">
          
          {/* Hero Section */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <div className="mb-8">
              <div className="flex items-center justify-center gap-4 mb-6">
                <Heart className="text-[#FFD700] w-8 h-8" />
                <h1 className="font-serif text-4xl md:text-6xl text-white">
                  A Conexão entre
                </h1>
                <Heart className="text-[#FFD700] w-8 h-8" />
              </div>
              
              <div className="flex items-center justify-center gap-4 flex-wrap">
                <span className="text-2xl md:text-4xl font-light text-transparent bg-gradient-to-r from-[#FFD700] to-[#8b63e9] bg-clip-text">
                  {report.person1Name}
                </span>
                <div className="text-white/30 text-2xl">&</div>
                <span className="text-2xl md:text-4xl font-light text-transparent bg-gradient-to-r from-[#8b63e9] to-[#FFD700] bg-clip-text">
                  {report.person2Name}
                </span>
              </div>
            </div>
            
            {/* Score geral destacado */}
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="inline-flex items-center gap-4 px-8 py-4 bg-[#1a1625]/80 backdrop-blur-xl border border-[#8b63e9]/30 rounded-2xl"
            >
              <div className="text-center">
                <div className="text-4xl font-bold text-[#FFD700] mb-1">
                  {report.overallHarmony}%
                </div>
                <div className="text-white/70 text-sm font-medium">Harmonia Geral</div>
              </div>
            </motion.div>
            
            <div className="h-px bg-gradient-to-r from-transparent via-white/20 to-transparent mt-12" />
          </motion.div>

          {/* Análise detalhada */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {aspects.map((item, index) => (
              <AspectCard 
                key={index}
                aspect={item.aspect} 
                icon={item.icon} 
                index={index}
                gradient={item.gradient}
              />
            ))}
          </div>
        </div>
      </main>
    </div>
  );
};

export default SynastryReportPage;