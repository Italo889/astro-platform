// src/services/authService.ts

import { api } from '../lib/api';
// No futuro, importaremos os tipos de dados do usuário aqui
// import type { UserData, LoginCredentials } from '../domain/types';

// Função para registrar um novo usuário
export const registerUser = async (userData: any) => {
  try {
    // Faz uma requisição POST para a rota /users/register do nosso back-end
    const response = await api.post('/users/register', userData);
    return response.data; // Retorna os dados do usuário criado
  } catch (error: any) {
    // Se houver um erro (ex: e-mail já existe), o axios o captura aqui
    // Nós relançamos o erro para que o componente possa tratá-lo
    throw new Error(error.response?.data?.error || 'Não foi possível completar o registro.');
  }
};

// Função para logar um usuário
export const loginUser = async (credentials: any) => {
  try {
    // Faz uma requisição POST para a rota /users/login
    const response = await api.post('/users/login', credentials);
    return response.data; // Retorna { message, token }
  } catch (error: any) {
    throw new Error(error.response?.data?.error || 'Não foi possível fazer o login.');
  }
};