const Fee = require('../models/feeModel');
const Class = require('../models/classModel');
const User = require('../models/userModel');


// @desc    Record a fee payment
// @route   POST /api/fees
// @access  Private(Admin only)
const recordFeePayment = async (req, res) => {
    try {
        const { student, class: classId, month, year, amount, paymentDate } = req.body;

        // Check if the student exists
        const studentExists = await User.findById(student);
        if (!studentExists || studentExists.role !== 'Student') {
            return res.status(400).json({ message: 'Student not found' });
        }

        // Check if the class exists
        const classExists = await Class.findById(classId);
        if (!classExists) {
            return res.status(400).json({ message: 'Class not found' });
        }

        // Check if the fee has already been paid
        const feeExists = await Fee.findOne({ student, class: classId, month, year });
        if (feeExists) {
            return res.status(400).json({ message: 'Fee already paid' });
        }

        const fee = new Fee({
            student,
            class: classId,
            month,
            year,
            amount,
            status: 'Paid',
            paymentDate,
        });

        const newFee = await fee.save();
        res.status(201).json(newFee);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Get fee details for a student
// @route   GET /api/fees/student/:id
// @access  Private(Admin only)
const getFeeDetails = async (req, res) => {
    try {
        const student = req.params.id;

        // Check if the student exists
        const studentExists = await User.findById(student);

        if (!studentExists || studentExists.role !== 'Student') {
            return res.status(400).json({ message: 'Student not found' });
        }
        // Get the fee details for the student
        const fees = await Fee.find({ student }).populate('class', 'className');
        res.json(fees);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Get fee details for a class
// @route   GET /api/fees/class/:id
// @access  Private(Admin only)
const getClassFeeDetails = async (req, res) => {
    try {
        const classId = req.params.id;

        // Check if the class exists
        const classExists = await Class.findById(classId);

        if (!classExists) {
            return res.status(400).json({ message: 'Class not found' });
        }

        // Get the fee details for the class
        const fees = await Fee.find({ class: classId }).populate('student', 'name');
        res.json(fees);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Get overdue fees
// @route   GET /api/fees/overdue
// @access  Private(Admin only)

const getOverdueFees = async (req, res) => {
    try {
        // Get fees with status 'Pending' and payment date older than the current month
        const currentDate = new Date();
        const currentMonth = currentDate.toLocaleString('default', { month: 'long' });
        const currentYear = currentDate.getFullYear();

        const fees = await Fee.find({
            status: 'Pending',
            $or: [
                { year: { $lt: currentYear } },
                { year: currentYear, month: { $ne: currentMonth } },
            ],
        }).populate('student', 'name');

        res.json({overdueFees});

    } catch (error) {
        console.error(error.message);
        res.status(500).send('Server Error');
    }
};

// @desc    Send reminder for overdue fees
// @route   POST /api/fees/reminder
// @access  Private(Admin only)
const sendReminder = async (req, res) => {
    try {
        // Get overdue fees
        const currentDate = new Date();
        const currentMonth = currentDate.toLocaleString('default', { month: 'long' });
        const currentYear = currentDate.getFullYear();

        const overdueFees = await Fee.find({
            status: 'Pending',
            $or: [
                { year: { $lt: currentYear } },
                { year: currentYear, month: { $ne: currentMonth } },
            ],
        }).populate('student', 'name email');

        // Send reminder to the students
        overdueFees.forEach(async (fee) => {
            const studentEmail = fee.student.email;
            const subject = 'Reminder for Fee Payment';
            const message = `Dear Student, Your fee for the month of ${fee.month} is overdue. Please make the payment at the earliest. Regards, Institution Admin`;

            // Send email
            await sendEmail(studentEmail, subject, message);

    
        });

        res.json({ message: 'Reminder sent successfully' });
    } catch (error) {
        console.error(error.message);
        res.status(500).send('Server Error');
    }
};


module.exports = { 
    recordFeePayment, 
    getFeeDetails, 
    getClassFeeDetails, 
    getOverdueFees, 
    sendReminder 
};
