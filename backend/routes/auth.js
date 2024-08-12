const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

// Principal default account creation
const createPrincipalAccount = async () => {
    const existingPrincipal = await User.findOne({ email: 'principal@classroom.com' });
    if (!existingPrincipal) {
        const hashedPassword = await bcrypt.hash('Admin', 10);
        const principal = new User({
            name: 'Principal',
            email: 'principal@classroom.com',
            password: hashedPassword,
            role: 'Principal',
        });
        await principal.save();
        console.log('Principal account created');
    } else {
        console.log('Principal account already exists');
    }
};

// Create Principal Account if not exists
createPrincipalAccount();

// User login
router.post('/login', async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ msg: 'User does not exist' });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ msg: 'Invalid credentials' });
        }

        const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, {
            expiresIn: '1h',
        });

        res.json({ token, role: user.role });
    } catch (error) {
        res.status(500).json({ msg: 'Server error' });
    }
});

// Principal creates a teacher
router.post('/signup/teacher', async (req, res) => {
    const { name, email, password } = req.body;

    try {
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ msg: 'User already exists' });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const teacher = new User({
            name,
            email,
            password: hashedPassword,
            role: 'Teacher',
        });

        await teacher.save();
        res.json({ msg: 'Teacher account created' });
    } catch (error) {
        res.status(500).json({ msg: 'Server error' });
    }
});

// Principal or teacher creates a student
router.post('/signup/student', async (req, res) => {
    const { name, email, password } = req.body;

    try {
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ msg: 'User already exists' });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const student = new User({
            name,
            email,
            password: hashedPassword,
            role: 'Student',
        });

        await student.save();
        res.json({ msg: 'Student account created' });
    } catch (error) {
        res.status(500).json({ msg: 'Server error' });
    }
});

module.exports = router;
