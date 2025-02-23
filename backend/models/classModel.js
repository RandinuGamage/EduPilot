const mongoose = require('mongoose');

const classSchema = new mongoose.Schema({
    classId:{
        type: String,
        required: true,
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
    schedule: {
        day: {
            type: String,
            required: true,
        },
        time: {
            type: String,
            required: true,
        },
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
classSchema.pre('save', async function(next){
    if(!this.isModified('classID')){
        next();
    }
    this.classId = await generateClassID();
    next();
});

// Function to generate unique classID
const generateClassID = async () => {
    let prefix = 'CLS'; // Prefix for class
    let count = await Class.countDocuments();
    return `${prefix}${count + 1}`;
}

module.exports = mongoose.model('Class', classSchema);

