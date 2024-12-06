import axios from "axios";

const apiRequest = async (method, url, data = null, params = null, authRequired = true) => {
  try {
    const headers = {
      "Content-Type": "application/json",
    };

    if (authRequired) {
      const token = localStorage.getItem("token");
      if (token) {
        headers["Authorization"] = `Bearer ${token}`;
      } else {
        throw new Error("Token not found");
      }
    }

    //////console.log("Making request to:", url); // Para depuración
    //////console.log("Request headers:", headers); // Para depuración
    //////console.log("Request data:", data); // Para depuración

    const response = await axios({
      method,
      url,
      data,
      params,
      headers,
    });

    //////console.log("Response data:", response.data); // Para depuración

    if (response.status < 300) {
      return response.data;
    } else {
      throw new Error(`Error: ${response.status}`);
    }
  } catch (error) {
    console.error(
      `API request error: ${error.response ? error.response.data : error.message
      }`
    );
    throw error;
  }
};

// Funciones para cada tipo de solicitud HTTP
export const get = (url, params) => apiRequest("get", url, null, params);
export const post = (url, data, authRequired = true) =>
  apiRequest("post", url, data, null, authRequired);

export const postFormData = async (url, data, authRequired = true) => {
  const headers = authRequired
    ? { Authorization: `Bearer ${localStorage.getItem("token")}` }
    : {};

  try {
    const response = await fetch(url, {
      method: "POST",
      body: data,
      headers,
    });

    if (!response.ok) {
      throw new Error(`Error en la solicitud: ${response.statusText}`);
    }

    // Retorna el status y los datos
    const responseData = await response.json();
    return { status: response.status, data: responseData };
  } catch (error) {
    console.error("Error en el POST:", error);
    throw error;
  }
};



export const del = (url, data) => apiRequest("delete", url, data);
export const patch = (url, data) => apiRequest("patch", url, data);
