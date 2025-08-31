# 🔮 Arcano Platform

<div align="center">

![Arcano Platform Banner](https://img.shields.io/badge/Arcano-Platform-8b63e9?style=for-the-badge&logo=data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjQiIGhlaWdodD0iMjQiIHZpZXdCb3g9IjAgMCAyNCAyNCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHBhdGggZD0iTTEyIDIxQzE2Ljk3MDYgMjEgMjEgMTYuOTcwNiAyMSAxMkMyMSA3LjAyOTQ0IDE2Ljk3MDYgMyAxMiAzQzcuMDI5NDQgMyAzIDcuMDI5NDQgMyAxMkMzIDE2Ljk3MDYgNy4wMjk0NCAyMSAxMiAyMVoiIHN0cm9rZT0iI0ZGRDcwMCIgc3Ryb2tlLXdpZHRoPSIxLjUiLz4KPHA%2BPC9zdmc%2B&logoColor=FFD700)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0+-3178C6?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![React](https://img.shields.io/badge/React-19+-61DAFB?style=for-the-badge&logo=react&logoColor=black)](https://reactjs.org/)
[![Fastify](https://img.shields.io/badge/Fastify-5.4+-000000?style=for-the-badge&logo=fastify&logoColor=white)](https://fastify.dev/)
[![Prisma](https://img.shields.io/badge/Prisma-6.13+-2D3748?style=for-the-badge&logo=prisma&logoColor=white)](https://www.prisma.io/)

**Desvende os mistérios do universo interior através da astrologia, tarô e numerologia**

[Demo](#) • [Documentação](#) • [Contribuir](#-contribuindo) • [Changelog](#)

</div>

---

## 🌟 **Visão Geral**

O **Arcano Platform** é uma aplicação web moderna e interativa que une a sabedoria ancestral da astrologia, tarô e numerologia com tecnologia de ponta. Desenvolvida para ser uma ferramenta completa de autoconhecimento, a plataforma oferece cálculos personalizados, análises detalhadas e uma experiência visual envolvente.

### 🎯 **Filosofia do Projeto**

Fugindo dos estereótipos comuns de aplicações esotéricas, o Arcano apresenta informações de forma **clara**, **construtiva** e **empoderadora**. A plataforma funciona tanto como um **Oráculo** (ferramenta de cálculo) quanto como uma **Escola** (plataforma educacional), com base técnica sólida e visão de longo prazo.

## ✨ **Funcionalidades Principais**

### 🔐 **Sistema de Autenticação Completo**
- ✅ Registro e login seguro com criptografia `bcryptjs`
- ✅ Autenticação JWT com refresh tokens
- ✅ Estado persistente com `Zustand` e `localStorage`
- ✅ Proteção de rotas e controle de acesso

### 🪐 **Mapa Astral Completo**
- ✅ Cálculo de signos solares com precisão de fuso horário
- ✅ Posições planetárias usando biblioteca `Swiss Ephemeris`
- ✅ Análise de casas astrológicas
- ✅ Aspectos planetários e interpretações
- ✅ Signo chinês baseado no ano lunar

### 🔮 **Sistema de Tarô e Numerologia**
- ✅ Cálculo de Arcanos Maiores através da data de nascimento
- ✅ **Dupla análise do nome**: Método Cabalístico (1-9) e Gematria Clássica
- ✅ Números pessoais: Personalidade, Alma, Destino e Anual
- ✅ Insight diário com carta persistente por 24h
- ✅ Galeria completa de 22 Arcanos Maiores com imagens HD

### 💫 **Análise de Sinastria (Compatibilidade)**
- ✅ Portal exclusivo para membros com `FeatureGate`
- ✅ Motor de cálculo com matriz de 250+ combinações
- ✅ Análise multidimensional de compatibilidade
- ✅ Relatórios dinâmicos de relacionamento

### 🏛️ **Dashboard Personalizado**
- ✅ "Santuário Pessoal" para usuários autenticados
- ✅ Visualização dos arquétipos principais
- ✅ Histórico de relatórios com busca otimizada
- ✅ Cards interativos com efeitos 3D

### 🎨 **UI/UX Premium**
- ✅ **Aurora Effect**: Efeitos de mouse tracking
- ✅ **Parallax**: Animações baseadas em scroll
- ✅ **Constellation Background**: Campo de estrelas animado
- ✅ **Morphing Cards**: Transformações fluidas
- ✅ **Mystical Typography**: Fontes customizadas (Cinzel Decorative, Marcellus SC)
- ✅ Sistema de cores cósmicas (#161221, #8b63e9, #FFD700)

## 🛠️ **Stack Tecnológica**

<table>
<tr>
<td>

### **Frontend**
- ⚛️ **React 19** - UI Library
- 🎯 **TypeScript** - Type Safety
- ⚡ **Vite** - Build Tool
- 🎨 **Tailwind CSS v4** - Styling
- 🎭 **Framer Motion** - Animations
- 🗂️ **Zustand** - State Management
- 🚦 **React Router DOM** - Routing
- 🔄 **TanStack Query** - Data Fetching
- 📱 **Radix UI** - Component Primitives

</td>
<td>

### **Backend**
- 🚀 **Fastify** - Web Framework
- 📊 **Prisma ORM** - Database
- 🔐 **JWT + Bcrypt** - Authentication
- 🌟 **Swiss Ephemeris** - Astronomical Calculations
- 📮 **BullMQ + Redis** - Job Queue
- 🛡️ **Helmet + CORS** - Security
- 📧 **Newsletter System** - Email Management
- 🔍 **TypeScript** - Type Safety

</td>
</tr>
</table>

## � **Arquitetura do Projeto**

```
arcano-platform/
├── 📁 frontend/
│   ├── 📁 src/
│   │   ├── 📁 components/
│   │   │   ├── 📁 auth/           # AuthModal, FeatureGate, ProtectedRoute
│   │   │   ├── 📁 features/       # dashboard, report (componentes específicos)
│   │   │   ├── 📁 layout/         # Header, Footer, RootLayout, BackgroundEffects
│   │   │   ├── 📁 sections/       # Hero, CalculatorForm, DailyInsight
│   │   │   └── 📁 ui/            # Button, Modal, LogoSymbol (componentes reutilizáveis)
│   │   ├── 📁 domain/            # types.ts (tipos de negócio)
│   │   ├── 📁 hooks/             # useCalculatorForm, useSynastryForm
│   │   ├── 📁 pages/             # Landing, Dashboard, Report, Synastry
│   │   ├── 📁 services/          # API clients (auth, reports, newsletter)
│   │   ├── 📁 store/             # Zustand stores (auth, reports, UI)
│   │   └── 📁 utils/             # helpers, constants, formatters
│   └── 📄 package.json
├── 📁 backend/
│   ├── 📁 prisma/
│   │   ├── 📄 schema.prisma      # Database schema
│   │   └── 📁 migrations/        # Database migrations
│   └── 📁 src/
│       ├── 📁 domain/
│       │   ├── 📄 engine.ts      # Orquestrador principal de cálculos
│       │   ├── 📄 types.ts       # Tipos de negócio
│       │   └── 📁 lib/           # Lógicas específicas (astro, numerology, synastry)
│       ├── 📁 plugins/           # authPlugin.ts (middleware de autenticação)
│       ├── 📁 routes/            # Rotas da API organizadas por feature
│       ├── 📁 scripts/           # Scripts de importação e utilitários
│       └── 📄 app.ts            # Servidor Fastify principal
└── 📄 README.md
```

## 🚀 **Início Rápido**

### **Pré-requisitos**
- 📦 **Node.js** 18+ 
- 🐘 **PostgreSQL** (ou banco compatível com Prisma)
- 🔴 **Redis** (opcional, para filas)

### **1. Clone o Repositório**
```bash
git clone https://github.com/Italo889/astro-platform.git
cd astro-platform
```

### **2. Setup do Backend**
```bash
cd backend

# Instalar dependências
npm install

# Configurar variáveis de ambiente
cp .env.example .env
# Edite o .env com suas configurações de DATABASE_URL e JWT_SECRET

# Executar migrações do banco
npx prisma migrate dev

# Gerar cliente Prisma
npx prisma generate

# Iniciar servidor de desenvolvimento
npm run dev
```
🔗 **Backend rodando em**: `http://localhost:3333`

### **3. Setup do Frontend**
```bash
# Em novo terminal
cd frontend

# Instalar dependências  
npm install

# Iniciar servidor de desenvolvimento
npm run dev
```
🔗 **Frontend rodando em**: `http://localhost:5173`

## 🌐 **API Endpoints**

<details>
<summary><strong>📋 Ver todos os endpoints</strong></summary>

| Método | Endpoint | Auth | Descrição |
|--------|----------|------|-----------|
| `POST` | `/users/register` | ❌ | Registrar novo usuário |
| `POST` | `/users/login` | ❌ | Login do usuário |
| `POST` | `/calculate/personal` | ❌ | Calcular relatório pessoal (anônimo) |
| `POST` | `/calculate/synastry` | ❌ | Calcular sinastria (anônima) |
| `POST` | `/reports` | ✅ | Salvar relatório no perfil |
| `GET` | `/reports` | ✅ | Listar relatórios do usuário |
| `GET` | `/reports/:id` | ✅ | Buscar relatório específico |
| `POST` | `/newsletter/subscribe` | ❌ | Inscrever na newsletter |

</details>

## 🧮 **Motor de Cálculos**

### **Sistema Astrológico**
- 🪐 **12 Signos do Zodíaco** com cálculos precisos de fuso horário
- 🌙 **Fases Lunares** e influências planetárias
- 🏛️ **12 Casas Astrológicas** com interpretações
- 🐉 **Zodíaco Chinês** baseado no ano lunar correto
- 🔢 **Aspectos Planetários** (conjunção, quadratura, trígono, etc.)

### **Sistema de Tarô e Numerologia**
- � **22 Arcanos Maiores** com interpretações detalhadas
- 🧮 **Numerologia Pitagórica** para números pessoais
- 📜 **Método Cabalístico** (1-9) para análise de nomes
- ⚡ **Gematria Clássica** com valores hebraicos tradicionais
- 📅 **Cálculo Anual** para previsões do ano atual

### **Matriz de Compatibilidade**
- 💫 **250+ Combinações** de signos e arcanos
- 🎭 **Análise Multi-dimensional**: Amor, Amizade, Trabalho
- 📊 **Score de Harmonia** algorítmico
- 💝 **Aspectos Detalhados**: Comunicação, Valores, Intimidade

## 🎨 **Design System**

### **Paleta de Cores**
```css
/* Cores Primárias */
--background-cosmic: #161221    /* Fundo cósmico principal */
--surface-mystical: #2f2546     /* Superfícies elevadas */
--accent-intuitive: #8b63e9     /* Roxo místico */
--gold-solar: #FFD700           /* Dourado solar */
--text-ethereal: #F5F5F5        /* Texto principal */
--text-muted: #a495c6           /* Texto secundário */
```

### **Typography**
- 🎭 **Cinzel Decorative** - Títulos principais
- 📜 **Marcellus SC** - Subtítulos e seções
- 📝 **Noto Sans** - Corpo do texto
- 🔮 **Space Grotesk** - UI elements

### **Componentes Especiais**
- ✨ **Aurora Background** - Efeito de mouse tracking
- 🌌 **Constellation Field** - Campo de estrelas animado
- 💎 **Morphing Cards** - Cards com transformações 3D
- 🔮 **Mystical Dividers** - Separadores ornamentais
- ⚡ **Floating Labels** - Inputs com labels flutuantes

## 📊 **Performance & Otimização**

- ⚡ **Bundle Splitting** com Vite
- 🗂️ **Code Splitting** por rotas
- 🖼️ **Image Optimization** (WebP + lazy loading)
- 💾 **Smart Caching** com TanStack Query
- 🎯 **Tree Shaking** para bibliotecas
- 📱 **Progressive Enhancement**

## 🧪 **Testes**

```bash
# Frontend
npm run test              # Executar testes unitários
npm run test:coverage     # Cobertura de testes

# Backend  
npm run test              # Testes da API
npm run test:e2e         # Testes end-to-end
```

## 🚢 **Deploy**

### **Frontend (Vercel/Netlify)**
```bash
npm run build
npm run preview
```

### **Backend (Railway/Render)**
```bash
npm run build
npm run start
```

### **Database (Supabase/PlanetScale)**
```bash
npx prisma migrate deploy
npx prisma generate
```

## 🔮 **Roadmap Futuro**

### **Q1 2025**
- [ ] 📱 **PWA Completo** - App instalável
- [ ] 📊 **Dashboard Analytics** - Métricas de uso
- [ ] 🎨 **Temas Customizáveis** - Dark/Light modes
- [ ] 🌍 **Internacionalização** (PT/EN/ES)

### **Q2 2025**
- [ ] 📝 **Blog Integrado** - Headless CMS
- [ ] 👤 **Perfil Avançado** - Upload de foto, edição
- [ ] 💎 **Features Premium** - Relatórios PDF
- [ ] 🔄 **Sinastria Persistente** - Salvar no perfil

### **Q3 2025**
- [ ] 🤖 **AI Assistant** - Interpretações personalizadas
- [ ] 📅 **Calendário Cósmico** - Eventos astronômicos
- [ ] 🎯 **Recomendações** - Conteúdo personalizado
- [ ] 💬 **Chat Comunitário** - Fórum de usuários

## 🤝 **Contribuindo**

Contribuições são sempre bem-vindas! Veja nosso [Guia de Contribuição](CONTRIBUTING.md).

### **Como Contribuir**
1. 🍴 Fork o projeto
2. 🌿 Crie uma branch (`git checkout -b feature/AmazingFeature`)
3. 📝 Commit suas mudanças (`git commit -m 'Add some AmazingFeature'`)
4. 📤 Push para a branch (`git push origin feature/AmazingFeature`)
5. 🔄 Abra um Pull Request

### **Tipos de Contribuição**
- 🐛 **Bug Reports** - Relate problemas encontrados
- ✨ **Feature Requests** - Sugira novas funcionalidades
- 📖 **Documentação** - Melhore a documentação
- 🎨 **UI/UX** - Aprimore a interface
- 🧮 **Cálculos** - Ajude com a precisão dos algoritmos

## 📄 **Licença**

Este projeto está sob a licença **MIT**. Veja o arquivo [LICENSE](LICENSE) para mais detalhes.

## 👨‍💻 **Autor**

**Italo Santos**
- 🌐 GitHub: [@Italo889](https://github.com/Italo889)
- 📧 Email: [contato@arcano.com](mailto:contato@arcano.com)
- 💼 LinkedIn: [/in/italo-santos](https://linkedin.com/in/italo-santos)

## 🙏 **Agradecimentos**

- 🌟 **Swiss Ephemeris** pela precisão astronômica
- 🎨 **Lucide Icons** pelos ícones premium
- 🎭 **Framer Motion** pelas animações fluidas
- 🎯 **Vercel** pela hospedagem
- 🌙 Toda a comunidade **Open Source**

---

<div align="center">

**✨ Feito com muito carinho e um pouco de magia ✨**

[![Estrelas](https://img.shields.io/github/stars/Italo889/astro-platform?style=social)](https://github.com/Italo889/astro-platform/stargazers)
[![Forks](https://img.shields.io/github/forks/Italo889/astro-platform?style=social)](https://github.com/Italo889/astro-platform/network/members)
[![Issues](https://img.shields.io/github/issues/Italo889/astro-platform)](https://github.com/Italo889/astro-platform/issues)

</div>