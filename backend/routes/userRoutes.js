const express = require('express');
const router = express.Router();
const { registerUser,
    loginUser,
    getUserProfile,
    deleteUser,
    updateUserProfile,
 } = require('../controllers/userController');
const {allowRoles } = require('../middleware/authMiddleware');


router.post('/register', registerUser);
router.post('/login', loginUser);
router.get('/profile/:id', getUserProfile);
router.delete('/delete/:id', allowRoles('admin'), deleteUser);
router.put('/update/:id',updateUserProfile);

module.exports = router;