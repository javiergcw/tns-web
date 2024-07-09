import { get,post } from "./apiRequest";
import { ENDPOINTS } from "@/app/utils/apiConfig";

export const getRoles = async () => {
  try {
    const response = await get(ENDPOINTS.roles);
    return response;
  } catch (error) {
    console.error('Failed to fetch roles:', error);
    throw error;
  }
};

export const addRole = async (name) => {
  try {
    const response = await post(ENDPOINTS.roles, { name });
    return response;
  } catch (error) {
    console.error('Failed to add role:', error);
    throw error;
  }
};

export const deleteRole = async (id) => {
  try {
    const response = await post(ENDPOINTS.deleteRole, { id });
    return response;
  } catch (error) {
    console.error('Failed to delete role:', error);
    throw error;
  }
};
