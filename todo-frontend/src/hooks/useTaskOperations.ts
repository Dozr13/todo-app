import { useCallback } from "react";
import { Task, TaskOperationsProps } from "../interfaces/interfaceProps";
import {
  addTask,
  deleteTask,
  updateTask,
  updateTaskOrder,
  updateTaskStatus,
} from "../services/apiService";

export const useTaskOperations = ({ fetchTasks }: TaskOperationsProps) => {
  const handleAddTask = useCallback(
    async (newTask: Task) => {
      await addTask(newTask);
      fetchTasks();
    },
    [fetchTasks],
  );

  const handleDeleteTask = useCallback(
    async (taskId: string) => {
      await deleteTask(taskId);
      fetchTasks();
    },
    [fetchTasks],
  );

  const handleUpdateTask = useCallback(
    async (updatedTask: Task) => {
      await updateTask(updatedTask);
      fetchTasks();
    },
    [fetchTasks],
  );

  const handleTaskOrderUpdate = useCallback(
    async (reorderedTasks: string[]) => {
      await updateTaskOrder(reorderedTasks);
      fetchTasks();
    },
    [fetchTasks],
  );

  const handleStatusChange = useCallback(
    async (taskId: string, newStatus: string) => {
      await updateTaskStatus(taskId, newStatus);
      fetchTasks();
    },
    [fetchTasks],
  );

  return {
    handleAddTask,
    handleDeleteTask,
    handleUpdateTask,
    handleTaskOrderUpdate,
    handleStatusChange,
  };
};
