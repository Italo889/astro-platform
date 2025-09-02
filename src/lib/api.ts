import axios from 'axios';
import { useAuthStore } from '../store/authStore';
import type { Badge } from '../domain/types';

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

// INTERCEPTOR DE RESPOSTA: erros, CORS e badges
api.interceptors.response.use(
  (response) => {
    // 🏆 Verificar se a resposta contém badges conquistadas
    const data = response.data;
    
    // Para registros de usuário com badges
    if (data?.newBadges && Array.isArray(data.newBadges) && data.newBadges.length > 0) {
      // Importa dinamicamente para evitar circular dependency
      import('../hooks/useBadgeNotification').then(({ useBadgeNotification }) => {
        const { showBadgeNotification } = useBadgeNotification.getState();
        // Mostra a primeira badge conquistada
        showBadgeNotification(data.newBadges[0]);
      });
    }
    
    // Para outras operações que possam retornar um badge individual
    if (data?.newBadge) {
      import('../hooks/useBadgeNotification').then(({ useBadgeNotification }) => {
        const { showBadgeNotification } = useBadgeNotification.getState();
        showBadgeNotification(data.newBadge);
      });
    }
    
    return response;
  },
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
