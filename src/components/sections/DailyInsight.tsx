// src/components/sections/DailyInsight.tsx

import { useState, useEffect, useRef } from 'react';
import type { FC } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, Eye, Clock, Share2, Copy, Check } from 'lucide-react';

// Arcanos expandidos com elemento e energia para uma experiência mais rica
const majorArcana = [
    { 
        name: "O Mago", 
        insight: "O poder de manifestar está em suas mãos. Use suas habilidades e recursos com intenção clara para criar a realidade que deseja.",
        element: "Ar",
        energy: "Ativa"
    },
    { 
        name: "A Sacerdotisa", 
        insight: "Confie na sabedoria que habita em seu interior. O conhecimento que você busca não está no mundo exterior, mas no silêncio da sua alma.",
        element: "Água",
        energy: "Receptiva"
    },
    { 
        name: "A Imperatriz", 
        insight: "Conecte-se com a criatividade e a abundância natural. É um dia fértil para nutrir projetos, relacionamentos e a si mesmo.",
        element: "Terra",
        energy: "Criativa"
    },
    { 
        name: "O Imperador", 
        insight: "Estrutura e liderança são suas ferramentas hoje. Organize seu mundo interno e externo com confiança e determinação.",
        element: "Fogo",
        energy: "Dominante"
    },
    { 
        name: "A Roda da Fortuna", 
        insight: "Os ciclos da vida estão em movimento. Abrace as mudanças com sabedoria, pois elas trazem novas oportunidades de crescimento.",
        element: "Fogo",
        energy: "Cíclica"
    },
    { 
        name: "O Sol", 
        insight: "Clareza, otimismo e vitalidade iluminam seu caminho. Compartilhe sua energia radiante e inspire outros ao seu redor.",
        element: "Fogo",
        energy: "Radiante"
    },
    { 
        name: "A Justiça", 
        insight: "Equilíbrio e verdade guiam suas decisões. Tome escolhas baseadas na integridade e assuma responsabilidade por suas ações.",
        element: "Ar",
        energy: "Equilibrante"
    },
    { 
        name: "O Eremita", 
        insight: "Um momento de introspecção profunda se faz necessário. Afaste-se do ruído externo para encontrar as respostas que já residem em você.",
        element: "Terra",
        energy: "Contemplativa"
    },
];

interface DailyCardData {
  date: string;
  cardIndex: number;
  revealed: boolean;
}

interface ArcanaCard {
  name: string;
  insight: string;
  element: string;
  energy: string;
}

// Função para gerar índice aleatório baseado em seed (garante mesma carta por dia)
const getSeededRandomIndex = (seed: string, max: number): number => {
    let hash = 0;
    for (let i = 0; i < seed.length; i++) {
        const char = seed.charCodeAt(i);
        hash = ((hash << 5) - hash) + char;
        hash |= 0; 
    }
    return Math.abs(hash) % max;
};

// Componente para criar efeito de constelação
const Constellation = ({ count = 25 }: { count?: number }) => {
  const stars = Array.from({ length: count }, (_, i) => {
    const size = Math.random() * 2 + 1;
    return {
      id: i,
      size,
      x: Math.random() * 100,
      y: Math.random() * 100,
      opacity: Math.random() * 0.7 + 0.3,
      delay: Math.random() * 3
    };
  });

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      {stars.map(star => (
        <div
          key={star.id}
          className="absolute rounded-full bg-white"
          style={{
            width: `${star.size}px`,
            height: `${star.size}px`,
            top: `${star.y}%`,
            left: `${star.x}%`,
            opacity: star.opacity,
            animation: `twinkle ${2 + Math.random() * 3}s infinite ${star.delay}s`
          }}
        />
      ))}
    </div>
  );
};

