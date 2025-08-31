import type { FC } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { User, Users, ArrowRight, Sparkles, Stars, Eye } from 'lucide-react';

interface ActionCardProps {
  href: string;
  icon: React.ElementType;
  title: string;
  description: string;
  gradient: string;
  accentColor: string;
  delay: number;
  features: string[];
}

// Card Ultra Premium com design místico avançado
const ActionCard: FC<ActionCardProps> = ({ 
  href, 
  icon: Icon, 
  title, 
  description, 
  gradient, 
  accentColor,
  delay,
  features 
}) => (
  <Link to={href} className="group block focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FFD700] focus-visible:ring-offset-2 focus-visible:ring-offset-[#161221]">
    <motion.div
      className="relative overflow-hidden bg-gradient-to-br from-[#2f2546]/90 via-[#1a1625] to-[#0f0a1a] border border-[#3d2f52]/50 rounded-3xl p-8 h-full min-h-[280px] transition-all duration-700 group-hover:border-[#8b63e9]/80 group-hover:shadow-2xl group-hover:shadow-[#8b63e9]/30 backdrop-blur-md"
      whileHover={{ 
        y: -12, 
        scale: 1.03,
        rotateX: 5,
        rotateY: 2
      }}
      whileTap={{ scale: 0.97 }}
      initial={{ opacity: 0, y: 40, rotateX: 10 }}
      animate={{ opacity: 1, y: 0, rotateX: 0 }}
      transition={{ 
        delay, 
        duration: 0.8,
        type: "spring",
        stiffness: 100,
        damping: 15
      }}
      style={{ transformStyle: 'preserve-3d' }}
    >
      {/* Gradiente de fundo dinâmico aprimorado */}
      <div className={`absolute inset-0 bg-gradient-to-br ${gradient} opacity-0 group-hover:opacity-20 transition-all duration-700`} />
      
      {/* Múltiplas camadas de brilho */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#FFD700]/40 to-transparent" />
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#8b63e9]/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      
      {/* Sistema de partículas avançado */}
      <div className="absolute top-4 right-4 opacity-30 group-hover:opacity-60 transition-opacity duration-400">
        <motion.div
          animate={{ 
            rotate: 360,
            scale: [1, 1.2, 1]
          }}
          transition={{ 
            rotate: { duration: 8, repeat: Infinity, ease: "linear" },
            scale: { duration: 2, repeat: Infinity, ease: "easeInOut" }
          }}
        >
          <Sparkles size={18} className="text-[#FFD700]" />
        </motion.div>
      </div>
      
      <div className="absolute top-6 left-4 opacity-20 group-hover:opacity-40 transition-opacity duration-600">
        <motion.div
          animate={{ 
            y: [-2, 2, -2],
            opacity: [0.2, 0.6, 0.2]
          }}
          transition={{ 
            duration: 3, 
            repeat: Infinity, 
            ease: "easeInOut",
            delay: 1
          }}
        >
          <Stars size={14} className="text-[#8b63e9]" />
        </motion.div>
      </div>

      {/* Partículas adicionais */}
      <div className="absolute bottom-6 right-8 opacity-10 group-hover:opacity-30 transition-opacity duration-700">
        <motion.div
          animate={{ rotate: -360 }}
          transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
        >
          <Eye size={12} className={`text-[${accentColor}]`} />
        </motion.div>
      </div>

      {/* Container principal com layout aprimorado */}
      <div className="relative z-10 flex flex-col h-full">
        {/* Header do card */}
        <div className="flex flex-col items-center text-center mb-6">
          {/* Ícone com design ultra premium */}
          <motion.div 
            className={`relative p-5 rounded-3xl bg-gradient-to-br from-[#FFD700]/15 via-[${accentColor}]/10 to-transparent border border-[#FFD700]/30 group-hover:border-[#FFD700]/60 transition-all duration-500 mb-4`}
            whileHover={{ 
              rotate: 8,
              scale: 1.1,
              boxShadow: `0 0 30px ${accentColor}40`
            }}
            transition={{ type: "spring", stiffness: 400, damping: 10 }}
          >
            <Icon size={40} className={`text-[${accentColor}] group-hover:text-[#FFD700] transition-colors duration-400`} />
            
            {/* Múltiplos brilhos internos */}
            <div className={`absolute inset-0 rounded-3xl bg-[${accentColor}]/10 blur-md opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />
            <div className="absolute inset-0 rounded-3xl bg-[#FFD700]/5 blur-lg opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
            
            {/* Anel orbital */}
            <motion.div
              className="absolute inset-0 rounded-3xl border border-[#FFD700]/20"
              animate={{ rotate: 360 }}
              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            />
          </motion.div>

          {/* Título com gradiente de texto */}
          <motion.h4 
            className="font-['Marcellus_SC'] text-2xl bg-gradient-to-r from-[#FFD700] via-[#FFF] to-[#8b63e9] bg-clip-text text-transparent group-hover:from-[#FFD700] group-hover:via-[#FFD700] group-hover:to-[#FFF] transition-all duration-500"
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            {title}
          </motion.h4>
        </div>

        {/* Descrição expandida */}
        <div className="flex-1 flex flex-col justify-between">
          <p className="text-sm text-gray-300 leading-relaxed text-center mb-4 group-hover:text-gray-200 transition-colors duration-300">
            {description}
          </p>

          {/* Lista de recursos premium */}
          <div className="space-y-2 mb-6">
            {features.map((feature, index) => (
              <motion.div
                key={feature}
                className="flex items-center text-xs text-gray-400 group-hover:text-gray-300 transition-colors duration-300"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: delay + 0.1 + (index * 0.1), duration: 0.5 }}
              >
                <motion.div
                  className="w-1.5 h-1.5 rounded-full bg-[#8b63e9] mr-2"
                  whileHover={{ scale: 1.5 }}
                  transition={{ type: "spring", stiffness: 500 }}
                />
                <span>{feature}</span>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Footer do card com CTA premium */}
        <div className="relative mt-auto">
          <motion.div 
            className={`absolute -bottom-2 -right-2 flex items-center justify-center w-12 h-12 rounded-2xl bg-gradient-to-br from-[${accentColor}]/30 to-[#8b63e9]/20 border border-[${accentColor}]/40 text-[${accentColor}] opacity-0 group-hover:opacity-100 transition-all duration-500 group-hover:shadow-lg group-hover:shadow-[${accentColor}]/30`}
            initial={{ x: -20, opacity: 0, rotate: -90 }}
            whileHover={{ 
              x: 0, 
              opacity: 1, 
              rotate: 0,
              scale: 1.1
            }}
            transition={{ 
              duration: 0.4,
              type: "spring",
              stiffness: 300
            }}
          >
            <ArrowRight size={20} className="transform group-hover:translate-x-1 transition-transform duration-300" />
            
            {/* Pulse ring */}
            <motion.div
              className={`absolute inset-0 rounded-2xl border border-[${accentColor}]/60`}
              animate={{ 
                scale: [1, 1.2, 1],
                opacity: [0.5, 0, 0.5]
              }}
              transition={{ 
                duration: 2, 
                repeat: Infinity,
                ease: "easeInOut"
              }}
            />
          </motion.div>
        </div>
      </div>

      {/* Borda mágica animada */}
      <div className="absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none">
        <motion.div 
          className="absolute inset-0 rounded-3xl"
          animate={{ 
            background: [
              `linear-gradient(0deg, #FFD700, transparent, #8b63e9, transparent, #FFD700)`,
              `linear-gradient(90deg, #8b63e9, transparent, #FFD700, transparent, #8b63e9)`,
              `linear-gradient(180deg, #FFD700, transparent, #8b63e9, transparent, #FFD700)`,
              `linear-gradient(270deg, #8b63e9, transparent, #FFD700, transparent, #8b63e9)`
            ]
          }}
          transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
          style={{ 
            mask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
            maskComposite: 'xor',
            WebkitMask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
            WebkitMaskComposite: 'xor',
            padding: '2px'
          }}
        />
      </div>

      {/* Efeito de profundidade 3D */}
      <div className="absolute inset-0 rounded-3xl bg-gradient-to-b from-transparent via-transparent to-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
    </motion.div>
  </Link>
);

export const ActionCards: FC = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delayChildren: 0.3,
        staggerChildren: 0.15
      }
    }
  };

  const cards = [
    {
      href: "/#formulario",
      icon: User,
      title: "Meu Relatório Pessoal",
      description: "Desperte os segredos do seu universo interior através de análises astrológicas profundas e revelações arcanas personalizadas.",
      gradient: "from-[#FFD700]/25 via-[#8b63e9]/15 to-[#2f2546]/25",
      accentColor: "#FFD700",
      delay: 0,
      features: [
        "Mapa astral completo e personalizado",
        "Análise de personalidade profunda",
        "Previsões e tendências futuras",
        "Arcanos maiores e menores"
      ]
    },
    {
      href: "/sinastria",
      icon: Users,
      title: "Analisar Conexão",
      description: "Explore a dança cósmica entre duas almas e desvende os mistérios da compatibilidade através da sabedoria ancestral.",
      gradient: "from-[#8b63e9]/25 via-[#FFD700]/15 to-[#2f2546]/25",
      accentColor: "#8b63e9",
      delay: 0.15,
      features: [
        "Compatibilidade astrológica detalhada",
        "Análise de conexões energéticas",
        "Pontos de harmonia e desafios",
        "Orientações para relacionamentos"
      ]
    }
  ];

  return (
    <motion.div
      className="space-y-8"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {cards.map((card) => (
        <ActionCard 
          key={card.href}
          href={card.href}
          icon={card.icon}
          title={card.title}
          description={card.description}
          gradient={card.gradient}
          accentColor={card.accentColor}
          delay={card.delay}
          features={card.features}
        />
      ))}
      
      {/* Elemento decorativo entre cards */}
      <motion.div 
        className="flex justify-center py-4"
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.5, duration: 0.8 }}
      >
        <motion.div
          className="w-12 h-0.5 bg-gradient-to-r from-transparent via-[#FFD700]/50 to-transparent"
          animate={{ 
            width: ["0px", "48px", "0px"],
            opacity: [0, 1, 0]
          }}
          transition={{ 
            duration: 3, 
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
      </motion.div>
    </motion.div>
  );
};