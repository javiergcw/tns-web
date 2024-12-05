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
  const formData = new FormData();

  // Construcción de FormData
  Object.keys(data).forEach((key) => {
    if (Array.isArray(data[key])) {
      data[key].forEach((item, index) => {
        if (typeof item === "object" && item !== null) {
          Object.keys(item).forEach((subKey) => {
            formData.append(`${key}[${index}][${subKey}]`, item[subKey]);
          });
        } else {
          formData.append(`${key}[${index}]`, item);
        }
      });
    } else {
      formData.append(key, data[key]);
    }
  });

  // Configuración de encabezados
  const headers = authRequired
    ? {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    }
    : {};

  try {
    // Envío de la solicitud
    const response = await fetch(url, {
      method: "POST",
      body: formData, // Enviamos el FormData directamente
      headers, // No incluimos Content-Type aquí
    });

    if (!response.ok) {
      throw new Error(`Error en la solicitud: ${response.statusText}`);
    }

    // Parseamos la respuesta
    return await response.json();
  } catch (error) {
    console.error("Error en el POST:", error);
    throw error;
  }
};


export const del = (url, data) => apiRequest("delete", url, data);
export const patch = (url, data) => apiRequest("patch", url, data);
