import type { FC } from 'react';
import { motion } from 'framer-motion';
import type { NumerologyNumbers } from '../../../domain/types';

const numerologyDataMap = {
  personalNumber: { title: "Número Pessoal", description: "A base da sua jornada, derivada da sua data de nascimento." },
  personalityNumber: { title: "Número da Personalidade", description: "Seu grande desafio e a forma como você se transforma ao longo da vida." },
  soulNumber: { title: "Número da Alma", description: "A lição central e a verdadeira essência que busca expressão." },
  annualNumber: { title: "Número do Ano", description: `A energia que rege seu desenvolvimento durante ${new Date().getFullYear()}.` },
  destinyNumber: { title: "Número de Destino", description: "Seus talentos e a energia do seu nome (método Pitagórico)." },
  cabalisticNameNumber: { title: "Arcano Cabalístico", description: "A vibração do seu nome segundo a numerologia moderna, revelando seus talentos sociais." },
  gematriaNameNumber: { title: "Arcano de Gematria", description: "A essência profunda do seu nome, conectada à antiga sabedoria e sua missão espiritual." },
};

const NumberCard: FC<{ title: string; number: number; description: string }> = ({ title, number, description }) => {
  return (
    <motion.div 
      className="relative bg-gradient-to-br from-[#2f2546]/80 to-[#161221]/60 backdrop-blur-sm 
                 border border-[#8b63e9]/20 rounded-3xl p-8 flex flex-col items-center text-center
                 shadow-lg shadow-black/20 overflow-hidden group"
      whileHover={{ 
        y: -6, 
        boxShadow: '0 20px 40px rgba(139, 99, 233, 0.15)',
        borderColor: 'rgba(139, 99, 233, 0.4)'
      }}
      transition={{ type: 'spring', stiffness: 300, damping: 20 }}
    >
      {/* Elemento decorativo sutil */}
      <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-12 h-px bg-gradient-to-r from-transparent via-[#8b63e9]/40 to-transparent" />
      
      {/* Círculo com o número */}
      <div className="relative mb-6">
        {/* Brilho de fundo */}
        <div className="absolute inset-0 bg-[#8b63e9]/20 blur-xl rounded-full scale-110" />
        
        {/* Círculo principal */}
        <div className="relative w-24 h-24 rounded-full flex items-center justify-center 
                        bg-gradient-to-br from-[#2f2546] to-[#161221] 
                        border-2 border-[#8b63e9]/30 shadow-lg
                        group-hover:border-[#FFD700]/50 transition-all duration-300">
          <span className="font-serif text-4xl text-[#FFD700] group-hover:scale-110 transition-transform duration-300">
            {number}
          </span>
        </div>
        
        {/* Anel decorativo externo */}
        <div className="absolute inset-0 rounded-full border border-[#8b63e9]/10 scale-125" />
      </div>
      
      {/* Título */}
      <h4 className="font-serif text-xl lg:text-2xl text-[#F5F5F5] mb-3 leading-tight">
        {title}
      </h4>
      
      {/* Linha divisória elegante */}
      <div className="w-12 h-px bg-gradient-to-r from-transparent via-[#8b63e9]/60 to-transparent mb-4" />
      
      {/* Descrição */}
      <p className="text-[#a495c6] text-sm leading-relaxed max-w-xs font-light tracking-wide
                    group-hover:text-[#F5F5F5]/90 transition-colors duration-300">
        {description}
      </p>
      
      {/* Efeito de brilho sutil no hover */}
      <div className="absolute inset-0 bg-gradient-to-r from-[#8b63e9]/0 via-[#8b63e9]/5 to-[#8b63e9]/0 
                      opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-3xl pointer-events-none" />
    </motion.div>
  );
};

interface NumerologySectionProps {
  numerologyData: NumerologyNumbers;
}

export const NumerologySection: FC<NumerologySectionProps> = ({ numerologyData: result }) => {
  const numbersToShow = Object.entries(result)
    .filter(([key, value]) => value !== undefined && numerologyDataMap[key as keyof typeof numerologyDataMap])
    .map(([key, value]) => ({
      ...numerologyDataMap[key as keyof typeof numerologyDataMap],
      number: value as number,
    }));

  return (
    <motion.section
      className="relative"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
    >
      {/* Título da seção com hierarquia premium */}
      <motion.div 
        className="text-center mb-16"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.6 }}
      >
        <h2 className="font-serif text-4xl lg:text-5xl text-[#F5F5F5] mb-4 tracking-wide">
          Os <span className="text-[#FFD700]">Números</span> da Sua Alma
        </h2>
        
        {/* Ornamento decorativo */}
        <div className="flex items-center justify-center gap-4 mb-2">
          <div className="w-8 h-px bg-gradient-to-r from-transparent to-[#8b63e9]/60" />
          <div className="w-2 h-2 bg-[#8b63e9]/60 rounded-full" />
          <div className="w-12 h-px bg-gradient-to-r from-[#8b63e9]/60 to-[#FFD700]/40" />
          <div className="w-2 h-2 bg-[#FFD700]/40 rounded-full" />
          <div className="w-8 h-px bg-gradient-to-l from-transparent to-[#8b63e9]/60" />
        </div>
        
        <p className="text-[#a495c6] text-lg font-light tracking-wide max-w-2xl mx-auto leading-relaxed">
          Desvende as vibrações numéricas que guiam seu caminho espiritual
        </p>
      </motion.div>

      {/* Grid de números com animação escalonada */}
      <motion.div 
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-10"
        variants={{
          show: {
            transition: {
              staggerChildren: 0.1
            }
          }
        }}
        initial="hidden"
        animate="show"
      >
        {numbersToShow.map((item, index) => (
          <motion.div
            key={item.title}
            variants={{
              hidden: { opacity: 0, y: 30 },
              show: { opacity: 1, y: 0 }
            }}
            transition={{ 
              duration: 0.6, 
              delay: index * 0.1,
              ease: "easeOut" 
            }}
          >
            <NumberCard
              title={item.title}
              number={item.number}
              description={item.description}
            />
          </motion.div>
        ))}
      </motion.div>
    </motion.section>
  );
};