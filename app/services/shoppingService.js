// shoppingService.js

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

const createShopping = async (shoppingData) => {
  try {
    const response = await post(ENDPOINTS.createShopping, shoppingData);
    return new ShoppingDTO(response);
  } catch (error) {
    console.error("Failed to create shopping:", error);
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
}

// Nuevo método para obtener una compra específica por ID
const getShoppingById = async (id) => {
  try {
    const response = await get(ENDPOINTS.getShoppingById(id));
    return new ShoppingDTO(response);
  } catch (error) {
    console.error("Error al obtener la compra por ID:", error);
    throw error;
  }
}

export { getAllShoppings, createShopping, getShoppingsByUserId, getShoppingById };
