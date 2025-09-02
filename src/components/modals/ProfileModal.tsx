// src/components/modals/ProfileModal.tsx

import type { FC } from 'react';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  X, User, Mail, Lock, Download, Trash2, 
  Save, Eye, EyeOff, AlertTriangle, CheckCircle,
  Loader2, Menu
} from 'lucide-react';
import { api } from '../../lib/api';
import { useAuthStore } from '../../store/authStore';

interface ProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
}

interface UserProfile {
  id: string;
  name: string;
  email: string;
  createdAt: string;
  isBetaTester: boolean;
  betaTesterNumber: number | null;
}

interface FormData {
  name: string;
  email: string;
}

interface PasswordData {
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
}

const ProfileModal: FC<ProfileModalProps> = ({ isOpen, onClose }) => {
  const [activeTab, setActiveTab] = useState<'profile' | 'password' | 'privacy'>('profile');
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [formData, setFormData] = useState<FormData>({ name: '', email: '' });
  const [passwordData, setPasswordData] = useState<PasswordData>({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });
  
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);
  const [showPasswords, setShowPasswords] = useState({
    current: false,
    new: false,
    confirm: false
  });
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [deletePassword, setDeletePassword] = useState('');
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  const user = useAuthStore((state) => state.user);
  const logout = useAuthStore((state) => state.logout);

  // Verificar tamanho da tela
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Carregar dados do perfil
  useEffect(() => {
    if (isOpen) {
      loadProfile();
    }
  }, [isOpen]);

  const loadProfile = async () => {
    try {
      setLoading(true);
      const response = await api.get('/users/profile');
      const profileData = response.data;
      setProfile(profileData);
      setFormData({
        name: profileData.name,
        email: profileData.email
      });
    } catch (error) {
      setMessage({ type: 'error', text: 'Erro ao carregar perfil' });
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateProfile = async () => {
    if (!formData.name.trim()) {
      setMessage({ type: 'error', text: 'Nome é obrigatório' });
      return;
    }

    try {
      setLoading(true);
      await api.put('/users/profile', formData);
      setMessage({ type: 'success', text: 'Perfil atualizado com sucesso!' });
      loadProfile(); // Recarregar dados
    } catch (error: any) {
      setMessage({ 
        type: 'error', 
        text: error.response?.data?.error || 'Erro ao atualizar perfil' 
      });
    } finally {
      setLoading(false);
    }
  };

  const handleChangePassword = async () => {
    if (!passwordData.currentPassword || !passwordData.newPassword) {
      setMessage({ type: 'error', text: 'Todos os campos de senha são obrigatórios' });
      return;
    }

    if (passwordData.newPassword !== passwordData.confirmPassword) {
      setMessage({ type: 'error', text: 'Nova senha e confirmação não coincidem' });
      return;
    }

    if (passwordData.newPassword.length < 6) {
      setMessage({ type: 'error', text: 'Nova senha deve ter pelo menos 6 caracteres' });
      return;
    }

    try {
      setLoading(true);
      await api.post('/users/change-password', {
        currentPassword: passwordData.currentPassword,
        newPassword: passwordData.newPassword
      });
      setMessage({ type: 'success', text: 'Senha alterada com sucesso!' });
      setPasswordData({ currentPassword: '', newPassword: '', confirmPassword: '' });
    } catch (error: any) {
      setMessage({ 
        type: 'error', 
        text: error.response?.data?.error || 'Erro ao alterar senha' 
      });
    } finally {
      setLoading(false);
    }
  };

  const handleDataExport = async () => {
    try {
      setLoading(true);
      const response = await api.get('/users/data-export', {
        responseType: 'blob'
      });
      
      // Criar link de download
      const blob = new Blob([response.data], { type: 'application/json' });
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `arcano-data-export-${new Date().toISOString().split('T')[0]}.json`;
      link.click();
      window.URL.revokeObjectURL(url);
      
      setMessage({ type: 'success', text: 'Dados exportados com sucesso!' });
    } catch (error) {
      setMessage({ type: 'error', text: 'Erro ao exportar dados' });
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteAccount = async () => {
    if (!deletePassword) {
      setMessage({ type: 'error', text: 'Senha é obrigatória para excluir a conta' });
      return;
    }

    try {
      setLoading(true);
      await api.delete('/users/account', {
        data: { confirmPassword: deletePassword }
      });
      
      setMessage({ type: 'success', text: 'Conta excluída com sucesso' });
      setTimeout(() => {
        logout();
        onClose();
      }, 2000);
    } catch (error: any) {
      setMessage({ 
        type: 'error', 
        text: error.response?.data?.error || 'Erro ao excluir conta' 
      });
    } finally {
      setLoading(false);
    }
  };

  const clearMessage = () => {
    setTimeout(() => setMessage(null), 5000);
  };

  useEffect(() => {
    if (message) clearMessage();
  }, [message]);

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="absolute inset-0 bg-black/80 backdrop-blur-sm"
          onClick={onClose}
        />

        {/* Modal */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 20 }}
          className="relative w-full max-w-2xl max-h-[90vh] overflow-hidden rounded-2xl bg-gradient-to-b from-[#2f2546] to-[#1a1525] border border-[#8b63e9]/30 shadow-2xl"
        >
          {/* Header - Ajustado para mobile */}
          <div className="flex items-center justify-between p-4 sm:p-6 border-b border-[#8b63e9]/30">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-[#8b63e9]/20">
                <User className="w-4 h-4 sm:w-5 sm:h-5 text-[#8b63e9]" />
              </div>
              <div>
                <h2 className="text-lg sm:text-xl font-bold text-white">Meu Perfil</h2>
                <p className="text-xs sm:text-sm text-[#a495c6]">
                  Gerenciar dados e configurações da conta
                </p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="p-2 rounded-lg hover:bg-[#8b63e9]/20 transition-colors"
            >
              <X className="w-4 h-4 sm:w-5 sm:h-5 text-[#a495c6]" />
            </button>
          </div>

          {/* Tabs - Ajustado para mobile */}
          <div className="flex border-b border-[#8b63e9]/20">
            {[
              { id: 'profile', label: 'Perfil', icon: User },
              { id: 'password', label: 'Senha', icon: Lock },
              { id: 'privacy', label: 'Privacidade', icon: AlertTriangle }
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`flex items-center gap-1 sm:gap-2 px-3 py-3 sm:px-6 sm:py-4 text-xs sm:text-sm font-medium transition-colors border-b-2 ${
                  activeTab === tab.id
                    ? 'border-[#8b63e9] text-[#8b63e9] bg-[#8b63e9]/5'
                    : 'border-transparent text-[#a495c6] hover:text-white'
                }`}
              >
                {/* Remover ícones em mobile */}
                {!isMobile && <tab.icon size={16} />}
                <span className="whitespace-nowrap">{tab.label}</span>
              </button>
            ))}
          </div>

          {/* Conteúdo - Ajustado para mobile */}
          <div className="p-4 sm:p-6 max-h-[60vh] overflow-y-auto">
            {/* Message */}
            <AnimatePresence>
              {message && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className={`mb-4 sm:mb-6 p-3 sm:p-4 rounded-lg border flex items-center gap-3 ${
                    message.type === 'success'
                      ? 'bg-green-500/10 border-green-500/30 text-green-400'
                      : 'bg-red-500/10 border-red-500/30 text-red-400'
                  }`}
                >
                  {message.type === 'success' ? <CheckCircle size={14} /> : <AlertTriangle size={14} />}
                  <span className="text-xs sm:text-sm">{message.text}</span>
                </motion.div>
              )}
            </AnimatePresence>

            {loading && (
              <div className="flex items-center justify-center py-6 sm:py-8">
                <Loader2 className="w-5 h-5 sm:w-6 sm:h-6 animate-spin text-[#8b63e9]" />
              </div>
            )}

            {/* Profile Tab */}
            {activeTab === 'profile' && profile && (
              <div className="space-y-4 sm:space-y-6">
                <div className="p-3 sm:p-4 bg-[#8b63e9]/5 rounded-lg border border-[#8b63e9]/20">
                  <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-3">
                    {profile.isBetaTester && (
                      <div className="px-2 py-1 bg-[#FFD700]/20 border border-[#FFD700]/30 rounded text-xs text-[#FFD700] self-start">
                        Beta Tester #{profile.betaTesterNumber}
                      </div>
                    )}
                    <span className="text-xs sm:text-sm text-[#a495c6]">
                      Membro desde {new Date(profile.createdAt).toLocaleDateString('pt-BR')}
                    </span>
                  </div>
                </div>

                <div className="space-y-3 sm:space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-white mb-2">
                      Nome completo
                    </label>
                    <input
                      type="text"
                      value={formData.name}
                      onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                      className="w-full px-3 py-2 sm:px-4 sm:py-3 bg-[#161221] border border-[#8b63e9]/30 rounded-lg text-white placeholder-[#a495c6] focus:border-[#8b63e9] focus:outline-none transition-colors"
                      placeholder="Seu nome completo"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-white mb-2">
                      Email
                    </label>
                    <input
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                      className="w-full px-3 py-2 sm:px-4 sm:py-3 bg-[#161221] border border-[#8b63e9]/30 rounded-lg text-white placeholder-[#a495c6] focus:border-[#8b63e9] focus:outline-none transition-colors"
                      placeholder="seu@email.com"
                    />
                  </div>

                  <button
                    onClick={handleUpdateProfile}
                    disabled={loading}
                    className="w-full px-3 py-2 sm:px-4 sm:py-3 bg-[#8b63e9] hover:bg-[#a78bfa] disabled:opacity-50 text-white rounded-lg font-medium transition-colors flex items-center justify-center gap-2"
                  >
                    <Save size={14} />
                    <span>Salvar Alterações</span>
                  </button>
                </div>
              </div>
            )}

            {/* Password Tab */}
            {activeTab === 'password' && (
              <div className="space-y-4 sm:space-y-6">
                <p className="text-[#a495c6] text-xs sm:text-sm">
                  Para alterar sua senha, informe a senha atual e defina uma nova senha.
                </p>

                <div className="space-y-3 sm:space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-white mb-2">
                      Senha atual
                    </label>
                    <div className="relative">
                      <input
                        type={showPasswords.current ? 'text' : 'password'}
                        value={passwordData.currentPassword}
                        onChange={(e) => setPasswordData(prev => ({ ...prev, currentPassword: e.target.value }))}
                        className="w-full px-3 py-2 sm:px-4 sm:py-3 pr-10 bg-[#161221] border border-[#8b63e9]/30 rounded-lg text-white placeholder-[#a495c6] focus:border-[#8b63e9] focus:outline-none transition-colors"
                        placeholder="Sua senha atual"
                      />
                      <button
                        type="button"
                        onClick={() => setShowPasswords(prev => ({ ...prev, current: !prev.current }))}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-[#a495c6] hover:text-white"
                      >
                        {showPasswords.current ? <EyeOff size={16} /> : <Eye size={16} />}
                      </button>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-white mb-2">
                      Nova senha
                    </label>
                    <div className="relative">
                      <input
                        type={showPasswords.new ? 'text' : 'password'}
                        value={passwordData.newPassword}
                        onChange={(e) => setPasswordData(prev => ({ ...prev, newPassword: e.target.value }))}
                        className="w-full px-3 py-2 sm:px-4 sm:py-3 pr-10 bg-[#161221] border border-[#8b63e9]/30 rounded-lg text-white placeholder-[#a495c6] focus:border-[#8b63e9] focus:outline-none transition-colors"
                        placeholder="Nova senha (min. 6 caracteres)"
                      />
                      <button
                        type="button"
                        onClick={() => setShowPasswords(prev => ({ ...prev, new: !prev.new }))}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-[#a495c6] hover:text-white"
                      >
                        {showPasswords.new ? <EyeOff size={16} /> : <Eye size={16} />}
                      </button>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-white mb-2">
                      Confirmar nova senha
                    </label>
                    <div className="relative">
                      <input
                        type={showPasswords.confirm ? 'text' : 'password'}
                        value={passwordData.confirmPassword}
                        onChange={(e) => setPasswordData(prev => ({ ...prev, confirmPassword: e.target.value }))}
                        className="w-full px-3 py-2 sm:px-4 sm:py-3 pr-10 bg-[#161221] border border-[#8b63e9]/30 rounded-lg text-white placeholder-[#a495c6] focus:border-[#8b63e9] focus:outline-none transition-colors"
                        placeholder="Confirme a nova senha"
                      />
                      <button
                        type="button"
                        onClick={() => setShowPasswords(prev => ({ ...prev, confirm: !prev.confirm }))}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-[#a495c6] hover:text-white"
                      >
                        {showPasswords.confirm ? <EyeOff size={16} /> : <Eye size={16} />}
                      </button>
                    </div>
                  </div>

                  <button
                    onClick={handleChangePassword}
                    disabled={loading}
                    className="w-full px-3 py-2 sm:px-4 sm:py-3 bg-[#8b63e9] hover:bg-[#a78bfa] disabled:opacity-50 text-white rounded-lg font-medium transition-colors flex items-center justify-center gap-2"
                  >
                    <Lock size={14} />
                    <span>Alterar Senha</span>
                  </button>
                </div>
              </div>
            )}

            {/* Privacy Tab */}
            {activeTab === 'privacy' && (
              <div className="space-y-4 sm:space-y-6">
                <div className="p-3 sm:p-4 bg-blue-500/10 border border-blue-500/30 rounded-lg">
                  <h3 className="text-blue-400 font-medium mb-2 text-sm sm:text-base">
                    Seus Direitos (LGPD)
                  </h3>
                  <p className="text-xs sm:text-sm text-[#a495c6]">
                    De acordo com a Lei Geral de Proteção de Dados, você tem direito de acessar, 
                    corrigir, exportar ou excluir seus dados pessoais.
                  </p>
                </div>

                <div className="space-y-3 sm:space-y-4">
                  <button
                    onClick={handleDataExport}
                    disabled={loading}
                    className="w-full px-3 py-2 sm:px-4 sm:py-3 bg-blue-600 hover:bg-blue-700 disabled:opacity-50 text-white rounded-lg font-medium transition-colors flex items-center justify-center gap-2"
                  >
                    <Download size={14} />
                    <span>Exportar Todos os Meus Dados</span>
                  </button>

                  <div className="border-t border-[#8b63e9]/20 pt-3 sm:pt-4">
                    <div className="p-3 sm:p-4 bg-red-500/10 border border-red-500/30 rounded-lg mb-3 sm:mb-4">
                      <div className="flex items-center gap-2 text-red-400 mb-2">
                        <AlertTriangle size={14} />
                        <span className="font-medium text-sm sm:text-base">Zona de Perigo</span>
                      </div>
                      <p className="text-xs sm:text-sm text-red-300">
                        Esta ação é permanente e não pode ser desfeita. Todos os seus dados 
                        serão removidos permanentemente.
                      </p>
                    </div>

                    {!showDeleteConfirm ? (
                      <button
                        onClick={() => setShowDeleteConfirm(true)}
                        className="px-3 py-1.5 sm:px-4 sm:py-2 border border-red-500 text-red-400 hover:bg-red-500/10 rounded-lg font-medium transition-colors text-sm"
                      >
                        Excluir Minha Conta
                      </button>
                    ) : (
                      <div className="space-y-3 sm:space-y-4">
                        <div>
                          <label className="block text-sm font-medium text-white mb-2">
                            Digite sua senha para confirmar
                          </label>
                          <input
                            type="password"
                            value={deletePassword}
                            onChange={(e) => setDeletePassword(e.target.value)}
                            className="w-full px-3 py-2 sm:px-4 sm:py-3 bg-[#161221] border border-red-500/30 rounded-lg text-white placeholder-[#a495c6] focus:border-red-500 focus:outline-none transition-colors"
                            placeholder="Sua senha"
                          />
                        </div>
                        <div className="flex gap-2 sm:gap-3">
                          <button
                            onClick={() => {
                              setShowDeleteConfirm(false);
                              setDeletePassword('');
                            }}
                            className="flex-1 px-3 py-1.5 sm:px-4 sm:py-2 border border-[#8b63e9]/30 text-[#a495c6] hover:text-white rounded-lg transition-colors text-sm"
                          >
                            Cancelar
                          </button>
                          <button
                            onClick={handleDeleteAccount}
                            disabled={loading || !deletePassword}
                            className="flex-1 px-3 py-1.5 sm:px-4 sm:py-2 bg-red-600 hover:bg-red-700 disabled:opacity-50 text-white rounded-lg font-medium transition-colors flex items-center justify-center gap-1 sm:gap-2 text-sm"
                          >
                            <Trash2 size={14} />
                            <span>Excluir Conta</span>
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            )}
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

export default ProfileModal;