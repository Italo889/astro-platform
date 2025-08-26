# 🔮 Arcano Platform

**Autoconhecimento através da astrologia e tarô.**

O Arcano é uma aplicação web moderna e interativa, projetada para ser uma ferramenta de autodescoberta. Unindo a sabedoria ancestral da astrologia e do tarô com uma experiência de usuário mágica e refinada, a plataforma oferece cálculos personalizados e conteúdo educativo para guiar os usuários em sua jornada pessoal.

A filosofia do projeto é fugir dos estereótipos, apresentando informações de forma clara, construtiva e empoderadora. O Arcano funciona tanto como um **Oráculo** (ferramenta de cálculo) quanto como uma **Escola** (plataforma educacional), com uma base técnica sólida e uma visão de longo prazo.

## ✨ Funcionalidades Implementadas (MVP)

-   **Fluxo de Autenticação Completo:**
    -   [x] Registro e Login de usuários via API segura (Fastify + Prisma).
    -   [x] Criptografia de senhas (`bcryptjs`).
    -   [x] Autenticação baseada em Token **JWT**.
    -   [x] Estado de login persistente no front-end com **Zustand** e `localStorage`.
    -   [x] Rotas protegidas para áreas exclusivas de membros.

-   **Relatório Pessoal Dinâmico:**
    -   [x] Cálculo do Signo Solar (à prova de fuso horário).
    -   [x] Cálculo do Arcano de Vida (data de nascimento) e Destino (nome completo).
    -   [x] Geração de relatório dinâmico para usuários logados (salvo no banco) e anônimos (sessão única).
    -   [x] Página de resultados dedicada e com navegação por ID.

-   **Sinastria (Análise de Conexão):**
    -   [x] "Portal" de acesso exclusivo para membros (`FeatureGate`).
    -   [x] Formulário para entrada de dados de duas pessoas.
    -   [x] Motor de cálculo no back-end com **Matriz de Compatibilidade Arquetípica** (mais de 250 combinações).
    -   [x] Geração de um relatório de sinastria dinâmico.

-   **Dashboard do Usuário:**
    -   [x] "Santuário Pessoal" para usuários logados.
    -   [x] Exibição dos arquétipos principais (Signo e Arcano de Vida).
    -   [x] Lista de relatórios recentes, buscando dados reais da API com **React Query**.
    -   [x] "Portais de Ação" para guiar o usuário.

-   **Experiência de Usuário (UI/UX) Refinada:**
    -   [x] **"Oráculo Digital Vivo"**: Interface com efeitos de Aurora (seguindo o mouse), Parallax (na rolagem) e animações sutis.
    -   [x] **Header "Etéreo"**: Design simétrico que se materializa com o scroll.
    -   [x] **Insight do Dia**: Ritual de revelação de uma carta diária, única por usuário e persistente por 24h.
    -   [x] **Cards Interativos**: Efeito "Arcano que se Revela" e 3D Tilt nos cards.
    -   [x] **Acessibilidade**: Foco em `labels` de formulário e estilos de foco (`focus-visible`) consistentes.

## 🛠️ Tech Stack

| Área | Tecnologia | Propósito |
| :--- | :--- | :--- |
| **Front-end** | React 19, Vite, TypeScript | Base da aplicação, componentização e tipagem. |
| | Tailwind CSS v4 | Estilização utilitária e design system (`@theme`). |
| | Framer Motion | Animações complexas e transições de página. |
| | Zustand | Gerenciamento de estado global (Auth, Reports, UI). |
| | React Router DOM | Roteamento de páginas. |
| | TanStack Query | Fetching, cache e sincronização de dados da API. |
| **Back-end** | Node.js, Fastify, TypeScript | Servidor de API performático e tipado. |
| | Prisma ORM | Comunicação com o banco de dados e modelagem de dados. |
| | BullMQ + Redis | Fila para processamento de tarefas em segundo plano (futuro). |
| | JWT, BcryptJS | Autenticação e segurança. |

## 📂 Arquitetura do Projeto

O projeto é um monorepo (ou dois repositórios separados) com uma clara separação entre front-end e back-end. A arquitetura interna de cada um segue os princípios de separação de responsabilidades.

*(Esta é uma visão simplificada da estrutura que criamos)*
```
/
├── frontend/
│   ├── src/
│   │   ├── components/ (ui, layout, features, sections, cards)
│   │   ├── domain/ (types.ts)
│   │   ├── hooks/ (useCalculatorForm, etc.)
│   │   ├── pages/ (LandingPage, ReportPage, DashboardPage, etc.)
│   │   ├── services/ (authService, reportService, etc.)
│   │   └── store/ (zustand stores)
│
└── backend/
    ├── prisma/ (schema.prisma, migrations)
    └── src/
        ├── domain/ (types.ts, lib/ com a lógica de cálculo)
        ├── engine.ts (Orquestrador dos cálculos)
        ├── plugins/ (authPlugin.ts)
        ├── routes/ (userRoutes, reportRoutes, etc.)
        └── app.ts (Servidor Fastify)
```

## 🚀 Como Executar o Projeto (Ambiente de Desenvolvimento)

**Pré-requisitos:**
* Node.js (versão 18 ou superior)
* Um banco de dados PostgreSQL (ou outro compatível com Prisma) rodando.

### 1. Configuração do Back-end
```bash
# Navegue até a pasta do back-end
cd backend

# Instale as dependências
npm install

# Crie um arquivo .env a partir do .env.example e configure sua DATABASE_URL e JWT_SECRET
cp .env.example .env

# Execute as migrações do banco de dados
npx prisma migrate dev

# Inicie o servidor de desenvolvimento
npm run dev
```
O back-end estará rodando em `http://localhost:3333`.

### 2. Configuração do Front-end
```bash
# Em um NOVO terminal, navegue até a pasta do front-end
cd frontend

# Instale as dependências
npm install

# Inicie o servidor de desenvolvimento
npm run dev
```
O front-end estará rodando em `http://localhost:5173`.

## 🌐 Resumo da API

| Método | Rota | Protegida? | Descrição |
| :--- | :--- | :--- | :--- |
| `POST` | `/users/register` | Não | Registra um novo usuário. |
| `POST` | `/users/login` | Não | Autentica um usuário e retorna um token JWT. |
| `POST` | `/calculate/personal`| Não | Calcula um relatório pessoal sem salvar. |
| `POST` | `/calculate/synastry`| Não | Calcula um relatório de sinastria sem salvar. |
| `POST` | `/reports` | Sim | Salva um relatório pessoal no perfil do usuário. |
| `GET` | `/reports` | Sim | Lista os relatórios salvos do usuário. |
| `GET` | `/reports/:id` | Sim | Busca um relatório específico pelo ID. |
| `POST` | `/newsletter/subscribe` | Não | Inscreve um e-mail na newsletter. |

## 🔭 Visão Futura

-   **Refinamento Mobile:** Passagem final de polimento em todas as páginas para garantir uma experiência mobile impecável.
-   **Blog:** Integração com um Headless CMS para gerenciamento de conteúdo.
-   **Perfil do Usuário:** Página para o usuário editar seus dados e adicionar foto.
-   **Persistência da Sinastria:** Salvar os relatórios de sinastria no perfil do usuário.
-   **Recursos Premium:** Exportação de relatórios em PDF, análises de relacionamento por contexto (amor, amizade, trabalho).
-   **App Mobile:** Evolução da aplicação web para um PWA (Progressive Web App) instalável.