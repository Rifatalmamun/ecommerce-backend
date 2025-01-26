const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');
const nodemailer = require('nodemailer');

// Mock user data
const users = [];

// Register route
router.post('/register', async (req, res) => {
    const { username, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    users.push({ username, password: hashedPassword });
    res.status(201).send('User registered');
});

// Login route
router.post('/login', async (req, res) => {
    const { username, password } = req.body;
    const user = users.find(u => u.username === username);
    if (!user) {
        return res.status(400).send('User not found');
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
        return res.status(400).send('Invalid credentials');
    }
    const token = jwt.sign({ username: user.username }, process.env.JWT_SECRET, { expiresIn: '1h' });
    res.json({ token });
});

// Logout route
router.post('/logout', (req, res) => {
    // Invalidate the token (implementation depends on how you manage tokens)
    // For example, you could use a token blacklist or simply rely on client-side token removal
    res.status(200).send('User logged out');
});

// Mock reset tokens
const resetTokens = {};

// Forgot password route
router.post('/forgot-password', (req, res) => {
    const { email } = req.body;
    const user = users.find(u => u.username === email);
    if (!user) {
        return res.status(400).send('User not found');
    }
    const token = crypto.randomBytes(20).toString('hex');
    resetTokens[token] = email;

    const transporter = nodemailer.createTransport({
        service: 'Gmail',
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS,
        },
    });

    const mailOptions = {
        to: email,
        from: process.env.EMAIL_USER,
        subject: 'Password Reset',
        text: `You are receiving this because you (or someone else) have requested the reset of the password for your account.\n\n
               Please click on the following link, or paste this into your browser to complete the process:\n\n
               http://${req.headers.host}/reset-password/${token}\n\n
               If you did not request this, please ignore this email and your password will remain unchanged.\n`,
    };

    transporter.sendMail(mailOptions, (err) => {
        if (err) {
            return res.status(500).send('Error sending email');
        }
        res.status(200).send('Password reset email sent');
    });
});

// Reset password route
router.post('/reset-password/:token', async (req, res) => {
    const { token } = req.params;
    const { password } = req.body;
    const email = resetTokens[token];
    if (!email) {
        return res.status(400).send('Invalid or expired token');
    }
    const user = users.find(u => u.username === email);
    if (!user) {
        return res.status(400).send('User not found');
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    user.password = hashedPassword;
    delete resetTokens[token];
    res.status(200).send('Password has been reset');
});

module.exports = router;