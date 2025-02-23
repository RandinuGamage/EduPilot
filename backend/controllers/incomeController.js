const Income = require('../models/incomeModel');
const Class = require('../models/classModel');
const Teacher = require('../models/teacherModel');

// @desc   Calculate and distribute the income
// @route  POST /api/income
// @access Private(Admin only)
const calculateIncome = async (req, res) => {
    const {classId, month, year} = req.body;
    
    try {
        // Find the class
        const classData = await Class.findByOne({classId: classId});
        if(!classData){
            return res.status(400).json({msg: 'Class not found'});
        }

        //Calculate the total fee collected for the class in given month
        const fees = await Fee.find({ class: classId, month, year, status: 'Paid' });
        const totalFee = fees.reduce((sum, fee) => sum + fee.amount, 0);

        // Calculate teacher's share (75%) and institutional share (25%)
        const teacherShare = totalFee * 0.75;
        const institutionalShare = totalFee * 0.25;

        // Create an income record
        const income = new Income({
            class: classId,
            teacher: classRecord.teacher,
            month,
            year,
            totalFee,
            teacherShare,
            institutionalShare,
        });

        await income.save();
        res.json({msg: 'Income calculated and distributed successfully' , income});
    } catch (error) {
        console.error(error);
        res.status(500).json({msg: 'Server error'});
    }
};
// @desc   Get income details for a teacher
// @route  GET /api/income
// @access Private(Admin only)
const getTeacherIncome = async (req, res) => {
    try {
        const teacherId = req.params.id;

        // Get income records for the teacher
        const incomes = await Income.find({ teacher: teacherId });

        res.json({ incomes });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
};

// @desc   Get income details for the institution
// @route  GET /api/income/institution
// @access Private(Admin only)
const getInstitutionIncome = async (req, res) => {
    try {
        // Get income records for the institution
        const incomes = await Income.find({});

        // Calculate total institutional share
        const totalInstitutionalShare = incomes.reduce((sum, income) => sum + income.institutionalShare, 0);


        res.json({ totalInstitutionalShare, incomes });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
};

module.exports = { 
    calculateIncome, 
    getTeacherIncome, 
    getInstitutionIncome 
};