const express = require('express');
const { recordFeePayment, 
    getFeeDetails, 
    getClassFeeDetails, 
    getOverdueFees, 
    sendReminder   } = require('../controllers/feeController');
const router = express.Router();

const { allowRoles } = require('../middleware/authMiddleware');

// Record a fee payment (Admin only)
router.post('/', allowRoles('admin'), recordFeePayment);

// Get fee details for a student (Admin, Teacher, or Student)
router.get('/student/:id', allowRoles('admin', 'teacher', 'student'), getFeeDetails);

// Get fee details for a class (Admin, Teacher)
router.get('/class/:id', allowRoles('admin', 'teacher', 'student'), getClassFeeDetails);

// Get overdue fees (Admin only)
router.get('/overdue', allowRoles('admin'), getOverdueFees);

// Send reminders for overdue fees (Admin only)
router.post('/reminders', allowRoles('admin'), sendReminder);

module.exports = router;