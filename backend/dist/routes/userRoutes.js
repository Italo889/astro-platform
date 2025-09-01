"use strict";
// src/routes/userRoutes.ts
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userRoutes = userRoutes;
const prisma_1 = require("../prisma");
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken")); // NOVO: Importando a biblioteca JWT
async function userRoutes(fastify) {
    // Rota: POST /users/register (sem alterações)
    fastify.post('/register', async (request, reply) => {
        const { name, email, password } = request.body;
        if (!name || !email || !password) {
            return reply.status(400).send({ error: 'Todos os campos são obrigatórios.' });
        }
        const userExists = await prisma_1.prisma.user.findUnique({ where: { email } });
        if (userExists) {
            return reply.status(409).send({ error: 'Este e-mail já está em uso.' });
        }
        const hashedPassword = await bcryptjs_1.default.hash(password, 10);
        const user = await prisma_1.prisma.user.create({
            data: { name, email, password: hashedPassword },
        });
        const { password: _, ...userWithoutPassword } = user;
        return reply.status(201).send(userWithoutPassword);
    });
    // NOVO: Rota de Login - POST /users/login
    fastify.post('/login', async (request, reply) => {
        const { email, password } = request.body;
        if (!email || !password) {
            return reply.status(400).send({ error: 'E-mail e senha são obrigatórios.' });
        }
        // 1. Encontrar o usuário no banco de dados pelo e-mail
        const user = await prisma_1.prisma.user.findUnique({ where: { email } });
        if (!user) {
            return reply.status(401).send({ error: 'Credenciais inválidas.' }); // Mensagem genérica por segurança
        }
        // 2. Comparar a senha fornecida com o hash salvo no banco
        const isPasswordCorrect = await bcryptjs_1.default.compare(password, user.password);
        if (!isPasswordCorrect) {
            return reply.status(401).send({ error: 'Credenciais inválidas.' });
        }
        // 3. Se a senha estiver correta, gerar o token JWT
        const token = jsonwebtoken_1.default.sign({
            id: user.id,
            name: user.name,
        }, process.env.JWT_SECRET, // Nosso segredo do .env
        {
            expiresIn: '7d', // O token expira em 7 dias
        });
        // 4. Retornar o token para o front-end
        return reply.send({
            message: 'Login bem-sucedido!',
            token,
        });
    });
}
