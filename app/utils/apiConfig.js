// config/apiConfig.js
const API_BASE_URL = "https://peaceful-basin-91811-0bab38de372b.herokuapp.com/api/v1";
const BEARER_TOKEN = "eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOjM0LCJqdGkiOiI2NzZhZTc4ZC04MDEyLTRmYTItOTljYi0zODM1NjUwNzFiNjMiLCJleHAiOjE3MjE1MzE3MDl9.JFoWVg9vlLrehc0V0ruWk5UCENXcClph6L3vXB26yKk"
const ENDPOINTS = {
  login: `${API_BASE_URL}/login`,
  register: `${API_BASE_URL}/users`,
  home: `${API_BASE_URL}/home`,
  perfil: `${API_BASE_URL}/profile`,
  categories: `${API_BASE_URL}/categories`,
  statuses: `${API_BASE_URL}/statuses`,
  getProfileById: (id) => `${API_BASE_URL}/profiles/${id}`,
  getAllProfiles: `${API_BASE_URL}/profiles`,
  updateProfile: (id) => `${API_BASE_URL}/profiles/${id}`,
  deleteCategory: `${API_BASE_URL}/categories/delete`,
  
  // ENDPOINTS DE COMPRAS
  shoppings: `${API_BASE_URL}/shoppings`,
  getShoppingById: (id) => `${API_BASE_URL}/shoppings/${id}`,
  updateShoppingById: (id) => `${API_BASE_URL}/shoppings/${id}`,
  deleteShoppingById: (id) => `${API_BASE_URL}/shoppings/${id}`,
  create_shopping: `${API_BASE_URL}/create_shopping`,

  // POSTS
  getPosts: `${API_BASE_URL}/posts`,

  // ROLES
  roles: `${API_BASE_URL}/roles`,
  deleteRole: `${API_BASE_URL}/roles/delete`,

  // Agrega más endpoints según sea necesario
};

export { API_BASE_URL, BEARER_TOKEN, ENDPOINTS };
