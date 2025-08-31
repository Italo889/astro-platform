import { api } from '../lib/api';
// Ele importa os tipos, não os define.
import type { PersonalReport, SavedReport } from '../domain/types';

export interface CalculationInput {
  name: string;
  birthDate: string; // Formato "YYYY-MM-DD"
  birthTime: string;
  birthPlace: string;
}

/**
 * Calcula um relatório para um usuário anônimo. Rota PÚBLICA.
 */
export const calculateAnonymousReport = async (input: CalculationInput): Promise<PersonalReport> => {
  try {
    const response = await api.post<PersonalReport>('/calculate/personal', input);
    return response.data;
  } catch (error: any) {
    // MELHORIA: Padronizando a captura da mensagem de erro da API
    throw new Error(error.response?.data?.message || 'Não foi possível gerar o relatório anônimo.');
  }
};

/**
 * Cria E SALVA um novo relatório para o usuário logado. Rota PROTEGIDA.
 */
export const createAndSaveReport = async (input: CalculationInput): Promise<SavedReport> => {
  try {
    const response = await api.post<SavedReport>('/reports', input);
    return response.data;
  } catch (error: any) {
    throw new Error(error.response?.data?.message || 'Não foi possível criar o relatório.');
  }
};

/**
 * Busca todos os relatórios do usuário logado. Rota PROTEGIDA.
 */
export const getMyReports = async (): Promise<SavedReport[]> => {
  try {
    const response = await api.get<SavedReport[]>('/reports');
    return response.data;
  } catch (error: any) {
    throw new Error(error.response?.data?.message || 'Não foi possível buscar seus relatórios.');
  }
};

/**
 * Busca um relatório específico pelo ID. Rota PROTEGIDA.
 */
export const getReportById = async (reportId: string): Promise<SavedReport> => {
  try {
    const response = await api.get<SavedReport>(`/reports/${reportId}`);
    return response.data;
  } catch (error: any) {
    throw new Error(error.response?.data?.message || 'Não foi possível buscar este relatório.');
  }
};
