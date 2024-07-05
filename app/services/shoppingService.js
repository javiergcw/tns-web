// src/services/shoppingService.js
import { ENDPOINTS, BEARER_TOKEN } from "@/app/utils/apiConfig";
import Shopping from "../models/shoppings/shoppingsModel";

const getAllShoppings = async () => {
  try {
    const response = await fetch(`${ENDPOINTS.shoppings}`, {
      method:'GET',
      headers: {
        'Content-Type': "application/json",
        'Authorization': `Bearer ${BEARER_TOKEN}`,
      },
    });

    if (!response.ok) {
      throw new Error("Error al obtener las compras");
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error:", error);
    throw error;
  }
};

export { getAllShoppings };
