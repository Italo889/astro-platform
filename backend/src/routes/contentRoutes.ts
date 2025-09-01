import type { FastifyInstance } from 'fastify';
// Vamos assumir que seu 'arcana.ts' exporta uma função que retorna todos os arcanos
import { getAllMajorArcana } from '../domain/lib/arcana'; 

export async function contentRoutes(app: FastifyInstance) {

  // Rota GET para buscar todos os Arcanos Maiores
  // Acessível via: http://localhost:3000/content/major-arcana
  app.get('/content/major-arcana', async (request, reply) => {
    try {
      const allArcana = getAllMajorArcana(); // Chamando a função do seu domínio
      return reply.status(200).send(allArcana);
    } catch (error) {
      console.error("Erro ao buscar dados dos arcanos:", error);
      return reply.status(500).send({ message: 'Erro interno ao buscar conteúdo.' });
    }
  });

  // No futuro, você pode adicionar outras rotas aqui:
  // app.get('/content/zodiac-signs', async (...) => { ... });
}