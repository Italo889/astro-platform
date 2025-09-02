# 📝 BLOG MVP IMPLEMENTATION PLAN
## Arcano Platform Blog System

### FASE 1: MVP Core (2-3 semanas)
**Objetivo**: Blog funcional apenas para Owner postar

#### Frontend Components Needed:
```
src/pages/
├── BlogPage.tsx              # Lista de posts
├── BlogPostPage.tsx          # Post individual
└── BlogAdminPage.tsx         # Admin para criar posts

src/components/blog/
├── PostCard.tsx              # Card do post na listagem
├── PostContent.tsx           # Renderizador de markdown
├── CategoryFilter.tsx        # Filtro por categoria
├── PostEditor.tsx            # Editor markdown
└── PostMetrics.tsx           # Views, likes (futuro)
```

#### Backend Routes Needed:
```
/api/blog/posts              # GET: listar posts públicos
/api/blog/posts/:slug        # GET: post específico
/api/blog/posts              # POST: criar post (owner only)
/api/blog/posts/:id          # PUT: editar post (owner only)
/api/blog/posts/:id          # DELETE: deletar post (owner only)
/api/blog/categories         # GET: listar categorias
```

#### Features MVP:
- ✅ Listagem de posts com paginação
- ✅ Post individual com markdown
- ✅ Filtro por categoria
- ✅ SEO básico (meta tags)
- ✅ Editor markdown simples
- ✅ Upload de imagem featured

#### Database MVP:
- Apenas tabelas: `posts`, `categories`
- Status simples: `draft`, `published`
- Autor fixo (owner)

---

### FASE 2: Multi-Author + Approval (1-2 meses)
**Objetivo**: Sistema de permissões e aprovação

#### Features Fase 2:
- ✅ Sistema RBAC completo
- ✅ Workflow de aprovação
- ✅ Dashboard para moderadores
- ✅ Notificações de posts pendentes
- ✅ Histórico de alterações

#### New Components:
```
src/components/blog/admin/
├── PostApproval.tsx         # Lista posts pendentes
├── UserRoleManager.tsx      # Gerenciar roles dos users
├── PostWorkflow.tsx         # Workflow visual
└── ApprovalNotifications.tsx # Notifs de aprovação
```

---

### FASE 3: Engagement & Community (3+ meses)
**Objetivo**: Interação e comunidade

#### Features Fase 3:
- ✅ Sistema de comentários
- ✅ Likes e reactions
- ✅ Analytics de posts
- ✅ Newsletter integration
- ✅ SEO avançado
- ✅ Compartilhamento social
- ✅ Related posts
- ✅ Search functionality

---

### INTEGRATION POINTS com Arcano Platform:

#### 1. **Cross-Promotion**:
```typescript
// Após gerar relatório, sugerir artigos relacionados
if (report.astrology.sun.sign === 'Áries') {
  suggestBlogPosts(['astrologia'], ['aries', 'fogo']);
}
```

#### 2. **Content-Based Features**:
- Posts automáticos sobre insights diários
- Artigos gerados baseados em dados dos usuários
- Tutoriais contextuais na plataforma

#### 3. **User Journey Integration**:
- Links para blog em pontos estratégicos
- CTA em relatórios para "saber mais"
- Newsletter com posts + insights

#### 4. **SEO Strategy**:
- Cada post = nova página indexável
- Long-tail keywords astrológicos
- Internal linking para features da plataforma

---

### TECH STACK SUGERIDA:

#### Frontend:
- **Editor**: `@toast-ui/react-editor` ou `react-markdown-editor`
- **Markdown Parser**: `react-markdown` + `remark-gfm`
- **Syntax Highlighting**: `prism-react-renderer`
- **Image Upload**: Integração com Cloudinary/ImageKit

#### Backend:
- **File Upload**: `@fastify/multipart`
- **Markdown Processing**: `marked` ou `remark`
- **Slug Generation**: `slugify`
- **SEO**: `helmet` para meta tags

#### Performance:
- **Cache**: Redis para posts populares
- **CDN**: Para imagens e assets
- **Pagination**: Cursor-based para performance
- **Search**: PostgreSQL Full-Text Search inicialmente

---

### CONTENT STRATEGY:

#### Posts de Lançamento:
1. "Como interpretar sua Lua em diferentes signos"
2. "Numerologia para iniciantes: entenda seus números"
3. "5 spreads de tarot para autoconhecimento"
4. "Como usar a plataforma Arcano: guia completo"
5. "A importância das casas astrológicas no seu mapa"

#### Frequência Sugerida:
- **MVP**: 2-3 posts/semana (você)
- **Fase 2**: 5-7 posts/semana (múltiplos autores)
- **Fase 3**: Daily content + comunidade ativa

---

### METRICS & ANALYTICS:

#### KPIs Importantes:
- **Traffic**: Sessions, page views, bounce rate
- **Engagement**: Time on page, comments, shares
- **Conversion**: Blog → Platform signup
- **SEO**: Organic traffic growth, keyword rankings
- **Community**: Active authors, approved vs rejected posts

#### Analytics Implementation:
- Google Analytics 4 integração
- Custom events para conversões
- Dashboard interno com métricas
- A/B testing para CTAs
