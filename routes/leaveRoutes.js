const express = require('express');
const router = express.Router();

const controller = require('../controllers/leaveController');

// CREATE
router.post('/applyLeave', controller.applyLeave);

// FETCH ALL
router.get('/getAllLeaves', controller.getLeaves);

// READ ONE
router.get('/getLeavesById/:id', controller.getLeaveById);

// UPDATE
router.put('/updateLeaves/:id', controller.updateLeave);

// DELETE
router.delete('/deleteLeaves/:id', controller.deleteLeave);

module.exports = router;
