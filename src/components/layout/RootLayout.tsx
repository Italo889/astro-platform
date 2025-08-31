import type { FC } from 'react';
import { Outlet, Link } from 'react-router-dom';
import CookieConsent from 'react-cookie-consent';
import { motion, AnimatePresence } from 'framer-motion';
import { ScrollText } from 'lucide-react';
import { BackgroundEffects } from './BackgroundEffects';
import { Header } from './Header';
import { Footer } from './Footer';
import { AuthModal } from '../auth/AuthModal';
import { useState, useEffect } from 'react';

export const RootLayout: FC = () => {
  const [showScrollIndicator, setShowScrollIndicator] = useState(true);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollIndicator(window.scrollY < 100);
    };

    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener('scroll', handleScroll);
    window.addEventListener('mousemove', handleMouseMove);
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  return (
    <div
      className="relative flex min-h-screen flex-col bg-[#161221] overflow-hidden text-white"
      style={{ fontFamily: 'var(--font-sans)' }}
    >
      {/* Background Effects Aprimorado */}
      <BackgroundEffects />
      
      {/* Efeito Interativo do Mouse - Cobertura completa */}
      <motion.div 
        className="pointer-events-none fixed inset-0 z-30"
        style={{ 
          background: `radial-gradient(circle 400px at ${mousePosition.x}px ${mousePosition.y}px, rgba(255, 215, 0, 0.08), rgba(139, 99, 233, 0.05) 50%, transparent 80%)`,
          transition: 'background 0.3s ease',
        }} 
      />
      
      {/* Overlay sutil removido para manter cor uniforme */}

      {/* Header com animação */}
      <motion.div
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
      >
        <Header />
      </motion.div>

      {/* Scroll Indicator */}
      <AnimatePresence>
        {showScrollIndicator && (
          <motion.div
            className="fixed bottom-8 left-1/2 transform -translate-x-1/2 z-40 pointer-events-none"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            transition={{ duration: 0.6, delay: 1.5 }}
          >
            <motion.div
              className="flex flex-col items-center gap-3 text-text-soft/60"
              animate={{ y: [0, -8, 0] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            >
              <div className="w-px h-16 bg-gradient-to-b from-transparent via-gold-solar/40 to-transparent"></div>
              <motion.div
                className="w-6 h-10 border-2 border-gold-solar/40 rounded-full flex justify-center"
                whileHover={{ scale: 1.1 }}
              >
                <motion.div
                  className="w-1 h-3 bg-gold-solar/60 rounded-full mt-2"
                  animate={{ y: [0, 12, 0] }}
                  transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                ></motion.div>
              </motion.div>
              <span className="text-xs font-light tracking-widest">EXPLORE</span>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Content com animação de entrada */}
      <motion.main
        className="relative z-10"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
      >
        <Outlet />
      </motion.main>

      {/* Footer com animação */}
      <motion.div
        initial={{ y: 100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.6, ease: "easeOut" }}
      >
        <Footer />
      </motion.div>

      {/* Auth Modal */}
      <AuthModal />

      {/* Cookie Consent Elegante e Simples */}
      <CookieConsent
        location="bottom"
        buttonText="Aceitar e Revelar"
        cookieName="arcanoUserConsent"
        expires={150}
        
        containerClasses="!fixed inset-x-0 bottom-0 z-[60] pointer-events-none"
        
        style={{
          animation: 'slideUp 0.6s ease-out',
          pointerEvents: 'auto',
          margin: '0 auto 2rem auto',
          maxWidth: '52rem',
          borderRadius: '1.5rem',
          border: '1px solid rgba(255, 215, 0, 0.25)',
          backgroundColor: 'rgba(47, 37, 70, 0.90)',
          padding: '1.75rem 2rem',
          backdropFilter: 'blur(16px)',
          boxShadow: '0 20px 40px rgba(0, 0, 0, 0.3), 0 0 0 1px rgba(255, 215, 0, 0.1)',
        }}
        
        contentClasses="flex items-center justify-between gap-6 !m-0 w-full"
        
        buttonClasses="!font-cinzel !bg-gradient-to-r !from-gold-solar !to-yellow-400 
                    !text-background-cosmic !font-semibold
                    !rounded-xl !px-6 !py-3 !text-base !tracking-wide
                    !shadow-lg !shadow-gold-solar/25
                    hover:!shadow-xl hover:!shadow-gold-solar/40
                    hover:!scale-105 !transform !transition-all !duration-300
                    !border !border-gold-solar/30"
      >
        {/* Conteúdo simplificado */}
        <div className="flex items-center gap-4 flex-1">
          {/* Ícone elegante */}
          <motion.div 
            className="flex-shrink-0"
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.2 }}
          >
            <div className="w-12 h-12 bg-gradient-to-br from-gold-solar/20 to-accent-intuitive/20 rounded-xl border border-gold-solar/30 flex items-center justify-center">
              <ScrollText size={24} className="text-gold-solar" />
            </div>
          </motion.div>

          {/* Texto elegante */}
          <div className="flex flex-col gap-2 max-w-2xl">
            <h3 className="font-cinzel text-xl font-bold text-gold-solar">
              Pacto de Confiança
            </h3>
            <p className="text-sm text-text-soft/90 leading-relaxed">
              Para que sua jornada seja única e seu destino lembrado, nosso Oráculo utiliza
              selos digitais (cookies). Eles asseguram sua sessão e preferências.
              Ao prosseguir, você firma nosso{' '}
              <Link
                to="/politica-de-privacidade"
                className="font-semibold text-accent-intuitive hover:text-gold-solar transition-colors duration-300 underline decoration-accent-intuitive/50 hover:decoration-gold-solar underline-offset-2"
              >
                Pacto de Confiança
              </Link>.
            </p>
          </div>
        </div>

        {/* Botão centralizado verticalmente no lado direito */}
        <div className="flex items-center justify-center flex-shrink-0">
          {/* O botão será renderizado aqui automaticamente pelo CookieConsent */}
        </div>
      </CookieConsent>

      {/* Estilos CSS simplificados */}
      <style>{`
        @keyframes slideUp {
          from {
            opacity: 0;
            transform: translateY(50px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </div>
  );
};