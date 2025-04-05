const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const router = express.Router();

// Register
router.post('/register', async (req, res) => {
    const { username, name, email, password } = req.body;
    
    try {
        // Validate required fields
        if (!username || !name || !email || !password) {
            return res.status(400).json({ msg: 'Please provide all required fields' });
        }

        // Check if username already exists
        let user = await User.findOne({ $or: [{ email }, { username }] });
        if (user) {
            if (user.email === email) {
                return res.status(400).json({ msg: 'Email already exists' });
            }
            if (user.username === username) {
                return res.status(400).json({ msg: 'Username already exists' });
            }
        }

        const newUser = new User({
            username,
            name,
            email,
            password
        });

        const salt = await bcrypt.genSalt(10);
        newUser.password = await bcrypt.hash(password, salt);
        await newUser.save();

        res.status(201).json({ msg: 'User registered successfully. Please log in.' });

    } catch (err) {
        console.error('Server error during registration:', err);
        res.status(500).json({ msg: 'Server error' });
    }
});


// Login
router.post('/login', async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await User.findOne({ email });
        if (!user) return res.status(400).json({ msg: 'Invalid credentials' });

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(400).json({ msg: 'Invalid credentials' });

        const payload = { user: { id: user.id } };
        jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1h' }, (err, token) => {
            if (err) throw err;
            res.json({msg:"login Successfully!", token });
        });
    } catch (err) {
        res.status(500).send('Server error');
    }
});

module.exports = router;
