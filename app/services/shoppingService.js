import { get, post } from "./apiRequest";
import { ENDPOINTS } from "../utils/apiConfig";
import Shopping from "../models/shoppings/shoppingsModel"; // Asegúrate de que la ruta sea correcta

const getAllShoppings = async () => {
  try {
    const response = await get(ENDPOINTS.shoppings, false);
    //console.log('Respuesta de compras:', response);  // Añade esta línea para depuración
    return response;
  } catch (error) {
    console.error("Error al obtener las compras:", error);
    throw error;
  }
};

const createShopping = async (shoppingData) => {
  try {
    const response = await post(ENDPOINTS.create_shopping, shoppingData);
    return response;
  } catch (error) {
    console.error('Failed to create shopping:', error);
    throw error;
  }
};

export { getAllShoppings, createShopping };
