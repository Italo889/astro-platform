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
server.register(helmet, {
  contentSecurityPolicy: {
    directives: {
      defaultSrc: ["'self'"],
      connectSrc: ["'self'", "https://*.herokuapp.com"],
      scriptSrc: ["'self'", "'unsafe-inline'"],
      styleSrc: ["'self'", "'unsafe-inline'"],
      imgSrc: ["'self'", "data:", "https:"],
    },
  },
});
server.register(authPlugin);

// Servir arquivos estáticos do frontend
server.register(staticFiles, {
  root: path.join(__dirname, '../dist'),
  prefix: '/', 
});

// --- Rotas ---
// Rota de health check da API
server.get("/api", async () => {
  return { message: "Arcano API está no ar 🔮" };
});

server.register(userRoutes, { prefix: '/api/users' });
server.register(reportRoutes, { prefix: '/api/reports' });
server.register(calculationRoutes, { prefix: '/api/calculate' });
server.register(synastryRoutes, { prefix: '/api/calculate/synastry' });
server.register(newsletterRoutes, { prefix: '/api/newsletter' });



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