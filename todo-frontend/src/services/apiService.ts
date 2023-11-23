import axios from "axios";
import { Task } from "../interfaces/task";

const API_URL = process.env.TODO_APP_BACKEND_URL || "http://localhost:3001";

export const getTasks = async () => {
  const token = localStorage.getItem("token");
  try {
    const response = await axios.get(`${API_URL}/tasks`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const tasks = response.data.map((task: Task) => ({
      ...task,
      dueDate: new Date(task.dueDate),
    }));

    return tasks;
  } catch (error) {
    console.error("Error fetching tasks:", error);
    return [];
  }
};

export const addTask = async (task: Omit<Task, "_id">) => {
  const token = localStorage.getItem("token");
  try {
    const response = await axios.post(`${API_URL}/tasks`, task, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error adding task:", error);
    throw error;
  }
};

export const updateTask = async (task: Task) => {
  const token = localStorage.getItem("token");
  try {
    const response = await axios.put(`${API_URL}/tasks/${task._id}`, task, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error updating task:", error);
    throw error;
  }
};

export const updateTaskStatus = async (taskId: string, newStatus: string) => {
  const token = localStorage.getItem("token");
  try {
    await axios.patch(
      `${API_URL}/tasks/${taskId}`,
      { status: newStatus },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      },
    );
  } catch (error) {
    console.error("Error updating task status:", error);
  }
};

export const deleteTask = async (taskId: string) => {
  const token = localStorage.getItem("token");
  // console.log("taskId", taskId);
  try {
    await axios.delete(`${API_URL}/tasks/${taskId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  } catch (error) {
    console.error("Error deleting task:", error);
    throw error;
  }
};
