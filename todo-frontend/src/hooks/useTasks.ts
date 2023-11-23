import { useEffect, useState } from "react";
import { Task } from "../interfaces/task";
import {
  addTask,
  deleteTask,
  getTasks,
  updateTask,
  updateTaskStatus,
} from "../services/apiService";

export const useTasks = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  const fetchTasks = async () => {
    setLoading(true);
    try {
      const fetchedTasks = await getTasks();
      setTasks(fetchedTasks);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const handleAddTask = async (newTask: Task) => {
    await addTask(newTask);
    fetchTasks();
  };

  const handleDeleteTask = async (taskId: string) => {
    await deleteTask(taskId);
    setTasks(tasks.filter((task) => task._id !== taskId));
  };

  const handleStatusChange = async (
    taskId: string,
    newStatus: Task["status"],
  ) => {
    try {
      const updatedTasks = tasks.map((task) =>
        task._id === taskId ? { ...task, status: newStatus } : task,
      );
      setTasks(updatedTasks);

      await updateTaskStatus(taskId, newStatus);
    } catch (error) {
      console.error("Error updating task status:", error);
    }
  };

  const handleUpdateTask = async (updatedTask: Task) => {
    await updateTask(updatedTask);
    fetchTasks();
  };

  return {
    tasks,
    setTasks,
    loading,
    handleAddTask,
    handleDeleteTask,
    handleStatusChange,
    handleUpdateTask,
  };
};
