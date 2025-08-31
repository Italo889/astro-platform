// src/components/features/dashboard/CoreArchetypesCard.tsx

import type { FC, ReactNode } from 'react';
import type { SunSignName, MajorArcana } from '../../../../backend/src/domain/types';
import { motion } from 'framer-motion';
import {
  GiAries, GiTaurus, GiGemini, GiCancer, GiLeo, GiVirgo,
  GiLibra, GiScorpio, GiSagittarius, GiCapricorn, GiAquarius, GiPisces
} from 'react-icons/gi';

// Mapeamento de Ícones (Inalterado)
const zodiacIcons: Record<SunSignName, FC<{ className?: string }>> = {
  "Áries": GiAries, "Touro": GiTaurus, "Gêmeos": GiGemini, "Câncer": GiCancer,
  "Leão": GiLeo, "Virgem": GiVirgo, "Libra": GiLibra, "Escorpião": GiScorpio,
  "Sagitário": GiSagittarius, "Capricórnio": GiCapricorn, "Aquário": GiAquarius, "Peixes": GiPisces,
};

// Conversor para Romano (Inalterado)
const toRoman = (num: number): string => {
  if (num === 0) return '0'; // Caso especial para O Louco
  const roman: Record<string, number> = { M: 1000, CM: 900, D: 500, CD: 400, C: 100, XC: 90, L: 50, XL: 40, X: 10, IX: 9, V: 5, IV: 4, I: 1 };
  let str = '';
  for (let i of Object.keys(roman)) {
    let q = Math.floor(num / roman[i]);
    num -= q * roman[i];
    str += i.repeat(q);
  }
  return str;
};

interface CoreArchetypesCardProps {
  sunSign: SunSignName;
  lifePathArcana: MajorArcana;
}

// Sub-componente para o Divisor Central Elegante
const ArcaneDivider: FC = () => (
    <div className="h-24 w-px bg-gradient-to-b from-transparent via-primary/30 to-transparent" />
);

// Sub-componente para exibir cada arquétipo, promovendo consistência
const ArchetypeDisplay: FC<{ label: string; value: string; icon: ReactNode }> = ({ label, value, icon }) => (
    <div className="flex flex-col items-center justify-center text-center p-6">
        {icon}
        <div className="mt-4">
            <p className="font-sans text-sm text-text-muted">{label}</p>
            <p className="font-serif text-2xl text-text-base">{value}</p>
        </div>
    </div>
);

export const CoreArchetypesCard: FC<CoreArchetypesCardProps> = ({ sunSign, lifePathArcana }) => {
  const ZodiacIcon = zodiacIcons[sunSign];

  return (
    <motion.div
      className="relative flex justify-around items-center overflow-hidden rounded-lg border border-primary/10 bg-surface/30 shadow-lg"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, ease: "easeOut" }}
      whileHover={{ y: -4, transition: { duration: 0.2 } }}
    >
        {/* Fundo com gradiente sutil para profundidade */}
        <div className="absolute inset-0 -z-10 bg-gradient-to-br from-surface/10 via-transparent to-surface/10" />

        {/* Arquétipo Astrológico */}
        <ArchetypeDisplay
            label="Seu Sol em"
            value={sunSign}
            icon={
                <div className="flex h-16 w-16 items-center justify-center rounded-full border border-accent/20 bg-background/50">
                    <ZodiacIcon className="h-8 w-8 text-accent" />
                </div>
            }
        />

        <ArcaneDivider />

        {/* Arquétipo do Tarô */}
        <ArchetypeDisplay
            label="Seu Arcano de Vida"
            value={lifePathArcana.name}
            icon={
                <div className="flex h-16 w-16 items-center justify-center">
                    <p className="font-cinzel text-4xl text-primary">{toRoman(lifePathArcana.id)}</p>
                </div>
            }
        />
    </motion.div>
  );
};