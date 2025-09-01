"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.contentRoutes = contentRoutes;
// Vamos assumir que seu 'arcana.ts' exporta uma função que retorna todos os arcanos
const arcana_1 = require("../domain/lib/arcana");
async function contentRoutes(app) {
    // Rota GET para buscar todos os Arcanos Maiores
    // Acessível via: http://localhost:3000/content/major-arcana
    app.get('/content/major-arcana', async (request, reply) => {
        try {
            const allArcana = (0, arcana_1.getAllMajorArcana)(); // Chamando a função do seu domínio
            return reply.status(200).send(allArcana);
        }
        catch (error) {
            console.error("Erro ao buscar dados dos arcanos:", error);
            return reply.status(500).send({ message: 'Erro interno ao buscar conteúdo.' });
        }
    });
    // No futuro, você pode adicionar outras rotas aqui:
    // app.get('/content/zodiac-signs', async (...) => { ... });
}
