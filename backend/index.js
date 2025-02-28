// Archivo: index.js
// Descripción: Configuración principal del servidor para WebRush Brasil
// Autor: Ivan Iraldi (con asistencia de Grok)
// Dependencias: express, cors, rutas, middleware de autenticación

const express = require('express');
const cors = require('cors');
const routes = require('./routes/routes'); // Rutas de la API
const { authMiddleware } = require('./middlewares/auth'); // Middleware de autenticación JWT

const app = express();

// Configuración de CORS
const corsOptions = {
  origin: [
    'https://www.webrushbrasil.com.br', // Dominio de producción
    'http://localhost:3000', // Para desarrollo local (ajusta el puerto si es diferente)
  ],
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true,
};
app.use(cors(corsOptions));

// Middlewares globales
app.use(express.json()); // Parsear cuerpos JSON en las solicitudes

// Middleware de depuración para todas las solicitudes
app.use((req, res, next) => {
  console.log(`[DEBUG] Método: ${req.method}, Ruta completa: ${req.path}, URL: ${req.url}`);
  next();
});

// Aplicar rutas con autenticación selectiva
app.use('/api', (req, res, next) => {
  const isPublicRoute =
    (req.method === 'GET' && (
      req.path.startsWith('/blog') ||
      req.path.startsWith('/portfolio') ||
      req.path.startsWith('/services')
    )) ||
    (req.method === 'POST' && req.path === '/contacts');

  if (isPublicRoute) {
    console.log('[DEBUG] Ruta pública detectada, saltando autenticación');
    return next();
  }

  console.log('[DEBUG] Ruta protegida, aplicando autenticación');
  authMiddleware(req, res, next);
}, routes);

// Ruta de prueba básica
app.get('/', (req, res) => {
  res.send('Bienvenido a la API de WebRush Brasil');
});

// Manejo de errores global
app.use((err, req, res, next) => {
  console.error('Error en el servidor:', err.stack);
  res.status(500).json({ error: 'Algo salió mal en el servidor' });
});

// Iniciar el servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto ${PORT}`);
});