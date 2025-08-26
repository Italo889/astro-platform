// src/services/newsletterService.ts (FRONT-END)

import { api } from '../lib/api';

export const subscribeToNewsletter = async (email: string): Promise<{ message: string }> => {
  try {
    const response = await api.post('/newsletter/subscribe', { email });
    return response.data;
  } catch (error: any) {
    throw new Error(error.response?.data?.error || 'Não foi possível completar a inscrição.');
  }
};