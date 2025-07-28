// MongoDB Schema for Pocket Finds
const mongoose = require('mongoose');

// Define the schema
const pocketFindSchema = new mongoose.Schema({
  itemName: {
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: String,
    required: true,
    trim: true
  },
  weirdnessRating: {
    type: Number,
    required: true,
    min: 1,
    max: 10
  },
  image: {
    type: String, // URL to stored image
    required: true
  },
  reactions: {
    laughs: { type: Number, default: 0 },
    wows: { type: Number, default: 0 },
    disgusts: { type: Number, default: 0 },
    confusions: { type: Number, default: 0 }
  },
  comments: [{
    username: String,
    comment: String,
    createdAt: { type: Date, default: Date.now }
  }],
  createdAt: {
    type: Date,
    default: Date.now
  },
  isApproved: {
    type: Boolean,
    default: true // Set to false if you want to moderate submissions
  }
});

// Add index for better query performance
pocketFindSchema.index({ weirdnessRating: -1 });
pocketFindSchema.index({ createdAt: -1 });

// Add virtual for total reactions count
pocketFindSchema.virtual('totalReactions').get(function() {
  return this.reactions.laughs + this.reactions.wows + this.reactions.disgusts + this.reactions.confusions;
});

// Create model
const PocketFind = mongoose.model('PocketFind', pocketFindSchema);

module.exports = PocketFind;