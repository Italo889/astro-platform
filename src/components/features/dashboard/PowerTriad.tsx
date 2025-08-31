import type { FC } from 'react';
import { motion } from 'framer-motion';
import type { MajorArcana, SunSignName } from '../../../domain/types';
import { ZodiacSign } from './ZodiacSign';
import { arcanaImageMap, signImageMap } from '../../../utils/image-map';

interface PowerTriadProps {
  sunSign: SunSignName;
  personalArcana: MajorArcana | null;
  personalityArcana: MajorArcana | null;
}

// Variantes premium com efeitos místicos
const cardVariants = {
  hidden: { opacity: 0, y: 30, scale: 0.95, filter: "blur(8px)" },
  visible: (i: number) => ({
    opacity: 1, 
    y: 0, 
    scale: 1, 
    filter: "blur(0px)",
    transition: { 
      delay: 0.3 + i * 0.2, 
      duration: 0.8, 
      ease: "easeOut" as const
    },
  }),
};

const Card: FC<{ 
  children: React.ReactNode; 
  index: number; 
  hoverColor: 'primary' | 'accent';
  title: string;
  subtitle?: string;
}> = ({ children, index, hoverColor, title, subtitle }) => (
  <motion.div 
    custom={index}
    variants={cardVariants}
    initial="hidden"
    animate="visible"
    className={`group relative bg-gradient-to-br from-[#2f2546]/60 via-[#2f2546]/50 to-[#2f2546]/40 
                rounded-2xl p-8 border border-[#8b63e9]/30 hover:border-[#8b63e9]/60 
                backdrop-blur-lg shadow-2xl hover:shadow-3xl 
                ${hoverColor === 'primary' ? 'hover:shadow-[#FFD700]/20' : 'hover:shadow-[#8b63e9]/20'} 
                transition-all duration-500 h-full flex flex-col overflow-hidden 
                hover:scale-[1.02] hover:bg-gradient-to-br hover:from-[#2f2546]/80 hover:via-[#2f2546]/70 hover:to-[#2f2546]/60`}
    whileHover={{ y: -5 }}
  >
    {/* Brilho místico de fundo */}
    <div className={`absolute inset-0 bg-gradient-to-br 
                    ${hoverColor === 'primary' 
                      ? 'from-[#FFD700]/5 via-transparent to-[#FFD700]/10' 
                      : 'from-[#8b63e9]/5 via-transparent to-[#8b63e9]/10'} 
                    opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl`} />
    
    {/* Partículas flutuantes */}
    <div className="absolute top-4 right-4 w-1 h-1 bg-[#FFD700]/40 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
    <div className="absolute bottom-6 left-6 w-0.5 h-0.5 bg-[#8b63e9]/30 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100" />
    
    <div className="relative z-10 flex flex-col h-full">
      {/* Header do Card */}
      <div className="mb-6">
        <h3 className="text-sm text-[#a495c6] mb-2 uppercase tracking-wider font-light" 
            style={{ fontFamily: 'Noto Sans, sans-serif' }}>
          {subtitle || 'Arcano'}
        </h3>
        <h2 className={`text-2xl font-bold text-white 
                       ${hoverColor === 'primary' 
                         ? 'group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-[#FFD700] group-hover:to-[#FFED4A] group-hover:bg-clip-text' 
                         : 'group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-[#8b63e9] group-hover:to-[#a78bfa] group-hover:bg-clip-text'} 
                       transition-all duration-500 leading-tight`}
            style={{ fontFamily: 'Marcellus SC, serif' }}>
          {title}
        </h2>
      </div>
      
      {children}
    </div>
  </motion.div>
);

