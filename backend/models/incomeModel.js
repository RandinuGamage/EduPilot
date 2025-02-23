const mongoose = require('mongoose');

const incomeSchema = new mongoose.Schema({
    class : {
        type: mongoose.Schema.Types.ObjectId,
        ref : 'Class',
        required: true
    },
    teacher : {
        type: mongoose.Schema.Types.ObjectId,
        ref : 'Teacher',
        required: true
    },
    month : {
        type: String,
        required: true
    },
    totalfee : {
        type: Number,
        required: true
    },
    teacherShare : {
        type: Number,
        required: true
    },
    institutionalShare : {
        type: Number,
        required: true
    }, 
    date : {
        type: Date,
        default: Date.now
    }
});