import { Box, CircularProgress, Container, Typography } from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";
import { useTasks } from "../hooks/useTasks";
import LogoutButton from "./LogoutButton";
import TaskList from "./TaskList";

const Dashboard: React.FC = () => {
  const { tasks, loading, handleStatusChange, handleDeleteTask } = useTasks();

  return (
    <Container>
      <LogoutButton />
      <Link to="/add-task">Add Task</Link>
      <Typography variant="h4">Dashboard</Typography>
      {loading ? (
        <Box display="flex" justifyContent="center" alignItems="center">
          <CircularProgress />
        </Box>
      ) : tasks.length > 0 ? (
        <TaskList
          tasks={tasks}
          onDeleteTask={handleDeleteTask}
          onStatusChange={handleStatusChange}
        />
      ) : (
        <Typography variant="subtitle1">No tasks available</Typography>
      )}
    </Container>
  );
};

export default Dashboard;
