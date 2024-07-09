import { get,post } from "./apiRequest";
import { ENDPOINTS } from "@/app/utils/apiConfig";

export const getCategories = async () => {
  try {
    const response = await get(ENDPOINTS.categories);
    return response;
  } catch (error) {
    console.error("Failed to fetch categories:", error);
    throw error;
  }
};

export const addCategory = async (name) => {
  try {
    const response = await post(ENDPOINTS.categories, { name });
    return response;
  } catch (error) {
    console.error("Failed to add category:", error);
    throw error;
  }
};

export const deleteCategory = async (id) => {
  try {
    console.log("id", id);
    const response = await post(ENDPOINTS.deleteCategory, { id });
    return response;
  } catch (error) {
    console.error("Failed to delete category:", error);
    throw error;
  }
};
