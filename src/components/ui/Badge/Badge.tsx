// src/components/ui/Badge/Badge.tsx

import React from 'react';
import { motion } from 'framer-motion';

export interface Badge {
  id: string;
  name: string;
  description: string;
  icon: string;
  color: string;
  rarity: 'common' | 'rare' | 'epic' | 'legendary';
  earnedAt?: Date;
}

interface BadgeProps {
  badge: Badge;
  size?: 'small' | 'medium' | 'large';
  showTooltip?: boolean;
}

const rarityStyles = {
  common: 'from-gray-400 to-gray-600 shadow-gray-500/20',
  rare: 'from-blue-400 to-blue-600 shadow-blue-500/20',
  epic: 'from-purple-400 to-purple-600 shadow-purple-500/20',
  legendary: 'from-yellow-400 to-yellow-600 shadow-yellow-500/20'
};

const sizeStyles = {
  small: 'w-8 h-8 text-xs',
  medium: 'w-12 h-12 text-sm',
  large: 'w-16 h-16 text-lg'
};

export const BadgeComponent: React.FC<BadgeProps> = ({ 
  badge, 
  size = 'medium',
  showTooltip = true 
}) => {
  return (
    <div className="relative group">
      <motion.div
        className={`
          ${sizeStyles[size]}
          ${rarityStyles[badge.rarity]}
          bg-gradient-to-br
          rounded-full
          flex items-center justify-center
          shadow-lg
          border-2 border-white/20
          cursor-pointer
          transition-all duration-300
          hover:scale-110
        `}
        whileHover={{ 
          scale: 1.1,
          rotate: [0, -5, 5, 0],
          transition: { duration: 0.3 }
        }}
        whileTap={{ scale: 0.95 }}
        style={{
          boxShadow: `0 0 20px ${badge.color}40`
        }}
      >
        <span className="text-white font-bold">
          {badge.icon}
        </span>
        
        {/* Brilho especial para legendary */}
        {badge.rarity === 'legendary' && (
          <motion.div
            className="absolute inset-0 rounded-full"
            style={{
              background: `conic-gradient(from 0deg, ${badge.color}, transparent, ${badge.color})`
            }}
            animate={{ rotate: 360 }}
            transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
          />
        )}
      </motion.div>

      {/* Tooltip */}
      {showTooltip && (
        <div className="
          absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2
          bg-gray-900 text-white text-xs rounded-lg px-3 py-2
          opacity-0 group-hover:opacity-100
          transition-opacity duration-300
          pointer-events-none
          whitespace-nowrap
          z-50
        ">
          <div className="font-bold text-yellow-400">{badge.name}</div>
          <div className="text-gray-300">{badge.description}</div>
          {badge.earnedAt && (
            <div className="text-gray-400 text-xs mt-1">
              Conquistado em {new Date(badge.earnedAt).toLocaleDateString('pt-BR')}
            </div>
          )}
          
          {/* Seta do tooltip */}
          <div className="
            absolute top-full left-1/2 transform -translate-x-1/2
            border-l-4 border-r-4 border-t-4
            border-l-transparent border-r-transparent border-t-gray-900
          " />
        </div>
      )}
    </div>
  );
};

// Componente para exibir múltiplas badges
interface BadgeCollectionProps {
  badges: Badge[];
  maxDisplay?: number;
  size?: 'small' | 'medium' | 'large';
}

export const BadgeCollection: React.FC<BadgeCollectionProps> = ({ 
  badges, 
  maxDisplay = 5,
  size = 'medium' 
}) => {
  const displayBadges = badges.slice(0, maxDisplay);
  const remainingCount = badges.length - maxDisplay;

  return (
    <div className="flex items-center space-x-2">
      {displayBadges.map((badge) => (
        <BadgeComponent 
          key={badge.id} 
          badge={badge} 
          size={size}
        />
      ))}
      
      {remainingCount > 0 && (
        <div className={`
          ${sizeStyles[size]}
          bg-gray-700 text-white
          rounded-full flex items-center justify-center
          text-xs font-bold
          border-2 border-gray-600
        `}>
          +{remainingCount}
        </div>
      )}
    </div>
  );
};
