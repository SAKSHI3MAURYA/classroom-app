const express = require('express');
const router = express.Router();
const Classroom = require('../models/Classroom');
const User = require('../models/User');
const auth = require('../middleware/auth');

// Create a new classroom
router.post('/classroom', auth, async (req, res) => {
    const { name, startTime, endTime, days } = req.body;

    try {
        const classroom = new Classroom({
            name,
            startTime,
            endTime,
            days,
        });

        await classroom.save();
        res.json({ msg: 'Classroom created successfully', classroom });
    } catch (error) {
        res.status(500).json({ msg: 'Server error' });
    }
});

// Assign a teacher to a classroom
router.post('/assign-teacher', auth, async (req, res) => {
    const { teacherId, classroomId } = req.body;

    try {
        const teacher = await User.findById(teacherId);
        const classroom = await Classroom.findById(classroomId);

        if (!teacher || !classroom) {
            return res.status(400).json({ msg: 'Teacher or Classroom not found' });
        }

        if (teacher.role !== 'Teacher') {
            return res.status(400).json({ msg: 'User is not a teacher' });
        }

        // Ensure the teacher is not already assigned to another classroom
        if (teacher.classroom) {
            return res.status(400).json({ msg: 'Teacher is already assigned to a classroom' });
        }

        teacher.classroom = classroom._id;
        await teacher.save();

        classroom.teacher = teacher._id;
        await classroom.save();

        res.json({ msg: 'Teacher assigned to classroom successfully' });
    } catch (error) {
        res.status(500).json({ msg: 'Server error' });
    }
});

// Get all teachers and students
router.get('/users', auth, async (req, res) => {
    try {
        const teachers = await User.find({ role: 'Teacher' }).populate('classroom');
        const students = await User.find({ role: 'Student' }).populate('classroom');
        res.json({ teachers, students });
    } catch (error) {
        res.status(500).json({ msg: 'Server error' });
    }
});

// Update or delete teacher/student details (if necessary)
router.put('/user/:id', auth, async (req, res) => {
    try {
        const user = await User.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.json(user);
    } catch (error) {
        res.status(500).json({ msg: 'Server error' });
    }
});

router.delete('/user/:id', auth, async (req, res) => {
    try {
        await User.findByIdAndDelete(req.params.id);
        res.json({ msg: 'User deleted successfully' });
    } catch (error) {
        res.status(500).json({ msg: 'Server error' });
    }
});

module.exports = router;
