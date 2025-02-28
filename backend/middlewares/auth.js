const jwt = require('jsonwebtoken');

// Clave secreta para firmar y verificar tokens (en producción, usa una variable de entorno)
const JWT_SECRET = process.env.JWT_SECRET || 'tu_clave_secreta_super_segura';

// Middleware de autenticación
const authMiddleware = (req, res, next) => {
  // Obtener el token del encabezado Authorization
  const authHeader = req.headers['authorization'];
  if (!authHeader) {
    return res.status(401).json({ error: 'Acceso denegado: Token no proporcionado' });
  }

  // El token suele venir como "Bearer <token>"
  const token = authHeader.split(' ')[1];
  if (!token) {
    return res.status(401).json({ error: 'Acceso denegado: Formato de token inválido' });
  }

  try {
    // Verificar el token
    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = decoded; // Guardar los datos decodificados (ej. userId) en req
    next(); // Pasar al siguiente middleware o ruta
  } catch (err) {
    console.error('Error al verificar token:', err.message);
    res.status(403).json({ error: 'Acceso denegado: Token inválido o expirado' });
  }
};

// Función para generar un token (ejemplo para login, ajustar según necesites)
const generateToken = (user) => {
  return jwt.sign(
    { id: user.id, email: user.email }, // Payload con datos del usuario
    JWT_SECRET,
    { expiresIn: '1h' } // Token expira en 1 hora
  );
};

// Exportar el middleware y la función de generación
module.exports = {
  authMiddleware,
  generateToken
};