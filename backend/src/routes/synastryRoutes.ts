// src/routes/synastryRoutes.ts (BACK-END)

import type { FastifyInstance } from 'fastify';
import { computeSynastry } from '../domain/engine'; // Supondo que o engine agora exporta esta função
import type { BirthInput } from '../domain/types';
import { BadgeSystem } from '../domain/lib/badgeSystem';
import { prisma } from '../prisma';

export async function synastryRoutes(fastify: FastifyInstance) {

  // Rota pública para cálculos de sinastria (visitantes)
  fastify.post('/', async (request, reply) => {
    
    // No futuro, aqui teríamos uma validação robusta com Zod
    const { person1, person2 } = request.body as { person1: BirthInput, person2: BirthInput };

    if (!person1 || !person2 || !person1.birthDate || !person2.birthDate) {
      return reply.status(400).send({ error: 'Dados insuficientes para a sinastria.' });
    }

    try {
      // Usamos nosso motor de sinastria que já tem a lógica e a matriz
      const synastryReport = computeSynastry(person1, person2);
      
      return reply.send(synastryReport);

    } catch (error) {
      fastify.log.error(error);
      return reply.status(500).send({ error: 'Não foi possível gerar o relatório de sinastria.' });
    }
  });

  // 🆕 Rota para usuários autenticados - salva no banco e concede badges
  fastify.post('/calculate', { preHandler: [fastify.authenticate] }, async (request, reply) => {
    
    const { person1, person2 } = request.body as { person1: BirthInput, person2: BirthInput };
    // @ts-ignore
    const userId = request.user.id;

    if (!person1 || !person2 || !person1.birthDate || !person2.birthDate) {
      return reply.status(400).send({ error: 'Dados insuficientes para a sinastria.' });
    }

    try {
      // Gera o relatório de sinastria
      const synastryReport = computeSynastry(person1, person2);
      
      // Salva no banco de dados usando a tabela Report existente
      const savedSynastry = await prisma.report.create({
        data: {
          content: { ...synastryReport, type: 'synastry' } as any,
          ownerId: userId,
        }
      });

      // 🏆 Sistema de Badges - Conceder badge de mestre da sinastria
      let newBadge = null;
      try {
        // Verifica quantos relatórios de sinastria o usuário já tem
        const userSynastriesCount = await prisma.report.count({
          where: { 
            ownerId: userId,
            content: {
              path: ['type'],
              equals: 'synastry'
            }
          }
        });
        
        // Concede o badge se for o 5º relatório de sinastria
        if (userSynastriesCount === 5) {
          newBadge = await BadgeSystem.awardBadge(userId, 'SYNASTRY_MASTER');
        }
      } catch (badgeError) {
        // Log do erro mas não falha a criação do relatório
        fastify.log.error({ error: badgeError }, 'Erro ao conceder badge de mestre da sinastria');
      }
      
      // Resposta incluindo badge conquistada (se houver)
      const response = {
        ...savedSynastry,
        newBadge
      };
      
      return reply.status(201).send(response);

    } catch (error) {
      fastify.log.error(error);
      return reply.status(500).send({ error: 'Não foi possível gerar o relatório de sinastria.' });
    }
  });
}