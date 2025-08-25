// src/components/auth/FeatureGate.tsx

import type { FC } from 'react';
import { motion } from 'framer-motion';
import { Button } from '../ui/Button';
import { useUIStore } from '../../store/uiStore';
import { Lock, Sparkles } from 'lucide-react';

interface FeatureGateProps {
  title: string;
  description: string;
}

export const FeatureGate: FC<FeatureGateProps> = ({ title, description }) => {
  const openAuthModal = useUIStore((state) => state.openAuthModal);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className="w-full max-w-lg mx-auto text-center bg-surface/30 border border-surface rounded-2xl p-8 mt-12"
    >
      <div className="w-16 h-16 mx-auto rounded-full bg-surface flex items-center justify-center mb-4">
        <Lock size={32} className="text-accent" />
      </div>
      <h2 className="font-serif text-3xl text-white">{title}</h2>
      <p className="text-text-muted mt-2">
        {description}
      </p>
      <Button 
        variant="primary" 
        className="mt-6 px-8 py-3 text-base"
        onClick={() => openAuthModal('register')} // Abre o modal de registro
      >
        <Sparkles size={18} className="mr-2" />
        Desbloquear com uma conta
      </Button>
    </motion.div>
  );
};