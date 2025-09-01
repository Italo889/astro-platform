import axios from 'axios';
import { useAuthStore } from '../store/authStore'; // Importe seu store de autenticação

// Detecta o ambiente automaticamente
const getApiBaseUrl = () => {
  // Se VITE_API_URL está definida, usa ela
  if (import.meta.env.VITE_API_URL) {
    console.log('Using VITE_API_URL:', import.meta.env.VITE_API_URL);
    return import.meta.env.VITE_API_URL;
  }
  
  // Se estamos em localhost, usa localhost
  if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
    console.log('Using localhost API');
    return 'http://localhost:3333';
  }
  
  // Em produção, usa a URL atual do domínio
  const apiUrl = `${window.location.protocol}//${window.location.host}`;
  console.log('Using production API URL:', apiUrl);
  return apiUrl;
};

export const api = axios.create({
  baseURL: getApiBaseUrl() + '/api',
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

// INTERCEPTOR DE RESPOSTA: Para tratar erros de CORS e outros
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.code === 'ERR_NETWORK' || error.message.includes('CORS')) {
      console.error('Erro CORS: Servidor API precisa permitir requisições de:', window.location.origin);
      throw new Error('Servidor temporariamente indisponível. Tente novamente em alguns minutos.');
    }
    
    if (error.response?.status === 401) {
      // Token expirado ou inválido
      useAuthStore.getState().logout();
      window.location.href = '/login';
    }
    
    return Promise.reject(error);
  }
);