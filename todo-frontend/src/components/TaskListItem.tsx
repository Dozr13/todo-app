import DeleteIcon from "@mui/icons-material/Delete";
import {
  Box,
  Card,
  CardContent,
  Grid,
  IconButton,
  Tooltip,
  Typography,
} from "@mui/material";
import { Task } from "../interfaces/task";

interface TaskListItemProps {
  task: Task;
  onClick: (task: Task) => void;
  onDelete: (event: React.MouseEvent) => void;
}

const TaskListItem = ({ task, onClick, onDelete }: TaskListItemProps) => {
  const handleDeleteClick = (event: React.MouseEvent) => {
    event.stopPropagation();
    onDelete(event);
  };

  return (
    <Card
      onClick={() => onClick(task)}
      sx={{
        marginBottom: 2,
        cursor: "pointer",
        "&:nth-of-type(odd)": {
          backgroundColor: "action.hover",
        },
        "&:hover": {
          boxShadow: 6,
        },
      }}
    >
      <CardContent>
        <Grid container alignItems="center" spacing={2}>
          <Grid item xs={3}>
            <Typography variant="h6" gutterBottom noWrap>
              {task.title}
            </Typography>
            <Typography variant="body2" color="textSecondary">
              Due: {new Date(task.dueDate).toLocaleDateString()}
            </Typography>
          </Grid>
          <Grid item xs={8}>
            <Tooltip title={task.description} placement="top-start">
              <Typography variant="body2" noWrap>
                {task.description}
              </Typography>
            </Tooltip>
          </Grid>
          <Grid item xs={1} textAlign="right">
            <IconButton
              onClick={handleDeleteClick}
              color="error"
              title="Delete task"
            >
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                }}
              >
                <DeleteIcon />
              </Box>
            </IconButton>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
};

export default TaskListItem;
