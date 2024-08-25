// server.js
const express = require('express');
const multer = require('multer');
const path = require('path');

const app = express();
const port = 3000;

const { exec } = require('child_process');

// File conversion to MP4 using FFMPEG
const convertToMp4 = (inputPath, outputPath) => {
  const command = `ffmpeg -i ${inputPath} -c:v libx264 -crf 23 -preset fast -c:a aac -b:a 128k -movflags +faststart ${outputPath}`;

  exec(command, (error, stdout, stderr) => {
    if (error) {
      console.error(`Error during conversion: ${error.message}`);
      return;
    }
    console.log(`Conversion successful: ${stdout}`);
  });
};

// Set up storage for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads');
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  }
});

const upload = multer({ storage: storage });

// Serve static files from the 'uploads' directory
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Endpoint for file uploads
app.post('/upload', upload.single('file'), (req, res) => {
  const inputPath = req.file.path;
  const outputPath = `uploads/${path.parse(req.file.originalname).name}.mp4`;

  convertToMp4(inputPath, outputPath);

  res.json({ message: `File uploaded and conversion started: ${req.file.originalname}` });
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
