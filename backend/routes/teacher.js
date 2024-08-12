const express = require('express');
const router = express.Router();
const Classroom = require('../models/Classroom');
const auth = require('../middleware/auth');

// Get students in the teacher's classroom
router.get('/students', auth, async (req, res) => {
    try {
        const teacher = await User.findById(req.user.id).populate('classroom');
        if (!teacher.classroom) {
            return res.status(400).json({ msg: 'Teacher is not assigned to any classroom' });
        }

        const students = await User.find({ classroom: teacher.classroom._id, role: 'Student' });
        res.json({ students });
    } catch (error) {
        res.status(500).json({ msg: 'Server error' });
    }
});

// Create a timetable for the classroom
router.post('/timetable', auth, async (req, res) => {
    const { classroomId, timetable } = req.body;

    try {
        const classroom = await Classroom.findById(classroomId);
        if (!classroom) {
            return res.status(400).json({ msg: 'Classroom not found' });
        }

        classroom.timetable = timetable;
        await classroom.save();

        res.json({ msg: 'Timetable created successfully', classroom });
    } catch (error) {
        res.status(500).json({ msg: 'Server error' });
    }
});

// Update or delete student details (if necessary)
router.put('/student/:id', auth, async (req, res) => {
    try {
        const student = await User.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.json(student);
    } catch (error) {
        res.status(500).json({ msg: 'Server error' });
    }
});

router.delete('/student/:id', auth, async (req, res) => {
    try {
        await User.findByIdAndDelete(req.params.id);
        res.json({ msg: 'Student deleted successfully' });
    } catch (error) {
        res.status(500).json({ msg: 'Server error' });
    }
});

module.exports = router;
