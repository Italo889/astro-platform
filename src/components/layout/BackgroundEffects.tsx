// src/components/layout/BackgroundEffects.tsx

import { useEffect } from 'react';

export const BackgroundEffects = () => {
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      document.documentElement.style.setProperty('--mouse-x', `${e.clientX}px`);
      document.documentElement.style.setProperty('--mouse-y', `${e.clientY}px`);
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
      <div className="pointer-events-none fixed inset-0 z-30 transition duration-300"
           style={{ background: 'radial-gradient(600px at var(--mouse-x) var(--mouse-y), rgba(145, 100, 233, 0.15), transparent 80%)' }} />
      <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-[#161221] via-[#161221] to-[#2f2546]/50 -z-10" />
      <div 
        className="absolute top-[-20%] left-[10%] w-[500px] h-[500px] bg-radial-gradient from-[#8b63e9]/20 to-transparent rounded-full blur-3xl -z-10"
        style={{ transform: 'translateY(var(--scroll-y, 0px))' }}
      />
      <div
        className="absolute bottom-[-20%] right-[10%] w-[400px] h-[400px] bg-radial-gradient from-[#FFD700]/10 to-transparent rounded-full blur-3xl -z-10"
        style={{ transform: 'translateY(var(--scroll-y, 0px))' }}
      />
    </>
  );
};