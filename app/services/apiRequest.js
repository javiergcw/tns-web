import axios from "axios";
import { BEARER_TOKEN } from "../utils/apiConfig";

const apiRequest = async (method, url, data = null, params = null, authRequired = true) => {
  try {
    const headers = {
      "Content-Type": "application/json",
    };

    if (authRequired) {
      headers["Authorization"] = `Bearer ${BEARER_TOKEN}`;
    }

    console.log("Making request to:", url); // Para depuración
    console.log("Request data:", data); // Para depuración

    const response = await axios({
      method,
      url,
      data,
      params,
      headers,
    });

    console.log("Response data:", response.data); // Para depuración

    if (response.status < 300) {
      return response.data;
    } else {
      throw new Error(`Error: ${response.status}`);
    }
  } catch (error) {
    console.error(
      `API request error: ${
        error.response ? error.response.data : error.message
      }`
    );
    throw error;
  }
};

// Funciones para cada tipo de solicitud HTTP
export const get = (url, params) => apiRequest("get", url, null, params);
export const post = (url, data, authRequired = true) =>
  apiRequest("post", url, data, null, authRequired);
export const del = (url, data) => apiRequest("delete", url, data);
export const patch = (url, data) => apiRequest("patch", url, data);
