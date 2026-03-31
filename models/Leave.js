const mongoose = require('mongoose');

const leaveSchema = new mongoose.Schema({
  name: { type: String, required: true },
  fromDate: { type: Date, required: true },
  toDate: { type: Date, required: true },
  halfDayCheck: { type: Boolean, default: false },
  totalDays: Number
}, { timestamps: true });

module.exports = mongoose.model('Leave', leaveSchema);
