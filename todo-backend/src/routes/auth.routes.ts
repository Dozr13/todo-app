import bcrypt from "bcrypt";
import express, { Request, Response } from "express";
import jwt from "jsonwebtoken";
import { authenticate } from "../middleware/auth.middleware";
import { Task } from "../models/task.model";
import { User } from "../models/user.model";

const router = express.Router();
const JWT_SECRET = process.env.JWT_SECRET || "default-secret-key";

router.post("/register", async (req: Request, res: Response) => {
  try {
    const { username, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);

    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return res.status(400).json({ message: "Username already exists" });
    }

    const user = new User({ username, password: hashedPassword });
    await user.save();

    const token = jwt.sign({ userId: user._id }, JWT_SECRET);
    res.status(201).json({ token });
  } catch (error) {
    console.error("Registration error:", error);
    res.status(500).json({ message: "Error in user registration" });
  }
});

router.post("/login", async (req: Request, res: Response) => {
  try {
    const { username, password } = req.body;

    const user = await User.findOne({ username });
    if (!user) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const isPasswordMatch = await bcrypt.compare(password, user.password);
    if (!isPasswordMatch) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const token = jwt.sign({ userId: user._id }, JWT_SECRET);
    res.json({ token });
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ message: "Error during login process" });
  }
});

router.delete(
  "/delete-account",
  authenticate,
  async (req: Request, res: Response) => {
    const userId = req.user?.userId;

    if (!userId) {
      return res.status(403).json({ message: "Unauthorized" });
    }

    try {
      await Task.deleteMany({ userId });
      await User.findByIdAndDelete(userId);

      res.status(200).json({ message: "Account successfully deleted" });
    } catch (error) {
      res.status(500).json({ message: "Error deleting account" });
    }
  },
);

export default router;
