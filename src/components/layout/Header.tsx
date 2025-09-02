// src/components/layout/Header.tsx

import { useState, useEffect } from 'react';
import type { FC } from 'react';
import { motion, AnimatePresence, type Variants } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Button } from '../ui/Button';
import { Menu, X, WandSparkles, KeyRound } from 'lucide-react';
import { LogoSymbol } from '../ui/LogoSymbol';
import { useBadges } from '../../hooks/useBadges';
import { useUIStore } from '../../store/uiStore';
import { useAuthStore } from '../../store/authStore';

// Ícones customizados premium
const AstralMapIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" className="transition-all duration-300">
    <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="1.5" fill="none" opacity="0.3"/>
    <circle cx="12" cy="7" r="1.5" fill="currentColor"/>
    <circle cx="7" cy="12" r="1" fill="currentColor" opacity="0.7"/>
    <circle cx="17" cy="12" r="1" fill="currentColor" opacity="0.7"/>
    <circle cx="12" cy="17" r="1.5" fill="currentColor"/>
    <path d="M12 7L12 2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
    <path d="M12 22L12 17" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
    <path d="M7 12L2 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
    <path d="M22 12L17 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
  </svg>
);

const TarotCardIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" className="transition-all duration-300">
    <rect x="6" y="4" width="12" height="16" rx="2" stroke="currentColor" strokeWidth="1.5" fill="none" opacity="0.3"/>
    <rect x="8" y="6" width="8" height="4" rx="1" fill="currentColor" opacity="0.5"/>
    <circle cx="12" cy="14" r="2" stroke="currentColor" strokeWidth="1.5" fill="none"/>
    <path d="M10 16L14 16" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
    <path d="M11 18L13 18" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
    <path d="M12 8L12 10" stroke="currentColor" strokeWidth="1" strokeLinecap="round"/>
  </svg>
);

const SynastryIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" className="transition-all duration-300">
    <circle cx="9" cy="9" r="6" stroke="currentColor" strokeWidth="1.5" fill="none" opacity="0.4"/>
    <circle cx="15" cy="15" r="6" stroke="currentColor" strokeWidth="1.5" fill="none" opacity="0.4"/>
    <circle cx="9" cy="9" r="2" fill="currentColor"/>
    <circle cx="15" cy="15" r="2" fill="currentColor"/>
    <path d="M12 12L13 13" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
    <path d="M6 6L5 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
    <path d="M19 19L18 18" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
  </svg>
);

const CosmicBlogIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" className="transition-all duration-300">
    <path d="M4 6h16M4 10h16M4 14h12M4 18h8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
    <circle cx="19" cy="16" r="3" stroke="currentColor" strokeWidth="1.5" fill="none" opacity="0.4"/>
    <circle cx="19" cy="16" r="1" fill="currentColor"/>
    <path d="M17 14L16 13" stroke="currentColor" strokeWidth="1" strokeLinecap="round"/>
    <path d="M21 18L22 19" stroke="currentColor" strokeWidth="1" strokeLinecap="round"/>
  </svg>
);

const navLinks = [
  { label: "Mapa Astral", href: "#formulario", icon: AstralMapIcon },
  { label: "Tarot", href: "#insight", icon: TarotCardIcon },
  { label: "Sinastria", href: "/sinastria", icon: SynastryIcon },
  { label: "Blog", href: "#", icon: CosmicBlogIcon },
];

const menuContainerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.08, delayChildren: 0.1 },
  },
  exit: {
    opacity: 0,
    transition: { staggerChildren: 0.04, staggerDirection: -1 }
  }
};

const menuItemVariants: Variants = {
  hidden: { opacity: 0, y: 30, scale: 0.95 },
  visible: { 
    opacity: 1, 
    y: 0,
    scale: 1,
    transition: { duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] } 
  },
  exit: { 
    opacity: 0, 
    y: -20, 
    scale: 0.95,
    transition: { duration: 0.25 }
  }
};

