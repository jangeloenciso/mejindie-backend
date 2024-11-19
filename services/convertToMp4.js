const { exec } = require('child_process');

/**
 * Converts a video file to MP4 format.
 * @param {string} inputPath - The path to the input video file.
 * @param {string} outputPath - The path to save the converted MP4 file.
 */
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

module.exports = convertToMp4;