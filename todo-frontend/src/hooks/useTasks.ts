import { useEffect, useState } from "react";
import { Task } from "../interfaces/task";
import { deleteTask, getTasks, updateTaskStatus } from "../services/apiService";

export const useTasks = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    const fetchTasks = async () => {
      setLoading(true);
      const fetchedTasks = await getTasks();
      setTasks(fetchedTasks);
      setLoading(false);
    };

    fetchTasks();
  }, []);

  const handleStatusChange = async (
    taskId: string,
    newStatus: Task["status"],
  ) => {
    await updateTaskStatus(taskId, newStatus);
    setTasks(
      tasks.map((task) =>
        task._id === taskId ? { ...task, status: newStatus } : task,
      ),
    );
  };

  const handleDeleteTask = async (taskId: string) => {
    await deleteTask(taskId);
    setTasks(tasks.filter((task) => task._id !== taskId));
  };

  return { tasks, loading, handleStatusChange, handleDeleteTask };
};
