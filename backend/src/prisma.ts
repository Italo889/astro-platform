// src/prisma.ts
import { PrismaClient } from '@prisma/client';

// Cria e exporta uma instância única do Prisma Client
export const prisma = new PrismaClient({
  // Opcional: Habilita o log de todas as queries para depuração
  log: ['query', 'info', 'warn', 'error'],
});