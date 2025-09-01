import type { FC, JSX } from 'react';
import { motion } from 'framer-motion';

// SVGs Premium dos 12 Signos do Zodíaco com design místico
const signs: Record<string, JSX.Element> = {
  // ÁRIES ♈ - Carneiro
  Áries: (
    <svg viewBox="0 0 100 100" fill="none" className="w-full h-full">
      <defs>
        <linearGradient id="ariesGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="currentColor" stopOpacity="0.9"/>
          <stop offset="100%" stopColor="currentColor" stopOpacity="0.6"/>
        </linearGradient>
      </defs>
      <path d="M30 70 Q20 50 25 35 Q30 15 40 25 Q45 35 50 25 Q55 35 60 25 Q70 15 75 35 Q80 50 70 70" 
            stroke="url(#ariesGrad)" strokeWidth="3" fill="none" strokeLinecap="round"/>
      <circle cx="35" cy="30" r="3" fill="currentColor" opacity="0.7"/>
      <circle cx="65" cy="30" r="3" fill="currentColor" opacity="0.7"/>
    </svg>
  ),

  // TOURO ♉ - Touro
  Touro: (
    <svg viewBox="0 0 100 100" fill="none" className="w-full h-full">
      <defs>
        <radialGradient id="taurusGrad" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="currentColor" stopOpacity="0.9"/>
          <stop offset="100%" stopColor="currentColor" stopOpacity="0.5"/>
        </radialGradient>
      </defs>
      <circle cx="50" cy="55" r="25" stroke="url(#taurusGrad)" strokeWidth="3" fill="none"/>
      <path d="M30 35 Q25 20 35 25 Q45 15 50 30 Q55 15 65 25 Q75 20 70 35" 
            stroke="currentColor" strokeWidth="3" fill="none" strokeLinecap="round"/>
      <circle cx="42" cy="50" r="2" fill="currentColor"/>
      <circle cx="58" cy="50" r="2" fill="currentColor"/>
    </svg>
  ),

  // GÊMEOS ♊ - Gêmeos
  Gêmeos: (
    <svg viewBox="0 0 100 100" fill="none" className="w-full h-full">
      <defs>
        <linearGradient id="geminiGrad" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="currentColor" stopOpacity="0.9"/>
          <stop offset="100%" stopColor="currentColor" stopOpacity="0.6"/>
        </linearGradient>
      </defs>
      <rect x="25" y="20" width="15" height="60" rx="7" stroke="url(#geminiGrad)" strokeWidth="3" fill="none"/>
      <rect x="60" y="20" width="15" height="60" rx="7" stroke="url(#geminiGrad)" strokeWidth="3" fill="none"/>
      <line x1="25" y1="30" x2="75" y2="30" stroke="currentColor" strokeWidth="2"/>
      <line x1="25" y1="70" x2="75" y2="70" stroke="currentColor" strokeWidth="2"/>
      <circle cx="32" cy="25" r="1.5" fill="currentColor"/>
      <circle cx="68" cy="75" r="1.5" fill="currentColor"/>
    </svg>
  ),

  // CÂNCER ♋ - Caranguejo
  Câncer: (
    <svg viewBox="0 0 100 100" fill="none" className="w-full h-full">
      <defs>
        <radialGradient id="cancerGrad" cx="30%" cy="30%" r="70%">
          <stop offset="0%" stopColor="currentColor" stopOpacity="0.9"/>
          <stop offset="100%" stopColor="currentColor" stopOpacity="0.4"/>
        </radialGradient>
      </defs>
      <circle cx="35" cy="35" r="15" stroke="url(#cancerGrad)" strokeWidth="3" fill="none"/>
      <circle cx="65" cy="65" r="15" stroke="url(#cancerGrad)" strokeWidth="3" fill="none"/>
      <path d="M20 35 Q15 25 25 30 Q30 20 35 35" stroke="currentColor" strokeWidth="2.5" fill="none"/>
      <path d="M65 65 Q70 75 60 70 Q55 80 50 65" stroke="currentColor" strokeWidth="2.5" fill="none"/>
      <circle cx="35" cy="35" r="2" fill="currentColor" opacity="0.8"/>
      <circle cx="65" cy="65" r="2" fill="currentColor" opacity="0.8"/>
    </svg>
  ),

  // LEÃO ♌ - Leão
  Leão: (
    <svg viewBox="0 0 100 100" fill="none" className="w-full h-full">
      <defs>
        <radialGradient id="leoGrad" cx="50%" cy="30%" r="60%">
          <stop offset="0%" stopColor="currentColor" stopOpacity="1"/>
          <stop offset="100%" stopColor="currentColor" stopOpacity="0.5"/>
        </radialGradient>
      </defs>
      <circle cx="50" cy="45" r="20" stroke="url(#leoGrad)" strokeWidth="3" fill="none"/>
      <path d="M30 45 Q20 35 15 45 Q20 55 30 45" stroke="currentColor" strokeWidth="2.5" fill="none"/>
      <path d="M50 25 Q40 15 35 25 Q45 20 50 25" stroke="currentColor" strokeWidth="2"/>
      <path d="M50 25 Q60 15 65 25 Q55 20 50 25" stroke="currentColor" strokeWidth="2"/>
      <path d="M40 65 Q50 75 60 65 Q55 80 45 80 Q40 75 40 65" stroke="currentColor" strokeWidth="2.5" fill="none"/>
      <circle cx="45" cy="40" r="1.5" fill="currentColor"/>
      <circle cx="55" cy="40" r="1.5" fill="currentColor"/>
    </svg>
  ),

  // VIRGEM ♍ - Virgem (melhorada)
  Virgem: (
    <svg viewBox="0 0 100 100" fill="none" className="w-full h-full">
      <defs>
        <linearGradient id="virgoGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="currentColor" stopOpacity="0.9"/>
          <stop offset="100%" stopColor="currentColor" stopOpacity="0.6"/>
        </linearGradient>
      </defs>
      <path d="M20 25 L20 70 M35 25 L35 70 M50 25 L50 55 Q50 70 65 70 Q80 70 80 55 L80 25" 
            stroke="url(#virgoGrad)" strokeWidth="3" strokeLinecap="round"/>
      <path d="M80 45 Q90 45 90 60 Q90 75 75 75" stroke="currentColor" strokeWidth="2.5" fill="none" strokeLinecap="round"/>
      <circle cx="20" cy="20" r="2" fill="currentColor" opacity="0.7"/>
      <circle cx="35" cy="20" r="2" fill="currentColor" opacity="0.7"/>
      <circle cx="80" cy="20" r="2" fill="currentColor" opacity="0.7"/>
    </svg>
  ),

  // LIBRA ♎ - Balança
  Libra: (
    <svg viewBox="0 0 100 100" fill="none" className="w-full h-full">
      <defs>
        <linearGradient id="libraGrad" x1="0%" y1="50%" x2="100%" y2="50%">
          <stop offset="0%" stopColor="currentColor" stopOpacity="0.8"/>
          <stop offset="50%" stopColor="currentColor" stopOpacity="1"/>
          <stop offset="100%" stopColor="currentColor" stopOpacity="0.8"/>
        </linearGradient>
      </defs>
      <line x1="15" y1="60" x2="85" y2="60" stroke="url(#libraGrad)" strokeWidth="3"/>
      <line x1="30" y1="45" x2="70" y2="45" stroke="currentColor" strokeWidth="2"/>
      <rect x="20" y="65" width="20" height="10" rx="2" stroke="currentColor" strokeWidth="2" fill="none"/>
      <rect x="60" y="65" width="20" height="10" rx="2" stroke="currentColor" strokeWidth="2" fill="none"/>
      <line x1="30" y1="45" x2="30" y2="65" stroke="currentColor" strokeWidth="2"/>
      <line x1="70" y1="45" x2="70" y2="65" stroke="currentColor" strokeWidth="2"/>
      <circle cx="50" cy="25" r="8" stroke="currentColor" strokeWidth="2" fill="none"/>
    </svg>
  ),

  // ESCORPIÃO ♏ - Escorpião
  Escorpião: (
    <svg viewBox="0 0 100 100" fill="none" className="w-full h-full">
      <defs>
        <linearGradient id="scorpioGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="currentColor" stopOpacity="0.9"/>
          <stop offset="100%" stopColor="currentColor" stopOpacity="0.5"/>
        </linearGradient>
      </defs>
      <path d="M20 25 L20 65 M35 25 L35 65 M50 25 L50 65 Q50 75 65 75 Q80 75 80 60 L80 25" 
            stroke="url(#scorpioGrad)" strokeWidth="3" strokeLinecap="round"/>
      <path d="M80 50 L90 40 M80 50 L90 60" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"/>
    </svg>
  ),

  // SAGITÁRIO ♐ - Arqueiro
  Sagitário: (
    <svg viewBox="0 0 100 100" fill="none" className="w-full h-full">
      <defs>
        <linearGradient id="sagittariusGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="currentColor" stopOpacity="1"/>
          <stop offset="100%" stopColor="currentColor" stopOpacity="0.6"/>
        </linearGradient>
      </defs>
      <line x1="25" y1="75" x2="75" y2="25" stroke="url(#sagittariusGrad)" strokeWidth="3"/>
      <path d="M60 25 L75 25 L75 40" stroke="currentColor" strokeWidth="2.5" fill="none" strokeLinecap="round"/>
      <path d="M25 75 L30 70 M25 75 L30 80" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"/>
      <line x1="40" y1="45" x2="50" y2="35" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
      <line x1="50" y1="55" x2="60" y2="45" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
      <circle cx="75" cy="25" r="2" fill="currentColor"/>
    </svg>
  ),

  // CAPRICÓRNIO ♑ - Cabra
  Capricórnio: (
    <svg viewBox="0 0 100 100" fill="none" className="w-full h-full">
      <defs>
        <radialGradient id="capricornGrad" cx="40%" cy="40%" r="60%">
          <stop offset="0%" stopColor="currentColor" stopOpacity="0.9"/>
          <stop offset="100%" stopColor="currentColor" stopOpacity="0.5"/>
        </radialGradient>
      </defs>
      <path d="M30 75 Q20 60 25 45 Q30 25 45 35 Q50 40 55 35 Q60 25 70 35 Q75 45 70 60 Q75 75 85 70" 
            stroke="url(#capricornGrad)" strokeWidth="3" fill="none" strokeLinecap="round"/>
      <circle cx="40" cy="40" r="8" stroke="currentColor" strokeWidth="2" fill="none"/>
      <path d="M70 60 Q80 55 85 65 Q80 75 70 70" stroke="currentColor" strokeWidth="2" fill="none"/>
      <circle cx="35" cy="35" r="1.5" fill="currentColor"/>
      <circle cx="45" cy="45" r="1.5" fill="currentColor"/>
    </svg>
  ),

  // AQUÁRIO ♒ - Aguadeiro
  Aquário: (
    <svg viewBox="0 0 100 100" fill="none" className="w-full h-full">
      <defs>
        <linearGradient id="aquariusGrad" x1="0%" y1="50%" x2="100%" y2="50%">
          <stop offset="0%" stopColor="currentColor" stopOpacity="0.7"/>
          <stop offset="50%" stopColor="currentColor" stopOpacity="1"/>
          <stop offset="100%" stopColor="currentColor" stopOpacity="0.7"/>
        </linearGradient>
      </defs>
      <path d="M15 40 Q25 35 35 40 Q45 45 55 40 Q65 35 75 40 Q85 45 85 40" 
            stroke="url(#aquariusGrad)" strokeWidth="3" fill="none" strokeLinecap="round"/>
      <path d="M15 60 Q25 55 35 60 Q45 65 55 60 Q65 55 75 60 Q85 65 85 60" 
            stroke="url(#aquariusGrad)" strokeWidth="3" fill="none" strokeLinecap="round"/>
      <circle cx="25" cy="38" r="1.5" fill="currentColor" opacity="0.8"/>
      <circle cx="45" cy="47" r="1.5" fill="currentColor" opacity="0.8"/>
      <circle cx="65" cy="38" r="1.5" fill="currentColor" opacity="0.8"/>
      <circle cx="25" cy="58" r="1.5" fill="currentColor" opacity="0.6"/>
      <circle cx="55" cy="62" r="1.5" fill="currentColor" opacity="0.6"/>
      <circle cx="75" cy="58" r="1.5" fill="currentColor" opacity="0.6"/>
    </svg>
  ),

  // PEIXES ♓ - Peixes
  Peixes: (
    <svg viewBox="0 0 100 100" fill="none" className="w-full h-full">
      <defs>
        <radialGradient id="piscesGrad" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="currentColor" stopOpacity="0.9"/>
          <stop offset="100%" stopColor="currentColor" stopOpacity="0.5"/>
        </radialGradient>
      </defs>
      <path d="M20 30 Q30 20 40 30 Q45 40 40 50 Q35 60 25 50 Q15 40 20 30" 
            stroke="url(#piscesGrad)" strokeWidth="2.5" fill="none"/>
      <path d="M80 70 Q70 80 60 70 Q55 60 60 50 Q65 40 75 50 Q85 60 80 70" 
            stroke="url(#piscesGrad)" strokeWidth="2.5" fill="none"/>
      <line x1="40" y1="50" x2="60" y2="50" stroke="currentColor" strokeWidth="2"/>
      <circle cx="30" cy="35" r="1.5" fill="currentColor"/>
      <circle cx="70" cy="65" r="1.5" fill="currentColor"/>
      <path d="M15 30 Q10 25 15 35" stroke="currentColor" strokeWidth="1.5" fill="none"/>
      <path d="M85 70 Q90 75 85 65" stroke="currentColor" strokeWidth="1.5" fill="none"/>
    </svg>
  ),
};

