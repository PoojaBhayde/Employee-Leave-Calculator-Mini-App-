const express = require('express');
const router = express.Router();
const Leave = require('../models/Leave');

function hrmsDayPartFields(isHalfDay) {
  const value = isHalfDay ? 'Half Day' : 'Full Day';

  return {
    fromDayPart: value,
    fromDayShift: value,
    toDayPart: value,
    toDayShift: value
  };
}

// CREATE leave
router.post('/apply', async (req, res) => {
  try {
    const { name, fromDate, toDate, halfDayCheck } = req.body;

    const from = new Date(fromDate);
    const to = new Date(toDate);

    let days = (to - from) / (1000 * 60 * 60 * 24) + 1;

    if (halfDayCheck) {
      days -= 0.5;
    }

    const dayParts = hrmsDayPartFields(halfDayCheck);

    const leave = new Leave({
      name,
      fromDate,
      toDate,
      halfDayCheck,
      totalDays: days,
      ...dayParts
    });

    await leave.save();

    res.json({
      message: 'Leave saved successfully',
      data: leave
    });

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// GET all leaves
router.get('/', async (req, res) => {
  try {
    const leaves = await Leave.find().sort({ createdAt: -1 });
    res.json(leaves);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// DELETE leave
router.delete('/:id', async (req, res) => {
  try {
    await Leave.findByIdAndDelete(req.params.id);
    res.json({ message: 'Leave deleted' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
