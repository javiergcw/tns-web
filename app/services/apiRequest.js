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

    const response = await axios({
      method,
      url,
      data,
      params,
      headers,
    });

    if (response.status < 300) {
      return response.data;
    } else {
      throw new Error(`Error: ${response.status}`);
    }
  } catch (error) {
    console.error(`API request error: ${error.response ? error.response.data : error.message}`);
    // Manejar error 401: sesión expirada o token inválido
    if (error.response && error.response.status === 401) {
      console.log("Received 401 Unauthorized, redirecting to login...");
      localStorage.removeItem("token");
      localStorage.removeItem("userId");
      localStorage.removeItem("profileId");
      window.location.href = "https://thenewschool.edu.co/login";
      return; // Terminar la ejecución para evitar que el error se propague
    }
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
      if (response.status === 401) {
        console.log("Received 401 Unauthorized in postFormData, redirecting to login...");
        localStorage.removeItem("token");
        localStorage.removeItem("userId");
        localStorage.removeItem("profileId");
        window.location.href = "https://thenewschool.edu.co/login";
        return;
      }
      throw new Error(`Error en la solicitud: ${response.statusText}`);
    }

    const responseData = await response.json();
    return { status: response.status, data: responseData };
  } catch (error) {
    console.error("Error en el POST:", error);
    throw error;
  }
};

export const del = (url, data) => apiRequest("delete", url, data);
export const patch = (url, data) => apiRequest("patch", url, data);