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
        description: 'Pioneiro da Plataforma Arcano - Entre os primeiros 20 usuários',
        icon: '🌟',
        color: '#FFD700',
        rarity: 'legendary'
    },
    EARLY_ADOPTER: {
        id: 'EARLY_ADOPTER',
        name: 'Pioneiro Místico',
        description: 'Um dos primeiros exploradores dos segredos astrais',
        icon: '🔮',
        color: '#9333EA',
        rarity: 'epic'
    },
    FIRST_REPORT: {
        id: 'FIRST_REPORT',
        name: 'Primeiro Despertar',
        description: 'Gerou seu primeiro relatório astrológico',
        icon: '✨',
        color: '#06B6D4',
        rarity: 'common'
    },
    SYNASTRY_MASTER: {
        id: 'SYNASTRY_MASTER',
        name: 'Mestre da Sinastria',
        description: 'Especialista em compatibilidade astrológica',
        icon: '💫',
        color: '#EC4899',
        rarity: 'rare'
    }
};
class BadgeSystem {
    static async checkAndAwardBetaTesterBadge(userId) {
        const { prisma } = await Promise.resolve().then(() => __importStar(require('../../prisma')));
        try {
            // Conta quantos usuários já são beta testers
            const betaTesterCount = await prisma.user.count({
                where: { isBetaTester: true }
            });
            // Se ainda não chegou no limite de 20
            if (betaTesterCount < 20) {
                const nextBetaTesterNumber = betaTesterCount + 1;
                // Atualiza o usuário
                await prisma.user.update({
                    where: { id: userId },
                    data: {
                        isBetaTester: true,
                        betaTesterNumber: nextBetaTesterNumber,
                        badges: {
                            BETA_TESTER: {
                                ...exports.AVAILABLE_BADGES.BETA_TESTER,
                                earnedAt: new Date()
                            }
                        }
                    }
                });
                return {
                    ...exports.AVAILABLE_BADGES.BETA_TESTER,
                    earnedAt: new Date()
                };
            }
            return null;
        }
        catch (error) {
            console.error('Erro ao verificar badge de beta tester:', error);
            return null;
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
                return currentBadges[badgeId];
            }
            const newBadge = {
                ...exports.AVAILABLE_BADGES[badgeId],
                earnedAt: new Date()
            };
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
            if (!user || !user.badges)
                return [];
            const badges = user.badges;
            return Object.values(badges);
        }
        catch (error) {
            console.error('Erro ao buscar badges do usuário:', error);
            return [];
        }
    }
}
exports.BadgeSystem = BadgeSystem;
