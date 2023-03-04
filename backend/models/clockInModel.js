const mongoose = require('mongoose');

const ClockInSchema = new mongoose.Schema({
  startTime: {
    type: Date,
    required: true,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'User',
  },
  isClockedOut: {
    type: Boolean,
    default: false,
  },
});

module.exports = mongoose.model('ClockIn', ClockInSchema);
