// services/categoryService.js
import axios from "axios";
import { ENDPOINTS, BEARER_TOKEN } from "@/app/utils/apiConfig";
// Asegúrate de que la ruta sea correcta

// Constante del token de autenticación
//const AUTH_TOKEN = 'eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOjM0LCJqdGkiOiI2NzZhZTc4ZC04MDEyLTRmYTItOTljYi0zODM1NjUwNzFiNjMiLCJleHAiOjE3MjAxMTg5OTl9.EIHSzokYlkKmiRxToxjHKn3JcC2UYRmzaloLPTMeMzY';

const getAuthHeaders = () => {
  return {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${BEARER_TOKEN}`,
    },
  };
};

export const getCategories = async () => {
  try {
    const response = await axios.get(ENDPOINTS.categories, getAuthHeaders());
    return response.data;
  } catch (error) {
    console.error("Failed to fetch categories:", error);
    throw error;
  }
};

export const addCategory = async (name) => {
  try {
    const response = await axios.post(
      ENDPOINTS.categories,
      { name },
      getAuthHeaders()
    );
    return response.data;
  } catch (error) {
    console.error("Failed to add category:", error);
    throw error;
  }
};

export const deleteCategory = async (id) => {
  try {
    console.log("id", id);
    const response = await axios.post(
      ENDPOINTS.deleteCategory,
      { id },
      getAuthHeaders()
    );
    return response.data;
  } catch (error) {
    console.error("Failed to delete category:", error);
    throw error;
  }
};
