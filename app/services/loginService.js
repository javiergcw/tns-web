import { post } from "./apiRequest";
import { RegisterData, RegisterResponse } from "../models/login/registerModel";
import { ENDPOINTS } from "../utils/apiConfig";

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
    const response = await post(ENDPOINTS.register, user, false); // False si el registro no requiere autenticación previa
    //console.log("Register response:", response); // Para depuración

    // Verificar si la respuesta contiene la información esperada
    if (response && response.data) {
      const authResponse = new RegisterData(
        response.status,
        response.message,
        new RegisterResponse(
          response.data.id,
          response.data.email,
          response.data.created_at,
          response.data.token
        )
      );

      //console.log("Parsed AuthResponse:", authResponse); // Para depuración
      return authResponse;
    } else {
      console.error("Unexpected response format:", response);
      throw new Error("Unexpected response format");
    }
  } catch (error) {
    console.error(
      "Registration failed:",
      error.response ? error.response.data : error.message
    );
    throw new Error("Registration failed");
  }
};
