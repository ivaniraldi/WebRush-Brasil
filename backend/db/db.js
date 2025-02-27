
const { Pool } = require('pg');

require('dotenv').config();

// URL de conexión proporcionada
const connectionString = process.env.DATABASE_URL;

// Configuración del pool de conexiones
const pool = new Pool({
  connectionString: connectionString,
  ssl: {
    rejectUnauthorized: false // Necesario para conexiones SSL con Neon
  }
});

// Prueba de conexión al iniciar
pool.connect((err, client, release) => {
  if (err) {
    console.error('Error al conectar a la base de datos:', err.stack);
    return;
  }
  console.log('Conexión exitosa a la base de datos PostgreSQL');
  release(); // Liberar el cliente después de la prueba
});

// Manejo de errores en el pool
pool.on('error', (err, client) => {
  console.error('Error inesperado en el pool de conexiones:', err.stack);
});

// Exportar el pool para usarlo en otros archivos
module.exports = pool;