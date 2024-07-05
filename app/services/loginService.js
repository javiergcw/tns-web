import axios from "axios";
import { RegisterData, RegisterResponse } from "../models/login/registerModel";
import { ENDPOINTS, BEARER_TOKEN } from "../utils/apiConfig";

export const register = async (email, password, passwordConfirmation, name) => {
  const user = {
    user: {
      email,
      password,
      password_confirmation: passwordConfirmation,
      name,
    },
  };

  try {
    const response = await axios.post(ENDPOINTS.register, user, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${BEARER_TOKEN}`,
      },
    });

    console.log("Register response:", response.data); // Para depuración

    const authResponse = new RegisterData(
      response.data.status,
      response.data.message,
      new RegisterResponse(
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
      "Registration failed:",
      error.response ? error.response.data : error.message
    );
    throw new Error("Registration failed");
  }
};
