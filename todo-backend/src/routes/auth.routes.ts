import bcrypt from "bcrypt";
import express, { Request, Response } from "express";
import jwt from "jsonwebtoken";
import { User } from "../models/user.model";

const router = express.Router();
const JWT_SECRET = process.env.JWT_SECRET || "default-secret-key";

router.post("/register", async (req: Request, res: Response) => {
  try {
    const { username, password } = req.body;

    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return res.status(400).send("Username already exists");
    }

    const user = new User({ username, password });
    await user.save();

    const token = jwt.sign({ userId: user._id }, JWT_SECRET);
    res.status(201).send({ token });
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).send("Error in saving user");
  }
});

router.post("/login", async (req: Request, res: Response) => {
  try {
    const { username, password } = req.body;

    const user = await User.findOne({ username });
    if (!user) {
      return res.status(400).send("Invalid credentials");
    }

    const isPasswordMatch = await bcrypt.compare(password, user.password);
    if (!isPasswordMatch) {
      return res.status(400).send("Invalid credentials");
    }

    const token = jwt.sign({ userId: user._id }, JWT_SECRET);
    res.send({ token });
  } catch (error) {
    console.error("Registration error:", error);
    res.status(500).send("Error in saving user");
  }
});

export default router;
