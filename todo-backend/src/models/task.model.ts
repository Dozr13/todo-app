import mongoose from "mongoose";

const taskSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: false },
  dueDate: { type: Date, required: true },
  status: { type: String, required: true },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  orderIndex: { type: Number, default: 0 },
});

export const Task = mongoose.model("Task", taskSchema);
