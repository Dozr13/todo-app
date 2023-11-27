import FiberManualRecordIcon from "@mui/icons-material/FiberManualRecord";
import {
  Box,
  Card,
  CardContent,
  Grid,
  Tooltip,
  Typography,
} from "@mui/material";
import { Task, TaskListItemProps } from "../../interfaces/interfaceProps";

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
  onStatusChange,
  dragHandleProps,
  provided,
}: TaskListItemProps) => {
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
      ref={provided.innerRef}
      {...provided.draggableProps}
      {...dragHandleProps}
      onClick={() => onClick(task)}
      sx={{
        marginBottom: 2,
        cursor: "pointer",
        "&:hover": {
          boxShadow: 6,
        },
      }}
    >
      <CardContent>
        <Grid container alignItems="center" spacing={2} {...dragHandleProps}>
          <Grid item xs={4}>
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
        </Grid>
      </CardContent>
    </Card>
  );
};

export default TaskListItem;
