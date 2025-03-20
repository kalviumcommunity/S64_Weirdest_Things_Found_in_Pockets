const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

// Define the user schema for authentication
const userSchema = new mongoose.Schema({
  // Username field with validation
  username: {
    type: String,
    required: [true, 'Username is required'],
    unique: true,
    trim: true,
    minlength: [3, 'Username must be at least 3 characters'],
    maxlength: [20, 'Username cannot exceed 20 characters']
  },
  
  // Email field with validation
  email: {
    type: String,
    required: [true, 'Email address is required'],
    unique: true,
    lowercase: true,
    trim: true,
    match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please provide a valid email address']
  },
  
  // Password field with validation
  password: {
    type: String,
    required: [true, 'Password is required'],
    minlength: [8, 'Password must be at least 8 characters']
  },
  
  // Optional profile information
  profilePicture: {
    type: String,
    default: 'default-avatar.png'
  },
  
  // Role management for access control
  role: {
    type: String,
    enum: ['user', 'admin'],
    default: 'user'
  },
  
  // Account status
  isActive: {
    type: Boolean,
    default: true
  },
  
  // For tracking token validity
  tokenVersion: {
    type: Number,
    default: 0
  },
  
  // For password reset functionality
  resetPasswordToken: String,
  resetPasswordExpires: Date,
  
  // Timestamps for user activity tracking
  lastLogin: Date
}, 
{
  // Automatically add createdAt and updatedAt timestamps
  timestamps: true
});

// Pre-save hook to hash password before saving to database
userSchema.pre('save', async function(next) {
  // Only hash the password if it's modified or new
  if (!this.isModified('password')) return next();
  
  try {
    // Generate a salt
    const salt = await bcrypt.genSalt(10);
    
    // Hash the password with the salt
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (error) {
    next(error);
  }
});

// Method to verify password for login
userSchema.methods.comparePassword = async function(candidatePassword) {
  return await bcrypt.compare(candidatePassword, this.password);
};

// Method to generate JWT token
userSchema.methods.generateAuthToken = function() {
  // Create token payload with essential user information
  const payload = {
    id: this._id,
    username: this.username,
    email: this.email,
    role: this.role,
    tokenVersion: this.tokenVersion
  };
  
  // Sign the token with a secret key and set expiration
  // In production, store JWT_SECRET in environment variables
  const token = jwt.sign(
    payload,
    process.env.JWT_SECRET || 'your_jwt_secret_key',
    { expiresIn: '24h' } // Token expires in 24 hours
  );
  
  return token;
};

// Method to invalidate all existing tokens for this user
userSchema.methods.invalidateTokens = async function() {
  // Increment token version to invalidate all current tokens
  this.tokenVersion += 1;
  return await this.save();
};

// Static method to verify and decode a token
userSchema.statics.verifyToken = async function(token) {
  try {
    // Verify the token and extract payload
    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'your_jwt_secret_key');
    
    // Find the user by ID
    const user = await this.findById(decoded.id);
    
    // Check if user exists and token is still valid
    if (!user || user.tokenVersion !== decoded.tokenVersion) {
      return null;
    }
    
    return user;
  } catch (error) {
    return null;
  }
};

// Create the User model
const User = mongoose.model('User', userSchema);

module.exports = User;