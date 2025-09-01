import Fastify from "fastify";
import cors from "@fastify/cors";
import helmet from "@fastify/helmet";
import staticFiles from "@fastify/static";
import dotenv from "dotenv";
import path from "path";

if (process.env.NODE_ENV !== 'production') {
  dotenv.config();
}

import { prisma } from "./prisma";
import authPlugin from "./plugins/authPlugin";
import { userRoutes } from "./routes/userRoutes";
import { reportRoutes } from "./routes/reportRoutes";
import { calculationRoutes } from "./routes/calculationRoutes";
import { synastryRoutes } from "./routes/synastryRoutes";
import { newsletterRoutes } from './routes/newsletterRoutes';

const server = Fastify({ logger: true });

// --- Plugins (Middleware) ---
const allowedOrigins = process.env.NODE_ENV === 'production'
  ? [
      "https://arcano-1f10c3cc540d.herokuapp.com",
      "https://arcano-1a7a1b6d1bec.herokuapp.com"
    ]
  : [
      'http://localhost:5173',
      'http://localhost:4321',
      'http://localhost:3000',
      'http://127.0.0.1:5173',
      'http://127.0.0.1:4321',
      'http://127.0.0.1:3000'
    ];

server.register(cors, {
  origin: (origin, cb) => {
    if (!origin || allowedOrigins.includes(origin)) {
      cb(null, true);
    } else {
      cb(new Error(`CORS not allowed: ${origin}`), false);
    }
  },
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS", "PATCH"],
  allowedHeaders: ['Content-Type', 'Authorization', 'Accept', 'Origin', 'X-Requested-With']
});

server.register(helmet, {
  contentSecurityPolicy: {
    directives: {
      defaultSrc: ["'self'"],
      connectSrc: [
        "'self'",
        "https://arcano-1f10c3cc540d.herokuapp.com",
        "https://arcano-1a7a1b6d1bec.herokuapp.com"
      ],
      scriptSrc: ["'self'", "'unsafe-inline'"],
      styleSrc: ["'self'", "'unsafe-inline'", "https://fonts.googleapis.com"],
      fontSrc: ["'self'", "https://fonts.gstatic.com"],
      imgSrc: ["'self'", "data:", "https:"],
      objectSrc: ["'none'"],
      frameAncestors: ["'none'"],
      baseUri: ["'self'"],
      frameSrc: ["'self'"],
    },
  },
});

server.register(authPlugin);

// --- Servir Arquivos Estáticos do Frontend ---
// <-- CORREÇÃO 1: O caminho para a pasta 'dist' do frontend foi corrigido.
server.register(staticFiles, {
  root: path.join(__dirname, '../../dist'),
  prefix: '/',
});

// --- Rotas da API ---
server.get("/api", async () => {
  return { message: "Arcano API está no ar 🔮" };
});

server.register(userRoutes, { prefix: '/api/users' });
server.register(reportRoutes, { prefix: '/api/reports' });
server.register(calculationRoutes, { prefix: '/api/calculate' });
server.register(synastryRoutes, { prefix: '/api/calculate/synastry' });
server.register(newsletterRoutes, { prefix: '/api/newsletter' });

// <-- CORREÇÃO 2: Rota de Fallback para a Single Page Application (SPA).
// Isso garante que o React Router funcione corretamente no Heroku.
// Deve ser o último manipulador de rota a ser registrado.
server.setNotFoundHandler((request, reply) => {
  // Se a rota não encontrada começar com /api, retorne um erro 404 de API.
  if (request.raw.url && request.raw.url.startsWith('/api')) {
    return reply.status(404).send({
      success: false,
      message: `Rota ${request.method}:${request.url} não encontrada.`
    });
  }
  // Para qualquer outra rota não encontrada, sirva o index.html do frontend.
  reply.sendFile('index.html', path.join(__dirname, '../../dist'));
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