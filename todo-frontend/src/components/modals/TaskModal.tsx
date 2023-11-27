import { Box, Button, Grid, Typography } from "@mui/material";
import TextField from "@mui/material/TextField";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { useState } from "react";
import { Task, TaskModalProps } from "../../interfaces/interfaceProps";
import { ModalMode } from "../../types/types";
import ErrorMessage from "../common/ErrorMessage";

const TaskModal = ({
  mode,
  task,
  onSave,
  onDelete,
  onClose,
}: TaskModalProps) => {
  const [title, setTitle] = useState(task.title || "");
  const [description, setDescription] = useState(task?.description || "");
  const [dueDate, setDueDate] = useState<Date | null>(
    task.dueDate || new Date(),
  );
  const [errors, setErrors] = useState({ title: "", dueDate: "" });

  const isDeleteMode = mode === ModalMode.Delete;
  const isAddMode = mode === ModalMode.Add;
  const isDuplicateMode = mode === ModalMode.Duplicate;

  const validateTitle = () => {
    if (!title.trim()) {
      setErrors((errors) => ({ ...errors, title: "Title is required" }));
      return false;
    }
    setErrors((errors) => ({ ...errors, title: "" }));
    return true;
  };

  const handleDueDateError = (error: any) => {
    setErrors((prevErrors) => ({
      ...prevErrors,
      dueDate: error ? "Due date is required" : "",
    }));
  };

  const handleSave = () => {
    const isTitleValid = validateTitle();
    const isDueDateValid = !errors.dueDate;

    if (!isTitleValid || !isDueDateValid) return;

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
    <Box sx={{ p: 2, maxWidth: 400 }}>
      {isDeleteMode ? (
        <>
          <Typography variant="h6" gutterBottom align="center">
            Confirm Delete
          </Typography>
          <Typography variant="body1">{`Are you sure you want to remove ${task.title} from the list?`}</Typography>
          <Grid container spacing={2} justifyContent="space-evenly" mt={4}>
            <Grid item>
              <Button variant="outlined" color="primary" onClick={onClose}>
                Cancel
              </Button>
            </Grid>
            <Grid item>
              <Button variant="contained" color="error" onClick={onDelete}>
                Confirm
              </Button>
            </Grid>
          </Grid>
        </>
      ) : (
        <>
          <Typography variant="h6" gutterBottom>
            {isAddMode
              ? "Add a New Task"
              : isDuplicateMode
              ? "Duplicate Task"
              : `Edit Task: ${task.title}`}
          </Typography>

          <Grid container direction="column" spacing={2}>
            <Grid item xs={12}>
              <TextField
                id="task-title"
                name="title"
                label="Title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                onBlur={validateTitle}
                fullWidth
                error={!!errors.title}
              />
              <ErrorMessage errorMessage={errors.title} />
            </Grid>

            <Grid item xs={12}>
              <TextField
                id="task-description"
                name="description"
                label="Description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                multiline
                rows={4}
                fullWidth
                variant="outlined"
              />
              <Box sx={{ height: 10 }} />
            </Grid>

            <Grid item xs={12}>
              <LocalizationProvider dateAdapter={AdapterDateFns}>
                <DatePicker
                  label="Due Date"
                  value={dueDate}
                  onChange={setDueDate}
                  format="MM/dd/yyyy"
                  onError={handleDueDateError}
                  sx={{ width: "100%" }}
                />
              </LocalizationProvider>
              <ErrorMessage errorMessage={errors.dueDate} />
            </Grid>

            <Grid item>
              <Button variant="contained" color="primary" onClick={handleSave}>
                Save
              </Button>
            </Grid>
          </Grid>
        </>
      )}
    </Box>
  );
};

export default TaskModal;
