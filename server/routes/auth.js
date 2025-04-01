
const express = require('express');
const router = express.Router();
const User = require('../models/User');
const jwt = require('jsonwebtoken');
const { sendVerificationEmail, sendPasswordResetEmail } = require('../utils/mailer');

// Generate OTP
const generateOTP = () => {
  return Math.floor(1000 + Math.random() * 9000).toString();
};

// Login route
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    
    // Check if this is our test account
    if (email === 'abc@gmail.com' && password === '12345678') {
      // Find or create test user if it doesn't exist
      let testUser = await User.findOne({ email });
      
      if (!testUser) {
        testUser = new User({
          name: 'Test User',
          email: 'abc@gmail.com',
          password: '12345678',
          verified: true
        });
        await testUser.save();
      } else if (!testUser.verified) {
        // Ensure the test account is always verified
        testUser.verified = true;
        await testUser.save();
      }
      
      // Generate JWT token
      const token = jwt.sign(
        { id: testUser._id, email: testUser.email },
        process.env.JWT_SECRET,
        { expiresIn: '1d' }
      );
      
      // Return user data and token
      return res.json({
        token,
        user: {
          id: testUser._id,
          name: testUser.name,
          email: testUser.email,
        }
      });
    }
    
    // For regular users, continue with normal authentication flow
    // Check if user exists
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }
    
    // Check if password is correct
    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }
    
    // Check if user is verified
    if (!user.verified) {
      return res.status(400).json({ message: 'Please verify your email first' });
    }
    
    // Generate JWT token
    const token = jwt.sign(
      { id: user._id, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: '1d' }
    );
    
    // Return user data and token
    res.json({
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
      }
    });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Register route
router.post('/register', async (req, res) => {
  try {
    const { name, email, password } = req.body;
    
    // Check if user already exists
    let user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({ message: 'User already exists' });
    }
    
    // Generate OTP
    const otp = generateOTP();
    const otpExpiresAt = new Date();
    otpExpiresAt.setMinutes(otpExpiresAt.getMinutes() + 10); // OTP expires after 10 minutes
    
    // Create new user
    user = new User({
      name,
      email,
      password,
      otp: {
        code: otp,
        expiresAt: otpExpiresAt
      }
    });
    
    // Save user to database
    await user.save();
    
    // Send verification email
    await sendVerificationEmail(email, otp);
    
    res.status(201).json({ message: 'User registered. Please verify your email.' });
  } catch (error) {
    console.error('Registration error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Verify OTP route
router.post('/verify-otp', async (req, res) => {
  try {
    const { email, otp } = req.body;
    
    // Find user by email
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: 'User not found' });
    }
    
    // Check if OTP exists and is valid
    if (!user.otp || !user.otp.code) {
      return res.status(400).json({ message: 'No OTP found. Please request a new one.' });
    }
    
    // Check if OTP has expired
    if (user.otp.expiresAt < Date.now()) {
      return res.status(400).json({ message: 'OTP has expired. Please request a new one.' });
    }
    
    // Check if OTP matches
    if (user.otp.code !== otp) {
      return res.status(400).json({ message: 'Invalid OTP' });
    }
    
    // Mark user as verified and clear OTP
    user.verified = true;
    user.otp = undefined;
    await user.save();
    
    res.json({ message: 'Email verified successfully' });
  } catch (error) {
    console.error('OTP verification error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Request password reset route
router.post('/request-reset', async (req, res) => {
  try {
    const { email } = req.body;
    
    // Find user by email
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: 'User not found' });
    }
    
    // Generate OTP
    const otp = generateOTP();
    const otpExpiresAt = new Date();
    otpExpiresAt.setMinutes(otpExpiresAt.getMinutes() + 10); // OTP expires after 10 minutes
    
    // Update user with new OTP
    user.otp = {
      code: otp,
      expiresAt: otpExpiresAt
    };
    await user.save();
    
    // Send password reset email
    await sendPasswordResetEmail(email, otp);
    
    res.json({ message: 'Password reset code sent to your email' });
  } catch (error) {
    console.error('Password reset request error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Reset password route
router.post('/reset-password', async (req, res) => {
  try {
    const { email, otp, newPassword } = req.body;
    
    // Find user by email
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: 'User not found' });
    }
    
    // Check if OTP exists and is valid
    if (!user.otp || !user.otp.code) {
      return res.status(400).json({ message: 'No OTP found. Please request a new one.' });
    }
    
    // Check if OTP has expired
    if (user.otp.expiresAt < Date.now()) {
      return res.status(400).json({ message: 'OTP has expired. Please request a new one.' });
    }
    
    // Check if OTP matches
    if (user.otp.code !== otp) {
      return res.status(400).json({ message: 'Invalid OTP' });
    }
    
    // Update password and clear OTP
    user.password = newPassword;
    user.otp = undefined;
    await user.save();
    
    res.json({ message: 'Password reset successful' });
  } catch (error) {
    console.error('Password reset error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
