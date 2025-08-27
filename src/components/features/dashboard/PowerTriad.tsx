import type { FC } from 'react';
import { motion, easeOut } from 'framer-motion';
import type { MajorArcana, SunSignName } from '../../../domain/types';
import { ZodiacSign } from './ZodiacSign';
import { arcanaImageMap } from '../../../utils/image-map'; // <-- Importe o mapa

interface PowerTriadProps {
  sunSign: SunSignName;
  lifePathArcana: MajorArcana;
  personalArcana: MajorArcana;
}

const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number) => ({
    opacity: 1, y: 0,
    transition: { delay: 0.2 + i * 0.2, duration: 0.5, ease: easeOut },
  }),
};

const TriadCard: FC<{ children: React.ReactNode; index: number; hoverColor: 'primary' | 'accent' }> = ({ children, index, hoverColor }) => (
  <motion.div 
    custom={index}
    variants={cardVariants}
    initial="hidden"
    animate="visible"
    className={`bg-surface/50 rounded-xl p-6 border border-surface group
                hover:border-${hoverColor}/50 hover:bg-surface/80 
                transition-all duration-300 h-full flex flex-col`} // Flex-col para empilhar
  >
    {children}
  </motion.div>
);

export const PowerTriad: FC<PowerTriadProps> = ({ sunSign, lifePathArcana, personalArcana }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      
      <TriadCard index={0} hoverColor="primary">
        <div className="flex justify-between items-start">
          <div>
            <h3 className="text-sm text-text-muted mb-2">Seu Sol em</h3>
            <p className="text-4xl font-serif text-text-base group-hover:text-primary transition-colors">
              {sunSign}
            </p>
          </div>
          <ZodiacSign sign={sunSign} className="w-10 h-10 text-text-muted group-hover:text-primary transition-colors" />
        </div>
        {/* Você pode adicionar a imagem do signo aqui também se quiser */}
      </TriadCard>

      <TriadCard index={1} hoverColor="accent">
        <div className="flex-1">
          <h3 className="text-sm text-text-muted mb-2">Seu Arcano de Vida</h3>
          <p className="text-2xl font-serif text-text-base group-hover:text-accent transition-colors">
            {lifePathArcana.id}. {lifePathArcana.name}
          </p>
        </div>
        <img
          src={arcanaImageMap[lifePathArcana.id]}
          alt={lifePathArcana.name}
          width={200} // Importante para evitar layout shift
          height={350} // Importante para evitar layout shift
          loading="lazy" // Essencial para performance!
          className="mt-4 rounded-lg object-cover w-full h-auto"
        />
      </TriadCard>
      
      <TriadCard index={2} hoverColor="accent">
        <div className="flex-1">
          <h3 className="text-sm text-text-muted mb-2">Seu Arcano Pessoal</h3>
          <p className="text-2xl font-serif text-text-base group-hover:text-accent transition-colors">
            {personalArcana.id}. {personalArcana.name}
          </p>
        </div>
        <img
          src={arcanaImageMap[personalArcana.id]}
          alt={personalArcana.name}
          width={200}
          height={350}
          loading="lazy"
          className="mt-4 rounded-lg object-cover w-full h-auto"
        />
      </TriadCard>
    </div>
  );
};