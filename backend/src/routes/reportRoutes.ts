// src/routes/reportRoutes.ts

import type { FastifyInstance } from 'fastify';
import { prisma } from '../prisma';
import { computeReport } from '../domain/engine';

// Não precisamos mais do 'declare module' aqui, pois ele vive no plugin.

export async function reportRoutes(fastify: FastifyInstance) {

  // Rota: POST /reports - para criar um novo relatório
  fastify.post('/', {
      preHandler: [fastify.authenticate] 
    }, 
    async (request, reply) => {
      // Graças à nossa tipagem, o TypeScript agora sabe que 'request.user' existe e tem um 'id'.
      const userId = request.user.id;
      const birthInput = request.body as any;

      try {
        const reportContent = computeReport(birthInput);
        
        const newReport = await prisma.report.create({
          data: {
            content: reportContent,
            ownerId: userId,
          }
        });

        console.log("BACK-END ESTÁ ENVIANDO:", newReport);

        return reply.status(201).send(newReport);

      } catch (error) {
        fastify.log.error(error);
        return reply.status(500).send({ error: 'Não foi possível gerar o relatório.' });
      }
    }
  );

  // NOVO: Rota GET /reports - para buscar os relatórios do usuário logado
  fastify.get('/', {
      preHandler: [fastify.authenticate]
    },
    async (request, reply) => {
      const userId = request.user.id;

      try {
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
        fastify.log.error(error);
        return reply.status(500).send({ error: 'Não foi possível buscar os relatórios.' });
      }
    }
  );

  // NOVO: Rota GET /reports/:id - para buscar um relatório específico
  fastify.get('/:id', {
      preHandler: [fastify.authenticate]
    },
    async (request, reply) => {
      const userId = request.user.id;
      const { id } = request.params as { id: string };

      try {
        const report = await prisma.report.findFirst({
          where: {
            id: id,
            ownerId: userId, // ESSENCIAL: Garante que o usuário só possa ver seus próprios relatórios
          },
        });

        if (!report) {
          return reply.status(404).send({ error: 'Relatório não encontrado ou você não tem permissão para vê-lo.' });
        }

        return reply.send(report);

      } catch (error) {
        fastify.log.error(error);
        return reply.status(500).send({ error: 'Não foi possível buscar o relatório.' });
      }
    }
  );
}