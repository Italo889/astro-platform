import Fastify from "fastify";
import cors from "@fastify/cors";
import helmet from "@fastify/helmet";
import staticFiles from "@fastify/static";
import dotenv from "dotenv";
import path from "path";
import fs from "fs";

// Configurar dotenv apenas em desenvolvimento
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

const server = Fastify({ 
  logger: true // Configuração simples do logger
});

// --- Configuração de CORS - RESTRITA E SEGURA ---
const allowedOrigins = process.env.NODE_ENV === 'production'
  ? [
      'https://arcano-1f10c3cc540d.herokuapp.com', // Frontend em produção
      'https://arcano.herokuapp.com' // Possível domínio alternativo
    ]
  : [
      'http://localhost:5173', // Vite dev server
      'http://localhost:4321', // Astro dev server  
      'http://localhost:3000', // Outra porta comum
      'http://127.0.0.1:5173',
      'http://127.0.0.1:4321',
      'http://127.0.0.1:3000'
    ];

server.register(cors, {
  origin: allowedOrigins,
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS", "PATCH"],
  allowedHeaders: ["Content-Type", "Authorization", "Accept", "Origin", "X-Requested-With"],
  optionsSuccessStatus: 200 // Para browsers legados
});

// --- HELMET CONFIGURADO COM SEGURANÇA ---
server.register(helmet, {
  contentSecurityPolicy: {
    directives: {
      defaultSrc: ["'self'"],
      connectSrc: [
        "'self'",
        "https://arcano-1f10c3cc540d.herokuapp.com",
        "https://fonts.googleapis.com",
        "https://fonts.gstatic.com"
      ],
      scriptSrc: ["'self'", "'unsafe-inline'"], // Necessário para Vite
      styleSrc: ["'self'", "'unsafe-inline'", "https://fonts.googleapis.com"],
      fontSrc: ["'self'", "https://fonts.gstatic.com"],
      imgSrc: ["'self'", "data:", "https:"],
      objectSrc: ["'none'"],
      frameAncestors: ["'none'"],
      baseUri: ["'self'"]
    }
  },
  hsts: {
    maxAge: 31536000, // 1 ano
    includeSubDomains: true,
    preload: true
  },
  xssFilter: true, // Proteção XSS habilitada
  noSniff: true,
  frameguard: { action: 'deny' },
  referrerPolicy: { policy: 'same-origin' }
});

// --- Plugin de Autenticação ---
server.register(authPlugin);

// --- Servir Arquivos Estáticos do Frontend ---
const frontendDistPath = path.join(__dirname, '../../dist');

// Verificar se o diretório dist existe antes de servir arquivos estáticos
if (fs.existsSync(frontendDistPath)) {
  server.register(staticFiles, {
    root: frontendDistPath,
    prefix: '/',
    decorateReply: false // Importante para evitar conflitos com outras rotas
  });
  
  server.log.info(`Servindo arquivos estáticos de: ${frontendDistPath}`);
} else {
  server.log.warn(`Diretório de frontend não encontrado: ${frontendDistPath}`);
}

// --- Rotas da API ---
server.get("/api", async () => {
  return { message: "Arcano API está no ar 🔮", timestamp: new Date().toISOString() };
});

server.register(userRoutes, { prefix: '/api/users' });
server.register(reportRoutes, { prefix: '/api/reports' });
server.register(calculationRoutes, { prefix: '/api/calculate' });
server.register(synastryRoutes, { prefix: '/api/calculate/synastry' });
server.register(newsletterRoutes, { prefix: '/api/newsletter' });

// --- Rota de Fallback para SPA (Single Page Application) ---
// Esta deve ser a última rota registrada
server.setNotFoundHandler((request, reply) => {
  // Se a rota não encontrada começar com /api, retorne um erro 404 de API
  if (request.url && request.url.startsWith('/api')) {
    return reply.status(404).send({
      success: false,
      message: `Rota ${request.method}:${request.url} não encontrada.`
    });
  }
  
  // Para qualquer outra rota não encontrada, sirva o index.html do frontend
  // Verifica se o arquivo index.html existe antes de tentar enviá-lo
  const indexPath = path.join(frontendDistPath, 'index.html');
  if (fs.existsSync(indexPath)) {
    return reply.sendFile('index.html', frontendDistPath);
  } else {
    return reply.status(404).send({
      success: false,
      message: 'Arquivo index.html não encontrado.'
    });
  }
});

// --- Inicialização do Servidor ---
const start = async () => {
  try {
    const port = Number(process.env.PORT) || 3333;
    await server.listen({ port, host: "0.0.0.0" });
    server.log.info(`Servidor rodando na porta ${port}`);
  } catch (err) {
    server.log.error(err);
    await prisma.$disconnect();
    process.exit(1);
  }
};

start();