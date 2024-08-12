const express = require('express');
const router = express.Router();
const Classroom = require('../models/Classroom');
const auth = require('../middleware/auth');

// Get the student's classroom details
router.get('/classroom', auth, async (req, res) => {
    try {
        const student = await User.findById(req.user.id).populate('classroom');
        if (!student.classroom) {
            return res.status(400).json({ msg: 'Student is not assigned to any classroom' });
        }

        res.json({ classroom: student.classroom });
    } catch (error) {
        res.status(500).json({ msg: 'Server error' });
    }
});

// Get the classroom timetable
router.get('/timetable', auth, async (req, res) => {
    try {
        const student = await User.findById(req.user.id).populate('classroom');
        if (!student.classroom) {
            return res.status(400).json({ msg: 'Student is not assigned to any classroom' });
        }

        res.json({ timetable: student.classroom.timetable });
    } catch (error) {
        res.status(500).json({ msg: 'Server error' });
    }
});

module.exports = router;
