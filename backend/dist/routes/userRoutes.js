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
const badgeSystem_1 = require("../domain/lib/badgeSystem"); // NOVO: Sistema de badges
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
        // 🌟 NOVO: Sistema de Badges
        const betaBadge = await badgeSystem_1.BadgeSystem.checkAndAwardBetaTesterBadge(user.id);
        // 🎯 NOVO: Verificar e conceder badge de Early Adopter (primeiros 100 usuários)
        let earlyAdopterBadge = null;
        try {
            const totalUsers = await prisma_1.prisma.user.count();
            if (totalUsers <= 100) {
                earlyAdopterBadge = await badgeSystem_1.BadgeSystem.awardBadge(user.id, 'EARLY_ADOPTER');
            }
        }
        catch (error) {
            fastify.log.error({ error }, 'Erro ao verificar badge Early Adopter');
        }
        const { password: _, ...userWithoutPassword } = user;
        // Incluir badges conquistadas no retorno
        const newBadges = [betaBadge, earlyAdopterBadge].filter(Boolean);
        const response = {
            ...userWithoutPassword,
            newBadges // array com as badges conquistadas
        };
        return reply.status(201).send(response);
    });
    // TEMPORÁRIO: Corrigir numeração de beta testers
    fastify.post('/debug/fix-beta-numbers', async (request, reply) => {
        try {
            // Busca todos os usuários ordenados por data de criação
            const users = await prisma_1.prisma.user.findMany({
                orderBy: { createdAt: 'asc' },
                where: {
                    isBetaTester: true
                }
            });
            const updates = [];
            // Corrige a numeração baseada na ordem real de criação
            for (let i = 0; i < users.length && i < 20; i++) {
                const correctPosition = i + 1; // Posição correta (1, 2, 3, ...)
                if (users[i].betaTesterNumber !== correctPosition) {
                    await prisma_1.prisma.user.update({
                        where: { id: users[i].id },
                        data: { betaTesterNumber: correctPosition }
                    });
                    updates.push({
                        user: users[i].name,
                        email: users[i].email,
                        oldNumber: users[i].betaTesterNumber,
                        newNumber: correctPosition
                    });
                }
            }
            return reply.send({
                message: 'Numeração corrigida!',
                updates
            });
        }
        catch (error) {
            console.error('Erro ao corrigir numeração:', error);
            return reply.status(500).send({ error: 'Erro interno do servidor' });
        }
    });
    // TEMPORÁRIO: Debug de usuários
    fastify.get('/debug/users', async (request, reply) => {
        const users = await prisma_1.prisma.user.findMany({
            orderBy: { createdAt: 'asc' },
            select: {
                id: true,
                name: true,
                email: true,
                createdAt: true,
                betaTesterNumber: true,
                isBetaTester: true
            }
        });
        return reply.send({
            total: users.length,
            users: users.map((user, index) => ({
                position: index + 1,
                name: user.name,
                email: user.email,
                isBetaTester: user.isBetaTester,
                betaTesterNumber: user.betaTesterNumber,
                createdAt: user.createdAt
            }))
        });
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
            email: user.email,
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
    // 🏆 NOVO: Rota para buscar badges do usuário autenticado
    fastify.get('/badges', {
        preHandler: [fastify.authenticate]
    }, async (request, reply) => {
        try {
            const userId = request.user.id;
            const badges = await badgeSystem_1.BadgeSystem.getUserBadges(userId);
            // Buscar informações do usuário incluindo status de beta tester
            const user = await prisma_1.prisma.user.findUnique({
                where: { id: userId }
            });
            return reply.send({
                badges,
                betaTester: user?.isBetaTester ? {
                    number: user.betaTesterNumber,
                    status: `Beta Tester #${user.betaTesterNumber}`
                } : null
            });
        }
        catch (error) {
            return reply.status(500).send({ error: 'Erro ao buscar badges.' });
        }
    });
    // 🔄 NOVA ROTA: Verificar e conceder badges retroativas
    fastify.post('/badges/check-retroactive', {
        preHandler: [fastify.authenticate]
    }, async (request, reply) => {
        try {
            const userId = request.user.id;
            const newBadges = await badgeSystem_1.BadgeSystem.checkRetroactiveBadges(userId);
            // Buscar badges atuais do usuário para verificar se já tem todas
            const currentBadges = await badgeSystem_1.BadgeSystem.getUserBadges(userId);
            const totalAvailableBadges = Object.keys(badgeSystem_1.BadgeSystem.getAvailableBadges()).length;
            const hasAllBadges = currentBadges.length === totalAvailableBadges;
            return reply.send({
                message: newBadges.length > 0
                    ? 'Novas conquistas descobertas!'
                    : hasAllBadges
                        ? 'Parabéns! Você já obteve todas as conquistas disponíveis.'
                        : 'Nenhuma nova conquista encontrada no momento.',
                newBadges,
                count: newBadges.length,
                hasAllBadges,
                currentBadgesCount: currentBadges.length,
                totalAvailable: totalAvailableBadges
            });
        }
        catch (error) {
            fastify.log.error(error);
            return reply.status(500).send({ error: 'Erro ao verificar badges retroativas.' });
        }
    });
    // 🛡️ ROTAS LGPD - Privacidade e Gerenciamento de Dados
    // Rota: GET /users/profile - Buscar dados do perfil do usuário
    fastify.get('/profile', {
        preHandler: [fastify.authenticate]
    }, async (request, reply) => {
        try {
            const userId = request.user.id;
            const user = await prisma_1.prisma.user.findUnique({
                where: { id: userId },
                select: {
                    id: true,
                    name: true,
                    email: true,
                    createdAt: true,
                    isBetaTester: true,
                    betaTesterNumber: true,
                    badges: true
                }
            });
            if (!user) {
                return reply.status(404).send({ error: 'Usuário não encontrado.' });
            }
            return reply.send(user);
        }
        catch (error) {
            fastify.log.error(error);
            return reply.status(500).send({ error: 'Erro ao buscar dados do perfil.' });
        }
    });
    // Rota: PUT /users/profile - Atualizar dados do perfil
    fastify.put('/profile', {
        preHandler: [fastify.authenticate]
    }, async (request, reply) => {
        try {
            const userId = request.user.id;
            const { name, email } = request.body;
            // Validações básicas
            if (name && name.length < 2) {
                return reply.status(400).send({ error: 'Nome deve ter pelo menos 2 caracteres.' });
            }
            if (email) {
                const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                if (!emailRegex.test(email)) {
                    return reply.status(400).send({ error: 'Email inválido.' });
                }
                // Verificar se o email já está em uso por outro usuário
                const existingUser = await prisma_1.prisma.user.findUnique({
                    where: { email }
                });
                if (existingUser && existingUser.id !== userId) {
                    return reply.status(409).send({ error: 'Este email já está em uso por outro usuário.' });
                }
            }
            const updatedUser = await prisma_1.prisma.user.update({
                where: { id: userId },
                data: {
                    ...(name && { name }),
                    ...(email && { email })
                },
                select: {
                    id: true,
                    name: true,
                    email: true,
                    createdAt: true,
                    isBetaTester: true,
                    betaTesterNumber: true
                }
            });
            return reply.send({
                message: 'Perfil atualizado com sucesso!',
                user: updatedUser
            });
        }
        catch (error) {
            fastify.log.error(error);
            return reply.status(500).send({ error: 'Erro ao atualizar perfil.' });
        }
    });
    // Rota: POST /users/change-password - Alterar senha
    fastify.post('/change-password', {
        preHandler: [fastify.authenticate]
    }, async (request, reply) => {
        try {
            const userId = request.user.id;
            const { currentPassword, newPassword } = request.body;
            if (!currentPassword || !newPassword) {
                return reply.status(400).send({
                    error: 'Senha atual e nova senha são obrigatórias.'
                });
            }
            if (newPassword.length < 6) {
                return reply.status(400).send({
                    error: 'Nova senha deve ter pelo menos 6 caracteres.'
                });
            }
            // Buscar usuário e verificar senha atual
            const user = await prisma_1.prisma.user.findUnique({
                where: { id: userId }
            });
            if (!user) {
                return reply.status(404).send({ error: 'Usuário não encontrado.' });
            }
            const isCurrentPasswordCorrect = await bcryptjs_1.default.compare(currentPassword, user.password);
            if (!isCurrentPasswordCorrect) {
                return reply.status(400).send({ error: 'Senha atual incorreta.' });
            }
            // Gerar hash da nova senha
            const hashedNewPassword = await bcryptjs_1.default.hash(newPassword, 10);
            // Atualizar senha no banco
            await prisma_1.prisma.user.update({
                where: { id: userId },
                data: { password: hashedNewPassword }
            });
            return reply.send({ message: 'Senha alterada com sucesso!' });
        }
        catch (error) {
            fastify.log.error(error);
            return reply.status(500).send({ error: 'Erro ao alterar senha.' });
        }
    });
    // Rota: GET /users/data-export - Exportar todos os dados do usuário (LGPD)
    fastify.get('/data-export', {
        preHandler: [fastify.authenticate]
    }, async (request, reply) => {
        try {
            const userId = request.user.id;
            // Buscar todos os dados do usuário
            const userData = await prisma_1.prisma.user.findUnique({
                where: { id: userId },
                select: {
                    id: true,
                    name: true,
                    email: true,
                    createdAt: true,
                    updatedAt: true,
                    isBetaTester: true,
                    betaTesterNumber: true,
                    badges: true
                }
            });
            const userReports = await prisma_1.prisma.report.findMany({
                where: { ownerId: userId },
                select: {
                    id: true,
                    createdAt: true,
                    content: true
                }
            });
            if (!userData) {
                return reply.status(404).send({ error: 'Usuário não encontrado.' });
            }
            const exportData = {
                exportedAt: new Date().toISOString(),
                userData,
                reports: userReports,
                summary: {
                    totalReports: userReports.length,
                    accountCreated: userData.createdAt,
                    dataTypes: ['profile', 'reports', 'badges']
                }
            };
            // Definir headers para download
            reply.header('Content-Type', 'application/json');
            reply.header('Content-Disposition', `attachment; filename="arcano-data-export-${userId}.json"`);
            return reply.send(exportData);
        }
        catch (error) {
            fastify.log.error(error);
            return reply.status(500).send({ error: 'Erro ao exportar dados.' });
        }
    });
    // Rota: DELETE /users/account - Excluir conta (LGPD)
    fastify.delete('/account', {
        preHandler: [fastify.authenticate]
    }, async (request, reply) => {
        try {
            const userId = request.user.id;
            const { confirmPassword } = request.body;
            if (!confirmPassword) {
                return reply.status(400).send({
                    error: 'Senha de confirmação é obrigatória para excluir a conta.'
                });
            }
            // Verificar senha antes de excluir
            const user = await prisma_1.prisma.user.findUnique({
                where: { id: userId }
            });
            if (!user) {
                return reply.status(404).send({ error: 'Usuário não encontrado.' });
            }
            const isPasswordCorrect = await bcryptjs_1.default.compare(confirmPassword, user.password);
            if (!isPasswordCorrect) {
                return reply.status(400).send({ error: 'Senha incorreta.' });
            }
            // Excluir todos os dados relacionados ao usuário
            // O Prisma irá cuidar da cascade deletion se configurado
            await prisma_1.prisma.$transaction([
                // Excluir relatórios primeiro
                prisma_1.prisma.report.deleteMany({
                    where: { ownerId: userId }
                }),
                // Excluir usuário
                prisma_1.prisma.user.delete({
                    where: { id: userId }
                })
            ]);
            return reply.send({
                message: 'Conta excluída com sucesso. Todos os seus dados foram removidos permanentemente.'
            });
        }
        catch (error) {
            fastify.log.error(error);
            return reply.status(500).send({ error: 'Erro ao excluir conta.' });
        }
    });
}
