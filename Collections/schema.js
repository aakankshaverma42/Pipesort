const mongoose = require("mongoose");

const videosSchema = new mongoose.Schema({
  videoLink: {
    type: String,
    required: true,
  },
  processedVideoUrl: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

const Videos = mongoose.model("Videos", videosSchema);

module.exports = Videos;
