const mongoose = require('mongoose');

const ClockOutSchema = new mongoose.Schema({
  endTime: {
    type: Date,
    required: true,
  },
  startTime: {
    type: Date,
    required: true,
  },
  hoursWorked: {
    type: Number,
    required: true,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'User',
  },
  comment: {
    type: String,
    required: false,
  },
});

const ClockOut = mongoose.model('ClockOut', ClockOutSchema);

module.exports = { ClockIn, ClockOut };
