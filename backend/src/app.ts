// src/app.ts
import Fastify from "fastify";
import cors from "@fastify/cors";
import helmet from "@fastify/helmet";
import dotenv from "dotenv";

import { prisma } from "./prisma";
import authPlugin from "./plugins/authPlugin"; // NOVO
import { userRoutes } from "./routes/userRoutes";
import { reportRoutes } from "./routes/reportRoutes"; // NOVO
import { calculationRoutes } from "./routes/calculationRoutes"; // NOVO
import { synastryRoutes } from "./routes/synastryRoutes";
import { newsletterRoutes } from './routes/newsletterRoutes'; // NOVO

dotenv.config();

const server = Fastify({ logger: true });

// --- Plugins (Middleware) ---
server.register(cors);
server.register(helmet);
server.register(authPlugin); // NOVO: Registrando nosso guardião

// --- Rotas ---
server.get("/", async () => {
  return { message: "Arcano API está no ar 🔮" };
});

server.register(userRoutes, { prefix: '/users' });
server.register(reportRoutes, { prefix: '/reports' }); // NOVO: Registrando as rotas de relatório
server.register(calculationRoutes, { prefix: '/calculate' });
server.register(synastryRoutes, { prefix: '/calculate/synastry' });
server.register(newsletterRoutes, { prefix: '/newsletter' }); // NOVO

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