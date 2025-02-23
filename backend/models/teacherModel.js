const mongoose = require('mongoose');
const User = require('./userModel');

const teacherSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    qualification: {
        type: String,
        required: true,
    },
    subject: {
        type: String,
        required: true,
    },
    experience: {
        type: Number,
        required: true,
    },
    contactNumber: {
        type: String,
        required: true,
    },
    address: {
        type: String,
        required: true,
    },
});

module.exports = mongoose.model('Teacher', teacherSchema);