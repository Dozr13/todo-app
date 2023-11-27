import axiosInstance from "../utils/axiosInstance";
import handleError from "../utils/errorHandler";

const setToken = (token: string) => {
  localStorage.setItem("token", token);
};

export const login = async (username: string, password: string) => {
  try {
    const response = await axiosInstance.post("/auth/login", {
      username,
      password,
    });
    if (response.data.token) {
      setToken(response.data.token);
    } else {
      console.log("No token received in response");
    }
    return response.data;
  } catch (error) {
    return handleError(error);
  }
};

export const logout = () => {
  try {
    localStorage.removeItem("token");
    return Promise.resolve("Logged out successfully");
  } catch (error) {
    return handleError(error);
  }
};

export const register = async (username: string, password: string) => {
  try {
    const response = await axiosInstance.post("/auth/register", {
      username,
      password,
    });
    setToken(response.data.token);

    return response.data;
  } catch (error) {
    return handleError(error);
  }
};

export const deleteAccount = async () => {
  try {
    await axiosInstance.delete("/auth/delete-account");
    logout();
    return Promise.resolve("Account successfully deleted");
  } catch (error) {
    return handleError(error);
  }
};
