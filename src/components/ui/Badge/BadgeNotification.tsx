import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Star, Sparkles } from 'lucide-react';
import { BadgeComponent } from './Badge';
import type { Badge } from '../../../domain/types';

interface BadgeNotificationProps {
  badge: Badge | null;
  isVisible: boolean;
  onClose: () => void;
}

export const BadgeNotification: React.FC<BadgeNotificationProps> = ({
  badge,
  isVisible,
  onClose
}) => {
  if (!badge) return null;

  return (
    <AnimatePresence>
      {isVisible && (
        <>
          {/* Overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50"
            onClick={onClose}
          />

          {/* Notification Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.5, y: 50 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.5, y: 50 }}
            transition={{ 
              type: "spring", 
              damping: 25, 
              stiffness: 300,
              duration: 0.6 
            }}
            className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-50"
          >
            <div className="relative bg-gradient-to-br from-surface/95 to-surface/90 backdrop-blur-xl rounded-3xl border border-accent/30 p-8 shadow-2xl max-w-md mx-4">
              
              {/* Efeito de brilho de fundo */}
              <div className="absolute -inset-4 bg-gradient-to-r from-accent/20 via-primary/20 to-accent/20 blur-3xl rounded-3xl" />
              
              {/* Botão fechar */}
              <button
                onClick={onClose}
                className="absolute top-4 right-4 p-2 text-text-muted hover:text-text-base transition-colors rounded-full hover:bg-surface/50"
              >
                <X size={20} />
              </button>

              {/* Conteúdo */}
              <div className="relative space-y-6 text-center">
                
                {/* Header com animação */}
                <motion.div
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                  className="space-y-2"
                >
                  <div className="flex justify-center">
                    <motion.div
                      animate={{ 
                        rotate: [0, 10, -10, 0],
                        scale: [1, 1.1, 1]
                      }}
                      transition={{ 
                        duration: 2,
                        repeat: Infinity,
                        repeatType: "loop"
                      }}
                      className="p-3 bg-accent/10 rounded-full"
                    >
                      <Star className="text-accent" size={32} />
                    </motion.div>
                  </div>
                  
                  <h2 className="font-serif text-2xl text-text-base font-bold">
                    Conquista Desbloqueada!
                  </h2>
                  
                  <div className="flex justify-center items-center gap-2 text-accent">
                    <Sparkles size={16} />
                    <span className="text-sm font-medium">Nova Badge Conquistada</span>
                    <Sparkles size={16} />
                  </div>
                </motion.div>

                {/* Badge com animação especial */}
                <motion.div
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ 
                    delay: 0.4,
                    type: "spring",
                    damping: 15,
                    stiffness: 300
                  }}
                  className="flex justify-center"
                >
                  <motion.div
                    animate={{ 
                      y: [0, -8, 0],
                    }}
                    transition={{ 
                      duration: 3,
                      repeat: Infinity,
                      ease: "easeInOut"
                    }}
                  >
                    <BadgeComponent 
                      badge={badge} 
                      size="large"
                    />
                  </motion.div>
                </motion.div>

                {/* Informações da badge */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6 }}
                  className="space-y-3"
                >
                  <h3 className="font-serif text-xl text-text-base font-semibold">
                    {badge.name}
                  </h3>
                  <p className="text-text-muted text-sm leading-relaxed">
                    {badge.description}
                  </p>
                  
                  {/* Raridade */}
                  <div className="inline-flex items-center gap-2 px-3 py-1 bg-surface/50 rounded-full border border-surface/50">
                    <span className="text-xs font-medium text-text-muted">
                      Raridade:
                    </span>
                    <span className={`text-xs font-bold capitalize ${
                      badge.rarity === 'legendary' ? 'text-yellow-400' :
                      badge.rarity === 'epic' ? 'text-purple-400' :
                      badge.rarity === 'rare' ? 'text-blue-400' :
                      'text-gray-400'
                    }`}>
                      {badge.rarity === 'legendary' ? 'Lendária' :
                       badge.rarity === 'epic' ? 'Épica' :
                       badge.rarity === 'rare' ? 'Rara' : 'Comum'}
                    </span>
                  </div>
                </motion.div>

                {/* Botão de ação */}
                <motion.button
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.8 }}
                  onClick={onClose}
                  className="w-full py-3 px-6 bg-gradient-to-r from-primary to-accent text-white font-medium rounded-xl 
                           hover:shadow-lg hover:shadow-accent/25 transition-all duration-200
                           focus:outline-none focus:ring-2 focus:ring-accent/50"
                >
                  Continuar Jornada ✨
                </motion.button>
              </div>

              {/* Partículas decorativas */}
              <div className="absolute inset-0 pointer-events-none overflow-hidden rounded-3xl">
                {Array.from({ length: 8 }).map((_, i) => (
                  <motion.div
                    key={i}
                    className="absolute w-2 h-2 bg-accent/30 rounded-full"
                    style={{
                      left: `${20 + (i * 10)}%`,
                      top: `${10 + (i % 3) * 20}%`,
                    }}
                    animate={{
                      y: [0, -10, 0],
                      opacity: [0.3, 1, 0.3],
                      scale: [0.8, 1.2, 0.8],
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      delay: i * 0.2,
                      ease: "easeInOut"
                    }}
                  />
                ))}
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};
