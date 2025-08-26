// src/components/features/report/ArcanaSection.tsx

import { useState } from 'react';
import type { FC } from 'react';
import { motion } from 'framer-motion';
import type { ArcanaAnalysis, MajorArcana } from '../../../../backend/src/domain/types';
import { Button } from '../../ui/Button';
import { ArcanaDetailModal } from './ArcanaDetailModal'; // Importando o modal

// Sub-componente para o card de um único Arcano
const ArcanaCard: FC<{ arcana: MajorArcana; title: string; onExplore: () => void; }> = ({ arcana, title, onExplore }) => {
  return (
    <motion.div 
      className="bg-[rgb(var(--color-surface))]/50 border border-[rgb(var(--color-surface))] rounded-2xl p-6 flex flex-col items-center text-center"
      whileHover={{ scale: 1.03, boxShadow: '0 10px 30px rgba(0,0,0,0.3)' }}
      transition={{ type: 'spring', stiffness: 300 }}
    >
      <p className="text-sm text-[rgb(var(--color-text-muted))] uppercase tracking-widest">{title}</p>
      <h3 className="font-serif text-3xl text-[rgb(var(--color-primary))] my-2">{arcana.name}</h3>
      <p className="text-white/80 text-sm min-h-[40px]">{arcana.description}</p>
      <Button variant="ghost" onClick={onExplore} className="mt-4 text-sm px-5 py-2">
        Explorar Arcano
      </Button>
    </motion.div>
  );
};

interface ArcanaSectionProps {
  result: ArcanaAnalysis;
}

export const ArcanaSection: FC<ArcanaSectionProps> = ({ result }) => {
  // Estado para controlar qual arcano está no modal e se ele está aberto
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedArcana, setSelectedArcana] = useState<MajorArcana | null>(null);

  const openModal = (arcana: MajorArcana) => {
    setSelectedArcana(arcana);
    setIsModalOpen(true);
  };

  const closeModal = () => setIsModalOpen(false);

  return (
    <>
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.6, ease: "easeOut" }}
      >
        <h2 className="font-serif text-3xl text-center mb-8">Seus Arcanos Pessoais</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          
          {/* Card para o Arcano do Caminho de Vida */}
          <ArcanaCard 
            title="Arcano do Caminho de Vida"
            arcana={result.lifePathArcana}
            onExplore={() => openModal(result.lifePathArcana)}
          />
          
          {/* Card para o Arcano de Destino (só renderiza se existir) */}
          {result.destinyArcana && (
            <ArcanaCard 
              title="Arcano de Destino"
              arcana={result.destinyArcana}
              onExplore={() => openModal(result.destinyArcana!)}
            />
          )}

        </div>
      </motion.section>
      
      {/* O Modal em si, aguardando para ser ativado */}
      <ArcanaDetailModal isOpen={isModalOpen} onClose={closeModal} arcana={selectedArcana} />
    </>
  );
};