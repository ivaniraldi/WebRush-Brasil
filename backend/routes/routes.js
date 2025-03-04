const express = require("express");
const pool = require("../db/db");
require("dotenv").config();

const router = express.Router();

const nodemailer = require("nodemailer");
const { generateToken } = require("../middlewares/auth");

const transporter = nodemailer.createTransport({
  host: "smtp.zoho.com",
  port: 465,
  secure: true,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

// --- Endpoints de Contactos --- (Ya implementados, sin cambios)

// POST /api/contacts
router.post("/contacts", async (req, res) => {
  const { name, email, message } = req.body;
  if (!name || !email || !message) {
    return res.status(400).json({ error: "Faltan datos requeridos: name, email o message" });
  }
  if (!/^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/.test(email)) {
    return res.status(400).json({ error: "Email inválido" });
  }
  if (name.length > 100 || message.length > 1000) {
    return res.status(400).json({ error: "Nombre o mensaje demasiado largo" });
  }
  try {
    const result = await pool.query(
      "INSERT INTO contacts (name, email, message) VALUES ($1, $2, $3) RETURNING *",
      [name, email, message]
    );
    const mailOptions = {
      from: "contato@webrushbrasil.com.br",
      to: "contato@webrushbrasil.com.br",
      subject: `Novo contato de ${name}`,
      text: `
📩 Novo contato recebido!
Nome: ${name}
Email: ${email}
📬 Mensagem:
${message}
-------------------------
🌐 WebRush Brasil
🚀 Desenvolvimento Web a Baixo Custo
      `,
    };
    await transporter.sendMail(mailOptions);
    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error("Error al procesar contacto:", err.stack);
    res.status(500).json({ error: "No se pudo procesar el contacto" });
  }
});

// GET /api/contacts
router.get("/contacts", async (req, res) => {
  const { limit = 10, offset = 0 } = req.query;
  try {
    const result = await pool.query(
      "SELECT * FROM contacts ORDER BY created_at DESC LIMIT $1 OFFSET $2",
      [parseInt(limit), parseInt(offset)]
    );
    res.json(result.rows);
  } catch (err) {
    console.error("Error al obtener contactos:", err.stack);
    res.status(500).json({ error: "Error al obtener contactos" });
  }
});

// --- Endpoints del Blog ---

// GET /api/blog (Ya implementado)
router.get("/blog", async (req, res) => {
  const { limit = 10, offset = 0 } = req.query;
  try {
    const result = await pool.query(
      "SELECT * FROM blog_posts WHERE published = true ORDER BY created_at DESC LIMIT $1 OFFSET $2",
      [parseInt(limit), parseInt(offset)]
    );
    res.json(result.rows);
  } catch (err) {
    console.error("Error al obtener posts:", err.stack);
    res.status(500).json({ error: "Error al obtener posts" });
  }
});

// GET /api/blog/:id (Ya implementado)
router.get("/blog/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const result = await pool.query(
      "SELECT * FROM blog_posts WHERE id = $1 AND published = true",
      [id]
    );
    if (result.rows.length === 0) {
      return res.status(404).json({ error: "Post no encontrado" });
    }
    res.json(result.rows[0]);
  } catch (err) {
    console.error("Error al obtener post:", err.stack);
    res.status(500).json({ error: "Error al obtener el post" });
  }
});

// GET /api/blog/:slug (Ya implementado)
router.get("/blog/:slug", async (req, res) => {
  const { slug } = req.params;
  try {
    const result = await pool.query(
      "SELECT * FROM blog_posts WHERE slug = $1 AND published = true",
      [slug]
    );
    if (result.rows.length === 0) {
      return res.status(404).json({ error: "Post no encontrado" });
    }
    res.json(result.rows[0]);
  } catch (err) {
    console.error("Error al obtener post:", err.stack);
    res.status(500).json({ error: "Error al obtener el post" });
  }
});

