import { Button, Paper, TextField, Typography } from "@mui/material";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { register } from "../services/authService";

const RegisterForm = () => {
  const navigate = useNavigate();
  const [newUserData, setNewUserData] = useState({
    username: "",
    password: "",
  });
  const [error, setError] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewUserData({ ...newUserData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newUserData.username || !newUserData.password) {
      setError("Username and password are required");
      return;
    }

    try {
      const response = await register(
        newUserData.username,
        newUserData.password,
      );
      localStorage.setItem("token", response.token);
      navigate("/dashboard");
    } catch (error) {
      console.error("Registration error:", error);
      setError("Failed to register");
    }
  };

  return (
    <Paper style={{ padding: "16px", margin: "auto", maxWidth: 500 }}>
      <Typography variant="h6">Register</Typography>
      <form onSubmit={handleSubmit}>
        <TextField
          name="username"
          label="Username"
          fullWidth
          margin="normal"
          value={newUserData.username}
          onChange={handleChange}
        />
        <TextField
          name="password"
          label="Password"
          type="password"
          fullWidth
          margin="normal"
          value={newUserData.password}
          onChange={handleChange}
        />
        <Button
          type="submit"
          color="primary"
          variant="contained"
          fullWidth
          style={{ marginTop: "16px" }}
        >
          Register
        </Button>
        {error && <Typography color="error">{error}</Typography>}
      </form>
    </Paper>
  );
};

export default RegisterForm;
