// src/components/layout/BackgroundEffects.tsx

import { useEffect, useState, useCallback } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

interface Particle {
  id: number;
  x: number;
  y: number;
  size: number;
  velocity: { x: number; y: number };
  opacity: number;
  color: string;
  type: 'star' | 'cosmic' | 'energy';
}

export const BackgroundEffects = () => {
  const [particles, setParticles] = useState<Particle[]>([]);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const { scrollYProgress } = useScroll();
  
  // Transformações baseadas no scroll
  const cosmicRotation = useTransform(scrollYProgress, [0, 1], [0, 360]);

  // Criar partículas cósmicas
  const createParticles = useCallback(() => {
    const newParticles: Particle[] = [];
    const particleCount = 50;

    for (let i = 0; i < particleCount; i++) {
      const types: Array<'star' | 'cosmic' | 'energy'> = ['star', 'cosmic', 'energy'];
      const colors = ['#FFD700', '#8B63E9', '#4FD1C7', '#F59E0B', '#EC4899'];
      
      newParticles.push({
        id: i,
        x: Math.random() * window.innerWidth,
        y: Math.random() * window.innerHeight,
        size: Math.random() * 4 + 1,
        velocity: {
          x: (Math.random() - 0.5) * 0.5,
          y: (Math.random() - 0.5) * 0.5,
        },
        opacity: Math.random() * 0.8 + 0.2,
        color: colors[Math.floor(Math.random() * colors.length)],
        type: types[Math.floor(Math.random() * types.length)],
      });
    }

    setParticles(newParticles);
  }, []);

  // Atualizar partículas
  const updateParticles = useCallback(() => {
    setParticles(prev => prev.map(particle => {
      let newX = particle.x + particle.velocity.x;
      let newY = particle.y + particle.velocity.y;

      // Reposicionar se sair da tela
      if (newX < 0 || newX > window.innerWidth) {
        newX = Math.random() * window.innerWidth;
      }
      if (newY < 0 || newY > window.innerHeight) {
        newY = Math.random() * window.innerHeight;
      }

      // Interação com o mouse
      const mouseDistance = Math.sqrt(
        Math.pow(newX - mousePosition.x, 2) + Math.pow(newY - mousePosition.y, 2)
      );
      
      let newOpacity = particle.opacity;
      if (mouseDistance < 100) {
        newOpacity = Math.min(1, particle.opacity + 0.3);
      }

      return {
        ...particle,
        x: newX,
        y: newY,
        opacity: newOpacity,
      };
    }));
  }, [mousePosition]);

  useEffect(() => {
    createParticles();
    
    const handleResize = () => createParticles();
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [createParticles]);

  useEffect(() => {
    const interval = setInterval(updateParticles, 50);
    return () => clearInterval(interval);
  }, [updateParticles]);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    
    document.documentElement.style.scrollBehavior = 'smooth';
    window.addEventListener('mousemove', handleMouseMove);

    const handleScroll = () => {
      const offsetY = window.pageYOffset;
      document.body.style.setProperty('--scroll-y', `${offsetY * 0.3}px`);
    };
    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('scroll', handleScroll);
      document.documentElement.style.scrollBehavior = 'auto';
    };
  }, []);

  return (
    <>
      {/* Background Base Cósmico - SEMPRE VISÍVEL */}
      <div className="fixed inset-0 -z-50 bg-[#161221]">
        {/* Nebulosas principais - opacidades fixas */}
        <div 
          className="absolute top-[-20%] left-[-10%] w-[80%] h-[80%] rounded-full"
          style={{ 
            background: 'radial-gradient(circle, #2f2546 0%, #1a1329 40%, transparent 70%)',
            filter: 'blur(80px)',
            opacity: 0.1
          }}
        />
        
        <div 
          className="absolute bottom-[-20%] right-[-10%] w-[70%] h-[70%] rounded-full"
          style={{ 
            background: 'radial-gradient(circle, #1e1b2e 0%, #161221 30%, transparent 70%)',
            filter: 'blur(100px)',
            opacity: 0.08
          }}
        />

        {/* Nebulosa central */}
        <div 
          className="absolute top-1/2 left-1/2 w-[60%] h-[60%] rounded-full"
          style={{
            background: 'radial-gradient(circle, #252138 0%, #161221 50%, transparent 80%)',
            transform: 'translate(-50%, -50%)',
            filter: 'blur(120px)',
            opacity: 0.05
          }}
        />

        {/* Nebulosas sutis */}
        <div 
          className="absolute top-[30%] left-[15%] w-[40%] h-[40%] rounded-full"
          style={{
            background: 'radial-gradient(circle, #2a213d 0%, transparent 60%)',
            filter: 'blur(90px)',
            opacity: 0.03
          }}
        />
        
        <div 
          className="absolute top-[60%] right-[20%] w-[35%] h-[35%] rounded-full"
          style={{
            background: 'radial-gradient(circle, #1f1a2c 0%, transparent 70%)',
            filter: 'blur(100px)',
            opacity: 0.04
          }}
        />

        {/* Nebulosa horizontal */}
        <div 
          className="absolute top-[80%] left-1/4 w-[50%] h-[20%] rounded-full"
          style={{
            background: 'radial-gradient(ellipse, #231d32 0%, transparent 80%)',
            filter: 'blur(80px)',
            opacity: 0.02
          }}
        />

        {/* Micro nebulosas */}
        {[...Array(6)].map((_, i) => (
          <div
            key={i}
            className="absolute rounded-full"
            style={{
              left: `${20 + i * 15}%`,
              top: `${25 + Math.sin(i) * 40}%`,
              width: `${8 + i * 2}%`,
              height: `${8 + i * 2}%`,
              background: i % 2 === 0 ? 
                'radial-gradient(circle, #261f37 0%, transparent 80%)' : 
                'radial-gradient(circle, #1c1829 0%, transparent 75%)',
              filter: 'blur(60px)',
              opacity: 0.02
            }}
          />
        ))}

        {/* Galáxia espiral */}
        <motion.div 
          className="absolute top-1/2 left-1/2 w-[150%] h-[150%]"
          style={{
            background: `
              conic-gradient(from 0deg at 50% 50%, 
                transparent 0deg, 
                #2f2546 60deg, 
                transparent 120deg, 
                #252138 180deg, 
                transparent 240deg, 
                #1e1b2e 300deg, 
                transparent 360deg
              )
            `,
            rotate: cosmicRotation,
            transformOrigin: 'center',
            transform: 'translate(-50%, -50%)',
            filter: 'blur(3px)',
            opacity: 0.05
          }}
        />
      </div>

      {/* Sistema de Partículas */}
      <div className="fixed inset-0 -z-40 overflow-hidden">
        {particles.map(particle => (
          <motion.div
            key={particle.id}
            className="absolute pointer-events-none"
            style={{
              left: particle.x,
              top: particle.y,
              width: particle.size,
              height: particle.size,
            }}
            animate={{
              opacity: [particle.opacity * 0.5, particle.opacity, particle.opacity * 0.7],
              scale: [1, 1.2, 1],
            }}
            transition={{
              duration: 2 + Math.random() * 3,
              repeat: Infinity,
              repeatType: 'reverse',
            }}
          >
            {particle.type === 'star' && (
              <div 
                className="w-full h-full rounded-full"
                style={{
                  background: particle.color,
                  boxShadow: `0 0 ${particle.size * 2}px ${particle.color}`,
                }}
              />
            )}
            
            {particle.type === 'cosmic' && (
              <div 
                className="w-full h-full rounded-full"
                style={{
                  background: `radial-gradient(circle, ${particle.color} 0%, transparent 70%)`,
                  filter: 'blur(1px)',
                }}
              />
            )}

            {particle.type === 'energy' && (
              <div 
                className="w-full h-full"
                style={{
                  background: particle.color,
                  clipPath: 'polygon(50% 0%, 61% 35%, 98% 35%, 68% 57%, 79% 91%, 50% 70%, 21% 91%, 32% 57%, 2% 35%, 39% 35%)',
                  filter: `drop-shadow(0 0 ${particle.size}px ${particle.color})`,
                }}
              />
            )}
          </motion.div>
        ))}
      </div>

      {/* Constelações */}
      <div className="fixed inset-0 -z-30 opacity-40">
        {[...Array(8)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 bg-gold-solar rounded-full"
            style={{
              left: `${15 + i * 12}%`,
              top: `${20 + Math.sin(i * 0.5) * 30}%`,
              filter: 'blur(0.5px)',
            }}
            animate={{
              opacity: [0.3, 1, 0.3],
              scale: [1, 1.5, 1],
            }}
            transition={{
              duration: 3 + i * 0.5,
              repeat: Infinity,
              delay: i * 0.2,
            }}
          />
        ))}
      </div>
    </>
  );
};