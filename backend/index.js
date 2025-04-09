const express = require("express");
const cors = require("cors");
const routes = require("./routes/routes");
const { authMiddleware } = require("./middlewares/auth");
const path = require("path");
const rateLimit = require('express-rate-limit');
const helmet = require('helmet');
const compression = require('compression');
require('dotenv').config();

// Verificar variables de entorno requeridas
const requiredEnvVars = ['JWT_SECRET', 'DATABASE_URL'];
const missingEnvVars = requiredEnvVars.filter(varName => !process.env[varName]);

if (missingEnvVars.length > 0) {
  console.error('❌ Variables de entorno faltantes:', missingEnvVars.join(', '));
  console.error('Por favor, configure las variables de entorno en el archivo .env');
  process.exit(1);
}

const app = express();

// Configuración de seguridad básica
app.use(helmet({
  contentSecurityPolicy: {
    directives: {
      defaultSrc: ["'self'"],
      scriptSrc: ["'self'", "'unsafe-inline'", "https://cdn.jsdelivr.net", "https://cdnjs.cloudflare.com"],
      scriptSrcAttr: ["'self'", "'unsafe-inline'"], // Allow inline event handlers
      styleSrc: ["'self'", "'unsafe-inline'", "https://cdn.jsdelivr.net", "https://cdnjs.cloudflare.com"],
      fontSrc: ["'self'", "https://cdnjs.cloudflare.com", "data:"],
      imgSrc: ["'self'", "data:", "https:"],
      connectSrc: [
        "'self'",
        "https://www.webrushbrasil.com.br",
        "http://localhost:5174",
        "http://localhost:5173", 
        "http://localhost:3000",
        "https://web-rush-brasil-backend.vercel.app" // Allow Vercel backend
      ],
    },
  },
  crossOriginEmbedderPolicy: false, // Optional: Disable COEP if needed
}));

// Configuración de CORS
const corsOptions = {
  origin: [
    "https://www.webrushbrasil.com.br",
    "http://localhost:5174",
    "http://localhost:5173", 
    "http://localhost:3000",
  "https://web-rush-brasil-backend.vercel.app"   ],
  methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: true,
  maxAge: 86400 // 24 horas
};
app.use(cors(corsOptions));

// Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutos
  max: 100 // límite de 100 peticiones por ventana
});
app.use('/api/', limiter);

// Middlewares globales
app.use(express.json({ limit: '10mb' }));
app.use(compression());

// Middleware de logging
app.use((req, res, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
  next();
});

// Servir archivos estáticos desde una carpeta
app.use(express.static(path.join(__dirname, "public"), {
  maxAge: '1d',
  etag: true
}));

// Ruta específica para /control-panel
app.get("/control-panel", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

// Rutas de la API con autenticación selectiva
app.use("/api", (req, res, next) => {
  const isPublicRoute =
    (req.method === "GET" &&
      (req.path.startsWith("/blog") ||
        req.path.startsWith("/portfolio") ||
        req.path.startsWith("/services"))) ||
    (req.method === "POST" && req.path === "/contacts") || 
    req.path === "/login";

  if (isPublicRoute) {
    return next();
  }

  authMiddleware(req, res, next);
}, routes);

// Ruta de prueba básica
app.get("/", (req, res) => {
  res.send("Bienvenido a la API de WebRush Brasil");
});

// Manejo de errores global mejorado
app.use((err, req, res, next) => {
  console.error(`[${new Date().toISOString()}] Error en el servidor:`, err.stack);
  
  // Manejo específico de errores
  if (err.name === 'ValidationError') {
    return res.status(400).json({ error: err.message });
  }
  
  if (err.name === 'UnauthorizedError') {
    return res.status(401).json({ error: 'No autorizado' });
  }
  
  if (err.name === 'NotFoundError') {
    return res.status(404).json({ error: 'Recurso no encontrado' });
  }

  // Error por defecto
  res.status(500).json({ 
    error: "Algo salió mal en el servidor",
    message: process.env.NODE_ENV === 'development' ? err.message : undefined
  });
});

// Manejo de rutas no encontradas
app.use((req, res) => {
  res.status(404).json({ error: 'Ruta no encontrada' });
});

// Iniciar el servidor
const PORT = process.env.PORT || 5174;
app.listen(PORT, () => {
  console.log(`[${new Date().toISOString()}] Servidor corriendo en el puerto ${PORT || 5174}`);
  console.log(`[${new Date().toISOString()}] Ambiente: ${process.env.NODE_ENV || 'development'}`);
});