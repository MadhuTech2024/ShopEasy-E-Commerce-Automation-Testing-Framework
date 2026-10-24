
const express = require('express');
const cors = require('cors');
require('dotenv').config();

const authRoutes = require('./routes/authRoutes');
const orderRoutes = require('./routes/orderRoutes'); // NEW

const app = express();

app.use(cors());
app.use(express.json());

// Main route
app.get('/', (req, res) => {
  res.json({
    message: 'ShopEasy API is running',
  });
});

// Database test route
app.get('/api/db-test', async (req, res) => {
  try {
    const pool = require('./config/db');
    const result = await pool.query('SELECT NOW()');

    res.status(200).json({
      message: 'Database connection successful',
      time: result.rows[0].now,
    });
  } catch (error) {
    console.error('Database test error details:', error);

    res.status(500).json({
      message: 'Database connection failed',
      error: error.message || String(error),
      code: error.code || 'UNKNOWN',
    });
  }
});

// Authentication routes
app.use('/api/auth', authRoutes);

// Order routes - NEW
app.use('/api/orders', orderRoutes);

const PORT = process.env.PORT || 5001;

app.listen(PORT, () => {
  console.log(`ShopEasy server running on port ${PORT}`);
});
