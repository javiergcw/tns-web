import createProduct from "@/pages/create-product";

// config/apiConfig.js
const API_BASE_URL =
  "https://peaceful-basin-91811-0bab38de372b.herokuapp.com/api/v1";

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

  //Areas
  getAllAreas: `${API_BASE_URL}/areas`,
  createArea: `${API_BASE_URL}/areas`,
  updateArea: (id) => `${API_BASE_URL}/areas/${id}`,
  deleteArea: `${API_BASE_URL}/areas/delete`,
  //Account Type
  getAllAccountTypes: `${API_BASE_URL}/account_types`,
  createAccountType: `${API_BASE_URL}/account_types`,
  updateAccountType: (id) => `${API_BASE_URL}/account_types/${id}`,
  deleteAccountType: `${API_BASE_URL}/account_types/delete`,
  //Get all messages
  getAllMessages: `${API_BASE_URL}/messages`,
  createMessage: `${API_BASE_URL}/messages`,
  updateMessage: (id) => `${API_BASE_URL}/messages/${id}`,
  deleteMessage: (id) => `${API_BASE_URL}/messages/${id}`,
  getMessagesByShoppingId: (shoppingId) => `${API_BASE_URL}/messages/shopping/${shoppingId}`,





  // ENDPOINTS DE COMPRAS
  shoppings: `${API_BASE_URL}/shoppings`,
  getShoppingById: (id) => `${API_BASE_URL}/shoppings/${id}`,
  getShoppingByUserId: (id) => `${API_BASE_URL}/shoppings/user/${id}`,
  getLatestStatisticalRequestsOfTheMonth: `${API_BASE_URL}/shoppings/summary`,
  getUserByLatestStatisticalRequestsOfTheMonth: (id) => `${API_BASE_URL}/shoppings/user/${id}/summary`,

  updateShoppingById: (id) => `${API_BASE_URL}/shoppings/${id}`,
  deleteShoppingById: (id) => `${API_BASE_URL}/shoppings/${id}`,
  create_shopping: `${API_BASE_URL}/create_shopping`,

  //ENDPOINTS PRODUCTOS
  products: `${API_BASE_URL}/products`,
  createProduct: `${API_BASE_URL}/products`,
  //ENDPOINTS BUGS
  bugs: `${API_BASE_URL}/bugs`,
  create_bug: `${API_BASE_URL}/bugs`,

  // POSTS
  getPosts: `${API_BASE_URL}/posts`,
  // ROLES
  roles: `${API_BASE_URL}/roles`,
  deleteRole: `${API_BASE_URL}/roles/delete`,

  // Agrega más endpoints según sea necesario
};

export { API_BASE_URL, ENDPOINTS };
