-- 📝 BLOG SYSTEM SCHEMA PROPOSAL
-- Estrutura otimizada para o Arcano Platform Blog

-- 1. ROLES & PERMISSIONS (RBAC)
CREATE TABLE roles (
  id SERIAL PRIMARY KEY,
  name VARCHAR(50) UNIQUE NOT NULL, -- 'owner', 'admin', 'moderator', 'author', 'reader'
  description TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE permissions (
  id SERIAL PRIMARY KEY,
  name VARCHAR(100) UNIQUE NOT NULL, -- 'posts:create', 'posts:edit:any', 'posts:approve', etc
  resource VARCHAR(50) NOT NULL, -- 'posts', 'comments', 'categories'
  action VARCHAR(50) NOT NULL, -- 'create', 'read', 'update', 'delete', 'approve'
  scope VARCHAR(50) DEFAULT 'own' -- 'own', 'any', 'pending'
);

CREATE TABLE role_permissions (
  id SERIAL PRIMARY KEY,
  role_id INTEGER REFERENCES roles(id) ON DELETE CASCADE,
  permission_id INTEGER REFERENCES permissions(id) ON DELETE CASCADE,
  UNIQUE(role_id, permission_id)
);

-- 2. BLOG CONTENT STRUCTURE
CREATE TABLE categories (
  id SERIAL PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  slug VARCHAR(100) UNIQUE NOT NULL,
  description TEXT,
  color VARCHAR(7), -- hex color for UI
  icon VARCHAR(50), -- lucide icon name
  parent_id INTEGER REFERENCES categories(id), -- for subcategories
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE posts (
  id SERIAL PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  slug VARCHAR(255) UNIQUE NOT NULL,
  summary TEXT, -- teaser/excerpt
  content TEXT NOT NULL, -- markdown content
  featured_image VARCHAR(500), -- URL to image
  author_id INTEGER REFERENCES users(id) ON DELETE SET NULL,
  category_id INTEGER REFERENCES categories(id) ON DELETE SET NULL,
  
  -- STATUS WORKFLOW
  status VARCHAR(20) DEFAULT 'draft', -- 'draft', 'pending', 'approved', 'published', 'rejected'
  published_at TIMESTAMP,
  approved_by INTEGER REFERENCES users(id) ON DELETE SET NULL,
  approved_at TIMESTAMP,
  rejection_reason TEXT,
  
  -- SEO & METADATA
  meta_title VARCHAR(255),
  meta_description VARCHAR(500),
  tags TEXT[], -- array of tags
  reading_time INTEGER, -- estimated minutes
  
  -- ENGAGEMENT (futuro)
  views_count INTEGER DEFAULT 0,
  likes_count INTEGER DEFAULT 0,
  comments_count INTEGER DEFAULT 0,
  
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 3. ENGAGEMENT SYSTEM (Versão 2+)
CREATE TABLE post_views (
  id SERIAL PRIMARY KEY,
  post_id INTEGER REFERENCES posts(id) ON DELETE CASCADE,
  user_id INTEGER REFERENCES users(id) ON DELETE SET NULL, -- null for anonymous
  ip_address INET,
  user_agent TEXT,
  viewed_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE post_likes (
  id SERIAL PRIMARY KEY,
  post_id INTEGER REFERENCES posts(id) ON DELETE CASCADE,
  user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  UNIQUE(post_id, user_id)
);

-- 4. COMMENTS SYSTEM (Versão 3+)
CREATE TABLE comments (
  id SERIAL PRIMARY KEY,
  post_id INTEGER REFERENCES posts(id) ON DELETE CASCADE,
  parent_id INTEGER REFERENCES comments(id) ON DELETE CASCADE, -- for replies
  author_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
  content TEXT NOT NULL,
  status VARCHAR(20) DEFAULT 'pending', -- 'pending', 'approved', 'rejected', 'hidden'
  moderated_by INTEGER REFERENCES users(id) ON DELETE SET NULL,
  moderated_at TIMESTAMP,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 5. USEFUL INDEXES
CREATE INDEX idx_posts_status_published ON posts(status, published_at DESC);
CREATE INDEX idx_posts_category ON posts(category_id);
CREATE INDEX idx_posts_author ON posts(author_id);
CREATE INDEX idx_posts_slug ON posts(slug);
CREATE INDEX idx_comments_post ON comments(post_id);
CREATE INDEX idx_post_views_post_user ON post_views(post_id, user_id);

-- 6. SEED DATA EXAMPLES
INSERT INTO categories (name, slug, description, color, icon) VALUES
('Astrologia', 'astrologia', 'Artigos sobre signos, planetas e interpretações astrológicas', '#8b63e9', 'Stars'),
('Numerologia', 'numerologia', 'Estudos sobre números pessoais e suas influências', '#FFD700', 'Calculator'),
('Tarot', 'tarot', 'Interpretações e estudos sobre cartas do tarot', '#9333ea', 'Sparkles'),
('Tutoriais', 'tutoriais', 'Guias práticos para usar a plataforma', '#06b6d4', 'BookOpen'),
('Novidades', 'novidades', 'Updates e novidades da plataforma', '#10b981', 'Zap');

INSERT INTO roles (name, description) VALUES
('owner', 'Criador da plataforma - acesso total'),
('admin', 'Administrador - gerência completa do blog'),
('moderator', 'Moderador - aprovar e moderar conteúdo'),
('author', 'Autor - criar posts para aprovação'),
('reader', 'Leitor - acesso de leitura apenas');
