const express = require("express");
const cors = require("cors");
const routes = require("./routes/routes");
const { authMiddleware } = require("./middlewares/auth");
const path = require("path"); // Añadimos path para manejar rutas de archivos

const app = express();

// Configuración de CORS
const corsOptions = {
  origin: [
    "https://www.webrushbrasil.com.br",
    "http://localhost:5173",
  ],
  methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: true,
};
app.use(cors(corsOptions));

// Middlewares globales
app.use(express.json());

// Middleware de depuración
app.use((req, res, next) => {
  next();
});

// Servir archivos estáticos desde una carpeta (por ejemplo, 'public')
app.use(express.static(path.join(__dirname, "public")));

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
    (req.method === "POST" && req.path === "/contacts") || req.path === "/login";

  if (isPublicRoute) {
    console.log("[DEBUG] Ruta pública detectada, saltando autenticación");
    return next();
  }

  console.log("[DEBUG] Ruta protegida, aplicando autenticación");
  authMiddleware(req, res, next);
}, routes);

// Ruta de prueba básica
app.get("/", (req, res) => {
  res.send("Bienvenido a la API de WebRush Brasil");
});

// Manejo de errores global
app.use((err, req, res, next) => {
  console.error("Error en el servidor:", err.stack);
  res.status(500).json({ error: "Algo salió mal en el servidor" });
});

// Iniciar el servidor
const PORT = process.env.PORT || 5173;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto ${PORT}`);
});