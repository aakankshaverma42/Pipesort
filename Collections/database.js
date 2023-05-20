const mongoose = require("mongoose");
const MONGODB_URI = "mongodb://localhost/my_database";

mongoose.connect(MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

console.log("Connected to MongoDB");
