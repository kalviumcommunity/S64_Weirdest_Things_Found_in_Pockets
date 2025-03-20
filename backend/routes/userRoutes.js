// routes.js
const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const User = require('../model/user') // Adjust path as needed

// Middleware to verify JWT token
const authMiddleware = async (req, res, next) => {
  try {
    // Get token from Authorization header
    const token = req.header('Authorization')?.replace('Bearer ', '');
    
    if (!token) {
      return res.status(401).json({ message: 'Authentication required' });
    }
    
    // Verify token and find user
    const user = await User.verifyToken(token);
    
    if (!user) {
      return res.status(401).json({ message: 'Invalid or expired token' });
    }
    
    // Add user to request object
    req.user = user;
    req.token = token;
    next();
  } catch (error) {
    res.status(401).json({ message: 'Authentication failed' });
  }
};

// REGISTER - Create new user
router.post('/register', async (req, res) => {
  try {
    const { username, email, password } = req.body;
    
    // Check if user already exists
    const existingUser = await User.findOne({ 
      $or: [{ email }, { username }] 
    });
    
    if (existingUser) {
      return res.status(400).json({ 
        message: 'User already exists with that email or username' 
      });
    }
    
    // Create new user
    const user = new User({
      username,
      email,
      password,
    });
    
    await user.save();
    
    // Generate auth token
    const token = user.generateAuthToken();
    
    // Update last login time
    user.lastLogin = new Date();
    await user.save();
    
    res.status(201).json({
      message: 'User registered successfully',
      token,
      user: {
        id: user._id,
        username: user.username,
        email: user.email,
        role: user.role
      }
    });
  } catch (error) {
    res.status(400).json({ 
      message: 'Error registering user', 
      error: error.message 
    });
  }
});

// LOGIN - Authenticate user
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    
    // Find user by email
    const user = await User.findOne({ email });
    
    if (!user) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }
    
    // Check if account is active
    if (!user.isActive) {
      return res.status(401).json({ message: 'Account is deactivated' });
    }
    
    // Verify password
    const isMatch = await user.comparePassword(password);
    
    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }
    
    // Generate auth token
    const token = user.generateAuthToken();
    
    // Update last login time
    user.lastLogin = new Date();
    await user.save();
    
    res.json({
      message: 'Login successful',
      token,
      user: {
        id: user._id,
        username: user.username,
        email: user.email,
        role: user.role
      }
    });
  } catch (error) {
    res.status(500).json({ 
      message: 'Error during login', 
      error: error.message 
    });
  }
});

router.get('/profile', authMiddleware, async (req, res) => {
    try {
      // User is already available from authMiddleware
      const user = req.user;
      
      res.json({
        id: user._id,
        username: user.username,
        email: user.email,
        role: user.role,
        profilePicture: user.profilePicture,
        createdAt: user.createdAt,
        lastLogin: user.lastLogin
      });
    } catch (error) {
      res.status(500).json({ 
        message: 'Error retrieving profile', 
        error: error.message 
      });
    }
  });



module.exports = router;