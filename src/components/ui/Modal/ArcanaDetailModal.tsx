import { Dialog, DialogPanel, DialogTitle, Transition } from '@headlessui/react';
import type { FC } from 'react';
import type { MajorArcana } from '../../../../backend/src/domain/types';
import { X, Sparkles, Star, Eye, Moon, Sun } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface ArcanaDetailModalProps {
  isOpen: boolean;
  onClose: () => void;
  arcana: MajorArcana | null;
}

export const ArcanaDetailModal: FC<ArcanaDetailModalProps> = ({ isOpen, onClose, arcana }) => {
  if (!arcana) return null;

  return (
    <AnimatePresence mode="wait">
      {isOpen && (
        <Transition appear show={isOpen}>
          <Dialog as="div" className="relative z-50" onClose={onClose}>
            {/* Backdrop premium com blur e gradiente */}
            <motion.div
              className="fixed inset-0 bg-gradient-to-br from-black/70 via-black/80 to-[#161221]/90 backdrop-blur-md"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.4 }}
            />

            <div className="fixed inset-0 flex w-screen items-center justify-center p-4">
              <motion.div
                initial={{ 
                  opacity: 0, 
                  scale: 0.8, 
                  rotateX: -15,
                  y: 50
                }}
                animate={{ 
                  opacity: 1, 
                  scale: 1, 
                  rotateX: 0,
                  y: 0
                }}
                exit={{ 
                  opacity: 0, 
                  scale: 0.9,
                  rotateX: 10,
                  y: -30
                }}
                transition={{ 
                  duration: 0.5,
                  type: "spring",
                  stiffness: 300,
                  damping: 30
                }}
                className="relative"
                style={{ transformStyle: 'preserve-3d' }}
              >
                <DialogPanel className="max-w-3xl w-full space-y-6 rounded-3xl bg-gradient-to-br from-[#2f2546]/95 via-[#1a1625] to-[#0f0a1a] border border-[#3d2f52]/60 p-8 shadow-2xl shadow-[#8b63e9]/20 backdrop-blur-lg relative overflow-hidden">
                  {/* Partículas de fundo animadas */}
                  <div className="absolute inset-0 overflow-hidden">
                    <motion.div
                      className="absolute top-6 right-6 text-[#FFD700]/30"
                      animate={{ 
                        rotate: 360,
                        scale: [1, 1.2, 1]
                      }}
                      transition={{ 
                        rotate: { duration: 20, repeat: Infinity, ease: "linear" },
                        scale: { duration: 4, repeat: Infinity }
                      }}
                    >
                      <Sparkles size={20} />
                    </motion.div>
                    
                    <motion.div
                      className="absolute top-12 left-8 text-[#8b63e9]/20"
                      animate={{ 
                        y: [-5, 5, -5],
                        opacity: [0.2, 0.6, 0.2]
                      }}
                      transition={{ 
                        duration: 6, 
                        repeat: Infinity,
                        delay: 1
                      }}
                    >
                      <Star size={16} />
                    </motion.div>

                    <motion.div
                      className="absolute bottom-8 right-12 text-[#FFD700]/25"
                      animate={{ rotate: -360 }}
                      transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
                    >
                      <Eye size={14} />
                    </motion.div>
                  </div>

                  {/* Brilho superior */}
                  <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#FFD700]/40 to-transparent" />
                  
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ 
                      delayChildren: 0.2,
                      staggerChildren: 0.1
                    }}
                  >
                    {/* Header premium com close button */}
                    <motion.div 
                      className="flex justify-between items-start"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5 }}
                    >
                      <div className="flex-1">
                        {/* Título com gradiente */}
                        <DialogTitle as="h3" className="text-4xl font-['Cinzel_Decorative'] bg-gradient-to-r from-[#FFD700] via-[#FFF] to-[#8b63e9] bg-clip-text text-transparent mb-3">
                          {arcana.name}
                        </DialogTitle>
                        
                        {/* Keywords premium */}
                        <div className="flex flex-wrap gap-2">
                          {arcana.keywords.map((keyword, index) => (
                            <motion.span
                              key={keyword}
                              className="px-3 py-1 text-xs bg-gradient-to-r from-[#8b63e9]/20 to-[#FFD700]/20 border border-[#8b63e9]/30 rounded-full text-[#FFD700] backdrop-blur-sm"
                              initial={{ opacity: 0, scale: 0 }}
                              animate={{ opacity: 1, scale: 1 }}
                              transition={{ delay: 0.3 + (index * 0.05), duration: 0.3 }}
                            >
                              {keyword}
                            </motion.span>
                          ))}
                        </div>
                      </div>
                      
                      {/* Close button premium */}
                      <motion.button 
                        onClick={onClose} 
                        className="p-3 rounded-2xl bg-gradient-to-br from-[#2f2546]/80 to-[#1a1625] border border-[#3d2f52]/50 hover:border-[#8b63e9]/60 text-gray-400 hover:text-[#FFD700] transition-all duration-300 backdrop-blur-sm group relative"
                        whileHover={{ scale: 1.05, rotate: 5 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <X size={20} className="group-hover:rotate-90 transition-transform duration-300" />
                        
                        {/* Glow effect */}
                        <div className="absolute inset-0 rounded-2xl bg-[#8b63e9]/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                      </motion.button>
                    </motion.div>

                    {/* Descrição principal premium */}
                    <motion.div
                      className="relative"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: 0.1 }}
                    >
                      <div className="absolute -left-4 top-0 w-1 h-full bg-gradient-to-b from-[#FFD700]/50 via-[#8b63e9]/50 to-transparent rounded-full" />
                      <p className="text-lg text-gray-200 leading-relaxed font-['Noto_Sans'] pl-6">
                        {arcana.longDescription}
                      </p>
                    </motion.div>
                    
                    {/* Seção de conselhos ultra premium */}
                    <motion.div 
                      className="!mt-8 pt-6 border-t border-gradient-to-r from-[#8b63e9]/30 via-[#FFD700]/20 to-[#8b63e9]/30 relative"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: 0.2 }}
                    >
                      {/* Título da seção */}
                      <motion.div className="flex items-center mb-6">
                        <Moon className="text-[#FFD700] mr-3" size={24} />
                        <h4 className="font-['Marcellus_SC'] text-2xl text-[#FFD700]">Sabedoria do Arcano</h4>
                        <Sun className="text-[#8b63e9] ml-3" size={24} />
                      </motion.div>
                      
                      {/* Cards de conselhos */}
                      <div className="grid gap-4">
                        {/* Luz */}
                        <motion.div 
                          className="p-5 rounded-2xl bg-gradient-to-r from-green-500/10 via-green-400/5 to-transparent border border-green-400/30 relative overflow-hidden group"
                          whileHover={{ scale: 1.02, y: -2 }}
                          transition={{ type: "spring", stiffness: 300 }}
                        >
                          <div className="absolute inset-0 bg-green-400/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                          <div className="relative">
                            <h5 className="font-['Marcellus_SC'] text-green-400 text-lg mb-3 flex items-center">
                              <Sun size={18} className="mr-2" />
                              Luz • Aproveite esta energia
                            </h5>
                            <p className="text-gray-300 leading-relaxed">{arcana.light}</p>
                          </div>
                        </motion.div>

                        {/* Sombra */}
                        <motion.div 
                          className="p-5 rounded-2xl bg-gradient-to-r from-red-500/10 via-red-400/5 to-transparent border border-red-400/30 relative overflow-hidden group"
                          whileHover={{ scale: 1.02, y: -2 }}
                          transition={{ type: "spring", stiffness: 300 }}
                        >
                          <div className="absolute inset-0 bg-red-400/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                          <div className="relative">
                            <h5 className="font-['Marcellus_SC'] text-red-400 text-lg mb-3 flex items-center">
                              <Moon size={18} className="mr-2" />
                              Sombra • Mantenha atenção
                            </h5>
                            <p className="text-gray-300 leading-relaxed">{arcana.shadow}</p>
                          </div>
                        </motion.div>

                        {/* Direção */}
                        <motion.div 
                          className="p-5 rounded-2xl bg-gradient-to-r from-blue-500/10 via-blue-400/5 to-transparent border border-blue-400/30 relative overflow-hidden group"
                          whileHover={{ scale: 1.02, y: -2 }}
                          transition={{ type: "spring", stiffness: 300 }}
                        >
                          <div className="absolute inset-0 bg-blue-400/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                          <div className="relative">
                            <h5 className="font-['Marcellus_SC'] text-blue-400 text-lg mb-3 flex items-center">
                              <Eye size={18} className="mr-2" />
                              Direção • Caminho sugerido
                            </h5>
                            <p className="text-gray-300 leading-relaxed">{arcana.advice}</p>
                          </div>
                        </motion.div>
                      </div>
                    </motion.div>
                  </motion.div>

                  {/* Efeito de borda mágica */}
                  <div className="absolute inset-0 rounded-3xl pointer-events-none">
                    <motion.div 
                      className="absolute inset-0 rounded-3xl border border-[#FFD700]/20 opacity-80"
                      animate={{ 
                        boxShadow: [
                          '0 0 20px rgba(255, 215, 0, 0.1)',
                          '0 0 40px rgba(139, 99, 233, 0.2)',
                          '0 0 20px rgba(255, 215, 0, 0.1)'
                        ]
                      }}
                      transition={{ duration: 4, repeat: Infinity }}
                    />
                  </div>
                </DialogPanel>
              </motion.div>
            </div>
          </Dialog>
        </Transition>
      )}
    </AnimatePresence>
  );
};