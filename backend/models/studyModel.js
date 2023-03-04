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
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('Study', studySchema);