// POST /api/blog (Ya implementado)
router.post("/blog", async (req, res) => {
  const { title, slug, content, image_url } = req.body;
  if (!title || !slug || !content) {
    return res.status(400).json({ error: "Faltan datos requeridos: title, slug o content" });
  }
  if (title.length > 200 || slug.length > 200) {
    return res.status(400).json({ error: "Título o slug demasiado largo" });
  }
  try {
    const checkSlug = await pool.query("SELECT 1 FROM blog_posts WHERE slug = $1", [slug]);
    if (checkSlug.rows.length > 0) {
      return res.status(400).json({ error: "Slug ya existe" });
    }
    const result = await pool.query(
      "INSERT INTO blog_posts (title, slug, content, image_url) VALUES ($1, $2, $3, $4) RETURNING *",
      [title, slug, content, image_url || null]
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error("Error al crear post:", err.stack);
    res.status(500).json({ error: "No se pudo crear el post" });
  }
});

// PUT /api/blog/:id - Actualizar un post
router.put("/blog/:id", async (req, res) => {
  const { id } = req.params;
  console.log(id)
  const { title, slug, content, image_url, published } = req.body;

  if (!title || !slug || !content) {
    return res.status(400).json({ error: "Faltan datos requeridos: title, slug o content" });
  }
  if (title.length > 200 || slug.length > 200) {
    return res.status(400).json({ error: "Título o slug demasiado largo" });
  }

  try {
    const checkSlug = await pool.query(
      "SELECT 1 FROM blog_posts WHERE slug = $1 AND id != $2",
      [slug, id]
    );
    if (checkSlug.rows.length > 0) {
      return res.status(400).json({ error: "Slug ya existe" });
    }

    const result = await pool.query(
      "UPDATE blog_posts SET title = $1, slug = $2, content = $3, image_url = $4, published = $5, updated_at = CURRENT_TIMESTAMP WHERE id = $6 RETURNING *",
      [title, slug, content, image_url || null, published ?? true, id]
    );
    if (result.rows.length === 0) {
      return res.status(404).json({ error: "Post no encontrado" });
    }
    res.json(result.rows[0]);
  } catch (err) {
    console.error("Error al actualizar post:", err.stack);
    res.status(500).json({ error: "Error al actualizar el post" });
  }
});

// DELETE /api/blog/:id - Eliminar un post
router.delete("/blog/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const result = await pool.query(
      "DELETE FROM blog_posts WHERE id = $1 RETURNING *",
      [id]
    );
    if (result.rows.length === 0) {
      return res.status(404).json({ error: "Post no encontrado" });
    }
    res.json({ message: "Post eliminado exitosamente" });
  } catch (err) {
    console.error("Error al eliminar post:", err.stack);
    res.status(500).json({ error: "Error al eliminar el post" });
  }
});

// --- Endpoints del Portafolio ---

// GET /api/portfolio (Ya implementado)
router.get("/portfolio", async (req, res) => {
  const { limit = 10, offset = 0 } = req.query;
  try {
    const result = await pool.query(
      "SELECT * FROM portfolio_projects ORDER BY created_at DESC LIMIT $1 OFFSET $2",
      [parseInt(limit), parseInt(offset)]
    );
    res.json(result.rows);
  } catch (err) {
    console.error("Error al obtener proyectos:", err.stack);
    res.status(500).json({ error: "Error al obtener proyectos" });
  }
});

// GET /api/portfolio/:id (Ya implementado)
router.get("/portfolio/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const result = await pool.query(
      "SELECT * FROM portfolio_projects WHERE id = $1",
      [id]
    );
    if (result.rows.length === 0) {
      return res.status(404).json({ error: "Proyecto no encontrado" });
    }
    res.json(result.rows[0]);
  } catch (err) {
    console.error("Error al obtener proyecto:", err.stack);
    res.status(500).json({ error: "Error al obtener el proyecto" });
  }
});

// POST /api/portfolio - Crear un nuevo proyecto
router.post("/portfolio", async (req, res) => {
  const { title, description, image_url, project_url } = req.body;

  if (!title || !description) {
    return res.status(400).json({ error: "Faltan datos requeridos: title o description" });
  }
  if (title.length > 100) {
    return res.status(400).json({ error: "Título demasiado largo" });
  }

  try {
    const result = await pool.query(
      "INSERT INTO portfolio_projects (title, description, image_url, project_url) VALUES ($1, $2, $3, $4) RETURNING *",
      [title, description, image_url || null, project_url || null]
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error("Error al crear proyecto:", err.stack);
    res.status(500).json({ error: "No se pudo crear el proyecto" });
  }
});

// PUT /api/portfolio/:id - Actualizar un proyecto
router.put("/portfolio/:id", async (req, res) => {
  const { id } = req.params;
  const { title, description, image_url, project_url } = req.body;

  if (!title || !description) {
    return res.status(400).json({ error: "Faltan datos requeridos: title o description" });
  }
  if (title.length > 100) {
    return res.status(400).json({ error: "Título demasiado largo" });
  }

  try {
    const result = await pool.query(
      "UPDATE portfolio_projects SET title = $1, description = $2, image_url = $3, project_url = $4, created_at = CURRENT_TIMESTAMP WHERE id = $5 RETURNING *",
      [title, description, image_url || null, project_url || null, id]
    );
    if (result.rows.length === 0) {
      return res.status(404).json({ error: "Proyecto no encontrado" });
    }
    res.json(result.rows[0]);
  } catch (err) {
    console.error("Error al actualizar proyecto:", err.stack);
    res.status(500).json({ error: "Error al actualizar el proyecto" });
  }
});

// DELETE /api/portfolio/:id - Eliminar un proyecto
router.delete("/portfolio/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const result = await pool.query(
      "DELETE FROM portfolio_projects WHERE id = $1 RETURNING *",
      [id]
    );
    if (result.rows.length === 0) {
      return res.status(404).json({ error: "Proyecto no encontrado" });
    }
    res.json({ message: "Proyecto eliminado exitosamente" });
  } catch (err) {
    console.error("Error al eliminar proyecto:", err.stack);
    res.status(500).json({ error: "Error al eliminar el proyecto" });
  }
});

