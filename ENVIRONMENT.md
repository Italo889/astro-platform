# ⚙️ Configuração de Ambiente - Arcano Platform

## 🏠 Desenvolvimento Local

Para configurar o ambiente de desenvolvimento:

```bash
# 1. Navegar para o backend
cd backend

# 2. Instalar dependências
npm install

# 3. Configurar ambiente local
npm run setup

# 4. Executar migrações
npm run migrate

# 5. Iniciar servidor
npm run dev
```

## 🚀 Deploy para Produção (Heroku)

### Configuração Manual das Variáveis:

```bash
# Configurar DATABASE_URL (Heroku PostgreSQL)
heroku config:set DATABASE_URL="<sua-url-postgresql>"

# Configurar JWT_SECRET
heroku config:set JWT_SECRET="<sua-chave-secreta-super-forte>"

# Configurar PORT (opcional - Heroku define automaticamente)
heroku config:set PORT=3333
```

### Verificar Configurações:
```bash
heroku config --app seu-app
```

## 📁 Estrutura de Arquivos

```
backend/
├── .env.example          # Template de configuração
├── .env                  # Configuração local (git-ignored)
├── setup-env.js          # Script de configuração
└── package.json          # Scripts de ambiente
```

## 🔐 Segurança

- ✅ Arquivos `.env*` estão no `.gitignore`
- ✅ Chaves sensíveis nunca vão para o Git
- ✅ Ambientes separados e isolados
- ✅ Template público (`.env.example`) para referência

## 🛠️ Scripts Disponíveis

```bash
npm run env:dev     # Configurar ambiente de desenvolvimento
npm run env:prod    # Configurar ambiente de produção  
npm run setup       # Configuração completa (env + prisma)
```

## ⚠️ Importante

Nunca commite o arquivo `.env` real! Apenas o `.env.example` deve ir para o Git.
