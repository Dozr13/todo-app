import { Box, CircularProgress, Container, Typography } from "@mui/material";
import React from "react";
import { useNavigate } from "react-router-dom";
import { dashboardStyles } from "../../constants/styles";
import { useSnackbarActions } from "../../hooks/useSnackbarActions";
import { useTasks } from "../../hooks/useTasks";
import { deleteAccount } from "../../services/authService";
import DeleteAccountButton from "../auth/buttons/DeleteAccountButton";
import LogoutButton from "../auth/buttons/LogoutButton";
import TaskList from "../tasks/TaskList";

const Dashboard: React.FC = () => {
  const navigate = useNavigate();
  const { showSuccessSnackbar, showErrorSnackbar } = useSnackbarActions();
  const { loading } = useTasks();

  const handleAccountDeletion = async () => {
    try {
      await deleteAccount();
      showSuccessSnackbar("Account successfully deleted");
      localStorage.removeItem("token");
      navigate("/login");
    } catch (error) {
      showErrorSnackbar(
        "An error occurred while removing account, please try again later.",
      );
    }
  };

  return (
    <Container>
      <Box sx={dashboardStyles.header}>
        <Typography variant="h4">Dashboard</Typography>
        <LogoutButton />
      </Box>
      {loading ? (
        <Box sx={dashboardStyles.loading}>
          <CircularProgress />
        </Box>
      ) : (
        <Box sx={dashboardStyles.taskListContainer}>
          <TaskList />
        </Box>
      )}
      <Box sx={dashboardStyles.deleteAccount}>
        <DeleteAccountButton onDelete={handleAccountDeletion} />
      </Box>
    </Container>
  );
};

export default Dashboard;
