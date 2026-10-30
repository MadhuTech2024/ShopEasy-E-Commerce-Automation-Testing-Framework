const express = require('express');
const cors = require('cors');

const authRoutes = require('./routes/authRoutes');
const orderRoutes = require('./routes/orderRoutes');
const pool = require('./config/db');

const app = express();
const functionPrefix = '/.netlify/functions/api';
const configuredOrigins = (process.env.FRONTEND_ORIGINS || '')
  .split(',')
  .map((origin) => origin.trim())
  .filter(Boolean);
const netlifyOrigins = [process.env.URL, process.env.DEPLOY_PRIME_URL]
  .filter(Boolean);
const frontendOrigins = [
  ...new Set([
    ...configuredOrigins,
    ...netlifyOrigins,
    ...(process.env.NODE_ENV === 'production'
      ? []
      : ['http://localhost:5173', 'http://127.0.0.1:5173']),
  ]),
];

app.use((req, res, next) => {
  if (req.url.startsWith(functionPrefix)) {
    req.url = req.url.slice(functionPrefix.length) || '/';
  }
  next();
});

app.use(cors({
  origin: frontendOrigins,
  credentials: true,
}));
app.use(express.json());

app.get('/', (req, res) => {
  res.json({
    message: 'ShopEasy API is running',
  });
});

app.get('/api/health', async (req, res) => {
  try {
    await pool.query('SELECT 1');
    res.status(200).json({
      message: 'ShopEasy API and database are healthy',
    });
  } catch (error) {
    console.error('Health check database query failed:', error.message);
    res.status(503).json({
      message: 'Database connection is unavailable',
    });
  }
});

app.get('/api/db-test', async (req, res) => {
  try {
    const result = await pool.query('SELECT NOW()');
    res.status(200).json({
      message: 'Database connection successful',
      time: result.rows[0].now,
    });
  } catch (error) {
    console.error('Database test failed:', error.message);
    res.status(500).json({
      message: 'Database connection failed',
    });
  }
});

app.use('/api/auth', authRoutes);
app.use('/api/orders', orderRoutes);

module.exports = app;
