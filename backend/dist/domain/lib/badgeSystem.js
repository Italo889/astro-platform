"use strict";
// src/domain/lib/badgeSystem.ts
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.BadgeSystem = exports.AVAILABLE_BADGES = void 0;
exports.AVAILABLE_BADGES = {
    BETA_TESTER: {
        id: 'BETA_TESTER',
        name: 'Beta Tester',
        description: 'Entre os primeiros 20 exploradores a descobrir os mistérios desta dimensão digital',
        icon: '⭐',
        color: '#FFD700',
        rarity: 'legendary'
    },
    EARLY_ADOPTER: {
        id: 'EARLY_ADOPTER',
        name: 'Pioneiro Cósmico',
        description: 'Entre os primeiros 100 iniciados a embarcar nesta jornada de autoconhecimento',
        icon: '🌟',
        color: '#8b63e9',
        rarity: 'epic'
    },
    FIRST_REPORT: {
        id: 'FIRST_REPORT',
        name: 'Despertar Estelar',
        description: 'Realizou sua primeira consulta ao Oráculo, iniciando a jornada de descoberta interior',
        icon: '🔮',
        color: '#4F46E5',
        rarity: 'common'
    },
    SYNASTRY_MASTER: {
        id: 'SYNASTRY_MASTER',
        name: 'Tecelão de Destinos',
        description: 'Mestre na arte de decifrar as conexões cósmicas entre almas - 5 sinastrías realizadas',
        icon: '💫',
        color: '#EC4899',
        rarity: 'rare'
    }
};
class BadgeSystem {
    static async checkAndAwardBetaTesterBadge(userId) {
        const { prisma } = await Promise.resolve().then(() => __importStar(require('../../prisma')));
        try {
            // Busca o usuário atual
            const currentUser = await prisma.user.findUnique({
                where: { id: userId }
            });
            if (!currentUser)
                return null;
            // Se o usuário já tem a badge, retorna ela
            const currentBadges = currentUser.badges || {};
            if (currentBadges.BETA_TESTER) {
                console.log('🎯 User already has BETA_TESTER badge');
                return currentBadges.BETA_TESTER;
            }
            // 🎯 NOVA LÓGICA: Verifica se o usuário está entre os primeiros 20 por data de criação
            const usersCreatedBefore = await prisma.user.count({
                where: {
                    createdAt: {
                        lt: currentUser.createdAt
                    }
                }
            });
            const userPosition = usersCreatedBefore + 1; // +1 porque é baseado em zero
            console.log(`🔍 User position: ${userPosition}, eligible for beta: ${userPosition <= 20}`);
            // Se o usuário está entre os primeiros 20, concede a badge
            if (userPosition <= 20) {
                const newBadge = {
                    ...exports.AVAILABLE_BADGES.BETA_TESTER,
                    earnedAt: new Date()
                };
                console.log('🌟 Awarding BETA_TESTER badge to user');
                await prisma.user.update({
                    where: { id: userId },
                    data: {
                        isBetaTester: true,
                        betaTesterNumber: userPosition,
                        badges: {
                            ...currentBadges,
                            BETA_TESTER: newBadge
                        }
                    }
                });
                return newBadge;
            }
            return null;
        }
        catch (error) {
            console.error('Erro ao verificar badge de beta tester:', error);
            return null;
        }
    }
    // 🔄 NOVA FUNÇÃO: Verifica e concede badges retroativas para usuários existentes
    static async checkRetroactiveBadges(userId) {
        const { prisma } = await Promise.resolve().then(() => __importStar(require('../../prisma')));
        const newBadges = [];
        try {
            // Verifica badge de Beta Tester
            const betaBadge = await this.checkAndAwardBetaTesterBadge(userId);
            if (betaBadge)
                newBadges.push(betaBadge);
            // Verifica badge de Early Adopter (primeiros 100)
            const currentUser = await prisma.user.findUnique({ where: { id: userId } });
            if (currentUser) {
                const usersCreatedBefore = await prisma.user.count({
                    where: { createdAt: { lt: currentUser.createdAt } }
                });
                const userPosition = usersCreatedBefore + 1;
                if (userPosition <= 100) {
                    const earlyAdopterBadge = await this.awardBadge(userId, 'EARLY_ADOPTER');
                    if (earlyAdopterBadge)
                        newBadges.push(earlyAdopterBadge);
                }
            }
            // Verifica badge de Primeiro Relatório
            const userReports = await prisma.report.count({ where: { ownerId: userId } });
            if (userReports >= 1) {
                const firstReportBadge = await this.awardBadge(userId, 'FIRST_REPORT');
                if (firstReportBadge)
                    newBadges.push(firstReportBadge);
            }
            // Verifica badge de Mestre da Sinastria (5 sinastrías)
            const userSynastries = await prisma.report.count({
                where: {
                    ownerId: userId,
                    content: { path: ['type'], equals: 'synastry' }
                }
            });
            if (userSynastries >= 5) {
                const synastryBadge = await this.awardBadge(userId, 'SYNASTRY_MASTER');
                if (synastryBadge)
                    newBadges.push(synastryBadge);
            }
            return newBadges;
        }
        catch (error) {
            console.error('Erro ao verificar badges retroativas:', error);
            return [];
        }
    }
    static async awardBadge(userId, badgeId) {
        const { prisma } = await Promise.resolve().then(() => __importStar(require('../../prisma')));
        if (!exports.AVAILABLE_BADGES[badgeId]) {
            return null;
        }
        try {
            const user = await prisma.user.findUnique({
                where: { id: userId }
            });
            if (!user)
                return null;
            const currentBadges = user.badges || {};
            // Se já tem a badge, não concede novamente
            if (currentBadges[badgeId]) {
                console.log(`🎯 User already has ${badgeId} badge`);
                return currentBadges[badgeId];
            }
            const newBadge = {
                ...exports.AVAILABLE_BADGES[badgeId],
                earnedAt: new Date()
            };
            console.log(`🌟 Awarding ${badgeId} badge to user`);
            await prisma.user.update({
                where: { id: userId },
                data: {
                    badges: {
                        ...currentBadges,
                        [badgeId]: newBadge
                    }
                }
            });
            return newBadge;
        }
        catch (error) {
            console.error(`Erro ao conceder badge ${badgeId}:`, error);
            return null;
        }
    }
    static async getUserBadges(userId) {
        const { prisma } = await Promise.resolve().then(() => __importStar(require('../../prisma')));
        try {
            const user = await prisma.user.findUnique({
                where: { id: userId }
            });
            if (!user || !user.badges) {
                return [];
            }
            const badges = user.badges;
            const badgeArray = Object.values(badges);
            return badgeArray;
        }
        catch (error) {
            console.error('Erro ao buscar badges do usuário:', error);
            return [];
        }
    }
    static getAvailableBadges() {
        return exports.AVAILABLE_BADGES;
    }
}
exports.BadgeSystem = BadgeSystem;
