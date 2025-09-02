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
}

const BadgeModal: React.FC<BadgeModalProps> = ({
  isOpen,
  onClose,
  badges,
  isLoading,
  onCheckBadges,
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
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          onClick={onClose}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.3 }}
            className="relative w-full max-w-2xl transform overflow-hidden 
                       rounded-2xl bg-[#1a1625]/95 backdrop-blur-xl border border-[#3d2f52]/50 
                       p-6 text-left align-middle shadow-2xl max-h-[80vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header compacto */}
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#FFD700]/20 to-[#8b63e9]/20 flex items-center justify-center border border-[#8b63e9]/30">
                  <Award className="w-4 h-4 text-[#FFD700]" />
                </div>
                <div>
                  <h2 className="text-xl font-semibold text-white">
                    Conquistas
                  </h2>
                  <p className="text-sm text-gray-400">
                    {badges.length} desbloqueada{badges.length !== 1 ? 's' : ''}
                  </p>
                </div>
              </div>

              <button
                onClick={onClose}
                className="w-8 h-8 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 
                          flex items-center justify-center transition-colors duration-200"
              >
                <X className="w-4 h-4 text-white/60 hover:text-white/80" />
              </button>
            </div>

            {/* Content compacto */}
            <div className="space-y-3 mb-6">
              {badges.length === 0 ? (
                <div className="text-center py-8">
                  <div className="w-12 h-12 mx-auto mb-4 rounded-xl bg-[#8b63e9]/10 border border-[#8b63e9]/20 flex items-center justify-center">
                    <Sparkles className="w-6 h-6 text-[#8b63e9]/60" />
                  </div>
                  <h3 className="text-lg font-medium text-white/80 mb-2">
                    Nenhuma conquista ainda
                  </h3>
                  <p className="text-sm text-gray-400 mb-4 max-w-sm mx-auto">
                    Clique em "Verificar" para descobrir suas conquistas ocultas
                  </p>
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 max-h-60 overflow-y-auto">
                  {badges.map((badge, index) => {
                    const config = rarityConfig[badge.rarity as keyof typeof rarityConfig];
                    return (
                      <motion.div
                        key={badge.id}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.05 }}
                        className={`p-4 rounded-xl border bg-gradient-to-br ${config.bg} ${config.border} hover:scale-[1.02] transition-transform duration-200`}
                      >
                        <div className="flex items-start gap-3">
                          <div className="text-xl flex-shrink-0">
                            {React.isValidElement(badge.icon) ? badge.icon : <span>{badge.icon}</span>}
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2 mb-1">
                              <h3 className="font-semibold text-white text-sm leading-tight truncate">
                                {badge.name}
                              </h3>
                              <span className={`text-xs px-1.5 py-0.5 rounded-md bg-white/10 ${config.text} font-medium uppercase tracking-wide flex-shrink-0`}>
                                {badge.rarity}
                              </span>
                            </div>
                            <p className="text-gray-300 text-xs leading-relaxed overflow-hidden" style={{ display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical' }}>
                              {badge.description}
                            </p>
                            {badge.earnedAt && (
                              <div className="flex items-center gap-1 text-xs text-gray-400 mt-2">
                                <Award className="w-3 h-3" />
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

            {/* Footer compacto */}
            <div className="flex flex-col items-center gap-3 pt-4 border-t border-white/10">
              <AnimatePresence>
                {showMessage && lastCheckMessage && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    className="px-3 py-2 bg-[#8b63e9]/10 border border-[#8b63e9]/20 rounded-lg text-white/90 text-sm text-center backdrop-blur-sm"
                  >
                    {lastCheckMessage}
                  </motion.div>
                )}
              </AnimatePresence>

              <button
                onClick={handleCheckBadges}
                disabled={isLoading}
                className="px-6 py-2.5 bg-gradient-to-r from-[#8b63e9] to-[#FFD700] text-[#161221] font-medium rounded-xl 
                          hover:shadow-lg hover:shadow-[#8b63e9]/25 transition-all duration-200 
                          disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
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
                    Verificar
                  </>
                )}
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default BadgeModal;
