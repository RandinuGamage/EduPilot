const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const asyncHandler = require('express-async-handler');
const User = require('../models/userModel');
const Student = require('../models/studentModel');
const Teacher = require('../models/teacherModel');
const dotenv = require('dotenv');

dotenv.config();


//@desc     Register a new user
//@route    POST /api/users
//@access   Public (Admin only)
const registerUser = asyncHandler(async(req, res) => {
    const {name, email, password, role, parentName, grade, address, contactNumber, dateOfBirth, qualification, subject, experience } = req.body

    if(!name || !email || !password || !role) {
        res.status(400);
        throw new Error('Please fill in all fields');
    }
    //Check if user already exists
    const userExist = await User.findOne({email});
    if(userExist) {
        res.status(400);
        throw new Error('User already exists');
    }

    //Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    //Create new user
    let user = new User({
        name,
        email,
        password: hashedPassword,
        role: role || 'teacher',
    });

    //Save user
    user = await user.save();

    // If user is a student
    if(role === 'student') {
        const student = new Student({
            user: user._id,
            ID: user.ID,
            parentName,
            grade,
            address,
            contactNumber,
            dateOfBirth
        });
        await student.save();
    }

    // If user is a teacher
    if(role === 'teacher') {
        const teacher = new Teacher({
            user: user._id,
            ID: user.ID,
            qualification,
            subject,
            experience,
            contactNumber,
            address
        });
        await teacher.save();
    }

    // const payload = {
    //     user: {
    //         id: user.id,
    //         role: user.role,
    //         ID: user.ID,
    //     }
    // };

    if(user) {
        res.status(201).json({
            _id: user._id,
            name: user.name,
            email: user.email,
            role: user.role, 
            token: genarateToken(user._id),
        });
    } else {
        res.status(400);
        throw new Error('Invalid user data');
    }
    
});

//desc      Authenticate user
//@route    POST /api/users/login
//@access   Public
const loginUser = asyncHandler(async(req, res) => {
    const {email, password} = req.body;

    const user = await User.findOne({email});
    if(user && (await bcrypt.compare(password, user.password))) {
        res.json({
            _id: user._id,
            name: user.name,
            email: user.email,
            role: user.role,
            token: genarateToken(user._id),
            
        });
    } else {
        res.status(401);
        throw new Error('Invalid credentials');
    }
});

//desc      Get user profile
//@route    GET /api/users/profile
//@access   Private
const getUserProfile = asyncHandler(async(req, res) => {
    const {id, name, email, role} = await User.findById(req.user._id);
});

//desc      Delete user
//@route    DELETE /api/users/email
//@access   Private (Admin only)
const deleteUser = asyncHandler(async(req, res) => {
    
    const user = await User.findById(req.user._id); 
    if(user) {
        await user.remove();
        res.json({message: 'User removed successfully'});
    } else {
        res.status(404);
        throw new Error('User not found');
    }
    
});

//desc      update user profile
//@route    PUT /api/users/profile
//@access   Private (Admin only)
const updateUserProfile = asyncHandler(async(req, res) => {

    const {name, email, password, role, parentName, grade, address, contactNumber, dateOfBirth, qualification, subject, experience } = req.body;
    const user = await User.findById(req.user._id);
    if(user) {
        user.name = req.body.name || user.name;
        user.email = req.body.email || user.email;
        user.role = req.body.role || user.role;

        if(req.body.password) {
            user.password = req.body.password;
        }
        const updatedUser = await user.save();
        res.json({
            _id: updatedUser._id,
            name: updatedUser.name,
            email: updatedUser.email,
            role: updatedUser.role,
            token: genarateToken(updatedUser._id),
        });

        // If the user is a student, update the student record
        if (user.role === 'student') {
            let student = await Student.findOne({ user: user._id });

            if (!student) {
                return res.status(404).json({ msg: 'Student record not found' });
            }

            student.parentName = parentName || student.parentName;
            student.grade = grade || student.grade;
            student.address = address || student.address;
            student.contactNumber = contactNumber || student.contactNumber;
            student.dateOfBirth = dateOfBirth || student.dateOfBirth;

            await student.save();
        }

        // If the user is a teacher, update the teacher record
        if (user.role === 'teacher') {
            let teacher = await Teacher.findOne({ user: user._id });

            if (!teacher) {
                return res.status(404).json({ msg: 'Teacher record not found' });
            }

            teacher.qualification = qualification || teacher.qualification;
            teacher.subject = subject || teacher.subject;
            teacher.experience = experience || teacher.experience;
            teacher.contactNumber = contactNumber || teacher.contactNumber;
            teacher.address = address || teacher.address;

            await teacher.save();
        }

        res.json({ msg: 'User updated successfully' });

    } else {
        res.status(404);
        throw new Error('User not found');
    }
});

module.exports = { 
    registerUser,
    loginUser,
    getUserProfile,
    deleteUser, 
    updateUserProfile
};

const genarateToken = (id) => {
    return jwt.sign({id}, process.env.JWT_SECRET, {
        expiresIn: '30d'
    });
};

