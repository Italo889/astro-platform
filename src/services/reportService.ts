// src/services/reportService.ts (FRONT-END)

import { api } from '../lib/api';
import type { BirthInput, Report } from '../domain/types';
import { useAuthStore } from '../store/authStore';

// Função para CRIAR um novo relatório
export const createReport = async (input: BirthInput): Promise<Report> => {
  try {
    const token = useAuthStore.getState().token;
    
    const response = await api.post('/reports', input, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  } catch (error: any) {
    throw new Error(error.response?.data?.error || 'Não foi possível gerar o relatório.');
  }
};

// Função para BUSCAR os relatórios do usuário logado
export const getMyReports = async (): Promise<Report[]> => {
  try {
    const token = useAuthStore.getState().token;
    if (!token) {
      // Retorna um array vazio se não houver token, pois não há relatórios para buscar
      return []; 
    }

    const response = await api.get('/reports', {
      headers: { Authorization: `Bearer ${token}` },
    });

    return response.data;
  } catch (error: any) {
    throw new Error(error.response?.data?.error || 'Não foi possível buscar os relatórios.');
  }
};

// Adicione esta nova função:
export const calculateAnonymousReport = async (input: BirthInput): Promise<Report> => {
  try {
    // Chama a nova rota PÚBLICA /calculate/personal
    const response = await api.post('/calculate/personal', input);
    return response.data;
  } catch (error: any) {
    throw new Error(error.response?.data?.error || 'Não foi possível gerar o relatório.');
  }
};

// NOVO: Função para buscar um relatório específico pelo ID
export const getReportById = async (reportId: string): Promise<any> => {
  try {
    const token = useAuthStore.getState().token;
    if (!token) throw new Error('Usuário não autenticado.');

    const response = await api.get(`/reports/${reportId}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  } catch (error: any) {
    throw new Error(error.response?.data?.error || 'Não foi possível buscar este relatório.');
  }
};