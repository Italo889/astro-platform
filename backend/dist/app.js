"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// src/app.ts
const fastify_1 = __importDefault(require("fastify"));
const cors_1 = __importDefault(require("@fastify/cors"));
const helmet_1 = __importDefault(require("@fastify/helmet"));
const static_1 = __importDefault(require("@fastify/static"));
const dotenv_1 = __importDefault(require("dotenv"));
const path_1 = __importDefault(require("path"));
// Configurar dotenv
dotenv_1.default.config();
const prisma_1 = require("./prisma");
const authPlugin_1 = __importDefault(require("./plugins/authPlugin"));
const userRoutes_1 = require("./routes/userRoutes");
const reportRoutes_1 = require("./routes/reportRoutes");
const calculationRoutes_1 = require("./routes/calculationRoutes");
const synastryRoutes_1 = require("./routes/synastryRoutes");
const newsletterRoutes_1 = require("./routes/newsletterRoutes");
dotenv_1.default.config();
const server = (0, fastify_1.default)({ logger: true });
// --- Plugins (Middleware) ---
server.register(cors_1.default);
server.register(helmet_1.default, {
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
server.register(authPlugin_1.default);
// Servir arquivos estáticos do frontend
server.register(static_1.default, {
    root: path_1.default.join(__dirname, '../dist'),
    prefix: '/',
});
// --- Rotas ---
// Rota de health check da API
server.get("/api", async () => {
    return { message: "Arcano API está no ar 🔮" };
});
server.register(userRoutes_1.userRoutes, { prefix: '/api/users' });
server.register(reportRoutes_1.reportRoutes, { prefix: '/api/reports' });
server.register(calculationRoutes_1.calculationRoutes, { prefix: '/api/calculate' });
server.register(synastryRoutes_1.synastryRoutes, { prefix: '/api/calculate/synastry' });
server.register(newsletterRoutes_1.newsletterRoutes, { prefix: '/api/newsletter' });
// --- Inicialização do Servidor ---
const start = async () => {
    try {
        const port = Number(process.env.PORT) || 3333;
        await server.listen({ port, host: "0.0.0.0" });
    }
    catch (err) {
        server.log.error(err);
        await prisma_1.prisma.$disconnect();
        process.exit(1);
    }
};
start();
