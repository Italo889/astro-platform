// src/hooks/useBadges.ts

import { useState, useEffect } from 'react';
import { api } from '../lib/api';
import { useAuthStore } from '../store/authStore';
import type { Badge } from '../domain/types';

interface BetaTesterInfo {
  number: number;
  status: string;
}

interface BadgesResponse {
  badges: Badge[];
  betaTester: BetaTesterInfo | null;
}

export const useBadges = () => {
  const [badges, setBadges] = useState<Badge[]>([]);
  const [betaTesterInfo, setBetaTesterInfo] = useState<BetaTesterInfo | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  // Usa a store de auth em vez de localStorage diretamente
  const token = useAuthStore((state) => state.token);

  const fetchBadges = async () => {
    try {
      setIsLoading(true);
      setError(null);
      
      const response = await api.get<BadgesResponse>('/users/badges');
      setBadges(response.data.badges);
      setBetaTesterInfo(response.data.betaTester);
    } catch (err: any) {
      setError(err.response?.data?.error || 'Erro ao carregar badges');
    } finally {
      setIsLoading(false);
    }
  };

  // 🔄 Nova função para verificar badges retroativas com validação inteligente
  const checkRetroactiveBadges = async () => {
    try {
      setIsLoading(true);
      setError(null);
      
      const response = await api.post('/users/badges/check-retroactive');
      const { newBadges, message, hasAllBadges, currentBadgesCount, totalAvailable } = response.data;
      
      // Atualiza a lista de badges após verificação
      await fetchBadges();
      
      return {
        newBadges,
        message,
        hasAllBadges,
        currentBadgesCount,
        totalAvailable,
        hasNewBadges: newBadges.length > 0
      };
    } catch (err: any) {
      setError(err.response?.data?.error || 'Erro ao verificar badges retroativas');
      return {
        newBadges: [],
        message: 'Erro ao verificar conquistas',
        hasAllBadges: false,
        currentBadgesCount: 0,
        totalAvailable: 0,
        hasNewBadges: false
      };
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    // Só busca badges se o usuário estiver logado
    if (token) {
      fetchBadges();
    }
  }, [token]); // Adiciona token como dependência

  const isBetaTester = betaTesterInfo !== null;
  const betaTesterNumber = betaTesterInfo?.number || null;

  return {
    badges,
    betaTesterInfo,
    isBetaTester,
    betaTesterNumber,
    isLoading,
    error,
    refetch: fetchBadges,
    checkRetroactiveBadges
  };
};
