-- Habilitar extensión para UUID 
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Tabla: Contactos (mensajes del formulario de contacto)
CREATE TABLE contacts (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name VARCHAR(100) NOT NULL,
    email VARCHAR(100) NOT NULL CHECK (email ~* '^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$'),
    message TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    responded BOOLEAN DEFAULT FALSE
);

-- Índice para búsqueda rápida por email y fecha
CREATE INDEX idx_contacts_email ON contacts(email);
CREATE INDEX idx_contacts_created_at ON contacts(created_at);

-- Tabla: Posts del blog
CREATE TABLE blog_posts (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    title VARCHAR(200) NOT NULL,
    slug VARCHAR(200) UNIQUE NOT NULL, -- Para URLs amigables
    content TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    published BOOLEAN DEFAULT TRUE
);

-- Índice para búsqueda por slug y fecha
CREATE INDEX idx_blog_posts_slug ON blog_posts(slug);
CREATE INDEX idx_blog_posts_created_at ON blog_posts(created_at);

-- Tabla: Proyectos del portafolio
CREATE TABLE portfolio_projects (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    title VARCHAR(100) NOT NULL,
    description TEXT NOT NULL,
    image_url VARCHAR(255), -- URL de la imagen del proyecto
    project_url VARCHAR(255), -- URL del sitio en vivo (opcional)
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Índice para búsqueda por título
CREATE INDEX idx_portfolio_projects_title ON portfolio_projects(title);

-- Tabla: Servicios (paquetes ofrecidos)
CREATE TABLE services (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name VARCHAR(100) NOT NULL,
    description TEXT NOT NULL,
    price DECIMAL(10, 2) NOT NULL CHECK (price >= 0), -- Precio en reales (R$)
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Índice para búsqueda por nombre
CREATE INDEX idx_services_name ON services(name);

-- Inserción de datos iniciales de ejemplo

-- Ejemplo de contactos
INSERT INTO contacts (name, email, message) VALUES
    ('João Silva', 'joao.silva@email.com', 'Quero um site para minha loja de roupas, quanto custa?'),
    ('Maria Oliveira', 'maria.oli@email.com', 'Preciso de uma landing page urgente!');

-- Ejemplo de posts del blog
INSERT INTO blog_posts (title, slug, content) VALUES
    ('Por que seu negócio precisa de um site em 2025?', 'por-que-seu-negocio-precisa-de-um-site', 'Ter um site é essencial para alcançar mais clientes e aumentar suas vendas. Neste artigo, explico os benefícios...'),
    ('Como atrair clientes com uma página web?', 'como-atrair-clientes-com-site', 'Dicas práticas para usar seu site como ferramenta de marketing e conquistar mais leads...');

-- Ejemplo de proyectos del portafolio
INSERT INTO portfolio_projects (title, description, image_url, project_url) VALUES
    ('Site para Restaurante Sabor Carioca', 'Landing page para um restaurante com cardápio online e reservas.', 'https://example.com/images/sabor-carioca.jpg', 'https://saborcarioca.com'),
    ('E-commerce Loja Trends', 'Loja online básica para venda de acessórios.', 'https://example.com/images/trends.jpg', 'https://lojatrends.com');

-- Ejemplo de servicios
INSERT INTO services (name, description, price) VALUES
    ('Básico', 'Landing page responsiva com design moderno e SEO básico.', 500.00),
    ('Intermediário', 'Site dinâmico com blog ou galería, ideal para profissionais.', 800.00),
    ('Completo', 'E-commerce ou site com funcionalidades avançadas.', 1200.00);

-- Comentarios para futuras mejoras
-- Agregar tabla 'users' si quiero autenticación para administrar el sitio.
-- Agregar tabla 'orders' si implemento un sistema de pedidos/pagos.

-- Verificación de las tablas creadas
SELECT 'Tablas creadas exitosamente:' AS message;
SELECT * FROM contacts LIMIT 2;
SELECT * FROM blog_posts LIMIT 2;
SELECT * FROM portfolio_projects LIMIT 2;
SELECT * FROM services LIMIT 3;