import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Award, Sparkles } from 'lucide-react';
import type { Badge } from '../../../domain/types';

const rarityConfig = {
  common: {
    bg: 'from-blue-900/20 to-blue-800/10',
    border: 'border-blue-400/30',
    glow: 'shadow-blue-400/10',
    text: 'text-blue-300',
  },
  epic: {
    bg: 'from-purple-900/20 to-purple-800/10',
    border: 'border-purple-400/30',
    glow: 'shadow-purple-400/10',
    text: 'text-purple-300',
  },
  legendary: {
    bg: 'from-yellow-900/20 to-orange-800/10',
    border: 'border-yellow-400/30',
    glow: 'shadow-yellow-400/10',
    text: 'text-yellow-300',
  },
  rare: {
    bg: 'from-green-900/20 to-green-800/10',
    border: 'border-green-400/30',
    glow: 'shadow-green-400/10',
    text: 'text-green-300',
  },
};

interface BadgeModalProps {
  isOpen: boolean;
  onClose: () => void;
  badges: Badge[];
  isLoading: boolean;
  onCheckBadges: () => Promise<void>;
  message?: string;
}

const BadgeModal: React.FC<BadgeModalProps> = ({
  isOpen,
  onClose,
  badges,
  isLoading,
  onCheckBadges,
  message,
}) => {
  const [lastCheckMessage, setLastCheckMessage] = React.useState<string | null>(null);
  const [showMessage, setShowMessage] = React.useState(false);

  const handleCheckBadges = async () => {
    await onCheckBadges();

    const hasAllBadges = badges.length >= 4; // Assumindo 4 badges disponíveis

    if (hasAllBadges) {
      setLastCheckMessage('🎉 Parabéns! Você já obteve todas as conquistas disponíveis.');
    } else {
      setLastCheckMessage('🔍 Nenhuma nova conquista encontrada no momento.');
    }

    setShowMessage(true);
    setTimeout(() => setShowMessage(false), 4000);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/80 backdrop-blur-md z-50 flex items-center justify-center p-4"
          onClick={onClose}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9, rotate: 5 }}
            animate={{ opacity: 1, scale: 1, rotate: 0 }}
            exit={{ opacity: 0, scale: 0.9, rotate: -5 }}
            transition={{ duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="relative w-full max-w-4xl transform overflow-hidden 
                       rounded-2xl bg-gradient-to-br from-[#161221]/95 via-[#2f2546]/90 to-[#161221]/95 
                       backdrop-blur-md border border-[#8b63e9]/30 
                       p-10 lg:p-12 text-left align-middle 
                       shadow-2xl shadow-[#8b63e9]/20 transition-all max-h-[85vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Ornamento superior */}
            <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-[#FFD700]/40 to-transparent" />

            {/* Background pattern */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
              <div className="absolute -top-20 -right-20 w-40 h-40 border border-[#8b63e9]/10 rounded-full" />
              <div className="absolute -bottom-20 -left-20 w-32 h-32 border border-[#FFD700]/10 rounded-full" />

              <div className="absolute inset-0">
                <div className="absolute top-1/4 right-1/4 w-32 h-32 bg-[#8b63e9]/5 rounded-full blur-2xl" />
                <div className="absolute bottom-1/4 left-1/4 w-24 h-24 bg-[#FFD700]/5 rounded-full blur-xl" />
              </div>
            </div>

            <div className="relative z-10">
              {/* Header */}
              <div className="flex items-center justify-between mb-8">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#FFD700] to-[#8b63e9] p-[2px]">
                    <div className="w-full h-full rounded-full bg-[#161221] flex items-center justify-center">
                      <span className="text-2xl">🏆</span>
                    </div>
                  </div>
                  <div>
                    <h2 className="text-3xl font-bold bg-gradient-to-r from-[#FFD700] via-white to-[#8b63e9] bg-clip-text text-transparent">
                      Suas Conquistas Místicas
                    </h2>
                    <p className="text-white/60 mt-1">
                      {badges.length}{' '}
                      {badges.length === 1
                        ? 'conquista desbloqueada'
                        : 'conquistas desbloqueadas'}
                    </p>
                  </div>
                </div>

                <button
                  onClick={onClose}
                  className="w-10 h-10 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 
                            flex items-center justify-center transition-all duration-300 group"
                >
                  <X className="w-5 h-5 text-white/60 group-hover:text-white/80" />
                </button>
              </div>

              {/* Content */}
              <div className="space-y-4">
                {badges.length === 0 ? (
                  <div className="text-center py-12">
                    <motion.div
                      initial={{ scale: 0.8, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      transition={{ delay: 0.2 }}
                      className="flex flex-col items-center gap-6"
                    >
                      <div className="w-20 h-20 rounded-full bg-gradient-to-br from-[#8b63e9]/20 to-[#FFD700]/20 
                                      border border-white/10 flex items-center justify-center">
                        <Sparkles className="w-10 h-10 text-white/40" />
                      </div>
                      <div>
                        <h3 className="text-xl font-semibold text-white/80 mb-2">
                          Suas jornadas aguardam reconhecimento
                        </h3>
                        <p className="text-white/50 leading-relaxed max-w-md">
                          Clique em &quot;Verificar Conquistas&quot; para revelar os feitos extraordinários
                          que você alcançou em sua exploração dos mistérios cósmicos.
                        </p>
                      </div>
                    </motion.div>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {badges.map((badge, index) => {
                      const config = rarityConfig[badge.rarity as keyof typeof rarityConfig];
                      return (
                        <motion.div
                          key={badge.id}
                          initial={{ x: -20, opacity: 0, scale: 0.9 }}
                          animate={{ x: 0, opacity: 1, scale: 1 }}
                          transition={{ delay: index * 0.1 }}
                          className={`
                            p-6 rounded-xl border bg-gradient-to-br ${config.bg} ${config.border}
                            shadow-lg ${config.glow} relative overflow-hidden group
                            hover:scale-105 transition-all duration-300
                          `}
                        >
                          {/* Shimmer effect */}
                          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent 
                                          transform -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />

                          {/* Badge Info */}
                          <div className="flex items-start gap-4 relative z-10">
                            <div className="text-3xl flex-shrink-0 filter drop-shadow-lg">
                              {React.isValidElement(badge.icon) ? (
                                badge.icon
                              ) : (
                                <span>{badge.icon}</span>
                              )}
                            </div>
                            <div className="flex-1 min-w-0">
                              <div className="flex items-center gap-2 mb-2">
                                <h3 className="font-bold text-white text-lg leading-tight">
                                  {badge.name}
                                </h3>
                                <span
                                  className={`text-xs px-2 py-1 rounded-full bg-white/10 ${config.text} font-medium uppercase tracking-wider`}
                                >
                                  {badge.rarity}
                                </span>
                              </div>
                              <p className="text-white/70 text-sm leading-relaxed mb-3">
                                {badge.description}
                              </p>
                              {badge.earnedAt && (
                                <div className="flex items-center gap-2 text-xs text-white/50">
                                  <Award className="w-3 h-3" />
                                  Conquistado em{' '}
                                  {new Date(badge.earnedAt).toLocaleDateString('pt-BR')}
                                </div>
                              )}
                            </div>
                          </div>
                        </motion.div>
                      );
                    })}
                  </div>
                )}
              </div>

              {/* Footer */}
              <div className="mt-8 pt-6 border-t border-white/10 flex flex-col items-center gap-4">
                <AnimatePresence>
                  {showMessage && lastCheckMessage && (
                    <motion.div
                      initial={{ opacity: 0, y: 10, scale: 0.9 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: -10, scale: 0.9 }}
                      className="px-4 py-2 bg-gradient-to-r from-[#8b63e9]/20 to-[#FFD700]/20 
                                border border-white/20 rounded-lg text-white/90 text-sm text-center
                                backdrop-blur-sm shadow-lg"
                    >
                      {lastCheckMessage}
                    </motion.div>
                  )}
                </AnimatePresence>

                <motion.button
                  onClick={handleCheckBadges}
                  disabled={isLoading}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="px-8 py-3 bg-gradient-to-r from-[#FFD700] to-[#8b63e9] 
                            text-[#161221] font-semibold rounded-xl shadow-lg
                            hover:shadow-[#FFD700]/25 transition-all duration-300 
                            disabled:opacity-50 disabled:cursor-not-allowed
                            flex items-center gap-2"
                >
                  {isLoading ? (
                    <>
                      <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                        className="w-4 h-4 border-2 border-[#161221]/30 border-t-[#161221] rounded-full"
                      />
                      Verificando...
                    </>
                  ) : (
                    <>
                      <Sparkles className="w-4 h-4" />
                      Verificar Conquistas
                    </>
                  )}
                </motion.button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default BadgeModal;
