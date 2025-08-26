// src/store/uiStore.ts

import { create } from 'zustand';

type AuthModalState = 'closed' | 'login' | 'register';

interface UIState {
  authModalState: AuthModalState;
  openAuthModal: (state: 'login' | 'register') => void;
  closeAuthModal: () => void;
}

export const useUIStore = create<UIState>((set) => ({
  authModalState: 'closed', // O modal começa fechado
  
  // Ação para abrir o modal no estado desejado (Login ou Registro)
  openAuthModal: (state) => set({ authModalState: state }),

  // Ação para fechar o modal
  closeAuthModal: () => set({ authModalState: 'closed' }),
}));