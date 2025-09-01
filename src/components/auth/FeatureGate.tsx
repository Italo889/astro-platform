// src/components/auth/FeatureGate.tsx

import type { FC } from 'react';
import { motion } from 'framer-motion';
import { Button } from '../ui/Button';
import { useUIStore } from '../../store/uiStore';
import { Lock, Sparkles} from 'lucide-react';

interface FeatureGateProps {
  title: string;
  description: string;
}

export const FeatureGate: FC<FeatureGateProps> = ({ title, description }) => {
  const openAuthModal = useUIStore((state) => state.openAuthModal);

  return (
    <div className="w-full max-w-lg mx-auto text-center mt-12 relative">
      {/* Geometria de Fundo - Hexágonos Concêntricos */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        {[...Array(3)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute border border-accent/10"
            style={{
              width: `${200 + i * 80}px`,
              height: `${200 + i * 80}px`,
              clipPath: 'polygon(50% 0%, 93.3% 25%, 93.3% 75%, 50% 100%, 6.7% 75%, 6.7% 25%)',
            }}
            animate={{
              rotate: 360,
              scale: [1, 1.05, 1],
            }}
            transition={{
              rotate: { duration: 20 + i * 10, repeat: Infinity, ease: "linear" },
              scale: { duration: 4, repeat: Infinity, ease: "easeInOut" },
            }}
          />
        ))}
      </div>

      {/* Campo de Estrelas Orbitais */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(12)].map((_, i) => {
          const angle = (i * 30) * Math.PI / 180;
          const radius = 150;
          return (
            <motion.div
              key={i}
              className="absolute w-1 h-1 bg-accent rounded-full"
              style={{
                left: `calc(50% + ${Math.cos(angle) * radius}px)`,
                top: `calc(50% + ${Math.sin(angle) * radius}px)`,
              }}
              animate={{
                opacity: [0, 1, 0],
                scale: [0, 1, 0],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                delay: i * 0.25,
                ease: "easeInOut"
              }}
            />
          );
        })}
      </div>

      {/* Container Principal */}
      <motion.div
        initial={{ opacity: 0, y: 30, rotateX: 15 }}
        animate={{ opacity: 1, y: 0, rotateX: 0 }}
        transition={{ 
          duration: 1.2, 
          ease: [0.25, 0.46, 0.45, 0.94] 
        }}
        className="relative"
        style={{ perspective: '1000px' }}
      >
        {/* Superfície Principal com Background do Header */}
        <div
          className="relative backdrop-blur-sm rounded-3xl overflow-hidden"
          style={{
            backgroundColor: 'rgba(22, 18, 33, 0.6)',
            boxShadow: `
              0 25px 50px -12px rgba(22, 18, 33, 0.8),
              0 8px 16px -8px rgba(139, 99, 233, 0.1),
              inset 0 1px 0 rgba(255, 255, 255, 0.05),
              inset 0 -1px 0 rgba(0, 0, 0, 0.1)
            `,
          }}
        >
          {/* Borda Luminosa */}
          <div className="absolute inset-0 rounded-3xl border border-accent/20" />

          {/* Reflexo de Luz Superior */}
          <div 
            className="absolute top-0 left-1/4 right-1/4 h-px bg-white/10 rounded-full"
            style={{
              filter: 'blur(1px)',
            }}
          />

          <div className="relative p-12">
            {/* Constelação Minimalista */}
            <div className="absolute top-6 right-8">
              <div className="relative">
                <div className="w-2 h-2 bg-accent/30 rounded-full absolute" />
                <div className="w-1 h-1 bg-accent/50 rounded-full absolute top-3 left-4" />
                <div className="w-1.5 h-1.5 bg-accent/40 rounded-full absolute -top-2 left-6" />
                {/* Linhas conectoras sutis */}
                <svg className="absolute top-0 left-0 w-8 h-6 stroke-accent/20" strokeWidth="0.5">
                  <line x1="4" y1="4" x2="16" y2="12" />
                  <line x1="16" y1="12" x2="24" y2="2" />
                </svg>
              </div>
            </div>

            {/* Ícone Central - Arquitetura Simplificada */}
            <div className="w-24 h-24 mx-auto mb-8 relative flex items-center justify-center">
              {/* Anel Externo Estrutural */}
              <div
                className="absolute inset-0 rounded-full border border-surface"
                style={{
                  boxShadow: `
                    0 0 0 1px rgba(139, 99, 233, 0.1),
                    inset 0 2px 4px rgba(0, 0, 0, 0.1),
                    inset 0 -2px 4px rgba(255, 255, 255, 0.05)
                  `,
                }}
              />

              {/* Anéis Orbitais */}
              {[...Array(2)].map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute rounded-full border border-accent/30"
                  style={{
                    width: `${60 - i * 15}px`,
                    height: `${60 - i * 15}px`,
                  }}
                  animate={{ 
                    rotate: 360 
                  }}
                  transition={{
                    duration: 8 + i * 4,
                    repeat: Infinity,
                    ease: "linear",
                  }}
                />
              ))}

              {/* Núcleo Central - Estático */}
              <div
                className="relative w-12 h-12 bg-surface rounded-full flex items-center justify-center z-10"
                style={{
                  boxShadow: `
                    0 4px 8px rgba(22, 18, 33, 0.4),
                    inset 0 1px 0 rgba(255, 255, 255, 0.1),
                    inset 0 -1px 0 rgba(0, 0, 0, 0.1)
                  `,
                }}
              >
                <Lock size={24} className="text-accent" />
              </div>
            </div>

            {/* Título */}
            <motion.h2 
              className="font-serif text-4xl text-text-base mb-2 tracking-wide"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4, duration: 0.8 }}
              style={{ textShadow: '0 2px 8px rgba(0, 0, 0, 0.3)' }}
            >
              {title}
            </motion.h2>

            {/* Ornamento Geométrico Central */}
            <motion.div 
              className="flex items-center justify-center mb-6 space-x-2"
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ delay: 0.6, duration: 0.8 }}
            >
              <div className="w-8 h-px bg-accent/40" />
              <div className="w-2 h-2 bg-accent/60 rotate-45" />
              <div className="w-12 h-px bg-accent/40" />
              <div className="w-1 h-1 bg-accent/80 rounded-full" />
              <div className="w-12 h-px bg-accent/40" />
              <div className="w-2 h-2 bg-accent/60 rotate-45" />
              <div className="w-8 h-px bg-accent/40" />
            </motion.div>

            {/* Descrição */}
            <motion.p 
              className="text-text-muted text-lg mb-10 leading-relaxed max-w-md mx-auto"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8, duration: 0.8 }}
            >
              {description}
            </motion.p>

            {/* CTA */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 1, duration: 0.6 }}
            >
              <motion.div
                whileHover={{ y: -2 }}
                whileTap={{ scale: 0.98 }}
                transition={{ duration: 0.2 }}
              >
                <Button 
                  variant="primary" 
                  className="px-10 py-4 text-lg font-medium relative overflow-hidden"
                  onClick={() => openAuthModal('register')}
                  style={{
                    boxShadow: `
                      0 8px 16px rgba(255, 215, 0, 0.2),
                      inset 0 1px 0 rgba(255, 255, 255, 0.2),
                      inset 0 -1px 0 rgba(0, 0, 0, 0.1)
                    `,
                  }}
                >
                  {/* Shimmer Effect */}
                  <motion.div
                    className="absolute inset-0 bg-white/10 opacity-0"
                    whileHover={{ 
                      opacity: [0, 1, 0],
                      x: ['-100%', '100%']
                    }}
                    transition={{ duration: 0.8 }}
                    style={{ 
                      clipPath: 'polygon(0% 0%, 20% 0%, 40% 100%, 20% 100%)',
                    }}
                  />
                  
                  <span className="relative z-10 flex items-center">
                    <Sparkles size={20} className="mr-3" />
                    Iniciar Revelação
                  </span>
                </Button>
              </motion.div>
            </motion.div>

            {/* Elemento Final */}
            <motion.div
              className="mt-8 text-accent/60 text-sm font-light tracking-wider"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.2, duration: 0.8 }}
            >
              <span className="inline-block w-1 h-1 bg-accent/40 rounded-full mr-2" />
              O cosmos aguarda sua descoberta
              <span className="inline-block w-1 h-1 bg-accent/40 rounded-full ml-2" />
            </motion.div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};