
const { Pool } = require('pg')
require('dotenv').config()

const pool = new Pool(
  process.env.DATABASE_URL
    ? {
        connectionString: process.env.DATABASE_URL,
        max: Number(process.env.DB_POOL_MAX) || 1,
        idleTimeoutMillis: 10000,
        connectionTimeoutMillis: 10000,
      }
    : {
        host: process.env.DB_HOST,
        port: Number(process.env.DB_PORT) || 5432,
        database: process.env.DB_NAME,
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        max: Number(process.env.DB_POOL_MAX) || 10,
      },
)

pool.on('connect', () => {
  console.log('PostgreSQL connected successfully')
})

pool.on('error', (error) => {
  console.error('Unexpected PostgreSQL error:', error.message)
})

const testConnection = async () => {
  try {
    const result = await pool.query('SELECT NOW()')
    console.log('Database test successful:', result.rows[0])
    return true
  } catch (error) {
    console.error('Database connection failed:', error.message)
    return false
  }
}

module.exports = pool
module.exports.testConnection = testConnection
