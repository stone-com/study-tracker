const mongoose = require('mongoose');

const studySchema = mongoose.Schema(
  {
    date: {
      type: Date,
      required: true,
    },
    hours: {
      type: Number,
      required: true,
      unique: true,
    },
    description: {
      type: String,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'User',
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('Study', studySchema);
