const mongoose = require('mongoose');

const AttendanceSchema = new mongoose.Schema({
    class: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Class',
        required: true,
    },
    student: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    classDay: { // One of the 4 days in a month
        type: Date,
        required: true,
    },
    status: {
        type: String,
        enum: ['present', 'absent'],
        default: 'present',
    },
});

module.exports = mongoose.model('Attendance', AttendanceSchema);