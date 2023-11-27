import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useSnackbarActions } from "../../../hooks/useSnackbarActions";
import { logout } from "../../../services/authService";

const LogoutButton: React.FC = () => {
  const navigate = useNavigate();
  const { showSuccessSnackbar, showErrorSnackbar } = useSnackbarActions();

  const handleLogout = async () => {
    try {
      await logout();
      showSuccessSnackbar("Logged out successfully");
      navigate("/login");
    } catch (error) {
      showErrorSnackbar(error as string);
    }
  };

  return (
    <Button variant="outlined" color="inherit" onClick={handleLogout}>
      Logout
    </Button>
  );
};

export default LogoutButton;
