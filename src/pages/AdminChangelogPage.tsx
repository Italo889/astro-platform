// src/pages/AdminChangelogPage.tsx

import type { FC } from 'react';
import { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Plus, Edit3, Trash2, Eye, EyeOff, Calendar, User, 
  ArrowLeft, Save, X, Sparkles, Bug, Wrench, Shield
} from 'lucide-react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useAuthStore } from '../store/authStore';
import { Navigate, Link } from 'react-router-dom';
import {
  getAllChangelogs,
  createChangelog,
  updateChangelog,
  deleteChangelog,
  toggleChangelogPublish,
  type Changelog,
  type CreateChangelogData,
  type ChangelogChange
} from '../services/changelogService';

const AdminChangelogPage: FC = () => {
  const user = useAuthStore((state) => state.user);
  const queryClient = useQueryClient();
  
  // Verificar se é admin
  const isOwner = user?.email === 'italo@arcano.com' || user?.email === 'italo889@gmail.com';
  
  if (!isOwner) {
    return <Navigate to="/dashboard" replace />;
  }

  const [isCreating, setIsCreating] = useState(false);
  const [editingChangelog, setEditingChangelog] = useState<Changelog | null>(null);
  const [formData, setFormData] = useState<CreateChangelogData>({
    version: '',
    title: '',
    description: '',
    isPublished: false,
    changes: []
  });

  // Queries
  const { data: changelogs, isLoading } = useQuery({
    queryKey: ['admin-changelogs'],
    queryFn: getAllChangelogs
  });

  // Mutations
  const createMutation = useMutation({
    mutationFn: createChangelog,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-changelogs'] });
      resetForm();
      setIsCreating(false);
    }
  });

  const updateMutation = useMutation({
    mutationFn: ({ id, data }: { id: string; data: Partial<CreateChangelogData> }) => 
      updateChangelog(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-changelogs'] });
      resetForm();
      setEditingChangelog(null);
    }
  });

  const deleteMutation = useMutation({
    mutationFn: deleteChangelog,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-changelogs'] });
    }
  });

  const togglePublishMutation = useMutation({
    mutationFn: toggleChangelogPublish,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-changelogs'] });
    }
  });

  const resetForm = () => {
    setFormData({
      version: '',
      title: '',
      description: '',
      isPublished: false,
      changes: []
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (editingChangelog) {
      await updateMutation.mutateAsync({ 
        id: editingChangelog.id, 
        data: formData 
      });
    } else {
      await createMutation.mutateAsync(formData);
    }
  };

  const handleEdit = (changelog: Changelog) => {
    setEditingChangelog(changelog);
    setFormData({
      version: changelog.version,
      title: changelog.title,
      description: changelog.description || '',
      isPublished: changelog.isPublished || false,
      changes: changelog.changes
    });
    setIsCreating(true);
  };

  const addChange = () => {
    setFormData({
      ...formData,
      changes: [...formData.changes, { type: 'feature', description: '', icon: '✨' }]
    });
  };

  const updateChange = (index: number, field: keyof ChangelogChange, value: string) => {
    const newChanges = [...formData.changes];
    newChanges[index] = { ...newChanges[index], [field]: value };
    
    // Automatizar ícone quando o tipo mudar
    if (field === 'type') {
      const iconMap = {
        feature: '✨',
        fix: '🐛', 
        improvement: '🔧',
        security: '🛡️'
      };
      newChanges[index].icon = iconMap[value as ChangelogChange['type']] || '✨';
    }
    
    setFormData({ ...formData, changes: newChanges });
  };

  const removeChange = (index: number) => {
    setFormData({
      ...formData,
      changes: formData.changes.filter((_, i) => i !== index)
    });
  };

  const getChangeIcon = (type: ChangelogChange['type']) => {
    const iconMap = {
      feature: <Sparkles className="text-[#8b63e9]" size={16} />,
      fix: <Bug className="text-red-400" size={16} />,
      improvement: <Wrench className="text-blue-400" size={16} />,
      security: <Shield className="text-green-400" size={16} />
    };
    return iconMap[type];
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  if (isCreating) {
    return (
      <div className="min-h-screen bg-[#161221] text-white p-6">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="flex items-center gap-4 mb-8">
            <button
              onClick={() => {
                setIsCreating(false);
                setEditingChangelog(null);
                resetForm();
              }}
              className="p-2 rounded-lg text-[#a495c6] hover:text-white hover:bg-[#8b63e9]/20 transition-all"
            >
              <ArrowLeft size={20} />
            </button>
            <h1 className="text-2xl font-bold">
              {editingChangelog ? 'Editar Changelog' : 'Criar Novo Changelog'}
            </h1>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Version */}
              <div>
                <label className="block text-white font-semibold mb-2">Versão</label>
                <input
                  type="text"
                  value={formData.version}
                  onChange={(e) => setFormData({ ...formData, version: e.target.value })}
                  placeholder="1.2.0"
                  className="w-full p-3 rounded-lg bg-[#2f2546] border border-[#8b63e9]/30 text-white placeholder-[#a495c6]"
                  required
                />
              </div>

              {/* Published */}
              <div>
                <label className="block text-white font-semibold mb-2">Status</label>
                <label className="flex items-center gap-2 p-3 rounded-lg bg-[#2f2546] border border-[#8b63e9]/30">
                  <input
                    type="checkbox"
                    checked={formData.isPublished}
                    onChange={(e) => setFormData({ ...formData, isPublished: e.target.checked })}
                    className="rounded"
                  />
                  <span className="text-white">Publicar imediatamente</span>
                </label>
              </div>
            </div>

            {/* Title */}
            <div>
              <label className="block text-white font-semibold mb-2">Título</label>
              <input
                type="text"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                placeholder="Novos Gráficos no Dashboard Admin"
                className="w-full p-3 rounded-lg bg-[#2f2546] border border-[#8b63e9]/30 text-white placeholder-[#a495c6]"
                required
              />
            </div>

            {/* Description */}
            <div>
              <label className="block text-white font-semibold mb-2">Descrição (Opcional)</label>
              <textarea
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                placeholder="Descrição detalhada das mudanças..."
                rows={3}
                className="w-full p-3 rounded-lg bg-[#2f2546] border border-[#8b63e9]/30 text-white placeholder-[#a495c6]"
              />
            </div>

            {/* Changes */}
            <div>
              <div className="flex items-center justify-between mb-4">
                <label className="block text-white font-semibold">Mudanças</label>
                <button
                  type="button"
                  onClick={addChange}
                  className="px-3 py-1 rounded-lg bg-[#8b63e9]/20 text-[#8b63e9] hover:bg-[#8b63e9]/30 transition-colors flex items-center gap-2"
                >
                  <Plus size={16} />
                  Adicionar
                </button>
              </div>

              <div className="space-y-3">
                {formData.changes.map((change, index) => (
                  <div key={index} className="p-4 rounded-lg bg-[#2f2546]/40 border border-[#8b63e9]/20">
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
                      {/* Type */}
                      <select
                        value={change.type}
                        onChange={(e) => updateChange(index, 'type', e.target.value)}
                        className="p-2 rounded bg-[#1a1425] border border-[#8b63e9]/30 text-white"
                      >
                        <option value="feature">Novidade</option>
                        <option value="improvement">Melhoria</option>
                        <option value="fix">Correção</option>
                        <option value="security">Segurança</option>
                      </select>

                      {/* Icon */}
                      <input
                        type="text"
                        value={change.icon}
                        readOnly
                        placeholder="✨"
                        className="p-2 rounded bg-[#161221] border border-[#8b63e9]/20 text-white text-center cursor-default"
                        title="Ícone automático baseado no tipo"
                      />

                      {/* Description */}
                      <div className="md:col-span-2 flex gap-2">
                        <input
                          type="text"
                          value={change.description}
                          onChange={(e) => updateChange(index, 'description', e.target.value)}
                          placeholder="Descrição da mudança..."
                          className="flex-1 p-2 rounded bg-[#1a1425] border border-[#8b63e9]/30 text-white placeholder-[#a495c6]"
                          required
                        />
                        <button
                          type="button"
                          onClick={() => removeChange(index)}
                          className="p-2 rounded text-red-400 hover:bg-red-400/20 transition-colors"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Actions */}
            <div className="flex justify-end gap-3">
              <button
                type="button"
                onClick={() => {
                  setIsCreating(false);
                  setEditingChangelog(null);
                  resetForm();
                }}
                className="px-6 py-2 rounded-lg border border-[#8b63e9]/30 text-[#a495c6] hover:text-white hover:bg-[#8b63e9]/20 transition-colors"
              >
                Cancelar
              </button>
              <button
                type="submit"
                disabled={createMutation.isPending || updateMutation.isPending}
                className="px-6 py-2 rounded-lg bg-[#8b63e9] text-white hover:bg-[#7c5ce0] transition-colors flex items-center gap-2 disabled:opacity-50"
              >
                <Save size={16} />
                {createMutation.isPending || updateMutation.isPending ? 'Salvando...' : 'Salvar'}
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#161221] text-white p-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-4">
            <Link
              to="/admin"
              className="p-2 rounded-lg text-[#a495c6] hover:text-white hover:bg-[#8b63e9]/20 transition-all"
            >
              <ArrowLeft size={20} />
            </Link>
            <div>
              <h1 className="text-3xl font-bold flex items-center gap-3">
                <Sparkles className="text-[#8b63e9]" />
                Gestão de Changelogs
              </h1>
              <p className="text-[#a495c6] mt-1">
                Gerencie as atualizações e novidades da plataforma
              </p>
            </div>
          </div>

          <button
            onClick={() => setIsCreating(true)}
            className="px-6 py-3 rounded-lg bg-[#8b63e9] text-white hover:bg-[#7c5ce0] transition-colors flex items-center gap-2"
          >
            <Plus size={20} />
            Novo Changelog
          </button>
        </div>

        {/* Changelogs List */}
        <div className="space-y-4">
          {isLoading ? (
            <div className="flex justify-center py-12">
              <div className="animate-spin w-8 h-8 border-2 border-[#8b63e9] border-t-transparent rounded-full"></div>
            </div>
          ) : changelogs && changelogs.length > 0 ? (
            changelogs.map((changelog) => (
              <motion.div
                key={changelog.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="p-6 rounded-xl bg-[#2f2546]/40 border border-[#8b63e9]/30"
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-3">
                      <span className={`px-3 py-1 rounded-lg text-sm font-bold ${
                        changelog.isPublished 
                          ? 'bg-green-500/20 text-green-400' 
                          : 'bg-orange-500/20 text-orange-400'
                      }`}>
                        v{changelog.version}
                      </span>
                      
                      <span className="text-[#a495c6] text-sm flex items-center gap-1">
                        <Calendar size={14} />
                        {formatDate(changelog.releaseDate)}
                      </span>
                      
                      <span className="text-[#a495c6] text-sm flex items-center gap-1">
                        <User size={14} />
                        {changelog.createdBy.name}
                      </span>
                    </div>

                    <h3 className="text-xl font-semibold text-white mb-2">
                      {changelog.title}
                    </h3>

                    {changelog.description && (
                      <p className="text-[#a495c6] mb-3">
                        {changelog.description}
                      </p>
                    )}

                    <div className="flex flex-wrap gap-2">
                      {changelog.changes.slice(0, 4).map((change, index) => (
                        <span key={index} className="px-2 py-1 rounded bg-[#8b63e9]/10 text-[#a495c6] text-sm flex items-center gap-1">
                          {getChangeIcon(change.type)}
                          {change.description.substring(0, 30)}...
                        </span>
                      ))}
                      {changelog.changes.length > 4 && (
                        <span className="px-2 py-1 rounded bg-[#8b63e9]/10 text-[#a495c6] text-sm">
                          +{changelog.changes.length - 4} mais
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => togglePublishMutation.mutate(changelog.id)}
                      className={`p-2 rounded-lg transition-colors ${
                        changelog.isPublished
                          ? 'text-green-400 hover:bg-green-400/20'
                          : 'text-orange-400 hover:bg-orange-400/20'
                      }`}
                      title={changelog.isPublished ? 'Despublicar' : 'Publicar'}
                    >
                      {changelog.isPublished ? <Eye size={16} /> : <EyeOff size={16} />}
                    </button>

                    <button
                      onClick={() => handleEdit(changelog)}
                      className="p-2 rounded-lg text-blue-400 hover:bg-blue-400/20 transition-colors"
                      title="Editar"
                    >
                      <Edit3 size={16} />
                    </button>

                    <button
                      onClick={() => {
                        if (confirm('Tem certeza que deseja excluir este changelog?')) {
                          deleteMutation.mutate(changelog.id);
                        }
                      }}
                      className="p-2 rounded-lg text-red-400 hover:bg-red-400/20 transition-colors"
                      title="Excluir"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                </div>
              </motion.div>
            ))
          ) : (
            <div className="text-center py-12">
              <Sparkles className="mx-auto mb-4 text-[#8b63e9]" size={48} />
              <h3 className="text-xl font-semibold text-white mb-2">Nenhum changelog criado</h3>
              <p className="text-[#a495c6] mb-6">
                Comece criando seu primeiro changelog para informar os usuários sobre as novidades.
              </p>
              <button
                onClick={() => setIsCreating(true)}
                className="px-6 py-3 rounded-lg bg-[#8b63e9] text-white hover:bg-[#7c5ce0] transition-colors"
              >
                Criar Primeiro Changelog
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminChangelogPage;