export const PowerTriad: FC<PowerTriadProps> = ({ sunSign, personalArcana, personalityArcana }) => {
  const signImageUrl = sunSign ? signImageMap[sunSign] : '';

  // Estado de loading premium
  if (!personalArcana || !personalityArcana) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {[1, 2, 3].map((i) => (
          <motion.div 
            key={i} 
            className="bg-gradient-to-br from-[#2f2546]/40 via-[#2f2546]/30 to-[#2f2546]/20 rounded-2xl p-8 border border-[#8b63e9]/20 h-96 flex items-center justify-center backdrop-blur-sm"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: i * 0.1, duration: 0.6 }}
          >
            <div className="text-center">
              <div className="w-12 h-12 border-2 border-[#8b63e9]/40 border-t-[#8b63e9] rounded-full animate-spin mx-auto mb-4" />
              <div className="text-[#a495c6] text-sm font-light" style={{ fontFamily: 'Noto Sans, sans-serif' }}>
                Consultando os arcanos...
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
      
      {/* Card 1: Seu Sol - Design Premium com imagem de fundo */}
      <motion.div
        custom={0}
        variants={cardVariants}
        initial="hidden"
        animate="visible"
        className="group relative rounded-2xl border border-[#FFD700]/30 hover:border-[#FFD700]/60 
                   transition-all duration-500 overflow-hidden backdrop-blur-lg shadow-2xl 
                   hover:shadow-3xl hover:shadow-[#FFD700]/20 hover:scale-[1.02] 
                   bg-gradient-to-br from-[#2f2546]/60 via-[#2f2546]/50 to-[#2f2546]/40"
        style={{ 
          backgroundImage: `url(${signImageUrl})`, 
          backgroundSize: '70%', 
          backgroundRepeat: 'no-repeat', 
          backgroundPosition: 'center',
        }}
        whileHover={{ y: -5 }}
      >
        {/* Overlay místico */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#161221]/90 via-[#161221]/60 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-br from-[#FFD700]/5 via-transparent to-[#FFD700]/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        
        {/* Partículas douradas */}
        <div className="absolute top-6 right-6 w-1.5 h-1.5 bg-[#FFD700]/60 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        <div className="absolute bottom-8 left-8 w-1 h-1 bg-[#FFED4A]/40 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100" />
        <div className="absolute top-12 left-12 w-0.5 h-0.5 bg-[#FFD700]/30 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-400 delay-200" />
        
        <div className="relative z-10 flex flex-col justify-between h-full p-8">
          <div className="flex justify-between items-start">
            <div className="flex-1">
              <h3 className="text-sm text-[#a495c6] mb-3 uppercase tracking-wider font-light" 
                  style={{ fontFamily: 'Noto Sans, sans-serif' }}>
                ☀️ Sua Essência Solar
              </h3>
              <h2 className="text-4xl font-bold text-white group-hover:text-transparent 
                           group-hover:bg-gradient-to-r group-hover:from-[#FFD700] group-hover:to-[#FFED4A] 
                           group-hover:bg-clip-text transition-all duration-500 leading-tight mb-2"
                  style={{ fontFamily: 'Marcellus SC, serif' }}>
                {sunSign}
              </h2>
              
              {/* Linha decorativa */}
              <div className="w-0 h-0.5 bg-gradient-to-r from-[#FFD700] via-[#FFED4A] to-transparent 
                            group-hover:w-24 transition-all duration-700 rounded-full shadow-sm shadow-[#FFD700]/30" />
            </div>
            
            <motion.div
              className="p-3 bg-[#FFD700]/10 border border-[#FFD700]/30 rounded-xl backdrop-blur-sm
                         group-hover:bg-[#FFD700]/20 group-hover:border-[#FFD700]/50 transition-all duration-300"
              whileHover={{ rotate: 15, scale: 1.1 }}
            >
              <ZodiacSign 
                sign={sunSign} 
                className="w-12 h-12 text-[#FFD700] group-hover:text-[#FFED4A] transition-colors duration-300" 
              />
            </motion.div>
          </div>
          
          {/* Descrição da essência */}
          <div className="mt-6">
            <p className="text-[#F5F5F5]/80 text-sm leading-relaxed font-light" 
               style={{ fontFamily: 'Noto Sans, sans-serif' }}>
              Sua luz interior e força vital que ilumina o caminho
            </p>
          </div>
        </div>
      </motion.div>

      {/* Card 2: Arcano Pessoal - Sua Base Espiritual */}
      <Card 
        index={1} 
        hoverColor="accent"
        title={`${personalArcana.id}. ${personalArcana.name}`}
        subtitle="🎴 Arcano Pessoal"
      >
        <div className="flex-1 flex flex-col justify-center">
          {/* Imagem do arcano com efeitos */}
          <div className="relative mb-6">
            <div className="relative mx-auto w-32 h-56 rounded-xl overflow-hidden shadow-2xl 
                          group-hover:shadow-3xl group-hover:shadow-[#8b63e9]/30 transition-all duration-500
                          border-2 border-[#8b63e9]/30 group-hover:border-[#8b63e9]/60">
              
              {/* Brilho interno da carta */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#8b63e9]/20 via-transparent to-[#8b63e9]/10 
                            opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              
              <motion.img
                src={arcanaImageMap[personalArcana.id]}
                alt={personalArcana.name}
                className="w-full h-full object-cover transition-all duration-500 group-hover:scale-105"
                whileHover={{ scale: 1.02 }}
                loading="lazy"
              />
              
              {/* Partículas místicas na carta */}
              <div className="absolute top-2 right-2 w-1 h-1 bg-[#8b63e9]/60 rounded-full 
                            opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <div className="absolute bottom-3 left-2 w-0.5 h-0.5 bg-[#a78bfa]/40 rounded-full 
                            opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-150" />
            </div>
          </div>
          
          {/* Descrição mística */}
          <div className="text-center">
            <p className="text-[#F5F5F5]/80 text-sm leading-relaxed font-light mb-3" 
               style={{ fontFamily: 'Noto Sans, sans-serif' }}>
              Sua essência profunda e fundação espiritual
            </p>
            <div className="w-0 h-0.5 bg-gradient-to-r from-transparent via-[#8b63e9] to-transparent 
                          group-hover:w-full transition-all duration-700 rounded-full shadow-sm shadow-[#8b63e9]/30 mx-auto" />
          </div>
        </div>
      </Card>
      
      {/* Card 3: Arcano da Personalidade - Sua Expressão */}
      <Card 
        index={2} 
        hoverColor="accent"
        title={`${personalityArcana.id}. ${personalityArcana.name}`}
        subtitle="🌟 Arcano da Personalidade"
      >
        <div className="flex-1 flex flex-col justify-center">
          {/* Imagem do arcano com efeitos */}
          <div className="relative mb-6">
            <div className="relative mx-auto w-32 h-56 rounded-xl overflow-hidden shadow-2xl 
                          group-hover:shadow-3xl group-hover:shadow-[#8b63e9]/30 transition-all duration-500
                          border-2 border-[#8b63e9]/30 group-hover:border-[#8b63e9]/60">
              
              {/* Brilho interno da carta */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#8b63e9]/20 via-transparent to-[#8b63e9]/10 
                            opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              
              <motion.img
                src={arcanaImageMap[personalityArcana.id]}
                alt={personalityArcana.name}
                className="w-full h-full object-cover transition-all duration-500 group-hover:scale-105"
                whileHover={{ scale: 1.02 }}
                loading="lazy"
              />
              
              {/* Partículas místicas na carta */}
              <div className="absolute top-2 right-2 w-1 h-1 bg-[#8b63e9]/60 rounded-full 
                            opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <div className="absolute bottom-3 left-2 w-0.5 h-0.5 bg-[#a78bfa]/40 rounded-full 
                            opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-150" />
            </div>
          </div>
          
          {/* Descrição mística */}
          <div className="text-center">
            <p className="text-[#F5F5F5]/80 text-sm leading-relaxed font-light mb-3" 
               style={{ fontFamily: 'Noto Sans, sans-serif' }}>
              Como você se manifesta no mundo exterior
            </p>
            <div className="w-0 h-0.5 bg-gradient-to-r from-transparent via-[#8b63e9] to-transparent 
                          group-hover:w-full transition-all duration-700 rounded-full shadow-sm shadow-[#8b63e9]/30 mx-auto" />
          </div>
        </div>
      </Card>
    </div>
  );
};