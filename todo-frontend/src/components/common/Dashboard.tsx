import { Box, CircularProgress, Container, Typography } from "@mui/material";
import React from "react";
import { useTasks } from "../../hooks/useTasks";
import LogoutButton from "../auth/LogoutButton";
import TaskList from "../tasks/TaskList";

const Dashboard: React.FC = () => {
  const { loading } = useTasks();

  return (
    <Container>
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        my={4}
      >
        <Typography variant="h4">Dashboard</Typography>
        <LogoutButton />
      </Box>
      {loading ? (
        <Box display="flex" justifyContent="center" alignItems="center" my={4}>
          <CircularProgress />
        </Box>
      ) : (
        <TaskList />
      )}
    </Container>
  );
};

export default Dashboard;
