import { get,post } from "./apiRequest";
import { ENDPOINTS } from "@/app/utils/apiConfig";
import Shopping from "@/app/models/shoppings/shoppingsModel"; // Asegúrate de que la ruta sea correcta

const getAllShoppings = async () => {
  try {
    const response = await get(ENDPOINTS.shoppings);
    return response;
  } catch (error) {
    console.error("Error al obtener las compras:", error);
    throw error;
  }
};

const createShopping = async (shoppingData) => {
  try {
    const response = await post(ENDPOINTS.createShopping, shoppingData);
    return response;
  } catch (error) {
    console.error('Failed to create shopping:', error);
    throw error;
  }
};

export { getAllShoppings, createShopping };
