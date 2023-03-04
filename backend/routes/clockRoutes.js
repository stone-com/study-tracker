const express = require('express');
const router = express.Router();
const {
  createClockIn,
  createClockOut,
} = require('../controllers/clockController');

const { protect } = require('../middleware/authMiddleware');

// routes for '/api/clock'
router.post('/clockin', protect, createClockIn);
router.post('/clockout', protect, createClockOut);

module.exports = router;
