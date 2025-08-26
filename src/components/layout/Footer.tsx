// src/components/layout/Footer.tsx

import { useState } from 'react';
import type { FC, FormEvent } from 'react';
import { motion } from 'framer-motion';
import { Instagram, Twitter, Youtube, Send, LoaderCircle, Check } from 'lucide-react';
import { Button } from '../ui/Button';
import { subscribeToNewsletter } from '../../services/newsletterService';

// Dados dos links para manter o JSX limpo
const socialLinks = [
  { label: "Instagram", href: "#", icon: Instagram },
  { label: "Twitter", href: "#", icon: Twitter },
  { label: "Youtube", href: "#", icon: Youtube },
];

// Variantes para a animação em cascata (stagger)
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.15, delayChildren: 0.2 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { type: 'spring' as const } },
};

// Um componente local para o divisor, para manter o JSX principal limpo
const OrnamentalDivider: FC = () => (
  <motion.div variants={itemVariants} className="w-full max-w-xs mx-auto my-8">
    <svg width="100%" height="2" viewBox="0 0 280 2" fill="none" xmlns="http://www.w3.org/2000/svg">
      <line y1="1" x2="110" y2="1" stroke="url(#paint0_linear_2_10)" strokeOpacity="0.5"/>
      <line x1="170" y1="1" x2="280" y2="1" stroke="url(#paint1_linear_2_10)" strokeOpacity="0.5"/>
      <defs>
        <linearGradient id="paint0_linear_2_10" x1="110" y1="1.5" x2="0" y2="1.5" gradientUnits="userSpaceOnUse">
          <stop stopColor="#8b63e9"/>
          <stop offset="1" stopColor="#8b63e9" stopOpacity="0"/>
        </linearGradient>
        <linearGradient id="paint1_linear_2_10" x1="170" y1="0.5" x2="280" y2="0.5" gradientUnits="userSpaceOnUse">
          <stop stopColor="#8b63e9"/>
          <stop offset="1" stopColor="#8b63e9" stopOpacity="0"/>
        </linearGradient>
      </defs>
      <motion.circle cx="140" cy="1" r="1" fill="#FFD700"
        animate={{ scale: [1, 1.5, 1], opacity: [0.7, 1, 0.7] }}
        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
      />
    </svg>
  </motion.div>
);

export const Footer: FC = () => {
  const [email, setEmail] = useState('');
  const [formState, setFormState] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');
  const [message, setMessage] = useState('');

  const handleNewsletterSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!email) return;

    setFormState('sending');
    setMessage('');

    try {
      await subscribeToNewsletter(email);
      setFormState('success');
      setMessage('Inscrição confirmada! Fique de olho na sua caixa de entrada.');
      setEmail('');
      // Reseta para o estado inicial após um tempo
      setTimeout(() => setFormState('idle'), 3000);
    } catch (error: any) {
      setFormState('error');
      setMessage(error.message || 'Ocorreu um erro. Tente novamente.');
      // Permite que o usuário tente de novo após um tempo
      setTimeout(() => setFormState('idle'), 3000);
    }
  };

  return (
    <motion.footer
      className="bg-[#110E1B] py-16 px-6"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.3 }}
      variants={containerVariants}
    >
      <div className="max-w-xl mx-auto flex flex-col items-center text-center">
        
        <motion.div variants={itemVariants}>
          <h2 className="font-serif-logo text-2xl font-bold tracking-widest uppercase text-white">Arcano</h2>
          <p className="text-sm text-[rgb(var(--color-text-muted))] mt-1">
            Seu guia para as estrelas e os arquétipos.
          </p>
        </motion.div>

        <OrnamentalDivider />

        <motion.div variants={itemVariants} className="w-full">
          <p className="text-white mb-3 font-serif">Receba insights semanais</p>
          <form onSubmit={handleNewsletterSubmit} className="flex max-w-sm mx-auto">
            <input 
              type="email" 
              placeholder="seu.email@exemplo.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              disabled={formState === 'sending' || formState === 'success'}
              required
              className="peer w-full rounded-l-full bg-[#2f2546] text-white placeholder:text-[#a495c6]/60 h-12 p-4 text-base border-2 border-transparent focus:outline-none focus:border-[#FFD700]/50 focus:ring-2 focus:ring-[#FFD700] transition-all disabled:opacity-50"
            />
            <Button
              type="submit"
              variant="primary"
              className="rounded-r-full rounded-l-none h-12 px-5 shrink-0"
              aria-label="Inscrever-se na newsletter"
              disabled={formState === 'sending' || formState === 'success'}
            >
              {formState === 'idle' && <Send size={20} />}
              {formState === 'sending' && <LoaderCircle size={20} className="animate-spin" />}
              {formState === 'success' && <Check size={20} />}
              {formState === 'error' && <Send size={20} />}
            </Button>
          </form>
          {/* Feedback dinâmico para o usuário */}
          {message && (
            <p className={`mt-3 text-sm transition-opacity duration-300 ${formState === 'success' ? 'text-green-400' : 'text-red-400'}`}>
              {message}
            </p>
          )}
        </motion.div>

        <motion.div 
          variants={itemVariants}
          className="flex gap-6 mt-10 text-[rgb(var(--color-text-muted))]"
        >
          {socialLinks.map((social) => (
            <motion.a
              key={social.label}
              href={social.href}
              aria-label={social.label}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ 
                scale: 1.2, 
                color: 'rgb(var(--color-accent))',
                boxShadow: '0px 0px 20px rgba(139, 99, 233, 0.5)'
              }}
              className="p-2 rounded-full"
              transition={{ type: 'spring', stiffness: 300 }}
            >
              <social.icon size={22} />
            </motion.a>
          ))}
        </motion.div>

        <motion.div 
          variants={itemVariants}
          className="mt-12 text-center text-xs text-[rgb(var(--color-text-muted))] opacity-60"
        >
          © {new Date().getFullYear()} Arcano — Todos os direitos reservados.
        </motion.div>

      </div>
    </motion.footer>
  );
};