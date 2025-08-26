// src/components/auth/ProtectedRoute.tsx

import type { FC } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuthStore } from '../../store/authStore';

export const ProtectedRoute: FC = () => {
  // Verificamos em nossa "memória" se existe um token de login
  const token = useAuthStore((state) => state.token);

  // Se não há token, redirecionamos o usuário para a página inicial
  if (!token) {
    return <Navigate to="/" replace />;
  }

  // Se há um token, renderizamos a página que está sendo protegida
  // O <Outlet /> é um placeholder do React Router para a rota filha
  return <Outlet />;
};