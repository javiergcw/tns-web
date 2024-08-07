// services/ProductService.js

import ProductModel from "../models/products/product_model";
import { get, post } from "./apiRequest";
import { ENDPOINTS } from "../utils/apiConfig";

// Función para obtener todos los productos
const getAllProducts = async () => {
    try {
        const response = await get(ENDPOINTS.products);
        return response.map((productData) => new ProductModel(productData));
    } catch (error) {
        console.error("Error al obtener los productos:", error);
        throw error;
    }
};

// Función para crear un nuevo producto
const createProduct = async (productData) => {
    try {
        const response = await post(ENDPOINTS.products, { product: productData });
        return new ProductModel(response);
    } catch (error) {
        console.error("Error al crear el producto:", error);
        throw error;
    }
};

export { getAllProducts, createProduct };
