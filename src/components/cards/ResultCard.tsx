// src/components/cards/ResultCard.tsx

import { useState } from 'react';
import type { FC } from 'react';
import { motion } from 'framer-motion';
import { Button } from '../ui/Button';
import { ArrowRight } from 'lucide-react';

interface ResultCardProps {
  title: string;
  description: string;
  image: string;
  buttonText: string;
}

export const ResultCard: FC<ResultCardProps> = ({ title, description, image, buttonText }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      className="p-4 relative" // Tornamos este container o ponto de referência
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.5 }}
      transition={{ duration: 0.7 }}
    >
      {/* A LUZ VIVA: Este é o nosso novo efeito de brilho pulsante */}
      <div 
        className={`
          absolute inset-0 -z-10 rounded-3xl transition-all duration-500
          bg-gradient-to-tr from-transparent via-[rgb(var(--color-accent))] to-transparent
          animate-breathing-light
          group-hover:scale-125
          ${isHovered ? 'scale-125' : ''}
        `}
      />

      <motion.div
        layout
        onHoverStart={() => setIsHovered(true)}
        onHoverEnd={() => setIsHovered(false)}
        transition={{ layout: { duration: 0.4, ease: [0.4, 0, 0.2, 1] } }}
        className="relative w-full max-w-sm mx-auto md:max-w-none md:w-auto cursor-pointer rounded-2xl shadow-lg overflow-hidden group"
      >
        <motion.img
          src={image}
          alt={title}
          loading="lazy"
          width={500}
          height={500}
          className="absolute inset-0 w-full h-full object-cover"
          animate={{ scale: isHovered ? 1.05 : 1, filter: isHovered ? 'brightness(1)' : 'brightness(0.7)' }}
          transition={{ duration: 0.4 }}
        />
        
        <div
          className="relative flex flex-col w-full text-white p-6 justify-end"
          style={{ 
            minHeight: '180px',
            backgroundImage: 'linear-gradient(to top, rgba(16, 12, 33, 0.95) 20%, rgba(16, 12, 33, 0.7) 50%, transparent 100%)' 
          }}
        >
          <motion.p 
            layout="position"
            className="font-serif text-3xl font-bold"
          >
            {title}
          </motion.p>
          
          <motion.div
            className="overflow-hidden"
            initial={false}
            animate={{ maxHeight: isHovered ? '200px' : '0px' }}
            transition={{ duration: 0.4, ease: [0.4, 0, 0.2, 1] }}
          >
            <div className="pt-2"> 
              <p className="text-[rgb(var(--color-text-muted))] text-sm">
                {description}
              </p>
              <div className="mt-4">
                <Button 
                  variant="ghost" 
                  className="px-5 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[rgb(var(--color-primary))]"
                >
                  <span>{buttonText}</span>
                  <ArrowRight size={18} />
                </Button>
              </div>
            </div>
          </motion.div>
        </div>
      </motion.div>
    </motion.div>
  );
};