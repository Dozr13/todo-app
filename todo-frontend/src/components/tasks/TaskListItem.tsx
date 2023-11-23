import DeleteIcon from "@mui/icons-material/Delete";
import FiberManualRecordIcon from "@mui/icons-material/FiberManualRecord";
import {
  Box,
  Card,
  CardContent,
  Grid,
  IconButton,
  Tooltip,
  Typography,
} from "@mui/material";
import { Task } from "../../interfaces/task";

interface TaskListItemProps {
  task: Task;
  onClick: (task: Task) => void;
  onDelete: () => void;
  onStatusChange: (taskId: string, newStatus: Task["status"]) => Promise<void>;
}

const getStatusColor = (status: Task["status"]) => {
  switch (status) {
    case "pending":
      return "error";
    case "in-progress":
      return "warning";
    case "completed":
      return "success";
    default:
      return "disabled";
  }
};

const TaskListItem = ({
  task,
  onClick,
  onDelete,
  onStatusChange,
}: TaskListItemProps) => {
  const handleDeleteClick = (event: React.MouseEvent) => {
    event.stopPropagation();
    onDelete();
  };

  const cycleStatus = () => {
    const nextStatus =
      task.status === "pending"
        ? "in-progress"
        : task.status === "in-progress"
        ? "completed"
        : "pending";
    onStatusChange(task._id, nextStatus);
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
            <Typography variant="h6" noWrap>
              {task.title}
            </Typography>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
              }}
            >
              <FiberManualRecordIcon
                color={getStatusColor(task.status)}
                onClick={(event) => {
                  event.stopPropagation();
                  cycleStatus();
                }}
                sx={{ cursor: "pointer", mr: 1 }}
              />
              <Typography variant="body2">{task.status}</Typography>
            </Box>
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
              sx={{
                "& .MuiSvgIcon-root": {
                  color: "#d32f2f",
                  "&:hover": {
                    color: "#9a0007",
                  },
                },
              }}
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
