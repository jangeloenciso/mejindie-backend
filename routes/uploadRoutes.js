const express = require('express');
const path = require('path');
const multer = require('multer');
const convertToMp4 = require('../services/convertToMp4'); // Import the convertToMp4 method

const router = express.Router();

// Configure multer storage
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads'); // Save files in the 'uploads' folder
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname); // Use original file name
  }
});
const upload = multer({ storage: storage }); // Initialize multer with the defined storage

// Serve uploaded files statically
router.use('/uploads', express.static(path.join(__dirname, '../uploads')));

// Upload endpoint
router.post('/upload', upload.single('file'), (req, res) => {
  const inputPath = req.file.path; // Path to the uploaded file
  const outputPath = `uploads/${path.parse(req.file.originalname).name}.mp4`; // Define output path

  // Convert file to MP4
  convertToMp4(inputPath, outputPath);

  res.json({ message: `File uploaded and conversion started: ${req.file.originalname}` });
});

module.exports = router; // Export the router
