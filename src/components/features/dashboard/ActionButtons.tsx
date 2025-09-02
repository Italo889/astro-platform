import type { FC, JSX } from 'react';
import { User, Link as LinkIcon } from 'lucide-react';
import { Link } from 'react-router-dom';

const ActionButton: FC<{ to: string; icon: JSX.Element; title: string; description: string }> = ({ to, icon, title, description }) => (
  <Link 
    to={to}
    className="flex-1 bg-surface/50 padding-responsive-md rounded-xl hover:bg-surface/80
               border border-surface hover:border-accent/50 transition-all duration-300"
  >
    <div className="flex items-start space-responsive-sm">
      <div className="text-accent mt-1 flex-shrink-0">{icon}</div>
      <div className="min-w-0 flex-1">
        <h3 className="font-serif text-responsive-base sm:text-responsive-lg text-text-base truncate">{title}</h3>
        <p className="text-responsive-xs sm:text-responsive-sm text-text-muted mt-1 line-clamp-2">{description}</p>
      </div>
    </div>
  </Link>
);

export const ActionButtons: FC = () => {
  return (
    <div className="flex-responsive space-responsive-md">
      <ActionButton
        to="/resultado" // Ajuste a rota se necessário
        icon={<User />}
        title="Meu Relatório Pessoal"
        description="Reveja e explore seu mapa astral e arcano de vida."
      />
      <ActionButton
        to="/sinastria"
        icon={<LinkIcon />}
        title="Analisar Conexão"
        description="Descubra a dinâmica entre dois universos pessoais."
      />
    </div>
  );
};