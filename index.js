const express = require('express');
const { spawn } = require('child_process');
const fs = require('fs');
const app = express();

app.post('/process-video', (req, res) => {
  const videoPath = "/home/aland/sandbox/video-processing/uploads/2023-07-16 23-07-25.mp4"
  const outputPath = `output_${Date.now()}.mp4`;

  const ffmpeg = spawn('ffmpeg', [
    '-i',
    videoPath,
    '-vf',
    `drawtext=text='lolllllllllllllllllllllllllllllllll':x=99:y=10:fontsize=24:fontcolor=red:shadowcolor=red:shadowx=2:shadowy=2`,
    outputPath,
  ]);

  ffmpeg.on('close', (code) => {
    if (code === 0) {
      res.download(outputPath, (err) => {
        console.log("outputPath", outputPath)
        if (err) {
          console.error('Error sending the file:', err);
          res.status(500).send('Error sending the file.');
        }
        // Clean up the temporary files
        // fs.unlink(videoPath, (err) => {
        //   if (err) {
        //     console.error('Error deleting the input video:', err);
        //   }
        // });
        fs.unlink(outputPath, (err) => {
          if (err) {
            console.error('Error deleting the output video:', err);
          }
        });
      });
    } else {
      res.status(500).send('Error processing the video.');
    }
  });
});

app.listen(3004, () => {
  console.log('Server is listening on port 3000');
});
