"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.prisma = void 0;
// src/prisma.ts
const client_1 = require("@prisma/client");
// Cria e exporta uma instância única do Prisma Client
exports.prisma = new client_1.PrismaClient({
    // Opcional: Habilita o log de todas as queries para depuração
    log: ['query', 'info', 'warn', 'error'],
});
