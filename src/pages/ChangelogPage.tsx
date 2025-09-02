import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { motion } from 'framer-motion';
import { Calendar, GitBranch, Sparkles, Bug, Wrench, Plus } from 'lucide-react';
import { changelogService, type Changelog } from '../services/changelogService';

const ChangelogPage: React.FC = () => {
  const { data: changelogs, isLoading, error } = useQuery({
    queryKey: ['changelogs'],
    queryFn: changelogService.getPublicChangelogs,
  });

  const getChangeIcon = (type: string) => {
    switch (type) {
      case 'feature':
        return <Sparkles className="w-4 h-4 text-yellow-400" />;
      case 'fix':
        return <Bug className="w-4 h-4 text-red-400" />;
      case 'improvement':
        return <Plus className="w-4 h-4 text-blue-400" />;
      default:
        return <Wrench className="w-4 h-4 text-gray-400" />;
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#161221] to-[#1a1625] py-20">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#8b63e9] mx-auto"></div>
            <p className="text-[#a495c6] mt-4">Carregando changelog...</p>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#161221] to-[#1a1625] py-20">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <p className="text-red-400">Erro ao carregar changelog</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#161221] to-[#1a1625] py-20">
      <div className="container mx-auto px-4 max-w-4xl">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl md:text-5xl font-['Cinzel_Decorative'] text-[#F5F5F5] mb-4">
            📋 Changelog
          </h1>
          <p className="text-[#a495c6] text-lg max-w-2xl mx-auto">
            Acompanhe todas as novidades, melhorias e correções da plataforma Arcano.
            Cada atualização é cuidadosamente documentada para você.
          </p>
        </motion.div>

        {/* Changelogs List */}
        <div className="space-y-8">
          {changelogs?.map((changelog: Changelog, index: number) => (
            <motion.div
              key={changelog.id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="bg-[#2f2546]/50 backdrop-blur-sm rounded-2xl p-6 border border-[#8b63e9]/20 hover:border-[#8b63e9]/40 transition-all duration-300"
            >
              {/* Version Header */}
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-[#8b63e9]/20">
                    <GitBranch className="w-5 h-5 text-[#8b63e9]" />
                  </div>
                  <div>
                    <h2 className="text-xl font-['Marcellus_SC'] text-[#F5F5F5]">
                      {changelog.title}
                    </h2>
                    <div className="flex items-center gap-2 text-sm text-[#a495c6]">
                      <span className="px-2 py-1 rounded-full bg-[#8b63e9]/20 text-[#8b63e9] font-medium">
                        v{changelog.version}
                      </span>
                      <span>•</span>
                      <div className="flex items-center gap-1">
                        <Calendar className="w-4 h-4" />
                        {new Date(changelog.releaseDate).toLocaleDateString('pt-BR')}
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Description */}
              {changelog.description && (
                <p className="text-[#a495c6] mb-6 leading-relaxed">
                  {changelog.description}
                </p>
              )}

              {/* Changes List */}
              <div className="space-y-3">
                {Array.isArray(changelog.changes) && changelog.changes.map((change: any, changeIndex: number) => (
                  <div
                    key={changeIndex}
                    className="flex items-start gap-3 p-3 rounded-lg bg-[#161221]/30 border border-[#8b63e9]/10"
                  >
                    {getChangeIcon(change.type)}
                    <div className="flex-1">
                      <p className="text-[#F5F5F5] leading-relaxed">
                        {change.description}
                      </p>
                      {change.type && (
                        <span className="inline-block mt-1 px-2 py-1 text-xs rounded-full bg-[#8b63e9]/10 text-[#8b63e9] capitalize">
                          {change.type === 'feature' ? 'Nova Feature' :
                           change.type === 'fix' ? 'Correção' :
                           change.type === 'improvement' ? 'Melhoria' : change.type}
                        </span>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Empty State */}
        {changelogs && changelogs.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-12"
          >
            <GitBranch className="w-16 h-16 text-[#8b63e9]/50 mx-auto mb-4" />
            <h3 className="text-xl font-['Marcellus_SC'] text-[#F5F5F5] mb-2">
              Nenhum changelog publicado ainda
            </h3>
            <p className="text-[#a495c6]">
              Em breve começaremos a documentar todas as atualizações da plataforma aqui.
            </p>
          </motion.div>
        )}

        {/* Footer Info */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="text-center mt-12 pt-8 border-t border-[#8b63e9]/20"
        >
          <p className="text-[#a495c6] text-sm">
            ✨ Todas as atualizações são testadas e implementadas com cuidado para garantir a melhor experiência.
          </p>
        </motion.div>
      </div>
    </div>
  );
};

export default ChangelogPage;
