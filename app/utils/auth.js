import { logout as apiLogout } from "../services/apiService";

export const getToken = () => {
  if (typeof window !== "undefined") {
    return localStorage.getItem("token");
  }
  return null;
};

export const isAuthenticated = () => {
  return !!getToken();
};

export const logout = async () => {
  if (typeof window !== "undefined") {
    try {
      await apiLogout(); // Llama a la función logout del apiService
      localStorage.removeItem("token");
      localStorage.removeItem("userId");
    } catch (error) {
      console.error("Logout failed:", error);
    }
  }
};
