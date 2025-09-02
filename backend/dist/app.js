"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fastify_1 = __importDefault(require("fastify"));
const cors_1 = __importDefault(require("@fastify/cors"));
const helmet_1 = __importDefault(require("@fastify/helmet"));
const static_1 = __importDefault(require("@fastify/static"));
const swagger_1 = __importDefault(require("@fastify/swagger"));
const swagger_ui_1 = __importDefault(require("@fastify/swagger-ui"));
const dotenv_1 = __importDefault(require("dotenv"));
const path_1 = __importDefault(require("path"));
const fs_1 = __importDefault(require("fs"));
// Configurar dotenv apenas em desenvolvimento
if (process.env.NODE_ENV !== 'production') {
    dotenv_1.default.config();
}
const prisma_1 = require("./prisma");
const authPlugin_1 = __importDefault(require("./plugins/authPlugin"));
const userRoutes_1 = require("./routes/userRoutes");
const reportRoutes_1 = require("./routes/reportRoutes");
const calculationRoutes_1 = require("./routes/calculationRoutes");
const synastryRoutes_1 = require("./routes/synastryRoutes");
const newsletterRoutes_1 = require("./routes/newsletterRoutes");
const adminRoutes_1 = require("./routes/adminRoutes");
const changelogRoutes_1 = require("./routes/changelogRoutes");
const apiSchemas_1 = require("./schemas/apiSchemas");
const server = (0, fastify_1.default)({
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
server.register(cors_1.default, {
    origin: allowedOrigins,
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS", "PATCH"],
    allowedHeaders: ["Content-Type", "Authorization", "Accept", "Origin", "X-Requested-With"],
    optionsSuccessStatus: 200 // Para browsers legados
});
// --- HELMET CONFIGURADO COM SEGURANÇA ---
server.register(helmet_1.default, {
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
    server.register(swagger_1.default, {
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
            definitions: apiSchemas_1.allSchemas,
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
    server.register(swagger_ui_1.default, {
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
server.register(authPlugin_1.default);
// --- Servir Arquivos Estáticos do Frontend ---
const frontendDistPath = path_1.default.join(__dirname, '../../dist');
// Verificar se o diretório dist existe antes de servir arquivos estáticos
if (fs_1.default.existsSync(frontendDistPath)) {
    server.register(static_1.default, {
        root: frontendDistPath,
        prefix: '/',
        decorateReply: false // Importante para evitar conflitos com outras rotas
    });
    server.log.info(`Servindo arquivos estáticos de: ${frontendDistPath}`);
}
else {
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
server.register(userRoutes_1.userRoutes, { prefix: '/api/users' });
server.register(reportRoutes_1.reportRoutes, { prefix: '/api/reports' });
server.register(calculationRoutes_1.calculationRoutes, { prefix: '/api/calculate' });
server.register(synastryRoutes_1.synastryRoutes, { prefix: '/api/calculate/synastry' });
server.register(newsletterRoutes_1.newsletterRoutes, { prefix: '/api/newsletter' });
server.register(adminRoutes_1.adminRoutes, { prefix: '/api/admin' });
server.register(changelogRoutes_1.changelogRoutes, { prefix: '/api/changelog' });
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
    const indexPath = path_1.default.join(frontendDistPath, 'index.html');
    if (fs_1.default.existsSync(indexPath)) {
        const indexContent = fs_1.default.readFileSync(indexPath, 'utf8');
        return reply.type('text/html').send(indexContent);
    }
    else {
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
    }
    catch (err) {
        server.log.error(err);
        await prisma_1.prisma.$disconnect();
        process.exit(1);
    }
};
start();
