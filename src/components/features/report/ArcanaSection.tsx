import { useState } from 'react';
import type { FC } from 'react';
import { motion } from 'framer-motion';
import type { ArcanaAnalysis, MajorArcana } from '../../../domain/types'; 
import { Button } from '../../ui/Button';
import { ArcanaDetailModal } from './ArcanaDetailModal';

const ArcanaCard: FC<{ arcana: MajorArcana; title: string; onExplore: () => void; }> = ({ arcana, title, onExplore }) => {
  return (
    <motion.div 
      className="relative bg-gradient-to-br from-[#2f2546]/80 to-[#161221]/60 backdrop-blur-sm 
                 border border-[#8b63e9]/20 rounded-3xl p-8 flex flex-col items-center text-center
                 shadow-lg shadow-black/20 overflow-hidden group cursor-pointer"
      whileHover={{ 
        y: -8, 
        boxShadow: '0 20px 40px rgba(139, 99, 233, 0.15)',
        borderColor: 'rgba(139, 99, 233, 0.4)'
      }}
      transition={{ type: 'spring', stiffness: 300, damping: 20 }}
      onClick={onExplore}
    >
      {/* Elemento decorativo sutil */}
      <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-12 h-px bg-gradient-to-r from-transparent via-[#8b63e9]/40 to-transparent" />
      
      {/* Categoria */}
      <p className="text-xs text-[#a495c6] uppercase tracking-[0.2em] font-medium mb-3">
        {title}
      </p>
      
      {/* Nome do Arcano - Destaque principal */}
      <h3 className="font-serif text-3xl lg:text-4xl text-[#FFD700] mb-4 leading-tight">
        {arcana.name}
      </h3>
      
      {/* Linha divisória elegante */}
      <div className="w-16 h-px bg-gradient-to-r from-transparent via-[#8b63e9]/60 to-transparent mb-4" />
      
      {/* Descrição */}
      <p className="text-[#F5F5F5]/85 text-sm leading-relaxed min-h-[48px] max-w-xs font-light tracking-wide">
        {arcana.description}
      </p>
      
      {/* Botão de ação */}
      <Button 
        variant="ghost" 
        onClick={(e) => {
          e.stopPropagation();
          onExplore();
        }}
        className="mt-6 text-sm px-6 py-3 font-medium tracking-wider
                   border-[#8b63e9]/30 hover:border-[#8b63e9]/60 hover:bg-[#8b63e9]/10
                   text-[#8b63e9] hover:text-[#FFD700] transition-all duration-300"
      >
        Explorar Arcano
      </Button>
      
      {/* Efeito de brilho sutil no hover */}
      <div className="absolute inset-0 bg-gradient-to-r from-[#8b63e9]/0 via-[#8b63e9]/5 to-[#8b63e9]/0 
                      opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-3xl pointer-events-none" />
    </motion.div>
  );
};

interface ArcanaSectionProps {
  arcanaData: ArcanaAnalysis;
}

export const ArcanaSection: FC<ArcanaSectionProps> = ({ arcanaData }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedArcana, setSelectedArcana] = useState<MajorArcana | null>(null);

  const openModal = (arcana: MajorArcana) => {
    setSelectedArcana(arcana);
    setIsModalOpen(true);
  };

  const closeModal = () => setIsModalOpen(false);

  const arcanasToShow = [
    { title: "Arcano Pessoal", data: arcanaData.personalArcana },
    ...(arcanaData.cabalisticNameArcana ? [{ title: "Arcano Cabalístico", data: arcanaData.cabalisticNameArcana }] : []),
    ...(arcanaData.gematriaNameArcana ? [{ title: "Arcano de Gematria", data: arcanaData.gematriaNameArcana }] : []),
    { title: "Personalidade", data: arcanaData.personalityArcana },
    { title: "Alma", data: arcanaData.soulArcana },
    { title: "Arcano Anual", data: arcanaData.annualArcana },
    ...(arcanaData.destinyArcana ? [{ title: "Destino", data: arcanaData.destinyArcana }] : [])
  ];

  return (
    <>
      <motion.section
        className="relative"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.6, ease: "easeOut" }}
      >
        {/* Título da seção com hierarquia premium */}
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
        >
          <h2 className="font-serif text-4xl lg:text-5xl text-[#F5F5F5] mb-4 tracking-wide">
            Sua <span className="text-[#FFD700]">Constelação</span> de Arcanos
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
            Descubra os arquétipos sagrados que moldam sua jornada espiritual
          </p>
        </motion.div>

        {/* Grid de cards com animação escalonada */}
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
          {arcanasToShow.map((item, index) => (
            item.data && (
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
                <ArcanaCard 
                  title={item.title}
                  arcana={item.data}
                  onExplore={() => openModal(item.data)}
                />
              </motion.div>
            )
          ))}
        </motion.div>
      </motion.section>
      
      <ArcanaDetailModal isOpen={isModalOpen} onClose={closeModal} arcana={selectedArcana} />
    </>
  );
};