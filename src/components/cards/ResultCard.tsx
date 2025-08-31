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
      className="p-6 relative"
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.5 }}
      transition={{ duration: 0.7 }}
    >
      {/* Aura arcana */}
      <div 
        className={`
          absolute inset-0 -z-10 rounded-3xl transition-all duration-700
          bg-[radial-gradient(circle_at_center,rgba(163,131,255,0.35),transparent_70%)]
          blur-xl ${isHovered ? 'scale-110 opacity-100' : 'opacity-60'}
        `}
      />

      <motion.div
        layout
        onHoverStart={() => setIsHovered(true)}
        onHoverEnd={() => setIsHovered(false)}
        transition={{ layout: { duration: 0.5, ease: [0.4, 0, 0.2, 1] } }}
        className="relative w-full max-w-sm mx-auto md:max-w-none md:w-auto cursor-pointer rounded-2xl shadow-2xl overflow-hidden group border border-[#5d3a9b]/30"
      >
        {/* Imagem com filtro místico */}
        <motion.img
          src={image}
          alt={title}
          loading="lazy"
          width={500}
          height={500}
          className="absolute inset-0 w-full h-full object-cover"
          animate={{ 
            scale: isHovered ? 1.07 : 1, 
            filter: isHovered ? 'brightness(1) saturate(1.2)' : 'brightness(0.6) saturate(0.9)' 
          }}
          transition={{ duration: 0.5 }}
        />
        
        <div
          className="relative flex flex-col w-full text-white p-6 justify-end"
          style={{ 
            minHeight: '200px',
            backgroundImage: 'linear-gradient(to top, rgba(16, 12, 33, 0.95) 25%, rgba(16, 12, 33, 0.7) 60%, transparent 100%)' 
          }}
        >
          <motion.p 
            layout="position"
            className="font-serif text-3xl font-bold tracking-wide text-[#e6d6ff]"
          >
            {title}
          </motion.p>
          
          <motion.div
            className="overflow-hidden"
            initial={false}
            animate={{ maxHeight: isHovered ? '250px' : '0px' }}
            transition={{ duration: 0.5, ease: [0.4, 0, 0.2, 1] }}
          >
            <div className="pt-3"> 
              <p className="text-[#cbb8ff] text-sm leading-relaxed">
                {description}
              </p>
              <div className="mt-4">
                <Button 
                  variant="ghost" 
                  className="px-5 py-2 text-sm rounded-full bg-[#2f2546]/70 hover:bg-[#5d3a9b]/60 transition-colors"
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
