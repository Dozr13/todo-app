import { Button, Paper, TextField, Typography } from "@mui/material";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { login } from "../services/authService";

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
      console.error("Login error:", error);
      setError("Failed to login");
    }
  };

  return (
    <Paper style={{ padding: "16px", margin: "auto", maxWidth: 500 }}>
      <Typography variant="h6">Login</Typography>
      <form onSubmit={handleSubmit}>
        <TextField
          name="username"
          label="Username"
          fullWidth
          margin="normal"
          value={loginData.username}
          onChange={handleChange}
        />
        <TextField
          name="password"
          label="Password"
          type="password"
          fullWidth
          margin="normal"
          value={loginData.password}
          onChange={handleChange}
        />
        <Button
          type="submit"
          color="primary"
          variant="contained"
          fullWidth
          style={{ marginTop: "16px" }}
        >
          Login
        </Button>
        {error && <Typography color="error">{error}</Typography>}
      </form>
    </Paper>
  );
};

export default LoginForm;
