import { Button, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { initialLoginData } from "../../../constants/initialValues";
import useAuthForm from "../../../hooks/useAuthForm";
import { useSnackbarActions } from "../../../hooks/useSnackbarActions";
import { LoginData } from "../../../interfaces/interfaceProps";
import { login } from "../../../services/authService";
import FormField from "../../common/FormField";
import CommonFormLayout from "../../layout/CommonAuthFormLayout";

const LoginForm = () => {
  const navigate = useNavigate();
  const { showSuccessSnackbar, showErrorSnackbar } = useSnackbarActions();

  const submitHandler = async (data: LoginData) => {
    try {
      await login(data.username, data.password);
      showSuccessSnackbar("Login successful!");
      navigate("/dashboard");
    } catch (error) {
      showErrorSnackbar(error as string);
      console.error("Login failed:", error);
    }
  };

  const { formData, handleChange, handleSubmit, error } = useAuthForm(
    initialLoginData,
    submitHandler,
  );

  return (
    <CommonFormLayout>
      <Typography variant="h6" align="center">
        Login
      </Typography>
      <form onSubmit={handleSubmit}>
        <FormField
          name="username"
          label="Username"
          value={formData.username}
          onChange={handleChange}
        />
        <FormField
          name="password"
          label="Password"
          type="password"
          value={formData.password}
          onChange={handleChange}
        />
        <Button
          type="submit"
          color="primary"
          variant="contained"
          fullWidth
          sx={{ mt: 2 }}
        >
          Login
        </Button>
        {error && <Typography color="error">{error}</Typography>}
      </form>
      <Typography variant="body2" align="center" sx={{ mt: 2, mb: 1 }}>
        Not registered yet?
      </Typography>
      <Button
        color="primary"
        variant="outlined"
        fullWidth
        onClick={() => navigate("/register")}
      >
        Sign up here
      </Button>
    </CommonFormLayout>
  );
};

export default LoginForm;
