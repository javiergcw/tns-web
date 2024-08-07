import { get, post } from "./apiRequest";
import { ENDPOINTS } from "@/app/utils/apiConfig";
import { ShoppingDTO } from "../models/shoppings/shoppingsModel"; // Asegúrate de que la ruta sea correcta

const getAllShoppings = async () => {
  try {
    const response = await get(ENDPOINTS.shoppings);
    return response.map((shoppingData) => new ShoppingDTO(shoppingData));
  } catch (error) {
    console.error("Error al obtener las compras:", error);
    throw error;
  }
};

const getShoppingsByUserId = async (id) => {
  try {
    const response = await get(ENDPOINTS.getShoppingByUserId(id));
    const user = {
      id: response.id,
      profile: response.profile
    };
    const shoppings = response.shoppings.map(shopping => new ShoppingDTO({ ...shopping, user }));
    return shoppings;
  } catch (error) {
    console.error("Error al obtener las compras por ID de usuario:", error);
    throw error;
  }
};

// Nuevo método para obtener una compra específica por ID
const getShoppingById = async (id) => {
  try {
    const response = await get(ENDPOINTS.getShoppingById(id));
    return new ShoppingDTO(response);
  } catch (error) {
    console.error("Error al obtener la compra por ID:", error);
    throw error;
  }
};

// Nuevo método para obtener las solicitudes estadísticas más recientes del mes
const getLatestStatisticalRequestsOfTheMonth = async () => {
  try {
    const response = await get(ENDPOINTS.getLatestStatisticalRequestsOfTheMonth);
    return response.recent_shoppings.map((shoppingData) => new ShoppingDTO(shoppingData));
  } catch (error) {
    console.error("Error al obtener las solicitudes estadísticas más recientes del mes:", error);
    throw error;
  }
}

// Método para crear una nueva compra
const createShopping = async (shoppingData) => {
  try {
    const response = await post(ENDPOINTS.create_shopping, shoppingData);
    if (response.status == 200)
      {
        return true
      }//return new ShoppingDTO(response);
  } catch (error) {
    console.error("Error al crear la compra:", error);
    throw error;
  }
}

export { getAllShoppings, getShoppingsByUserId, getShoppingById, getLatestStatisticalRequestsOfTheMonth, createShopping };
