// src/components/features/report/ArcanaDetailModal.tsx
import { Dialog, DialogPanel, DialogTitle, Transition, TransitionChild } from '@headlessui/react';
import { motion, AnimatePresence } from 'framer-motion';
import type { FC } from 'react';
import type { MajorArcana } from '../../../domain/types';
import { X, Sparkles, Eye, EyeOff, Compass, ChevronDown } from 'lucide-react';
import { useState, useEffect } from 'react';

interface ArcanaDetailModalProps {
  isOpen: boolean;
  onClose: () => void;
  arcana: MajorArcana | null;
}

// Sub-componente para os "Pilares de Sabedoria" seguindo o guia de estilo Arcano
const GuidancePillar: FC<{ 
  label: string; 
  value: string; 
  icon: React.ReactNode; 
  colorClass: string; 
  delay: number 
}> = ({ label, value, icon, colorClass, delay }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  
  return (
    <motion.div
      className="rounded-xl border border-accent/10 p-4 transition-all duration-500 cursor-pointer group hover:border-accent/30"
      style={{
        background: 'linear-gradient(135deg, var(--color-surface) 0%, rgba(47, 37, 70, 0.4) 100%)'
      }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay, ease: 'easeOut' }}
      onClick={() => setIsExpanded(!isExpanded)}
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full border border-accent/10 bg-gradient-to-br from-surface to-background shadow-lg transition-shadow group-hover:shadow-xl">
            <div className={colorClass}>
              {icon}
            </div>
          </div>
          <h4 className={`font-marcellus text-lg font-medium ${colorClass}`}>{label}</h4>
        </div>
        <motion.div
          animate={{ rotate: isExpanded ? 180 : 0 }}
          transition={{ duration: 0.3 }}
          className="text-text-muted"
        >
          <ChevronDown size={20} />
        </motion.div>
      </div>
      <motion.div
        initial={{ height: 0, opacity: 0 }}
        animate={{ height: isExpanded ? 'auto' : 0, opacity: isExpanded ? 1 : 0 }}
        transition={{ duration: 0.3 }}
        className="overflow-hidden"
      >
        <div className="border-t border-accent/10 pl-2 pt-2">
          <p className="text-sm leading-relaxed text-text-muted">{value}</p>
        </div>
      </motion.div>
    </motion.div>
  );
};

