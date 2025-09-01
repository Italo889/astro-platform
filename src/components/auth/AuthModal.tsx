// src/components/auth/AuthModal.tsx

import { Dialog, DialogPanel, DialogTitle, Transition, TransitionChild } from '@headlessui/react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, LoaderCircle, Sparkles, Diamond } from 'lucide-react';
import { useUIStore } from '../../store/uiStore';
import { useAuthStore } from '../../store/authStore';
import { Button } from '../ui/Button';
import { useState } from 'react';
import type { FC, FormEvent } from 'react';

// Importando AMBOS os serviços de autenticação
import { registerUser, loginUser } from '../../services/authService';

// --- Sub-componente para o formulário de Login (PREMIUM) ---
const LoginForm: FC<{ onSwitch: () => void }> = ({ onSwitch }) => {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  const loginAction = useAuthStore((state) => state.login);
  const closeModal = useUIStore((state) => state.closeAuthModal);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setError(null);
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError(null);
    setIsLoading(true);

    try {
      const response = await loginUser(formData);
      loginAction(response.token);
      closeModal();
    } catch (err: any) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: -30, scale: 0.95 }}
      animate={{ opacity: 1, x: 0, scale: 1 }}
      exit={{ opacity: 0, x: 30, scale: 0.95 }}
      transition={{ duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }}
      className="relative"
    >
      {/* Header com ornamento */}
      <div className="text-center mb-10">
        <div className="flex items-center justify-center mb-6">
          <div className="w-12 h-[1px] bg-gradient-to-r from-transparent to-[#FFD700]/40" />
          <Sparkles size={16} className="text-[#FFD700] mx-4" />
          <div className="w-12 h-[1px] bg-gradient-to-l from-transparent to-[#FFD700]/40" />
        </div>
        
        <DialogTitle as="h3" className="font-['Cinzel_Decorative'] text-3xl lg:text-4xl text-[#F5F5F5] 
                                        font-bold tracking-wide mb-4 uppercase">
          Acessar <span className="text-[#FFD700]">Oráculo</span>
        </DialogTitle>
        
        <p className="text-[#a495c6] text-base font-['Noto_Sans'] tracking-wide max-w-md mx-auto leading-relaxed">
          Bem-vindo(a) de volta ao seu universo místico. Entre e continue sua jornada de autodescoberta.
        </p>
      </div>
      
      <form onSubmit={handleSubmit} className="space-y-8">
        {/* Campo Email Premium */}
        <div className="relative group">
          <input 
            name="email" 
            type="email" 
            placeholder=" " 
            value={formData.email} 
            onChange={handleChange} 
            required 
            className="peer w-full rounded-xl bg-[#2f2546]/80 backdrop-blur-sm 
                       text-[#F5F5F5] h-16 px-5 pt-6 pb-2 text-lg font-['Noto_Sans']
                       border border-[#8b63e9]/30 hover:border-[#8b63e9]/50 
                       focus:border-[#FFD700]/60 focus:ring-2 focus:ring-[#FFD700]/20
                       focus:outline-none transition-all duration-300"
          />
          <label className="absolute left-5 text-[#a495c6] transition-all duration-300 
                           pointer-events-none font-['Noto_Sans'] font-medium tracking-wide
                           peer-placeholder-shown:top-5 peer-placeholder-shown:text-lg 
                           peer-focus:top-2 peer-focus:text-sm peer-focus:text-[#FFD700]
                           top-2 text-sm">
            E-mail
          </label>
          <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 h-[2px] 
                          bg-gradient-to-r from-[#FFD700] to-[#8b63e9] rounded-full
                          transition-all duration-300 w-0 peer-focus:w-full" />
        </div>

        {/* Campo Senha Premium */}
        <div className="relative group">
          <input 
            name="password" 
            type="password" 
            placeholder=" " 
            value={formData.password} 
            onChange={handleChange} 
            required 
            className="peer w-full rounded-xl bg-[#2f2546]/80 backdrop-blur-sm 
                       text-[#F5F5F5] h-16 px-5 pt-6 pb-2 text-lg font-['Noto_Sans']
                       border border-[#8b63e9]/30 hover:border-[#8b63e9]/50 
                       focus:border-[#FFD700]/60 focus:ring-2 focus:ring-[#FFD700]/20
                       focus:outline-none transition-all duration-300"
          />
          <label className="absolute left-5 text-[#a495c6] transition-all duration-300 
                           pointer-events-none font-['Noto_Sans'] font-medium tracking-wide
                           peer-placeholder-shown:top-5 peer-placeholder-shown:text-lg 
                           peer-focus:top-2 peer-focus:text-sm peer-focus:text-[#FFD700]
                           top-2 text-sm">
            Senha
          </label>
          <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 h-[2px] 
                          bg-gradient-to-r from-[#FFD700] to-[#8b63e9] rounded-full
                          transition-all duration-300 w-0 peer-focus:w-full" />
        </div>
        
        {/* Mensagem de erro elegante */}
        {error && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="p-5 rounded-xl bg-red-900/20 backdrop-blur-sm border border-red-400/30 text-center"
          >
            <p className="text-base text-red-300 font-['Noto_Sans'] font-medium">{error}</p>
          </motion.div>
        )}
        
        {/* Botão Submit Premium */}
        <div className="pt-4">
          <Button 
            type="submit" 
            variant="primary" 
            disabled={isLoading} 
            className="w-full py-5 text-lg font-['Cinzel_Decorative'] font-bold tracking-wide uppercase
                       bg-[#FFD700] hover:bg-[#FFD700]/90
                       text-[#000000] border-0 rounded-xl 
                       shadow-lg shadow-[#FFD700]/40 hover:shadow-xl hover:shadow-[#FFD700]/60
                       transition-all duration-300 disabled:opacity-60 disabled:cursor-not-allowed
                       hover:scale-[1.02] active:scale-[0.98]"
          >
            {isLoading ? (
              <motion.div 
                animate={{ rotate: 360 }} 
                transition={{ repeat: Infinity, duration: 1.2, ease: "linear" }}
                className="flex items-center justify-center"
              >
                <LoaderCircle size={22} />
              </motion.div>
            ) : (
              'Entrar'
            )}
          </Button>
        </div>
      </form>

      {/* Link para registro */}
      <div className="mt-10 text-center">
        <div className="flex items-center justify-center mb-6">
          <div className="flex-1 h-[1px] bg-gradient-to-r from-transparent to-[#8b63e9]/20" />
          <div className="mx-4 w-2 h-2 bg-[#FFD700]/60 rounded-full" />
          <div className="flex-1 h-[1px] bg-gradient-to-l from-transparent to-[#8b63e9]/20" />
        </div>
        
        <p className="text-base text-[#a495c6] font-['Noto_Sans']">
          Não tem uma conta?{' '}
          <button 
            onClick={onSwitch} 
            className="text-[#FFD700] font-bold hover:text-[#8b63e9] 
                       transition-colors duration-200 underline decoration-[#FFD700]/40 
                       hover:decoration-[#8b63e9]/60 underline-offset-4"
          >
            Crie sua jornada
          </button>
        </p>
      </div>
    </motion.div>
  );
};

// --- Sub-componente para o formulário de Registro (PREMIUM) ---
const RegisterForm: FC<{ onSwitch: () => void }> = ({ onSwitch }) => {
  const [formData, setFormData] = useState({ name: '', email: '', password: '' });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setError(null);
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError(null);
    setIsLoading(true);

    try {
      const newUser = await registerUser(formData);
      console.log('Usuário registrado:', newUser);
      alert('Registro realizado com sucesso! Por favor, faça o login.');
      onSwitch();
    } catch (err: any) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: 30, scale: 0.95 }}
      animate={{ opacity: 1, x: 0, scale: 1 }}
      exit={{ opacity: 0, x: -30, scale: 0.95 }}
      transition={{ duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }}
      className="relative"
    >
      {/* Header com ornamento */}
      <div className="text-center mb-10">
        <div className="flex items-center justify-center mb-6">
          <div className="w-12 h-[1px] bg-gradient-to-r from-transparent to-[#8b63e9]/40" />
          <Diamond size={16} className="text-[#8b63e9] mx-4" />
          <div className="w-12 h-[1px] bg-gradient-to-l from-transparent to-[#8b63e9]/40" />
        </div>
        
        <DialogTitle as="h3" className="font-['Cinzel_Decorative'] text-3xl lg:text-4xl text-[#F5F5F5] 
                                        font-bold tracking-wide mb-4 uppercase">
          Criar <span className="text-[#8b63e9]">Jornada</span>
        </DialogTitle>
        
        <p className="text-[#a495c6] text-base font-['Noto_Sans'] tracking-wide max-w-md mx-auto leading-relaxed">
          Dê o primeiro passo em sua jornada de autodescoberta mística. Crie sua conta e desvende os mistérios que o aguardam.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-8">
        {/* Campo Nome Premium */}
        <div className="relative group">
          <input 
            name="name" 
            type="text" 
            placeholder=" " 
            value={formData.name} 
            onChange={handleChange} 
            required 
            className="peer w-full rounded-xl bg-[#2f2546]/80 backdrop-blur-sm 
                       text-[#F5F5F5] h-16 px-5 pt-6 pb-2 text-lg font-['Noto_Sans']
                       border border-[#8b63e9]/30 hover:border-[#8b63e9]/50 
                       focus:border-[#FFD700]/60 focus:ring-2 focus:ring-[#FFD700]/20
                       focus:outline-none transition-all duration-300"
          />
          <label className="absolute left-5 text-[#a495c6] transition-all duration-300 
                           pointer-events-none font-['Noto_Sans'] font-medium tracking-wide
                           peer-placeholder-shown:top-5 peer-placeholder-shown:text-lg 
                           peer-focus:top-2 peer-focus:text-sm peer-focus:text-[#FFD700]
                           top-2 text-sm">
            Nome Completo
          </label>
          <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 h-[2px] 
                          bg-gradient-to-r from-[#8b63e9] to-[#FFD700] rounded-full
                          transition-all duration-300 w-0 peer-focus:w-full" />
        </div>

        {/* Campo Email Premium */}
        <div className="relative group">
          <input 
            name="email" 
            type="email" 
            placeholder=" " 
            value={formData.email} 
            onChange={handleChange} 
            required 
            className="peer w-full rounded-xl bg-[#2f2546]/80 backdrop-blur-sm 
                       text-[#F5F5F5] h-16 px-5 pt-6 pb-2 text-lg font-['Noto_Sans']
                       border border-[#8b63e9]/30 hover:border-[#8b63e9]/50 
                       focus:border-[#FFD700]/60 focus:ring-2 focus:ring-[#FFD700]/20
                       focus:outline-none transition-all duration-300"
          />
          <label className="absolute left-5 text-[#a495c6] transition-all duration-300 
                           pointer-events-none font-['Noto_Sans'] font-medium tracking-wide
                           peer-placeholder-shown:top-5 peer-placeholder-shown:text-lg 
                           peer-focus:top-2 peer-focus:text-sm peer-focus:text-[#FFD700]
                           top-2 text-sm">
            E-mail
          </label>
          <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 h-[2px] 
                          bg-gradient-to-r from-[#8b63e9] to-[#FFD700] rounded-full
                          transition-all duration-300 w-0 peer-focus:w-full" />
        </div>

        {/* Campo Senha Premium */}
        <div className="relative group">
          <input 
            name="password" 
            type="password" 
            placeholder=" " 
            value={formData.password} 
            onChange={handleChange} 
            required 
            className="peer w-full rounded-xl bg-[#2f2546]/80 backdrop-blur-sm 
                       text-[#F5F5F5] h-16 px-5 pt-6 pb-2 text-lg font-['Noto_Sans']
                       border border-[#8b63e9]/30 hover:border-[#8b63e9]/50 
                       focus:border-[#FFD700]/60 focus:ring-2 focus:ring-[#FFD700]/20
                       focus:outline-none transition-all duration-300"
          />
          <label className="absolute left-5 text-[#a495c6] transition-all duration-300 
                           pointer-events-none font-['Noto_Sans'] font-medium tracking-wide
                           peer-placeholder-shown:top-5 peer-placeholder-shown:text-lg 
                           peer-focus:top-2 peer-focus:text-sm peer-focus:text-[#FFD700]
                           top-2 text-sm">
            Senha
          </label>
          <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 h-[2px] 
                          bg-gradient-to-r from-[#8b63e9] to-[#FFD700] rounded-full
                          transition-all duration-300 w-0 peer-focus:w-full" />
        </div>
        
        {/* Mensagem de erro elegante */}
        {error && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="p-5 rounded-xl bg-red-900/20 backdrop-blur-sm border border-red-400/30 text-center"
          >
            <p className="text-base text-red-300 font-['Noto_Sans'] font-medium">{error}</p>
          </motion.div>
        )}
        
        {/* Botão Submit Premium */}
        <div className="pt-4">
          <Button 
            type="submit" 
            variant="primary" 
            disabled={isLoading} 
            className="w-full py-5 text-lg font-['Cinzel_Decorative'] font-bold tracking-wide uppercase
                       bg-[#FFD700] hover:bg-[#FFD700]/90
                       text-[#000000] border-0 rounded-xl 
                       shadow-lg shadow-[#FFD700]/40 hover:shadow-xl hover:shadow-[#FFD700]/60
                       transition-all duration-300 disabled:opacity-60 disabled:cursor-not-allowed
                       hover:scale-[1.02] active:scale-[0.98]"
          >
            {isLoading ? (
              <motion.div 
                animate={{ rotate: 360 }} 
                transition={{ repeat: Infinity, duration: 1.2, ease: "linear" }}
                className="flex items-center justify-center"
              >
                <LoaderCircle size={22} />
              </motion.div>
            ) : (
              'Criar Jornada'
            )}
          </Button>
        </div>
      </form>

      {/* Link para login */}
      <div className="mt-10 text-center">
        <div className="flex items-center justify-center mb-6">
          <div className="flex-1 h-[1px] bg-gradient-to-r from-transparent to-[#8b63e9]/20" />
          <div className="mx-4 w-2 h-2 bg-[#8b63e9]/60 rounded-full" />
          <div className="flex-1 h-[1px] bg-gradient-to-l from-transparent to-[#8b63e9]/20" />
        </div>
        
        <p className="text-base text-[#a495c6] font-['Noto_Sans']">
          Já tem uma conta?{' '}
          <button 
            onClick={onSwitch} 
            className="text-[#8b63e9] font-bold hover:text-[#FFD700] 
                       transition-colors duration-200 underline decoration-[#8b63e9]/40 
                       hover:decoration-[#FFD700]/60 underline-offset-4"
          >
            Acesse seu oráculo
          </button>
        </p>
      </div>
    </motion.div>
  );
};

// --- Componente Principal do Modal (PREMIUM) ---
export const AuthModal: FC = () => {
  const { authModalState, openAuthModal, closeAuthModal } = useUIStore();
  const isOpen = authModalState !== 'closed';

  return (
    <Transition appear show={isOpen} as="div">
      <Dialog as="div" className="relative z-50" onClose={closeAuthModal}>
        <TransitionChild
          as="div"
          enter="ease-out duration-500"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-300"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black/80 backdrop-blur-md" />
        </TransitionChild>

        <div className="fixed inset-0 w-screen overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4 text-center">
            <TransitionChild
              as="div"
              enter="ease-out duration-500"
              enterFrom="opacity-0 scale-90 rotate-3"
              enterTo="opacity-100 scale-100 rotate-0"
              leave="ease-in duration-300"
              leaveFrom="opacity-100 scale-100 rotate-0"
              leaveTo="opacity-0 scale-90 rotate-3"
            >
              <DialogPanel className="relative w-full max-w-2xl transform overflow-hidden 
                                    rounded-2xl bg-gradient-to-br from-[#161221]/95 via-[#2f2546]/90 to-[#161221]/95 
                                    backdrop-blur-md border border-[#8b63e9]/30 
                                    p-10 lg:p-12 text-left align-middle 
                                    shadow-2xl shadow-[#8b63e9]/20 transition-all">
                
                {/* Ornamento superior */}
                <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-[#FFD700]/40 to-transparent" />
                
                {/* Background pattern sutil */}
                <div className="absolute inset-0 overflow-hidden pointer-events-none">
                  <div className="absolute -top-20 -right-20 w-40 h-40 border border-[#8b63e9]/10 rounded-full" />
                  <div className="absolute -bottom-20 -left-20 w-32 h-32 border border-[#FFD700]/10 rounded-full" />
                  
                  {/* Nebulosa interna */}
                  <div className="absolute inset-0">
                    <div className="absolute top-1/4 right-1/4 w-32 h-32 bg-[#8b63e9]/5 rounded-full blur-2xl" />
                    <div className="absolute bottom-1/4 left-1/4 w-24 h-24 bg-[#FFD700]/5 rounded-full blur-xl" />
                  </div>
                </div>
                
                <div className="relative z-10">
                  <AnimatePresence mode="wait">
                    {authModalState === 'login' && (
                      <LoginForm key="login" onSwitch={() => openAuthModal('register')} />
                    )}
                    {authModalState === 'register' && (
                      <RegisterForm key="register" onSwitch={() => openAuthModal('login')} />
                    )}
                  </AnimatePresence>
                </div>
                
                {/* Botão de fechar premium */}
                <button 
                  onClick={closeAuthModal} 
                  className="absolute top-6 right-6 p-2 rounded-full 
                             bg-[#2f2546]/60 backdrop-blur-sm border border-[#8b63e9]/30
                             hover:bg-[#8b63e9]/20 hover:border-[#FFD700]/50 
                             transition-all duration-300 group
                             focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FFD700]/50"
                >
                  <X size={18} className="text-[#a495c6] group-hover:text-[#FFD700] transition-colors duration-300" />
                </button>
                
                {/* Ornamento inferior */}
                <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-16 h-[1px] 
                                bg-gradient-to-r from-transparent via-[#8b63e9]/30 to-transparent" />
              </DialogPanel>
            </TransitionChild>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
};