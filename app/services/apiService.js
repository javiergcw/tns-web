// services/apiService.js
import axios from "axios";
import { ENDPOINTS, BEARER_TOKEN } from "@/app/utils/apiConfig";
import { AuthData, AuthResponse } from "../models/login/authModel";

// Función global para hacer solicitudes HTTP
const apiRequest = async (
  method,
  url,
  data = null,
  params = null,
  authRequired = true
) => {
  try {
    const headers = {
      "Content-Type": "application/json",
    };

    if (authRequired) {
      const token = localStorage.getItem("token");
      if (token) {
        headers["Authorization"] = `Bearer ${token}`;
      }
    }

    console.log("Making request to:", url); // Para depuración
    console.log("Request data:", data); // Para depuración

    const response = await axios({
      method,
      url,
      data,
      params,
      headers,
    });

    console.log("Response data:", response.data); // Para depuración

    if (response.status < 300) {
      return response.data;
    } else {
      throw new Error(`Error: ${response.status}`);
    }
  } catch (error) {
    console.error(
      `API request error: ${
        error.response ? error.response.data : error.message
      }`
    );
    throw error;
  }
};

// Función para el login
export const login = async (email, password) => {
  const user = { user: { email, password } };
  try {
    const response = await axios.post(ENDPOINTS.login, user, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${BEARER_TOKEN}`,
      },
    });
    console.log("Login response:", response.data); // Para depuración

    const authResponse = new AuthResponse(
      response.data.status,
      response.data.message,
      new AuthData(
        response.data.data.id,
        response.data.data.email,
        response.data.data.created_at,
        response.data.data.token
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

// Funciones para cada tipo de solicitud HTTP
export const get = (url, params) => apiRequest("get", url, null, params);
export const post = (url, data, authRequired = true) =>
  apiRequest("post", url, data, null, authRequired);
export const del = (url, data) => apiRequest("delete", url, data);
export const patch = (url, data) => apiRequest("patch", url, data);
