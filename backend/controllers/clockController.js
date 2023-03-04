const asyncHandler = require('express-async-handler');
const ClockIn = require('../models/clockInModel');
const ClockOut = require('../models/clockOutModel');

// Create a new clock in
// Post /api/clockIn
const createClockIn = asyncHandler(async (req, res) => {
  // Get user from req.user (set in Auth middleware)
  const user = await User.findById(req.user.id);
  if (!user) {
    res.status(401);
    throw new Error('User not found');
  }
  try {
    const clockIn = new ClockIn({ startTime: new Date(), user: user._id });
    await clockIn.save();
    res.status(201).json(clockIn);
  } catch (err) {
    throw new Error(err.message);
  }
});

// Create a new clock in
// Post /api/clockOut
const createClockOut = asyncHandler(async (req, res) => {
  // Get user from req.user (set in Auth middleware)
  const user = await User.findById(req.user.id);
  if (!user) {
    res.status(401);
    throw new Error('User not found');
  }
  try {
    // Find most recent clockIn, sort by natural -1 to get most recent instead of first
    const clockIn = await ClockIn.findOne({
      user: user._id,
      isClockedOut: false,
    }).sort({ $natural: -1 });
    if (!clockIn) {
      return res.status(404).json({ message: 'No clock-in record found' });
    }
    const endTime = new Date();
    const hoursWorked = (endTime - clockIn.startTime) / 3600000;
    const clockOut = new ClockOut({ endTime, hoursWorked, user: user._id });

    // Set isClockedOut on clockIn to true
    clockIn.isClockedOut = true;

    // Save clockIn and clockOut
    await clockIn.save();
    await clockOut.save();
    res.status(201).json(clockOut);
  } catch (err) {
    throw new Error(err.message);
  }
});

module.exports = { createClockIn, createClockOut };
