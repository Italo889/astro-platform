"use strict";
// src/routes/newsletterRoutes.ts (BACK-END)
Object.defineProperty(exports, "__esModule", { value: true });
exports.newsletterRoutes = newsletterRoutes;
const prisma_1 = require("../prisma");
async function newsletterRoutes(fastify) {
    // Rota: POST /newsletter/subscribe
    fastify.post('/subscribe', async (request, reply) => {
        // No futuro, usaríamos Zod para validar se é um e-mail válido
        const { email } = request.body;
        if (!email) {
            return reply.status(400).send({ error: 'O e-mail é obrigatório.' });
        }
        try {
            // Usamos 'upsert' para um comportamento inteligente:
            // Se o e-mail já existe, ele não faz nada. Se não existe, ele cria.
            // Isso evita erros de "e-mail duplicado" para o usuário.
            await prisma_1.prisma.subscriber.upsert({
                where: { email },
                update: {},
                create: { email },
            });
            return reply.status(201).send({ message: 'Inscrição realizada com sucesso!' });
        }
        catch (error) {
            fastify.log.error(error);
            return reply.status(500).send({ error: 'Não foi possível processar sua inscrição.' });
        }
    });
}
