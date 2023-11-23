import { Button, Container, TextField } from "@mui/material";
import React, { useEffect, useState } from "react";
import { Task } from "../interfaces/task";
import { updateTask } from "../services/apiService";

interface Props {
  task: Task;
  onTaskUpdated: () => void;
}

const UpdateTaskForm: React.FC<Props> = ({ task, onTaskUpdated }) => {
  const [updatedTask, setUpdatedTask] = useState<Task>(task);

  useEffect(() => {
    setUpdatedTask(task);
  }, [task]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await updateTask(updatedTask);
    onTaskUpdated();
  };

  return (
    <Container>
      <form onSubmit={handleSubmit}>
        <TextField
          label="Title"
          value={updatedTask.title}
          onChange={(e) =>
            setUpdatedTask({ ...updatedTask, title: e.target.value })
          }
          required
        />
        <TextField
          label="Description"
          value={updatedTask.description}
          onChange={(e) =>
            setUpdatedTask({ ...updatedTask, description: e.target.value })
          }
        />
        <TextField
          label="Due Date"
          type="date"
          value={updatedTask.dueDate.toISOString().split("T")[0]}
          onChange={(e) =>
            setUpdatedTask({
              ...updatedTask,
              dueDate: new Date(e.target.value),
            })
          }
          InputLabelProps={{ shrink: true }}
          required
        />
        <Button type="submit">Update Task</Button>
      </form>
    </Container>
  );
};

export default UpdateTaskForm;
