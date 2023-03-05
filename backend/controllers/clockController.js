const asyncHandler = require('express-async-handler');
const ClockIn = require('../models/clockInModel');
const ClockOut = require('../models/clockOutModel');
const User = require('../models/userModel');

// Create a new clock in
// Post /api/clock/clockIn
const createClockIn = asyncHandler(async (req, res) => {
  // Get user from req.user (set in Auth middleware)
  const user = await User.findById(req.user.id);
  if (!user) {
    res.status(401);
    throw new Error('User not found');
  }
  const clockIn = await ClockIn.create({
    startTime: new Date(),
    user: user._id,
  });

  if (clockIn) {
    res.status(201).json(clockIn);
  } else {
    res.status(400);
    throw new Error('Could not clock in');
  }
});

// Create a new clock in
// Post /api/clock/clockOut
const createClockOut = asyncHandler(async (req, res) => {
  // Get user from req.user (set in Auth middleware)
  const user = await User.findById(req.user.id);
  if (!user) {
    res.status(401);
    throw new Error('User not found');
  }

  // Find most recent clockIn, sort by natural -1 to get most recent instead of first
  const clockIn = await ClockIn.findOne({
    user: user._id,
    isClockedOut: false,
  }).sort({ $natural: -1 });
  if (!clockIn) {
    return res.status(404).json({ message: 'No clock-in record found' });
  }
  const endTime = new Date();
  // Calculate hours worked, then divide to convert miliseconds to hours
  const hoursWorked = (endTime - clockIn.startTime) / 3600000;
  const clockOut = await ClockOut.create({
    endTime,
    startTime: clockIn.startTime,
    hoursWorked,
    user: user._id,
    comment: req.body.comment,
  });
  if (clockOut) {
    // Set isClockedOut on clockIn to true
    clockIn.isClockedOut = true;

    // Save clockIn and clockOut
    await clockIn.save();
    res.status(201).json(clockOut);
  } else {
    res.status(400);
    throw new Error('Could not clock out');
  }
});

// Get user clockouts
// GET /api/clock/
const getClockouts = asyncHandler(async (req, res) => {
  // Get user from req.user (set in Auth middleware)
  const user = await User.findById(req.user.id);

  if (!user) {
    res.status(401);
    throw new Error('User not found');
  }

  const clockouts = await ClockOut.find({ user: req.user.id });

  res.status(200).json(clockouts);
});

// Get the most recent clockIn
// GET /api/clock/
const getMostRecentClockIn = asyncHandler(async (req, res) => {
  // Get user from req.user (set in Auth middleware)
  const user = await User.findById(req.user.id);

  if (!user) {
    res.status(401);
    throw new Error('User not found');
  }

  const clockin = await ClockIn.findOne({ user: req.user.id }).sort({
    $natural: -1,
  });

  res.status(200).json(clockin);
});

module.exports = {
  createClockIn,
  createClockOut,
  getClockouts,
  getMostRecentClockIn,
};