// Componente para partículas flutuantes
const FloatingParticles = ({ count = 10 }: { count?: number }) => {
  const particles = Array.from({ length: count }, (_, i) => {
    const size = Math.random() * 15 + 5;
    return {
      id: i,
      size,
      x: Math.random() * 100,
      y: Math.random() * 100,
      delay: Math.random() * 5
    };
  });

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      {particles.map(particle => (
        <div
          key={particle.id}
          className="absolute rounded-full bg-gradient-to-br from-[#FFD700] to-[#8b63e9] opacity-30"
          style={{
            width: `${particle.size}px`,
            height: `${particle.size}px`,
            top: `${particle.y}%`,
            left: `${particle.x}%`,
            animation: `float ${8 + Math.random() * 7}s infinite ease-in-out ${particle.delay}s`
          }}
        />
      ))}
    </div>
  );
};

export const DailyInsight: FC = () => {
  const [dailyCard, setDailyCard] = useState<ArcanaCard | null>(null);
  const [isRevealed, setIsRevealed] = useState(false);
  const [cardData, setCardData] = useState<DailyCardData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [shareStatus, setShareStatus] = useState<'idle' | 'sharing' | 'copied'>('idle');
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    try {
      setIsLoading(true);
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
      setIsLoading(false);

    } catch (error) {
      console.error("Failed to process daily card logic:", error);
      const randomIndex = Math.floor(Math.random() * majorArcana.length);
      setDailyCard(majorArcana[randomIndex]);
      setIsLoading(false);
    }
  }, []);

  const handleReveal = () => {
    if (!isRevealed && cardData) {
      setIsRevealed(true);
      const updatedCardData = { ...cardData, revealed: true };
      localStorage.setItem('arcan_daily_card', JSON.stringify(updatedCardData));
      setCardData(updatedCardData);
      
      // Efeito de partículas ao revelar
      if (cardRef.current) {
        const rect = cardRef.current.getBoundingClientRect();
        createRevealParticles(rect);
      }
    }
  };

  const createRevealParticles = (rect: DOMRect) => {
    const particlesContainer = document.createElement('div');
    particlesContainer.style.position = 'fixed';
    particlesContainer.style.top = `${rect.top}px`;
    particlesContainer.style.left = `${rect.left}px`;
    particlesContainer.style.width = `${rect.width}px`;
    particlesContainer.style.height = `${rect.height}px`;
    particlesContainer.style.pointerEvents = 'none';
    particlesContainer.style.zIndex = '100';
    document.body.appendChild(particlesContainer);
    
    // Criar partículas
    for (let i = 0; i < 30; i++) {
      const particle = document.createElement('div');
      particle.style.position = 'absolute';
      particle.style.width = '8px';
      particle.style.height = '8px';
      particle.style.backgroundColor = getRandomColor();
      particle.style.borderRadius = '50%';
      particle.style.top = '50%';
      particle.style.left = '50%';
      
      const angle = Math.random() * Math.PI * 2;
      const distance = 50 + Math.random() * 100;
      const duration = 800 + Math.random() * 500;
      
      particle.animate([
        { 
          transform: 'translate(-50%, -50%) scale(1)',
          opacity: 1
        },
        { 
          transform: `translate(${Math.cos(angle) * distance - 50}%, ${Math.sin(angle) * distance - 50}%) scale(0)`,
          opacity: 0
        }
      ], {
        duration: duration,
        easing: 'cubic-bezier(0.1, 0.8, 0.3, 1)'
      });
      
      particlesContainer.appendChild(particle);
      
      // Remover após animação
      setTimeout(() => {
        if (particlesContainer.contains(particle)) {
          particlesContainer.removeChild(particle);
        }
      }, duration);
    }
    
    // Remover container após conclusão
    setTimeout(() => {
      if (document.body.contains(particlesContainer)) {
        document.body.removeChild(particlesContainer);
      }
    }, 1500);
  };

  const getRandomColor = (): string => {
    const colors = [
      '#FFD700', // Dourado
      '#8b63e9', // Roxo
      '#FF6B6B', // Rosa
      '#4ECDC4', // Turquesa
      '#FFBE0B'  // Laranja
    ];
    return colors[Math.floor(Math.random() * colors.length)];
  };

  const handleShare = async () => {
    if (!dailyCard) return;

    const shareText = `🔮 Meu Insight do Tarot para hoje (${currentDate}):

"${dailyCard.name}"
${dailyCard.insight}

Elemento: ${dailyCard.element} | Energia: ${dailyCard.energy}

✨ Descubra seu insight diário em Sinastria.com.br`;

    setShareStatus('sharing');

    try {
      // Tenta usar a Web Share API primeiro (dispositivos móveis)
      if (navigator.share && 'canShare' in navigator) {
        await navigator.share({
          title: `Insight do Tarot - ${dailyCard.name}`,
          text: shareText,
          url: window.location.origin
        });
        setShareStatus('idle');
      } else {
        // Fallback: copia para clipboard
        await navigator.clipboard.writeText(shareText);
        setShareStatus('copied');
        
        // Volta ao estado idle após 2 segundos
        setTimeout(() => {
          setShareStatus('idle');
        }, 2000);
      }
    } catch (error) {
      console.error('Erro ao compartilhar:', error);
      
      // Fallback manual: cria um elemento temporário para copiar
      try {
        const textArea = document.createElement('textarea');
        textArea.value = shareText;
        textArea.style.position = 'fixed';
        textArea.style.left = '-999999px';
        textArea.style.top = '-999999px';
        document.body.appendChild(textArea);
        textArea.focus();
        textArea.select();
        document.execCommand('copy');
        document.body.removeChild(textArea);
        
        setShareStatus('copied');
        setTimeout(() => {
          setShareStatus('idle');
        }, 2000);
      } catch (fallbackError) {
        console.error('Erro no fallback de cópia:', fallbackError);
        setShareStatus('idle');
      }
    }
  };

  const currentDate = new Date().toLocaleDateString('pt-BR', { day: 'numeric', month: 'long' });

  if (isLoading) {
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
            <div className="relative w-full min-h-[280px] cursor-pointer rounded-2xl bg-gradient-to-br from-[#2f2546] to-[#161221] border border-[#8b63e9]/30 flex items-center justify-center">
              <div className="shimmer-effect absolute inset-0 bg-gradient-to-r from-transparent via-[rgba(139,99,233,0.1)] to-transparent bg-[length:200%_100%]"></div>
              <Clock className="text-[#a495c6] animate-pulse" size={40} />
            </div>
          </div>
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div
      className="px-6"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.5 }}
      transition={{ duration: 0.8 }}
    >
      <div className="max-w-xl mx-auto flex flex-col items-center text-center">
        <div className="w-full" style={{ perspective: '1000px' }}>
          <motion.div
            ref={cardRef}
            className="relative w-full min-h-[280px] cursor-pointer"
            onClick={handleReveal}
            style={{ transformStyle: 'preserve-3d' }}
            animate={{ rotateY: isRevealed ? 180 : 0 }}
            transition={{ duration: 0.7, ease: 'easeInOut' }}
            whileHover={{ scale: 1.02 }}
          >
            {/* Verso da Carta */}
            <div
              className="absolute w-full h-full p-6 md:p-8 border border-[#8b63e9]/30 rounded-2xl bg-gradient-to-br from-[#2f2546]/80 via-[#161221] to-[#2f2546]/80 flex flex-col justify-center items-center text-center overflow-hidden"
              style={{ backfaceVisibility: 'hidden' }}
            >
              <Constellation count={25} />
              <FloatingParticles count={10} />
              <div className="absolute inset-0 bg-gradient-to-b from-transparent to-[#161221]/50"></div>
              
              <motion.div
                animate={{ scale: [1, 1.1, 1], rotate: [0, 5, -5, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
                className="relative z-10"
              >
                <Sparkles size={48} className="text-[#FFD700] mb-4 drop-shadow-glow" />
              </motion.div>
              
              <p className="mt-4 text-base md:text-lg font-['Noto_Sans'] text-[#a495c6] relative z-10">
                Toque para revelar seu insight
              </p>
              <p className="text-sm text-[#a495c6] opacity-70 mt-2 flex items-center justify-center gap-1 relative z-10">
                <Clock size={14} />
                para hoje, {currentDate}
              </p>
              
              <div className="absolute bottom-4 text-[#a495c6] opacity-40 text-xs flex items-center gap-1">
                <Eye size={12} />
                <span>O Arcano aguarda sua curiosidade</span>
              </div>
            </div>
            
            {/* Frente da Carta */}
            <div
              className="absolute w-full h-full p-6 md:p-8 border border-[#FFD700]/50 rounded-2xl bg-gradient-to-br from-[#2f2546] via-[#161221] to-[#2f2546] flex flex-col justify-center items-center text-center overflow-hidden"
              style={{ backfaceVisibility: 'hidden', transform: 'rotateY(180deg)' }}
            >
              <div className="shimmer-effect absolute inset-0 bg-gradient-to-r from-transparent via-[rgba(139,99,233,0.1)] to-transparent bg-[length:200%_100%] animate-shimmer"></div>
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(139,99,233,0.1),transparent_60%)]"></div>
              
              <AnimatePresence>
                {isRevealed && dailyCard && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.35, duration: 0.5 }}
                    className="w-full relative z-10"
                  >
                    <motion.div 
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ delay: 0.5, type: "spring", stiffness: 200 }}
                      className="inline-flex items-center justify-center rounded-full bg-[#8b63e9]/10 px-3 py-1 mb-4"
                    >
                      <Clock size={12} className="mr-1 text-[#a495c6]" />
                      <p className="text-xs font-semibold tracking-widest text-[#a495c6] uppercase font-['Noto_Sans']">
                        Para Hoje, {currentDate}
                      </p>
                    </motion.div>
                    
                    <motion.h3 
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.6 }}
                      className="text-xl md:text-2xl font-['Cinzel_Decorative'] font-bold text-[#FFD700] mb-4 min-h-[32px] md:min-h-[36px] uppercase text-center"
                    >
                      {dailyCard.name}
                    </motion.h3>
                    
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.7 }}
                      className="relative"
                    >
                      <div className="absolute -left-4 top-1/2 transform -translate-y-1/2 text-[#8b63e9] opacity-50">
                        ❝
                      </div>
                      <p className="text-sm md:text-base text-[#F5F5F5] min-h-[60px] text-center italic px-4 font-['Noto_Sans'] leading-relaxed">
                        {dailyCard.insight}
                      </p>
                      <div className="absolute -right-4 bottom-1/2 transform translate-y-1/2 text-[#8b63e9] opacity-50">
                        ❞
                      </div>
                    </motion.div>
                    
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.9 }}
                      className="mt-6 flex justify-center"
                    >
                      <motion.button 
                        onClick={handleShare}
                        disabled={shareStatus === 'sharing'}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="text-xs text-[#a495c6] opacity-70 hover:opacity-100 transition-all duration-300 
                                   flex items-center gap-2 font-['Noto_Sans'] px-3 py-2 rounded-full
                                   hover:bg-[#8b63e9]/10 border border-transparent hover:border-[#8b63e9]/30
                                   disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        {shareStatus === 'copied' ? (
                          <>
                            <Check size={12} className="text-green-400" />
                            <span className="text-green-400">Copiado!</span>
                          </>
                        ) : shareStatus === 'sharing' ? (
                          <>
                            <motion.div
                              animate={{ rotate: 360 }}
                              transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                            >
                              <Sparkles size={12} />
                            </motion.div>
                            <span>Compartilhando...</span>
                          </>
                        ) : (
                          <>
                            {typeof navigator.share === 'function' && typeof navigator.canShare === 'function' ? (
                              <Share2 size={12} />
                            ) : (
                              <Copy size={12} />
                            )}
                            <span>
                              {typeof navigator.share === 'function' && typeof navigator.canShare === 'function' ? 'Compartilhar este insight' : 'Copiar insight'}
                            </span>
                          </>
                        )}
                      </motion.button>
                    </motion.div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        </div>
      </div>
      
      <style>{`
        @keyframes shimmer {
          0% { background-position: -1000px 0; }
          100% { background-position: 1000px 0; }
        }
        .animate-shimmer {
          animation: shimmer 2s infinite;
        }
        .drop-shadow-glow {
          filter: drop-shadow(0 0 4px rgba(255, 215, 0, 0.6));
        }
      `}</style>
    </motion.div>
  );
};