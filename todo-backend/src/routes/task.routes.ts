import express, { Response } from "express";
import { authenticate } from "../middleware/auth.middleware";
import { Task } from "../models/task.model";

interface RequestWithUser extends express.Request {
  user?: { userId: string };
}

const router = express.Router();

router.post("/", authenticate, async (req: RequestWithUser, res: Response) => {
  if (!req.user?.userId) {
    return res.status(401).send("Unauthorized");
  }

  try {
    const { title, description, dueDate, status } = req.body;
    const userId = req.user.userId;

    const task = new Task({ title, description, dueDate, status, userId });
    await task.save();

    res.status(201).send(task);
  } catch (error) {
    res.status(500).send("Error creating the task");
  }
});

router.get("/", authenticate, async (req: RequestWithUser, res: Response) => {
  if (!req.user) {
    return res.status(401).send("Unauthorized");
  }

  try {
    const userId = req.user.userId;
    const tasks = await Task.find({ userId });

    res.send(tasks);
  } catch (error) {
    res.status(500).send("Error fetching tasks");
  }
});

router.put(
  "/:taskId",
  authenticate,
  async (req: RequestWithUser, res: Response) => {
    if (!req.user) {
      return res.status(401).send("Unauthorized");
    }

    try {
      const { taskId } = req.params;
      const userId = req.user.userId;

      const task = await Task.findOneAndUpdate(
        { _id: taskId, userId },
        req.body,
        { new: true },
      );

      if (!task) {
        return res.status(404).send("Task not found");
      }

      res.send(task);
    } catch (error) {
      res.status(500).send("Error updating the task");
    }
  },
);

router.delete(
  "/:taskId",
  authenticate,
  async (req: RequestWithUser, res: Response) => {
    if (!req.user) {
      return res.status(401).send("Unauthorized");
    }

    try {
      const { taskId } = req.params;
      const userId = req.user.userId;

      const task = await Task.findOneAndDelete({ _id: taskId, userId });

      if (!task) {
        return res.status(404).send("Task not found");
      }

      res.send(task);
    } catch (error) {
      res.status(500).send("Error deleting the task");
    }
  },
);

export default router;
