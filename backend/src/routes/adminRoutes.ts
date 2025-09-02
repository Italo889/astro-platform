// src/routes/adminRoutes.ts

import type { FastifyInstance } from 'fastify';
import { prisma } from '../prisma';

interface AdminStats {
  users: {
    total: number;
    newThisWeek: number;
    newThisMonth: number;
    activeUsers: number; // usuarios que têm pelo menos 1 relatório
    betaTesters: number;
  };
  reports: {
    total: number;
    personal: number;
    synastry: number;
    thisWeek: number;
    thisMonth: number;
    averagePerUser: number;
  };
  engagement: {
    usersWithMultipleReports: number;
    topUser: {
      name: string;
      reportCount: number;
    } | null;
  };
  growth: {
    dailySignups: Array<{
      date: string;
      count: number;
    }>;
    dailyReports: Array<{
      date: string;
      count: number;
    }>;
  };
}

export async function adminRoutes(fastify: FastifyInstance) {
  
  // 🔐 MIDDLEWARE: Apenas o owner pode acessar rotas admin
  const adminOnly = async (request: any, reply: any) => {
    await fastify.authenticate(request, reply);
    
    const user = await prisma.user.findUnique({
      where: { id: request.user.id }
    });
    
    // Verificar se é o owner - você pode ajustar essa lógica
    // Por exemplo, verificar se tem um role específico ou se é um email específico
    const isOwner = user?.email === process.env.OWNER_EMAIL || 
                   user?.id === process.env.OWNER_USER_ID;
    
    if (!isOwner) {
      return reply.status(403).send({ 
        error: 'Acesso negado. Apenas administradores podem acessar esta funcionalidade.' 
      });
    }
  };

  // 📊 ROTA: Dashboard Stats
  fastify.get('/dashboard', { 
    preHandler: [adminOnly] 
  }, async (request, reply) => {
    try {
      const now = new Date();
      const oneWeekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
      const oneMonthAgo = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);
      const thirtyDaysAgo = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);

      // 👥 ESTATÍSTICAS DE USUÁRIOS
      const [
        totalUsers,
        newUsersThisWeek,
        newUsersThisMonth,
        activeUsers,
        betaTesters
      ] = await Promise.all([
        prisma.user.count(),
        prisma.user.count({
          where: { createdAt: { gte: oneWeekAgo } }
        }),
        prisma.user.count({
          where: { createdAt: { gte: oneMonthAgo } }
        }),
        prisma.user.count({
          where: {
            reports: {
              some: {}
            }
          }
        }),
        prisma.user.count({
          where: { isBetaTester: true }
        })
      ]);

      // 📈 ESTATÍSTICAS DE RELATÓRIOS
      const [
        totalReports,
        personalReports,
        synastryReports,
        reportsThisWeek,
        reportsThisMonth
      ] = await Promise.all([
        prisma.report.count(),
        prisma.report.count({
          where: {
            content: {
              path: ['type'],
              not: 'synastry'
            }
          }
        }),
        prisma.report.count({
          where: {
            content: {
              path: ['type'],
              equals: 'synastry'
            }
          }
        }),
        prisma.report.count({
          where: { createdAt: { gte: oneWeekAgo } }
        }),
        prisma.report.count({
          where: { createdAt: { gte: oneMonthAgo } }
        })
      ]);

      const averageReportsPerUser = totalUsers > 0 ? totalReports / totalUsers : 0;

      // 🎯 ESTATÍSTICAS DE ENGAJAMENTO
      const usersWithMultipleReportsQuery = await prisma.$queryRaw`
        SELECT COUNT(DISTINCT user_id) as count
        FROM (
          SELECT "ownerId" as user_id, COUNT(*) as report_count
          FROM "Report"
          GROUP BY "ownerId"
          HAVING COUNT(*) >= 2
        ) subquery
      ` as Array<{ count: bigint }>;
      
      const usersWithMultipleReports = Number(usersWithMultipleReportsQuery[0]?.count || 0);

      // Top user (mais relatórios)
      const topUserData = await prisma.user.findFirst({
        select: {
          name: true,
          _count: {
            select: {
              reports: true
            }
          }
        },
        orderBy: {
          reports: {
            _count: 'desc'
          }
        }
      });

      const topUser = topUserData ? {
        name: topUserData.name.split(' ')[0], // Apenas primeiro nome por privacidade
        reportCount: topUserData._count.reports
      } : null;

      // 📊 CRESCIMENTO DIÁRIO (últimos 30 dias)
      const dailySignupsQuery = await prisma.$queryRaw`
        SELECT DATE("createdAt") as date, COUNT(*) as count
        FROM "User"
        WHERE "createdAt" >= ${thirtyDaysAgo}
        GROUP BY DATE("createdAt")
        ORDER BY date DESC
        LIMIT 30
      ` as Array<{ date: Date; count: bigint }>;

      const dailyReportsQuery = await prisma.$queryRaw`
        SELECT DATE("createdAt") as date, COUNT(*) as count
        FROM "Report"
        WHERE "createdAt" >= ${thirtyDaysAgo}
        GROUP BY DATE("createdAt")
        ORDER BY date DESC
        LIMIT 30
      ` as Array<{ date: Date; count: bigint }>;

      const dailySignups = dailySignupsQuery.map(row => ({
        date: row.date.toISOString().split('T')[0],
        count: Number(row.count)
      }));

      const dailyReports = dailyReportsQuery.map(row => ({
        date: row.date.toISOString().split('T')[0],
        count: Number(row.count)
      }));

      const stats: AdminStats = {
        users: {
          total: totalUsers,
          newThisWeek: newUsersThisWeek,
          newThisMonth: newUsersThisMonth,
          activeUsers,
          betaTesters
        },
        reports: {
          total: totalReports,
          personal: personalReports,
          synastry: synastryReports,
          thisWeek: reportsThisWeek,
          thisMonth: reportsThisMonth,
          averagePerUser: Number(averageReportsPerUser.toFixed(2))
        },
        engagement: {
          usersWithMultipleReports,
          topUser
        },
        growth: {
          dailySignups,
          dailyReports
        }
      };

      return reply.send(stats);

    } catch (error) {
      fastify.log.error(error);
      return reply.status(500).send({ 
        error: 'Erro ao buscar estatísticas do dashboard.' 
      });
    }
  });

  // 👥 ROTA: Lista detalhada de usuários (paginada)
  fastify.get('/users', { 
    preHandler: [adminOnly] 
  }, async (request, reply) => {
    try {
      const { page = 1, limit = 20, search = '' } = request.query as any;
      const skip = (page - 1) * limit;

      const where = search ? {
        OR: [
          { name: { contains: search, mode: 'insensitive' as const } },
          { email: { contains: search, mode: 'insensitive' as const } }
        ]
      } : {};

      const [users, total] = await Promise.all([
        prisma.user.findMany({
          where,
          select: {
            id: true,
            name: true,
            email: true,
            createdAt: true,
            isBetaTester: true,
            betaTesterNumber: true,
            _count: {
              select: {
                reports: true
              }
            }
          },
          orderBy: {
            createdAt: 'desc'
          },
          skip,
          take: limit
        }),
        prisma.user.count({ where })
      ]);

      return reply.send({
        users,
        pagination: {
          total,
          pages: Math.ceil(total / limit),
          currentPage: page,
          hasNext: skip + limit < total,
          hasPrev: page > 1
        }
      });

    } catch (error) {
      fastify.log.error(error);
      return reply.status(500).send({ 
        error: 'Erro ao buscar usuários.' 
      });
    }
  });

  // 📈 ROTA: Relatórios recentes
  fastify.get('/recent-reports', { 
    preHandler: [adminOnly] 
  }, async (request, reply) => {
    try {
      const { limit = 10 } = request.query as any;

      const reports = await prisma.report.findMany({
        select: {
          id: true,
          createdAt: true,
          content: true,
          owner: {
            select: {
              name: true,
              email: true
            }
          }
        },
        orderBy: {
          createdAt: 'desc'
        },
        take: limit
      });

      // Processar dados para mostrar tipo do relatório
      const processedReports = reports.map(report => ({
        id: report.id,
        createdAt: report.createdAt,
        type: (report.content as any)?.type === 'synastry' ? 'Sinastria' : 'Pessoal',
        userName: report.owner.name.split(' ')[0], // Apenas primeiro nome
        userEmail: report.owner.email.replace(/(.{2}).*(@.*)/, '$1***$2') // Email mascarado
      }));

      return reply.send(processedReports);

    } catch (error) {
      fastify.log.error(error);
      return reply.status(500).send({ 
        error: 'Erro ao buscar relatórios recentes.' 
      });
    }
  });

  // 📧 ROTA: Newsletter subscribers
  fastify.get('/newsletter', { 
    preHandler: [adminOnly] 
  }, async (request, reply) => {
    try {
      const { page = 1, limit = 50 } = request.query as any;
      const skip = (page - 1) * limit;

      const [subscribers, total] = await Promise.all([
        prisma.subscriber.findMany({
          orderBy: {
            createdAt: 'desc'
          },
          skip,
          take: limit
        }),
        prisma.subscriber.count()
      ]);

      return reply.send({
        subscribers,
        pagination: {
          total,
          pages: Math.ceil(total / limit),
          currentPage: page,
          hasNext: skip + limit < total,
          hasPrev: page > 1
        }
      });

    } catch (error) {
      fastify.log.error(error);
      return reply.status(500).send({ 
        error: 'Erro ao buscar assinantes da newsletter.' 
      });
    }
  });
}
