import { get, post } from "./apiRequest";
import { ENDPOINTS } from "@/app/utils/apiConfig";
import axios from "axios";
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
      profile: response.profile,
    };
    const shoppings = response.shoppings.map(
      (shopping) => new ShoppingDTO({ ...shopping, user })
    );
    return shoppings;
  } catch (error) {
    console.error("Error al obtener las compras por ID de usuario:", error);
    throw error;
  }
};

// Nuevo método para obtener una compra específica por ID
const getShoppingById = async (id) => {
  try {
    // Realiza la solicitud GET sin incluir la autorización
    const response = await axios.get(ENDPOINTS.getShoppingById(id), {
      headers: {
        "Content-Type": "application/json",
      },
    });

    // Verifica si la respuesta es exitosa
    if (response.status >= 200 && response.status < 300) {
      return new ShoppingDTO(response.data);
    } else {
      throw new Error(`Error: ${response.status}`);
    }
  } catch (error) {
    console.error("Error al obtener la compra por ID:", error);
    throw error;
  }
};
const uploadInvoice = async (id, file) => {
  try {
    // Configura el form-data para enviar el archivo
    const formData = new FormData();
    formData.append("file", file); // Asegúrate de que el campo 'file' coincida con el backend

    // Realiza la solicitud POST al endpoint
    const response = await axios.post(ENDPOINTS.upload_invoice(id), formData, {
      headers: {
        ...getAuthHeaders(), // Incluye encabezados de autenticación si es necesario
        "Content-Type": "multipart/form-data",
      },
    });

    // Maneja la respuesta
    if (response.status >= 200 && response.status < 300) {
      console.log("Factura subida exitosamente:", response.data);
      return response.data;
    } else {
      throw new Error(`Error al subir la factura: ${response.status}`);
    }
  } catch (error) {
    console.error("Error al subir la factura:", error);
    throw error;
  }
};



// Nuevo método para obtener las solicitudes estadísticas más recientes del mes
const getLatestStatisticalRequestsOfTheMonth = async () => {
  try {
    const response = await get(
      ENDPOINTS.getLatestStatisticalRequestsOfTheMonth
    );
    return response.recent_shoppings.map(
      (shoppingData) => new ShoppingDTO(shoppingData)
    );
  } catch (error) {
    console.error(
      "Error al obtener las solicitudes estadísticas más recientes del mes:",
      error
    );
    throw error;
  }
};
const getUserByLatestStatisticalRequestsOfTheMonth = async (id) => {
  try {
    const response = await get(
      ENDPOINTS.getUserByLatestStatisticalRequestsOfTheMonth(id)
    );
    const user = {
      id: response.user.id,
      profile: response.user.profile,
    };
    const recentShoppings = response.recent_shoppings.map(
      (shoppingData) => new ShoppingDTO({ ...shoppingData, user })
    );
    return {
      user,
      recentShoppings,
      monthlyStatistics: response.monthly_statistics,
      monthlyExpenses: response.monthly_expenses,
    };
  } catch (error) {
    console.error(
      "Error al obtener las solicitudes estadísticas más recientes del mes para el usuario:",
      error
    );
    throw error;
  }
};

// Método para crear una nueva compra
const createShopping = async (shoppingData) => {
  try {
    const response = await post(
      ENDPOINTS.create_shopping,

      shoppingData,
    );
    /*  const response = await post(ENDPOINTS.create_shopping, shoppingData); */
    if (response.status >= 200 && response.status < 300) {
      return true;
    } //return new ShoppingDTO(response);
  } catch (error) {
    console.error("Error al crear la compra:", error);
    throw error;
  }
};
// services/shoppingService.js
// Ejemplo de getAuthHeaders
const getAuthHeaders = () => {
  const token = localStorage.getItem('token'); // O el mecanismo de almacenamiento que uses
  return {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${token}`,
  };
};

 // Cambia esto por tu URL base
const deleteShoppingById = async (id) => {
  try {
    const response = await fetch(ENDPOINTS.DeleteShoppingById(id), {
      method: 'DELETE',
      headers: {
        ...getAuthHeaders(), // Incluye los encabezados de autenticación
      },
    });

    if (!response.ok) {
      throw new Error(`Error al eliminar la compra con ID ${id}`);
    }

    return await response.json();
  } catch (error) {
    console.error("Hubo un error al eliminar la compra: ", error);
    throw error;
  }
};



export {
  getAllShoppings,
  getShoppingsByUserId,
  getShoppingById,
  getLatestStatisticalRequestsOfTheMonth,
  createShopping,
  getUserByLatestStatisticalRequestsOfTheMonth,
  deleteShoppingById,
  uploadInvoice
};
