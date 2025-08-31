import React, { type FC, type ReactNode, type ReactElement } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import type { AstrologyResult } from '../../../domain/types';
import { Sun, Moon, Sunrise, BrainCircuit, Heart, Swords, Milestone, Sparkles, Star, Info, Zap, Dna } from 'lucide-react';
import { useState } from 'react';

// --- TIPOS E DADOS ---
interface AstrologySectionProps {
  astrologyData: AstrologyResult;
}

const planetDescriptions: Record<string, string> = {
    Sol: "Seu Sol revela a essência do seu ser, sua identidade central e o propósito que ilumina sua jornada através dos mistérios da existência.",
    Lua: "Sua Lua governa seu mundo interior, suas emoções e seus instintos mais profundos. É o reflexo sagrado da sua alma que guia sua intuição.",
    Ascendente: "Seu Ascendente é a máscara cósmica que você apresenta ao mundo, a primeira impressão energética e a lente através da qual percebe a realidade.",
    Mercúrio: "Mercúrio rege sua mente ágil, comunicação e lógica celestial. Revela como você processa conhecimento e troca energias mentais com o universo.",
    Vênus: "Vênus representa o amor transcendente, a beleza divina e seus valores mais preciosos. Governa suas atrações magnéticas e relacionamentos harmonicos.",
    Marte: "Sua energia vital e força de ação cósmica. Marte mostra como você conquista seus objetivos e manifesta sua vontade no plano terrestre.",
    Júpiter: "O grande benéfico da expansão, fortuna e sabedoria ancestral. Aponta para áreas de crescimento espiritual e abundância material.",
    Saturno: "O mestre kármico da estrutura e disciplina. Revela onde o esforço dedicado e a paciência levam à verdadeira maestria e evolução."
};

// --- COMPONENTES REFINADOS SEGUINDO O GUIA DE ESTILO ---

