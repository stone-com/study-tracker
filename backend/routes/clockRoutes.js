const express = require('express');
const router = express.Router();
const {
  createClockIn,
  createClockOut,
  getClockouts,
  getMostRecentClockIn,
} = require('../controllers/clockController');

const { protect } = require('../middleware/authMiddleware');

// routes for '/api/clock'
router.post('/clockin', protect, createClockIn);
router.post('/clockout', protect, createClockOut);
router.get('/', protect, getClockouts);
router.get('/mostRecent', protect, getMostRecentClockIn);

module.exports = router;
