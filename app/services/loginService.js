import { post } from "./apiRequest";
import { RegisterData, RegisterResponse } from "../models/login/registerModel";
import { ENDPOINTS } from "../utils/apiConfig";
import { ImagesPath } from "../utils/assetsPath";

import { IdentificationIcon } from "@heroicons/react/24/solid";

export const register = async (
  email,
  password,
  passwordConfirmation,
  name,
  identificationType,
  identificationNumber
) => {
  const user = {
    user: {
      email: email,
      password: password,
      password_confirmation: passwordConfirmation,
      profile_attributes: {
        name: name,
        identification_type: identificationType,
        identification_number: identificationNumber,
        photo: ImagesPath.profileDefaultPhoto, // Debes asignar aquí la URL real de la foto si está disponible
        rol_id: 1, // Ajusta este valor según el rol que deba asignarse
      },
    },
  };

  try {
    const response = await post(ENDPOINTS.register, user, false); // False si el registro no requiere autenticación previa

    // Verificar si la respuesta contiene la información esperada
    if (response && response.data) {
      const authResponse = new RegisterData(
        response.status,
        response.message,
        new RegisterResponse(
          response.data.id,
          response.data.email,
          response.data.created_at,
          response.data.token,
          response.data.profile
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
