// src/components/features/dashboard/CoreArchetypesCard.tsx

import type { FC } from 'react';
import type { SunSign, MajorArcana } from '../../../../backend/src/domain/types';
import { motion } from 'framer-motion';
import { GiAries, GiTaurus, GiGemini, GiCancer, GiLeo, GiVirgo,
         GiLibra, GiScorpio, GiSagittarius, GiCapricorn, GiAquarius, GiPisces 
} from 'react-icons/gi';

// Mapeamento para buscar o ícone do signo
const zodiacIcons: Record<SunSign, FC<{size: number, className?: string}>> = {
  "Áries": GiAries, "Touro": GiTaurus, "Gêmeos": GiGemini, "Câncer": GiCancer, 
  "Leão": GiLeo, "Virgem": GiVirgo, "Libra": GiLibra, "Escorpião": GiScorpio, 
  "Sagitário": GiSagittarius, "Capricórnio": GiCapricorn, "Aquário": GiAquarius, "Peixes": GiPisces,
};

// Função para converter número para Romano (para o Arcano)
const toRoman = (num: number): string => {
  const roman: Record<string, number> = { M: 1000, CM: 900, D: 500, CD: 400, C: 100, XC: 90, L: 50, XL: 40, X: 10, IX: 9, V: 5, IV: 4, I: 1 };
  let str = '';
  for (let i of Object.keys(roman)) {
    let q = Math.floor(num / roman[i]);
    num -= q * roman[i];
    str += i.repeat(q);
  }
  return str || '0'; // Retorna '0' para o Louco
};

interface CoreArchetypesCardProps {
  sunSign: SunSign;
  lifePathArcana: MajorArcana;
}

export const CoreArchetypesCard: FC<CoreArchetypesCardProps> = ({ sunSign, lifePathArcana }) => {
  const Icon = zodiacIcons[sunSign];

  return (
    <motion.div 
      className="grid grid-cols-1 md:grid-cols-2 gap-px overflow-hidden rounded-2xl bg-[rgb(var(--color-surface))] border border-[rgb(var(--color-surface))]"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
    >
      {/* Lado Astrologia */}
      <div className="bg-[rgb(var(--color-background))] p-6 flex items-center gap-4">
        <Icon size={48} className="text-accent flex-shrink-0" />
        <div>
          <p className="text-sm text-text-muted">Seu Sol em</p>
          <p className="font-serif text-2xl text-white">{sunSign}</p>
        </div>
      </div>

      {/* Lado Tarô */}
      <div className="bg-[rgb(var(--color-background))] p-6 flex items-center gap-4">
        <div className="flex-shrink-0 w-12 text-center">
          <p className="font-serif text-3xl text-primary">{toRoman(lifePathArcana.id)}</p>
        </div>
        <div>
          <p className="text-sm text-text-muted">Seu Arcano de Vida</p>
          <p className="font-serif text-2xl text-white">{lifePathArcana.name}</p>
        </div>
      </div>
    </motion.div>
  );
};