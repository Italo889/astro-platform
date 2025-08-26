// src/store/authStore.ts

import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { jwtDecode } from 'jwt-decode';

interface UserPayload {
  id: string;
  name: string;
}

interface AuthState {
  token: string | null;
  user: UserPayload | null;
  login: (token: string) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      token: null,
      user: null,

      login: (token) => {
        // Decodifica o token para extrair as informações do usuário
        const decoded = jwtDecode<UserPayload>(token);
        set({ token, user: { id: decoded.id, name: decoded.name } });
      },
      
      logout: () => {
        set({ token: null, user: null });
      },
    }),
    {
      name: 'arcan-auth-storage', // Nome da chave no localStorage
    }
  )
);