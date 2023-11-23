import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Task } from "../interfaces/task";

import { Button, Container, TextField, Typography } from "@mui/material";
import { addTask } from "../services/apiService";

const AddTaskForm: React.FC = () => {
  const navigate = useNavigate();
  const [error, setError] = useState<string>("");

  const [newTask, setNewTask] = useState<Omit<Task, "_id" | "status">>({
    title: "",
    description: "",
    dueDate: new Date(),
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTask.title || !newTask.description) {
      setError("All fields are required");
      return;
    }
    try {
      await addTask({ ...newTask, status: "pending" });

      navigate("/dashboard");
    } catch (err) {
      setError("Failed to add task");
    }
  };

  return (
    <Container>
      <form onSubmit={handleSubmit}>
        <TextField
          label="Title"
          value={newTask.title}
          onChange={(e) => setNewTask({ ...newTask, title: e.target.value })}
          required
        />
        <TextField
          label="Description"
          value={newTask.description}
          onChange={(e) =>
            setNewTask({ ...newTask, description: e.target.value })
          }
        />
        <TextField
          label="Due Date"
          type="date"
          value={newTask.dueDate.toISOString().split("T")[0]}
          onChange={(e) =>
            setNewTask({ ...newTask, dueDate: new Date(e.target.value) })
          }
          InputLabelProps={{ shrink: true }}
          required
        />
        <Button type="submit">Add Task</Button>
        {error && <Typography color="error">{error}</Typography>}
      </form>
    </Container>
  );
};

export default AddTaskForm;
