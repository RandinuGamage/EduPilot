const Class = require('../models/classModel');
const User = require('../models/userModel');
const getClassDays = require('../utils/getClassDays');
const Attendance = require('../models/attendanceModel');

// @desc    Create a class
// @route   POST /api/classes
// @access  Private(Admin only)
const createClass = async (req, res) => {
    const { className, teacher, day, time, fee } = req.body;

    try {
        // Check if the teacher exists
        const teacherUser = await User.findById(teacher);

        if (!teacherUser || teacherUser.role !== 'teacher') {
            return res.status(400).json({ msg: 'Invalid teacher' });
        }

        // Calculate class days based on the schedule
        const startDate = new Date(); // Use the current date as the starting point
        const dayOfWeek = getDayOfWeek(day); // Convert day name to day number (0-6)
        const classDays = getClassDays(startDate, dayOfWeek);

        // Create a new class
        const newClass = new Class({
            className,
            teacher,
            day,
            time,
            classDays : classDays, // Automatically calculated class days
            fee,
        });

        await newClass.save();

        res.status(201).json({ msg: 'Class created successfully', class: newClass });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
};

// @desc    Assign teacher to a class
// @route   PUT /api/classes/:id/assign-teacher
// @access  Private(Admin only)
const assignTeacher = async (req, res) => {
    const { teacher } = req.body;

    try {
        // Check if the teacher exists
        const teacherUser = await User.findById(teacher);

        if (!teacherUser || teacherUser.role !== 'teacher') {
            return res.status(400).json({ msg: 'Invalid teacher' });
        }

        // Find the class
        const classToUpdate = await Class.findById(req.params.id);

        if (!classToUpdate) {
            return res.status(404).json({ msg: 'Class not found' });
        }

        // Assign the teacher
        classToUpdate.teacher = teacher;

        await classToUpdate.save();

        res.json({ msg: 'Teacher assigned successfully', class: classToUpdate });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
};

// @desc    Add students to a class
// @route   PUT /api/classes/add-students/:id
// @access  Private(Admin only)
const addStudent = async (req, res) => {
    const { student } = req.body;

    try {
        // Find the class
        const classToUpdate = await Class.findById(req.params.id);

        if (!classToUpdate) {
            return res.status(404).json({ msg: 'Class not found' });
        }

        // Check if the student exists
        const studentUser = await User.findById(student);

        if (!studentUser || studentUser.role !== 'student') {
            return res.status(400).json({ msg: 'Invalid student' });
        }

        // Check if the student is already in the class
        if (classToUpdate.students.includes(student)) {
            return res.status(400).json({ msg: 'Student already in class' });
        }

        // Add the student to the class
        classToUpdate.students.push(student);
        await classToUpdate.save();

        res.json({ msg: 'Student added successfully', class: classToUpdate });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
};

// @desc    Remove student from a class
// @route   PUT /api/classes/remove-student/:id
// @access  Private(Admin only)
const removeStudent = async (req, res) => {
    const { student } = req.body;

    try {
        // Find the class
        const classToUpdate = await Class.findById(req.params.id);

        if (!classToUpdate) {
            return res.status(404).json({ msg: 'Class not found' });
        }

        // Check if the student exists
        const studentUser = await User.findById(student);

        if (!studentUser || studentUser.role !== 'student') {
            return res.status(400).json({ msg: 'Invalid student' });
        }

        // Check if the student is in the class
        if (!classToUpdate.students.includes(student)) {
            return res.status(400).json({ msg: 'Student not in class' });
        }

        // Remove the student from the class
        classToUpdate.students = classToUpdate.students.filter((s) => s.toString() !== student);

        await classToUpdate.save();

        res.json({ msg: 'Student removed successfully', class: classToUpdate });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
};

// @desc    Mark attendance for all students in a class
// @route   PUT /api/classes/:id/mark-attendance
// @access  Private(Admin only)
const markAttendance = async (req, res) => {
    const { classId, student , classDay, attendanceRecords, status } = req.body;

    try {
        // Find the class
        const classToUpdate = await Class.findById(req.params.id);

        if (!classToUpdate) {
            return res.status(404).json({ msg: 'Class not found' });
        }

        // Check if the classDay is one of the 4 days in the month
        if (!classToUpdate.classDays.includes(classDay)) {
            return res.status(400).json({ msg: 'Invalid class day' });
        }

        // Mark attendance for all students
        for (const record of attendanceRecords) {
            const { student, status } = record;

            // Check if the student is in the class
            if (!classToUpdate.students.includes(student)) {
                return res.status(400).json({ msg: `Student ${student} not in class` });
            }

            // Create attendance record
            const attendance = new Attendance({
                class: req.params.id,
                student,
                classDay,
                status,
            });

            await attendance.save();
        }

        res.json({ msg: 'Attendance marked successfully for all students' });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
};

// @desc    Get attendance for a class 
// @route   GET /api/classes/:id/attendance
// @access  Private(Admin only)
const getAttendance = async (req, res) => {
    try {
        const classId = req.params.id;
        const { classDay, student } = req.query;

        // Find the class
        const classDetails = await Class.findById(classId)
            .populate('teacher', 'name email')
            .populate('students', 'name email');

        if (!classDetails) {
            return res.status(404).json({ msg: 'Class not found' });
        }

        // Fetch attendance records for the class
        let attendanceRecords = await Attendance.find({ class: classId })
            .populate('student', 'name email');

        // Filter by class day if provided
        if (classDay) {
            attendanceRecords = attendanceRecords.filter(
                (record) => record.classDay.getTime() === new Date(classDay).getTime()
            );
        }

        // Filter by student if provided
        if (student) {
            attendanceRecords = attendanceRecords.filter(
                (record) => record.student._id.toString() === student
            );
        }

        // Organize attendance data into a table-like structure
        const attendanceTable = classDetails.classDays.map((classDay) => {
            const dayRecords = attendanceRecords
                .filter((record) => record.classDay.getTime() === new Date(classDay).getTime())
                .map((record) => ({
                    student: record.student.name,
                    status: record.status,
                }));

            return {
                classDay,
                attendance: dayRecords,
            };
        });

        res.json({
            className: classDetails.className,
            teacher: classDetails.teacher.name,
            schedule: classDetails.schedule,
            attendanceTable,
        });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
};

// @desc    Get class details
// @route   GET /api/classes/:id
// @access  Private(Admin, Teacher, or Student)
const getClassDetails = async (req, res) => {
    try {
        const classDetails = await Class.findById(req.params.id)
            .populate('teacher', 'name email')
            .populate('students', 'name email');

        if (!classDetails) {
            return res.status(404).json({ msg: 'Class not found' });
        }

        res.json({cclass:classDetails});
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
};

// @desc    Detete a class
// @route   DELETE /api/classes/:id
// @access  Private(Admin only)
const deleteClass = async (req, res) => {
    try {
        const classToDelete = await Class.findById(req.params.id);

        if (!classToDelete) {
            return res.status(404).json({ msg: 'Class not found' });
        }

        await classToDelete.remove();

        res.json({ msg: 'Class deleted successfully' });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
};

// Helper function to convert day name to day number
const getDayOfWeek = (dayName) => {
    const days = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'];
    return days.indexOf(dayName.toLowerCase());
};

module.exports = {
    createClass,
    assignTeacher,
    addStudent,
    removeStudent,
    markAttendance,
    getAttendance,
    getClassDetails,
    deleteClass,
};