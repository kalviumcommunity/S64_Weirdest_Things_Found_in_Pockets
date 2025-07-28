// Express API endpoint for handling form submissions
const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const cloudinary = require('cloudinary').v2;
const newLocal = '../model/PocketFind';
const PocketFind = require(newLocal);

// Configure cloudinary for image uploads
cloudinary.config({
  cloud_name: 'dfveklbaw',
  api_key: '272822987994659',
  api_secret: 'RbvD71gh54gqpg4YBZ6MIGXnhdI'
});

// Configure multer for file handling
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/');
  },
  filename: function (req, file, cb) {
    cb(null, `pocket-find-${Date.now()}${path.extname(file.originalname)}`);
  }
});

const upload = multer({ 
  storage: storage,
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB max file size
  fileFilter: function (req, file, cb) {
    // Accept only images
    if (!file.originalname.match(/\.(jpg|jpeg|png|gif)$/)) {
      return cb(new Error('Only image files are allowed!'));
    }
    cb(null, true);
  }
});

// POST endpoint to create a new pocket find
router.post('/pocket-finds', upload.single('image'), async (req, res) => {
  try {
    // Upload image to cloudinary
    const result = await cloudinary.uploader.upload(req.file.path, {
      folder: 'pocket-finds'
    });

    // Create new pocket find document
    const newPocketFind = new PocketFind({
      itemName: req.body.itemName,
      description: req.body.description,
      weirdnessRating: parseInt(req.body.weirdnessRating),
      image: result.secure_url
    });

    // Save to database
    await newPocketFind.save();

    res.status(201).json({
      success: true,
      message: 'Your weird pocket find has been successfully uploaded!',
      data: newPocketFind
    });
  } catch (error) {
    console.error('Error uploading pocket find:', error);
    res.status(500).json({
      success: false,
      message: 'Something went wrong while uploading your find',
      error: error.message
    });
  }
});

// GET endpoint to fetch pocket finds (for landing page)
router.get('/pocket-finds', async (req, res) => {
  try {
    const { sort = 'newest', limit = 10, page = 1 } = req.query;
    
    let sortOption = {};
    if (sort === 'newest') sortOption = { createdAt: -1 };
    if (sort === 'weirdest') sortOption = { weirdnessRating: -1 };
    if (sort === 'popular') sortOption = { 'totalReactions': -1 };
    
    const skip = (parseInt(page) - 1) * parseInt(limit);
    
    const pocketFinds = await PocketFind.find({ isApproved: true })
      .sort(sortOption)
      .limit(parseInt(limit))
      .skip(skip);
      
    const total = await PocketFind.countDocuments({ isApproved: true });
    
    res.status(200).json({
      success: true,
      data: pocketFinds,
      pagination: {
        total,
        page: parseInt(page),
        pages: Math.ceil(total / parseInt(limit))
      }
    });
  } catch (error) {
    console.error('Error fetching pocket finds:', error);
    res.status(500).json({
      success: false,
      message: 'Something went wrong while fetching pocket finds',
      error: error.message
    });
  }
});

module.exports = router;