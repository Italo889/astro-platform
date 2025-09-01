// src/domain/lib/badgeSystem.ts

export interface Badge {
  id: string;
  name: string;
  description: string;
  icon: string;
  color: string;
  rarity: 'common' | 'rare' | 'epic' | 'legendary';
  earnedAt?: Date;
}

export const AVAILABLE_BADGES: Record<string, Omit<Badge, 'earnedAt'>> = {
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

export class BadgeSystem {
  
  static async checkAndAwardBetaTesterBadge(userId: string): Promise<Badge | null> {
    const { prisma } = await import('../../prisma');
    
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
                ...AVAILABLE_BADGES.BETA_TESTER,
                earnedAt: new Date()
              }
            }
          }
        });
        
        return {
          ...AVAILABLE_BADGES.BETA_TESTER,
          earnedAt: new Date()
        };
      }
      
      return null;
    } catch (error) {
      console.error('Erro ao verificar badge de beta tester:', error);
      return null;
    }
  }
  
  static async awardBadge(userId: string, badgeId: string): Promise<Badge | null> {
    const { prisma } = await import('../../prisma');
    
    if (!AVAILABLE_BADGES[badgeId]) {
      return null;
    }
    
    try {
      const user = await prisma.user.findUnique({
        where: { id: userId }
      });
      
      if (!user) return null;
      
      const currentBadges = ((user as any).badges as any) || {};
      
      // Se já tem a badge, não concede novamente
      if (currentBadges[badgeId]) {
        return currentBadges[badgeId];
      }
      
      const newBadge = {
        ...AVAILABLE_BADGES[badgeId],
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
    } catch (error) {
      console.error(`Erro ao conceder badge ${badgeId}:`, error);
      return null;
    }
  }
  
  static async getUserBadges(userId: string): Promise<Badge[]> {
    const { prisma } = await import('../../prisma');
    
    try {
      const user = await prisma.user.findUnique({
        where: { id: userId }
      });
      
      if (!user || !(user as any).badges) return [];
      
      const badges = ((user as any).badges as unknown) as Record<string, Badge>;
      return Object.values(badges);
    } catch (error) {
      console.error('Erro ao buscar badges do usuário:', error);
      return [];
    }
  }
}
