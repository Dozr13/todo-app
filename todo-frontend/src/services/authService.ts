const API_URL = process.env.TODO_APP_BACKEND_URL || "http://localhost:3001";

export const login = async (username: string, password: string) => {
  const response = await fetch(`${API_URL}/auth/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ username, password }),
  });
  if (!response.ok) {
    throw new Error("Login failed");
  }
  const data = await response.json();
  return data;
};

export const register = async (username: string, password: string) => {
  const response = await fetch(`${API_URL}/auth/register`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ username, password }),
  });
  if (!response.ok) {
    throw new Error("Registration failed");
  }
  return response.json();
};

export const logout = () => {
  localStorage.removeItem("authToken");
  window.location.href = "/login";
};
