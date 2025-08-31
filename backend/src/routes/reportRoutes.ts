import type { FastifyInstance } from 'fastify';
import { z } from 'zod';
import { prisma } from '../prisma';
import { computeReport } from '../domain/engine';

// Schema de validação para a entrada do POST
const birthInputSchema = z.object({
  name: z.string().min(3, { message: 'O nome completo é obrigatório.' }),
  birthDate: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, { message: 'Formato de data inválido. Use YYYY-MM-DD.' }),
  birthTime: z.string().regex(/^\d{2}:\d{2}$/, { message: 'Formato de hora inválido. Use HH:MM.' }),
  birthPlace: z.string().min(3, { message: 'O local de nascimento é obrigatório.' }),
});

// Schema de validação para os parâmetros da rota GET por ID
const getReportParamsSchema = z.object({
    id: z.string().uuid(),
});

export async function reportRoutes(app: FastifyInstance) {

  // Rota: POST /reports - para CRIAR e SALVAR um novo relatório (Seu código, já correto)
  app.post('/', { preHandler: [app.authenticate] }, async (request, reply) => {
    try {
      const birthInput = birthInputSchema.parse(request.body);
      // @ts-ignore
      const userId = request.user.id;
      const reportContent = await computeReport(birthInput);
      
      const newReport = await prisma.report.create({
        data: {
          content: reportContent as any,
          ownerId: userId,
        }
      });

      return reply.status(201).send(newReport);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return reply.status(400).send({ message: 'Dados de entrada inválidos.', issues: error.format() });
      }
      app.log.error(error);
      return reply.status(500).send({ message: 'Não foi possível gerar o relatório.' });
    }
  });

  // Rota: GET /reports - para BUSCAR os relatórios do usuário logado
  app.get('/', { preHandler: [app.authenticate] }, async (request, reply) => {
    try {
      // @ts-ignore
      const userId = request.user.id;

      const reports = await prisma.report.findMany({
        where: {
          ownerId: userId,
        },
        orderBy: {
          createdAt: 'desc', // Ordena pelos mais recentes primeiro
        },
      });

      return reply.send(reports);

    } catch (error) {
      app.log.error(error);
      return reply.status(500).send({ message: 'Não foi possível buscar os relatórios.' });
    }
  });

  // Rota: GET /reports/:id - para BUSCAR um relatório específico
  app.get('/:id', { preHandler: [app.authenticate] }, async (request, reply) => {
    try {
      // @ts-ignore
      const userId = request.user.id;
      const { id } = getReportParamsSchema.parse(request.params);

      const report = await prisma.report.findFirst({
        where: {
          id: id,
          // VERIFICAÇÃO DE SEGURANÇA: Garante que o usuário só possa ver seus próprios relatórios
          ownerId: userId,
        },
      });

      if (!report) {
        return reply.status(404).send({ message: 'Relatório não encontrado ou você não tem permissão para acessá-lo.' });
      }

      return reply.send(report);

    } catch (error) {
      if (error instanceof z.ZodError) {
        return reply.status(400).send({ message: 'ID do relatório inválido.', issues: error.format() });
      }
      app.log.error(error);
      return reply.status(500).send({ message: 'Não foi possível buscar o relatório.' });
    }
  });
}