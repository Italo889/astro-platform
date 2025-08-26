# 🔮 Arcano Platform

**Autoconhecimento através da astrologia e tarô.**

O Arcano Platform é uma aplicação web moderna e interativa, projetada para ser uma ferramenta de autodescoberta. Unindo a sabedoria ancestral da astrologia e do tarô com uma experiência de usuário mágica e refinada, a plataforma oferece cálculos personalizados e conteúdo educativo para guiar os usuários em sua jornada pessoal.

Nossa filosofia é fugir dos estereótipos, apresentando informações de forma clara, construtiva e empoderadora, com uma base técnica sólida e uma visão de longo prazo.

## ✨ Funcionalidades Atuais (Client-Side)

- **Landing Page Completa e Interativa:**
  - Efeitos visuais avançados como Aurora, Parallax e Gradientes Animados.
  - Header "Etéreo" que reage à rolagem e com layout simétrico.
  - Componentes com micro-interações refinadas (3D Tilt, etc.).
- **Relatório Pessoal Dinâmico:**
  - Cálculo do Arcano Pessoal (Caminho de Vida) e Arcano de Destino (Nome).
  - Cálculo do Signo Solar.
  - Fluxo completo: da entrada de dados na Landing Page à exibição em uma página de resultados dedicada.
- **Relatório de Sinastria (Compatibilidade):**
  - Formulário para entrada de dados de duas pessoas.
  - Geração de um relatório de conexão com análise Astrológica e Arquetípica (Tarô).
  - Score de Harmonia e interpretações detalhadas.
- **Insight do Dia:**
  - Um ritual interativo de revelação de uma carta diária, única para cada usuário e persistente por 24 horas.
- **Arquitetura Robusta:**
  - Gerenciamento de estado global com Zustand (com persistência em `localStorage`).
  - Roteamento de páginas com `react-router-dom`.
  - Domínio lógico desacoplado da UI.

## 🛠️ Tech Stack

- **Framework:** React 19 com Vite
- **Linguagem:** TypeScript
- **Estilização:** Tailwind CSS v4 (abordagem CSS-first com `@theme`)
- **Animações:** Framer Motion
- **Gerenciamento de Estado:** Zustand
- **Roteamento:** React Router DOM

## 📂 Estrutura do Projeto

O projeto segue uma arquitetura pensada para escalabilidade, separando responsabilidades:

```
/src
|-- /components
|   |-- /ui          (Componentes de UI base: Button, LogoSymbol)
|   |-- /layout      (Estrutura principal: Header, Footer)
|   |-- /features    (Componentes de funcionalidades: ReportHeader, AspectCard)
|   |-- /cards       (Cards especializados: ResultCard)
|   |-- /sections    (Grandes seções de páginas: Hero, CalculatorSection)
|
|-- /domain
|   |-- /lib         (Lógica pura: arcana.ts, astro.ts, numerology.ts)
|   |-- types.ts     (Contratos e tipos centrais da aplicação)
|
|-- /hooks           (Hooks customizados: useCalculatorForm, useSynastryForm)
|-- /pages           (Componentes de página/rota)
|-- /store           (Stores do Zustand para estado global)
|-- /styles          (CSS Global e animações)
|
|-- engine.ts        (O orquestrador dos cálculos)
|-- main.tsx         (Ponto de entrada e configuração do roteador)
```

## 🚀 Como Executar

1. **Clone o repositório:**
   ```bash
   git clone [URL_DO_SEU_REPOSITORIO]
   ```
2. **Instale as dependências:**
   ```bash
   npm install
   ```
3. **Execute o servidor de desenvolvimento:**
   ```bash
   npm run dev
   ```
4. Abra [http://localhost:5173](http://localhost:5173) (ou a porta indicada) no seu navegador.

### Scripts Disponíveis

- `npm run dev`: Inicia o servidor de desenvolvimento.
- `npm run build`: Gera a build de produção otimizada na pasta `/dist`.
- `npm run preview`: Inicia um servidor local para testar a build de produção.
- `npm run lint`: Executa o linter para verificar a qualidade do código.