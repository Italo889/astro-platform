import type { FC } from 'react';
import { useAuthStore } from '../store/authStore';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';
import { LoaderCircle, Telescope, Sparkles, Moon, Sun, Star, ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { getMyReports } from '../services/reportService';
import { Button } from '../components/ui/Button';
import { useEffect, useState } from 'react';

import { PowerTriad } from '../components/features/dashboard/PowerTriad';
import { ActionButtons } from '../components/features/dashboard/ActionButtons';
import { RecentReportsList } from '../components/features/dashboard/RecentReportsList';
import type { SavedReport, PersonalReport } from '../domain/types';

// Componente de partículas mágicas flutuantes
const MagicalParticles: FC = () => {
  const particles = Array.from({ length: 20 }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    duration: 15 + Math.random() * 20,
    delay: Math.random() * 5,
    size: Math.random() * 4 + 2,
  }));

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden">
      {particles.map((particle) => (
        <motion.div
          key={particle.id}
          className="absolute rounded-full bg-gradient-to-br from-primary/20 to-accent/20 blur-sm"
          style={{
            width: particle.size,
            height: particle.size,
            left: `${particle.x}%`,
          }}
          animate={{
            y: ['100vh', '-10vh'],
            opacity: [0, 1, 0],
          }}
          transition={{
            duration: particle.duration,
            repeat: Infinity,
            delay: particle.delay,
            ease: 'linear',
          }}
        />
      ))}
    </div>
  );
};

// Componente Aurora Effect
const AuroraEffect: FC = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none">
      <motion.div
        className="absolute w-96 h-96 rounded-full"
        style={{
          background: 'radial-gradient(circle, rgba(255,215,0,0.1) 0%, rgba(139,99,233,0.05) 40%, transparent 70%)',
          filter: 'blur(40px)',
        }}
        animate={{
          x: mousePosition.x - 192,
          y: mousePosition.y - 192,
        }}
        transition={{ type: 'spring', damping: 30, stiffness: 200 }}
      />
    </div>
  );
};

// Componente de saudação temporal
const TemporalGreeting: FC<{ name?: string }> = ({ name }) => {
  const hour = new Date().getHours();
  const getGreeting = () => {
    if (hour < 6) return { text: 'Boa madrugada', icon: Moon, color: 'text-accent' };
    if (hour < 12) return { text: 'Bom dia', icon: Sun, color: 'text-primary' };
    if (hour < 18) return { text: 'Boa tarde', icon: Sun, color: 'text-primary' };
    return { text: 'Boa noite', icon: Moon, color: 'text-accent' };
  };

  const { text, icon: Icon, color } = getGreeting();

  return (
    <div className="flex items-center gap-2">
      <Icon className={`${color} animate-pulse`} size={20} />
      <span className="text-text-muted">
        {text}, <span className="text-text-base font-medium">{name?.split(' ')[0]}</span>
      </span>
    </div>
  );
};

