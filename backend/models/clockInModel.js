const mongoose = require('mongoose');

const ClockInSchema = new mongoose.Schema({
  startTime: {
    type: Date,
    required: true,
  },
  user: {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'User',
    },
  },
});

const ClockIn = mongoose.model('ClockIn', ClockInSchema);

module.exports = { ClockIn, ClockOut };
