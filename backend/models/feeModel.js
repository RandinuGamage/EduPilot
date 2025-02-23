const mongoose = require('mongoose');

// Define the schema for the fee collection
const feeSchema = new mongoose.Schema({
    student:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    class:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Class',
        required: true,
    },
    month:{
        type: String,
        required: true,
    },
    year:{
        type: Number,
        required: true,
    },
    amount:{
        type: Number,
        required: true,
    },
    status:{
        type:String,
        enum: ['Paid', 'Pending', 'Overdue'],
        default: 'Pending',
    },
    paymentDate:{
        type: Date,
        required: true,
    },
});


// Export the model
module.exports = mongoose.model('Fee', feeSchema);