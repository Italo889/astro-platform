// src/plugins/authPlugin.ts

import type { FastifyRequest, FastifyReply, HookHandlerDoneFunction } from 'fastify';
import fp from 'fastify-plugin';
import jwt from 'jsonwebtoken';

// Tipagem para o payload que guardamos dentro do token JWT
interface UserPayload {
  id: string;
  name: string;
}

// ESTA É A MÁGICA: Aprimoramos as interfaces do Fastify para que o TypeScript
// conheça nosso decorator 'authenticate' e o 'request.user'.
declare module 'fastify' {
  interface FastifyInstance {
    authenticate: (
      request: FastifyRequest,
      reply: FastifyReply
    ) => Promise<void>;
  }
  interface FastifyRequest {
    user: UserPayload;
  }
}

async function authenticate(request: FastifyRequest, reply: FastifyReply) {
  try {
    const token = request.headers.authorization?.replace('Bearer ', '');
    if (!token) {
      throw new Error('Token não fornecido');
    }
    const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as UserPayload;
    request.user = decoded; // Anexamos o payload completo do usuário
  } catch (err) {
    reply.status(401).send({ error: 'Autenticação falhou. Token inválido ou expirado.' });
  }
}

export default fp(async (fastify) => {
  fastify.decorate('authenticate', authenticate);
});