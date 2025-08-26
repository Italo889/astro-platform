// src/components/sections/DailyInsight.tsx

import { useState, useEffect } from 'react';
import type { FC } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles } from 'lucide-react';

const majorArcana = [
    { name: "O Mago", insight: "Hoje, o poder de manifestar está em suas mãos. Use suas habilidades e recursos com intenção para criar a realidade que deseja." },
    { name: "A Sacerdotisa", insight: "Confie na sua intuição. O conhecimento que você busca não está no mundo exterior, mas no silêncio da sua alma." },
    { name: "A Imperatriz", insight: "Conecte-se com a criatividade e a abundância. É um dia fértil para nutrir projetos, relacionamentos e a si mesmo." },
    { name: "O Imperador", insight: "Estrutura e disciplina trarão resultados. Organize seu mundo e assuma a liderança com confiança e autoridade." },
    { name: "A Roda da Fortuna", insight: "O destino está em movimento. Abrace as mudanças inesperadas, pois elas trazem consigo lições e novas oportunidades." },
    { name: "O Sol", insight: "Clareza, otimismo e sucesso iluminam o seu dia. Compartilhe sua alegria e energia vital com o mundo." },
    { name: "A Justiça", insight: "Equilíbrio e verdade são os temas de hoje. Tome decisões com imparcialidade e esteja preparado para arcar com as consequências de seus atos." },
    { name: "O Eremita", insight: "Um momento de introspecção é necessário. Afaste-se do barulho externo para encontrar as respostas que já residem dentro de você." },
];

interface DailyCardData {
  date: string;
  cardIndex: number;
  revealed: boolean;
}

const getSeededRandomIndex = (seed: string, max: number): number => {
    let hash = 0;
    for (let i = 0; i < seed.length; i++) {
        const char = seed.charCodeAt(i);
        hash = ((hash << 5) - hash) + char;
        hash |= 0; 
    }
    return Math.abs(hash) % max;
};

export const DailyInsight: FC = () => {
  const [dailyCard, setDailyCard] = useState<{ name: string; insight: string } | null>(null);
  const [isRevealed, setIsRevealed] = useState(false);
  const [cardData, setCardData] = useState<DailyCardData | null>(null);

  useEffect(() => {
    try {
      let visitorId = localStorage.getItem('arcan_visitor_id');
      if (!visitorId) {
        visitorId = crypto.randomUUID();
        localStorage.setItem('arcan_visitor_id', visitorId);
      }
      
      const todayStr = new Date().toLocaleDateString('en-CA');
      const storedData = localStorage.getItem('arcan_daily_card');
      let currentCardData: DailyCardData;

      if (storedData) {
        const parsedData: DailyCardData = JSON.parse(storedData);
        if (parsedData.date === todayStr) {
          currentCardData = parsedData;
        } else {
          const cardIndex = getSeededRandomIndex(visitorId + todayStr, majorArcana.length);
          currentCardData = { date: todayStr, cardIndex, revealed: false };
          localStorage.setItem('arcan_daily_card', JSON.stringify(currentCardData));
        }
      } else {
        const cardIndex = getSeededRandomIndex(visitorId + todayStr, majorArcana.length);
        currentCardData = { date: todayStr, cardIndex, revealed: false };
        localStorage.setItem('arcan_daily_card', JSON.stringify(currentCardData));
      }
      
      setCardData(currentCardData);
      setDailyCard(majorArcana[currentCardData.cardIndex]);
      setIsRevealed(currentCardData.revealed);

    } catch (error) {
      console.error("Failed to process daily card logic:", error);
      const randomIndex = Math.floor(Math.random() * majorArcana.length);
      setDailyCard(majorArcana[randomIndex]);
    }
  }, []);

  const handleReveal = () => {
    if (!isRevealed && cardData) {
      setIsRevealed(true);
      const updatedCardData = { ...cardData, revealed: true };
      localStorage.setItem('arcan_daily_card', JSON.stringify(updatedCardData));
      setCardData(updatedCardData);
    }
  };

  const currentDate = new Date().toLocaleDateString('pt-BR', { day: 'numeric', month: 'long' });

  return (
    <motion.div
      className="px-6"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true, amount: 0.5 }}
      transition={{ duration: 1 }}
    >
      <div className="max-w-xl mx-auto flex flex-col items-center text-center">
        <div className="w-full" style={{ perspective: '1000px' }}>
          <motion.div
            // RESPONSIVIDADE: Mantém a altura mínima de 210px que você aprovou.
            className="relative w-full min-h-[210px] cursor-pointer"
            onClick={handleReveal}
            style={{ transformStyle: 'preserve-3d' }}
            animate={{ rotateY: isRevealed ? 180 : 0 }}
            transition={{ duration: 0.7, ease: 'easeInOut' }}
          >
            {/* Verso da Carta */}
            <div
              // RESPONSIVIDADE: Padding e cores baseados na sua versão aprovada.
              className="absolute w-full h-full p-6 md:p-8 border border-[#2f2546] rounded-2xl bg-[#1A1A2E]/50 flex flex-col justify-center items-center text-center"
              style={{ backfaceVisibility: 'hidden' }}
            >
              <div className="absolute -top-1/2 -left-1/2 w-[200%] h-[200%]" style={{ background: 'radial-gradient(circle, rgba(139, 99, 233, 0.1), transparent 40%)', animation: 'spin-slow 15s linear infinite' }} />
              <motion.div
                animate={{ scale: [1, 1.1, 1], opacity: [0.7, 1, 0.7] }}
                transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
              >
                <Sparkles size={40} className="text-[rgb(var(--color-primary))]" />
              </motion.div>
              <p 
                // RESPONSIVIDADE: A tipografia agora se adapta.
                className="mt-4 text-base md:text-lg font-serif text-[rgb(var(--color-text-muted))]"
              >
                Toque para revelar seu insight
              </p>
              <p className="text-sm text-[rgb(var(--color-text-muted))] opacity-50">
                para hoje, {currentDate}
              </p>
            </div>
            
            {/* Frente da Carta */}
            <div
              // RESPONSIVIDADE: Padding e cores baseados na sua versão aprovada.
              className="absolute w-full h-full p-6 md:p-8 border border-[#8b63e9]/50 rounded-2xl bg-[#1A1A2E]/80 flex flex-col justify-center items-center text-center"
              style={{ backfaceVisibility: 'hidden', transform: 'rotateY(180deg)' }}
            >
              <AnimatePresence>
                {isRevealed && dailyCard && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.35 }}
                    className="w-full"
                  >
                    <p className="text-sm font-semibold tracking-widest text-[#a495c6] uppercase mb-2">
                      Seu Insight Pessoal para Hoje, {currentDate}
                    </p>
                    <h3 
                      // RESPONSIVIDADE: O título se adapta suavemente.
                      className="text-xl md:text-2xl font-bold text-white mb-4 min-h-[28px] md:min-h-[32px]"
                    >
                      {dailyCard.name}
                    </h3>
                    <p 
                      // RESPONSIVIDADE: O texto de insight se adapta.
                      className="text-sm md:text-base text-[rgb(var(--color-text-muted))] min-h-[60px]"
                    >
                      {dailyCard.insight}
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
};