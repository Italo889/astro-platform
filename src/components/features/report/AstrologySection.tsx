// src/components/features/report/AstrologySection.tsx

import type { FC } from 'react';
import { motion } from 'framer-motion';
import type { AstrologyResult, SunSign } from '../../../../backend/src/domain/types';

// Usando react-icons (que já está no seu projeto) para os glifos dos signos
import {
  GiAries, GiTaurus, GiGemini, GiCancer, GiLeo, GiVirgo,
  GiLibra, GiScorpio, GiSagittarius, GiCapricorn, GiAquarius, GiPisces
} from 'react-icons/gi';

// Mapeamento de dados para cada signo para manter o código limpo
const zodiacData: Record<SunSign, { icon: FC<{size: number; className?: string}>; description: string; range: string; }> = {
  "Áries": { icon: GiAries, description: "A centelha da iniciativa, coragem e energia. O pioneiro que desbrava caminhos com paixão e impulsividade.", range: "21/03 - 19/04" },
  "Touro": { icon: GiTaurus, description: "A força da estabilidade, sensualidade e persistência. O construtor que busca segurança e aprecia os prazeres da matéria.", range: "20/04 - 20/05" },
  "Gêmeos": { icon: GiGemini, description: "A dança da comunicação, curiosidade e dualidade. O mensageiro que conecta ideias e pessoas com versatilidade.", range: "21/05 - 20/06" },
  "Câncer": { icon: GiCancer, description: "A profundidade da nutrição, emoção e proteção. O guardião que cria laços e valoriza as raízes e o lar.", range: "21/06 - 22/07" },
  "Leão": { icon: GiLeo, description: "O brilho da criatividade, generosidade e autoexpressão. O rei que irradia confiança e inspira com seu coração nobre.", range: "23/07 - 22/08" },
  "Virgem": { icon: GiVirgo, description: "A precisão do serviço, análise e aprimoramento. O artesão que busca a perfeição e a ordem através do trabalho dedicado.", range: "23/08 - 22/09" },
  "Libra": { icon: GiLibra, description: "A busca pela harmonia, justiça e relacionamentos. O diplomata que pondera os lados e anseia por equilíbrio e beleza.", range: "23/09 - 22/10" },
  "Escorpião": { icon: GiScorpio, description: "A intensidade da transformação, poder e profundidade. O detetive que mergulha nos mistérios para encontrar a verdade oculta.", range: "23/10 - 21/11" },
  "Sagitário": { icon: GiSagittarius, description: "A expansão da aventura, otimismo e busca por sentido. O filósofo que viaja pelo mundo e pelas ideias em busca de horizontes mais amplos.", range: "22/11 - 21/12" },
  "Capricórnio": { icon: GiCapricorn, description: "A estrutura da ambição, disciplina e responsabilidade. O estrategista que constrói legados com paciência e maestria.", range: "22/12 - 19/01" },
  "Aquário": { icon: GiAquarius, description: "A visão da inovação, liberdade e coletividade. O revolucionário que quebra paradigmas e pensa no futuro da humanidade.", range: "20/01 - 18/02" },
  "Peixes": { icon: GiPisces, description: "A vastidão da compaixão, intuição e conexão espiritual. O místico que transcende as fronteiras entre o sonho e a realidade.", range: "19/02 - 20/03" },
};

interface AstrologySectionProps {
  result: AstrologyResult;
}

export const AstrologySection: FC<AstrologySectionProps> = ({ result }) => {
  const signData = zodiacData[result.sun];

  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
    >
      <h2 className="font-serif text-3xl text-center mb-6">Sua Essência Solar</h2>
      <div className="flex flex-col md:flex-row items-center gap-6 md:gap-8 bg-[rgb(var(--color-surface))]/50 border border-[rgb(var(--color-surface))] rounded-2xl p-6 md:p-8">
        {/* Lado do Glifo */}
        <div className="flex-shrink-0">
          <signData.icon size={100} className="text-[rgb(var(--color-primary))] opacity-80" />
        </div>
        {/* Lado do Texto */}
        <div>
          <p className="text-sm text-[rgb(var(--color-text-muted))]">{signData.range}</p>
          <h3 className="font-serif text-4xl text-white mt-1">Sol em {result.sun}</h3>
          <p className="text-[rgb(var(--color-text-muted))] mt-3 leading-relaxed">
            {signData.description}
          </p>
        </div>
      </div>
    </motion.section>
  );
};