import axios from 'axios';
import { useAuthStore } from '../store/authStore'; // Importe seu store de autenticação

export const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:3000',
  timeout: 10000,
});

// INTERCEPTOR: Isso é executado ANTES de cada requisição
api.interceptors.request.use(
  (config) => {
    // Pega o estado mais recente do store
    const token = useAuthStore.getState().token;

    // Se o token existir, adiciona ao cabeçalho de autorização
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config; // Continua com a requisição
  },
  (error) => {
    return Promise.reject(error);
  }
);