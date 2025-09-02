import axios from 'axios';
import { useAuthStore } from '../store/authStore';

const getApiBaseUrl = () => {
  // localhost
  if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
    console.log('🔧 DESENVOLVIMENTO: Usando localhost API');
    return 'http://localhost:3333';
  }

  // produção: usar o mesmo domínio (monolito)
  const apiUrl = window.location.origin;
  console.log('🚀 PRODUÇÃO: Usando monolito no mesmo domínio:', apiUrl);
  return apiUrl;
};

export const api = axios.create({
  baseURL: getApiBaseUrl() + '/api',
  timeout: 10000,
});

// INTERCEPTOR: antes da requisição
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

// INTERCEPTOR DE RESPOSTA: erros e CORS
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
