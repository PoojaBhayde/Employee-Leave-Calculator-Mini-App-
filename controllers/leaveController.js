
const Leave = require('../models/Leave');

// Helper function
function calculateLeaveDays(fromDate, toDate, halfDayCheck) {
  let days = (new Date(toDate) - new Date(fromDate)) / (1000 * 60 * 60 * 24) + 1;

  if (halfDayCheck) {
    days -= 0.5;
  }

  return days;
}

function getDayPart(halfDayCheck) {
  const value = halfDayCheck ? 'Half Day' : 'Full Day';

  return {
    fromDayPart: value,
    fromDayShift: value,
    toDayPart: value,
    toDayShift: value
  };
}

// CREATE
exports.applyLeave = async (req, res) => {
  try {
    const { name, fromDate, toDate, halfDayCheck } = req.body;

    if (!name || !fromDate || !toDate) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    const totalDays = calculateLeaveDays(fromDate, toDate, halfDayCheck);
    const dayParts = getDayPart(halfDayCheck);

    const leave = await Leave.create({
      name,
      fromDate,
      toDate,
      halfDayCheck,
      totalDays,
      ...dayParts
    });

    res.status(201).json({
      message: 'Leave applied successfully',
      data: leave
    });

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// READ (GET ALL)
exports.getLeaves = async (req, res) => {
  try {
    const leaves = await Leave.find().sort({ createdAt: -1 });

    res.json({
      count: leaves.length,
      data: leaves
    });

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// READ (GET ONE)
exports.getLeaveById = async (req, res) => {
  try {
    const leave = await Leave.findById(req.params.id);

    if (!leave) {
      return res.status(404).json({ message: 'Leave not found' });
    }

    res.json(leave);

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// UPDATE
exports.updateLeave = async (req, res) => {
  try {
    const { name, fromDate, toDate, halfDayCheck } = req.body;

    const totalDays = calculateLeaveDays(fromDate, toDate, halfDayCheck);
    const dayParts = getDayPart(halfDayCheck);

    const updated = await Leave.findByIdAndUpdate(
      req.params.id,
      {
        name,
        fromDate,
        toDate,
        halfDayCheck,
        totalDays,
        ...dayParts
      },
      { new: true }
    );

    if (!updated) {
      return res.status(404).json({ message: 'Leave not found' });
    }

    res.json({
      message: 'Leave updated successfully',
      data: updated
    });

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// DELETE
exports.deleteLeave = async (req, res) => {
  try {
    const deleted = await Leave.findByIdAndDelete(req.params.id);

    if (!deleted) {
      return res.status(404).json({ message: 'Leave not found' });
    }

    res.json({ message: 'Leave deleted successfully' });

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
