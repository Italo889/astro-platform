// src/routes/calculationRoutes.ts (BACK-END)

import type { FastifyInstance } from 'fastify';
import { computeReport } from '../domain/engine';

export async function calculationRoutes(fastify: FastifyInstance) {

  // Rota pública para cálculos anônimos
  fastify.post('/personal', async (request, reply) => {
    const birthInput = request.body as any;
    try {
      // Apenas calcula e retorna o relatório, sem salvar no banco
      const reportContent = computeReport(birthInput);
      return reply.send(reportContent);
    } catch (error) {
      fastify.log.error(error);
      return reply.status(500).send({ error: 'Não foi possível gerar o relatório anônimo.' });
    }
  });
}