import type { FastifyInstance } from 'fastify';
import { z } from 'zod';
import { computeReport } from '../domain/engine';

const birthInputSchema = z.object({
  name: z.string().min(3, { message: 'O nome completo é obrigatório.' }),
  birthDate: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, { message: 'Formato de data inválido. Use YYYY-MM-DD.' }),
  birthTime: z.string().regex(/^\d{2}:\d{2}$/, { message: 'Formato de hora inválido. Use HH:MM.' }),
  birthPlace: z.string().min(3, { message: 'O local de nascimento é obrigatório.' }),
});

export async function calculationRoutes(app: FastifyInstance) {

  // CORREÇÃO: A rota agora é apenas '/personal'.
  // O servidor irá juntar o prefixo '/calculate' com '/personal'
  // para criar a rota final correta: POST /calculate/personal
  app.post('/personal', async (request, reply) => {
    try {
      const input = birthInputSchema.parse(request.body);
      const report = await computeReport(input);
      return reply.status(200).send(report);

    } catch (error) {
      if (error instanceof z.ZodError) {
        return reply.status(400).send({ message: 'Dados de entrada inválidos.', issues: error.format() });
      }
      app.log.error(error);
      return reply.status(500).send({ message: 'Erro interno ao calcular o relatório.' });
    }
  });
}