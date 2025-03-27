const { Pool } = require('pg');

require('dotenv').config();

// URL de conexión proporcionada
const connectionString = process.env.DATABASE_URL;

if (!connectionString) {
  console.error('⚠️ DATABASE_URL no está configurada en las variables de entorno');
  process.exit(1);
}

console.log('Intentando conectar a la base de datos...');

// Configuración del pool de conexiones
const pool = new Pool({
  connectionString: connectionString,
  ssl: {
    rejectUnauthorized: false // Necesario para conexiones SSL con Neon
  },
  max: 20, // máximo número de conexiones en el pool
  idleTimeoutMillis: 30000, // tiempo máximo que una conexión puede estar inactiva
  connectionTimeoutMillis: 5000, // aumentado a 5 segundos
});

// Prueba inicial de conexión
pool.connect((err, client, release) => {
  if (err) {
    console.error('Error al conectar a la base de datos:', err);
    return;
  }
  console.log('Conexión exitosa a la base de datos PostgreSQL');
  release();
});

// Función para verificar la conexión
const checkConnection = async () => {
  let client;
  try {
    client = await pool.connect();
    await client.query('SELECT 1');
    return true;
  } catch (err) {
    console.error('Error al verificar la conexión:', err);
    return false;
  } finally {
    if (client) client.release();
  }
};

// Función para reintentar operaciones
const withRetry = async (operation, maxRetries = 3, delay = 1000) => {
  let lastError;
  
  for (let i = 0; i < maxRetries; i++) {
    try {
      return await operation();
    } catch (err) {
      lastError = err;
      if (i < maxRetries - 1) {
        console.log(`Reintento ${i + 1} de ${maxRetries} después de error:`, err.message);
        await new Promise(resolve => setTimeout(resolve, delay * Math.pow(2, i)));
        continue;
      }
    }
  }
  
  throw lastError;
};

// Manejo de errores en el pool
pool.on('error', (err, client) => {
  console.error('Error inesperado en el pool de conexiones:', err.stack);
});

pool.on('connect', (client) => {
  console.log('Nueva conexión establecida con la base de datos');
});

pool.on('remove', (client) => {
  console.log('Conexión removida del pool');
});

// Función para ejecutar queries con retry y logging
const query = async (text, params) => {
  return withRetry(async () => {
    const start = Date.now();
    let client;
    
    try {
      client = await pool.connect();
      const res = await client.query(text, params);
      const duration = Date.now() - start;
      
      // Logging de queries (solo en desarrollo)
      if (process.env.NODE_ENV === 'development') {
        console.log('Query ejecutada:', {
          text,
          duration,
          rows: res.rowCount,
          timestamp: new Date().toISOString()
        });
      }
      
      return res;
    } catch (err) {
      console.error('Error en la query:', {
        text,
        duration: Date.now() - start,
        error: err,
        timestamp: new Date().toISOString()
      });
      throw err;
    } finally {
      if (client) client.release();
    }
  });
};

// Función para ejecutar transacciones
const transaction = async (callback) => {
  const client = await pool.connect();
  
  try {
    await client.query('BEGIN');
    const result = await callback(client);
    await client.query('COMMIT');
    return result;
  } catch (err) {
    await client.query('ROLLBACK');
    throw err;
  } finally {
    client.release();
  }
};

module.exports = {
  query,
  transaction,
  checkConnection,
  pool
};