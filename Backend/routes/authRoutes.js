const express = require('express');
const router = express.Router();
const { register, login, getMe, getAllUsers } = require('../controllers/authController');
const { protect, adminOnly } = require('../middleware/authMiddleware');

// Public routes
router.post('/register', register);
router.post('/login', login);

// Private routes (require login)
router.get('/me', protect, getMe);

// Admin only routes
router.get('/users', protect, adminOnly, getAllUsers);

module.exports = router;