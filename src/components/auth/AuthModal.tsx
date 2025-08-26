// src/components/auth/AuthModal.tsx

import { Dialog, DialogPanel, DialogTitle, Transition, TransitionChild } from '@headlessui/react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, LoaderCircle } from 'lucide-react';
import { useUIStore } from '../../store/uiStore';
import { useAuthStore } from '../../store/authStore';
import { Button } from '../ui/Button';
import { useState } from 'react';
import type { FC, FormEvent } from 'react';

// Importando AMBOS os serviços de autenticação
import { registerUser, loginUser } from '../../services/authService';

// --- Sub-componente para o formulário de Login (AGORA CONECTADO) ---
const LoginForm: FC<{ onSwitch: () => void }> = ({ onSwitch }) => {
  // Lógica de estado idêntica à do RegisterForm
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  // Pegando as ações dos nossos stores
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
      // Chama a função de login do nosso serviço
      const response = await loginUser(formData);
      // Salva o token no estado global (Zustand) e no localStorage
      loginAction(response.token);
      // Fecha o modal após o sucesso
      closeModal();
    } catch (err: any) {
      // Exibe o erro retornado pela API
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 20 }}
    >
      <DialogTitle as="h3" className="font-serif text-3xl text-white">
        Acessar Oráculo
      </DialogTitle>
      <p className="mt-1 text-sm text-[rgb(var(--color-text-muted))]">Bem-vindo(a) de volta.</p>
      
      <form onSubmit={handleSubmit} className="mt-6 space-y-4">
        <input name="email" type="email" placeholder="E-mail" value={formData.email} onChange={handleChange} required className="w-full rounded-lg bg-[rgb(var(--color-surface))] p-3 text-white focus:outline-none focus:ring-2 focus:ring-primary" />
        <input name="password" type="password" placeholder="Senha" value={formData.password} onChange={handleChange} required className="w-full rounded-lg bg-[rgb(var(--color-surface))] p-3 text-white focus:outline-none focus:ring-2 focus:ring-primary" />
        
        {error && <p className="text-sm text-red-400 text-center">{error}</p>}
        
        <Button type="submit" variant="primary" disabled={isLoading} className="w-full py-3">
          {isLoading ? <LoaderCircle size={20} className="animate-spin" /> : 'Entrar'}
        </Button>
      </form>

      <p className="mt-6 text-center text-sm text-[rgb(var(--color-text-muted))]">
        Não tem uma conta?{' '}
        <button onClick={onSwitch} className="font-semibold text-primary hover:underline">
          Crie sua jornada
        </button>
      </p>
    </motion.div>
  );
};


// --- Sub-componente para o formulário de Registro (sem alterações) ---
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
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
    >
      <DialogTitle as="h3" className="font-serif text-3xl text-white">
        Criar Jornada
      </DialogTitle>
      <p className="mt-1 text-sm text-[rgb(var(--color-text-muted))]">Comece sua jornada de autodescoberta.</p>

      <form onSubmit={handleSubmit} className="mt-6 space-y-4">
        <input name="name" type="text" placeholder="Nome Completo" value={formData.name} onChange={handleChange} required className="w-full rounded-lg bg-[rgb(var(--color-surface))] p-3 text-white focus:outline-none focus:ring-2 focus:ring-primary" />
        <input name="email" type="email" placeholder="E-mail" value={formData.email} onChange={handleChange} required className="w-full rounded-lg bg-[rgb(var(--color-surface))] p-3 text-white focus:outline-none focus:ring-2 focus:ring-primary" />
        <input name="password" type="password" placeholder="Senha" value={formData.password} onChange={handleChange} required className="w-full rounded-lg bg-[rgb(var(--color-surface))] p-3 text-white focus:outline-none focus:ring-2 focus:ring-primary" />
        
        {error && <p className="text-sm text-red-400 text-center pt-2">{error}</p>}
        
        <Button type="submit" variant="primary" disabled={isLoading} className="w-full py-3">
          {isLoading ? <LoaderCircle size={20} className="animate-spin" /> : 'Registrar'}
        </Button>
      </form>

      <p className="mt-6 text-center text-sm text-[rgb(var(--color-text-muted))]">
        Já tem uma conta?{' '}
        <button onClick={onSwitch} className="font-semibold text-primary hover:underline">
          Acesse seu oráculo
        </button>
      </p>
    </motion.div>
  );
};


// --- Componente Principal do Modal (sem alterações) ---
export const AuthModal: FC = () => {
  const { authModalState, openAuthModal, closeAuthModal } = useUIStore();
  const isOpen = authModalState !== 'closed';

  return (
    <Transition appear show={isOpen} as="div">
      <Dialog as="div" className="relative z-50" onClose={closeAuthModal}>
        <TransitionChild
          as="div"
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black/70 backdrop-blur-sm" />
        </TransitionChild>

        <div className="fixed inset-0 w-screen overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4 text-center">
            <TransitionChild
              as="div"
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <DialogPanel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-[rgb(var(--color-background))] border border-[rgb(var(--color-surface))] p-8 text-left align-middle shadow-xl transition-all">
                <AnimatePresence mode="wait">
                  {authModalState === 'login' && (
                    <LoginForm key="login" onSwitch={() => openAuthModal('register')} />
                  )}
                  {authModalState === 'register' && (
                    <RegisterForm key="register" onSwitch={() => openAuthModal('login')} />
                  )}
                </AnimatePresence>
                
                <button onClick={closeAuthModal} className="absolute top-4 right-4 p-2 rounded-full hover:bg-[rgb(var(--color-surface))] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary">
                  <X size={20} className="text-[rgb(var(--color-text-muted))]" />
                </button>
              </DialogPanel>
            </TransitionChild>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
};