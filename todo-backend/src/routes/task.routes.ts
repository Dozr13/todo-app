import express, { Response } from "express";
import { authenticate } from "../middleware/auth.middleware";
import { Task } from "../models/task.model";

interface RequestWithUser extends express.Request {
  user?: { userId: string };
}

const router = express.Router();

router.post("/", authenticate, async (req: RequestWithUser, res: Response) => {
  if (!req.user?.userId) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  try {
    const { title, description, dueDate, status } = req.body;
    const userId = req.user.userId;

    const task = new Task({ title, description, dueDate, status, userId });
    await task.save();

    res.status(201).json(task);
  } catch (error) {
    console.error("Error creating task:", error);
    res.status(500).json({ message: "Error creating the task" });
  }
});

router.get("/", authenticate, async (req: RequestWithUser, res: Response) => {
  if (!req.user) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  try {
    const userId = req.user.userId;
    const tasks = await Task.find({ userId }).sort({ orderIndex: 1 });

    res.json(tasks);
  } catch (error) {
    console.error("Error fetching tasks:", error);
    res.status(500).json({ message: "Error fetching tasks" });
  }
});

router.put(
  "/order",
  authenticate,
  async (req: RequestWithUser, res: Response) => {
    if (!req.user) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const { order } = req.body;

    try {
      const userId = req.user.userId;

      await Promise.all(
        order.map((taskId: string, index: number) =>
          Task.findOneAndUpdate(
            { _id: taskId, userId: userId },
            { orderIndex: index },
            { new: true },
          ),
        ),
      );

      res.status(200).json({ message: "Task order updated successfully" });
    } catch (error) {
      console.error("Error updating task order:", error);
      res.status(500).json({ message: "Error updating task order" });
    }
  },
);

router.put(
  "/:taskId",
  authenticate,
  async (req: RequestWithUser, res: Response) => {
    if (!req.user) {
      return res.status(401).json({ message: "Unauthorized" });
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
        return res.status(404).json({ message: "Task not found" });
      }

      res.json(task);
    } catch (error) {
      console.error("Error updating task:", error);
      res.status(500).json({ message: "Error updating the task" });
    }
  },
);

router.patch(
  "/:taskId",
  authenticate,
  async (req: RequestWithUser, res: Response) => {
    if (!req.user) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    try {
      const { taskId } = req.params;
      const { status } = req.body;
      const userId = req.user.userId;

      const updatedTask = await Task.findOneAndUpdate(
        { _id: taskId, userId },
        { status },
        { new: true },
      );

      if (!updatedTask) {
        return res.status(404).json({ message: "Task not found" });
      }

      res.json(updatedTask);
    } catch (error) {
      console.error("Error updating task status:", error);
      res.status(500).json({ message: "Error updating the task status" });
    }
  },
);

router.delete(
  "/:taskId",
  authenticate,
  async (req: RequestWithUser, res: Response) => {
    if (!req.user) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    try {
      const { taskId } = req.params;
      const deletedTask = await Task.findByIdAndDelete(taskId);

      if (!deletedTask) {
        return res.status(404).json({ message: "Task not found" });
      }

      res.status(200).json({ message: "Task successfully deleted" });
    } catch (error) {
      console.error("Error deleting task:", error);
      res.status(500).json({ message: "Error deleting the task" });
    }
  },
);

export default router;