// --- Endpoints de Servicios ---

// GET /api/services (Ya implementado)
router.get("/services", async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM services ORDER BY created_at ASC");
    res.json(result.rows);
  } catch (err) {
    console.error("Error al obtener servicios:", err.stack);
    res.status(500).json({ error: "Error al obtener servicios" });
  }
});

// GET /api/services/:id (Ya implementado)
router.get("/services/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const result = await pool.query("SELECT * FROM services WHERE id = $1", [id]);
    if (result.rows.length === 0) {
      return res.status(404).json({ error: "Servicio no encontrado" });
    }
    res.json(result.rows[0]);
  } catch (err) {
    console.error("Error al obtener servicio:", err.stack);
    res.status(500).json({ error: "Error al obtener el servicio" });
  }
});

// POST /api/services - Crear un nuevo servicio
router.post("/services", async (req, res) => {
  const { name, description, price } = req.body;

  if (!name || !description || price === undefined) {
    return res.status(400).json({ error: "Faltan datos requeridos: name, description o price" });
  }
  if (name.length > 100) {
    return res.status(400).json({ error: "Nombre demasiado largo" });
  }
  if (price < 0) {
    return res.status(400).json({ error: "El precio no puede ser negativo" });
  }

  try {
    const result = await pool.query(
      "INSERT INTO services (name, description, price) VALUES ($1, $2, $3) RETURNING *",
      [name, description, price]
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error("Error al crear servicio:", err.stack);
    res.status(500).json({ error: "No se pudo crear el servicio" });
  }
});

// PUT /api/services/:id - Actualizar un servicio
router.put("/services/:id", async (req, res) => {
  const { id } = req.params;
  const { name, description, price } = req.body;

  if (!name || !description || price === undefined) {
    return res.status(400).json({ error: "Faltan datos requeridos: name, description o price" });
  }
  if (name.length > 100) {
    return res.status(400).json({ error: "Nombre demasiado largo" });
  }
  if (price < 0) {
    return res.status(400).json({ error: "El precio no puede ser negativo" });
  }

  try {
    const result = await pool.query(
      "UPDATE services SET name = $1, description = $2, price = $3, created_at = CURRENT_TIMESTAMP WHERE id = $4 RETURNING *",
      [name, description, price, id]
    );
    if (result.rows.length === 0) {
      return res.status(404).json({ error: "Servicio no encontrado" });
    }
    res.json(result.rows[0]);
  } catch (err) {
    console.error("Error al actualizar servicio:", err.stack);
    res.status(500).json({ error: "Error al actualizar el servicio" });
  }
});

// DELETE /api/services/:id - Eliminar un servicio
router.delete("/services/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const result = await pool.query(
      "DELETE FROM services WHERE id = $1 RETURNING *",
      [id]
    );
    if (result.rows.length === 0) {
      return res.status(404).json({ error: "Servicio no encontrado" });
    }
    res.json({ message: "Servicio eliminado exitosamente" });
  } catch (err) {
    console.error("Error al eliminar servicio:", err.stack);
    res.status(500).json({ error: "Error al eliminar el servicio" });
  }
});

// --- Endpoint de Login --- (Ya implementado, sin cambios)
router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ error: "Faltan email o contraseña" });
  }
  try {
    const admin = { email: "iraldiban@gmail.com", password: "iraldi11" };
    if (!admin || admin.password !== password) {
      return res.status(401).json({ error: "Credenciales inválidas" });
    }
    const token = generateToken(admin);
    res.json({ token });
  } catch (err) {
    console.error("Error al iniciar sesión:", err.stack);
    res.status(500).json({ error: "Error al iniciar sesión" });
  }
});

module.exports = router;