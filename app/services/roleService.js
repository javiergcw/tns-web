
import { ENDPOINTS } from "@/app/utils/apiConfig";
import axios from "axios";

const getAuthHeaders = () => {
  return {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  };
};
export const getRoles = async () => {
  try {
    const response = await axios.get(ENDPOINTS.roles, getAuthHeaders());
    // Aquí retornamos directamente la data que contiene los roles
    return response.data; 
  } catch (error) {
    console.error('Failed to fetch roles:', error);
    throw error;
  }
};

export const addRole = async (name) => {
  try {
    const response = await axios.post(ENDPOINTS.roles, { name },getAuthHeaders());
    return response;
  } catch (error) {
    console.error('Failed to add role:', error);
    throw error;
  }
};

export const deleteRole = async (id) => {
  try {
    const response = await axios.post(ENDPOINTS.deleteRole, { id },getAuthHeaders());
    return response;
  } catch (error) {
    console.error('Failed to delete role:', error);
    throw error;
  }
};
