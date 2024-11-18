// server.js
const express = require('express');
const multer = require('multer');
const path = require('path');

const app = express();
const port = 3000;

const cors = require('cors');
app.use(cors())

const { exec } = require('child_process');

const mysql = require('mysql');

const connection = mysql.createConnection({
  host: 'localhost',
  port: 3306,
  database: 'test',
  user: 'root',
  password: 'admin' 
});

connection.connect(function(err) {
  if (err) {
      console.log("error occurred while connecting", err.stack);
  } else {
      console.log("connection created with mysql successfully");
  }
});

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads');
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  }
});

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

const upload = multer({ storage: storage });

app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

app.post('/upload', upload.single('file'), (req, res) => {
  const inputPath = req.file.path;
  const outputPath = `uploads/${path.parse(req.file.originalname).name}.mp4`;

  convertToMp4(inputPath, outputPath);

  res.json({ message: `File uploaded and conversion started: ${req.file.originalname}` });
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});

