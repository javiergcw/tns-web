import axios from 'axios';
import { ENDPOINTS, BEARER_TOKEN } from "@/app/utils/apiConfig";
import Shopping from "@/app/models/shoppings/shoppingsModel"; // Asegúrate de que la ruta sea correcta

const getAllShoppings = async () => {
  try {
    const response = await fetch(`${ENDPOINTS.shoppings}`, {
      method: 'GET',
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

const createShopping = async (shoppingData, productsData) => {
  const shopping = new Shopping({
    ...shoppingData,
    products: productsData,
  });

  try {
    const response = await axios.post(
      ENDPOINTS.createShopping,
      { shopping, products: shopping.products },
      {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${BEARER_TOKEN}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error('Failed to create shopping:', error);
    throw error;
  }
};

export { getAllShoppings, createShopping };
