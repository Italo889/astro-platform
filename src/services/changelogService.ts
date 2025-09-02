// src/services/changelogService.ts

import { api } from '../lib/api';

export interface ChangelogChange {
  type: 'feature' | 'fix' | 'improvement' | 'security';
  description: string;
  icon: string;
}

export interface Changelog {
  id: string;
  version: string;
  title: string;
  description?: string;
  releaseDate: string;
  isPublished?: boolean;
  changes: ChangelogChange[];
  createdBy: {
    name: string;
  };
  createdAt?: string;
}

export interface CreateChangelogData {
  version: string;
  title: string;
  description?: string;
  isPublished?: boolean;
  changes: ChangelogChange[];
}

// 📄 SERVIÇOS PÚBLICOS

export const getPublicChangelogs = async (): Promise<Changelog[]> => {
  try {
    const response = await api.get('/changelog');
    return response.data;
  } catch (error: any) {
    throw new Error(error.response?.data?.error || 'Erro ao buscar changelogs.');
  }
};

export const getPublicChangelog = async (id: string): Promise<Changelog> => {
  try {
    const response = await api.get(`/changelog/${id}`);
    return response.data;
  } catch (error: any) {
    throw new Error(error.response?.data?.error || 'Erro ao buscar changelog.');
  }
};

// 🔐 SERVIÇOS ADMIN

export const getAllChangelogs = async (): Promise<Changelog[]> => {
  try {
    const response = await api.get('/changelog/admin/all');
    return response.data;
  } catch (error: any) {
    throw new Error(error.response?.data?.error || 'Erro ao buscar changelogs.');
  }
};

export const createChangelog = async (data: CreateChangelogData): Promise<Changelog> => {
  try {
    const response = await api.post('/changelog/admin/create', data);
    return response.data;
  } catch (error: any) {
    throw new Error(error.response?.data?.error || 'Erro ao criar changelog.');
  }
};

export const updateChangelog = async (id: string, data: Partial<CreateChangelogData>): Promise<Changelog> => {
  try {
    const response = await api.put(`/changelog/admin/${id}`, data);
    return response.data;
  } catch (error: any) {
    throw new Error(error.response?.data?.error || 'Erro ao atualizar changelog.');
  }
};

export const deleteChangelog = async (id: string): Promise<void> => {
  try {
    await api.delete(`/changelog/admin/${id}`);
  } catch (error: any) {
    throw new Error(error.response?.data?.error || 'Erro ao deletar changelog.');
  }
};

export const toggleChangelogPublish = async (id: string): Promise<{ message: string; changelog: any }> => {
  try {
    const response = await api.patch(`/changelog/admin/${id}/toggle-publish`);
    return response.data;
  } catch (error: any) {
    throw new Error(error.response?.data?.error || 'Erro ao alterar status de publicação.');
  }
};

// Export das funções como objeto default
export const changelogService = {
  getPublicChangelogs,
  getPublicChangelog,
  getAllChangelogs,
  createChangelog,
  updateChangelog,
  deleteChangelog,
  toggleChangelogPublish
};
