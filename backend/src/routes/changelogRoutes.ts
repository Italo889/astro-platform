// src/routes/changelogRoutes.ts

import type { FastifyInstance } from 'fastify';
import { prisma } from '../prisma';
import { z } from 'zod';

// Schema para validação dos dados do changelog
const createChangelogSchema = z.object({
  version: z.string().min(1, 'Versão é obrigatória'),
  title: z.string().min(1, 'Título é obrigatório'),
  description: z.string().optional(),
  isPublished: z.boolean().default(false),
  changes: z.array(z.object({
    type: z.enum(['feature', 'fix', 'improvement', 'security']),
    description: z.string().min(1, 'Descrição é obrigatória'),
    icon: z.string().default('✨')
  }))
});

const updateChangelogSchema = z.object({
  version: z.string().optional(),
  title: z.string().optional(),
  description: z.string().optional(),
  isPublished: z.boolean().optional(),
  changes: z.array(z.object({
    type: z.enum(['feature', 'fix', 'improvement', 'security']),
    description: z.string().min(1, 'Descrição é obrigatória'),
    icon: z.string().default('✨')
  })).optional()
});

export async function changelogRoutes(fastify: FastifyInstance) {

  // 🔐 MIDDLEWARE: Apenas admins podem criar/editar changelogs
  const adminOnly = async (request: any, reply: any) => {
    await fastify.authenticate(request, reply);
    
    const user = await prisma.user.findUnique({
      where: { id: request.user.id }
    });
    
    const isOwner = user?.email === process.env.OWNER_EMAIL;
    
    if (!isOwner) {
      return reply.status(403).send({ 
        error: 'Acesso negado. Apenas administradores podem gerenciar changelogs.' 
      });
    }
  };

  // 📄 ROTA PÚBLICA: Listar changelogs publicados
  fastify.get('/', async (request, reply) => {
    try {
      const changelogs = await prisma.changelog.findMany({
        where: { isPublished: true },
        orderBy: { releaseDate: 'desc' },
        select: {
          id: true,
          version: true,
          title: true,
          description: true,
          releaseDate: true,
          changes: true,
          createdBy: {
            select: {
              name: true
            }
          }
        },
        take: 10 // Limita a 10 changelogs mais recentes
      });

      return reply.send(changelogs);
    } catch (error) {
      fastify.log.error(error);
      return reply.status(500).send({ error: 'Erro ao buscar changelogs.' });
    }
  });

  // 📄 ROTA PÚBLICA: Buscar changelog específico
  fastify.get('/:id', async (request, reply) => {
    try {
      const { id } = request.params as { id: string };

      const changelog = await prisma.changelog.findFirst({
        where: { 
          id,
          isPublished: true 
        },
        select: {
          id: true,
          version: true,
          title: true,
          description: true,
          releaseDate: true,
          changes: true,
          createdBy: {
            select: {
              name: true
            }
          }
        }
      });

      if (!changelog) {
        return reply.status(404).send({ error: 'Changelog não encontrado.' });
      }

      return reply.send(changelog);
    } catch (error) {
      fastify.log.error(error);
      return reply.status(500).send({ error: 'Erro ao buscar changelog.' });
    }
  });

  // 🔐 ROTA ADMIN: Listar todos os changelogs (incluindo não publicados)
  fastify.get('/admin/all', {
    preHandler: [adminOnly]
  }, async (request, reply) => {
    try {
      const changelogs = await prisma.changelog.findMany({
        orderBy: { createdAt: 'desc' },
        select: {
          id: true,
          version: true,
          title: true,
          description: true,
          releaseDate: true,
          isPublished: true,
          changes: true,
          createdAt: true,
          createdBy: {
            select: {
              name: true
            }
          }
        }
      });

      return reply.send(changelogs);
    } catch (error) {
      fastify.log.error(error);
      return reply.status(500).send({ error: 'Erro ao buscar changelogs.' });
    }
  });

  // 🔐 ROTA ADMIN: Criar novo changelog
  fastify.post('/admin/create', {
    preHandler: [adminOnly]
  }, async (request, reply) => {
    try {
      const data = createChangelogSchema.parse(request.body);
      const userId = (request.user as any).id;

      // Verificar se a versão já existe
      const existingVersion = await prisma.changelog.findUnique({
        where: { version: data.version }
      });

      if (existingVersion) {
        return reply.status(409).send({ 
          error: `Versão ${data.version} já existe.` 
        });
      }

      const changelog = await prisma.changelog.create({
        data: {
          ...data,
          createdById: userId,
          changes: data.changes
        },
        select: {
          id: true,
          version: true,
          title: true,
          description: true,
          releaseDate: true,
          isPublished: true,
          changes: true,
          createdBy: {
            select: {
              name: true
            }
          }
        }
      });

      return reply.status(201).send(changelog);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return reply.status(400).send({ 
          error: 'Dados inválidos.', 
          issues: error.format() 
        });
      }
      
      fastify.log.error(error);
      return reply.status(500).send({ error: 'Erro ao criar changelog.' });
    }
  });

  // 🔐 ROTA ADMIN: Atualizar changelog
  fastify.put('/admin/:id', {
    preHandler: [adminOnly]
  }, async (request, reply) => {
    try {
      const { id } = request.params as { id: string };
      const data = updateChangelogSchema.parse(request.body);

      const existingChangelog = await prisma.changelog.findUnique({
        where: { id }
      });

      if (!existingChangelog) {
        return reply.status(404).send({ error: 'Changelog não encontrado.' });
      }

      // Se está alterando a versão, verificar se nova versão já existe
      if (data.version && data.version !== existingChangelog.version) {
        const existingVersion = await prisma.changelog.findUnique({
          where: { version: data.version }
        });

        if (existingVersion) {
          return reply.status(409).send({ 
            error: `Versão ${data.version} já existe.` 
          });
        }
      }

      const updatedChangelog = await prisma.changelog.update({
        where: { id },
        data: {
          ...data,
          ...(data.changes && { changes: data.changes })
        },
        select: {
          id: true,
          version: true,
          title: true,
          description: true,
          releaseDate: true,
          isPublished: true,
          changes: true,
          createdBy: {
            select: {
              name: true
            }
          }
        }
      });

      return reply.send(updatedChangelog);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return reply.status(400).send({ 
          error: 'Dados inválidos.', 
          issues: error.format() 
        });
      }
      
      fastify.log.error(error);
      return reply.status(500).send({ error: 'Erro ao atualizar changelog.' });
    }
  });

  // 🔐 ROTA ADMIN: Deletar changelog
  fastify.delete('/admin/:id', {
    preHandler: [adminOnly]
  }, async (request, reply) => {
    try {
      const { id } = request.params as { id: string };

      const existingChangelog = await prisma.changelog.findUnique({
        where: { id }
      });

      if (!existingChangelog) {
        return reply.status(404).send({ error: 'Changelog não encontrado.' });
      }

      await prisma.changelog.delete({
        where: { id }
      });

      return reply.send({ message: 'Changelog deletado com sucesso.' });
    } catch (error) {
      fastify.log.error(error);
      return reply.status(500).send({ error: 'Erro ao deletar changelog.' });
    }
  });

  // 🔐 ROTA ADMIN: Toggle publicação
  fastify.patch('/admin/:id/toggle-publish', {
    preHandler: [adminOnly]
  }, async (request, reply) => {
    try {
      const { id } = request.params as { id: string };

      const existingChangelog = await prisma.changelog.findUnique({
        where: { id }
      });

      if (!existingChangelog) {
        return reply.status(404).send({ error: 'Changelog não encontrado.' });
      }

      const updatedChangelog = await prisma.changelog.update({
        where: { id },
        data: { 
          isPublished: !existingChangelog.isPublished,
          ...((!existingChangelog.isPublished) && { releaseDate: new Date() })
        },
        select: {
          id: true,
          version: true,
          title: true,
          isPublished: true,
          releaseDate: true
        }
      });

      return reply.send({
        message: `Changelog ${updatedChangelog.isPublished ? 'publicado' : 'despublicado'} com sucesso.`,
        changelog: updatedChangelog
      });
    } catch (error) {
      fastify.log.error(error);
      return reply.status(500).send({ error: 'Erro ao alterar status de publicação.' });
    }
  });
}
