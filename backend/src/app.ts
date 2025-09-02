import Fastify from "fastify";
import cors from "@fastify/cors";
import helmet from "@fastify/helmet";
import staticFiles from "@fastify/static";
import swagger from "@fastify/swagger";
import swaggerUI from "@fastify/swagger-ui";
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
import { adminRoutes } from './routes/adminRoutes';
import { changelogRoutes } from './routes/changelogRoutes';
import { allSchemas } from './schemas/apiSchemas';

const server = Fastify({ 
  logger: true // Configuração simples do logger
});

// --- Configuração de CORS - RESTRITA E SEGURA ---
const allowedOrigins = process.env.NODE_ENV === 'production'
  ? [
      'https://arcano-1f10c3cc540d.herokuapp.com', // Frontend em produção
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

// --- Configuração do Swagger ---
if (process.env.NODE_ENV !== 'production') {
  // Swagger apenas em desenvolvimento
  server.register(swagger, {
    swagger: {
      info: {
        title: 'Arcano Platform API',
        description: 'API completa para cálculos astrológicos, numerologia e tarô',
        version: '2.1.0',
        contact: {
          name: 'Italo Evangelista',
          email: 'italo889@gmail.com'
        }
      },
      host: process.env.NODE_ENV === 'production' 
        ? 'arcano-1f10c3cc540d.herokuapp.com' 
        : 'localhost:3333',
      basePath: '/api',
      schemes: process.env.NODE_ENV === 'production' ? ['https'] : ['http'],
      consumes: ['application/json'],
      produces: ['application/json'],
      definitions: allSchemas,
      securityDefinitions: {
        Bearer: {
          type: 'apiKey',
          name: 'Authorization',
          in: 'header',
          description: 'JWT token. Formato: Bearer <token>'
        }
      },
      tags: [
        { name: 'Auth', description: 'Autenticação de usuários' },
        { name: 'Users', description: 'Gerenciamento de usuários' },
        { name: 'Calculations', description: 'Cálculos astrológicos' },
        { name: 'Reports', description: 'Relatórios pessoais' },
        { name: 'Synastry', description: 'Análise de compatibilidade' },
        { name: 'Newsletter', description: 'Sistema de newsletter' },
        { name: 'Changelog', description: 'Changelog da plataforma' },
        { name: 'Admin', description: 'Funcionalidades administrativas' }
      ]
    }
  });

  server.register(swaggerUI, {
    routePrefix: '/api/docs',
    uiConfig: {
      docExpansion: 'list',
      deepLinking: false
    },
    staticCSP: true,
    transformStaticCSP: (header) => header
  });
}

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
  const baseUrl = process.env.NODE_ENV === 'production' 
    ? 'https://arcano-1f10c3cc540d.herokuapp.com' 
    : 'http://localhost:3333';
  const docsUrl = process.env.NODE_ENV !== 'production' ? `${baseUrl}/api/docs` : null;
  
  return { 
    message: "Arcano API está no ar 🔮", 
    timestamp: new Date().toISOString(),
    version: "2.1.0",
    environment: process.env.NODE_ENV || 'development',
    documentation: docsUrl,
    endpoints: {
      auth: "/api/users",
      calculations: "/api/calculate", 
      reports: "/api/reports",
      synastry: "/api/calculate/synastry",
      newsletter: "/api/newsletter",
      changelog: "/api/changelog",
      admin: "/api/admin"
    }
  };
});

// Rota de redirecionamento para documentação
if (process.env.NODE_ENV !== 'production') {
  server.get("/docs", async (request, reply) => {
    return reply.redirect('/api/docs');
  });
}

server.register(userRoutes, { prefix: '/api/users' });
server.register(reportRoutes, { prefix: '/api/reports' });
server.register(calculationRoutes, { prefix: '/api/calculate' });
server.register(synastryRoutes, { prefix: '/api/calculate/synastry' });
server.register(newsletterRoutes, { prefix: '/api/newsletter' });
server.register(adminRoutes, { prefix: '/api/admin' });
server.register(changelogRoutes, { prefix: '/api/changelog' });

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
    const indexContent = fs.readFileSync(indexPath, 'utf8');
    return reply.type('text/html').send(indexContent);
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