export const ArcanaDetailModal: FC<ArcanaDetailModalProps> = ({ isOpen, onClose, arcana }) => {
  const [revealState, setRevealState] = useState<'hidden' | 'revealing' | 'revealed'>('hidden');
  
  useEffect(() => {
    if (isOpen && arcana) {
      setRevealState('hidden');
      setTimeout(() => setRevealState('revealing'), 300);
      setTimeout(() => setRevealState('revealed'), 1200);
    }
  }, [isOpen, arcana]);

  if (!arcana) return null;

  const imageUrl = `/images/arcana/${arcana.id}.webp`;

  return (
    <Transition appear show={isOpen} as="div">
      <Dialog as="div" className="relative z-50" onClose={onClose}>
        <TransitionChild
          as="div"
          enter="ease-out duration-500"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-300"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          {/* Backdrop seguindo o padrão do guia - Fundo Cósmico */}
          <div 
            className="fixed inset-0 backdrop-blur-xl" 
            style={{
              background: 'linear-gradient(135deg, var(--color-background) 0%, #1e1838 50%, var(--color-background) 100%)'
            }}
          />
          
          {/* Efeito de partículas cósmicas usando as cores do sistema */}
          <div className="fixed inset-0 overflow-hidden">
            {[...Array(15)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute h-1 w-1 rounded-full bg-primary"
                initial={{ 
                  opacity: 0,
                  x: Math.random() * (typeof window !== 'undefined' ? window.innerWidth : 1000),
                  y: Math.random() * (typeof window !== 'undefined' ? window.innerHeight : 800),
                }}
                animate={{ 
                  opacity: [0, 0.8, 0],
                  scale: [0, 1.5, 0],
                }}
                transition={{
                  duration: 3 + Math.random() * 2,
                  repeat: Infinity,
                  delay: Math.random() * 2,
                }}
              />
            ))}
          </div>
        </TransitionChild>

        <div className="fixed inset-0 w-screen overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4">
            <TransitionChild
              as="div"
              className="w-full max-w-5xl"
              enter="ease-out duration-700"
              enterFrom="opacity-0 scale-95 translate-y-10"
              enterTo="opacity-100 scale-100 translate-y-0"
              leave="ease-in duration-300"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <DialogPanel 
                className="relative transform overflow-hidden rounded-3xl border border-accent/20 shadow-2xl backdrop-blur-md transition-all"
                style={{
                  background: 'linear-gradient(135deg, rgba(47, 37, 70, 0.8) 0%, rgba(22, 18, 33, 0.9) 100%)',
                  boxShadow: '0 25px 50px -12px rgba(255, 215, 0, 0.15), 0 0 0 1px rgba(139, 99, 233, 0.1)'
                }}
              >
                
                {/* Efeito de brilho orbital seguindo as cores do sistema */}
                <motion.div 
                  className="absolute -inset-2 -z-10 rounded-3xl opacity-30"
                  style={{
                    background: 'linear-gradient(45deg, var(--color-primary), var(--color-accent), var(--color-primary))'
                  }}
                  animate={{ rotate: 360 }}
                  transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
                />
                
                <AnimatePresence>
                  {isOpen && (
                    <div className="grid grid-cols-1 md:grid-cols-5 min-h-[600px]">
                      
                      {/* Coluna da Imagem - O Santuário do Arcano */}
                      <motion.div
                        className="md:col-span-2 relative flex flex-col items-center justify-center overflow-hidden p-8"
                        initial={{ opacity: 0, x: -50 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.7, delay: 0.2, ease: [0.4, 0, 0.2, 1] }}
                      >
                        {/* Glifo cósmico de fundo usando as cores do sistema */}
                        <motion.div 
                          className="absolute inset-0 -z-10 opacity-10"
                          animate={{ rotate: 360 }}
                          transition={{ duration: 120, repeat: Infinity, ease: "linear" }}
                        >
                          <svg viewBox="0 0 100 100" className="h-full w-full">
                            <circle cx="50" cy="50" r="45" stroke="url(#arcanoGradient)" strokeWidth="0.3" fill="none" />
                            <path d="M50,5 A45,45 0 1,1 49,5" stroke="url(#arcanoGradient)" strokeWidth="0.3" fill="none" />
                            <defs>
                              <linearGradient id="arcanoGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                                <stop offset="0%" stopColor="var(--color-primary)" />
                                <stop offset="100%" stopColor="var(--color-accent)" />
                              </linearGradient>
                            </defs>
                          </svg>
                        </motion.div>

                        {/* Brilho pulsante */}
                        <motion.div 
                          className="absolute inset-0 -z-10 rounded-full opacity-20"
                          style={{
                            background: 'radial-gradient(circle at center, var(--color-accent), transparent 70%)'
                          }}
                          animate={{ opacity: [0.1, 0.3, 0.1] }}
                          transition={{ duration: 4, repeat: Infinity }}
                        />
                        
                        <motion.div 
                          className="relative rounded-2xl border border-accent/30 p-2 shadow-2xl"
                          style={{
                            background: 'linear-gradient(135deg, var(--color-background) 0%, var(--color-surface) 100%)'
                          }}
                          initial={{ scale: 0.8, rotate: -5 }}
                          animate={{ scale: 1, rotate: 0 }}
                          transition={{ type: "spring", damping: 12, delay: 0.5 }}
                          whileHover={{ scale: 1.02 }}
                        >
                          {/* Efeito de revelação progressiva - conceito "Arcano que se Revela" */}
                          <motion.div
                            className="absolute inset-0 z-10 rounded-2xl"
                            style={{ background: 'var(--color-background)' }}
                            initial={{ opacity: 1 }}
                            animate={{ opacity: revealState === 'hidden' ? 1 : 0 }}
                            transition={{ duration: 1.2 }}
                          />
                          
                          <img
                            src={imageUrl}
                            alt={`Carta do Tarô: ${arcana.name}`}
                            width={240}
                            height={400}
                            className="rounded-xl"
                          />
                          
                          {/* Efeito de brilho na carta */}
                          <motion.div
                            className="absolute inset-0 rounded-xl opacity-0"
                            style={{
                              background: 'linear-gradient(to bottom, rgba(255, 215, 0, 0.1) 0%, transparent 100%)'
                            }}
                            whileHover={{ opacity: 1 }}
                            transition={{ duration: 0.3 }}
                          />
                        </motion.div>
                        
                        {/* Elemento decorativo inferior */}
                        <motion.div 
                          className="absolute bottom-6 h-1 w-24 rounded-full"
                          style={{
                            background: 'linear-gradient(to right, transparent 0%, var(--color-primary) 50%, transparent 100%)'
                          }}
                          initial={{ scaleX: 0 }}
                          animate={{ scaleX: 1 }}
                          transition={{ delay: 1, duration: 1 }}
                        />
                      </motion.div>

                      {/* Coluna de Conteúdo - O Pergaminho Cósmico */}
                      <motion.div 
                        className="md:col-span-3 relative flex flex-col p-6 md:p-8"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.7, delay: 0.4 }}
                      >
                        <button 
                          onClick={onClose} 
                          className="absolute top-4 right-4 z-10 rounded-full p-2 text-text-muted backdrop-blur-sm transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
                          style={{
                            background: 'rgba(47, 37, 70, 0.5)'
                          }}
                          onMouseEnter={(e) => {
                            e.currentTarget.style.background = 'rgba(139, 99, 233, 0.2)';
                            e.currentTarget.style.color = 'var(--color-primary)';
                          }}
                          onMouseLeave={(e) => {
                            e.currentTarget.style.background = 'rgba(47, 37, 70, 0.5)';
                            e.currentTarget.style.color = 'var(--color-text-muted)';
                          }}
                          aria-label="Fechar modal"
                        >
                          <X size={22} />
                        </button>

                        <motion.div 
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.5, delay: 0.6 }}
                        >
                          <div className="mb-2 flex items-start justify-between">
                            <DialogTitle as="h3" className="font-cinzel text-4xl uppercase tracking-wider text-primary md:text-5xl">
                              {arcana.name}
                            </DialogTitle>
                            
                            <motion.div
                              initial={{ scale: 0 }}
                              animate={{ scale: 1 }}
                              transition={{ type: "spring", delay: 0.8 }}
                              whileHover={{ rotate: 15, scale: 1.1 }}
                              className="text-primary"
                            >
                              <Sparkles size={28} fill="currentColor" />
                            </motion.div>
                          </div>
                          
                          <div className="mt-4 flex flex-wrap gap-2">
                            {arcana.keywords.map((keyword, index) => (
                              <motion.span 
                                key={keyword}
                                className="rounded-full border border-primary/20 bg-primary/10 px-3 py-1.5 text-xs font-medium text-primary"
                                initial={{ opacity: 0, scale: 0 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ delay: 0.8 + (index * 0.1) }}
                                whileHover={{ scale: 1.05 }}
                                onMouseEnter={(e) => {
                                  e.currentTarget.style.backgroundColor = 'rgba(255, 215, 0, 0.2)';
                                }}
                                onMouseLeave={(e) => {
                                  e.currentTarget.style.backgroundColor = 'rgba(255, 215, 0, 0.1)';
                                }}
                              >
                                {keyword}
                              </motion.span>
                            ))}
                          </div>
                        </motion.div>

                        <motion.div 
                          className="my-6 max-h-[140px] overflow-y-auto border-l-2 border-primary/30 pl-4 pr-4 text-base leading-relaxed text-text-base"
                          style={{
                            scrollbarWidth: 'thin',
                            scrollbarColor: 'rgba(47, 37, 70, 0.5) transparent'
                          }}
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          transition={{ duration: 0.7, delay: 0.9 }}
                        >
                          {arcana.longDescription}
                        </motion.div>

                        <motion.div 
                          className="mt-auto border-t border-accent/20 pt-6"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          transition={{ duration: 0.7, delay: 1.0 }}
                        >
                          <div className="mb-5 flex items-center gap-2">
                            <Compass size={24} className="text-primary" />
                            <h4 className="font-marcellus text-2xl text-text-base">Sabedoria do Arcano</h4>
                          </div>
                          
                          <div className="space-y-4">
                            <GuidancePillar 
                              label="Luz (Aproveite)" 
                              value={arcana.light} 
                              icon={<Sparkles size={20} />} 
                              colorClass="text-emerald-400" 
                              delay={1.1} 
                            />
                            <GuidancePillar 
                              label="Sombra (Atenção)" 
                              value={arcana.shadow} 
                              icon={<EyeOff size={20} />} 
                              colorClass="text-rose-400" 
                              delay={1.2} 
                            />
                            <GuidancePillar 
                              label="Direção (Aja)" 
                              value={arcana.advice} 
                              icon={<Eye size={20} />} 
                              colorClass="text-sky-400" 
                              delay={1.3} 
                            />
                          </div>
                        </motion.div>
                      </motion.div>
                    </div>
                  )}
                </AnimatePresence>
              </DialogPanel>
            </TransitionChild>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
};