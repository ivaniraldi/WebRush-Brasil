// Archivo: index.js
// Descripción: Configuración principal del servidor para WebRush Brasil
// Autor: Ivan Iraldi (con asistencia de Grok)
// Dependencias: express, cors, rutas, middleware de autenticación

const express = require('express');
const cors = require('cors');
const routes = require('./routes/routes'); // Rutas de la API
const { authMiddleware } = require('./middlewares/auth'); // Middleware de autenticación JWT

const app = express();

// Middlewares globales
app.use(cors()); // Permitir solicitudes desde cualquier origen (ajustable en producción)
app.use(express.json()); // Parsear cuerpos JSON en las solicitudes

// Aplicar rutas con autenticación selectiva
app.use('/api', (req, res, next) => {
  // Rutas públicas no requieren autenticación
  if (
    req.method === 'GET' &&
    (
      req.path.startsWith('/blog') ||
      req.path.startsWith('/portfolio') ||
      req.path.startsWith('/services')
    )
  ) {
    return next(); // Pasar directamente a las rutas públicas
  }
  // Rutas protegidas requieren autenticación
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