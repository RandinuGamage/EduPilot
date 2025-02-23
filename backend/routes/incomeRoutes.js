const express = require('express');
const { calculateIncome, 
    getTeacherIncome, 
    getInstitutionIncome } = require('../controllers/incomeController');
const router = express.Router();

const { protect, allowRoles} = require('../middleware/authMiddleware');

// Calculate and distribute income (Admin only)
router.post('/', protect, allowRoles('admin'), calculateIncome);

// Get income details for a teacher (Admin or Teacher)
router.get('/teacher/:id', protect, allowRoles('admin', 'teacher'), getTeacherIncome);

// Get income details for the institution (Admin only)
router.get('/institution', protect, allowRoles('admin'), getInstitutionIncome);

module.exports = router;