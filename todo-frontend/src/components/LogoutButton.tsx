 import { Button } from "@mui/material";
import { logout } from "../services/authService";

const LogoutButton: React.FC = () => {
  return (
    <Button color="inherit" onClick={logout}>
      Logout
    </Button>
  );
};

export default LogoutButton;
