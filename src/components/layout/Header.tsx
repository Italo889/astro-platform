// src/components/layout/Header.tsx

import { useState, useEffect } from 'react';
import type { FC } from 'react';
import { motion, AnimatePresence, type Variants } from 'framer-motion';
import { Link } from 'react-router-dom'; // Para o link do Dashboard
import { Button } from '../ui/Button';
import { Menu, X, Sparkle, WandSparkles, KeyRound } from 'lucide-react';
import { LogoSymbol } from '../ui/LogoSymbol';
import { useUIStore } from '../../store/uiStore';
import { useAuthStore } from '../../store/authStore'; // Importando o store de autenticação

const navLinks = [
  { label: "Mapa Astral", href: "#formulario" },
  { label: "Tarot", href: "#insight" },
  { label: "Sinastria", href: "/sinastria" },
  { label: "Blog", href: "#" },
];

const menuContainerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.15, delayChildren: 0.2 },
  },
};

const menuItemVariants: Variants = {
  hidden: { opacity: 0, x: -30 },
  visible: { 
    opacity: 1, 
    x: 0,
    transition: { type: "spring", stiffness: 120, damping: 15 } 
  },
};

export const Header: FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [hasScrolled, setHasScrolled] = useState(false);
  const openAuthModal = useUIStore((state) => state.openAuthModal);
  
  // Lendo o estado de autenticação
  const { user, logout } = useAuthStore();

  useEffect(() => {
    const handleScroll = () => {
      setHasScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  return (
    <>
      <motion.header 
        className={`flex items-center justify-between px-4 md:px-10 sticky top-0 z-50 transition-all duration-300 bg-[rgb(var(--color-background))]/80 backdrop-blur-md ${
          hasScrolled 
            ? 'py-3 border-b border-white/5 shadow-lg shadow-black/20' 
            : 'py-6'
        }`}
      >
        {/* ESTRUTURA DESKTOP */}
        <div className="hidden md:flex w-full items-center">
          <nav className="flex items-center justify-start gap-6 w-1/3">
            {navLinks.slice(0, 2).map((link) => (
              <a 
                key={link.label} 
                href={link.href}
                className="relative px-3 py-2 text-sm font-medium text-[rgb(var(--color-text-muted))] hover:text-white transition-colors group rounded-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[rgb(var(--color-primary))] focus-visible:ring-offset-[rgb(var(--color-background))]"
              >
                {link.label}
              </a>
            ))}
          </nav>

          <div className="flex justify-center w-1/3">
            <a href="/" className="flex items-center gap-4 group rounded-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[rgb(var(--color-primary))] focus-visible:ring-offset-[rgb(var(--color-background))]">
              <LogoSymbol className="text-[rgb(var(--color-accent))] transition-colors duration-300 group-hover:text-[rgb(var(--color-primary))]"/>
              <h2 className="font-serif-logo text-xl font-bold tracking-widest uppercase transition-colors duration-300 group-hover:text-white">
                Arcano
              </h2>
            </a>
          </div>

          <div className="flex items-center justify-end gap-6 w-1/3">
            <nav className="flex items-center justify-end gap-6">
              {navLinks.slice(2, 4).map((link) => (
                 <a 
                    key={link.label} 
                    href={link.href} 
                    className="relative px-3 py-2 text-sm font-medium text-[rgb(var(--color-text-muted))] hover:text-white transition-colors group rounded-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[rgb(var(--color-primary))] focus-visible:ring-offset-[rgb(var(--color-background))]"
                  >
                   {link.label}
                 </a>
              ))}
            </nav>
            {/* Renderização condicional dos botões de ação */}
            <div className="flex gap-2 items-center">
              {user ? (
                <>
                  <Link to="/dashboard" className="text-sm text-text-muted hover:text-white transition-colors hidden lg:inline p-2 rounded-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[rgb(var(--color-primary))]">
                    Olá, {user.name.split(' ')[0]}
                  </Link>
                  <Button variant="ghost" className="px-5 py-2 text-sm" onClick={logout}>
                    Sair
                  </Button>
                </>
              ) : (
                <>
                  <Button variant="secondary" className="px-5 py-2 text-sm" onClick={() => openAuthModal('register')}>
                    <WandSparkles size={16} className="opacity-80" />
                    <span>Iniciar Jornada</span>
                  </Button>
                  <Button variant="ghost" className="px-5 py-2 text-sm" onClick={() => openAuthModal('login')}>
                    <KeyRound size={16} className="opacity-80" />
                    <span>Meu Oráculo</span>
                  </Button>
                </>
              )}
            </div>
          </div>
        </div>

        {/* ESTRUTURA MOBILE */}
        <div className="md:hidden flex w-full justify-between items-center">
          <a href="/" className="flex items-center gap-3 p-2 rounded-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[rgb(var(--color-primary))]">
             <LogoSymbol className="text-[rgb(var(--color-accent))]"/>
             <h2 className="font-serif-logo text-lg font-bold tracking-widest uppercase">Arcano</h2>
          </a>
          <div>
            <button 
              onClick={toggleMenu} 
              className="p-2 relative z-50 rounded-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[rgb(var(--color-primary))]" 
              aria-label="Abrir menu"
            >
              <AnimatePresence mode="wait">
                <motion.div
                  key={isMenuOpen ? 'close' : 'open'}
                  initial={{ rotate: -90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: 90, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  {isMenuOpen ? <X size={24} className="text-white"/> : <Menu size={24} />}
                </motion.div>
              </AnimatePresence>
            </button>
          </div>
        </div>
      </motion.header>

      {/* OVERLAY DO MENU MOBILE */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
            className="fixed inset-0 z-40"
          >
            <div className="absolute inset-0 bg-[rgb(var(--color-background))]">
              <div className="absolute inset-0 bg-radial-gradient from-[rgb(var(--color-surface))]/30 to-transparent animate-spin-slow" />
            </div>
            <motion.nav 
              variants={menuContainerVariants}
              initial="hidden"
              animate="visible"
              exit="hidden"
              className="h-full flex flex-col items-center justify-center gap-8"
            >
              {navLinks.map((link) => (
                <motion.div key={link.label} variants={menuItemVariants}>
                   <a href={link.href} className="group flex items-center gap-4 rounded-md p-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[rgb(var(--color-primary))]" onClick={toggleMenu}>
                     <Sparkle size={16} className="text-[rgb(var(--color-text-muted))] transition-colors group-hover:text-[rgb(var(--color-primary))]"/>
                     <span className="font-serif text-3xl text-white transition-colors group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-white group-hover:to-[rgb(var(--color-primary))] group-hover:bg-clip-text">
                       {link.label}
                     </span>
                   </a>
                </motion.div>
              ))}
              <motion.div variants={menuItemVariants} className="mt-10 flex flex-col gap-4 w-56">
                 {user ? (
                    <Button variant="ghost" className="w-full py-3 text-base" onClick={logout}>Sair</Button>
                 ) : (
                    <>
                      <Button variant="secondary" className="w-full py-3 text-base" onClick={() => { openAuthModal('register'); toggleMenu(); }}>
                        <WandSparkles size={18} className="opacity-80" />
                        <span>Iniciar Jornada</span>
                      </Button>
                      <Button variant="ghost" className="w-full py-3 text-base" onClick={() => { openAuthModal('login'); toggleMenu(); }}>
                        <KeyRound size={18} className="opacity-80" />
                        <span>Meu Oráculo</span>
                      </Button>
                    </>
                 )}
              </motion.div>
            </motion.nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};