const express = require('express');
const pool = require('../db/db');

const router = express.Router();

const nodemailer = require('nodemailer');

// Configuración de Nodemailer (ejemplo con Gmail)
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'iraldiban@gmail.com', // Tu correo de empresa
    pass: 'ivaniraldi123123', // Usa una contraseña de aplicación si tienes 2FA activado
  },
});

// --- Endpoints de Contactos ---

// POST /api/contacts - Crear un nuevo contacto y enviar email
router.post('/contacts', async (req, res) => {
  const { name, email, message } = req.body;

  if (!name || !email || !message) {
    return res.status(400).json({ error: 'Faltan datos requeridos: name, email o message' });
  }
  if (!/^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/.test(email)) {
    return res.status(400).json({ error: 'Email inválido' });
  }
  if (name.length > 100 || message.length > 1000) {
    return res.status(400).json({ error: 'Nombre o mensaje demasiado largo' });
  }

  try {
    // Guardar en la base de datos
    const result = await pool.query(
      'INSERT INTO contacts (name, email, message) VALUES ($1, $2, $3) RETURNING *',
      [name, email, message]
    );

    // Configurar el correo
    const mailOptions = {
      from: 'tuemail@gmail.com',
      to: 'correo_empresa@dominio.com', // Correo de tu empresa
      subject: `Nuevo mensaje de ${name}`,
      text: `Nombre: ${name}\nEmail: ${email}\nMensaje: ${message}`,
    };

    // Enviar el correo
    await transporter.sendMail(mailOptions);

    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error('Error al procesar contacto:', err.stack);
    res.status(500).json({ error: 'No se pudo procesar el contacto' });
  }
});

// GET /api/contacts - Obtener todos los contactos (con autenticación)
router.get('/contacts', async (req, res) => {
  const { limit = 10, offset = 0 } = req.query;

  try {
    const result = await pool.query(
      'SELECT * FROM contacts ORDER BY created_at DESC LIMIT $1 OFFSET $2',
      [parseInt(limit), parseInt(offset)]
    );
    res.json(result.rows);
  } catch (err) {
    console.error('Error al obtener contactos:', err.stack);
    res.status(500).json({ error: 'Error al obtener contactos' });
  }
});

// --- Endpoints del Blog ---

// GET /api/blog - Obtener lista de posts (público)
router.get('/blog', async (req, res) => {
  const { limit = 10, offset = 0 } = req.query;

  try {
    const result = await pool.query(
      'SELECT * FROM blog_posts WHERE published = true ORDER BY created_at DESC LIMIT $1 OFFSET $2',
      [parseInt(limit), parseInt(offset)]
    );
    res.json(result.rows);
  } catch (err) {
    console.error('Error al obtener posts:', err.stack);
    res.status(500).json({ error: 'Error al obtener posts' });
  }
});

// GET /api/blog/:slug - Obtener un post por slug (público)
router.get('/blog/:slug', async (req, res) => {
  const { slug } = req.params;

  try {
    const result = await pool.query(
      'SELECT * FROM blog_posts WHERE slug = $1 AND published = true',
      [slug]
    );
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Post no encontrado' });
    }
    res.json(result.rows[0]);
  } catch (err) {
    console.error('Error al obtener post:', err.stack);
    res.status(500).json({ error: 'Error al obtener el post' });
  }
});

// POST /api/blog - Crear un nuevo post (con autenticación)
router.post('/blog', async (req, res) => {
  const { title, slug, content, image_url } = req.body;

  if (!title || !slug || !content) {
    return res.status(400).json({ error: 'Faltan datos requeridos: title, slug o content' });
  }
  if (title.length > 200 || slug.length > 200) {
    return res.status(400).json({ error: 'Título o slug demasiado largo' });
  }

  try {
    const checkSlug = await pool.query('SELECT 1 FROM blog_posts WHERE slug = $1', [slug]);
    if (checkSlug.rows.length > 0) {
      return res.status(400).json({ error: 'Slug ya existe' });
    }

    // Si no se proporciona una URL de imagen, se usará null por defecto
    const result = await pool.query(
      'INSERT INTO blog_posts (title, slug, content, image_url) VALUES ($1, $2, $3, $4) RETURNING *',
      [title, slug, content, image_url || null]
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error('Error al crear post:', err.stack);
    res.status(500).json({ error: 'No se pudo crear el post' });
  }
});

// --- Endpoints del Portafolio ---

// GET /api/portfolio - Obtener lista de proyectos (público)
router.get('/portfolio', async (req, res) => {
  const { limit = 10, offset = 0 } = req.query;

  try {
    const result = await pool.query(
      'SELECT * FROM portfolio_projects ORDER BY created_at DESC LIMIT $1 OFFSET $2',
      [parseInt(limit), parseInt(offset)]
    );
    res.json(result.rows);
  } catch (err) {
    console.error('Error al obtener proyectos:', err.stack);
    res.status(500).json({ error: 'Error al obtener proyectos' });
  }
});

// GET /api/portfolio/:id - Obtener un proyecto por ID (público)
router.get('/portfolio/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const result = await pool.query(
      'SELECT * FROM portfolio_projects WHERE id = $1',
      [id]
    );
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Proyecto no encontrado' });
    }
    res.json(result.rows[0]);
  } catch (err) {
    console.error('Error al obtener proyecto:', err.stack);
    res.status(500).json({ error: 'Error al obtener el proyecto' });
  }
});

// --- Endpoints de Servicios ---

// GET /api/services - Obtener lista de servicios (público)
router.get('/services', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM services ORDER BY created_at ASC');
    res.json(result.rows);
  } catch (err) {
    console.error('Error al obtener servicios:', err.stack);
    res.status(500).json({ error: 'Error al obtener servicios' });
  }
});

// GET /api/services/:id - Obtener un servicio por ID (público)
router.get('/services/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const result = await pool.query(
      'SELECT * FROM services WHERE id = $1',
      [id]
    );
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Servicio no encontrado' });
    }
    res.json(result.rows[0]);
  } catch (err) {
    console.error('Error al obtener servicio:', err.stack);
    res.status(500).json({ error: 'Error al obtener el servicio' });
  }
});

// Exportar el router directamente
module.exports = router;
