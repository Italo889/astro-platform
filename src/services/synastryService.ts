// src/services/synastryService.ts (FRONT-END)

import { api } from '../lib/api';
import type { BirthInput, SynastryReport } from '../domain/types';

export const calculateSynastry = async (person1: BirthInput, person2: BirthInput): Promise<SynastryReport> => {
  try {
    const response = await api.post('/calculate/synastry', { person1, person2 });
    return response.data;
  } catch (error: any) {
    throw new Error(error.response?.data?.error || 'Não foi possível calcular a sinastria.');
  }
};