interface ZodiacSignProps {
  sign: string;
  className?: string;
}

export const ZodiacSign: FC<ZodiacSignProps> = ({ sign, className = '' }) => {
  const SignSvg = signs[sign] || signs['Virgem']; // Fallback para Virgem se não encontrar
  
  return (
    <motion.div 
      className={`relative ${className}`}
      whileHover={{ 
        scale: 1.05,
        rotate: 5,
        transition: { duration: 0.3, ease: "easeInOut" }
      }}
      whileTap={{ scale: 0.95 }}
    >
      {/* Container com efeitos premium */}
      <div className="relative w-full h-full transition-all duration-300 group">
        {/* Brilho de fundo sutil */}
        <div className="absolute inset-0 bg-gradient-to-br from-current/5 via-transparent to-current/10 
                       opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-lg" />
        
        {/* SVG do signo */}
        <div className="relative z-10 w-full h-full transition-all duration-300 group-hover:drop-shadow-md">
          {SignSvg}
        </div>
        
        {/* Partículas decorativas */}
        <div className="absolute top-0 right-0 w-1 h-1 bg-current/30 rounded-full 
                       opacity-0 group-hover:opacity-100 transition-opacity duration-300 delay-100" />
        <div className="absolute bottom-1 left-1 w-0.5 h-0.5 bg-current/20 rounded-full 
                       opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-200" />
      </div>
    </motion.div>
  );
};