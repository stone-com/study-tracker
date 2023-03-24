const express = require('express');
const router = express.Router();
const {
  registerUser,
  loginUser,
  getMe,
  updatePay,
} = require('../controllers/userController');

const { protect } = require('../middleware/authMiddleware');

// routes for '/api/users
router.post('/register', registerUser);
router.post('/login', loginUser);
router.get('/me', protect, getMe);
router.put('/setpay/:id', protect, updatePay);

module.exports = router;
