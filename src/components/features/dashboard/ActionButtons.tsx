import type { FC, JSX } from 'react';
import { User, Link as LinkIcon } from 'lucide-react';
import { Link } from 'react-router-dom';

const ActionButton: FC<{ to: string; icon: JSX.Element; title: string; description: string }> = ({ to, icon, title, description }) => (
  <Link 
    to={to}
    className="flex-1 bg-surface/50 p-6 rounded-xl hover:bg-surface/80
               border border-surface hover:border-accent/50 transition-all duration-300"
  >
    <div className="flex items-start gap-4">
      <div className="text-accent mt-1">{icon}</div>
      <div>
        <h3 className="font-serif text-lg text-text-base">{title}</h3>
        <p className="text-sm text-text-muted mt-1">{description}</p>
      </div>
    </div>
  </Link>
);

export const ActionButtons: FC = () => {
  return (
    <div className="flex flex-col md:flex-row gap-6">
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