import { Box, Button, Typography } from "@mui/material";
import TextField from "@mui/material/TextField";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { useState } from "react";
import { Task } from "../interfaces/task";
import DateSelector from "./DateSelector";

interface TaskModalProps {
  isAddMode: boolean;
  onSave: (task: Task) => void;
  task: Task;
}

const TaskModal = ({ isAddMode, onSave, task }: TaskModalProps) => {
  const [title, setTitle] = useState(task?.title || "");
  const [description, setDescription] = useState(task?.description || "");
  const [dueDate, setDueDate] = useState<Date | null>(
    task?.dueDate || new Date(),
  );

  console.log("isAddMode ", isAddMode);

  const handleSave = () => {
    const updatedTask: Task = {
      _id: task?._id || "",
      title,
      description,
      dueDate: dueDate || new Date(),
      status: task?.status || "pending",
    };

    onSave(updatedTask);
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: 2,
        p: 2,
        maxWidth: 400,
      }}
    >
      <Typography variant="h6" gutterBottom>
        {isAddMode ? "Add a New Task" : `Edit Task: ${task.title}`}
      </Typography>
      <TextField
        label="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        fullWidth
      />
      <TextField
        label="Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        multiline
        rows={4}
        fullWidth
      />
      <DateSelector>
        <DatePicker label="Due Date" value={dueDate} onChange={setDueDate} />
      </DateSelector>
      <Button variant="contained" color="primary" onClick={handleSave}>
        Save
      </Button>
    </Box>
  );
};

export default TaskModal;
