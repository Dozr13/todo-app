import mongoose from "mongoose";

const MONGODB_URI = process.env.MONGODB_URI || "default-mongodb-uri";

// console.log("Connecting to MongoDB at URI:", MONGODB_URI);

mongoose
  .connect(MONGODB_URI)
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("Could not connect to MongoDB", err));
