import {
  Box,
  Button,
  CircularProgress,
  Container,
  Typography,
} from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";
import { useTasks } from "../hooks/useTasks";
import LogoutButton from "./LogoutButton";
import TaskList from "./TaskList";

const Dashboard: React.FC = () => {
  const { tasks, loading, handleStatusChange, handleDeleteTask } = useTasks();

  return (
    <Container>
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        my={4}
      >
        <Typography variant="h4">Dashboard</Typography>
        <Button
          component={Link}
          to="/add-task"
          variant="contained"
          color="primary"
        >
          Add a new Task
        </Button>
        <LogoutButton />
      </Box>
      {loading ? (
        <Box display="flex" justifyContent="center" alignItems="center" my={4}>
          <CircularProgress />
        </Box>
      ) : tasks.length > 0 ? (
        <TaskList
          onDeleteTask={handleDeleteTask}
          onStatusChange={handleStatusChange}
        />
      ) : (
        <Box display="flex" justifyContent="center" my={4}>
          <Typography variant="subtitle1">No tasks available</Typography>
        </Box>
      )}
    </Container>
  );
};

export default Dashboard;
