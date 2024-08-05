import { get, post } from "./apiRequest";
import { ENDPOINTS } from "@/app/utils/apiConfig";
import Shopping from "@/app/models/shoppings/shoppingsModel"; // Asegúrate de que la ruta sea correcta

const getAllShoppings = async () => {
  try {
    const response = await get(ENDPOINTS.shoppings);
    return response.map((shoppingData) => new Shopping(shoppingData));
  } catch (error) {
    console.error("Error al obtener las compras:", error);
    throw error;
  }
};

const createShopping = async (shoppingData) => {
  try {
    const response = await post(ENDPOINTS.createShopping, shoppingData);
    return new Shopping(response);
  } catch (error) {
    console.error("Failed to create shopping:", error);
    throw error;
  }
};

// Nueva función para obtener una compra por ID
const getShoppingById = async (id) => {
  try {
    const response = await get(ENDPOINTS.getShoppingById(id));
    return new Shopping(response.data); // Asegúrate de acceder a 'data' de la respuesta
  } catch (error) {
    console.error("Error al obtener la compra por ID:", error);
    throw error;
  }
};

export { getAllShoppings, createShopping, getShoppingById };
