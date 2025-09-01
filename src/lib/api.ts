// src/lib/api.ts
import axios from 'axios';
import { useAuthStore } from '../store/authStore';

// SOLUÇÃO DEFINITIVA: Frontend separado do backend
const getApiBaseUrl = () => {
  // Desenvolvimento local
  if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
    console.log('🔧 DESENVOLVIMENTO: Usando localhost API');
    return 'http://localhost:3333';
  }

  // Produção → backend real (microserviço)
  const apiUrl = 'https://arcano-1a7a1b6d1bec.herokuapp.com';
  console.log('🚀 PRODUÇÃO: Usando backend separado:', apiUrl);
  return apiUrl;
};

export const api = axios.create({
  baseURL: getApiBaseUrl(), // o /api já está no backend
  timeout: 10000,
});

// INTERCEPTOR: Antes de cada requisição
api.interceptors.request.use(
  (config) => {
    console.log('📡 Fazendo requisição para:', (config.baseURL ?? '') + config.url);
    
    const token = useAuthStore.getState().token;

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => Promise.reject(error)
);

// INTERCEPTOR DE RESPOSTA: para lidar com erros globais
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.code === 'ERR_NETWORK' || error.message.includes('CORS')) {
      console.error('Erro CORS: Servidor API precisa permitir requisições de:', window.location.origin);
      throw new Error('Servidor temporariamente indisponível. Tente novamente em alguns minutos.');
    }

    if (error.response?.status === 401) {
      useAuthStore.getState().logout();
      window.location.href = '/login';
    }

    return Promise.reject(error);
  }
);
