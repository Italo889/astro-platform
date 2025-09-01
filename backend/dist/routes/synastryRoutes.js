"use strict";
// src/routes/synastryRoutes.ts (BACK-END)
Object.defineProperty(exports, "__esModule", { value: true });
exports.synastryRoutes = synastryRoutes;
const engine_1 = require("../domain/engine"); // Supondo que o engine agora exporta esta função
async function synastryRoutes(fastify) {
    // Rota pública para cálculos de sinastria
    fastify.post('/', async (request, reply) => {
        // No futuro, aqui teríamos uma validação robusta com Zod
        const { person1, person2 } = request.body;
        if (!person1 || !person2 || !person1.birthDate || !person2.birthDate) {
            return reply.status(400).send({ error: 'Dados insuficientes para a sinastria.' });
        }
        try {
            // Usamos nosso motor de sinastria que já tem a lógica e a matriz
            const synastryReport = (0, engine_1.computeSynastry)(person1, person2);
            return reply.send(synastryReport);
        }
        catch (error) {
            fastify.log.error(error);
            return reply.status(500).send({ error: 'Não foi possível gerar o relatório de sinastria.' });
        }
    });
}
