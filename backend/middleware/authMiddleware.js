//const jwt = require('jsonwebtoken');
//const bcrypt = require('bcryptjs');
const asyncHandler = require('express-async-handler');
const User = require('../models/userModel');

// const protect = asyncHandler(async(req, res, next) => {
//     let token;

//     if(req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
//         try {
//             //Get token from header
//             token = req.headers.authorization.split(' ')[1];
//             //Verify token
//             const decoded = jwt.verify(token, process.env.JWT_SECRET);
//             //Find user by id
//             req.user = await User.findById(decoded.id).select('-password');
//             next();
//         } catch (error) {
//             console.error(error);
//             res.status(401);
//             throw new Error('Not authorized, token failed');
//         }
//     }
//     if(!token) {
//         res.status(401);
//         throw new Error('Not authorized, no token');
//     }
// });

// backend/middleware/authMiddleware.js
const allowRoles = (...roles) => {
    return (req, res, next) => {
        // Check if the user's role is included in the allowed roles
        if (!roles.includes(req.user.role)) {
            return res.status(403).json({ msg: 'Access denied' });
        }

        // If the user's role is allowed, proceed to the next middleware
        next();
    };
};


module.exports = {allowRoles};