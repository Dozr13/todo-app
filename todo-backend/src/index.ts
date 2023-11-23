import dotenv from "dotenv";
dotenv.config();

import cors from "cors";
import express, { Express, Request, Response } from "express";
import "./database";
import authRoutes from "./routes/auth.routes";
import taskRoutes from "./routes/task.routes";

const app: Express = express();

app.use(cors());

app.use(express.json());
app.use("/auth", authRoutes);
app.use("/tasks", taskRoutes);

app.get("/", (req: Request, res: Response) => {
  res.send("Task Manager Backend is running!");
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
