import { Button } from "@mui/material";
import { logout } from "../../../services/authService";

const LogoutButton: React.FC = () => {
  return (
    <Button variant="outlined" color="inherit" onClick={logout}>
      Logout
    </Button>
  );
};

export default LogoutButton;
