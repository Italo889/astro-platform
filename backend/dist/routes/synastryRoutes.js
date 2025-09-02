"use strict";
// src/routes/synastryRoutes.ts (BACK-END)
Object.defineProperty(exports, "__esModule", { value: true });
exports.synastryRoutes = synastryRoutes;
const engine_1 = require("../domain/engine"); // Supondo que o engine agora exporta esta função
const badgeSystem_1 = require("../domain/lib/badgeSystem");
const prisma_1 = require("../prisma");
async function synastryRoutes(fastify) {
    // Rota pública para cálculos de sinastria (visitantes)
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
    // 🆕 Rota para usuários autenticados - salva no banco e concede badges
    fastify.post('/calculate', { preHandler: [fastify.authenticate] }, async (request, reply) => {
        const { person1, person2 } = request.body;
        // @ts-ignore
        const userId = request.user.id;
        if (!person1 || !person2 || !person1.birthDate || !person2.birthDate) {
            return reply.status(400).send({ error: 'Dados insuficientes para a sinastria.' });
        }
        try {
            // Gera o relatório de sinastria
            const synastryReport = (0, engine_1.computeSynastry)(person1, person2);
            // Salva no banco de dados usando a tabela Report existente
            const savedSynastry = await prisma_1.prisma.report.create({
                data: {
                    content: { ...synastryReport, type: 'synastry' },
                    ownerId: userId,
                }
            });
            // 🏆 Sistema de Badges - Conceder badge de mestre da sinastria
            let newBadge = null;
            try {
                // Verifica quantos relatórios de sinastria o usuário já tem
                const userSynastriesCount = await prisma_1.prisma.report.count({
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
                    newBadge = await badgeSystem_1.BadgeSystem.awardBadge(userId, 'SYNASTRY_MASTER');
                }
            }
            catch (badgeError) {
                // Log do erro mas não falha a criação do relatório
                fastify.log.error({ error: badgeError }, 'Erro ao conceder badge de mestre da sinastria');
            }
            // Resposta incluindo badge conquistada (se houver)
            const response = {
                ...savedSynastry,
                newBadge
            };
            return reply.status(201).send(response);
        }
        catch (error) {
            fastify.log.error(error);
            return reply.status(500).send({ error: 'Não foi possível gerar o relatório de sinastria.' });
        }
    });
}
