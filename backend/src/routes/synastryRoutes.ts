// src/routes/synastryRoutes.ts (BACK-END)

import type { FastifyInstance } from 'fastify';
import { computeSynastry } from '../domain/engine'; // Supondo que o engine agora exporta esta função
import type { BirthInput } from '../domain/types';

export async function synastryRoutes(fastify: FastifyInstance) {

  // Rota pública para cálculos de sinastria
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
}