
const pool = require('../config/db');

const SHIPPING_FEE = 0;

// Verify product information using DummyJSON.
async function getVerifiedProduct(productId) {
  const id = Number(productId);

  if (!Number.isSafeInteger(id) || id <= 0) {
    throw new Error('Invalid product ID');
  }

  const response = await fetch(
    `https://dummyjson.com/products/${id}`
  );

  if (!response.ok) {
    throw new Error(`Could not verify product ${id}`);
  }

  const product = await response.json();

  if (
    product.id !== id ||
    typeof product.price !== 'number' ||
    !Number.isFinite(product.price) ||
    product.price < 0
  ) {
    throw new Error(`Invalid product data for ${id}`);
  }

  return {
    id: String(product.id),
    name: product.title,
    image: product.thumbnail || null,
    price: product.price,
  };
}

const createOrder = async (req, res) => {
  const {
    firstName,
    lastName,
    email,
    phone,
    address,
    city,
    state,
    pincode,
    paymentMethod,
    items,
  } = req.body;

  // The user ID comes from the verified JWT.
  if (!req.user?.id) {
    return res.status(401).json({
      message: 'Please log in before placing an order.',
    });
  }

  const requiredFields = [
    firstName,
    lastName,
    email,
    phone,
    address,
    city,
    state,
    pincode,
  ];

  if (
    requiredFields.some(
      value => typeof value !== 'string' || !value.trim()
    )
  ) {
    return res.status(400).json({
      message: 'Please complete all delivery details.',
    });
  }

  if (
    !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())
  ) {
    return res.status(400).json({
      message: 'Please provide a valid email address.',
    });
  }

  if (!['cod', 'card'].includes(paymentMethod)) {
    return res.status(400).json({
      message: 'Invalid payment method.',
    });
  }

  if (
    !Array.isArray(items) ||
    items.length === 0 ||
    items.length > 100
  ) {
    return res.status(400).json({
      message: 'Your cart is empty or contains too many items.',
    });
  }

  // Accept only product IDs and quantities from the client.
  // Ignore any client-supplied price or total.
  for (const item of items) {
    if (
      !item ||
      !Number.isSafeInteger(Number(item.id)) ||
      Number(item.id) <= 0 ||
      !Number.isInteger(item.quantity) ||
      item.quantity < 1 ||
      item.quantity > 100
    ) {
      return res.status(400).json({
        message: 'Invalid product or quantity.',
      });
    }
  }

  // Combine duplicate product IDs.
  const quantityById = new Map();

  for (const item of items) {
    const id = String(Number(item.id));
    const quantity = (quantityById.get(id) || 0) + item.quantity;

    if (quantity > 100) {
      return res.status(400).json({
        message: 'Maximum quantity per product is 100.',
      });
    }

    quantityById.set(id, quantity);
  }

  let verifiedItems;

  try {
    verifiedItems = await Promise.all(
      [...quantityById.entries()].map(async ([id, quantity]) => ({
        product: await getVerifiedProduct(id),
        quantity,
      }))
    );
  } catch (error) {
    console.error('Product verification failed:', error.message);

    return res.status(502).json({
      message:
        'Could not verify your products. Please try again.',
    });
  }

  const subtotal = Number(
    verifiedItems
      .reduce(
        (sum, item) =>
          sum + item.product.price * item.quantity,
        0
      )
      .toFixed(2)
  );

  const shipping = SHIPPING_FEE;
  const total = Number((subtotal + shipping).toFixed(2));

  let client;

  try {
    client = await pool.connect();

    await client.query('BEGIN');

    const orderResult = await client.query(
      `INSERT INTO orders (
        user_id,
        first_name,
        last_name,
        email,
        phone,
        address,
        city,
        state,
        pincode,
        subtotal,
        shipping,
        total,
        payment_method
      )
      VALUES (
        $1, $2, $3, $4, $5, $6, $7, $8, $9,
        $10, $11, $12, $13
      )
      RETURNING
        id, total, order_status, payment_status, created_at`,
      [
        req.user.id,
        firstName.trim(),
        lastName.trim(),
        email.trim().toLowerCase(),
        phone.trim(),
        address.trim(),
        city.trim(),
        state.trim(),
        pincode.trim(),
        subtotal,
        shipping,
        total,
        paymentMethod,
      ]
    );

    const order = orderResult.rows[0];

    for (const { product, quantity } of verifiedItems) {
      const lineTotal = Number(
        (product.price * quantity).toFixed(2)
      );

      await client.query(
        `INSERT INTO order_items (
          order_id,
          product_id,
          product_name,
          product_image,
          quantity,
          unit_price,
          line_total
        )
        VALUES ($1, $2, $3, $4, $5, $6, $7)`,
        [
          order.id,
          product.id,
          product.name,
          product.image,
          quantity,
          product.price,
          lineTotal,
        ]
      );
    }

    await client.query('COMMIT');

    return res.status(201).json({
      message: 'Order placed successfully.',
      order,
    });
  } catch (error) {
    if (client) {
      try {
        await client.query('ROLLBACK');
      } catch (rollbackError) {
        console.error('Rollback failed:', rollbackError.message);
      }
    }

    console.error('Create order failed:', error.message);

    return res.status(500).json({
      message: 'Unable to place your order.',
    });
  } finally {
    if (client) {
      client.release();
    }
  }
};
const getMyOrders = async (req, res) => {
  try {
    const pool = require('../config/db');

    const result = await pool.query(
      `SELECT
          o.id AS order_id,
          o.first_name,
          o.last_name,
          o.email,
          o.phone,
          o.address,
          o.city,
          o.state,
          o.pincode,
          o.subtotal,
          o.shipping,
          o.total,
          o.payment_method,
          o.payment_status,
          o.order_status,
          o.created_at,
          oi.id AS item_row_id,
          oi.product_id,
          oi.product_name,
          oi.product_image,
          oi.quantity,
          oi.unit_price,
          oi.line_total
       FROM orders o
       LEFT JOIN order_items oi ON oi.order_id = o.id
       WHERE o.user_id = $1
       ORDER BY o.created_at DESC, oi.id ASC`,
      [req.user.id]
    );

    const ordersMap = new Map();

    for (const row of result.rows) {
      if (!ordersMap.has(row.order_id)) {
        ordersMap.set(row.order_id, {
          id: row.order_id,
          firstName: row.first_name,
          lastName: row.last_name,
          email: row.email,
          phone: row.phone,
          address: row.address,
          city: row.city,
          state: row.state,
          pincode: row.pincode,
          subtotal: Number(row.subtotal),
          shipping: Number(row.shipping),
          total: Number(row.total),
          paymentMethod: row.payment_method,
          paymentStatus: row.payment_status,
          status: row.order_status,
          createdAt: row.created_at,
          items: [],
        });
      }

      if (row.item_row_id !== null) {
        ordersMap.get(row.order_id).items.push({
          id: row.product_id,
          name: row.product_name,
          image: row.product_image,
          quantity: Number(row.quantity),
          price: Number(row.unit_price),
          lineTotal: Number(row.line_total),
        });
      }
    }

    res.status(200).json({
      orders: Array.from(ordersMap.values()),
    });
  } catch (error) {
    console.error('Fetch user orders error:', error);
    res.status(500).json({
      message: 'Unable to fetch your orders.',
    });
  }
};

module.exports = { createOrder,getMyOrders, };
