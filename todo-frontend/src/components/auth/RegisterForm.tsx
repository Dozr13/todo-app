import { Button, Container, Paper, TextField, Typography } from "@mui/material";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { register } from "../../services/authService";

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
      console.error("Registration error in RegistrationForm:", error);
      setError("Failed to register");
    }
  };

  return (
    <Container
      maxWidth="sm"
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        height: "100vh",
        backgroundColor: "#f5f5f5",
      }}
    >
      <Paper
        style={{
          padding: "20px",
          maxWidth: 500,
          backgroundColor: "#ffffff",
          boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.1)",
        }}
      >
        <Typography variant="h6" align="center">
          Register
        </Typography>
        <form onSubmit={handleSubmit}>
          <TextField
            name="username"
            label="Username"
            fullWidth
            margin="normal"
            value={newUserData.username}
            onChange={handleChange}
            autoComplete="username"
          />
          <TextField
            name="password"
            label="Password"
            type="password"
            fullWidth
            margin="normal"
            value={newUserData.password}
            onChange={handleChange}
            autoComplete="new-password"
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
      <Button
        color="primary"
        style={{ marginTop: "16px" }}
        onClick={() => navigate("/login")}
      >
        Already registered? Login here
      </Button>
    </Container>
  );
};

export default RegisterForm;
