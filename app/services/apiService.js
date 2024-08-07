import { post } from "./apiRequest";
import { ENDPOINTS } from "../utils/apiConfig";
import { AuthResponse, AuthData } from "../models/login/authModel";

export const login = async (email, password) => {
  const user = { user: { email, password } };

  try {
    const response = await post(ENDPOINTS.login, user, false); // False si el login no requiere autenticación previa
    console.log("Login response:", response); // Para depuración

    const authResponse = new AuthResponse(
      response.status,
      response.message,
      new AuthData(
        response.data.id,
        response.data.email,
        response.data.created_at,
        response.data.token
      )
    );

    console.log("Parsed AuthResponse:", authResponse); // Para depuración

    if (authResponse.data.token) {
      console.log("Token is present, storing in localStorage"); // Para depuración
      localStorage.setItem("token", authResponse.data.token);
      console.log("Token stored:", localStorage.getItem("token")); // Verificar almacenamiento

      localStorage.setItem("userId", authResponse.data.id);
      console.log("User ID stored:", localStorage.getItem("userId")); // Verificar almacenamiento
    }
    return authResponse;
  } catch (error) {
    console.error(
      "Login failed:",
      error.response ? error.response.data : error.message
    );
    throw new Error("Login failed");
  }
};

// Función para logout
export const logout = async () => {
  try {
    const token = localStorage.getItem("token");
    if (!token) throw new Error("No token found");

    const response = await post(ENDPOINTS.logout, {}, true); // True porque requiere autenticación

    console.log("Logout response:", response); // Para depuración

    localStorage.removeItem("token");
    localStorage.removeItem("userId");

    return response;
  } catch (error) {
    console.error(
      "Logout failed:",
      error.response ? error.response.data : error.message
    );
    throw new Error("Logout failed");
  }
};
