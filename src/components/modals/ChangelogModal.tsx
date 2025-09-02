// src/components/modals/ChangelogModal.tsx

import type { FC } from 'react';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Calendar, User, Tag, Sparkles, Bug, Wrench, Shield } from 'lucide-react';
import { useQuery } from '@tanstack/react-query';
import { getPublicChangelogs, type Changelog, type ChangelogChange } from '../../services/changelogService';

interface ChangelogModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const ChangelogModal: FC<ChangelogModalProps> = ({ isOpen, onClose }) => {
  const [selectedChangelog, setSelectedChangelog] = useState<Changelog | null>(null);

  const { data: changelogs, isLoading } = useQuery({
    queryKey: ['changelogs'],
    queryFn: getPublicChangelogs,
    enabled: isOpen
  });

  // Fechar modal ao pressionar ESC
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };

    if (isOpen) {
      document.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose]);

  // Resetar seleção quando modal abre
  useEffect(() => {
    if (isOpen) {
      setSelectedChangelog(null);
    }
  }, [isOpen]);

  const getChangeIcon = (type: ChangelogChange['type']) => {
    const iconMap = {
      feature: <Sparkles className="text-[#8b63e9]" size={16} />,
      fix: <Bug className="text-red-400" size={16} />,
      improvement: <Wrench className="text-blue-400" size={16} />,
      security: <Shield className="text-green-400" size={16} />
    };
    return iconMap[type];
  };

  const getChangeTypeLabel = (type: ChangelogChange['type']) => {
    const labelMap = {
      feature: 'Novidade',
      fix: 'Correção',
      improvement: 'Melhoria',
      security: 'Segurança'
    };
    return labelMap[type];
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: 'long',
      year: 'numeric'
    });
  };

  const renderChangelogList = () => (
    <div className="space-y-4">
      <div className="text-center mb-6">
        <h2 className="text-2xl font-bold text-white mb-2">
          🚀 O que há de novo
        </h2>
        <p className="text-[#a495c6]">
          Acompanhe todas as melhorias e novidades da plataforma
        </p>
      </div>

      {isLoading ? (
        <div className="flex justify-center py-8">
          <div className="animate-spin w-8 h-8 border-2 border-[#8b63e9] border-t-transparent rounded-full"></div>
        </div>
      ) : changelogs && changelogs.length > 0 ? (
        <div className="space-y-3 max-h-96 overflow-y-auto pr-2">
          {changelogs.map((changelog) => (
            <motion.div
              key={changelog.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="p-4 rounded-xl bg-[#2f2546]/40 border border-[#8b63e9]/20 hover:border-[#8b63e9]/40 
                         cursor-pointer transition-all duration-300"
              onClick={() => setSelectedChangelog(changelog)}
            >
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="px-2 py-1 rounded-lg bg-[#8b63e9]/20 text-[#8b63e9] text-xs font-semibold">
                      v{changelog.version}
                    </span>
                    <span className="text-xs text-[#a495c6] flex items-center gap-1">
                      <Calendar size={12} />
                      {formatDate(changelog.releaseDate)}
                    </span>
                  </div>
                  
                  <h3 className="text-white font-semibold mb-1">
                    {changelog.title}
                  </h3>
                  
                  {changelog.description && (
                    <p className="text-[#a495c6] text-sm line-clamp-2">
                      {changelog.description}
                    </p>
                  )}
                  
                  <div className="mt-2 flex flex-wrap gap-1">
                    {changelog.changes.slice(0, 3).map((change, index) => (
                      <span key={index} className="text-xs px-2 py-1 rounded bg-[#8b63e9]/10 text-[#a495c6]">
                        {change.icon} {getChangeTypeLabel(change.type)}
                      </span>
                    ))}
                    {changelog.changes.length > 3 && (
                      <span className="text-xs px-2 py-1 rounded bg-[#8b63e9]/10 text-[#a495c6]">
                        +{changelog.changes.length - 3} mais
                      </span>
                    )}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      ) : (
        <div className="text-center py-8">
          <p className="text-[#a495c6]">Nenhum changelog disponível no momento.</p>
        </div>
      )}
    </div>
  );

  const renderChangelogDetails = (changelog: Changelog) => (
    <div className="space-y-6">
      {/* Header */}
      <div className="text-center">
        <button
          onClick={() => setSelectedChangelog(null)}
          className="text-[#a495c6] hover:text-white transition-colors mb-4 text-sm flex items-center gap-2 mx-auto"
        >
          ← Voltar para lista
        </button>
        
        <div className="flex items-center justify-center gap-3 mb-3">
          <span className="px-3 py-1 rounded-xl bg-[#8b63e9]/20 text-[#8b63e9] text-sm font-bold">
            v{changelog.version}
          </span>
          <span className="text-[#a495c6] text-sm flex items-center gap-1">
            <Calendar size={14} />
            {formatDate(changelog.releaseDate)}
          </span>
        </div>
        
        <h2 className="text-2xl font-bold text-white mb-2">
          {changelog.title}
        </h2>
        
        {changelog.description && (
          <p className="text-[#a495c6] max-w-md mx-auto">
            {changelog.description}
          </p>
        )}
        
        <div className="flex items-center justify-center gap-1 text-xs text-[#a495c6] mt-3">
          <User size={12} />
          Publicado por {changelog.createdBy.name}
        </div>
      </div>

      {/* Changes */}
      <div className="space-y-3">
        <h3 className="text-lg font-semibold text-white flex items-center gap-2">
          <Tag size={18} />
          Mudanças nesta versão
        </h3>
        
        <div className="space-y-3 max-h-80 overflow-y-auto pr-2">
          {changelog.changes.map((change, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              className="flex items-start gap-3 p-3 rounded-lg bg-[#2f2546]/40 border border-[#8b63e9]/10"
            >
              <div className="p-2 rounded-lg bg-[#8b63e9]/10 flex-shrink-0">
                {getChangeIcon(change.type)}
              </div>
              
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-sm font-medium text-white">
                    {getChangeTypeLabel(change.type)}
                  </span>
                  <span className="text-lg">
                    {change.icon}
                  </span>
                </div>
                <p className="text-[#a495c6] text-sm">
                  {change.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50"
            onClick={onClose}
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
            onClick={(e) => e.target === e.currentTarget && onClose()}
          >
            <div className="w-full max-w-2xl max-h-[90vh] bg-[#1a1425] rounded-2xl border border-[#8b63e9]/30 
                            shadow-2xl overflow-hidden">
              
              {/* Header */}
              <div className="flex items-center justify-between p-6 border-b border-[#8b63e9]/20">
                <div className="flex items-center gap-2">
                  <div className="p-2 rounded-lg bg-[#8b63e9]/20 text-[#8b63e9]">
                    <Sparkles size={20} />
                  </div>
                  <span className="text-lg font-semibold text-white">
                    {selectedChangelog ? `Changelog v${selectedChangelog.version}` : 'Changelog'}
                  </span>
                </div>
                
                <button
                  onClick={onClose}
                  className="p-2 rounded-lg text-[#a495c6] hover:text-white hover:bg-[#8b63e9]/20 
                             transition-all duration-200"
                >
                  <X size={20} />
                </button>
              </div>

              {/* Content */}
              <div className="p-6 overflow-y-auto" style={{ maxHeight: 'calc(90vh - 120px)' }}>
                {selectedChangelog ? renderChangelogDetails(selectedChangelog) : renderChangelogList()}
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default ChangelogModal;
