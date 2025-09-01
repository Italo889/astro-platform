"use strict";
// src/plugins/authPlugin.ts
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fastify_plugin_1 = __importDefault(require("fastify-plugin"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
async function authenticate(request, reply) {
    try {
        const token = request.headers.authorization?.replace('Bearer ', '');
        if (!token) {
            throw new Error('Token não fornecido');
        }
        const decoded = jsonwebtoken_1.default.verify(token, process.env.JWT_SECRET);
        request.user = decoded; // Anexamos o payload completo do usuário
    }
    catch (err) {
        reply.status(401).send({ error: 'Autenticação falhou. Token inválido ou expirado.' });
    }
}
exports.default = (0, fastify_plugin_1.default)(async (fastify) => {
    fastify.decorate('authenticate', authenticate);
});
