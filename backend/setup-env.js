#!/usr/bin/env node

/**
 * Script para configurar ambiente de desenvolvimento
 * Uso: node setup-env.js [development|production]
 */

const fs = require('fs');
const path = require('path');

const environment = process.argv[2] || 'development';

const configs = {
  development: {
    DATABASE_URL: 'postgresql://postgres:senha@localhost:5432/astro_platform?schema=public',
    REDIS_URL: 'redis://localhost:6379',
    PORT: '3333',
    JWT_SECRET: 'iTyf7M-mQbpQvohjBTpKbLk0IRK2lgNc9xTSJvEQ-Fi4UTOcCU_tVTaXvYJNbgnBeBfZjMSSRO5PyDRkvk50wA'
  },
  production: {
    DATABASE_URL: '${DATABASE_URL}', // Será configurado pelo Heroku
    REDIS_URL: '${REDIS_URL}',
    PORT: '${PORT}',
    JWT_SECRET: '${JWT_SECRET}'
  }
};

function createEnvFile(env) {
  const config = configs[env];
  if (!config) {
    console.error(`❌ Ambiente "${env}" não encontrado. Use: development ou production`);
    process.exit(1);
  }

  const envContent = Object.entries(config)
    .map(([key, value]) => `${key}="${value}"`)
    .join('\n');

  const envPath = path.join(__dirname, '.env');
  
  try {
    fs.writeFileSync(envPath, envContent);
    console.log(`✅ Arquivo .env criado para ambiente: ${env}`);
    console.log(`📁 Localização: ${envPath}`);
  } catch (error) {
    console.error(`❌ Erro ao criar .env:`, error.message);
    process.exit(1);
  }
}

// Verificar se já existe um .env
const envPath = path.join(__dirname, '.env');
if (fs.existsSync(envPath)) {
  console.log('⚠️  Arquivo .env já existe!');
  console.log('   Para recriar, delete o arquivo atual primeiro.');
  process.exit(0);
}

createEnvFile(environment);
