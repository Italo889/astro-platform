// src/hooks/useBadges.ts

import { useState, useEffect } from 'react';
import { api } from '../lib/api';
import type { Badge } from '../components/ui/Badge/Badge';

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

  const fetchBadges = async () => {
    try {
      setIsLoading(true);
      setError(null);
      
      const response = await api.get<BadgesResponse>('/api/users/badges');
      setBadges(response.data.badges);
      setBetaTesterInfo(response.data.betaTester);
    } catch (err: any) {
      setError(err.response?.data?.error || 'Erro ao carregar badges');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    // Só busca badges se o usuário estiver logado
    const token = localStorage.getItem('token');
    if (token) {
      fetchBadges();
    }
  }, []);

  const isBetaTester = betaTesterInfo !== null;
  const betaTesterNumber = betaTesterInfo?.number || null;

  return {
    badges,
    betaTesterInfo,
    isBetaTester,
    betaTesterNumber,
    isLoading,
    error,
    refetch: fetchBadges
  };
};
