# 🚀 API Documentation - Arcano Platform

Documentação completa da API REST do Arcano Platform.

**Base URL**: `http://localhost:3333/api` (desenvolvimento) | `https://arcano-1f10c3cc540d.herokuapp.com/api` (produção)

---

## 📋 **Índice**

- [Autenticação](#-autenticação)
- [Usuários](#-usuários)
- [Relatórios](#-relatórios)
- [Cálculos Astrológicos](#-cálculos-astrológicos)
- [Sinastria](#-sinastria)
- [Newsletter](#-newsletter)
- [Changelog](#-changelog)
- [Admin](#-admin)
- [Códigos de Erro](#-códigos-de-erro)

---

## 🔐 **Autenticação**

Todas as rotas protegidas requerem o header `Authorization: Bearer <token>`.

### **POST** `/users/register`
Registrar novo usuário.

**Body:**
```json
{
  "name": "string",
  "email": "string",
  "password": "string"
}
```

**Response (201):**
```json
{
  "success": true,
  "message": "Usuário criado com sucesso",
  "user": {
    "id": "uuid",
    "name": "string",
    "email": "string",
    "createdAt": "datetime",
    "isBetaTester": false,
    "betaTesterNumber": null,
    "badges": []
  },
  "tokens": {
    "accessToken": "jwt_token",
    "refreshToken": "jwt_token"
  }
}
```

### **POST** `/users/login`
Fazer login.

**Body:**
```json
{
  "email": "string", 
  "password": "string"
}
```

**Response (200):**
```json
{
  "success": true,
  "message": "Login realizado com sucesso",
  "user": {
    "id": "uuid",
    "name": "string",
    "email": "string",
    "createdAt": "datetime",
    "isBetaTester": false,
    "betaTesterNumber": null,
    "badges": []
  },
  "tokens": {
    "accessToken": "jwt_token",
    "refreshToken": "jwt_token"
  }
}
```

### **POST** `/users/refresh`
Renovar token de acesso.

**Body:**
```json
{
  "refreshToken": "jwt_token"
}
```

---

## 👤 **Usuários**

### **GET** `/users/me` 🔒
Obter dados do usuário atual.

**Headers:** `Authorization: Bearer <token>`

**Response (200):**
```json
{
  "success": true,
  "user": {
    "id": "uuid",
    "name": "string",
    "email": "string",
    "createdAt": "datetime",
    "isBetaTester": false,
    "betaTesterNumber": null,
    "badges": []
  }
}
```

### **GET** `/users/badges` 🔒
Obter badges do usuário.

**Response (200):**
```json
{
  "success": true,
  "badges": [
    {
      "id": "string",
      "name": "string", 
      "description": "string",
      "icon": "string",
      "earnedAt": "datetime"
    }
  ]
}
```

---

## 📊 **Relatórios**

### **GET** `/reports` 🔒
Listar relatórios do usuário.

**Query Parameters:**
- `page` (number, default: 1)
- `limit` (number, default: 10)
- `search` (string, opcional)

**Response (200):**
```json
{
  "success": true,
  "reports": [
    {
      "id": "uuid",
      "createdAt": "datetime",
      "content": {
        "personalInfo": {},
        "astrology": {},
        "numerology": {},
        "tarot": {}
      }
    }
  ],
  "pagination": {
    "page": 1,
    "limit": 10,
    "total": 50,
    "totalPages": 5
  }
}
```

### **GET** `/reports/:id` 🔒
Obter relatório específico.

**Response (200):**
```json
{
  "success": true,
  "report": {
    "id": "uuid",
    "createdAt": "datetime", 
    "content": {
      "personalInfo": {
        "name": "string",
        "birthDate": "date",
        "birthTime": "time",
        "birthPlace": "string"
      },
      "astrology": {},
      "numerology": {},
      "tarot": {}
    }
  }
}
```

### **DELETE** `/reports/:id` 🔒
Deletar relatório.

**Response (200):**
```json
{
  "success": true,
  "message": "Relatório deletado com sucesso"
}
```

---

## 🔮 **Cálculos Astrológicos**

### **POST** `/calculate/complete`
Gerar relatório astrológico completo.

**Body:**
```json
{
  "personalInfo": {
    "name": "string",
    "birthDate": "YYYY-MM-DD",
    "birthTime": "HH:MM",
    "birthPlace": "string",
    "geonameId": 123456
  }
}
```

**Response (200):**
```json
{
  "success": true,
  "report": {
    "personalInfo": {},
    "astrology": {
      "sunSign": {
        "sign": "string",
        "element": "string",
        "quality": "string",
        "ruler": "string",
        "interpretation": "string"
      },
      "chineseSign": {},
      "houses": [],
      "planets": []
    },
    "numerology": {
      "lifePathNumber": {},
      "personalityNumber": {},
      "soulNumber": {},
      "destinyNumber": {},
      "yearNumber": {},
      "cabalisticAnalysis": {},
      "gematriaAnalysis": {}
    },
    "tarot": {
      "majorArcana": {},
      "dailyInsight": {}
    }
  }
}
```

### **GET** `/calculate/daily-insight`
Obter insight diário (carta do tarô).

**Response (200):**
```json
{
  "success": true,
  "insight": {
    "card": {
      "number": 0,
      "name": "string",
      "meaning": "string",
      "interpretation": "string",
      "image": "string"
    },
    "expiresAt": "datetime"
  }
}
```

---

## 💫 **Sinastria**

### **POST** `/calculate/synastry/calculate` 🔒
Calcular compatibilidade entre duas pessoas.

**Body:**
```json
{
  "person1": {
    "name": "string",
    "birthDate": "YYYY-MM-DD",
    "birthTime": "HH:MM", 
    "birthPlace": "string",
    "geonameId": 123456
  },
  "person2": {
    "name": "string",
    "birthDate": "YYYY-MM-DD",
    "birthTime": "HH:MM",
    "birthPlace": "string", 
    "geonameId": 123456
  }
}
```

**Response (200):**
```json
{
  "success": true,
  "synastry": {
    "compatibility": {
      "overall": 85,
      "love": 90,
      "friendship": 80,
      "work": 75
    },
    "aspects": {
      "communication": {},
      "values": {},
      "intimacy": {},
      "challenges": {}
    },
    "elementalAnalysis": {},
    "planetaryAspects": []
  }
}
```

---

## 📧 **Newsletter**

### **POST** `/newsletter/subscribe`
Inscrever-se na newsletter.

**Body:**
```json
{
  "email": "string"
}
```

**Response (200):**
```json
{
  "success": true,
  "message": "Inscrição realizada com sucesso"
}
```

### **POST** `/newsletter/unsubscribe`
Cancelar inscrição.

**Body:**
```json
{
  "email": "string"
}
```

---

## 📋 **Changelog**

### **GET** `/changelog`
Listar changelogs públicos.

**Response (200):**
```json
{
  "success": true,
  "changelogs": [
    {
      "id": "uuid",
      "version": "string",
      "title": "string", 
      "description": "string",
      "releaseDate": "datetime",
      "changes": [
        {
          "type": "feature|fix|improvement|security",
          "description": "string",
          "icon": "string"
        }
      ],
      "createdBy": {
        "name": "string"
      }
    }
  ]
}
```

### **GET** `/changelog/:id`
Obter changelog específico.

### **POST** `/changelog/admin` 🔒👑
Criar novo changelog (admin only).

### **PUT** `/changelog/admin/:id` 🔒👑
Editar changelog (admin only).

### **DELETE** `/changelog/admin/:id` 🔒👑
Deletar changelog (admin only).

### **PATCH** `/changelog/admin/:id/publish` 🔒👑
Publicar/despublicar changelog (admin only).

---

## 👑 **Admin**

### **GET** `/admin/dashboard` 🔒👑
Obter métricas do dashboard admin.

**Response (200):**
```json
{
  "success": true,
  "metrics": {
    "users": {
      "total": 150,
      "betaTesters": 20,
      "withReports": 85,
      "thisWeek": 12,
      "thisMonth": 45
    },
    "reports": {
      "total": 320,
      "thisWeek": 25,
      "premium": 45,
      "free": 275
    },
    "topUsers": [
      {
        "id": "uuid",
        "name": "string",
        "reportCount": 5
      }
    ],
    "userGrowth": [
      {
        "date": "YYYY-MM-DD",
        "count": 5
      }
    ],
    "reportGrowth": [
      {
        "date": "YYYY-MM-DD", 
        "count": 12
      }
    ]
  }
}
```

---

## ⚠️ **Códigos de Erro**

### **Códigos HTTP**
- `200` - Sucesso
- `201` - Criado com sucesso
- `400` - Bad Request (dados inválidos)
- `401` - Não autorizado (token inválido/expirado)
- `403` - Proibido (sem permissão)
- `404` - Não encontrado
- `409` - Conflito (email já existe)
- `422` - Dados não processáveis (validação falhou)
- `500` - Erro interno do servidor

### **Formato de Erro**
```json
{
  "success": false,
  "error": "Mensagem de erro detalhada",
  "code": "ERROR_CODE"
}
```

### **Códigos de Erro Comuns**
- `INVALID_TOKEN` - Token JWT inválido
- `TOKEN_EXPIRED` - Token expirado
- `USER_NOT_FOUND` - Usuário não encontrado
- `EMAIL_ALREADY_EXISTS` - Email já cadastrado
- `INVALID_CREDENTIALS` - Credenciais inválidas
- `MISSING_PERMISSIONS` - Sem permissões suficientes
- `VALIDATION_FAILED` - Falha na validação dos dados
- `RESOURCE_NOT_FOUND` - Recurso não encontrado

---

## 🔧 **Configuração de Desenvolvimento**

### **Headers Necessários**
```
Content-Type: application/json
Authorization: Bearer <token> (para rotas protegidas)
```

### **CORS**
As seguintes origens são permitidas:
- `http://localhost:5173` (Vite dev)
- `http://localhost:4321` (Astro dev)
- `https://arcano-1f10c3cc540d.herokuapp.com` (Produção)

### **Rate Limiting**
- Limit: 100 requests por 15 minutos por IP
- Login attempts: 5 tentativas por 15 minutos por IP

---

## 📱 **Exemplos de Uso**

### **Fluxo Completo - Registro e Cálculo**

1. **Registrar usuário:**
```bash
curl -X POST http://localhost:3333/api/users/register \
  -H "Content-Type: application/json" \
  -d '{
    "name": "João Silva",
    "email": "joao@email.com", 
    "password": "senha123"
  }'
```

2. **Fazer login:**
```bash
curl -X POST http://localhost:3333/api/users/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "joao@email.com",
    "password": "senha123"
  }'
```

3. **Gerar relatório:**
```bash
curl -X POST http://localhost:3333/api/calculate/complete \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <token>" \
  -d '{
    "personalInfo": {
      "name": "João Silva",
      "birthDate": "1990-05-15", 
      "birthTime": "14:30",
      "birthPlace": "São Paulo, SP",
      "geonameId": 3448439
    }
  }'
```

---

## 🔮 **Changelog da API**

### **v2.1.0** - 2025-09-02
- ✨ Sistema completo de changelog
- 📋 Endpoints para gerenciamento de changelogs
- 👑 Rotas administrativas expandidas

### **v2.0.0** - 2025-08-30  
- 👤 Sistema de badges para beta testers
- 📧 API completa de newsletter
- 📊 Dashboard administrativo com métricas

### **v1.5.0** - 2025-08-25
- 💫 API completa de sinastria
- 🔮 Análise de compatibilidade
- 🎭 Sistema de feature gates

---

<div align="center">

**✨ Documentação mantida atualizada automaticamente ✨**

[🏠 README](../README.md) | [📋 Changelog](../CHANGELOG.md) | [🐛 Issues](https://github.com/Italo889/astro-platform/issues)

</div>
