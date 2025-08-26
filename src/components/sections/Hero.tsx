// src/components/sections/Hero.tsx

import { useState, useEffect } from 'react';
import type { FC } from 'react';
import { motion } from 'framer-motion';
import { Sparkles, ArrowRight } from 'lucide-react'; // Importamos o ArrowRight aqui
import { Button } from '../ui/Button'; // Importamos nosso componente Button

const textContainerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.03, delayChildren: 0.8 } },
};

const textChildVariants = {
  hidden: { opacity: 0, y: -10 },
  visible: { opacity: 1, y: 0 },
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

  // NOVO: Função para rolar suavemente até a seção do formulário
  const handleScrollToForm = () => {
    document.getElementById('formulario')?.scrollIntoView({ behavior: 'smooth' });
  };

  const titleText = "Decifre o seu ";
  const gradientText = "universo interior";

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      className="text-center max-w-4xl mx-auto mt-16 md:mt-24 px-4 md:px-6"
    >
      <motion.p
        key={welcomeMessage}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5, duration: 0.8 }}
        className="text-sm font-semibold tracking-widest text-[rgb(var(--color-text-muted))] uppercase mb-4"
      >
        {welcomeMessage}
      </motion.p>
      
      <motion.h1
        variants={textContainerVariants}
        initial="hidden"
        animate="visible"
        className="text-5xl sm:text-6xl md:text-7xl font-extrabold tracking-tight"
      >
        {titleText.split("").map((char, index) => (
          <motion.span key={index} variants={textChildVariants}>{char}</motion.span>
        ))}
        <span className="bg-gradient-to-r from-violet-300 to-purple-400 bg-clip-text text-transparent animate-gradient">
          {gradientText.split("").map((char, index) => (
            <motion.span key={index} variants={textChildVariants}>{char}</motion.span>
          ))}
        </span>
      </motion.h1>
      
      <p 
        className="mt-6 text-lg md:text-xl text-[rgb(var(--color-text-muted))] leading-relaxed max-w-2xl mx-auto"
      >
        Traduza a linguagem dos astros e arquétipos em clareza para o seu dia a dia. Seu guia pessoal para uma vida com mais propósito e direção.
      </p>
      <div className="mt-10 flex justify-center">
        {/* CORREÇÃO: Substituímos a tag <a> pelo nosso componente <Button> */}
        <motion.div
          whileHover={{ scale: 1.05, boxShadow: "0px 0px 30px rgba(255, 215, 0, 0.6)" }}
          whileTap={{ scale: 0.95 }}
          className="rounded-full" // Adicionamos rounded-full ao wrapper para o boxShadow ficar correto
        >
          <Button
            variant="primary"
            onClick={handleScrollToForm}
            className="px-6 py-3 md:px-8 md:py-4 text-base md:text-lg"
          >
            <Sparkles size={20} />
            <span>Desvendar meu Mapa Astral</span>
            <ArrowRight size={20} />
          </Button>
        </motion.div>
      </div>
    </motion.div>
  );
};