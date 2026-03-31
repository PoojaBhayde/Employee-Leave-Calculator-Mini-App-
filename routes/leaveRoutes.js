const express = require('express');
const router = express.Router();

const controller = require('../controllers/leaveController');
const validate = require('../middleware/validate');
const { leaveSchema } = require('../validators/leaveValidator');

// CREATE
router.post('/applyLeave', validate(leaveSchema), controller.applyLeave);

// FETCH ALL
router.get('/getAllLeaves', controller.getLeaves);

// READ ONE
router.get('/getLeavesById/:id', controller.getLeaveById);

// UPDATE
router.put('/updateLeaves/:id', validate(leaveSchema), controller.updateLeave);

// DELETE
router.delete('/deleteLeaves/:id', controller.deleteLeave);

module.exports = router;
