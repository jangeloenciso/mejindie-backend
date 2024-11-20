const express = require('express');
const path = require('path');
const multer = require('multer');
const convertToMp4 = require('../services/videoService');
const { createFilm } = require('../services/filmService');

const router = express.Router();

// Configure multer storage
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, '../uploads')); // Save files in the 'uploads' folder
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname); // Use original file name
  }
});
const upload = multer({ storage: storage }); // Initialize multer with the defined storage

// Serve uploaded files statically
router.use('/uploads', express.static(path.join(__dirname, '../uploads')));

// Upload endpoint
router.post('/upload', upload.single('file'), async (req, res) => {
  const inputPath = req.file.path; // Path to the uploaded file
  const outputPath = path.join(__dirname, '../uploads', `/${path.parse(req.file.originalname).name}.mp4`); // Define output path

  convertToMp4(inputPath, outputPath);
  try {
    const filmData = {
      title: req.body.title,
      description: req.body.description,
      filePath: req.file.path,
      convertedFilePath: outputPath,
      releaseDate: req.body.releaseDate,
    };

    const film = await createFilm(filmData);

    res.json({
      message: `Film ${film.title} uploaded and invite link generated!`,
      inviteLink: film.inviteLink,
    });
  } catch (error) {
    console.error('Error uploading film:', error);
    res.status(500).json({ error: 'Failed to upload film.' });
  }
});

module.exports = router; // Export the router
