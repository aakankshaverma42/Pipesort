const mongoose = require("mongoose");
const express = require("express");
const app = express();
const bull = require("bull");
const bodyParser = require("body-parser"); 
const ffmpeg = require("fluent-ffmpeg"); 
// Add Redis module
const redis = require("redis"); 


// Create a new queue
const queue = new bull("video-processing");
const redisClient = redis.createClient(); 

const db = require("./Collections/schema");

// Connect to MongoDB
require("./Collections/database")

app.use(bodyParser.json()); 

//static files
// app.use(express.static('Public'));
// app.use('/',express.static(__dirname + '/Public/index.html'))

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});


// Define the `/remove-noise` route
app.post("/remove-noise", async (req, res) => {
  try {
    // Get the video link from the request body
    const videoLink = req.body.videoLink;

    // Add the job to the queue
    await queue.add({
      videoLink,
    });
    res.json({
      success: true,
      taskId: queue.getJob(videoLink).id,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, error: "An error occurred while processing the request" });
  }
});

// Define the `process` function to process videos in the background
queue.process(async (job) => {
  try {
    const videoLink = job.data.videoLink;
    return {
      success: true,
      processedVideoUrl,
    };
  } catch (error) {
    console.error(error);
    throw new Error("Video processing failed");
  }
});


// Handle unhandled promise rejections
process.on("unhandledRejection", (error) => {
  console.error("Unhandled Promise Rejection:", error);
});

app.listen(8080, () => {
  console.log("Server is running");
});
