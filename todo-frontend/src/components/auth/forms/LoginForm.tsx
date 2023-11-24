import { Button, Container, Paper, TextField, Typography } from "@mui/material";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { login } from "../../../services/authService";

const LoginForm = () => {
  const navigate = useNavigate();
  const [loginData, setLoginData] = useState({ username: "", password: "" });
  const [error, setError] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLoginData({ ...loginData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!loginData.username || !loginData.password) {
      setError("Username and password are required");
      return;
    }

    try {
      const response = await login(loginData.username, loginData.password);
      localStorage.setItem("token", response.token);
      navigate("/dashboard");
    } catch (error) {
      console.error("Login error in LoginForm:", error);
      setError("Failed to login");
    }
  };

  return (
    <Container
      maxWidth="sm"
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        height: "100vh",
        backgroundColor: "#e1e1e1",
      }}
    >
      <Paper
        sx={{
          p: "20px",
          maxWidth: 500,
          backgroundColor: "#ffffff",
          boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.1)",
        }}
      >
        <Typography variant="h6" align="center">
          Login
        </Typography>
        <form onSubmit={handleSubmit}>
          <TextField
            name="username"
            label="Username"
            fullWidth
            margin="normal"
            value={loginData.username}
            onChange={handleChange}
            autoComplete="username"
          />
          <TextField
            name="password"
            label="Password"
            type="password"
            fullWidth
            margin="normal"
            value={loginData.password}
            onChange={handleChange}
            autoComplete="current-password"
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
      </Paper>
      <Button
        color="primary"
        sx={{ mt: 2 }}
        onClick={() => navigate("/register")}
      >
        Not registered yet? Sign up here
      </Button>
    </Container>
  );
};

export default LoginForm;
