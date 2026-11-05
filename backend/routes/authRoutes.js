const express = require('express')

const {
  registerUser,
  loginUser,
  getMe,
} = require('../controllers/authController')

const authMiddleware = require('../middleware/authMiddleware')

const router = express.Router()

router.post('/register', registerUser)
router.post('/login', loginUser)
router.get('/me', authMiddleware, getMe)

router.get('/test', (req, res) => {
  res.json({ message: 'Auth route is working' })
})

module.exports = router


