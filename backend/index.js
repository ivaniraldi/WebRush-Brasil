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
  // Depuración para confirmar método y ruta
  console.log(`Método: ${req.method}, Ruta: ${req.path}`);

  // Rutas públicas no requieren autenticación
  const isPublicRoute =
    (req.method === 'GET' && (
      req.path.startsWith('/blog') ||
      req.path.startsWith('/portfolio') ||
      req.path.startsWith('/services')
    )) ||
    (req.method === 'POST' && req.path === '/contacts'); // Ajustado para exactitud

  if (isPublicRoute) {
    console.log('Ruta pública detectada, saltando autenticación');
    return next(); // Pasar directamente a las rutas públicas
  }

  console.log('Ruta protegida, aplicando autenticación');
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