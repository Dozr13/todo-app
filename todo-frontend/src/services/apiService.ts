import { Task } from "../interfaces/task";
import axiosInstance from "../utils/axiosInstance";
import handleError from "../utils/errorHandler";

export const getTasks = async (): Promise<Task[]> => {
  try {
    const response = await axiosInstance.get("/tasks");
    const tasks = response.data.map((task: Task) => ({
      ...task,
      dueDate: new Date(task.dueDate),
    }));
    return tasks;
  } catch (error) {
    return handleError(error);
  }
};

export const addTask = async (task: Omit<Task, "_id">): Promise<Task> => {
  try {
    const response = await axiosInstance.post("/tasks", task);
    return response.data;
  } catch (error) {
    return handleError(error);
  }
};

export const updateTask = async (task: Task): Promise<Task> => {
  try {
    const response = await axiosInstance.put(`/tasks/${task._id}`, task);
    return response.data;
  } catch (error) {
    return handleError(error);
  }
};

export const updateTaskStatus = async (
  taskId: string,
  newStatus: string,
): Promise<void> => {
  try {
    await axiosInstance.patch(`/tasks/${taskId}`, { status: newStatus });
  } catch (error) {
    return handleError(error);
  }
};

export const deleteTask = async (taskId: string): Promise<void> => {
  try {
    await axiosInstance.delete(`/tasks/${taskId}`);
  } catch (error) {
    return handleError(error);
  }
};
