// src/routes/userRoutes.ts

import type { FastifyInstance } from 'fastify';
import { prisma } from '../prisma';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken'; // NOVO: Importando a biblioteca JWT
import { BadgeSystem } from '../domain/lib/badgeSystem'; // NOVO: Sistema de badges

export async function userRoutes(fastify: FastifyInstance) {

  // Rota: POST /users/register (sem alterações)
  fastify.post('/register', async (request, reply) => {
    const { name, email, password } = request.body as any;

    if (!name || !email || !password) {
      return reply.status(400).send({ error: 'Todos os campos são obrigatórios.' });
    }

    const userExists = await prisma.user.findUnique({ where: { email } });
    if (userExists) {
      return reply.status(409).send({ error: 'Este e-mail já está em uso.' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await prisma.user.create({
      data: { name, email, password: hashedPassword },
    });

    // 🌟 NOVO: Verificar e conceder badge de Beta Tester
    const betaBadge = await BadgeSystem.checkAndAwardBetaTesterBadge(user.id);
    
    const { password: _, ...userWithoutPassword } = user;
    
    // Se ganhou a badge de beta tester, incluir no retorno
    const response = {
      ...userWithoutPassword,
      newBadge: betaBadge // null se não ganhou, objeto Badge se ganhou
    };
    
    return reply.status(201).send(response);
  });


  // NOVO: Rota de Login - POST /users/login
  fastify.post('/login', async (request, reply) => {
    const { email, password } = request.body as any;

    if (!email || !password) {
      return reply.status(400).send({ error: 'E-mail e senha são obrigatórios.' });
    }

    // 1. Encontrar o usuário no banco de dados pelo e-mail
    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) {
      return reply.status(401).send({ error: 'Credenciais inválidas.' }); // Mensagem genérica por segurança
    }

    // 2. Comparar a senha fornecida com o hash salvo no banco
    const isPasswordCorrect = await bcrypt.compare(password, user.password);
    if (!isPasswordCorrect) {
      return reply.status(401).send({ error: 'Credenciais inválidas.' });
    }

    // 3. Se a senha estiver correta, gerar o token JWT
    const token = jwt.sign(
      { 
        id: user.id,
        name: user.name,
      },
      process.env.JWT_SECRET as string, // Nosso segredo do .env
      {
        expiresIn: '7d', // O token expira em 7 dias
      }
    );
    
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
      const userId = (request.user as any).id;
      const badges = await BadgeSystem.getUserBadges(userId);
      
      // Buscar informações do usuário incluindo status de beta tester
      const user = await prisma.user.findUnique({
        where: { id: userId }
      });
      
      return reply.send({
        badges,
        betaTester: (user as any)?.isBetaTester ? {
          number: (user as any).betaTesterNumber,
          status: `Beta Tester #${(user as any).betaTesterNumber}`
        } : null
      });
    } catch (error) {
      return reply.status(500).send({ error: 'Erro ao buscar badges.' });
    }
  });
}