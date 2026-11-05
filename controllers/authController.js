
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const pool = require('../config/db')

// Generate JWT token
const generateToken = (userId) => {
  if (!process.env.JWT_SECRET) {
    throw new Error('JWT_SECRET is missing from .env')
  }

  return jwt.sign(
    { id: userId },
    process.env.JWT_SECRET,
    { expiresIn: '1d' },
  )
}

// REGISTER USER
const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body

    if (
      typeof name !== 'string' ||
      typeof email !== 'string' ||
      typeof password !== 'string' ||
      !name.trim() ||
      !email.trim() ||
      !password
    ) {
      return res.status(400).json({
        message: 'Name, email and password are required',
      })
    }

    if (password.length < 6) {
      return res.status(400).json({
        message: 'Password must be at least 6 characters',
      })
    }

    const normalizedEmail = email.trim().toLowerCase()

    const existingUser = await pool.query(
      'SELECT id FROM users WHERE email = $1',
      [normalizedEmail],
    )

    if (existingUser.rows.length > 0) {
      return res.status(409).json({
        message: 'User with this email already exists',
      })
    }

    const hashedPassword = await bcrypt.hash(password, 10)

    const result = await pool.query(
      `INSERT INTO users (name, email, password)
       VALUES ($1, $2, $3)
       RETURNING id, name, email, created_at`,
      [name.trim(), normalizedEmail, hashedPassword],
    )

    const user = result.rows[0]
    const token = generateToken(user.id)

    return res.status(201).json({
      message: 'User registered successfully',
      token,
      user,
    })
  } catch (error) {
    console.error('Register error:', error)

    if (error.code === '23505') {
      return res.status(409).json({
        message: 'User with this email already exists',
      })
    }

    if (error.message === 'JWT_SECRET is missing from .env') {
      return res.status(500).json({
        message: 'Server authentication configuration error',
      })
    }

    return res.status(500).json({
      message: 'Server error while registering user',
    })
  }
}

// LOGIN USER
const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body

    if (
      typeof email !== 'string' ||
      typeof password !== 'string' ||
      !email.trim() ||
      !password
    ) {
      return res.status(400).json({
        message: 'Email and password are required',
      })
    }

    const result = await pool.query(
      `SELECT id, name, email, password
       FROM users
       WHERE email = $1`,
      [email.trim().toLowerCase()],
    )

    if (result.rows.length === 0) {
      return res.status(401).json({
        message: 'Invalid email or password',
      })
    }

    const user = result.rows[0]

    const isPasswordValid = await bcrypt.compare(
      password,
      user.password,
    )

    if (!isPasswordValid) {
      return res.status(401).json({
        message: 'Invalid email or password',
      })
    }

    const token = generateToken(user.id)

    return res.status(200).json({
      message: 'Login successful',
      token,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
      },
    })
  } catch (error) {
    console.error('Login error:', error)

    if (error.message === 'JWT_SECRET is missing from .env') {
      return res.status(500).json({
        message: 'Server authentication configuration error',
      })
    }

    return res.status(500).json({
      message: 'Server error while logging in',
    })
  }
}

// GET LOGGED-IN USER PROFILE
const getMe = async (req, res) => {
  try {
    const result = await pool.query(
      `SELECT id, name, email, created_at
       FROM users
       WHERE id = $1`,
      [req.user.id],
    )

    if (result.rows.length === 0) {
      return res.status(404).json({
        message: 'User not found',
      })
    }

    return res.status(200).json({
      user: result.rows[0],
    })
  } catch (error) {
    console.error('Get profile error:', error)

    return res.status(500).json({
      message: 'Server error while fetching profile',
    })
  }
}

module.exports = {
  registerUser,
  loginUser,
  getMe,
}
