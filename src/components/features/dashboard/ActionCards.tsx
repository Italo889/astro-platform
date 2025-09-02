import type { FC } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { User, Users, ArrowRight, Sparkles } from 'lucide-react';

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

// Card Ultra Clean e Moderno
const ActionCard: FC<ActionCardProps> = ({ 
  href, 
  icon: Icon, 
  title, 
  description, 
  gradient, 
  delay,
  features 
}) => (
  <Link to={href} className="group block focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#8b63e9] focus-visible:ring-offset-2 focus-visible:ring-offset-[#161221]">
    <motion.div
      className="relative overflow-hidden bg-[#1a1625]/90 backdrop-blur-xl border border-[#8b63e9]/20 hover:border-[#8b63e9]/50 
                 rounded-3xl p-8 h-full min-h-[280px] transition-all duration-500 
                 shadow-lg hover:shadow-xl hover:shadow-[#8b63e9]/20 group-hover:scale-[1.02]"
      whileHover={{ y: -8 }}
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ 
        delay, 
        duration: 0.6,
        type: "spring",
        stiffness: 100,
        damping: 15
      }}
    >
      {/* Gradient de fundo sutil */}
      <div className={`absolute inset-0 ${gradient} opacity-0 group-hover:opacity-30 transition-opacity duration-500 rounded-3xl`} />
      
      {/* Container principal */}
      <div className="relative z-10 flex flex-col h-full">
        
        {/* Header elegante */}
        <div className="flex items-start justify-between mb-6">
          <div className="flex-1">
            <h3 className="font-serif text-2xl md:text-3xl text-white group-hover:text-[#FFD700] transition-colors duration-300 mb-3 leading-tight">
              {title}
            </h3>
            
            {/* Decorative line */}
            <motion.div 
              className="h-px bg-gradient-to-r from-[#8b63e9] to-transparent"
              initial={{ width: '0%' }}
              animate={{ width: '60%' }}
              transition={{ delay: delay + 0.3, duration: 0.8 }}
            />
          </div>

          {/* Ícone moderno */}
          <motion.div 
            className="p-4 rounded-2xl bg-[#8b63e9]/10 border border-[#8b63e9]/20 group-hover:bg-[#8b63e9]/20 group-hover:border-[#8b63e9]/40 transition-all duration-300"
            whileHover={{ scale: 1.1, rotate: 8 }}
          >
            <Icon size={28} className="text-[#8b63e9] group-hover:text-white transition-colors duration-300" />
          </motion.div>
        </div>

        {/* Conteúdo principal */}
        <div className="flex-1 flex flex-col justify-between">
          {/* Descrição */}
          <p className="text-base md:text-lg text-white/80 leading-relaxed group-hover:text-white/90 transition-colors duration-300 mb-6">
            {description}
          </p>

          {/* Features como tags */}
          <div className="flex flex-wrap gap-2 mb-6">
            {features.slice(0, 3).map((feature, index) => (
              <motion.span
                key={feature}
                className="px-3 py-1.5 bg-[#2f2546]/50 border border-[#8b63e9]/20 rounded-full text-xs text-white/70 
                          group-hover:bg-[#8b63e9]/20 group-hover:text-white/80 transition-all duration-300"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: delay + 0.1 + (index * 0.1), duration: 0.4 }}
              >
                {feature}
              </motion.span>
            ))}
          </div>

          {/* CTA moderno */}
          <motion.div 
            className="flex items-center justify-between pt-4 border-t border-white/5"
            whileHover={{ x: 4 }}
          >
            <div className="flex items-center gap-2 text-[#8b63e9] group-hover:text-[#FFD700] transition-colors duration-300">
              <Sparkles className="w-4 h-4" />
              <span className="text-sm font-medium">Explorar agora</span>
            </div>
            
            <motion.div
              whileHover={{ x: 4 }}
              className="p-2 rounded-xl bg-[#8b63e9]/10 group-hover:bg-[#FFD700]/20 transition-all duration-300"
            >
              <ArrowRight className="w-5 h-5 text-[#8b63e9] group-hover:text-[#FFD700] transition-colors duration-300" />
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Partículas decorativas */}
      <div className="absolute top-6 right-16 w-1 h-1 bg-[#FFD700]/30 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      <div className="absolute bottom-8 left-12 w-0.5 h-0.5 bg-[#8b63e9]/40 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-700 delay-200" />
    </motion.div>
  </Link>
);

export const ActionCards: FC = () => {
  const cards = [
    {
      href: "/#formulario",
      icon: User,
      title: "Relatório Pessoal",
      description: "Desvende os segredos do seu universo interior através de uma análise astrológica completa e personalizada.",
      gradient: "bg-gradient-to-br from-[#FFD700]/20 via-[#8b63e9]/10 to-[#FFD700]/5",
      accentColor: "#FFD700",
      delay: 0,
      features: [
        "Mapa astral personalizado",
        "Análise numerológica",
        "Arcanos e previsões"
      ]
    },
    {
      href: "/sinastria",
      icon: Users,
      title: "Análise de Conexão",
      description: "Explore a compatibilidade entre duas pessoas através da sabedoria ancestral da astrologia e sinastria.",
      gradient: "bg-gradient-to-br from-[#8b63e9]/20 via-[#FFD700]/10 to-[#8b63e9]/5",
      accentColor: "#8b63e9",
      delay: 0.2,
      features: [
        "Compatibilidade detalhada",
        "Conexões energéticas",
        "Orientações práticas"
      ]
    }
  ];

  return (
    <motion.div
      className="grid grid-cols-1 lg:grid-cols-2 gap-8"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6, delay: 0.2 }}
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
    </motion.div>
  );
};