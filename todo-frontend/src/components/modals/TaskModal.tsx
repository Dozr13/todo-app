import { Box, Button, Typography } from "@mui/material";
import TextField from "@mui/material/TextField";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { useState } from "react";
import { Task, TaskModalProps } from "../../interfaces/task";
import { ModalMode } from "../../types/types";

const TaskModal = ({
  mode,
  task,
  onSave,
  onDelete,
  onClose,
}: TaskModalProps) => {
  const [title, setTitle] = useState(task?.title || "");
  const [description, setDescription] = useState(task?.description || "");
  const [dueDate, setDueDate] = useState<Date | null>(
    task?.dueDate || new Date(),
  );

  const isDeleteMode = mode === ModalMode.Delete;
  const isAddMode = mode === ModalMode.Add;
  const isDuplicateMode = mode === ModalMode.Duplicate;

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
    <>
      {isDeleteMode ? (
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: 2,
            p: 2,
            maxWidth: 400,
          }}
        >
          <Typography variant="h6" gutterBottom align="center">
            Confirm Delete
          </Typography>
          <Typography variant="body1">{`Are you sure you want to remove ${task.title} from the list?`}</Typography>
          <Box display="flex" justifyContent="space-evenly" mt={4}>
            <Button variant="outlined" color="primary" onClick={onClose}>
              Cancel
            </Button>

            <Button
              variant="contained"
              color="error"
              onClick={onDelete}
              autoFocus
              sx={{
                backgroundColor: "#d32f2f",
                "&:hover": {
                  backgroundColor: "#9a0007",
                },
              }}
            >
              Confirm
            </Button>
          </Box>
        </Box>
      ) : (
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
            {isAddMode
              ? "Add a New Task"
              : isDuplicateMode
              ? "Duplicate Task"
              : `Edit Task: ${task.title}`}
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
          <LocalizationProvider dateAdapter={AdapterDateFns}>
            <DatePicker
              label="Due Date"
              value={dueDate}
              onChange={setDueDate}
              format="MM/dd/yyyy"
            />
          </LocalizationProvider>
          <Button variant="contained" color="primary" onClick={handleSave}>
            Save
          </Button>
        </Box>
      )}
    </>
  );
};

export default TaskModal;
