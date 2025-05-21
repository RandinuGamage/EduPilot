const mongoose = require('mongoose');

const classSchema = new mongoose.Schema({
    classId:{
        type: String,
        unique : true,
        
    },
    className: {
        type: String,
        required: true,
    },
    teacher: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    
    day: {
            type: String,
            required: true,
    },
    time: {
            type: String,
            required: true,
    },
    
    classDays: [{ // Array of 4 days in a month
        type: Date,
        required: true,
    }],
    students: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    }],
    fee: {
        type: Number,
        required: true,
    },
});

//Genarate classID
classSchema.pre('save', async function (next) {
    if (!this.classId) {
        this.classId = [
            'CLS',
            Math.floor(1000 + Math.random() * 9000)
        ].join('-');
    }
    next();
});

module.exports = mongoose.model('Class', classSchema);

