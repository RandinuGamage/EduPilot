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
const { protect, allowRoles } = require('../middleware/authMiddleware');

const router = express.Router();

// Create a new class (Admin only)
router.post('/', protect, allowRoles('admin'), createClass);

// Assign a teacher to a class (Admin only)
router.put('/:id/assign-teacher', protect, allowRoles('admin'), assignTeacher);

// Add a student to a class (Admin only)
router.put('/:id/add-student', protect, allowRoles('admin'), addStudent);

// Mark attendance for all students in a class (Admin only)
router.post('/:id/attendance', protect, allowRoles('admin'), markAttendance);

// Get class details (Admin, Teacher, or Student)
router.get('/:id', protect, allowRoles('admin', 'teacher', 'student'), getClassDetails);

// Get attendance records for a class (Admin only)
router.get('/:id/attendance', protect, allowRoles('admin'), getAttendance);

// Delete a class (Admin only)
router.delete('/:id', protect, allowRoles('admin'), deleteClass);

// Remove a student from a class (Admin only)
router.put('/:id/remove-student', protect, allowRoles('admin'), removeStudent);

module.exports = router;