
const jwt = require('jsonwebtoken')

const authMiddleware = (req, res, next) => {
  try {
    const authHeader = req.headers.authorization

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({
        message: 'Authentication token is required',
      })
    }

    const token = authHeader.split(' ')[1]

    if (!process.env.JWT_SECRET) {
      console.error('JWT_SECRET is missing from .env')
      return res.status(500).json({
        message: 'Server authentication configuration error',
      })
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET)

    req.user = { id: decoded.id }

    next()
  } catch (error) {
    return res.status(401).json({
      message: 'Invalid or expired authentication token',
    })
  }
}

module.exports = authMiddleware