export const Header: FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [hasScrolled, setHasScrolled] = useState(false);
  const openAuthModal = useUIStore((state) => state.openAuthModal);
  
  const { user, logout } = useAuthStore();
  const { isBetaTester } = useBadges();

  useEffect(() => {
    const handleScroll = () => {
      setHasScrolled(window.scrollY > 10);
    };
    
    window.addEventListener('scroll', handleScroll, { passive: true });
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  return (
    <>
      {/* Campo Energético removido - efeito movido para RootLayout */}

        {/* Nebulosas Sutis no Header */}
        <motion.div 
          className="absolute -top-8 -left-4 w-32 h-32 rounded-full opacity-8"
          style={{ 
            background: 'radial-gradient(circle, #2f2546 0%, #1a1329 40%, transparent 70%)',
            filter: 'blur(40px)',
          }}
          animate={{
            opacity: hasScrolled ? 0.04 : 0.08,
            scale: hasScrolled ? 0.8 : 1,
          }}
          transition={{ duration: 0.8 }}
        />
        
        <motion.div 
          className="absolute -top-6 -right-8 w-24 h-24 rounded-full opacity-6"
          style={{ 
            background: 'radial-gradient(circle, #1e1b2e 0%, #161221 30%, transparent 70%)',
            filter: 'blur(50px)',
          }}
          animate={{
            opacity: hasScrolled ? 0.03 : 0.06,
            scale: hasScrolled ? 0.9 : 1,
          }}
          transition={{ duration: 0.8, delay: 0.2 }}
        />

        {/* Nebulosa central sutil */}
        <motion.div 
          className="absolute top-0 left-1/2 w-40 h-16 rounded-full opacity-4"
          style={{
            background: 'radial-gradient(ellipse 200px 64px at center, #252138 0%, transparent 60%)',
            transform: 'translateX(-50%)',
            filter: 'blur(30px)',
          }}
          animate={{
            opacity: hasScrolled ? 0.02 : 0.04,
            scaleX: hasScrolled ? 1.2 : 1,
          }}
          transition={{ duration: 1, delay: 0.1 }}
        />

      <motion.header 
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className={`flex items-center justify-between px-4 md:px-10 sticky top-0 z-50 transition-all duration-500 relative ${
          hasScrolled 
            ? 'py-3 bg-[#161221] shadow-2xl shadow-black/40' 
            : 'py-6 bg-[#161221]'
        }`}
      >
        {/* ESTRUTURA DESKTOP */}
        <div className="hidden md:flex w-full items-center relative">
          <nav className="flex items-center justify-start gap-6 w-1/3">
            {navLinks.slice(0, 2).map((link, index) => {
              const IconComponent = link.icon;
              return (
                <motion.div
                  key={link.label}
                  initial={{ opacity: 0, y: -15, filter: "blur(8px)" }}
                  animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                  transition={{ 
                    delay: 0.1 + index * 0.1, 
                    duration: 0.6, 
                    ease: [0.25, 0.46, 0.45, 0.94] 
                  }}
                >
                  <a 
                    href={link.href}
                    className="group flex items-center gap-2 px-4 py-3 text-sm font-medium text-[#a495c6] hover:text-[#F5F5F5] transition-all duration-400 rounded-xl relative overflow-hidden"
                    style={{ fontFamily: 'Marcellus SC, serif' }}
                  >
                    {/* Campo Energético do Link */}
                    <motion.div 
                      className="absolute inset-0 bg-[#2f2546]/20 opacity-0 rounded-xl"
                      whileHover={{ 
                        opacity: 1,
                        boxShadow: "inset 0 0 20px rgba(139, 99, 233, 0.1)",
                      }}
                      transition={{ duration: 0.3 }}
                    />
                    
                    <motion.div 
                      className="relative z-10 text-[#8b63e9]/70 group-hover:text-[#8b63e9] transition-all duration-300"
                      whileHover={{ scale: 1.15, rotate: 5 }}
                      transition={{ duration: 0.2 }}
                    >
                      <IconComponent />
                    </motion.div>
                    
                    <span className="relative z-10 font-light tracking-wide text-xs uppercase">
                      {link.label}
                    </span>
                    
                    {/* Linha Energética */}
                    <motion.div 
                      className="absolute bottom-1 left-1/2 w-0 h-0.5 bg-[#8b63e9] rounded-full opacity-0"
                      whileHover={{
                        width: '80%',
                        left: '10%',
                        opacity: 1,
                        boxShadow: '0 0 8px rgba(139, 99, 233, 0.8)',
                      }}
                      transition={{ duration: 0.4, ease: "easeOut" }}
                    />
                  </a>
                </motion.div>
              );
            })}
          </nav>

          {/* Logo Central com Arquitetura */}
          <motion.div 
            className="flex justify-center w-1/3 relative"
            initial={{ opacity: 0, scale: 0.8, filter: "blur(12px)" }}
            animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
            transition={{ delay: 0.3, duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
          >
            {/* Anel Orbital do Logo */}
            <motion.div
              className="absolute inset-0 flex items-center justify-center pointer-events-none"
              animate={{ rotate: 360 }}
              transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
            >
              <div 
                className="rounded-full opacity-0"
                style={{ width: '80px', height: '80px' }}
              />
            </motion.div>

            <a href="/" className="group flex items-center gap-4 p-3 rounded-xl transition-all duration-400 relative">
              {/* Aura do Logo */}
              <motion.div 
                className="absolute inset-0 bg-[#FFD700]/5 opacity-0 rounded-xl"
                whileHover={{ 
                  opacity: 1,
                  boxShadow: "0 0 30px rgba(255, 215, 0, 0.2), inset 0 0 15px rgba(255, 215, 0, 0.1)",
                }}
                transition={{ duration: 0.5 }}
              />
              
              <motion.div
                whileHover={{ rotate: 180, scale: 1.1 }}
                transition={{ duration: 0.8, ease: "easeInOut" }}
                className="relative z-10"
              >
                <LogoSymbol className="text-[#8b63e9] group-hover:text-[#FFD700] transition-colors duration-500"/>
              </motion.div>
              
              <div className="relative z-10">
                <motion.h2 
                  className="text-xl font-bold tracking-[0.15em] uppercase text-[#F5F5F5] transition-colors duration-500"
                  style={{ fontFamily: 'Cinzel Decorative, serif' }}
                  whileHover={{
                    color: '#8b63e9',
                    textShadow: "0 0 20px rgba(139, 99, 233, 0.6)",
                  }}
                >
                  Arcano
                </motion.h2>
                <motion.div 
                  className="w-0 h-px bg-[#8b63e9] opacity-0"
                  whileHover={{
                    width: '100%',
                    opacity: 1,
                    boxShadow: '0 0 8px rgba(139, 99, 233, 0.8)',
                  }}
                  transition={{ duration: 0.6 }}
                />
              </div>
            </a>
          </motion.div>

          <div className="flex items-center justify-end gap-6 w-1/3">
            <nav className="flex items-center justify-end gap-6">
              {navLinks.slice(2, 4).map((link, index) => {
                const IconComponent = link.icon;
                return (
                  <motion.div
                    key={link.label}
                    initial={{ opacity: 0, y: -15, filter: "blur(8px)" }}
                    animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                    transition={{ 
                      delay: 0.2 + index * 0.1, 
                      duration: 0.6, 
                      ease: [0.25, 0.46, 0.45, 0.94] 
                    }}
                  >
                    <a 
                      href={link.href}
                      className="group flex items-center gap-2 px-4 py-3 text-sm font-medium text-[#a495c6] hover:text-[#F5F5F5] transition-all duration-400 rounded-xl relative overflow-hidden"
                      style={{ fontFamily: 'Marcellus SC, serif' }}
                    >
                      <motion.div 
                        className="absolute inset-0 bg-[#2f2546]/20 opacity-0 rounded-xl"
                        whileHover={{ 
                          opacity: 1,
                          boxShadow: "inset 0 0 20px rgba(139, 99, 233, 0.1)",
                        }}
                        transition={{ duration: 0.3 }}
                      />
                      
                      <motion.div 
                        className="relative z-10 text-[#8b63e9]/70 group-hover:text-[#8b63e9] transition-all duration-300"
                        whileHover={{ scale: 1.15, rotate: -5 }}
                        transition={{ duration: 0.2 }}
                      >
                        <IconComponent />
                      </motion.div>
                      
                      <span className="relative z-10 font-light tracking-wide text-xs uppercase">
                        {link.label}
                      </span>
                      
                      <motion.div 
                        className="absolute bottom-1 left-1/2 w-0 h-0.5 bg-[#8b63e9] rounded-full opacity-0"
                        whileHover={{
                          width: '80%',
                          left: '10%',
                          opacity: 1,
                          boxShadow: '0 0 8px rgba(139, 99, 233, 0.8)',
                        }}
                        transition={{ duration: 0.4, ease: "easeOut" }}
                      />
                    </a>
                  </motion.div>
                );
              })}
            </nav>

            {/* Botões de ação com Design Premium */}
            <motion.div 
              className="flex gap-2 items-center"
              initial={{ opacity: 0, x: 15, filter: "blur(8px)" }}
              animate={{ opacity: 1, x: 0, filter: "blur(0px)" }}
              transition={{ delay: 0.4, duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
            >
              {user ? (
                <>
                  <Link 
                    to="/dashboard" 
                    className="group flex items-center gap-2 px-3 py-2 text-sm text-[#a495c6] hover:text-[#F5F5F5] transition-all duration-300 rounded-xl relative overflow-hidden"
                    style={{ fontFamily: 'Noto Sans, sans-serif' }}
                  >
                    <motion.div 
                      className="absolute inset-0 bg-[#2f2546]/20 opacity-0 rounded-xl"
                      whileHover={{ opacity: 1 }}
                      transition={{ duration: 0.2 }}
                    />
                    
                    <motion.div 
                      className="w-7 h-7 bg-[#FFD700] rounded-full flex items-center justify-center text-[#1A1A2E] text-xs font-medium shadow-lg shadow-[#FFD700]/30 relative z-10"
                      whileHover={{ scale: 1.1 }}
                      transition={{ duration: 0.2 }}
                    >
                      {user.name.charAt(0).toUpperCase()}
                    </motion.div>
                    
                    <div className="hidden lg:block font-light relative z-10">
                      <div className="flex flex-col items-start gap-0">
                        <div className="text-white/90 leading-tight">
                          Olá, {user.name.split(' ')[0]}
                        </div>
                        {/* 🌟 Beta Tester Badge como Subtítulo - Mais próximo */}
                        {isBetaTester && (
                          <motion.div
                            initial={{ opacity: 0, y: -2 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="-mt-0.5"
                          >
                            <motion.span
                              animate={{ 
                                color: ['#FFD700', '#8b63e9', '#FFD700'],
                              }}
                              transition={{ 
                                duration: 3,
                                repeat: Infinity,
                                ease: "easeInOut"
                              }}
                              className="text-[10px] font-medium tracking-wider uppercase opacity-70"
                              style={{ fontFamily: 'Inter' }}
                            >
                              Visionário do Arcano
                            </motion.span>
                          </motion.div>
                        )}
                      </div>
                    </div>
                  </Link>
                  
                  <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                    <Button 
                      variant="ghost" 
                      className="px-4 py-2 text-sm hover:bg-[#2f2546]/30 transition-all duration-300 rounded-xl"
                      onClick={logout}
                      style={{ 
                        fontFamily: 'Noto Sans, sans-serif',
                        color: '#a495c6'
                      }}
                    >
                      Sair
                    </Button>
                  </motion.div>
                </>
              ) : (
                <>
                  <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                    <Button 
                      variant="secondary" 
                      className="px-4 py-2 text-sm font-medium transition-all duration-300 rounded-xl relative overflow-hidden" 
                      onClick={() => openAuthModal('register')}
                      style={{ 
                        fontFamily: 'Noto Sans, sans-serif',
                        backgroundColor: '#FFD700',
                        color: '#1A1A2E',
                        border: 'none',
                        boxShadow: '0 4px 15px rgba(255, 215, 0, 0.3)'
                      }}
                    >
                      <motion.div
                        className="absolute inset-0 bg-white/20 opacity-0"
                        whileHover={{ opacity: [0, 1, 0], x: ['-100%', '100%'] }}
                        transition={{ duration: 0.6 }}
                        style={{ clipPath: 'polygon(0% 0%, 20% 0%, 40% 100%, 20% 100%)' }}
                      />
                      
                      <WandSparkles size={16} className="opacity-90" />
                      <span className="relative z-10">Iniciar Jornada</span>
                    </Button>
                  </motion.div>
                  
                  <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                    <Button 
                      variant="ghost" 
                      className="px-4 py-2 text-sm font-medium hover:bg-[#2f2546]/30 transition-all duration-300 rounded-xl" 
                      onClick={() => openAuthModal('login')}
                      style={{ 
                        fontFamily: 'Noto Sans, sans-serif',
                        color: '#8b63e9'
                      }}
                    >
                      <KeyRound size={16} className="opacity-80" />
                      <span>Meu Oráculo</span>
                    </Button>
                  </motion.div>
                </>
              )}
            </motion.div>
          </div>
        </div>

        {/* ESTRUTURA MOBILE Premium - MODIFICADA PARA RESPONSIVIDADE */}
        <div className="md:hidden flex w-full justify-between items-center">
          <motion.a 
            href="/" 
            className="flex items-center gap-2 p-2 rounded-xl relative"
            initial={{ opacity: 0, x: -20, filter: "blur(8px)" }}
            animate={{ opacity: 1, x: 0, filter: "blur(0px)" }}
            transition={{ delay: 0.1, duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
            whileHover={{ scale: 1.05 }}
          >
            {/* Anel Mobile */}
            <motion.div
              className="absolute -inset-2 border border-[#8b63e9]/20 rounded-full opacity-0"
              whileHover={{ opacity: 1, scale: 1.1 }}
              transition={{ duration: 0.3 }}
            />
            
            <motion.div
              whileHover={{ rotate: 90, scale: 1.1 }}
              transition={{ duration: 0.5 }}
              className="relative z-10"
            >
              <LogoSymbol className="text-[#8b63e9] w-6 h-6"/>
            </motion.div>
            
            <motion.h2 
              className="text-base font-bold tracking-[0.1em] uppercase text-[#F5F5F5] relative z-10"
              style={{ fontFamily: 'Cinzel Decorative, serif' }}
              whileHover={{ 
                color: '#8b63e9',
                textShadow: "0 0 15px rgba(139, 99, 233, 0.8)" 
              }}
            >
              Arcano
            </motion.h2>
          </motion.a>
          
          {/* Botão simplificado para mobile - removido ícone de explore */}
          <motion.button 
            onClick={toggleMenu} 
            className="p-2 relative z-50 rounded-xl transition-all duration-300" 
            style={{
              backgroundColor: 'rgba(47, 37, 70, 0.3)',
              backdropFilter: 'blur(10px)',
            }}
            aria-label="Abrir menu"
            initial={{ opacity: 0, x: 20, filter: "blur(8px)" }}
            animate={{ opacity: 1, x: 0, filter: "blur(0px)" }}
            transition={{ delay: 0.2, duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
            whileHover={{ 
              scale: 1.05,
            }}
            whileTap={{ scale: 0.95 }}
          >
            <AnimatePresence mode="wait">
              <motion.div
                key={isMenuOpen ? 'close' : 'open'}
                initial={{ rotate: -90, opacity: 0, scale: 0.8 }}
                animate={{ rotate: 0, opacity: 1, scale: 1 }}
                exit={{ rotate: 90, opacity: 0, scale: 0.8 }}
                transition={{ duration: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
                className="relative z-10"
              >
                {isMenuOpen ? (
                  <X size={20} className="text-[#F5F5F5]"/>
                ) : (
                  // Menu icon simplificado sem o ícone de explore
                  <div className="flex flex-col gap-1">
                    <div className="w-4 h-0.5 bg-[#8b63e9] rounded-full"></div>
                    <div className="w-4 h-0.5 bg-[#8b63e9] rounded-full"></div>
                    <div className="w-4 h-0.5 bg-[#8b63e9] rounded-full"></div>
                  </div>
                )}
              </motion.div>
            </AnimatePresence>
          </motion.button>
        </div>
      </motion.header>

      {/* MENU MOBILE Premium com Arquitetura - OTIMIZADO PARA MOBILE */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="fixed inset-0 z-40 md:hidden"
          >
            {/* Background Arquitetural */}
            <div className="absolute inset-0 bg-[#161221]" />
            <motion.div 
              className="absolute inset-0"
              animate={{
                background: [
                  'radial-gradient(circle at 30% 30%, rgba(47, 37, 70, 0.4), transparent 60%)',
                  'radial-gradient(circle at 70% 70%, rgba(47, 37, 70, 0.3), transparent 60%)',
                  'radial-gradient(circle at 30% 30%, rgba(47, 37, 70, 0.4), transparent 60%)',
                ],
              }}
              transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
            />
            
            {/* Geometria de Fundo */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
              <motion.div
                initial={{ opacity: 0, scale: 0, rotate: 0 }}
                animate={{ opacity: 0.1, scale: 1, rotate: 360 }}
                transition={{ delay: 0.5, duration: 2, repeat: Infinity, ease: "linear" }}
                className="absolute top-1/4 right-1/4 w-32 h-32 rounded-full opacity-0"
              />
              <motion.div
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 0.08, scale: 1 }}
                transition={{ delay: 0.7, duration: 1.5 }}
                className="absolute bottom-1/3 left-1/4 w-24 h-24 rounded-full opacity-0"
              />
            </div>
            
            <motion.nav 
              variants={menuContainerVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              className="h-full flex flex-col items-center justify-center gap-4 relative z-10 px-4 py-8"
            >
              {/* Ornamento Superior */}
              <motion.div
                initial={{ opacity: 0, scaleX: 0 }}
                animate={{ opacity: 1, scaleX: 1 }}
                transition={{ delay: 0.3, duration: 0.8 }}
                className="flex items-center mb-2"
              >
                <div className="w-8 h-px bg-[#8b63e9]/40" />
              </motion.div>

              {navLinks.map((link) => {
                const IconComponent = link.icon;
                return (
                  <motion.div key={link.label} variants={menuItemVariants} className="w-full max-w-xs">
                    <a 
                      href={link.href} 
                      className="group flex items-center gap-4 p-4 hover:bg-[#2f2546]/30 rounded-2xl transition-all duration-400 backdrop-blur-sm relative overflow-hidden" 
                      onClick={(e) => {
                        if (link.href.startsWith('#')) {
                          e.preventDefault();
                          toggleMenu();
                          setTimeout(() => {
                            const sectionId = link.href.substring(1);
                            const element = document.getElementById(sectionId);
                            if (element) {
                              element.scrollIntoView({ behavior: 'smooth', block: 'start' });
                            }
                          }, 300);
                        } else {
                          toggleMenu();
                        }
                      }}
                    >
                      {/* Efeito de Energia do Link */}
                      <motion.div
                        className="absolute inset-0 rounded-2xl opacity-0"
                        whileHover={{
                          opacity: 1,
                          boxShadow: '0 0 20px rgba(139, 99, 233, 0.15), inset 0 0 15px rgba(139, 99, 233, 0.05)',
                        }}
                        transition={{ duration: 0.4 }}
                      />

                      {/* Ícone com Arquitetura */}
                      <motion.div 
                        className="flex items-center justify-center w-12 h-12 rounded-xl relative z-10"
                        style={{
                          background: 'rgba(47, 37, 70, 0.6)',
                          border: '1px solid rgba(139, 99, 233, 0.25)',
                          boxShadow: '0 4px 12px rgba(22, 18, 33, 0.6), inset 0 1px 0 rgba(255, 255, 255, 0.05)',
                        }}
                        whileHover={{
                          scale: 1.05,
                          borderColor: 'rgba(139, 99, 233, 0.5)',
                          boxShadow: '0 6px 20px rgba(22, 18, 33, 0.8), inset 0 1px 0 rgba(255, 255, 255, 0.1), 0 0 15px rgba(139, 99, 233, 0.2)',
                        }}
                        transition={{ duration: 0.3 }}
                      >
                        <motion.div 
                          className="text-[#8b63e9] group-hover:text-[#FFD700] transition-all duration-300 relative z-10"
                          whileHover={{ rotate: 15, scale: 1.1 }}
                        >
                          <IconComponent />
                        </motion.div>
                      </motion.div>

                      <div className="flex-1 relative z-10">
                        <motion.span 
                          className="block text-lg text-[#F5F5F5] transition-all duration-400 font-light tracking-wide"
                          style={{ fontFamily: 'Marcellus SC, serif' }}
                          whileHover={{
                            color: '#8b63e9',
                            textShadow: '0 0 12px rgba(139, 99, 233, 0.8)',
                          }}
                        >
                          {link.label}
                        </motion.span>
                        
                        <motion.div 
                          className="w-0 h-0.5 bg-[#8b63e9] rounded-full mt-1 opacity-0"
                          whileHover={{
                            width: '100%',
                            opacity: 1,
                            boxShadow: '0 0 6px rgba(139, 99, 233, 0.6)',
                          }}
                          transition={{ duration: 0.6, ease: "easeOut" }}
                        />
                      </div>
                    </a>
                  </motion.div>
                );
              })}

              {/* Separador Central Premium */}
              <motion.div
                initial={{ opacity: 0, scaleX: 0 }}
                animate={{ opacity: 1, scaleX: 1 }}
                transition={{ delay: 0.6, duration: 0.8 }}
                className="flex items-center my-2"
              >
                <div className="w-4 h-px bg-[#8b63e9]/30" />
                <div className="mx-2 w-1 h-1 bg-[#8b63e9]/40 rounded-full" />
                <div className="w-4 h-px bg-[#8b63e9]/30" />
              </motion.div>

              {/* Botões de Ação Premium - OTIMIZADOS PARA MOBILE */}
              <motion.div variants={menuItemVariants} className="flex flex-col gap-3 w-full max-w-xs">
                {user ? (
                  <>
                    <Link to="/dashboard" onClick={toggleMenu}>
                      <motion.div 
                        className="flex items-center justify-center gap-3 p-4 rounded-2xl backdrop-blur-sm relative overflow-hidden cursor-pointer"
                        style={{
                          background: 'rgba(47, 37, 70, 0.4)',
                          border: '1px solid rgba(139, 99, 233, 0.25)',
                          boxShadow: '0 6px 20px rgba(22, 18, 33, 0.6), inset 0 1px 0 rgba(255, 255, 255, 0.05)',
                        }}
                        whileHover={{
                          borderColor: 'rgba(139, 99, 233, 0.4)',
                          boxShadow: '0 8px 25px rgba(22, 18, 33, 0.8), inset 0 1px 0 rgba(255, 255, 255, 0.1)',
                          scale: 1.02,
                        }}
                        whileTap={{ scale: 0.98 }}
                      >
                        <motion.div 
                          className="w-10 h-10 rounded-xl flex items-center justify-center text-[#1A1A2E] text-lg font-bold relative"
                          style={{
                            background: '#FFD700',
                            boxShadow: '0 3px 10px rgba(255, 215, 0, 0.4), inset 0 1px 0 rgba(255, 255, 255, 0.3)',
                          }}
                          whileHover={{ scale: 1.08, rotate: 5 }}
                        >
                          {user.name.charAt(0).toUpperCase()}
                        </motion.div>
                        
                        <div className="flex-1">
                          <motion.span 
                            className="text-[#F5F5F5] font-medium text-base block" 
                            style={{ fontFamily: 'Noto Sans, sans-serif' }}
                          >
                            Olá, {user.name.split(' ')[0]}
                          </motion.span>
                          <div className="text-[#a495c6] text-xs" style={{ fontFamily: 'Noto Sans, sans-serif' }}>
                            Toque para acessar
                          </div>
                        </div>
                      </motion.div>
                    </Link>
                    
                    <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                      <Button 
                        variant="ghost" 
                        className="w-full py-3 text-sm rounded-2xl backdrop-blur-sm transition-all duration-400" 
                        onClick={logout}
                        style={{ 
                          fontFamily: 'Noto Sans, sans-serif',
                          color: '#a495c6',
                          background: 'rgba(47, 37, 70, 0.3)',
                          border: '1px solid rgba(139, 99, 233, 0.25)',
                          boxShadow: '0 4px 12px rgba(22, 18, 33, 0.5), inset 0 1px 0 rgba(255, 255, 255, 0.05)',
                        }}
                      >
                        Sair
                      </Button>
                    </motion.div>
                  </>
                ) : (
                  <>
                    <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                      <Button 
                        variant="secondary" 
                        className="group w-full py-3 text-sm font-medium rounded-2xl relative overflow-hidden transition-all duration-400" 
                        onClick={() => { openAuthModal('register'); toggleMenu(); }}
                        style={{ 
                          fontFamily: 'Noto Sans, sans-serif',
                          backgroundColor: '#FFD700',
                          color: '#1A1A2E',
                          border: 'none',
                          boxShadow: '0 6px 20px rgba(255, 215, 0, 0.4), inset 0 1px 0 rgba(255, 255, 255, 0.3)',
                        }}
                      >
                        <WandSparkles size={16} className="opacity-90" />
                        <span className="relative z-10">Iniciar Jornada</span>
                      </Button>
                    </motion.div>
                    
                    <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                      <Button 
                        variant="ghost" 
                        className="w-full py-3 text-sm font-medium rounded-2xl backdrop-blur-sm transition-all duration-400" 
                        onClick={() => { openAuthModal('login'); toggleMenu(); }}
                        style={{ 
                          fontFamily: 'Noto Sans, sans-serif',
                          backgroundColor: 'rgba(47, 37, 70, 0.4)',
                          color: '#8b63e9',
                          border: '1px solid rgba(139, 99, 233, 0.3)',
                          boxShadow: '0 4px 15px rgba(139, 99, 233, 0.2), inset 0 1px 0 rgba(255, 255, 255, 0.05)',
                        }}
                      >
                        <KeyRound size={16} className="opacity-80" />
                        <span>Meu Oráculo</span>
                      </Button>
                    </motion.div>
                  </>
                )}
              </motion.div>

              {/* Ornamento Inferior */}
              <motion.div
                initial={{ opacity: 0, scaleX: 0 }}
                animate={{ opacity: 1, scaleX: 1 }}
                transition={{ delay: 0.8, duration: 0.8 }}
                className="flex items-center mt-2"
              >
                <div className="w-8 h-px bg-[#8b63e9]/40" />
                <div className="mx-2 w-1.5 h-1.5 bg-[#8b63e9]/30 rounded-full" />
                <div className="w-8 h-px bg-[#8b63e9]/40" />
              </motion.div>
            </motion.nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};