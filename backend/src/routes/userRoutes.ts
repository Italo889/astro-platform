// src/routes/userRoutes.ts

import type { FastifyInstance } from 'fastify';
import { prisma } from '../prisma';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken'; // NOVO: Importando a biblioteca JWT

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

    const { password: _, ...userWithoutPassword } = user;
    return reply.status(201).send(userWithoutPassword);
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
}