// src/app.ts
import Fastify from "fastify";
import cors from "@fastify/cors";
import helmet from "@fastify/helmet";
import staticFiles from "@fastify/static";
import dotenv from "dotenv";
import path from "path";

// Configurar dotenv
dotenv.config();

import { prisma } from "./prisma";
import authPlugin from "./plugins/authPlugin";
import { userRoutes } from "./routes/userRoutes";
import { reportRoutes } from "./routes/reportRoutes"; 
import { calculationRoutes } from "./routes/calculationRoutes";
import { synastryRoutes } from "./routes/synastryRoutes";
import { newsletterRoutes } from './routes/newsletterRoutes'; 


dotenv.config();

const server = Fastify({ logger: true });

// --- Plugins (Middleware) ---
server.register(cors);
server.register(helmet);
server.register(authPlugin);

// Servir arquivos estáticos do frontend
server.register(staticFiles, {
  root: path.join(__dirname, '../'),
  prefix: '/', // opcional: default '/'
});

// --- Rotas ---
server.get("/", async () => {
  return { message: "Arcano API está no ar 🔮" };
});

server.register(userRoutes, { prefix: '/users' });
server.register(reportRoutes, { prefix: '/reports' });
server.register(calculationRoutes, { prefix: '/calculate' });
server.register(synastryRoutes, { prefix: '/calculate/synastry' });
server.register(newsletterRoutes, { prefix: '/newsletter' });

// Rota catch-all para SPA - serve index.html para todas as rotas não-API
server.get('/*', async (request, reply) => {
  // Se a rota começar com /api, /users, /reports, /calculate, /newsletter, não servir o index.html
  if (request.url.startsWith('/api') || 
      request.url.startsWith('/users') || 
      request.url.startsWith('/reports') || 
      request.url.startsWith('/calculate') || 
      request.url.startsWith('/newsletter')) {
    reply.code(404).send({ error: 'Route not found' });
    return;
  }
  
  // Servir index.html para rotas do frontend
  reply.sendFile('index.html');
});



// --- Inicialização do Servidor ---
const start = async () => {
  try {
    const port = Number(process.env.PORT) || 3333;
    await server.listen({ port, host: "0.0.0.0" });
  } catch (err) {
    server.log.error(err);
    await prisma.$disconnect();
    process.exit(1);
  }
};

start();