import { Button, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { initialUserData } from "../../../constants/initialValues";
import useAuthForm from "../../../hooks/useAuthForm";
import { useSnackbarActions } from "../../../hooks/useSnackbarActions";
import { UserData } from "../../../interfaces/interfaceProps";
import { register } from "../../../services/authService";
import FormField from "../../common/FormField";
import CommonFormLayout from "../../layout/CommonAuthFormLayout";

const RegisterForm = () => {
  const navigate = useNavigate();
  const { showSuccessSnackbar, showErrorSnackbar } = useSnackbarActions();

  const submitHandler = async (data: UserData) => {
    try {
      await register(data.username, data.password);
      showSuccessSnackbar("Registered successful!");
      navigate("/dashboard");
    } catch (error) {
      showErrorSnackbar(error as string);
      console.error("Login failed:", error);
    }
  };

  const { formData, handleChange, handleSubmit, error } = useAuthForm(
    initialUserData,
    submitHandler,
  );

  return (
    <CommonFormLayout>
      <Typography variant="h6" align="center">
        Register
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
          Register
        </Button>
        {error && <Typography color="error">{error}</Typography>}
      </form>
      <Typography variant="body2" align="center" sx={{ mt: 2, mb: 1 }}>
        Already registered?
      </Typography>
      <Button
        color="primary"
        variant="outlined"
        fullWidth
        onClick={() => navigate("/login")}
      >
        Back to Login
      </Button>
    </CommonFormLayout>
  );
};

export default RegisterForm;
