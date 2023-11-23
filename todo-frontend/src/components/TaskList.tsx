import { Box, Button, List, ListItem, ListItemText } from "@mui/material";
import React from "react";
import { Task } from "../interfaces/task";

interface Props {
  tasks: Task[];
  onStatusChange: (taskId: string, newStatus: Task["status"]) => void;
  onDeleteTask: (taskId: string) => Promise<void>;
}

const TaskList: React.FC<Props> = ({ tasks, onStatusChange, onDeleteTask }) => {
  if (!tasks) return <Box>No tasks available.</Box>;

  return (
    <List>
      {tasks.map((task) => {
        const dueDate = new Date(task.dueDate);

        return (
          <Box>
            <ListItem key={task._id}>
              <ListItemText
                primary={task.title}
                secondary={`Due: ${dueDate.toDateString()} | Status: ${
                  task.status
                }`}
              />
              <Box>
                {task.status !== "completed" && (
                  <Button
                    color="primary"
                    onClick={() => onStatusChange(task._id, "completed")}
                  >
                    Mark as Completed
                  </Button>
                )}
                <Button
                  onClick={() => {
                    onDeleteTask(task._id);
                    console.log(task._id);
                  }}
                >
                  Delete
                </Button>
              </Box>
            </ListItem>
          </Box>
        );
      })}
    </List>
  );
};

export default TaskList;
