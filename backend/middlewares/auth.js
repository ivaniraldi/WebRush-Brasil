const jwt = require('jsonwebtoken');
const { query } = require('../db/db');

// Clave secreta para firmar y verificar tokens
const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key'; // Fallback para desarrollo

if (!process.env.JWT_SECRET) {
  console.warn('⚠️ JWT_SECRET no está configurado en las variables de entorno');
}

// Función para generar token
const generateToken = (userId, email) => {
  return jwt.sign(
    { 
      userId, 
      email,
      exp: Math.floor(Date.now() / 1000) + (60 * 60 * 24) // 24 horas
    },
    JWT_SECRET
  );
};

// Middleware de autenticación
const authMiddleware = async (req, res, next) => {
  try {
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

    // Verificar el token
    const decoded = jwt.verify(token, JWT_SECRET);
    
    // Validaciones adicionales
    if (!decoded.userId) {
      return res.status(401).json({ error: 'Acceso denegado: Token malformado' });
    }

    // Verificar si el token ha expirado
    if (decoded.exp < Math.floor(Date.now() / 1000)) {
      return res.status(401).json({ error: 'Acceso denegado: Token expirado' });
    }

    // Verificar si el usuario existe y está activo
    const result = await query(
      'SELECT id, email, is_active FROM users WHERE id = $1',
      [decoded.userId]
    );

    if (result.rows.length === 0) {
      return res.status(401).json({ error: 'Acceso denegado: Usuario no encontrado' });
    }

    const user = result.rows[0];
    if (!user.is_active) {
      return res.status(401).json({ error: 'Acceso denegado: Usuario inactivo' });
    }

    // Agregar información del usuario a la request
    req.user = {
      id: user.id,
      email: user.email
    };

    next();
  } catch (err) {
    console.error('Error en autenticación:', err);
    
    if (err.name === 'TokenExpiredError') {
      return res.status(401).json({ error: 'Acceso denegado: Token expirado' });
    }
    
    if (err.name === 'JsonWebTokenError') {
      return res.status(401).json({ error: 'Acceso denegado: Token inválido' });
    }
    
    res.status(500).json({ error: 'Error en el servidor de autenticación' });
  }
};

// Middleware para verificar roles
const checkRole = (roles) => {
  return async (req, res, next) => {
    try {
      const result = await query(
        'SELECT role FROM users WHERE id = $1',
        [req.user.id]
      );

      if (result.rows.length === 0) {
        return res.status(401).json({ error: 'Usuario no encontrado' });
      }

      const userRole = result.rows[0].role;
      if (!roles.includes(userRole)) {
        return res.status(403).json({ error: 'Acceso denegado: Permisos insuficientes' });
      }

      next();
    } catch (err) {
      console.error('Error al verificar rol:', err);
      res.status(500).json({ error: 'Error al verificar permisos' });
    }
  };
};

module.exports = {
  authMiddleware,
  checkRole,
  generateToken
};