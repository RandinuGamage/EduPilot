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
router.post('/', allowRoles('admin'), createClass);

// Assign a teacher to a class (Admin only)
router.put('/:id/assign-teacher', allowRoles('admin'), assignTeacher);

// Add a student to a class (Admin only)
router.put('/:id/add-student', allowRoles('admin'), addStudent);

// Mark attendance for all students in a class (Admin only)
router.post('/:id/attendance', allowRoles('admin'), markAttendance);

// Get class details (Admin, Teacher, or Student)
router.get('/:id', allowRoles('admin', 'teacher', 'student'), getClassDetails);

// Get attendance records for a class (Admin only)
router.get('/:id/attendance', allowRoles('admin'), getAttendance);

// Delete a class (Admin only)
router.delete('/:id', allowRoles('admin'), deleteClass);

// Remove a student from a class (Admin only)
router.put('/:id/remove-student', allowRoles('admin'), removeStudent);

module.exports = router;