const express = require('express');

const {
    createClass,
    assignTeacher,
    addStudent,
    markAttendance,
    getAttendance,
    removeStudent,
    getClassDetails,
    deleteClass,
} = require('../controllers/classController');
const { allowRoles } = require('../middleware/authMiddleware');

const router = express.Router();

// Create a new class (Admin only)
router.post('/', createClass);

// Assign a teacher to a class (Admin only)
router.put('/assign-teacher/:id',  assignTeacher);

// Add a student to a class (Admin only)
router.put('/add-student/:id',  addStudent);

// Mark attendance for all students in a class (Admin only)
router.post('/attendance/:id',  markAttendance);

// Get class details (Admin, Teacher, or Student)
router.get('/:id',  getClassDetails);

// Get attendance records for a class (Admin only)
router.get('/:id/attendance',  getAttendance);

// Delete a class (Admin only)
router.delete('/delete/:id',  deleteClass);

// Remove a student from a class (Admin only)
router.put('/remove-student/:id',  removeStudent);

module.exports = router;