const DashboardPage: FC = () => {
  const user = useAuthStore((state) => state.user);
  const { scrollY } = useScroll();
  const headerOpacity = useTransform(scrollY, [0, 100], [1, 0.8]);
  
  const { data: reports, isLoading, isError } = useQuery<SavedReport[]>({
    queryKey: ['myReports'],
    queryFn: getMyReports,
    retry: 1,
  });

  const mainPersonalReport = reports?.find(
    (r): r is SavedReport & { content: PersonalReport } => 'astrology' in r.content
  );

  const renderContent = () => {
    if (isLoading) {
      return (
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="flex flex-col items-center justify-center text-center h-96 relative"
        >
          <div className="absolute inset-0 bg-gradient-radial from-accent/10 to-transparent animate-pulse" />
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 3, repeat: Infinity, ease: 'linear' }}
          >
            <LoaderCircle className="text-accent mb-4" size={48}/>
          </motion.div>
          <h3 className="font-serif text-2xl text-text-base">Alinhando os cosmos...</h3>
          <p className="text-text-muted mt-2">Buscando os registros do seu santuário pessoal</p>
        </motion.div>
      );
    }

    if (isError || !reports) {
      return (
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center p-12 bg-gradient-to-b from-surface/40 to-surface/20 backdrop-blur-md rounded-3xl border border-surface/50 shadow-2xl"
        >
          <div className="flex flex-col items-center">
            <div className="p-4 bg-accent/10 rounded-full mb-4">
              <Telescope className="text-accent" size={32} />
            </div>
            <h4 className="font-serif text-2xl text-white">Sinal Cósmico Interrompido</h4>
            <p className="text-text-muted mt-3 text-base max-w-md">
              Os astros parecem estar desalinhados. Por favor, tente novamente em alguns instantes.
            </p>
            <Button variant="ghost" className="mt-6" onClick={() => window.location.reload()}>
              Reconectar aos Cosmos
            </Button>
          </div>
        </motion.div>
      );
    }

    if (reports.length === 0 || !mainPersonalReport) {
      return (
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="relative overflow-hidden"
        >
          <div className="flex flex-col items-center justify-center text-center min-h-[400px] bg-gradient-to-br from-surface/40 via-surface/30 to-accent/10 backdrop-blur-md rounded-3xl border border-surface/50 p-12 shadow-2xl">
            {/* Decorative elements */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-primary/10 rounded-full blur-3xl" />
            <div className="absolute bottom-0 left-0 w-40 h-40 bg-accent/10 rounded-full blur-3xl" />
            
            <motion.div
              initial={{ y: -10 }}
              animate={{ y: 10 }}
              transition={{ duration: 3, repeat: Infinity, repeatType: 'reverse' }}
              className="mb-6"
            >
              <div className="relative">
                <Telescope className="text-accent/60" size={64} />
                <Sparkles className="absolute -top-2 -right-2 text-primary animate-pulse" size={24} />
              </div>
            </motion.div>
            
            <h3 className="font-serif text-3xl text-text-base mb-3">Seu Santuário Aguarda</h3>
            <p className="text-text-muted text-lg max-w-md mb-8">
              Revele os segredos do cosmos e decodifique sua Tríade de Poder. 
              Sua jornada de autoconhecimento começa aqui.
            </p>
            
            <Link to="/#formulario">
            <Button 
              className="group relative overflow-hidden px-6 py-3 text-lg"
            >
                <span className="relative z-10 flex items-center gap-2">
                  Decodificar meu destino
                  <ChevronRight className="group-hover:translate-x-1 transition-transform" size={20} />
                </span>
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-primary/20 to-accent/20"
                  initial={{ x: '-100%' }}
                  whileHover={{ x: 0 }}
                  transition={{ duration: 0.3 }}
                />
              </Button>
            </Link>
          </div>
        </motion.div>
      );
    }
    
    const { sun } = mainPersonalReport.content.astrology;
    const { personalArcana, personalityArcana } = mainPersonalReport.content.arcana;

    return (
      <AnimatePresence mode="wait">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
          className="space-y-16"
        >
          {/* Tríade de Poder com animação especial */}
          <motion.section 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative"
          >
            <div className="absolute -inset-4 bg-gradient-to-r from-primary/5 via-accent/5 to-primary/5 blur-3xl" />
            <PowerTriad 
              sunSign={sun.sign}
              personalArcana={personalArcana}
              personalityArcana={personalityArcana}
            />
          </motion.section>

          {/* Action Buttons com hover effects aprimorados */}
          <motion.section 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <ActionButtons />
          </motion.section>

          {/* Recent Reports com visual aprimorado */}
          <motion.section
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            <div className="flex items-center justify-between mb-8">
              <h2 className="font-serif text-3xl text-text-base">Jornadas Recentes</h2>
              <div className="flex items-center gap-2 text-text-muted">
                <Star className="text-accent" size={18} />
                <span className="text-sm">{reports.length} análises realizadas</span>
              </div>
            </div>
            <RecentReportsList reports={reports} />
          </motion.section>
        </motion.div>
      </AnimatePresence>
    );
  };

  return (
    <div className="relative flex min-h-screen flex-col bg-background overflow-hidden text-white">
      {/* Efeitos visuais de fundo */}
      <MagicalParticles />
      <AuroraEffect />
      
      {/* Background gradient animado */}
      <div className="fixed inset-0 bg-gradient-to-br from-background via-surface/20 to-background">
        <div className="absolute inset-0 bg-[url('/noise.png')] opacity-5" />
      </div>

      <main className="relative z-10 flex-1 animate-fade-in w-full">
        <div className="mx-auto max-w-6xl px-6 py-12 sm:py-20">
          <motion.header
            style={{ opacity: headerOpacity }}
            initial={{ opacity: 0, y: -30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: 'easeOut' }}
            className="mb-16 relative"
          >
            <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-6">
              <div>
                <motion.h1 
                  className="font-serif-logo text-5xl md:text-6xl text-text-base mb-4"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.8, delay: 0.2 }}
                >
                  Seu Santuário Pessoal
                </motion.h1>
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.8, delay: 0.4 }}
                >
                  <TemporalGreeting name={user?.name} />
                </motion.div>
              </div>
              
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.6 }}
                className="flex items-center gap-3"
              >
                <div className="px-4 py-2 bg-surface/50 backdrop-blur-sm rounded-full border border-surface/50 flex items-center gap-2">
                  <Sparkles className="text-primary" size={16} />
                  <span className="text-sm text-text-muted">Energia Cósmica Ativa</span>
                </div>
              </motion.div>
            </div>
            
            {/* Ornamental divider */}
            <motion.div
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 1, delay: 0.8 }}
              className="mt-8 h-px bg-gradient-to-r from-transparent via-accent/50 to-transparent"
            />
          </motion.header>

          {renderContent()}
        </div>
      </main>
    </div>
  );
};

export default DashboardPage;