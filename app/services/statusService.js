import axios from "axios";
import { ENDPOINTS} from "@/app/utils/apiConfig";

// Función para obtener las cabeceras de autorización
const getAuthHeaders = () => {
  return {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  };
};

// Obtener todos los estados
export const getStatuses = async () => {
  
  try {
    const response = await axios.get(ENDPOINTS.statuses, getAuthHeaders());
    return response.data;
  } catch (error) {
    console.error("Failed to fetch statuses:", error);
    throw error;
  }
};

// Crear un nuevo estado
export const addStatus = async (name) => {
  try {
    const response = await axios.post(
      ENDPOINTS.statuses,
      { name },
      getAuthHeaders()
    );
    return response.data;
  } catch (error) {
    console.error("Failed to add status:", error);
    throw error;
  }
};

// Eliminar un estado
export const deleteStatus = async (id) => {
  try {
    const response = await axios.post(
      `${ENDPOINTS.statuses}/delete`,
      { id },
      getAuthHeaders()
    );
    return response.data;
  } catch (error) {
    console.error("Failed to delete status:", error);
    throw error;
  }
};