// Tooltip Premium com as cores do sistema Arcano
const Tooltip: FC<{ content: string; children: ReactNode }> = ({ content, children }) => {
  const [isVisible, setIsVisible] = useState(false);
  return (
    <div className="relative flex items-center">
      <div onMouseEnter={() => setIsVisible(true)} onMouseLeave={() => setIsVisible(false)} className="cursor-help">
        {children}
      </div>
      <AnimatePresence>
        {isVisible && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.95 }}
            transition={{ duration: 0.2, ease: 'easeOut' }}
            className="absolute bottom-full left-1/2 z-50 mb-3 w-max max-w-sm -translate-x-1/2 transform rounded-xl border border-[#8b63e9]/30 bg-[#2f2546]/95 px-4 py-3 text-center text-sm text-[#F5F5F5] shadow-2xl backdrop-blur-lg"
            style={{
              background: 'linear-gradient(135deg, #2f2546 0%, rgba(47, 37, 70, 0.95) 100%)',
              boxShadow: '0 20px 25px -5px rgba(139, 99, 233, 0.1), 0 10px 10px -5px rgba(139, 99, 233, 0.04)'
            }}
          >
            <div className="absolute -bottom-1 left-1/2 h-2 w-2 -translate-x-1/2 rotate-45 border-r border-b border-[#8b63e9]/30 bg-[#2f2546]"></div>
            {content}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

// HousePill refinado com as cores do sistema
const HousePill: FC<{ house?: number }> = ({ house }) => {
    if (!house) return null;
    return (
        <div className="mt-2 inline-flex items-center rounded-full border border-[#8b63e9]/20 bg-gradient-to-r from-[#8b63e9]/10 to-[#8b63e9]/5 px-3 py-1">
            <span className="text-xs font-medium text-[#8b63e9] tracking-wide">CASA {house}</span>
        </div>
    )
};

// Artefato da Tríade seguindo o conceito "Arcano que se Revela"
const BigThreeArtefact: FC<{
  icon: ReactElement<{ size?: number }>;
  planetName: string;
  sign: string;
  house?: number;
  description: string;
}> = ({ icon, planetName, sign, house, description }) => {
  const [isRevealed, setIsRevealed] = useState(false);

  return (
    <motion.div
      variants={{ hidden: { opacity: 0, y: 40 }, show: { opacity: 1, y: 0 } }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      className="group relative h-full cursor-pointer"
      onClick={() => setIsRevealed(!isRevealed)}
      onMouseEnter={() => setIsRevealed(true)}
      onMouseLeave={() => setIsRevealed(false)}
    >
      {/* Moldura com gradiente sutil seguindo o padrão Arcano */}
      <div className="absolute -inset-0.5 rounded-2xl bg-gradient-to-br from-[#FFD700]/20 via-transparent to-[#8b63e9]/20 opacity-0 transition-all duration-700 group-hover:opacity-100"></div>
      
      <div 
        className="relative h-full overflow-hidden rounded-xl border border-[#8b63e9]/10 p-8 shadow-lg transition-all duration-500 group-hover:border-[#8b63e9]/30"
        style={{
          background: 'linear-gradient(135deg, #2f2546 0%, rgba(47, 37, 70, 0.6) 100%)',
          boxShadow: '0 10px 25px -5px rgba(22, 18, 33, 0.5)'
        }}
      >
        {/* Efeito de fundo cósmico sutil */}
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-4 right-4 h-32 w-32 rounded-full bg-gradient-to-br from-[#FFD700]/30 to-transparent blur-3xl"></div>
          <div className="absolute bottom-4 left-4 h-24 w-24 rounded-full bg-gradient-to-tr from-[#8b63e9]/30 to-transparent blur-2xl"></div>
        </div>

        {/* Ornamentos nos cantos estilo Arcano */}
        <div className="absolute top-3 left-3 h-6 w-6 border-l-2 border-t-2 border-[#FFD700]/30 transition-all duration-300 group-hover:h-8 group-hover:w-8 group-hover:border-[#FFD700]/60"></div>
        <div className="absolute bottom-3 right-3 h-6 w-6 border-r-2 border-b-2 border-[#FFD700]/30 transition-all duration-300 group-hover:h-8 group-hover:w-8 group-hover:border-[#FFD700]/60"></div>

        <div className="relative z-10 flex h-full flex-col items-center text-center">
          {/* Ícone com animação mágica */}
          <motion.div 
            className="mb-6 text-[#FFD700] transition-all duration-300 group-hover:scale-110"
            whileHover={{ rotate: 5 }}
          >
            {React.cloneElement(icon, { size: 48 })}
          </motion.div>

          {/* Nome do Planeta com fonte Marcellus SC */}
          <h3 className="font-serif mb-2 text-sm uppercase tracking-[0.2em] text-[#a495c6]">
            {planetName}
          </h3>

          {/* Signo com fonte Marcellus SC */}
          <h2 className="font-serif mb-4 text-3xl text-[#F5F5F5] transition-colors group-hover:text-[#FFD700]">
            {sign || 'N/A'}
          </h2>

          <HousePill house={house} />

          {/* Descrição que se revela */}
          <AnimatePresence mode="wait">
            {isRevealed && (
              <motion.p 
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.3 }}
                className="mt-6 text-sm leading-relaxed text-[#a495c6]"
              >
                {description.split('.')[0]}.
              </motion.p>
            )}
          </AnimatePresence>
        </div>
      </div>
    </motion.div>
  );
};

// Artefato dos Planetas Menores refinado
const MinorPlanetArtefact: FC<{
  icon: ReactElement<{ size?: number }>;
  planetName: string;
  sign: string;
  house?: number;
  description: string;
}> = ({ icon, planetName, sign, house, description }) => (
  <motion.div
    variants={{ hidden: { opacity: 0, y: 20 }, show: { opacity: 1, y: 0 } }}
    transition={{ duration: 0.5, ease: 'easeOut' }}
    className="group relative"
  >
    <div className="absolute -inset-0.5 rounded-xl bg-gradient-to-r from-[#8b63e9]/10 to-[#FFD700]/10 opacity-0 transition-opacity duration-300 group-hover:opacity-100"></div>
    
    <div 
      className="relative flex items-center gap-5 rounded-lg border border-[#8b63e9]/10 p-5 transition-all duration-300 group-hover:border-[#8b63e9]/20"
      style={{
        background: 'linear-gradient(90deg, rgba(47, 37, 70, 0.4) 0%, rgba(47, 37, 70, 0.2) 100%)'
      }}
    >
      {/* Ícone */}
      <div className="text-[#8b63e9] transition-all duration-300 group-hover:scale-110 group-hover:text-[#FFD700]">
        {React.cloneElement(icon, { size: 32 })}
      </div>

      {/* Conteúdo */}
      <div className="flex-1 min-w-0">
        <div className="flex items-center justify-between mb-1">
          <h4 className="font-serif text-sm uppercase tracking-wide text-[#a495c6]">
            {planetName}
          </h4>
          <Tooltip content={description}>
            <Info size={16} className="text-[#a495c6]/70 hover:text-[#8b63e9] transition-colors" />
          </Tooltip>
        </div>
        
        <div className="flex items-center gap-3">
          <h3 className="font-serif text-xl text-[#F5F5F5] transition-colors group-hover:text-[#FFD700]">
            {sign || 'N/A'}
          </h3>
          {house && (
            <span className="rounded-full border border-[#8b63e9]/20 bg-[#8b63e9]/5 px-2 py-1 text-xs text-[#8b63e9]">
              Casa {house}
            </span>
          )}
        </div>
      </div>
    </div>
  </motion.div>
);

// --- COMPONENTE PRINCIPAL SEGUINDO A FILOSOFIA "ORÁCULO DIGITAL VIVO" ---

export const AstrologySection: FC<AstrologySectionProps> = ({ astrologyData }) => {
  const { sun, moon, ascendant, mercury, venus, mars, jupiter, saturn, chineseZodiac } = astrologyData;

  const containerVariants = {
    hidden: { opacity: 0 },
    show: { opacity: 1, transition: { staggerChildren: 0.1, delayChildren: 0.2 } },
  };

  return (
    <motion.section
      variants={containerVariants}
      initial="hidden"
      animate="show"
      className="relative mx-auto max-w-5xl px-4"
    >
      {/* Fundo Cósmico seguindo o padrão Arcano */}
      <div 
        className="absolute inset-0 -z-10 opacity-30" 
        style={{
          background: `
            radial-gradient(ellipse at 20% 20%, #8b63e9 0px, transparent 50%),
            radial-gradient(ellipse at 80% 80%, #FFD700 0px, transparent 50%)
          `,
          maskImage: 'radial-gradient(ellipse at center, white 20%, transparent 80%)'
        }}
      />

      {/* Cabeçalho com divisores ornamentais */}
      <div className="text-center mb-20">
        <div className="flex items-center justify-center gap-4 mb-6">
          <div className="h-px w-16 bg-gradient-to-r from-transparent to-[#FFD700]/50"></div>
          <Star className="text-[#FFD700]" size={24} />
          <div className="h-px w-16 bg-gradient-to-l from-transparent to-[#FFD700]/50"></div>
        </div>
        
        <motion.h2
          variants={{ hidden: { opacity: 0, y: -30 }, show: { opacity: 1, y: 0 } }}
          className="font-serif text-4xl md:text-5xl text-[#FFD700] mb-4 tracking-wide"
        >
          A <span className="text-[#F5F5F5]">Geometria</span> da Sua <span className="text-[#8b63e9]">Alma</span>
        </motion.h2>

        <motion.p
          variants={{ hidden: { opacity: 0 }, show: { opacity: 1 } }}
          className="text-lg text-[#a495c6] max-w-2xl mx-auto leading-relaxed"
        >
          Decodifique os arquétipos celestes que tecem o tecido do seu destino cósmico
        </motion.p>
      </div>
      
      {/* A Tríade da Identidade */}
      <div className="mb-24">
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-3 mb-4">
            <Dna size={24} className="text-[#8b63e9]"/>
            <motion.h3
                variants={{ hidden: { opacity: 0 }, show: { opacity: 1 } }}
                className="font-serif text-2xl text-[#F5F5F5] tracking-wide">
                Pilares da Sua <span className="text-[#FFD700]">Essência</span>
            </motion.h3>
          </div>
          <div className="h-px w-24 bg-gradient-to-r from-transparent via-[#FFD700]/50 to-transparent mx-auto"></div>
        </div>
        
        <motion.div variants={containerVariants} className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <BigThreeArtefact icon={<Sun />} planetName="Sol" sign={sun.sign} house={sun.house} description={planetDescriptions.Sol} />
          <BigThreeArtefact icon={<Moon />} planetName="Lua" sign={moon.sign} house={moon.house} description={planetDescriptions.Lua} />
          <BigThreeArtefact icon={<Sunrise />} planetName="Ascendente" sign={ascendant.sign} description={planetDescriptions.Ascendente} />
        </motion.div>
      </div>
      
      {/* A Orquestra Cósmica */}
      <div>
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-3 mb-4">
            <Star size={24} className="text-[#8b63e9]"/>
            <motion.h3
                variants={{ hidden: { opacity: 0 }, show: { opacity: 1 } }}
                className="font-serif text-2xl text-[#F5F5F5] tracking-wide">
                Sua <span className="text-[#FFD700]">Orquestra</span> Cósmica
            </motion.h3>
          </div>
          <div className="h-px w-24 bg-gradient-to-r from-transparent via-[#FFD700]/50 to-transparent mx-auto"></div>
        </div>
        
        <motion.div variants={containerVariants} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <MinorPlanetArtefact icon={<BrainCircuit />} planetName="Mercúrio" sign={mercury.sign} house={mercury.house} description={planetDescriptions.Mercúrio} />
          <MinorPlanetArtefact icon={<Heart />} planetName="Vênus" sign={venus.sign} house={venus.house} description={planetDescriptions.Vênus} />
          <MinorPlanetArtefact icon={<Swords />} planetName="Marte" sign={mars.sign} house={mars.house} description={planetDescriptions.Marte} />
          <MinorPlanetArtefact icon={<Milestone />} planetName="Júpiter" sign={jupiter.sign} house={jupiter.house} description={planetDescriptions.Júpiter} />
          <MinorPlanetArtefact icon={<Sparkles />} planetName="Saturno" sign={saturn.sign} house={saturn.house} description={planetDescriptions.Saturno} />
          
          {/* Zodíaco Chinês especial */}
          <motion.div
            variants={{ hidden: { opacity: 0, y: 20 }, show: { opacity: 1, y: 0 } }}
            transition={{ duration: 0.5, ease: 'easeOut' }}
            className="group relative sm:col-span-2 lg:col-span-1"
          >
            <div className="absolute -inset-0.5 rounded-xl bg-gradient-to-r from-[#FFD700]/10 to-[#8b63e9]/10 opacity-0 transition-opacity duration-300 group-hover:opacity-100"></div>
            
            <div 
              className="relative flex items-center gap-5 rounded-lg border border-[#8b63e9]/10 p-5 transition-all duration-300 group-hover:border-[#FFD700]/20"
              style={{
                background: 'linear-gradient(90deg, rgba(255, 215, 0, 0.05) 0%, rgba(47, 37, 70, 0.2) 100%)'
              }}
            >
              <div className="text-[#FFD700] transition-all duration-300 group-hover:scale-110">
                <Zap size={32} />
              </div>
              <div>
                <h4 className="font-serif text-sm uppercase tracking-wide text-[#a495c6] mb-1">
                  Horóscopo Oriental
                </h4>
                <h3 className="font-serif text-xl text-[#F5F5F5] transition-colors group-hover:text-[#FFD700]">
                  {chineseZodiac}
                </h3>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>

      {/* Rodapé ornamental */}
      <div className="flex items-center justify-center gap-4 mt-20">
        <div className="h-px w-24 bg-gradient-to-r from-transparent to-[#FFD700]/30"></div>
        <div className="flex gap-2">
          <div className="h-1 w-1 rounded-full bg-[#FFD700]/50"></div>
          <div className="h-1 w-1 rounded-full bg-[#8b63e9]/30"></div>
          <div className="h-1 w-1 rounded-full bg-[#FFD700]/50"></div>
        </div>
        <div className="h-px w-24 bg-gradient-to-l from-transparent to-[#FFD700]/30"></div>
      </div>
    </motion.section>
  );
};