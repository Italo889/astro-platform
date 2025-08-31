// src/components/sections/Hero.tsx

import { useState, useEffect } from 'react';
import type { FC } from 'react';
import { motion, cubicBezier } from 'framer-motion';
import { Sparkles, ArrowRight } from 'lucide-react';
import { Button } from '../ui/Button';

const textContainerVariants = {
  hidden: { opacity: 0 },
  visible: { 
    opacity: 1, 
    transition: { 
      staggerChildren: 0.02, 
      delayChildren: 0.6 
    } 
  },
};

const textChildVariants = {
  hidden: { opacity: 0, y: 20, scale: 0.95 },
  visible: { 
    opacity: 1, 
    y: 0, 
    scale: 1,
    transition: { duration: 0.5, ease: cubicBezier(0.25, 0.46, 0.45, 0.94) }
  },
};

export const Hero: FC = () => {
  const [welcomeMessage, setWelcomeMessage] = useState("A jornada começa por dentro");

  useEffect(() => {
    if (localStorage.getItem('arcan_visited') === 'true') {
      setWelcomeMessage("Bem-vindo(a) de volta ao seu universo.");
    } else {
      localStorage.setItem('arcan_visited', 'true');
    }
  }, []);

  const handleScrollToForm = () => {
    document.getElementById('formulario')?.scrollIntoView({ behavior: 'smooth' });
  };

  const titleText = "Decifre o seu ";
  const gradientText = "universo interior";

  return (
    <motion.div
      initial={{ opacity: 0, y: 60 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1.2, ease: [0.25, 0.46, 0.45, 0.94] }}
      className="relative text-center max-w-5xl mx-auto mt-20 md:mt-32 px-6 md:px-8"
    >
      {/* Elemento decorativo superior */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.3, duration: 0.8 }}
        className="flex items-center justify-center mb-8"
      >
        <div className="w-16 h-[1px] bg-gradient-to-r from-transparent to-[#d4af37]/40" />
        <div className="mx-4 w-2 h-2 bg-[#d4af37]/60 rounded-full" />
        <div className="w-16 h-[1px] bg-gradient-to-l from-transparent to-[#d4af37]/40" />
      </motion.div>

      {/* Mensagem de boas-vindas com badge elegante */}
      <motion.div
        key={welcomeMessage}
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4, duration: 0.8 }}
        className="inline-flex items-center mb-8"
      >
        <div className="px-4 py-2 bg-gradient-to-r from-[#d4af37]/10 to-[#d4af37]/5 
                        border border-[#d4af37]/20 rounded-full backdrop-blur-sm">
          <span className="text-xs font-medium tracking-[0.15em] text-[#d4af37] uppercase">
            {welcomeMessage}
          </span>
        </div>
      </motion.div>
      
      {/* Título principal com tipografia serifada premium */}
      <motion.div className="mb-8">
        <motion.h1
          variants={textContainerVariants}
          initial="hidden"
          animate="visible"
          className="font-serif text-5xl sm:text-6xl md:text-7xl lg:text-8xl 
                     font-light tracking-[-0.02em] leading-[0.9] mb-4"
        >
          {/* Primeira linha em off-white */}
          <div className="text-[#f8f6f0] mb-2">
            {titleText.split("").map((char, index) => (
              <motion.span key={index} variants={textChildVariants}>
                {char}
              </motion.span>
            ))}
          </div>
          
          {/* Segunda linha com gradiente dourado */}
          <div className="bg-gradient-to-r from-[#d4af37] via-[#f4e06d] to-[#d4af37] 
                          bg-clip-text text-transparent">
            {gradientText.split("").map((char, index) => (
              <motion.span 
                key={index} 
                variants={textChildVariants}
                className="inline-block"
              >
                {char === " " ? "\u00A0" : char}
              </motion.span>
            ))}
          </div>
        </motion.h1>
      </motion.div>

      {/* Ornamento central */}
      <motion.div
        initial={{ opacity: 0, width: 0 }}
        animate={{ opacity: 1, width: "auto" }}
        transition={{ delay: 1.2, duration: 0.8 }}
        className="flex items-center justify-center mb-10"
      >
        <div className="w-8 h-[1px] bg-gradient-to-r from-transparent to-[#d4af37]/30" />
        <div className="mx-3 w-1.5 h-1.5 bg-[#d4af37]/50 rounded-full" />
        <div className="w-4 h-4 border border-[#d4af37]/25 rounded-full flex items-center justify-center">
          <div className="w-1.5 h-1.5 bg-[#d4af37]/60 rounded-full" />
        </div>
        <div className="mx-3 w-1.5 h-1.5 bg-[#d4af37]/50 rounded-full" />
        <div className="w-8 h-[1px] bg-gradient-to-l from-transparent to-[#d4af37]/30" />
      </motion.div>
      
      {/* Subtítulo com tipografia sans-serif clean */}
      <motion.p
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.4, duration: 0.8 }}
        className="text-lg md:text-xl text-[#b8a082] leading-relaxed max-w-3xl mx-auto 
                   font-light tracking-[0.01em] mb-12"
      >
        Traduza a linguagem dos{' '}
        <span className="text-[#d4af37]/90 font-medium">astros e arquétipos</span>{' '}
        em clareza para o seu dia a dia. Seu guia pessoal para uma vida com mais{' '}
        <span className="text-[#f8f6f0] font-medium">propósito e direção</span>.
      </motion.p>

      {/* Call-to-action com design premium */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.6, duration: 0.8 }}
        className="flex justify-center"
      >
        <motion.div
          whileHover={{ 
            scale: 1.05,
            transition: { duration: 0.2 }
          }}
          whileTap={{ scale: 0.95 }}
          className="relative group"
        >
          <Button
            variant="primary"
            onClick={handleScrollToForm}
            className="relative px-8 py-4 md:px-10 md:py-5 text-base md:text-lg
                       bg-gradient-to-r from-[#d4af37] to-[#b8941f] 
                       hover:from-[#f4e06d] hover:to-[#d4af37]
                       text-[#1a0f2e] font-semibold tracking-wide
                       border-0 rounded-2xl shadow-lg shadow-[#d4af37]/20
                       hover:shadow-xl hover:shadow-[#d4af37]/30
                       transition-all duration-300 overflow-hidden"
          >
            {/* Efeito de brilho interno */}
            <div className="absolute inset-0 bg-gradient-to-r from-white/10 via-transparent to-white/10 
                            opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            
            <div className="relative flex items-center gap-3">
              <Sparkles size={20} className="drop-shadow-sm" />
              <span className="drop-shadow-sm">Desvendar meu Mapa Astral</span>
              <ArrowRight size={20} className="drop-shadow-sm group-hover:translate-x-1 transition-transform duration-300" />
            </div>
          </Button>
        </motion.div>
      </motion.div>

      {/* Elementos decorativos de fundo */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 1.5 }}
        className="absolute inset-0 -z-10 overflow-hidden pointer-events-none"
      >
        <div className="absolute top-1/4 left-1/4 w-px h-16 bg-gradient-to-b from-[#d4af37]/20 to-transparent rotate-45" />
        <div className="absolute top-1/3 right-1/4 w-px h-12 bg-gradient-to-b from-[#d4af37]/15 to-transparent -rotate-45" />
        <div className="absolute bottom-1/4 left-1/3 w-1 h-1 bg-[#d4af37]/30 rounded-full" />
        <div className="absolute bottom-1/3 right-1/3 w-0.5 h-0.5 bg-[#d4af37]/40 rounded-full" />
      </motion.div>
    </motion.div>
  );
};