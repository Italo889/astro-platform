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