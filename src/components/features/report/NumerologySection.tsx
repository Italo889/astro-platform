// src/components/features/report/NumerologySection.tsx

import type { FC } from 'react';
import { motion } from 'framer-motion';
import type { NumerologyNumbers } from '../../../../backend/src/domain/types';

// Mapeamento de dados para os tipos de números
const numerologyData = {
  lifePath: {
    title: "Caminho de Vida",
    description: "Sua principal missão e as lições que você veio aprender ao longo da vida."
  },
  destiny: {
    title: "Número de Destino",
    description: "Seus talentos inatos e como você se expressa no mundo. A energia do seu nome."
  }
};

// Sub-componente para exibir cada número de forma estilizada
const NumberCard: FC<{ title: string; number: number; description: string }> = ({ title, number, description }) => {
  return (
    <div className="flex flex-col items-center text-center">
      <div className="relative w-28 h-28 flex items-center justify-center">
        {/* Brilho de fundo */}
        <div className="absolute inset-0 bg-accent/20 blur-xl rounded-full" />
        {/* Círculo principal */}
        <div className="w-24 h-24 rounded-full flex items-center justify-center bg-gradient-to-br from-[rgb(var(--color-surface))] to-[rgb(var(--color-background))] border-2 border-[rgb(var(--color-surface))] shadow-lg">
          <span className="font-serif text-5xl text-[rgb(var(--color-primary))]">{number}</span>
        </div>
      </div>
      <h4 className="font-serif text-2xl text-white mt-4">{title}</h4>
      <p className="text-[rgb(var(--color-text-muted))] mt-1 text-sm max-w-xs">
        {description}
      </p>
    </div>
  );
};


interface NumerologySectionProps {
  result: NumerologyNumbers;
}

export const NumerologySection: FC<NumerologySectionProps> = ({ result }) => {
  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
    >
      <h2 className="font-serif text-3xl text-center mb-8">Os Números da Sua Alma</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-8">
        
        {/* Card para o Caminho de Vida */}
        <NumberCard 
          title={numerologyData.lifePath.title}
          number={result.lifePath}
          description={numerologyData.lifePath.description}
        />
        
        {/* Card para o Número de Destino (só renderiza se existir) */}
        {result.destiny && (
          <NumberCard
            title={numerologyData.destiny.title}
            number={result.destiny}
            description={numerologyData.destiny.description}
          />
        )}

      </div>
    </motion.section>
  );
};