const mongoose = require('mongoose');
const dotenv = require('dotenv');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Please provide a name']
    },
    email: {
        type: String,
        required: [true,'Please provide an email'],
        unique: true
    },
    password: {
        type: String,
        required: [true, 'Please provide a password']
    },
    role: {
        type: String,
        enum: ['admin', 'teacher', 'student'],
        default: 'teacher'
    },
    uniqueID : {
        type: String,
        unique: true
    },
},{
    timestamps: true
});

userSchema.pre('save', async function(next){
    if(!this.isModified('password')){
        next();
    }
    const salt = await bcrypt.genSalt(12);
    this.password = await bcrypt.hash(this.password, salt);

    if (!this.uniqueID) {
        this.uniqueID = await generateUniqueID(this.role);
    }
    next();
});

userSchema.methods.matchPasswords = async function(password){
    return await bcrypt.compare(password, this.password);
}

// Function to generate unique ID
const generateUniqueID = async (role) => {
    let prefix;
    switch (role) {
        case 'admin':
            prefix = 'ADM'; // Prefix for admin
            break;
        case 'teacher':
            prefix = 'TCH'; // Prefix for teacher
            break;
        case 'student':
            prefix = 'STU'; // Prefix for student
            break;
        default:
            prefix = 'USR'; // Default prefix (if role is not specified)
    }

    let randomNumber = Math.floor(10000 + Math.random() * 90000); // Random 4-digit number
    let uniqueID = `${prefix}-${randomNumber}`;

    // Check if the ID already exists in the database
    const existingUser = await mongoose.model('User').findOne({ uniqueID });
    if (existingUser) {
        // If the ID exists, generate a new one recursively
        return generateUniqueID(role);
    }

    return uniqueID;
};

module.exports = mongoose.model('User', userSchema);

