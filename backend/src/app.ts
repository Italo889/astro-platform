import Fastify from 'fastify';
import staticPlugin from '@fastify/static';
import path from 'path';

// Função principal para isolar o escopo assíncrono
async function buildServer() {
  const server = Fastify({ logger: true });

  // --- PASSO 1: Registrar o plugin de arquivos estáticos ---
  // Usamos 'await' para garantir que ele carregue completamente antes de prosseguir.
  await server.register(staticPlugin, {
    root: path.join(__dirname, '../../dist'),
    prefix: '/',
  });

  server.log.info(`Servindo arquivos estáticos de: ${path.join(__dirname, '../../dist')}`);

  // --- PASSO 2: Rota de API de teste ---
  server.get('/api/health', async (request, reply) => {
    return { status: 'ok' };
  });

  // --- PASSO 3: Rota de Fallback para a Single Page Application (SPA) ---
  server.setNotFoundHandler((request, reply) => {
    server.log.info(`Rota não encontrada: ${request.url}. Servindo index.html.`);
    // A função 'reply.sendFile' agora vai existir porque esperamos o plugin carregar.
    reply.sendFile('index.html'); 
  });

  return server;
}

// --- PASSO 4: Função de inicialização explícita ---
async function start() {
  let server;
  try {
    server = await buildServer();
    const port = Number(process.env.PORT) || 3333;
    const host = '0.0.0.0'; // Hardcoded para garantir

    await server.listen({ port, host });
    server.log.info(`Servidor rodando na porta ${port}`);
    
  } catch (err) {
    console.error('Erro fatal ao iniciar o servidor:', err);
    if (server) {
      server.log.error(err);
    }
    process.exit(1);
  }
}

// Inicia a aplicação
start();