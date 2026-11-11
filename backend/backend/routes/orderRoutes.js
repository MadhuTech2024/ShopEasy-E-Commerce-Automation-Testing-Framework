const express = require('express');
const authMiddleware = require('../middleware/authMiddleware');
const {
  createOrder,
  getMyOrders,
} = require('../controllers/orderController');

const router = express.Router();

// Get orders belonging to the logged-in user
router.get('/', authMiddleware, getMyOrders);

// Create a new order
router.post('/', authMiddleware, createOrder);

module.exports = router;