import axiosInstance from "../utils/axiosInstance";
import handleError from "../utils/errorHandler";

export const login = async (username: string, password: string) => {
  try {
    const response = await axiosInstance.post("/auth/login", {
      username,
      password,
    });
    return response.data;
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
    return response.data;
  } catch (error) {
    return handleError(error);
  }
};

export const logout = () => {
  localStorage.removeItem("authToken");
  window.location.href = "/login";
};
