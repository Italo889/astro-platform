// src/components/features/dashboard/ActionCards.tsx

import type { FC } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { User, Users, ArrowRight } from 'lucide-react';

// Sub-componente para um único cartão de ação, agora com design aprimorado
const ActionCard: FC<{ href: string; icon: React.ElementType; title: string; description: string; }> = ({ href, icon: Icon, title, description }) => (
  // O Link agora tem as classes de foco para acessibilidade
  <Link to={href} className="group block rounded-2xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-primary focus-visible:ring-offset-background">
    <motion.div
      className="relative bg-gradient-to-br from-[rgb(var(--color-surface))]/50 to-[rgb(var(--color-background))] border border-[rgb(var(--color-surface))] rounded-2xl p-6 text-center h-full flex flex-col items-center justify-center transition-all duration-300 group-hover:border-accent/50 group-hover:shadow-2xl group-hover:shadow-accent/20"
      whileHover={{ y: -5, scale: 1.03 }}
      transition={{ type: 'spring', stiffness: 300 }}
    >
      <Icon size={32} className="text-primary" />
      <h4 className="font-serif text-xl text-white mt-3">{title}</h4>
      <p className="text-sm text-text-muted mt-1">{description}</p>

      {/* Indicador de seta que aparece no hover */}
      <motion.div 
        className="absolute bottom-4 right-4 text-text-muted"
        animate={{ opacity: 1, x: 0 }}
        key={href} // Garante a animação se o componente for reutilizado
        variants={{
            initial: { opacity: 0, x: -10 },
            hover: { opacity: 1, x: 0 }
        }}
        transition={{ duration: 0.3 }}
        whileHover="hover"
        initial="initial"
      >
          <ArrowRight size={20} />
      </motion.div>
    </motion.div>
  </Link>
);

export const ActionCards: FC = () => {
  return (
    // O espaçamento entre os cards agora é controlado pelo componente pai (DashboardPage)
    // Isso evita o bug de proximidade e segue as melhores práticas
    <motion.div
      className="space-y-6"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.2, ease: "easeOut" }}
    >
      <ActionCard 
        href="/#formulario"
        icon={User}
        title="Meu Relatório Pessoal"
        description="Revele e explore seu mapa astral e arcano de vida."
      />
      <ActionCard 
        href="/sinastria"
        icon={Users}
        title="Analisar Conexão"
        description="Descubra a dinâmica entre dois universos pessoais."
      />
    </motion.div>
  );
};