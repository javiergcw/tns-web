// app/utils/api.js
export const fetchWithAuth = async (url, options = {}) => {
    const token = localStorage.getItem("token");

    const defaultOptions = {
        ...options,
        headers: {
            ...options.headers,
            Authorization: token ? `Bearer ${token}` : "",
            "Content-Type": "application/json",
        },
    };

    const response = await fetch(url, defaultOptions);

    if (response.status === 401) { // Unauthorized
        localStorage.removeItem("token");
        localStorage.removeItem("userId");
        throw new Error("Sesión expirada");
    }

    return response;
};