"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.calculationRoutes = calculationRoutes;
const zod_1 = require("zod");
const engine_1 = require("../domain/engine");
const birthInputSchema = zod_1.z.object({
    name: zod_1.z.string().min(3, { message: 'O nome completo é obrigatório.' }),
    birthDate: zod_1.z.string().regex(/^\d{4}-\d{2}-\d{2}$/, { message: 'Formato de data inválido. Use YYYY-MM-DD.' }),
    birthTime: zod_1.z.string().regex(/^\d{2}:\d{2}$/, { message: 'Formato de hora inválido. Use HH:MM.' }),
    birthPlace: zod_1.z.string().min(3, { message: 'O local de nascimento é obrigatório.' }),
});
async function calculationRoutes(app) {
    // CORREÇÃO: A rota agora é apenas '/personal'.
    // O servidor irá juntar o prefixo '/calculate' com '/personal'
    // para criar a rota final correta: POST /calculate/personal
    app.post('/personal', async (request, reply) => {
        try {
            const input = birthInputSchema.parse(request.body);
            const report = await (0, engine_1.computeReport)(input);
            return reply.status(200).send(report);
        }
        catch (error) {
            if (error instanceof zod_1.z.ZodError) {
                return reply.status(400).send({ message: 'Dados de entrada inválidos.', issues: error.format() });
            }
            app.log.error(error);
            return reply.status(500).send({ message: 'Erro interno ao calcular o relatório.' });
        }
    });
}
