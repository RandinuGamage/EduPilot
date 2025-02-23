const express = require('express');
const router = express.Router();
const { registerUser,
    loginUser,
    getUserProfile,
    deleteUser,
    updateUserProfile,
 } = require('../controllers/userController');
const { protect, allowRoles } = require('../middleware/authMiddleware');


router.post('/register', registerUser);
router.post('/login', loginUser);
router.get('/profile',protect, getUserProfile);
router.delete('/delete/:id', protect, allowRoles('admin'), deleteUser);
router.put('/update/:id',protect, updateUserProfile);

module.exports = router;